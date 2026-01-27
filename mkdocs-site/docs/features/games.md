# Interactive Games

Four educational games designed specifically for SEND learners, accessible from the Activities hub.

---

## Activities Hub

**Route:** `/activities`

Gateway page linking to all four games with visual cards and descriptions.

---

## Memory Card Game

**Route:** `/activities/memory-cards`
**Component:** `components/games/MemoryCardGame.tsx`

### Features

- **3 difficulty levels:**
    - Easy: 3 pairs (6 cards)
    - Medium: 4 pairs (8 cards)
    - Hard: 6 pairs (12 cards)
- **Move counter** tracks attempts
- **Card flip animation** for feedback
- **Completion detection** with congratulations
- **Fisher-Yates shuffle** for randomization

### Implementation

```typescript
"use client"

interface Card {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

// Game logic handles:
// - Card flipping
// - Match checking
// - Game state management
// - Win condition detection
```

### Accessibility

- Large touch targets
- Clear visual feedback
- Keyboard navigation support
- Screen reader friendly

---

## Jigsaw Puzzle

**Route:** `/activities/jigsaw`
**Component:** `components/games/JigsawGame.tsx`

### Features

- **Multiple puzzle images** to choose from
- **Drag-and-drop** pieces using @dnd-kit
- **Snap-to-grid** placement
- **Visual feedback** when piece placed correctly
- **Completion celebration**

### Implementation

```typescript
"use client"

import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core'

// Pieces can be dragged to target positions
// Correct placement triggers visual feedback
// All pieces placed = puzzle complete
```

### Technology

Uses `@dnd-kit` library for accessible drag-and-drop:

- Keyboard dragging support
- Screen reader announcements
- Touch and mouse support

---

## Word Search

**Route:** `/activities/word-search`
**Component:** `components/games/WordSearchGame.tsx`

### Features

- **10x10 letter grid**
- **Sports-themed vocabulary:**
    - BALL, GOAL, TEAM, SPORT
    - RUN, JUMP, KICK, CATCH
    - WIN, PLAY
- **Word directions:**
    - Horizontal (left to right)
    - Vertical (top to bottom)
    - Diagonal
- **Click-and-drag selection**
- **Found words highlighted**
- **Word list** showing progress

### Implementation

```typescript
"use client"

// Grid generation with word placement
const grid = generateGrid(words)

// Selection handling
const handleSelection = (start: Cell, end: Cell) => {
  const selectedWord = extractWord(start, end)
  if (words.includes(selectedWord)) {
    markAsFound(selectedWord)
  }
}
```

---

## Number Match

**Route:** `/activities/number-match`
**Component:** `components/games/NumberMatchGame.tsx`

### Features

- **Quantity-to-numeral matching**
- **Visual counting objects** (balls, stars, etc.)
- **Progressive difficulty**
- **Immediate feedback** on selection
- **Celebration on completion**

### Implementation

```typescript
"use client"

interface MatchItem {
  quantity: number
  display: ReactNode // Visual representation
  numeral: string
}

// Match quantities (shown as objects) to numerals
// Visual and audio feedback on correct matches
```

### SEND-Specific Design

- Large, clear visuals
- Simple one-click interactions
- Positive reinforcement
- No time pressure

---

## Common Game Features

### Client Components

All games use `"use client"` directive because they require:

- useState for game state
- useEffect for game logic
- Event handlers for interactions
- DOM manipulation for animations

### Shared Patterns

```typescript
// Shuffle algorithm (Fisher-Yates)
const shuffle = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Completion detection
const checkComplete = () => {
  if (allItemsMatched) {
    setGameState('complete')
    showCelebration()
  }
}
```

### Accessibility Features

| Feature | Implementation |
|---------|----------------|
| Keyboard navigation | Arrow keys, Enter to select |
| Focus management | Clear focus indicators |
| Screen readers | ARIA labels and live regions |
| Reduced motion | Respects user preference |
| Touch support | Large tap targets |

---

## Future Enhancements

Potential additions:

- **Leaderboards** - Track high scores
- **Progress saving** - Resume games
- **More difficulty levels** - Adaptive challenge
- **Sound effects** - Audio feedback (toggleable)
- **Additional games** - Matching, sorting, counting
