
import { supabase } from '@/integrations/supabase/client';
import { CalendarEvent } from '@/types/google-calendar';

export const fetchGoogleCalendarEvents = async (): Promise<CalendarEvent[]> => {
  console.log('Fetching Google Calendar events...');
  const { data, error } = await supabase.functions.invoke('get-google-calendar-events');

  if (error) {
    console.error('Supabase function error:', error);
    // Handle Supabase Edge Function-specific errors
    if (error.message.includes("Function not found")) {
      throw new Error("The calendar feature is not available right now. Please try again later.");
    }
    throw new Error(error.message);
  }

  // Handle errors returned from within the function logic
  if (data?.error) {
    console.error('Function returned error:', data.error);
    throw new Error(data.error);
  }

  if (!Array.isArray(data)) {
    console.error("Unexpected response format:", data);
    throw new Error('Received an unexpected response from the server.');
  }

  console.log('Successfully fetched calendar events:', data.length);
  return data as CalendarEvent[];
};

type CreateEventInput = {
  summary: string;
  description?: string;
  startDateTime: string;
  endDateTime: string;
};

export const createGoogleCalendarEvent = async (event: CreateEventInput): Promise<CalendarEvent> => {
  console.log('Creating Google Calendar event...', event);

  const newEventPayload = {
    summary: event.summary,
    description: event.description,
    start: {
      dateTime: new Date(event.startDateTime).toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: new Date(event.endDateTime).toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  };

  const { data, error } = await supabase.functions.invoke('create-google-calendar-event', {
    body: newEventPayload,
  });

  if (error) {
    console.error('Supabase function error:', error);
    throw new Error(error.message);
  }

  if (data?.error) {
    console.error('Function returned error:', data.error);
    throw new Error(data.error);
  }

  console.log('Successfully created calendar event:', data);
  return data as CalendarEvent;
};
