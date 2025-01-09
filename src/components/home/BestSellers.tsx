import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const bestSellers = [
  {
    id: "v80",
    name: "Ignite V80",
    description: "Design elegante e compacto",
    price: 79.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/V80_Couch.jpg?v=1713918859",
    time: "800 puffs"
  },
  {
    id: "v150",
    name: "Ignite V150",
    description: "Maior autonomia e sabor premium",
    price: 119.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/V150_BERRY-BLAST.png?v=1722018032",
    time: "1500 puffs"
  },
  {
    id: "v60",
    name: "Ignite V60",
    description: "Excelente custo-benefício",
    price: 69.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/2023_0226_Ignite_Nic_Studio_MikeKirschbaum_02.21.2023Igniteproductcreative0225.jpg?v=1691183075",
    time: "600 puffs"
  }
];

export function BestSellers() {
  return (
    <section className="py-8">
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold mb-6"
        >
          Mais Vendidos
        </motion.h2>
        
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex space-x-4">
            {bestSellers.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-[280px] flex-none"
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>
    </section>
  );
}