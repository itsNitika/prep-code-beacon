
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Show login prompt for non-authenticated users
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">InterviewPrepHub</h1>
          <p className="text-xl text-gray-600 max-w-md">
            Master your next technical interview with {mockQuestions.length} questions from {totalCompanies} top companies
          </p>
          <Link to="/auth">
            <Button size="lg">
              Get Started - Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Show main app for authenticated users
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
