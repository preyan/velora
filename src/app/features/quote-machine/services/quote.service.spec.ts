import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuoteService } from './quote.service';
import { Quote } from '../models/quote.model';

describe('QuoteService', () => {
  let service: QuoteService;
  let httpMock: HttpTestingController;

  const mockQuotes: Quote[] = [
    { text: 'Quote 1', author: 'Author 1', theme: 'cosmic' },
    { text: 'Quote 2', author: 'Author 2', theme: 'lofi-rain' },
    { text: 'Quote 3', author: 'Author 3', theme: 'noir' },
    { text: 'Quote 4', author: 'Author 4', theme: 'dream-neon' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuoteService],
    });

    service = TestBed.inject(QuoteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load quotes on construction', (done) => {
    const req = httpMock.expectOne('/assets/data/quotes.json');
    expect(req.request.method).toBe('GET');

    req.flush(mockQuotes);

    setTimeout(() => {
      expect(service.quotes()).toEqual(mockQuotes);
      expect(service.isLoading()).toBe(false);
      done();
    }, 0);
  });

  it('should handle HTTP error when loading quotes', (done) => {
    const req = httpMock.expectOne('/assets/data/quotes.json');
    req.error(new ErrorEvent('Network error'));

    setTimeout(() => {
      expect(service.isLoading()).toBe(false);
      expect(service.quotes()).toEqual([]);
      done();
    }, 0);
  });

  it('should return null for currentQuote before loading', () => {
    const req = httpMock.expectOne('/assets/data/quotes.json');
    expect(service.currentQuote()).toBeNull();
    req.flush(mockQuotes);
  });

  it('should return current quote after loading', (done) => {
    const req = httpMock.expectOne('/assets/data/quotes.json');
    req.flush(mockQuotes);

    setTimeout(() => {
      expect(service.currentQuote()).toEqual(mockQuotes[0]);
      done();
    }, 0);
  });

  it('should navigate to next quote', (done) => {
    const req = httpMock.expectOne('/assets/data/quotes.json');
    req.flush(mockQuotes);

    setTimeout(() => {
      service.next();
      expect(service.currentIndex()).toBe(1);
      expect(service.currentQuote()).toEqual(mockQuotes[1]);
      done();
    }, 0);
  });

  it('should wrap around to first quote when at end', (done) => {
    const req = httpMock.expectOne('/assets/data/quotes.json');
    req.flush(mockQuotes);

    setTimeout(() => {
      service.currentIndex.set(mockQuotes.length - 1);
      service.next();
      expect(service.currentIndex()).toBe(0);
      done();
    }, 0);
  });

  it('should navigate to previous quote', (done) => {
    const req = httpMock.expectOne('/assets/data/quotes.json');
    req.flush(mockQuotes);

    setTimeout(() => {
      service.currentIndex.set(2);
      service.previous();
      expect(service.currentIndex()).toBe(1);
      expect(service.currentQuote()).toEqual(mockQuotes[1]);
      done();
    }, 0);
  });

  it('should wrap around to last quote when at beginning', (done) => {
    const req = httpMock.expectOne('/assets/data/quotes.json');
    req.flush(mockQuotes);

    setTimeout(() => {
      service.currentIndex.set(0);
      service.previous();
      expect(service.currentIndex()).toBe(mockQuotes.length - 1);
      done();
    }, 0);
  });

  it('should navigate to random quote different from current', (done) => {
    const req = httpMock.expectOne('/assets/data/quotes.json');
    req.flush(mockQuotes);

    setTimeout(() => {
      service.currentIndex.set(0);
      service.random();
      expect(service.currentIndex()).not.toBe(0);
      expect(service.currentIndex()).toBeGreaterThanOrEqual(0);
      expect(service.currentIndex()).toBeLessThan(mockQuotes.length);
      done();
    }, 0);
  });

  it('should handle next() with empty quotes', () => {
    const req = httpMock.expectOne('/assets/data/quotes.json');
    req.flush([]);
    expect(() => service.next()).not.toThrow();
    expect(service.currentIndex()).toBe(0);
  });

  it('should handle previous() with empty quotes', () => {
    const req = httpMock.expectOne('/assets/data/quotes.json');
    req.flush([]);
    expect(() => service.previous()).not.toThrow();
    expect(service.currentIndex()).toBe(0);
  });

  it('should navigate to specific index with goTo()', (done) => {
    const req = httpMock.expectOne('/assets/data/quotes.json');
    req.flush(mockQuotes);

    setTimeout(() => {
      service.goTo(2);
      expect(service.currentIndex()).toBe(2);
      expect(service.currentQuote()).toEqual(mockQuotes[2]);
      done();
    }, 0);
  });

  it('should reject invalid index in goTo()', (done) => {
    const req = httpMock.expectOne('/assets/data/quotes.json');
    req.flush(mockQuotes);

    setTimeout(() => {
      service.goTo(-1);
      expect(service.currentIndex()).toBe(0);

      service.goTo(mockQuotes.length);
      expect(service.currentIndex()).toBe(0);
      done();
    }, 0);
  });

  it('should have single quote with random() pointing to same quote', (done) => {
    const singleQuote = [mockQuotes[0]];
    const req = httpMock.expectOne('/assets/data/quotes.json');
    req.flush(singleQuote);

    setTimeout(() => {
      service.random();
      expect(service.currentIndex()).toBe(0);
      done();
    }, 0);
  });
});
