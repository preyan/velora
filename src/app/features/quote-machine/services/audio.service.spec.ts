import { TestBed } from '@angular/core/testing';
import { AudioService } from './audio.service';

describe('AudioService', () => {
  let service: AudioService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [AudioService],
    });
    service = TestBed.inject(AudioService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should initialize with default mute state from localStorage', () => {
    expect(service.isMuted()).toBe(false);
  });

  it('should load muted state from localStorage', () => {
    localStorage.clear();
    localStorage.setItem('velora-muted', 'true');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [AudioService],
    });
    const newService = TestBed.inject(AudioService);
    expect(newService.isMuted()).toBe(true);
  });

  it('should have default current track as rain', () => {
    expect(service.currentTrack()).toBe('rain');
  });

  it('should have default playing state as false', () => {
    expect(service.isPlaying()).toBe(false);
  });

  it('should toggle mute state', () => {
    expect(service.isMuted()).toBe(false);
    service.toggleMute();
    expect(service.isMuted()).toBe(true);
    service.toggleMute();
    expect(service.isMuted()).toBe(false);
  });

  it('should persist muted state to localStorage', () => {
    service.toggleMute();
    expect(localStorage.getItem('velora-muted')).toBe('true');
    service.toggleMute();
    expect(localStorage.getItem('velora-muted')).toBe('false');
  });

  it('should accept valid track types', () => {
    const validTracks = ['rain', 'piano', 'cosmic'] as const;
    validTracks.forEach((track) => {
      expect(() => service.switchTrack(track)).not.toThrow();
    });
  });

  it('should not switch to same track', () => {
    const initialTrack = service.currentTrack();
    service.switchTrack(initialTrack);
    expect(service.currentTrack()).toBe(initialTrack);
  });

  it('should handle play without initialization gracefully', () => {
    expect(() => service.play()).not.toThrow();
  });

  it('should handle stop without initialization gracefully', () => {
    expect(() => service.stop()).not.toThrow();
  });

  it('should listen for click event to initialize audio', () => {
    const clickEvent = new MouseEvent('click');
    spyOn(document, 'addEventListener');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [AudioService],
    });
    TestBed.inject(AudioService);
    expect(document.addEventListener).toHaveBeenCalledWith(
      'click',
      jasmine.any(Function),
      jasmine.objectContaining({ once: true })
    );
  });

  it('should listen for keydown event to initialize audio', () => {
    spyOn(document, 'addEventListener');
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [AudioService],
    });
    TestBed.inject(AudioService);
    expect(document.addEventListener).toHaveBeenCalledWith(
      'keydown',
      jasmine.any(Function),
      jasmine.objectContaining({ once: true })
    );
  });
});
