# Architecture

The technical architecture of the Learning Through Motion website.

---

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Next.js 16                           │
│                       (App Router)                          │
├─────────────────────────────────────────────────────────────┤
│  Pages (/app)           │  Components (/components)         │
│  ├── page.tsx           │  ├── layout/                      │
│  ├── layout.tsx         │  │   ├── Header.tsx               │
│  ├── [programme]/       │  │   ├── Footer.tsx               │
│  ├── activities/        │  │   └── SkipNav.tsx              │
│  └── ...                │  ├── common/                      │
│                         │  │   ├── Section.tsx              │
│                         │  │   ├── PageHero.tsx             │
│                         │  │   └── ...                      │
│                         │  ├── games/                       │
│                         │  └── forms/                       │
├─────────────────────────────────────────────────────────────┤
│  Content (/content)     │  Utilities (/lib)                 │
│  ├── siteContent.ts     │  ├── carousel.ts                  │
│  └── sessionData.ts     │  └── types/                       │
├─────────────────────────────────────────────────────────────┤
│  Static Assets (/public)                                    │
│  └── images/                                                │
│      └── carousel/                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## Design Principles

### 1. Server Components by Default

All components are React Server Components unless they require:

- `useState` or `useEffect`
- Event handlers (`onClick`, `onChange`)
- Browser APIs (`window`, `document`)
- Third-party client libraries

**Client components** are marked with `"use client"` directive:

```typescript
// Only these components are client-side:
"use client"

// Header.tsx - hover states, mobile menu toggle
// ImageCarousel.tsx - auto-rotation, navigation
// TestimonialsSection.tsx - modal, randomization
// All game components - full interactivity
// ContactForm.tsx - form state management
```

### 2. Content Separation

All text content is separated from components:

```
Component (presentational) ←── Content (data)
```

This enables:

- Easy content updates without touching components
- Potential future CMS integration
- Single source of truth
- Type safety for content structures

### 3. Accessibility First

Accessibility is built into the architecture:

- Semantic HTML elements used throughout
- ARIA attributes as component props
- Skip navigation in root layout
- Focus management in interactive components

### 4. No Database

The site is fully static:

- Content defined in TypeScript files
- No server-side data fetching
- No API routes (removed during cleanup)
- Enables edge deployment

---

## File Structure Detail

### `/app` - Pages

```
/app
├── page.tsx                    # Homepage
├── layout.tsx                  # Root layout (Header, Footer, fonts)
├── globals.css                 # Global styles
├── maths-through-sport/
│   └── page.tsx                # Programme detail
├── sensory-redevelopment/
│   └── page.tsx                # Programme detail
├── the-next-chapter/
│   └── page.tsx                # Programme detail
├── our-programmes/
│   └── page.tsx                # Programmes overview
├── our-vision/
│   └── page.tsx                # Vision page
├── our-coaches/
│   └── page.tsx                # Team page
├── testimonials/
│   └── page.tsx                # Testimonials page
├── enquire-now/
│   └── page.tsx                # Contact page
├── activities/
│   ├── page.tsx                # Games hub
│   ├── jigsaw/page.tsx
│   ├── memory-cards/page.tsx
│   ├── word-search/page.tsx
│   └── number-match/page.tsx
├── shop/
│   └── sessions/page.tsx       # Session booking info
└── progress/
    └── page.tsx                # Internal changelog
```

### `/components` - UI Components

```
/components
├── layout/
│   ├── Header.tsx              # Site header (client)
│   ├── Footer.tsx              # Site footer (server)
│   ├── SkipNav.tsx             # Skip navigation (server)
│   └── ProgrammeStrip.tsx      # Programme nav (server)
├── common/
│   ├── Section.tsx             # Section wrapper (server)
│   ├── PageHero.tsx            # Page hero (server)
│   ├── ProgrammeCards.tsx      # Card grid (server)
│   ├── ImageCarousel.tsx       # Carousel (client)
│   ├── ImageMosaic.tsx         # Image grid (server)
│   ├── TestimonialsSection.tsx # Testimonials (client)
│   ├── FadeIn.tsx              # Animation (client)
│   ├── StickyEnquiry.tsx       # Floating CTA (client)
│   ├── LogoBadge.tsx           # Logo badge (server)
│   └── ComingSoonModal.tsx     # Modal (client)
├── forms/
│   └── ContactForm.tsx         # Contact form (client)
├── games/
│   ├── MemoryCardGame.tsx      # Memory game (client)
│   ├── JigsawGame.tsx          # Jigsaw game (client)
│   ├── WordSearchGame.tsx      # Word search (client)
│   └── NumberMatchGame.tsx     # Number match (client)
└── booking/
    └── SessionBlockCard.tsx    # Session card (server)
```

### `/content` - Content Layer

```
/content
├── siteContent.ts              # All site copy (454 lines)
│   ├── NAV_LINKS               # Navigation structure
│   ├── CONTACT_DETAILS         # Phone, email, socials
│   ├── HOME_HERO               # Homepage hero content
│   ├── PROGRAMMES[]            # Programme details
│   ├── COACHES[]               # Team members
│   ├── TESTIMONIALS[]          # Client quotes
│   └── ENQUIRY_CONTENT         # Contact page copy
└── sessionData.ts              # Session booking data
    └── SESSION_BLOCKS[]        # Session block details
```

### `/lib` - Utilities

```
/lib
├── carousel.ts                 # Dynamic image loading
│   ├── getCarouselImages()     # Get images by context
│   └── getMixedCarouselImages()# Shuffled mixed images
└── types/
    └── index.ts                # Shared TypeScript types
```

---

## Data Flow

### Page Rendering

```
1. Request to /maths-through-sport
           ↓
2. Next.js resolves to /app/maths-through-sport/page.tsx
           ↓
3. Server Component imports PROGRAMMES from siteContent.ts
           ↓
4. Finds programme with slug "maths-through-sport"
           ↓
5. Passes data to child components (PageHero, Section, etc.)
           ↓
6. Server renders HTML and sends to client
           ↓
7. Client hydrates any Client Components
```

### Image Carousel Flow

```
1. PageHero receives carouselContext="maths"
           ↓
2. getCarouselImages("maths") called
           ↓
3. Reads /public/images/carousel/maths/ directory
           ↓
4. Returns array of image objects with paths and alt text
           ↓
5. ImageCarousel (client) receives images
           ↓
6. Auto-rotates through images with interval
```

---

## Component Patterns

### Server Component Pattern

```typescript
// components/common/Section.tsx
import { ReactNode } from 'react'

interface SectionProps {
  eyebrow?: string
  title?: string
  intro?: string
  tone?: 'default' | 'accent' | 'muted'
  children: ReactNode
}

export default function Section({
  eyebrow,
  title,
  intro,
  tone = 'default',
  children
}: SectionProps) {
  return (
    <section className={`section section--${tone}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {title && <h2>{title}</h2>}
      {intro && <p className="intro">{intro}</p>}
      {children}
    </section>
  )
}
```

### Client Component Pattern

```typescript
// components/common/ImageCarousel.tsx
"use client"

import { useState, useEffect } from 'react'

interface CarouselProps {
  images: CarouselImage[]
  interval?: number
}

export default function ImageCarousel({
  images,
  interval = 5000
}: CarouselProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length)
    }, interval)
    return () => clearInterval(timer)
  }, [images.length, interval])

  return (
    <div className="carousel">
      {/* Carousel implementation */}
    </div>
  )
}
```

---

## Build & Deployment

### Build Process

```bash
npm run build
```

1. Next.js analyzes pages and components
2. Server Components pre-rendered at build time
3. Client Components bundled for hydration
4. Images optimized
5. CSS purged and minified

### Output

```
.next/
├── static/           # Static assets (JS, CSS)
├── server/           # Server-rendered pages
└── cache/            # Build cache
```

### Deployment Options

- **Vercel** (recommended) - Zero config deployment
- **Netlify** - Static export or serverless
- **AWS** - Amplify or custom EC2/Lambda
- **Any Node.js host** - `next start`
