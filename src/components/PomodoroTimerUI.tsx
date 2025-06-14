
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

const PomodoroTimerUI: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Pomodoro Timer</CardTitle>
        <Timer className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="text-6xl font-bold text-primary">25:00</div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" aria-label="Start timer">
            <Play className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Pause timer">
            <Pause className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Reset timer">
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">Stay focused!</p>
      </CardContent>
    </Card>
  );
};

export default PomodoroTimerUI;
