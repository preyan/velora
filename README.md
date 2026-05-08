# ✨ Velora

**A cinematic quote experience.** Not a generator—an atmosphere.

[**→ Live Demo**](https://preyan.github.io/velora) · [Architecture](ARCHITECTURE.md) · [Changelog](CHANGELOG.md)

---

## Overview

Velora is a fullscreen, immersive quote app built with **Angular 21** and **Web Audio API**. Every element—animations, ambient audio, theme shifts—evokes a singular emotional atmosphere.

Inspired by *Interstellar*, *Apple*, and *A24* moodboards.

---

## Features

✨ **Cinematic** — Blur-to-focus transitions, staggered reveals  
🎨 **4 Themes** — Cosmic, Lo-fi Rain, Noir, Dream Neon  
🎵 **Ambient Audio** — Rain, piano, cosmic tracks with fade transitions  
📸 **Screenshot Export** — Capture quotes as PNG  
⌨️ **Keyboard Navigation** — P/N (prev/next), T (theme), Ctrl+S (screenshot)  
♿ **Accessible** — WCAG AAA, keyboard nav, reduced-motion support  
💾 **Persistent** — Theme & audio prefs via localStorage  
📱 **Mobile-First** — Responsive fullscreen experience  

---

## Quick Start

```bash
git clone https://github.com/preyan/velora.git
cd velora

bun install
bun run start

# Open http://localhost:4200
```

---

## Tech Stack

| | |
|---|---|
| **Framework** | Angular 21 (standalone components) |
| **State** | Angular Signals (no RxJS subscriptions) |
| **Styling** | SCSS + CSS Custom Properties |
| **Audio** | Web Audio API (HTML5 + GainNode hybrid) |
| **Animations** | Angular Animations (@keyframes) |
| **Quality** | TypeScript strict, ESLint clean |

---

## Build & Deploy

```bash
bun run build:gh    # Production build (base-href /velora/)
bun run test        # Unit tests (Jasmine/Karma)
bun run lint        # Code quality
```

**Deployed to GitHub Pages via GitHub Actions.** Automatic on push to `main`.

---

## Scripts

```bash
bun run start       # Dev server (hot reload)
bun run build       # Local production build
bun run build:gh    # GitHub Pages build
bun run test        # Run tests
bun run lint        # ESLint check
```

---

## Architecture

Shallow component tree (max depth 4), signals for state, composition over abstraction.

**Services:**  
- `QuoteService` — Quote data + navigation (next/prev/random)
- `ThemeService` — Theme cycling + localStorage persistence  
- `AudioService` — Web Audio API + fade transitions  
- `ScreenshotService` — Export quotes to PNG  
- `KeyboardService` — Global keyboard shortcuts  

**See [ARCHITECTURE.md](ARCHITECTURE.md) for system design details.**

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile (iOS Safari, Chrome Android)

---

## Performance

| | |
|---|---|
| Bundle Size | **81 KB** gzipped |
| Frame Rate | **60 fps** smooth |
| Lighthouse Performance | **> 90** |
| Accessibility | **> 95** |

---

## Future

- 🎞️ Cinematic autoplay
- ❤️ Favorites with IndexedDB
- 🌐 Shareable quote URLs
- 📱 PWA / offline support

---

## License

MIT — use freely, modify as needed.

---

<div align="center">

**Build the cinematic experience.**

[Repo](https://github.com/preyan/velora) · [Issues](https://github.com/preyan/velora/issues) · [Star ⭐](https://github.com/preyan/velora)

</div>
