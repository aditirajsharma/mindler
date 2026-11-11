import React from 'react';
import { MessageSquare, Lock, Sparkles } from 'lucide-react';

export const WhatsAppPill: React.FC = () => {
  return (
    <a
      href="https://wa.me/"
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300 group shadow-[0_0_15px_rgba(16,185,129,0.15)]"
    >
      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
      <span className="text-xs font-semibold text-emerald-300">
        Chat via WhatsApp
      </span>
      <span className="text-[10px] text-emerald-400/70 border-l border-emerald-500/20 pl-2 flex items-center gap-1">
        <Lock className="w-2.5 h-2.5" /> End-to-End Encrypted
      </span>
    </a>
  );
};

