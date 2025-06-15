
import React from 'react';
import { Search } from 'lucide-react';

interface TrackerFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (difficulty: string) => void;
  showCompleted: boolean;
  setShowCompleted: (show: boolean) => void;
  topicKeys: string[];
  filteredProblemCount: number;
  totalProblemCount: number;
}

const TrackerFilters: React.FC<TrackerFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedTopic,
  setSelectedTopic,
  selectedDifficulty,
  setSelectedDifficulty,
  showCompleted,
  setShowCompleted,
  topicKeys,
  filteredProblemCount,
  totalProblemCount,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 mb-6 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Problems</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search problems..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Topic</label>
          <select
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            <option value="All">All Topics</option>
            {topicKeys.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
          <select
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="flex items-end">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Show completed</span>
          </label>
        </div>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredProblemCount} of {totalProblemCount} problems
      </div>
    </div>
  );
};

export default TrackerFilters;
