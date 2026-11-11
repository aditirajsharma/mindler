import React from 'react';
import { Sparkles, Shield, HeartHandshake, PhoneCall } from 'lucide-react';
import { ChatInterface } from '../components/chat/ChatInterface';

export const ChatPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in flex flex-col h-[calc(100vh-5rem)]">
      {/* Intro info bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-purple-900/30">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
            Maya AI Somatic Sanctuary
            <span className="text-[10px] font-sans px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-600/40 text-purple-300">
              Interactive Session
            </span>
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Compassionate dialogue powered by polyvagal science and clinical sentiment safeguards.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-text-muted">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
            <Shield className="w-3.5 h-3.5" /> Zero-Knowledge Encrypted
          </span>
          <a
            href="tel:988"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 hover:bg-amber-900/50"
          >
            <PhoneCall className="w-3.5 h-3.5" /> 988 Lifeline
          </a>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 overflow-hidden min-h-0">
        <ChatInterface isModal={false} />
      </div>
    </div>
  );
};

