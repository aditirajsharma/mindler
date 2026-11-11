import React, { useState } from 'react';
import {
  Activity,
  Flame,
  Calendar,
  Sparkles,
  BarChart2,
  TrendingUp,
  Clock,
  Video,
  PlusCircle,
  MessageCircle,
  Settings,
  ShieldCheck,
  User,
  Heart,
  Smile,
  LogOut,
  Download,
  Trash2,
  CheckCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts';
import { useWellness } from '../context/WellnessContext';
import { useChat } from '../context/ChatContext';
import { MOOD_TREND_7D, MOOD_TREND_30D, YOGA_WEEKLY_PRACTICE } from '../data/mockUserData';
import { MoodLoggingModal } from '../components/dashboard/MoodLoggingModal';
import { BookingModal } from '../components/dashboard/BookingModal';
import { TelehealthModal } from '../components/dashboard/TelehealthModal';
import { Consultation } from '../types';
import { useNavigate } from 'react-router-dom';

type DashboardTab = 'overview' | 'mood' | 'yoga' | 'consultations' | 'chat' | 'settings';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { streakDays, wellnessScore, poses, moodLogs, consultations } = useWellness();
  const { messages, setIsWidgetOpen } = useChat();

  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [trendView, setTrendView] = useState<'7d' | '30d'>('7d');

  // Modals
  const [isMoodModalOpen, setIsMoodModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeTelehealthSession, setActiveTelehealthSession] = useState<Consultation | null>(null);

  const trendData = trendView === '7d' ? MOOD_TREND_7D : MOOD_TREND_30D;

  const handleExportData = () => {
    const exportObj = {
      exportDate: new Date().toISOString(),
      streakDays,
      wellnessScore,
      moodLogs,
      consultations,
      posesCompleted: poses.filter((p) => p.completed).map((p) => p.englishName),
    };
    const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindwell-hipaa-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePurgeData = () => {
    if (window.confirm('Are you sure you want to purge all locally stored wellness data? This action is zero-knowledge irreversible.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Top Greeting & Notification Bar */}
      <div className="p-6 rounded-3xl glass-card flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border border-purple-500/25">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
              alt="User Avatar"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-500/40 shadow-neon"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#0A0A0F] rounded-full" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-serif text-2xl font-bold text-white">
                Welcome back, Alex
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-900/60 text-purple-300 border border-purple-600/30">
                Premium Somatic Tier
              </span>
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              Your autonomic nervous system is in an optimal restorative state.
            </p>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center space-x-3">
          <div className="px-4 py-2.5 rounded-2xl bg-orange-950/40 border border-orange-500/30 flex items-center space-x-2">
            <Flame className="w-5 h-5 text-orange-400 fill-orange-400 animate-pulse" />
            <div>
              <span className="text-xs font-bold text-orange-200 block">{streakDays} Days</span>
              <span className="text-[10px] text-orange-300/70">Continuous Streak</span>
            </div>
          </div>

          <div className="px-4 py-2.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center space-x-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="text-xs font-bold text-emerald-200 block">{wellnessScore} / 100</span>
              <span className="text-[10px] text-emerald-300/70">Vagal Equilibrium</span>
            </div>
          </div>

          <button
            onClick={() => setIsMoodModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-neon transition-all hover:scale-105 flex items-center space-x-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Log Mood</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Sidebar Nav + Dashboard Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-1 space-y-2">
          <div className="p-3 rounded-2xl bg-[#110D1E] border border-purple-900/30 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-purple-600 text-white shadow-neon'
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Sanctuary Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('mood')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'mood'
                  ? 'bg-purple-600 text-white shadow-neon'
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`}
            >
              <Smile className="w-4 h-4" />
              <span>Mood & Nervous Tracker</span>
            </button>

            <button
              onClick={() => setActiveTab('yoga')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'yoga'
                  ? 'bg-purple-600 text-white shadow-neon'
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Yoga Somatic Practice</span>
            </button>

            <button
              onClick={() => setActiveTab('consultations')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'consultations'
                  ? 'bg-purple-600 text-white shadow-neon'
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Specialist Consultations</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'chat'
                  ? 'bg-purple-600 text-white shadow-neon'
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Maya Dialogue Log</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'settings'
                  ? 'bg-purple-600 text-white shadow-neon'
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Security & Settings</span>
            </button>
          </div>

          {/* Quick Chat card */}
          <div className="p-5 rounded-2xl glass-card space-y-3">
            <div className="flex items-center space-x-2 text-purple-300">
              <Sparkles className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Maya Quick Triage</h4>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Feeling tension in your chest or neck? Launch an instant 3-minute somatic reset right now.
            </p>
            <button
              onClick={() => setIsWidgetOpen(true)}
              className="w-full py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/30 text-purple-200 text-xs font-semibold transition-all flex items-center justify-center space-x-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Open Maya</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-3 space-y-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              {/* Analytics Section: Area Chart & Bar Chart */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Area Chart: Mood & Nervous System */}
                <div className="p-6 rounded-3xl glass-card space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        Nervous System Equilibrium
                      </h3>
                      <p className="text-xs text-text-muted">
                        Vagal tone coherence rating over time
                      </p>
                    </div>
                    {/* 7d vs 30d toggle */}
                    <div className="flex items-center bg-[#181427] p-1 rounded-xl border border-purple-500/20 text-xs">
                      <button
                        onClick={() => setTrendView('7d')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                          trendView === '7d' ? 'bg-purple-600 text-white' : 'text-text-muted hover:text-white'
                        }`}
                      >
                        7 Days
                      </button>
                      <button
                        onClick={() => setTrendView('30d')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                          trendView === '30d' ? 'bg-purple-600 text-white' : 'text-text-muted hover:text-white'
                        }`}
                      >
                        30 Days
                      </button>
                    </div>
                  </div>

                  <div className="h-56 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData}>
                        <defs>
                          <linearGradient id="purpleArea" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#A855F7" stopOpacity={0.7} />
                            <stop offset="95%" stopColor="#9333EA" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#251E3B" vertical={false} />
                        <XAxis dataKey="day" stroke="#717188" fontSize={11} tickLine={false} />
                        <YAxis stroke="#717188" fontSize={11} tickLine={false} domain={[40, 100]} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#151124',
                            borderColor: 'rgba(168, 85, 247, 0.4)',
                            borderRadius: '12px',
                            fontSize: '12px',
                            color: '#fff',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="nervousBalance"
                          stroke="#C084FC"
                          strokeWidth={2.5}
                          fillOpacity={1}
                          fill="url(#purpleArea)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Bar Chart: Weekly Somatic Yoga Practice */}
                <div className="p-6 rounded-3xl glass-card space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                        <Activity className="w-4 h-4 text-purple-400" />
                        Weekly Somatic Practice
                      </h3>
                      <p className="text-xs text-text-muted">
                        Minutes of restorative movement per day
                      </p>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                      140 Mins Total
                    </span>
                  </div>

                  <div className="h-56 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={YOGA_WEEKLY_PRACTICE}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#251E3B" vertical={false} />
                        <XAxis dataKey="day" stroke="#717188" fontSize={11} tickLine={false} />
                        <YAxis stroke="#717188" fontSize={11} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#151124',
                            borderColor: 'rgba(168, 85, 247, 0.4)',
                            borderRadius: '12px',
                            fontSize: '12px',
                            color: '#fff',
                          }}
                        />
                        <Bar dataKey="minutes" fill="#A855F7" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Upcoming Consultations Widget */}
              <div className="p-6 rounded-3xl glass-card space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      Upcoming Telehealth Consultations
                    </h3>
                    <p className="text-xs text-text-muted">
                      Direct access to board-certified psychiatrists and psychologists
                    </p>
                  </div>
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-neon transition-all"
                  >
                    + Book Specialist
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {consultations.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-2xl bg-[#151124] border border-purple-500/25 flex flex-col justify-between space-y-4"
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          src={c.avatar}
                          alt={c.doctorName}
                          className="w-12 h-12 rounded-xl object-cover border border-purple-400/30"
                        />
                        <div className="space-y-0.5">
                          <h4 className="text-sm font-bold text-white">{c.doctorName}</h4>
                          <span className="text-[10px] text-purple-300 font-semibold uppercase tracking-wider block">
                            {c.type} • {c.specialty}
                          </span>
                          <span className="text-xs text-text-muted flex items-center gap-1.5 pt-1">
                            <Clock className="w-3.5 h-3.5 text-purple-400" />
                            {c.date} • {c.time}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-purple-900/30">
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                          <CheckCircle className="w-3 h-3" /> {c.status}
                        </span>
                        <button
                          onClick={() => setActiveTelehealthSession(c)}
                          className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-neon flex items-center gap-1.5 transition-transform hover:scale-105"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Launch HIPAA Room</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Mood Logs Feed */}
              <div className="p-6 rounded-3xl glass-card space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-white">
                    Recent Somatic Reflections
                  </h3>
                  <button
                    onClick={() => setActiveTab('mood')}
                    className="text-xs text-purple-400 hover:underline"
                  >
                    View All Entries →
                  </button>
                </div>

                <div className="space-y-3">
                  {moodLogs.slice(0, 3).map((log) => (
                    <div
                      key={log.id}
                      className="p-4 rounded-2xl bg-[#141021] border border-purple-900/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">
                            {log.valence === 'energized'
                              ? '😊'
                              : log.valence === 'calm'
                              ? '🙂'
                              : log.valence === 'peaceful'
                              ? '🧘'
                              : log.valence === 'restless'
                              ? '😐'
                              : '😔'}
                          </span>
                          <span className="text-sm font-bold capitalize text-white">
                            {log.valence}
                          </span>
                          <span className="text-xs text-purple-300 font-semibold bg-purple-950/60 px-2 py-0.5 rounded-md border border-purple-800/30">
                            Equilibrium {log.score}/10
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary">{log.note}</p>
                      </div>

                      <div className="text-right sm:text-right text-[11px] text-text-muted">
                        <span>{log.date} • {log.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MOOD & NERVOUS TRACKER */}
          {activeTab === 'mood' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white">
                    Somatic Mood Tracker
                  </h2>
                  <p className="text-xs text-text-muted">
                    Full longitudinal history of your nervous system equilibrium logs
                  </p>
                </div>
                <button
                  onClick={() => setIsMoodModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-neon"
                >
                  + Add Check-In
                </button>
              </div>

              <div className="space-y-3">
                {moodLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-5 rounded-2xl glass-card flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">
                          {log.valence === 'energized'
                            ? '😊'
                            : log.valence === 'calm'
                            ? '🙂'
                            : log.valence === 'peaceful'
                            ? '🧘'
                            : log.valence === 'restless'
                            ? '😐'
                            : '😔'}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-white capitalize">
                            {log.valence} State
                          </h4>
                          <span className="text-xs text-purple-300 font-medium">
                            Coherence Score: {log.score} / 10
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-text-secondary max-w-xl leading-relaxed">
                        {log.note}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {log.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-md text-[10px] bg-purple-950/50 text-purple-300 border border-purple-800/30"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-text-muted whitespace-nowrap">
                      {log.date} at {log.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: YOGA PROGRESS */}
          {activeTab === 'yoga' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white">
                    Somatic Yoga Progress
                  </h2>
                  <p className="text-xs text-text-muted">
                    Track daily posture completion and pranayama integration
                  </p>
                </div>
                <button
                  onClick={() => navigate('/yoga')}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-neon"
                >
                  Go to Sanctuary →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {poses.map((pose) => (
                  <div
                    key={pose.id}
                    className={`p-5 rounded-2xl glass-card flex items-center justify-between ${
                      pose.completed ? 'border-emerald-500/40 bg-[#121622]/80' : ''
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-semibold text-purple-300 uppercase tracking-wider block">
                        {pose.goal} • {pose.durationMinutes} Min
                      </span>
                      <h4 className="text-base font-bold text-white font-serif">{pose.englishName}</h4>
                      <p className="text-xs italic text-text-muted">{pose.sanskritName}</p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                          pose.completed
                            ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/40'
                            : 'bg-white/5 text-text-muted border-white/10'
                        }`}
                      >
                        {pose.completed ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CONSULTATIONS */}
          {activeTab === 'consultations' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white">
                    Specialist Appointments
                  </h2>
                  <p className="text-xs text-text-muted">
                    Manage upcoming clinical telehealth sessions and aftercare notes
                  </p>
                </div>
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-neon"
                >
                  + Book New Session
                </button>
              </div>

              <div className="space-y-4">
                {consultations.map((c) => (
                  <div
                    key={c.id}
                    className="p-6 rounded-2xl glass-card flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={c.avatar}
                        alt={c.doctorName}
                        className="w-14 h-14 rounded-2xl object-cover border border-purple-400/30 shadow-neon"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-base font-bold text-white">{c.doctorName}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800/40">
                            {c.type}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary">{c.credentials}</p>
                        <p className="text-xs text-text-muted">{c.specialty}</p>
                        <span className="text-xs text-purple-300 font-semibold block pt-1">
                          🗓 {c.date} at {c.time}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setActiveTelehealthSession(c)}
                        className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-neon flex items-center space-x-2 transition-all hover:scale-105"
                      >
                        <Video className="w-4 h-4" />
                        <span>Launch HIPAA Room</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CHAT HISTORY */}
          {activeTab === 'chat' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white">
                    Maya Dialogue Archive
                  </h2>
                  <p className="text-xs text-text-muted">
                    Zero-knowledge encrypted record of your emotional triage conversations
                  </p>
                </div>
                <button
                  onClick={() => setIsWidgetOpen(true)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-neon"
                >
                  Resume Chat with Maya
                </button>
              </div>

              <div className="p-6 rounded-2xl glass-card space-y-4 max-h-[600px] overflow-y-auto">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-purple-700 text-white rounded-br-sm'
                          : 'bg-[#181427] text-purple-100 border border-purple-500/20 rounded-bl-sm'
                      }`}
                    >
                      <span className="text-[10px] font-bold block mb-1 opacity-70">
                        {m.sender === 'user' ? 'You' : 'Maya AI'}
                      </span>
                      <p className="whitespace-pre-line">{m.text}</p>
                    </div>
                    <span className="text-[10px] text-text-muted mt-1 px-1">{m.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <h2 className="font-serif text-2xl font-bold text-white">
                  Security, Privacy & Settings
                </h2>
                <p className="text-xs text-text-muted">
                  Control zero-knowledge HIPAA compliance, export records, or purge local data
                </p>
              </div>

              <div className="p-6 rounded-2xl glass-card space-y-6">
                {/* Profile overview */}
                <div className="flex items-center space-x-4 pb-6 border-b border-purple-900/30">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Alex Morgan</h4>
                    <p className="text-xs text-text-muted">alex.morgan@stanford.edu (Student Concession Verified)</p>
                  </div>
                </div>

                {/* HIPAA compliance statement */}
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Client-Side Zero-Knowledge Encryption</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    All conversational reflections, emotional scores, and clinical appointment bookings are encrypted using AES-256 in your browser before synchronization. MindWell does not sell personal health information.
                  </p>
                </div>

                {/* Actions: Export & Purge */}
                <div className="space-y-3 pt-2">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div>
                      <h5 className="text-xs font-bold text-white">Export Health Record</h5>
                      <p className="text-[11px] text-text-muted">Download your complete encrypted JSON wellness transcript.</p>
                    </div>
                    <button
                      onClick={handleExportData}
                      className="px-4 py-2 rounded-xl bg-purple-900/50 hover:bg-purple-800/60 border border-purple-500/40 text-purple-200 text-xs font-semibold flex items-center space-x-2"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Data</span>
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-red-950/30 border border-red-500/30">
                    <div>
                      <h5 className="text-xs font-bold text-red-300">Purge Local Data</h5>
                      <p className="text-[11px] text-text-muted">Irreversibly delete stored mood logs, poses, and chat histories.</p>
                    </div>
                    <button
                      onClick={handlePurgeData}
                      className="px-4 py-2 rounded-xl bg-red-600/30 hover:bg-red-600/50 border border-red-500 text-red-200 text-xs font-semibold flex items-center space-x-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Purge Sanctuary</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      {isMoodModalOpen && (
        <MoodLoggingModal onClose={() => setIsMoodModalOpen(false)} />
      )}

      {isBookingModalOpen && (
        <BookingModal onClose={() => setIsBookingModalOpen(false)} />
      )}

      {activeTelehealthSession && (
        <TelehealthModal
          consultation={activeTelehealthSession}
          onClose={() => setActiveTelehealthSession(null)}
        />
      )}
    </div>
  );
};

