import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/contexts/CartContext";
import { ProductCard } from "@/components/ProductCard";
import { toast } from "sonner";

// Mock data - você pode substituir por dados reais depois
const products = {
  "v150": {
    id: "v150",
    name: "Ignite V150 Vape Device",
    description: "Dispositivo V150 com maior autonomia e qualidade premium. Design ergonômico, bateria de longa duração e sistema de aquecimento otimizado para uma experiência superior.",
    price: 119.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/V150_BERRY-BLAST.png?v=1722018032",
    time: "1500 puffs",
    specs: [
      "1500 puffs garantidos",
      "Bateria de 850mAh",
      "Sistema anti-vazamento",
      "Resistência de 1.2Ω",
      "Capacidade de 4.5ml"
    ],
    related: ["v80", "v60", "v35"]
  },
  // ... outros produtos
};

const relatedProducts = [
  {
    id: "v80",
    name: "Ignite V80 Vape Device",
    description: "Dispositivo V80 individual com maior capacidade",
    price: 79.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/V80_Couch.jpg?v=1713918859",
    time: "800 puffs"
  },
  {
    id: "v60",
    name: "Ignite V60 Vape Device",
    description: "Dispositivo V60 com excelente custo-benefício",
    price: 69.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/2023_0226_Ignite_Nic_Studio_MikeKirschbaum_02.21.2023Igniteproductcreative0225.jpg?v=1691183075",
    time: "600 puffs"
  }
];

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showSpecs, setShowSpecs] = useState(false);

  const product = products[id as keyof typeof products];

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      navigate(-1);
    }
  };

  const handleAddToCart = () => {
    addItem({ ...product, quantity });
    toast.success("Produto adicionado ao carrinho!", {
      description: `${quantity}x ${product.name}`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      drag="x"
      dragConstraints={{ left: 0, right: 100 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      className="min-h-screen bg-background pb-20"
    >
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <Button
          variant="ghost"
          size="icon"
          className="m-4"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          layoutId={`product-image-${product.id}`}
          className="relative aspect-square w-full overflow-hidden rounded-lg mb-6"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 rounded-full"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground mt-2">{product.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">R$ {product.price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">{product.time}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          <Button
            className="w-full bg-gradient-gold text-black hover:bg-gold"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Adicionar ao Carrinho
          </Button>

          <Card
            className="overflow-hidden cursor-pointer"
            onClick={() => setShowSpecs(!showSpecs)}
          >
            <motion.div
              initial={false}
              animate={{ height: showSpecs ? "auto" : "48px" }}
              className="p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Especificações</h3>
                <motion.div
                  animate={{ rotate: showSpecs ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronLeft className="h-4 w-4 rotate-90" />
                </motion.div>
              </div>
              <AnimatePresence>
                {showSpecs && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    {product.specs.map((spec, index) => (
                      <p key={index} className="text-sm text-muted-foreground">
                        • {spec}
                      </p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Card>

          <div>
            <h2 className="text-xl font-semibold mb-4">Produtos Relacionados</h2>
            <ScrollArea className="w-full whitespace-nowrap rounded-lg">
              <div className="flex gap-4 p-4">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="w-64 flex-none">
                    <ProductCard {...relatedProduct} isCartOpen />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}