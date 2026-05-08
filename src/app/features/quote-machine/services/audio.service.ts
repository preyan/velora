import { Injectable, signal, effect } from '@angular/core';
import { ProceduralAudioGenerator, AudioTrack } from './procedural-audio';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private context: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private generator: ProceduralAudioGenerator | null = null;
  private currentTrackNode: AudioNode | null = null;
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
    });

    effect(() => {
      localStorage.setItem('velora-volume', this.volume().toString());
      if (this.gainNode) {
        this.gainNode.gain.value = this.isMuted() ? 0 : this.volume();
      }
    });

    // Initialize audio on first user gesture
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
      this.gainNode = this.context.createGain();
      this.gainNode.connect(this.context.destination);
      this.gainNode.gain.value = this.isMuted() ? 0 : this.volume();

      this.generator = new ProceduralAudioGenerator(this.context);
      this.isInitialized = true;
      this.setupProceduralAudio();
    } catch (err) {
      console.error('Failed to initialize AudioContext', err);
    }
  }

  private setupProceduralAudio(): void {
    if (!this.generator || !this.gainNode) return;

    this.masterGain = this.generator.getMasterGain();
    this.masterGain.connect(this.gainNode);

    const track = this.currentTrack();
    this.startTrack(track);
  }

  private startTrack(track: AudioTrack): void {
    this.currentTrackNode = this.generateTrack(track);
  }

  private generateTrack(track: AudioTrack): AudioNode {
    if (!this.generator) throw new Error('Generator not initialized');

    switch (track) {
      case 'rain':
        return this.generator.createRain();
      case 'wind':
        return this.generator.createWind();
      case 'ocean':
        return this.generator.createOcean();
      case 'forest':
        return this.generator.createForest();
      case 'stream':
        return this.generator.createStream();
      case 'birds':
        return this.generator.createBirds();
      case 'piano':
        return this.generator.createPiano();
      case 'bells':
        return this.generator.createBells();
      case 'meditation':
        return this.generator.createMeditation();
      case 'fireplace':
        return this.generator.createFireplace();
      case 'drone':
        return this.generator.createDrone();
      case 'cosmic':
        return this.generator.createCosmic();
      case 'aurora':
        return this.generator.createAurora();
      case 'nebula':
        return this.generator.createNebula();
      case 'thunder':
        return this.generator.createThunder();
    }
  }

  play(): void {
    if (!this.isInitialized) {
      console.warn('Audio not initialized yet');
      return;
    }

    this.isPlaying.set(true);
    this.fade(this.isMuted() ? 0 : this.volume(), 0.5);
  }

  stop(): void {
    this.fade(0, 0.5);
    setTimeout(() => {
      this.isPlaying.set(false);
    }, 500);
  }

  toggleMute(): void {
    this.isMuted.update((current) => !current);

    if (this.gainNode && this.context) {
      const targetGain = this.isMuted() ? 0 : 1;
      this.fade(targetGain, 0.5);
    }
  }

  switchTrack(track: AudioTrack): void {
    if (this.currentTrack() === track || !this.isInitialized) return;

    const wasPlaying = this.isPlaying();
    this.currentTrack.set(track);

    if (wasPlaying && this.context) {
      this.context.close();
      this.isInitialized = false;
      this.context = null;
      this.gainNode = null;
      this.masterGain = null;
      this.initialize();
    }
  }

  setVolume(value: number): void {
    this.volume.set(Math.max(0, Math.min(1, value)));
  }

  private fade(targetGain: number, duration = 0.5): void {
    if (!this.gainNode || !this.context) return;

    const now = this.context.currentTime;
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
    this.gainNode.gain.linearRampToValueAtTime(targetGain, now + duration);
  }
}
