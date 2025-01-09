import { Gift, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface CartProgressProps {
  total: number;
}

export const CartProgress = ({ total }: CartProgressProps) => {
  const getProgressToNextReward = () => {
    const nextThreshold = 200;
    const progress = (total / nextThreshold) * 100;
    return Math.min(progress, 100);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Progresso para benefícios VIP</span>
        <span className="text-gold">{getProgressToNextReward().toFixed(0)}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-gold"
          initial={{ width: 0 }}
          animate={{ width: `${getProgressToNextReward()}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      {total >= 150 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="text-sm text-gold flex items-center gap-2 bg-gold/10 p-2 rounded"
        >
          <Gift className="h-4 w-4" />
          <span>Frete grátis desbloqueado! 🎉</span>
        </motion.div>
      )}
      {total >= 200 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="text-sm text-gold flex items-center gap-2 bg-gold/10 p-2 rounded"
        >
          <Sparkles className="h-4 w-4" />
          <span>Desconto VIP de 5% aplicado! ✨</span>
        </motion.div>
      )}
    </div>
  );
};