import { AnimatePresence } from "framer-motion";
import { ProgressBar } from "./progress/ProgressBar";
import { UnlockedBenefits } from "./progress/UnlockedBenefits";

interface CartProgressProps {
  total: number;
}

export const CartProgress = ({ total }: CartProgressProps) => {
  const firstThreshold = 150;
  const secondThreshold = 300;
  
  const getFirstBarProgress = () => Math.min((total / firstThreshold) * 100, 100);
  const getSecondBarProgress = () => {
    const remainingAmount = total - firstThreshold;
    const remainingThreshold = secondThreshold - firstThreshold;
    const additionalProgress = (remainingAmount / remainingThreshold) * 25;
    return Math.min(75 + additionalProgress, 100);
  };

  return (
    <div className="space-y-2">
      <AnimatePresence mode="wait">
        {total < firstThreshold ? (
          <ProgressBar
            progress={getFirstBarProgress()}
            label="Progresso para Frete Grátis"
            message={`Faltam R$ ${(firstThreshold - total).toFixed(2)} para Frete Grátis`}
          />
        ) : (
          <ProgressBar
            progress={getSecondBarProgress()}
            label="Progresso para Desconto VIP"
            message={
              total < secondThreshold
                ? `Faltam R$ ${(secondThreshold - total).toFixed(2)} para Desconto VIP de 10%`
                : "Desconto VIP de 10% Desbloqueado!"
            }
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        <UnlockedBenefits
          showFreeShipping={total >= firstThreshold}
          showVipDiscount={total >= secondThreshold}
        />
      </AnimatePresence>
    </div>
  );
};