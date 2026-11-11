import React from 'react';
import { Clock, Check, Sparkles, Info, Play, Shield } from 'lucide-react';
import { YogaPose } from '../../types';
import { useWellness } from '../../context/WellnessContext';

interface PoseCardProps {
  pose: YogaPose;
  onOpenDetail: (pose: YogaPose) => void;
  onStartSession: (pose: YogaPose) => void;
}

export const PoseCard: React.FC<PoseCardProps> = ({
  pose,
  onOpenDetail,
  onStartSession,
}) => {
  const { togglePoseCompletion } = useWellness();

  return (
    <div
      className={`glass-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 relative group hover:shadow-neon ${
        pose.completed ? 'border-emerald-500/30 bg-[#121622]/80' : ''
      }`}
    >
      {/* Top Badges & Completion Check */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-900/40 text-purple-300 border border-purple-500/30">
            {pose.goal}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/5 text-text-muted border border-white/10">
            {pose.difficulty}
          </span>
        </div>

        {/* Checkbox button */}
        <button
          onClick={() => togglePoseCompletion(pose.id)}
          className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${
            pose.completed
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
              : 'bg-white/5 border-white/10 text-text-muted hover:border-purple-400/50 hover:text-white'
          }`}
          title={pose.completed ? 'Completed' : 'Mark as done'}
        >
          <Check className="w-4 h-4" />
        </button>
      </div>

      {/* Title & Sanskrit */}
      <div className="space-y-1 mb-4">
        <h3 className="font-serif text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
          {pose.englishName}
        </h3>
        <p className="font-serif italic text-sm text-purple-400/90">
          {pose.sanskritName}
        </p>
      </div>

      {/* Neurological Summary */}
      <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 mb-4">
        {pose.neurologicalBenefits}
      </p>

      {/* Meta duration & Target */}
      <div className="flex items-center justify-between text-xs text-text-muted border-t border-purple-900/20 pt-3 mb-5">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-purple-400" />
          {pose.durationMinutes} Min Session
        </span>
        <span className="text-[11px] text-purple-300/80">
          {pose.targetChakra}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-auto">
        <button
          onClick={() => onOpenDetail(pose)}
          className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-text-secondary hover:text-white transition-all"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Details</span>
        </button>

        <button
          onClick={() => onStartSession(pose)}
          className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-neon hover:scale-102 active:scale-98 transition-all"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Practice</span>
        </button>
      </div>
    </div>
  );
};

