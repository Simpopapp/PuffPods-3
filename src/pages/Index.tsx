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

const Index = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div className="min-h-screen bg-background">
      <motion.header 
        className={cn(
          "w-full bg-background/80 backdrop-blur-lg z-40",
          isMobile ? "py-4 px-4 sticky top-0" : "container mx-auto py-8"
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
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
          {/* Carrossel de Destaques */}
          <section className="pt-4">
            <FeaturedCarousel />
          </section>

          {/* Premium Sections */}
          <section className="container mx-auto px-4">
            <PremiumSection />
          </section>

          {/* Mais Vendidos */}
          <BestSellers />

          {/* Segunda Seção Premium */}
          <section className="container mx-auto px-4">
            <PremiumSection2 />
          </section>

          {/* Recomendações */}
          <Recommendations />
        </motion.div>
      </main>
    </div>
  );
}

export default Index;