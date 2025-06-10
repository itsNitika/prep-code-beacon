
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Building, Users, Clock } from "lucide-react";

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

interface CompanyInsightsProps {
  questions: Question[];
}

export const CompanyInsights = ({ questions }: CompanyInsightsProps) => {
  const getCompanyStats = (companyName: string) => {
    const companyQuestions = questions.filter(q => q.company === companyName);
    const totalQuestions = companyQuestions.length;
    
    if (totalQuestions === 0) return null;

    const roundStats = {
      "Technical": companyQuestions.filter(q => q.round === "Technical").length,
      "Design": companyQuestions.filter(q => q.round === "Design").length,
      "OA": companyQuestions.filter(q => q.round === "OA").length,
      "HR": companyQuestions.filter(q => q.round === "HR").length,
    };

    const topicStats = companyQuestions.reduce((acc, q) => {
      q.topic.forEach(topic => {
        acc[topic] = (acc[topic] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const topTopics = Object.entries(topicStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    const highFrequencyCount = companyQuestions.filter(q => q.frequency === "High").length;
    const recentCount = companyQuestions.filter(q => q.recency === "Last 3 months").length;

    return {
      totalQuestions,
      roundStats,
      topTopics,
      highFrequencyCount,
      recentCount,
      highFrequencyPercentage: Math.round((highFrequencyCount / totalQuestions) * 100),
      recentPercentage: Math.round((recentCount / totalQuestions) * 100)
    };
  };

  const companies = [...new Set(questions.map(q => q.company))].sort();

  const getRoundIcon = (round: string) => {
    switch (round) {
      case "Technical": return "🔧";
      case "Design": return "🎨";
      case "OA": return "💻";
      case "HR": return "👥";
      default: return "📝";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Interview Insights</h2>
        <p className="text-gray-600">Analyze interview patterns and question trends by company</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => {
          const stats = getCompanyStats(company);
          if (!stats) return null;

          return (
            <Card key={company} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg">{company}</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {stats.totalQuestions} questions
                  </Badge>
                </div>
                <CardDescription>Interview question breakdown and trends</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Round Distribution */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Round Distribution
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(stats.roundStats).map(([round, count]) => {
                      if (count === 0) return null;
                      const percentage = Math.round((count / stats.totalQuestions) * 100);
                      return (
                        <div key={round} className="space-y-1">
                          <div className="flex justify-between items-center text-sm">
                            <span className="flex items-center">
                              <span className="mr-2">{getRoundIcon(round)}</span>
                              {round}
                            </span>
                            <span className="font-medium">{percentage}%</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Top Topics */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Top Topics
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {stats.topTopics.map(([topic, count]) => (
                      <Badge 
                        key={topic} 
                        variant="secondary" 
                        className="bg-purple-50 text-purple-700 border-purple-200"
                      >
                        {topic} ({count})
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {stats.highFrequencyPercentage}%
                    </div>
                    <div className="text-xs text-gray-500 flex items-center justify-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      High Frequency
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {stats.recentPercentage}%
                    </div>
                    <div className="text-xs text-gray-500 flex items-center justify-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Recent (3m)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
