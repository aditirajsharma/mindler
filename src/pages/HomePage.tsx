import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Search,
  Plus,
  Minus,
  MessageCircle,
  ShieldCheck,
  Heart,
  Activity,
  Flame,
  HelpCircle,
  Mail,
  Zap,
} from 'lucide-react';
import { WhatsAppPill } from '../components/common/WhatsAppPill';
import { CrisisBanner } from '../components/common/CrisisBanner';
import { FAQ_CATEGORIES, FAQ_ITEMS } from '../data/faqData';
import { useWellness } from '../context/WellnessContext';
import { useChat } from '../context/ChatContext';
import { MoodValence } from '../types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { addMoodLog } = useWellness();
  const { setIsWidgetOpen, sendMessage } = useChat();

  // FAQ state
  const [selectedCategory, setSelectedCategory] = useState<string>('getting-started');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('gs-1');

  // Handle instant mood check-in on hero
  const handleMoodSelect = (valence: MoodValence, note: string) => {
    addMoodLog({
      valence,
      score: valence === 'energized' ? 9 : valence === 'calm' ? 7 : 4,
      tags: ['Hero Quick Log', valence],
      note,
    });
    sendMessage(`I just checked in feeling ${valence}. What do you recommend?`);
    setIsWidgetOpen(true);
  };

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = searchQuery.trim() !== '' || item.categoryId === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top WhatsApp Pill */}
          <div className="mb-6 inline-block">
            <WhatsAppPill />
          </div>

          {/* Editorial Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Mental wellness support that fits in{' '}
            <span className="bg-gradient-to-r from-purple-300 via-purple-200 to-fuchsia-300 bg-clip-text text-transparent italic">
              your pocket.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Accessible, immediate, and human-centered somatic care. Chat with AI companion Maya, practice clinically curated restorative yoga postures, and harmonize your autonomic nervous system.
          </p>

          {/* Dual CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsWidgetOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold text-sm shadow-neon transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-purple-200" />
              <span>Start Chatting with Maya</span>
            </button>

            <Link
              to="/yoga"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#171326] hover:bg-[#201B34] border border-purple-500/30 text-purple-200 font-semibold text-sm transition-all hover:border-purple-400/60 flex items-center justify-center space-x-2"
            >
              <span>Explore Yoga Sanctuary</span>
              <ArrowRight className="w-4 h-4 text-purple-400" />
            </Link>
          </div>

          {/* Instant Mood Check-in Bar */}
          <div className="mt-12 max-w-xl mx-auto p-4 rounded-2xl glass-card text-left space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-purple-300 uppercase tracking-wider">
                Instant Somatic Check-In
              </span>
              <span className="text-text-muted">How does your body feel right now?</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => handleMoodSelect('overwhelmed', 'Feeling heavy and overwhelmed in the chest.')}
                className="p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-600/20 hover:border-purple-400/50 transition-all text-xs font-medium text-white flex items-center justify-center space-x-2"
              >
                <span>😔</span>
                <span>Overwhelmed</span>
              </button>
              <button
                onClick={() => handleMoodSelect('restless', 'Feeling restless with racing thoughts.')}
                className="p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-600/20 hover:border-purple-400/50 transition-all text-xs font-medium text-white flex items-center justify-center space-x-2"
              >
                <span>😐</span>
                <span>Restless</span>
              </button>
              <button
                onClick={() => handleMoodSelect('calm', 'Feeling steady and grounded.')}
                className="p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-600/20 hover:border-purple-400/50 transition-all text-xs font-medium text-white flex items-center justify-center space-x-2"
              >
                <span>🙂</span>
                <span>Calm</span>
              </button>
              <button
                onClick={() => handleMoodSelect('energized', 'Feeling energized and clear-headed.')}
                className="p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-600/20 hover:border-purple-400/50 transition-all text-xs font-medium text-white flex items-center justify-center space-x-2"
              >
                <span>😊</span>
                <span>Energized</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Somatic Highlights Section */}
      <section className="py-12 border-y border-purple-900/20 bg-[#0B0914]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl glass-card space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Maya AI Companion</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Empathetic, real-time dialogue trained in cognitive reframing and polyvagal theory to ground your nervous system anytime, day or night.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Somatic Yoga Sanctuary</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Evidence-based restorative postures featuring guided pranayama biofeedback timer rings that gently reduce stress and promote deep sleep.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Board-Certified Specialists</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Seamless telehealth booking with licensed psychiatrists and somatic psychologists with zero subscription locks and 30% student concessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Crisis Alert Banner */}
      <CrisisBanner />

      {/* Good to Know • Frequently Asked Questions */}
      <section id="faq" className="py-16 sm:py-24 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-950/60 px-3.5 py-1.5 rounded-full border border-purple-800/40">
              Good To Know • Clinical Transparency
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-text-secondary max-w-xl mx-auto">
              Everything you need to know about our somatic approach, privacy safeguards, and clinical care team.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8 max-w-xl mx-auto">
            <Search className="w-4 h-4 text-purple-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g. GAD-7, psychiatrist, pricing, HIPAA, sleep)..."
              className="w-full bg-[#130F21] border border-purple-500/30 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-text-muted focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 shadow-card-glow"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-text-muted hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs with real-time question counts */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {FAQ_CATEGORIES.map((cat) => {
              const count = FAQ_ITEMS.filter((item) => item.categoryId === cat.id).length;
              const isSelected = selectedCategory === cat.id && !searchQuery;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSearchQuery('');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-neon border border-purple-400'
                      : 'bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      isSelected ? 'bg-purple-950 text-purple-200' : 'bg-white/10 text-text-muted'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Accordion FAQ Items */}
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12 text-text-muted text-sm glass-card rounded-2xl">
                No questions found matching your search. Try searching for "pricing", "WhatsApp", or "HIPAA".
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = expandedFaqId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl transition-all duration-200 border ${
                      isOpen
                        ? 'bg-[#151124] border-purple-500/50 shadow-neon'
                        : 'bg-[#100D1B] border-purple-900/20 hover:border-purple-600/30'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="font-serif text-base sm:text-lg font-medium text-white">
                        {faq.question}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                          isOpen
                            ? 'bg-purple-600 border-purple-400 text-white'
                            : 'bg-white/5 border-white/10 text-purple-300'
                        }`}
                      >
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-purple-900/20 mt-1">
                        <p>{faq.answer}</p>
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {faq.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md text-[10px] bg-purple-950/50 text-purple-300/80 border border-purple-900/30"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-16 bg-gradient-to-b from-transparent to-[#0A0713]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-12 rounded-3xl glass-card space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/30 border border-purple-500/40 mx-auto flex items-center justify-center text-purple-300">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Still have questions about your care pathway?
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary max-w-lg mx-auto">
              Maya is available around the clock to answer clinical queries, walk you through our sliding-scale concessions, or help schedule your first consultation.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setIsWidgetOpen(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-semibold shadow-neon transition-all"
              >
                Ask Maya Directly
              </button>
              <a
                href="mailto:concierge@mindwell.care"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span>Email Clinical Concierge</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

