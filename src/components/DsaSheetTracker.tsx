
import React, { useState } from 'react';
import { useDsaTracker } from '@/hooks/useDsaTracker';
import TrackerHeader from './dsa/TrackerHeader';
import TrackerFilters from './dsa/TrackerFilters';
import ProblemList from './dsa/ProblemList';
import TrackerStats from './dsa/TrackerStats';

const DsaSheetTracker: React.FC = () => {
  const [currentView, setCurrentView] = useState<'list' | 'stats'>('list');
  const {
    filteredProblems,
    selectedTopic,
    setSelectedTopic,
    selectedDifficulty,
    setSelectedDifficulty,
    searchTerm,
    setSearchTerm,
    showCompleted,
    setShowCompleted,
    toggleProblem,
    toggleStar,
    problemData,
    stats,
  } = useDsaTracker();

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <TrackerHeader
        stats={stats}
        currentView={currentView}
        setCurrentView={setCurrentView}
        topicCount={Object.keys(problemData).length}
      />

      {currentView === 'list' ? (
        <>
          <TrackerFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            showCompleted={showCompleted}
            setShowCompleted={setShowCompleted}
            topicKeys={Object.keys(problemData)}
            filteredProblemCount={filteredProblems.length}
            totalProblemCount={stats.totalProblems}
          />
          <ProblemList
            problems={filteredProblems}
            toggleProblem={toggleProblem}
            toggleStar={toggleStar}
            getDifficultyColor={getDifficultyColor}
          />
        </>
      ) : (
        <TrackerStats
          topicStats={stats.topicStats}
          difficultyStats={stats.difficultyStats}
        />
      )}
    </div>
  );
};

export default DsaSheetTracker;
