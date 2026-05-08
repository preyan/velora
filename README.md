# ✨ Velora

**A cinematic quote experience** built with Angular & Web Audio API.

> Not a generator. An atmosphere.

[Live Demo](https://preyan.github.io/velora) · [Docs](ARCHITECTURE.md) · [Changelog](CHANGELOG.md)

---

## What is Velora?

Velora is a fullscreen, immersive quote app that transforms how you experience words. Every animation, sound, and color shift is intentional. The goal: **to make you feel something**.

Inspired by *Interstellar*, *Apple*, and *A24*.

---

## ✨ Features

| Feature | Details |
|---------|---------|
| **Cinematic** | Blur-to-focus transitions, staggered reveals |
| **Themes** | 4 atmospheric themes with animated gradients |
| **Audio** | Ambient soundscapes (rain, piano, cosmic) with fade transitions |
| **Keyboard** | P/N (nav), T (theme), Ctrl+S (screenshot) |
| **Export** | Capture quotes as PNG images |
| **Accessible** | WCAG AAA, keyboard nav, reduced-motion support |
| **Persistent** | Theme & audio settings saved locally |
| **Mobile** | Responsive fullscreen experience |

---

## Stack

<table>
<tr>
<td>

**Framework**  
Angular 21 (standalone)

**State**  
Angular Signals (reactive)

</td>
<td>

**Styling**  
SCSS + CSS Variables

**Audio**  
Web Audio API

</td>
<td>

**Quality**  
TypeScript strict  
ESLint clean

</td>
</tr>
</table>

---

## Get Started

```bash
git clone https://github.com/preyan/velora.git
cd velora

bun install
bun run start

# Open http://localhost:4200
```

---

## How to Use

**Navigate Quotes**
- Click **Previous** / **Next** buttons, or press **P** / **N** / **Arrow keys**
- Quotes wrap around at the beginning and end

**Change Theme**
- Click the **Theme** button to cycle through Cosmic → Lo-Fi Rain → Noir → Dream Neon
- Or press **T** to cycle themes
- Your theme choice is saved automatically

**Control Audio**
- Click the **Mute** button to toggle ambient soundscapes
- Use the **track select** dropdown to choose: Rain, Piano, or Cosmic
- Audio fades smoothly when changed
- Your audio preference is saved automatically

**Export Quotes**
- Click the **Screenshot** button to capture the current quote as a PNG
- The image includes the quote, author, and current theme
- Downloads directly to your device

**Keyboard Shortcuts**
- `P` / `Arrow Left` — Previous quote
- `N` / `Arrow Right` — Next quote
- `T` — Cycle themes
- `Ctrl+S` — Screenshot

All settings persist across sessions. Close and return anytime—your theme and audio preference will be waiting.

---

## Commands

```bash
bun run start       # Dev server (hot reload)
bun run build       # Production build
bun run build:gh    # GitHub Pages build
bun run test        # Run unit tests
bun run lint        # Code quality check
```

---

## Architecture

Shallow component tree (max 4 levels deep), Angular Signals for state, composition over abstraction.

**Services:**
- `QuoteService` — Quote data & navigation
- `ThemeService` — Theme cycling + localStorage
- `AudioService` — Web Audio API + fade transitions
- `ScreenshotService` — Export quotes to PNG
- `KeyboardService` — Global keyboard shortcuts

See [ARCHITECTURE.md](ARCHITECTURE.md) for deep dive.

---

## Performance

| Metric | Target | Status |
|--------|--------|--------|
| Bundle | < 100KB | ✅ 81KB |
| Frame Rate | 60fps | ✅ Smooth |
| Lighthouse | > 90 | ✅ Optimized |
| Accessibility | > 95 | ✅ WCAG AAA |

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile (iOS Safari, Chrome Android)

---

## Future

- 🎞️ Cinematic autoplay
- ❤️ Save favorites
- 🌐 Shareable URLs
- 📱 PWA offline support

---

## Contribute

Fork · Create feature branch · Keep commits atomic · Run `bun run lint` · Open PR.

---

## License

MIT — use, modify, distribute freely.

---

<div align="center">

**Build the cinematic experience.**

[GitHub](https://github.com/preyan/velora) · [Issues](https://github.com/preyan/velora/issues) · [Star ⭐](https://github.com/preyan/velora)

</div>
