````md id="srx2qf"
# CLAUDE.md

# Velora — Cinematic Interactive Quote Machine

## Vision

Velora is a cinematic quote experience built entirely with Angular.

This is NOT a traditional quote generator.

The app should feel:
- atmospheric
- immersive
- emotional
- minimal
- elegant
- cinematic
- premium

Inspiration:
- Interstellar
- Apple-level polish
- A24 moodboards
- ambient storytelling

Goal:
> “a playable emotional atmosphere.”

---

## Core Rules

- Prioritize: functionality → architecture → UI polish
- Keep architecture simple and maintainable
- Prefer Angular-native solutions
- Prefer flat structure and low boilerplate
- Use standalone components
- Prefer composition over abstraction
- Avoid overengineering and feature creep
- Minimalism is a core feature

---

## Project Constraints

The app must:
- use NO backend
- use NO database
- use NO authentication
- work fully client-side
- deploy to GitHub Pages

Allowed:
- Local JSON
- LocalStorage
- IndexedDB (only if needed later)

---

## Tech Stack

Core:
- Angular (latest)
- Standalone Components
- Angular Signals
- RxJS
- Angular Animations
- SCSS

Optional:
- html2canvas
- Angular CDK
- GSAP (only if justified)

Avoid unnecessary dependencies.

---

## Architecture Rules

Before adding:
- libraries
- abstractions
- services
- utilities

Always ask:
1. Is this necessary?
2. Does Angular already solve this?
3. Does this reduce complexity?
4. Is this maintainable long-term?

Prefer:
- lightweight solutions
- reusable components
- focused files
- shallow component trees

Avoid:
- giant files
- deep nesting
- unnecessary wrappers
- enterprise-style complexity

---

## AI Collaboration Rules

Before implementing:
- analyze existing architecture
- avoid duplicate logic
- reuse existing patterns
- preserve current functionality

When making changes:
- keep commits focused
- avoid unrelated refactors
- explain important decisions
- prefer simpler solutions

Never:
- rewrite working systems unnecessarily
- add dependencies without justification
- introduce breaking changes casually

---

## Design Philosophy

The UI should feel:
- calm
- cinematic
- modern
- immersive
- intentional
- emotionally engaging

Avoid:
- clutter
- noisy visuals
- generic templates
- flashy effects
- excessive controls

Every UI addition must improve:
- hierarchy
- spacing
- readability
- responsiveness
- accessibility
- immersion

---

## Motion & Animation

Animations should be:
- smooth
- subtle
- cinematic
- performant
- emotionally paced

Prefer:
- opacity
- transform
- blur
- staggered timing
- easing curves

Avoid:
- aggressive motion
- excessive simultaneous effects
- repaint-heavy animations

Target:
- smooth 60fps rendering

Quote transition flow:
1. old quote fades out
2. background transitions
3. new quote fades/blurs in
4. author appears slightly later

---

## Themes

Initial themes:
1. Cosmic
2. Lo-fi Rain
3. Noir
4. Dream Neon

Themes should affect:
- colors
- ambience
- gradients
- overlays
- typography mood
- animation mood

---

## MVP Features

### Layout
- fullscreen cinematic UI
- responsive
- centered composition

### Quote Engine
- local JSON source
- random quotes
- next/previous navigation

Quote structure:
```json
[
  {
    "text": "...",
    "author": "...",
    "theme": "cosmic"
  }
]
```

### Typography
- blur-to-focus
- fade transitions
- staggered words
- delayed author reveal

### Backgrounds
- animated gradients
- overlays
- subtle particles
- slow motion effects

### Ambient Audio
Include:
- rain ambience
- piano ambience
- cosmic ambience

Features:
- mute/unmute
- fade transitions
- volume control
- looping

### Controls
- next quote
- previous quote
- ambience toggle
- theme switch

Controls should remain minimal and unobtrusive.

---

## Future Features

Only after MVP is stable:
- screenshot export
- fullscreen mode
- cinematic autoplay
- keyboard shortcuts
- favorites
- PWA support
- offline support
- shareable quote URLs

Avoid feature creep.

---

## Folder Structure

```txt
src/app/
  core/
  shared/
  features/
    quote-machine/
      components/
      services/
      animations/
      models/
      data/
      utils/
```

Keep structure flat where possible.

---

## Asset Rules

- compress audio
- optimize images
- avoid large videos
- lazy load heavy assets
- keep repository lightweight

---

## Mobile & Accessibility

Mobile-first design is required.

The app must feel:
- smooth
- responsive
- immersive
- touch-friendly

Accessibility requirements:
- semantic HTML
- keyboard navigation
- aria labels
- reduced motion support
- proper contrast
- visible focus states

---

## Performance Rules

Optimize continuously for:
- smooth animations
- low memory usage
- small bundle size
- minimal rerenders

Avoid:
- unnecessary subscriptions
- heavy DOM operations
- unnecessary dependencies

Performance targets:
- Lighthouse Performance > 90
- Accessibility > 95
- Best Practices > 95

---

## Testing Rules

Before committing:
- lint passes
- tests pass
- production build succeeds

Add:
- unit tests for services/utilities
- component tests where useful
- production build validation

---

## Git Workflow

Branch strategy:
- main → production-ready
- feature/* → new features
- fix/* → bug fixes

Commit after meaningful milestones.

Examples:
- feat: add cinematic quote transitions
- feat: implement ambient audio engine
- refactor: simplify animation orchestration
- docs: update deployment guide

Avoid:
- vague commits
- giant commits

---

## Documentation Rules

This is a FOSS-quality project.

Keep documentation updated continuously.

Required:
- README.md
- setup guide
- deployment guide
- architecture overview
- roadmap
- changelog

README should include:
- overview
- screenshots
- setup instructions
- deployment steps
- roadmap

---

## Deployment Rules

Before pushing:
1. setup GitHub Actions
2. configure CI/CD
3. configure GitHub Pages deployment
4. verify production build
5. configure correct base href

Deployment must be fully automated.

The app must:
- support static hosting
- work correctly on GitHub Pages
- deploy automatically on push

---

## Development Phases

### Phase 1
- project setup
- architecture
- base layout
- quote engine

### Phase 2
- typography animations
- cinematic backgrounds

### Phase 3
- audio engine
- controls
- themes

### Phase 4
- screenshot export
- polishing
- optimization

### Phase 5
- testing
- documentation
- deployment automation

---

## Definition of Done

A task is NOT complete until:
- functionality works
- responsiveness is verified
- accessibility is checked
- lint passes
- tests pass
- production build succeeds
- documentation is updated
- meaningful commit is created

---

## Anti-Bloat Rules

Do not add features unless they improve:
- immersion
- usability
- emotional experience
- maintainability

Avoid:
- unnecessary settings
- cluttered UI
- excessive controls
- feature creep

---

## Final Goal

The finished application should feel:
- premium
- immersive
- cinematic
- smooth
- intentional
- emotionally engaging

A smaller polished experience is better than a larger unfinished one.
````
