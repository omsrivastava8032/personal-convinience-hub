
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { format, parseISO, isSameDay } from 'date-fns';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';

interface CalendarEvent {
  id: string;
  summary: string;
  htmlLink: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
}

const fetchGoogleCalendarEvents = async () => {
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

const GoogleCalendar: React.FC = () => {
  const navigate = useNavigate();
  const { session, user } = useAuth();
  
  console.log('GoogleCalendar component - session:', !!session, 'user:', !!user);
  
  const { data: events, isLoading, error, isError } = useQuery<CalendarEvent[], Error>({
    queryKey: ['googleCalendarEvents'],
    queryFn: fetchGoogleCalendarEvents,
    retry: false, // Don't retry on failure, better to show error message
    enabled: !!session && !!user, // Only run query if user is authenticated
  });

  const eventDays = React.useMemo(() => {
    if (!events) return [];
    return events.map(event => {
      const dateStr = event.start.dateTime || event.start.date;
      return dateStr ? parseISO(dateStr) : null;
    }).filter((d): d is Date => d !== null);
  }, [events]);

  const [selectedDay, setSelectedDay] = React.useState<Date | undefined>(new Date());

  const eventsForSelectedDay = React.useMemo(() => {
    if (!events || !selectedDay) return [];
    return events.filter(event => {
      const eventDateStr = event.start.dateTime || event.start.date;
      if (!eventDateStr) return false;
      const eventDate = parseISO(eventDateStr);
      return isSameDay(eventDate, selectedDay);
    });
  }, [events, selectedDay]);

  if (!session || !user) {
    console.log('No session or user found');
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Authentication Required</AlertTitle>
        <AlertDescription>
          Please sign in to view your Google Calendar events.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    console.log('Loading calendar events...');
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
        <p className="ml-4 text-lg">Loading your calendar events...</p>
      </div>
    );
  }

  if (isError) {
    console.error('Calendar error:', error);
    const isNotLinked = error.message === 'Google Calendar not linked.';
    return (
      <Alert variant="destructive" className="max-w-xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Oops! Something went wrong.</AlertTitle>
        <AlertDescription>
          {isNotLinked 
            ? "It seems your Google Calendar is not linked. Please sign out and sign back in with Google, ensuring you grant calendar access."
            : `Failed to load calendar events: ${error.message}`
          }
          {isNotLinked && (
             <Button
                variant="link"
                className="p-0 h-auto mt-2 text-destructive"
                onClick={async () => {
                    await supabase.auth.signOut();
                    navigate('/auth');
                }}
             >
                Click here to sign out and re-authenticate.
             </Button>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  console.log('Rendering calendar with events:', events?.length || 0);

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardContent className="p-0 flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDay}
            onSelect={setSelectedDay}
            className="p-3"
            modifiers={{ hasEvent: eventDays }}
            modifiersClassNames={{
              hasEvent: 'has-event-marker',
            }}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            Events for {selectedDay ? format(selectedDay, 'PPP') : 'Today'}
          </CardTitle>
          <CardDescription>You have {eventsForSelectedDay.length} event(s) today.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-h-[400px] overflow-y-auto">
          {eventsForSelectedDay.length > 0 ? (
            <ul className="space-y-3">
              {eventsForSelectedDay.map(event => (
                <li key={event.id} className="p-3 border rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{event.summary}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.start.dateTime ? format(parseISO(event.start.dateTime), 'p') : 'All day'}
                      {event.end.dateTime && event.start.dateTime && ` - ${format(parseISO(event.end.dateTime), 'p')}`}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <a href={event.htmlLink} target="_blank" rel="noopener noreferrer" aria-label="View event in Google Calendar">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center py-8">No events scheduled for this day.</p>
          )}
        </CardContent>
      </Card>
      <style>{`
        .has-event-marker {
          position: relative;
        }
        .has-event-marker::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: hsl(var(--primary));
        }
        .rdp-day_selected.has-event-marker::after {
            background-color: hsl(var(--primary-foreground));
        }
      `}</style>
    </div>
  );
};

export default GoogleCalendar;
