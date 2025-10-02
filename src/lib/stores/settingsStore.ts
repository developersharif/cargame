import { writable } from 'svelte/store';

export type Quality = 'low' | 'medium' | 'high' | 'ultra';

export interface GameSettings {
  graphics: {
    quality: Quality;
    shadows: boolean;
    reflections: boolean;
    particles: boolean;
    antialiasing: boolean;
    resolution: number; // 0.5..1.5 multiplier
  };
  audio: {
    master: number;
    effects: number;
    music: number;
    engine: number;
    spatial: boolean;
  };
  controls: {
    sensitivity: number;
  };
  gameplay: {
    difficulty: 'easy' | 'normal' | 'hard' | 'extreme';
    assists: {
      autoBreak: boolean;
      steeringAssist: boolean;
      stabilization: boolean;
    };
    camera: 'chase' | 'hood' | 'cockpit' | 'cinematic';
    gameMode: 'sunny' | 'cloudy' | 'horror';
  };
}

const defaultSettings: GameSettings = {
  graphics: {
    quality: 'medium',
    shadows: true,
    reflections: true,
    particles: true,
    antialiasing: true,
    resolution: 1
  },
  audio: { master: 0.7, effects: 0.65, music: 0.45, engine: 0.65, spatial: true },
  controls: { sensitivity: 1 },
  gameplay: {
    difficulty: 'normal',
    assists: { autoBreak: false, steeringAssist: true, stabilization: true },
    camera: 'chase',
    gameMode: 'sunny'
  }
};

export const settings = writable<GameSettings>(defaultSettings);
