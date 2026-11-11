import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, ExternalLink, Phone, MessageSquare, CheckCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#07070B] border-t border-purple-900/30 pt-16 pb-12 text-text-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/5">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">MindWell</span>
            </Link>
            <p className="text-sm text-text-muted max-w-sm leading-relaxed">
              Elevating mental health and nervous system restoration into an accessible, somatic sanctuary. Powered by evidence-based clinical triage and the restorative wisdom of restorative yoga.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs text-purple-300/80">
              <span className="px-2.5 py-1 rounded-md bg-purple-950/40 border border-purple-800/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> HIPAA Compliant
              </span>
              <span className="px-2.5 py-1 rounded-md bg-purple-950/40 border border-purple-800/30 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-purple-400" /> SOC-2 Type II
              </span>
              <span className="px-2.5 py-1 rounded-md bg-purple-950/40 border border-purple-800/30 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-purple-400" /> IAYT Accredited
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">Sanctuary Care</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/chat" className="hover:text-purple-300 transition-colors">Maya AI Companion</Link>
              </li>
              <li>
                <Link to="/yoga" className="hover:text-purple-300 transition-colors">Somatic Yoga Library</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-purple-300 transition-colors">Personal Wellness Dashboard</Link>
              </li>
              <li>
                <a href="#faq" className="hover:text-purple-300 transition-colors">Frequently Asked Questions</a>
              </li>
              <li>
                <a href="#crisis" className="hover:text-amber-400 transition-colors font-medium">Emergency Crisis Lifeline</a>
              </li>
            </ul>
          </div>

          {/* Clinical Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">Clinical Solutions</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-text-muted hover:text-white transition-colors cursor-pointer">Board-Certified Psychiatry</span>
              </li>
              <li>
                <span className="text-text-muted hover:text-white transition-colors cursor-pointer">Somatic Psychotherapy</span>
              </li>
              <li>
                <span className="text-text-muted hover:text-white transition-colors cursor-pointer">Pranayama Vagal Biofeedback</span>
              </li>
              <li>
                <span className="text-text-muted hover:text-white transition-colors cursor-pointer">Student 30% Concession Pool</span>
              </li>
              <li>
                <span className="text-text-muted hover:text-white transition-colors cursor-pointer">Aftercare Encrypted Summaries</span>
              </li>
            </ul>
          </div>

          {/* Direct WhatsApp & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">24/7 Connect</h4>
            <p className="text-xs text-text-muted">
              Connect securely via WhatsApp for instant somatic check-ins or reach our clinical intake desk.
            </p>
            <div className="space-y-2">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-medium hover:bg-emerald-900/40 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Care Gateway</span>
              </a>
              <div className="flex items-center space-x-2 text-xs text-text-muted pt-1">
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span>concierge@mindwell.care</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-4">
          <p>
            © {new Date().getFullYear()} MindWell Health, Inc. All rights reserved. Zero-knowledge encrypted.
          </p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-purple-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-purple-300 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-purple-300 transition-colors cursor-pointer">Clinical Governance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

