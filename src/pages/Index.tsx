import { PremiumSection } from "@/components/PremiumSection";
import { PremiumSection2 } from "@/components/PremiumSection2";
import { SingleUnits } from "@/components/sections/SingleUnits";
import { AllPacks } from "@/components/sections/AllPacks";
import { V15Line } from "@/components/sections/V15Line";
import { V35Line } from "@/components/sections/V35Line";
import { V50Line } from "@/components/sections/V50Line";
import { V60Line } from "@/components/sections/V60Line";
import { V80Line } from "@/components/sections/V80Line";
import { V150Line } from "@/components/sections/V150Line";
import { Wifi, Coffee, CreditCard } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductCard } from "@/components/ProductCard";
import { useInView } from "react-intersection-observer";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { BrandsMenu } from "@/components/BrandsMenu";

const featuredProducts = [
  {
    id: "v150",
    name: "Ignite V150 Vape Device",
    description: "Dispositivo V150 com maior autonomia",
    price: 119.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/V150_BERRY-BLAST.png?v=1722018032",
    time: "1500 puffs",
    sectionId: "v150-section"
  },
  {
    id: "v80",
    name: "Ignite V80 Vape Device",
    description: "Dispositivo V80 individual com maior capacidade",
    price: 79.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/V80_Couch.jpg?v=1713918859",
    time: "800 puffs",
    sectionId: "v80-section"
  },
  {
    id: "v50",
    name: "Ignite V50 Vape Device",
    description: "Dispositivo V50 ideal para uso moderado",
    price: 59.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/2023_0226_Ignite_Nic_Studio_MikeKirschbaum_02.21.2023Igniteproductcreative0179_1.jpg?v=1691183359",
    time: "500 puffs",
    sectionId: "v50-section"
  }
];

const Index = () => {
  const { ref: featuredRef, inView: featuredInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      {isMobile ? (
        <header className="w-full py-4 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold">
              PodsPuffs - Vape Store
            </h1>
            <p className="text-lg text-gray-400 mt-1">
              A melhor seleção de pods descartáveis Ignite
            </p>
          </div>
        </header>
      ) : (
        <header className="container mx-auto py-20 text-center">
          <h1 className="text-5xl font-bold mb-4">PodsPuffs - Vape Store</h1>
          <p className="text-xl text-gray-400 mb-8">A melhor seleção de pods descartáveis Ignite</p>
        </header>
      )}

      {/* Rest of the components */}
      <section className="container mx-auto mb-20">
        <PremiumSection onButtonClick={() => {
          document.getElementById('v150-section')?.scrollIntoView({ behavior: 'smooth' });
        }} />
      </section>

      {/* Featured Products Section */}
      <section 
        ref={featuredRef}
        className={cn(
          "container mx-auto mb-20 opacity-0 transition-all duration-1000",
          featuredInView && "opacity-100 translate-y-0",
          !featuredInView && "translate-y-10"
        )}
      >
        <h2 className="text-3xl font-bold mb-8">Produtos em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onClick={() => {
                document.getElementById(product.sectionId)?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      </section>

      {/* Brands Menu */}
      <BrandsMenu />

      {/* Second Premium Section */}
      <section className="container mx-auto mb-20">
        <PremiumSection2 onButtonClick={() => {
          document.getElementById('v80-section')?.scrollIntoView({ behavior: 'smooth' });
        }} />
      </section>

      {/* Product Sections */}
      <ScrollArea className="container mx-auto">
        <V15Line />
        <V35Line />
        <V50Line />
        <V60Line />
        <V80Line />
        <V150Line />
        <AllPacks />
      </ScrollArea>

      {/* Amenities */}
      <section className="container mx-auto mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Diferenciais</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-4">
              <Wifi className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-2">Entrega Expressa</h3>
            <p className="text-gray-400">Receba seu pedido no mesmo dia</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-4">
              <Coffee className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-2">Qualidade Premium</h3>
            <p className="text-gray-400">Produtos originais Ignite</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-4">
              <CreditCard className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-2">Pagamento Seguro</h3>
            <p className="text-gray-400">Diversas formas de pagamento</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Entre em Contato</h2>
          <div className="flex justify-center gap-8 mb-8">
            <a href="tel:(11) 456-7890" className="text-gold hover:text-gold-light transition-colors">
              (11) 456-7890
            </a>
            <a href="https://instagram.com" className="text-gold hover:text-gold-light transition-colors">
              @ignitestore
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 Ignite Store. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
