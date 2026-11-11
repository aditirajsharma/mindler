import { Consultation, MoodLog } from '../types';

export const INITIAL_MOOD_LOGS: MoodLog[] = [
  {
    id: 'm-1',
    date: '2026-11-05',
    time: '09:15 AM',
    score: 6,
    valence: 'restless',
    tags: ['Work deadline', 'Poor sleep'],
    note: 'Felt racing thoughts in the morning, calmed after Balasana.',
  },
  {
    id: 'm-2',
    date: '2026-11-06',
    time: '08:30 PM',
    score: 7,
    valence: 'calm',
    tags: ['Yoga Sanctuary', 'Evening walk'],
    note: 'Nervous system felt balanced and grounded after 15 mins of somatic breathwork.',
  },
  {
    id: 'm-3',
    date: '2026-11-07',
    time: '11:00 AM',
    score: 5,
    valence: 'overwhelmed',
    tags: ['Cognitive load', 'Meetings'],
    note: 'Overwhelmed mid-day. Chat with Maya helped me slow my breathing.',
  },
  {
    id: 'm-4',
    date: '2026-11-08',
    time: '07:45 AM',
    score: 8,
    valence: 'energized',
    tags: ['Morning flow', 'Good rest'],
    note: 'Deep REM sleep recorded, felt vibrant and focused.',
  },
  {
    id: 'm-5',
    date: '2026-11-09',
    time: '06:20 PM',
    score: 7,
    valence: 'peaceful',
    tags: ['Savasana', 'Hydration'],
    note: 'Peaceful evening after finishing work tasks early.',
  },
  {
    id: 'm-6',
    date: '2026-11-10',
    time: '02:15 PM',
    score: 8,
    valence: 'calm',
    tags: ['Mindful walk', 'Tea'],
    note: 'Steady energy throughout the afternoon with zero caffeine jitters.',
  },
  {
    id: 'm-7',
    date: '2026-11-11',
    time: '10:00 AM',
    score: 9,
    valence: 'energized',
    tags: ['Somatic balance', 'Positive outlook'],
    note: 'Centered, alert, and deeply aligned with daily intentions.',
  },
];

export const MOOD_TREND_7D = [
  { day: 'Thu', score: 6.2, nervousBalance: 65, baseline: 50 },
  { day: 'Fri', score: 7.0, nervousBalance: 72, baseline: 50 },
  { day: 'Sat', score: 5.5, nervousBalance: 58, baseline: 50 },
  { day: 'Sun', score: 8.1, nervousBalance: 84, baseline: 50 },
  { day: 'Mon', score: 7.4, nervousBalance: 78, baseline: 50 },
  { day: 'Tue', score: 8.0, nervousBalance: 82, baseline: 50 },
  { day: 'Wed', score: 8.8, nervousBalance: 90, baseline: 50 },
];

export const MOOD_TREND_30D = [
  { day: 'Wk 1', score: 6.4, nervousBalance: 68, baseline: 50 },
  { day: 'Wk 2', score: 6.9, nervousBalance: 73, baseline: 50 },
  { day: 'Wk 3', score: 7.5, nervousBalance: 80, baseline: 50 },
  { day: 'Wk 4', score: 8.4, nervousBalance: 88, baseline: 50 },
];

export const YOGA_WEEKLY_PRACTICE = [
  { day: 'Thu', minutes: 15, poses: 2 },
  { day: 'Fri', minutes: 25, poses: 3 },
  { day: 'Sat', minutes: 10, poses: 1 },
  { day: 'Sun', minutes: 30, poses: 4 },
  { day: 'Mon', minutes: 20, poses: 3 },
  { day: 'Tue', minutes: 25, poses: 3 },
  { day: 'Wed', minutes: 35, poses: 4 },
];

export const INITIAL_CONSULTATIONS: Consultation[] = [
  {
    id: 'c-1',
    doctorName: 'Dr. Elena Rostova, MD',
    credentials: 'Board-Certified Neuropsychiatrist (Johns Hopkins)',
    specialty: 'Trauma recovery & autonomic nervous system regulation',
    date: 'Tomorrow, Nov 12',
    time: '04:00 PM EST',
    type: 'Psychiatrist',
    status: 'Confirmed',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
  },
  {
    id: 'c-2',
    doctorName: 'Dr. Marcus Vance, Psy.D.',
    credentials: 'Licensed Clinical Somatic Psychologist',
    specialty: 'Somatic experiencing & cognitive behavioral therapy (CBT)',
    date: 'Nov 18, 2026',
    time: '02:30 PM EST',
    type: 'Psychologist',
    status: 'Confirmed',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
  },
];

