import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [ThemeService],
    });
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should initialize with default theme cosmic', () => {
    expect(service.currentTheme()).toBe('cosmic');
  });

  it('should load theme from localStorage if available', () => {
    localStorage.clear();
    localStorage.setItem('velora-theme', 'noir');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [ThemeService],
    });
    const newService = TestBed.inject(ThemeService);
    expect(newService.currentTheme()).toBe('noir');
  });

  it('should have all four themes available', () => {
    expect(service.themes).toEqual(['cosmic', 'lofi-rain', 'noir', 'dream-neon']);
    expect(service.themes.length).toBe(4);
  });

  it('should set theme via setTheme()', () => {
    service.setTheme('noir');
    expect(service.currentTheme()).toBe('noir');
  });

  it('should cycle to next theme', () => {
    expect(service.currentTheme()).toBe('cosmic');
    service.nextTheme();
    expect(service.currentTheme()).toBe('lofi-rain');
    service.nextTheme();
    expect(service.currentTheme()).toBe('noir');
  });

  it('should wrap around to first theme', () => {
    service.setTheme('dream-neon');
    service.nextTheme();
    expect(service.currentTheme()).toBe('cosmic');
  });

  it('should persist theme to localStorage on change', () => {
    service.setTheme('noir');
    expect(localStorage.getItem('velora-theme')).toBe('noir');
  });

  it('should update data-theme attribute on document element', () => {
    service.setTheme('lofi-rain');
    expect(document.documentElement.getAttribute('data-theme')).toBe('lofi-rain');
  });

  it('should apply initial theme to document on construction', () => {
    const htmlTheme = document.documentElement.getAttribute('data-theme');
    expect(htmlTheme).toBeTruthy();
  });
});
