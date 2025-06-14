
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import PomodoroTimer from './PomodoroTimer';
import { CalendarDays } from 'lucide-react';
import WorkingOn from './WorkingOn';

const TodaysSnapshot: React.FC = () => {
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-6 text-center sm:text-left">Today's Snapshot</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <WorkingOn />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Upcoming Events</CardTitle>
            <CalendarDays className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Team Meeting - Tomorrow, 10 AM</p>
            <p className="text-xs mt-1">Project Demo - Next Week</p>
          </CardContent>
        </Card>
        <PomodoroTimer />
      </div>
    </section>
  );
};

export default TodaysSnapshot;
