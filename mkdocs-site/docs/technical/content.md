# Content Management

All site content is centralized in TypeScript files for type safety and easy maintenance.

---

## Content Files

### `/content/siteContent.ts`

The main content file containing all site copy.

**Size:** ~454 lines
**Exports:** 15+ constants

---

## Navigation

### NAV_LINKS

Primary navigation structure:

```typescript
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Our Programmes",
    href: "/our-programmes",
    children: [
      { label: "Maths Through Sport", href: "/maths-through-sport" },
      { label: "Sensory Redevelopment", href: "/sensory-redevelopment" },
      { label: "The Next Chapter", href: "/the-next-chapter" }
    ]
  },
  { label: "Our Vision", href: "/our-vision" },
  { label: "Our Coaches", href: "/our-coaches" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Enquire Now", href: "/enquire-now" }
]
```

### Type Definition

```typescript
type NavLink = {
  label: string
  href: string
  children?: NavLink[]
}
```

---

## Contact Details

### CONTACT_DETAILS

```typescript
export const CONTACT_DETAILS = {
  phone: "07xxx xxxxxx",
  email: "info@learningthroughmotion.co.uk",
  location: "Greater Manchester & Lancashire",
  socials: {
    linkedin: "https://linkedin.com/company/learning-through-motion",
    facebook: "https://facebook.com/LearningThroughMotionUK",
    instagram: "https://instagram.com/learningthroughmotion_uk"
  }
}
```

---

## Programme Content

### PROGRAMMES Array

The most complex content structure, containing all programme details:

```typescript
export const PROGRAMMES: ProgrammeDetail[] = [
  {
    // Basic information
    slug: "maths-through-sport",
    title: "Maths Through Sport",
    excerpt: "Curriculum-aligned maths learning through movement",
    accent: "#0f6d63",
    heroImage: "/images/maths-hero.jpg",

    // Legacy content (simple strings)
    paragraphs: [
      "First paragraph of content...",
      "Second paragraph..."
    ],
    bullets: [
      "Benefit one",
      "Benefit two"
    ],

    // Structured content (new format)
    sections: [
      {
        heading: "How It Works",
        content: ["Detailed explanation..."],
        bullets: ["Point 1", "Point 2"],
        subsections: [
          {
            heading: "The Method",
            content: ["Subsection content..."]
          }
        ]
      }
    ],

    // Session information
    sessionDetails: {
      duration: "60 minutes",
      groupSize: "Up to 12 children",
      location: "In-school delivery",
      frequency: "Weekly or bi-weekly"
    },

    // Pricing (where applicable)
    pricing: {
      registrationFee: 25,
      perSession: 45,
      blockOf6: 240
    },

    // Trial information
    trialInfo: {
      available: true,
      description: "First session at reduced rate"
    }
  }
]
```

### Type Definition

```typescript
type ProgrammeDetail = {
  slug: string
  title: string
  excerpt: string
  accent: string
  heroImage?: string
  paragraphs: string[]
  bullets?: string[]
  sections?: ProgrammeSection[]
  sessionDetails?: SessionDetails
  pricing?: Pricing
  trialInfo?: TrialInfo
}

type ProgrammeSection = {
  heading: string
  content: string[]
  bullets?: string[]
  subsections?: ProgrammeSection[]
}

type SessionDetails = {
  duration: string
  groupSize: string
  location: string
  frequency: string
}

type Pricing = {
  registrationFee?: number
  perSession: number
  blockOf6?: number
}
```

---

## People

### COACHES Array

```typescript
export const COACHES: Coach[] = [
  {
    name: "Robbie Smith",
    role: "Head Coach & Founder",
    image: "/images/robbie.jpg",
    bio: [
      "First paragraph about Robbie...",
      "Second paragraph..."
    ],
    qualifications: [
      "Level 3 Personal Training",
      "SEND Specialist"
    ]
  },
  {
    name: "Julian Lewis-Coker",
    role: "Senior Coach",
    image: "/images/julian.jpg",
    bio: ["Bio content..."],
    qualifications: ["Qualification list..."]
  }
]
```

---

## Testimonials

### TESTIMONIALS Array

```typescript
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "The full testimonial quote from the client...",
    author: "Jane Smith",
    role: "SENCO",
    school: "Example Primary School"
  },
  // ... 4 more testimonials
]

type Testimonial = {
  quote: string
  author: string
  role: string
  school?: string
}
```

---

## Homepage Content

### HOME_HERO

```typescript
export const HOME_HERO = {
  headline: "Learning Through Motion",
  intro: "Cross-curricular learning through sport...",
  cta: {
    label: "Enquire Now",
    href: "/enquire-now"
  }
}
```

### HOME_ABOUT_PARAGRAPHS

```typescript
export const HOME_ABOUT_PARAGRAPHS = [
  "First paragraph about the organization...",
  "Second paragraph..."
]
```

### VISION_PARAGRAPHS

```typescript
export const VISION_PARAGRAPHS = [
  "Vision statement content...",
  "Additional vision content..."
]
```

---

## Session Booking Data

### `/content/sessionData.ts`

Separate file for session booking information:

```typescript
export const SESSION_BLOCKS: SessionBlock[] = [
  {
    id: "block-1",
    title: "Spring Term 2025",
    dates: [
      "2025-01-15",
      "2025-01-22",
      // ... 6 more dates
    ],
    time: "10:00 - 10:45",
    location: "Bolton Arena",
    capacity: 6,
    registrationFee: 25,
    pricePerSession: 45,
    status: "published",
    bookingCount: 3
  }
]
```

---

## Using Content in Components

### Importing Content

```typescript
// In any page or component
import {
  PROGRAMMES,
  TESTIMONIALS,
  CONTACT_DETAILS
} from '@/content/siteContent'
```

### Finding Specific Programme

```typescript
// In programme page
const programme = PROGRAMMES.find(p => p.slug === "maths-through-sport")

if (!programme) {
  notFound()
}

return <PageHero title={programme.title} intro={programme.excerpt} />
```

### Mapping Over Content

```typescript
// Rendering programme cards
<div className="grid">
  {PROGRAMMES.map(programme => (
    <ProgrammeCard key={programme.slug} programme={programme} />
  ))}
</div>
```

---

## Updating Content

### Workflow

1. Open `/content/siteContent.ts`
2. Find the relevant constant
3. Edit the content (maintain structure)
4. TypeScript will validate types
5. Save and verify in browser

### Example: Adding a Testimonial

```typescript
// In siteContent.ts
export const TESTIMONIALS: Testimonial[] = [
  // Existing testimonials...

  // Add new one:
  {
    quote: "New testimonial quote here...",
    author: "New Author",
    role: "Their Role",
    school: "Their School"
  }
]
```

### Example: Updating Programme Content

```typescript
// Find the programme
const mathsProgramme = PROGRAMMES[0] // or find by slug

// Update the content structure
{
  slug: "maths-through-sport",
  // ... other fields
  paragraphs: [
    "Updated first paragraph...",
    "Updated second paragraph..."
  ]
}
```

---

## Future: CMS Integration

The content structure is designed for potential CMS integration:

```typescript
// Current (static)
const programmes = PROGRAMMES

// Future (CMS)
const programmes = await fetchFromCMS('/programmes')
```

Compatible CMS options:

- **Sanity** - Real-time preview, GROQ queries
- **Contentful** - GraphQL, webhooks
- **Strapi** - Self-hosted, REST/GraphQL
- **Notion** - Simple, familiar interface
