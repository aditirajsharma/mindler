import React from 'react';
import { AlertTriangle, Phone, MessageSquare, ShieldAlert } from 'lucide-react';

export const CrisisBanner: React.FC = () => {
  return (
    <section id="crisis" className="w-full my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/60 via-amber-900/30 to-amber-950/60 border border-amber-500/40 p-6 sm:p-8 shadow-amber-glow">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            {/* Left text */}
            <div className="flex items-start space-x-4 max-w-2xl">
              <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 shrink-0">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-base sm:text-lg font-bold text-amber-200">
                    Immediate Crisis & Emergency Support Available 24/7
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Free & Confidential
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed">
                  MindWell is a therapeutic companion and does not replace emergency medical interventions. If you or someone you know is in acute psychological distress, having thoughts of self-harm, or experiencing a psychiatric crisis, immediate compassionate help is standing by.
                </p>
              </div>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
              <a
                href="tel:988"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm shadow-md transition-all hover:scale-105"
              >
                <Phone className="w-4 h-4 fill-black" />
                <span>Call or Text 988</span>
              </a>
              <a
                href="sms:741741?&body=HOME"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 font-semibold text-sm transition-all"
              >
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>Text HOME to 741741</span>
              </a>
            </div>
          </div>

          {/* Background subtle glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

