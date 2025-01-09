import { useState } from "react";
import { motion } from "framer-motion";
import { SearchBar } from "@/components/search/SearchBar";
import { FilterSheet, FilterOptions } from "@/components/search/FilterSheet";
import { ViewToggle } from "@/components/search/ViewToggle";
import { CategoryChips } from "@/components/sections/CategoryChips";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { V15Line } from "@/components/sections/V15Line";
import { V35Line } from "@/components/sections/V35Line";
import { V50Line } from "@/components/sections/V50Line";
import { V60Line } from "@/components/sections/V60Line";
import { V80Line } from "@/components/sections/V80Line";
import { V150Line } from "@/components/sections/V150Line";
import { SingleUnits } from "@/components/sections/SingleUnits";
import { PackUnits } from "@/components/sections/PackUnits";
import { AllPacks } from "@/components/sections/AllPacks";
import { EconomyLine } from "@/components/sections/EconomyLine";
import { useInView } from "react-intersection-observer";
import { Sparkles } from "lucide-react";

const categories = [
  "Todos",
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

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 1000],
    categories: [],
    puffCount: [0, 8000]
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8 space-y-8"
      >
        <motion.div 
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles className="w-8 h-8 text-gold animate-pulse" />
          <div>
            <h1 className="text-4xl font-bold bg-gradient-gold text-transparent bg-clip-text">
              Categorias
            </h1>
            <p className="text-gray-400 mt-1">
              Explore nossa seleção premium de produtos
            </p>
          </div>
        </motion.div>
        
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg py-4 space-y-4 shadow-lg rounded-lg">
          <SearchBar onSearch={handleSearch} />
          
          <div className="flex items-center justify-between gap-4">
            <CategoryChips
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            
            <div className="flex items-center gap-2">
              <ViewToggle view={view} onViewChange={setView} />
              <FilterSheet onFilterChange={handleFilterChange} />
            </div>
          </div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-16 pb-24"
        >
          {selectedCategory === "Todos" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-16"
            >
              <SingleUnits />
              <PackUnits />
              <EconomyLine />
              <V15Line />
              <V35Line />
              <V50Line />
              <V60Line />
              <V80Line />
              <V150Line />
            </motion.div>
          )}

          {selectedCategory === "Unidades" && <SingleUnits />}
          {selectedCategory === "Packs" && <PackUnits />}
          {selectedCategory === "Econômicos" && <EconomyLine />}
          {selectedCategory === "V15" && <V15Line />}
          {selectedCategory === "V35" && <V35Line />}
          {selectedCategory === "V50" && <V50Line />}
          {selectedCategory === "V60" && <V60Line />}
          {selectedCategory === "V80" && <V80Line />}
          {selectedCategory === "V150" && <V150Line />}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Categories;