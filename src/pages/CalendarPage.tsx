
import React from 'react';
import Auth from '@/components/Auth';
import GoogleCalendar from '@/components/GoogleCalendar';

const CalendarPage: React.FC = () => {
    return (
        <div className="container mx-auto py-8">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">My Calendar</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">A snapshot of your upcoming events from Google Calendar, integrated directly into your hub.</p>
            </div>
            <Auth>
                <GoogleCalendar />
            </Auth>
        </div>
    );
};

export default CalendarPage;
