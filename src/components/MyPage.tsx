import React, { useState, useEffect } from 'react';
import { 
  User, Calendar, Clock, Video, Copy, Check, ExternalLink, 
  Zap, Award, Flame, BookOpen, Settings, HelpCircle, 
  ChevronRight, ArrowRight, Shield, Bell, Globe, Volume2, 
  CheckCircle2, Sparkles, MessageSquare, AlertCircle, ShieldCheck
} from 'lucide-react';
import { UserStats } from '../types';

interface MyPageProps {
  stats: UserStats;
  onUpdateStats?: React.Dispatch<React.SetStateAction<UserStats>>;
  onOpenCreditModal: () => void;
  onNavigate: (tab: string, subMenu?: any) => void;
  onBookTutor?: (topic?: string) => boolean;
}

export default function MyPage({
  stats,
  onUpdateStats,
  onOpenCreditModal,
  onNavigate
}: MyPageProps) {
  const [activeSubTab, setActiveSubTab] = useState<'stats' | 'settings' | 'sessions'>(() => {
    try {
      const saved = localStorage.getItem('talkkorean_mypage_subtab');
      if (saved === 'stats' || saved === 'settings' || saved === 'sessions') return saved;
    } catch (e) {
      // ignore
    }
    return 'stats';
  });

  useEffect(() => {
    try {
      localStorage.setItem('talkkorean_mypage_subtab', activeSubTab);
    } catch (e) {
      // ignore
    }
  }, [activeSubTab]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState(stats.name || 'Learner (민준)');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [dailyGoal, setDailyGoal] = useState(stats.dailyGoalXp || 150);

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSaveName = () => {
    setIsEditingName(false);
    if (onUpdateStats) {
      onUpdateStats(prev => ({ ...prev, name: userName }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-sm text-emerald-900 text-sm font-semibold flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200 shadow-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-bold underline ml-4 cursor-pointer"
          >
            Close
          </button>
        </div>
      )}

      {/* Top Profile Header Card */}
      <div className="bg-white border border-editorial-border rounded-sm p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Avatar & User Info */}
          <div className="flex items-start sm:items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-editorial-accent-light/40 border-2 border-editorial-accent/20 flex items-center justify-center text-editorial-accent font-serif text-2xl font-black">
                {userName.charAt(0) || 'K'}
              </div>
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center" title="Online">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center space-x-2.5">
                {isEditingName ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="px-2 py-1 text-sm font-bold border border-editorial-text rounded-sm focus:outline-none"
                    />
                    <button
                      onClick={handleSaveName}
                      className="px-2.5 py-1 bg-editorial-text text-white text-xs font-bold rounded-sm cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <h1 className="text-xl sm:text-2xl font-serif font-black text-editorial-text tracking-tight">
                      {userName}
                    </h1>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="text-[11px] text-editorial-muted hover:text-editorial-accent underline cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                )}

                <span className="px-2 py-0.5 rounded-full bg-neutral-900 text-white text-[10px] font-extrabold uppercase tracking-wider">
                  {stats.plan === 'pro' ? 'PRO MEMBER' : 'FREE LEARNER'}
                </span>
              </div>

              <p className="text-xs text-editorial-muted flex items-center space-x-2">
                <span>Account: cyprogg@gmail.com</span>
                <span>•</span>
                <span>Level: Intermediate (Level 3)</span>
              </p>

              <div className="flex items-center space-x-4 pt-1 text-xs">
                <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Email Verified</span>
                </span>
                <span className="text-editorial-muted">
                  Joined: Sep 01, 2026
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stat Pill Highlights */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 bg-editorial-bg p-3 sm:p-4 rounded-sm border border-editorial-border/60 text-center">
            <div className="space-y-0.5">
              <div className="text-[10px] uppercase font-bold text-editorial-muted">Credits</div>
              <div className="flex items-center justify-center space-x-1">
                <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="text-base sm:text-lg font-black font-mono text-editorial-text">{stats.credits}</span>
                <span className="text-[10px] text-neutral-500 font-semibold">CR</span>
              </div>
              <button
                onClick={onOpenCreditModal}
                className="text-[10px] text-editorial-accent hover:underline font-bold block mx-auto cursor-pointer"
              >
                + Top Up
              </button>
            </div>

            <div className="space-y-0.5 border-x border-editorial-border/60 px-2">
              <div className="text-[10px] uppercase font-bold text-editorial-muted">Streak</div>
              <div className="flex items-center justify-center space-x-1">
                <span className="text-sm">🔥</span>
                <span className="text-base sm:text-lg font-black text-editorial-text">{stats.streak}</span>
                <span className="text-[10px] text-neutral-500 font-semibold">Days</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-medium block">On Track</span>
            </div>

            <div className="space-y-0.5">
              <div className="text-[10px] uppercase font-bold text-editorial-muted">Total XP</div>
              <div className="flex items-center justify-center space-x-1">
                <Award className="w-3.5 h-3.5 text-editorial-accent" />
                <span className="text-base sm:text-lg font-black text-editorial-text">{stats.totalXp}</span>
                <span className="text-[10px] text-neutral-500 font-semibold">XP</span>
              </div>
              <span className="text-[10px] text-neutral-500 font-medium block">Top 15%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sub-Navigation Tabs */}
      <div className="border-b border-editorial-border flex space-x-2 sm:space-x-4 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveSubTab('stats')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'stats'
              ? 'border-editorial-text text-editorial-text bg-white'
              : 'border-transparent text-editorial-muted hover:text-editorial-text hover:border-editorial-border'
          }`}
        >
          <BookOpen className="w-4 h-4 text-sky-600" />
          <span>Achievements & Stats</span>
        </button>

        <button
          onClick={() => setActiveSubTab('settings')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'settings'
              ? 'border-editorial-text text-editorial-text bg-white'
              : 'border-transparent text-editorial-muted hover:text-editorial-text hover:border-editorial-border'
          }`}
        >
          <Settings className="w-4 h-4 text-neutral-600" />
          <span>Account & Settings</span>
        </button>

        <button
          onClick={() => setActiveSubTab('sessions')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'sessions'
              ? 'border-editorial-text text-editorial-text bg-white'
              : 'border-transparent text-editorial-muted hover:text-editorial-text hover:border-editorial-border'
          }`}
        >
          <Video className="w-4 h-4 text-amber-600" />
          <span>1:1 Native Tutoring</span>
          <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold">
            Coming Soon
          </span>
        </button>
      </div>

      {/* Tab: 1:1 Live Video Sessions (Coming Soon) */}
      {activeSubTab === 'sessions' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white border border-editorial-border rounded-sm p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 border border-amber-300 flex items-center justify-center mx-auto">
              <Video className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>Feature in Preparation · Coming Soon</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-editorial-text pt-1">
                1:1 Live Native Tutor Sessions
              </h3>
              <p className="text-sm text-editorial-muted leading-relaxed max-w-lg mx-auto font-medium">
                1:1 live video tutoring with certified native Korean tutors is currently being prepared to deliver the highest quality personalized learning experience. Stay tuned for our upcoming release!
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-editorial-bg/70 border border-editorial-border/70 rounded-sm text-left text-xs space-y-3 text-editorial-text">
              <div className="font-bold flex items-center space-x-1.5 text-editorial-accent">
                <Sparkles className="w-4 h-4 text-editorial-accent" />
                <span>Available Learning Features Right Now</span>
              </div>
              <ul className="space-y-2 text-neutral-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Interactive Voice Pitch Analyzer:</strong> Compare your pitch, rhythm, and pronunciation waveforms directly against native speakers in Lyrics Lab</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Official TOPIK Mock Exams:</strong> Instant automated scoring, explanations, and weakness diagnostic reports</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>K-Culture & Cultural Immersions:</strong> Real-world Korean learned through modern & traditional Korean cultural themes</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Vocabulary & Expression Study:</strong> Interactive flashcards and onomatopoeia mastery</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('Dashboard')}
                className="w-full sm:w-auto px-6 py-2.5 bg-editorial-text hover:bg-editorial-accent text-white rounded-sm text-xs font-bold transition-colors cursor-pointer flex items-center justify-center space-x-1.5 shadow-xs"
              >
                <BookOpen className="w-4 h-4" />
                <span>Go to Study Dashboard</span>
              </button>
              <button
                onClick={() => setActiveSubTab('stats')}
                className="w-full sm:w-auto px-5 py-2.5 bg-white border border-editorial-border hover:bg-neutral-50 text-editorial-text rounded-sm text-xs font-bold transition-colors cursor-pointer"
              >
                <span>View My Progress & Stats</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Study Analytics & Progress */}
      {activeSubTab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-editorial-border rounded-sm p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-editorial-muted font-bold uppercase">
                <span>Official TOPIK Exam</span>
                <Award className="w-4 h-4 text-editorial-accent" />
              </div>
              <div className="text-2xl font-serif font-black text-editorial-text">TOPIK II</div>
              <p className="text-xs text-editorial-muted">Target: Level 3 Pass (Est. 142 pts)</p>
              <button 
                onClick={() => onNavigate('Topik')}
                className="text-xs text-editorial-accent font-bold hover:underline flex items-center space-x-1 pt-1 cursor-pointer"
              >
                <span>Take Mock Exam</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-white border border-editorial-border rounded-sm p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-editorial-muted font-bold uppercase">
                <span>AI Pronunciation Score</span>
                <Volume2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-serif font-black text-emerald-600">88.5 <span className="text-xs text-neutral-500 font-sans">/ 100 pts</span></div>
              <p className="text-xs text-editorial-muted">Recent: NewJeans - Hype Boy</p>
              <button 
                onClick={() => onNavigate('LyricsLab')}
                className="text-xs text-emerald-700 font-bold hover:underline flex items-center space-x-1 pt-1 cursor-pointer"
              >
                <span>Practice in Lyrics Lab</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-white border border-editorial-border rounded-sm p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-editorial-muted font-bold uppercase">
                <span>Vocabulary & Onomatopoeia</span>
                <BookOpen className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-serif font-black text-editorial-text">38 <span className="text-xs text-neutral-500 font-sans">Expressions</span></div>
              <p className="text-xs text-editorial-muted">Dugeun-dugeun, Bogeul-bogeul completed</p>
              <button 
                onClick={() => onNavigate('Dashboard', 'onomatopoeia')}
                className="text-xs text-amber-700 font-bold hover:underline flex items-center space-x-1 pt-1 cursor-pointer"
              >
                <span>Review Expressions</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-white border border-editorial-border rounded-sm p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-editorial-muted font-bold uppercase">
                <span>Diagnostic Level Test</span>
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
              </div>
              <div className="text-2xl font-serif font-black text-sky-700">Lv. 3.2</div>
              <p className="text-xs text-editorial-muted">Conversational Fluency Level</p>
              <button 
                onClick={() => onNavigate('LevelTest')}
                className="text-xs text-sky-700 font-bold hover:underline flex items-center space-x-1 pt-1 cursor-pointer"
              >
                <span>Retake Level Test</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Daily Goal Gauge */}
          <div className="bg-white border border-editorial-border rounded-sm p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-sm text-editorial-text">Daily Learning Goal Progress</h4>
                <p className="text-xs text-editorial-muted">Consistent daily practice is the key to natural Korean fluency.</p>
              </div>
              <div className="text-right">
                <span className="text-base font-black font-mono text-editorial-accent">{stats.totalXp}</span>
                <span className="text-xs text-editorial-muted font-mono"> / {stats.dailyGoalXp} XP</span>
              </div>
            </div>

            <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-editorial-accent h-full transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, (stats.totalXp / stats.dailyGoalXp) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Account & Study Settings */}
      {activeSubTab === 'settings' && (
        <div className="bg-white border border-editorial-border rounded-sm p-6 space-y-6 shadow-xs max-w-2xl">
          <div className="border-b border-editorial-border/60 pb-4">
            <h3 className="font-serif font-bold text-base text-editorial-text">Account & Learning Settings</h3>
            <p className="text-xs text-editorial-muted mt-1">Customize your personal study goals and notification preferences.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-editorial-text block mb-1.5">
                Daily Target Experience (Daily XP)
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="25"
                  value={dailyGoal}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setDailyGoal(val);
                    if (onUpdateStats) {
                      onUpdateStats(prev => ({ ...prev, dailyGoalXp: val }));
                    }
                  }}
                  className="w-48 accent-editorial-accent cursor-pointer"
                />
                <span className="font-mono font-bold text-sm text-editorial-accent">{dailyGoal} XP / day</span>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100">
              <label className="text-xs font-bold text-editorial-text block mb-1.5">
                1:1 Class & Session Reminders
              </label>
              <div className="space-y-2 text-xs text-neutral-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-editorial-accent" />
                  <span>Send email & browser reminder 1 hour before scheduled session</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-editorial-accent" />
                  <span>Receive weekly AI pronunciation digest & progress report</span>
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100">
              <label className="text-xs font-bold text-editorial-text block mb-1.5">
                Support & Inquiries
              </label>
              <p className="text-xs text-editorial-muted mb-2">
                Have questions about your learning journey or need assistance? Reach out on our Q&A board.
              </p>
              <button
                onClick={() => onNavigate('Support')}
                className="px-4 py-2 border border-editorial-border hover:bg-editorial-bg text-editorial-text rounded-sm text-xs font-bold transition-colors cursor-pointer"
              >
                Go to Q&A Support
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
