
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Question {
  frequency: string;
  recency: string;
  company: string;
}

interface StatsCardsProps {
  questions: Question[];
}

export const StatsCards = ({ questions }: StatsCardsProps) => {
  const totalQuestions = questions.length;
  const highFrequencyQuestions = questions.filter(q => q.frequency === "High").length;
  const recentQuestions = questions.filter(q => q.recency === "Last 3 months").length;
  const uniqueCompanies = new Set(questions.map(q => q.company)).size;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Total Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalQuestions}</div>
          <p className="text-blue-100 text-sm">Across all companies</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">High Frequency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{highFrequencyQuestions}</div>
          <p className="text-green-100 text-sm">Most asked questions</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Recent</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{recentQuestions}</div>
          <p className="text-purple-100 text-sm">Asked in last 3 months</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Companies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{uniqueCompanies}</div>
          <p className="text-orange-100 text-sm">Unique companies</p>
        </CardContent>
      </Card>
    </div>
  );
};
