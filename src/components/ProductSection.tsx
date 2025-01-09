import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

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
    <section
      ref={ref}
      className={cn(
        "opacity-0 transition-all duration-1000",
        inView && "opacity-100 translate-y-0",
        !inView && "translate-y-10",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-3xl font-bold">{title}</h2>
        <ChevronDown className="text-gold h-6 w-6" />
      </div>
      
      <div className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
        !isExpanded && "max-h-[800px] overflow-hidden relative"
      )}>
        {children}
        
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent flex items-end justify-center pb-4">
            <Button
              variant="outline"
              className="bg-secondary hover:bg-secondary/80"
              onClick={() => setIsExpanded(true)}
            >
              <ChevronDown className="mr-2 h-4 w-4" />
              Ver mais produtos
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};