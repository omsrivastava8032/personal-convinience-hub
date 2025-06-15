
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface CalendarErrorDisplayProps {
  error: Error;
}

export const CalendarErrorDisplay: React.FC<CalendarErrorDisplayProps> = ({ error }) => {
  const navigate = useNavigate();
  const isNotLinked = error.message === 'Google Calendar not linked.';
  const needsReAuth = error.message.includes('authentication has expired');
  const apiNotEnabled = error.message.includes('The Google Calendar API is not enabled');

  return (
    <Alert variant="destructive" className="max-w-xl mx-auto">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{apiNotEnabled ? 'Action Required' : 'Oops! Something went wrong.'}</AlertTitle>
      <AlertDescription>
        {isNotLinked
          ? "It seems your Google Calendar is not linked. Please sign out and sign back in with Google, ensuring you grant calendar access."
          : needsReAuth
          ? "Your Google authentication seems to have expired. Please re-authenticate to see your calendar."
          : apiNotEnabled
          ? <>
            The Google Calendar API needs to be enabled for your project. 
            Please visit the{' '}
            <a
              href="https://console.cloud.google.com/apis/library/calendar-json.googleapis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline hover:text-destructive-foreground"
            >
              Google Cloud Console
            </a>{' '}
            to enable it, then refresh this page.
          </>
          : `Failed to load calendar events: ${error.message}`
        }
        {(isNotLinked || needsReAuth) && (
           <Button
              variant="link"
              className="p-0 h-auto mt-2 text-destructive block hover:text-destructive-foreground"
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
};
