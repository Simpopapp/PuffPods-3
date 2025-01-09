import { ProductCard } from "@/components/ProductCard";
import { ProductSection } from "@/components/ProductSection";

const v80Products = [
  {
    id: "v80",
    name: "Ignite V80 Vape Device",
    description: "Dispositivo V80 individual com maior capacidade e duração",
    price: 79.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/V80_Couch.jpg?v=1713918859",
    time: "800 puffs"
  },
  {
    id: "v80-tobacco",
    name: "Ignite V80 Vape Device - Tobacco",
    description: "V80 com sabor autêntico de tabaco para uma experiência tradicional",
    price: 79.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/Tobacco_2.webp?v=1718828976",
    time: "800 puffs"
  },
  {
    id: "v80-pack",
    name: "Ignite V80 Vape Device [10 Pack]",
    description: "Pack com 10 unidades do V80, ideal para uso prolongado",
    price: 699.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/V80_Grass.jpg?v=1713918893",
    time: "8000 puffs total"
  },
  {
    id: "v80-tobacco-pack",
    name: "Ignite V80 Vape Device - Tobacco [10 Pack]",
    description: "Pack com 10 unidades do V80 sabor tabaco",
    price: 699.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/TOBACCO.webp?v=1720032194",
    time: "8000 puffs total"
  }
];

export const V80Line = () => (
  <ProductSection title="Linha V80" className="mb-20">
    {v80Products.map((product) => (
      <ProductCard key={product.id} {...product} />
    ))}
  </ProductSection>
);