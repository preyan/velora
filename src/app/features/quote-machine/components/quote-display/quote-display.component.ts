import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quote } from '../../models/quote.model';
import { QuoteTextComponent } from '../quote-text/quote-text.component';
import { QuoteAuthorComponent } from '../quote-author/quote-author.component';

@Component({
  selector: 'app-quote-display',
  standalone: true,
  imports: [CommonModule, QuoteTextComponent, QuoteAuthorComponent],
  templateUrl: './quote-display.component.html',
  styleUrl: './quote-display.component.scss',
})
export class QuoteDisplayComponent {
  @Input() quote: Quote | null = null;
}
