import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sparkles } from "lucide-react";

const recommendations = [
  {
    id: "v80-tobacco",
    name: "V80 Tobacco",
    description: "Sabor autêntico de tabaco",
    price: 79.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/Tobacco_2.webp?v=1718828976",
    time: "800 puffs"
  },
  {
    id: "v150-tobacco",
    name: "V150 Tobacco",
    description: "V150 com sabor premium de tabaco",
    price: 119.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/V150_TOBACCO.webp?v=1718895995",
    time: "1500 puffs"
  }
];

export function Recommendations() {
  return (
    <section className="py-8 bg-secondary/30">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-6"
        >
          <Sparkles className="w-6 h-6 text-gold" />
          <h2 className="text-2xl font-bold">Recomendados para você</h2>
        </motion.div>
        
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex space-x-4">
            {recommendations.map((product) => (
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