import React from 'react';
import { ArrowRight, Star, ShieldCheck, Sparkles, BookOpen, Volume2, HelpCircle, RotateCcw, HeartHandshake, Film, CheckCircle2 } from 'lucide-react';
import { K_CULTURE_ITEMS, KCultureCategory } from '../data/kCultureData';
import CultureCardTemplate from './CultureCardTemplate';
import { useLanguage } from '../context/LanguageContext';
import koreanCalligraphyImage from '../assets/images/korean_calligraphy_art_1787066698427.jpg';
import seoulCityNightImage from '../assets/images/seoul_city_night_1787751614566.jpg';
import hanokCourtyardImage from '../assets/images/hanok_courtyard_traditional_1788691985592.jpg';

interface HomeProps {
  setActiveTab: (tab: string, subMenu?: any) => void;
  onSelectKCultureCategory?: (category: KCultureCategory) => void;
}

export default function Home({ setActiveTab, onSelectKCultureCategory }: HomeProps) {
  const { t } = useLanguage();

  // Daily deterministic rotation seed based on today's date
  const todayIndex = React.useMemo(() => {
    const now = new Date();
    const dayOfYear = Math.floor(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return dayOfYear % K_CULTURE_ITEMS.length;
  }, []);

  const [currentCultureIndex, setCurrentCultureIndex] = React.useState<number>(todayIndex);
  const currentCard = K_CULTURE_ITEMS[currentCultureIndex];

  return (
    <div className="bg-editorial-bg min-h-screen text-editorial-text pb-12 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-16 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Side Info */}
        <div className="flex-1 text-left space-y-6 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-editorial-accent-light/50 border border-editorial-border text-editorial-accent px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.home.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-editorial-text leading-[1.1] tracking-tight">
            {t.home.title}
          </h1>

          <p className="text-base sm:text-lg text-editorial-muted font-normal leading-relaxed">
            {t.home.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('Dashboard')}
              className="px-6 py-3.5 bg-editorial-text hover:bg-editorial-accent text-editorial-bg hover:text-white rounded-sm font-bold tracking-wider text-xs uppercase transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
            >
              <span>{t.home.startLearning}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('LyricsLab')}
              className="px-6 py-3.5 bg-white border border-editorial-border hover:bg-editorial-accent-light text-editorial-text rounded-sm font-bold tracking-wider text-xs uppercase transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{t.home.tryLyrics}</span>
            </button>
          </div>

          {/* Social Proof / Avatars */}
          <div className="flex items-center space-x-4 pt-4 border-t border-editorial-border">
            <div className="flex -space-x-2 overflow-hidden">
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
                alt="Active Learner"
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"
                alt="Active Learner"
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80"
                alt="Active Learner"
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80"
                alt="Active Learner"
              />
            </div>
            <div>
              <div className="flex items-center text-editorial-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="ml-1.5 text-sm font-bold text-editorial-text">4.9 / 5</span>
              </div>
              <p className="text-xs text-editorial-muted font-medium">Joined by 12,000+ active scholars</p>
            </div>
          </div>
        </div>

        {/* Right Side Illustration */}
        <div className="flex-1 w-full relative flex items-center justify-center">
          {/* Back glows */}
          <div className="absolute -inset-1 rounded-sm bg-editorial-accent/10 opacity-30 blur-2xl"></div>

          <div className="relative bg-white border border-editorial-border rounded-sm p-6 md:p-8 max-w-lg w-full">
            {/* Split Traditional Hanok Background Image / Card */}
            <div className="relative rounded-sm overflow-hidden h-64 mb-6 border border-editorial-border">
              <img
                src={hanokCourtyardImage}
                alt="Traditional Korean Hanok Courtyard"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/20 to-transparent"></div>
              
              {/* Overlay elements */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
                <div>
                  <p className="text-xs font-semibold text-editorial-accent-light/90 tracking-wider uppercase">Heritage Campus</p>
                  <h3 className="font-bold text-lg font-serif">Traditional Hanok Courtyard</h3>
                </div>
                <div className="bg-editorial-text/90 backdrop-blur-md px-2.5 py-1 rounded-sm text-[10px] font-bold border border-editorial-border text-editorial-bg">
                  📍 Bukchon, Seoul
                </div>
              </div>
            </div>

            {/* Simulated Modern Tablet / Lesson Interface */}
            <div className="bg-editorial-bg rounded-sm p-5 border border-editorial-border relative">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-editorial-text"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-editorial-accent"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-editorial-accent-light"></div>
                </div>
                <span className="text-[10px] font-bold text-editorial-accent bg-editorial-accent-light px-2 py-0.5 border border-editorial-border rounded-sm uppercase tracking-wider">
                  K-Lang Engine v1.8
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-sm border border-editorial-border">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🔥</span>
                    <div>
                      <h4 className="text-xs font-bold text-editorial-text">15-Day Perfect Streak</h4>
                      <p className="text-[10px] text-editorial-muted font-semibold">Scholar Rank: Senior</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-editorial-accent bg-editorial-accent-light/60 border border-editorial-border px-2 py-1 rounded-sm">
                    +250 XP
                  </span>
                </div>

                <div 
                  onClick={() => setActiveTab('Dashboard', 'honorifics')}
                  className="p-3 bg-white rounded-sm border border-editorial-border space-y-2 cursor-pointer hover:border-editorial-accent transition-all group"
                  title="Click to open Honorifics (존댓말) Masterclass"
                >
                  <div className="flex justify-between text-xs font-bold text-editorial-text group-hover:text-editorial-accent">
                    <span>Honorific Verbs Lesson (존댓말) ↗</span>
                    <span className="text-editorial-accent">80% Finished</span>
                  </div>
                  <div className="w-full bg-editorial-accent-light rounded-sm h-1.5">
                    <div className="bg-editorial-accent h-1.5 rounded-sm" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY TALK KOREAN? BENTO GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-editorial-border">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-serif font-bold text-editorial-text tracking-tight">Why Choose Talk Korean?</h2>
          <p className="text-editorial-muted font-medium max-w-xl mx-auto">
            Our platform merges classical academic excellence with highly interactive modern modules that keep you engaged daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-editorial-border rounded-sm p-6 shadow-none flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-sm bg-editorial-accent-light/50 text-editorial-accent flex items-center justify-center font-bold text-xl transition-all">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-editorial-text font-serif">Structured Curriculum</h3>
              <p className="text-sm text-editorial-muted font-medium leading-relaxed">
                Handcrafted courses covering Hangeul foundations, essential grammatical particles, everyday etiquette, and complex speech honorifics.
              </p>
            </div>
            <div 
              onClick={() => setActiveTab('Dashboard')}
              className="mt-6 flex items-center space-x-1.5 text-xs font-bold text-editorial-accent group-hover:text-editorial-text cursor-pointer uppercase tracking-wider"
            >
              <span>Explore Curriculum Path</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-editorial-border rounded-sm p-6 shadow-none flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-sm bg-editorial-accent-light/50 text-editorial-accent flex items-center justify-center font-bold text-xl transition-all">
                <Volume2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-editorial-text font-serif">AI Pronunciation Lab</h3>
              <p className="text-sm text-editorial-muted font-medium leading-relaxed">
                Practice intonation and rhythm directly using lyrics. Get circular scoring and real-time comparative audio waveform feedback.
              </p>
            </div>
            <div 
              onClick={() => setActiveTab('LyricsLab')}
              className="mt-6 flex items-center space-x-1.5 text-xs font-bold text-editorial-accent group-hover:text-editorial-text cursor-pointer uppercase tracking-wider"
            >
              <span>Try Pronunciation Sandbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-editorial-border rounded-sm p-6 shadow-none flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-sm bg-editorial-accent-light/50 text-editorial-accent flex items-center justify-center font-bold text-xl transition-all">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-editorial-text font-serif">K-Culture & Heritage Guide</h3>
              <p className="text-sm text-editorial-muted font-medium leading-relaxed">
                Explore 8 immersive cultural categories—from K-FOOD and Hanok palaces to K-POP, literature, and gaming traditions.
              </p>
            </div>
            <div 
              onClick={() => setActiveTab('KCulture')}
              className="mt-6 flex items-center space-x-1.5 text-xs font-bold text-editorial-accent group-hover:text-editorial-text cursor-pointer uppercase tracking-wider"
            >
              <span>Explore K-Culture Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOUL OF KOREA (Heritage vs. Modernity Split) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#1A1A1A] rounded-sm text-white relative overflow-hidden my-6 border border-editorial-border">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <div className="inline-block bg-white/10 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] font-bold text-editorial-accent uppercase tracking-widest border border-white/10">
              Linguistic Masterclass
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight leading-tight">
              Learn the Soul of Korea:<br/>
              Traditional Respect & Modern Slang
            </h2>
            <p className="text-editorial-accent-light font-medium leading-relaxed">
              True Korean fluency isn't just about translating vocabulary; it's about shifting respect and social cues fluidly. Master honorific suffixes for elder respect while speaking raw trends seamlessly with peers.
            </p>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => setActiveTab('Dashboard', 'cultural-etiquette')}
                className="w-full flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer group"
              >
                <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-xs mt-0.5 text-amber-300 shrink-0">
                  <HeartHandshake className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-gray-100 font-serif group-hover:text-amber-300 transition-colors">
                      Cultural Etiquette Guides (한국 문화 예절)
                    </h4>
                    <span className="text-[10px] text-amber-400 font-mono">열기 →</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">인사 각도, 식사 수저 예절, 회식 주도(酒道), 두 손 매너 가이드 및 퀴즈</p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('Dashboard', 'kdrama-vocab')}
                className="w-full flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer group"
              >
                <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-xs mt-0.5 text-purple-300 shrink-0">
                  <Film className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-gray-100 font-serif group-hover:text-purple-300 transition-colors">
                      K-Drama Vocabulary (K-드라마 명대사 & 어휘)
                    </h4>
                    <span className="text-[10px] text-purple-400 font-mono">열기 →</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">도깨비, 사랑의 불시착 명대사 TTS 음성 및 심쿵, 츤데레, 썸, 사이다 어휘</p>
                </div>
              </button>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('Dashboard', 'honorifics')}
                className="px-5 py-3 bg-editorial-accent hover:bg-white hover:text-editorial-text text-white text-xs font-bold rounded-sm transition-all flex items-center space-x-2 cursor-pointer uppercase tracking-wider shadow-sm font-serif"
              >
                <span>🙇 존댓말(Honorifics) 마스터</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('Dashboard', 'dictation')}
                className="px-5 py-3 bg-white/10 hover:bg-white hover:text-editorial-text text-white text-xs font-bold rounded-sm transition-all flex items-center space-x-2 cursor-pointer uppercase tracking-wider shadow-sm font-serif border border-white/20"
              >
                <span>✍️ 실전 받아쓰기 Test</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="rounded-sm overflow-hidden h-44 border border-white/10 shadow-md bg-neutral-900">
                <img
                  src={koreanCalligraphyImage}
                  alt="Traditional Korean Calligraphy and Hanji Art"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-sm p-3.5 text-left">
                <h4 className="font-bold text-sm text-white font-serif">Calligraphy & Hanji</h4>
                <p className="text-xs text-gray-400">전통 서예 붓글씨와 훈민정음 한지의 고전적 아름다움</p>
              </div>
            </div>
            <div className="space-y-3 pt-6">
              <div className="bg-white/5 border border-white/10 rounded-sm p-3.5 text-left">
                <h4 className="font-bold text-sm text-white font-serif">Seoul City Pulse</h4>
                <p className="text-xs text-gray-400">화려한 네온사인과 남산타워가 빛나는 현대 서울의 밤</p>
              </div>
              <div className="rounded-sm overflow-hidden h-44 border border-white/10 shadow-md bg-neutral-900">
                <img
                  src={seoulCityNightImage}
                  alt="Modern Seoul City Night View"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CULTURAL HUB SECTION (Daily Rotated K-Culture 8 Categories & K-FOOD Template) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-editorial-border">
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center space-x-1.5 bg-editorial-accent-light text-editorial-accent border border-editorial-border px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest">
              <span>Cultural HUB • 8대 카테고리 일일 큐레이션</span>
            </span>
            <button
              onClick={() => setCurrentCultureIndex((prev) => (prev + 1) % K_CULTURE_ITEMS.length)}
              className="inline-flex items-center space-x-1 px-3 py-1 bg-white hover:bg-editorial-bg border border-editorial-border rounded-sm text-[11px] font-bold text-editorial-text transition-colors cursor-pointer shadow-sm"
              title="다른 K-Culture 카드 보기"
            >
              <RotateCcw className="w-3.5 h-3.5 text-editorial-accent" />
              <span>다음 큐레이션 보기 (({currentCultureIndex + 1}/{K_CULTURE_ITEMS.length}))</span>
            </button>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-editorial-text tracking-tight">
            오늘의 큐레이션: {currentCard.titleKo.split(':')[0]}
          </h2>
          <p className="text-editorial-muted font-medium max-w-2xl mx-auto text-sm sm:text-base">
            헤더의 K-Culture 하부메뉴(8대 카테고리)에 수록된 문화해설, 필수 어휘, 실전 표현이 매일 무작위로 교체되어 제공됩니다.
          </p>
        </div>

        {/* Reusable Bibimbap-style Rich Template Card */}
        <CultureCardTemplate
          item={currentCard}
          showHeaderTitle={true}
          onSelectCategory={(category) => {
            if (onSelectKCultureCategory) {
              onSelectKCultureCategory(category);
            } else {
              setActiveTab('KCulture');
            }
          }}
        />
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-editorial-border">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold font-serif text-editorial-text tracking-tight">Voices from Our Community</h2>
          <p className="text-editorial-muted font-medium">Hear how Talk Korean is transforming the way students study Korean internationally.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-editorial-border rounded-sm p-6 shadow-none flex flex-col justify-between">
            <p className="text-sm text-editorial-text font-medium italic leading-relaxed">
              "The interactive lyrics lab transformed my study habits. Getting instant translations and pitch matches feels like playing a game!"
            </p>
            <div className="flex items-center space-x-3 mt-6">
              <div className="w-10 h-10 rounded-full bg-editorial-accent text-editorial-bg font-serif font-bold text-sm flex items-center justify-center">
                SL
              </div>
              <div className="text-left">
                <h4 className="font-bold text-sm text-editorial-text font-serif">Sarah L.</h4>
                <p className="text-[11px] text-editorial-muted font-semibold">Active Member (TOPIK Level 3)</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-editorial-border rounded-sm p-6 shadow-none flex flex-col justify-between">
            <p className="text-sm text-editorial-text font-medium italic leading-relaxed">
              "Combining standard honorific lessons with modern K-POP slang keeps me fully engaged. It's the only app that teaches real conversational skills."
            </p>
            <div className="flex items-center space-x-3 mt-6">
              <div className="w-10 h-10 rounded-full bg-editorial-accent text-editorial-bg font-serif font-bold text-sm flex items-center justify-center">
                MG
              </div>
              <div className="text-left">
                <h4 className="font-bold text-sm text-editorial-text font-serif">Marco G.</h4>
                <p className="text-[11px] text-editorial-muted font-semibold">Language Enthusiast</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-editorial-border rounded-sm p-6 shadow-none flex flex-col justify-between">
            <p className="text-sm text-editorial-text font-medium italic leading-relaxed">
              "The real-time pronunciation enunciation score is outstanding. My friends in Seoul say my vowels sound incredibly native now."
            </p>
            <div className="flex items-center space-x-3 mt-6">
              <div className="w-10 h-10 rounded-full bg-editorial-accent text-editorial-bg font-serif font-bold text-sm flex items-center justify-center">
                ET
              </div>
              <div className="text-left">
                <h4 className="font-bold text-sm text-editorial-text font-serif">Elena T.</h4>
                <p className="text-[11px] text-editorial-muted font-semibold">Senior Student</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION (CTA) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-[#1A1A1A] rounded-sm p-8 sm:p-12 text-white relative overflow-hidden border border-editorial-border shadow-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-editorial-accent/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-editorial-accent/5 rounded-full blur-2xl -ml-16 -mb-16"></div>
          
          <div className="relative z-10 space-y-6">
            <h2 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight leading-tight">Ready to Start Your Journey?</h2>
            <p className="text-editorial-accent-light text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed">
              Unlock our complete K-POP lyrics database, book 1:1 native tutor sessions, and get immediate feedback on your spoken Korean.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-4">
              <button
                onClick={() => setActiveTab('Dashboard')}
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-editorial-text hover:bg-editorial-accent-light font-bold rounded-sm tracking-wider text-xs uppercase transition-colors cursor-pointer"
              >
                Get Started Free
              </button>
              <button
                onClick={() => setActiveTab('LyricsLab')}
                className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-white/10 border border-white/20 text-white font-bold rounded-sm tracking-wider text-xs uppercase transition-colors cursor-pointer"
              >
                Lyrics Lab
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
