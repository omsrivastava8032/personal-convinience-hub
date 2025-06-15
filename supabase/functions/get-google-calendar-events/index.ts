import { createClient, type SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

console.log('get-google-calendar-events function started');

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient: SupabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      console.log('No user authenticated');
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    console.log('User authenticated:', user.id);

    const { data: integration, error: integrationError } = await supabaseClient
      .from('google_calendar_integrations')
      .select('access_token, expires_at, refresh_token')
      .eq('user_id', user.id)
      .single();

    if (integrationError || !integration) {
      console.error('Integration error:', integrationError);
      return new Response(JSON.stringify({ error: 'Google Calendar not linked.' }), {
        status: 200, // Return 200 with error in body for easier client handling
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Found Google Calendar integration for user.');

    // Note: A production application should handle token expiration and use the refresh_token.
    // For simplicity, we are not implementing token refresh in this step.
    const accessToken = integration.access_token;

    const calendarApiUrl = new URL('https://www.googleapis.com/calendar/v3/calendars/primary/events');
    const timeMin = new Date();
    const timeMax = new Date();
    timeMax.setMonth(timeMax.getMonth() + 3); // Fetch events for the next 3 months

    calendarApiUrl.searchParams.set('timeMin', timeMin.toISOString());
    calendarApiUrl.searchParams.set('timeMax', timeMax.toISOString());
    calendarApiUrl.searchParams.set('maxResults', '100');
    calendarApiUrl.searchParams.set('singleEvents', 'true');
    calendarApiUrl.searchParams.set('orderBy', 'startTime');

    console.log('Fetching events from Google Calendar API...');
    const calendarResponse = await fetch(calendarApiUrl.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!calendarResponse.ok) {
        const errorBody = await calendarResponse.json();
        console.error('Google Calendar API error:', errorBody);
        
        let errorMessage = 'Failed to fetch calendar events.';
        if (calendarResponse.status === 401) {
            errorMessage = 'Your Google authentication has expired. Please sign out and sign back in with Google.';
        } else if (
          calendarResponse.status === 403 &&
          errorBody?.error?.message?.includes('Google Calendar API has not been used')
        ) {
          errorMessage = 'The Google Calendar API is not enabled for your project.';
        }
        
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 200, // Return 200 with error in body
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    const events = await calendarResponse.json();
    console.log(`Fetched ${events.items.length} events.`);

    return new Response(JSON.stringify(events.items || []), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Function error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
