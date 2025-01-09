import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AppLayout } from "@/components/layouts/AppLayout";
import Index from "./pages/Index";
import ElfBar from "./pages/ElfBar";
import LostMary from "./pages/LostMary";
import OxBar from "./pages/OxBar";
import Product from "./pages/Product";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <BrowserRouter>
            <AppLayout>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/elfbar" element={<ElfBar />} />
                <Route path="/lostmary" element={<LostMary />} />
                <Route path="/oxbar" element={<OxBar />} />
                <Route path="/product/:id" element={<Product />} />
              </Routes>
            </AppLayout>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;