
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Snowflake, Calendar } from 'lucide-react';
import { useStreakTracker } from '@/hooks/useStreakTracker';

const StreakWidget: React.FC = () => {
  const { currentStreak, bestStreak, freezeTokens, lastSolveDate } = useStreakTracker();

  const isStreakActive = () => {
    if (!lastSolveDate) return false;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    return lastSolveDate === today || lastSolveDate === yesterday;
  };

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Flame className={`h-5 w-5 ${isStreakActive() ? 'text-orange-500' : 'text-gray-400'}`} />
          Current Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {currentStreak}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {currentStreak === 1 ? 'day' : 'days'}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600 dark:text-gray-400">
              Best: {bestStreak} days
            </span>
          </div>
          
          {freezeTokens > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Snowflake className="h-3 w-3" />
              {freezeTokens} {freezeTokens === 1 ? 'freeze' : 'freezes'}
            </Badge>
          )}
        </div>

        {!isStreakActive() && currentStreak === 0 && (
          <p className="text-xs text-amber-600 dark:text-amber-400">
            💡 Solve a problem today to start your streak!
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StreakWidget;
