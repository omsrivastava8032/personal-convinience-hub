
import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Search, BarChart3, Code, Star } from 'lucide-react';

const DsaSheetTracker = () => {
  // Complete problem list organized by topics
  const problemData = {
    "Learn the Basics": [
      "Know Basic Maths", "Learn Basic Recursion", "Hashing", "Basic STL"
    ],
    "Sorting Techniques": [
      "Selection Sort", "Bubble Sort", "Insertion Sort", "Merge Sort", "Quick Sort", "Heap Sort"
    ],
    "Arrays": [
      "Largest Element in Array", "Second Largest Element", "Check if Array is Sorted", "Remove Duplicates",
      "Left Rotate Array by One", "Left Rotate Array by D places", "Move Zeros to End", "Linear Search",
      "Union of Two Sorted Arrays", "Find Missing Number", "Maximum Consecutive Ones", "Find Single Number",
      "Longest Subarray with Sum K", "Two Sum Problem", "Sort Array of 0s, 1s, 2s", "Majority Element",
      "Maximum Subarray Sum", "Best Time to Buy and Sell Stock", "Rearrange Array by Sign", "Next Permutation",
      "Leader in Array", "Longest Consecutive Sequence", "Set Matrix Zeros", "Rotate Matrix", "Spiral Matrix",
      "Pascal's Triangle", "Majority Element II", "3Sum Problem", "4Sum Problem", "Largest Subarray with 0 Sum",
      "Count Subarrays with XOR K", "Merge Overlapping Intervals", "Merge Two Sorted Arrays", "Find Duplicate Number",
      "Repeat and Missing Number", "Count Inversions", "Reverse Pairs", "Maximum Product Subarray"
    ],
    "Binary Search": [
      "Binary Search Implementation", "Lower and Upper Bound", "Search Insert Position", "Floor and Ceil",
      "First and Last Occurrence", "Count Occurrences", "Search in Rotated Sorted Array I", "Search in Rotated Sorted Array II",
      "Find Minimum in Rotated Sorted Array", "Single Element in Sorted Array", "Find Peak Element", "Square Root of Integer",
      "Nth Root of Integer", "Koko Eating Bananas", "Minimum Days to Make Bouquets", "Find Smallest Divisor",
      "Capacity to Ship Packages", "Kth Missing Positive Number", "Aggressive Cows", "Book Allocation Problem",
      "Painter's Partition", "Minimize Max Distance to Gas Station", "Median of Two Sorted Arrays", "Kth Element of Two Sorted Arrays"
    ],
    "Strings": [
      "Remove Outermost Parentheses", "Reverse Words in String", "Largest Odd Number", "Longest Common Prefix",
      "Isomorphic Strings", "Check Anagrams", "Sort Characters by Frequency", "Maximum Nesting Depth",
      "Roman to Integer", "String to Integer (atoi)", "Longest Palindromic Substring", "Sum of Beauty of Substrings",
      "Reverse Every Word", "Check Rotations", "Valid Anagram", "Group Anagrams", "Longest Repeating Character Replacement",
      "Pattern Matching", "Minimum Window Substring"
    ],
    "Linked List": [
      "Array to Linked List", "Insert Node in LL", "Delete Node in LL", "Find Length of LL", "Search in LL",
      "Delete Head of LL", "Delete Tail of LL", "Insert at Head", "Insert at Tail", "Insert at Kth Position",
      "Delete Kth Node", "Delete Given Node", "Middle of Linked List", "Reverse Linked List", "Detect Loop in LL",
      "Find Loop Starting Point", "Length of Loop", "Check Palindrome LL", "Segregate Odd Even LL", "Remove Nth Node from End",
      "Add Two Numbers", "Add One to LL", "Intersection of Two LL", "Merge Two Sorted LL", "Sort LL",
      "Sort LL of 0s 1s 2s", "Clone LL with Random Pointer", "Rotate LL", "Flatten LL", "Reverse Nodes in k-Group"
    ],
    "Recursion": [
      "Subsequences Generation", "Generate Parentheses", "Print All Permutations", "N-Queens Problem", "Sudoku Solver",
      "Rat in Maze", "Word Search", "M-Coloring Problem", "Palindrome Partitioning", "Subset Sum Problem",
      "Combination Sum", "Combination Sum II", "Word Break", "Expression Add Operators"
    ],
    "Bit Manipulation": [
      "Decimal to Binary", "Binary to Decimal", "1's and 2's Complement", "Check ith Bit", "Set ith Bit",
      "Clear ith Bit", "Toggle ith Bit", "Remove Last Set Bit", "Check Power of 2", "Count Set Bits",
      "Minimum Bit Flips", "Power Set using Bit", "Single Number", "Single Number II", "Single Number III",
      "XOR of Numbers in Range", "Divide Two Integers"
    ],
    "Stack and Queues": [
      "Implement Stack using Array", "Implement Queue using Array", "Stack using Queue", "Queue using Stack",
      "Valid Parentheses", "Next Greater Element", "Next Smaller Element", "Trapping Rain Water", "Sum of Subarray Minimums",
      "Asteroid Collision", "Sliding Window Maximum", "Stock Span Problem", "Next Greater Element II", "Largest Rectangle in Histogram",
      "Maximal Rectangle", "Remove K Digits", "Decode String", "Basic Calculator", "LRU Cache"
    ],
    "Sliding Window": [
      "Max Sum Subarray of Size K", "First Negative in Window", "Count Anagrams", "Max of All Subarrays",
      "Variable Size Window Sum", "Largest Subarray of Sum K", "Longest Substring Without Repeat",
      "Pick Toys", "Minimum Window Substring", "Max Consecutive Ones III"
    ],
    "Heaps": [
      "Min Heap Implementation", "Max Heap Implementation", "Kth Largest Element", "Kth Smallest Element",
      "Sort K Sorted Array", "Merge K Sorted Lists", "Replace with Rank", "Task Scheduler", "Hands of Straights",
      "Design Twitter", "Connect Ropes with Min Cost", "Kth Largest in Stream", "Maximum Sum Combinations",
      "Find Median from Data Stream"
    ],
    "Greedy": [
      "Assign Cookies", "Lemonade Change", "Valid Parenthesis String", "N Meetings in Room", "Jump Game",
      "Jump Game II", "Minimum Platforms", "Job Sequencing", "Fractional Knapsack", "Find Minimum Coins",
      "Activity Selection", "Candy Distribution", "Shortest Job First", "Page Faults in LRU", "Insert Interval",
      "Merge Intervals", "Non-overlapping Intervals"
    ],
    "Binary Trees": [
      "Tree Traversals", "Level Order Traversal", "Iterative Preorder", "Iterative Inorder", "Iterative Postorder",
      "Maximum Depth", "Check Balanced Tree", "Diameter of Tree", "Maximum Path Sum", "Check Identical Trees",
      "Zigzag Traversal", "Boundary Traversal", "Vertical Order Traversal", "Top View", "Bottom View",
      "Right View", "Left View", "Check Symmetric Tree", "Root to Node Path", "LCA of Binary Tree",
      "Maximum Width", "Check Children Sum", "All Nodes at Distance K", "Minimum Time to Burn Tree", "Count Total Nodes",
      "Check Complete Binary Tree", "Construct Tree from Preorder", "Construct Tree from Inorder and Postorder",
      "Serialize and Deserialize", "Morris Traversal", "Flatten Tree to LL"
    ],
    "BST": [
      "Search in BST", "Find Min/Max in BST", "Insert Node in BST", "Delete Node in BST", "Find LCA in BST",
      "Validate BST", "Kth Smallest in BST", "Kth Largest in BST", "Two Sum in BST", "BST from Preorder",
      "Predecessor and Successor", "BST Iterator", "Largest BST in Binary Tree", "Recover BST"
    ],
    "Graphs": [
      "BFS Traversal", "DFS Traversal", "Number of Provinces", "Number of Islands", "Flood Fill", "Rotten Oranges",
      "Detect Cycle in Undirected Graph", "Detect Cycle in Directed Graph", "Topological Sort", "Course Schedule",
      "Course Schedule II", "Alien Dictionary", "Shortest Path in Unweighted Graph", "Dijkstra's Algorithm",
      "Bellman Ford Algorithm", "Floyd Warshall", "MST using Prim's", "MST using Kruskal's", "Disjoint Set Union",
      "Number of Operations to Make Connected", "Most Stones Removed", "Accounts Merge", "Number of Islands II",
      "Bridges in Graph", "Articulation Points", "Kosaraju's Algorithm", "Word Ladder", "Word Ladder II"
    ],
    "Dynamic Programming": [
      "Fibonacci Number", "Climbing Stairs", "Frog Jump", "Frog Jump with K", "Maximum Sum Non Adjacent",
      "House Robber II", "Ninja's Training", "Grid Unique Paths", "Grid Unique Paths II", "Minimum Path Sum",
      "Triangle Path Sum", "Maximum Path Sum", "Minimum Falling Path", "3D DP Problem", "Cherry Pickup",
      "Subset Sum Equal to Target", "Partition Equal Subset Sum", "Partition with Given Difference", "Count Subsets Sum",
      "Coin Change", "Coin Change II", "Unbounded Knapsack", "Rod Cutting", "Longest Common Subsequence",
      "Print LCS", "Longest Common Substring", "Longest Palindromic Subsequence", "Minimum Insertions for Palindrome",
      "Minimum Deletions for Palindrome", "Shortest Common Supersequence", "Distinct Subsequences", "Edit Distance",
      "Wildcard Matching", "Best Time to Buy Sell Stock", "Stock with Transaction Fee", "Stock with Cooldown",
      "Stock with K Transactions", "Longest Increasing Subsequence", "Print LIS", "Largest Divisible Subset",
      "Longest String Chain", "Longest Bitonic Subsequence", "Number of LIS", "Matrix Chain Multiplication",
      "MCM Tabulation", "Minimum Cost to Cut Stick", "Burst Balloons", "Evaluate Boolean Expression",
      "Palindrome Partitioning II", "Partition Array for Maximum Sum", "Maximum Rectangle Area", "Count Square Submatrices"
    ],
    "Tries": [
      "Implement Trie", "Implement Trie II", "Longest Word with All Prefixes", "Number of Distinct Substrings",
      "Bit Trie", "Maximum XOR of Two Numbers", "Maximum XOR with Element from Array"
    ]
  };

  // Flatten all problems with metadata
  const allProblems = Object.entries(problemData).flatMap(([topic, problems]) =>
    problems.map((problem, index) => ({
      id: `${topic.replace(/\s+/g, '_').toLowerCase()}_${index}`,
      name: problem,
      topic: topic,
      completed: false,
      difficulty: Math.random() > 0.6 ? 'Hard' : Math.random() > 0.3 ? 'Medium' : 'Easy',
      notes: '',
      completedDate: null,
      starred: false
    }))
  );

  const [problems, setProblems] = useState(allProblems);
  const [filteredProblems, setFilteredProblems] = useState(allProblems);
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [currentView, setCurrentView] = useState('list');

  // Filter problems based on criteria
  useEffect(() => {
    let filtered = problems;

    if (selectedTopic !== 'All') {
      filtered = filtered.filter(p => p.topic === selectedTopic);
    }

    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(p => p.difficulty === selectedDifficulty);
    }

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (!showCompleted) {
      filtered = filtered.filter(p => !p.completed);
    }

    setFilteredProblems(filtered);
  }, [problems, selectedTopic, selectedDifficulty, searchTerm, showCompleted]);

  const toggleProblem = (id: string) => {
    setProblems(problems.map(p => 
      p.id === id 
        ? { 
            ...p, 
            completed: !p.completed,
            completedDate: !p.completed ? new Date().toISOString().split('T')[0] : null
          }
        : p
    ));
  };

  const toggleStar = (id: string) => {
    setProblems(problems.map(p => 
      p.id === id ? { ...p, starred: !p.starred } : p
    ));
  };

  const updateNotes = (id: string, notes: string) => {
    setProblems(problems.map(p => 
      p.id === id ? { ...p, notes } : p
    ));
  };

  // Statistics
  const totalProblems = problems.length;
  const completedProblems = problems.filter(p => p.completed).length;
  const progressPercentage = Math.round((completedProblems / totalProblems) * 100);

  const topicStats = Object.keys(problemData).map(topic => {
    const topicProblems = problems.filter(p => p.topic === topic);
    const completed = topicProblems.filter(p => p.completed).length;
    const total = topicProblems.length;
    return {
      topic,
      total: total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  });

  const difficultyStats = ['Easy', 'Medium', 'Hard'].map(difficulty => {
    const diffProblems = problems.filter(p => p.difficulty === difficulty);
    const completed = diffProblems.filter(p => p.completed).length;
    const total = diffProblems.length;
    return {
      difficulty,
      total: total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  });

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
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">DSA Problem Tracker</h1>
            <p className="text-gray-600 dark:text-gray-300">Track your progress through Data Structures & Algorithms problems</p>
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

        {/* Progress Bar */}
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

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg">
            <div className="text-2xl font-bold">{completedProblems}</div>
            <div className="text-sm opacity-90">Completed</div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-lg">
            <div className="text-2xl font-bold">{totalProblems - completedProblems}</div>
            <div className="text-sm opacity-90">Remaining</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg">
            <div className="text-2xl font-bold">{problems.filter(p => p.starred).length}</div>
            <div className="text-sm opacity-90">Starred</div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
            <div className="text-2xl font-bold">{Object.keys(problemData).length}</div>
            <div className="text-sm opacity-90">Topics</div>
          </div>
        </div>
      </div>

      {currentView === 'list' ? (
        <>
          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 mb-6">
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
                  {Object.keys(problemData).map(topic => (
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
              Showing {filteredProblems.length} of {totalProblems} problems
            </div>
          </div>

          {/* Problems List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
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
                  {filteredProblems.map((problem) => (
                    <tr key={problem.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${problem.completed ? 'bg-green-50 dark:bg-green-900/20' : ''}`}>
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
             {filteredProblems.length === 0 && (
                <div className="text-center p-6 text-gray-500 dark:text-gray-400">
                    No problems match the current filters.
                </div>
            )}
          </div>
        </>
      ) : (
        /* Statistics View */
        <div className="space-y-6">
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
      )}
    </div>
  );
};

export default DsaSheetTracker;
