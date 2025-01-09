import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { Cart } from "@/components/Cart";
import Index from "./pages/Index";
import ElfBar from "./pages/ElfBar";
import LostMary from "./pages/LostMary";
import OxBar from "./pages/OxBar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <div className="relative">
          <div className="fixed top-4 right-4 z-50">
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
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;