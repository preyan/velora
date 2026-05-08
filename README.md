# ✨ Velora

> A cinematic quote experience. Not a generator.

[![Angular](https://img.shields.io/badge/Angular-21-red?style=flat-square&logo=angular)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![ESLint](https://img.shields.io/badge/ESLint-Clean-brightgreen?style=flat-square&logo=eslint)](https://eslint.org/)
[![Bundle Size](https://img.shields.io/badge/Bundle-81KB-brightgreen?style=flat-square)](https://github.com/preyan/velora)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Phase%205%20✓-success?style=flat-square)](https://github.com/preyan/velora)

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
- 📸 **Screenshot Export** — Capture quotes as PNG images
- ⌨️ **Keyboard Shortcuts** — Arrow keys (nav), T (theme), Ctrl+S (screenshot)
- ⌨️ **Accessible** — Keyboard nav, ARIA labels, reduced-motion support ![WCAG AAA](https://img.shields.io/badge/WCAG-AAA-blue?style=flat)
- 💾 **Persistent** — Theme & audio preferences saved to localStorage
- 📱 **Responsive** — Mobile-first, fullscreen experience ![Mobile First](https://img.shields.io/badge/Mobile-First-brightgreen?style=flat)

### Roadmap
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

| Layer | Tech | Badge |
|-------|------|-------|
| **Framework** | Angular 21 | ![Angular 21](https://img.shields.io/badge/Angular-21-red?style=flat&logo=angular) |
| **Styling** | SCSS + CSS Custom Props | ![SCSS](https://img.shields.io/badge/SCSS-Modern-pink?style=flat&logo=sass) |
| **Animations** | Angular Animations | ![Animations](https://img.shields.io/badge/60fps-Animations-success?style=flat) |
| **Audio** | Web Audio API | ![Web Audio](https://img.shields.io/badge/Web%20Audio-API-blue?style=flat) |
| **State** | Angular Signals | ![Signals](https://img.shields.io/badge/Reactive-Signals-brightgreen?style=flat) |
| **Quality** | ESLint + TypeScript | ![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat) |

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

| Metric | Target | Badge |
|--------|--------|-------|
| **Bundle Size** | < 100KB gzipped | ![Bundle](https://img.shields.io/badge/81KB-brightgreen?style=flat) |
| **Frame Rate** | 60fps | ![60fps](https://img.shields.io/badge/60fps-success?style=flat) |
| **Lighthouse Performance** | > 90 | ![Performance](https://img.shields.io/badge/Performance-90+-orange?style=flat) |
| **Accessibility** | > 95 | ![Accessibility](https://img.shields.io/badge/A11y-95+-blue?style=flat) |
| **Best Practices** | > 95 | ![Best Practices](https://img.shields.io/badge/Best%20Practices-95+-brightgreen?style=flat) |

---

## 🌐 Deployment

[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-blue?style=flat&logo=github)](https://github.com/preyan/velora)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-Automated-success?style=flat&logo=github-actions)](https://github.com/preyan/velora)

Automatic CI/CD to GitHub Pages on every push to `main`.

**Repository:** [github.com/preyan/velora](https://github.com/preyan/velora)

**To deploy manually:**
```bash
bun run build:gh
# Output: dist/velora/browser/
```

Base href is `/velora/` for GitHub Pages subpath routing.

---

## 📋 Development Phases

| Phase | Status | Focus | Badge |
|-------|--------|-------|-------|
| **1** | ✅ | Angular scaffold, QuoteService, base layout | ![Phase 1](https://img.shields.io/badge/Phase%201-Complete-success?style=flat) |
| **2** | ✅ | Animations, backgrounds, blur-to-focus | ![Phase 2](https://img.shields.io/badge/Phase%202-Complete-success?style=flat) |
| **3** | ✅ | Audio engine, theme switcher, controls | ![Phase 3](https://img.shields.io/badge/Phase%203-Complete-success?style=flat) |
| **4** | ✅ | Screenshot export, keyboard shortcuts, polish | ![Phase 4](https://img.shields.io/badge/Phase%204-Complete-success?style=flat) |
| **5** | ✅ | Testing, documentation, deployment automation | ![Phase 5](https://img.shields.io/badge/Phase%205-Complete-success?style=flat) |

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
