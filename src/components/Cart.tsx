import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, ArrowRight, Gift, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { CartHeader } from "./cart/CartHeader";
import { CartProgress } from "./cart/CartProgress";
import { CartItem } from "./cart/CartItem";
import { CartFooter } from "./cart/CartFooter";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function Cart() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (itemCount > 0) {
      setShowArrow(true);
      const timer = setTimeout(() => {
        setShowArrow(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  const handleCheckout = async () => {
    setIsProcessing(true);
    // Simula processamento do checkout
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Pedido realizado com sucesso!", {
      description: "Você receberá um email com os detalhes do pedido.",
      action: {
        label: "Ver detalhes",
        onClick: () => console.log("Ver detalhes do pedido"),
      },
    });
    
    setIsProcessing(false);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative">
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="relative bg-gradient-gold hover:bg-gold-light text-black hover:text-black transition-all duration-300 hover:scale-110 h-12 w-12"
          >
            <ShoppingCart className="h-7 w-7" />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-black text-gold text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </SheetTrigger>

        <AnimatePresence>
          {!isOpen && showArrow && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.6
              }}
              className="absolute right-[120%] top-1/2 transform -translate-y-1/2"
            >
              <ArrowRight className="h-12 w-12 text-gold" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full bg-background border-l border-gold/20">
        <CartHeader />
        
        <div className="flex-1 flex flex-col min-h-0">
          <ScrollArea className="flex-1 -mr-4 pr-4 my-4 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center h-40 text-muted-foreground"
                >
                  <Gift className="h-12 w-12 mb-2 text-gold/50" />
                  <p className="text-center">Seu carrinho está vazio</p>
                  <p className="text-sm text-gold/70 mt-2">Adicione itens para ganhar benefícios exclusivos!</p>
                </motion.div>
              ) : (
                <motion.div className="space-y-6">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      {...item}
                      onQuantityChange={(id, quantity) => {
                        updateQuantity(id, quantity);
                        toast.success("Quantidade atualizada!", {
                          icon: <Check className="h-4 w-4" />,
                        });
                      }}
                      onRemove={(id) => {
                        removeItem(id);
                        toast.success("Item removido do carrinho!");
                      }}
                      isCartOpen={isOpen}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollArea>

          <AnimatePresence>
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <CartProgress total={total} />
                <div className="border-t border-border pt-4 space-y-4">
                  <div className="flex justify-between items-center px-4">
                    <span className="text-sm font-medium">Subtotal</span>
                    <span className="text-sm font-bold">R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="px-4">
                    <Button 
                      className="w-full bg-gradient-gold text-black hover:bg-gold-light"
                      size="lg"
                      onClick={handleCheckout}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center space-x-2"
                        >
                          <span className="animate-spin h-4 w-4 border-2 border-current rounded-full border-t-transparent" />
                          <span>Processando...</span>
                        </motion.div>
                      ) : (
                        "Finalizar Compra"
                      )}
                    </Button>
                  </div>
                </div>
                <CartFooter total={total} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}