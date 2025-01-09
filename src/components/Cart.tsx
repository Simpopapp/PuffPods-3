import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Cart() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative hover:scale-105 transition-transform duration-200"
        >
          <ShoppingCart className="h-5 w-5" />
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 bg-gold text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              >
                {itemCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Carrinho de Compras</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          <ScrollArea className="flex-1 pr-4 my-4">
            <AnimatePresence mode="popLayout">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center h-40 text-muted-foreground"
                >
                  <ShoppingCart className="h-12 w-12 mb-2" />
                  <p>Seu carrinho está vazio</p>
                </motion.div>
              ) : (
                <motion.div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center space-x-4 border-b pb-4"
                    >
                      <div className="relative h-20 w-20 overflow-hidden rounded-md">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-200 hover:scale-110"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium line-clamp-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          R$ {item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 hover:bg-destructive/10"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 hover:bg-primary/10"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-medium whitespace-nowrap">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </motion.div>
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
                className="mt-auto border-t pt-4 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-semibold whitespace-nowrap">
                    R$ {total.toFixed(2)}
                  </span>
                </div>
                <Button 
                  className="w-full bg-gradient-gold text-black hover:bg-gold hover:scale-105 transition-all duration-300"
                  onClick={() => {
                    // Aqui você pode adicionar a lógica de checkout
                    console.log('Iniciando checkout...');
                  }}
                >
                  Finalizar Compra
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}