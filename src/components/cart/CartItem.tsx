import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  isCartOpen: boolean;
}

export function CartItem({
  id,
  name,
  price,
  image,
  quantity,
  onQuantityChange,
  onRemove,
  isCartOpen
}: CartItemProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      const difference = newQuantity - quantity;
      if (difference > 0 && !isCartOpen) {
        toast.success("Ótima escolha! Quanto mais itens, maiores os benefícios! ✨");
      }
      onQuantityChange(id, newQuantity);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-start gap-4 bg-secondary/50 rounded-lg p-4 relative group"
    >
      <div className="relative w-20 h-20 rounded-md overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm mb-1 pr-8">{name}</h3>
        <p className="text-gold font-semibold">R$ {price.toFixed(2)}</p>
        
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <span className="w-8 text-center">{quantity}</span>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onRemove(id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}