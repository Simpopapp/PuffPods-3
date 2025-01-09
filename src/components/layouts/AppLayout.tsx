import { ReactNode } from "react";
import { BottomNav } from "@/components/navigation/BottomNav";
import { Cart } from "@/components/Cart";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-background">
      {!isMobile && <Sidebar />}
      
      <main className="flex-1">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative min-h-screen pb-16"
        >
          <div className={cn(
            "fixed z-50",
            isMobile ? "top-2 right-2" : "top-4 right-4"
          )}>
            <Cart />
          </div>

          {children}

          {isMobile && <BottomNav />}
        </motion.div>
      </main>
    </div>
  );
}