import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { BestSellers } from "@/components/home/BestSellers";
import { Recommendations } from "@/components/home/Recommendations";
import { PremiumSection } from "@/components/PremiumSection";
import { PremiumSection2 } from "@/components/PremiumSection2";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div className="min-h-screen bg-background">
      <motion.header 
        className={cn(
          "w-full bg-background/80 backdrop-blur-lg z-40 flex justify-between items-center",
          isMobile ? "py-4 px-4 sticky top-0" : "container mx-auto py-8"
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <motion.h1 
            className={cn(
              "font-bold bg-gradient-gold text-transparent bg-clip-text",
              isMobile ? "text-2xl" : "text-4xl"
            )}
          >
            PodsPuffs
          </motion.h1>
          <motion.p 
            className={cn(
              "text-gray-400",
              isMobile ? "text-sm mt-1" : "text-lg mt-2"
            )}
          >
            Descubra nossa seleção premium de pods
          </motion.p>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="text-gold hover:text-gold/80"
          onClick={() => navigate("/profile")}
        >
          <User className="h-5 w-5" />
        </Button>
      </motion.header>

      <main className="flex-1">
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 }
          }}
          className="space-y-8 md:space-y-16 pb-16"
        >
          <section className="pt-4">
            <FeaturedCarousel />
          </section>

          <section className="container mx-auto px-4">
            <PremiumSection />
          </section>

          <BestSellers />

          <section className="container mx-auto px-4">
            <PremiumSection2 />
          </section>

          <Recommendations />
        </motion.div>
      </main>
    </div>
  );
}

export default Index;