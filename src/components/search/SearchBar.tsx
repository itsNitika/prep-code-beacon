
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  return (
    <div className="mb-8">
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search questions, companies, or topics..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};
