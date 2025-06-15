
import React from 'react';
import { Loader2 } from 'lucide-react';

export const CalendarLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="animate-spin h-8 w-8 text-primary" />
      <p className="ml-4 text-lg">Loading your calendar events...</p>
    </div>
  );
};
