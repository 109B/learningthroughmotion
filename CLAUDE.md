# Claude Code Instructions for Learning Through Motion

## Project Context

This is a Next.js website for Learning Through Motion, a SEND-focused educational service delivering cross-curricular learning through sport and movement. The site explains their three core programmes and facilitates enquiries from schools.

## 🚨 IMPORTANT: Progress Page Maintenance

**CRITICAL:** There is a client-facing progress/changelog page at `/progress` that MUST be updated with every significant change to the site.

**When to Update:**
- After completing any new feature or improvement
- When making visual/design changes
- After adding new content or sections
- When fixing bugs that affect user experience
- At the end of each development phase

**How to Update:**
1. Open `/app/progress/page.tsx`
2. Add new timeline item with:
   - Clear heading describing the change
   - Date stamp
   - "What Changed" section with bullet points
   - "Why It Matters" or "Impact" section
   - Before/After comparison if applicable
3. Update "Last Updated" date in footer
4. Update status in footer if phase changes

**Purpose:**
- Acts as client progress report for Robbie
- Documents all changes from old site to new
- Serves as changelog for stakeholders
- Demonstrates value and progress
- Not linked in navigation (internal only)

**Access URL:** http://localhost:3000/progress (or /progress on live site)

**Key characteristics:**
- Accessibility-first design
- Content-driven (all copy centralized in `/content/siteContent.ts`)
- Component-based architecture
- TypeScript throughout
- Tailwind CSS for styling

## Code Style & Conventions

### TypeScript
- Use strict type checking (enabled in `tsconfig.json`)
- Define types in `/content/siteContent.ts` for content structures
- Prefer explicit return types for components
- Use `type` over `interface` for consistency with existing code

### Components
- React Server Components by default (Next.js App Router)
- Client components only when necessary (use `"use client"` directive)
- Component structure:
  - `/components/common/` - Reusable UI components
  - `/components/layout/` - Header, Footer, navigation components
- Use semantic HTML elements (especially important for accessibility)

### Content Management
- **All copy lives in `/content/siteContent.ts`**
- Never hardcode strings in components
- Import content constants at the top of each page/component
- Keep content structures consistent with existing types (`NavLink`, `ProgrammeDetail`, etc.)

### Styling
- Tailwind CSS v4 (uses new `@tailwindcss/postcss` approach)
- Use custom CSS classes defined in `globals.css` for complex patterns:
  - `.hero`, `.hero__grid`, `.shell`
  - `.section`, `.split`, `.accordion`
  - `.btn`, `.link-arrow`
- Prefer semantic class names over utility-only approaches
- Maintain the established visual hierarchy

### Accessibility
- Always include ARIA labels for landmark regions
- Use `aria-label` on interactive elements where text alone isn't sufficient
- Ensure keyboard navigation works (Skip Nav already implemented)
- Maintain semantic heading hierarchy (h1 → h2 → h3)
- All images must have meaningful alt text (or empty `alt=""` for decorative images)
- Use Atkinson Hyperlegible font for body text (already configured)

## File Structure

```
/app
  /[page-slug]/page.tsx          # Individual pages
  layout.tsx                      # Root layout with Header/Footer
  globals.css                     # Global styles and CSS custom properties
  page.tsx                        # Homepage

/components
  /common                         # Reusable UI components
    ImageMosaic.tsx
    ProgrammeCards.tsx
    Section.tsx
  /layout                         # Site-wide layout components
    Header.tsx
    Footer.tsx
    SkipNav.tsx

/content
  siteContent.ts                  # All site copy and content

/public
  /images                         # Static images (logos, etc.)
```

## Common Tasks

### Adding a New Page
1. Create `/app/[slug]/page.tsx`
2. Add metadata export with title and description
3. Import content from `/content/siteContent.ts`
4. Use `<Section>` component for consistent layout
5. Add navigation link to `NAV_LINKS` or `PRIMARY_NAV` in `siteContent.ts`

### Adding New Content
1. Define content in `/content/siteContent.ts`
2. Add TypeScript type if creating a new content structure
3. Export constant with clear naming (use SCREAMING_SNAKE_CASE for constants)
4. Import and use in relevant component

### Creating a New Component
1. Determine if it's `common` or `layout`
2. Use React Server Component unless interactivity is needed
3. Accept props with clear TypeScript types
4. Use existing content structures where possible
5. Follow accessibility patterns (semantic HTML, ARIA labels)

## Key Design Principles

### Tone of Voice
- Professional but warm
- Inclusive and person-first language
- Outcome-focused (what children achieve, not just what we do)
- Celebratory of progress and individuality

### Visual Identity
- Each programme has its own accent color (see PROJECT.md)
- Typography hierarchy: Playfair Display for headings, Atkinson Hyperlegible for body
- Generous whitespace
- Image-forward design (photos of sessions in action)

### User Journey
1. **Understand** - What Learning Through Motion does
2. **Explore** - The three programmes and approach
3. **Connect** - Easy path to enquiry (phone, email, form)

## Next.js Specifics

- Uses App Router (not Pages Router)
- Server Components by default
- Image optimization via `next/image` (always use this, not `<img>`)
- Metadata defined in each page with `export const metadata: Metadata`
- Font optimization via `next/font/google`

## What NOT to Do

- Don't hardcode content strings in components
- Don't create one-off CSS utilities - use existing patterns
- Don't skip accessibility attributes (ARIA labels, alt text, semantic HTML)
- Don't create Client Components unless interactivity is genuinely needed
- Don't override the font system (Playfair/Atkinson already configured)
- Don't add dependencies without discussing first

## Testing Considerations

- Test keyboard navigation (Tab, Enter, Escape)
- Verify skip navigation link works
- Check responsive behavior on mobile/tablet
- Ensure all interactive elements are accessible
- Validate heading hierarchy with accessibility tools

## Content Updates

When updating programme descriptions or site copy:
1. Edit only `/content/siteContent.ts`
2. Keep the existing structure (paragraphs array, bullets array, etc.)
3. Maintain consistent tone across all content
4. Consider how copy will flow in both mobile and desktop layouts

## Performance

- Images should be optimized (use WebP where possible)
- Always use `next/image` with width/height specified
- Consider `priority` prop for above-the-fold images
- External images (prositehosting.co.uk URLs) should eventually be migrated to `/public/images`

## Deployment Notes

- Site runs on `learningthroughmotion.co.uk`
- Metadata includes `metadataBase` URL
- Ensure meta descriptions are under 160 characters
- Each page should have unique title via template pattern
