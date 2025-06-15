
import React from 'react';
import PomodoroTimer from './PomodoroTimer';
import WorkingOn from './WorkingOn';
import TodoList from './TodoList';
import WeatherWidget from './WeatherWidget';

const TodaysSnapshot: React.FC = () => {
  return (
    <section>
      <h2 className="text-3xl font-bold tracking-tight mb-6 text-center sm:text-left">Today's Snapshot</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="animate-fade-in" style={{ animationDelay: "100ms", animationFillMode: "backwards" }}>
          <WorkingOn />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "200ms", animationFillMode: "backwards" }}>
          <TodoList />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "300ms", animationFillMode: "backwards" }}>
          <PomodoroTimer />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "400ms", animationFillMode: "backwards" }}>
          <WeatherWidget />
        </div>
      </div>
    </section>
  );
};

export default TodaysSnapshot;
