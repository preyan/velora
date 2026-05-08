import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AudioService } from '../../services/audio.service';
import { AudioTrack } from '../../services/procedural-audio';

@Component({
  selector: 'app-audio-control',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './audio-control.component.html',
  styleUrl: './audio-control.component.scss',
})
export class AudioControlComponent {
  protected audioService = inject(AudioService);

  protected toggleMute(): void {
    this.audioService.toggleMute();
  }

  protected playAudio(): void {
    this.audioService.play();
  }

  protected stopAudio(): void {
    this.audioService.stop();
  }

  protected onTrackChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.audioService.switchTrack(select.value as AudioTrack);
  }

  protected onVolumeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.audioService.setVolume(parseFloat(input.value));
  }
}
