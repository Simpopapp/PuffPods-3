import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { BestSellers } from "@/components/home/BestSellers";
import { Recommendations } from "@/components/home/Recommendations";
import { PremiumSection } from "@/components/premium/PremiumSection";
import { FilterBottomSheet } from "@/components/filters/FilterBottomSheet";
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

  const handleFilterChange = (filters: any) => {
    console.log("Filters changed:", filters);
    // Implement filter logic here
  };

  return (
    <div className="min-h-screen bg-background">
      <motion.header 
        className={cn(
          "w-full bg-background/80 backdrop-blur-lg z-40 mobile-safe-top",
          isMobile ? "sticky top-0 py-4 px-4" : "container-fluid py-8"
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <motion.h1 
              className="text-gradient font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              PodsPuffs
            </motion.h1>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Descubra nossa seleção premium de pods
            </motion.p>
          </div>
          
          <div className="flex items-center gap-2">
            <FilterBottomSheet onFilterChange={handleFilterChange} />
            <Button
              variant="ghost"
              size="icon"
              className="text-gold hover:text-gold/80"
              onClick={() => navigate("/profile")}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
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
          className="space-y-8 md:space-y-16 pb-16 mobile-safe-bottom"
        >
          <section className="section-spacing">
            <div className="container-fluid">
              <FeaturedCarousel />
            </div>
          </section>

          <section className="section-spacing bg-secondary/5">
            <div className="container-fluid">
              <PremiumSection />
            </div>
          </section>

          <section className="section-spacing">
            <div className="container-fluid">
              <BestSellers />
            </div>
          </section>

          <section className="section-spacing">
            <div className="container-fluid">
              <Recommendations />
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
}

export default Index;