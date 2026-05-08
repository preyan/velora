import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { AudioControlComponent } from '../audio-control/audio-control.component';
import { ScreenshotButtonComponent } from '../screenshot-button/screenshot-button.component';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [
    CommonModule,
    ThemeSwitcherComponent,
    AudioControlComponent,
    ScreenshotButtonComponent,
  ],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
})
export class ControlsComponent {}
