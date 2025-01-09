import { ProductCard } from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  puffCount: number;
}

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  view: "grid" | "list";
}

export function ProductGrid({ products, selectedCategory, view }: ProductGridProps) {
  const gridClass = view === "grid" 
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    : "flex flex-col gap-4";

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className={`p-4 ${gridClass}`}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {products.length > 0 ? (
          products.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1,
                layout: { duration: 0.3 }
              }}
            >
              <ProductCard 
                {...product}
                time={`${product.puffCount} puffs`}
              />
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12"
          >
            <p className="text-lg text-gray-400">
              Nenhum produto encontrado com os filtros selecionados.
            </p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}