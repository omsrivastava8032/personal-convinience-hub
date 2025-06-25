
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ListTodo, Loader2 } from 'lucide-react';
import { useDailySnapshot } from '@/hooks/useDailySnapshot';
import { useAuth } from '@/providers/AuthProvider';

const WorkingOn: React.FC = () => {
  const { user } = useAuth();
  const { currentFocus, loading, saving, saveFocus } = useDailySnapshot();

  const handleFocusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFocus = e.target.value;
    saveFocus(newFocus);
  };

  if (!user) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Working On</CardTitle>
          <ListTodo className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground text-center py-4">
            Login to track your daily focus
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          Working On
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
        </CardTitle>
        <ListTodo className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-2">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : (
          <Input
            placeholder="What are you focused on today?"
            value={currentFocus}
            onChange={handleFocusChange}
            className="text-sm"
            disabled={saving}
          />
        )}
        <p className="text-xs text-muted-foreground mt-2">
          Your focus for the day is saved to your account.
        </p>
      </CardContent>
    </Card>
  );
};

export default WorkingOn;
