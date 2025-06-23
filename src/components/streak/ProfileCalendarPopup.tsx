
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Snowflake, Calendar } from 'lucide-react';
import { useStreakTracker } from '@/hooks/useStreakTracker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface HeatmapDay {
  date: string;
  count: number;
  level: number;
}

interface ProfileCalendarPopupProps {
  children: React.ReactNode;
}

const ProfileCalendarPopup: React.FC<ProfileCalendarPopupProps> = ({ children }) => {
  const { currentStreak, bestStreak, freezeTokens, lastSolveDate, dailyStats } = useStreakTracker();

  const isStreakActive = () => {
    if (!lastSolveDate) return false;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    return lastSolveDate === today || lastSolveDate === yesterday;
  };

  const generateCalendarData = (): HeatmapDay[] => {
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    
    const days: HeatmapDay[] = [];
    const current = new Date(threeMonthsAgo);
    
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
  
  // Group days into weeks (7 days each)
  for (let i = 0; i < calendarData.length; i += 7) {
    weeks.push(calendarData.slice(i, i + 7));
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Flame className={`h-4 w-4 ${isStreakActive() ? 'text-orange-500' : 'text-gray-400'}`} />
                {currentStreak} day streak
              </CardTitle>
              {freezeTokens > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                  <Snowflake className="h-3 w-3" />
                  {freezeTokens}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
              <Calendar className="h-3 w-3" />
              Best: {bestStreak} days
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Last 3 months
              </div>
              
              {weeks.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {weeks.map((week, weekIndex) => 
                    <div key={weekIndex} className="flex flex-col gap-1">
                      {week.map((day, dayIndex) => (
                        <div
                          key={`${weekIndex}-${dayIndex}`}
                          className={`w-2.5 h-2.5 rounded-sm ${getColorClass(day.level)} hover:ring-1 hover:ring-green-400 cursor-pointer transition-all`}
                          title={`${day.date}: ${day.count} problems solved`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-xs text-gray-500 text-center py-4">
                  No activity data yet. Start solving problems!
                </div>
              )}
              
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>Less</span>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map(level => (
                    <div
                      key={level}
                      className={`w-2.5 h-2.5 rounded-sm ${getColorClass(level)}`}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>

              {!isStreakActive() && currentStreak === 0 && (
                <p className="text-xs text-amber-600 dark:text-amber-400 text-center">
                  💡 Solve a problem today to start your streak!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileCalendarPopup;
