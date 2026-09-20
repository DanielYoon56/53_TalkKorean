import React, { useState } from 'react';
import { 
  Tv, Volume2, Sparkles, Heart, Film, MessageCircle, 
  Lightbulb, ArrowRight, Play, BookOpen, Star, Trophy
} from 'lucide-react';
import { speakKoreanText } from '../../utils/tts';
import { 
  KDRAMA_QUOTES, 
  KDRAMA_VOCAB_ITEMS, 
  KDramaQuote, 
  KDramaVocabItem 
} from '../../data/kdramaVocabData';

interface KDramaVocabMenuProps {
  onAddXp?: (xp: number) => void;
}

export default function KDramaVocabMenu({ onAddXp }: KDramaVocabMenuProps = {}) {
  const [activeTab, setActiveTab] = useState<'quotes' | 'vocab' | 'tropes'>('quotes');
  const [selectedQuoteId, setSelectedQuoteId] = useState<string>(KDRAMA_QUOTES[0].id);
  const [selectedGenre, setSelectedGenre] = useState<'All' | 'Romance' | 'Fantasy' | 'Slice of Life'>('All');
  const [likedQuoteIds, setLikedQuoteIds] = useState<string[]>([]);

  const filteredQuotes = KDRAMA_QUOTES.filter(q => 
    selectedGenre === 'All' || q.genre === selectedGenre
  );

  const selectedQuote = KDRAMA_QUOTES.find(q => q.id === selectedQuoteId) || KDRAMA_QUOTES[0];

  const handlePlayVoice = (text: string, rate: number = 0.9) => {
    speakKoreanText(text, {
      role: 'ai',
      rate: rate,
      forceImmediate: true
    });
  };

  const handleToggleLike = (id: string) => {
    if (likedQuoteIds.includes(id)) {
      setLikedQuoteIds(prev => prev.filter(x => x !== id));
    } else {
      setLikedQuoteIds(prev => [...prev, id]);
      if (onAddXp) onAddXp(10);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-[#1A1A1A] text-white rounded-xl p-5 sm:p-6 border border-neutral-800 space-y-3 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-purple-400/20 text-purple-300 border border-purple-400/30 flex items-center space-x-1">
                <Tv className="w-3.5 h-3.5 text-purple-400" />
                <span>K-Drama Vocabulary & Iconic Quotes (K-드라마 어휘 & 명대사)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                Guardian • Crash Landing on You • Itaewon Class
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              Learn Authentic Korean Emotions Through Iconic K-Drama Dialogues
            </h2>
            <p className="text-xs font-semibold text-purple-300">
              화제의 K-드라마 명대사로 배우는 생생한 감정 표현과 필수 어휘
            </p>
            <p className="text-xs sm:text-sm text-neutral-400">
              Listen to native Korean voice actors delivering famous drama lines, and master essential Korean relationship buzzwords (Sim-kung, Tsundere, Some, Cider).
            </p>
          </div>
        </div>

        {/* Top Mode Tabs */}
        <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-neutral-800">
          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'quotes'
                ? 'bg-amber-400 text-neutral-950 shadow-xs'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Iconic Quotes (드라마 명대사)</span>
          </button>

          <button
            onClick={() => setActiveTab('vocab')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'vocab'
                ? 'bg-amber-400 text-neutral-950 shadow-xs'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Key Drama Vocab & Slang (핵심 어휘)</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Iconic Quotes & Dialogue Player */}
      {activeTab === 'quotes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Quote List (4 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="bg-white border-2 border-neutral-200 rounded-xl p-4 shadow-xs space-y-3">
              
              {/* Genre Filter */}
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <span className="text-xs font-bold text-neutral-900">
                  🎬 Drama Series ({filteredQuotes.length})
                </span>
                <div className="flex items-center space-x-1 text-[11px]">
                  {(['All', 'Romance', 'Fantasy', 'Slice of Life'] as const).map(genre => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`px-2 py-0.5 rounded font-bold cursor-pointer transition-colors ${
                        selectedGenre === genre
                          ? 'bg-neutral-900 text-white'
                          : 'text-neutral-500 hover:text-neutral-900'
                      }`}
                    >
                      {genre === 'All' ? 'All (전체)' : genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quote Cards */}
              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                {filteredQuotes.map(quote => {
                  const isSelected = quote.id === selectedQuoteId;

                  return (
                    <div
                      key={quote.id}
                      onClick={() => setSelectedQuoteId(quote.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer space-y-1.5 ${
                        isSelected
                          ? 'bg-amber-50/90 border-amber-500 shadow-xs ring-1 ring-amber-400'
                          : 'bg-white hover:bg-neutral-50 border-neutral-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-900 font-mono font-bold text-[10px]">
                          {quote.dramaTitleEn} ({quote.dramaTitleKo})
                        </span>
                        <span className="text-[10px] text-neutral-500 font-medium">
                          {quote.speaker}
                        </span>
                      </div>
                      <p className="text-xs font-serif font-bold text-neutral-900 line-clamp-2">
                        "{quote.quoteKo}"
                      </p>
                      <p className="text-[11px] text-neutral-500 italic line-clamp-1">
                        {quote.quoteEn}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quote Stage & Deep Nuances (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border-2 border-neutral-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-5 text-left">
              
              {/* Header Box */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-3.5">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-950 font-bold text-xs border border-purple-300">
                      {selectedQuote.dramaTitleEn}
                    </span>
                    <span className="text-xs font-serif font-bold text-purple-900">
                      ({selectedQuote.dramaTitleKo})
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-serif font-bold text-neutral-900 pt-1">
                    Character: <span className="text-amber-800">{selectedQuote.speaker}</span>
                  </h3>
                </div>

                <button
                  onClick={() => handleToggleLike(selectedQuote.id)}
                  className={`p-2 rounded-full border transition-all cursor-pointer ${
                    likedQuoteIds.includes(selectedQuote.id)
                      ? 'bg-rose-50 border-rose-300 text-rose-600'
                      : 'bg-neutral-50 border-neutral-300 text-neutral-400 hover:text-rose-500'
                  }`}
                  title="Bookmark line (+10 XP)"
                >
                  <Heart className={`w-4 h-4 ${likedQuoteIds.includes(selectedQuote.id) ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Main Quote Audio Box */}
              <div className="bg-gradient-to-br from-purple-50/70 via-amber-50/40 to-white border-2 border-amber-300/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-purple-900 uppercase tracking-widest font-mono">
                    🎬 K-DRAMA ICONIC LINES
                  </span>
                  
                  {/* TTS Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePlayVoice(selectedQuote.quoteKo, 0.85)}
                      className="px-3 py-1.5 bg-white hover:bg-purple-50 text-purple-950 border border-purple-300 rounded-lg text-xs font-bold shadow-2xs cursor-pointer flex items-center space-x-1"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-purple-700" />
                      <span>Slow (0.85x 천천히)</span>
                    </button>
                    <button
                      onClick={() => handlePlayVoice(selectedQuote.quoteKo, 1.0)}
                      className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center space-x-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Standard (1.0x 표준)</span>
                    </button>
                  </div>
                </div>

                <p className="text-lg sm:text-2xl font-serif font-bold text-neutral-950 leading-relaxed">
                  "{selectedQuote.quoteKo}"
                </p>

                <div className="space-y-1 text-xs font-mono text-neutral-600 pt-1 border-t border-purple-200/60">
                  <p>🗣️ Pronunciation: <span className="text-neutral-800">{selectedQuote.romanized}</span></p>
                  <p className="font-sans text-neutral-800 italic text-sm font-medium">🇬🇧 {selectedQuote.quoteEn}</p>
                </div>
              </div>

              {/* Drama Situation & Nuance Explanations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                  <span className="font-bold text-neutral-900 block font-serif">
                    📍 Scene Context (배경 상황):
                  </span>
                  <p className="text-neutral-600 leading-relaxed">
                    {selectedQuote.situation}
                  </p>
                </div>

                <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
                  <span className="font-bold text-neutral-900 block font-serif">
                    📖 Grammar Focus (핵심 문법):
                  </span>
                  <p className="text-amber-900 font-medium leading-relaxed font-mono">
                    {selectedQuote.grammarFocus}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-amber-50/70 border border-amber-300 rounded-xl text-xs space-y-1">
                <div className="flex items-center space-x-1.5 text-amber-900 font-bold font-serif">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Cultural Insight & Tone Nuance (문화 & 어조 뉘앙스):</span>
                </div>
                <p className="text-neutral-800 leading-relaxed pl-5">
                  {selectedQuote.nuanceExplanation}
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Key Drama Vocabulary Cards */}
      {activeTab === 'vocab' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {KDRAMA_VOCAB_ITEMS.map(item => (
            <div 
              key={item.id}
              className="bg-white border-2 border-neutral-200 hover:border-amber-400 rounded-xl p-5 shadow-xs transition-all text-left space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-900 font-mono font-bold text-[10px]">
                    {item.category}
                  </span>
                  <button
                    onClick={() => handlePlayVoice(item.termKo)}
                    className="p-1.5 bg-neutral-100 hover:bg-amber-100 text-neutral-700 hover:text-amber-900 rounded-full cursor-pointer transition-colors"
                    title="단어 발음 듣기 (Listen)"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-serif font-bold text-neutral-900">
                    {item.termEn}
                  </h4>
                  <p className="text-xs font-bold text-purple-900 font-mono">
                    {item.termKo}
                  </p>
                </div>

                <p className="text-xs text-neutral-700 leading-relaxed">
                  {item.definitionEn || item.definitionKo}
                </p>
                {item.definitionEn && (
                  <p className="text-[11px] text-neutral-500 leading-relaxed">
                    {item.definitionKo}
                  </p>
                )}

                <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs space-y-1">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase font-mono block">
                    💬 Example Dialog (실전 예문):
                  </span>
                  <p className="font-serif font-bold text-neutral-900">
                    "{item.exampleSentenceKo}"
                  </p>
                  <p className="text-neutral-600 italic text-[11px]">
                    {item.exampleSentenceEn}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-200 text-[11px] text-amber-900 font-medium">
                🎬 <strong>Drama Context (활용 맥락):</strong> {item.dramaContext}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
