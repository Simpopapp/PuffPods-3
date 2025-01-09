import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showRecent, setShowRecent] = useState(false);
  const isMobile = useIsMobile();

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
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowRecent(true)}
            className={cn(
              "pr-10 bg-secondary/80 border-0 focus:ring-2 ring-gold/50",
              isMobile ? "h-10 text-sm" : "h-12 text-base"
            )}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 hover:bg-transparent"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button 
          onClick={handleSearch}
          className={cn(
            "bg-gradient-gold text-black hover:bg-gold/90",
            isMobile ? "h-10 px-3 min-w-10" : "h-12 px-6"
          )}
        >
          <Search className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
          {!isMobile && <span className="ml-2">Buscar</span>}
        </Button>
      </div>

      <AnimatePresence>
        {showRecent && recentSearches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 bg-secondary/95 backdrop-blur-lg border border-gold/20 rounded-lg shadow-lg z-50"
          >
            <ScrollArea className="h-auto max-h-[200px]">
              <div className="p-3 sm:p-4">
                <h3 className="text-sm font-medium mb-2 text-gold">Buscas recentes</h3>
                {recentSearches.map((term, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left mb-1 hover:bg-gold/10 text-sm h-9"
                      onClick={() => {
                        setSearchTerm(term);
                        onSearch(term);
                        setShowRecent(false);
                      }}
                    >
                      <Search className="h-3 w-3 mr-2 text-gold" />
                      {term}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}