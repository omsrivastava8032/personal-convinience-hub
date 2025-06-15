
import React from 'react';
import { DifficultyStat, TopicStat } from '@/types/dsa';

interface TrackerStatsProps {
  topicStats: TopicStat[];
  difficultyStats: DifficultyStat[];
}

const TrackerStats: React.FC<TrackerStatsProps> = ({ topicStats, difficultyStats }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Topic-wise Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Topic-wise Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topicStats.map((stat) => (
            <div key={stat.topic} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white">{stat.topic}</h3>
                <span className="text-sm text-gray-600 dark:text-gray-300">{stat.completed}/{stat.total}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stat.percentage}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{stat.percentage}% complete</div>
            </div>
          ))}
        </div>
      </div>

      {/* Difficulty-wise Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Difficulty-wise Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {difficultyStats.map((stat) => (
            <div key={stat.difficulty} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className={`font-medium ${
                  stat.difficulty === 'Easy' ? 'text-green-500' :
                  stat.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {stat.difficulty}
                </h3>
                <span className="text-sm text-gray-600 dark:text-gray-300">{stat.completed}/{stat.total}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    stat.difficulty === 'Easy' ? 'bg-green-500' :
                    stat.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${stat.percentage}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{stat.percentage}% complete</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackerStats;
