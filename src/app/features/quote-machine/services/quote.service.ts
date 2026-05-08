import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote, ThemeName } from '../models/quote.model';

interface ZenQuotesResponse {
  q: string;
  a: string;
}

interface QuoteGardenResponse {
  data: Array<{ quoteText: string; quoteAuthor: string }>;
}

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private http = inject(HttpClient);
  private themes: ThemeName[] = ['cosmic', 'lofi-rain', 'noir', 'dream-neon'];

  readonly quotes = signal<Quote[]>([]);
  readonly currentIndex = signal<number>(0);
  readonly isLoading = signal<boolean>(true);

  readonly currentQuote = computed<Quote | null>(() => {
    const allQuotes = this.quotes();
    const idx = this.currentIndex();
    return allQuotes[idx] ?? null;
  });

  constructor() {
    this.loadQuotes();
  }

  private loadQuotes(): void {
    this.loadZenQuotes();
  }

  private loadZenQuotes(): void {
    this.http.get<ZenQuotesResponse[]>('https://zenquotes.io/api/quotes').subscribe({
      next: (data) => {
        const quotes = data.slice(0, 50).map((q, idx) => ({
          text: q.q,
          author: q.a.replace(/,\s*type.*/, ''),
          theme: this.themes[idx % this.themes.length],
        }));
        this.quotes.set(quotes);
        this.isLoading.set(false);
      },
      error: () => {
        console.warn('ZenQuotes API failed, trying Quote Garden API');
        this.loadQuoteGarden();
      },
    });
  }

  private loadQuoteGarden(): void {
    this.http.get<QuoteGardenResponse>('https://quote-garden.onrender.com/api/v3/quotes').subscribe({
      next: (data) => {
        const quotes = data.data.slice(0, 50).map((q, idx) => ({
          text: q.quoteText,
          author: q.quoteAuthor.replace(/,\s*type.*/, ''),
          theme: this.themes[idx % this.themes.length],
        }));
        this.quotes.set(quotes);
        this.isLoading.set(false);
      },
      error: () => {
        console.warn('Quote Garden API failed, using local quotes');
        this.loadLocalQuotes();
      },
    });
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
