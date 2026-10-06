import React, { useState } from 'react';
import { 
  Bell, Music, MessageSquare, BookOpen, 
  Award, CheckSquare, Zap, ChevronDown, 
  Sparkles, Utensils, Shirt, Home as HomeIcon, Gamepad2, Palette, Joystick,
  HelpCircle, Shield, BarChart3, DollarSign, Calculator, Server, Users, User
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  streak: number;
  credits?: number;
  onOpenCreditModal?: () => void;
  onOpenAdmin?: (tab?: 'costs' | 'analytics' | 'simulator' | 'system' | 'users') => void;
  onSelectKCultureCategory?: (category: string) => void;
  onNavigateToConversation?: () => void;
  currentLang?: string;
  onLanguageChange?: (lang: string) => void;
}

export default function Header({ 
  activeTab, 
  setActiveTab, 
  streak, 
  credits = 120, 
  onOpenCreditModal,
  onOpenAdmin,
  onSelectKCultureCategory,
  onNavigateToConversation
}: HeaderProps) {
  const [showKCultureMenu, setShowKCultureMenu] = useState<boolean>(false);

  const kCultureSubmenus = [
    { label: 'K-FOOD', icon: <Utensils className="w-3.5 h-3.5 text-amber-600" /> },
    { label: 'K-WEAR', icon: <Shirt className="w-3.5 h-3.5 text-pink-600" /> },
    { label: 'K-HOUSE & PALACE', icon: <HomeIcon className="w-3.5 h-3.5 text-emerald-600" /> },
    { label: 'K-Literature', icon: <BookOpen className="w-3.5 h-3.5 text-sky-600" /> },
    { label: 'K-MUSIC', icon: <Music className="w-3.5 h-3.5 text-purple-600" /> },
    { label: 'K-PLAY', icon: <Gamepad2 className="w-3.5 h-3.5 text-rose-600" /> },
    { label: 'K-ART', icon: <Palette className="w-3.5 h-3.5 text-teal-600" /> },
    { label: 'K-GAME', icon: <Joystick className="w-3.5 h-3.5 text-indigo-600" /> }
  ];

  const handleSubmenuClick = (label: string) => {
    setShowKCultureMenu(false);
    if (onSelectKCultureCategory) {
      onSelectKCultureCategory(label);
    } else {
      setActiveTab('KCulture');
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-editorial-border px-4 sm:px-6 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Identity */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group shrink-0"
          onClick={() => handleTabClick('Home')}
        >
          <div className="w-10 h-10 rounded-sm bg-editorial-text flex items-center justify-center text-editorial-bg font-serif font-black text-xl transition-colors group-hover:bg-editorial-accent">
            T
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-editorial-text">
                Talk Korean
              </span>
              <span className="hidden sm:flex px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300 items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
                <span className="font-serif">β</span>
              </span>
            </div>
            <p className="text-[11px] text-editorial-muted font-sans font-medium">
              AI-Powered Immersive Korean Learning
            </p>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="flex items-center space-x-1">
          <button
            onClick={() => handleTabClick('Dashboard')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-sm text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
              activeTab === 'Dashboard'
                ? 'bg-editorial-accent-light text-editorial-text border border-editorial-border font-bold'
                : 'text-editorial-muted hover:bg-editorial-accent-light/35 hover:text-editorial-text'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Study</span>
          </button>

          <button
            onClick={() => {
              if (onNavigateToConversation) {
                onNavigateToConversation();
              } else {
                handleTabClick('Dashboard');
              }
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-sm text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer text-amber-950 bg-amber-50 hover:bg-amber-100 border border-amber-300 font-bold shadow-2xs"
            title="원어민 AI와 실시간 1:1 한국어 회화 연습"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
            <span>AI 회화</span>
            <span className="px-1 py-0.2 text-[9px] bg-red-600 text-white rounded font-bold font-mono">LIVE</span>
          </button>

          <button
            onClick={() => handleTabClick('LyricsLab')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-sm text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
              activeTab === 'LyricsLab'
                ? 'bg-editorial-accent-light text-editorial-text border border-editorial-border font-bold'
                : 'text-editorial-muted hover:bg-editorial-accent-light/35 hover:text-editorial-text'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>LYRICS LAB</span>
          </button>

          <button
            onClick={() => handleTabClick('Topik')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-sm text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
              activeTab === 'Topik'
                ? 'bg-editorial-accent-light text-editorial-text border border-editorial-border font-bold'
                : 'text-editorial-muted hover:bg-editorial-accent-light/35 hover:text-editorial-text'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>TOPIK</span>
          </button>

          <button
            onClick={() => handleTabClick('LevelTest')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-sm text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
              activeTab === 'LevelTest'
                ? 'bg-editorial-accent-light text-editorial-text border border-editorial-border font-bold'
                : 'text-editorial-muted hover:bg-editorial-accent-light/35 hover:text-editorial-text'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>LEVEL TEST</span>
          </button>

          {/* K-Culture Dropdown Menu */}
          <div 
            className="relative"
            onMouseEnter={() => setShowKCultureMenu(true)}
            onMouseLeave={() => setShowKCultureMenu(false)}
          >
            <button
              onClick={() => {
                handleTabClick('KCulture');
                setShowKCultureMenu(!showKCultureMenu);
              }}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-sm text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeTab === 'KCulture'
                  ? 'bg-editorial-accent text-white border border-editorial-accent font-bold'
                  : 'text-editorial-text hover:bg-editorial-accent-light/35 hover:text-editorial-accent'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>K-CULTURE</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showKCultureMenu ? 'rotate-180' : ''}`} />
            </button>

            {showKCultureMenu && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-editorial-border rounded-sm shadow-xl py-1.5 z-50 animate-in fade-in duration-150">
                <div className="px-3 py-1 text-[10px] font-bold text-editorial-muted uppercase tracking-wider border-b border-editorial-border/60 mb-1">
                  K-Culture 8 Themes
                </div>
                {kCultureSubmenus.map((sub) => (
                  <button
                    key={sub.label}
                    onClick={() => handleSubmenuClick(sub.label)}
                    className="w-full text-left px-3.5 py-2 text-xs font-semibold text-editorial-text hover:bg-editorial-bg hover:text-editorial-accent flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    {sub.icon}
                    <span>{sub.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Q&A */}
          <button
            onClick={() => handleTabClick('Support')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-sm text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
              activeTab === 'Support'
                ? 'bg-editorial-accent-light text-editorial-text border border-editorial-border font-bold'
                : 'text-editorial-muted hover:bg-editorial-accent-light/35 hover:text-editorial-text'
            }`}
            title="Q&A & 1:1 Support"
          >
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
            <span>Q&A</span>
          </button>

          {/* MY PAGE */}
          <button
            onClick={() => handleTabClick('MyPage')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-sm text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
              activeTab === 'MyPage'
                ? 'bg-editorial-text text-white border border-editorial-text font-bold shadow-xs'
                : 'text-editorial-muted hover:bg-editorial-accent-light/35 hover:text-editorial-text'
            }`}
            title="My Page & Study Progress"
          >
            <User className="w-3.5 h-3.5 text-editorial-accent" />
            <span>MY PAGE</span>
          </button>
        </nav>

        {/* Right Badges & Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* AI Credit Badge */}
          <button
            onClick={() => onOpenCreditModal?.()}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-sm bg-editorial-text text-white text-xs font-bold cursor-pointer hover:bg-editorial-accent transition-all shadow-sm group border border-transparent hover:border-amber-400"
            title="Charge Credits"
          >
            <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="font-mono font-extrabold">{credits}</span>
            <span className="text-[11px] font-semibold opacity-90">CR</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-sm bg-amber-400 text-black text-[9px] font-extrabold">
              + TOP UP
            </span>
          </button>

          {/* Streak Badge */}
          <div 
            onClick={() => handleTabClick('Dashboard')}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-sm bg-editorial-accent-light/60 border border-editorial-border text-editorial-accent text-xs font-bold cursor-pointer hover:bg-editorial-accent-light transition-all"
            title="Daily Study Streak"
          >
            <span>🔥</span>
            <span>{streak}d</span>
          </div>

          {/* Notification Bell */}
          <button 
            onClick={() => handleTabClick('MyPage')}
            className="p-1.5 rounded-sm hover:bg-editorial-accent-light/35 text-editorial-muted hover:text-editorial-text transition-colors relative cursor-pointer" 
            aria-label="Notifications"
            title="Notifications & 1:1 Class Schedule"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-editorial-accent"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
