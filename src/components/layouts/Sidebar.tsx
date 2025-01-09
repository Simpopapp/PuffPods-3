import { Home, Search, Grid, User, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { icon: Home, label: "Home", route: "/" },
  { icon: Grid, label: "Categorias", route: "/categories" },
  { icon: Search, label: "Buscar", route: "/search" },
  { icon: User, label: "Perfil", route: "/profile" }
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 240 }}
      className="sticky top-0 h-screen bg-secondary/50 backdrop-blur-md border-r border-border"
    >
      <div className="flex flex-col h-full p-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="self-end p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>

        <nav className="mt-8 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.route;

            return (
              <Link
                key={item.route}
                to={item.route}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg transition-colors",
                  isActive ? "bg-gold text-black" : "hover:bg-secondary"
                )}
              >
                <Icon size={20} />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-4"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.aside>
  );
}