import { Injectable, signal, effect } from '@angular/core';

export type AudioTrack = 'rain' | 'piano' | 'cosmic';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private context: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private audioElements = new Map<AudioTrack, HTMLAudioElement>();
  private currentSourceNode: MediaElementAudioSourceNode | null = null;
  private isInitialized = false;

  readonly isMuted = signal<boolean>(
    localStorage.getItem('velora-muted') === 'true'
  );
  readonly currentTrack = signal<AudioTrack>('rain');
  readonly isPlaying = signal<boolean>(false);

  constructor() {
    effect(() => {
      localStorage.setItem('velora-muted', this.isMuted() ? 'true' : 'false');
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

      // Set initial gain based on mute state
      this.gainNode.gain.value = this.isMuted() ? 0 : 1;

      this.isInitialized = true;
      this.setupAudioElements();
    } catch (err) {
      console.error('Failed to initialize AudioContext', err);
    }
  }

  private setupAudioElements(): void {
    const tracks: AudioTrack[] = ['rain', 'piano', 'cosmic'];
    tracks.forEach((track) => {
      const audio = new Audio(`./assets/audio/${track}.mp3`);
      audio.loop = true;
      audio.crossOrigin = 'anonymous';
      this.audioElements.set(track, audio);

      if (this.context && !this.currentSourceNode) {
        this.currentSourceNode = this.context.createMediaElementSource(audio);
        this.currentSourceNode.connect(this.gainNode!);
      }
    });
  }

  play(): void {
    if (!this.isInitialized) {
      console.warn('Audio not initialized yet');
      return;
    }

    const track = this.currentTrack();
    const audio = this.audioElements.get(track);
    if (!audio) return;

    audio.play().catch((err) => console.error('Failed to play audio', err));
    this.isPlaying.set(true);
    this.fade(this.isMuted() ? 0 : 1, 0.5);
  }

  stop(): void {
    const track = this.currentTrack();
    const audio = this.audioElements.get(track);
    if (!audio) return;

    this.fade(0, 0.5);
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
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
    if (this.currentTrack() === track) return;

    const isWasPlaying = this.isPlaying();
    this.stop();

    setTimeout(() => {
      this.currentTrack.set(track);
      if (isWasPlaying) {
        this.play();
      }
    }, 500);
  }

  private fade(targetGain: number, duration = 0.5): void {
    if (!this.gainNode || !this.context) return;

    const now = this.context.currentTime;
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
    this.gainNode.gain.linearRampToValueAtTime(targetGain, now + duration);
  }
}
