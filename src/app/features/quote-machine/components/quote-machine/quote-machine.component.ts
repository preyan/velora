import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from '../background/background.component';
import { QuoteDisplayComponent } from '../quote-display/quote-display.component';
import { ControlsComponent } from '../controls/controls.component';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-quote-machine',
  standalone: true,
  imports: [
    CommonModule,
    BackgroundComponent,
    QuoteDisplayComponent,
    ControlsComponent,
  ],
  templateUrl: './quote-machine.component.html',
  styleUrl: './quote-machine.component.scss',
})
export class QuoteMachineComponent {
  protected quoteService = inject(QuoteService);

  protected next(): void {
    this.quoteService.next();
  }

  protected previous(): void {
    this.quoteService.previous();
  }
}
