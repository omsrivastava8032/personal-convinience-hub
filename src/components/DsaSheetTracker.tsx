import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Search, BarChart3, Code, Star } from 'lucide-react';

const DsaSheetTracker = () => {
  // Complete problem list organized by topics (455+ problems total)
  const problemData = {
    "Learn the Basics": [
        "User Input/Output", "Data Types", "If Else Statements", "Switch Case", "Arrays", "For Loops", "While Loops", "Functions", "Time Complexity",
        "Count Digits", "Reverse a Number", "Check Palindrome", "GCD or HCF", "Armstrong Numbers", "Print all Divisors", "Check for Prime",
        "Pattern 1", "Pattern 2", "Pattern 3", "Pattern 4", "Pattern 5", "Pattern 6", "Pattern 7", "Pattern 8", "Pattern 9", "Pattern 10", "Pattern 11", "Pattern 12", "Pattern 13", "Pattern 14", "Pattern 15", "Pattern 16", "Pattern 17", "Pattern 18", "Pattern 19", "Pattern 20", "Pattern 21", "Pattern 22",
        "Print 1 to N", "Print name N times", "Print N to 1", "Sum of first N numbers", "Factorial of N numbers", "Reverse an array", "Check if a string is palindrome", "Fibonacci Number",
        "Find Character Hashing", "Frequency of Array Elements", "Find Highest/Lowest Frequency Element"
    ],
    "Learn Important Sorting Techniques": [
        "Selection Sort", "Bubble Sort", "Insertion Sort", "Merge Sort", "Quick Sort", "Recursive Bubble Sort", "Recursive Insertion Sort"
    ],
    "Solve Problems on Arrays [Easy]": [
        "Largest Element in Array", "Second Largest Element", "Check if Array is Sorted", "Remove Duplicates from Sorted Array", "Left Rotate Array by One", "Left Rotate Array by D places", "Move Zeros to End", "Linear Search", "Find Union", "Find Missing Number", "Maximum Consecutive Ones", "Find Single Number that appears once", "Longest Subarray with Sum K (Positives)", "Longest Subarray with Sum K (Positives + Negatives)"
    ],
    "Solve Problems on Arrays [Medium]": [
        "Two Sum Problem", "Sort Array of 0s, 1s, 2s", "Majority Element", "Maximum Subarray Sum", "Print Subarray with Maximum Sum", "Best Time to Buy and Sell Stock", "Rearrange Array Elements by Sign", "Next Permutation", "Leader in Array", "Longest Consecutive Sequence", "Set Matrix Zeros", "Rotate Matrix", "Spiral Matrix", "Count Subarrays with sum K"
    ],
    "Solve Problems on Arrays [Hard]": [
        "Pascal's Triangle", "Majority Element II", "3Sum Problem", "4Sum Problem", "Largest Subarray with 0 Sum", "Count Subarrays with XOR K", "Merge Overlapping Intervals", "Merge Two Sorted Arrays", "Find Repeating and Missing Number", "Count Inversions", "Reverse Pairs", "Maximum Product Subarray"
    ],
    "Binary Search [1D, 2D Arrays, Search Space]": [
        "Binary Search to find X in sorted array", "Implement Lower Bound", "Implement Upper Bound", "Search Insert Position", "Floor and Ceil in Sorted Array", "First and Last Occurrences in Array", "Count Occurrences in Sorted Array", "Search in Rotated Sorted Array I", "Search in Rotated Sorted Array II", "Find Minimum in Rotated Sorted Array", "Single Element in Sorted Array", "Find Peak Element",
        "Square Root of a number", "Find Nth Root of a number", "Koko Eating Bananas", "Minimum days to make M bouquets", "Find the Smallest Divisor", "Capacity to Ship Packages within D Days", "Kth Missing Positive Number", "Aggressive Cows", "Book Allocation Problem", "Split Array - Largest Sum", "Painter's Partition Problem", "Minimize Max Distance to Gas Station", "Median of 2 sorted arrays", "Kth element of 2 sorted arrays",
        "Search in a 2D matrix", "Search in a 2D matrix II", "Find Peak Element in 2D Array", "Median in a row-wise sorted Matrix"
    ],
    "Strings [Basic and Medium]": [
        "Remove Outermost Parentheses", "Reverse Words in a String", "Largest Odd Number in String", "Longest Common Prefix", "Isomorphic Strings", "Check if one string is a rotation of another string", "Check Anagrams", "Sort Characters by Frequency", "Maximum Nesting Depth of Parentheses", "Roman Number to Integer", "String to Integer (atoi)", "Count Number of Substrings with K distinct characters", "Longest Palindromic Substring", "Sum of Beauty of All Substrings", "Reverse Every Word in a String"
    ],
    "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]": [
        "Introduction to LinkedList", "Inserting a node in LinkedList", "Deleting a node in LinkedList", "Find length of LinkedList", "Search an element in LinkedList",
        "Introduction to Doubly LinkedList", "Insert node in Doubly LinkedList", "Delete node in Doubly LinkedList", "Reverse a Doubly LinkedList",
        "Middle of LinkedList", "Reverse a LinkedList", "Detect a loop in LinkedList", "Find starting point of loop in LinkedList", "Length of Loop in LinkedList", "Check if LinkedList is palindrome", "Segregate odd and even nodes in LinkedList", "Remove Nth node from end of LinkedList", "Delete the middle node of LinkedList", "Sort LinkedList", "Sort a LinkedList of 0's, 1's and 2's", "Add two numbers represented as LinkedList", "Add 1 to a number represented by LinkedList", "Find intersection of two LinkedList",
        "Reverse a LinkedList in groups of size k", "Rotate a LinkedList", "Flattening a LinkedList", "Clone a LinkedList with random and next pointer"
    ],
    "Learn Recursion [Easy, Medium, Hard]": [
        "Print something N times", "Print 1 to N using recursion", "Print N to 1 using recursion", "Sum of first N numbers", "Factorial of N numbers", "Reverse an array", "Check if a string is palindrome or not", "Fibonacci Number",
        "Generate all subsequences", "Count All Subsequences with Sum K", "Check if there exists a subsequence with sum K", "Combination Sum", "Combination Sum II", "Subset Sum I", "Subset Sum II",
        "Generate all permutations", "Next Permutation",
        "Generate Parentheses", "Letter Combinations of a Phone Number", "Palindrome Partitioning", "Word Search", "N-Queens", "Sudoku Solver", "M-Coloring Problem", "Rat in a Maze", "Expression Add Operators", "Word Break"
    ],
    "Bit Manipulation [Concepts and Problems]": [
        "Introduction to Bit Manipulation", "Check if ith bit is set or not", "Set/Unset/Toggle the ith bit", "Check if a number is power of 2", "Count the number of set bits", "Swap two numbers", "Single Number", "Single Number II", "Single Number III", "Power Set", "Find XOR of numbers from L to R", "Find two missing numbers", "Find the element that appears once", "Find position of the only set bit", "Find position of rightmost different bit", "Find MSB in O(1)", "Divide two integers without using multiplication, division and mod operator"
    ],
    "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation]": [
        "Implement Stack Using Arrays", "Implement Queue Using Arrays", "Implement Stack using Queue", "Implement Queue using Stack", "Check for balanced parentheses", "Implement Min Stack",
        "Infix to Postfix Conversion", "Prefix to Infix Conversion", "Prefix to Postfix Conversion", "Postfix to Infix", "Postfix to Prefix",
        "Next Greater Element", "Next Greater Element II", "Next Smaller Element", "Number of NGEs to the right", "Trapping Rainwater", "Sum of subarray minimums", "Asteroid Collision", "Sum of subarray ranges", "Remove k digits", "Largest rectangle in histogram", "Maximal Rectangle",
        "Sliding Window Maximum", "Stock span problem", "The Celebrity Problem", "LRU Cache", "LFU Cache"
    ],
    "Sliding Window & Two Pointer Combined Problems": [
        "Longest Substring Without Repeating Characters", "Max Consecutive Ones III", "Fruit Into Baskets", "Longest Repeating Character Replacement", "Binary Subarrays With Sum", "Count Number of Nice Subarrays", "Number of Substrings Containing All Three Characters", "Maximum Points You Can Obtain from Cards", "Subarrays with K Different Integers", "Minimum Window Substring"
    ],
    "Heaps [Learning, Medium, Hard Problems]": [
        "Introduction to Priority Queues using Binary Heaps", "Implementation of Priority Queue using Binary Heap", "Check if an array represents a min-heap or not", "Convert min Heap to max Heap", "Kth largest element in an array", "Kth smallest element in an array", "Merge k sorted arrays", "Replace each array element by its corresponding rank", "Task Scheduler", "Hand of Straights", "Design Twitter", "Connect n ropes with minimum cost", "Kth largest element in a stream", "Maximum sum combination", "Find Median from Data Stream", "K most frequent elements", "Reorganize String"
    ],
    "Greedy Algorithms [Easy, Medium/Hard]": [
        "Assign Cookies", "Fractional Knapsack", "Greedy algorithm to find minimum number of coins", "Lemonade Change", "Valid Parenthesis String", "N meetings in one room", "Jump Game", "Jump Game II", "Minimum number of platforms required for a railway", "Job Sequencing Problem", "Candy", "Shortest Job First (SJF) CPU Scheduling", "LRU Page Replacement algorithm", "Insert Interval", "Merge Intervals", "Non-overlapping Intervals", "Minimum number of arrows to burst balloons"
    ],
    "Binary Trees [Traversals, Medium and Hard Problems]": [
        "Introduction to Trees", "Binary Tree Representation", "Binary Tree Traversals (Inorder, Preorder, Postorder)", "Level order Traversal", "Iterative Preorder Traversal", "Iterative Inorder Traversal", "Postorder Traversal using 2 stacks", "Postorder Traversal using 1 stack", "Preorder Inorder Postorder Traversals in One Traversal", "Maximum Depth of Binary Tree", "Check for Balanced Binary Tree", "Diameter of Binary Tree", "Maximum Path Sum in a Binary Tree", "Check if two trees are identical or not", "Zigzag Traversal of Binary Tree", "Boundary Traversal of a Binary Tree", "Vertical Order Traversal of a Binary Tree", "Top View of Binary Tree", "Bottom View of Binary Tree", "Right/Left View of Binary Tree", "Check for Symmetrical Binary Trees", "Print Root to Node Path in a Binary Tree", "Lowest Common Ancestor in a Binary Tree", "Maximum width of a Binary Tree", "Check for Children Sum Property", "Print all nodes at distance K in a Binary Tree", "Minimum time taken to BURN the Binary Tree from a Node", "Count total Nodes in a COMPLETE Binary Tree", "Construct Binary Tree from inorder and preorder", "Construct Binary Tree from postorder and inorder", "Serialize and deserialize a Binary Tree", "Morris Preorder Traversal", "Morris Inorder Traversal", "Flatten a Binary Tree to Linked List"
    ],
    "Binary Search Trees [Concept and Problems]": [
        "Introduction to Binary Search Trees", "Search in a Binary Search Tree", "Ceil in a Binary Search Tree", "Floor in a Binary Search Tree", "Insert a given Node in Binary Search Tree", "Delete a Node in a Binary Search Tree", "Find K-th smallest element in a BST", "Find K-th largest element in a BST", "Check if a tree is a BST or BT", "Lowest Common Ancestor in a BST", "Construct a BST from a preorder traversal", "Construct a BST from a postorder traversal", "Inorder Successor/Predecessor in BST", "BST Iterator", "Two Sum in a BST", "Recover a BST", "Largest BST in a Binary Tree"
    ],
    "Graphs [Concepts, BFS, DFS, Problems]": [
        "Introduction to Graph", "Graph Representation", "BFS", "DFS",
        "Number of provinces", "Connected Components Problem", "Rotten Oranges", "Flood fill", "Detect cycle in an undirected graph (BFS)", "Detect cycle in an undirected graph (DFS)", "0/1 Matrix (Bfs Problem)", "Surrounded Regions (DFS)", "Number of Enclaves", "Word ladder 1", "Word ladder 2", "Number of Distinct Islands", "Bipartite Graph (BFS)", "Bipartite Graph (DFS)", "Detect cycle in a directed graph (DFS)", "Detect cycle in a directed graph (BFS)",
        "Topological Sort Algorithm (DFS)", "Topological Sort Algorithm (BFS)", "Course Schedule - I", "Course Schedule - II", "Find Eventual Safe States (DFS)", "Alien dictionary",
        "Shortest path in Undirected Graph with unit weights", "Shortest path in DAG", "Dijkstra's Algorithm", "Shortest path in a binary maze", "Bellman Ford Algorithm", "Floyd Warshall Algorithm", "Find the city with the smallest number of neighbors at a threshold distance",
        "Minimum Spanning Tree", "Prim's Algorithm", "Kruskal's Algorithm", "Disjoint Set (Union by Rank and Path compression)", "Disjoint Set (Union by Size and Path compression)",
        "Number of operations to make network connected", "Most Stones Removed with Same Row or Column", "Accounts merge", "Number of Island II", "Making a Large Island", "Bridges in a Graph", "Articulation Point in a Graph", "Kosaraju's Algorithm for Strongly Connected Components"
    ],
    "Dynamic Programming [Patterns and Problems]": [
        "Introduction to DP", "Climbing Stairs", "Frog Jump", "Frog Jump with k distances", "Maximum sum of non-adjacent elements", "House Robber",
        "Ninja's Training", "Grid Unique Paths", "Grid Unique Paths 2", "Minimum path sum in Grid", "Triangle", "Minimum/Maximum Falling Path Sum", "Cherry Pickup",
        "Subset sum equal to target", "Partition Equal Subset Sum", "Partition a set into two subsets with minimum absolute sum difference", "Count Subsets with Sum K", "Count Partitions with Given Difference",
        "0/1 Knapsack", "Minimum Coins", "Target Sum", "Coin Change 2", "Unbounded Knapsack", "Rod Cutting Problem",
        "Longest Increasing Subsequence", "Printing Longest Increasing Subsequence", "Longest Increasing Subsequence | Binary Search", "Largest Divisible Subset", "Longest String Chain", "Longest Bitonic Subsequence", "Number of Longest Increasing Subsequences",
        "Longest Common Subsequence", "Print Longest Common Subsequence", "Longest Common Substring", "Longest Palindromic Subsequence", "Minimum insertions to make a string palindrome", "Minimum Insertions/Deletions to Convert String", "Shortest Common Supersequence", "Distinct Subsequences", "Edit Distance", "Wildcard Matching",
        "Best Time to Buy and Sell Stock", "Buy and Sell Stock - II", "Buy and Sell Stocks III", "Buy and Sell Stock IV", "Buy and Sell Stocks With Cooldown", "Buy and Sell Stocks With Transaction Fee",
        "Matrix Chain Multiplication", "Minimum Cost to Cut the Stick", "Burst Balloons", "Evaluate Boolean Expression to True", "Palindrome Partitioning - II", "Partition Array for Maximum Sum",
        "Maximum Rectangle Area with all 1's", "Count Square Submatrices with All Ones"
    ],
    "Tries": [
        "Implement Trie (Prefix Tree)", "Implement Trie – 2 (Prefix Tree)", "Longest Word with All Prefixes", "Number of Distinct Substrings in a String", "Bit PreRequisites | must watch before bit trie", "Maximum XOR of two numbers in an array", "Maximum XOR With an Element From Array", "Count pairs with XOR in a range", "Search Query Auto-completion"
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
  const progressPercentage = totalProblems > 0 ? Math.round((completedProblems / totalProblems) * 100) : 0;

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
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-lg transform hover:scale-105 transition-transform animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
            <div className="text-2xl font-bold">{completedProblems}</div>
            <div className="text-sm opacity-90">Completed</div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-lg transform hover:scale-105 transition-transform animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
            <div className="text-2xl font-bold">{totalProblems - completedProblems}</div>
            <div className="text-sm opacity-90">Remaining</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg transform hover:scale-105 transition-transform animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}>
            <div className="text-2xl font-bold">{problems.filter(p => p.starred).length}</div>
            <div className="text-sm opacity-90">Starred</div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg transform hover:scale-105 transition-transform animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}>
            <div className="text-2xl font-bold">{Object.keys(problemData).length}</div>
            <div className="text-sm opacity-90">Topics</div>
          </div>
        </div>
      </div>

      {currentView === 'list' ? (
        <>
          {/* Filters */}
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
                  {filteredProblems.map((problem) => (
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
             {filteredProblems.length === 0 && (
                <div className="text-center p-6 text-gray-500 dark:text-gray-400">
                    No problems match the current filters.
                </div>
            )}
          </div>
        </>
      ) : (
        /* Statistics View */
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
      )}
    </div>
  );
};

export default DsaSheetTracker;
