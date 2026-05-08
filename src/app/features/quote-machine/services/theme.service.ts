import { Injectable, effect } from '@angular/core';
import { signal } from '@angular/core';
import { ThemeName } from '../models/quote.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly themes: ThemeName[] = ['cosmic', 'lofi-rain', 'noir', 'dream-neon'];
  readonly currentTheme = signal<ThemeName>(
    (localStorage.getItem('velora-theme') as ThemeName) ?? 'cosmic'
  );

  constructor() {
    effect(() => {
      const theme = this.currentTheme();
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('velora-theme', theme);
    });

    // Apply theme immediately on init
    document.documentElement.setAttribute('data-theme', this.currentTheme());
  }

  setTheme(theme: ThemeName): void {
    this.currentTheme.set(theme);
  }

  nextTheme(): void {
    const currentIdx = this.themes.indexOf(this.currentTheme());
    const nextIdx = (currentIdx + 1) % this.themes.length;
    this.currentTheme.set(this.themes[nextIdx]);
  }
}
