import { ShoppingCart } from "lucide-react";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const CartHeader = () => {
  return (
    <SheetHeader className="space-y-4 pb-4 border-b border-gold/20">
      <SheetTitle className="text-2xl font-bold text-gradient bg-gradient-gold flex items-center gap-2">
        <ShoppingCart className="h-6 w-6" /> Seu Carrinho Premium
      </SheetTitle>
    </SheetHeader>
  );
};