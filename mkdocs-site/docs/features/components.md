# Components Reference

All reusable components in the Learning Through Motion codebase.

---

## Layout Components

### Header

**File:** `components/layout/Header.tsx`
**Type:** Client Component

Full-featured responsive header with navigation.

```tsx
<Header />
```

**Features:**

- Responsive mobile menu
- Dropdown navigation for Programmes
- Logo swap on hover (logo → smile)
- Sticky behavior on scroll
- Active link highlighting

---

### Footer

**File:** `components/layout/Footer.tsx`
**Type:** Server Component

Site-wide footer with contact information and links.

```tsx
<Footer />
```

**Sections:**

- Contact details (phone, email)
- Navigation links
- Social media icons (LinkedIn, Facebook, Instagram)
- Copyright notice

---

### SkipNav

**File:** `components/layout/SkipNav.tsx`
**Type:** Server Component

Accessibility skip link for keyboard users.

```tsx
<SkipNav />
```

**Behavior:**

- Hidden until focused
- Appears at top of viewport on Tab
- Links to `#main-content`

---

### ProgrammeStrip

**File:** `components/layout/ProgrammeStrip.tsx`
**Type:** Server Component

Horizontal programme navigation bar.

```tsx
<ProgrammeStrip current="maths-through-sport" />
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| current | string | Slug of current programme (for highlighting) |

---

## Common Components

### Section

**File:** `components/common/Section.tsx`
**Type:** Server Component

Consistent section wrapper with optional heading elements.

```tsx
<Section
  eyebrow="About Us"
  title="Our Vision"
  intro="We believe every child can succeed..."
  tone="accent"
>
  {children}
</Section>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| eyebrow | string | - | Small text above title |
| title | string | - | Section heading (H2) |
| intro | string | - | Introductory paragraph |
| tone | "default" \| "accent" \| "muted" | "default" | Background style |
| children | ReactNode | - | Section content |

---

### PageHero

**File:** `components/common/PageHero.tsx`
**Type:** Server Component

Hero section for individual pages.

```tsx
<PageHero
  title="Maths Through Sport"
  intro="Curriculum-aligned learning through movement"
  carousel={true}
  carouselContext="maths"
  ctaLabel="Enquire Now"
  ctaHref="/enquire-now"
/>
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| title | string | Page title (H1) |
| intro | string | Introductory text |
| image | string | Single hero image path |
| carousel | boolean | Enable image carousel |
| carouselContext | string | Carousel image folder |
| ctaLabel | string | Button text |
| ctaHref | string | Button link |

---

### ProgrammeCards

**File:** `components/common/ProgrammeCards.tsx`
**Type:** Server Component

Grid of programme cards with accent colors.

```tsx
<ProgrammeCards programmes={PROGRAMMES} />
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| programmes | ProgrammeDetail[] | Array of programmes |

**Output:**

- Responsive grid (3 → 2 → 1 columns)
- Each card shows title, excerpt, accent color
- Links to programme detail page

---

### ImageCarousel

**File:** `components/common/ImageCarousel.tsx`
**Type:** Client Component

Auto-rotating image carousel with controls.

```tsx
<ImageCarousel
  images={[
    { src: "/img1.jpg", alt: "...", context: "Maths" },
    { src: "/img2.jpg", alt: "...", context: "Sensory" }
  ]}
  interval={5000}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| images | CarouselImage[] | - | Images to display |
| interval | number | 5000 | Auto-rotate interval (ms) |

**Features:**

- Auto-rotation with pause on hover
- Click indicators to navigate
- Context labels below image
- Fade transition

---

### TestimonialsSection

**File:** `components/common/TestimonialsSection.tsx`
**Type:** Client Component

Testimonial display with expandable modal.

```tsx
<TestimonialsSection
  testimonials={TESTIMONIALS}
  limit={3}
  randomize={true}
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| testimonials | Testimonial[] | - | Testimonials array |
| limit | number | - | Max testimonials shown |
| randomize | boolean | false | Shuffle order |

**Features:**

- Card display with truncated quotes
- Click to open full testimonial in modal
- Portal-rendered modal for z-index safety
- Escape key and click-outside to close

---

### FadeIn

**File:** `components/common/FadeIn.tsx`
**Type:** Client Component

Simple fade-in animation wrapper.

```tsx
<FadeIn delay={200}>
  <div>Content</div>
</FadeIn>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| delay | number | 0 | Delay before animation (ms) |
| children | ReactNode | - | Content to animate |

---

### StickyEnquiry

**File:** `components/common/StickyEnquiry.tsx`
**Type:** Client Component

Persistent floating enquiry button.

```tsx
<StickyEnquiry />
```

**Behavior:**

- Fixed position (bottom right)
- Always visible during scroll
- Links to `/enquire-now`

---

### LogoBadge

**File:** `components/common/LogoBadge.tsx`
**Type:** Server Component

Floating LTM logo badge.

```tsx
<LogoBadge position="top-right" />
```

---

### ImageMosaic

**File:** `components/common/ImageMosaic.tsx`
**Type:** Server Component

Grid display of multiple images.

```tsx
<ImageMosaic images={imageArray} columns={3} />
```

---

### ComingSoonModal

**File:** `components/common/ComingSoonModal.tsx`
**Type:** Client Component

Modal overlay for upcoming features.

```tsx
<ComingSoonModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  feature="Online Booking"
/>
```

---

## Form Components

### ContactForm

**File:** `components/forms/ContactForm.tsx`
**Type:** Client Component

Enquiry submission form.

```tsx
<ContactForm variant="full" />
```

**Props:**

| Prop | Type | Options | Description |
|------|------|---------|-------------|
| variant | string | "full", "compact" | Form layout |

**Fields:**

- Name (required)
- School/Organisation
- Email (required)
- Phone
- Message (required)

---

## Booking Components

### SessionBlockCard

**File:** `components/booking/SessionBlockCard.tsx`
**Type:** Server Component

Display card for community session blocks.

```tsx
<SessionBlockCard session={sessionBlock} />
```

**Shows:**

- Session dates
- Pricing (registration + per-session)
- Capacity
- Location
- Booking CTA

---

## Game Components

See [Interactive Games](games.md) for detailed documentation of:

- `JigsawGame`
- `MemoryCardGame`
- `WordSearchGame`
- `NumberMatchGame`
