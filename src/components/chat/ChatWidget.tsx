import React from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { ChatInterface } from './ChatInterface';

export const ChatWidget: React.FC = () => {
  const { isWidgetOpen, setIsWidgetOpen } = useChat();

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isWidgetOpen && (
          <button
            onClick={() => setIsWidgetOpen(true)}
            aria-label="Open Maya AI Companion"
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 via-purple-500 to-fuchsia-500 text-white shadow-neon hover:shadow-neon-strong transition-all duration-300 hover:scale-110 active:scale-95"
          >
            {/* Pulsing rings */}
            <span className="absolute -inset-1 rounded-full bg-purple-500/30 animate-ping pointer-events-none" />
            <MessageCircle className="w-6 h-6 transition-transform group-hover:rotate-12" />

            {/* Online badge */}
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#0A0A0F] rounded-full" />
          </button>
        )}
      </div>

      {/* Floating Chat Modal */}
      {isWidgetOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[620px] z-50 flex flex-col bg-[#0A0A0F]/95 backdrop-blur-xl sm:rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden transition-all duration-300">
          {/* Top Bar with Close */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#130F23] border-b border-purple-900/40">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="font-serif text-sm font-semibold text-white">
                Maya Companion
              </span>
            </div>
            <button
              onClick={() => setIsWidgetOpen(false)}
              className="p-1 rounded-lg text-text-muted hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close chat modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            <ChatInterface isModal={true} />
          </div>
        </div>
      )}
    </>
  );
};

