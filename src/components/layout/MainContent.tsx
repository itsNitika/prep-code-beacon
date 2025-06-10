
import { useState } from "react";
import { QuestionTable } from "@/components/QuestionTable";
import { FilterPanel } from "@/components/FilterPanel";
import { CompanyInsights } from "@/components/CompanyInsights";
import { StatsDashboard } from "@/components/StatsDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

interface Filters {
  company: string;
  topic: string;
  difficulty: string;
  round: string;
  recency: string;
  frequency: string;
  platform: string;
}

interface MainContentProps {
  filteredQuestions: Question[];
  allQuestions: Question[];
  filters: Filters;
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

export const MainContent = ({
  filteredQuestions,
  allQuestions,
  filters,
  onFilterChange,
  onClearFilters
}: MainContentProps) => {
  const [activeTab, setActiveTab] = useState("questions");

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto">
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="insights">Company Insights</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <FilterPanel
                filters={filters}
                onFilterChange={onFilterChange}
                onClearFilters={onClearFilters}
                questions={allQuestions}
              />
            </div>
            
            <div className="lg:col-span-3">
              <QuestionTable questions={filteredQuestions} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights">
          <CompanyInsights questions={allQuestions} />
        </TabsContent>

        <TabsContent value="analytics">
          <StatsDashboard questions={allQuestions} />
        </TabsContent>
      </Tabs>
    </main>
  );
};
