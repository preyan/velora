import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface BackgroundSlide {
  gradient: string;
  imageUrl?: string;
}

interface UnsplashResponse {
  results: Array<{ urls: { regular: string } }>;
}

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss',
})
export class BackgroundComponent {
  private http = inject(HttpClient);
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
    this.loadImages();
    this.startCarousel();
  }

  private loadImages(): void {
    const queries = ['calm', 'minimalist landscape', 'serene nature', 'peaceful sky', 'abstract minimal'];
    const imageSlides: BackgroundSlide[] = [];

    queries.forEach((query) => {
      this.http
        .get<UnsplashResponse>(
          `https://api.unsplash.com/search/photos?query=${query}&count=1&orientation=landscape`,
          {
            headers: { Authorization: 'Client-ID dJ5J6JpLh6Mf-8yI6E8cF9y4rKp0K2z_5nK5j0m0nK5' },
          }
        )
        .subscribe({
          next: (data) => {
            if (data.results[0]) {
              imageSlides.push({
                gradient: this.slides[imageSlides.length].gradient,
                imageUrl: data.results[0].urls.regular + '?w=1920&h=1080&fit=crop',
              });

              if (imageSlides.length === queries.length) {
                this.slides = imageSlides;
              }
            }
          },
          error: () => {
            console.warn('Failed to load background images, using gradients');
          },
        });
    });
  }

  private startCarousel(): void {
    setInterval(() => {
      this.slideIndex = (this.slideIndex + 1) % this.slides.length;
      this.currentSlide.set(this.slides[this.slideIndex]);
    }, 12000);
  }
}
