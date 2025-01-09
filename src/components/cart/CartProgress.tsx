import { AnimatePresence, motion } from "framer-motion";
import { ProgressBar } from "./progress/ProgressBar";
import { UnlockedBenefits } from "./progress/UnlockedBenefits";

interface CartProgressProps {
  total: number;
}

export const CartProgress = ({ total }: CartProgressProps) => {
  const firstThreshold = 200;
  const secondThreshold = 300;
  
  const getFirstBarProgress = () => Math.min((total / firstThreshold) * 100, 100);
  const getSecondBarProgress = () => {
    if (total < firstThreshold) return 0;
    const remainingAmount = total - firstThreshold;
    const remainingThreshold = secondThreshold - firstThreshold;
    return Math.min((remainingAmount / remainingThreshold) * 100, 100);
  };

  const justUnlockedFreeShipping = total >= firstThreshold && total < firstThreshold + 0.01;

  return (
    <motion.div 
      className="space-y-2"
      animate={justUnlockedFreeShipping ? {
        background: [
          "rgba(255, 184, 0, 0)",
          "rgba(255, 184, 0, 0.2)",
          "rgba(255, 184, 0, 0)"
        ],
      } : {}}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
      }}
    >
      <AnimatePresence mode="wait">
        {total < firstThreshold && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="first-bar"
          >
            <ProgressBar
              progress={getFirstBarProgress()}
              label="Progresso para Frete Grátis"
              message={`Faltam R$ ${(firstThreshold - total).toFixed(2)} para Frete Grátis`}
              variant="shipping"
            />
          </motion.div>
        )}

        {total >= firstThreshold && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            key="second-bar"
          >
            <ProgressBar
              progress={getSecondBarProgress()}
              label="Progresso para Desconto VIP"
              message={
                total < secondThreshold
                  ? `Faltam R$ ${(secondThreshold - total).toFixed(2)} para Desconto VIP de 10%`
                  : "Desconto VIP de 10% Desbloqueado!"
              }
              variant="vip"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <UnlockedBenefits
          showFreeShipping={total >= firstThreshold}
          showVipDiscount={total >= secondThreshold}
        />
      </AnimatePresence>
    </motion.div>
  );
};