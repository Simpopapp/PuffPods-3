import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface CartFooterProps {
  total: number;
}

export const CartFooter = ({ total }: CartFooterProps) => {
  const { items } = useCart();
  const isPremium = total >= 200;

  const formatOrderDetails = () => {
    const date = new Date().toLocaleDateString('pt-BR');
    const time = new Date().toLocaleTimeString('pt-BR');
    
    let message = `🛍️ *Novo Pedido - ${date} às ${time}*\n\n`;
    message += `📦 *Itens do Pedido:*\n`;
    
    items.forEach((item) => {
      message += `\n• ${item.quantity}x ${item.name}\n`;
      message += `  💰 R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\n${'-'.repeat(30)}\n`;
    message += `*Subtotal:* R$ ${total.toFixed(2)}\n`;
    
    if (total >= 300) {
      const discount = total * 0.1;
      message += `*Desconto VIP (10%):* R$ ${discount.toFixed(2)}\n`;
      message += `*Total Final:* R$ ${(total - discount).toFixed(2)}\n`;
    }
    
    message += `\n🚚 *Entrega:* ${total >= 200 ? 'Frete Grátis!' : 'Frete a calcular'}\n`;
    message += `\n✨ *Status:* ${isPremium ? 'Cliente Premium' : 'Cliente Regular'}\n`;
    
    return encodeURIComponent(message);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Adicione itens ao carrinho antes de finalizar a compra");
      return;
    }

    const phoneNumber = "5511999999999"; // Substitua pelo seu número
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${formatOrderDetails()}`;
    
    console.log("Iniciando checkout via WhatsApp...");
    window.open(whatsappUrl, '_blank');
  };

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
            {total >= 300 && (
              <div className="text-sm text-gold-light">
                Economia: R$ {(total * 0.1).toFixed(2)}
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
        onClick={handleCheckout}
      >
        {isPremium ? 'Finalizar Compra Premium' : 'Finalizar Compra'}
      </Button>
    </motion.div>
  );
};