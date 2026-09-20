import React, { useState } from 'react';
import { 
  ShieldCheck, Volume2, CheckCircle, XCircle, 
  HelpCircle, Lightbulb, Sparkles, BookOpen, 
  ArrowRight, Award, RotateCcw, Check, HeartHandshake, Eye
} from 'lucide-react';
import { speakKoreanText } from '../../utils/tts';
import { 
  ETIQUETTE_RULES, 
  ETIQUETTE_QUIZZES, 
  EtiquetteRule, 
  EtiquetteQuiz 
} from '../../data/culturalEtiquetteData';

interface CulturalEtiquetteMenuProps {
  onAddXp?: (xp: number) => void;
}

export default function CulturalEtiquetteMenu({ onAddXp }: CulturalEtiquetteMenuProps = {}) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'greeting' | 'dining' | 'social' | 'gift'>('all');
  const [selectedRuleId, setSelectedRuleId] = useState<string>(ETIQUETTE_RULES[0].id);
  
  // Interactive Quiz state
  const [activeQuizIdx, setActiveQuizIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  const filteredRules = ETIQUETTE_RULES.filter(r => 
    activeCategory === 'all' || r.category === activeCategory
  );

  const selectedRule = ETIQUETTE_RULES.find(r => r.id === selectedRuleId) || ETIQUETTE_RULES[0];
  const currentQuiz = ETIQUETTE_QUIZZES[activeQuizIdx];

  const handlePlayVoice = (text: string) => {
    speakKoreanText(text, {
      role: 'ai',
      rate: 0.95,
      forceImmediate: true
    });
  };

  const handleSelectQuizOption = (optIdx: number) => {
    if (isQuizSubmitted) return;
    setSelectedOptionIdx(optIdx);
    setIsQuizSubmitted(true);
    
    if (currentQuiz.options[optIdx].isCorrect) {
      setQuizScore(prev => prev + 1);
      if (onAddXp) onAddXp(20);
    }
  };

  const handleNextQuiz = () => {
    if (activeQuizIdx < ETIQUETTE_QUIZZES.length - 1) {
      setActiveQuizIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setIsQuizSubmitted(false);
    } else {
      setActiveQuizIdx(0);
      setSelectedOptionIdx(null);
      setIsQuizSubmitted(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-[#1A1A1A] text-white rounded-xl p-5 sm:p-6 border border-neutral-800 space-y-3 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center space-x-1">
                <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                <span>Cultural Etiquette Guides (한국 문화 예절)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Bowing • Dining • Drinking • Titles (인사 • 식사 • 음주 • 호칭)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              Korean Cultural Etiquette: Traditional & Modern Manners
            </h2>
            <p className="text-xs font-semibold text-amber-300">
              품격 있는 한국어의 완성, 전통과 현대의 생활 예절 가이드
            </p>
            <p className="text-xs sm:text-sm text-neutral-400">
              Master bowing angles, dining utensil hierarchy, drinking etiquette, and two-handed gestures to communicate and act with respectful authenticity.
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="pt-2 flex flex-wrap items-center gap-1.5 border-t border-neutral-800">
          {[
            { id: 'all', labelEn: 'All Etiquette', labelKo: '전체', icon: '🏛️' },
            { id: 'greeting', labelEn: 'Greetings & Titles', labelKo: '인사 & 호칭', icon: '🙇' },
            { id: 'dining', labelEn: 'Dining & Drinks', labelKo: '식사 & 주도', icon: '🥢' },
            { id: 'social', labelEn: 'Social & Two Hands', labelKo: '사회생활 & 두 손', icon: '🤝' },
            { id: 'gift', labelEn: 'Visits & Gifts', labelKo: '방문 & 선물', icon: '🎁' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeCategory === tab.id
                  ? 'bg-amber-400 text-neutral-950 shadow-xs'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.labelEn}</span>
              <span className="text-[10px] opacity-70">({tab.labelKo})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Rules Interactive Cards & Detail Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Rule Selector List (4 Cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="bg-white border-2 border-neutral-200 rounded-xl p-4 shadow-xs">
            <span className="text-xs font-bold text-neutral-900 block border-b border-neutral-200 pb-2 mb-3">
              📌 Etiquette Rulebook (예절 항목 리스트: {filteredRules.length})
            </span>
            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {filteredRules.map(rule => {
                const isSelected = rule.id === selectedRuleId;
                return (
                  <div
                    key={rule.id}
                    onClick={() => setSelectedRuleId(rule.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left space-y-1 ${
                      isSelected
                        ? 'bg-amber-50/80 border-amber-500 shadow-xs ring-1 ring-amber-400'
                        : 'bg-white hover:bg-neutral-50 border-neutral-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-mono">
                        {rule.badge}
                      </span>
                      <ChevronArrow isSelected={isSelected} />
                    </div>
                    <h4 className="text-xs sm:text-sm font-serif font-bold text-neutral-900 pt-0.5">
                      {rule.titleEn}
                    </h4>
                    <p className="text-[11px] text-amber-900 font-semibold line-clamp-1">
                      {rule.titleKo}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center/Right Column: Detailed Interactive Guide (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Rule Detail Card */}
          <div className="bg-white border-2 border-neutral-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-5 text-left">
            
            {/* Header */}
            <div className="border-b border-neutral-200 pb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 font-mono">
                  {selectedRule.badge}
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-neutral-900 pt-1.5">
                  {selectedRule.titleEn}
                </h3>
                <p className="text-xs text-amber-900 font-semibold">
                  {selectedRule.titleKo}
                </p>
              </div>
            </div>

            {/* Situation Context */}
            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs space-y-1">
              <span className="font-bold text-neutral-700 uppercase font-mono text-[10px]">
                📍 Situation Context (적용 상황):
              </span>
              <p className="text-neutral-900 font-medium font-serif">
                {selectedRule.situation}
              </p>
            </div>

            {/* DO vs DONT Comparison Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* DO Block */}
              <div className="bg-emerald-50/70 border-2 border-emerald-400/80 rounded-xl p-4 space-y-2">
                <div className="flex items-center space-x-1.5 text-emerald-900 font-bold text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>DO: Recommended Manners (바른 예절)</span>
                </div>
                <p className="text-xs text-neutral-900 font-bold leading-relaxed">
                  {selectedRule.doTextEn}
                </p>
                <p className="text-[11px] text-emerald-900 leading-relaxed font-semibold">
                  {selectedRule.doTextKo}
                </p>
              </div>

              {/* DONT Block */}
              <div className="bg-rose-50/70 border-2 border-rose-300 rounded-xl p-4 space-y-2">
                <div className="flex items-center space-x-1.5 text-rose-900 font-bold text-xs">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>DON'T: Avoid / Taboo (주의해야 할 결례)</span>
                </div>
                <p className="text-xs text-neutral-900 font-bold leading-relaxed">
                  {selectedRule.dontTextEn}
                </p>
                <p className="text-[11px] text-rose-900 leading-relaxed font-semibold">
                  {selectedRule.dontTextKo}
                </p>
              </div>
            </div>

            {/* Key Korean Polite Phrase with Audio */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50/30 border border-amber-300/80 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest font-mono">
                  🗣️ Must-Know Polite Phrase (상황별 필수 정중 표현)
                </span>
                <button
                  onClick={() => handlePlayVoice(selectedRule.keyPhraseKo)}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg transition-all shadow-xs flex items-center space-x-1 cursor-pointer"
                  title="원어민 음성 듣기"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen (발음 듣기)</span>
                </button>
              </div>
              <p className="text-base sm:text-lg font-serif font-bold text-neutral-900">
                "{selectedRule.keyPhraseKo}"
              </p>
              <div className="text-xs text-neutral-600 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono">
                <span className="font-sans font-semibold text-neutral-800">Meaning: {selectedRule.keyPhraseEn}</span>
                <span>•</span>
                <span>Pronunciation: {selectedRule.romanized}</span>
              </div>
            </div>

            {/* Deep Cultural Insight */}
            <div className="p-4 bg-neutral-100/80 border border-neutral-200 rounded-xl text-xs space-y-1.5">
              <div className="flex items-center space-x-1.5 text-neutral-900 font-bold font-serif">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Cultural Insight & Etiquette Tip (심화 문화 해설)</span>
              </div>
              <p className="text-neutral-800 leading-relaxed pl-5">
                {selectedRule.explanation}
              </p>
              <p className="text-amber-900 font-medium pl-5 pt-0.5">
                💡 <strong>Practical Pro-Tip (센스 있는 꿀팁):</strong> {selectedRule.culturalNote}
              </p>
            </div>

          </div>

          {/* Etiquette Situation Simulator Quiz Box */}
          <div className="bg-white border-2 border-neutral-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-base">🎯</span>
                <h4 className="text-sm font-serif font-bold text-neutral-900">
                  Interactive Etiquette Quiz (실전 예절 퀴즈: 상황 대처 능력)
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-neutral-500">
                Quiz #{activeQuizIdx + 1} / {ETIQUETTE_QUIZZES.length}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-amber-900 font-bold font-mono">
                {currentQuiz.situationContext}
              </p>
              <p className="text-sm sm:text-base font-serif font-bold text-neutral-900">
                Q. {currentQuiz.questionEn}
              </p>
              <p className="text-xs text-amber-900 font-semibold">
                {currentQuiz.questionKo}
              </p>
            </div>

            {/* Quiz Options */}
            <div className="space-y-2 pt-1">
              {currentQuiz.options.map((opt, optIdx) => {
                const isSelected = selectedOptionIdx === optIdx;
                const showSuccess = isQuizSubmitted && opt.isCorrect;
                const showFail = isQuizSubmitted && isSelected && !opt.isCorrect;

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectQuizOption(optIdx)}
                    disabled={isQuizSubmitted}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col space-y-1 ${
                      showSuccess
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-400'
                        : showFail
                        ? 'bg-rose-50 border-rose-400 text-rose-950'
                        : isSelected
                        ? 'bg-amber-50 border-amber-400 text-neutral-950'
                        : 'bg-neutral-50 hover:bg-neutral-100/80 border-neutral-300 text-neutral-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-serif font-bold">
                        {optIdx + 1}. {opt.textEn}
                      </span>
                      {showSuccess && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
                      {showFail && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                    </div>
                    <span className="text-[11px] text-amber-900 font-semibold pl-3.5">
                      {opt.textKo}
                    </span>

                    {isQuizSubmitted && isSelected && (
                      <p className={`text-xs font-bold pt-1.5 pl-3.5 ${
                        opt.isCorrect ? 'text-emerald-800' : 'text-rose-800'
                      }`}>
                        {opt.feedback}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {isQuizSubmitted && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuiz}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Next Etiquette Quiz (다음 퀴즈)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

function ChevronArrow({ isSelected }: { isSelected: boolean }) {
  return (
    <span className={`text-xs font-bold transition-transform ${isSelected ? 'text-amber-600 translate-x-0.5' : 'text-neutral-400'}`}>
      →
    </span>
  );
}
