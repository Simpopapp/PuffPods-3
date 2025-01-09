import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface ProductSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const ProductSection = ({ title, children, className }: ProductSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(className)}
    >
      <motion.div 
        className="flex items-center gap-2 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold">{title}</h2>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-gold h-6 w-6" />
        </motion.div>
      </motion.div>
      
      <AnimatePresence>
        <motion.div 
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
            !isExpanded && "max-h-[800px] overflow-hidden relative"
          )}
          layout
        >
          {children}
          
          {!isExpanded && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent flex items-end justify-center pb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                variant="outline"
                className="bg-secondary hover:bg-secondary/80 group"
                onClick={() => setIsExpanded(true)}
              >
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeInOut"
                  }}
                  className="flex items-center gap-2"
                >
                  <ChevronDown className="h-4 w-4 group-hover:text-gold transition-colors" />
                  <span>Ver mais produtos</span>
                </motion.div>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
};