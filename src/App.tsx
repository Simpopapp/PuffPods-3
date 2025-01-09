import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/contexts/CartContext";
import Index from "@/pages/Index";
import Categories from "@/pages/Categories";
import Product from "@/pages/Product";
import Profile from "@/pages/Profile";
import { AppLayout } from "@/components/layouts/AppLayout";

function App() {
  return (
    <Router>
      <CartProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AppLayout>
        <Toaster />
      </CartProvider>
    </Router>
  );
}

export default App;