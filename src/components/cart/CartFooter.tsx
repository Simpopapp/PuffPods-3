import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

interface CartFooterProps {
  total: number;
}

export const CartFooter = ({ total }: CartFooterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mt-auto pt-4 border-t border-gold/20 bg-background space-y-4"
    >
      <div className="space-y-4">
        <CartProgress total={total} />
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
        className="w-full bg-gradient-gold text-black hover:bg-gold hover:scale-[1.02] transition-all duration-300 font-bold text-lg"
        onClick={() => {
          toast.success("Preparando seu pedido premium! 🌟");
          console.log('Iniciando checkout...');
        }}
      >
        Finalizar Compra Premium
      </Button>
    </motion.div>
  );
};