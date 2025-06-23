
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStreakTracker } from '@/hooks/useStreakTracker';
import { formatDistanceToNow } from 'date-fns';

const BadgeGallery: React.FC = () => {
  const { userBadges } = useStreakTracker();

  if (userBadges.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Badge Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-4">
            Start solving problems to earn your first badge! 🚀
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Badge Collection
          <Badge variant="secondary">{userBadges.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userBadges.map((badge) => (
            <div
              key={badge.id}
              className="flex items-center gap-3 p-3 rounded-lg border bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950"
            >
              <div className="text-2xl">{badge.icon}</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm truncate">{badge.name}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {badge.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Earned {formatDistanceToNow(new Date(badge.awarded_at), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgeGallery;
