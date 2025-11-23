
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { useGoogleCalendarEvents } from '@/hooks/useGoogleCalendarEvents';
import { Loader2 } from 'lucide-react';

const CalendarWidget: React.FC = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const { data: events, isLoading, error } = useGoogleCalendarEvents();

    // Filter events for the selected date
    const selectedDateEvents = events?.filter(event => {
        const eventDate = new Date(event.start.dateTime || event.start.date);
        return date &&
            eventDate.getDate() === date.getDate() &&
            eventDate.getMonth() === date.getMonth() &&
            eventDate.getFullYear() === date.getFullYear();
    });

    return (
        <div className="flex flex-col md:flex-row gap-6 h-full">
            <div className="flex-shrink-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border border-white/10 bg-black/20"
                />
            </div>
            <div className="flex-grow space-y-4">
                <h3 className="text-lg font-semibold">Events for {date?.toLocaleDateString()}</h3>
                <Card className="bg-black/20 border-white/10 h-[300px] overflow-y-auto">
                    <CardContent className="p-4">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-full">
                                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                            </div>
                        ) : error ? (
                            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                                <p className="text-destructive text-sm font-medium mb-2">Failed to load events.</p>
                                <p className="text-xs text-muted-foreground">
                                    If you just signed up, please <span className="font-bold text-primary">Sign Out</span> and <span className="font-bold text-primary">Sign In</span> again to complete the Google Calendar linking.
                                </p>
                            </div>
                        ) : selectedDateEvents && selectedDateEvents.length > 0 ? (
                            <ul className="space-y-3">
                                {selectedDateEvents.map((event: any) => (
                                    <li key={event.id} className="p-3 rounded-md bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                        <p className="font-medium text-sm">{event.summary}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(event.start.dateTime || event.start.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center text-muted-foreground h-full flex flex-col justify-center items-center">
                                <p>No events scheduled.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CalendarWidget;
