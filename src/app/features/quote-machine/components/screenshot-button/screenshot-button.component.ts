import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenshotService } from '../../services/screenshot.service';

@Component({
  selector: 'app-screenshot-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './screenshot-button.component.html',
  styleUrl: './screenshot-button.component.scss',
})
export class ScreenshotButtonComponent {
  private screenshotService = inject(ScreenshotService);
  protected isCapturing = signal(false);

  protected async captureScreenshot(): Promise<void> {
    this.isCapturing.set(true);
    try {
      await this.screenshotService.captureQuote();
    } finally {
      this.isCapturing.set(false);
    }
  }
}
