import React, { useState } from 'react';
import { X, Sparkles, Smile, Frown, Meh, Heart, Check } from 'lucide-react';
import { useWellness } from '../../context/WellnessContext';
import { MoodValence } from '../../types';

interface MoodLoggingModalProps {
  onClose: () => void;
}

const VALENCE_OPTIONS: { valence: MoodValence; label: string; emoji: string }[] = [
  { valence: 'overwhelmed', label: 'Overwhelmed', emoji: '😔' },
  { valence: 'restless', label: 'Restless', emoji: '😐' },
  { valence: 'anxious', label: 'Anxious', emoji: '😰' },
  { valence: 'calm', label: 'Calm', emoji: '🙂' },
  { valence: 'peaceful', label: 'Peaceful', emoji: '🧘' },
  { valence: 'energized', label: 'Energized', emoji: '😊' },
];

const COMMON_TAGS = [
  'Deep Sleep',
  'Work Stress',
  'Somatic Yoga',
  'Pranayama',
  'Healthy Nutrition',
  'Social Connection',
  'Overthinking',
  'Nature Walk',
];

export const MoodLoggingModal: React.FC<MoodLoggingModalProps> = ({ onClose }) => {
  const { addMoodLog } = useWellness();
  const [selectedValence, setSelectedValence] = useState<MoodValence>('calm');
  const [score, setScore] = useState<number>(7);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Somatic Yoga']);
  const [note, setNote] = useState<string>('');

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMoodLog({
      valence: selectedValence,
      score,
      tags: selectedTags,
      note: note.trim() || 'Logged daily somatic check-in.',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0E0B1A] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-text-muted hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 mb-6">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">
            Somatic Bio-Tracker
          </span>
          <h2 className="font-serif text-2xl font-bold text-white">
            Log Nervous System & Mood
          </h2>
          <p className="text-xs text-text-muted">
            Record how your autonomic state feels right now without judgment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Valence Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
              Primary Emotional Valence
            </label>
            <div className="grid grid-cols-3 gap-2">
              {VALENCE_OPTIONS.map((item) => (
                <button
                  type="button"
                  key={item.valence}
                  onClick={() => setSelectedValence(item.valence)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-xs font-semibold ${
                    selectedValence === item.valence
                      ? 'bg-purple-900/60 border-purple-400 text-white shadow-neon'
                      : 'bg-white/5 border-white/10 text-text-muted hover:border-purple-500/30'
                  }`}
                >
                  <span className="text-2xl mb-1">{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Score Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-purple-300">
                Nervous System Equilibrium (1 - 10)
              </label>
              <span className="text-sm font-bold text-purple-300 bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-800/40">
                {score} / 10
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={score}
              onChange={(e) => setScore(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-purple-950 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-[10px] text-text-muted mt-1">
              <span>Severe Distress (1)</span>
              <span>Neutral Balance (5)</span>
              <span>Optimal Coherence (10)</span>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
              Contributing Somatic Factors
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_TAGS.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      active
                        ? 'bg-purple-600/40 border-purple-400 text-purple-200'
                        : 'bg-white/5 border-white/10 text-text-muted hover:border-purple-500/20'
                    }`}
                  >
                    {active ? `✓ ${tag}` : tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reflection note */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
              Reflective Notes
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Notice where tension is held in your body (jaw, shoulders, breath cadence)..."
              className="w-full bg-[#151124] border border-purple-500/25 rounded-2xl p-3 text-sm text-white placeholder-text-muted focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-text-secondary hover:text-white text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-neon hover:scale-102 transition-all"
            >
              Save Somatic Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

