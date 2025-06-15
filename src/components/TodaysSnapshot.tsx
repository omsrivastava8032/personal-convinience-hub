
import React from 'react';
import PomodoroTimer from './PomodoroTimer';
import WorkingOn from './WorkingOn';
import TodoList from './TodoList';
import WeatherWidget from './WeatherWidget';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, ListTodo, Timer, Cloud } from 'lucide-react';

const TodaysSnapshot: React.FC = () => {
  return (
    <section>
      <h2 className="text-3xl font-bold tracking-tight mb-6 text-center sm:text-left">Today's Snapshot</h2>
      <Tabs defaultValue="working-on" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-4 bg-transparent p-0 h-auto">
          <TabsTrigger value="working-on" className="flex-col gap-2 p-4 h-auto data-[state=active]:bg-card/80 data-[state=active]:shadow-lg rounded-lg bg-card/60 backdrop-blur-md border border-card-foreground/20 transition-all hover:bg-card/70">
            <Edit className="h-6 w-6 text-primary" />
            <span className="font-medium">Working On</span>
          </TabsTrigger>
          <TabsTrigger value="todo-list" className="flex-col gap-2 p-4 h-auto data-[state=active]:bg-card/80 data-[state=active]:shadow-lg rounded-lg bg-card/60 backdrop-blur-md border border-card-foreground/20 transition-all hover:bg-card/70">
            <ListTodo className="h-6 w-6 text-primary" />
            <span className="font-medium">To-do</span>
          </TabsTrigger>
          <TabsTrigger value="pomodoro" className="flex-col gap-2 p-4 h-auto data-[state=active]:bg-card/80 data-[state=active]:shadow-lg rounded-lg bg-card/60 backdrop-blur-md border border-card-foreground/20 transition-all hover:bg-card/70">
            <Timer className="h-6 w-6 text-primary" />
            <span className="font-medium">Pomodoro</span>
          </TabsTrigger>
          <TabsTrigger value="weather" className="flex-col gap-2 p-4 h-auto data-[state=active]:bg-card/80 data-[state=active]:shadow-lg rounded-lg bg-card/60 backdrop-blur-md border border-card-foreground/20 transition-all hover:bg-card/70">
            <Cloud className="h-6 w-6 text-primary" />
            <span className="font-medium">Weather</span>
          </TabsTrigger>
        </TabsList>
        <div className="mt-6">
          <TabsContent value="working-on" className="animate-fade-in">
            <WorkingOn />
          </TabsContent>
          <TabsContent value="todo-list" className="animate-fade-in">
            <TodoList />
          </TabsContent>
          <TabsContent value="pomodoro" className="animate-fade-in">
            <PomodoroTimer />
          </TabsContent>
          <TabsContent value="weather" className="animate-fade-in">
            <WeatherWidget />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
};

export default TodaysSnapshot;
