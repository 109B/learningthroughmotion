# All Features Built

A comprehensive list of every feature implemented in the Learning Through Motion website.

---

## Pages

### Public Pages

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Hero, vision, programmes, testimonials, multiple CTAs |
| Maths Through Sport | `/maths-through-sport` | Programme detail with image carousel |
| Sensory Redevelopment | `/sensory-redevelopment` | Multi-section with pricing & trial info |
| The Next Chapter | `/the-next-chapter` | Year 7 transition programme details |
| Our Programmes | `/our-programmes` | Overview of all three programmes |
| Our Vision | `/our-vision` | Mission, values, differentiators |
| Our Coaches | `/our-coaches` | Team profiles with photos & bios |
| Testimonials | `/testimonials` | Full testimonial collection |
| Enquire Now | `/enquire-now` | Contact form with details sidebar |
| Activities Hub | `/activities` | Links to 4 interactive games |
| Community Sessions | `/shop/sessions` | Session blocks with pricing |

### Game Pages

| Game | Route | Description |
|------|-------|-------------|
| Jigsaw | `/activities/jigsaw` | Drag-and-drop puzzle |
| Memory Cards | `/activities/memory-cards` | Card matching (3 difficulty levels) |
| Word Search | `/activities/word-search` | Sports vocabulary finder |
| Number Match | `/activities/number-match` | Quantity-to-numeral matching |

### Internal Pages

| Page | Route | Description |
|------|-------|-------------|
| Progress | `/progress` | Internal changelog (noindex) |

---

## Components

### Layout Components

| Component | File | Purpose |
|-----------|------|---------|
| Header | `layout/Header.tsx` | Navigation, logo, mobile menu |
| Footer | `layout/Footer.tsx` | Contact, links, socials |
| SkipNav | `layout/SkipNav.tsx` | Keyboard accessibility |
| ProgrammeStrip | `layout/ProgrammeStrip.tsx` | Horizontal programme selector |

### Common Components

| Component | File | Purpose |
|-----------|------|---------|
| Section | `common/Section.tsx` | Consistent section wrapper |
| PageHero | `common/PageHero.tsx` | Page hero headers |
| ProgrammeCards | `common/ProgrammeCards.tsx` | Programme card grid |
| ImageCarousel | `common/ImageCarousel.tsx` | Auto-rotating image carousel |
| ImageMosaic | `common/ImageMosaic.tsx` | Grid image display |
| TestimonialsSection | `common/TestimonialsSection.tsx` | Testimonials with modal |
| FadeIn | `common/FadeIn.tsx` | Animation wrapper |
| StickyEnquiry | `common/StickyEnquiry.tsx` | Floating CTA button |
| LogoBadge | `common/LogoBadge.tsx` | Floating logo badge |
| ComingSoonModal | `common/ComingSoonModal.tsx` | Coming soon overlay |

### Form Components

| Component | File | Purpose |
|-----------|------|---------|
| ContactForm | `forms/ContactForm.tsx` | Enquiry submission form |

### Game Components

| Component | File | Purpose |
|-----------|------|---------|
| JigsawGame | `games/JigsawGame.tsx` | Draggable puzzle pieces |
| MemoryCardGame | `games/MemoryCardGame.tsx` | Card matching logic |
| WordSearchGame | `games/WordSearchGame.tsx` | Word finding grid |
| NumberMatchGame | `games/NumberMatchGame.tsx` | Quantity matching |

### Booking Components

| Component | File | Purpose |
|-----------|------|---------|
| SessionBlockCard | `booking/SessionBlockCard.tsx` | Session display card |

---

## Feature Highlights

### Dynamic Image Carousels

```
- Auto-rotating with configurable interval (default 5s)
- Click indicators to jump to specific images
- Context labels showing image source
- Supports multiple image directories per page
- Fisher-Yates shuffle for randomization
```

### Testimonials System

```
- 5 client testimonials with expandable modals
- Randomized display order
- Portal-rendered modal for z-index safety
- Click-outside and Escape key to close
- Body scroll lock when modal open
```

### Interactive Games

```
Memory Cards:
- 3 difficulty levels (3/4/6 pairs)
- Move counter
- Completion detection
- Card flip animations

Jigsaw:
- @dnd-kit drag-and-drop
- Multiple puzzle images
- Snap-to-grid placement
- Completion detection

Word Search:
- 10x10 letter grid
- Sports vocabulary
- Horizontal/vertical/diagonal words
- Highlight found words

Number Match:
- Quantity-to-numeral matching
- Visual counting objects
- Progressive difficulty
```

### Accessibility Features

```
- Skip navigation link
- ARIA labels throughout
- Semantic HTML (nav, main, article, section)
- Keyboard navigation for all interactions
- Focus indicators (3px blue ring)
- prefers-reduced-motion support
- 15.8:1 contrast ratio (WCAG AAA)
- Atkinson Hyperlegible font
```

### Conversion Elements

```
- Sticky "Enquire Now" button
- Multiple CTAs on homepage
- Contact form with validation
- Phone/email links
- Session booking cards
- Trust badges
```

---

## Content Management

All site content centralized in `/content/siteContent.ts`:

```typescript
// Navigation
NAV_LINKS, PRIMARY_NAV

// Contact
CONTACT_DETAILS

// Homepage
HOME_HERO, HOME_ABOUT_PARAGRAPHS, VISION_PARAGRAPHS

// Programmes
PROGRAMMES[] (3 programmes with full content)

// People
COACHES[] (2 team members)

// Social Proof
TESTIMONIALS[] (5 testimonials)

// Pages
ENQUIRY_CONTENT
```

---

## Responsive Design

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, hamburger menu |
| Tablet | 640-1024px | 2 columns, condensed nav |
| Desktop | > 1024px | Full layout, mega menu |

All components respond appropriately at each breakpoint.
