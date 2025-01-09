import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Plus, Minus, Trash2, Gift, Sparkles } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export function Cart() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  const getProgressToNextReward = () => {
    const nextThreshold = 200; // Próximo limite para recompensa
    const progress = (total / nextThreshold) * 100;
    return Math.min(progress, 100);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      const difference = newQuantity - (items.find(item => item.id === id)?.quantity || 0);
      if (difference > 0) {
        toast.success("Ótima escolha! Quanto mais, maior seu desconto! 🌟");
      }
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative bg-gradient-gold hover:bg-gold-light text-black hover:text-black transition-all duration-300 hover:scale-110"
        >
          <ShoppingCart className="h-5 w-5" />
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
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full bg-background border-l border-gold/20">
        <SheetHeader className="space-y-4 pb-4 border-b border-gold/20">
          <SheetTitle className="text-2xl font-bold text-gradient bg-gradient-gold flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" /> Seu Carrinho Premium
          </SheetTitle>
        </SheetHeader>
        
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
                  <p className="text-sm text-gold/70 mt-2">Adicione itens para ganhar recompensas exclusivas!</p>
                </motion.div>
              ) : (
                <motion.div className="space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center space-x-4 pb-4 border-b border-gold/20 last:border-0 hover:bg-gold/5 p-2 rounded-lg transition-colors duration-300"
                    >
                      <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-secondary group">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        {item.quantity >= 3 && (
                          <div className="absolute top-0 right-0 bg-gold text-black text-xs font-bold px-1 rounded-bl">
                            <Sparkles className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gold line-clamp-1 group-hover:text-gold-light transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          R$ {item.price.toFixed(2)}
                          {item.quantity >= 2 && (
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
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-gold/20 hover:bg-gold/10 hover:text-gold"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive ml-2"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gold whitespace-nowrap">
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
                className="mt-auto pt-4 border-t border-gold/20 bg-background space-y-4"
              >
                {/* Barra de Progresso para Próxima Recompensa */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso para próxima recompensa</span>
                    <span className="text-gold">{getProgressToNextReward().toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-gold"
                      initial={{ width: 0 }}
                      animate={{ width: `${getProgressToNextReward()}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  {total >= 150 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-sm text-gold flex items-center gap-2 bg-gold/10 p-2 rounded"
                    >
                      <Gift className="h-4 w-4" />
                      <span>Parabéns! Você desbloqueou frete grátis! 🎉</span>
                    </motion.div>
                  )}
                  
                  {total >= 200 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-sm text-gold flex items-center gap-2 bg-gold/10 p-2 rounded"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Bônus VIP desbloqueado! -5% no total 🌟</span>
                    </motion.div>
                  )}
                </div>

                <div className="flex justify-between items-center mb-4">
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
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}