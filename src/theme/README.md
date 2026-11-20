# Design System

This folder contains the Enbridge design system tokens and configuration.

## Structure

- `colors.ts` - Color palette and semantic colors
- `typography.ts` - Font families, sizes, weights, and letter spacing
- `shadows.ts` - Shadow depth values
- `spacing.ts` - Spacing scale and border radius values
- `index.ts` - Central export for all tokens

## Design Tokens

### Colors

- **Primary**: `#16A34A` (Green 600), with `#22C55E` (Green 500)
- **Text**: `#4B5563` (default), `#111827` (headings), `#6B7280` (muted)
- **Background**: `#FFFFFF` (default), with a subtle Gray 200 tint for secondary surfaces
- **Border**: `#E5E7EB` (Gray 200)
- **Accent**: `#16A34A` with Green 100 and Green 300 background and border variants
- **Semantic**: success (`#16A34A`), warning (`#EAB308`), error (`#DC2626`), info (`#2563EB`)

### Typography

- **Font Family**: Inter
- **Letter Spacing**: 0.18px (normal)
- **Font Sizes**: From 0.75rem (xs) to 2.25rem (4xl)
- **Font Weights**: 300 (light) to 700 (bold)

### Shadows

Standard shadow scale from xs to 2xl, matching the design theme's default shadow:
```
rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px
```

### Spacing & Border Radius

- **Spacing**: Standard scale from 0.25rem (xs) to 6rem (4xl)
- **Border Radius**: From 0 (none) to 9999px (full), with default at 0.25rem

## Usage

Import tokens from the theme folder:

```ts
import { theme } from '@/theme';
```

Or use Tailwind classes directly (all tokens are available as Tailwind utilities):

```tsx
<div className="bg-primary text-white p-4 rounded-lg shadow-md">
  Hello
</div>
```

## CSS Variables

All design tokens are also available as CSS variables in `src/index.css`:

```css
--primary: #16A34A;
--text: #4B5563;
--text-heading: #111827;
--bg: #FFFFFF;
--border: #E5E7EB;
--shadow: rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;
--radius: 0.25rem;
```

## Component Classes

Global component classes are defined in `src/index.css`:

- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.btn-ghost` - Ghost button style
- `.card` - Card container style
- `.input` - Form input style
- `.label` - Form label style
- `.text-heading` - Heading text utility
- `.text-muted` - Muted text utility
