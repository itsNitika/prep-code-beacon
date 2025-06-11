
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

interface HeaderProps {
  totalQuestions: number;
  totalCompanies: number;
}

export const Header = ({ totalQuestions, totalCompanies }: HeaderProps) => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-700 via-coral-500 to-pink-500 bg-clip-text text-transparent">
              InterviewPrepHub
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Master your next technical interview with {totalQuestions} questions from {totalCompanies} top companies
            </p>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-slate-600 bg-slate-100 px-3 py-2 rounded-lg">
                <User className="h-4 w-4 text-coral-500" />
                <span>{user.email}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={signOut}
                className="flex items-center space-x-2 border-coral-200 text-coral-600 hover:bg-coral-50 hover:text-coral-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
