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
      font-size: 0.75rem;
      opacity: 0.5;
      transition: opacity 0.3s ease;
      cursor: help;
      letter-spacing: 0.05em;
      font-weight: 500;
      z-index: 999;
      color: var(--color-text-secondary);
      pointer-events: auto;
    }

    .version-badge:hover {
      opacity: 0.8;
    }
  `],
  standalone: true,
})
export class VersionBadgeComponent {
  version = APP_VERSION;
}
