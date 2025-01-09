import { motion } from "framer-motion";

interface PremiumCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}

export function PremiumCard({ icon, title, description, highlight }: PremiumCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="relative p-6 rounded-xl bg-card border border-border/50 hover:border-gold/50 transition-colors"
    >
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <div className="p-2 rounded-full bg-background border border-border/50">
          {icon}
        </div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="text-2xl font-bold text-gold">{highlight}</div>
      </div>
    </motion.div>
  );
}