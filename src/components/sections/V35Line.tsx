import { ProductCard } from "@/components/ProductCard";
import { ChevronDown } from "lucide-react";

const v35Products = [
  {
    id: "v35",
    name: "Ignite V35 Vape Device",
    description: "Dispositivo V35 ideal para iniciantes",
    price: 49.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/2023_0226_Ignite_Nic_Studio_MikeKirschbaum_02.21.2023Igniteproductcreative0201.jpg?v=1691183623",
    time: "350 puffs"
  },
  {
    id: "v35-pack",
    name: "Ignite V35 Vape Device [10 Pack]",
    description: "Pack com 10 unidades do V35",
    price: 449.90,
    image: "https://cdn.shopify.com/s/files/1/0072/5119/8050/files/2023_0226_Ignite_Nic_Studio_MikeKirschbaum_02.21.2023Igniteproductcreative0195_1.jpg?v=1691183683",
    time: "3500 puffs total"
  }
];

export const V35Line = () => (
  <section id="v35-line" className="mb-20 mt-12">
    <div className="flex items-center gap-2 mb-8">
      <h2 className="text-3xl font-bold">Linha V35</h2>
      <ChevronDown className="text-gold h-6 w-6" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {v35Products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  </section>
);