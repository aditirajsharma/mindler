import React from 'react';
import { X, Sparkles, AlertTriangle, CheckCircle, Clock, Zap, BookOpen } from 'lucide-react';
import { YogaPose } from '../../types';

interface PoseDetailModalProps {
  pose: YogaPose | null;
  onClose: () => void;
  onStartSession: (pose: YogaPose) => void;
}

export const PoseDetailModal: React.FC<PoseDetailModalProps> = ({
  pose,
  onClose,
  onStartSession,
}) => {
  if (!pose) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0F0C1B] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-text-muted hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pb-6 border-b border-purple-900/30">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-900/50 border border-purple-500/30 text-purple-300">
              {pose.goal}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-text-secondary">
              {pose.difficulty}
            </span>
            <span className="flex items-center gap-1 text-xs text-text-muted pl-1">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              {pose.durationMinutes} Minutes
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white pt-1">
            {pose.englishName}
          </h2>
          <p className="font-serif italic text-base text-purple-400">
            {pose.sanskritName} {pose.targetChakra && `• Chakra: ${pose.targetChakra}`}
          </p>
        </div>

        {/* Content sections */}
        <div className="py-6 space-y-6">
          {/* Neurological Benefits */}
          <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-600/30 space-y-2">
            <div className="flex items-center space-x-2 text-purple-300 text-sm font-semibold">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>Neurological & Vagal Mechanism</span>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              {pose.neurologicalBenefits}
            </p>
          </div>

          {/* Alignment Instructions */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Somatic Alignment Steps
            </h4>
            <ol className="space-y-2.5">
              {pose.instructions.map((step, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-text-secondary">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-purple-900/50 text-purple-300 font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Anatomical Benefits */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Anatomical Benefits
            </h4>
            <ul className="space-y-2">
              {pose.anatomicalBenefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-text-secondary">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contraindications */}
          {pose.contraindications.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2">
              <div className="flex items-center space-x-2 text-amber-300 text-xs sm:text-sm font-semibold">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Contraindications & Safety Considerations</span>
              </div>
              <ul className="space-y-1">
                {pose.contraindications.map((contra, idx) => (
                  <li key={idx} className="text-xs text-amber-200/80">
                    • {contra}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-purple-900/30 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-white/10 text-text-secondary hover:text-white hover:bg-white/5 text-sm transition-all"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onStartSession(pose);
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold text-sm shadow-neon hover:scale-105 active:scale-95 transition-all"
          >
            Launch Guided Session
          </button>
        </div>
      </div>
    </div>
  );
};

