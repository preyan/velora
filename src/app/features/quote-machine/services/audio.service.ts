import { Injectable, signal, effect } from '@angular/core';
import { ProceduralAudioGenerator, AudioTrack } from './procedural-audio';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private context: AudioContext | null = null;
  private generator: ProceduralAudioGenerator | null = null;
  private isInitialized = false;

  readonly isMuted = signal<boolean>(
    localStorage.getItem('velora-muted') === 'true'
  );
  readonly volume = signal<number>(
    parseFloat(localStorage.getItem('velora-volume') ?? '1')
  );
  readonly currentTrack = signal<AudioTrack>('rain');
  readonly isPlaying = signal<boolean>(false);

  constructor() {
    effect(() => {
      localStorage.setItem('velora-muted', this.isMuted() ? 'true' : 'false');
      this.updateVolume();
    });

    effect(() => {
      localStorage.setItem('velora-volume', this.volume().toString());
      this.updateVolume();
    });

    this.registerInitListeners();
  }

  private registerInitListeners(): void {
    document.addEventListener('click', () => this.initialize(), { once: true });
    document.addEventListener('keydown', () => this.initialize(), { once: true });
  }

  private initialize(): void {
    if (this.isInitialized) return;

    try {
      const windowWithWebKit = window as unknown as {
        AudioContext?: typeof AudioContext;
        webkitAudioContext?: typeof AudioContext;
      };

      const AudioContextClass =
        windowWithWebKit.AudioContext || windowWithWebKit.webkitAudioContext;

      if (!AudioContextClass) {
        console.warn('AudioContext not supported');
        return;
      }

      this.context = new AudioContextClass();
      this.generator = new ProceduralAudioGenerator(this.context);
      this.isInitialized = true;
      this.updateVolume();
    } catch (err) {
      console.error('Failed to initialize AudioContext', err);
    }
  }

  play(): void {
    if (!this.isInitialized) {
      console.warn('Audio not initialized yet');
      return;
    }

    this.isPlaying.set(true);
    this.createTrack(this.currentTrack());
    this.updateVolume();
  }

  stop(): void {
    if (!this.generator) return;

    this.generator.stopAll();
    this.generator.getMasterGain().gain.value = 0;
    this.isPlaying.set(false);
  }

  toggleMute(): void {
    this.isMuted.update((v) => !v);
  }

  switchTrack(track: AudioTrack): void {
    if (this.currentTrack() === track || !this.isPlaying()) return;
    this.currentTrack.set(track);

    if (this.isInitialized && this.generator) {
      this.generator.stopAll();
      this.createTrack(track);
    }
  }

  setVolume(value: number): void {
    this.volume.set(Math.max(0, Math.min(1, value)));
  }

  private createTrack(track: AudioTrack): void {
    if (!this.generator) return;

    switch (track) {
      case 'rain': this.generator.createRain(); break;
      case 'wind': this.generator.createWind(); break;
      case 'ocean': this.generator.createOcean(); break;
      case 'forest': this.generator.createForest(); break;
      case 'stream': this.generator.createStream(); break;
      case 'birds': this.generator.createBirds(); break;
      case 'piano': this.generator.createPiano(); break;
      case 'bells': this.generator.createBells(); break;
      case 'meditation': this.generator.createMeditation(); break;
      case 'fireplace': this.generator.createFireplace(); break;
      case 'drone': this.generator.createDrone(); break;
      case 'cosmic': this.generator.createCosmic(); break;
      case 'aurora': this.generator.createAurora(); break;
      case 'nebula': this.generator.createNebula(); break;
      case 'thunder': this.generator.createThunder(); break;
    }
  }

  private updateVolume(): void {
    if (!this.generator) return;
    const masterGain = this.generator.getMasterGain();
    masterGain.gain.value = this.isMuted() ? 0 : this.volume();
  }
}
