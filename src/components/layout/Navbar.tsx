import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, MessageCircle, Flame, Menu, X, Heart, Activity } from 'lucide-react';
import { useWellness } from '../../context/WellnessContext';
import { useChat } from '../../context/ChatContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { streakDays, wellnessScore } = useWellness();
  const { setIsWidgetOpen } = useChat();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Yoga Sanctuary', path: '/yoga' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Maya AI', path: '/chat' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 via-purple-600 to-fuchsia-500 p-[1px] shadow-neon transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#0E0C17] rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
                MindWell
              </span>
              <span className="text-[10px] uppercase tracking-widest text-purple-400/80 font-semibold -mt-1">
                Somatic & AI Care
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    active
                      ? 'text-white bg-purple-950/40 shadow-inner border border-purple-500/30'
                      : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-purple-400 rounded-full shadow-[0_0_8px_#C084FC]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Section: Streak & Actions */}
          <div className="hidden sm:flex items-center space-x-3 lg:space-x-4">
            {/* Streak Counter */}
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-purple-950/50 border border-purple-500/30 hover:border-purple-400/50 transition-all text-xs font-semibold text-purple-200 group"
              title="Daily Somatic Streak"
            >
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400 group-hover:scale-110 transition-transform animate-pulse" />
              <span>{streakDays}d Streak</span>
            </Link>

            {/* Wellness Score Badge */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-xs font-semibold text-emerald-300">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>{wellnessScore}% Vagal Tone</span>
            </div>

            {/* Quick Chat FAB Trigger */}
            <button
              onClick={() => setIsWidgetOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-xs sm:text-sm font-semibold shadow-neon transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with Maya</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => setIsWidgetOpen(true)}
              className="p-2 rounded-lg bg-purple-900/40 border border-purple-500/30 text-purple-300"
              aria-label="Open Maya Chat"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-purple-900/30 bg-[#0E0C17]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center space-x-2 text-xs text-purple-300">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
              <span>{streakDays} Days Consistent</span>
            </div>
            <div className="text-xs text-emerald-300">
              Score: {wellnessScore}/100
            </div>
          </div>
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive(link.path)
                    ? 'text-white bg-purple-900/30 text-purple-300 border border-purple-500/30'
                    : 'text-text-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

