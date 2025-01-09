import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  puffCount: [number, number];
}

interface FilterSheetProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const categories = [
  "Unidades",
  "Packs",
  "Econômicos",
  "V15",
  "V35",
  "V50",
  "V60",
  "V80",
  "V150"
];

export function FilterSheet({ onFilterChange }: FilterSheetProps) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 1000],
    categories: [],
    puffCount: [0, 8000]
  });
  const isMobile = useIsMobile();

  const handleCategoryToggle = (category: string) => {
    const updated = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    const newFilters: FilterOptions = { 
      ...filters, 
      categories: updated 
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (value: number[]) => {
    const newFilters: FilterOptions = { 
      ...filters, 
      priceRange: [value[0], value[1]] as [number, number] 
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePuffCountChange = (value: number[]) => {
    const newFilters: FilterOptions = { 
      ...filters, 
      puffCount: [value[0], value[1]] as [number, number] 
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterOptions = {
      priceRange: [0, 1000],
      categories: [],
      puffCount: [0, 8000]
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const activeFiltersCount = filters.categories.length + 
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0) +
    (filters.puffCount[0] > 0 || filters.puffCount[1] < 8000 ? 1 : 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size={isMobile ? "sm" : "icon"}
          className="relative flex items-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {isMobile && <span>Filtros</span>}
          {activeFiltersCount > 0 && (
            <Badge 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-gold text-black"
              variant="secondary"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent 
        side={isMobile ? "bottom" : "right"} 
        className={cn(
          "w-full sm:max-w-md",
          isMobile ? "h-[80vh] rounded-t-xl" : "h-full"
        )}
      >
        <SheetHeader className="flex flex-row items-center justify-between mb-6">
          <SheetTitle className="text-xl font-bold">Filtros</SheetTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={resetFilters}
              className="text-sm hover:bg-destructive/10 hover:text-destructive"
            >
              Limpar
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100%-4rem)] pr-4">
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-medium mb-4">Faixa de Preço</h3>
              <Slider
                defaultValue={filters.priceRange}
                value={filters.priceRange}
                max={1000}
                step={10}
                onValueChange={handlePriceChange}
                className="mb-2"
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>R$ {filters.priceRange[0]}</span>
                <span>R$ {filters.priceRange[1]}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4">Quantidade de Puffs</h3>
              <Slider
                defaultValue={filters.puffCount}
                value={filters.puffCount}
                max={8000}
                step={100}
                onValueChange={handlePuffCountChange}
                className="mb-2"
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>{filters.puffCount[0]} puffs</span>
                <span>{filters.puffCount[1]} puffs</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4">Categorias</h3>
              <AnimatePresence>
                <motion.div 
                  className="grid grid-cols-2 sm:grid-cols-3 gap-2"
                  layout
                >
                  {categories.map((category) => (
                    <motion.div
                      key={category}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={filters.categories.includes(category) ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          "w-full text-sm h-9",
                          filters.categories.includes(category) 
                            ? "bg-gradient-gold text-black" 
                            : ""
                        )}
                        onClick={() => handleCategoryToggle(category)}
                      >
                        {category}
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}