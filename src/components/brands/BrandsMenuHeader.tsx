import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface BrandsMenuHeaderProps {
  isCollapsed: boolean;
  handleToggleCollapse: (e: React.MouseEvent) => void;
}

export function BrandsMenuHeader({ isCollapsed, handleToggleCollapse }: BrandsMenuHeaderProps) {
  return (
    <>
      <motion.button
        onClick={handleToggleCollapse}
        className="absolute right-4 top-4 bg-secondary/80 hover:bg-secondary text-foreground p-2 rounded-lg shadow-lg backdrop-blur-sm border border-gold/20 transition-all duration-300"
        initial={false}
        animate={{
          rotate: isCollapsed ? 180 : 0,
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isCollapsed ? (
          <ChevronDown className="w-6 h-6 text-gold" />
        ) : (
          <ChevronUp className="w-6 h-6 text-gold" />
        )}
      </motion.button>

      <div className="absolute left-1/2 top-8 -translate-x-1/2 w-full text-center">
        <motion.h2 
          className="text-4xl font-bold tracking-tight bg-gradient-gold text-gradient"
          animate={{
            scale: isCollapsed ? 0.8 : 1,
            y: isCollapsed ? -10 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          Nossas Marcas
        </motion.h2>
      </div>
    </>
  );
}