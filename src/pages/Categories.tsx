import { useState } from "react";
import { motion } from "framer-motion";
import { SearchBar } from "@/components/search/SearchBar";
import { FilterSheet } from "@/components/search/FilterSheet";
import { ViewToggle } from "@/components/search/ViewToggle";
import { CategoryChips } from "@/components/sections/CategoryChips";
import { ProductGrid } from "@/components/sections/ProductGrid";
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

// Dados mockados para exemplo
const mockProducts = [
  {
    id: "1",
    name: "Ignite V150",
    description: "Pod descartável com 7000 puffs",
    price: 149.90,
    image: "/placeholder.svg",
    category: "V150"
  },
  {
    id: "2",
    name: "Ignite V80",
    description: "Pod descartável com 5000 puffs",
    price: 119.90,
    image: "/placeholder.svg",
    category: "V80"
  },
  // ... Adicione mais produtos conforme necessário
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    priceRange: [0, 1000] as [number, number],
    categories: [] as string[],
    puffCount: [0, 8000] as [number, number]
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  // Filtra os produtos com base nos critérios
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

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
        >
          <ProductGrid 
            products={filteredProducts}
            selectedCategory={selectedCategory}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Categories;