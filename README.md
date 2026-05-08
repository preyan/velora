# ✨ Velora

> A cinematic quote experience. Not a generator.

**Velora** is a fullscreen, atmospheric quote app that feels like an interactive film. Every element—from animations to ambient audio—is designed to evoke emotion and intention.

Inspired by **Interstellar**, **Apple** design, and **A24** moodboards.

---

## 🎯 Vision

**Goal:** "A playable emotional atmosphere"

The app should feel:
- Atmospheric
- Immersive
- Minimal
- Cinematic
- Intentional

---

## ✨ Features

### Current
- 🎬 **Cinematic Animations** — Blur-to-focus text, staggered author reveal
- 🎨 **4 Themes** — Cosmic, Lo-fi Rain, Noir, Dream Neon (animated gradients)
- 🎵 **Ambient Audio** — Rain, piano, cosmic tracks with smooth fading
- ⌨️ **Accessible** — Keyboard nav, ARIA labels, reduced-motion support
- 💾 **Persistent** — Theme & audio preferences saved to localStorage
- 📱 **Responsive** — Mobile-first, fullscreen experience

### Roadmap
- 📸 Screenshot export
- ⚡ Keyboard shortcuts
- 🎞️ Cinematic autoplay
- ❤️ Save favorites
- 🌐 Shareable URLs
- 📱 PWA support

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/preyan/velora.git
cd velora

# Install (with bun—faster than npm)
bun install

# Dev server
bun run start

# Open http://localhost:4200/
```

---

## 🏗️ Tech Stack

| Layer | Tech |
|-------|------|
| **Framework** | Angular 21 (standalone components, signals) |
| **Styling** | SCSS + CSS custom properties (theme tokens) |
| **Animations** | Angular Animations + CSS keyframes |
| **Audio** | Web Audio API + HTML5 Audio |
| **State** | Angular Signals (no Redux/NgRx) |
| **Quality** | ESLint, strict TypeScript (no `any`) |

---

## 🎨 Architecture

### Services (Signals-based)

**QuoteService**
- Loads quotes from `assets/data/quotes.json`
- Manages current quote index via signals
- Provides: `next()`, `previous()`, `random()`

**ThemeService**
- Cycles through 4 themes
- Persists to localStorage
- Syncs `data-theme` attribute to `<html>` for CSS cascade

**AudioService**
- Web Audio API + GainNode for fade transitions
- Defers init to first user gesture (autoplay policy)
- Manages play/stop/mute/track switching

### Components

```
AppComponent
├── QuoteMachineComponent
    ├── BackgroundComponent (animated gradient)
    ├── QuoteDisplayComponent
    │   ├── QuoteTextComponent (blur-to-focus)
    │   └── QuoteAuthorComponent (fade-up, 600ms delay)
    └── ControlsComponent
        ├── ThemeSwitcherComponent
        └── AudioControlComponent
```

**Key principle:** Shallow tree (max depth 4), composition over abstraction.

---

## 🎬 Animation Sequence

When a new quote appears:

1. **Old quote** fades out (300ms) + blur (0 → 8px)
2. **New quote** text fades in (400ms, starts @350ms) + blur (8px → 0)
3. **Author** fades up (300ms, starts @600ms) + translateY (8px → 0)

All animations respect `prefers-reduced-motion`.

---

## 🎨 Theme System

Each theme is pure CSS. No JavaScript re-renders on theme switch.

**Themes:**
- 🌌 **Cosmic** — Purple gradient, distant and ethereal
- 🌧️ **Lo-fi Rain** — Cool blues, moody and introspective
- 🖤 **Noir** — Deep black & gray, cinematic and bold
- 💫 **Dream Neon** — Magenta & pink, surreal and otherworldly

**How it works:**
- CSS custom properties on `:root[data-theme="..."]`
- Components read `var(--color-accent)`, `var(--gradient-start)`, etc.
- Theme switch = 1 attribute change = instant cascade

---

## 📦 Scripts

```bash
bun run start       # Dev server (hot reload)
bun run build       # Production build (local)
bun run build:gh    # Build for GitHub Pages
bun run lint        # Code quality check
bun run test        # Unit tests
```

---

## 📈 Performance

- **Bundle:** 80.87 KB gzipped
- **Target Frame Rate:** 60fps (all animations)
- **Lighthouse targets:**
  - Performance > 90
  - Accessibility > 95
  - Best Practices > 95

---

## 🌐 Deployment

Automatic CI/CD to GitHub Pages on every push to `main`.

**Current:** https://github.com/preyan/velora

**To deploy manually:**
```bash
bun run build:gh
# Output: dist/velora/browser/
```

Base href is `/velora/` for GitHub Pages subpath routing.

---

## 📋 Development Phases

| # | Status | Focus |
|---|--------|-------|
| 1 | ✅ | Angular scaffold, QuoteService, base layout |
| 2 | ✅ | Animations, backgrounds, blur-to-focus |
| 3 | ✅ | Audio engine, theme switcher, controls |
| 4 | ⏳ | Polish, optimization, Lighthouse tuning |
| 5 | 🔮 | Testing, docs, deployment automation |

---

## 🛠️ Code Standards

- **No `any` types** — strict TypeScript always
- **Standalone components** — no NgModule
- **Signals for state** — reactive, no subscriptions
- **Composition over abstraction** — keep it flat
- **Minimal comments** — self-documenting code
- **Atomic commits** — focused, semantic messages

**Before pushing:**
```bash
bun run lint    # Must pass
bun run build   # Must succeed
```

---

## 🎮 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile (iOS Safari, Chrome Android)

AudioContext requires modern browsers.

---

## 📚 Project Structure

```
src/
  app/
    app.ts                  # Root component
    app.config.ts           # Angular providers
    features/quote-machine/
      components/           # UI components
      services/             # Signals-based services
      animations/           # Angular Animation triggers
      models/               # TypeScript interfaces
  styles/
    _variables.scss         # Theme tokens
    _reset.scss             # CSS reset
    _typography.scss        # Fonts & type scale
  assets/
    data/quotes.json        # Quote source
    audio/                  # Ambient tracks
```

---

## 💬 Contributing

We welcome contributions. Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Keep commits atomic and well-described
4. Run `bun run lint` before pushing
5. Open a pull request

---

## 📝 License

MIT License — feel free to use and modify.

---

## 👨‍💻 Author

**Preyan Bhowmick**  
[GitHub](https://github.com/preyan) • [Email](mailto:preyan1997@gmail.com)

---

<div align="center">

**Build the cinematic experience.**

[Live Demo](https://github.com/preyan/velora) • [Report Issue](https://github.com/preyan/velora/issues) • [Star us ⭐](https://github.com/preyan/velora)

</div>
