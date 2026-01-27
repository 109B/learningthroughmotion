# Homepage

The homepage serves as the primary entry point for school staff, SENCOs, and parents discovering Learning Through Motion.

---

## Route

`/` - Root page

---

## Sections

### 1. Hero Section

- **Full-width hero** with headline and intro text
- **Call-to-action buttons** for immediate engagement
- **Sticky enquiry button** that follows scroll
- **Logo badge** in corner

### 2. Vision Statement

- **"Why Movement Matters"** - Core philosophy
- **Supporting paragraphs** explaining the SEND-first approach
- **Visual imagery** reinforcing the message

### 3. Programme Cards

- **Three-column grid** (responsive to 2 then 1)
- **Each programme** has:
    - Accent color header
    - Title and excerpt
    - "Learn more" link
- **Programmes shown:**
    - Maths Through Sport (teal)
    - Sensory Redevelopment (orange)
    - The Next Chapter (gold)

### 4. Testimonials

- **Client quotes** from schools
- **Randomized display** for variety
- **Click to expand** full testimonial
- **Modal overlay** with full quote

### 5. Call-to-Action Blocks

- **"Book a Discovery Call"** - Primary conversion
- **"Explore Programmes"** - Secondary navigation
- **Contact details** - Phone and email

---

## Key Features

### Image Carousel

```typescript
// Dynamic image loading from /public/images/carousel/
const images = await getMixedCarouselImages()
// Returns shuffled images from all programme folders
```

### Sticky Enquiry Button

```typescript
// Floating button that persists on scroll
<StickyEnquiry />
```

### Programme Cards Component

```typescript
<ProgrammeCards programmes={PROGRAMMES} />
// Responsive grid with accent colors
```

### Testimonials Section

```typescript
<TestimonialsSection
  testimonials={TESTIMONIALS}
  limit={3}
  randomize={true}
/>
```

---

## Content Source

All homepage content comes from `/content/siteContent.ts`:

```typescript
HOME_HERO = {
  headline: "...",
  intro: "...",
  cta: { label: "...", href: "..." }
}

HOME_ABOUT_PARAGRAPHS = ["...", "..."]

VISION_PARAGRAPHS = ["...", "..."]
```

---

## Responsive Behavior

| Viewport | Layout |
|----------|--------|
| Mobile | Single column, stacked sections |
| Tablet | 2-column programme cards |
| Desktop | 3-column cards, side-by-side content |

---

## Performance

- **Server Component** - No client-side JavaScript for main content
- **Image optimization** - Next.js `<Image>` with lazy loading
- **Priority loading** - Hero images marked as priority
