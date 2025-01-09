import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Gift, Star } from "lucide-react";

export function RewardsSection() {
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Trophy className="h-5 w-5 text-gold" /> Nível Atual: Ouro
        </h3>
        <Progress value={75} className="h-2" />
        <p className="text-sm text-muted-foreground">
          750 pontos para o próximo nível
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Gift className="h-4 w-4 text-gold" /> Benefícios Atuais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-gold" />
                Frete Grátis em compras acima de R$ 300
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-gold" />
                5% de desconto em todos os produtos
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-gold" />
                Acesso antecipado a novos produtos
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Gift className="h-4 w-4 text-gold" /> Próximo Nível
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-muted-foreground" />
                Frete Grátis em todas as compras
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-muted-foreground" />
                10% de desconto em todos os produtos
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-muted-foreground" />
                Suporte prioritário
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}