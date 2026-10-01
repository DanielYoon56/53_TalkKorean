import React, { useState } from 'react';
import { Sparkles, Search, Volume2, CheckCircle2, AlertCircle, BookOpen, Layers, Lightbulb, GraduationCap, ArrowRight, Loader2, RotateCcw, ExternalLink } from 'lucide-react';
import { speakKoreanText } from '../../utils/tts';

export interface DynamicGrammarAnalysis {
  title: string;
  grammarTerm: string;
  summary: string;
  context: {
    discourseSituation: string;
    speakerIntent: string;
    formalityRegister: string;
    socialNuance: string;
  };
  examples: Array<{
    korean: string;
    romanized: string;
    english: string;
    contextTag: string;
    breakdown: string;
    whyUsed: string;
  }>;
  levelUsage: {
    beginner: {
      title: string;
      description: string;
      focus: string;
      example: string;
    };
    intermediate: {
      title: string;
      description: string;
      focus: string;
      example: string;
    };
    advanced: {
      title: string;
      description: string;
      focus: string;
      example: string;
    };
  };
  topikTip?: string;
  commonMistakes?: Array<{
    wrong: string;
    correct: string;
    why: string;
  }>;
  proTip?: string;
  engineSource?: string;
}

interface DynamicGrammarEngineProps {
  onSelectTopic?: (topicId: string) => void;
}

/**
 * Renders Korean text with grammar elements cleanly highlighted in RED.
 * Strips any markdown asterisks (e.g. **문법**) and displays the target grammar
 * in clean red text (text-red-600 font-bold) without any cluttering special symbols.
 */
function renderRedGrammar(text: string, highlightTerm?: string) {
  if (!text) return null;

  // 1. If text has **markdown bold**, parse them and render bolded parts in red
  if (text.includes('**')) {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
      <>
        {parts.map((part, idx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const inner = part.slice(2, -2);
            return (
              <span key={idx} className="text-red-600 font-bold not-italic">
                {inner}
              </span>
            );
          }
          return highlightTerm ? renderKeyword(part, highlightTerm, idx) : <span key={idx}>{part}</span>;
        })}
      </>
    );
  }

  // 2. If no asterisks, highlight the target grammar element in red
  if (highlightTerm && highlightTerm.trim()) {
    return renderKeyword(text, highlightTerm, 0);
  }

  return <>{text}</>;
}

function renderKeyword(text: string, term: string, baseKey: number) {
  if (!text) return null;
  // Clean term of any punctuation or affixes for matching
  const cleanTerm = term.replace(/[()[\]\-~*]/g, '').trim();
  const searchTerms = [term, cleanTerm].filter(t => t && t.length >= 2);
  if (searchTerms.length === 0) return <span key={baseKey}>{text}</span>;

  const escaped = searchTerms
    .sort((a, b) => b.length - a.length)
    .map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');

  try {
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = text.split(regex);
    return (
      <React.Fragment key={baseKey}>
        {parts.map((p, i) => {
          const isMatch = searchTerms.some(st => st.toLowerCase() === p.toLowerCase());
          if (isMatch) {
            return (
              <span key={i} className="text-red-600 font-bold not-italic">
                {p}
              </span>
            );
          }
          return <span key={i}>{p}</span>;
        })}
      </React.Fragment>
    );
  } catch {
    return <span key={baseKey}>{text}</span>;
  }
}

export default function DynamicGrammarEngine({ onSelectTopic }: DynamicGrammarEngineProps) {
  const [query, setQuery] = useState<string>('영 별로인데');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<DynamicGrammarAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeLevelTab, setActiveLevelTab] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  // Quick prompt suggestions
  const SUGGESTIONS = [
    { term: '영 별로인데', label: '영 별로인데', tag: '구어·솔직 감상' },
    { term: '-(으)려던 참이다', label: '-(으)려던 참이다', tag: '직전 타이밍' },
    { term: '-길래 vs -느라고', label: '-길래 vs -느라고', tag: '원인 대조' },
    { term: '하마터면 -(으)ㄹ 뻔했다', label: '하마터면 -(으)ㄹ 뻔했다', tag: '위기 모면' },
    { term: '-기는커녕', label: '-기는커녕', tag: '극단적 반전' },
    { term: '-(으)ㄹ게요 vs -(으)ㄹ 거예요', label: '-(으)ㄹ게요 vs -(으)ㄹ 거예요', tag: '약속 vs 의지' },
    { term: '은/는 vs 이/가', label: '은/는 vs 이/가', tag: '화제 vs 주어' }
  ];

  const handleAnalyze = async (searchQuery?: string) => {
    const termToSearch = (searchQuery || query).trim();
    if (!termToSearch) return;

    if (searchQuery) {
      setQuery(searchQuery);
    }

    setIsLoading(true);
    setError(null);
    setQuizAnswer(null);

    try {
      const response = await fetch('/api/grammar/dynamic-engine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: termToSearch })
      });

      if (!response.ok) {
        throw new Error('문법 분석 중 오류가 발생했습니다.');
      }

      const data: DynamicGrammarAnalysis = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error('[DynamicGrammarEngine Error]:', err);
      setError(err?.message || '실시간 분석 서버와의 연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTts = (text: string) => {
    speakKoreanText(text);
  };

  return (
    <div className="bg-white border border-editorial-border rounded-sm p-5 sm:p-6 space-y-6 shadow-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-editorial-border pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-sm bg-red-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-serif font-bold text-lg text-editorial-text">
                고급 문법 분석
              </h3>
              <span className="px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded text-[10px] font-bold">
                Gemini 실시간 심층 분석
              </span>
            </div>
            <p className="text-xs text-editorial-muted mt-0.5">
              사용자가 검색한 문법 요소의 <strong>실제 문맥</strong>, <strong>적절한 예문 3개</strong>, 그리고 <strong>난이도별 활용법</strong>을 실시간으로 정밀 분석합니다.
            </p>
          </div>
        </div>
      </div>

      {/* Search Input Box */}
      <div className="space-y-2.5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAnalyze();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-editorial-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="분석할 한국어 문법, 어미, 조사, 구어 표현을 입력하세요 (예: 영 별로인데, -(으)려던 참이다)"
              className="w-full pl-10 pr-4 py-2.5 bg-editorial-bg border border-editorial-border rounded-sm text-xs font-serif text-editorial-text placeholder:text-neutral-400 focus:outline-none focus:border-red-600 focus:bg-white transition-all shadow-inner"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="px-5 py-2.5 bg-editorial-text hover:bg-red-700 text-white text-xs font-bold font-serif rounded-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1.5 cursor-pointer shadow-xs shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>분석 중...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>실시간 분석</span>
              </>
            )}
          </button>
          <a
            href={query.trim() ? `https://kcenter.korean.go.kr/kcenter/search/dgrammar.do?mode=&id=&srchChosung=&searchCategory=&searchGrade=&searchTabMenu=&searchChineseYn=&curPage=1&srchKey=headword&srchKeyword=${encodeURIComponent(query.trim())}` : "https://kcenter.korean.go.kr/kcenter/search/dgrammar.do?mode=&id=&srchChosung=%E3%84%B1&searchCategory=&searchGrade=&searchTabMenu=&searchChineseYn=&curPage=1&srchKey=headword&srchKeyword="}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 border border-red-200 rounded-sm text-xs font-bold font-serif transition-colors flex items-center space-x-1.5 cursor-pointer shadow-xs shrink-0"
            title="국립국어원 한국어교수학습샘터 문법 검색링크 열기"
          >
            <Search className="w-3.5 h-3.5 text-red-600" />
            <span>샘터 검색</span>
            <ExternalLink className="w-3 h-3 text-red-400" />
          </a>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-bold text-editorial-muted mr-1">추천 검색:</span>
          {SUGGESTIONS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAnalyze(item.term)}
              className="px-2.5 py-1 bg-slate-50 hover:bg-red-50 hover:border-red-300 border border-editorial-border/70 rounded text-[11px] font-serif text-slate-700 hover:text-red-700 transition-all cursor-pointer flex items-center gap-1"
            >
              <span>{item.label}</span>
              <span className="text-[9px] text-neutral-400 font-sans">({item.tag})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="py-12 flex flex-col items-center justify-center space-y-3 bg-editorial-bg/50 rounded-sm border border-dashed border-editorial-border">
          <Loader2 className="w-7 h-7 text-red-600 animate-spin" />
          <div className="text-center">
            <p className="text-xs font-bold text-editorial-text font-serif">
              Gemini 실시간 문법 지능 엔진이 ‘{query}’의 담화 문맥 및 예문을 분석 중입니다...
            </p>
            <p className="text-[11px] text-editorial-muted mt-1">
              국립국어원 표준 문법 체계 및 원어민 실생활 화용론을 바탕으로 정밀 생성합니다.
            </p>
          </div>
        </div>
      )}

      {/* Error Notice */}
      {error && !isLoading && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-sm text-xs text-rose-800 flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">분석 안내: </span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Results View */}
      {result && !isLoading && (
        <div className="space-y-6 pt-2">
          {/* 1. Overview Header */}
          <div className="bg-editorial-bg p-4 rounded-sm border border-editorial-border space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold">
                  문법 분석 결과
                </span>
                <h4 className="text-base font-serif font-bold text-editorial-text">
                  {renderRedGrammar(result.title, result.grammarTerm || query)}
                </h4>
              </div>
              <span className="text-[10px] text-neutral-500 font-mono">
                Engine: {result.engineSource === 'gemini_live' ? '⚡ Gemini Live AI' : '🎯 Precision Linguistic AI'}
              </span>
            </div>
            <p className="text-xs text-editorial-text leading-relaxed font-serif">
              {renderRedGrammar(result.summary, result.grammarTerm || query)}
            </p>
          </div>

          {/* 2. 문법의 문맥 (Discourse Context & Pragmatics) */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 border-b border-editorial-border pb-1.5">
              <BookOpen className="w-4 h-4 text-red-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-editorial-text font-serif">
                1. 문법의 문맥 및 화용론 분석 (Discourse Context & Nuance)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-white border border-editorial-border rounded-sm text-xs space-y-1">
                <span className="font-bold text-editorial-text text-[11px] block text-red-700">
                  📍 담화 및 사용 상황 (Discourse Situation)
                </span>
                <p className="text-editorial-muted text-[11px] leading-relaxed">
                  {result.context.discourseSituation}
                </p>
              </div>

              <div className="p-3 bg-white border border-editorial-border rounded-sm text-xs space-y-1">
                <span className="font-bold text-editorial-text text-[11px] block text-red-700">
                  💭 화자의 의도 및 감정 (Speaker Intent)
                </span>
                <p className="text-editorial-muted text-[11px] leading-relaxed">
                  {result.context.speakerIntent}
                </p>
              </div>

              <div className="p-3 bg-white border border-editorial-border rounded-sm text-xs space-y-1">
                <span className="font-bold text-editorial-text text-[11px] block text-emerald-800">
                  ⚖️ 격식성 및 어조 호응 (Formality & Register)
                </span>
                <p className="text-editorial-muted text-[11px] leading-relaxed">
                  {result.context.formalityRegister}
                </p>
              </div>

              <div className="p-3 bg-white border border-editorial-border rounded-sm text-xs space-y-1">
                <span className="font-bold text-editorial-text text-[11px] block text-emerald-800">
                  🤝 사회적 관계와 배려 (Social Nuance)
                </span>
                <p className="text-editorial-muted text-[11px] leading-relaxed">
                  {result.context.socialNuance}
                </p>
              </div>
            </div>
          </div>

          {/* 3. 적절한 예문 3개 (3 Authentic Contextual Examples) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-editorial-border pb-1.5">
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold">
                  3
                </span>
                <h4 className="text-xs font-bold uppercase tracking-wider text-editorial-text font-serif">
                  2. 문맥별 적절한 실전 예문 3선 (Contextual Examples)
                </h4>
              </div>
              <span className="text-[10px] text-editorial-muted">
                🔊 스피커 아이콘을 클릭하여 원어민 발음을 들어보세요
              </span>
            </div>

            <div className="space-y-3">
              {result.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-editorial-bg/60 border border-editorial-border rounded-sm space-y-2 hover:bg-white hover:border-red-300 transition-all shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-white border border-editorial-border text-[10px] font-bold text-red-700 rounded">
                      예문 {idx + 1}: {ex.contextTag}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleTts(ex.korean)}
                      className="p-1.5 text-editorial-muted hover:text-red-600 hover:bg-red-50 rounded transition-all cursor-pointer"
                      title="원어민 발음 듣기"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-serif font-bold text-editorial-text">
                      {renderRedGrammar(ex.korean, result.grammarTerm || query)}
                    </p>
                    <p className="text-[11px] text-neutral-400 italic">
                      {ex.romanized}
                    </p>
                    <p className="text-xs text-editorial-muted">
                      {ex.english}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-editorial-border/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-white/80 p-2 rounded border border-editorial-border/60">
                      <span className="font-bold text-neutral-700 block">🔍 형태소 및 문법 분해:</span>
                      <span className="text-editorial-muted">{renderRedGrammar(ex.breakdown, result.grammarTerm || query)}</span>
                    </div>
                    <div className="bg-white/80 p-2 rounded border border-editorial-border/60">
                      <span className="font-bold text-emerald-800 block">💡 왜 이 문맥에 적절한가:</span>
                      <span className="text-emerald-900">{ex.whyUsed}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. 난이도별 활용법 (Usage by Difficulty Level: 초급 / 중급 / 고급) */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 border-b border-editorial-border pb-1.5">
              <Layers className="w-4 h-4 text-red-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-editorial-text font-serif">
                3. 난이도별 활용법 가이드 (Learning Path & Usage by Level)
              </h4>
            </div>

            {/* Level Tabs */}
            <div className="flex border-b border-editorial-border">
              <button
                type="button"
                onClick={() => setActiveLevelTab('beginner')}
                className={`flex-1 py-2 text-xs font-bold text-center border-b-2 transition-all cursor-pointer ${
                  activeLevelTab === 'beginner'
                    ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50'
                    : 'border-transparent text-editorial-muted hover:text-editorial-text'
                }`}
              >
                🟢 초급 (Beginner)
              </button>
              <button
                type="button"
                onClick={() => setActiveLevelTab('intermediate')}
                className={`flex-1 py-2 text-xs font-bold text-center border-b-2 transition-all cursor-pointer ${
                  activeLevelTab === 'intermediate'
                    ? 'border-amber-600 text-amber-800 bg-amber-50/50'
                    : 'border-transparent text-editorial-muted hover:text-editorial-text'
                }`}
              >
                🟡 중급 (Intermediate)
              </button>
              <button
                type="button"
                onClick={() => setActiveLevelTab('advanced')}
                className={`flex-1 py-2 text-xs font-bold text-center border-b-2 transition-all cursor-pointer ${
                  activeLevelTab === 'advanced'
                    ? 'border-rose-600 text-rose-800 bg-rose-50/50'
                    : 'border-transparent text-editorial-muted hover:text-editorial-text'
                }`}
              >
                🔴 고급 (Advanced)
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-4 bg-white border border-editorial-border rounded-sm space-y-3 text-xs">
              {activeLevelTab === 'beginner' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-900 text-sm">
                      {result.levelUsage.beginner.title}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold">
                      초급 핵심
                    </span>
                  </div>
                  <p className="text-editorial-text leading-relaxed">
                    {result.levelUsage.beginner.description}
                  </p>
                  <div className="bg-emerald-50 p-2.5 rounded border border-emerald-200">
                    <span className="font-bold text-emerald-950 block">📌 학습 초점:</span>
                    <span className="text-emerald-900">{result.levelUsage.beginner.focus}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                    <span className="font-bold text-slate-900 block">💬 초급 활용 예시:</span>
                    <span className="text-slate-800 font-serif">{renderRedGrammar(result.levelUsage.beginner.example, result.grammarTerm || query)}</span>
                  </div>
                </div>
              )}

              {activeLevelTab === 'intermediate' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900 text-sm">
                      {result.levelUsage.intermediate.title}
                    </span>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-bold">
                      중급 핵심
                    </span>
                  </div>
                  <p className="text-editorial-text leading-relaxed">
                    {result.levelUsage.intermediate.description}
                  </p>
                  <div className="bg-amber-50 p-2.5 rounded border border-amber-200">
                    <span className="font-bold text-amber-950 block">📌 화용론 및 어감 분별:</span>
                    <span className="text-amber-900">{result.levelUsage.intermediate.focus}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                    <span className="font-bold text-slate-900 block">💬 중급 자연스러운 대화 예시:</span>
                    <span className="text-slate-800 font-serif">{renderRedGrammar(result.levelUsage.intermediate.example, result.grammarTerm || query)}</span>
                  </div>
                </div>
              )}

              {activeLevelTab === 'advanced' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-900 text-sm">
                      {result.levelUsage.advanced.title}
                    </span>
                    <span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded text-[10px] font-bold">
                      고급 핵심
                    </span>
                  </div>
                  <p className="text-editorial-text leading-relaxed">
                    {result.levelUsage.advanced.description}
                  </p>
                  <div className="bg-rose-50 p-2.5 rounded border border-rose-200">
                    <span className="font-bold text-rose-950 block">📌 고급 담화 및 격식 전환:</span>
                    <span className="text-rose-900">{result.levelUsage.advanced.focus}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                    <span className="font-bold text-slate-900 block">💬 고급 및 격식체 치환 예시:</span>
                    <span className="text-slate-800 font-serif">{renderRedGrammar(result.levelUsage.advanced.example, result.grammarTerm || query)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 5. TOPIK Tip & Common Mistakes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.topikTip && (
              <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-sm text-xs space-y-1">
                <div className="flex items-center space-x-1.5 text-amber-900 font-bold">
                  <GraduationCap className="w-4 h-4" />
                  <span>TOPIK 시험 대비 포인트:</span>
                </div>
                <p className="text-amber-900 text-[11px] leading-relaxed">
                  {renderRedGrammar(result.topikTip, result.grammarTerm || query)}
                </p>
              </div>
            )}

            {result.proTip && (
              <div className="p-3.5 bg-red-50/70 border border-red-200 rounded-sm text-xs space-y-1">
                <div className="flex items-center space-x-1.5 text-red-900 font-bold">
                  <Lightbulb className="w-4 h-4" />
                  <span>원어민 직관 Pro-Tip:</span>
                </div>
                <p className="text-red-900 text-[11px] leading-relaxed">
                  {renderRedGrammar(result.proTip, result.grammarTerm || query)}
                </p>
              </div>
            )}
          </div>

          {/* 6. Common Mistakes Breakdown */}
          {result.commonMistakes && result.commonMistakes.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-editorial-muted uppercase tracking-wider block">
                학습자들이 자주 하는 실수 및 원어민 교정:
              </span>
              <div className="space-y-2">
                {result.commonMistakes.map((m, mIdx) => (
                  <div key={mIdx} className="p-3 bg-white border border-editorial-border rounded-sm text-xs space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-rose-600 font-bold">❌ {renderRedGrammar(m.wrong)}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="text-emerald-700 font-bold">⭕ {renderRedGrammar(m.correct)}</span>
                    </div>
                    <p className="text-[11px] text-editorial-muted leading-relaxed">
                      {m.why}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
