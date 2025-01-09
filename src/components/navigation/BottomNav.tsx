import { Home, Search, Grid, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "Home", route: "/" },
  { icon: Grid, label: "Categorias", route: "/categories" },
  { icon: Search, label: "Buscar", route: "/search" },
  { icon: User, label: "Perfil", route: "/profile" }
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bg-background/95 backdrop-blur-lg border-t border-border">
      <div className="flex items-center justify-around h-16 px-2 safe-area-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.route;
          
          return (
            <button
              key={item.route}
              onClick={() => navigate(item.route)}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full",
                "active:scale-95 transition-transform duration-200"
              )}
            >
              <motion.div
                initial={false}
                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                className={cn(
                  "flex flex-col items-center gap-1",
                  isActive ? "text-gold" : "text-muted-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </motion.div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}