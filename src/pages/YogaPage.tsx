import React, { useState, useMemo } from 'react';
import { Sparkles, Flame, CheckCircle, Filter, RotateCcw, Activity } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import { YogaGoal, YogaDifficulty, YogaPose } from '../types';
import { PoseCard } from '../components/yoga/PoseCard';
import { PoseDetailModal } from '../components/yoga/PoseDetailModal';
import { GuidedSessionModal } from '../components/yoga/GuidedSessionModal';

export const YogaPage: React.FC = () => {
  const { poses, completedPosesCount, totalPosesCount, streakDays } = useWellness();

  // Filters
  const [selectedGoal, setSelectedGoal] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  // Modals
  const [detailPose, setDetailPose] = useState<YogaPose | null>(null);
  const [sessionPose, setSessionPose] = useState<YogaPose | null>(null);

  const goalOptions: (YogaGoal | 'All')[] = ['All', 'Stress Relief', 'Sleep', 'Focus', 'Energy'];
  const difficultyOptions: (YogaDifficulty | 'All')[] = ['All', 'Beginner', 'Intermediate'];

  const filteredPoses = useMemo(() => {
    return poses.filter((pose) => {
      const matchGoal = selectedGoal === 'All' || pose.goal === selectedGoal;
      const matchDiff = selectedDifficulty === 'All' || pose.difficulty === selectedDifficulty;
      return matchGoal && matchDiff;
    });
  }, [poses, selectedGoal, selectedDifficulty]);

  const completionPercent = Math.round((completedPosesCount / totalPosesCount) * 100) || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-purple-900/30">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/60 border border-purple-800/40 text-purple-300">
              Somatic Neuro-Regulation
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Yoga Sanctuary
          </h1>
          <p className="text-sm text-text-secondary max-w-xl">
            Gentle somatic postures and pranayama breathing cycles clinically calibrated to reset your vagal tone, discharge nervous tension, and restore restorative rest.
          </p>
        </div>

        {/* Somatic Progress Strip */}
        <div className="p-4 sm:p-5 rounded-2xl glass-card flex flex-col sm:flex-row items-center gap-5 sm:min-w-[340px]">
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">Daily Somatic Practice</span>
              <span className="text-purple-300 font-bold">
                {completedPosesCount} of {totalPosesCount} completed
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2.5 bg-purple-950/80 rounded-full overflow-hidden border border-purple-800/30">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs font-bold text-orange-400 bg-orange-950/40 border border-orange-500/30 px-3 py-2 rounded-xl whitespace-nowrap">
            <Flame className="w-4 h-4 fill-orange-400" />
            <span>{streakDays}d Streak</span>
          </div>
        </div>
      </div>

      {/* Filter and Sort Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#120F1F] border border-purple-900/30">
        {/* Goal Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-text-muted flex items-center gap-1.5 mr-1">
            <Filter className="w-3.5 h-3.5" /> Goal:
          </span>
          {goalOptions.map((goal) => (
            <button
              key={goal}
              onClick={() => setSelectedGoal(goal)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedGoal === goal
                  ? 'bg-purple-600 text-white shadow-neon border border-purple-400'
                  : 'bg-white/5 border border-white/10 text-text-secondary hover:text-white'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-text-muted">Difficulty:</span>
          {difficultyOptions.map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedDifficulty === diff
                  ? 'bg-purple-600 text-white shadow-neon border border-purple-400'
                  : 'bg-white/5 border border-white/10 text-text-secondary hover:text-white'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Postures Library Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPoses.map((pose) => (
          <PoseCard
            key={pose.id}
            pose={pose}
            onOpenDetail={(p) => setDetailPose(p)}
            onStartSession={(p) => setSessionPose(p)}
          />
        ))}
      </div>

      {/* Modals */}
      {detailPose && (
        <PoseDetailModal
          pose={detailPose}
          onClose={() => setDetailPose(null)}
          onStartSession={(p) => {
            setDetailPose(null);
            setSessionPose(p);
          }}
        />
      )}

      {sessionPose && (
        <GuidedSessionModal
          initialPose={sessionPose}
          allPoses={poses}
          onClose={() => setSessionPose(null)}
        />
      )}
    </div>
  );
};

