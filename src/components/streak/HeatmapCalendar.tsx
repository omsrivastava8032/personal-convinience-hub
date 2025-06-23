
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useStreakTracker } from '@/hooks/useStreakTracker';

interface HeatmapDay {
  date: string;
  count: number;
  level: number;
}

const HeatmapCalendar: React.FC = () => {
  const { dailyStats } = useStreakTracker();

  const generateCalendarData = (): HeatmapDay[] => {
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    const days: HeatmapDay[] = [];
    const current = new Date(oneYearAgo);
    
    // Create map for quick lookup
    const statsMap = new Map();
    dailyStats.forEach(stat => {
      statsMap.set(stat.date, stat.problems_solved);
    });
    
    while (current <= today) {
      const dateStr = current.toISOString().split('T')[0];
      const count = statsMap.get(dateStr) || 0;
      const level = count === 0 ? 0 : Math.min(Math.ceil(count / 2), 4);
      
      days.push({
        date: dateStr,
        count,
        level
      });
      
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const getColorClass = (level: number): string => {
    switch (level) {
      case 0: return 'bg-gray-100 dark:bg-gray-800';
      case 1: return 'bg-green-200 dark:bg-green-900';
      case 2: return 'bg-green-300 dark:bg-green-700';
      case 3: return 'bg-green-400 dark:bg-green-600';
      case 4: return 'bg-green-500 dark:bg-green-500';
      default: return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  const calendarData = generateCalendarData();
  const weeks: HeatmapDay[][] = [];
  
  // Group days into weeks
  for (let i = 0; i < calendarData.length; i += 7) {
    weeks.push(calendarData.slice(i, i + 7));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Activity Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-53 gap-1 text-xs">
            {weeks.map((week, weekIndex) => 
              week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-3 h-3 rounded-sm ${getColorClass(day.level)} hover:ring-2 hover:ring-green-400 cursor-pointer transition-all`}
                  title={`${day.date}: ${day.count} problems solved`}
                />
              ))
            )}
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Less</span>
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map(level => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${getColorClass(level)}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeatmapCalendar;
