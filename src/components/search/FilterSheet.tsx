import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

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
        <Button variant="outline" size="icon" className="relative">
          <SlidersHorizontal className="h-4 w-4" />
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
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>Filtros</SheetTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={resetFilters}
              className="text-sm"
            >
              Limpar filtros
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>
        <ScrollArea className="h-full py-4">
          <div className="space-y-6">
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
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <motion.div
                      key={category}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={filters.categories.includes(category) ? "default" : "outline"}
                        className={`w-full ${
                          filters.categories.includes(category) 
                            ? "bg-gradient-gold text-black" 
                            : ""
                        }`}
                        onClick={() => handleCategoryToggle(category)}
                      >
                        {category}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}