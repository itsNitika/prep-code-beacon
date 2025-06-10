
import { Header } from "@/components/layout/Header";
import { SearchBar } from "@/components/search/SearchBar";
import { StatsCards } from "@/components/stats/StatsCards";
import { MainContent } from "@/components/layout/MainContent";
import { Footer } from "@/components/layout/Footer";
import { useQuestionFilters } from "@/hooks/useQuestionFilters";
import { mockQuestions } from "@/data/mockQuestions";

const Index = () => {
  const {
    filters,
    searchTerm,
    filteredQuestions,
    handleFilterChange,
    clearFilters,
    setSearchTerm
  } = useQuestionFilters(mockQuestions);

  const totalCompanies = new Set(mockQuestions.map(q => q.company)).size;

  return (
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
  );
};

export default Index;
