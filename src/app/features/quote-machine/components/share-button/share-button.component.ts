import { Component } from '@angular/core';

@Component({
  selector: 'app-share-button',
  standalone: true,
  template: `
    <button class="share-btn" (click)="shareQuote()" title="Copy share link to clipboard">
      🔗 Share
    </button>
  `,
  styles: [`
    .share-btn {
      font-size: var(--font-size-ui);
      color: var(--color-text-primary);
      border: 1px solid var(--color-accent);
      padding: 0.75rem 1.5rem;
      border-radius: 2px;
      cursor: pointer;
      transition: all 0.2s ease;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      background: transparent;

      &:hover {
        background: var(--color-accent);
        color: var(--color-bg-primary);
      }

      &:focus-visible {
        outline: 2px solid var(--color-accent);
        outline-offset: 2px;
      }
    }
  `],
})
export class ShareButtonComponent {
  protected shareQuote(): void {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      const btn = document.querySelector('.share-btn') as HTMLButtonElement;
      if (btn) {
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      }
    });
  }
}
