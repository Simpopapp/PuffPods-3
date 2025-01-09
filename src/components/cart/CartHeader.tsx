import { ShoppingCart } from "lucide-react";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export const CartHeader = () => {
  const { total } = useCart();
  const showPremium = total >= 150;

  return (
    <SheetHeader className="space-y-4 pb-4 border-b border-gold/20">
      <SheetTitle className="text-2xl font-bold flex items-center gap-2">
        <span className="text-gradient bg-gradient-gold flex items-center gap-2">
          <ShoppingCart className="h-6 w-6" /> Seu Carrinho
        </span>
        <AnimatePresence>
          {showPremium && (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-gradient bg-gradient-gold ml-2 text-lg font-light italic"
            >
              Premium
            </motion.span>
          )}
        </AnimatePresence>
      </SheetTitle>
    </SheetHeader>
  );
};