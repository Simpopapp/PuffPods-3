import { motion } from "framer-motion";
import { PremiumCard } from "./PremiumCard";
import { Crown, Zap, Shield } from "lucide-react";

const premiumFeatures = [
  {
    icon: <Crown className="w-8 h-8 text-gold" />,
    title: "Premium",
    description: "Dispositivos de alta qualidade",
    highlight: "Até 1500 puffs"
  },
  {
    icon: <Zap className="w-8 h-8 text-gold" />,
    title: "Rápido",
    description: "Entrega expressa",
    highlight: "24-48h"
  },
  {
    icon: <Shield className="w-8 h-8 text-gold" />,
    title: "Garantido",
    description: "Satisfação garantida",
    highlight: "7 dias"
  }
];

export function PremiumSection() {
  return (
    <section className="py-12 bg-black/5 backdrop-blur-sm">
      <div className="container px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold mb-4">
            Experiência <span className="text-gradient">Premium</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubra o melhor em qualidade e satisfação com nossa linha premium de dispositivos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {premiumFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PremiumCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                highlight={feature.highlight}
              />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a 
            href="#products" 
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg bg-gradient-gold text-black hover:opacity-90 transition-opacity"
          >
            Explorar Produtos Premium
          </a>
        </motion.div>
      </div>
    </section>
  );
}