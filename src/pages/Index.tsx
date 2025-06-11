
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { SearchBar } from "@/components/search/SearchBar";
import { StatsCards } from "@/components/stats/StatsCards";
import { MainContent } from "@/components/layout/MainContent";
import { Footer } from "@/components/layout/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useQuestionFilters } from "@/hooks/useQuestionFilters";
import { mockQuestions } from "@/data/mockQuestions";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user, loading } = useAuth();
  const {
    filters,
    searchTerm,
    filteredQuestions,
    handleFilterChange,
    clearFilters,
    setSearchTerm
  } = useQuestionFilters(mockQuestions);

  const totalCompanies = new Set(mockQuestions.map(q => q.company)).size;

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-slate-50 to-coral-50 flex items-center justify-center">
        <div className="text-lg text-slate-700">Loading...</div>
      </div>
    );
  }

  // Show login prompt for non-authenticated users
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-pink-300 to-coral-400 flex items-center justify-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-white rounded-full opacity-10"></div>
        <div className="absolute bottom-32 right-32 w-12 h-12 bg-slate-600 rounded-full opacity-15"></div>
        <div className="absolute top-1/3 right-20 w-8 h-8 bg-coral-300 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 left-1/4 w-6 h-6 bg-pink-200 rounded-full opacity-25"></div>
        
        {/* Abstract wave patterns */}
        <div className="absolute inset-0 opacity-5">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M0,60 Q25,40 50,60 T100,60 L100,100 L0,100 Z" fill="currentColor" className="text-slate-800"/>
          </svg>
        </div>
        
        <div className="text-center space-y-8 z-10 relative">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">InterviewPrepHub</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Master your next technical interview with {mockQuestions.length} questions from {totalCompanies} top companies
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto border border-white/20">
            <h3 className="text-2xl font-semibold text-white mb-4">Ready to get started?</h3>
            <p className="text-white/80 mb-6">Join thousands of developers who have aced their interviews</p>
            <Link to="/auth">
              <Button 
                size="lg" 
                className="w-full bg-coral-400 hover:bg-coral-500 text-white font-semibold py-4 text-lg rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-105"
              >
                Get Started - Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show main app for authenticated users
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-slate-50 to-coral-50">
        <Header 
          totalQuestions={mockQuestions.length} 
          totalCompanies={totalCompanies} 
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          <StatsCards questions={filteredQuestions} />

          <MainContent
            filteredQuestions={filteredQuestions}
            allQuestions={mockQuestions}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Index;
