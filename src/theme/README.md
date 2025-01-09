# Sistema de Design Tokens

Este sistema foi criado para facilitar a manutenção e consistência do design em todo o projeto.

## Como usar

1. **Importação básica**:
```typescript
import { themeTokens, getThemeToken } from './tokens';
```

2. **Acessando tokens**:
```typescript
// Cor primária
const primaryColor = themeTokens.colors.brand.primary;

// Espaçamento
const spacing = themeTokens.spacing.md;

// Usando o helper
const color = getThemeToken('colors', 'brand', 'primary');
```

3. **Em componentes Tailwind**:
```typescript
<div className="bg-[#FFB800] text-[length:var(--font-size-base)]">
  Conteúdo
</div>
```

## Estrutura

- **colors**: Cores do sistema
- **typography**: Fontes e tamanhos
- **spacing**: Sistema de espaçamento
- **borders**: Bordas e raios
- **shadows**: Sistema de sombras
- **breakpoints**: Pontos de quebra responsivos
- **animations**: Configurações de animação

## Benefícios

1. Manutenção centralizada
2. Tipagem forte com TypeScript
3. Fácil de entender e modificar
4. Documentação clara
5. Consistência visual garantida