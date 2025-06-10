
import { useState, useMemo } from "react";
import { QuestionTable } from "@/components/QuestionTable";
import { FilterPanel } from "@/components/FilterPanel";
import { CompanyInsights } from "@/components/CompanyInsights";
import { StatsDashboard } from "@/components/StatsDashboard";
import { Search, TrendingUp, BookOpen, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock data representing scraped questions
const mockQuestions = [
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
    company: "Netflix",
    role: "Senior SDE",
    question: "Design Netflix Video Streaming",
    link: "https://www.geeksforgeeks.org/design-video-streaming-service-like-netflix/",
    topic: ["System Design", "CDN", "Database"],
    difficulty: "Hard",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "YouTube",
    platform: "GeeksforGeeks"
  },
  {
    id: 7,
    company: "ByteDance",
    role: "New Grad",
    question: "Merge k Sorted Lists",
    link: "https://leetcode.com/problems/merge-k-sorted-lists/",
    topic: ["LinkedList", "Heap", "Divide and Conquer"],
    difficulty: "Hard",
    round: "OA",
    frequency: "High",
    recency: "Last 3 months",
    source: "Discord",
    platform: "LeetCode"
  },
  {
    id: 8,
    company: "Uber",
    role: "SDE-2",
    question: "Design Uber Ride Matching",
    link: "https://www.geeksforgeeks.org/design-cab-booking-like-uber/",
    topic: ["System Design", "Geolocation", "Real-time"],
    difficulty: "Hard",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "CareerCup",
    platform: "GeeksforGeeks"
  },
  {
    id: 9,
    company: "Salesforce",
    role: "SDE-1",
    question: "Valid Parentheses",
    link: "https://leetcode.com/problems/valid-parentheses/",
    topic: ["Stack", "Strings"],
    difficulty: "Easy",
    round: "Technical",
    frequency: "High",
    recency: "Last 3 months",
    source: "GitHub",
    platform: "LeetCode"
  },
  {
    id: 10,
    company: "Adobe",
    role: "MTS",
    question: "Design a Chat System",
    link: "https://www.geeksforgeeks.org/design-a-chat-system/",
    topic: ["System Design", "WebSocket", "Database"],
    difficulty: "Hard",
    round: "Design",
    frequency: "Medium",
    recency: "Last 6 months",
    source: "Medium",
    platform: "GeeksforGeeks"
  }
];

const Index = () => {
  const [filters, setFilters] = useState({
    company: "",
    topic: "",
    difficulty: "",
    round: "",
    recency: "",
    frequency: "",
    platform: ""
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("questions");

  const filteredQuestions = useMemo(() => {
    return mockQuestions.filter((q) => {
      const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           q.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCompany = !filters.company || q.company === filters.company;
      const matchesTopic = !filters.topic || q.topic.some(t => t === filters.topic);
      const matchesDifficulty = !filters.difficulty || q.difficulty === filters.difficulty;
      const matchesRound = !filters.round || q.round === filters.round;
      const matchesRecency = !filters.recency || q.recency === filters.recency;
      const matchesFrequency = !filters.frequency || q.frequency === filters.frequency;
      const matchesPlatform = !filters.platform || q.platform === filters.platform;

      return matchesSearch && matchesCompany && matchesTopic && matchesDifficulty && 
             matchesRound && matchesRecency && matchesFrequency && matchesPlatform;
    });
  }, [filters, searchTerm]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      company: "",
      topic: "",
      difficulty: "",
      round: "",
      recency: "",
      frequency: "",
      platform: ""
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
