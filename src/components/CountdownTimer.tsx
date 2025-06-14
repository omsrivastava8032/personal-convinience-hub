
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft | null => {
    const difference = +new Date('2026-03-01T00:00:00') - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return null;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatUnit = (value: number) => String(value).padStart(2, '0');

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader className="items-center pb-2">
        <CardTitle className="text-xl font-semibold tracking-tight text-center">Countdown to Mar 1, 2026</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {timeLeft ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center tabular-nums">
            <div className="flex flex-col p-4 rounded-lg bg-secondary/50">
              <div className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/60">{timeLeft.days}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Days</div>
            </div>
            <div className="flex flex-col p-4 rounded-lg bg-secondary/50">
              <div className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/60">{formatUnit(timeLeft.hours)}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Hours</div>
            </div>
            <div className="flex flex-col p-4 rounded-lg bg-secondary/50">
              <div className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/60">{formatUnit(timeLeft.minutes)}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Minutes</div>
            </div>
            <div className="flex flex-col p-4 rounded-lg bg-secondary/50">
              <div className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/60">{formatUnit(timeLeft.seconds)}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Seconds</div>
            </div>
          </div>
        ) : (
          <p className="text-center text-xl text-muted-foreground py-10">The time has come!</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CountdownTimer;
