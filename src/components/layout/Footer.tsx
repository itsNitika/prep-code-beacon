
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Footer = () => {
  return (
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
  );
};
