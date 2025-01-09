# Black Gold Style System

A comprehensive design system for creating elegant black and gold themed interfaces. This document contains everything needed to replicate this visual identity in any project.

## Color Palette

### Primary Colors
- **Dourado Principal:** #FFB800
- **Dourado Secundário:** #FFD700
- **Fundo Escuro:** #0D0D0F
- **Fundo Secundário:** #1A1A1D
- **Texto Principal:** #FFFFFF
- **Texto Secundário:** #A0A0A0

### Status Colors
- **Sucesso:** #22C55E
- **Erro:** #EF4444
- **Aviso:** #F59E0B

### Gradients
```css
/* Primary Gold Gradient */
background: linear-gradient(to right, #FFB800, #FFD700);

/* Dark Overlay */
background: linear-gradient(180deg, rgba(13,13,15,0) 0%, #0D0D0F 100%);
```

## Implementation Guide

1. **Copy Base Configuration**
   ```typescript
   // tailwind.config.ts
   export default {
     theme: {
       extend: {
         colors: {
           background: "#0D0D0F",
           foreground: "#FFFFFF",
           primary: {
             DEFAULT: "#FFB800",
             foreground: "#0D0D0F",
           },
           secondary: {
             DEFAULT: "#1A1A1D",
             foreground: "#FFFFFF",
           },
           gold: {
             DEFAULT: "#FFB800",
             light: "#FFD700",
           },
         },
         backgroundImage: {
           "gradient-gold": "linear-gradient(to right, #FFB800, #FFD700)",
         },
       },
     },
   }
   ```

2. **Apply Base Styles**
   ```css
   /* index.css */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   @layer base {
     body {
       @apply bg-background text-foreground;
     }
   }

   .text-gradient {
     @apply bg-gradient-gold bg-clip-text text-transparent;
   }
   ```

For detailed specifications on typography, spacing, effects and layout, refer to the individual style guides in the `/styles` folder.