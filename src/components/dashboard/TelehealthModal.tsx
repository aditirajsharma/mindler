import React, { useState } from 'react';
import { X, Mic, MicOff, Video, VideoOff, PhoneOff, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';
import { Consultation } from '../../types';

interface TelehealthModalProps {
  consultation: Consultation;
  onClose: () => void;
}

export const TelehealthModal: React.FC<TelehealthModalProps> = ({ consultation, onClose }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0B0914] border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#120F1F] border-b border-purple-900/30">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                Telehealth Session • {consultation.doctorName}
              </h3>
              <p className="text-xs text-text-muted flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                HIPAA Secure Video Tunnel • AES-256 Bit Encrypted
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-text-muted hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Stage Area */}
        <div className="relative bg-black min-h-[380px] sm:min-h-[460px] flex items-center justify-center overflow-hidden">
          {/* Main Remote Video Mock */}
          <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-6">
            <img
              src={consultation.avatar}
              alt={consultation.doctorName}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-purple-500/40 shadow-neon mb-4 animate-float"
            />
            <h4 className="text-xl font-bold text-white">{consultation.doctorName}</h4>
            <p className="text-xs text-purple-300 max-w-sm mt-1">{consultation.credentials}</p>
            <span className="mt-3 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-600/40 text-xs text-purple-200">
              Session Live • Audio/Video Connected
            </span>
          </div>

          {/* Self PiP (Picture in Picture) */}
          <div className="absolute bottom-4 right-4 w-32 h-24 sm:w-44 sm:h-32 bg-[#181427] border border-purple-500/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-center p-2">
            {isVideoOff ? (
              <span className="text-xs text-text-muted">Camera Off</span>
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-purple-900/40 to-fuchsia-900/40 rounded-xl flex items-center justify-center">
                <span className="text-xs text-purple-300 font-semibold">You (Patient)</span>
              </div>
            )}
            <span className="absolute bottom-2 left-2 text-[10px] text-emerald-400 font-medium">
              Self Feed
            </span>
          </div>
        </div>

        {/* Control toolbar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#120F1F] border-t border-purple-900/30">
          <div className="text-xs text-text-muted hidden sm:block">
            Connected: {consultation.time}
          </div>

          {/* Center Call Controls */}
          <div className="flex items-center space-x-4 mx-auto sm:mx-0">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3.5 rounded-full border transition-all ${
                isMuted
                  ? 'bg-red-500/20 border-red-500 text-red-400'
                  : 'bg-white/10 border-white/10 text-white hover:bg-white/20'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-3.5 rounded-full border transition-all ${
                isVideoOff
                  ? 'bg-red-500/20 border-red-500 text-red-400'
                  : 'bg-white/10 border-white/10 text-white hover:bg-white/20'
              }`}
              title={isVideoOff ? 'Start Camera' : 'Stop Camera'}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-md transition-all flex items-center space-x-2"
              title="Leave Session"
            >
              <PhoneOff className="w-4 h-4" />
              <span>End Call</span>
            </button>
          </div>

          <div className="text-xs text-purple-300 hidden sm:block">
            Aftercare summary dispatches post-call
          </div>
        </div>
      </div>
    </div>
  );
};

