# Sistema de Design

Este documento contém tudo necessário para replicar a identidade visual em qualquer projeto.

## Paleta de Cores

### Cores Principais
- **Dourado Principal:** #FFB800
- **Dourado Secundário:** #FFD700
- **Fundo Escuro:** #0D0D0F
- **Fundo Secundário:** #1A1A1D
- **Texto Principal:** #FFFFFF
- **Texto Secundário:** #A0A0A0

### Cores de Status
- **Sucesso:** #22C55E
- **Erro:** #EF4444
- **Aviso:** #F59E0B

### Gradientes
```css
/* Gradiente Principal */
background: linear-gradient(to right, #FFB800, #FFD700);

/* Gradiente Escuro */
background: linear-gradient(to bottom, #1A1A1D, #0D0D0F);

/* Gradiente de Sobreposição */
background: linear-gradient(180deg, rgba(13,13,15,0) 0%, #0D0D0F 100%);
```

## Sistema de Design

### 1. Tipografia
```typescript
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
  },
  weights: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700"
  },
  lineHeights: {
    tight: "1.2",
    normal: "1.5",
    relaxed: "1.75"
  }
}
```

### 2. Espaçamento
```typescript
spacing: {
  xs: "0.25rem",  // 4px
  sm: "0.5rem",   // 8px
  md: "1rem",     // 16px
  lg: "1.5rem",   // 24px
  xl: "2rem",     // 32px
  "2xl": "2.5rem" // 40px
}
```

### 3. Bordas e Sombras
```typescript
borders: {
  radius: {
    sm: "0.25rem",  // 4px
    md: "0.5rem",   // 8px
    lg: "0.75rem",  // 12px
    full: "9999px"  // Circular
  },
  width: {
    thin: "1px",
    medium: "2px",
    thick: "4px"
  }
},
shadows: {
  sm: "0 2px 4px rgba(0,0,0,0.1)",
  md: "0 4px 6px rgba(0,0,0,0.1)",
  lg: "0 10px 15px rgba(0,0,0,0.1)"
}
```

### 4. Breakpoints
```typescript
breakpoints: {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px"
}
```

### 5. Efeitos e Animações
```typescript
effects: {
  transition: {
    fast: "150ms ease",
    normal: "300ms ease",
    slow: "500ms ease"
  },
  hover: {
    scale: "transform: scale(1.05)",
    lift: "transform: translateY(-2px)",
    glow: "box-shadow: 0 0 10px rgba(255,184,0,0.5)"
  }
}
```

## Guia de Implementação

### 1. Configuração Inicial

1. Copie os tokens para seu projeto:
```bash
cp src/theme/tokens.ts [seu-projeto]/src/theme/
```

2. Configure o Tailwind (`tailwind.config.ts`):
```typescript
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFB800",
        secondary: "#FFD700",
        background: "#0D0D0F",
        foreground: "#FFFFFF",
      },
      backgroundImage: {
        "gradient-gold": "linear-gradient(to right, #FFB800, #FFD700)",
      }
    }
  }
} satisfies Config;
```

3. Configure os estilos globais (`index.css`):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-foreground;
    font-family: Inter, sans-serif;
  }
}

@layer components {
  .btn-primary {
    @apply bg-gradient-gold text-background font-semibold px-4 py-2 rounded-lg 
           hover:scale-105 transition-transform duration-300;
  }
  
  .card {
    @apply bg-secondary/50 backdrop-blur-sm rounded-lg p-4 
           hover:shadow-lg transition-all duration-300;
  }
}
```

### 2. Exemplos de Uso

#### Componente de Card
```tsx
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="card">
    {children}
  </div>
);
```

#### Botão Estilizado
```tsx
const Button = ({ children }: { children: React.ReactNode }) => (
  <button className="btn-primary">
    {children}
  </button>
);
```

### 3. Boas Práticas

1. **Consistência**
   - Use sempre os tokens definidos
   - Evite valores hardcoded
   - Mantenha a documentação atualizada

2. **Responsividade**
   - Use os breakpoints definidos
   - Teste em diferentes tamanhos de tela
   - Priorize mobile-first

3. **Performance**
   - Use purge CSS
   - Otimize imagens
   - Minimize o uso de sombras e efeitos pesados

4. **Acessibilidade**
   - Mantenha contraste adequado
   - Use tamanhos de fonte legíveis
   - Adicione estados hover/focus visíveis