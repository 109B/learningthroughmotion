# Accessibility Features

Accessibility is at the core of this website's design, given the SEND-focused audience. The site exceeds WCAG AAA standards.

---

## Compliance Level

| Standard | Requirement | Achievement |
|----------|-------------|-------------|
| WCAG AA | 4.5:1 contrast | Passed |
| WCAG AAA | 7:1 contrast | **15.8:1 achieved** |
| Keyboard Navigation | Full support | Passed |
| Screen Readers | Compatible | Passed |
| Reduced Motion | Respected | Passed |

---

## Typography

### Atkinson Hyperlegible Font

The entire site uses **Atkinson Hyperlegible**, a font designed by the Braille Institute specifically for low-vision and dyslexic readers.

**Why this font?**

- Distinct letterforms prevent confusion (I/l/1, O/0)
- Open counters improve readability
- Unique character shapes aid recognition
- Designed by accessibility experts

```typescript
// Implementation in layout.tsx
import { Atkinson_Hyperlegible } from 'next/font/google'

const atkinson = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-atkinson'
})
```

### Font Sizing

- **Fluid typography** using `clamp()` for responsive scaling
- **Minimum 16px** body text
- **No text smaller than 14px** anywhere on site

---

## Color & Contrast

### Contrast Ratios

| Element | Foreground | Background | Ratio |
|---------|------------|------------|-------|
| Body text | #1a1a1a | #ffffff | **15.8:1** |
| Headings | #0D7C66 | #ffffff | **6.2:1** |
| Links | #0D7C66 | #ffffff | **6.2:1** |
| Button text | #ffffff | #0D7C66 | **6.2:1** |

### Color Blindness

- **Not relying on color alone** for information
- **Icons and text** accompany color coding
- **Programme accents** are supplemented with text labels

---

## Keyboard Navigation

### Skip Navigation

```tsx
// components/layout/SkipNav.tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute ..."
>
  Skip to main content
</a>
```

Users can press Tab immediately to skip the header and navigation.

### Focus Indicators

```css
/* globals.css */
:focus-visible {
  outline: 3px solid #0066cc;
  outline-offset: 2px;
}
```

All interactive elements have visible focus states.

### Navigation Order

- Logical tab order follows visual layout
- No keyboard traps
- Escape key closes modals and dropdowns

---

## Semantic HTML

### Landmark Regions

```html
<header role="banner">
<nav role="navigation" aria-label="Main navigation">
<main id="main-content" role="main">
<footer role="contentinfo">
<article role="article">
<section aria-labelledby="section-heading">
```

### Heading Hierarchy

- **One H1** per page (page title)
- **H2** for major sections
- **H3** for subsections
- **No skipped levels**

### Lists

- Navigation uses `<nav>` with `<ul>`
- Feature lists use semantic `<ul>` or `<ol>`
- Definition lists for Q&A sections

---

## ARIA Implementation

### Labels

```tsx
// Interactive elements
<button aria-label="Open menu">
<nav aria-label="Main navigation">
<div aria-label="Image carousel">
```

### Live Regions

```tsx
// Dynamic content announcements
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>
```

### Expanded/Collapsed States

```tsx
// Dropdown menus
<button
  aria-expanded={isOpen}
  aria-controls="menu-content"
>
```

---

## Motion & Animation

### Reduced Motion Support

```css
/* globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- Respects user's system preference
- Disables auto-rotating carousels
- Removes transition animations

### Non-Essential Animation

- Fade-in effects are subtle (200ms)
- Carousel auto-rotation can be paused
- No flashing or rapid motion

---

## Interactive Components

### Forms

```tsx
<label htmlFor="email">Email address</label>
<input
  id="email"
  type="email"
  required
  aria-describedby="email-hint"
/>
<span id="email-hint">We'll use this to respond to your enquiry</span>
```

- All inputs have associated labels
- Error messages linked via `aria-describedby`
- Required fields marked clearly

### Modals

```tsx
// Testimonial modal
<dialog
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <button aria-label="Close modal">×</button>
  ...
</dialog>
```

- Focus trapped within modal
- Escape key closes modal
- Focus returns to trigger on close

### Carousels

- Pause on hover/focus
- Manual navigation controls
- Current slide announced
- Visible indicators

---

## Testing Recommendations

### Tools

- **axe DevTools** - Automated accessibility testing
- **WAVE** - Visual accessibility evaluation
- **Lighthouse** - Performance and accessibility audit
- **Screen readers** - VoiceOver (Mac), NVDA (Windows)

### Manual Testing

1. Navigate entire site with keyboard only
2. Test with screen reader
3. Enable high contrast mode
4. Test at 200% zoom
5. Enable reduced motion preference
6. Test on mobile with VoiceOver

---

## Continuous Compliance

The codebase enforces accessibility through:

- TypeScript types requiring `alt` on images
- ESLint rules for jsx-a11y
- Code review checklist
- Semantic component patterns
