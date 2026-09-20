import React, { useState } from 'react';
import { 
  Volume2, Sparkles, BookOpen, Search, Filter, 
  HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw, 
  Layers, Smile, CloudRain, Flame, Heart, Zap, Award, 
  MessageSquare, Play, RefreshCw, Bookmark, Share2, Music
} from 'lucide-react';
import { speakKoreanText } from '../../utils/tts';
import { 
  ONOMATOPOEIA_ITEMS, 
  VOWEL_NUANCE_PAIRS, 
  WEBTOON_SCENES, 
  SOUND_QUIZZES,
  OnomatopoeiaItem 
} from '../../data/onomatopoeiaData';

interface OnomatopoeiaMenuProps {
  credits?: number;
  onSpendCredits?: (amount: number, description: string) => boolean;
  onOpenCreditModal?: () => void;
  onAddXp?: (xp: number) => void;
}

// Helper to highlight onomatopoeia / mimetic words in red text (적색 글씨)
function highlightOnomatopoeia(text: string, targetWords: string | string[]) {
  if (!text) return text;
  const rawList = Array.isArray(targetWords) ? targetWords : [targetWords];
  const wordsToMatch: string[] = [];
  rawList.forEach(w => {
    if (!w) return;
    w.split(/[\s&,·/]+/).forEach(tok => {
      const trimmed = tok.trim();
      if (trimmed.length > 0 && !wordsToMatch.includes(trimmed)) {
        wordsToMatch.push(trimmed);
      }
    });
  });

  if (wordsToMatch.length === 0) return text;

  // Sort by length descending so longer words/phrases are matched first
  wordsToMatch.sort((a, b) => b.length - a.length);

  const escaped = wordsToMatch.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'g');

  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, index) => {
        if (wordsToMatch.includes(part)) {
          return (
            <span key={index} className="text-red-600 font-black">
              {part}
            </span>
          );
        }
        return part;
      })}
    </>
  );
}

export default function OnomatopoeiaMenu({ 
  credits = 100, 
  onSpendCredits, 
  onOpenCreditModal, 
  onAddXp 
}: OnomatopoeiaMenuProps) {
  const [activeTab, setActiveTab] = useState<'explorer' | 'nuance' | 'webtoon' | 'quiz' | 'ai-generator'>('explorer');
  const [filterType, setFilterType] = useState<'all' | '의성어' | '의태어'>('all');
  const [filterSubType, setFilterSubType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<OnomatopoeiaItem | null>(ONOMATOPOEIA_ITEMS[0]);

  // Quiz state
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // AI Sentence Generator state
  const [aiSelectedWord, setAiSelectedWord] = useState<string>('두근두근');
  const [aiSituation, setAiSituation] = useState<string>('첫 데이트 / 고백');
  const [aiResult, setAiResult] = useState<{
    korean: string;
    english: string;
    breakdown: string;
    tip: string;
  } | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);

  // Audio helper
  const handlePlayVoice = (text: string, rate: number = 0.9) => {
    speakKoreanText(text, {
      role: 'ai',
      rate,
      forceImmediate: true
    });
  };

  const handleToggleBookmark = (id: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(prev => prev.filter(x => x !== id));
    } else {
      setBookmarkedIds(prev => [...prev, id]);
      if (onAddXp) onAddXp(10);
    }
  };

  // Filtered onomatopoeia items
  const filteredItems = ONOMATOPOEIA_ITEMS.filter(item => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSubType = filterSubType === 'all' || item.subType === filterSubType;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      item.word.toLowerCase().includes(q) || 
      item.meaningKo.toLowerCase().includes(q) || 
      item.meaningEn.toLowerCase().includes(q) ||
      item.romanized.toLowerCase().includes(q);
    return matchesType && matchesSubType && matchesSearch;
  });

  // Quiz handler
  const handleSelectQuizOption = (idx: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(idx);
  };

  const handleCheckQuizAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerChecked(true);
    const currentQ = SOUND_QUIZZES[currentQuizIdx];
    if (selectedOption === currentQ.correctIndex) {
      setQuizScore(prev => prev + 1);
      if (onAddXp) onAddXp(20);
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIdx + 1 < SOUND_QUIZZES.length) {
      setCurrentQuizIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  // AI Sentence Generator handler
  const handleGenerateSentence = () => {
    if (onSpendCredits) {
      const allowed = onSpendCredits(1, `[AI 표현 생성] 의성어·의태어(${aiSelectedWord}) 예문`);
      if (!allowed) {
        if (onOpenCreditModal) onOpenCreditModal();
        return;
      }
    }

    setIsGeneratingAi(true);

    // Contextual smart generator simulation with realistic sentences
    setTimeout(() => {
      let generatedKorean = '';
      let generatedEnglish = '';
      let generatedBreakdown = '';
      let generatedTip = '';

      if (aiSelectedWord === '두근두근') {
        generatedKorean = '처음 만나는 자리라 가슴이 두근두근 뛰어서 무슨 말을 해야 할지 몰랐어요.';
        generatedEnglish = 'Because it was our first time meeting, my heart thumped so loudly that I didn’t know what to say.';
        generatedBreakdown = '가슴이 두근두근 뛰다 (heart beats with excitement/nervousness) + 무슨 말을 해야 할지 모르다 (not knowing what to say)';
        generatedTip = '고백이나 데이트뿐만 아니라 면접 직전, 시험 발표 직전의 긴장감에도 똑같이 활용할 수 있습니다.';
      } else if (aiSelectedWord === '보글보글') {
        generatedKorean = '칼바람 부는 추운 날씨에 뚝배기에서 보글보글 끓어오르는 된장찌개가 최고예요.';
        generatedEnglish = 'On a biting cold day, a soybean paste stew bubbling away in an earthenware pot is unbeatable.';
        generatedBreakdown = '보글보글 끓어오르다 (simmer/bubble vigorously) + 뚝배기 (traditional Korean earthenware pot)';
        generatedTip = '한국 식당에서 찌개를 주문하고 "보글보글 맛있게 끓여주세요!"라고 친근하게 말하면 매우 자연스럽습니다.';
      } else if (aiSelectedWord === '살금살금') {
        generatedKorean = '가족들이 깰까 봐 조심하며 방바닥을 살금살금 발끝으로 걸어갔어요.';
        generatedEnglish = 'Careful not to wake my family, I tiptoed across the floor on my toes quietly.';
        generatedBreakdown = '살금살금 걸어가다 (creep stealthily on tiptoe) + 발끝으로 걷다 (walk on tiptoe)';
        generatedTip = '장난칠 때 "살금살금 다가가서 깜짝 놀라게 해줘야지!"처럼 대화에서도 자주 쓰입니다.';
      } else if (aiSelectedWord === '꽁냥꽁냥') {
        generatedKorean = '두 사람이 마주 보고 앉아서 꽁냥꽁냥 이야기하는 모습이 참 예쁘네요.';
        generatedEnglish = 'Seeing the two of them sitting opposite each other being so lovey-dovey is truly lovely.';
        generatedBreakdown = '꽁냥꽁냥 이야기하다 (chat affectionately / whisper sweet nothings) + 모습이 참 예쁘다 (such a lovely sight)';
        generatedTip = '연인들의 알콩달콩한 모습을 흐뭇하게 바라보며 칭찬할 때 쓰는 트렌디한 표현입니다.';
      } else {
        generatedKorean = `상황에 어울리게 "${aiSelectedWord}"을(를) 활용하여 일상에서 아주 자연스러운 문장을 구사해 보세요.`;
        generatedEnglish = `Try using "${aiSelectedWord}" in daily life to bring your Korean expression to vibrant life.`;
        generatedBreakdown = `${aiSelectedWord} (핵심 수식 부사) + 자연스러운 서술어 호응`;
        generatedTip = '한국어 의성어와 의태어는 형용사나 동사 바로 앞에서 수식할 때 생생한 감정이 200% 전달됩니다.';
      }

      setAiResult({
        korean: generatedKorean,
        english: generatedEnglish,
        breakdown: generatedBreakdown,
        tip: generatedTip
      });
      setIsGeneratingAi(false);
      if (onAddXp) onAddXp(15);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-[#18181B] text-white rounded-xl p-5 sm:p-6 border border-neutral-800 space-y-3 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center space-x-1">
                <Music className="w-3.5 h-3.5 text-amber-400" />
                <span>Korean Onomatopoeia & Mimetic Words (의성어·의태어)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Dugeun-dugeun • Bogeul-bogeul • Salgeum-salgeum
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              Express Sounds & Movements with Korean Sensory Words
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-3xl leading-relaxed">
              Master <strong>sound words (의성어)</strong> and <strong>manner/motion words (의태어)</strong> to express sensory details and speak naturally like native Koreans.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-neutral-800">
          <button
            onClick={() => setActiveTab('explorer')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'explorer'
                ? 'bg-amber-400 text-neutral-950 shadow-xs'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Vocabulary Catalog ({filteredItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('nuance')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'nuance'
                ? 'bg-amber-400 text-neutral-950 shadow-xs'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Vowel Nuance Pairs (Light vs Dark)</span>
          </button>

          <button
            onClick={() => setActiveTab('webtoon')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'webtoon'
                ? 'bg-amber-400 text-neutral-950 shadow-xs'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Webtoon & Daily Scenes</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'quiz'
                ? 'bg-amber-400 text-neutral-950 shadow-xs'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Speed Quiz Challenge</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-generator')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'ai-generator'
                ? 'bg-amber-400 text-neutral-950 shadow-xs'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>AI Sentence Generator (1 CR)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: VOCABULARY EXPLORER */}
      {activeTab === 'explorer' && (
        <div className="space-y-4">
          {/* Filter & Search Bar */}
          <div className="bg-white border border-editorial-border rounded-xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-neutral-700 flex items-center space-x-1 mr-1">
                <Filter className="w-3.5 h-3.5 text-editorial-accent" />
                <span>분류:</span>
              </span>
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                전체 ({ONOMATOPOEIA_ITEMS.length})
              </button>
              <button
                onClick={() => setFilterType('의성어')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                  filterType === '의성어'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
              >
                🎵 의성어 (소리 흉내)
              </button>
              <button
                onClick={() => setFilterType('의태어')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                  filterType === '의태어'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                💃 의태어 (모습·동작)
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="단어/의미 검색 (예: 두근두근, 비, 찌개)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 transition-colors"
              />
            </div>
          </div>

          {/* Word List and Detail Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Cards Grid (7 Cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredItems.map(item => {
                  const isSelected = selectedWord?.id === item.id;
                  const isBookmarked = bookmarkedIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedWord(item)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2.5 relative group ${
                        isSelected
                          ? 'bg-amber-50/50 border-amber-400 shadow-xs ring-1 ring-amber-400'
                          : 'bg-white border-neutral-200 hover:border-neutral-400 hover:shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{item.emoji}</span>
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <h3 className="text-lg font-bold font-serif text-red-600 tracking-tight">
                                {item.word}
                              </h3>
                              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                                item.type === '의성어'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              }`}>
                                {item.type}
                              </span>
                            </div>
                            <span className="text-[11px] text-neutral-500 font-mono">
                              ({item.romanized})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleBookmark(item.id);
                            }}
                            className={`p-1.5 rounded hover:bg-neutral-100 cursor-pointer ${
                              isBookmarked ? 'text-amber-500' : 'text-neutral-400'
                            }`}
                            title="단어장 저장"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayVoice(item.word);
                            }}
                            className="p-1.5 rounded text-neutral-600 hover:text-editorial-accent hover:bg-neutral-100 cursor-pointer"
                            title="원어민 발음 듣기"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-neutral-800">
                          {item.meaningKo}
                        </p>
                        <p className="text-[11px] text-neutral-500 line-clamp-1 italic">
                          {item.meaningEn}
                        </p>
                      </div>

                      <div className="pt-1.5 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
                        <span className="bg-neutral-100 px-1.5 py-0.5 rounded text-[10px] font-medium text-neutral-600">
                          #{item.subType}
                        </span>
                        <span className="text-editorial-accent font-bold text-[10px] flex items-center group-hover:translate-x-0.5 transition-transform">
                          상세 보기 →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredItems.length === 0 && (
                <div className="p-12 text-center bg-white rounded-xl border border-neutral-200 space-y-2">
                  <p className="text-neutral-500 text-sm">검색 결과에 맞는 어휘가 없습니다.</p>
                  <button
                    onClick={() => { setSearchQuery(''); setFilterType('all'); setFilterSubType('all'); }}
                    className="text-xs font-bold text-editorial-accent hover:underline cursor-pointer"
                  >
                    전체 목록 초기화
                  </button>
                </div>
              )}
            </div>

            {/* Selected Word Detail View (5 Cols) */}
            <div className="lg:col-span-5">
              {selectedWord ? (
                <div className="sticky top-20 bg-white border border-editorial-border rounded-xl p-5 shadow-sm space-y-4">
                  <div className="flex items-start justify-between border-b border-neutral-100 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-3xl">{selectedWord.emoji}</span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-2xl font-serif font-black text-red-600">
                              {selectedWord.word}
                            </h3>
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                              selectedWord.type === '의성어'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}>
                              {selectedWord.type}
                            </span>
                          </div>
                          <p className="text-xs font-mono text-neutral-500">
                            [{selectedWord.romanized}]
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <button
                        type="button"
                        onClick={() => handlePlayVoice(selectedWord.word, 0.75)}
                        className="px-2.5 py-1 text-[11px] font-bold bg-neutral-100 text-neutral-700 hover:bg-neutral-200 rounded cursor-pointer"
                        title="0.75배속 천천히 발음"
                      >
                        0.75x
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePlayVoice(selectedWord.word, 1.0)}
                        className="px-3 py-1 text-xs font-bold bg-neutral-900 text-white hover:bg-neutral-800 rounded flex items-center space-x-1 cursor-pointer"
                        title="원어민 표준 발음"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>듣기</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                      의미 & 뉘앙스 (Meaning)
                    </div>
                    <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
                      <p className="text-sm font-bold text-neutral-900">{selectedWord.meaningKo}</p>
                      <p className="text-xs text-neutral-600 italic">{selectedWord.meaningEn}</p>
                    </div>
                  </div>

                  {/* Contrast Pair if exists */}
                  {selectedWord.pairWord && (
                    <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs space-y-1">
                      <span className="font-bold text-amber-900 flex items-center space-x-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>함께 알아두면 좋은 짝꿍 표현: <strong className="text-red-600 font-bold">{selectedWord.pairWord.word}</strong></span>
                      </span>
                      <p className="text-amber-800 text-[11px] leading-relaxed">
                        {selectedWord.pairWord.nuance}
                      </p>
                    </div>
                  )}

                  {/* Real-Life Example Sentence */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-neutral-500 uppercase tracking-wider">
                      <span>실생활 활용 예문 (Example)</span>
                      <button
                        onClick={() => handlePlayVoice(selectedWord.exampleKo)}
                        className="text-[11px] text-editorial-accent font-bold hover:underline flex items-center space-x-1 cursor-pointer"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>예문 발음</span>
                      </button>
                    </div>
                    <div className="p-3 bg-editorial-bg border border-editorial-border rounded-lg space-y-1.5">
                      <p className="text-xs sm:text-sm font-bold text-neutral-900 leading-relaxed font-serif">
                        {highlightOnomatopoeia(selectedWord.exampleKo, selectedWord.word)}
                      </p>
                      <p className="text-xs text-neutral-600 italic leading-relaxed">
                        {selectedWord.exampleEn}
                      </p>
                    </div>
                  </div>

                  {/* Cultural & Webtoon Nuance Tip */}
                  <div className="p-3 bg-purple-50/60 border border-purple-200 rounded-lg text-xs space-y-1.5">
                    <div className="font-bold text-purple-950 flex items-center space-x-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                      <span>K-Culture & 웹툰 효과음 팁</span>
                    </div>
                    <p className="text-[11px] text-purple-900 leading-relaxed">
                      {selectedWord.webtoonContext}
                    </p>
                    <p className="text-[11px] text-purple-700 font-medium">
                      💡 {selectedWord.nuanceTip}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-white border border-neutral-200 rounded-xl text-neutral-400 text-xs">
                  어휘 카드를 클릭하면 상세 해설과 예문이 표시됩니다.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VOWEL HARMONY NUANCE GUIDE */}
      {activeTab === 'nuance' && (
        <div className="space-y-5">
          <div className="bg-white border border-editorial-border rounded-xl p-5 shadow-xs space-y-2">
            <h3 className="font-serif font-bold text-base text-neutral-900 flex items-center space-x-2">
              <Layers className="w-5 h-5 text-amber-500" />
              <span>한국어 모음조화의 신비: 양성 모음 vs 음성 모음 미세 어감 차이</span>
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed max-w-3xl">
              한국어는 모음의 종류에 따라 같은 의미라도 크기, 무게, 밝기, 분위기가 완전히 달라집니다.
              <strong>양성 모음(ㅏ, ㅗ)</strong>은 작고, 가볍고, 밝고, 귀여운 느낌을 주며,
              <strong>음성 모음(ㅓ, ㅜ)</strong>은 크고, 무겁고, 어둡고, 둔탁한 느낌을 줍니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VOWEL_NUANCE_PAIRS.map(pair => (
              <div key={pair.id} className="bg-white border border-editorial-border rounded-xl p-5 space-y-4 shadow-xs">
                <div className="border-b border-neutral-100 pb-3">
                  <h4 className="font-bold text-sm text-neutral-900">
                    <span className="text-red-600 font-bold">{pair.brightWord}</span> <span className="text-neutral-400 font-normal">vs</span> <span className="text-red-600 font-bold">{pair.darkWord}</span>
                  </h4>
                  <p className="text-[11px] text-neutral-500 mt-1">{pair.explanation}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  {/* Bright Vowel Card */}
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-red-600 text-sm font-serif">{pair.brightWord}</span>
                      <button
                        onClick={() => handlePlayVoice(pair.brightWord)}
                        className="p-1 hover:bg-amber-100 rounded text-amber-700 cursor-pointer"
                        title="발음 듣기"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-200/60 text-amber-900">
                      {pair.brightVowel}
                    </span>
                    <p className="text-[11px] text-neutral-700 leading-snug">{pair.brightMeaning}</p>
                    <div className="pt-1 border-t border-amber-200/60 text-[10px] text-neutral-600 italic">
                      "{highlightOnomatopoeia(pair.exampleBright, pair.brightWord)}"
                    </div>
                  </div>

                  {/* Dark Vowel Card */}
                  <div className="p-3 bg-slate-100 border border-slate-300 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-red-600 text-sm font-serif">{pair.darkWord}</span>
                      <button
                        onClick={() => handlePlayVoice(pair.darkWord)}
                        className="p-1 hover:bg-slate-200 rounded text-slate-700 cursor-pointer"
                        title="발음 듣기"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-bold bg-slate-200 text-slate-900">
                      {pair.darkVowel}
                    </span>
                    <p className="text-[11px] text-neutral-700 leading-snug">{pair.darkMeaning}</p>
                    <div className="pt-1 border-t border-slate-200 text-[10px] text-neutral-600 italic">
                      "{highlightOnomatopoeia(pair.exampleDark, pair.darkWord)}"
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: WEBTOON & SITUATIONAL SCENES */}
      {activeTab === 'webtoon' && (
        <div className="space-y-4">
          <div className="bg-white border border-editorial-border rounded-xl p-4 shadow-xs">
            <h3 className="font-serif font-bold text-sm text-neutral-900 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>한국 웹툰 & K-드라마 명장면으로 읽는 효과음 시나리오</span>
            </h3>
            <p className="text-xs text-neutral-600 mt-1">
              상황 속에서 의성어와 의태어가 어떻게 감정과 스릴을 증폭시키는지 문맥 속에서 체험해 보세요.
            </p>
          </div>

          <div className="space-y-4">
            {WEBTOON_SCENES.map((scene) => (
              <div
                key={scene.id}
                className="bg-white border border-editorial-border rounded-xl overflow-hidden shadow-xs"
              >
                <div className={`bg-gradient-to-r ${scene.bgGradient} text-white p-4 sm:p-5 flex items-start justify-between`}>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{scene.emoji}</span>
                      <h4 className="font-serif font-bold text-base sm:text-lg">{scene.title}</h4>
                    </div>
                    <p className="text-xs text-neutral-300">{scene.situation}</p>
                  </div>
                  <button
                    onClick={() => handlePlayVoice(scene.koreanText)}
                    className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>전체 듣기</span>
                  </button>
                </div>

                <div className="p-5 space-y-4">
                  {/* Sound tags */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-neutral-500">핵심 효과음:</span>
                    {scene.soundEffects.map(s => (
                      <button
                        key={s}
                        onClick={() => handlePlayVoice(s)}
                        className="px-2.5 py-1 rounded bg-amber-100 text-red-600 font-serif font-bold text-xs hover:bg-amber-200 transition-colors flex items-center space-x-1 cursor-pointer"
                      >
                        <Volume2 className="w-3 h-3 text-red-600" />
                        <span>{s}</span>
                      </button>
                    ))}
                  </div>

                  {/* Dialog Quote */}
                  <div className="p-4 bg-editorial-bg border border-editorial-border rounded-lg space-y-2">
                    <p className="text-sm sm:text-base font-serif font-bold text-neutral-900 leading-relaxed">
                      {highlightOnomatopoeia(scene.koreanText, scene.soundEffects)}
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-600 italic leading-relaxed">
                      {scene.englishTranslation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: INTERACTIVE SOUND QUIZ */}
      {activeTab === 'quiz' && (
        <div className="bg-white border border-editorial-border rounded-xl p-6 shadow-xs max-w-2xl mx-auto space-y-6">
          {!quizCompleted ? (
            <div className="space-y-5">
              {/* Progress & Header */}
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div>
                  <span className="text-xs font-bold text-editorial-accent uppercase tracking-wider">
                    Question {currentQuizIdx + 1} of {SOUND_QUIZZES.length}
                  </span>
                  <h3 className="font-serif font-bold text-base text-neutral-900 mt-1">
                    {SOUND_QUIZZES[currentQuizIdx].question}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold bg-neutral-100 px-2 py-1 rounded text-neutral-700">
                  점수: {quizScore} / {SOUND_QUIZZES.length}
                </span>
              </div>

              {/* Sound Clue Hint */}
              {SOUND_QUIZZES[currentQuizIdx].soundClue && (
                <div className="p-2.5 bg-neutral-50 rounded border border-neutral-200 text-xs text-neutral-600 flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4 text-editorial-accent shrink-0" />
                  <span>힌트 (Clue): <strong>{SOUND_QUIZZES[currentQuizIdx].soundClue}</strong></span>
                </div>
              )}

              {/* Options */}
              <div className="space-y-2.5">
                {SOUND_QUIZZES[currentQuizIdx].options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === SOUND_QUIZZES[currentQuizIdx].correctIndex;
                  let btnStyle = 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100 text-neutral-800';

                  if (isAnswerChecked) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-amber-100 border-amber-400 text-amber-950 font-bold shadow-2xs';
                  }

                  return (
                    <button
                      key={option}
                      onClick={() => handleSelectQuizOption(idx)}
                      disabled={isAnswerChecked}
                      className={`w-full p-3.5 rounded-lg border text-left text-sm font-serif transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span className="font-bold">{option}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayVoice(option);
                          }}
                          className="p-1 hover:bg-black/10 rounded cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        {isAnswerChecked && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        )}
                        {isAnswerChecked && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Answer Explanation */}
              {isAnswerChecked && (
                <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-neutral-700 space-y-1 animate-in fade-in">
                  <span className="font-bold text-neutral-900">💡 정답 해설:</span>
                  <p className="leading-relaxed">{SOUND_QUIZZES[currentQuizIdx].explanation}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-neutral-100">
                {!isAnswerChecked ? (
                  <button
                    onClick={handleCheckQuizAnswer}
                    disabled={selectedOption === null}
                    className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedOption !== null
                        ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                        : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    정답 확인하기
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuiz}
                    className="px-5 py-2.5 rounded-lg text-xs font-bold bg-neutral-900 text-white hover:bg-neutral-800 flex items-center space-x-1.5 cursor-pointer"
                  >
                    <span>{currentQuizIdx + 1 < SOUND_QUIZZES.length ? '다음 문제로' : '결과 보기'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Completed View */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-2xl font-bold">
                🏆
              </div>
              <h3 className="font-serif font-bold text-xl text-neutral-900">
                의성어·의태어 스피드 퀴즈 완료!
              </h3>
              <p className="text-sm text-neutral-600">
                총 {SOUND_QUIZZES.length}문제 중 <strong>{quizScore}문제</strong>를 맞히셨습니다! (+{quizScore * 20} XP 획득)
              </p>
              <div className="pt-4 flex items-center justify-center space-x-3">
                <button
                  onClick={handleResetQuiz}
                  className="px-4 py-2 border border-editorial-border rounded-lg text-xs font-bold text-editorial-text hover:bg-neutral-50 flex items-center space-x-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>다시 풀기</span>
                </button>
                <button
                  onClick={() => setActiveTab('explorer')}
                  className="px-5 py-2 bg-neutral-900 text-white rounded-lg text-xs font-bold hover:bg-neutral-800 cursor-pointer"
                >
                  어휘 도감 복습하기
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: AI SENTENCE CREATOR */}
      {activeTab === 'ai-generator' && (
        <div className="bg-white border border-editorial-border rounded-xl p-6 shadow-xs max-w-2xl mx-auto space-y-5">
          <div className="space-y-1.5 border-b border-neutral-100 pb-3">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <h3 className="font-serif font-bold text-base text-neutral-900">
                AI 의성어·의태어 자연스러운 작문 생성기
              </h3>
            </div>
            <p className="text-xs text-neutral-600">
              선택하신 의성어/의태어를 실제 원어민 대화 맥락에 딱 들어맞는 유려한 한국어 문장으로 생성합니다. (1 Credit 소모)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-neutral-700">활용할 표현 선택:</label>
              <select
                value={aiSelectedWord}
                onChange={(e) => setAiSelectedWord(e.target.value)}
                className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-bold text-neutral-800 focus:outline-none"
              >
                {ONOMATOPOEIA_ITEMS.map(item => (
                  <option key={item.id} value={item.word}>
                    {item.emoji} {item.word} ({item.type} - {item.meaningKo})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-neutral-700">작문 상황(컨텍스트):</label>
              <select
                value={aiSituation}
                onChange={(e) => setAiSituation(e.target.value)}
                className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-bold text-neutral-800 focus:outline-none"
              >
                <option value="첫 데이트 / 고백">💖 첫 데이트 & 고백 장면</option>
                <option value="비 오는 날 카페">☕ 비 오는 날 카페에서의 여유</option>
                <option value="한국 길거리 야식 먹방">🍲 야식 & 길거리 먹방</option>
                <option value="시험 & 면접 직전 긴장">⏰ 시험 & 면접 직전 긴장</option>
                <option value="주말 휴식 & 뒹굴거리기">🛋️ 주말 침대 뒹굴거리기</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerateSentence}
            disabled={isGeneratingAi}
            className={`w-full py-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
              isGeneratingAi
                ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-xs'
            }`}
          >
            {isGeneratingAi ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI가 원어민 뉘앙스 문장을 생성 중입니다...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>선택 표현으로 자연스러운 문장 생성하기 (1 Credit)</span>
              </>
            )}
          </button>

          {aiResult && (
            <div className="mt-4 p-4 bg-editorial-bg border border-editorial-border rounded-xl space-y-3 animate-in fade-in">
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                  AI Generated Sentence
                </span>
                <button
                  onClick={() => handlePlayVoice(aiResult.korean)}
                  className="text-xs font-bold text-editorial-accent flex items-center space-x-1 hover:underline cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>원어민 음성 듣기</span>
                </button>
              </div>

              <div className="space-y-1">
                <p className="text-base font-serif font-bold text-neutral-900 leading-relaxed">
                  {highlightOnomatopoeia(aiResult.korean, aiSelectedWord)}
                </p>
                <p className="text-xs text-neutral-600 italic">
                  {aiResult.english}
                </p>
              </div>

              <div className="pt-2 border-t border-editorial-border text-xs space-y-1">
                <div className="text-neutral-700">
                  <span className="font-bold text-neutral-900">구문 분석:</span> {aiResult.breakdown}
                </div>
                <div className="text-neutral-600 text-[11px]">
                  💡 <strong>작문 팁:</strong> {aiResult.tip}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
