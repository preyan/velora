import { Injectable, signal, effect, inject, computed } from '@angular/core';
import { QuoteService } from './quote.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private quoteService = inject(QuoteService);

  readonly favorites = signal<number[]>(
    JSON.parse(localStorage.getItem('velora-favorites') ?? '[]')
  );

  readonly isFavorited = computed(() => {
    const currentIdx = this.quoteService.currentIndex();
    return this.favorites().includes(currentIdx);
  });

  constructor() {
    effect(() => {
      localStorage.setItem('velora-favorites', JSON.stringify(this.favorites()));
    });
  }

  toggleFavorite(index: number): void {
    this.favorites.update((fav) => {
      const newFav = [...fav];
      const idx = newFav.indexOf(index);
      if (idx > -1) {
        newFav.splice(idx, 1);
      } else {
        newFav.push(index);
      }
      return newFav;
    });
  }

  toggleCurrentFavorite(): void {
    this.toggleFavorite(this.quoteService.currentIndex());
  }
}
