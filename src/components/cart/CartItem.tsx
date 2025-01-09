import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem = ({
  id,
  name,
  price,
  image,
  quantity,
  onQuantityChange,
  onRemove,
}: CartItemProps) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      const difference = newQuantity - quantity;
      if (difference > 0) {
        toast.success("Ótima escolha! Quanto mais itens, maiores os benefícios! ✨");
      }
      onQuantityChange(id, newQuantity);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center space-x-4 pb-4 border-b border-gold/20 last:border-0 hover:bg-gold/5 p-2 rounded-lg transition-colors duration-300"
    >
      <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-secondary group">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {quantity >= 3 && (
          <div className="absolute top-0 right-0 bg-gold text-black text-xs font-bold px-1 rounded-bl">
            <Sparkles className="h-3 w-3" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gold line-clamp-1 group-hover:text-gold-light transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground">
          R$ {price.toFixed(2)}
          {quantity >= 2 && (
            <span className="ml-2 text-gold text-xs">
              Economia ativa!
            </span>
          )}
        </p>
        <div className="flex items-center space-x-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-gold/20 hover:bg-gold/10 hover:text-gold disabled:opacity-50"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-gold/20 hover:bg-gold/10 hover:text-gold"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive ml-2"
            onClick={() => onRemove(id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium text-gold whitespace-nowrap">
          R$ {(price * quantity).toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
};