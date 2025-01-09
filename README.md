# PodsPuffs - Vape Store

## Plano de Reconstrução Mobile-First

### 1. Base Structure & Typography
- Simplificar a estrutura base do layout
- Definir hierarquia tipográfica clara
- Estabelecer espaçamentos consistentes
- Implementar grid system responsivo
- Otimizar para diferentes tamanhos de tela

### 2. Product Cards
- Redesenhar cards com foco mobile-first
- Manter informações essenciais (nome, preço, puffs)
- Otimizar imagens e interações
- Implementar lazy loading
- Adicionar gestos touch-friendly

### 3. Premium Sections
- Simplificar seções premium
- Focar em CTA (Call-to-Action) direto
- Layout mais limpo e direto
- Destacar benefícios principais
- Melhorar conversão

### 4. Filters & Sorting
- Simplificar interface de filtros
- Bottom sheet otimizado para mobile
- Controles touch-friendly
- Busca inteligente
- Filtros mais relevantes

### 5. Brands Menu
- Redesenhar navegação de marcas
- Carrossel otimizado para touch
- Layout mais compacto
- Transições suaves
- Preview rápido

### 6. Cart Experience
- Simplificar processo de compra
- Feedback visual mais claro
- Melhor UX em mobile
- Resumo de pedido otimizado
- Checkout em poucos passos

### 7. Final Polish
- Animações sutis e performáticas
- Testes de usabilidade
- Otimização de performance
- Ajustes finais de UI/UX
- Validação cross-device

## Catálogo de Produtos

### Linha Ignite

#### V15 Series
- Ignite V15 Vape Device
- Ignite V15 Vape Device [10 Pack]

#### V35 Series
- Ignite V35 Vape Device
- Ignite V35 Vape Device [10 Pack]

#### V50 Series
- Ignite V50 Vape Device
- Ignite V50 Vape Device [10 Pack]

#### V60 Series
- Ignite V60 Vape Device
- Ignite V60 Vape Device [10 Pack]

#### V80 Series
- Ignite V80 Vape Device
- Ignite V80 Vape Device - Tobacco
- Ignite V80 Vape Device [10 Pack]
- Ignite V80 Vape Device - Tobacco [10 Pack]

#### V150 Series
- Ignite V150 Vape Device
- Ignite V150 Vape Device - Tobacco
- Ignite V150 Vape Device [5 Pack]
- Ignite V150 Vape Device - Tobacco [5 Pack]

### Marcas Futuras
- Lost Mary (Em breve)
- Oxbar (Em breve)

## Como Implementar

Para iniciar cada etapa do processo de reconstrução, envie o comando correspondente:

- "etapa 1 agora" - Inicia implementação da Base Structure & Typography
- "etapa 2 agora" - Inicia implementação dos Product Cards
- "etapa 3 agora" - Inicia implementação das Premium Sections
- "etapa 4 agora" - Inicia implementação dos Filters & Sorting
- "etapa 5 agora" - Inicia implementação do Brands Menu
- "etapa 6 agora" - Inicia implementação da Cart Experience
- "etapa 7 agora" - Inicia implementação do Final Polish

## Project info

**URL**: https://lovable.dev/projects/d4247768-3bde-4df5-8414-9a41d203b071

## Paleta de Cores

Escolha uma combinação de cores da paleta abaixo e inclua-as na configuração de design do projeto.

**Exemplo de Paleta de Cores:**
- **Dourado Principal:** #FFB800
- **Dourado Secundário:** #FFD700
- **Fundo Escuro:** #0D0D0F
- **Fundo Secundário:** #1A1A1D
- **Texto Principal:** #FFFFFF
- **Texto Secundário:** #A0A0A0

**Cores de Status:**
- **Sucesso:** #22C55E
- **Erro:** #EF4444
- **Aviso:** #F59E0B

### Sistema de Design

1. **Tipografia**
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
     }
   }
   ```

2. **Espaçamento**
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

3. **Bordas**
   ```typescript
   borders: {
     radius: {
       sm: "0.25rem",  // 4px
       md: "0.5rem",   // 8px
       lg: "0.75rem",  // 12px
       full: "9999px"  // Circular
     }
   }
   ```

4. **Breakpoints**
   ```typescript
   breakpoints: {
     sm: "640px",
     md: "768px",
     lg: "1024px",
     xl: "1280px"
   }
   ```

### Como Implementar

1. **Copie os Tokens**
   - Copie o arquivo `src/theme/tokens.ts` para seu novo projeto
   - Mantenha a estrutura de tipos e helpers

2. **Configure o Tailwind**
   - Atualize `tailwind.config.ts` com as cores e tokens
   - Mantenha a extensão de temas consistente

3. **Use nos Componentes**
   ```tsx
   import { getThemeToken } from '@/theme/tokens';
   
   // Exemplo de uso
   const primaryColor = getThemeToken('colors', 'brand', 'primary');
   const spacing = getThemeToken('spacing', '', 'md');
   
   <div className="bg-primary text-white p-md">
     Conteúdo
   </div>
   ```

4. **Mantenha a Consistência**
   - Use sempre os tokens definidos
   - Evite valores hardcoded
   - Mantenha a documentação atualizada

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d4247768-3bde-4df5-8414-9a41d203b071) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d4247768-3bde-4df5-8414-9a41d203b071) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
