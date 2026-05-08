import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { quoteTextAnimation } from '../../animations/quote.animations';

@Component({
  selector: 'app-quote-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-text.component.html',
  styleUrl: './quote-text.component.scss',
  animations: [quoteTextAnimation],
})
export class QuoteTextComponent {
  @Input() text = '';
}
