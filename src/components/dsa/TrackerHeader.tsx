
import React from 'react';
import { BarChart3, Code } from 'lucide-react';
import { DifficultyStat, TopicStat } from '@/types/dsa';

interface TrackerHeaderProps {
  stats: {
    completedProblems: number;
    totalProblems: number;
    progressPercentage: number;
    starredProblems: number;
    topicStats: TopicStat[];
    difficultyStats: DifficultyStat[];
  };
  currentView: string;
  setCurrentView: (view: 'list' | 'stats') => void;
  topicCount: number;
}

const TrackerHeader: React.FC<TrackerHeaderProps> = ({ stats, currentView, setCurrentView, topicCount }) => {
  const { completedProblems, totalProblems, progressPercentage, starredProblems } = stats;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 mb-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">SDE Sheet Problem Tracker</h1>
          <p className="text-gray-600 dark:text-gray-300">Track your progress through the SDE problem sheet</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button
            onClick={() => setCurrentView('list')}
            className={`px-3 py-2 text-sm sm:px-4 sm:py-2 rounded-lg flex items-center space-x-2 ${
              currentView === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
          >
            <Code size={16} />
            <span>Problems</span>
          </button>
          <button
            onClick={() => setCurrentView('stats')}
            className={`px-3 py-2 text-sm sm:px-4 sm:py-2 rounded-lg flex items-center space-x-2 ${
              currentView === 'stats' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
          >
            <BarChart3 size={16} />
            <span>Statistics</span>
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Progress</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{completedProblems}/{totalProblems} ({progressPercentage}%)</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg transform hover:scale-105 transition-transform animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
          <div className="text-2xl font-bold">{completedProblems}</div>
          <div className="text-sm opacity-90">Completed</div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-lg transform hover:scale-105 transition-transform animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
          <div className="text-2xl font-bold">{totalProblems - completedProblems}</div>
          <div className="text-sm opacity-90">Remaining</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg transform hover:scale-105 transition-transform animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}>
          <div className="text-2xl font-bold">{starredProblems}</div>
          <div className="text-sm opacity-90">Starred</div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg transform hover:scale-105 transition-transform animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}>
          <div className="text-2xl font-bold">{topicCount}</div>
          <div className="text-sm opacity-90">Topics</div>
        </div>
      </div>
    </div>
  );
};

export default TrackerHeader;
