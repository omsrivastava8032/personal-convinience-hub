
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlarmClock } from 'lucide-react';

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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Countdown to Mar 1, 2026</CardTitle>
        <AlarmClock className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="pt-4">
        {timeLeft ? (
          <div className="grid grid-cols-4 gap-2 text-center tabular-nums">
            <div>
              <div className="text-2xl font-bold">{timeLeft.days}</div>
              <div className="text-xs text-muted-foreground">Days</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{formatUnit(timeLeft.hours)}</div>
              <div className="text-xs text-muted-foreground">Hours</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{formatUnit(timeLeft.minutes)}</div>
              <div className="text-xs text-muted-foreground">Minutes</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{formatUnit(timeLeft.seconds)}</div>
              <div className="text-xs text-muted-foreground">Seconds</div>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">The time has come!</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CountdownTimer;
