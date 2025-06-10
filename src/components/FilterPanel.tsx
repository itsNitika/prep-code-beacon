
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";

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

interface FilterPanelProps {
  filters: {
    company: string;
    topic: string;
    difficulty: string;
    round: string;
    recency: string;
    frequency: string;
    platform: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
  questions: Question[];
}

export const FilterPanel = ({ filters, onFilterChange, onClearFilters, questions }: FilterPanelProps) => {
  const companies = [...new Set(questions.map(q => q.company))].sort();
  const topics = [...new Set(questions.flatMap(q => q.topic))].sort();
  const difficulties = ["Easy", "Medium", "Hard"];
  const rounds = ["OA", "Technical", "Design", "HR"];
  const recencyOptions = ["Last 3 months", "Last 6 months", "Last 12 months"];
  const frequencyOptions = ["High", "Medium", "Low"];
  const platforms = [...new Set(questions.map(q => q.platform))].sort();

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">Filters</CardTitle>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CardDescription>
          Filter questions by company, topic, difficulty, and more
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Company</label>
          <Select value={filters.company} onValueChange={(value) => onFilterChange("company", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Companies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Companies</SelectItem>
              {companies.map((company) => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Topic</label>
          <Select value={filters.topic} onValueChange={(value) => onFilterChange("topic", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Topics" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Topics</SelectItem>
              {topics.map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Difficulty</label>
          <Select value={filters.difficulty} onValueChange={(value) => onFilterChange("difficulty", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Difficulties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Difficulties</SelectItem>
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Round Type</label>
          <Select value={filters.round} onValueChange={(value) => onFilterChange("round", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Rounds" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Rounds</SelectItem>
              {rounds.map((round) => (
                <SelectItem key={round} value={round}>
                  {round}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Recency</label>
          <Select value={filters.recency} onValueChange={(value) => onFilterChange("recency", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Time</SelectItem>
              {recencyOptions.map((recency) => (
                <SelectItem key={recency} value={recency}>
                  {recency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Frequency</label>
          <Select value={filters.frequency} onValueChange={(value) => onFilterChange("frequency", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Frequencies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Frequencies</SelectItem>
              {frequencyOptions.map((frequency) => (
                <SelectItem key={frequency} value={frequency}>
                  {frequency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Platform</label>
          <Select value={filters.platform} onValueChange={(value) => onFilterChange("platform", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Platforms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Platforms</SelectItem>
              {platforms.map((platform) => (
                <SelectItem key={platform} value={platform}>
                  {platform}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {activeFiltersCount > 0 && (
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={onClearFilters}
          >
            Clear All Filters
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
