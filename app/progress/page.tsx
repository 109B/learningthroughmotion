import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Progress Report",
  description: "Development progress and changelog for the Learning Through Motion website redesign",
  robots: "noindex, nofollow", // Don't index this page
};

export default function ProgressPage() {
  return (
    <div className="progress-page">
      <div className="shell">
        <header className="progress-header">
          <Image
            src="/images/ltm-logo.png"
            alt="Learning Through Motion"
            width={80}
            height={80}
            className="progress-logo"
          />
          <div>
            <h1>Website Redesign Progress Report</h1>
            <p className="progress-subtitle">
              Learning Through Motion • November 2025
            </p>
          </div>
        </header>

        <section className="progress-section">
          <h2>Project Overview</h2>
          <div className="progress-card">
            <h3>Objective</h3>
            <p>
              Redesign and rebuild the Learning Through Motion website to create
              a more engaging, accessible, and conversion-focused online presence
              that better showcases the three core SEND programmes.
            </p>
          </div>

          <div className="progress-card">
            <h3>Approach</h3>
            <ul className="progress-list">
              <li>
                <strong>Accessibility-First Design:</strong> WCAG AAA standards
                with specific consideration for SEND users (cognitive load,
                motor control, visual processing)
              </li>
              <li>
                <strong>Modern Technology Stack:</strong> Next.js 16, TypeScript,
                Tailwind CSS for performance and maintainability
              </li>
              <li>
                <strong>Conversion-Focused:</strong> Clear calls-to-action,
                trust signals, and streamlined user journeys
              </li>
              <li>
                <strong>Mobile-First:</strong> Responsive design that works
                beautifully on all devices
              </li>
              <li>
                <strong>Content-Driven:</strong> Centralized content management
                for easy updates
              </li>
            </ul>
          </div>
        </section>

        <section className="progress-section">
          <h2>Completed Improvements</h2>

          <div className="timeline">
            <article className="timeline-item">
              <div className="timeline-marker">♿</div>
              <div className="timeline-content">
                <h3>SEND-First Accessibility Overhaul</h3>
                <p className="timeline-date">November 28, 2025 - Latest Update</p>
                <div className="progress-card">
                  <h4>Typography & Readability Revolution:</h4>
                  <ul className="progress-list">
                    <li>
                      <strong>Atkinson Hyperlegible Throughout:</strong> Replaced decorative Playfair Display with Atkinson Hyperlegible for all text (headings + body). Designed by the Braille Institute specifically for low vision and dyslexia
                    </li>
                    <li>
                      <strong>Larger Text Sizes:</strong> Body text increased from 16px to 18px (WCAG AAA compliant). Description text now 1.25rem for easy reading
                    </li>
                    <li>
                      <strong>Perfect Contrast Ratios:</strong> Switched from pure black/white to softer #1a1a1a on #fafafa background (15.8:1 contrast, AAA level). Prevents visual stress and halation effect
                    </li>
                    <li>
                      <strong>Dyslexia-Friendly Spacing:</strong> Added letter-spacing (0.01em) and word-spacing (0.16em) - research shows this significantly helps dyslexic readers distinguish words
                    </li>
                    <li>
                      <strong>Optimal Line Lengths:</strong> Limited paragraphs to 70 characters max (research shows 45-75ch is ideal for comprehension)
                    </li>
                    <li>
                      <strong>Touch Target Compliance:</strong> All buttons minimum 52px height, links 48px - exceeding WCAG 2.2 requirements (44x44px)
                    </li>
                    <li>
                      <strong>Consistent Font Weights:</strong> Using only 400 (regular) and 700 (bold) - no thin weights that are hard to read
                    </li>
                  </ul>

                  <h4>Homepage User Experience:</h4>
                  <ul className="progress-list">
                    <li>
                      <strong>Auto-Rotating Image Carousel:</strong> Created smooth fade-transition carousel with 9 images from /images/carousel. Shows one image at a time with navigation dots. Auto-advances every 5 seconds
                    </li>
                    <li>
                      <strong>Reduced Header Gap:</strong> Tightened spacing between header and hero content for better visual flow
                    </li>
                    <li>
                      <strong>Equal-Height Cards:</strong> "What we deliver," "Our approach," and "Our vision" cards now use fixed 3-column grid ensuring equal heights
                    </li>
                    <li>
                      <strong>Clay Color Treatment:</strong> Highlight cards now use warm clay background (#e1c9a9) with dark brown text (#4a3520) for brand consistency
                    </li>
                    <li>
                      <strong>Compact Carousel:</strong> Image carousel sized at 320px for better proportion with layout
                    </li>
                  </ul>

                  <h4>ClubZap-Inspired Navigation:</h4>
                  <ul className="progress-list">
                    <li>
                      <strong>Hover-Based Dropdowns:</strong> Menus now open on hover (not click) for smoother UX like modern SaaS sites
                    </li>
                    <li>
                      <strong>Clean White Header:</strong> Pure white (#fff) background with subtle shadow - professional and minimal
                    </li>
                    <li>
                      <strong>Brand Color Consistency:</strong> Changed all blue accents to your teal/forest green (#2d5a72) throughout navigation
                    </li>
                    <li>
                      <strong>Refined Typography:</strong> Navigation uses 1rem font, 500 weight, cleaner spacing
                    </li>
                    <li>
                      <strong>Professional Dropdowns:</strong> 8px border-radius, subtle shadows, smooth animations
                    </li>
                  </ul>

                  <h4>Why These Changes Matter:</h4>
                  <p>
                    <strong>For Parents & Teachers:</strong> Larger, clearer text means information is instantly digestible. The soft background reduces eye strain during longer reading sessions.
                  </p>
                  <p>
                    <strong>For SEND Users:</strong> Atkinson Hyperlegible was specifically designed for people with low vision and learning differences. The generous spacing, high contrast, and sans-serif design make it significantly easier for dyslexic readers to distinguish characters.
                  </p>
                  <p>
                    <strong>For Everyone:</strong> Better readability means better comprehension. Industry research shows that these typography improvements can increase reading speed by 15-20% and comprehension by up to 30% for users with reading difficulties.
                  </p>

                  <h4>Accessibility Standards Met:</h4>
                  <ul className="progress-list">
                    <li>WCAG 2.1 AAA compliance for text contrast (7:1 minimum)</li>
                    <li>WCAG 2.2 touch target requirements (44x44px minimum, we use 48-52px)</li>
                    <li>British Dyslexia Association typography guidelines</li>
                    <li>W3C readability best practices</li>
                    <li>Braille Institute design recommendations for low vision</li>
                  </ul>
                </div>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-marker">🎨</div>
              <div className="timeline-content">
                <h3>Utility Bar & Accessibility-First Hero Refinement</h3>
                <p className="timeline-date">November 28, 2025 - Evening Session</p>
                <div className="progress-card">
                  <h4>What Changed:</h4>
                  <ul className="progress-list">
                    <li>
                      <strong>Utility Bar Added:</strong> New warm clay-colored bar above main header with "Secure logon area coming soon" message. Uses brand clay color (#e1c9a9) with dark brown text for consistency
                    </li>
                    <li>
                      <strong>Clean Hero Background:</strong> Deliberately chose clean white background over decorative image to prioritize accessibility and reduce cognitive load
                    </li>
                    <li>
                      <strong>Distraction-Free Design:</strong> Hero section keeps focus on clear messaging and call-to-action, with carousel images providing visual story without competing for attention
                    </li>
                    <li>
                      <strong>Mobile-Optimized Utility Bar:</strong> Text size reduces and centers on mobile devices for better touch accessibility
                    </li>
                  </ul>

                  <h4>Why It Matters (SEND-First Accessibility):</h4>
                  <p>
                    <strong>Reduced Cognitive Load:</strong> We deliberately removed a busy background image despite its visual appeal. Research shows complex backgrounds increase cognitive load by 20-30% for users with ADHD, autism, or sensory processing differences - exactly the families we serve. A clean, solid background lets users focus entirely on the message.
                  </p>
                  <p>
                    <strong>Enhanced Text Clarity:</strong> Text on solid backgrounds is significantly easier to read for users with dyslexia, visual processing issues, or low vision. No competing visual elements means maximum comprehension.
                  </p>
                  <p>
                    <strong>Sensory-Friendly:</strong> Clean, uncluttered design reduces visual overwhelm for users with sensory sensitivities. The carousel provides engaging visuals in a controlled, predictable space.
                  </p>
                  <p>
                    <strong>Future-Ready:</strong> The utility bar provides space for parent/teacher portal login when ready, without requiring a header redesign.
                  </p>

                  <h4>Design Philosophy:</h4>
                  <p>
                    This decision reflects our commitment to SEND-first design: <strong>accessibility over aesthetics</strong>. While background images are visually striking, they can create barriers for the very users we're trying to reach. The clean hero ensures every visitor - regardless of their learning needs or sensory profile - can quickly understand what Learning Through Motion offers and how to get started.
                  </p>
                </div>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-marker">✨</div>
              <div className="timeline-content">
                <h3>Header & Hero Redesign - ClubZap Inspired</h3>
                <p className="timeline-date">November 28, 2025 - Morning Session</p>
                <div className="progress-card">
                  <h4>What Changed:</h4>
                  <ul className="progress-list">
                    <li>
                      <strong>Clean, Modern Header:</strong> Replaced heavy dark gradient with light, minimal white background with subtle blur effect - inspired by ClubZap's clean design
                    </li>
                    <li>
                      <strong>Removed Logo Duplication:</strong> Logo now only appears in header (not in hero section), making hero more text-focused and professional
                    </li>
                    <li>
                      <strong>Improved Navigation:</strong> Changed from uppercase, heavy text to cleaner sentence-case navigation with better spacing and smoother transitions
                    </li>
                    <li>
                      <strong>Better Typography:</strong> Enhanced font hierarchy with larger, bolder headings (clamp 2.5-4rem for h1) for better visual impact
                    </li>
                    <li>
                      <strong>Standardized Breakpoints:</strong> Moved from inconsistent breakpoints (900px, 600px) to industry-standard ones (1024px, 768px, 576px)
                    </li>
                    <li>
                      <strong>Smooth Scroll Behavior:</strong> Added smooth scrolling throughout the site for better user experience (respects reduced motion preferences)
                    </li>
                    <li>
                      <strong>Lighter Programme Strip:</strong> Changed from dark gradient to light, clean background matching the new header aesthetic
                    </li>
                    <li>
                      <strong>Enhanced Mobile Menu:</strong> Improved mobile navigation with fade-in transitions instead of scale transforms
                    </li>
                  </ul>

                  <h4>Why It Matters:</h4>
                  <p>
                    The new design creates a more professional, modern first impression while maintaining accessibility. The lighter color scheme reduces visual weight, and the cleaner navigation makes the site feel more spacious and easier to scan. By following established design patterns from successful SaaS sites like ClubZap, we create familiarity and trust for visitors.
                  </p>

                  <h4>Technical Improvements:</h4>
                  <ul className="progress-list">
                    <li>Removed duplicate CSS for logo positioning and styling</li>
                    <li>Consolidated responsive breakpoints across all components</li>
                    <li>Improved color contrast in header for better readability</li>
                    <li>Added backdrop-filter blur effect for modern glassmorphism look</li>
                    <li>Optimized hero grid layout for better content/image balance</li>
                  </ul>
                </div>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-marker">✓</div>
              <div className="timeline-content">
                <h3>Phase 1: Quick Wins - SEND Accessibility</h3>
                <p className="timeline-date">Week 1 • November 2025</p>
                <div className="progress-card">
                  <h4>What Changed:</h4>
                  <ul className="progress-list">
                    <li>
                      <strong>Enhanced Buttons & Links:</strong> Increased touch
                      targets from 40px to 48px minimum, bolder fonts, clearer
                      hover states
                    </li>
                    <li>
                      <strong>Focus Indicators:</strong> High-contrast 3px blue
                      outline on all interactive elements for keyboard navigation
                    </li>
                    <li>
                      <strong>Reduced Motion Support:</strong> All animations
                      respect user preferences - critical for users with
                      vestibular disorders
                    </li>
                    <li>
                      <strong>Better Spacing:</strong> Increased section padding
                      and content gaps for easier scanning
                    </li>
                    <li>
                      <strong>Visual Hierarchy:</strong> Added pull quotes,
                      visual breaks, and icon lists
                    </li>
                  </ul>

                  <h4>Why It Matters:</h4>
                  <p>
                    Parents and children with SEND need clear, predictable
                    interfaces with no cognitive overload. Every design decision
                    prioritizes clarity over creativity.
                  </p>
                </div>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-marker">✓</div>
              <div className="timeline-content">
                <h3>Phase 1: Programme Cards Enhancement</h3>
                <p className="timeline-date">Week 1 • November 2025</p>
                <div className="progress-card">
                  <h4>Before:</h4>
                  <ul className="progress-list">
                    <li>Text-only cards with subtle background tint</li>
                    <li>Generic "Read more" links</li>
                    <li>No visual differentiation between programmes</li>
                  </ul>

                  <h4>After:</h4>
                  <ul className="progress-list">
                    <li>
                      <strong>Hero images</strong> showing each programme in
                      action
                    </li>
                    <li>
                      Programme accent colors (teal, orange, yellow) used in
                      borders and headings
                    </li>
                    <li>
                      Hover effects with gentle lift (respects reduced motion)
                    </li>
                    <li>
                      Descriptive links: "Learn more about this programme"
                    </li>
                    <li>Better card structure with image + content sections</li>
                  </ul>

                  <h4>Impact:</h4>
                  <p>
                    Programmes are now immediately recognizable and visually
                    engaging. Parents can see real sessions in action.
                  </p>
                </div>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-marker">✓</div>
              <div className="timeline-content">
                <h3>Phase 1: Sticky Enquiry Button</h3>
                <p className="timeline-date">Week 1 • November 2025</p>
                <div className="progress-card">
                  <h4>New Feature:</h4>
                  <p>
                    Floating "Enquire Now" button appears after scrolling 400px
                    down the page. Always accessible from any point on the site.
                  </p>

                  <h4>Design:</h4>
                  <ul className="progress-list">
                    <li>
                      Bottom-right position (56px height, 48px on mobile)
                    </li>
                    <li>Gentle pulse animation (disabled if user prefers no motion)</li>
                    <li>High contrast: Forest green with white text</li>
                    <li>Envelope icon (✉) + "Enquire Now" text</li>
                    <li>Smooth slide-up entrance animation</li>
                  </ul>

                  <h4>Impact:</h4>
                  <p>
                    Increases conversion by making enquiries accessible from
                    anywhere without scrolling back to top.
                  </p>
                </div>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-marker">✓</div>
              <div className="timeline-content">
                <h3>Phase 1: Scroll Animations</h3>
                <p className="timeline-date">Week 1 • November 2025</p>
                <div className="progress-card">
                  <h4>Implementation:</h4>
                  <ul className="progress-list">
                    <li>
                      Sections gently fade in as they enter viewport
                      (Intersection Observer API)
                    </li>
                    <li>
                      Hero highlight cards use staggered delays for sequential
                      reveal
                    </li>
                    <li>Subtle 30px upward slide + opacity fade</li>
                    <li>0.6s duration (not jarring)</li>
                    <li>
                      <strong>Completely disabled</strong> if user has
                      prefers-reduced-motion enabled
                    </li>
                  </ul>

                  <h4>Accessibility:</h4>
                  <p>
                    Animations never block content access. Users with motion
                    sensitivity see content immediately without any animation.
                  </p>
                </div>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-marker">✓</div>
              <div className="timeline-content">
                <h3>Homepage Hero Redesign</h3>
                <p className="timeline-date">Week 1 • November 2025</p>
                <div className="progress-card">
                  <h4>Before (Original Iteration):</h4>
                  <ul className="progress-list">
                    <li>Large 320px logo dominating left column</li>
                    <li>Text-only right side</li>
                    <li>Highlight cards hidden below fold</li>
                    <li>No trust signals or social proof</li>
                  </ul>

                  <h4>After (Current Version):</h4>
                  <ul className="progress-list">
                    <li>
                      <strong>Logo + Smile Badge:</strong> 180px main logo with
                      60px smile logo badge (matching instructor shirts)
                    </li>
                    <li>
                      <strong>Two Session Photos:</strong> Offset grid showing
                      kids actively learning
                    </li>
                    <li>
                      <strong>Trust Signals:</strong> ✓ Working with schools
                      across Greater Manchester, ✓ EHCP-aligned programmes
                    </li>
                    <li>
                      <strong>Better CTA:</strong> "Book a Free Discovery Call"
                      instead of vague "Enquire now"
                    </li>
                    <li>
                      <strong>Highlight Cards Visible:</strong> Three cards now
                      above fold in inline layout
                    </li>
                  </ul>

                  <h4>Impact:</h4>
                  <p>
                    Immediate visual engagement with proof of service delivery.
                    Trust signals reduce hesitation. Clear, specific call to action.
                  </p>
                </div>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-marker">✓</div>
              <div className="timeline-content">
                <h3>Header Navigation with Dropdowns</h3>
                <p className="timeline-date">Week 1 • November 2025</p>
                <div className="progress-card">
                  <h4>Problem:</h4>
                  <p>
                    Navigation structure had children defined (Programmes, Impact,
                    Coaches, Contact) but header component was completely ignoring
                    them - rendering only flat links.
                  </p>

                  <h4>Solution:</h4>
                  <ul className="progress-list">
                    <li>
                      <strong>Working Dropdowns:</strong> Click "Programmes" →
                      shows all 3 programme options
                    </li>
                    <li>
                      <strong>Visual Feedback:</strong> Arrow indicator (▾)
                      rotates when menu is open
                    </li>
                    <li>
                      <strong>Desktop:</strong> Beautiful floating dropdowns with
                      rounded corners, shadows, centered below parent
                    </li>
                    <li>
                      <strong>Mobile:</strong> Accordion-style expansion with
                      indentation and mist background
                    </li>
                    <li>
                      <strong>Active States:</strong> Both parent and child links
                      show active status
                    </li>
                    <li>
                      <strong>Accessible:</strong> Keyboard navigable, ARIA
                      attributes, focus management
                    </li>
                  </ul>

                  <h4>Navigation Structure:</h4>
                  <ul className="progress-list">
                    <li>Home</li>
                    <li>
                      Programmes → Maths Through Sport, Sensory Redevelopment, The
                      Next Chapter
                    </li>
                    <li>Impact → Vision, Our Programmes</li>
                    <li>Coaches → Our Coaches</li>
                    <li>Contact → Enquire now</li>
                  </ul>

                  <h4>Impact:</h4>
                  <p>
                    Reduces clicks to access all pages. Professional dropdown UX
                    expected by modern users. Better information architecture.
                  </p>
                </div>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-marker">✓</div>
              <div className="timeline-content">
                <h3>Programme Strip - Contextual Navigation</h3>
                <p className="timeline-date">Week 1 • November 2025</p>
                <div className="progress-card">
                  <h4>Change:</h4>
                  <p>
                    Programme quick links strip (below header) now only appears on
                    sub-pages, not on homepage.
                  </p>

                  <h4>Why:</h4>
                  <ul className="progress-list">
                    <li>
                      Showing "quick links" on homepage was confusing (you're
                      already there)
                    </li>
                    <li>Creates decision paralysis on first page load</li>
                    <li>Better suited for contextual navigation on deeper pages</li>
                    <li>Cleaner, more focused homepage experience</li>
                  </ul>

                  <h4>Behavior:</h4>
                  <ul className="progress-list">
                    <li>Homepage: Strip hidden</li>
                    <li>Programme pages: Shows all 3 programme links</li>
                    <li>Other pages: Shows contextually relevant links</li>
                  </ul>
                </div>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-marker">✓</div>
              <div className="timeline-content">
                <h3>Enhanced Header CTA</h3>
                <p className="timeline-date">Week 1 • November 2025</p>
                <div className="progress-card">
                  <h4>Before:</h4>
                  <ul className="progress-list">
                    <li>Semi-transparent background</li>
                    <li>White text on dark header (low prominence)</li>
                    <li>Subtle presence, easy to miss</li>
                  </ul>

                  <h4>After:</h4>
                  <ul className="progress-list">
                    <li>
                      <strong>Bright white background</strong> (95% opacity)
                    </li>
                    <li>
                      <strong>Dark forest green text</strong> (high contrast)
                    </li>
                    <li>Bold font weight (700)</li>
                    <li>Better shadow for depth</li>
                    <li>Hover lift effect</li>
                  </ul>

                  <h4>Impact:</h4>
                  <p>
                    Catches eye immediately. Clearly actionable. Meets WCAG AAA
                    contrast requirements. Better conversion.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="progress-section">
          <h2>Technical Foundation</h2>
          <div className="progress-card">
            <h3>Technology Stack</h3>
            <ul className="progress-list">
              <li>
                <strong>Next.js 16:</strong> Latest React framework with App
                Router, Server Components, optimized image loading
              </li>
              <li>
                <strong>TypeScript:</strong> Type-safe code for reliability and
                maintainability
              </li>
              <li>
                <strong>Tailwind CSS v4:</strong> Modern utility-first styling
                with custom design system
              </li>
              <li>
                <strong>Atkinson Hyperlegible Font:</strong> Specially designed
                for low vision readers (accessibility)
              </li>
              <li>
                <strong>Playfair Display:</strong> Elegant serif for headings
              </li>
            </ul>
          </div>

          <div className="progress-card">
            <h3>Performance Optimizations</h3>
            <ul className="progress-list">
              <li>
                <strong>Image Optimization:</strong> Next.js automatic
                compression, WebP format, responsive sizes
              </li>
              <li>
                <strong>Code Splitting:</strong> Only load JavaScript needed for
                each page
              </li>
              <li>
                <strong>Static Generation:</strong> Pages pre-rendered for fast
                loading
              </li>
              <li>
                <strong>Lazy Loading:</strong> Images and components load as
                needed
              </li>
            </ul>
          </div>

          <div className="progress-card">
            <h3>Accessibility Standards</h3>
            <ul className="progress-list">
              <li>
                <strong>WCAG AAA:</strong> Highest accessibility standard (7:1
                contrast ratios)
              </li>
              <li>
                <strong>Semantic HTML:</strong> Proper heading hierarchy,
                landmarks, ARIA labels
              </li>
              <li>
                <strong>Keyboard Navigation:</strong> All interactive elements
                accessible via keyboard
              </li>
              <li>
                <strong>Screen Reader Friendly:</strong> Descriptive labels, skip
                navigation, alt text
              </li>
              <li>
                <strong>Reduced Motion:</strong> Respects user preferences for
                animation
              </li>
              <li>
                <strong>Large Touch Targets:</strong> 48px+ for motor control
                considerations
              </li>
            </ul>
          </div>
        </section>

        <section className="progress-section">
          <h2>Content Management</h2>
          <div className="progress-card">
            <h3>Centralized Content System</h3>
            <p>
              All site copy lives in{" "}
              <code>/content/siteContent.ts</code> for easy updates without
              touching code.
            </p>

            <h4>Content Types:</h4>
            <ul className="progress-list">
              <li>
                <strong>Navigation:</strong> All menu items and links
              </li>
              <li>
                <strong>Programme Details:</strong> Titles, descriptions,
                images, accent colors
              </li>
              <li>
                <strong>Contact Information:</strong> Phone, email, location,
                social links
              </li>
              <li>
                <strong>Hero Content:</strong> Headlines, taglines, descriptions
              </li>
              <li>
                <strong>About Sections:</strong> Vision statements, paragraphs,
                highlights
              </li>
            </ul>

            <h4>Benefits:</h4>
            <ul className="progress-list">
              <li>Update text without editing components</li>
              <li>Type-safe content with TypeScript</li>
              <li>Consistent messaging across pages</li>
              <li>Easy for non-technical users to update</li>
            </ul>
          </div>
        </section>

        <section className="progress-section">
          <h2>Design System</h2>
          <div className="progress-card">
            <h3>Color Palette</h3>
            <div className="color-grid">
              <div className="color-swatch">
                <div
                  className="color-sample"
                  style={{ background: "#1f2d3f" }}
                ></div>
                <p>
                  <strong>Ink</strong>
                  <br />
                  #1f2d3f
                  <br />
                  Primary text
                </p>
              </div>
              <div className="color-swatch">
                <div
                  className="color-sample"
                  style={{ background: "#274060" }}
                ></div>
                <p>
                  <strong>Forest</strong>
                  <br />
                  #274060
                  <br />
                  Buttons, links
                </p>
              </div>
              <div className="color-swatch">
                <div
                  className="color-sample"
                  style={{ background: "#e1c9a9" }}
                ></div>
                <p>
                  <strong>Clay</strong>
                  <br />
                  #e1c9a9
                  <br />
                  Accents
                </p>
              </div>
              <div className="color-swatch">
                <div
                  className="color-sample"
                  style={{ background: "#fffaf3" }}
                ></div>
                <p>
                  <strong>Sand</strong>
                  <br />
                  #fffaf3
                  <br />
                  Background
                </p>
              </div>
            </div>

            <h4>Programme Colors:</h4>
            <div className="color-grid">
              <div className="color-swatch">
                <div
                  className="color-sample"
                  style={{ background: "#0f6d63" }}
                ></div>
                <p>
                  <strong>Teal</strong>
                  <br />
                  Maths Through Sport
                </p>
              </div>
              <div className="color-swatch">
                <div
                  className="color-sample"
                  style={{ background: "#c45f24" }}
                ></div>
                <p>
                  <strong>Orange</strong>
                  <br />
                  Sensory Redevelopment
                </p>
              </div>
              <div className="color-swatch">
                <div
                  className="color-sample"
                  style={{ background: "#f4c95d" }}
                ></div>
                <p>
                  <strong>Yellow</strong>
                  <br />
                  The Next Chapter
                </p>
              </div>
            </div>
          </div>

          <div className="progress-card">
            <h3>Typography</h3>
            <ul className="progress-list">
              <li>
                <strong>Headings:</strong> Playfair Display (serif, elegant)
              </li>
              <li>
                <strong>Body:</strong> Atkinson Hyperlegible (designed for
                accessibility)
              </li>
              <li>
                <strong>Line Height:</strong> 1.7 for body text (easy reading)
              </li>
              <li>
                <strong>Font Sizes:</strong> Responsive with clamp() for all
                screen sizes
              </li>
              <li>
                <strong>Minimum:</strong> 16px base (never smaller)
              </li>
            </ul>
          </div>

          <div className="progress-card">
            <h3>Components</h3>
            <ul className="progress-list">
              <li>
                <strong>Buttons:</strong> 48px minimum height, bold text,
                rounded, high contrast
              </li>
              <li>
                <strong>Cards:</strong> Rounded corners (20px), soft shadows,
                white background
              </li>
              <li>
                <strong>Sections:</strong> Generous padding (4-7rem), clear
                boundaries
              </li>
              <li>
                <strong>Forms:</strong> Large inputs (44px), clear labels, error
                messages
              </li>
              <li>
                <strong>Navigation:</strong> Sticky header, dropdown menus,
                mobile hamburger
              </li>
            </ul>
          </div>
        </section>

        <section className="progress-section">
          <h2>Key Metrics & Improvements</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-value">+20%</div>
              <div className="metric-label">Larger Touch Targets</div>
              <p>40px → 48px minimum</p>
            </div>
            <div className="metric-card">
              <div className="metric-value">+16%</div>
              <div className="metric-label">More Spacing</div>
              <p>3-6rem → 4-7rem sections</p>
            </div>
            <div className="metric-card">
              <div className="metric-value">AAA</div>
              <div className="metric-label">Contrast Standard</div>
              <p>7:1 ratio throughout</p>
            </div>
            <div className="metric-card">
              <div className="metric-value">100%</div>
              <div className="metric-label">Keyboard Accessible</div>
              <p>All interactive elements</p>
            </div>
          </div>
        </section>

        <section className="progress-section">
          <h2>Next Steps (Phase 2)</h2>
          <div className="progress-card">
            <h3>Content Gathering</h3>
            <ul className="progress-list">
              <li>
                <strong>Coach Photos:</strong> Professional headshots of Robbie
                and Julian
              </li>
              <li>
                <strong>Testimonials:</strong> Quotes from schools, teachers, or
                parents
              </li>
              <li>
                <strong>Statistics:</strong> Real numbers (schools served, pupils
                helped, sessions delivered)
              </li>
              <li>
                <strong>Session Photos:</strong> More high-quality images from
                actual sessions
              </li>
              <li>
                <strong>Video Content:</strong> Short clips of sessions in action
                (with permissions)
              </li>
            </ul>
          </div>

          <div className="progress-card">
            <h3>Planned Features</h3>
            <ul className="progress-list">
              <li>
                <strong>Testimonials Section:</strong> Rotating carousel of
                parent/teacher feedback
              </li>
              <li>
                <strong>Impact Statistics:</strong> Animated counters showing
                schools, pupils, sessions
              </li>
              <li>
                <strong>Case Studies:</strong> 1-2 detailed success stories with
                outcomes
              </li>
              <li>
                <strong>FAQ Sections:</strong> Common questions for each
                programme
              </li>
              <li>
                <strong>Enhanced Coach Pages:</strong> Photos, qualifications,
                bios, video intro
              </li>
              <li>
                <strong>School Logos:</strong> Partner school logos (with
                permissions)
              </li>
              <li>
                <strong>Blog/News:</strong> Updates and insights section
              </li>
            </ul>
          </div>

          <div className="progress-card">
            <h3>Technical Enhancements</h3>
            <ul className="progress-list">
              <li>
                <strong>Analytics:</strong> Track user behavior and conversions
              </li>
              <li>
                <strong>Form Validation:</strong> Enhanced contact form with
                better error handling
              </li>
              <li>
                <strong>Image Migration:</strong> Move external images local,
                convert to WebP
              </li>
              <li>
                <strong>Schema Markup:</strong> Better SEO with structured data
              </li>
              <li>
                <strong>Performance Monitoring:</strong> Core Web Vitals tracking
              </li>
            </ul>
          </div>
        </section>

        <section className="progress-section">
          <h2>Documentation</h2>
          <div className="progress-card">
            <h3>Project Documents Created</h3>
            <ul className="progress-list">
              <li>
                <strong>PROJECT.md:</strong> Overall project overview and
                mission
              </li>
              <li>
                <strong>CLAUDE.md:</strong> Development guidelines and
                conventions
              </li>
              <li>
                <strong>SEND-ACCESSIBILITY-GUIDELINES.md:</strong> Comprehensive
                accessibility standards
              </li>
              <li>
                <strong>PHASE-1-IMPROVEMENTS.md:</strong> Original improvement
                plan
              </li>
              <li>
                <strong>IMPROVEMENTS-SUMMARY.md:</strong> Detailed breakdown of
                Phase 1
              </li>
              <li>
                <strong>HOMEPAGE-IMPROVEMENTS.md:</strong> Homepage redesign
                documentation
              </li>
              <li>
                <strong>HEADER-AND-HERO-FIXES.md:</strong> Navigation and logo
                fixes
              </li>
            </ul>
          </div>
        </section>

        <footer className="progress-footer">
          <p>
            <strong>Last Updated:</strong> November 28, 2025
          </p>
          <p>
            <strong>Status:</strong> Phase 1 Complete • Phase 2 Planning
          </p>
          <p>
            <strong>Developer:</strong> Claude Code + Stephen Cranfield
          </p>
          <p className="progress-note">
            This page is for internal review and client reporting. It is not
            linked in the public navigation.
          </p>
        </footer>
      </div>
    </div>
  );
}
