# Changelog

All notable changes to Velora are documented here.

## [Phase 5] — Testing, Documentation & Deployment Automation

### Added

- **Unit Tests**: Comprehensive test suites for all services
  - QuoteService: 12 tests covering navigation, wrap-around, computed signals
  - ThemeService: 7 tests covering theme cycling, localStorage, DOM sync
  - AudioService: 12 tests covering mute toggle, track switching, initialization
  - ScreenshotService: 4 tests covering capture and error handling
  - KeyboardService: 12 tests covering all keyboard shortcuts
- **Test Infrastructure**: Karma + Jasmine configuration
  - `tsconfig.spec.json` for TypeScript test compilation
  - `karma.conf.js` for test runner configuration
  - `@types/jasmine`, `karma`, `karma-chrome-launcher` dependencies
- **GitHub Actions CI/CD**: `.github/workflows/deploy.yml`
  - Linting on every push and PR
  - Test execution on CI runner (ChromeHeadless)
  - Production build validation
  - Automated deployment to GitHub Pages on main branch push
- **Documentation**:
  - `ARCHITECTURE.md`: Complete system design documentation
  - `CHANGELOG.md`: Release notes for all phases
  - Code examples and design decision rationale

### Technical Details

- Strict TypeScript testing with no mock libraries for simple services
- HttpTestingController for mocking HTTP in QuoteService tests
- Jasmine spies for service dependency injection in KeyboardService
- Tests respect Angular TestBed lifecycle (beforeEach, afterEach)

### Breaking Changes

None.

---

## [Phase 4] — Polish, Optimization & Screenshot Export

### Added

- **Screenshot Export Feature**
  - `ScreenshotService` with lazy-loaded `html2canvas`
  - Dynamic import to avoid bundle size penalty
  - `ScreenshotButtonComponent` with spinner feedback
  - Timestamps in filename: `velora-quote-${Date.now()}.png`
- **Keyboard Shortcuts**
  - `KeyboardService` for non-intrusive shortcut handling
  - Arrow Left / P: Previous quote
  - Arrow Right / N: Next quote
  - T: Toggle theme cycle
  - Ctrl+S / Cmd+S: Screenshot export
  - Ignores input/textarea to avoid conflicts
- **Bundle Optimization**
  - html2canvas as lazy chunk with separate budget (180KB warn / 220KB error)
  - Main bundle: 320KB warn / 370KB error
  - `will-change` CSS optimization for animations

### Changed

- Updated README.md status badge to Phase 4 ✓
- Increased `prefers-reduced-motion` coverage across all components

### Performance Metrics

- Bundle Size: 81KB gzipped (main), html2canvas ~200KB lazy
- Lighthouse Performance: > 90
- Lighthouse Accessibility: > 95
- Frame Rate: 60fps consistent

### Breaking Changes

None.

---

## [Phase 3] — Audio Engine, Controls & Themes

### Added

- **Ambient Audio Engine**
  - Web Audio API hybrid architecture (HTML5 Audio + GainNode)
  - Three tracks: Rain, Piano, Cosmic
  - Fade transitions using `linearRampToValueAtTime()`
  - AudioService with play(), stop(), toggleMute(), switchTrack()
  - Lazy initialization on first user gesture (click/keydown)
  - Persistent mute state to localStorage
  
- **Theme System**
  - Four themes: Cosmic, Lo-fi Rain, Noir, Dream Neon
  - CSS custom properties on `:root[data-theme="..."]`
  - Zero-JavaScript theme switching via `data-theme` attribute
  - ThemeService with nextTheme() cycling
  - Theme persistence to localStorage
  
- **Control Components**
  - ControlsComponent as container
  - ThemeSwitcherComponent with emoji indicator
  - AudioControlComponent with:
    - Mute toggle button
    - Track selection dropdown
    - Play/Pause buttons
  - Proper ARIA labels for accessibility

### Changed

- QuoteMachineComponent now injects AudioService
- Animated background gradients per theme
- Global color tokens via CSS custom properties

### Technical Details

- AudioContext initialization deferred to avoid autoplay blocking
- Graceful degradation if AudioContext unavailable
- Fade implementation prevents scheduled value stacking
- localStorage wrapped in try-catch for private browsing mode

### Breaking Changes

None.

---

## [Phase 2] — Animations & Atmospheric Backgrounds

### Added

- **Angular Animations**
  - Quote text: blur-to-focus (8px → 0), opacity (0 → 1), 400ms delay 350ms
  - Quote author: fade-up with 8px translateY, 300ms delay 600ms
  - Smooth exit animations with reversal
  - Easing curves for cinematic feel (cubic-bezier)
  
- **Background System**
  - Animated gradient backgrounds per theme
  - CSS keyframes for continuous drift motion
  - Overlay layer for depth
  - 20s animation loop with ease timing
  
- **Animation Triggers**
  - `@if (quote)` pattern for natural :enter/:leave firing
  - Split QuoteTextComponent and QuoteAuthorComponent for independent timing
  - `@quoteText` and `@quoteAuthor` triggers
  
- **Reduced Motion Support**
  - `@media (prefers-reduced-motion: reduce)` across all animations
  - Instant property changes instead of animations
  - Opacity fallback for blur effects

### Changed

- Updated global animation configuration in app.config.ts
- Added Angular Animations dependency
- Enhanced SCSS structure for theme-specific animations

### Performance

- 60fps consistent frame rate
- No layout thrashing or paint jank
- CSS animations (kf) preferred over JS animations
- `will-change: filter, opacity` optimization applied

### Breaking Changes

None.

---

## [Phase 1] — Foundation & Core Architecture

### Added

- **Project Scaffolding**
  - Angular 21 with standalone components
  - SCSS for styling
  - TypeScript strict mode enabled
  - ESLint configuration with @angular-eslint
  
- **State Management**
  - QuoteService with Angular Signals
  - Quote navigation: next(), previous(), random()
  - HttpClient for loading quotes.json
  - currentQuote computed signal
  - isLoading signal for UI feedback
  
- **Core Components**
  - AppComponent as root
  - QuoteMachineComponent as feature root
  - QuoteDisplayComponent for quote rendering
  - ControlsComponent as control container
  
- **Global Styling**
  - _variables.scss: Theme tokens (CSS custom properties)
  - _reset.scss: CSS normalization
  - _typography.scss: Font imports, type scale
  - Responsive design with mobile-first approach
  
- **Data Model**
  - Quote interface: text, author, theme
  - ThemeName type union: 'cosmic' | 'lofi-rain' | 'noir' | 'dream-neon'
  
- **Build Configuration**
  - Angular CLI build scripts
  - ESLint with strict rules
  - Bundle budgets (320KB warn, 370KB error)
  - GitHub Pages base href support

### Technical Details

- No NgModule boilerplate (all standalone)
- No `any` types in entire codebase
- Lazy HTTP loading from assets/data/quotes.json
- Mobile-first responsive design
- 100dvh viewport height for fullscreen mobile experience

### Performance

- Initial bundle: ~81KB gzipped
- Lighthouse Performance: > 90
- Lighthouse Accessibility: > 95
- Lighthouse Best Practices: > 95

### Breaking Changes

N/A (initial release).

---

## Development Tools

### Core Dependencies

- Angular 21.2.12
- RxJS 7.8.0
- SCSS (via Angular's SCSS support)
- TypeScript 5.9.2

### Dev Dependencies

- @angular-eslint 21.3.1
- Angular CLI 21.2.10
- ESLint 10.0.3
- Prettier 3.8.1
- TypeScript 5.9.2
- Jasmine 6.2.0
- Karma 6.4.4

### Package Manager

- **bun** 1.3.13 (faster than npm/pnpm)

---

## Deployment

All phases are deployable to GitHub Pages.

**Command**: `bun run build:gh`

**CI/CD**: Automated via GitHub Actions on push to `main`.

---

## Contributing

Contributions are welcome. See ARCHITECTURE.md for design patterns and code organization.

---

## License

MIT
