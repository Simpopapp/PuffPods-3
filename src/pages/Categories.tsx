import { useState } from "react";
import { motion } from "framer-motion";
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

  return (
    <div className="min-h-screen bg-background pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-3xl font-bold mb-8">Categorias</h1>
        
        <CategoryChips
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {selectedCategory === "Todos" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-16 mt-8"
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
    </div>
  );
};

export default Categories;