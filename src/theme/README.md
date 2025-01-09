# Black Gold Style System

A comprehensive design system for creating elegant black and gold themed interfaces. Each aspect of the design system is documented in its own file for better organization:

- [Color System](./styles/COLOR_SYSTEM.md)
- [Typography](./styles/TYPOGRAPHY.md)
- [Layout](./styles/LAYOUT.md)
- [Effects](./styles/EFFECTS.md)

## Quick Start

1. Copy the `theme` folder to your project
2. Import the tokens from `tokens.ts`
3. Configure your Tailwind CSS using the provided values
4. Use the utility classes in your components

## Example Usage

```tsx
<div className="bg-background text-foreground">
  <h1 className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
    Black Gold Header
  </h1>
  <div className="bg-secondary p-4 rounded-lg hover:shadow-lg hover:shadow-gold/20 transition-all">
    Content with gold accent
  </div>
</div>
```

For detailed implementation guidelines, check each specific documentation file.