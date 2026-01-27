# Learning Through Motion - Project Documentation

MkDocs documentation site for the Learning Through Motion website rebuild project.

## Password Protection

This documentation is password protected. Contact the development team for access credentials.

## Quick Start

### Prerequisites

- Python 3.8+
- pip

### Installation

```bash
cd mkdocs-site
pip install -r requirements.txt
```

### Development Server

```bash
mkdocs serve
```

Visit http://localhost:8000 to view the documentation.

### Build Static Site

```bash
mkdocs build
```

Output will be in the `site/` directory.

## Documentation Structure

```
docs/
├── index.md                 # Home page
├── overview/
│   ├── summary.md           # Executive summary
│   ├── time-estimate.md     # Time & effort breakdown
│   └── tech-stack.md        # Technology stack
├── features/
│   ├── index.md             # All features list
│   ├── homepage.md          # Homepage documentation
│   ├── programmes.md        # Programme pages
│   ├── games.md             # Interactive games
│   ├── accessibility.md     # Accessibility features
│   └── components.md        # Component reference
├── technical/
│   ├── architecture.md      # System architecture
│   ├── content.md           # Content management
│   └── styling.md           # CSS/styling system
└── changelog/
    └── index.md             # Full commit history
```

## Key Metrics

| Metric | Value |
|--------|-------|
| Project Duration | 17 days |
| Total Commits | 24 |
| Lines of Code | ~9,700 |
| Estimated Hours | 82 |
| Pages Built | 13 |
| Components | 20+ |

## Deployment

The documentation can be deployed to:

- GitHub Pages (`mkdocs gh-deploy`)
- Netlify (build command: `mkdocs build`)
- Any static hosting

## Theme

Using [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) with:

- Teal primary color (matching LTM brand)
- Orange accent
- Navigation sections
- Code copy buttons
- Search functionality
