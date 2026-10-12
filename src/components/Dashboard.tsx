import React, { useState } from 'react';
import { Flame, Target, Award, PlayCircle, Layers, Volume2, Trophy, ArrowRight, BookOpen, Star, RefreshCw, Zap, Sparkles, Coins } from 'lucide-react';
import { speakKoreanText } from '../utils/tts';
import { UserStats } from '../types';
import { INITIAL_USER_STATS, LEADERBOARD_USERS, WORD_OF_THE_DAY } from '../data';
import AiConversationMenu from './study/AiConversationMenu';
import DailyPhrasesMenu from './study/DailyPhrasesMenu';
import GrammarMenu from './study/GrammarMenu';
import HangulAlphabetMenu from './study/HangulAlphabetMenu';
import WordsQuizMenu from './study/WordsQuizMenu';
import TracingMenu from './study/TracingMenu';
import HonorificsMenu from './study/HonorificsMenu';
import KSlangMenu from './study/KSlangMenu';
import DictationTestMenu from './study/DictationTestMenu';
import CulturalEtiquetteMenu from './study/CulturalEtiquetteMenu';
import KDramaVocabMenu from './study/KDramaVocabMenu';
import OnomatopoeiaMenu from './study/OnomatopoeiaMenu';
import DailyQuizMenu from './study/DailyQuizMenu';
import { useLanguage } from '../context/LanguageContext';

interface DashboardProps {
  stats: UserStats;
  setStats: React.Dispatch<React.SetStateAction<UserStats>>;
  setActiveTab: (tab: string) => void;
  initialMenu?: StudyMenu;
  onOpenCreditModal?: () => void;
  onSpendCredits?: (amount: number, description: string) => boolean;
  onRewardCredits?: (amount: number, description: string) => void;
}

export type StudyMenu = 
  | 'hangul-alphabet' 
  | 'tracing' 
  | 'words-quiz' 
  | 'onomatopoeia'
  | 'daily-phrases' 
  | 'grammar' 
  | 'honorifics' 
  | 'dictation' 
  | 'daily-quiz'
  | 'ai-conversation' 
  | 'kdrama-vocab'
  | 'cultural-etiquette'
  | 'k-slang'
  | 'overview';

export default function Dashboard({ stats, setStats, setActiveTab, initialMenu, onOpenCreditModal, onSpendCredits, onRewardCredits }: DashboardProps) {
  const { t } = useLanguage();
  const [acceptedChallenge, setAcceptedChallenge] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<StudyMenu>(initialMenu || 'hangul-alphabet');

  const handleEarnCredits = (amount: number, description: string) => {
    if (onRewardCredits) {
      onRewardCredits(amount, description);
    } else {
      setStats(prev => ({
        ...prev,
        credits: prev.credits + amount,
        creditHistory: [
          {
            id: `tx-${Date.now()}`,
            date: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            amount,
            description
          },
          ...prev.creditHistory
        ]
      }));
    }
  };

  React.useEffect(() => {
    if (initialMenu) {
      setActiveMenu(initialMenu);
    }
  }, [initialMenu]);
  
  // Interactive vocab flip cards state
  const [currentCardIdx, setCurrentCardIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  
  const vocabCards = [
    { korean: '어머니', romanized: 'eomeoni', english: 'Mother' },
    { korean: '아버지', romanized: 'abeoji', english: 'Father' },
    { korean: '할머니', romanized: 'halmeoni', english: 'Grandmother' },
    { korean: '형', romanized: 'hyeong', english: 'Older Brother (for males)' },
    { korean: '동생', romanized: 'dongsaeng', english: 'Younger Sibling' }
  ];

  // TTS helper using central engine
  const handleSpeakText = (text: string) => {
    speakKoreanText(text);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIdx((prev) => (prev + 1) % vocabCards.length);
    }, 150);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      
      {/* LEFT NAVIGATION / SIDEBAR FOR THE STUDY BOARD (3 Columns) */}
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white border border-editorial-border rounded-sm p-4 shadow-none space-y-1.5">
          <div className="flex items-center justify-between px-3 mb-2">
            <p className="text-[10px] font-bold text-editorial-muted uppercase tracking-widest">My Study Path</p>
            <span className="text-[9px] font-bold text-editorial-accent bg-editorial-accent-light/50 px-1.5 py-0.5 rounded">By Difficulty</span>
          </div>
          
          {[
            // 1단계: 한글 기초 (Foundations)
            { id: 'hangul-alphabet', icon: '🔤', labelEn: 'Hangul Alphabet', labelKo: '한글 자모 & 받침 조립', step: 'STEP 1', level: 'Beginner' },
            { id: 'tracing', icon: '✏️', labelEn: 'Stroke Tracing', labelKo: '한글 획순 쓰기 연습', step: 'STEP 2', level: 'Beginner' },
            { id: 'words-quiz', icon: '🧩', labelEn: 'Vocabulary Quiz', labelKo: '기초 어휘 퀴즈', step: 'STEP 3', level: 'Level 1' },

            // 2단계: 어휘 확장 & 일상 표현 (Vocab & Daily Expressions)
            { id: 'onomatopoeia', icon: '✨', labelEn: 'Onomatopoeia', labelKo: '의성어 • 의태어 표현', step: 'STEP 4', level: 'Level 1' },
            { id: 'daily-phrases', icon: '💬', labelEn: 'Daily Phrases', labelKo: '필수 생활 회화 표현', step: 'STEP 5', level: 'Level 2' },

            // 3단계: 핵심 문법 & 존댓말 (Grammar & Speech Styles)
            { id: 'grammar', icon: '📐', labelEn: 'Core Grammar', labelKo: '조사·어미 핵심 문법', step: 'STEP 6', level: 'Level 2' },
            { id: 'honorifics', icon: '🙇', labelEn: 'Honorifics & Politeness', labelKo: '존경어 • 높임말 변환', step: 'STEP 7', level: 'Level 3' },

            // 4단계: 듣기 & 일일 챌린지 (Listening & Quizzes)
            { id: 'dictation', icon: '✍️', labelEn: 'Dictation Test', labelKo: '한국어 실전 받아쓰기', step: 'STEP 8', level: 'Level 3' },
            { id: 'daily-quiz', icon: '⚡', labelEn: 'Daily Vocab Quiz', labelKo: '데일리 어휘 퀴즈 (+15 CR)', step: 'STEP 9', level: 'Level 3+' },

            // 5단계: 대화 시나리오 & 문화 심화 (Conversational & Culture)
            { id: 'ai-conversation', icon: '🗣️', labelEn: 'Scenario Dialogue', labelKo: '실전 시나리오 인터랙티브 회화', step: 'STEP 10', level: 'Level 4' },
            { id: 'kdrama-vocab', icon: '🎬', labelEn: 'K-Drama Vocab & Lines', labelKo: 'K-드라마 명대사 & 실전 어휘', step: 'STEP 11', level: 'Advanced' },
            { id: 'cultural-etiquette', icon: '🤝', labelEn: 'Cultural Etiquette', labelKo: '한국 문화 & 에티켓 가이드', step: 'STEP 12', level: 'Advanced' },
            { id: 'k-slang', icon: '🔥', labelEn: 'Trendy K-Slang & Memes', labelKo: '최신 신조어 • 유행어', step: 'STEP 13', level: 'Master' },

            // 종합 현황
            { id: 'overview', icon: '🎯', labelEn: 'Learning Overview & Stats', labelKo: '학습 성취 종합 대시보드', step: 'ALL', level: 'Overview' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id as StudyMenu)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                activeMenu === item.id
                  ? 'bg-editorial-text text-white shadow-sm'
                  : 'text-editorial-text hover:bg-editorial-accent-light/40'
              }`}
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <span className="text-base shrink-0">{item.icon}</span>
                <div className="text-left truncate">
                  <div className="flex items-center space-x-1.5">
                    <span className="truncate">{item.labelEn}</span>
                    <span className={`text-[9px] px-1 py-0.2 rounded font-mono shrink-0 ${
                      activeMenu === item.id ? 'bg-white/20 text-white' : 'bg-editorial-bg border border-editorial-border text-editorial-muted'
                    }`}>
                      {item.step}
                    </span>
                  </div>
                  <span className={`block text-[10px] font-normal truncate ${
                    activeMenu === item.id ? 'text-neutral-300' : 'text-editorial-muted'
                  }`}>
                    {item.labelKo}
                  </span>
                </div>
              </div>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ml-1.5 ${
                activeMenu === item.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-editorial-bg text-editorial-muted border border-editorial-border/60'
              }`}>
                {item.level}
              </span>
            </button>
          ))}
        </div>


        {/* Word of the Day widget (from Image 3) */}
        <div className="bg-white border border-editorial-border rounded-sm p-5 shadow-none space-y-4">
          <div className="flex justify-between items-center border-b border-editorial-border pb-2">
            <span className="text-xs font-bold text-editorial-accent uppercase tracking-widest font-serif">Word of the Day</span>
            <span className="text-[10px] font-bold bg-editorial-accent-light/50 text-editorial-accent px-2 py-0.5 rounded-sm">Vocabulary</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-3xl font-bold font-serif text-editorial-text">{WORD_OF_THE_DAY.korean}</h4>
                <p className="text-xs font-bold text-editorial-accent tracking-wide">({WORD_OF_THE_DAY.romanized})</p>
              </div>
              <button
                onClick={() => handleSpeakText(WORD_OF_THE_DAY.korean)}
                className="w-9 h-9 rounded-sm bg-editorial-accent-light/50 text-editorial-accent hover:bg-editorial-accent hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Speak word pronunciation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-base font-bold text-editorial-text font-serif">{WORD_OF_THE_DAY.english}</p>
            
            <div className="bg-editorial-bg border border-editorial-border p-2.5 rounded-sm text-xs space-y-1">
              <p className="font-bold text-editorial-text font-serif">{WORD_OF_THE_DAY.sentenceKorean}</p>
              <p className="text-editorial-muted font-medium italic">{WORD_OF_THE_DAY.sentenceEnglish}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER & MAIN STUDY ENGINE */}
      <div className={activeMenu === 'overview' ? 'lg:col-span-6 space-y-6' : 'lg:col-span-9 space-y-6'}>
        
        {activeMenu !== 'overview' && (
          <div className="flex items-center justify-between bg-white border border-editorial-border px-4 py-2.5 rounded-sm">
            <button
              onClick={() => setActiveMenu('overview')}
              className="text-xs font-bold text-editorial-muted hover:text-editorial-text flex items-center space-x-1 cursor-pointer"
            >
              <span>← Back to Overview</span>
            </button>
            <span className="text-[10px] font-bold text-editorial-accent uppercase tracking-widest">
              Study Center • Interactive Module
            </span>
          </div>
        )}

        {activeMenu === 'daily-quiz' && (
          <DailyQuizMenu 
            onRewardCredits={handleEarnCredits}
            onAddXp={(xp) => setStats(prev => ({ 
              ...prev, 
              totalXp: prev.totalXp + xp,
              dailyGoalProgress: Math.min(100, prev.dailyGoalProgress + 20)
            }))}
            onBackToOverview={() => setActiveMenu('overview')}
          />
        )}
        {activeMenu === 'dictation' && (
          <DictationTestMenu 
            onAddXp={(xp) => setStats(prev => ({ ...prev, totalXp: prev.totalXp + xp }))}
            onOpenCreditModal={onOpenCreditModal}
          />
        )}
        {activeMenu === 'cultural-etiquette' && (
          <CulturalEtiquetteMenu 
            onAddXp={(xp) => setStats(prev => ({ ...prev, totalXp: prev.totalXp + xp }))}
          />
        )}
        {activeMenu === 'kdrama-vocab' && (
          <KDramaVocabMenu 
            onAddXp={(xp) => setStats(prev => ({ ...prev, totalXp: prev.totalXp + xp }))}
          />
        )}
        {activeMenu === 'onomatopoeia' && (
          <OnomatopoeiaMenu 
            credits={stats.credits}
            onSpendCredits={onSpendCredits}
            onOpenCreditModal={onOpenCreditModal}
            onAddXp={(xp) => setStats(prev => ({ ...prev, totalXp: prev.totalXp + xp }))}
          />
        )}
        {activeMenu === 'honorifics' && <HonorificsMenu />}
        {activeMenu === 'ai-conversation' && (
          <AiConversationMenu 
            credits={stats.credits}
            onSpendCredits={onSpendCredits}
            onOpenCreditModal={onOpenCreditModal}
          />
        )}
        {activeMenu === 'daily-phrases' && <DailyPhrasesMenu />}
        {activeMenu === 'grammar' && (
          <GrammarMenu 
            onOpenHonorifics={() => setActiveMenu('honorifics')}
            credits={stats.credits}
            onSpendCredits={onSpendCredits}
            onOpenCreditModal={onOpenCreditModal}
          />
        )}
        {activeMenu === 'hangul-alphabet' && <HangulAlphabetMenu />}
        {activeMenu === 'words-quiz' && <WordsQuizMenu />}
        {activeMenu === 'tracing' && <TracingMenu />}
        {activeMenu === 'k-slang' && (
          <KSlangMenu 
            credits={stats.credits}
            onSpendCredits={onSpendCredits}
            onOpenCreditModal={onOpenCreditModal}
          />
        )}

        {activeMenu === 'overview' && (
          <>
        {/* Welcome Billboard (Annyeonghaseyo Min-jun) */}
        <div className="bg-[#1A1A1A] rounded-sm p-6 sm:p-8 text-white relative overflow-hidden border border-editorial-border">
          <div className="absolute top-0 right-0 w-32 h-32 bg-editorial-accent/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
          
          <div className="space-y-4 relative z-10">
            <div>
              <p className="text-xs font-bold text-editorial-accent tracking-wider">안녕하세요! (Annyeonghaseyo)</p>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">Welcome back, {stats.name}! 👋</h2>
              <p className="text-xs sm:text-sm text-editorial-accent-light font-medium">
                Keep up the momentum. You're doing excellent this week!
              </p>
            </div>

            {/* Streak & XP Metric overview */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-sm bg-white/5 text-editorial-accent flex items-center justify-center font-bold border border-white/10">
                  <Flame className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <p className="text-xs text-editorial-accent-light font-bold uppercase tracking-wider">Perfect Streak</p>
                  <p className="text-sm font-bold font-serif">{stats.streak} Days</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-sm bg-white/5 text-editorial-accent-light flex items-center justify-center font-bold border border-white/10">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-editorial-accent-light font-bold uppercase tracking-wider">Total Experience</p>
                  <p className="text-sm font-bold font-serif">{stats.totalXp} XP</p>
                </div>
              </div>
            </div>

            {/* Daily Goal tracker */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-editorial-accent-light">Daily Learning Goal</span>
                <span className="text-editorial-accent">{stats.dailyGoalProgress}% Complete ({Math.round(stats.dailyGoalXp * (stats.dailyGoalProgress/100))} / {stats.dailyGoalXp} XP)</span>
              </div>
              <div className="w-full bg-white/10 rounded-sm h-1.5">
                <div 
                  className="bg-editorial-accent h-1.5 rounded-sm transition-all duration-300" 
                  style={{ width: `${stats.dailyGoalProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Quiz Booster Billboard */}
        <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50/50 border-2 border-amber-300 rounded-sm p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5 text-left">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded-sm bg-amber-200 text-amber-900 text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-amber-700" />
                <span>Daily Review Booster</span>
              </span>
              <span className="text-[11px] font-bold text-amber-700">Extra Reward Available</span>
            </div>
            <h3 className="text-base font-bold font-serif text-amber-950 flex items-center space-x-2">
              <span>⚡ Daily Vocab Quiz (오늘의 데일리 어휘 퀴즈)</span>
            </h3>
            <p className="text-xs text-neutral-600 font-medium">
              Review 5 questions from K-POP lyrics, honorifics, and slang to instantly earn <span className="font-bold text-amber-800">+15 AI Credits & +100 XP</span>!
            </p>
          </div>
          <button 
            onClick={() => setActiveMenu('daily-quiz')}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-sm shadow-xs transition-all whitespace-nowrap cursor-pointer uppercase tracking-wider flex items-center space-x-1.5 shrink-0"
          >
            <span>Start Daily Quiz (+15 Credits)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Resume Lesson Billboard */}
        <div className="bg-white border border-editorial-border rounded-sm p-5 shadow-none space-y-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-editorial-muted uppercase tracking-widest block">Last Active Lesson</span>
            <h3 className="text-base font-bold font-serif text-editorial-text">Mastering Honorifics (Jondaetmal)</h3>
            <p className="text-xs text-editorial-accent font-bold">Lesson 4 of 10 • Essential particles & greetings</p>
          </div>
          <button 
            onClick={() => {
              setStats((prev) => ({ ...prev, totalXp: prev.totalXp + 50, dailyGoalProgress: Math.min(100, prev.dailyGoalProgress + 15) }));
              setActiveMenu('honorifics');
            }}
            className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-editorial-accent text-white text-xs font-bold rounded-sm shadow-none transition-all whitespace-nowrap cursor-pointer uppercase tracking-wider"
          >
            Resume Lesson (존댓말)
          </button>
        </div>

        {/* Interactive Vocab Flip Widget */}
        <div className="bg-white border border-editorial-border rounded-sm p-6 shadow-none space-y-5">
          <div className="flex justify-between items-center border-b border-editorial-border pb-2">
            <h3 className="text-sm font-bold text-editorial-text uppercase tracking-widest flex items-center space-x-2 font-serif">
              <span>📖</span>
              <span>Interactive Vocab Flip</span>
            </h3>
            <span className="text-[10px] font-bold text-editorial-muted">Card {currentCardIdx + 1} of {vocabCards.length}</span>
          </div>

          <div className="flex flex-col items-center justify-center space-y-5">
            {/* Flip Card Container */}
            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full max-w-sm h-40 rounded-sm bg-editorial-accent-light/30 border border-editorial-border flex flex-col items-center justify-center cursor-pointer relative p-4 text-center select-none"
            >
              {!isFlipped ? (
                <div className="space-y-2">
                  <h4 className="text-4xl font-bold font-serif text-editorial-text">{vocabCards[currentCardIdx].korean}</h4>
                  <p className="text-xs font-bold text-editorial-accent tracking-wide">({vocabCards[currentCardIdx].romanized})</p>
                  <span className="absolute bottom-3 text-[10px] text-editorial-muted font-bold uppercase tracking-widest">Tap to Flip & Reveal</span>
                </div>
              ) : (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-editorial-accent uppercase tracking-widest block mb-1">English Meaning</span>
                  <h4 className="text-3xl font-bold font-serif text-editorial-text">{vocabCards[currentCardIdx].english}</h4>
                  <span className="absolute bottom-3 text-[10px] text-editorial-muted font-bold uppercase tracking-widest">Tap to View Korean</span>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex space-x-3">
              <button
                onClick={() => handleSpeakText(vocabCards[currentCardIdx].korean)}
                className="px-4 py-2 bg-editorial-accent-light/50 text-editorial-text hover:bg-editorial-accent hover:text-white text-xs font-bold rounded-sm border border-editorial-border flex items-center space-x-1.5 cursor-pointer uppercase tracking-wider"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear Native Audio</span>
              </button>

              <button
                onClick={handleNextCard}
                className="px-4 py-2 bg-editorial-text hover:bg-editorial-accent text-editorial-bg hover:text-white text-xs font-bold rounded-sm flex items-center space-x-1.5 cursor-pointer uppercase tracking-wider"
              >
                <span>Next Vocabulary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Recommended for You grid */}
        <div className="bg-white border border-editorial-border rounded-sm p-5 shadow-none space-y-4">
          <h3 className="text-sm font-bold text-editorial-text uppercase tracking-widest border-b border-editorial-border pb-2 font-serif">
            Recommended For You
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            <div 
              onClick={() => setActiveMenu('onomatopoeia')}
              className="bg-amber-50/60 hover:bg-amber-100/70 border-2 border-amber-300 p-3.5 rounded-sm cursor-pointer text-left space-y-2 group transition-all shadow-xs"
            >
              <span className="text-lg">✨</span>
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-amber-950 group-hover:text-amber-700 font-serif">Onomatopoeia</h4>
                <span className="text-[9px] bg-amber-200 text-amber-900 font-bold px-1.5 py-0.2 rounded">NEW</span>
              </div>
              <p className="text-[10px] text-neutral-600 font-medium leading-relaxed">Sound & motion mimics: Dugeun-dugeun, Bogeul-bogeul! (5 mins)</p>
            </div>

            <div 
              onClick={() => setActiveMenu('dictation')}
              className="bg-editorial-bg hover:bg-editorial-accent-light/40 border border-editorial-border p-3.5 rounded-sm cursor-pointer text-left space-y-2 group transition-all"
            >
              <span className="text-lg">✍️</span>
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-editorial-text group-hover:text-editorial-accent font-serif">Dictation Test</h4>
              </div>
              <p className="text-[10px] text-editorial-muted font-medium leading-relaxed">Listen to native audio & practice spelling and spacing! (5 mins)</p>
            </div>

            <div 
              onClick={() => setActiveMenu('honorifics')}
              className="bg-editorial-bg hover:bg-editorial-accent-light/40 border border-editorial-border p-3.5 rounded-sm cursor-pointer text-left space-y-2 group transition-all"
            >
              <span className="text-lg">🙇</span>
              <h4 className="font-bold text-xs text-editorial-text group-hover:text-editorial-accent font-serif">Honorifics (존댓말)</h4>
              <p className="text-[10px] text-editorial-muted font-medium leading-relaxed">Master polite & respectful verbs and social etiquette. (10 mins)</p>
            </div>

            <div 
              onClick={() => setActiveMenu('ai-conversation')}
              className="bg-editorial-bg hover:bg-editorial-accent-light/40 border border-editorial-border p-3.5 rounded-sm cursor-pointer text-left space-y-2 group transition-all"
            >
              <span className="text-lg">🗣️</span>
              <h4 className="font-bold text-xs text-editorial-text group-hover:text-editorial-accent font-serif">Scenario Dialogue</h4>
              <p className="text-[10px] text-editorial-muted font-medium leading-relaxed">Interactive situational dialogues in taxis, cafes, stores & markets with 3CR learning! (5 mins)</p>
            </div>

            <div 
              onClick={() => setActiveTab('LyricsLab')}
              className="bg-editorial-bg hover:bg-editorial-accent-light/40 border border-editorial-border p-3.5 rounded-sm cursor-pointer text-left space-y-2 group transition-all"
            >
              <span className="text-lg">🎤</span>
              <h4 className="font-bold text-xs text-editorial-text group-hover:text-editorial-accent font-serif">Pronunciation Lab</h4>
              <p className="text-[10px] text-editorial-muted font-medium leading-relaxed">Practice double consonants and complex vowels with feedback. (5 mins)</p>
            </div>
          </div>
        </div>
          </>
        )}

      </div>

      {/* RIGHT COLUMN: Weekend Challenge & Leaderboard (3 Columns) - rendered only in overview */}
      {activeMenu === 'overview' && (
      <div className="lg:col-span-3 space-y-6">
        
        {/* Weekend Challenge Card */}
        <div className="bg-[#1A1A1A] border border-editorial-border rounded-sm p-5 text-white shadow-none relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl -mr-12 -mt-12"></div>
          
          <div className="space-y-4 relative z-10">
            <span className="bg-white/10 px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider border border-white/10">
              Weekend Sprint
            </span>

            <div>
              <h3 className="text-base font-bold font-serif text-white">Weekend Challenge</h3>
              <p className="text-xs text-editorial-accent-light font-medium mt-1 leading-relaxed">
                Master 20 new descriptors & adjectives this week to unlock the prestigious 'Scholar' badge and gain +500 XP bonus.
              </p>
            </div>

            {acceptedChallenge ? (
              <div className="bg-white/10 border border-white/10 p-2.5 rounded-sm text-center text-xs font-bold text-editorial-accent">
                ✓ Challenge Active
              </div>
            ) : (
              <button 
                onClick={() => setAcceptedChallenge(true)}
                className="w-full py-2 bg-white text-editorial-text hover:bg-editorial-accent-light text-xs font-bold rounded-sm shadow-none transition-all cursor-pointer uppercase tracking-wider"
              >
                Accept Challenge
              </button>
            )}
          </div>
        </div>

        {/* Top Learners Leaderboard */}
        <div className="bg-white border border-editorial-border rounded-sm p-5 shadow-none space-y-4">
          <h3 className="text-sm font-bold text-editorial-text uppercase tracking-widest border-b border-editorial-border pb-2 flex items-center space-x-1.5 font-serif">
            <Trophy className="w-4 h-4 text-editorial-accent" />
            <span>Top Learners</span>
          </h3>

          <div className="space-y-3">
            {LEADERBOARD_USERS.map((user) => (
              <div 
                key={user.rank} 
                className={`flex items-center justify-between p-2 rounded-sm border ${
                  user.isYou ? 'bg-editorial-accent-light/50 border-editorial-border' : 'border-transparent'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className={`w-5 text-center text-xs font-bold ${
                    user.rank === 1 ? 'text-editorial-accent font-bold font-serif' :
                    user.rank === 2 ? 'text-editorial-text font-bold font-serif' :
                    'text-editorial-muted'
                  }`}>
                    {user.rank}
                  </span>
                  <img
                    src={user.avatar}
                    referrerPolicy="no-referrer"
                    alt={user.name}
                    className="w-8 h-8 rounded-sm object-cover shadow-none border border-editorial-border"
                  />
                  <span className={`text-xs font-bold ${user.isYou ? 'text-editorial-accent font-serif' : 'text-editorial-text'}`}>
                    {user.name.split(' ')[0]}
                  </span>
                </div>
                <span className="text-xs font-bold text-editorial-text bg-editorial-accent-light/40 border border-editorial-border/30 px-2 py-0.5 rounded-sm">
                  {user.xp} XP
                </span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => alert("Leaderboard expands in TOPIK Season 4 matches! Complete daily path elements to climb ranks.")}
            className="w-full py-2 bg-editorial-accent-light/40 hover:bg-editorial-accent-light/70 border border-editorial-border text-xs text-editorial-text font-bold rounded-sm transition-all cursor-pointer uppercase tracking-wider"
          >
            Full Leaderboard
          </button>
        </div>

      </div>
      )}
    </div>
  );
}
