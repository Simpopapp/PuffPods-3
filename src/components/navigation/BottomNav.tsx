import { Home, Search, ShoppingBag, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "Home", route: "/" },
  { icon: Search, label: "Buscar", route: "/search" },
  { icon: ShoppingBag, label: "Produtos", route: "/products" },
  { icon: User, label: "Perfil", route: "/profile" }
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.route;
          
          return (
            <button
              key={item.route}
              onClick={() => navigate(item.route)}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <div
                className={cn(
                  "flex flex-col items-center transition-colors",
                  isActive ? "text-gold" : "text-muted-foreground"
                )}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{item.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}