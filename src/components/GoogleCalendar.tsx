
import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import { useGoogleCalendarEvents } from '@/hooks/useGoogleCalendarEvents';
import { CalendarErrorDisplay } from './calendar/CalendarErrorDisplay';
import { CalendarLoading } from './calendar/CalendarLoading';
import { CalendarView } from './calendar/CalendarView';

const GoogleCalendar: React.FC = () => {
  const { session, user } = useAuth();
  const { data: events, isLoading, error, isError } = useGoogleCalendarEvents();

  if (!session || !user) {
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
    return <CalendarLoading />;
  }

  if (isError && error) {
    return <CalendarErrorDisplay error={error} />;
  }

  if (events) {
    return <CalendarView events={events} />;
  }

  return null; // Should not be reached if useQuery is configured correctly
};

export default GoogleCalendar;
