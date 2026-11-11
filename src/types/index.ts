export type MoodValence = 'overwhelmed' | 'restless' | 'calm' | 'energized' | 'anxious' | 'peaceful';

export interface MoodLog {
  id: string;
  date: string; // e.g. "2026-11-11"
  time: string;
  score: number; // 1 - 10
  valence: MoodValence;
  tags: string[];
  note: string;
}

export type YogaGoal = 'Stress Relief' | 'Sleep' | 'Focus' | 'Energy';
export type YogaDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface BreathingCue {
  phase: 'Inhale' | 'Hold' | 'Exhale' | 'Rest';
  durationSeconds: number;
  instruction: string;
}

export interface YogaPose {
  id: string;
  englishName: string;
  sanskritName: string;
  goal: YogaGoal;
  difficulty: YogaDifficulty;
  durationMinutes: number;
  targetChakra?: string;
  neurologicalBenefits: string;
  anatomicalBenefits: string[];
  instructions: string[];
  contraindications: string[];
  breathingPattern: BreathingCue[];
  completed: boolean;
  imageUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestions?: string[];
  isCrisisAlert?: boolean;
  yogaRecommendation?: string;
}

export interface Consultation {
  id: string;
  doctorName: string;
  credentials: string;
  specialty: string;
  date: string;
  time: string;
  type: 'Psychiatrist' | 'Psychologist';
  status: 'Confirmed' | 'Completed' | 'Pending';
  avatar: string;
}

export interface FAQCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
}

export interface FAQItem {
  id: string;
  categoryId: string;
  question: string;
  answer: string;
  tags: string[];
}

