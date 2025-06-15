
import { useQuery } from '@tanstack/react-query';
import { fetchGoogleCalendarEvents } from '@/services/googleCalendarService';
import { useAuth } from '@/providers/AuthProvider';
import { CalendarEvent } from '@/types/google-calendar';

export const useGoogleCalendarEvents = () => {
  const { session, user } = useAuth();
  
  return useQuery<CalendarEvent[], Error>({
    queryKey: ['googleCalendarEvents'],
    queryFn: fetchGoogleCalendarEvents,
    retry: false, // Don't retry on failure, better to show error message
    enabled: !!session && !!user, // Only run query if user is authenticated
  });
};
