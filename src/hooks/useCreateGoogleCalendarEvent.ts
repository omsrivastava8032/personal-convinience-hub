
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGoogleCalendarEvent } from '@/services/googleCalendarService';
import { toast } from 'sonner';
import { CalendarEvent } from '@/types/google-calendar';

type CreateEventVariables = Parameters<typeof createGoogleCalendarEvent>[0];

export const useCreateGoogleCalendarEvent = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();

  return useMutation<CalendarEvent, Error, CreateEventVariables>({
    mutationFn: createGoogleCalendarEvent,
    onSuccess: (data) => {
      toast.success(`Event "${data.summary}" created successfully!`);
      queryClient.invalidateQueries({ queryKey: ['googleCalendarEvents'] });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: Error) => {
      toast.error(`Failed to create event: ${error.message}`);
    },
  });
};
