import { Injectable, inject } from '@angular/core';
import { QuoteService } from './quote.service';
import { ThemeService } from './theme.service';
import { ScreenshotService } from './screenshot.service';

@Injectable({
  providedIn: 'root',
})
export class KeyboardService {
  private quoteService = inject(QuoteService);
  private themeService = inject(ThemeService);
  private screenshotService = inject(ScreenshotService);

  initialize(): void {
    document.addEventListener('keydown', (event) => this.handleKeydown(event));
  }

  private handleKeydown(event: KeyboardEvent): void {
    // Don't intercept if user is typing in an input
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
    ) {
      return;
    }

    switch (event.key.toLowerCase()) {
      case 'arrowleft':
      case 'p':
        event.preventDefault();
        this.quoteService.previous();
        break;
      case 'arrowright':
      case 'n':
        event.preventDefault();
        this.quoteService.next();
        break;
      case 't':
        event.preventDefault();
        this.themeService.nextTheme();
        break;
      case 's':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          this.screenshotService.captureQuote();
        }
        break;
    }
  }
}
