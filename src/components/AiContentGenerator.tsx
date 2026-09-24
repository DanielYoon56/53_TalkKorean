import React, { useState } from 'react';
import { 
  Sparkles, FileText, Video, Copy, Check, Volume2, 
  RefreshCw, Clock, ArrowRight, BookOpen, Share2, 
  Send, Layers, Zap, Hash, MessageSquare, Play, Square,
  Download, Lightbulb, Eye, Film, Sliders, ChevronRight, ExternalLink
} from 'lucide-react';
import { GeneratedBlogPost, GeneratedShortsScript, CURATED_TOPIC_TEMPLATES, DEFAULT_APP_PROMO_URL, findCuratedTopic, synthesizeDynamicContent, removeAppLinksFromText } from '../data/curatedContentTemplates';
import { speakText, stopSpeech } from '../utils/tts';

interface AiContentGeneratorProps {
  initialTopic?: string;
  credits: number;
  onSpendCredits: (amount: number, reason: string) => boolean;
  onOpenCreditModal: () => void;
  onNavigate?: (tab: string) => void;
}

const PRESET_TOPICS = [
  {
    label: '황순원의 <소나기>',
    topic: '황순원의 소나기 - 소년소녀의 순수한 첫사랑과 소나기의 상징성',
    category: 'literature',
    icon: '📚',
    badge: '한국 문학'
  },
  {
    label: '한국인의 "밥 먹었어?"',
    topic: '한국인이 만나자마자 "밥 먹었냐"고 안부 묻는 3가지 진짜 이유',
    category: 'culture',
    icon: '🍚',
    badge: 'K-문화 & 정'
  },
  {
    label: '얼죽아(Eoljukah) 문화',
    topic: '영하 15도에도 아이스 아메리카노 마시는 한국인의 "얼죽아" 심리',
    category: 'trend',
    icon: '☕',
    badge: 'MZ 라이프'
  },
  {
    label: '은/는 vs 이/가 3초 정복',
    topic: '외국인이 가장 어려워하는 한국어 조사 "은/는"과 "이/가" 뉘앙스 완벽 비교',
    category: 'language',
    icon: '🗣️',
    badge: '한국어 문법'
  },
  {
    label: 'K-드라마 속 "썸"과 호칭',
    topic: 'K-드라마에 단골 등장하는 "썸 타다", "오빠", "꼰대"의 진짜 어원과 뉘앙스',
    category: 'trend',
    icon: '🎬',
    badge: 'K-드라마'
  },
  {
    label: '편의점 마크정식 꿀조합',
    topic: '한국 편의점 꿀조합의 전설: 떡볶이와 스파게티의 만남 "마크정식" 히스토리',
    category: 'food',
    icon: '🍜',
    badge: 'K-FOOD'
  },
  {
    label: '눈치(Nunchi) 문화',
    topic: "한국 사회의 초능력 처세술 '눈치(Nunchi)'와 분위기 파악의 미학",
    category: 'culture',
    icon: '👀',
    badge: 'K-처세술'
  },
  {
    label: '한강라면 & 치맥',
    topic: "한강공원에서 먹는 즉석 은박지 뽀글이 라면과 치맥 문화의 매력",
    category: 'food',
    icon: '🌉',
    badge: 'K-미식'
  }
];

export default function AiContentGenerator({
  initialTopic = '',
  credits,
  onSpendCredits,
  onOpenCreditModal,
  onNavigate
}: AiContentGeneratorProps) {
  const [topic, setTopic] = useState<string>(initialTopic || '황순원의 소나기 - 소년소녀의 순수한 사랑과 소나기의 상징성');
  const [category, setCategory] = useState<string>('literature');
  const [mode, setMode] = useState<'both' | 'blog' | 'shorts'>('both');
  const [tone, setTone] = useState<string>('casual_mz');
  const [duration, setDuration] = useState<string>('60s');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeResultTab, setActiveResultTab] = useState<'blog' | 'shorts' | 'social'>('blog');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Result state
  const [generatedBlog, setGeneratedBlog] = useState<GeneratedBlogPost | null>(null);
  const [generatedShorts, setGeneratedShorts] = useState<GeneratedShortsScript | null>(null);
  const [sourceType, setSourceType] = useState<string>('');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [activePlayingScene, setActivePlayingScene] = useState<number | null>(null);

  // Initialize with topic's matching template
  React.useEffect(() => {
    if (!generatedBlog) {
      const matched = findCuratedTopic(topic) || '소나기';
      if (CURATED_TOPIC_TEMPLATES[matched]) {
        setGeneratedBlog(CURATED_TOPIC_TEMPLATES[matched].blog);
        setGeneratedShorts(CURATED_TOPIC_TEMPLATES[matched].shorts);
        setSourceType('curated-intelligence');
      }
    }
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert('생성할 주제를 입력해주세요.');
      return;
    }

    // Spend 3 credits for generation
    const hasEnough = onSpendCredits(3, `AI 블로그 & 쇼츠 대본 자동생성: "${topic.substring(0, 18)}..."`);
    if (!hasEnough) {
      onOpenCreditModal();
      return;
    }

    setIsLoading(true);
    stopSpeech();
    setIsPlayingAudio(false);
    setActivePlayingScene(null);

    try {
      const currentOrigin = (typeof window !== 'undefined' && window.location.origin && window.location.origin.startsWith('http'))
        ? window.location.origin
        : DEFAULT_APP_PROMO_URL;

      const res = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim(),
          category,
          mode,
          tone,
          duration,
          appUrl: currentOrigin
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.blog) setGeneratedBlog(data.blog);
        if (data.shorts) setGeneratedShorts(data.shorts);
        setSourceType(data.source || 'gemini-3.8-flash');
      } else {
        throw new Error('API server returned error status');
      }

      if (mode === 'shorts') {
        setActiveResultTab('shorts');
      } else {
        setActiveResultTab('blog');
      }
    } catch (err) {
      console.warn('[Generate Content Fallback Triggered]:', err);
      // Resilient synthesis fallback: ensure user ALWAYS gets instant, topic-tailored content
      const matchedKey = findCuratedTopic(topic);
      if (matchedKey && CURATED_TOPIC_TEMPLATES[matchedKey]) {
        setGeneratedBlog(CURATED_TOPIC_TEMPLATES[matchedKey].blog);
        setGeneratedShorts(CURATED_TOPIC_TEMPLATES[matchedKey].shorts);
        setSourceType('curated-intelligence');
      } else {
        const currentOrigin = (typeof window !== 'undefined' && window.location.origin && window.location.origin.startsWith('http'))
          ? window.location.origin
          : DEFAULT_APP_PROMO_URL;
        const synthetic = synthesizeDynamicContent(topic, category, tone, currentOrigin);
        setGeneratedBlog(synthetic.blog);
        setGeneratedShorts(synthetic.shorts);
        setSourceType('dynamic-synthesizer');
      }
      if (mode === 'shorts') {
        setActiveResultTab('shorts');
      } else {
        setActiveResultTab('blog');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaySceneAudio = (text: string, sceneNum: number) => {
    if (activePlayingScene === sceneNum && isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
      setActivePlayingScene(null);
      return;
    }
    stopSpeech();
    setActivePlayingScene(sceneNum);
    setIsPlayingAudio(true);
    speakText(text, 'ko', () => {
      setIsPlayingAudio(false);
      setActivePlayingScene(null);
    });
  };

  const handlePlayFullShortsAudio = () => {
    if (!generatedShorts) return;
    if (isPlayingAudio && activePlayingScene === 999) {
      stopSpeech();
      setIsPlayingAudio(false);
      setActivePlayingScene(null);
      return;
    }
    stopSpeech();
    setActivePlayingScene(999);
    setIsPlayingAudio(true);
    speakText(generatedShorts.fullScriptKo, 'ko', () => {
      setIsPlayingAudio(false);
      setActivePlayingScene(null);
    });
  };

  // Computed active app promotional URL
  const appPromoLink =
    generatedShorts?.appPromoLink ||
    generatedBlog?.appPromoLink ||
    (typeof window !== 'undefined' && window.location.origin && window.location.origin.startsWith('http')
      ? window.location.origin
      : DEFAULT_APP_PROMO_URL);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Hero Header */}
      <div className="mb-8 bg-gradient-to-r from-neutral-900 via-neutral-800 to-amber-950 text-white rounded-xl p-6 sm:p-8 shadow-xl border border-neutral-800 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>AI Content Creator Studio • Powered by Gemini 3.8 Flash</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight mb-2">
            AI 블로그 원고 & 쇼츠 대본 자동생성기
          </h1>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            원하는 한국어 주제나 K-컬처 키워드를 입력하세요. 클릭 한 번으로 네이버/티스토리용 완성형 <strong>블로그 원고</strong>부터 유튜브 쇼츠·인스타 릴스용 <strong>씬별 스토리보드 대본(타임스탬프, 카메라 화면연출, 자막, 효과음)</strong>까지 완벽하게 제작해 드립니다.
          </p>
        </div>

        {/* Credit Cost Badge */}
        <div className="mt-4 sm:mt-0 sm:absolute sm:right-8 sm:top-8 flex sm:flex-col items-center sm:items-end gap-2">
          <div className="px-3.5 py-1.5 rounded-lg bg-black/50 backdrop-blur-md border border-amber-400/40 text-xs text-neutral-200 flex items-center space-x-2">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>생성 비용: <strong className="text-amber-400 font-mono">3 CR</strong></span>
            <span className="text-neutral-400">/회</span>
          </div>
          <span className="text-[11px] text-neutral-400">현재 잔액: <strong className="text-white font-mono">{credits} CR</strong></span>
        </div>
      </div>

      {/* Main Grid: Control Panel (Left) & Result Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Generator Form (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-editorial-border rounded-xl p-5 sm:p-6 shadow-sm space-y-5">
            
            {/* Topic Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center justify-between">
                <span>1. 생성할 주제 또는 키워드 입력</span>
                <span className="text-[11px] text-neutral-400 font-normal">직접 입력 가능</span>
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="예: 황순원의 소나기 감상법, 한국인이 '밥 먹었냐'고 묻는 이유, 얼죽아 문화..."
                rows={3}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-lg p-3 text-xs sm:text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Quick Popular Presets */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-neutral-600 block uppercase tracking-wider">
                ⚡ 인기 추천 주제 프리셋 (클릭 시 자동 반영)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_TOPICS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setTopic(preset.topic);
                      setCategory(preset.category);
                      const matched = findCuratedTopic(preset.topic);
                      if (matched && CURATED_TOPIC_TEMPLATES[matched]) {
                        setGeneratedBlog(CURATED_TOPIC_TEMPLATES[matched].blog);
                        setGeneratedShorts(CURATED_TOPIC_TEMPLATES[matched].shorts);
                        setSourceType('curated-intelligence');
                      }
                    }}
                    className={`p-2 rounded-lg border text-left transition-all cursor-pointer flex items-start space-x-2 ${
                      topic === preset.topic
                        ? 'bg-amber-50/80 border-amber-500 text-neutral-900 ring-1 ring-amber-500 shadow-2xs'
                        : 'bg-neutral-50/60 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <span className="text-base shrink-0">{preset.icon}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">{preset.label}</div>
                      <span className="text-[9px] text-neutral-500 font-mono">{preset.badge}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generation Mode */}
            <div className="space-y-2 pt-2 border-t border-neutral-200">
              <label className="text-[11px] font-bold text-neutral-700 block uppercase tracking-wider">
                2. 생성 모드 선택 (Generation Mode)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'both', label: '동시 생성', desc: '블로그 + 쇼츠', icon: '🚀' },
                  { id: 'blog', label: '블로그만', desc: '긴 글 원고', icon: '📝' },
                  { id: 'shorts', label: '쇼츠만', desc: '60초 씬별 대본', icon: '🎬' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id as any)}
                    className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                      mode === m.id
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <div className="text-sm mb-0.5">{m.icon}</div>
                    <div className="text-xs font-bold">{m.label}</div>
                    <div className="text-[10px] opacity-70">{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tone & Style */}
            <div className="space-y-2 pt-2 border-t border-neutral-200">
              <label className="text-[11px] font-bold text-neutral-700 block uppercase tracking-wider">
                3. 문체 & 타겟 톤 (Tone & Style)
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded-lg p-2.5 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="casual_mz">🔥 트렌디한 MZ 소셜미디어 톤 (친근하고 위트 있는 문체)</option>
                <option value="informative_expert">🎓 지적인 에디토리얼 칼럼 톤 (전문적이고 신뢰도 높은 문체)</option>
                <option value="storyteller">📖 감성 문학 스토리텔링 톤 (서정적이고 가슴 뭉클한 전개)</option>
                <option value="humorous_snack">🍿 유쾌한 스낵 컬처 톤 (반전과 유머가 있는 숏폼 스타일)</option>
              </select>
            </div>

            {/* Shorts Target Duration */}
            <div className="space-y-2 pt-2 border-t border-neutral-200">
              <label className="text-[11px] font-bold text-neutral-700 block uppercase tracking-wider">
                4. 쇼츠 목표 러닝타임
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '15s', label: '15초', desc: '초압축 핵심 훅' },
                  { id: '30s', label: '30초', desc: '스피디한 팩트 체크' },
                  { id: '60s', label: '60초', desc: '스토리텔링 완결' }
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDuration(d.id)}
                    className={`py-2 px-3 rounded-lg border text-center transition-all cursor-pointer ${
                      duration === d.id
                        ? 'bg-amber-500 text-black font-extrabold border-amber-600 shadow-2xs'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <div className="text-xs font-bold">{d.label}</div>
                    <div className="text-[9.5px] opacity-75">{d.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-3">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white rounded-xl text-sm font-bold transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2 group"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Gemini 3.8이 원고와 대본을 작성하는 중...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
                    <span>AI 블로그 원고 & 쇼츠 대본 자동생성하기 (3 CR)</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-neutral-400 text-center mt-2">
                생성 결과는 언제든지 원클릭으로 복사 및 다운로드할 수 있습니다.
              </p>
            </div>

          </div>
        </div>

        {/* Right Column: Output Viewer (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">

          {/* Global App Promotion Status Banner */}
          <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-300/80 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-start sm:items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                🔗
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-950">
                  <span>앱 홍보 링크 대본 및 원고 삽입 완료</span>
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded-full font-mono font-bold">Auto-Injected</span>
                </div>
                <p className="text-[11px] text-neutral-600 font-mono truncate mt-0.5" title={appPromoLink}>
                  {appPromoLink}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => handleCopy(appPromoLink, 'app_promo_link_bar')}
                className="px-2.5 py-1.5 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-bold rounded-lg border border-neutral-300 shadow-2xs flex items-center space-x-1 cursor-pointer transition-colors"
              >
                {copiedKey === 'app_promo_link_bar' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-neutral-500" />}
                <span>링크 복사</span>
              </button>
              <a
                href={appPromoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-lg shadow-2xs flex items-center space-x-1 transition-colors"
              >
                <span>앱 바로가기</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          
          {/* Output Tab Switcher */}
          <div className="flex items-center justify-between bg-white border border-editorial-border rounded-xl p-2 shadow-sm">
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={() => setActiveResultTab('blog')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                  activeResultTab === 'blog'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>📝 블로그 원고 (Blog Post)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveResultTab('shorts')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 ${
                  activeResultTab === 'shorts'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <Video className="w-4 h-4 text-rose-400" />
                <span>🎬 쇼츠/릴스 대본 (Shorts Script)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveResultTab('social')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  activeResultTab === 'social'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <Hash className="w-3.5 h-3.5 text-blue-500" />
                <span>해시태그 키트</span>
              </button>
            </div>

            {sourceType && (
              <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-neutral-100 text-neutral-600 border border-neutral-200 hidden sm:inline-block">
                Engine: {sourceType}
              </span>
            )}
          </div>

          {/* TAB 1: BLOG POST VIEW */}
          {activeResultTab === 'blog' && generatedBlog && (
            <div className="bg-white border border-editorial-border rounded-xl p-6 shadow-sm space-y-6 animate-in fade-in duration-200">
              
              {/* Blog Title & Quick Copy Header */}
              <div className="border-b border-editorial-border pb-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 w-fit">
                    ⏱️ 예상 읽는 시간: {generatedBlog.readingTime}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(generatedBlog.selectedTitle, 'title')}
                      className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold rounded cursor-pointer transition-colors flex items-center space-x-1"
                    >
                      {copiedKey === 'title' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>제목 복사</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const cleanConclusion = removeAppLinksFromText(generatedBlog.conclusion);
                        const cleanCta = removeAppLinksFromText(generatedBlog.callToAction);
                        const fullMarkdown = `# ${generatedBlog.selectedTitle}\n\n> ${generatedBlog.metaDescription}\n\n${generatedBlog.hook}\n\n` +
                          generatedBlog.sections.map(s => `## ${s.heading}\n\n${s.content}\n\n> ${s.highlightQuote || ''}\n`).join('\n') +
                          `\n\n### 문화적 맥락\n${generatedBlog.culturalNuance}\n\n### 맺음말\n${cleanConclusion}\n\n💬 ${cleanCta}\n\n---\n\n💡 [TalkKorean 공식 앱에서 실전 회화 & 발음 교정을 지금 체험해보세요!]\n👉 TalkKorean 공식 앱 바로가기: ${appPromoLink}\n\n${generatedBlog.hashtags.join(' ')}`;
                        handleCopy(fullMarkdown, 'full_blog');
                      }}
                      className="px-3 py-1 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded cursor-pointer transition-colors flex items-center space-x-1.5 shadow-xs"
                    >
                      {copiedKey === 'full_blog' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                      <span>원고 전체 마크다운 복사</span>
                    </button>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-serif font-black text-neutral-900 leading-snug">
                  {generatedBlog.selectedTitle}
                </h2>

                {/* Alternative Title Suggestions */}
                {generatedBlog.titleSuggestions?.length > 1 && (
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs space-y-1.5">
                    <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider flex items-center space-x-1">
                      <Lightbulb className="w-3 h-3 text-amber-600" />
                      <span>클릭률(CTR)을 높이는 추천 제목 옵션들:</span>
                    </div>
                    <ul className="space-y-1 text-neutral-700">
                      {generatedBlog.titleSuggestions.map((t, idx) => (
                        <li key={idx} className="flex items-start justify-between gap-2 group">
                          <span>• {t}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(t, `alt_title_${idx}`)}
                            className="text-[10px] text-neutral-400 hover:text-neutral-900 font-bold shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {copiedKey === `alt_title_${idx}` ? '복사됨' : '복사'}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Meta Description */}
                <div className="text-xs text-neutral-600 bg-amber-50/40 p-2.5 rounded border border-amber-200/50">
                  <strong className="text-neutral-900">SEO 검색엔진 메타 설명:</strong> {generatedBlog.metaDescription}
                </div>
              </div>

              {/* Hook Paragraph */}
              <div className="p-4 bg-neutral-50 border-l-4 border-amber-500 rounded-r-lg text-xs sm:text-sm text-neutral-800 leading-relaxed italic">
                {generatedBlog.hook}
              </div>

              {/* Sections */}
              <div className="space-y-6">
                {generatedBlog.sections.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-base sm:text-lg font-serif font-bold text-neutral-900 border-b border-neutral-100 pb-1.5">
                      {section.heading}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>

                    {section.highlightQuote && (
                      <div className="p-3 bg-amber-50/50 border border-amber-200/80 rounded-lg text-xs font-serif font-bold text-amber-900">
                        {section.highlightQuote}
                      </div>
                    )}

                    {/* Korean Vocabulary Cards if present */}
                    {section.koreanVocabulary && section.koreanVocabulary.length > 0 && (
                      <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 space-y-2">
                        <div className="text-[11px] font-bold text-neutral-600 flex items-center space-x-1">
                          <BookOpen className="w-3 h-3 text-neutral-500" />
                          <span>본문 속 핵심 한국어 어휘 & 표현</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {section.koreanVocabulary.map((v, vIdx) => (
                            <div key={vIdx} className="bg-white p-2.5 rounded border border-neutral-200 text-xs space-y-1 shadow-2xs">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-neutral-900 font-sans">{v.word}</span>
                                <button
                                  type="button"
                                  onClick={() => speakText(v.word, 'ko')}
                                  className="text-neutral-400 hover:text-amber-600 transition-colors p-0.5 cursor-pointer"
                                  title="발음 듣기"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <div className="text-[11px] text-neutral-600">{v.meaning}</div>
                              {v.example && (
                                <div className="text-[10px] text-neutral-500 font-mono italic">
                                  "{v.example}"
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Cultural Nuance */}
              {generatedBlog.culturalNuance && (
                <div className="bg-gradient-to-r from-blue-50/60 to-indigo-50/60 border border-blue-200 p-4 rounded-xl text-xs sm:text-sm text-neutral-800 space-y-1.5">
                  <h4 className="font-bold text-blue-950 flex items-center space-x-1.5">
                    <span>💡 에디터의 문화적 통찰 (Cultural Nuance)</span>
                  </h4>
                  <p className="leading-relaxed text-blue-900">
                    {generatedBlog.culturalNuance}
                  </p>
                </div>
              )}

              {/* Conclusion & CTA */}
              <div className="border-t border-editorial-border pt-4 space-y-4 text-xs sm:text-sm">
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1.5 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>맺음말</span>
                  </h4>
                  <p className="text-neutral-800 leading-relaxed text-sm sm:text-base font-normal tracking-tight border-l-2 border-amber-400 pl-3.5 my-2 bg-amber-50/30 py-1.5 rounded-r-md">
                    {removeAppLinksFromText(generatedBlog.conclusion)}
                  </p>
                </div>
                <div className="space-y-3">
                  {/* Community Discussion Box */}
                  <div className="p-4 bg-amber-50/80 border border-amber-200/90 rounded-xl text-neutral-900 shadow-2xs space-y-1.5">
                    <div className="text-xs font-bold text-amber-900 flex items-center space-x-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                      <span>독자 소통 & 댓글 유도</span>
                    </div>
                    <p className="text-sm font-semibold text-amber-950 leading-relaxed">
                      💬 {removeAppLinksFromText(generatedBlog.callToAction)}
                    </p>
                  </div>

                  {/* TalkKorean Official App Conversion Banner */}
                  <div className="p-4 sm:p-5 bg-neutral-900 text-white rounded-xl border border-neutral-800 shadow-md space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold border border-amber-400/30">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>TalkKorean 공식 앱 실전 체험</span>
                        </div>
                        <h5 className="text-sm sm:text-base font-bold text-neutral-100 flex flex-wrap items-center gap-1.5 pt-0.5">
                          <span>💡 [TalkKorean 공식 앱에서 실전 회화 & 발음 교정을 지금 체험해보세요!]</span>
                          <span className="text-amber-400 text-xs font-medium">💡 [Practice real-life Korean conversation 1:1]</span>
                        </h5>
                        <p className="text-xs text-neutral-300 font-mono flex items-center space-x-1.5 pt-0.5">
                          <span className="text-neutral-400">공식 앱 링크:</span>
                          <a
                            href={appPromoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-300 hover:text-amber-200 underline underline-offset-2 transition-colors break-all"
                          >
                            {appPromoLink}
                          </a>
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0 pt-1 sm:pt-0">
                        <button
                          type="button"
                          onClick={() => handleCopy(appPromoLink, 'blog_cta_promo_link')}
                          className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold rounded-lg transition-colors flex items-center space-x-1.5 border border-neutral-700 cursor-pointer shadow-2xs"
                          title="공식 앱 링크 복사"
                        >
                          {copiedKey === 'blog_cta_promo_link' ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 font-semibold">복사 완료</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-neutral-400" />
                              <span>링크 복사</span>
                            </>
                          )}
                        </button>
                        <a
                          href={appPromoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-neutral-950 text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5 shadow-sm cursor-pointer"
                        >
                          <span>지금 체험하기</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {generatedBlog.hashtags.map((tag, idx) => (
                  <span key={idx} className="text-xs font-mono text-neutral-600 bg-neutral-100 hover:bg-neutral-200 px-2 py-0.5 rounded cursor-pointer transition-colors">
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          )}

          {/* TAB 2: SHORTS / REELS SCRIPT VIEW */}
          {activeResultTab === 'shorts' && generatedShorts && (
            <div className="bg-white border border-editorial-border rounded-xl p-6 shadow-sm space-y-6 animate-in fade-in duration-200">
              
              {/* Shorts Meta Header */}
              <div className="border-b border-editorial-border pb-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                      ⏱️ 예상 러닝타임: {generatedShorts.estimatedDuration}
                    </span>
                    <span className="text-[11px] font-bold text-neutral-600 bg-neutral-100 px-2.5 py-0.5 rounded-full">
                      🎵 BGM: {generatedShorts.bgmSuggestion}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={handlePlayFullShortsAudio}
                      className={`px-3 py-1 text-xs font-bold rounded cursor-pointer transition-all flex items-center space-x-1.5 shadow-2xs ${
                        isPlayingAudio && activePlayingScene === 999
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
                      }`}
                    >
                      {isPlayingAudio && activePlayingScene === 999 ? (
                        <>
                          <Square className="w-3 h-3 fill-current" />
                          <span>음성 정지</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-current text-rose-600" />
                          <span>대본 전체 음성 미리듣기 (TTS)</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopy(generatedShorts.fullScriptKo, 'full_shorts_ko')}
                      className="px-3 py-1 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded cursor-pointer transition-colors flex items-center space-x-1 shadow-xs"
                    >
                      {copiedKey === 'full_shorts_ko' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>대본 복사</span>
                    </button>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-serif font-black text-neutral-900 leading-snug">
                  {generatedShorts.title}
                </h2>

                {/* Thumbnail Hook and Retention Tip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <span className="text-[10px] font-bold text-amber-800 uppercase block mb-0.5">
                      📌 유튜브/틱톡 썸네일 카피
                    </span>
                    <span className="font-extrabold text-neutral-900 text-sm">
                      {generatedShorts.thumbnailHook}
                    </span>
                  </div>

                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg">
                    <span className="text-[10px] font-bold text-rose-800 uppercase block mb-0.5">
                      🔥 100% 시청 지속시간 유지 꿀팁
                    </span>
                    <span className="font-medium text-neutral-800">
                      {generatedShorts.retentionTip}
                    </span>
                  </div>
                </div>
              </div>

              {/* Storyboard Scenes List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider flex items-center space-x-1.5">
                    <Film className="w-4 h-4 text-neutral-700" />
                    <span>씬별 스토리보드 & 촬영 디렉팅 (Storyboard)</span>
                  </h3>
                  <span className="text-[11px] text-neutral-500">
                    총 {generatedShorts.scenes?.length || 5}개 씬
                  </span>
                </div>

                <div className="space-y-3">
                  {generatedShorts.scenes?.map((scene) => (
                    <div 
                      key={scene.sceneNumber} 
                      className="border border-neutral-200 rounded-xl p-4 bg-[#fafafa] hover:bg-white hover:border-neutral-300 transition-all shadow-2xs space-y-2.5"
                    >
                      {/* Scene Header */}
                      <div className="flex items-center justify-between border-b border-neutral-200/60 pb-2">
                        <div className="flex items-center space-x-2">
                          <span className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                            {scene.sceneNumber}
                          </span>
                          <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            ⏱️ {scene.timeRange}
                          </span>
                          {scene.sceneNumber === (generatedShorts.scenes?.length || 5) && (
                            <span className="text-[10px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>앱 홍보 & CTA 씬</span>
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          {scene.sfx && (
                            <span className="text-[10px] font-bold text-neutral-500 bg-neutral-200/70 px-2 py-0.5 rounded">
                              🔔 {scene.sfx}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => handlePlaySceneAudio(scene.narrationKo, scene.sceneNumber)}
                            className={`p-1 rounded cursor-pointer transition-colors ${
                              activePlayingScene === scene.sceneNumber && isPlayingAudio
                                ? 'bg-rose-600 text-white'
                                : 'text-neutral-400 hover:text-neutral-800'
                            }`}
                            title="이 씬 대사만 듣기"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {scene.sceneNumber === (generatedShorts.scenes?.length || 5) && (
                        <div className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 font-sans">
                          <span className="font-bold flex items-center space-x-1">
                            <span>📢 화면 하단 자막/오버레이:</span>
                            <span className="text-amber-800 font-mono underline break-all">{appPromoLink}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(appPromoLink, 'scene_promo_link')}
                            className="text-[11px] text-amber-900 hover:text-amber-950 font-bold underline cursor-pointer shrink-0 self-start sm:self-auto"
                          >
                            {copiedKey === 'scene_promo_link' ? '복사됨!' : '링크 복사'}
                          </button>
                        </div>
                      )}

                      {/* Visual & Audio Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
                        
                        {/* Visual Direction (5 cols) */}
                        <div className="sm:col-span-5 bg-neutral-100/70 p-2.5 rounded-lg space-y-1">
                          <span className="text-[10px] font-bold text-neutral-500 uppercase block">
                            🎥 카메라 화면 연출 (B-roll)
                          </span>
                          <p className="text-neutral-800 font-medium leading-relaxed">
                            {scene.visual}
                          </p>
                          {scene.captionText && (
                            <div className="pt-1 mt-1 border-t border-neutral-200 text-[11px] font-bold text-amber-800">
                              💬 자막: {scene.captionText}
                            </div>
                          )}
                        </div>

                        {/* Narration (7 cols) */}
                        <div className="sm:col-span-7 bg-white p-2.5 rounded-lg border border-neutral-200 space-y-1">
                          <span className="text-[10px] font-bold text-neutral-500 uppercase block">
                            🎙️ 내레이션 대사 (Voiceover)
                          </span>
                          <p className="text-sm font-bold text-neutral-900 leading-snug">
                            "{scene.narrationKo}"
                          </p>
                          <p className="text-[11px] text-neutral-500 italic">
                            "{scene.narrationEn}"
                          </p>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Narration Script View */}
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800 flex items-center space-x-1.5">
                    <FileText className="w-3.5 h-3.5 text-neutral-600" />
                    <span>녹음용 한국어 전체 내레이션 (Full Script)</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(generatedShorts.fullScriptKo, 'full_narration')}
                    className="text-xs text-neutral-600 hover:text-neutral-900 font-bold flex items-center space-x-1 cursor-pointer"
                  >
                    {copiedKey === 'full_narration' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>복사하기</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed bg-white p-3 rounded border border-neutral-200 font-sans">
                  {generatedShorts.fullScriptKo}
                </p>
              </div>

              {/* Pinned Comment & Video Description with App Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Pinned Comment */}
                <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-950 flex items-center space-x-1.5">
                      <span>📌 쇼츠/릴스 고정 댓글 (Pinned Comment)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const pinnedText = generatedShorts.pinnedCommentKo ||
                          `📌 [고정 댓글]\n오늘 배운 한국어 표현, 입으로 직접 말하며 실전 회화와 발음을 연습해보세요!\n👉 TalkKorean 공식 앱 무료 체험하기: ${appPromoLink}\n#TalkKorean #한국어공부 #KCulture`;
                        handleCopy(pinnedText, 'pinned_comment');
                      }}
                      className="px-2.5 py-1 bg-amber-900 text-white rounded text-xs font-bold cursor-pointer hover:bg-amber-800 flex items-center space-x-1 shadow-2xs"
                    >
                      {copiedKey === 'pinned_comment' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>고정 댓글 복사</span>
                    </button>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-amber-200 text-xs text-neutral-800 whitespace-pre-line leading-relaxed font-sans">
                    {generatedShorts.pinnedCommentKo ||
                      `📌 [고정 댓글]\n오늘 배운 한국어 표현, 입으로 직접 말하며 실전 회화와 발음을 연습해보세요!\n👉 TalkKorean 공식 앱 무료 체험하기: ${appPromoLink}\n#TalkKorean #한국어공부 #KCulture`}
                  </div>
                </div>

                {/* Video Description */}
                <div className="p-4 bg-rose-50/80 border border-rose-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-950 flex items-center space-x-1.5">
                      <span>🎬 유튜브 설명란 (Video Description)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const descText = generatedShorts.videoDescriptionKo ||
                          `🎬 영상 속 표현과 문화 배경을 더 깊이 배우고 싶다면?\n실시간 24시간 실전 1:1 대화 & 정밀 발음 분석이 가능한 TalkKorean 앱을 확인하세요!\n👉 공식 앱 바로가기: ${appPromoLink}\n\n#TalkKorean #한국어 #Shorts`;
                        handleCopy(descText, 'video_desc');
                      }}
                      className="px-2.5 py-1 bg-rose-900 text-white rounded text-xs font-bold cursor-pointer hover:bg-rose-800 flex items-center space-x-1 shadow-2xs"
                    >
                      {copiedKey === 'video_desc' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>설명란 복사</span>
                    </button>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-rose-200 text-xs text-neutral-800 whitespace-pre-line leading-relaxed font-sans">
                    {generatedShorts.videoDescriptionKo ||
                      `🎬 영상 속 표현과 문화 배경을 더 깊이 배우고 싶다면?\n실시간 24시간 실전 1:1 대화 & 정밀 발음 분석이 가능한 TalkKorean 앱을 확인하세요!\n👉 공식 앱 바로가기: ${appPromoLink}\n\n#TalkKorean #한국어 #Shorts`}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: SOCIAL MEDIA KIT & HASHTAGS */}
          {activeResultTab === 'social' && (
            <div className="bg-white border border-editorial-border rounded-xl p-6 shadow-sm space-y-6 animate-in fade-in duration-200">
              
              <div className="border-b border-editorial-border pb-3">
                <h3 className="text-base font-serif font-bold text-neutral-900">
                  📱 SNS 채널별 원클릭 배포 키트
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  인스타그램, 유튜브, 네이버 블로그에 최적화된 해시태그와 공식 홍보 카피를 손쉽게 복사하세요.
                </p>
              </div>

              {/* Dedicated App Promotion Social Post */}
              <div className="bg-gradient-to-r from-neutral-900 to-amber-950 text-white p-4.5 rounded-xl border border-neutral-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>🚀 TalkKorean 공식 앱 링크 포함 SNS 홍보용 피드 문구</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const postText = `🇰🇷 ${generatedBlog?.selectedTitle || generatedShorts?.title || '한국어 & K-컬처 이야기'}\n\n${generatedBlog?.hook || generatedShorts?.thumbnailHook || ''}\n\n실시간 24시간 한국어 발음과 실전 회화를 무료로 연습해 보세요!\n👉 TalkKorean 공식 앱: ${appPromoLink}\n\n${(generatedBlog?.hashtags || []).join(' ')} #TalkKorean #한국어배우기 #KCulture`;
                      handleCopy(postText, 'social_promo_post');
                    }}
                    className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-xs font-bold cursor-pointer transition-colors flex items-center space-x-1 shadow-2xs"
                  >
                    {copiedKey === 'social_promo_post' ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                    <span>홍보 문구 전체 복사</span>
                  </button>
                </div>
                <div className="bg-black/50 p-3 rounded-lg border border-neutral-700 text-xs text-neutral-200 leading-relaxed font-sans whitespace-pre-line">
                  {`🇰🇷 ${generatedBlog?.selectedTitle || generatedShorts?.title || '한국어 & K-컬처 이야기'}\n\n${generatedBlog?.hook || generatedShorts?.thumbnailHook || ''}\n\n실시간 24시간 한국어 발음과 실전 회화를 무료로 연습해 보세요!\n👉 TalkKorean 공식 앱: ${appPromoLink}\n\n${(generatedBlog?.hashtags || []).join(' ')} #TalkKorean #한국어배우기 #KCulture`}
                </div>
              </div>

              {/* Instagram & Shorts Tag Block */}
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800">
                    🏷️ 인스타그램 릴스 & 유튜브 쇼츠 추천 태그
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const tags = (generatedBlog?.hashtags || []).join(' ') + ' #Shorts #Reels #TalkKorean #KoreanCulture';
                      handleCopy(tags, 'social_tags');
                    }}
                    className="px-3 py-1 bg-neutral-900 text-white rounded text-xs font-bold cursor-pointer hover:bg-neutral-800 flex items-center space-x-1"
                  >
                    {copiedKey === 'social_tags' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>태그 전체 복사</span>
                  </button>
                </div>

                <div className="p-3 bg-white rounded border border-neutral-200 text-xs font-mono text-neutral-700 leading-relaxed">
                  {(generatedBlog?.hashtags || []).join(' ')} #Shorts #Reels #TalkKorean #한국문화 #한국어공부
                </div>
              </div>

              {/* A/B Headline Test */}
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-3">
                <span className="text-xs font-bold text-neutral-800 block">
                  🎯 썸네일 & 헤드라인 A/B 테스트 추천안
                </span>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-white rounded border border-neutral-200 flex items-center justify-between">
                    <div>
                      <strong className="text-neutral-900">안 A (호기심 유발형):</strong> "{generatedShorts?.thumbnailHook || '한국인이 밥 먹었냐고 묻는 진짜 이유'}"
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(generatedShorts?.thumbnailHook || '', 'ab_a')}
                      className="text-neutral-400 hover:text-neutral-800 p-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-2.5 bg-white rounded border border-neutral-200 flex items-center justify-between">
                    <div>
                      <strong className="text-neutral-900">안 B (지적 에세이형):</strong> "{generatedBlog?.selectedTitle || '한국인이 평생 잊지 못하는 문학'}"
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(generatedBlog?.selectedTitle || '', 'ab_b')}
                      className="text-neutral-400 hover:text-neutral-800 p-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
