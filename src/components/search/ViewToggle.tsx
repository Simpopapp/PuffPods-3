import { LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ViewToggleProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex gap-2">
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          variant={view === "grid" ? "default" : "outline"}
          size="icon"
          onClick={() => onViewChange("grid")}
        >
          <LayoutGrid className="h-4 w-4" />
        </Button>
      </motion.div>
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          variant={view === "list" ? "default" : "outline"}
          size="icon"
          onClick={() => onViewChange("list")}
        >
          <LayoutList className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}