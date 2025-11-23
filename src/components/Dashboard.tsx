
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CheckSquare, StickyNote } from 'lucide-react';
import CalendarWidget from './dashboard/CalendarWidget';
import TasksWidget from './dashboard/TasksWidget';
import NotesWidget from './dashboard/NotesWidget';

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <header className="mb-8">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    Productivity Hub
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Manage your schedule, tasks, and ideas in one place.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Calendar Section - Spans 8 columns on large screens */}
                <div className="lg:col-span-8 space-y-6">
                    <Card className="glass-card h-full min-h-[500px]">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Calendar className="h-5 w-5 text-primary" />
                                Schedule
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CalendarWidget />
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Section - Spans 4 columns on large screens */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Tasks Widget */}
                    <Card className="glass-card h-[400px] flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <CheckSquare className="h-5 w-5 text-green-400" />
                                Tasks
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow overflow-hidden">
                            <TasksWidget />
                        </CardContent>
                    </Card>

                    {/* Notes Widget */}
                    <Card className="glass-card h-[400px] flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <StickyNote className="h-5 w-5 text-yellow-400" />
                                Quick Notes
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow overflow-hidden">
                            <NotesWidget />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
