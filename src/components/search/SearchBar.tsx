import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showRecent, setShowRecent] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const saveSearch = (term: string) => {
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      saveSearch(searchTerm);
      setShowRecent(false);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setShowRecent(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowRecent(true)}
            className="pr-10"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Buscar
        </Button>
      </div>

      <AnimatePresence>
        {showRecent && recentSearches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 bg-background border rounded-md shadow-lg z-50"
          >
            <ScrollArea className="h-auto max-h-[200px]">
              <div className="p-2">
                <h3 className="text-sm font-medium mb-2 text-muted-foreground">Buscas recentes</h3>
                {recentSearches.map((term, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left mb-1"
                    onClick={() => {
                      setSearchTerm(term);
                      onSearch(term);
                      setShowRecent(false);
                    }}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}