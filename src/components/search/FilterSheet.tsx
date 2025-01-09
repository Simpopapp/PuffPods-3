import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface FilterSheetProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  puffCount: [number, number];
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
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 1000],
    categories: [],
    puffCount: [0, 8000]
  });

  const handleCategoryToggle = (category: string) => {
    const updated = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    const newFilters = { ...filters, categories: updated };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (value: number[]) => {
    const newFilters = { ...filters, priceRange: value as [number, number] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePuffCountChange = (value: number[]) => {
    const newFilters = { ...filters, puffCount: value as [number, number] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full py-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-4">Faixa de Preço</h3>
              <Slider
                defaultValue={filters.priceRange}
                max={1000}
                step={10}
                onValueChange={handlePriceChange}
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
                max={8000}
                step={100}
                onValueChange={handlePuffCountChange}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>{filters.puffCount[0]} puffs</span>
                <span>{filters.puffCount[1]} puffs</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4">Categorias</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <motion.div
                    key={category}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={filters.categories.includes(category) ? "default" : "outline"}
                      className="w-full"
                      onClick={() => handleCategoryToggle(category)}
                    >
                      {category}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}