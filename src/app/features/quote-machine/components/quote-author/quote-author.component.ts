import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { quoteAuthorAnimation } from '../../animations/quote.animations';

@Component({
  selector: 'app-quote-author',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-author.component.html',
  styleUrl: './quote-author.component.scss',
  animations: [quoteAuthorAnimation],
})
export class QuoteAuthorComponent {
  @Input() author = '';
}
