import * as React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface BrandMenuItem {
  id: string;
  name: string;
  image: string;
  route: string;
}

const brandMenuItems: BrandMenuItem[] = [
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
  const navigate = useNavigate();
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
    setManualExpand(!isCollapsed);
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
        onClick={() => {
          if (isCollapsed) {
            setIsCollapsed(false);
            setManualExpand(true);
          }
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5 opacity-50" />
        
        <motion.button
          onClick={handleToggleCollapse}
          className={cn(
            "absolute right-4 top-4 bg-secondary/80 hover:bg-secondary text-foreground p-2 rounded-lg shadow-lg backdrop-blur-sm border border-gold/20 transition-all duration-300",
          )}
          initial={false}
          animate={{
            rotate: isCollapsed ? 180 : 0,
          }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isCollapsed ? (
            <ChevronDown className="w-6 h-6 text-gold" />
          ) : (
            <ChevronUp className="w-6 h-6 text-gold" />
          )}
        </motion.button>

        <div className="absolute left-1/2 top-8 -translate-x-1/2 w-full text-center">
          <motion.h2 
            className="text-4xl font-bold tracking-tight bg-gradient-gold text-gradient"
            animate={{
              scale: isCollapsed ? 0.8 : 1,
              y: isCollapsed ? -10 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            Nossas Marcas
          </motion.h2>
        </div>

        <motion.div 
          className="container mx-auto px-4 mt-20"
          animate={{
            scale: !isCollapsed ? 1 : 0.8,
            opacity: !isCollapsed ? 1 : 0.8,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <AnimatePresence>
            {!isCollapsed && (
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full max-w-[1200px] mx-auto"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {brandMenuItems.map((brand, index) => (
                    <CarouselItem key={brand.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onClick={() => navigate(brand.route)}
                        className={cn(
                          "group flex flex-col items-center gap-6 rounded-lg overflow-hidden",
                          "hover:bg-secondary/60 transition-all duration-300 ease-out",
                          "focus:outline-none focus:ring-2 focus:ring-primary/50",
                          "relative w-full"
                        )}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <motion.div 
                          className="w-full aspect-[3/4] relative bg-gradient-to-br from-background/20 to-background/5"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <img
                            src={brand.image}
                            alt={brand.name}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          />
                        </motion.div>
                        
                        <span className="text-2xl font-medium bg-gradient-gold bg-clip-text text-transparent group-hover:text-foreground transition-colors duration-300 p-3">
                          {brand.name}
                        </span>
                      </motion.button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12 bg-secondary/80 hover:bg-secondary border-gold/20" />
                <CarouselNext className="hidden md:flex -right-12 bg-secondary/80 hover:bg-secondary border-gold/20" />
              </Carousel>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}