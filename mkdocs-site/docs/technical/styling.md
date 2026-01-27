# Styling System

The site uses Tailwind CSS v4 combined with custom CSS classes for a semantic, maintainable styling approach.

---

## Tailwind CSS v4

### Configuration

Uses the new `@tailwindcss/postcss` approach:

```css
/* globals.css */
@import "tailwindcss";
```

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}
  }
}
```

### Why v4?

- Simplified configuration
- CSS-first approach
- Better performance
- Native CSS features

---

## CSS Custom Properties

### Colors

```css
:root {
  /* Primary palette */
  --color-primary: #0D7C66;
  --color-secondary: #FFA726;
  --color-tertiary: #9C27B0;

  /* Programme accents */
  --color-maths: #0f6d63;
  --color-sensory: #c45f24;
  --color-next-chapter: #f4c95d;

  /* Neutrals */
  --color-text: #1a1a1a;
  --color-text-muted: #666666;
  --color-bg: #ffffff;
  --color-bg-muted: #f5f5f5;

  /* Semantic */
  --color-success: #22c55e;
  --color-error: #ef4444;
  --color-focus: #0066cc;
}
```

### Shadows

```css
:root {
  --shadow-soft: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.12);
  --shadow-strong: 0 8px 32px rgba(0, 0, 0, 0.16);
}
```

### Spacing

```css
:root {
  --space-xs: 0.25rem;   /* 4px */
  --space-sm: 0.5rem;    /* 8px */
  --space-md: 1rem;      /* 16px */
  --space-lg: 1.5rem;    /* 24px */
  --space-xl: 2rem;      /* 32px */
  --space-2xl: 3rem;     /* 48px */
  --space-3xl: 4rem;     /* 64px */
}
```

### Transitions

```css
:root {
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
}
```

---

## Semantic CSS Classes

### Layout Classes

```css
/* Container with max-width */
.shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

/* Section spacing */
.section {
  padding: var(--space-3xl) 0;
}

.section--accent {
  background: var(--color-primary);
  color: white;
}

.section--muted {
  background: var(--color-bg-muted);
}

/* Two-column split layout */
.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2xl);
}

@media (max-width: 768px) {
  .split {
    grid-template-columns: 1fr;
  }
}
```

### Hero Classes

```css
.hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.hero__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2xl);
  align-items: center;
}

.hero__content {
  max-width: 600px;
}

.hero__image {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: 8px;
  overflow: hidden;
}
```

### Button Classes

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-sm) var(--space-lg);
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition-normal);
}

.btn--primary {
  background: var(--color-primary);
  color: white;
}

.btn--primary:hover {
  background: #0a6554;
}

.btn--secondary {
  background: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}

.btn--secondary:hover {
  background: var(--color-primary);
  color: white;
}
```

### Link Classes

```css
.link-arrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}

.link-arrow::after {
  content: "→";
  transition: transform var(--transition-fast);
}

.link-arrow:hover::after {
  transform: translateX(4px);
}
```

### Card Classes

```css
.programme-card {
  background: white;
  border-radius: 8px;
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  transition: var(--transition-normal);
}

.programme-card:hover {
  box-shadow: var(--shadow-medium);
  transform: translateY(-2px);
}

.programme-card__header {
  padding: var(--space-lg);
  color: white;
}

.programme-card__body {
  padding: var(--space-lg);
}

.testimonial-card {
  background: white;
  border-radius: 8px;
  padding: var(--space-xl);
  box-shadow: var(--shadow-soft);
}

.testimonial-card__quote {
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: var(--space-lg);
}

.testimonial-card__author {
  font-weight: 600;
}

.testimonial-card__role {
  color: var(--color-text-muted);
}
```

---

## Typography

### Font Stack

```css
:root {
  --font-body: 'Atkinson Hyperlegible', system-ui, sans-serif;
}

body {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
}
```

### Heading Styles

```css
h1, h2, h3, h4 {
  font-family: var(--font-body);
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text);
}

h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
}

h2 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
}

h3 {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
}
```

### Text Utilities

```css
.eyebrow {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-primary);
}

.intro {
  font-size: 1.125rem;
  color: var(--color-text-muted);
  max-width: 65ch;
}

.prose {
  max-width: 65ch;
}

.prose p + p {
  margin-top: var(--space-lg);
}
```

---

## Accessibility Styles

### Focus States

```css
:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

/* Remove default focus for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Screen Reader Only

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Make visible on focus (for skip links) */
.sr-only.focus:focus {
  position: static;
  width: auto;
  height: auto;
  padding: var(--space-sm) var(--space-md);
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

---

## Responsive Breakpoints

### Mobile First

```css
/* Base styles: mobile */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}

/* Tablet */
@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Breakpoint Reference

| Name | Width | Target |
|------|-------|--------|
| sm | 640px | Tablet portrait |
| md | 768px | Tablet landscape |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |

---

## Usage Pattern

### Combining Tailwind + Custom Classes

```tsx
// Using both approaches together
<section className="section section--accent">
  <div className="shell">
    <h2 className="text-3xl font-bold mb-6">Section Title</h2>
    <div className="split">
      <div className="prose">
        {/* Content */}
      </div>
      <div>
        {/* Image */}
      </div>
    </div>
  </div>
</section>
```

### When to Use What

| Use Custom Classes | Use Tailwind |
|--------------------|--------------|
| Repeated patterns (cards, sections) | One-off spacing/sizing |
| Complex layouts | Simple margins/padding |
| Semantic meaning | Quick prototyping |
| Animations | Color variations |
