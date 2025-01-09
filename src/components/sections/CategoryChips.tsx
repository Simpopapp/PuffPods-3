import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CategoryChipsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryChips({ categories, selectedCategory, onSelectCategory }: CategoryChipsProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md">
      <div className="flex space-x-2 p-4">
        {categories.map((category, index) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={cn(
              "inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              selectedCategory === category
                ? "bg-gold text-black"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            )}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </motion.button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="invisible" />
    </ScrollArea>
  );
}