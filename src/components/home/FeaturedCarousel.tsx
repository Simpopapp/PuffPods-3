import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";

const featuredProducts = [
  {
    id: "v150",
    name: "Ignite V150",
    description: "Maior autonomia e sabor premium",
    price: 119.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/V150_BERRY-BLAST.png?v=1722018032",
    badge: "Novo",
    rating: 4.8
  },
  {
    id: "v80",
    name: "Ignite V80",
    description: "Design elegante e compacto",
    price: 79.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/V80_Couch.jpg?v=1713918859",
    badge: "Popular",
    rating: 4.5
  },
  {
    id: "v80-tobacco",
    name: "V80 Tobacco",
    description: "Sabor autêntico de tabaco",
    price: 79.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/Tobacco_2.webp?v=1718828976",
    badge: "Exclusivo",
    rating: 4.7
  }
];

export function FeaturedCarousel() {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      className="w-full max-w-screen-xl mx-auto px-4"
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {featuredProducts.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group overflow-hidden rounded-xl bg-secondary p-2"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110"
                  />
                  <Badge 
                    variant="secondary" 
                    className="absolute top-2 right-2 bg-gold text-black font-semibold"
                  >
                    {product.badge}
                  </Badge>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-400 mb-2">{product.description}</p>
                  
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 text-gold" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gold">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <Button 
                      size="sm"
                      className="bg-gradient-gold text-black hover:bg-gold/90"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Comprar
                    </Button>
                  </div>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </motion.div>
  );
}