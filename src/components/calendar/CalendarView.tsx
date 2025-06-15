
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { parseISO, isSameDay } from 'date-fns';
import { CalendarEvent } from '@/types/google-calendar';
import { EventList } from './EventList';

interface CalendarViewProps {
  events: CalendarEvent[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ events }) => {
  const [selectedDay, setSelectedDay] = React.useState<Date | undefined>(new Date());

  const eventDays = React.useMemo(() => {
    return events.map(event => {
      const dateStr = event.start.dateTime || event.start.date;
      return dateStr ? parseISO(dateStr) : null;
    }).filter((d): d is Date => d !== null);
  }, [events]);

  const eventsForSelectedDay = React.useMemo(() => {
    if (!selectedDay) return [];
    return events.filter(event => {
      const eventDateStr = event.start.dateTime || event.start.date;
      if (!eventDateStr) return false;
      const eventDate = parseISO(eventDateStr);
      return isSameDay(eventDate, selectedDay);
    });
  }, [events, selectedDay]);

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
      <EventList selectedDay={selectedDay} events={eventsForSelectedDay} />
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
