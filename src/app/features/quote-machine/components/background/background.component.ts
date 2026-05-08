import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BackgroundSlide {
  gradient: string;
}

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss',
})
export class BackgroundComponent {
  private slides: BackgroundSlide[] = [
    { gradient: 'linear-gradient(135deg, #0a0a1a, #1a3a4a 50%, #0d2a3a)' },
    { gradient: 'linear-gradient(135deg, #0f0f2e, #1a4d4d 50%, #0a2a3a)' },
    { gradient: 'linear-gradient(135deg, #1a0a2e, #3a1a4a 50%, #2a0a3e)' },
    { gradient: 'linear-gradient(135deg, #0a0a1a, #2a1a4a 50%, #1a0a3a)' },
    { gradient: 'linear-gradient(135deg, #1a2a1a, #2a3a1a 50%, #1a2a2a)' },
  ];

  private slideIndex = 0;
  currentSlide = signal<BackgroundSlide>(this.slides[0]);

  constructor() {
    this.startCarousel();
  }

  private startCarousel(): void {
    setInterval(() => {
      this.slideIndex = (this.slideIndex + 1) % this.slides.length;
      this.currentSlide.set(this.slides[this.slideIndex]);
    }, 12000);
  }
}
