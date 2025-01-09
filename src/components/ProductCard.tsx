import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShoppingCart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  time?: string;
  onClick?: () => void;
  isCartOpen?: boolean;
  className?: string;
}

export function ProductCard({ 
  id, 
  name, 
  description, 
  price, 
  image, 
  time, 
  onClick, 
  isCartOpen = false, 
  className 
}: ProductCardProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  React.useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
      });
    }
  }, [controls, inView]);

  const handleBuy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    await controls.start({
      scale: [1, 0.95, 1],
      transition: { duration: 0.2 }
    });
    
    addItem({ id, name, price, image });
    
    if (!isCartOpen) {
      toast.success("Produto adicionado ao carrinho!", {
        description: "Clique no carrinho para ver seus itens",
        icon: <Sparkles className="h-4 w-4 text-gold" />
      });
    }
    
    if (onClick) onClick();
  };

  const handleClick = () => navigate(`/product/${id}`);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      whileHover={isMobile ? undefined : { scale: 1.02 }}
      className={`w-full ${className}`}
      onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="bg-secondary border-0 overflow-hidden group relative cursor-pointer">
        <CardContent className="p-0">
          <div className="relative">
            <motion.img
              src={image}
              alt={name}
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
              layoutId={`product-image-${id}`}
              animate={{
                scale: isHovered ? 1.05 : 1
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            {!isMobile && (
              <motion.div
                className="absolute top-3 right-3 z-10 bg-black/80 rounded-full p-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0.8
                }}
                transition={{ duration: 0.2 }}
              >
                <ShoppingCart className="h-4 w-4 text-gold" />
              </motion.div>
            )}
          </div>
        </CardContent>

        <CardContent className="p-3">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <motion.h3 
              className="text-base font-semibold text-gold group-hover:text-white transition-colors duration-300 line-clamp-1"
              animate={{
                y: isHovered ? -2 : 0
              }}
            >
              {name}
            </motion.h3>
            {time && (
              <motion.p 
                className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                animate={{
                  y: isHovered ? -1 : 0
                }}
              >
                {time}
              </motion.p>
            )}
            <motion.p 
              className="text-lg font-bold text-gold"
              animate={{
                scale: isHovered ? 1.1 : 1,
                y: isHovered ? -2 : 0
              }}
              transition={{ duration: 0.2 }}
            >
              R$ {price.toFixed(2)}
            </motion.p>
          </motion.div>
        </CardContent>

        <CardFooter className="p-3">
          <Button
            className="w-full bg-gradient-gold text-black hover:bg-gold group-hover:scale-105 transition-all duration-300"
            onClick={handleBuy}
            size="sm"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-1.5"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Comprar
            </motion.span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}