
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

console.log(`create-google-calendar-event function started`)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not authenticated' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      })
    }
    console.log('User authenticated:', user.id)

    const { data: integration, error: integrationError } = await supabaseClient
      .from('google_calendar_integrations')
      .select('access_token, expires_at')
      .eq('user_id', user.id)
      .single()

    if (integrationError || !integration) {
      console.error('Error fetching google integration:', integrationError)
      return new Response(JSON.stringify({ error: 'Google Calendar not integrated.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }
    console.log('Found Google Calendar integration for user.')

    // NOTE: In a production app, you would add logic here to handle token refreshing.

    const eventDetails = await req.json()
    console.log('Received event details:', eventDetails)

    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${integration.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventDetails),
    })

    const responseData = await response.json()

    if (!response.ok) {
      console.error('Google Calendar API error:', responseData)
      const errorMessage = responseData.error?.message || 'Failed to create calendar event.'
      let userFriendlyError = 'Failed to create calendar event due to a server error.';
      if (response.status === 401) {
          userFriendlyError = 'Your Google authentication has expired. Please sign out and sign back in with Google.';
      } else if (response.status === 403) {
          if (errorMessage.includes('insufficient authentication scopes')) {
            userFriendlyError = 'You have not granted permission to create calendar events. Please sign out, sign back in with Google, and ensure you grant calendar access.';
          } else {
            userFriendlyError = 'You do not have permission to create this event in Google Calendar.';
          }
      }
      
      return new Response(JSON.stringify({ error: userFriendlyError }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: response.status,
      })
    }

    console.log('Event created successfully:', responseData.id)

    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
