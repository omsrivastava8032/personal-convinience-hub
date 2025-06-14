
import React from 'react';
import Auth from '@/components/Auth';
import GoogleCalendar from '@/components/GoogleCalendar';

const CalendarPage: React.FC = () => {
    return (
        <div className="container mx-auto py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight">My Calendar</h1>
                <p className="text-muted-foreground mt-2">A snapshot of your upcoming events from Google Calendar.</p>
            </div>
            <Auth>
                <GoogleCalendar />
            </Auth>
        </div>
    );
};

export default CalendarPage;
