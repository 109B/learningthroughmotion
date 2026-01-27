# Full Changelog

Day-by-day timeline of all work completed on the Learning Through Motion website.

---

## Timeline Summary

| Date | Commits | Highlights |
|------|---------|------------|
| Nov 26, 2025 | 4 | Project setup, TypeScript config |
| Nov 28, 2025 | 1 | **Major:** Complete homepage redesign |
| Nov 29, 2025 | 2 | Progress page, minor fixes |
| Dec 1, 2025 | 2 | Enquire/Vision pages |
| Dec 2, 2025 | 7 | **Major:** Games, testimonials, accessibility |
| Dec 3, 2025 | 4 | Booking exploration, cleanup |
| Dec 4, 2025 | 1 | Image fixes |
| Dec 11, 2025 | 2 | **Major:** Programme pages revamp |
| Dec 12, 2025 | 1 | Carousel enhancements |

**Total Commits:** 24

---

## December 12, 2025

### `4a0ed3c` - Carousel & Testimonials Enhancement

**Changes:**

- Enhanced carousel with dynamic image loading from `/public/images/carousel/`
- Updated testimonials section with new quotes
- Improved image context labels

**Files Changed:** 28
**Lines:** +129 / -60

---

## December 11, 2025

### `f27155f` - Code Refactoring

**Changes:**

- Restructured files for improved readability
- Reorganized component imports

**Files Changed:** 6

---

### `dced347` - Programme Pages Revamp

**Changes:**

- Complete overhaul of Sensory Redevelopment page
- Complete overhaul of The Next Chapter page
- Added structured content format with sections and subsections
- Added session details (duration, group size, location)
- Added pricing information with transparency
- Added trial information and CTAs

**Files Changed:** 8
**Lines:** +713 / -100

**Impact:** Major improvement to programme information architecture

---

## December 4, 2025

### `bc4bc3c` - Images Fix

**Changes:**

- Fixed image path issues
- Updated image references

**Files Changed:** 1
**Lines:** +23 / -13

---

## December 3, 2025

### `9f70444` - Backend Cleanup

**Changes:**

- Removed booking queries
- Removed children queries
- Removed user queries
- Cleaned up associated types and utilities

**Files Changed:** 11
**Lines:** +20 / -1,935

**Reason:** Simplified to static site approach

---

### `39df8a2` - API Routes Removal

**Changes:**

- Removed deprecated authentication routes
- Removed booking API routes
- Removed children profile routes

**Files Changed:** 7
**Lines:** -806

---

### `2c00507` - SessionBlockCard Cleanup

**Changes:**

- Simplified date formatting functions
- Simplified price formatting functions

**Files Changed:** 1
**Lines:** +16 / -4

---

### `4e2ecda` - Profile Management (Exploration)

**Changes:**

- Added user profile management queries
- Added child profile management queries

**Files Changed:** 38
**Lines:** +7,416 / -52

**Note:** This was exploratory work later removed in subsequent cleanup commits

---

## December 2, 2025

### `dd676d4` - Code Structure Refactoring

**Changes:**

- Major code restructuring
- Removed unused components
- Improved file organization

**Files Changed:** 14
**Lines:** +70 / -2,297

---

### `96f2b7b` - Interactive Educational Games

**Changes:**

- Added Memory Card Game (3 difficulty levels)
- Added Jigsaw Puzzle Game (drag-and-drop)
- Added Word Search Game (sports vocabulary)
- Added Number Match Game (quantity matching)
- Created Activities hub page
- Individual game pages with navigation

**Files Changed:** 13
**Lines:** +2,502 / -109

**Impact:** Major feature addition for SEND learners

---

### `7a525a3` - Accessibility Overhaul

**Changes:**

- Updated color palette for WCAG AAA compliance
- Achieved 15.8:1 contrast ratio
- Improved visual consistency
- Enhanced focus states

**Files Changed:** 1
**Lines:** +54 / -34

---

### `af76dbe` - Testimonials UX Enhancement

**Changes:**

- Added body overflow management when modal open
- Improved user experience with scroll lock

**Files Changed:** 2
**Lines:** +103 / -8

---

### `ffd0b83` - Testimonials Modal

**Changes:**

- Added modal for expanded testimonials
- Click to open full testimonial
- Portal rendering for z-index safety
- Escape key and click-outside to close

**Files Changed:** 2
**Lines:** +123 / -6

---

### `e4c1599` - Header & Vision Improvements

**Changes:**

- Enhanced header behavior (sticky, hover states)
- Improved layout responsiveness
- Updated Our Vision page content structure

**Files Changed:** 3
**Lines:** +144 / -58

---

## December 1, 2025

### `5da4899` - Enquire & Vision Pages

**Changes:**

- Enhanced Enquire Now page layout
- Added sidebar with contact details
- Improved ContactForm functionality
- Enhanced Our Vision page content

**Files Changed:** 6
**Lines:** +709 / -139

---

### `98432c9` - Anti-Gravity Changes

**Changes:**

- Various layout and styling updates
- Component refinements

**Files Changed:** 25
**Lines:** +646 / -266

---

## November 29, 2025

### `359ff44` - Progress Page

**Changes:**

- Created internal progress/changelog page
- Added timeline of changes
- Marked as noindex for internal use

**Files Changed:** 1
**Lines:** +127 / -2

---

### `124151c` - Minor Changes

**Changes:**

- Small fixes and adjustments

**Files Changed:** 2
**Lines:** +6 / -2

---

## November 28, 2025

### `0987519` - Complete Homepage Redesign

**Changes:**

- Full homepage rebuild with SEND-first accessibility
- Hero section with carousel
- Vision statement section
- Programme cards grid
- Testimonials section
- Multiple CTA blocks
- Sticky enquiry button
- Skip navigation

**Files Changed:** 46
**Lines:** +5,789 / -207

**Impact:** Foundation of the new site design

---

## November 26, 2025

### `2b65bda` - TypeScript Configuration

**Changes:**

- Added tsconfig.json with strict settings
- Configured module resolution
- Set up path aliases

**Files Changed:** 42
**Lines:** +16,089

---

### `80f548f` - Initial Cleanup

**Changes:**

- Removed README.md
- Added .DS_Store to gitignore

**Files Changed:** 2
**Lines:** -3

---

### `87393ff`, `29990b4`, `ad769dc` - First Commits

**Changes:**

- Initial repository setup
- Project scaffolding

**Files Changed:** 3
**Lines:** +3

---

## Statistics Summary

### Total Code Changes

| Metric | Value |
|--------|-------|
| Total Commits | 24 |
| Total Insertions | ~35,000 |
| Total Deletions | ~6,000 |
| Net Lines Added | ~29,000 |
| Final Codebase | ~9,700 lines |

### Feature Timeline

```
Nov 26  ████ Project Setup
Nov 28  ████████████████ Homepage (Major)
Nov 29  ██ Progress Page
Dec 1   ████████ Enquire/Vision
Dec 2   ████████████████████ Games/Accessibility (Major)
Dec 3   ████████ Cleanup
Dec 4   █ Image Fixes
Dec 11  ████████████ Programme Pages (Major)
Dec 12  ██ Carousel Polish
```

### Key Milestones

1. **Nov 26** - Project inception
2. **Nov 28** - Core site structure complete
3. **Dec 2** - Interactive games added
4. **Dec 2** - WCAG AAA accessibility achieved
5. **Dec 11** - Programme pages finalized
6. **Dec 12** - Final polish
