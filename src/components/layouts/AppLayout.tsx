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
      
      <main className="flex-1 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "relative min-h-screen",
            isMobile ? "pb-20" : "pb-16" // Aumentado para acomodar a navegação inferior
          )}
        >
          <div className={cn(
            "fixed z-50",
            isMobile ? "top-4 right-4" : "top-4 right-4"
          )}>
            <Cart />
          </div>

          <div className={cn(
            "container mx-auto px-4",
            isMobile ? "pt-16" : "pt-8"
          )}>
            {children}
          </div>

          {isMobile && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 z-50"
            >
              <BottomNav />
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}