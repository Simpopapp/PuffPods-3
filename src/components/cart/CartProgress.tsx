import { Gift, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CartProgressProps {
  total: number;
}

export const CartProgress = ({ total }: CartProgressProps) => {
  const firstThreshold = 150;
  const secondThreshold = 300;
  
  const getFirstBarProgress = () => {
    return Math.min((total / firstThreshold) * 100, 100);
  };

  const getSecondBarProgress = () => {
    const remainingAmount = total - firstThreshold;
    const remainingThreshold = secondThreshold - firstThreshold;
    const additionalProgress = (remainingAmount / remainingThreshold) * 25;
    return Math.min(75 + additionalProgress, 100);
  };

  // Determine which bar to show
  const showFirstBar = total < firstThreshold;
  const showSecondBar = total >= firstThreshold;

  return (
    <div className="space-y-2">
      <AnimatePresence mode="wait">
        {showFirstBar && (
          <motion.div
            key="first-progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            <div className="flex justify-between text-sm">
              <span>Progresso para Frete Grátis</span>
              <span className="text-gold">
                {getFirstBarProgress().toFixed(0)}%
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-gold"
                initial={{ width: 0 }}
                animate={{ width: `${getFirstBarProgress()}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Faltam R$ {(firstThreshold - total).toFixed(2)} para Frete Grátis
            </div>
          </motion.div>
        )}

        {showSecondBar && (
          <motion.div
            key="second-progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            <div className="flex justify-between text-sm">
              <span>Progresso para Desconto VIP</span>
              <span className="text-gold">{getSecondBarProgress().toFixed(0)}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-gold"
                initial={{ width: "75%" }}
                animate={{ width: `${getSecondBarProgress()}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {total < secondThreshold ? (
                `Faltam R$ ${(secondThreshold - total).toFixed(2)} para Desconto VIP de 10%`
              ) : (
                "Desconto VIP de 10% Desbloqueado!"
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSecondBar && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-sm text-gold flex items-center gap-2 bg-gold/10 p-2 rounded"
          >
            <Gift className="h-4 w-4" />
            <span>Frete grátis desbloqueado! 🎉</span>
          </motion.div>
        )}
        {total >= secondThreshold && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-sm text-gold flex items-center gap-2 bg-gold/10 p-2 rounded"
          >
            <Sparkles className="h-4 w-4" />
            <span>Desconto VIP de 10% aplicado! ✨</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};