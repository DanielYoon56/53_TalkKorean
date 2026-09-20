import React, { useState, useEffect } from 'react';
import { 
  Utensils, Shirt, Home as HomeIcon, BookOpen, Music, 
  Gamepad2, Palette, Joystick, Sparkles, ChevronRight, 
  MessageSquare, ExternalLink 
} from 'lucide-react';
import { K_CULTURE_ITEMS, KCultureCategory, CultureItem } from '../data/kCultureData';
import CultureCardTemplate from './CultureCardTemplate';
import { useLanguage } from '../context/LanguageContext';

export type { KCultureCategory } from '../data/kCultureData';

interface KCultureProps {
  initialCategory?: KCultureCategory;
  onNavigateToChat?: () => void;
  credits?: number;
  onOpenCreditModal?: () => void;
  onSpendCredits?: (amount: number, description: string) => boolean;
  onBookTutor?: (topic?: string) => boolean;
  onNavigateToMyPage?: () => void;
  onNavigateToAiCreator?: (topic: string) => void;
}

const CATEGORY_META: Record<KCultureCategory, { icon: React.ReactNode; labelKo: string; labelEn: string; color: string }> = {
  'K-FOOD': { icon: <Utensils className="w-4 h-4" />, labelKo: 'K-FOOD (한식/식문화)', labelEn: 'Korean Cuisine', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  'K-WEAR': { icon: <Shirt className="w-4 h-4" />, labelKo: 'K-WEAR (한복/패션)', labelEn: 'Hanbok & Fashion', color: 'bg-pink-100 text-pink-800 border-pink-300' },
  'K-HOUSE & PALACE': { icon: <HomeIcon className="w-4 h-4" />, labelKo: 'K-HOUSE & PALACE (한옥/궁궐)', labelEn: 'Hanok & Palaces', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  'K-Literature': { icon: <BookOpen className="w-4 h-4" />, labelKo: 'K-Literature (한국 문학/시)', labelEn: 'Literature & Poetry', color: 'bg-sky-100 text-sky-800 border-sky-300' },
  'K-MUSIC': { icon: <Music className="w-4 h-4" />, labelKo: 'K-MUSIC (K-POP/국악/노래방)', labelEn: 'K-POP, Gugak & Noraebang', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  'K-PLAY': { icon: <Gamepad2 className="w-4 h-4" />, labelKo: 'K-PLAY (전통놀이/예능)', labelEn: 'Folk Games & Drama', color: 'bg-rose-100 text-rose-800 border-rose-300' },
  'K-ART': { icon: <Palette className="w-4 h-4" />, labelKo: 'K-ART (백자/현대미술)', labelEn: 'Ceramics & Fine Art', color: 'bg-teal-100 text-teal-800 border-teal-300' },
  'K-GAME': { icon: <Joystick className="w-4 h-4" />, labelKo: 'K-GAME (e스포츠/PC방)', labelEn: 'eSports & PC Bang', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' }
};

export default function KCulture({
  initialCategory,
  onNavigateToChat,
  credits,
  onOpenCreditModal,
  onSpendCredits,
  onBookTutor,
  onNavigateToMyPage,
  onNavigateToAiCreator
}: KCultureProps) {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<KCultureCategory>(initialCategory || 'K-FOOD');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const handleBookLiveTutor = () => {
    const topic = `K-Culture [${selectedCategory}] 전문 1:1 라이브 화상 코칭`;
    if (onBookTutor) {
      if (onBookTutor(topic)) {
        setBookingSuccess(true);
        setTimeout(() => setBookingSuccess(false), 9000);
      }
    } else if (onSpendCredits) {
      if (onSpendCredits(50, `${t.kculture.bookTutorBtn}`)) {
        setBookingSuccess(true);
        setTimeout(() => setBookingSuccess(false), 9000);
      }
    } else {
      window.open('https://www.edubridge.co.kr', '_blank', 'noopener,noreferrer');
    }
  };

  const categories: KCultureCategory[] = [
    'K-FOOD',
    'K-WEAR',
    'K-HOUSE & PALACE',
    'K-Literature',
    'K-MUSIC',
    'K-PLAY',
    'K-ART',
    'K-GAME'
  ];

  const categoryItems = React.useMemo(
    () => K_CULTURE_ITEMS.filter((item) => item.category === selectedCategory),
    [selectedCategory]
  );

  const [selectedItemId, setSelectedItemId] = useState<string>(
    () => categoryItems[0]?.id || K_CULTURE_ITEMS[0].id
  );

  // Sync when initialCategory prop changes
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      const items = K_CULTURE_ITEMS.filter((item) => item.category === initialCategory);
      if (items.length > 0) {
        setSelectedItemId(items[0].id);
      }
    }
  }, [initialCategory]);

  const handleSelectCategory = (cat: KCultureCategory) => {
    setSelectedCategory(cat);
    const items = K_CULTURE_ITEMS.filter((item) => item.category === cat);
    if (items.length > 0) {
      setSelectedItemId(items[0].id);
    }
  };

  const selectedItem =
    K_CULTURE_ITEMS.find((item) => item.id === selectedItemId) ||
    categoryItems[0] ||
    K_CULTURE_ITEMS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="bg-white border border-editorial-border rounded-sm p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-mono font-bold bg-editorial-text text-white">
                K-CULTURE CENTER
              </span>
              <span className="text-xs font-bold text-editorial-accent uppercase tracking-widest">
                Korean Cultural Learning Center
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-text tracking-tight">
              K-Culture: 8 Pillars of Korean Language & Heritage
            </h1>
            <p className="text-sm text-editorial-muted max-w-3xl leading-relaxed">
              Explore authentic Korean food (K-FOOD), fashion (K-WEAR), architecture (K-HOUSE & PALACE), literature (K-Literature), music (K-MUSIC), games (K-PLAY), ceramics & art (K-ART), and eSports (K-GAME) with contextual vocabulary and expressions.
            </p>
          </div>


        </div>
      </div>

      {/* Category Navigation Bar (8 Categories) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-editorial-border/60">
        {categories.map((cat) => {
          const meta = CATEGORY_META[cat];
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleSelectCategory(cat)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-sm text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-editorial-text text-white shadow-sm'
                  : 'bg-white hover:bg-editorial-accent-light/40 text-editorial-text border border-editorial-border'
              }`}
            >
              {meta.icon}
              <span>{cat}</span>
              <span className={`text-[10px] hidden sm:inline ${isActive ? 'text-neutral-300' : 'text-editorial-muted'}`}>({meta.labelEn})</span>
            </button>
          );
        })}
      </div>

      {/* Topic Selector Tabs (e.g., in K-FOOD: Bibimbap, Traditional Kimchi Making, Tteokbokki, Samgyeopsal) */}
      {categoryItems.length > 1 && (
        <div className="bg-white border border-editorial-border p-4 rounded-sm space-y-3 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-editorial-border/50 pb-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-editorial-accent uppercase tracking-wider">
                📚 {selectedCategory} Curated Topics ({categoryItems.length})
              </span>
            </div>
            <span className="text-xs text-editorial-muted">
              Select a topic to explore essential vocabulary, heritage, and native expressions
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categoryItems.map((item, idx) => {
              const active = selectedItem.id === item.id;
              const englishTitle = (item.titleEn || '')
                .replace('Taste of Korean Culture: ', '')
                .replace('Traditional Korean ', '')
                .trim() || item.titleKo;
              const koreanTitle = item.titleKo
                .replace('Taste of Korean Culture: ', '')
                .replace(/\(.*\)/, '')
                .trim();
              const isKimchi = item.id === 'food-kimchi';

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedItemId(item.id)}
                  className={`px-4 py-2.5 rounded-sm text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                    active
                      ? 'bg-editorial-text text-white shadow-sm border border-editorial-text'
                      : 'bg-editorial-bg text-editorial-text hover:bg-editorial-accent-light/50 border border-editorial-border'
                  }`}
                >
                  <span
                    className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded-sm ${
                      active
                        ? 'bg-editorial-accent text-white'
                        : 'bg-white text-editorial-muted border border-editorial-border'
                    }`}
                  >
                    #{idx + 1}
                  </span>
                  <span>{englishTitle}</span>
                  <span className={`text-[10px] ${active ? 'text-neutral-300' : 'text-neutral-500'}`}>({koreanTitle})</span>
                  {isKimchi && (
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-sm ${
                        active
                          ? 'bg-amber-400 text-black'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      NEW • UNESCO
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* AI Creator Quick Bridge Banner */}
      {selectedItem && onNavigateToAiCreator && (
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-amber-950 text-white p-4 sm:p-5 rounded-sm border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 bg-amber-400 text-black rounded-sm font-extrabold text-xs tracking-wider">
              ✨ AI CREATOR
            </span>
            <div>
              <div className="text-xs sm:text-sm font-bold text-amber-300">
                이 주제로 AI 블로그 원고 & 60초 쇼츠 대본 자동생성하기
              </div>
              <div className="text-[11px] text-neutral-300">
                "{selectedItem.titleKo}"의 깊은 배경과 뉘앙스를 네이버 블로그 글과 유튜브 쇼츠 씬별 대본으로 원클릭 제작!
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigateToAiCreator(`${selectedItem.titleKo} - ${selectedItem.titleEn}`)}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black rounded-sm text-xs font-black transition-all cursor-pointer whitespace-nowrap shadow-sm hover:shadow-md"
          >
            원고 & 대본 자동생성 스튜디오 열기 →
          </button>
        </div>
      )}

      {/* Main Culture Lesson Card using Reusable Template */}
      {selectedItem && (
        <CultureCardTemplate
          item={selectedItem}
          showHeaderTitle={true}
          onSelectCategory={handleSelectCategory}
        />
      )}

      {/* Bottom Section: 8 Categories Shortcuts & 1:1 Live Tutor Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-editorial-border">
        {/* Category Shortcuts */}
        <div className="lg:col-span-8 bg-white border border-editorial-border rounded-sm p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-editorial-border pb-3">
            <h3 className="text-sm font-serif font-bold text-editorial-text">
              8 Signature K-Culture Categories (8대 전문 카테고리 빠른 이동)
            </h3>
            <span className="text-xs text-editorial-muted font-medium">Total {K_CULTURE_ITEMS.length} Curations ({K_CULTURE_ITEMS.length}개 학습)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {categories.map((cat) => {
              const meta = CATEGORY_META[cat];
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleSelectCategory(cat)}
                  className={`flex items-center justify-between p-2.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-editorial-text text-white'
                      : 'hover:bg-editorial-bg text-editorial-text border border-editorial-border/60'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 truncate">
                    {meta.icon}
                    <span className="truncate">{cat}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-white' : 'text-editorial-muted'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* 1:1 Live Tutor Linkage & Monetization Banner */}
        <div className="lg:col-span-4 bg-editorial-accent-light/50 border border-editorial-accent/30 rounded-sm p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-editorial-accent animate-pulse"></span>
              <span className="text-xs font-bold text-editorial-accent uppercase tracking-wider">
                1:1 Live Tutor System
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold bg-white px-2 py-0.5 rounded-sm border border-editorial-border">
              {t.lyricsLab.balance}: {credits !== undefined ? `${credits} CR` : '120 CR'}
            </span>
          </div>

          <h4 className="text-sm font-serif font-bold text-editorial-text">
            {t.kculture.tutorBannerTitle}
          </h4>
          <p className="text-xs text-editorial-text/80 leading-relaxed">
            {t.kculture.tutorBannerDesc}
          </p>

          {bookingSuccess && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-sm text-xs text-emerald-900 font-medium animate-in fade-in duration-200 space-y-2">
              <div>{t.kculture.bookingConfirmed}</div>
              {onNavigateToMyPage && (
                <button
                  onClick={onNavigateToMyPage}
                  className="w-full py-1.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-sm font-bold flex items-center justify-center space-x-1 transition-colors cursor-pointer text-[11px]"
                >
                  <span>👉 마이페이지에서 예약 확인 및 화상 링크 보기</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          <div className="space-y-2 pt-1">
            <button
              onClick={handleBookLiveTutor}
              className="w-full py-2.5 bg-editorial-text hover:bg-editorial-accent text-white rounded-sm text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <span>{t.kculture.bookTutorBtn}</span>
            </button>
            <div className="flex items-center justify-between text-[11px] text-editorial-muted">
              <span>{t.kculture.needMoreCredits}</span>
              <button
                onClick={() => onOpenCreditModal?.()}
                className="text-amber-700 hover:underline font-bold cursor-pointer"
              >
                {t.kculture.rechargeLink}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

