import React, { useState, useEffect } from 'react';
import { 
  Utensils, Shirt, Home as HomeIcon, BookOpen, Music, 
  Gamepad2, Palette, Joystick, Sparkles, ChevronRight, 
  MessageSquare, ExternalLink, Quote, ScrollText, Check
} from 'lucide-react';
import { K_CULTURE_ITEMS, KCultureCategory, CultureItem, getGenreEnglish, getSubgenreEnglish } from '../data/kCultureData';
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

interface LiteratureSubmenuItem {
  id: string;
  labelKo: string;
  labelEn: string;
  icon: string;
  badge?: string;
  defaultItemId: string;
  description: string;
  subgenres?: { id: string; labelKo: string; labelEn: string; itemId: string }[];
}

const LITERATURE_SUBMENUS: LiteratureSubmenuItem[] = [
  { 
    id: 'ALL', 
    labelEn: 'All Genres', 
    labelKo: '전체 문학 (13편)', 
    icon: '📚', 
    defaultItemId: 'lit-myth-dangun',
    description: '신화부터 현대문학까지 10대 한국 문학 장르 총망라'
  },
  { 
    id: '신화', 
    labelEn: 'Mythology', 
    labelKo: '신화', 
    icon: '🏛️', 
    badge: '건국신화', 
    defaultItemId: 'lit-myth-dangun',
    description: '단군신화: 고조선 건국과 홍익인간(弘益人間)의 이념'
  },
  { 
    id: '전설', 
    labelEn: 'Legend', 
    labelKo: '전설', 
    icon: '🏔️', 
    badge: '민중영웅', 
    defaultItemId: 'lit-legend-uturi',
    description: '아기장수 우투리 전설: 날개 달린 비운의 영웅과 민중의 염원'
  },
  { 
    id: '민담(야담)', 
    labelEn: 'Folktale & Yadam', 
    labelKo: '민담(야담)', 
    icon: '📜', 
    badge: '전래설화', 
    defaultItemId: 'lit-folktale-sun-moon',
    description: '해와 달이 된 오누이 & 조선 야담: 지혜와 권선징악'
  },
  { 
    id: '전래동화', 
    labelEn: 'Traditional Fairy Tale', 
    labelKo: '전래동화', 
    icon: '✨', 
    badge: '보은·우애', 
    defaultItemId: 'lit-fairytale-heungbu',
    description: '흥부와 놀부: 제비의 은혜 갚기와 슬근슬근 박 타기, 형제 우애'
  },
  { 
    id: '속담', 
    labelEn: 'Proverbs', 
    labelKo: '속담', 
    icon: '💬', 
    badge: '생활지혜', 
    defaultItemId: 'lit-proverb-wisdom',
    description: '삶과 지혜의 속담: "가는 말이 고와야 오는 말이 곱다" 외'
  },
  { 
    id: '수수께끼', 
    labelEn: 'Riddles', 
    labelKo: '수수께끼', 
    icon: '❓', 
    badge: '언어유희', 
    defaultItemId: 'lit-riddle-mystery',
    description: '전통 지혜 수수께끼: 언어유희와 비유적 연상 놀이'
  },
  { 
    id: '고전소설', 
    labelEn: 'Classical Novels', 
    labelKo: '고전소설 (4대 갈래)', 
    icon: '📖', 
    badge: '4대 갈래', 
    defaultItemId: 'lit-classic-honggildong',
    description: '영웅·애정·세태·우화 4대 고전소설 갈래별 대표작',
    subgenres: [
      { id: 'ALL', labelEn: 'All Classics', labelKo: '전체 고전소설', itemId: 'lit-classic-honggildong' },
      { id: '고전소설', labelEn: 'Heroic Novel', labelKo: '고전 영웅소설 (허균 <홍길동전>)', itemId: 'lit-classic-honggildong' },
      { id: '애정소설', labelEn: 'Romance Novel', labelKo: '고전 애정소설 (<춘향전>)', itemId: 'lit-romance-chunhyang' },
      { id: '세태소설', labelEn: 'Satirical Novel', labelKo: '고전 세태소설 (<배비장전>)', itemId: 'lit-satire-baebijang' },
      { id: '우화소설', labelEn: 'Fable Novel', labelKo: '고전 우화소설 (<토끼전>)', itemId: 'lit-fable-rabbit' },
    ]
  },
  { 
    id: '현대소설', 
    labelEn: 'Modern Novel', 
    labelKo: '현대소설', 
    icon: '📚', 
    badge: '농촌해학', 
    defaultItemId: 'lit-modern-spring',
    description: '김유정 <봄·봄>: 점순이와 데릴사위의 구수한 농촌 해학'
  },
  { 
    id: '현대희곡', 
    labelEn: 'Modern Drama', 
    labelKo: '현대희곡', 
    icon: '🎭', 
    badge: '전통희극', 
    defaultItemId: 'lit-play-wedding',
    description: '오영진 <시집가는 날 (맹진사댁 경사)>: 인간의 허영심 풍자'
  },
  { 
    id: '현대수필', 
    labelEn: 'Modern Essay', 
    labelKo: '현대수필', 
    icon: '🖋️', 
    badge: '서정수필', 
    defaultItemId: 'lit-essay-inyeon',
    description: '피천득 <인연>: 세 번의 만남과 은은한 서정의 미학'
  },
  { 
    id: '서정시', 
    labelEn: 'Lyric Poetry', 
    labelKo: '서정시', 
    icon: '🌸', 
    badge: '민족시', 
    defaultItemId: 'lit-poetry-1',
    description: '윤동주 <서시>: 부끄러움 없는 삶과 순결한 양심'
  },
];

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
  const [litGenre, setLitGenre] = useState<string>('ALL');
  const [litSubgenre, setLitSubgenre] = useState<string>('ALL');

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
    if (cat === 'K-Literature') {
      setLitGenre('ALL');
      setLitSubgenre('ALL');
    }
  };

  const handleSelectLitGenre = (genreId: string) => {
    setLitGenre(genreId);
    setLitSubgenre('ALL');
    const submenu = LITERATURE_SUBMENUS.find((s) => s.id === genreId);
    if (submenu && submenu.defaultItemId) {
      setSelectedItemId(submenu.defaultItemId);
    }
  };

  const handleSelectLitSubgenre = (subId: string, itemId: string) => {
    setLitSubgenre(subId);
    setSelectedItemId(itemId);
  };

  const displayedLiteratureItems = React.useMemo(() => {
    if (selectedCategory !== 'K-Literature') return categoryItems;
    if (litGenre === 'ALL') return categoryItems;
    if (litGenre === '고전소설') {
      if (litSubgenre === 'ALL') {
        return categoryItems.filter((item) => item.literatureGenre === '고전소설');
      }
      return categoryItems.filter(
        (item) => item.literatureGenre === '고전소설' && item.literatureSubgenre === litSubgenre
      );
    }
    return categoryItems.filter((item) => item.literatureGenre === litGenre);
  }, [selectedCategory, categoryItems, litGenre, litSubgenre]);

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

      {/* If K-Literature: Dedicated Genre Submenus & Published Samples Showcase */}
      {selectedCategory === 'K-Literature' ? (
        <div className="bg-white border-2 border-sky-300 rounded-sm p-5 sm:p-6 space-y-5 shadow-xs">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-editorial-border/60 pb-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-sm text-xs font-mono font-bold bg-sky-900 text-white">
                  <BookOpen className="w-3.5 h-3.5 mr-1" /> K-LITERATURE SUBMENU
                </span>
                <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                  한국 문학 10대 장르 체계적 분류 & 대표 샘플
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-editorial-text">
                K-Literature: 신화부터 현대문학까지 10대 장르 탐구
              </h2>
              <p className="text-xs text-editorial-muted">
                신화, 전설, 민담(야담), 전래동화, 속담, 수수께끼, 고전소설(영웅·애정·세태·우화), 현대소설, 현대희곡, 현대수필 장르별 대표 샘플을 하나씩 감상해 보세요.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-sky-900 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-sm shrink-0 flex items-center space-x-2">
              <span>총 13편 명작 큐레이션 수록</span>
            </div>
          </div>

          {/* 9대 장르 서브메뉴 탭 버튼 (LITERATURE_SUBMENUS) */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-editorial-muted flex items-center justify-between">
              <span>장르 서브메뉴 선택 (Select Genre Submenu)</span>
              {litGenre !== 'ALL' && (
                <button
                  onClick={() => handleSelectLitGenre('ALL')}
                  className="text-sky-700 hover:underline cursor-pointer font-semibold text-xs"
                >
                  전체 장르 보기 (View All)
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {LITERATURE_SUBMENUS.map((sub) => {
                const isActive = litGenre === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => handleSelectLitGenre(sub.id)}
                    className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-sm transition-all cursor-pointer text-left ${
                      isActive
                        ? 'bg-sky-900 text-white shadow-xs border border-sky-900 ring-2 ring-sky-300'
                        : 'bg-editorial-bg text-editorial-text hover:bg-sky-100/70 border border-editorial-border hover:border-sky-300'
                    }`}
                  >
                    <span className="text-base shrink-0">{sub.icon}</span>
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs sm:text-sm font-bold tracking-tight font-sans">
                        {sub.labelEn}
                      </span>
                      <span className={`text-[10px] font-medium ${isActive ? 'text-sky-200' : 'text-neutral-500'}`}>
                        {sub.labelKo}
                      </span>
                    </div>
                    {sub.badge && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-sm font-normal shrink-0 ml-1 hidden lg:inline-block ${
                        isActive ? 'bg-sky-700 text-sky-100' : 'bg-white text-editorial-muted border border-editorial-border'
                      }`}>
                        {sub.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 고전소설 하위 세부 갈래 4종 선택 바 (고전소설 선택 시 활성화) */}
          {litGenre === '고전소설' && (
            <div className="bg-sky-50/80 border border-sky-200 p-3.5 rounded-sm space-y-2 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-bold text-sky-950">
                <span className="flex items-center space-x-1.5">
                  <span className="font-sans font-bold">📖 Classical Novels Subgenres:</span>
                  <span className="text-sky-800 text-[11px] font-medium">(영웅·애정·세태·우화소설 4대 갈래)</span>
                </span>
                <span className="text-[11px] text-sky-800">원하시는 갈래를 클릭하면 해당 대표작으로 즉시 전환됩니다</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {LITERATURE_SUBMENUS.find((s) => s.id === '고전소설')?.subgenres?.map((subg) => {
                  const isActive = (subg.id === 'ALL' && litSubgenre === 'ALL') || litSubgenre === subg.id || selectedItemId === subg.itemId;
                  return (
                    <button
                      key={subg.id}
                      onClick={() => handleSelectLitSubgenre(subg.id, subg.itemId)}
                      className={`px-3 py-1.5 rounded-sm transition-all cursor-pointer text-left ${
                        isActive
                          ? 'bg-sky-800 text-white shadow-xs ring-1 ring-sky-300'
                          : 'bg-white text-sky-950 hover:bg-sky-100 border border-sky-300'
                      }`}
                    >
                      <div className="flex flex-col leading-tight">
                        <span className="text-xs sm:text-sm font-bold tracking-tight font-sans">
                          {subg.labelEn}
                        </span>
                        <span className={`text-[10px] font-medium ${isActive ? 'text-sky-200' : 'text-neutral-500'}`}>
                          {subg.labelKo}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 장르별 대표 샘플 갤러리 카드 목록 */}
          <div className="space-y-3 pt-2 border-t border-editorial-border/60">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-editorial-text flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>장르별 대표 게시 샘플 ({displayedLiteratureItems.length}편)</span>
              </h3>
              <span className="text-[11px] text-editorial-muted">
                카드를 클릭하여 상세 해설, 핵심 어휘, 대표 원문 낭독(TTS)을 확인하세요
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {displayedLiteratureItems.map((item) => {
                const isCurrent = selectedItem.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItemId(item.id)}
                    className={`p-3.5 rounded-sm border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                      isCurrent
                        ? 'bg-sky-50/90 border-2 border-sky-600 shadow-sm ring-1 ring-sky-400/30'
                        : 'bg-editorial-bg/40 hover:bg-sky-50/40 border-editorial-border hover:border-sky-300'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-1">
                        <div className="inline-flex items-baseline space-x-1.5 px-2 py-0.5 rounded-sm bg-editorial-text text-white">
                          <span className="text-xs font-bold tracking-tight font-sans">
                            {getGenreEnglish(item.literatureGenre)}
                            {item.literatureSubgenre ? ` • ${getSubgenreEnglish(item.literatureSubgenre)}` : ''}
                          </span>
                          <span className="text-[10px] text-neutral-300 font-medium">
                            ({item.literatureGenre}{item.literatureSubgenre ? ` · ${item.literatureSubgenre}` : ''})
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-editorial-muted truncate">
                          {item.badge}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-editorial-text leading-snug line-clamp-1">
                        {item.titleKo}
                      </h4>
                      <p className="text-[11px] text-editorial-muted line-clamp-2 leading-relaxed">
                        {item.subtitleKo}
                      </p>
                    </div>

                    {item.literatureExcerpt && (
                      <div className="p-2 bg-white border border-sky-200/80 rounded-sm text-[11px] font-serif italic text-neutral-800 line-clamp-2">
                        "{item.literatureExcerpt.quoteKo}"
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1 border-t border-editorial-border/40 text-[11px]">
                      <span className="text-editorial-muted font-medium">
                        {item.literatureExcerpt?.authorOrSource || '전승 설화'}
                      </span>
                      <span className={`font-bold ${isCurrent ? 'text-sky-700' : 'text-neutral-500'}`}>
                        {isCurrent ? '✓ 현재 학습 중' : '샘플 읽기 →'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Original Category Topics Selector */
        categoryItems.length > 1 && (
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
        )
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

