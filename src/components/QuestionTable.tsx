
import { ExternalLink, Clock, TrendingUp, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

interface QuestionTableProps {
  questions: Question[];
}

export const QuestionTable = ({ questions }: QuestionTableProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 border-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case "High": return "bg-red-100 text-red-800 border-red-200";
      case "Medium": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Low": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoundIcon = (round: string) => {
    switch (round) {
      case "OA": return "💻";
      case "Technical": return "🔧";
      case "Design": return "🎨";
      case "HR": return "👥";
      default: return "📝";
    }
  };

  if (questions.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <div className="text-gray-400 mb-4">
            <TrendingUp className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
          <p className="text-gray-500">Try adjusting your filters or search terms.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Interview Questions ({questions.length})
        </h2>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Clock className="w-4 h-4 mr-1" />
          Updated Daily
        </Badge>
      </div>

      <div className="grid gap-4">
        {questions.map((question) => (
          <Card key={question.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                      {question.company}
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      {question.role}
                    </Badge>
                    <span className="text-lg">{getRoundIcon(question.round)}</span>
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                      {question.round}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-medium leading-tight">
                    {question.question}
                  </CardTitle>
                </div>
                <Button asChild size="sm" className="ml-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <a href={question.link} target="_blank" rel="noopener noreferrer">
                    Practice <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Topics</p>
                  <div className="flex flex-wrap gap-1">
                    {question.topic.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Difficulty</p>
                  <Badge className={`text-xs ${getDifficultyColor(question.difficulty)}`}>
                    {question.difficulty}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Frequency</p>
                  <Badge className={`text-xs ${getFrequencyColor(question.frequency)}`}>
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {question.frequency}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Platform</p>
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    <MapPin className="w-3 h-3 mr-1" />
                    {question.platform}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {question.recency}
                  </span>
                  <span>Source: {question.source}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
