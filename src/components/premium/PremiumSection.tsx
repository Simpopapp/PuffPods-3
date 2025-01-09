import { motion } from "framer-motion";
import { PremiumCard } from "./PremiumCard";
import { Crown, Star } from "lucide-react";

interface PremiumSectionProps {
  onButtonClick?: () => void;
}

export function PremiumSection({ onButtonClick }: PremiumSectionProps) {
  const premiumProducts = [
    {
      title: "Ignite V150",
      description: "Experimente nossa linha premium V150, com maior capacidade e duração prolongada de até 1500 puffs.",
      features: [
        "1500 puffs de duração",
        "Sabores exclusivos",
        "Design premium"
      ],
      icon: Crown,
      image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/V150_BERRY-BLAST.png?v=1722018032",
      buttonText: "Comprar V150"
    },
    {
      title: "Ignite V80",
      description: "Descubra nossa linha premium V80, com design elegante e duração excepcional de até 800 puffs.",
      features: [
        "800 puffs de duração",
        "Design compacto",
        "Sabores intensos"
      ],
      icon: Star,
      image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/V80_Couch.jpg?v=1713918859",
      buttonText: "Comprar V80"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 sm:space-y-8"
    >
      {premiumProducts.map((product, index) => (
        <PremiumCard
          key={index}
          {...product}
          onButtonClick={onButtonClick}
        />
      ))}
    </motion.section>
  );
}