export type ThemeName = 'cosmic' | 'lofi-rain' | 'noir' | 'dream-neon' | 'light';

export interface Quote {
  text: string;
  author: string;
  theme: ThemeName;
}
