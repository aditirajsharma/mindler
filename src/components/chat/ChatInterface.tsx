import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Sparkles, AlertCircle, RotateCcw, Heart, ArrowRight } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useNavigate } from 'react-router-dom';

interface ChatInterfaceProps {
  isModal?: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ isModal = false }) => {
  const { messages, sendMessage, isTyping, clearChat, isListening, toggleListening } = useChat();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  const handleChipClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <div className={`flex flex-col h-full bg-[#0D0B16] ${isModal ? '' : 'rounded-2xl border border-purple-500/20 shadow-2xl'}`}>
      {/* Top Header inside Interface */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-purple-900/30 bg-[#120F1F]">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 p-[1px]">
              <div className="w-full h-full bg-[#151221] rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-300" />
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#120F1F] rounded-full" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-1.5">
              Maya AI Companion
              <span className="text-[10px] font-sans font-medium px-2 py-0.5 rounded-full bg-purple-900/50 text-purple-300 border border-purple-600/30">
                Somatic Triage
              </span>
            </h3>
            <p className="text-xs text-text-muted">
              {isListening ? 'Listening to voice...' : isTyping ? 'Maya is reflecting...' : 'Online • Clinical Sanctuary'}
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="p-2 text-text-muted hover:text-purple-300 hover:bg-white/5 rounded-lg transition-colors text-xs flex items-center gap-1"
          title="Restart Conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-700 to-fuchsia-600 text-white rounded-br-sm shadow-neon'
                  : 'bg-[#181427] border border-purple-500/25 text-[#E6E1F7] rounded-bl-sm shadow-card-glow'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>

              {/* Crisis alert direct action */}
              {msg.isCrisisAlert && (
                <div className="mt-3 pt-3 border-t border-amber-500/30 flex flex-wrap gap-2">
                  <a
                    href="tel:988"
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-500 text-black text-xs font-bold shadow-md hover:bg-amber-400"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Call 988 Lifeline</span>
                  </a>
                  <a
                    href="sms:741741?&body=HOME"
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-950 border border-amber-500/50 text-amber-300 text-xs font-medium"
                  >
                    <span>Text HOME (741741)</span>
                  </a>
                </div>
              )}

              {/* Yoga recommendation direct button */}
              {msg.yogaRecommendation && (
                <div className="mt-3 pt-3 border-t border-purple-500/20">
                  <button
                    onClick={() => navigate('/yoga')}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-purple-900/50 border border-purple-500/40 text-purple-200 text-xs font-medium hover:bg-purple-800/60 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Open in Yoga Sanctuary</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            <span className="text-[10px] text-text-muted mt-1 px-1">
              {msg.timestamp}
            </span>

            {/* Quick Suggestions Chips */}
            {msg.sender === 'bot' && msg.suggestions && msg.suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 max-w-[85%]">
                {msg.suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChipClick(suggestion)}
                    className="text-xs px-3 py-1.5 rounded-full bg-purple-950/40 border border-purple-600/30 text-purple-300 hover:bg-purple-900/50 hover:border-purple-400/60 transition-all text-left"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center space-x-2 text-purple-400 bg-[#181427] border border-purple-500/20 px-4 py-3 rounded-2xl w-24">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice listening pulse banner */}
      {isListening && (
        <div className="px-4 py-2 bg-gradient-to-r from-purple-900/80 to-fuchsia-900/80 border-t border-purple-500/30 flex items-center justify-between text-xs text-purple-200">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span>Listening to voice... Speak naturally.</span>
          </div>
          <button
            onClick={toggleListening}
            className="text-xs underline text-purple-300 hover:text-white"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-purple-900/30 bg-[#120F1F]">
        <div className="flex items-center space-x-2">
          {/* Voice input button */}
          <button
            type="button"
            onClick={toggleListening}
            className={`p-2.5 rounded-xl border transition-all ${
              isListening
                ? 'bg-red-600/20 border-red-500 text-red-400 animate-pulse'
                : 'bg-purple-950/40 border-purple-700/30 text-purple-400 hover:bg-purple-900/40 hover:text-purple-300'
            }`}
            title="Simulated Voice Input"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Share what is on your mind or in your body..."
            className="flex-1 bg-[#181427] border border-purple-500/25 rounded-xl px-4 py-2.5 text-sm text-white placeholder-text-muted focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:hover:bg-purple-600 text-white shadow-neon transition-all hover:scale-105 active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

