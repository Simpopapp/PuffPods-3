import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface PremiumSection2Props {
  onButtonClick?: () => void;
}

export function PremiumSection2({ onButtonClick }: PremiumSection2Props) {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative overflow-hidden bg-secondary rounded-lg p-4 sm:p-8 mb-8 sm:mb-16">
      <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-8">
        <div className="flex-1 space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-3xl font-bold text-gold flex items-center gap-2">
            <Star className="h-6 w-6 sm:h-8 sm:w-8" /> Ignite V80
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Descubra nossa linha premium V80, com design elegante e duração excepcional de até 800 puffs.
          </p>
          <div className="space-y-2 sm:space-y-4">
            {["800 puffs de duração", "Design compacto", "Sabores intensos"].map((feature, index) => (
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
            className="w-full sm:w-auto mt-4 bg-gradient-gold text-black hover:bg-gold hover:scale-105 transition-all duration-300"
            onClick={onButtonClick}
            size={isMobile ? "sm" : "default"}
          >
            Comprar V80
          </Button>
        </div>
        <div className="flex-1 w-full">
          <img
            src="https://cdn.shopify.com/s/files/1/0072/5119/8050/files/V80_Couch.jpg?v=1713918859"
            alt="Ignite V80"
            className="rounded-lg w-full h-[200px] sm:h-[300px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
