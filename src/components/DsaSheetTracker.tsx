
import React, { useState } from 'react';
import { useDsaTracker } from '@/hooks/useDsaTracker';
import TrackerHeader from './dsa/TrackerHeader';
import TrackerFilters from './dsa/TrackerFilters';
import ProblemList from './dsa/ProblemList';
import TrackerStats from './dsa/TrackerStats';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const DsaSheetTracker: React.FC = () => {
  const navigate = useNavigate();
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
    paginatedProblems,
    totalPages,
    currentPage,
    setCurrentPage,
    isAuthenticated,
  } = useDsaTracker();

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPaginationItems = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const sideWidth = 1;
    const pages: (string | number)[] = [];

    if (currentPage > sideWidth + 2) {
      pages.push(1);
      pages.push('...');
    } else {
      for (let i = 1; i < currentPage; i++) {
        pages.push(i);
      }
    }

    for (let i = currentPage - sideWidth; i <= currentPage + sideWidth; i++) {
      if (i > 0 && i <= totalPages) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
    }

    if (currentPage < totalPages - sideWidth - 1) {
      pages.push('...');
      pages.push(totalPages);
    } else {
      for (let i = currentPage + 1; i <= totalPages; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
    }
    
    return pages.filter((v,i,a) => a.indexOf(v) === i); // unique
  };

  // Show login prompt if user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto p-2 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          <LogIn className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Authentication Required
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Please log in to track your DSA progress. Your progress will be saved and synced across all your devices.
          </p>
          <Button onClick={() => navigate('/auth')} className="inline-flex items-center">
            <LogIn className="mr-2 h-4 w-4" />
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

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
            problems={paginatedProblems}
            toggleProblem={toggleProblem}
            toggleStar={toggleStar}
            getDifficultyColor={getDifficultyColor}
          />
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(Math.max(1, currentPage - 1));
                      }}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  {getPaginationItems().map((item, index) => (
                    <PaginationItem key={`${item}-${index}`}>
                      {typeof item === 'string' ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          href="#"
                          isActive={item === currentPage}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(item);
                          }}
                        >
                          {item}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(Math.min(totalPages, currentPage + 1));
                      }}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
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
