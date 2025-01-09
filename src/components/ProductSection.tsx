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
      
      <div className="relative">
        <div className={cn(
          "flex flex-nowrap gap-8 overflow-x-auto pb-4 custom-scrollbar",
          !isExpanded && "max-w-full"
        )}>
          {children}
          
          {!isExpanded && (
            <div className="sticky right-0 flex items-center pl-4 bg-gradient-to-l from-background via-background to-transparent">
              <Button
                variant="outline"
                className="bg-secondary hover:bg-secondary/80 whitespace-nowrap"
                onClick={() => setIsExpanded(true)}
              >
                <ChevronDown className="mr-2 h-4 w-4" />
                Ver mais produtos
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};