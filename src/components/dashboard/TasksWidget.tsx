
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

const TasksWidget: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
        setNewTask('');
    };

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <div className="flex flex-col h-full">
            <form onSubmit={addTask} className="flex gap-2 mb-4">
                <Input
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a task..."
                    className="bg-black/20 border-white/10"
                />
                <Button type="submit" size="icon" variant="secondary">
                    <Plus className="h-4 w-4" />
                </Button>
            </form>
            <ScrollArea className="flex-grow pr-4">
                <div className="space-y-2">
                    {tasks.map(task => (
                        <div key={task.id} className="flex items-center gap-2 group">
                            <Checkbox
                                checked={task.completed}
                                onCheckedChange={() => toggleTask(task.id)}
                            />
                            <span className={`flex-grow text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                {task.text}
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => deleteTask(task.id)}
                            >
                                <Trash2 className="h-3 w-3 text-destructive" />
                            </Button>
                        </div>
                    ))}
                    {tasks.length === 0 && (
                        <p className="text-center text-muted-foreground text-sm py-4">No tasks yet.</p>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
};

export default TasksWidget;
