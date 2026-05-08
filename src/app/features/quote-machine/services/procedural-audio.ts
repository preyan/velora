export type AudioTrack =
  | 'rain' | 'piano' | 'cosmic'
  | 'wind' | 'ocean' | 'forest'
  | 'thunder' | 'bells' | 'drone'
  | 'stream' | 'meditation' | 'aurora'
  | 'birds' | 'fireplace' | 'nebula';

export class ProceduralAudioGenerator {
  private context: AudioContext;
  private masterGain: GainNode;
  private activeOscillators: OscillatorNode[] = [];
  private activeSources: AudioBufferSourceNode[] = [];
  private intervals: number[] = [];

  constructor(context: AudioContext) {
    this.context = context;
    this.masterGain = context.createGain();
    this.masterGain.connect(context.destination);
  }

  stopAll(): void {
    this.activeOscillators.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {}
    });
    this.activeSources.forEach(src => {
      try {
        src.stop();
      } catch (e) {}
    });
    this.intervals.forEach(id => {
      clearInterval(id);
      clearTimeout(id);
    });

    this.activeOscillators = [];
    this.activeSources = [];
    this.intervals = [];
  }

  createRain(): AudioNode {
    return this.createFilteredNoise(800, 0.3, 'highpass');
  }

  createWind(): AudioNode {
    return this.createFilteredNoise(200, 0.25, 'lowpass');
  }

  createOcean(): AudioNode {
    const gain = this.context.createGain();
    gain.gain.value = 0.25;
    gain.connect(this.masterGain);

    const waves = this.createFilteredNoise(300, 0.4, 'highpass');
    waves.connect(gain);

    const lowFreq = this.createSineOscillator(0.5, 50, 0.15);
    lowFreq.connect(gain);

    return gain;
  }

  createForest(): AudioNode {
    const gain = this.context.createGain();
    gain.gain.value = 0.2;
    gain.connect(this.masterGain);

    const rustling = this.createFilteredNoise(2000, 0.3, 'highpass');
    rustling.connect(gain);

    const birds = this.createBirdSounds();
    birds.connect(gain);

    return gain;
  }

  createThunder(): AudioNode {
    const gain = this.context.createGain();
    gain.gain.value = 0.2;
    gain.connect(this.masterGain);

    const id = setInterval(() => {
      const noise = this.createFilteredNoise(3000, 0.4, 'highpass');
      noise.connect(gain);

      setTimeout(() => {
        const lowThunder = this.createSineOscillator(0.1, 40, 0.3);
        lowThunder.connect(gain);
      }, 500);
    }, 8000);

    this.intervals.push(id);
    return gain;
  }

  createPiano(): AudioNode {
    const notes = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88];
    const gain = this.context.createGain();
    gain.gain.value = 0.2;
    gain.connect(this.masterGain);

    const playNote = (frequency: number, startTime: number, duration: number) => {
      const osc = this.context.createOscillator();
      const env = this.context.createGain();

      osc.frequency.value = frequency;
      osc.type = 'sine';

      env.gain.setValueAtTime(0.4, startTime);
      env.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

      osc.connect(env);
      env.connect(gain);

      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const id = setInterval(() => {
      const note = notes[Math.floor(Math.random() * notes.length)];
      playNote(note, this.context.currentTime + 0.1, 2);
    }, 3000);

    this.intervals.push(id);
    return gain;
  }

  createBells(): AudioNode {
    const gain = this.context.createGain();
    gain.gain.value = 0.15;
    gain.connect(this.masterGain);

    const playBell = (frequency: number) => {
      const osc = this.context.createOscillator();
      const env = this.context.createGain();
      const filter = this.context.createBiquadFilter();

      osc.frequency.value = frequency;
      osc.type = 'triangle';
      filter.type = 'highpass';
      filter.frequency.value = frequency * 2;

      env.gain.setValueAtTime(0.5, this.context.currentTime);
      env.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 4);

      osc.connect(filter);
      filter.connect(env);
      env.connect(gain);

      osc.start();
      osc.stop(this.context.currentTime + 4);
    };

    const id = setInterval(() => {
      playBell(440 + Math.random() * 200);
    }, 5000);

    this.intervals.push(id);
    return gain;
  }

  createDrone(): AudioNode {
    const gain = this.context.createGain();
    gain.gain.value = 0.2;
    gain.connect(this.masterGain);

    const baseFreq = 110;
    [0, 1, 2, 3].forEach((i) => {
      const osc = this.context.createOscillator();
      const oscGain = this.context.createGain();

      osc.frequency.value = baseFreq * (i + 1);
      osc.type = 'sine';
      oscGain.gain.value = 0.1;

      osc.connect(oscGain);
      oscGain.connect(gain);
      osc.start();
    });

    return gain;
  }

  createStream(): AudioNode {
    return this.createFilteredNoise(1500, 0.28, 'bandpass');
  }

  createMeditation(): AudioNode {
    const gain = this.context.createGain();
    gain.gain.value = 0.18;
    gain.connect(this.masterGain);

    const slowBowl = this.createSineOscillator(0.2, 136.1, 0.2);
    slowBowl.connect(gain);

    const medNoise = this.createFilteredNoise(600, 0.15, 'highpass');
    medNoise.connect(gain);

    return gain;
  }

  createAurora(): AudioNode {
    const gain = this.context.createGain();
    gain.gain.value = 0.2;
    gain.connect(this.masterGain);

    [60, 120, 240].forEach((freq) => {
      const osc = this.context.createOscillator();
      const oscGain = this.context.createGain();
      const lfo = this.context.createOscillator();
      const lfoGain = this.context.createGain();

      osc.frequency.value = freq;
      osc.type = 'sine';
      oscGain.gain.value = 0.08;

      lfo.frequency.value = 0.3 + Math.random() * 0.2;
      lfoGain.gain.value = 30;

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      osc.connect(oscGain);
      oscGain.connect(gain);

      osc.start();
      lfo.start();
    });

    return gain;
  }

  createBirds(): AudioNode {
    return this.createBirdSounds();
  }

  createCosmic(): AudioNode {
    const gain = this.context.createGain();
    gain.gain.value = 0.25;
    gain.connect(this.masterGain);

    const frequencies = [27.5, 55, 110, 220];
    frequencies.forEach((freq) => {
      const osc = this.context.createOscillator();
      const oscGain = this.context.createGain();

      osc.frequency.value = freq;
      osc.type = 'sine';
      oscGain.gain.value = 0.15 / frequencies.length;

      const lfo = this.context.createOscillator();
      const lfoGain = this.context.createGain();

      lfo.frequency.value = 0.5 + Math.random() * 0.5;
      lfoGain.gain.value = 50;

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      osc.connect(oscGain);
      oscGain.connect(gain);

      osc.start(0);
      lfo.start(0);
    });

    return gain;
  }

  createFireplace(): AudioNode {
    const gain = this.context.createGain();
    gain.gain.value = 0.22;
    gain.connect(this.masterGain);

    const crackle = this.createFilteredNoise(4000, 0.25, 'highpass');
    crackle.connect(gain);

    const lowRumble = this.createSineOscillator(0.5, 60, 0.15);
    lowRumble.connect(gain);

    return gain;
  }

  createNebula(): AudioNode {
    const gain = this.context.createGain();
    gain.gain.value = 0.2;
    gain.connect(this.masterGain);

    const deepSpace = this.createSineOscillator(0.15, 27.5, 0.25);
    deepSpace.connect(gain);

    const shimmer = this.createFilteredNoise(8000, 0.1, 'highpass');
    shimmer.connect(gain);

    return gain;
  }

  private createFilteredNoise(frequency: number, volume: number, type: BiquadFilterType): AudioNode {
    const bufferSize = this.context.sampleRate * 2;
    const noiseBuffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = this.context.createBufferSource();
    source.buffer = noiseBuffer;
    source.loop = true;

    const filter = this.context.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = frequency;
    filter.Q.value = 1;

    const gain = this.context.createGain();
    gain.gain.value = volume;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    source.start(0);
    this.activeSources.push(source);
    return gain;
  }

  private createSineOscillator(lfoFreq: number, baseFreq: number, volume: number): AudioNode {
    const osc = this.context.createOscillator();
    const oscGain = this.context.createGain();
    const lfo = this.context.createOscillator();
    const lfoGain = this.context.createGain();

    osc.frequency.value = baseFreq;
    osc.type = 'sine';
    oscGain.gain.value = volume;

    lfo.frequency.value = lfoFreq;
    lfoGain.gain.value = baseFreq * 0.1;

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);

    osc.start();
    lfo.start();

    this.activeOscillators.push(osc, lfo);
    return oscGain;
  }

  private createBirdSounds(): AudioNode {
    const gain = this.context.createGain();
    gain.gain.value = 0.15;
    gain.connect(this.masterGain);

    const chirp = () => {
      const osc = this.context.createOscillator();
      const env = this.context.createGain();

      osc.frequency.setValueAtTime(2000 + Math.random() * 2000, this.context.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.context.currentTime + 0.3);
      osc.type = 'sine';

      env.gain.setValueAtTime(0.3, this.context.currentTime);
      env.gain.exponentialRampToValueAtTime(0.0001, this.context.currentTime + 0.3);

      osc.connect(env);
      env.connect(gain);

      osc.start();
      osc.stop(this.context.currentTime + 0.3);
    };

    const scheduleNextChirp = () => {
      const delay = 2000 + Math.random() * 3000;
      const id = setTimeout(() => {
        chirp();
        scheduleNextChirp();
      }, delay);
      this.intervals.push(id);
    };

    scheduleNextChirp();
    return gain;
  }

  getMasterGain(): GainNode {
    return this.masterGain;
  }
}
