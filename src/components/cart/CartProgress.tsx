import { motion } from "framer-motion";
import { UnlockedBenefits } from "./progress/UnlockedBenefits";
import { ProgressBar } from "./progress/ProgressBar";

interface CartProgressProps {
  total: number;
}

export function CartProgress({ total }: CartProgressProps) {
  const firstThreshold = 150;
  const secondThreshold = 300;
  const thirdThreshold = 500;

  const getProgress = () => {
    if (total >= thirdThreshold) return 100;
    if (total >= secondThreshold) return 66;
    if (total >= firstThreshold) return 33;
    return (total / firstThreshold) * 33;
  };

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <ProgressBar progress={getProgress()} />
        <UnlockedBenefits total={total} />
      </div>
    </div>
  );
}