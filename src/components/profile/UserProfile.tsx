import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, History, Trophy, Share2 } from "lucide-react";
import { PurchaseHistory } from "./PurchaseHistory";
import { RewardsSection } from "./RewardsSection";
import { FavoriteProducts } from "./FavoriteProducts";

export function UserProfile() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-secondary/30">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl mb-2">João Silva</CardTitle>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <Button variant="outline" size="sm" className="gap-2">
                <Heart className="w-4 h-4" /> 12 Favoritos
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <History className="w-4 h-4" /> 8 Pedidos
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Trophy className="w-4 h-4" /> Nível Ouro
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" /> Compartilhar
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="history">Histórico</TabsTrigger>
              <TabsTrigger value="favorites">Favoritos</TabsTrigger>
              <TabsTrigger value="rewards">Recompensas</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[500px] w-full rounded-md border mt-4">
              <TabsContent value="history">
                <PurchaseHistory />
              </TabsContent>
              <TabsContent value="favorites">
                <FavoriteProducts />
              </TabsContent>
              <TabsContent value="rewards">
                <RewardsSection />
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}