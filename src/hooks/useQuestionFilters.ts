
import { useState, useMemo } from "react";

interface Question {
  id: number;
  company: string;
  topic: string[];
  difficulty: string;
  round: string;
  recency: string;
  frequency: string;
  platform: string;
  question: string;
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

export const useQuestionFilters = (questions: Question[]) => {
  const [filters, setFilters] = useState<Filters>({
    company: "all",
    topic: "all",
    difficulty: "all",
    round: "all",
    recency: "all",
    frequency: "all",
    platform: "all"
  });
  
  const [searchTerm, setSearchTerm] = useState("");

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           q.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCompany = filters.company === "all" || q.company === filters.company;
      const matchesTopic = filters.topic === "all" || q.topic.some(t => t === filters.topic);
      const matchesDifficulty = filters.difficulty === "all" || q.difficulty === filters.difficulty;
      const matchesRound = filters.round === "all" || q.round === filters.round;
      const matchesRecency = filters.recency === "all" || q.recency === filters.recency;
      const matchesFrequency = filters.frequency === "all" || q.frequency === filters.frequency;
      const matchesPlatform = filters.platform === "all" || q.platform === filters.platform;

      return matchesSearch && matchesCompany && matchesTopic && matchesDifficulty && 
             matchesRound && matchesRecency && matchesFrequency && matchesPlatform;
    });
  }, [filters, searchTerm, questions]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      company: "all",
      topic: "all",
      difficulty: "all",
      round: "all",
      recency: "all",
      frequency: "all",
      platform: "all"
    });
    setSearchTerm("");
  };

  return {
    filters,
    searchTerm,
    filteredQuestions,
    handleFilterChange,
    clearFilters,
    setSearchTerm
  };
};
