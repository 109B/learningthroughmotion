# Programme Pages

Three dedicated pages showcase Learning Through Motion's core offerings, each with unique styling and detailed content.

---

## Maths Through Sport

**Route:** `/maths-through-sport`

### Content Structure

- **Hero carousel** with action photos
- **Programme overview** explaining the approach
- **Key benefits** as bullet points
- **Session structure** information
- **Call-to-action** for enquiries

### Unique Features

- Teal accent color (`#0f6d63`)
- Curriculum alignment emphasized
- Cross-curricular outcomes highlighted

---

## Sensory Redevelopment

**Route:** `/sensory-redevelopment`

### Content Structure

```typescript
// Rich structured content with sections
sections: [
  {
    heading: "What is Sensory Redevelopment?",
    content: ["..."],
    subsections: [
      { heading: "The Science", content: ["..."] },
      { heading: "Our Approach", content: ["..."] }
    ]
  }
]

// Pricing information
pricing: {
  registrationFee: 25,
  perSession: 45,
  blockOf6: 240
}

// Session details
sessionDetails: {
  duration: "45 minutes",
  groupSize: "Max 6 children",
  location: "Bolton Arena",
  frequency: "Weekly"
}

// Trial information
trialInfo: {
  available: true,
  description: "First session at reduced rate"
}
```

### Unique Features

- Orange accent color (`#c45f24`)
- **Pricing transparency** - Shows all costs upfront
- **Session details box** - Duration, group size, location
- **Trial CTA** - Encourages first visit
- **FAQ section** - Common questions answered

---

## The Next Chapter

**Route:** `/the-next-chapter`

### Content Structure

- **Programme overview** - Year 7 transition focus
- **Mentoring approach** - How coaches support students
- **Outcomes** - What children achieve
- **Testimonials** - School feedback

### Unique Features

- Gold accent color (`#f4c95d`)
- Transition-specific language
- Secondary school focus
- Mentoring emphasis

---

## Shared Components

All programme pages use these common components:

### PageHero

```tsx
<PageHero
  title={programme.title}
  intro={programme.excerpt}
  carousel={true}
  carouselContext="maths" // or "sensory", "next-chapter"
  ctaLabel="Enquire Now"
  ctaHref="/enquire-now"
/>
```

### Section

```tsx
<Section
  eyebrow="The Programme"
  title="How It Works"
  intro="..."
  tone="default" // or "accent", "muted"
>
  {/* Section content */}
</Section>
```

### ProgrammeStrip

```tsx
<ProgrammeStrip current="maths-through-sport" />
// Shows links to other programmes
```

---

## Content Management

Programme content is defined in `/content/siteContent.ts`:

```typescript
export const PROGRAMMES: ProgrammeDetail[] = [
  {
    slug: "maths-through-sport",
    title: "Maths Through Sport",
    excerpt: "...",
    accent: "#0f6d63",
    heroImage: "/images/maths-hero.jpg",
    paragraphs: ["..."],
    bullets: ["..."],
    sections: [{...}],
    sessionDetails: {...},
    pricing: {...}
  },
  // ... other programmes
]
```

### Accessing Programme Data

```typescript
// In page component
const programme = PROGRAMMES.find(p => p.slug === "maths-through-sport")
```

---

## Responsive Layout

### Desktop

```
┌──────────────────────────────────────┐
│           Hero with Carousel          │
├──────────────────────────────────────┤
│  Content Column  │  Image/Sidebar    │
├──────────────────────────────────────┤
│              Bullet Points            │
├──────────────────────────────────────┤
│           Call to Action              │
└──────────────────────────────────────┘
```

### Mobile

```
┌──────────────────┐
│       Hero       │
├──────────────────┤
│     Content      │
├──────────────────┤
│      Image       │
├──────────────────┤
│     Bullets      │
├──────────────────┤
│       CTA        │
└──────────────────┘
```

---

## SEO Metadata

Each programme page has unique metadata:

```typescript
export const metadata: Metadata = {
  title: "Maths Through Sport",
  description: "Curriculum-aligned maths learning through sport and movement for children with SEND."
}
```
