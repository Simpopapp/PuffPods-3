import { LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ViewToggleProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex gap-2"
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant={view === "grid" ? "default" : "outline"}
          size="icon"
          onClick={() => onViewChange("grid")}
          className={view === "grid" ? "bg-gradient-gold text-black" : ""}
        >
          <LayoutGrid className="h-4 w-4" />
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant={view === "list" ? "default" : "outline"}
          size="icon"
          onClick={() => onViewChange("list")}
          className={view === "list" ? "bg-gradient-gold text-black" : ""}
        >
          <LayoutList className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
}