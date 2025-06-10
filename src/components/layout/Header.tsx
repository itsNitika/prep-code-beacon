
import { BookOpen, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  totalQuestions: number;
  totalCompanies: number;
}

export const Header = ({ totalQuestions, totalCompanies }: HeaderProps) => {
  return (
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
              {totalQuestions} Questions
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Users className="w-4 h-4 mr-1" />
              {totalCompanies}+ Companies
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};
