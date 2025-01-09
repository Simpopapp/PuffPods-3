import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandsMenuHeaderProps {
  isCollapsed: boolean;
  handleToggleCollapse: (e: React.MouseEvent) => void;
  isMobile: boolean;
}

export function BrandsMenuHeader({ isCollapsed, handleToggleCollapse, isMobile }: BrandsMenuHeaderProps) {
  return (
    <>
      <motion.button
        onClick={handleToggleCollapse}
        className={cn(
          "absolute right-4 top-4 bg-secondary/80 hover:bg-secondary text-foreground p-2 rounded-lg shadow-lg backdrop-blur-sm border border-gold/20 transition-all duration-300",
          isMobile && "scale-90"
        )}
        initial={false}
        animate={{
          rotate: isCollapsed ? 180 : 0,
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: isMobile ? 1 : 1.05 }}
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
          className={cn(
            "font-bold tracking-tight bg-gradient-gold text-gradient",
            isMobile ? "text-2xl sm:text-4xl" : "text-4xl"
          )}
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