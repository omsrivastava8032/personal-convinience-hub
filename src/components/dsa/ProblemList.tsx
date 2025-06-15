
import React from 'react';
import { CheckCircle, Circle, Star } from 'lucide-react';
import { Problem } from '@/types/dsa';

interface ProblemListProps {
  problems: Problem[];
  toggleProblem: (id: string) => void;
  toggleStar: (id: string) => void;
  getDifficultyColor: (difficulty: string) => string;
}

const ProblemList: React.FC<ProblemListProps> = ({ problems, toggleProblem, toggleStar, getDifficultyColor }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Problem</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Topic</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {problems.map((problem) => (
              <tr key={problem.id} className={`transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${problem.completed ? 'bg-green-50 dark:bg-green-900/20' : ''}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleProblem(problem.id)}
                      className="text-gray-400 hover:text-green-600 transition-colors"
                    >
                      {problem.completed ? (
                        <CheckCircle className="text-green-600" size={20} />
                      ) : (
                        <Circle size={20} />
                      )}
                    </button>
                    <div>
                      <div className={`text-sm font-medium ${problem.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                        {problem.name}
                      </div>
                      {problem.completedDate && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Completed: {problem.completedDate}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{problem.topic}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    problem.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}>
                    {problem.completed ? 'Completed' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleStar(problem.id)}
                    className={`p-1 rounded transition-colors ${
                      problem.starred ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-400 hover:text-yellow-500'
                    }`}
                  >
                    <Star size={16} fill={problem.starred ? 'currentColor' : 'none'} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {problems.length === 0 && (
          <div className="text-center p-6 text-gray-500 dark:text-gray-400">
              No problems match the current filters.
          </div>
      )}
    </div>
  );
};

export default ProblemList;
