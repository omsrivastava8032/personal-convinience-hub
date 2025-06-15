
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { CalendarEvent } from '@/types/google-calendar';

interface EventListProps {
  selectedDay: Date | undefined;
  events: CalendarEvent[];
}

export const EventList: React.FC<EventListProps> = ({ selectedDay, events }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Events for {selectedDay ? format(selectedDay, 'PPP') : 'Today'}
        </CardTitle>
        <CardDescription>You have {events.length} event(s) today.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[400px] overflow-y-auto">
        {events.length > 0 ? (
          <ul className="space-y-3">
            {events.map(event => (
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
  );
};
