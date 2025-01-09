import { ProductCard } from "@/components/ProductCard";
import { motion } from "framer-motion";

const favorites = [
  {
    id: "v150",
    name: "Ignite V150",
    description: "Maior autonomia e sabor premium",
    price: 119.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/V150_BERRY-BLAST.png?v=1722018032",
    time: "1500 puffs"
  },
  {
    id: "v80",
    name: "Ignite V80",
    description: "Design elegante e compacto",
    price: 79.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/V80_Couch.jpg?v=1713918859",
    time: "800 puffs"
  }
];

export function FavoriteProducts() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {favorites.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </motion.div>
  );
}