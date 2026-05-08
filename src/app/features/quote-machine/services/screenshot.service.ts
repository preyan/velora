import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenshotService {
  async captureQuote(): Promise<void> {
    try {
      const element = document.querySelector('app-quote-machine');
      if (!element) {
        console.warn('Quote machine element not found');
        return;
      }

      // Lazy load html2canvas only when needed
      const html2canvas = (await import('html2canvas')).default;

      const canvas = await html2canvas(element as HTMLElement, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      this.downloadImage(canvas);
    } catch (error) {
      console.error('Failed to capture screenshot', error);
    }
  }

  private downloadImage(canvas: HTMLCanvasElement): void {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `velora-quote-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
