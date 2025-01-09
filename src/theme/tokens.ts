export const themeTokens = {
  // Cores principais do sistema
  colors: {
    brand: {
      primary: "#FFB800",    // Cor principal da marca
      secondary: "#1A1A1D",  // Cor secundária da marca
      accent: "#FFD700"      // Cor de destaque
    },
    text: {
      primary: "#FFFFFF",    // Texto principal
      secondary: "#A0A0A0",  // Texto secundário
      inverse: "#0D0D0F"     // Texto inverso
    },
    background: {
      primary: "#0D0D0F",    // Fundo principal
      secondary: "#1A1A1D",  // Fundo secundário
      elevated: "#252529"    // Fundo elevado
    },
    status: {
      success: "#22C55E",    // Sucesso
      error: "#EF4444",      // Erro
      warning: "#F59E0B"     // Aviso
    }
  },

  // Tipografia
  typography: {
    fonts: {
      body: "Inter, sans-serif",
      heading: "Inter, sans-serif"
    },
    sizes: {
      xs: "0.75rem",    // 12px
      sm: "0.875rem",   // 14px
      base: "1rem",     // 16px
      lg: "1.125rem",   // 18px
      xl: "1.25rem",    // 20px
      "2xl": "1.5rem",  // 24px
      "3xl": "1.875rem" // 30px
    }
  },

  // Espaçamento
  spacing: {
    xs: "0.25rem",    // 4px
    sm: "0.5rem",     // 8px
    md: "1rem",       // 16px
    lg: "1.5rem",     // 24px
    xl: "2rem",       // 32px
    "2xl": "2.5rem"   // 40px
  },

  // Bordas
  borders: {
    radius: {
      sm: "0.25rem",    // 4px
      md: "0.5rem",     // 8px
      lg: "0.75rem",    // 12px
      full: "9999px"    // Circular
    },
    width: {
      thin: "1px",
      medium: "2px",
      thick: "4px"
    }
  },

  // Sombras
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.2)"
  },

  // Breakpoints
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px"
  },

  // Animações
  animations: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms"
    },
    timing: {
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
      linear: "linear",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
    }
  }
} as const;

// Tipos úteis para TypeScript
export type ThemeColors = keyof typeof themeTokens.colors;
export type ThemeSpacing = keyof typeof themeTokens.spacing;
export type ThemeFontSizes = keyof typeof themeTokens.typography.sizes;
export type ThemeBreakpoints = keyof typeof themeTokens.breakpoints;

// Helper para acessar tokens de forma segura
export const getThemeToken = (
  category: keyof typeof themeTokens,
  subcategory: string,
  token: string
): string => {
  return (themeTokens[category] as any)[subcategory]?.[token] ?? '';
};