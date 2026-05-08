# Velora Architecture

## Overview

Velora is a cinematic, single-page application (SPA) built with Angular 21, designed to deliver a premium, atmospheric quote experience. The architecture prioritizes simplicity, performance, and maintainability.

## Core Principles

- **Standalone Components** — No NgModule boilerplate, pure composition
- **Angular Signals** — Reactive state management without RxJS subscriptions
- **CSS Custom Properties** — Theme switching without JavaScript DOM manipulation
- **Dynamic Imports** — Lazy load heavy libraries (html2canvas) on demand
- **Minimal Dependencies** — Only add libraries that solve real problems

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      AppComponent                           │
│            (Root, injects ThemeService)                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
         ┌─────────────┴──────────────┐
         │                            │
         v                            v
  QuoteMachineComponent       (HTML structure)
   └── Layout Container        • Sets data-theme on <html>
       • Composes all          • Injects keyboard service
         sub-components
         │
    ┌────┼────────────────────────┐
    │    │                        │
    v    v                        v
   Background          QuoteDisplay          Controls
   Component           Component             Component
    │                   │                     │
    │              ┌────┴────┐           ┌────┴──────┬──────────┐
    │              │          │           │           │          │
    v              v          v           v           v          v
  Gradient &     QuoteText  QuoteAuthor  Theme    Audio      Screenshot
  Overlay        Component  Component  Switcher  Control       Button
  Animation
```

## State Management

### QuoteService

**Responsibility**: Manage quote data and navigation.

```typescript
quotes: Signal<Quote[]>           // All loaded quotes
currentIndex: Signal<number>      // Current quote position
isLoading: Signal<boolean>        // Loading state
currentQuote: Computed<Quote|null> // Derived from index

// Methods
next()        // Navigate forward with wrap-around
previous()    // Navigate backward with wrap-around
random()      // Jump to random quote (never current)
goTo(index)   // Jump to specific index
```

**Data Flow**:
1. Constructor calls `loadQuotes()`
2. HttpClient fetches `assets/data/quotes.json`
3. Quotes loaded into signal
4. Components subscribe to `currentQuote` computed signal

### ThemeService

**Responsibility**: Manage theme state and persistence.

```typescript
themes: ThemeName[]              // ['cosmic', 'lofi-rain', 'noir', 'dream-neon']
currentTheme: Signal<ThemeName>  // Current active theme

// Methods
nextTheme()   // Cycle to next theme with wrap-around
setTheme()    // Set specific theme
```

**Persistence**: Uses `effect()` to:
1. Update `document.documentElement.setAttribute('data-theme', theme)`
2. Save to `localStorage` under key `'velora-theme'`

**CSS Cascade**: All color tokens are CSS custom properties on `:root[data-theme="..."]`. Theme changes are instant, zero-JavaScript repainting.

### AudioService

**Responsibility**: Manage ambient audio playback with Web Audio API.

```typescript
isMuted: Signal<boolean>          // Mute state
currentTrack: Signal<AudioTrack>  // Current audio track
isPlaying: Signal<boolean>        // Playback state

// Methods
play()                  // Start playing current track
stop()                  // Stop with fade out
toggleMute()            // Toggle mute with fade
switchTrack(track)      // Switch to different track
initialize()            // Set up AudioContext (deferred)
```

**Architecture**:

```
HTMLAudioElement → MediaElementAudioSourceNode → GainNode → AudioContext.destination
```

- **HTML5 Audio**: Handles `src`, `loop`, `currentTime` (simple DOM API)
- **GainNode**: Enables `linearRampToValueAtTime()` for glitch-free fading
- **Lazy Init**: AudioContext initialized on first user gesture (click/keydown)

**Why Hybrid?**
- Pure HTML5 Audio: No fade API
- Pure Web Audio API: Manual buffer decoding + complex loop management
- Hybrid: Best of both worlds

### KeyboardService

**Responsibility**: Non-intrusive keyboard shortcuts.

**Shortcuts**:
- `ArrowLeft` / `P`: Previous quote
- `ArrowRight` / `N`: Next quote
- `T`: Next theme
- `Ctrl+S` / `Cmd+S`: Screenshot export

**Safety**: Ignores key events when typing in `<input>` or `<textarea>`.

### ScreenshotService

**Responsibility**: Export quotes as PNG images.

**Implementation**:
- Dynamic import of `html2canvas` to avoid bloating main bundle
- Captures `<app-quote-machine>` element at 2x scale
- Downloads as `velora-quote-${timestamp}.png`

## Component Tree

### QuoteMachineComponent

**Role**: Feature root, orchestrates layout and services.

**Responsibilities**:
- Initialize KeyboardService
- Inject QuoteService for navigation
- Compose child components in proper hierarchy
- Manage grid layout (quote display + controls)

### BackgroundComponent

**Role**: Animated cinematic background.

**Rendering**:
- Two divs: `.background-gradient` and `.background-overlay`
- CSS keyframes animate gradient position per theme
- 20s ease infinite animation

**Theming**: Each theme has unique gradient colors and animation mood.

### QuoteDisplayComponent

**Role**: Orchestrate quote animations.

**Pattern**: Uses `@if (currentQuote)` to trigger :enter/:leave animations naturally.

### QuoteTextComponent & QuoteAuthorComponent

**Split Reason**: Allows independent animation timing.

**Animations**:
- **Quote**: Blur (8px → 0), opacity (0 → 1), 400ms delay 350ms
- **Author**: TranslateY (8px → 0), opacity (0 → 1), 300ms delay 600ms

Total reveal time: 950ms (text at 350ms + 400ms = 750ms, author starts at 600ms, ends at 900ms).

### ControlsComponent

**Role**: Container for UI controls.

**Composition**:
- ThemeSwitcherComponent
- AudioControlComponent  
- ScreenshotButtonComponent

### ThemeSwitcherComponent

**Interaction**: Button that calls `themeService.nextTheme()`.

**Display**: Shows emoji (◐) + theme name.

### AudioControlComponent

**Interactions**:
- **Mute Button**: Toggles `audioService.toggleMute()`
- **Track Select**: Dropdown to switch between rain, piano, cosmic
- **Play/Pause**: Buttons for playback control

### ScreenshotButtonComponent

**Pattern**: Shows spinner during capture via `isCapturing` signal.

**Interaction**: Calls `screenshotService.captureQuote()`.

## Animations

### Angular Animations (Quote Transitions)

```typescript
// src/app/features/quote-machine/animations/quote.animations.ts

quoteTextAnimation: :enter → blur(8px)→0, opacity 0→1 (400ms delay 350ms)
                   :leave → blur(0)→8px, opacity 1→0 (300ms)

quoteAuthorAnimation: :enter → translateY(8px)→0, opacity 0→1 (300ms delay 600ms)
                      :leave → opacity 1→0 (200ms)
```

**Why :enter/:leave?** Quotes re-render via `@if`, so :enter/:leave triggers naturally without explicit state management.

### CSS Keyframes (Background)

```scss
@keyframes gradientDrift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

Applied per theme via `[data-theme="..."]` selectors. Respects `prefers-reduced-motion: reduce`.

## Styling Architecture

### Global Styles

Three SCSS partials included in `angular.json` so components don't need `@use`:

1. **_variables.scss**: CSS custom properties per theme
2. **_reset.scss**: Box-sizing, margin reset, fullscreen layout
3. **_typography.scss**: Font imports, fluid type scale

### CSS Custom Properties

All tokens on `:root[data-theme="..."]`:

```scss
--color-bg-primary
--color-bg-secondary
--color-text-primary
--color-text-secondary
--color-accent
--gradient-start, --gradient-mid, --gradient-end
--font-size-quote: clamp(1.25rem, 4vw, 2.5rem)
--font-size-author: clamp(0.875rem, 2vw, 1.125rem)
```

**Theme Switching**: Change `data-theme` attribute, CSS cascade updates all colors instantly.

### Responsive Design

Mobile-first with breakpoints:

```scss
$bp-sm: 480px
$bp-md: 768px
$bp-lg: 1024px
$bp-xl: 1440px
```

Uses `100dvh` (dynamic viewport height) to account for mobile browser chrome.

## Themes

### Four Themes

| Theme | Mood | Colors | Animation |
|-------|------|--------|-----------|
| **Cosmic** | Ethereal, distant | Purple gradient | Slow drift |
| **Lo-fi Rain** | Moody, introspective | Cool blues | Subtle shift |
| **Noir** | Bold, cinematic | Black & gray | Minimal |
| **Dream Neon** | Surreal, otherworldly | Magenta & pink | Vibrant pulse |

Each theme includes:
- Color tokens (background, text, accent)
- Animated gradient
- Animation mood (speed, easing)
- Particle effects (cosmic, neon) or overlays (rain, noir)

## Data Models

### Quote

```typescript
interface Quote {
  text: string
  author: string
  theme: ThemeName // Advisory; app doesn't auto-switch
}
```

**Source**: `assets/data/quotes.json` (loaded via HttpClient).

## Performance Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| **Bundle (gzipped)** | < 370KB | Main bundle 370KB error, html2canvas lazy chunk 220KB error |
| **Frame Rate** | 60fps | use `will-change`, avoid repaints, CSS animations only |
| **Lighthouse Performance** | > 90 | Preload critical fonts, optimize images |
| **Accessibility** | > 95 | WCAG AAA: semantic HTML, keyboard nav, ARIA labels |

## Build & Deployment

### Build Scripts

```bash
bun run build       # Development build to dist/velora/browser
bun run build:gh    # Production build with --base-href /velora/ for GitHub Pages
bun run lint        # ESLint check (zero 'any' types)
bun run test        # Jasmine/Karma tests
```

### GitHub Pages Deployment

**Automatic**: GitHub Actions CI/CD on push to `main`.

**Workflow**: `.github/workflows/deploy.yml`
1. Lint code
2. Run tests
3. Build with `--base-href /velora/`
4. Deploy to `gh-pages` branch via `peaceiris/actions-gh-pages`

**Base Href**: Critical for GitHub Pages subpath routing. Built into `build:gh` script.

## Testing Strategy

### Test Framework

**Jasmine + Karma** (Angular default).

### Test Coverage

- **QuoteService**: Navigation logic, wrap-around, computed signals
- **ThemeService**: Theme cycling, localStorage persistence, DOM attribute sync
- **AudioService**: Mute toggle, track switching, localStorage persistence
- **ScreenshotService**: Capture and download behavior
- **KeyboardService**: Event handling, shortcut keys, input exclusion

### What NOT to Test

- Angular Animations (framework guarantee)
- CSS transitions (browser guarantee)
- Component template rendering (Karma integration tests)
- `AudioContext` browser behavior (mocked)

## Code Quality

### ESLint Configuration

Inherits `angular-eslint` with strict rules:

- No `any` types
- No inferrable types on @Input
- Proper accessibility (template a11y)
- No unused variables

### TypeScript Strict Mode

- `"strict": true`
- `"noImplicitReturns": true`
- `"noFallthroughCasesInSwitch": true`

## File Structure

```
src/
  app/
    app.ts                          # Root component
    app.config.ts                   # Angular providers
    features/quote-machine/
      components/
        background/
        quote-machine/
        quote-display/
        quote-text/
        quote-author/
        controls/
        theme-switcher/
        audio-control/
        screenshot-button/
      services/
        quote.service.ts
        theme.service.ts
        audio.service.ts
        screenshot.service.ts
        keyboard.service.ts
      animations/
        quote.animations.ts
      models/
        quote.model.ts
  styles/
    _variables.scss
    _reset.scss
    _typography.scss
    styles.scss
  assets/
    data/
      quotes.json
    audio/
      rain.mp3
      piano.mp3
      cosmic.mp3
  environments/
    environment.ts
    environment.development.ts
  main.ts
  index.html
```

## Key Design Decisions

### Why Signals Over RxJS?

Signals are simpler, synchronous, and require no subscription cleanup. Perfect for quote machine state.

### Why CSS Custom Properties Over Component Styles?

Theme tokens on `:root` cascade globally. Changing `data-theme` updates all colors instantly without JavaScript repaints.

### Why Angular Animations Over GSAP?

Angular's built-in animation library is sufficient for quote transitions. No extra dependency.

### Why Lazy Load html2canvas?

Dynamic `import()` defers loading until screenshot is requested, keeping main bundle lean.

### Why Hybrid Audio Architecture?

MediaElementAudioSourceNode + GainNode gives us HTML5 Audio's simplicity with Web Audio API's fade capability.

## Future Extensibility

- **Autoplay**: Add cinematic autoplay with configurable pacing
- **Favorites**: IndexedDB storage for user's favorite quotes
- **Sharing**: Generate shareable URLs with quote index
- **PWA**: Service workers for offline support
- **Analytics**: Track quote views without tracking users

Extensibility points are designed in without overengineering the MVP.
