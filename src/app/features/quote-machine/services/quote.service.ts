import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../models/quote.model';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private http = inject(HttpClient);

  readonly quotes = signal<Quote[]>([]);
  readonly currentIndex = signal<number>(0);
  readonly isLoading = signal<boolean>(true);

  readonly currentQuote = computed<Quote | null>(() => {
    const allQuotes = this.quotes();
    const idx = this.currentIndex();
    return allQuotes[idx] ?? null;
  });

  constructor() {
    this.loadLocalQuotes();
  }

  private loadLocalQuotes(): void {
    this.http.get<Quote[]>('./assets/data/quotes.json').subscribe({
      next: (data) => {
        this.quotes.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load quotes', err);
        this.isLoading.set(false);
      },
    });
  }

  next(): void {
    const allQuotes = this.quotes();
    if (allQuotes.length === 0) return;
    this.currentIndex.update((i) => (i + 1) % allQuotes.length);
  }

  previous(): void {
    const allQuotes = this.quotes();
    if (allQuotes.length === 0) return;
    this.currentIndex.update((i) => (i - 1 + allQuotes.length) % allQuotes.length);
  }

  random(): void {
    const allQuotes = this.quotes();
    if (allQuotes.length === 0) return;
    const currentIdx = this.currentIndex();
    let randomIdx: number;
    do {
      randomIdx = Math.floor(Math.random() * allQuotes.length);
    } while (randomIdx === currentIdx && allQuotes.length > 1);
    this.currentIndex.set(randomIdx);
  }

  goTo(index: number): void {
    const allQuotes = this.quotes();
    if (index >= 0 && index < allQuotes.length) {
      this.currentIndex.set(index);
    }
  }
}
