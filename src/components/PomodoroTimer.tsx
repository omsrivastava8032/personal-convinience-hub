
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

const POMODORO_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;

const PomodoroTimer: React.FC = () => {
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [time, setTime] = useState(POMODORO_TIME);
  const [isActive, setIsActive] = useState(false);

  const getTimeForMode = useCallback((currentMode: TimerMode) => {
    switch (currentMode) {
      case 'pomodoro':
        return POMODORO_TIME;
      case 'shortBreak':
        return SHORT_BREAK_TIME;
      case 'longBreak':
        return LONG_BREAK_TIME;
      default:
        return POMODORO_TIME;
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      // TODO: Add a more noticeable notification
      setIsActive(false);
      const nextMode = mode === 'pomodoro' ? 'shortBreak' : 'pomodoro';
      setMode(nextMode);
      setTime(getTimeForMode(nextMode));
    }

    return () => clearInterval(interval);
  }, [isActive, time, mode, getTimeForMode]);
  
  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTime(getTimeForMode(mode));
  }, [mode, getTimeForMode]);

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setTime(getTimeForMode(newMode));
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Pomodoro Timer</CardTitle>
        <Timer className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4 pt-4">
        <div className="flex space-x-2">
          <Button variant={mode === 'pomodoro' ? 'default' : 'outline'} size="sm" onClick={() => switchMode('pomodoro')}>Work</Button>
          <Button variant={mode === 'shortBreak' ? 'default' : 'outline'} size="sm" onClick={() => switchMode('shortBreak')}>Short Break</Button>
          <Button variant={mode === 'longBreak' ? 'default' : 'outline'} size="sm" onClick={() => switchMode('longBreak')}>Long Break</Button>
        </div>
        <div className="text-6xl font-bold text-primary tabular-nums">
          {formatTime(time)}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={toggleTimer} aria-label={isActive ? 'Pause timer' : 'Start timer'}>
            {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button variant="outline" size="icon" onClick={resetTimer} aria-label="Reset timer">
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{
            mode === 'pomodoro' ? 'Time to focus!' : 'Time for a break!'
        }</p>
      </CardContent>
    </Card>
  );
};

export default PomodoroTimer;
