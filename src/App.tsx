import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import LyricsLab from './components/LyricsLab';
import Dashboard, { StudyMenu } from './components/Dashboard';
import PronunciationDetail from './components/PronunciationDetail';
import Topik from './components/Topik';
import LevelTest from './components/LevelTest';
import KCulture, { KCultureCategory } from './components/KCulture';
import CustomerSupport from './components/CustomerSupport';
import MyPage from './components/MyPage';
import AiContentGenerator from './components/AiContentGenerator';
import CreditCheckoutModal from './components/CreditCheckoutModal';
import AdminModal from './components/AdminModal';
import Footer from './components/Footer';
import { UserStats, PronunciationScore, CreditTransaction, TutorBooking } from './types';
import { INITIAL_USER_STATS } from './data';
import { initSpeechVoices } from './utils/tts';
import { trackMenuVisit, trackKeyAction } from './utils/analyticsTracker';

const VALID_TABS = ['Home', 'KCulture', 'AiCreator', 'LyricsLab', 'Dashboard', 'Topik', 'LevelTest', 'Support', 'MyPage'];

const getInitialTab = (): string => {
  try {
    const hash = window.location.hash.replace('#', '');
    if (hash && VALID_TABS.includes(hash)) {
      return hash;
    }
    const saved = localStorage.getItem('talkkorean_active_tab');
    if (saved && VALID_TABS.includes(saved)) {
      return saved;
    }
  } catch (e) {
    // fallback
  }
  return 'Home';
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(getInitialTab);
  const [dashboardSubMenu, setDashboardSubMenu] = useState<StudyMenu | undefined>(undefined);
  const [kCultureCategory, setKCultureCategory] = useState<KCultureCategory | undefined>(undefined);
  const [aiCreatorTopic, setAiCreatorTopic] = useState<string>('');
  const [stats, setStats] = useState<UserStats>(INITIAL_USER_STATS);
  const [pronunciationResult, setPronunciationResult] = useState<PronunciationScore | null>(null);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [adminInitialTab, setAdminInitialTab] = useState<'costs' | 'analytics' | 'simulator' | 'system' | 'users' | 'creator'>('costs');
  const [currentLang, setCurrentLang] = useState<string>('EN');

  // Synchronize activeTab to localStorage and URL hash to prevent accidental resets
  useEffect(() => {
    try {
      localStorage.setItem('talkkorean_active_tab', activeTab);
      if (window.location.hash.replace('#', '') !== activeTab) {
        window.history.replaceState(null, '', `#${activeTab}`);
      }
    } catch (e) {
      // ignore storage errors
    }
  }, [activeTab]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && VALID_TABS.includes(hash) && hash !== activeTab) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeTab]);

  const handleOpenAdmin = (tab?: 'costs' | 'analytics' | 'simulator' | 'system' | 'users' | 'creator') => {
    setAdminInitialTab(tab || 'costs');
    setIsAdminOpen(true);
  };

  useEffect(() => {
    initSpeechVoices();
    trackMenuVisit('Home');
  }, []);

  // Toss Payments Redirect Callback Handler (When returning from Toss payment window)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get('payment');
    const paymentKey = params.get('paymentKey');
    const orderId = params.get('orderId');
    const amount = params.get('amount');
    const planId = params.get('planId');
    const creditsStr = params.get('credits');
    const method = params.get('method') || '토스페이먼츠';

    if (payment === 'success' && paymentKey && orderId && amount) {
      // Server-side confirmation call
      fetch('/api/payments/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentKey, orderId, amount: Number(amount), planId }),
      })
        .then((res) => res.json())
        .then((data) => {
          const credits = creditsStr ? parseInt(creditsStr, 10) : 165;
          const desc = `[${method}] 결제 승인 완료 (+${credits} CR) [${orderId}]`;
          handleAddCredits(credits, desc);
          setIsCreditModalOpen(true);
        })
        .catch((err) => {
          console.error('[Toss Payments Confirm Callback Error]', err);
        })
        .finally(() => {
          window.history.replaceState({}, document.title, window.location.pathname);
        });
    } else if (payment === 'fail') {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleAddCredits = (amount: number, description: string) => {
    trackKeyAction('Credits', '크레딧 충전');
    const newTx: CreditTransaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      amount: amount,
      description
    };
    setStats((prev) => ({
      ...prev,
      credits: prev.credits + amount,
      creditHistory: [newTx, ...prev.creditHistory]
    }));
  };

  const handleSpendCredits = (amount: number, description: string): boolean => {
    if (stats.credits < amount) {
      setIsCreditModalOpen(true);
      return false;
    }
    const newTx: CreditTransaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      amount: -amount,
      description
    };
    setStats((prev) => ({
      ...prev,
      credits: prev.credits - amount,
      creditHistory: [newTx, ...prev.creditHistory]
    }));
    return true;
  };

  const handleBookTutor = (topic?: string): boolean => {
    const cost = 50;
    if (stats.credits < cost) {
      setIsCreditModalOpen(true);
      return false;
    }
    const meetingCode = Math.random().toString(36).substring(2, 6);
    const newBooking: TutorBooking = {
      id: `booking-${Date.now()}`,
      tutorName: '박서연 (Seo-yeon Park) 튜터',
      tutorTitle: '외국어로서의 한국어교육학 석사 / 방송인 한국어 코칭 전문',
      tutorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      date: '2026-09-22 (화)',
      time: '20:00 - 20:30 (KST)',
      topic: topic || 'K-Culture 맞춤 회화 & 발음 클리닉',
      meetingUrl: `https://meet.google.com/kor-${meetingCode}-tut`,
      status: 'upcoming',
      creditsSpent: cost,
      notes: '학습자 희망 분야 및 실시간 피치 억양 코칭 진행 예정'
    };

    const newTx: CreditTransaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      amount: -cost,
      description: `1:1 원어민 화상 수업 예약 (${topic || '맞춤 회화'})`
    };

    trackKeyAction('LiveTutor', '1:1 원어민 튜터 예약');
    setStats(prev => ({
      ...prev,
      credits: prev.credits - cost,
      creditHistory: [newTx, ...prev.creditHistory],
      tutorBookings: [newBooking, ...(prev.tutorBookings || [])]
    }));
    return true;
  };

  const handleNavigate = (tab: string, subMenu?: StudyMenu) => {
    if (subMenu) {
      setDashboardSubMenu(subMenu);
    } else if (tab === 'Dashboard' && activeTab !== 'Dashboard') {
      // Keep default or current unless specified
    }
    trackMenuVisit(tab);
    setActiveTab(tab);
  };

  const handleTryAgain = () => {
    trackMenuVisit('LyricsLab');
    setActiveTab('LyricsLab');
  };

  return (
    <div className="min-h-screen bg-editorial-bg flex flex-col font-sans select-text selection:bg-editorial-accent-light selection:text-editorial-text">
      {/* Header bar */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={(t) => handleNavigate(t)} 
        streak={stats.streak} 
        credits={stats.credits}
        onOpenCreditModal={() => {
          trackMenuVisit('Credits');
          setIsCreditModalOpen(true);
        }}
        onOpenAdmin={handleOpenAdmin}
        currentLang={currentLang}
        onLanguageChange={(lang) => setCurrentLang(lang)}
        onSelectKCultureCategory={(category) => {
          setKCultureCategory(category as KCultureCategory);
          handleNavigate('KCulture');
        }}
      />

      {/* Main View Area with clean conditional transitions */}
      <main className="flex-1">
        {activeTab === 'Home' && (
          <Home setActiveTab={handleNavigate} />
        )}
        {activeTab === 'KCulture' && (
          <KCulture 
            initialCategory={kCultureCategory}
            onNavigateToChat={() => handleNavigate('Dashboard')}
            credits={stats.credits}
            onOpenCreditModal={() => setIsCreditModalOpen(true)}
            onSpendCredits={handleSpendCredits}
            onBookTutor={handleBookTutor}
            onNavigateToMyPage={() => handleNavigate('MyPage')}
            onNavigateToAiCreator={(topic) => {
              setAiCreatorTopic(topic);
              handleOpenAdmin('creator');
            }}
          />
        )}
        {activeTab === 'AiCreator' && (
          <AiContentGenerator
            initialTopic={aiCreatorTopic}
            credits={stats.credits}
            onSpendCredits={handleSpendCredits}
            onOpenCreditModal={() => setIsCreditModalOpen(true)}
            onNavigate={handleNavigate}
          />
        )}
        {activeTab === 'LyricsLab' && (
          <LyricsLab 
            setActiveTab={handleNavigate} 
            setPronunciationResult={(res) => {
              if (res) trackKeyAction('LyricsLab', '발음 녹음 채점');
              setPronunciationResult(res);
            }}
            credits={stats.credits}
            onOpenCreditModal={() => setIsCreditModalOpen(true)}
            onSpendCredits={handleSpendCredits}
          />
        )}
        {activeTab === 'Dashboard' && (
          <Dashboard 
            stats={stats} 
            setStats={setStats} 
            setActiveTab={handleNavigate}
            initialMenu={dashboardSubMenu}
            onOpenCreditModal={() => setIsCreditModalOpen(true)}
            onSpendCredits={handleSpendCredits}
            onRewardCredits={handleAddCredits}
          />
        )}
        {activeTab === 'Topik' && (
          <Topik 
            credits={stats.credits}
            onOpenCreditModal={() => setIsCreditModalOpen(true)}
            onSpendCredits={handleSpendCredits}
          />
        )}
        {activeTab === 'LevelTest' && (
          <LevelTest />
        )}
        {activeTab === 'PronunciationDetail' && (
          <PronunciationDetail 
            result={pronunciationResult} 
            setActiveTab={setActiveTab} 
            onTryAgain={handleTryAgain} 
          />
        )}
        {activeTab === 'Support' && (
          <CustomerSupport />
        )}
        {activeTab === 'MyPage' && (
          <MyPage 
            stats={stats}
            onUpdateStats={setStats}
            onOpenCreditModal={() => setIsCreditModalOpen(true)}
            onNavigate={handleNavigate}
            onBookTutor={handleBookTutor}
          />
        )}
      </main>

      {/* Global Footer with Admin Link */}
      <Footer 
        onOpenAdmin={handleOpenAdmin} 
        setActiveTab={handleNavigate} 
      />

      {/* Credit Checkout & Store Modal */}
      <CreditCheckoutModal
        isOpen={isCreditModalOpen}
        onClose={() => setIsCreditModalOpen(false)}
        userStats={stats}
        onAddCredits={handleAddCredits}
      />

      {/* Admin Dashboard & Operating Expense Modal (Password Protected) */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        userStats={stats}
        onResetApp={() => setStats(INITIAL_USER_STATS)}
        initialTab={adminInitialTab}
        initialCreatorTopic={aiCreatorTopic}
        onOpenCreditModal={() => setIsCreditModalOpen(true)}
        onSpendCredits={handleSpendCredits}
      />
    </div>
  );
}
