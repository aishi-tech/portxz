export interface SceneInfo {
  id: string;
  number: number;
  name: string;
  startTime: number;
  endTime: number;
  duration: number;
  caption: string;
  voiceover: string;
  description: string;
}

export const SCENES: SceneInfo[] = [
  {
    id: 'scene-1',
    number: 1,
    name: 'The Desync Nightmare',
    startTime: 0,
    endTime: 3,
    duration: 3,
    caption: '3 versions of you. None current.',
    voiceover: 'Portfolio, resume, README — all out of date?',
    description: 'Three floating browser windows flicker and glitch out of sync with an alarming red warning glow.',
  },
  {
    id: 'scene-2',
    number: 2,
    name: 'The Reveal & Singularity',
    startTime: 3,
    endTime: 6,
    duration: 3,
    caption: 'Meet Portxz.',
    voiceover: 'Meet Portxz. One profile.',
    description: 'Windows collapse into a single glowing blue-purple rounded "P" logo with an explosive shockwave.',
  },
  {
    id: 'scene-3',
    number: 3,
    name: 'The Sync Engine in Action',
    startTime: 6,
    endTime: 11,
    duration: 5,
    caption: 'Edit once → update everywhere',
    voiceover: 'Edit once — your portfolio, resume PDF, and GitHub README update together.',
    description: 'Fast cuts: Claim username, project cards fly in, 3 themes morph, and 3 screens light up in sync.',
  },
  {
    id: 'scene-4',
    number: 4,
    name: 'End Card & Call to Action',
    startTime: 11,
    endTime: 15,
    duration: 4,
    caption: 'Claim your username — free',
    voiceover: 'Live in three minutes. Start free — Pro just 49 rupees for the first 50 users.',
    description: 'Sleek dark navy end card with glowing P logo, live banner, and electric blue CTA button.',
  },
];

export const TOTAL_DURATION = 15; // 15 seconds
