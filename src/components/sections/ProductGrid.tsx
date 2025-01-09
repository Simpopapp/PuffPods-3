import { ProductCard } from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  time?: string;
  category: string;
}

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
}

export function ProductGrid({ products, selectedCategory }: ProductGridProps) {
  const filteredProducts = selectedCategory === "Todos"
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4"
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {filteredProducts.map((product, index) => (
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
            <ProductCard {...product} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}