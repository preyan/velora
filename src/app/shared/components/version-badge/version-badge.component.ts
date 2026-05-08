import { Component } from '@angular/core';
import { APP_VERSION } from '../../../core/config/version';

@Component({
  selector: 'app-version-badge',
  template: `<div class="version-badge" [title]="'Velora v' + version">v{{ version }}</div>`,
  styles: [`
    .version-badge {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      padding: 0.4rem 0.8rem;
      font-size: 0.75rem;
      opacity: 0.8;
      transition: all 0.3s ease;
      cursor: help;
      letter-spacing: 0.05em;
      font-weight: 500;
      z-index: 9999;
      color: var(--color-accent-bright);
      pointer-events: auto;
      border: 1px solid var(--color-accent);
      border-radius: 2px;
      background: transparent;
      display: inline-block;
    }

    .version-badge:hover {
      opacity: 1;
      background: var(--color-accent);
      color: var(--color-bg-primary);
    }
  `],
  standalone: true,
})
export class VersionBadgeComponent {
  version = APP_VERSION;
}
