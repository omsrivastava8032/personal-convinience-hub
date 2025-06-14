
-- Clear the existing sample topics
DELETE FROM public.dsa_topics;

-- Reset the serial counter for the 'order' column
ALTER SEQUENCE dsa_topics_order_seq RESTART WITH 1;

-- Insert a comprehensive list of topics from Striver's A2Z DSA Sheet
INSERT INTO public.dsa_topics (category, topic_name, problem_url) VALUES
-- Step 1: Learn the Basics
('Step 1.1: Learn the basics', 'User Input / Output', 'https://www.geeksforgeeks.org/basic-input-output-in-c/'),
('Step 1.1: Learn the basics', 'Data Types', 'https://www.geeksforgeeks.org/data-types-in-c-2/'),
('Step 1.1: Learn the basics', 'If-Else Statements', 'https://www.geeksforgeeks.org/c-if-else-statement/'),
('Step 1.1: Learn the basics', 'Switch Statement', 'https://www.geeksforgeeks.org/switch-statement-in-c-cpp/'),
('Step 1.1: Learn the basics', 'Arrays, Strings', 'https://www.geeksforgeeks.org/c-plus-plus-strings/'),
('Step 1.1: Learn the basics', 'For Loops', 'https://www.geeksforgeeks.org/cpp-for-loop-with-examples/'),
('Step 1.1: Learn the basics', 'While Loops', 'https://www.geeksforgeeks.org/cpp-while-loop-with-examples/'),
('Step 1.1: Learn the basics', 'Functions', 'https://www.geeksforgeeks.org/functions-in-c/'),

('Step 1.2: Build-up Logical Thinking', 'Pattern 1: Rectangular Star Pattern', 'https://takeuforward.org/pattern/pattern-1-rectangular-star-pattern/'),
('Step 1.2: Build-up Logical Thinking', 'Pattern 2: Right-Angled Triangle Pattern', 'https://takeuforward.org/pattern/pattern-2-right-angled-triangle-pattern/'),
('Step 1.2: Build-up Logical Thinking', 'Pattern 3: Right-Angled Number Pyramid', 'https://takeuforward.org/pattern/pattern-3-right-angled-number-pyramid/'),
('Step 1.2: Build-up Logical Thinking', 'Pattern 4: Right-Angled Number Pyramid II', 'https://takeuforward.org/pattern/pattern-4-right-angled-number-pyramid-ii/'),
('Step 1.2: Build-up Logical Thinking', 'Pattern 5: Inverted Right Pyramid', 'https://takeuforward.org/pattern/pattern-5-inverted-right-pyramid/'),
('Step 1.2: Build-up Logical Thinking', 'Pattern 6: Inverted Numbered Right Pyramid', 'https://takeuforward.org/pattern/pattern-6-inverted-numbered-right-pyramid/'),
('Step 1.2: Build-up Logical Thinking', 'Pattern 7: Star Pyramid', 'https://takeuforward.org/pattern/pattern-7-star-pyramid/'),
('Step 1.2: Build-up Logical Thinking', 'Pattern 8: Inverted Star Pyramid', 'https://takeuforward.org/pattern/pattern-8-inverted-star-pyramid/'),
('Step 1.2: Build-up Logical Thinking', 'Pattern 9: Diamond Star Pattern', 'https://takeuforward.org/pattern/pattern-9-diamond-star-pattern/'),
('Step 1.2: Build-up Logical Thinking', 'Pattern 10: Half Diamond Star Pattern', 'https://takeuforward.org/pattern/pattern-10-half-diamond-star-pattern/'),

('Step 1.4: Know Basic Maths', 'Count Digits', 'https://takeuforward.org/data-structure/count-digits-in-a-number/'),
('Step 1.4: Know Basic Maths', 'Reverse a Number', 'https://takeuforward.org/data-structure/reverse-a-number-in-c/'),
('Step 1.4: Know Basic Maths', 'Check Palindrome', 'https://takeuforward.org/data-structure/check-if-a-number-is-palindrome-or-not/'),
('Step 1.4: Know Basic Maths', 'GCD Or HCF', 'https://takeuforward.org/data-structure/find-gcd-of-two-numbers/'),
('Step 1.4: Know Basic Maths', 'Armstrong Numbers', 'https://takeuforward.org/maths/check-if-a-number-is-armstrong-number-or-not/'),
('Step 1.4: Know Basic Maths', 'Print all Divisors', 'https://takeuforward.org/data-structure/print-all-divisors-of-a-given-number/'),
('Step 1.4: Know Basic Maths', 'Check for Prime', 'https://takeuforward.org/data-structure/check-if-a-number-is-prime-or-not/'),

('Step 1.5: Learn Basic Recursion', 'Print something N times', 'https://takeuforward.org/recursion/introduction-to-recursion-understand-recursion-by-printing-something-n-times/'),
('Step 1.5: Learn Basic Recursion', 'Print 1 to N', 'https://takeuforward.org/recursion/print-1-to-n-using-recursion/'),
('Step 1.5: Learn Basic Recursion', 'Print N to 1', 'https://takeuforward.org/recursion/print-n-to-1-using-recursion/'),
('Step 1.5: Learn Basic Recursion', 'Sum of first N numbers', 'https://takeuforward.org/data-structure/sum-of-first-n-natural-numbers/'),
('Step 1.5: Learn Basic Recursion', 'Factorial of N numbers', 'https://takeuforward.org/data-structure/factorial-of-a-number-iterative-and-recursive/'),
('Step 1.5: Learn Basic Recursion', 'Reverse an array', 'https://takeuforward.org/data-structure/reverse-a-given-array/'),
('Step 1.5: Learn Basic Recursion', 'Check if a string is palindrome', 'https://takeuforward.org/data-structure/check-if-the-given-string-is-palindrome-or-not/'),
('Step 1.5: Learn Basic Recursion', 'Fibonacci Number', 'https://takeuforward.org/dynamic-programming/dynamic-programming-introduction/'),

('Step 1.6: Learn Basic Hashing', 'Counting frequencies of array elements', 'https://takeuforward.org/data-structure/count-frequency-of-each-element-in-the-array/'),
('Step 1.6: Learn Basic Hashing', 'Find the highest/lowest frequency element', 'https://takeuforward.org/data-structure/find-the-highest-and-lowest-frequency-element/'),

-- Step 2: Learn Important Sorting Techniques
('Step 2.1: Sorting-I', 'Selection Sort', 'https://takeuforward.org/sorting/selection-sort-algorithm/'),
('Step 2.1: Sorting-I', 'Bubble Sort', 'https://takeuforward.org/data-structure/bubble-sort-algorithm/'),
('Step 2.1: Sorting-I', 'Insertion Sort', 'https://takeuforward.org/data-structure/insertion-sort-algorithm/'),

('Step 2.2: Sorting-II', 'Merge Sort', 'https://takeuforward.org/data-structure/merge-sort-algorithm/'),
('Step 2.2: Sorting-II', 'Quick Sort', 'https://takeuforward.org/data-structure/quick-sort-algorithm/'),

-- Step 3: Solve Problems on Arrays
('Step 3.1: Easy', 'Largest Element in an Array', 'https://takeuforward.org/data-structure/find-the-largest-element-in-an-array/'),
('Step 3.1: Easy', 'Second Largest Element in an Array', 'https://takeuforward.org/data-structure/find-second-largest-element-in-an-array/'),
('Step 3.1: Easy', 'Check if array is sorted', 'https://takeuforward.org/data-structure/check-if-an-array-is-sorted/'),
('Step 3.1: Easy', 'Remove duplicates from Sorted Array', 'https://takeuforward.org/data-structure/remove-duplicates-in-place-from-sorted-array/'),
('Step 3.1: Easy', 'Left Rotate the Array by one place', 'https://takeuforward.org/data-structure/left-rotate-the-array-by-one/'),
('Step 3.1: Easy', 'Move Zeros to end', 'https://takeuforward.org/data-structure/move-all-zeros-to-the-end-of-the-array/'),
('Step 3.1: Easy', 'Linear Search', 'https://takeuforward.org/data-structure/linear-search-in-c/'),
('Step 3.1: Easy', 'Find the Union of two sorted arrays', 'https://takeuforward.org/data-structure/union-of-two-sorted-arrays/'),
('Step 3.1: Easy', 'Find missing number in an array', 'https://takeuforward.org/arrays/find-the-missing-number-in-an-array/'),
('Step 3.1: Easy', 'Maximum consecutive ones', 'https://takeuforward.org/data-structure/count-maximum-consecutive-ones-in-the-array/'),
('Step 3.1: Easy', 'Find the number that appears once', 'https://takeuforward.org/data-structure/find-the-number-that-appears-once-and-the-other-numbers-twice/'),

('Step 3.2: Medium', 'Two Sum Problem', 'https://takeuforward.org/data-structure/two-sum-check-if-a-pair-with-given-sum-exists-in-array/'),
('Step 3.2: Medium', 'Sort an array of 0s, 1s and 2s', 'https://takeuforward.org/data-structure/sort-an-array-of-0s-1s-and-2s/'),
('Step 3.2: Medium', 'Majority Element (>N/2 times)', 'https://takeuforward.org/data-structure/find-the-majority-element-that-occurs-more-than-n-2-times/'),
('Step 3.2: Medium', 'Kadane''s Algorithm, max subarray sum', 'https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array/'),
('Step 3.2: Medium', 'Stock Buy and Sell', 'https://takeuforward.org/data-structure/stock-buy-and-sell/'),
('Step 3.2: Medium', 'Rearrange array elements by sign', 'https://takeuforward.org/arrays/rearrange-array-elements-by-sign/'),
('Step 3.2: Medium', 'Next Permutation', 'https://takeuforward.org/data-structure/next_permutation-find-next-lexicographically-greater-permutation/'),
('Step 3.2: Medium', 'Leaders in an Array', 'https://takeuforward.org/data-structure/leaders-in-an-array/'),
('Step 3.2: Medium', 'Longest Consecutive Sequence', 'https://takeuforward.org/data-structure/longest-consecutive-sequence-in-an-array/'),
('Step 3.2: Medium', 'Set Matrix Zeros', 'https://takeuforward.org/data-structure/set-matrix-zero/'),
('Step 3.2: Medium', 'Rotate Image by 90 degrees', 'https://takeuforward.org/data-structure/rotate-image-by-90-degrees/'),
('Step 3.2: Medium', 'Spiral Traversal of Matrix', 'https://takeuforward.org/data-structure/spiral-traversal-of-matrix/'),

('Step 3.3: Hard', 'Pascal''s Triangle', 'https://takeuforward.org/data-structure/pascals-triangle/'),
('Step 3.3: Hard', 'Majority Element (>N/3 times)', 'https://takeuforward.org/data-structure/majority-elements-in-an-array/'),
('Step 3.3: Hard', '3 Sum Problem', 'https://takeuforward.org/data-structure/3-sum-find-triplets-that-add-up-to-a-zero/'),
('Step 3.3: Hard', '4 Sum Problem', 'https://takeuforward.org/data-structure/4-sum-find-quads-that-add-up-to-a-target-value/'),
('Step 3.3: Hard', 'Largest subarray with 0 sum', 'https://takeuforward.org/data-structure/length-of-the-longest-subarray-with-zero-sum/'),
('Step 3.3: Hard', 'Count number of subarrays with given xor K', 'https://takeuforward.org/data-structure/count-the-number-of-subarrays-with-given-xor-k/'),
('Step 3.3: Hard', 'Merge Overlapping Sub-intervals', 'https://takeuforward.org/data-structure/merge-overlapping-sub-intervals/'),
('Step 3.3: Hard', 'Merge two sorted arrays without extra space', 'https://takeuforward.org/data-structure/merge-two-sorted-arrays-without-extra-space/'),
('Step 3.3: Hard', 'Find the repeating and missing number', 'https://takeuforward.org/data-structure/find-the-repeating-and-missing-numbers/'),
('Step 3.3: Hard', 'Count Inversions', 'https://takeuforward.org/data-structure/count-inversions-in-an-array/'),
('Step 3.3: Hard', 'Reverse Pairs', 'https://takeuforward.org/data-structure/count-reverse-pairs/'),
('Step 3.3: Hard', 'Maximum Product Subarray', 'https://takeuforward.org/data-structure/maximum-product-subarray-in-an-array/');
