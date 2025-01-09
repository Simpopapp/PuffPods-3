import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface FilterBottomSheetProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  search: string;
  priceRange: number[];
  puffCount: number[];
}

export function FilterBottomSheet({ onFilterChange }: FilterBottomSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    priceRange: [0, 200],
    puffCount: [0, 1500]
  });

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Buscar</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos..."
                className="pl-9"
                value={filters.search}
                onChange={(e) => handleFilterChange({ search: e.target.value })}
              />
            </div>
          </div>

          <motion.div layout className="space-y-2">
            <label className="text-sm font-medium">Faixa de Preço</label>
            <Slider
              min={0}
              max={200}
              step={10}
              value={filters.priceRange}
              onValueChange={(value) => handleFilterChange({ priceRange: value })}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>R$ {filters.priceRange[0]}</span>
              <span>R$ {filters.priceRange[1]}</span>
            </div>
          </motion.div>

          <motion.div layout className="space-y-2">
            <label className="text-sm font-medium">Quantidade de Puffs</label>
            <Slider
              min={0}
              max={1500}
              step={100}
              value={filters.puffCount}
              onValueChange={(value) => handleFilterChange({ puffCount: value })}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filters.puffCount[0]} puffs</span>
              <span>{filters.puffCount[1]} puffs</span>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
          <Button 
            className="w-full bg-gradient-gold text-black hover:bg-gold/90"
            onClick={() => setIsOpen(false)}
          >
            Aplicar Filtros
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}