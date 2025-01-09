import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { Cart } from "@/components/Cart";
import { BottomNav } from "@/components/navigation/BottomNav";
import { useIsMobile } from "@/hooks/use-mobile";
import Index from "./pages/Index";
import ElfBar from "./pages/ElfBar";
import LostMary from "./pages/LostMary";
import OxBar from "./pages/OxBar";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <div className="relative min-h-screen pb-16">
            <div className={cn(
              "fixed z-50",
              isMobile ? "top-2 right-2" : "top-4 right-4"
            )}>
              <Cart />
            </div>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/elfbar" element={<ElfBar />} />
                <Route path="/lostmary" element={<LostMary />} />
                <Route path="/oxbar" element={<OxBar />} />
              </Routes>
              {isMobile && <BottomNav />}
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;