# SEND Accessibility Guidelines for Learning Through Motion

## Core Principles

This site serves parents and children with special educational needs and disabilities. Design decisions must prioritize:

1. **Clarity** over creativity
2. **Predictability** over surprise
3. **Simplicity** over complexity
4. **Accessibility** over aesthetics

---

## Design Standards

### Typography
✅ **Current strengths:**
- Using Atkinson Hyperlegible font (designed for low vision readers)
- Good line height (1.7)
- Generous font sizes

✅ **Keep:**
- Large, clear headings
- Good paragraph spacing
- No justified text (harder to read)

⚠️ **Watch for:**
- Don't reduce font sizes below 16px
- Maintain 1.5-2.0 line spacing
- Keep paragraphs short (3-5 lines max when possible)

---

### Colour & Contrast

✅ **Current palette is good:**
- High contrast text
- Clear differentiation between sections

✅ **Maintain:**
- WCAG AAA contrast ratios (7:1 minimum)
- Programme accent colours are distinct
- Background colours provide clear boundaries

⚠️ **Considerations:**
- Never rely on colour alone to convey information
- Use icons + colour for programme differentiation
- Ensure all interactive elements have 3:1 contrast with background

---

### Navigation & Wayfinding

✅ **Current strengths:**
- Skip navigation link
- Clear hierarchy
- Sticky header

🔧 **Improvements needed:**
- Larger touch targets (minimum 44x44px)
- More obvious "you are here" indicators
- Breadcrumbs on deep pages
- Clear focus states on all interactive elements

---

### Interactive Elements

#### Buttons
- **Minimum size:** 44x44px (touch target)
- **Clear labels:** No icons without text
- **Obvious hover states:** But not relying on hover alone
- **Keyboard accessible:** Clear focus indicators

#### Links
- **Underline or clear differentiation** from body text
- **Descriptive text:** Avoid "click here" - use "Book a discovery call"
- **Visited link colours** should be distinct

#### Forms
- **Large input fields** (minimum 44px height)
- **Clear labels** positioned above inputs
- **Error messages** in plain language, not just red borders
- **Success confirmation** clearly visible

---

### Content Structure

✅ **Keep doing:**
- Semantic HTML (h1, h2, h3 in order)
- ARIA labels for complex elements
- Short paragraphs
- Clear headings

🔧 **Add:**
- Visual breaks between sections
- Icons to support text comprehension
- Progress indicators for multi-step processes
- "Back to top" button on long pages

---

### Images & Media

✅ **Current:**
- Alt text on images
- Next.js image optimization

🔧 **Improve:**
- Ensure alt text is descriptive
- Provide text alternatives for key visual info
- Don't use images of text
- Consider image descriptions for complex images

⚠️ **Avoid:**
- Autoplay videos (can be distressing)
- Flashing or strobing content (seizure risk)
- Background images with text over them (poor contrast)

---

### Animations & Motion

**CRITICAL:** Many SEND users are sensitive to motion.

✅ **Must implement:**
```css
@media (prefers-reduced-motion: reduce) {
  /* Disable all animations */
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

🔧 **Animation guidelines:**
- **Subtle only** - gentle fades, not dramatic movements
- **Slow speed** - 0.3-0.5s, not 0.1s
- **Purposeful** - must improve UX, not just decoration
- **Stoppable** - users can pause if needed
- **No parallax** - can cause motion sickness

⚠️ **Never:**
- Autoplay carousel without controls
- Infinite loops without pause button
- Flashing (more than 3 times per second)
- Unexpected movement

---

### Cognitive Load

**Goal:** Don't overwhelm users with too much information or choice.

✅ **Do:**
- One primary action per section
- Clear hierarchy (most important first)
- Chunked content (short paragraphs, lists)
- Consistent layout patterns
- White space between elements

⚠️ **Avoid:**
- Too many navigation options (current has 5 main items - good!)
- Walls of text
- Nested accordions (one level is fine)
- Cluttered layouts
- Unpredictable interactions

---

### Language & Readability

✅ **Current content is good:**
- Clear, jargon-free language
- Person-first language ("children with SEND" not "SEND children")
- Positive, encouraging tone

🔧 **Maintain:**
- Reading level: Aim for age 12-14 comprehension
- Short sentences (15-20 words)
- Active voice ("We deliver" not "Sessions are delivered")
- No unexplained acronyms (define EHCP, KS1, etc.)

---

### Mobile Accessibility

**Many parents browse on phones, often one-handed.**

🔧 **Requirements:**
- Bottom-heavy navigation for thumb reach
- Large touch targets (44x44px minimum, 48x48px better)
- No hover-only interactions
- Zoom doesn't break layout
- Landscape orientation supported

---

### Focus & Keyboard Navigation

**Critical for users who can't use a mouse.**

🔧 **Must have:**
- Visible focus indicators (not browser default)
- Logical tab order
- Skip links (already have)
- No keyboard traps
- Enter/Space activate buttons
- Escape closes modals

✅ **Test by:**
- Navigate entire site with Tab key only
- Ensure focus indicator always visible
- All interactive elements reachable

---

## Quick Win Priorities (SEND-Focused)

### High Impact, Low Risk:

1. **Enhance button clarity**
   - Larger, more obvious
   - Higher contrast
   - Clear focus states

2. **Add icons to support text**
   - Programme cards get icons
   - Key benefits use icons
   - Navigation hints with icons

3. **Improve spacing**
   - More white space
   - Clearer section boundaries
   - Breathing room between elements

4. **Sticky enquiry button**
   - Always accessible
   - Large touch target
   - High contrast

5. **Better visual hierarchy**
   - Clearer headings
   - Pull quotes for key info
   - Visual breaks between sections

6. **Enhanced programme cards**
   - Add images (familiar visual cues)
   - Larger, clearer text
   - Better hover/focus states

### Medium Priority:

7. **Scroll animations** (ONLY if respecting prefers-reduced-motion)
8. **Testimonials** with clear attribution
9. **Impact statistics** with large, clear numbers
10. **Coach photos** (humanizes service)

---

## What to AVOID

❌ **Don't do these (even if they look good):**

1. **Parallax scrolling** - motion sickness trigger
2. **Carousels that auto-advance** - cognitive overload
3. **Hover-only content** - not accessible
4. **Tiny text or buttons** - motor control issues
5. **Low contrast "modern" design** - vision issues
6. **Complex mega-menus** - cognitive load
7. **Justified text** - reading difficulty
8. **Modal pop-ups** - disorienting
9. **Infinite scroll** - no clear endpoint
10. **Background videos** - distraction + performance

---

## Testing Checklist

Before launch, verify:

- [ ] All text meets WCAG AAA contrast (7:1)
- [ ] All interactive elements are 44x44px minimum
- [ ] Can navigate entire site with keyboard only
- [ ] Focus indicators are clear and visible
- [ ] `prefers-reduced-motion` is respected
- [ ] All images have descriptive alt text
- [ ] No text in images (or alternative provided)
- [ ] Zoom to 200% doesn't break layout
- [ ] Forms have clear labels and error messages
- [ ] Reading level appropriate (Hemingway app)
- [ ] No autoplay media
- [ ] No flashing/strobing content
- [ ] Mobile touch targets are adequate
- [ ] Screen reader test (VoiceOver/NVDA)

---

## Resources

- **WebAIM**: Accessibility guidelines
- **WCAG 2.1 AAA**: Highest accessibility standard
- **Atkinson Hyperlegible**: Font specifically designed for low vision
- **Hemingway App**: Check readability level
- **Contrast Checker**: Ensure colour contrast meets standards
- **axe DevTools**: Browser extension for accessibility testing
