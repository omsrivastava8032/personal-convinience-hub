
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ListTodo } from 'lucide-react';

const WorkingOn: React.FC = () => {
  const [task, setTask] = useState('');

  useEffect(() => {
    const savedTask = localStorage.getItem('working-on-task');
    if (savedTask) {
      setTask(savedTask);
    }
  }, []);

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
    localStorage.setItem('working-on-task', e.target.value);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Working On</CardTitle>
        <ListTodo className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <Input
          placeholder="What are you focused on today?"
          value={task}
          onChange={handleTaskChange}
          className="text-sm"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Your focus for the day is saved locally.
        </p>
      </CardContent>
    </Card>
  );
};

export default WorkingOn;
