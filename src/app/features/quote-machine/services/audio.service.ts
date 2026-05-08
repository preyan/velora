import { Injectable, signal, effect } from '@angular/core';
import { ProceduralAudioGenerator, AudioTrack } from './procedural-audio';

const AUDIO_FILES: Record<AudioTrack, string> = {
  rain: 'assets/audio/rain.mp3',
  wind: 'assets/audio/wind.mp3',
  ocean: 'assets/audio/ocean.mp3',
  forest: 'assets/audio/forest.mp3',
  stream: 'assets/audio/stream.mp3',
  birds: 'assets/audio/birds.mp3',
  piano: 'assets/audio/piano.mp3',
  bells: 'assets/audio/bells.mp3',
  meditation: 'assets/audio/meditation.mp3',
  fireplace: 'assets/audio/fireplace.mp3',
  drone: 'assets/audio/drone.mp3',
  cosmic: 'assets/audio/cosmic.mp3',
  aurora: 'assets/audio/aurora.mp3',
  nebula: 'assets/audio/nebula.mp3',
  thunder: 'assets/audio/thunder.mp3',
};

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private context: AudioContext | null = null;
  private generator: ProceduralAudioGenerator | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private isInitialized = false;
  private useLocalAudio = false;

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
    this.loadAndPlayTrack(this.currentTrack());
    this.updateVolume();
  }

  stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }

    if (this.generator) {
      this.generator.stopAll();
      this.generator.getMasterGain().gain.value = 0;
    }

    this.isPlaying.set(false);
  }

  toggleMute(): void {
    this.isMuted.update((v) => !v);
  }

  switchTrack(track: AudioTrack): void {
    if (this.currentTrack() === track || !this.isPlaying()) return;
    this.currentTrack.set(track);

    if (this.isInitialized) {
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      }
      if (this.generator) {
        this.generator.stopAll();
      }
      this.loadAndPlayTrack(track);
    }
  }

  setVolume(value: number): void {
    this.volume.set(Math.max(0, Math.min(1, value)));
  }

  private loadAndPlayTrack(track: AudioTrack): void {
    const audioPath = AUDIO_FILES[track];

    if (!this.currentAudio) {
      this.currentAudio = new Audio();
      this.currentAudio.loop = true;
    }

    this.currentAudio.src = audioPath;
    this.currentAudio.load();

    const playPromise = this.currentAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.useLocalAudio = true;
          this.updateVolume();
        })
        .catch(() => {
          console.warn(`Local audio file not found: ${audioPath}, falling back to procedural audio`);
          this.useLocalAudio = false;
          this.createTrack(track);
        });
    }
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
    const targetVolume = this.isMuted() ? 0 : this.volume();

    if (this.useLocalAudio && this.currentAudio) {
      this.currentAudio.volume = targetVolume;
    }

    if (this.generator) {
      const masterGain = this.generator.getMasterGain();
      masterGain.gain.value = targetVolume;
    }
  }
}
