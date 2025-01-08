import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { BrandsMenuHeader } from "./brands/BrandsMenuHeader";
import { BrandsCarousel } from "./brands/BrandsCarousel";

const brandMenuItems = [
  {
    id: "elfbar",
    name: "Elf Bar",
    image: "/placeholder.svg",
    route: "/elfbar"
  },
  {
    id: "lostmary",
    name: "Lost Mary",
    image: "/placeholder.svg",
    route: "/lostmary"
  },
  {
    id: "oxbar",
    name: "Ox Bar",
    image: "/placeholder.svg",
    route: "/oxbar"
  }
];

export function BrandsMenu() {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isSticky, setIsSticky] = React.useState(false);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [manualExpand, setManualExpand] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!menuRef.current) return;

      const menuPosition = menuRef.current.getBoundingClientRect();
      const menuTop = menuPosition.top;
      const menuBottom = menuPosition.bottom;
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY;

      if (menuBottom < 0) {
        setIsSticky(true);
        if (!isCollapsed && !manualExpand) {
          setIsCollapsed(true);
        }
      } else {
        setIsSticky(false);
      }

      if (isScrollingUp && menuTop > -100 && isCollapsed && !manualExpand) {
        setIsCollapsed(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCollapsed, lastScrollY, manualExpand]);

  const handleToggleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCollapsed(!isCollapsed);
    setManualExpand(true);
  };

  const handleHeaderClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    const clickY = e.clientY - rect.top;

    if (clickY <= 96 && isSticky) {
      setIsCollapsed(!isCollapsed);
      setManualExpand(true);
    }
  };

  return (
    <div className="relative mb-24" ref={menuRef}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          height: isCollapsed ? "96px" : "auto",
          minHeight: isCollapsed ? "96px" : "300px",
          opacity: 1,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={cn(
          "relative w-full bg-gradient-to-b from-secondary/80 to-secondary/40 backdrop-blur-md z-40 shadow-lg overflow-hidden",
          !isCollapsed && "py-12",
          isSticky && "fixed top-0 left-0 right-0",
          isCollapsed && "cursor-pointer"
        )}
        onClick={handleHeaderClick}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5 opacity-50" />
        
        <BrandsMenuHeader 
          isCollapsed={isCollapsed}
          handleToggleCollapse={handleToggleCollapse}
        />

        <AnimatePresence>
          <BrandsCarousel 
            isCollapsed={isCollapsed}
            brandMenuItems={brandMenuItems}
          />
        </AnimatePresence>
      </motion.div>
    </div>
  );
}