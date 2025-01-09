import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";

interface UnlockedBenefitsProps {
  showFreeShipping: boolean;
  showVipDiscount: boolean;
}

export const UnlockedBenefits = ({ showFreeShipping, showVipDiscount }: UnlockedBenefitsProps) => {
  return (
    <>
      {showFreeShipping && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="text-sm text-gold flex items-center gap-2 bg-gold/10 p-2 rounded"
        >
          <Gift className="h-4 w-4" />
          <span>Frete grátis desbloqueado! 🎉</span>
        </motion.div>
      )}
      {showVipDiscount && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="text-sm text-gold flex items-center gap-2 bg-gold/10 p-2 rounded"
        >
          <Sparkles className="h-4 w-4" />
          <span>Desconto VIP de 10% aplicado! ✨</span>
        </motion.div>
      )}
    </>
  );
};