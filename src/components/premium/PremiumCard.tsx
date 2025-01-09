import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface PremiumCardProps {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  image: string;
  buttonText: string;
  onButtonClick?: () => void;
}

export function PremiumCard({
  title,
  description,
  features,
  icon: Icon,
  image,
  buttonText,
  onButtonClick
}: PremiumCardProps) {
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-secondary rounded-lg p-4 sm:p-8"
    >
      <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-8">
        <div className="flex-1 space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-3xl font-bold text-gold flex items-center gap-2">
            <Icon className="h-6 w-6 sm:h-8 sm:w-8" /> {title}
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            {description}
          </p>
          <div className="space-y-2 sm:space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gold"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span className="text-sm sm:text-base">{feature}</span>
              </div>
            ))}
          </div>
          <Button 
            className={cn(
              "w-full sm:w-auto mt-4",
              "bg-gradient-gold text-black hover:bg-gold hover:scale-105 transition-all duration-300"
            )}
            onClick={onButtonClick}
            size={isMobile ? "sm" : "default"}
          >
            {buttonText}
          </Button>
        </div>
        <div className="flex-1 w-full">
          <motion.img
            src={image}
            alt={title}
            className="rounded-lg w-full h-[200px] sm:h-[300px] object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}