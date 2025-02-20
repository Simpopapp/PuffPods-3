import { useState } from "react";
import { motion } from "framer-motion";
import { SearchBar } from "@/components/search/SearchBar";
import { FilterSheet, FilterOptions } from "@/components/search/FilterSheet";
import { ViewToggle } from "@/components/search/ViewToggle";
import { CategoryChips } from "@/components/sections/CategoryChips";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { useInView } from "react-intersection-observer";
import { Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/V150_BERRY-BLAST.png?v=1722018032",
    category: "V150",
    puffCount: 7000
  },
  {
    id: "2",
    name: "Ignite V80",
    description: "Pod descartável com 5000 puffs",
    price: 119.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/V80_Couch.jpg?v=1713918859",
    category: "V80",
    puffCount: 5000
  },
  {
    id: "3",
    name: "Ignite V60 Pack",
    description: "Pack com 2 pods descartáveis",
    price: 159.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/2023_0226_Ignite_Nic_Studio_MikeKirschbaum_02.21.2023Igniteproductcreative0225.jpg?v=1691183075",
    category: "Packs",
    puffCount: 6000
  },
  {
    id: "4",
    name: "Ignite V35 Econômico",
    description: "Pod descartável econômico",
    price: 49.90,
    image: "/placeholder.svg",
    category: "Econômicos",
    puffCount: 3500
  }
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
  const isMobile = useIsMobile();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesPuffCount = product.puffCount >= filters.puffCount[0] && product.puffCount <= filters.puffCount[1];
    
    return matchesSearch && matchesCategory && matchesPrice && matchesPuffCount;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className={cn(
        "mx-auto max-w-[500px]", // Limitando a largura máxima para mobile
        isMobile ? "px-0" : "container px-4 py-8"
      )}>
        <motion.div 
          className="flex items-center gap-2 px-4 py-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles className="text-gold animate-pulse w-5 h-5" />
          <div>
            <h1 className="text-xl font-bold bg-gradient-gold text-transparent bg-clip-text">
              Categorias
            </h1>
            <p className="text-xs text-gray-400">
              Explore nossa seleção premium de produtos
            </p>
          </div>
        </motion.div>
        
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
          <div className="px-4 py-3 space-y-3">
            <SearchBar onSearch={handleSearch} />
            
            <div className="flex flex-col gap-3">
              <div className="w-full overflow-hidden">
                <CategoryChips
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </div>
              
              <div className="flex items-center justify-between w-full">
                <ViewToggle view={view} onViewChange={setView} />
                <FilterSheet onFilterChange={handleFilterChange} />
              </div>
            </div>
          </div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="px-4 pb-20"
        >
          <ProductGrid 
            products={filteredProducts}
            selectedCategory={selectedCategory}
            view={view}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Categories;
