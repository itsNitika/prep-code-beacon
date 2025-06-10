
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity } from "lucide-react";

interface Question {
  id: number;
  company: string;
  role: string;
  question: string;
  link: string;
  topic: string[];
  difficulty: string;
  round: string;
  frequency: string;
  recency: string;
  source: string;
  platform: string;
}

interface StatsDashboardProps {
  questions: Question[];
}

export const StatsDashboard = ({ questions }: StatsDashboardProps) => {
  // Company distribution
  const companyData = questions.reduce((acc, q) => {
    acc[q.company] = (acc[q.company] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const companyChartData = Object.entries(companyData)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 8)
    .map(([company, count]) => ({ company, count }));

  // Topic distribution
  const topicData = questions.reduce((acc, q) => {
    q.topic.forEach(topic => {
      acc[topic] = (acc[topic] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const topicChartData = Object.entries(topicData)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([topic, count]) => ({ topic, count }));

  // Difficulty distribution
  const difficultyData = questions.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const difficultyChartData = Object.entries(difficultyData)
    .map(([difficulty, count]) => ({ 
      difficulty, 
      count, 
      percentage: Math.round((count / questions.length) * 100) 
    }));

  // Round distribution
  const roundData = questions.reduce((acc, q) => {
    acc[q.round] = (acc[q.round] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const roundChartData = Object.entries(roundData)
    .map(([round, count]) => ({ round, count }));

  // Source distribution
  const sourceData = questions.reduce((acc, q) => {
    acc[q.source] = (acc[q.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sourceChartData = Object.entries(sourceData)
    .sort(([,a], [,b]) => b - a)
    .map(([source, count]) => ({ source, count }));

  // Colors for charts
  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#6366F1', '#EC4899', '#14B8A6'];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Interview Analytics Dashboard</h2>
        <p className="text-gray-600">Comprehensive insights and trends from interview question data</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Total Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{questions.length}</div>
            <p className="text-blue-100 text-sm">Across all companies</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <PieChartIcon className="h-5 w-5 mr-2" />
              Companies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{Object.keys(companyData).length}</div>
            <p className="text-purple-100 text-sm">Unique companies</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{Object.keys(topicData).length}</div>
            <p className="text-green-100 text-sm">Different topics</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              High Frequency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {questions.filter(q => q.frequency === "High").length}
            </div>
            <p className="text-orange-100 text-sm">Most asked questions</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              Questions by Company
            </CardTitle>
            <CardDescription>Top companies by number of interview questions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={companyChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="company" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Difficulty Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChartIcon className="h-5 w-5 mr-2 text-purple-600" />
              Difficulty Distribution
            </CardTitle>
            <CardDescription>Breakdown of questions by difficulty level</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={difficultyChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ difficulty, percentage }) => `${difficulty} (${percentage}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {difficultyChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Topic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Top Topics
            </CardTitle>
            <CardDescription>Most frequently asked topics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topicChartData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis 
                  dataKey="topic" 
                  type="category" 
                  width={100}
                  fontSize={12}
                />
                <Tooltip />
                <Bar dataKey="count" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Round Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-orange-600" />
              Interview Rounds
            </CardTitle>
            <CardDescription>Distribution across different interview rounds</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roundChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ round, count }) => `${round} (${count})`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {roundChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Data Sources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-indigo-600" />
            Data Sources
          </CardTitle>
          <CardDescription>Where we discover interview questions</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sourceChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="source" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Insights Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="text-lg">Most Active Company</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {companyChartData[0]?.company}
            </div>
            <p className="text-gray-600">{companyChartData[0]?.count} questions</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="text-lg">Trending Topic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {topicChartData[0]?.topic}
            </div>
            <p className="text-gray-600">{topicChartData[0]?.count} questions</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="text-lg">Top Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {sourceChartData[0]?.source}
            </div>
            <p className="text-gray-600">{sourceChartData[0]?.count} questions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
