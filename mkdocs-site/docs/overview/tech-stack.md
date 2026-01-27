# Technology Stack

## Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16 | React framework with App Router |
| **React** | 19 | UI component library |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Tailwind CSS** | 4 | Utility-first CSS framework |
| **Node.js** | 18+ | Runtime environment |

---

## Framework: Next.js 16

### Why Next.js?

- **App Router** - Modern file-based routing
- **Server Components** - Better performance by default
- **Image Optimization** - Automatic `<Image>` optimization
- **Font Optimization** - Automatic Google Fonts optimization
- **SEO Built-in** - Metadata API for search optimization
- **Fast Refresh** - Instant development feedback

### Key Features Used

```typescript
// App Router structure
/app
  /page-name/page.tsx    // Each page
  layout.tsx             // Root layout

// Server Components (default)
export default function Page() { ... }

// Client Components (when needed)
"use client"
export default function InteractiveComponent() { ... }

// Metadata API
export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description"
}
```

---

## Language: TypeScript

### Configuration

```json
// tsconfig.json highlights
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2017",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Type Definitions

All content types are defined in `/content/siteContent.ts`:

```typescript
type NavLink = {
  label: string
  href: string
  children?: NavLink[]
}

type ProgrammeDetail = {
  slug: string
  title: string
  excerpt: string
  accent: string
  heroImage?: string
  paragraphs: string[]
  sections?: ProgrammeSection[]
  sessionDetails?: SessionDetails
  pricing?: Pricing
}

type Testimonial = {
  quote: string
  author: string
  role: string
  school?: string
}
```

---

## Styling: Tailwind CSS v4

### New v4 Approach

Uses `@tailwindcss/postcss` instead of traditional config:

```css
/* globals.css */
@import "tailwindcss";

/* Custom CSS Properties */
:root {
  --color-primary: #0D7C66;
  --color-secondary: #FFA726;
  --shadow-soft: 0 2px 8px rgba(0,0,0,0.08);
}
```

### Custom CSS Classes

Beyond Tailwind utilities, semantic classes are defined:

```css
.hero { ... }
.hero__grid { ... }
.shell { ... }
.section { ... }
.split { ... }
.accordion { ... }
.btn { ... }
.link-arrow { ... }
.programme-card { ... }
.testimonial-card { ... }
```

---

## Dependencies

### Production Dependencies

```json
{
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@dnd-kit/core": "^6.x",
    "@dnd-kit/sortable": "^8.x",
    "date-fns": "^4.x"
  }
}
```

### Dev Dependencies

```json
{
  "devDependencies": {
    "typescript": "^5.x",
    "@types/react": "^19.x",
    "@types/node": "^20.x",
    "@tailwindcss/postcss": "^4.x",
    "postcss": "^8.x"
  }
}
```

---

## Fonts

### Atkinson Hyperlegible

Primary font for all text (body and headings):

```typescript
// app/layout.tsx
import { Atkinson_Hyperlegible } from 'next/font/google'

const atkinson = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-atkinson'
})
```

!!! info "Why Atkinson Hyperlegible?"
    Designed by the Braille Institute specifically for low-vision readers. Its distinctive letterforms prevent confusion between similar characters (like 'I', 'l', '1' and 'O', '0'). Perfect for a SEND-focused site.

---

## Build & Deployment

### Build Command

```bash
npm run build
# or
next build
```

### Output

- Static pages where possible
- Server-rendered pages where needed
- Optimized images
- Minified CSS/JS bundles

### Deployment

Ready for deployment on:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Any Node.js host**

---

## File Structure

```
/app                    # Next.js pages (App Router)
  /[page]/page.tsx      # Individual pages
  layout.tsx            # Root layout
  globals.css           # Global styles

/components
  /common/              # Reusable UI components
  /layout/              # Header, Footer, Nav
  /forms/               # Form components
  /games/               # Interactive game components
  /booking/             # Session booking components

/content
  siteContent.ts        # All site copy
  sessionData.ts        # Booking data

/lib
  carousel.ts           # Image carousel utilities
  /types/               # TypeScript definitions

/public
  /images/              # Static images
    /carousel/          # Programme-specific images
```
