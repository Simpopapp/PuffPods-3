import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { CartHeader } from "./cart/CartHeader";
import { CartProgress } from "./cart/CartProgress";
import { CartItem } from "./cart/CartItem";
import { CartFooter } from "./cart/CartFooter";
import { Gift } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function Cart() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    if (itemCount > 0 && !isOpen) {
      setShowArrow(true);
      const timer = setTimeout(() => {
        setShowArrow(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [itemCount, isOpen]);

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
          {showArrow && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }
              }}
              exit={{ 
                opacity: 0, 
                x: -20, 
                scale: 0.5,
                transition: { duration: 0.2 }
              }}
              className="absolute left-[-100px] top-1/2 transform -translate-y-1/2"
            >
              <motion.div
                animate={{
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ArrowRight className="h-8 w-8 text-gold drop-shadow-lg" />
              </motion.div>
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
                      }}
                      onRemove={removeItem}
                      isCartOpen={isOpen}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollArea>

          <AnimatePresence>
            {items.length > 0 && (
              <>
                <CartProgress total={total} />
                <CartFooter total={total} />
              </>
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}