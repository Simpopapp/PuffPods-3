import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showRecent, setShowRecent] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
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
      toast.success("Busca realizada com sucesso!");
    } else {
      toast.error("Digite algo para buscar");
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setShowRecent(false);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.querySelector('.recent-searches-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative w-full",
        isMobile ? "max-w-full px-2" : "max-w-2xl mx-auto"
      )}
    >
      <div className={cn(
        "flex gap-2",
        isMobile ? "flex-col" : "flex-row"
      )}>
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowRecent(true)}
            className={cn(
              "pr-10 bg-secondary/80 border-0 focus:ring-2 ring-gold/50",
              isMobile ? "h-12 text-base rounded-xl" : "h-12 text-base"
            )}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-transparent"
              onClick={handleClear}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        <Button 
          onClick={handleSearch}
          className={cn(
            "bg-gradient-gold text-black hover:bg-gold/90",
            isMobile ? "h-12 w-full justify-center text-base rounded-xl" : "h-12 px-6"
          )}
        >
          <Search className="h-5 w-5" />
          <span className="ml-2">Buscar</span>
        </Button>
      </div>

      <AnimatePresence>
        {showRecent && recentSearches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "absolute w-full mt-2 bg-secondary/95 backdrop-blur-lg border border-gold/20 rounded-lg shadow-lg z-50",
              isMobile ? "left-0" : ""
            )}
          >
            <div className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gold">Buscas recentes</h3>
                {isMobile && (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleScroll('left')}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleScroll('right')}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <ScrollArea className="h-auto max-h-[200px]">
                <div className={cn(
                  "recent-searches-container",
                  isMobile ? "flex gap-2 overflow-x-auto pb-2" : ""
                )}>
                  {recentSearches.map((term, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        isMobile ? "flex-shrink-0" : ""
                      )}
                    >
                      <Button
                        variant="ghost"
                        className={cn(
                          "text-left hover:bg-gold/10 text-sm",
                          isMobile ? "h-10 px-4 whitespace-nowrap" : "w-full justify-start mb-1 h-9"
                        )}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}