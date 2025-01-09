import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

const purchases = [
  {
    id: "1",
    date: "2024-03-15",
    products: ["V150 Berry Blast", "V80 Tobacco"],
    total: 199.80,
    status: "Entregue"
  },
  {
    id: "2",
    date: "2024-03-10",
    products: ["V80 Pack"],
    total: 699.90,
    status: "Em trânsito"
  },
  {
    id: "3",
    date: "2024-03-05",
    products: ["V150 Tobacco"],
    total: 119.90,
    status: "Entregue"
  }
];

export function PurchaseHistory() {
  return (
    <div className="p-4 space-y-4">
      {purchases.map((purchase) => (
        <Card key={purchase.id} className="bg-secondary/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pedido #{purchase.id}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {new Date(purchase.date).toLocaleDateString()}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 text-sm">
              <Package className="h-4 w-4 text-gold" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {purchase.products.join(", ")}
                </p>
                <p className="text-sm text-muted-foreground">
                  Status: {purchase.status}
                </p>
              </div>
              <div className="font-bold text-gold">
                R$ {purchase.total.toFixed(2)}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}