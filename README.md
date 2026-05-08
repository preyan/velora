# Velora — Cinematic Interactive Quote Machine

> A cinematic, atmospheric quote experience built entirely with Angular.

Velora is a fullscreen, immersive quote application that feels like an interactive film experience. Not a traditional quote generator — every interaction is designed to be minimal, intentional, and emotionally engaging.

**Inspiration:** Interstellar, Apple-level polish, A24 moodboards, ambient storytelling.

**Goal:** "A playable emotional atmosphere."

---

## Features

### Current (MVP)
- ✅ **Quote Engine** — Random quotes with next/previous navigation
- ✅ **Cinematic Animations** — Blur-to-focus text, staggered author reveal (600ms delay)
- ✅ **4 Themes** — Cosmic (default), Lo-fi Rain, Noir, Dream Neon with animated gradients
- ✅ **Ambient Audio** — Rain, piano, and cosmic tracks with mute/unmute toggle
- ✅ **Persistent State** — Theme and audio preferences saved to localStorage
- ✅ **Responsive Design** — Mobile-first, fullscreen layout
- ✅ **Accessibility** — Keyboard navigation, aria labels, reduced-motion support

### Roadmap (Phase 4–5)
- Screenshot export via html2canvas
- Fullscreen mode
- Cinematic autoplay
- Keyboard shortcuts
- Favorites / saved quotes
- PWA support
- Shareable quote URLs

---

## Development Setup

### Requirements
- **Node.js** 18+ with bun package manager
- **bun** 1.3+ (faster than npm/pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/preyan/velora.git
cd velora

# Install dependencies with bun
bun install

# Start the dev server
bun run start
```

Open http://localhost:4200/ in your browser.

### Available Scripts

```bash
bun run start        # Development server (hot reload)
bun run build        # Production build
bun run build:gh     # Build for GitHub Pages (--base-href /velora/)
bun run lint         # ESLint code quality check
bun run test         # Run unit tests
```

---

## Architecture

### Technology Stack
- **Framework:** Angular 21 (standalone components, signals)
- **Styling:** SCSS with CSS custom properties (theme tokens)
- **Animations:** Angular Animations + CSS keyframes
- **Audio:** Web Audio API (GainNode) + HTML5 Audio
- **Package Manager:** bun
- **Linting:** ESLint + @angular-eslint

### Project Structure

```
src/
  app/
    app.ts                           # Root component
    app.config.ts                    # Angular config (providers)
    features/
      quote-machine/
        components/
          quote-machine/             # Layout shell
          quote-display/             # Quote + author display
          quote-text/                # Text animation
          quote-author/              # Author animation
          background/                # Animated gradient layer
          controls/                  # Master controls container
          theme-switcher/            # Theme cycle button
          audio-control/             # Audio player + track selector
        services/
          quote.service.ts           # Quote engine (Signals)
          theme.service.ts           # Theme management
          audio.service.ts           # Audio engine (Web Audio API)
        animations/
          quote.animations.ts        # Animation triggers
        models/
          quote.model.ts             # Quote interface + ThemeName type
        data/
          (quotes live in assets/data/quotes.json)
  styles/
    _variables.scss                  # Theme tokens (CSS custom props)
    _reset.scss                      # Minimal CSS reset
    _typography.scss                 # Font imports + type scale
  assets/
    data/
      quotes.json                    # Quote source
    audio/
      rain.mp3, piano.mp3, cosmic.mp3
```

### Core Services

#### QuoteService
- Loads quotes from `assets/data/quotes.json` via HttpClient
- Signal-based state: `quotes`, `currentIndex`, `currentQuote` (computed)
- Methods: `next()`, `previous()`, `random()`, `goTo(index)`

#### ThemeService
- Manages current theme in a signal
- Persists to localStorage, syncs `data-theme` attribute to `<html>`
- Cycles through: cosmic → lofi-rain → noir → dream-neon

#### AudioService
- Hybrid Web Audio API + HTML5 Audio approach
- Defers initialization to first user gesture (autoplay policy)
- Fade in/out via `GainNode.gain.linearRampToValueAtTime()`
- Methods: `play()`, `stop()`, `toggleMute()`, `switchTrack()`

### Animation Architecture

**Quote Transitions (Angular Animations):**
- Old quote: fade out (300ms) + blur (0 → 8px)
- New quote: fade in (400ms, starts at 350ms) + blur (8px → 0)
- Author: fade up (300ms, starts at 600ms) + translateY (8px → 0)

**Background (CSS Keyframes):**
- Continuous gradient drift (20s loop) per theme
- Overlay shadow for contrast

**Reduced Motion:**
All animations disable under `prefers-reduced-motion: reduce` media query.

### Theme System

CSS custom properties on `:root[data-theme="..."]`:
- Colors: `--color-bg-primary`, `--color-text-primary`, `--color-accent`
- Gradients: `--gradient-start`, `--gradient-mid`, `--gradient-end`
- Typography: `--font-size-quote`, `--font-size-author` (fluid with `clamp()`)

Each theme is purely CSS—no JavaScript on theme switch.

---

## Deployment

### GitHub Pages (Automated)

The repo is configured for automatic deployment to GitHub Pages. Every push to `main` triggers GitHub Actions CI/CD:

1. Install dependencies
2. Run linter (`bun run lint`)
3. Build for production (`bun run build:gh`)
4. Deploy to https://github.com/preyan/velora → Pages

**Base href:** `/velora/` (set in `build:gh` script)

**To deploy manually:**
```bash
bun run build:gh
# Output: dist/velora/browser/
# Push to GitHub Pages or upload to any static host
```

### Requirements Before Deploy
- ✅ Linter passes (zero warnings)
- ✅ Production build succeeds
- ✅ Bundle size under 370KB
- ✅ No `any` TypeScript types
- ✅ All tests pass (Phase 5)

---

## Performance Targets

- **Lighthouse Performance:** > 90
- **Lighthouse Accessibility:** > 95
- **Bundle Size:** 80.87 KB gzipped (current)
- **Target Frame Rate:** 60fps (animations)
- **Time to Interactive:** < 2s

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

AudioContext requires these browsers for audio playback.

---

## Contribution Guidelines

### Before Committing
1. Run `bun run lint` — zero errors/warnings
2. Run `bun run test` — all tests pass
3. Run `bun run build` — production build succeeds
4. Keep commits focused and atomic

### Commit Message Format
```
feat: add cinematic quote transitions
fix: resolve audio autoplay policy issue
refactor: simplify animation orchestration
docs: update architecture guide
```

### Code Standards
- **No `any` types** — use strict TypeScript
- **Standalone components** — no NgModule
- **Signals** for state (no BehaviorSubject)
- **Comment only the WHY** — code should be self-documenting
- **Reuse existing patterns** — avoid abstraction until needed

---

## Phase Roadmap

| Phase | Status | Features |
|-------|--------|----------|
| 1 | ✅ Complete | Angular scaffold, QuoteService, ThemeService, base layout |
| 2 | ✅ Complete | Angular Animations, blur-to-focus, gradient backgrounds |
| 3 | ✅ Complete | AudioService, theme switcher, audio controls, localStorage |
| 4 | ⏳ Next | Screenshot export, polish, performance optimization, Lighthouse > 90 |
| 5 | ⏳ Later | Testing, documentation, GitHub Actions setup, live deploy |

---

## Quick Start for Developers

```bash
# Clone
git clone https://github.com/preyan/velora.git

# Install
bun install

# Dev server (with hot reload)
bun run start

# Open http://localhost:4200/
```

The app runs in-memory. No backend required.

---

## License

This project is open source under the MIT License.

---

## Contact

**Author:** Preyan Bhowmick  
**Email:** preyan1997@gmail.com  
**GitHub:** [@preyan](https://github.com/preyan)

---

**Build the cinematic experience.**
