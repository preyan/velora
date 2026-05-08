import { TestBed } from '@angular/core/testing';
import { KeyboardService } from './keyboard.service';
import { QuoteService } from './quote.service';
import { ThemeService } from './theme.service';
import { ScreenshotService } from './screenshot.service';

describe('KeyboardService', () => {
  let service: KeyboardService;
  let quoteService: jasmine.SpyObj<QuoteService>;
  let themeService: jasmine.SpyObj<ThemeService>;
  let screenshotService: jasmine.SpyObj<ScreenshotService>;

  beforeEach(() => {
    const quoteSpy = jasmine.createSpyObj('QuoteService', ['next', 'previous']);
    const themeSpy = jasmine.createSpyObj('ThemeService', ['nextTheme']);
    const screenshotSpy = jasmine.createSpyObj('ScreenshotService', ['captureQuote']);

    TestBed.configureTestingModule({
      providers: [
        KeyboardService,
        { provide: QuoteService, useValue: quoteSpy },
        { provide: ThemeService, useValue: themeSpy },
        { provide: ScreenshotService, useValue: screenshotSpy },
      ],
    });

    service = TestBed.inject(KeyboardService);
    quoteService = TestBed.inject(QuoteService) as jasmine.SpyObj<QuoteService>;
    themeService = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>;
    screenshotService = TestBed.inject(ScreenshotService) as jasmine.SpyObj<ScreenshotService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize keyboard listener', () => {
    spyOn(document, 'addEventListener');
    service.initialize();
    expect(document.addEventListener).toHaveBeenCalledWith('keydown', jasmine.any(Function));
  });

  it('should call previous on ArrowLeft key', () => {
    service.initialize();
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    spyOn(event, 'preventDefault');
    document.dispatchEvent(event);
    expect(quoteService.previous).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should call previous on P key', () => {
    service.initialize();
    const event = new KeyboardEvent('keydown', { key: 'p' });
    spyOn(event, 'preventDefault');
    document.dispatchEvent(event);
    expect(quoteService.previous).toHaveBeenCalled();
  });

  it('should call next on ArrowRight key', () => {
    service.initialize();
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    spyOn(event, 'preventDefault');
    document.dispatchEvent(event);
    expect(quoteService.next).toHaveBeenCalled();
  });

  it('should call next on N key', () => {
    service.initialize();
    const event = new KeyboardEvent('keydown', { key: 'n' });
    spyOn(event, 'preventDefault');
    document.dispatchEvent(event);
    expect(quoteService.next).toHaveBeenCalled();
  });

  it('should call nextTheme on T key', () => {
    service.initialize();
    const event = new KeyboardEvent('keydown', { key: 't' });
    spyOn(event, 'preventDefault');
    document.dispatchEvent(event);
    expect(themeService.nextTheme).toHaveBeenCalled();
  });

  it('should call captureQuote on Ctrl+S', () => {
    service.initialize();
    const event = new KeyboardEvent('keydown', { key: 's', ctrlKey: true });
    spyOn(event, 'preventDefault');
    document.dispatchEvent(event);
    expect(screenshotService.captureQuote).toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should call captureQuote on Cmd+S (Mac)', () => {
    service.initialize();
    const event = new KeyboardEvent('keydown', { key: 's', metaKey: true });
    spyOn(event, 'preventDefault');
    document.dispatchEvent(event);
    expect(screenshotService.captureQuote).toHaveBeenCalled();
  });

  it('should not intercept keys when typing in input', () => {
    service.initialize();
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    document.dispatchEvent(event);

    expect(quoteService.next).not.toHaveBeenCalled();
    document.body.removeChild(input);
  });

  it('should not intercept keys when typing in textarea', () => {
    service.initialize();
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.focus();

    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    document.dispatchEvent(event);

    expect(quoteService.next).not.toHaveBeenCalled();
    document.body.removeChild(textarea);
  });

  it('should handle uppercase and lowercase keys', () => {
    service.initialize();

    const upperEvent = new KeyboardEvent('keydown', { key: 'P' });
    spyOn(upperEvent, 'preventDefault');
    document.dispatchEvent(upperEvent);
    expect(quoteService.previous).toHaveBeenCalled();

    const lowerEvent = new KeyboardEvent('keydown', { key: 'p' });
    spyOn(lowerEvent, 'preventDefault');
    document.dispatchEvent(lowerEvent);
  });
});
