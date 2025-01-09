import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleBuy = () => {
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
      className="w-full"
    >
      <Card className="bg-secondary border-0 overflow-hidden group hover:scale-105 transition-transform duration-300">
        <CardHeader className="p-0">
          <div className="relative h-48 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="text-xl mb-2 text-gold">{name}</CardTitle>
          <p className="text-sm text-gray-400 mb-2">{description}</p>
          {time && (
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
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
          <p className="text-2xl font-bold text-gold">
            R$ {price.toFixed(2)}
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-gradient-gold text-black hover:bg-gold hover:scale-105 transition-all duration-300"
            onClick={handleBuy}
          >
            Comprar Agora
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}