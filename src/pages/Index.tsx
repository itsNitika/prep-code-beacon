
import { useState, useMemo } from "react";
import { QuestionTable } from "@/components/QuestionTable";
import { FilterPanel } from "@/components/FilterPanel";
import { CompanyInsights } from "@/components/CompanyInsights";
import { StatsDashboard } from "@/components/StatsDashboard";
import { Search, TrendingUp, BookOpen, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Expanded mock data with at least 30 questions per major company
const mockQuestions = [
  // Google Questions (30+)
  {
    id: 1,
    company: "Google",
    role: "SDE-2",
    question: "Design a URL Shortener like bit.ly",
    link: "https://leetcode.com/discuss/interview-question/124658/Design-a-URL-Shortener-(-TinyURL-)-System/",
    topic: ["System Design", "Hashing", "Database"],
    difficulty: "Hard",
    round: "Design",
    frequency: "High",
    recency: "Last 3 months",
    source: "Leetcode Discuss",
    platform: "LeetCode"
  },
  {
    id: 2,
    company: "Google",
    role: "SDE-1",
    question: "Valid Parentheses",
    link: "https://leetcode.com/problems/valid-parentheses/",
    topic: ["Stack", "Strings"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Blind",
    platform: "LeetCode"
  },
  {
    id: 3,
    company: "Google",
    role: "New Grad",
    question: "Binary Tree Level Order Traversal",
    link: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    topic: ["Trees", "BFS"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 6 months",
    source: "Reddit",
    platform: "LeetCode"
  },
  {
    id: 4,
    company: "Google",
    role: "SDE-2",
    question: "Sliding Window Maximum",
    link: "https://leetcode.com/problems/sliding-window-maximum/",
    topic: ["Arrays", "Sliding Window", "Heap"],
    difficulty: "Hard",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 3 months",
    source: "Glassdoor",
    platform: "LeetCode"
  },
  {
    id: 5,
    company: "Google",
    role: "SDE-1",
    question: "Merge Intervals",
    link: "https://leetcode.com/problems/merge-intervals/",
    topic: ["Arrays", "Sorting"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "CareerCup",
    platform: "LeetCode"
  },
  {
    id: 6,
    company: "Google",
    role: "SDE-3",
    question: "Design Google Maps",
    link: "https://www.geeksforgeeks.org/design-location-based-app-like-uber/",
    topic: ["System Design", "Geolocation", "Database"],
    difficulty: "Hard",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "YouTube",
    platform: "GeeksforGeeks"
  },
  {
    id: 7,
    company: "Google",
    role: "New Grad",
    question: "Palindrome Linked List",
    link: "https://leetcode.com/problems/palindrome-linked-list/",
    topic: ["LinkedList", "Two Pointers"],
    difficulty: "Easy",
    round: "OA",
    frequency: "High",
    recency: "Last 3 months",
    source: "Discord",
    platform: "LeetCode"
  },
  {
    id: 8,
    company: "Google",
    role: "SDE-1",
    question: "Word Ladder",
    link: "https://leetcode.com/problems/word-ladder/",
    topic: ["BFS", "Strings", "HashMap"],
    difficulty: "Hard",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "LinkedIn",
    platform: "LeetCode"
  },
  {
    id: 9,
    company: "Google",
    role: "SDE-2",
    question: "LRU Cache",
    link: "https://leetcode.com/problems/lru-cache/",
    topic: ["Design", "HashMap", "LinkedList"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Medium",
    platform: "LeetCode"
  },
  {
    id: 10,
    company: "Google",
    role: "SDE-1",
    question: "Maximum Subarray",
    link: "https://leetcode.com/problems/maximum-subarray/",
    topic: ["Arrays", "Dynamic Programming"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "GitHub",
    platform: "LeetCode"
  },
  {
    id: 11,
    company: "Google",
    role: "SDE-2",
    question: "Serialize and Deserialize Binary Tree",
    link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
    topic: ["Trees", "DFS", "Design"],
    difficulty: "Hard",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Blind",
    platform: "LeetCode"
  },
  {
    id: 12,
    company: "Google",
    role: "New Grad",
    question: "Find Peak Element",
    link: "https://leetcode.com/problems/find-peak-element/",
    topic: ["Arrays", "Binary Search"],
    difficulty: "Medium",
    round: "OA",
    frequency: "High",
    recency: "Last 3 months",
    source: "Reddit",
    platform: "LeetCode"
  },
  {
    id: 13,
    company: "Google",
    role: "SDE-1",
    question: "Course Schedule",
    link: "https://leetcode.com/problems/course-schedule/",
    topic: ["Graphs", "DFS", "Topological Sort"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Glassdoor",
    platform: "LeetCode"
  },
  {
    id: 14,
    company: "Google",
    role: "SDE-2",
    question: "Minimum Window Substring",
    link: "https://leetcode.com/problems/minimum-window-substring/",
    topic: ["Strings", "Sliding Window", "HashMap"],
    difficulty: "Hard",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "CareerCup",
    platform: "LeetCode"
  },
  {
    id: 15,
    company: "Google",
    role: "SDE-1",
    question: "Number of Islands",
    link: "https://leetcode.com/problems/number-of-islands/",
    topic: ["Graphs", "DFS", "BFS"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "YouTube",
    platform: "LeetCode"
  },
  {
    id: 16,
    company: "Google",
    role: "New Grad",
    question: "Best Time to Buy and Sell Stock",
    link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    topic: ["Arrays", "Dynamic Programming"],
    difficulty: "Easy",
    round: "OA",
    frequency: "High",
    recency: "Last 3 months",
    source: "Discord",
    platform: "LeetCode"
  },
  {
    id: 17,
    company: "Google",
    role: "SDE-2",
    question: "Design Search Autocomplete System",
    link: "https://leetcode.com/problems/design-search-autocomplete-system/",
    topic: ["Design", "Trie", "Heap"],
    difficulty: "Hard",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "LinkedIn",
    platform: "LeetCode"
  },
  {
    id: 18,
    company: "Google",
    role: "SDE-1",
    question: "Longest Increasing Subsequence",
    link: "https://leetcode.com/problems/longest-increasing-subsequence/",
    topic: ["Arrays", "Dynamic Programming", "Binary Search"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Medium",
    platform: "LeetCode"
  },
  {
    id: 19,
    company: "Google",
    role: "SDE-2",
    question: "Word Search II",
    link: "https://leetcode.com/problems/word-search-ii/",
    topic: ["Backtracking", "Trie", "Matrix"],
    difficulty: "Hard",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "GitHub",
    platform: "LeetCode"
  },
  {
    id: 20,
    company: "Google",
    role: "New Grad",
    question: "Reverse Linked List",
    link: "https://leetcode.com/problems/reverse-linked-list/",
    topic: ["LinkedList", "Recursion"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Blind",
    platform: "LeetCode"
  },
  {
    id: 21,
    company: "Google",
    role: "SDE-1",
    question: "Meeting Rooms II",
    link: "https://leetcode.com/problems/meeting-rooms-ii/",
    topic: ["Arrays", "Sorting", "Heap"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Reddit",
    platform: "LeetCode"
  },
  {
    id: 22,
    company: "Google",
    role: "SDE-2",
    question: "Regular Expression Matching",
    link: "https://leetcode.com/problems/regular-expression-matching/",
    topic: ["Dynamic Programming", "Strings", "Recursion"],
    difficulty: "Hard",
    round: "Technical",
    frequency: "Low",
    recency: "Last 12 months",
    source: "Glassdoor",
    platform: "LeetCode"
  },
  {
    id: 23,
    company: "Google",
    role: "SDE-1",
    question: "3Sum",
    link: "https://leetcode.com/problems/3sum/",
    topic: ["Arrays", "Two Pointers", "Sorting"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "CareerCup",
    platform: "LeetCode"
  },
  {
    id: 24,
    company: "Google",
    role: "New Grad",
    question: "Valid Anagram",
    link: "https://leetcode.com/problems/valid-anagram/",
    topic: ["Strings", "HashMap", "Sorting"],
    difficulty: "Easy",
    round: "OA",
    frequency: "High",
    recency: "Last 3 months",
    source: "YouTube",
    platform: "LeetCode"
  },
  {
    id: 25,
    company: "Google",
    role: "SDE-2",
    question: "Alien Dictionary",
    link: "https://leetcode.com/problems/alien-dictionary/",
    topic: ["Graphs", "Topological Sort", "DFS"],
    difficulty: "Hard",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Discord",
    platform: "LeetCode"
  },
  {
    id: 26,
    company: "Google",
    role: "SDE-1",
    question: "House Robber",
    link: "https://leetcode.com/problems/house-robber/",
    topic: ["Dynamic Programming", "Arrays"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "LinkedIn",
    platform: "LeetCode"
  },
  {
    id: 27,
    company: "Google",
    role: "SDE-2",
    question: "Design Twitter",
    link: "https://leetcode.com/problems/design-twitter/",
    topic: ["Design", "HashMap", "Heap"],
    difficulty: "Medium",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Medium",
    platform: "LeetCode"
  },
  {
    id: 28,
    company: "Google",
    role: "New Grad",
    question: "Contains Duplicate",
    link: "https://leetcode.com/problems/contains-duplicate/",
    topic: ["Arrays", "HashMap"],
    difficulty: "Easy",
    round: "OA",
    frequency: "High",
    recency: "Last 3 months",
    source: "GitHub",
    platform: "LeetCode"
  },
  {
    id: 29,
    company: "Google",
    role: "SDE-1",
    question: "Product of Array Except Self",
    link: "https://leetcode.com/problems/product-of-array-except-self/",
    topic: ["Arrays", "Prefix Sum"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Blind",
    platform: "LeetCode"
  },
  {
    id: 30,
    company: "Google",
    role: "SDE-2",
    question: "Trapping Rain Water",
    link: "https://leetcode.com/problems/trapping-rain-water/",
    topic: ["Arrays", "Two Pointers", "Stack"],
    difficulty: "Hard",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Reddit",
    platform: "LeetCode"
  },

  // Microsoft Questions (30+)
  {
    id: 31,
    company: "Microsoft",
    role: "New Grad",
    question: "Longest Substring Without Repeating Characters",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    topic: ["Strings", "HashMap", "Sliding Window"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 6 months",
    source: "Reddit",
    platform: "LeetCode"
  },
  {
    id: 32,
    company: "Microsoft",
    role: "SDE-1",
    question: "Reverse Integer",
    link: "https://leetcode.com/problems/reverse-integer/",
    topic: ["Math", "Integer"],
    difficulty: "Easy",
    round: "OA",
    frequency: "High",
    recency: "Last 3 months",
    source: "Glassdoor",
    platform: "LeetCode"
  },
  {
    id: 33,
    company: "Microsoft",
    role: "SDE-2",
    question: "Design Excel Sum Formula",
    link: "https://leetcode.com/problems/design-excel-sum-formula/",
    topic: ["Design", "HashMap", "DFS"],
    difficulty: "Hard",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "CareerCup",
    platform: "LeetCode"
  },
  {
    id: 34,
    company: "Microsoft",
    role: "SDE-1",
    question: "Add Two Numbers",
    link: "https://leetcode.com/problems/add-two-numbers/",
    topic: ["LinkedList", "Math"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "YouTube",
    platform: "LeetCode"
  },
  {
    id: 35,
    company: "Microsoft",
    role: "New Grad",
    question: "Roman to Integer",
    link: "https://leetcode.com/problems/roman-to-integer/",
    topic: ["Strings", "HashMap"],
    difficulty: "Easy",
    round: "OA",
    frequency: "High",
    recency: "Last 3 months",
    source: "Discord",
    platform: "LeetCode"
  },
  {
    id: 36,
    company: "Microsoft",
    role: "SDE-2",
    question: "Clone Graph",
    link: "https://leetcode.com/problems/clone-graph/",
    topic: ["Graphs", "DFS", "HashMap"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "LinkedIn",
    platform: "LeetCode"
  },
  {
    id: 37,
    company: "Microsoft",
    role: "SDE-1",
    question: "Implement Trie",
    link: "https://leetcode.com/problems/implement-trie-prefix-tree/",
    topic: ["Trie", "Design"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Medium",
    platform: "LeetCode"
  },
  {
    id: 38,
    company: "Microsoft",
    role: "New Grad",
    question: "Climbing Stairs",
    link: "https://leetcode.com/problems/climbing-stairs/",
    topic: ["Dynamic Programming", "Math"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "GitHub",
    platform: "LeetCode"
  },
  {
    id: 39,
    company: "Microsoft",
    role: "SDE-2",
    question: "Word Break",
    link: "https://leetcode.com/problems/word-break/",
    topic: ["Dynamic Programming", "Strings"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Blind",
    platform: "LeetCode"
  },
  {
    id: 40,
    company: "Microsoft",
    role: "SDE-1",
    question: "Symmetric Tree",
    link: "https://leetcode.com/problems/symmetric-tree/",
    topic: ["Trees", "DFS", "BFS"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Reddit",
    platform: "LeetCode"
  },
  {
    id: 41,
    company: "Microsoft",
    role: "SDE-2",
    question: "Design File System",
    link: "https://leetcode.com/problems/design-file-system/",
    topic: ["Design", "HashMap", "Trie"],
    difficulty: "Medium",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Glassdoor",
    platform: "LeetCode"
  },
  {
    id: 42,
    company: "Microsoft",
    role: "New Grad",
    question: "Move Zeroes",
    link: "https://leetcode.com/problems/move-zeroes/",
    topic: ["Arrays", "Two Pointers"],
    difficulty: "Easy",
    round: "OA",
    frequency: "High",
    recency: "Last 3 months",
    source: "CareerCup",
    platform: "LeetCode"
  },
  {
    id: 43,
    company: "Microsoft",
    role: "SDE-1",
    question: "Kth Largest Element in Array",
    link: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    topic: ["Arrays", "Heap", "Quick Select"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "YouTube",
    platform: "LeetCode"
  },
  {
    id: 44,
    company: "Microsoft",
    role: "SDE-2",
    question: "Design Hit Counter",
    link: "https://leetcode.com/problems/design-hit-counter/",
    topic: ["Design", "Queue"],
    difficulty: "Medium",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Discord",
    platform: "LeetCode"
  },
  {
    id: 45,
    company: "Microsoft",
    role: "SDE-1",
    question: "Top K Frequent Elements",
    link: "https://leetcode.com/problems/top-k-frequent-elements/",
    topic: ["Arrays", "HashMap", "Heap"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "LinkedIn",
    platform: "LeetCode"
  },
  {
    id: 46,
    company: "Microsoft",
    role: "New Grad",
    question: "Single Number",
    link: "https://leetcode.com/problems/single-number/",
    topic: ["Arrays", "Bit Manipulation"],
    difficulty: "Easy",
    round: "OA",
    frequency: "High",
    recency: "Last 3 months",
    source: "Medium",
    platform: "LeetCode"
  },
  {
    id: 47,
    company: "Microsoft",
    role: "SDE-2",
    question: "Design Browser History",
    link: "https://leetcode.com/problems/design-browser-history/",
    topic: ["Design", "Stack", "LinkedList"],
    difficulty: "Medium",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "GitHub",
    platform: "LeetCode"
  },
  {
    id: 48,
    company: "Microsoft",
    role: "SDE-1",
    question: "Search in Rotated Sorted Array",
    link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    topic: ["Arrays", "Binary Search"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Blind",
    platform: "LeetCode"
  },
  {
    id: 49,
    company: "Microsoft",
    role: "New Grad",
    question: "Missing Number",
    link: "https://leetcode.com/problems/missing-number/",
    topic: ["Arrays", "Math", "Bit Manipulation"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Reddit",
    platform: "LeetCode"
  },
  {
    id: 50,
    company: "Microsoft",
    role: "SDE-2",
    question: "LFU Cache",
    link: "https://leetcode.com/problems/lfu-cache/",
    topic: ["Design", "HashMap", "LinkedList"],
    difficulty: "Hard",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Glassdoor",
    platform: "LeetCode"
  },
  {
    id: 51,
    company: "Microsoft",
    role: "SDE-1",
    question: "Group Anagrams",
    link: "https://leetcode.com/problems/group-anagrams/",
    topic: ["Strings", "HashMap", "Sorting"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "CareerCup",
    platform: "LeetCode"
  },
  {
    id: 52,
    company: "Microsoft",
    role: "New Grad",
    question: "Intersection of Two Arrays",
    link: "https://leetcode.com/problems/intersection-of-two-arrays/",
    topic: ["Arrays", "HashMap", "Two Pointers"],
    difficulty: "Easy",
    round: "OA",
    frequency: "High",
    recency: "Last 3 months",
    source: "YouTube",
    platform: "LeetCode"
  },
  {
    id: 53,
    company: "Microsoft",
    role: "SDE-2",
    question: "Design Log Storage System",
    link: "https://leetcode.com/problems/design-log-storage-system/",
    topic: ["Design", "HashMap", "Sorting"],
    difficulty: "Medium",
    round: "Design",
    frequency: "Low",
    recency: "Last 12 months",
    source: "Discord",
    platform: "LeetCode"
  },
  {
    id: 54,
    company: "Microsoft",
    role: "SDE-1",
    question: "Coin Change",
    link: "https://leetcode.com/problems/coin-change/",
    topic: ["Dynamic Programming", "Arrays"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "LinkedIn",
    platform: "LeetCode"
  },
  {
    id: 55,
    company: "Microsoft",
    role: "New Grad",
    question: "Majority Element",
    link: "https://leetcode.com/problems/majority-element/",
    topic: ["Arrays", "HashMap", "Voting"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Medium",
    platform: "LeetCode"
  },
  {
    id: 56,
    company: "Microsoft",
    role: "SDE-2",
    question: "Task Scheduler",
    link: "https://leetcode.com/problems/task-scheduler/",
    topic: ["Arrays", "Heap", "Greedy"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "GitHub",
    platform: "LeetCode"
  },
  {
    id: 57,
    company: "Microsoft",
    role: "SDE-1",
    question: "Rotate Array",
    link: "https://leetcode.com/problems/rotate-array/",
    topic: ["Arrays", "Math"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Blind",
    platform: "LeetCode"
  },
  {
    id: 58,
    company: "Microsoft",
    role: "New Grad",
    question: "Plus One",
    link: "https://leetcode.com/problems/plus-one/",
    topic: ["Arrays", "Math"],
    difficulty: "Easy",
    round: "OA",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Reddit",
    platform: "LeetCode"
  },
  {
    id: 59,
    company: "Microsoft",
    role: "SDE-2",
    question: "Design Tic-Tac-Toe",
    link: "https://leetcode.com/problems/design-tic-tac-toe/",
    topic: ["Design", "Arrays"],
    difficulty: "Medium",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Glassdoor",
    platform: "LeetCode"
  },
  {
    id: 60,
    company: "Microsoft",
    role: "SDE-1",
    question: "Pacific Atlantic Water Flow",
    link: "https://leetcode.com/problems/pacific-atlantic-water-flow/",
    topic: ["Graphs", "DFS", "Matrix"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "CareerCup",
    platform: "LeetCode"
  },

  // Amazon Questions (30+)
  {
    id: 61,
    company: "Amazon",
    role: "SDE-1",
    question: "Two Sum",
    link: "https://leetcode.com/problems/two-sum/",
    topic: ["Arrays", "HashMap"],
    difficulty: "Easy",
    round: "OA",
    frequency: "High",
    recency: "Last 3 months",
    source: "Blind",
    platform: "LeetCode"
  },
  {
    id: 62,
    company: "Amazon",
    role: "SDE-2",
    question: "Design Amazon Locker",
    link: "https://www.geeksforgeeks.org/design-amazon-locker-system/",
    topic: ["System Design", "OOP", "Database"],
    difficulty: "Hard",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "YouTube",
    platform: "GeeksforGeeks"
  },
  {
    id: 63,
    company: "Amazon",
    role: "New Grad",
    question: "Valid Palindrome",
    link: "https://leetcode.com/problems/valid-palindrome/",
    topic: ["Strings", "Two Pointers"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Discord",
    platform: "LeetCode"
  },
  {
    id: 64,
    company: "Amazon",
    role: "SDE-1",
    question: "Rotting Oranges",
    link: "https://leetcode.com/problems/rotting-oranges/",
    topic: ["Graphs", "BFS", "Matrix"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "LinkedIn",
    platform: "LeetCode"
  },
  {
    id: 65,
    company: "Amazon",
    role: "SDE-2",
    question: "Critical Connections in Network",
    link: "https://leetcode.com/problems/critical-connections-in-a-network/",
    topic: ["Graphs", "DFS", "Tarjan"],
    difficulty: "Hard",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Medium",
    platform: "LeetCode"
  },
  {
    id: 66,
    company: "Amazon",
    role: "New Grad",
    question: "Implement Queue using Stacks",
    link: "https://leetcode.com/problems/implement-queue-using-stacks/",
    topic: ["Stack", "Queue", "Design"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "GitHub",
    platform: "LeetCode"
  },
  {
    id: 67,
    company: "Amazon",
    role: "SDE-1",
    question: "Word Ladder II",
    link: "https://leetcode.com/problems/word-ladder-ii/",
    topic: ["BFS", "Backtracking", "Strings"],
    difficulty: "Hard",
    round: "Technical",
    frequency: "Low",
    recency: "Last 12 months",
    source: "Blind",
    platform: "LeetCode"
  },
  {
    id: 68,
    company: "Amazon",
    role: "SDE-2",
    question: "Design Movie Recommendation System",
    link: "https://www.geeksforgeeks.org/design-a-movie-recommendation-system/",
    topic: ["System Design", "Machine Learning", "Database"],
    difficulty: "Hard",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Reddit",
    platform: "GeeksforGeeks"
  },
  {
    id: 69,
    company: "Amazon",
    role: "New Grad",
    question: "Remove Duplicates from Sorted Array",
    link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    topic: ["Arrays", "Two Pointers"],
    difficulty: "Easy",
    round: "OA",
    frequency: "High",
    recency: "Last 3 months",
    source: "Glassdoor",
    platform: "LeetCode"
  },
  {
    id: 70,
    company: "Amazon",
    role: "SDE-1",
    question: "Prison Cells After N Days",
    link: "https://leetcode.com/problems/prison-cells-after-n-days/",
    topic: ["Arrays", "Simulation", "Cycle Detection"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "CareerCup",
    platform: "LeetCode"
  },
  {
    id: 71,
    company: "Amazon",
    role: "SDE-2",
    question: "Maximal Rectangle",
    link: "https://leetcode.com/problems/maximal-rectangle/",
    topic: ["Dynamic Programming", "Stack", "Matrix"],
    difficulty: "Hard",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "YouTube",
    platform: "LeetCode"
  },
  {
    id: 72,
    company: "Amazon",
    role: "New Grad",
    question: "First Bad Version",
    link: "https://leetcode.com/problems/first-bad-version/",
    topic: ["Binary Search", "Interactive"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Discord",
    platform: "LeetCode"
  },
  {
    id: 73,
    company: "Amazon",
    role: "SDE-1",
    question: "Reorder Data in Log Files",
    link: "https://leetcode.com/problems/reorder-data-in-log-files/",
    topic: ["Strings", "Sorting"],
    difficulty: "Easy",
    round: "OA",
    frequency: "High",
    recency: "Last 3 months",
    source: "LinkedIn",
    platform: "LeetCode"
  },
  {
    id: 74,
    company: "Amazon",
    role: "SDE-2",
    question: "Design Underground System",
    link: "https://leetcode.com/problems/design-underground-system/",
    topic: ["Design", "HashMap"],
    difficulty: "Medium",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Medium",
    platform: "LeetCode"
  },
  {
    id: 75,
    company: "Amazon",
    role: "SDE-1",
    question: "K Closest Points to Origin",
    link: "https://leetcode.com/problems/k-closest-points-to-origin/",
    topic: ["Arrays", "Heap", "Sorting"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "GitHub",
    platform: "LeetCode"
  },
  {
    id: 76,
    company: "Amazon",
    role: "New Grad",
    question: "Fizz Buzz",
    link: "https://leetcode.com/problems/fizz-buzz/",
    topic: ["Math", "Strings"],
    difficulty: "Easy",
    round: "OA",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Blind",
    platform: "LeetCode"
  },
  {
    id: 77,
    company: "Amazon",
    role: "SDE-2",
    question: "Design Data Stream as Disjoint Intervals",
    link: "https://leetcode.com/problems/data-stream-as-disjoint-intervals/",
    topic: ["Design", "Binary Search", "Intervals"],
    difficulty: "Hard",
    round: "Design",
    frequency: "Low",
    recency: "Last 12 months",
    source: "Reddit",
    platform: "LeetCode"
  },
  {
    id: 78,
    company: "Amazon",
    role: "SDE-1",
    question: "Shortest Path in Binary Matrix",
    link: "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
    topic: ["Graphs", "BFS", "Matrix"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Glassdoor",
    platform: "LeetCode"
  },
  {
    id: 79,
    company: "Amazon",
    role: "New Grad",
    question: "Sum of Two Integers",
    link: "https://leetcode.com/problems/sum-of-two-integers/",
    topic: ["Bit Manipulation", "Math"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "CareerCup",
    platform: "LeetCode"
  },
  {
    id: 80,
    company: "Amazon",
    role: "SDE-2",
    question: "Design Food Delivery System",
    link: "https://www.geeksforgeeks.org/design-food-delivery-system-like-uber-eats/",
    topic: ["System Design", "Database", "Geolocation"],
    difficulty: "Hard",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "YouTube",
    platform: "GeeksforGeeks"
  },
  {
    id: 81,
    company: "Amazon",
    role: "SDE-1",
    question: "Minimum Cost to Connect Sticks",
    link: "https://leetcode.com/problems/minimum-cost-to-connect-sticks/",
    topic: ["Heap", "Greedy"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Discord",
    platform: "LeetCode"
  },
  {
    id: 82,
    company: "Amazon",
    role: "New Grad",
    question: "Merge Two Sorted Lists",
    link: "https://leetcode.com/problems/merge-two-sorted-lists/",
    topic: ["LinkedList", "Recursion"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "LinkedIn",
    platform: "LeetCode"
  },
  {
    id: 83,
    company: "Amazon",
    role: "SDE-2",
    question: "Sliding Window Median",
    link: "https://leetcode.com/problems/sliding-window-median/",
    topic: ["Sliding Window", "Heap", "Arrays"],
    difficulty: "Hard",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Medium",
    platform: "LeetCode"
  },
  {
    id: 84,
    company: "Amazon",
    role: "SDE-1",
    question: "Search Suggestions System",
    link: "https://leetcode.com/problems/search-suggestions-system/",
    topic: ["Trie", "Binary Search", "Strings"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "GitHub",
    platform: "LeetCode"
  },
  {
    id: 85,
    company: "Amazon",
    role: "New Grad",
    question: "Length of Last Word",
    link: "https://leetcode.com/problems/length-of-last-word/",
    topic: ["Strings"],
    difficulty: "Easy",
    round: "OA",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Blind",
    platform: "LeetCode"
  },
  {
    id: 86,
    company: "Amazon",
    role: "SDE-2",
    question: "Design In-Memory File System",
    link: "https://leetcode.com/problems/design-in-memory-file-system/",
    topic: ["Design", "Trie", "HashMap"],
    difficulty: "Hard",
    round: "Design",
    frequency: "Low",
    recency: "Last 12 months",
    source: "Reddit",
    platform: "LeetCode"
  },
  {
    id: 87,
    company: "Amazon",
    role: "SDE-1",
    question: "Partition Labels",
    link: "https://leetcode.com/problems/partition-labels/",
    topic: ["Strings", "Greedy", "Two Pointers"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Glassdoor",
    platform: "LeetCode"
  },
  {
    id: 88,
    company: "Amazon",
    role: "New Grad",
    question: "Sqrt(x)",
    link: "https://leetcode.com/problems/sqrtx/",
    topic: ["Binary Search", "Math"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "CareerCup",
    platform: "LeetCode"
  },
  {
    id: 89,
    company: "Amazon",
    role: "SDE-2",
    question: "Maximum Frequency Stack",
    link: "https://leetcode.com/problems/maximum-frequency-stack/",
    topic: ["Stack", "HashMap", "Design"],
    difficulty: "Hard",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "YouTube",
    platform: "LeetCode"
  },
  {
    id: 90,
    company: "Amazon",
    role: "SDE-1",
    question: "Find All Anagrams in String",
    link: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
    topic: ["Strings", "Sliding Window", "HashMap"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Discord",
    platform: "LeetCode"
  },

  // Meta Questions (30+)
  {
    id: 91,
    company: "Meta",
    role: "E4",
    question: "Binary Tree Maximum Path Sum",
    link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
    topic: ["Trees", "DFS", "Dynamic Programming"],
    difficulty: "Hard",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Glassdoor",
    platform: "LeetCode"
  },
  {
    id: 92,
    company: "Meta",
    role: "E3",
    question: "Remove Invalid Parentheses",
    link: "https://leetcode.com/problems/remove-invalid-parentheses/",
    topic: ["Strings", "BFS", "DFS"],
    difficulty: "Hard",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "LinkedIn",
    platform: "LeetCode"
  },
  {
    id: 93,
    company: "Meta",
    role: "New Grad",
    question: "Binary Tree Vertical Order Traversal",
    link: "https://leetcode.com/problems/binary-tree-vertical-order-traversal/",
    topic: ["Trees", "BFS", "HashMap"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Medium",
    platform: "LeetCode"
  },
  {
    id: 94,
    company: "Meta",
    role: "E4",
    question: "Design Facebook News Feed",
    link: "https://www.geeksforgeeks.org/design-facebook-news-feed/",
    topic: ["System Design", "Database", "Caching"],
    difficulty: "Hard",
    round: "Design",
    frequency: "High",
    recency: "Last 3 months",
    source: "GitHub",
    platform: "GeeksforGeeks"
  },
  {
    id: 95,
    company: "Meta",
    role: "E3",
    question: "Subarray Sum Equals K",
    link: "https://leetcode.com/problems/subarray-sum-equals-k/",
    topic: ["Arrays", "HashMap", "Prefix Sum"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Blind",
    platform: "LeetCode"
  },
  {
    id: 96,
    company: "Meta",
    role: "New Grad",
    question: "Valid Palindrome II",
    link: "https://leetcode.com/problems/valid-palindrome-ii/",
    topic: ["Strings", "Two Pointers"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Reddit",
    platform: "LeetCode"
  },
  {
    id: 97,
    company: "Meta",
    role: "E4",
    question: "Expression Add Operators",
    link: "https://leetcode.com/problems/expression-add-operators/",
    topic: ["Backtracking", "Strings", "Math"],
    difficulty: "Hard",
    round: "Technical",
    frequency: "Low",
    recency: "Last 12 months",
    source: "Glassdoor",
    platform: "LeetCode"
  },
  {
    id: 98,
    company: "Meta",
    role: "E3",
    question: "Buildings With Ocean View",
    link: "https://leetcode.com/problems/buildings-with-an-ocean-view/",
    topic: ["Arrays", "Stack"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "CareerCup",
    platform: "LeetCode"
  },
  {
    id: 99,
    company: "Meta",
    role: "New Grad",
    question: "Range Sum of BST",
    link: "https://leetcode.com/problems/range-sum-of-bst/",
    topic: ["Trees", "DFS", "BST"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "YouTube",
    platform: "LeetCode"
  },
  {
    id: 100,
    company: "Meta",
    role: "E4",
    question: "Design Chat System",
    link: "https://www.geeksforgeeks.org/design-a-chat-system/",
    topic: ["System Design", "WebSocket", "Database"],
    difficulty: "Hard",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Discord",
    platform: "GeeksforGeeks"
  },
  {
    id: 101,
    company: "Meta",
    role: "E3",
    question: "Simplify Path",
    link: "https://leetcode.com/problems/simplify-path/",
    topic: ["Strings", "Stack"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "LinkedIn",
    platform: "LeetCode"
  },
  {
    id: 102,
    company: "Meta",
    role: "New Grad",
    question: "Intersection of Two Linked Lists",
    link: "https://leetcode.com/problems/intersection-of-two-linked-lists/",
    topic: ["LinkedList", "Two Pointers"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Medium",
    platform: "LeetCode"
  },
  {
    id: 103,
    company: "Meta",
    role: "E4",
    question: "Random Pick with Weight",
    link: "https://leetcode.com/problems/random-pick-with-weight/",
    topic: ["Arrays", "Binary Search", "Random"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "GitHub",
    platform: "LeetCode"
  },
  {
    id: 104,
    company: "Meta",
    role: "E3",
    question: "Accounts Merge",
    link: "https://leetcode.com/problems/accounts-merge/",
    topic: ["Union Find", "DFS", "Graphs"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Blind",
    platform: "LeetCode"
  },
  {
    id: 105,
    company: "Meta",
    role: "New Grad",
    question: "Diameter of Binary Tree",
    link: "https://leetcode.com/problems/diameter-of-binary-tree/",
    topic: ["Trees", "DFS"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Reddit",
    platform: "LeetCode"
  },
  {
    id: 106,
    company: "Meta",
    role: "E4",
    question: "Design Facebook Messenger",
    link: "https://www.geeksforgeeks.org/design-whatsapp-a-system-design-interview/",
    topic: ["System Design", "Real-time", "Database"],
    difficulty: "Hard",
    round: "Design",
    frequency: "High",
    recency: "Last 3 months",
    source: "Glassdoor",
    platform: "GeeksforGeeks"
  },
  {
    id: 107,
    company: "Meta",
    role: "E3",
    question: "Dot Product of Two Sparse Vectors",
    link: "https://leetcode.com/problems/dot-product-of-two-sparse-vectors/",
    topic: ["Arrays", "HashMap", "Design"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "CareerCup",
    platform: "LeetCode"
  },
  {
    id: 108,
    company: "Meta",
    role: "New Grad",
    question: "Binary Tree Paths",
    link: "https://leetcode.com/problems/binary-tree-paths/",
    topic: ["Trees", "DFS", "Backtracking"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "YouTube",
    platform: "LeetCode"
  },
  {
    id: 109,
    company: "Meta",
    role: "E4",
    question: "Read N Characters Given Read4 II",
    link: "https://leetcode.com/problems/read-n-characters-given-read4-ii-call-multiple-times/",
    topic: ["Design", "Strings"],
    difficulty: "Hard",
    round: "Technical",
    frequency: "Low",
    recency: "Last 12 months",
    source: "Discord",
    platform: "LeetCode"
  },
  {
    id: 110,
    company: "Meta",
    role: "E3",
    question: "Minimum Remove to Make Valid Parentheses",
    link: "https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/",
    topic: ["Strings", "Stack"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "LinkedIn",
    platform: "LeetCode"
  },
  {
    id: 111,
    company: "Meta",
    role: "New Grad",
    question: "Lowest Common Ancestor of Binary Tree",
    link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    topic: ["Trees", "DFS"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Medium",
    platform: "LeetCode"
  },
  {
    id: 112,
    company: "Meta",
    role: "E4",
    question: "Design Instagram",
    link: "https://www.geeksforgeeks.org/design-instagram-a-system-design-interview/",
    topic: ["System Design", "Database", "CDN"],
    difficulty: "Hard",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "GitHub",
    platform: "GeeksforGeeks"
  },
  {
    id: 113,
    company: "Meta",
    role: "E3",
    question: "Convert Binary Search Tree to Sorted Doubly Linked List",
    link: "https://leetcode.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list/",
    topic: ["Trees", "LinkedList", "DFS"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Blind",
    platform: "LeetCode"
  },
  {
    id: 114,
    company: "Meta",
    role: "New Grad",
    question: "Valid Word Abbreviation",
    link: "https://leetcode.com/problems/valid-word-abbreviation/",
    topic: ["Strings", "Two Pointers"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Reddit",
    platform: "LeetCode"
  },
  {
    id: 115,
    company: "Meta",
    role: "E4",
    question: "Sparse Matrix Multiplication",
    link: "https://leetcode.com/problems/sparse-matrix-multiplication/",
    topic: ["Arrays", "Matrix", "HashMap"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Glassdoor",
    platform: "LeetCode"
  },
  {
    id: 116,
    company: "Meta",
    role: "E3",
    question: "Nested List Weight Sum",
    link: "https://leetcode.com/problems/nested-list-weight-sum/",
    topic: ["DFS", "Recursion"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "CareerCup",
    platform: "LeetCode"
  },
  {
    id: 117,
    company: "Meta",
    role: "New Grad",
    question: "Move Zeroes",
    link: "https://leetcode.com/problems/move-zeroes/",
    topic: ["Arrays", "Two Pointers"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "YouTube",
    platform: "LeetCode"
  },
  {
    id: 118,
    company: "Meta",
    role: "E4",
    question: "Exclusive Time of Functions",
    link: "https://leetcode.com/problems/exclusive-time-of-functions/",
    topic: ["Stack", "Arrays"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Discord",
    platform: "LeetCode"
  },
  {
    id: 119,
    company: "Meta",
    role: "E3",
    question: "Is Graph Bipartite",
    link: "https://leetcode.com/problems/is-graph-bipartite/",
    topic: ["Graphs", "BFS", "DFS"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "LinkedIn",
    platform: "LeetCode"
  },
  {
    id: 120,
    company: "Meta",
    role: "New Grad",
    question: "Add Strings",
    link: "https://leetcode.com/problems/add-strings/",
    topic: ["Strings", "Math"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Medium",
    platform: "LeetCode"
  },

  // Apple Questions (30+)
  {
    id: 121,
    company: "Apple",
    role: "SDE",
    question: "LRU Cache Implementation",
    link: "https://leetcode.com/problems/lru-cache/",
    topic: ["System Design", "HashMap", "LinkedList"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "LinkedIn",
    platform: "LeetCode"
  },
  {
    id: 122,
    company: "Apple",
    role: "SDE-2",
    question: "Design Music Streaming Service",
    link: "https://www.geeksforgeeks.org/design-a-music-streaming-service/",
    topic: ["System Design", "Database", "CDN"],
    difficulty: "Hard",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "GitHub",
    platform: "GeeksforGeeks"
  },
  {
    id: 123,
    company: "Apple",
    role: "New Grad",
    question: "Fibonacci Number",
    link: "https://leetcode.com/problems/fibonacci-number/",
    topic: ["Dynamic Programming", "Math", "Recursion"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Blind",
    platform: "LeetCode"
  },
  {
    id: 124,
    company: "Apple",
    role: "SDE-1",
    question: "Sum of Left Leaves",
    link: "https://leetcode.com/problems/sum-of-left-leaves/",
    topic: ["Trees", "DFS"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Reddit",
    platform: "LeetCode"
  },
  {
    id: 125,
    company: "Apple",
    role: "SDE-2",
    question: "Design Apple Wallet",
    link: "https://www.geeksforgeeks.org/design-a-digital-wallet/",
    topic: ["System Design", "Security", "Database"],
    difficulty: "Hard",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Glassdoor",
    platform: "GeeksforGeeks"
  },
  {
    id: 126,
    company: "Apple",
    role: "SDE-1",
    question: "Delete Node in a BST",
    link: "https://leetcode.com/problems/delete-node-in-a-bst/",
    topic: ["Trees", "BST", "Recursion"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "CareerCup",
    platform: "LeetCode"
  },
  {
    id: 127,
    company: "Apple",
    role: "New Grad",
    question: "Happy Number",
    link: "https://leetcode.com/problems/happy-number/",
    topic: ["Math", "HashMap", "Two Pointers"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "YouTube",
    platform: "LeetCode"
  },
  {
    id: 128,
    company: "Apple",
    role: "SDE-1",
    question: "Spiral Matrix",
    link: "https://leetcode.com/problems/spiral-matrix/",
    topic: ["Matrix", "Arrays"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Discord",
    platform: "LeetCode"
  },
  {
    id: 129,
    company: "Apple",
    role: "SDE-2",
    question: "Design iOS Notification System",
    link: "https://www.geeksforgeeks.org/design-notification-system/",
    topic: ["System Design", "Queue", "Real-time"],
    difficulty: "Hard",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "LinkedIn",
    platform: "GeeksforGeeks"
  },
  {
    id: 130,
    company: "Apple",
    role: "SDE-1",
    question: "Next Greater Element I",
    link: "https://leetcode.com/problems/next-greater-element-i/",
    topic: ["Stack", "Arrays", "HashMap"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Medium",
    platform: "LeetCode"
  },
  {
    id: 131,
    company: "Apple",
    role: "New Grad",
    question: "Pascal's Triangle",
    link: "https://leetcode.com/problems/pascals-triangle/",
    topic: ["Arrays", "Dynamic Programming"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "GitHub",
    platform: "LeetCode"
  },
  {
    id: 132,
    company: "Apple",
    role: "SDE-2",
    question: "Maximum Product Subarray",
    link: "https://leetcode.com/problems/maximum-product-subarray/",
    topic: ["Arrays", "Dynamic Programming"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Blind",
    platform: "LeetCode"
  },
  {
    id: 133,
    company: "Apple",
    role: "SDE-1",
    question: "Validate Binary Search Tree",
    link: "https://leetcode.com/problems/validate-binary-search-tree/",
    topic: ["Trees", "DFS", "BST"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Reddit",
    platform: "LeetCode"
  },
  {
    id: 134,
    company: "Apple",
    role: "New Grad",
    question: "Excel Sheet Column Number",
    link: "https://leetcode.com/problems/excel-sheet-column-number/",
    topic: ["Math", "Strings"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Glassdoor",
    platform: "LeetCode"
  },
  {
    id: 135,
    company: "Apple",
    role: "SDE-2",
    question: "Design Siri Voice Assistant",
    link: "https://www.geeksforgeeks.org/design-voice-assistant-system/",
    topic: ["System Design", "ML", "Real-time"],
    difficulty: "Hard",
    round: "Design",
    frequency: "Low",
    recency: "Last 12 months",
    source: "CareerCup",
    platform: "GeeksforGeeks"
  },
  {
    id: 136,
    company: "Apple",
    role: "SDE-1",
    question: "Binary Tree Zigzag Level Order Traversal",
    link: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
    topic: ["Trees", "BFS"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "YouTube",
    platform: "LeetCode"
  },
  {
    id: 137,
    company: "Apple",
    role: "New Grad",
    question: "Power of Two",
    link: "https://leetcode.com/problems/power-of-two/",
    topic: ["Math", "Bit Manipulation"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Discord",
    platform: "LeetCode"
  },
  {
    id: 138,
    company: "Apple",
    role: "SDE-1",
    question: "Decode String",
    link: "https://leetcode.com/problems/decode-string/",
    topic: ["Stack", "Strings", "Recursion"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "LinkedIn",
    platform: "LeetCode"
  },
  {
    id: 139,
    company: "Apple",
    role: "SDE-2",
    question: "Design FaceTime",
    link: "https://www.geeksforgeeks.org/design-video-calling-system/",
    topic: ["System Design", "Video Streaming", "Real-time"],
    difficulty: "Hard",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Medium",
    platform: "GeeksforGeeks"
  },
  {
    id: 140,
    company: "Apple",
    role: "SDE-1",
    question: "Construct Binary Tree from Preorder and Inorder",
    link: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
    topic: ["Trees", "Arrays", "Divide and Conquer"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "GitHub",
    platform: "LeetCode"
  },
  {
    id: 141,
    company: "Apple",
    role: "New Grad",
    question: "Counting Bits",
    link: "https://leetcode.com/problems/counting-bits/",
    topic: ["Bit Manipulation", "Dynamic Programming"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Blind",
    platform: "LeetCode"
  },
  {
    id: 142,
    company: "Apple",
    role: "SDE-1",
    question: "Find Minimum in Rotated Sorted Array",
    link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    topic: ["Arrays", "Binary Search"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Reddit",
    platform: "LeetCode"
  },
  {
    id: 143,
    company: "Apple",
    role: "SDE-2",
    question: "Design App Store",
    link: "https://www.geeksforgeeks.org/design-app-store/",
    topic: ["System Design", "Database", "Recommendation"],
    difficulty: "Hard",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Glassdoor",
    platform: "GeeksforGeeks"
  },
  {
    id: 144,
    company: "Apple",
    role: "SDE-1",
    question: "Invert Binary Tree",
    link: "https://leetcode.com/problems/invert-binary-tree/",
    topic: ["Trees", "DFS", "BFS"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "CareerCup",
    platform: "LeetCode"
  },
  {
    id: 145,
    company: "Apple",
    role: "New Grad",
    question: "Find the Difference",
    link: "https://leetcode.com/problems/find-the-difference/",
    topic: ["Strings", "Bit Manipulation", "HashMap"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "YouTube",
    platform: "LeetCode"
  },
  {
    id: 146,
    company: "Apple",
    role: "SDE-1",
    question: "Unique Paths",
    link: "https://leetcode.com/problems/unique-paths/",
    topic: ["Dynamic Programming", "Math"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Discord",
    platform: "LeetCode"
  },
  {
    id: 147,
    company: "Apple",
    role: "SDE-2",
    question: "Design iCloud File Sync",
    link: "https://www.geeksforgeeks.org/design-cloud-file-storage-system/",
    topic: ["System Design", "Distributed Systems", "Sync"],
    difficulty: "Hard",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "LinkedIn",
    platform: "GeeksforGeeks"
  },
  {
    id: 148,
    company: "Apple",
    role: "SDE-1",
    question: "Generate Parentheses",
    link: "https://leetcode.com/problems/generate-parentheses/",
    topic: ["Backtracking", "Strings"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Medium",
    platform: "LeetCode"
  },
  {
    id: 149,
    company: "Apple",
    role: "New Grad",
    question: "Reverse String",
    link: "https://leetcode.com/problems/reverse-string/",
    topic: ["Strings", "Two Pointers"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "GitHub",
    platform: "LeetCode"
  },
  {
    id: 150,
    company: "Apple",
    role: "SDE-1",
    question: "Container With Most Water",
    link: "https://leetcode.com/problems/container-with-most-water/",
    topic: ["Arrays", "Two Pointers"],
    difficulty: "Medium",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "Blind",
    platform: "LeetCode"
  }
];

const Index = () => {
  const [filters, setFilters] = useState({
    company: "all",
    topic: "all",
    difficulty: "all",
    round: "all",
    recency: "all",
    frequency: "all",
    platform: "all"
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("questions");

  const filteredQuestions = useMemo(() => {
    return mockQuestions.filter((q) => {
      const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           q.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCompany = filters.company === "all" || q.company === filters.company;
      const matchesTopic = filters.topic === "all" || q.topic.some(t => t === filters.topic);
      const matchesDifficulty = filters.difficulty === "all" || q.difficulty === filters.difficulty;
      const matchesRound = filters.round === "all" || q.round === filters.round;
      const matchesRecency = filters.recency === "all" || q.recency === filters.recency;
      const matchesFrequency = filters.frequency === "all" || q.frequency === filters.frequency;
      const matchesPlatform = filters.platform === "all" || q.platform === filters.platform;

      return matchesSearch && matchesCompany && matchesTopic && matchesDifficulty && 
             matchesRound && matchesRecency && matchesFrequency && matchesPlatform;
    });
  }, [filters, searchTerm]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      company: "all",
      topic: "all",
      difficulty: "all",
      round: "all",
      recency: "all",
      frequency: "all",
      platform: "all"
    });
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  InterviewPrepHub
                </h1>
                <p className="text-sm text-gray-600">Latest coding interview questions from top tech companies</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <TrendingUp className="w-4 h-4 mr-1" />
                {mockQuestions.length} Questions
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Users className="w-4 h-4 mr-1" />
                10+ Companies
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search questions, companies, or topics..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{filteredQuestions.length}</div>
              <p className="text-blue-100 text-sm">Across all companies</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">High Frequency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {filteredQuestions.filter(q => q.frequency === "High").length}
              </div>
              <p className="text-green-100 text-sm">Most asked questions</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {filteredQuestions.filter(q => q.recency === "Last 3 months").length}
              </div>
              <p className="text-purple-100 text-sm">Asked in last 3 months</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {new Set(filteredQuestions.map(q => q.company)).size}
              </div>
              <p className="text-orange-100 text-sm">Unique companies</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="insights">Company Insights</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filter Panel */}
              <div className="lg:col-span-1">
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={clearFilters}
                  questions={mockQuestions}
                />
              </div>
              
              {/* Questions Table */}
              <div className="lg:col-span-3">
                <QuestionTable questions={filteredQuestions} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <CompanyInsights questions={mockQuestions} />
          </TabsContent>

          <TabsContent value="analytics">
            <StatsDashboard questions={mockQuestions} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">InterviewPrepHub</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Discover the latest coding interview questions from top tech companies. 
                Practice with direct links to LeetCode, GeeksforGeeks, and more.
              </p>
              <div className="flex space-x-4">
                <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-600">
                  Updated Daily
                </Badge>
                <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-600">
                  10+ Sources
                </Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">LeetCode</a></li>
                <li><a href="#" className="hover:text-white">GeeksforGeeks</a></li>
                <li><a href="#" className="hover:text-white">HackerRank</a></li>
                <li><a href="#" className="hover:text-white">Codeforces</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Data Sources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>LeetCode Discuss</li>
                <li>Reddit Communities</li>
                <li>Blind</li>
                <li>Glassdoor</li>
                <li>GitHub Repos</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 InterviewPrepHub. Built for developers, by developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
