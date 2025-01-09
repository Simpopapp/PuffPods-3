import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

interface CartFooterProps {
  total: number;
}

export const CartFooter = ({ total }: CartFooterProps) => {
  const isPremium = total >= 150;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mt-auto pt-4 border-t border-gold/20 bg-background space-y-4"
    >
      <div className="space-y-4">
        <Separator className="bg-gold/20" />
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total</span>
          <div className="text-right">
            <span className="text-lg font-bold text-gold">
              R$ {total.toFixed(2)}
            </span>
            {total >= 200 && (
              <div className="text-sm text-gold-light">
                Economia: R$ {(total * 0.05).toFixed(2)}
              </div>
            )}
          </div>
        </div>
      </div>

      <Button 
        className={`w-full font-bold text-lg ${!isPremium && 'bg-gradient-gold text-black hover:bg-gold hover:scale-[1.02] transition-all duration-300'}`}
        style={isPremium ? {
          background: "linear-gradient(135deg, #FFB800 0%, #FFD700 50%, #FFB800 100%)",
          backgroundSize: "200% auto",
          animation: "shimmer 2s linear infinite",
          color: "#0D0D0F",
          textShadow: "0 0 15px rgba(255, 184, 0, 0.2)",
          letterSpacing: "0.05em",
        } : undefined}
        onClick={() => {
          console.log('Iniciando checkout...');
        }}
      >
        {isPremium ? 'Finalizar Compra Premium' : 'Finalizar Compra'}
      </Button>
    </motion.div>
  );
};