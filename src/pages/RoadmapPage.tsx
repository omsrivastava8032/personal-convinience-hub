
import React from 'react';
import StudyRoadmap from '@/components/StudyRoadmap';

const RoadmapPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Complete Study Roadmap</h1>
        <p className="text-lg text-muted-foreground">June 2025 - March 2026 | 9 Months Intensive Journey</p>
      </header>
      
      <StudyRoadmap />
    </div>
  );
};

export default RoadmapPage;
