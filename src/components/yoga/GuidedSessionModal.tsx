import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Check, Sparkles, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { YogaPose } from '../../types';
import { useWellness } from '../../context/WellnessContext';

interface GuidedSessionModalProps {
  initialPose: YogaPose;
  allPoses: YogaPose[];
  onClose: () => void;
}

export const GuidedSessionModal: React.FC<GuidedSessionModalProps> = ({
  initialPose,
  allPoses,
  onClose,
}) => {
  const { togglePoseCompletion } = useWellness();
  const [currentPoseIndex, setCurrentPoseIndex] = useState(() => {
    const idx = allPoses.findIndex((p) => p.id === initialPose.id);
    return idx >= 0 ? idx : 0;
  });

  const pose = allPoses[currentPoseIndex];

  // Timer states (total duration in seconds)
  const totalDurationSeconds = pose.durationMinutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState(totalDurationSeconds);
  const [isRunning, setIsRunning] = useState(true);

  // Breathing loop state
  const breathingPattern = pose.breathingPattern || [
    { phase: 'Inhale', durationSeconds: 4, instruction: 'Expand the chest deeply' },
    { phase: 'Hold', durationSeconds: 2, instruction: 'Retain soft awareness' },
    { phase: 'Exhale', durationSeconds: 6, instruction: 'Release all bodily tension' },
    { phase: 'Rest', durationSeconds: 2, instruction: 'Rest in pure stillness' },
  ];

  const totalCycleSeconds = breathingPattern.reduce((acc, cur) => acc + cur.durationSeconds, 0);
  const [cycleTime, setCycleTime] = useState(0);

  // Determine current breathing cue
  let accumulated = 0;
  let activeCue = breathingPattern[0];
  for (const cue of breathingPattern) {
    if (cycleTime < accumulated + cue.durationSeconds) {
      activeCue = cue;
      break;
    }
    accumulated += cue.durationSeconds;
  }

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });

        setCycleTime((prev) => (prev + 1) % totalCycleSeconds);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsRemaining, totalCycleSeconds]);

  // When pose changes, reset timer
  useEffect(() => {
    setSecondsRemaining(pose.durationMinutes * 60);
    setCycleTime(0);
    setIsRunning(true);
  }, [currentPoseIndex, pose]);

  const handleComplete = () => {
    setIsRunning(false);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#A855F7', '#C084FC', '#E879F9', '#38BDF8', '#34D399'],
    });
    if (!pose.completed) {
      togglePoseCompletion(pose.id);
    }
  };

  const handleReset = () => {
    setSecondsRemaining(pose.durationMinutes * 60);
    setCycleTime(0);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercentage = ((totalDurationSeconds - secondsRemaining) / totalDurationSeconds) * 100;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#0D0A18] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-text-muted hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close session"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="space-y-1 mt-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-purple-400 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-800/40">
            Pranayama Somatic Pacing • {pose.goal}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white pt-2">
            {pose.englishName}
          </h2>
          <p className="font-serif italic text-sm text-purple-300">
            {pose.sanskritName}
          </p>
        </div>

        {/* Circular Timer Ring with Breath Pulser */}
        <div className="relative my-8 flex items-center justify-center">
          {/* Animated breath pulse halo */}
          <div
            className={`absolute rounded-full transition-all duration-1000 ${
              activeCue.phase === 'Inhale'
                ? 'w-64 h-64 bg-purple-500/20 scale-110 shadow-neon'
                : activeCue.phase === 'Hold'
                ? 'w-60 h-60 bg-fuchsia-500/25 scale-105'
                : 'w-48 h-48 bg-purple-900/10 scale-95'
            }`}
          />

          <svg className="w-56 h-56 transform -rotate-90">
            {/* Background ring */}
            <circle
              cx="112"
              cy="112"
              r={radius}
              stroke="rgba(168, 85, 247, 0.15)"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Progress ring with glow */}
            <circle
              cx="112"
              cy="112"
              r={radius}
              stroke="url(#purpleGradient)"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-300"
            />
            <defs>
              <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#9333EA" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Content */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-wider">
              {formatTime(secondsRemaining)}
            </span>
            <span
              className={`text-xs font-bold uppercase tracking-wider mt-1 px-2.5 py-0.5 rounded-full transition-colors ${
                activeCue.phase === 'Inhale'
                  ? 'bg-purple-500/30 text-purple-200'
                  : activeCue.phase === 'Hold'
                  ? 'bg-fuchsia-500/30 text-fuchsia-200'
                  : 'bg-indigo-500/30 text-indigo-200'
              }`}
            >
              {activeCue.phase}
            </span>
          </div>
        </div>

        {/* Real-time Breath Cue instruction */}
        <div className="w-full max-w-md bg-[#151124] border border-purple-500/20 rounded-2xl p-4 text-center space-y-1 mb-6">
          <p className="text-sm font-semibold text-purple-200">
            {activeCue.instruction}
          </p>
          <p className="text-xs text-text-muted">
            Vagal down-regulation active • Synchronize breath cadence
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentPoseIndex((prev) => (prev > 0 ? prev - 1 : allPoses.length - 1))}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-colors"
            title="Previous Pose"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-4 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-600 text-white shadow-neon hover:scale-105 active:scale-95 transition-all"
            title={isRunning ? 'Pause' : 'Resume'}
          >
            {isRunning ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white translate-x-0.5" />}
          </button>

          <button
            onClick={handleReset}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => setCurrentPoseIndex((prev) => (prev < allPoses.length - 1 ? prev + 1 : 0))}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-colors"
            title="Next Pose"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Complete button */}
        <button
          onClick={handleComplete}
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center space-x-2 ${
            pose.completed
              ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-300'
              : 'bg-purple-900/40 border border-purple-500/40 text-purple-200 hover:bg-purple-800/50'
          }`}
        >
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{pose.completed ? 'Pose Completed Today' : 'Mark as Complete & Celebrate'}</span>
        </button>
      </div>
    </div>
  );
};

