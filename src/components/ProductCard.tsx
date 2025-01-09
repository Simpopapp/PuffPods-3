import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  time?: string;
  onClick?: () => void;
  isCartOpen?: boolean;
}

export function ProductCard({ id, name, description, price, image, time, onClick, isCartOpen = false }: ProductCardProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ id, name, price, image });
    if (!isCartOpen) {
      toast.success("Produto adicionado ao carrinho! 🛍️", {
        description: "Clique no carrinho para ver seus itens"
      });
    }
    if (onClick) {
      onClick();
    }
  };

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  if (!inView) {
    return (
      <div ref={ref} className="w-full">
        <Card className="bg-secondary border-0">
          <CardHeader className="p-0">
            <Skeleton className="h-48 w-full" />
          </CardHeader>
          <CardContent className="p-6">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="w-full"
      onClick={handleClick}
    >
      <Card className="bg-secondary border-0 overflow-hidden group relative cursor-pointer">
        <motion.div
          className="absolute top-4 right-4 z-10 bg-black/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <ShoppingCart className="h-5 w-5 text-gold" />
        </motion.div>

        <CardHeader className="p-0">
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              layoutId={`product-image-${id}`}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CardTitle className="text-xl mb-2 text-gold group-hover:text-white transition-colors duration-300">
              {name}
            </CardTitle>
            <p className="text-sm text-gray-400 mb-2 group-hover:text-gray-300 transition-colors duration-300">
              {description}
            </p>
            {time && (
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2 group-hover:text-gray-300 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gold"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {time}
              </div>
            )}
            <motion.p 
              className="text-2xl font-bold text-gold group-hover:scale-110 origin-left transition-transform duration-300"
              whileHover={{ scale: 1.1 }}
            >
              R$ {price.toFixed(2)}
            </motion.p>
          </motion.div>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full bg-gradient-gold text-black hover:bg-gold group-hover:scale-105 transition-all duration-300"
            onClick={handleBuy}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Comprar Agora
            </motion.span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}