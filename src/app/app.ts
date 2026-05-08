import { Component, OnInit, effect, inject } from '@angular/core';
import { QuoteMachineComponent } from './features/quote-machine/components/quote-machine/quote-machine.component';
import { VersionBadgeComponent } from './shared/components/version-badge/version-badge.component';
import { ThemeService } from './features/quote-machine/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [QuoteMachineComponent, VersionBadgeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    // Initialize theme on app load
    effect(() => {
      const theme = this.themeService.currentTheme();
      document.documentElement.setAttribute('data-theme', theme);
    });
  }
}
