import React, { useState } from 'react';
import { Volume2, Sparkles, MessageSquare, CheckCircle2, RefreshCw, AlertTriangle, ArrowRight, Zap, Loader2, Search } from 'lucide-react';
import { speakKoreanText } from '../../utils/tts';

interface SlangItem {
  id: string;
  wordKo: string;
  wordRomanized: string;
  category: 'reaction' | 'life' | 'chat';
  meaningEn: string;
  originKo: string;
  originEn: string;
  exampleKo: string;
  exampleRomanized: string;
  exampleEn: string;
  politeEquivalentKo: string;
  politeEquivalentEn: string;
  registerWarning: string;
}

interface KSlangMenuProps {
  credits?: number;
  onSpendCredits?: (amount: number, description: string) => boolean;
  onOpenCreditModal?: () => void;
}

const SLANG_ITEMS: SlangItem[] = [
  {
    id: 'jonbeo',
    wordKo: '존버',
    wordRomanized: 'Jon-beo',
    category: 'life',
    meaningEn: 'Holding on for dear life / Toughing it out patiently (Diamond hands)',
    originKo: '‘존나 버티기’의 줄임말. 원래 주식/암호화폐 시장이나 힘든 상황에서 끝까지 버틴다는 의미입니다.',
    originEn: 'Short for "intensely holding out". Originally from crypto/stock investing, meaning to patiently endure tough times without selling or giving up.',
    exampleKo: '이번 시험 끝날 때까지 카페에서 존버한다!',
    exampleRomanized: 'Ibeon siheom kkeutnal ttaekkaji kape-eseo jonbeohanda!',
    exampleEn: 'I am toughing it out at the café until this exam is over!',
    politeEquivalentKo: '끝까지 참고 견뎌보겠습니다.',
    politeEquivalentEn: 'I will patiently persevere until the end.',
    registerWarning: 'Use only with friends or in casual SNS posts. Never use with bosses or elders.'
  },
  {
    id: 'yeolbatne',
    wordKo: '열받네 / 킹받네',
    wordRomanized: 'Yeol-bat-ne / King-bat-ne',
    category: 'reaction',
    meaningEn: 'So annoying / Infuriating (often used jokingly when teased by friends)',
    originKo: '‘열받다(화나다)’에 영어 ‘King(왕)’을 붙여 극도로 화가 나지만 코믹하게 쓰이는 표현입니다.',
    originEn: 'Combines "Yeol-bat-da" (getting angry) with "King" to mean "royally annoying" or hilariously frustrating.',
    exampleKo: '아 진짜 친구 프로필 사진 왜 저래 ㅋㅋㅋ 완전 킹받네!',
    exampleRomanized: 'A jinjja chingu peuro-pil sajin wae jeorae kkk wanjeon kingbatne!',
    exampleEn: 'Ah seriously why is my friend’s profile picture like that lol, so royally annoying!',
    politeEquivalentKo: '조금 화가 나네요. / 곤란하네요.',
    politeEquivalentEn: 'That is somewhat upsetting / frustrating.',
    registerWarning: 'Very informal. Great for jokes among close friends, but disrespectful in formal settings.'
  },
  {
    id: 'godsaeng',
    wordKo: '갓생',
    wordRomanized: 'God-saeng',
    category: 'life',
    meaningEn: 'Living a diligent, productive, and exemplary life',
    originKo: '영어 ‘God(신)’과 ‘생(生, 삶)’의 합성어로, 자기개발과 운동, 공부를 성실하게 해내는 삶을 뜻합니다.',
    originEn: 'A blend of "God" and Korean "Saeng" (Life), meaning a highly disciplined, admirable daily routine.',
    exampleKo: '내일부터 아침 6시에 일어나서 운동하고 갓생 살기 도전!',
    exampleRomanized: 'Naeil-buteo achim yuhksi-e ireonaseo undonghago godsaeng salgi dojeon!',
    exampleEn: 'Starting tomorrow, I challenge myself to wake up at 6 AM, work out, and live a God-saeng!',
    politeEquivalentKo: '성실하고 모범적인 삶을 살고자 합니다.',
    politeEquivalentEn: 'I strive to live a diligent and exemplary life.',
    registerWarning: 'Widely accepted even in positive self-improvement goals and casual office chats.'
  },
  {
    id: 'ssapganeung',
    wordKo: '쌉가능',
    wordRomanized: 'Ssap-ga-neung',
    category: 'chat',
    meaningEn: '100% possible / Completely doable / Piece of cake',
    originKo: '강조 어두 ‘쌉-’과 ‘가능’을 붙여 어떤 일이 매우 쉬고 완벽하게 가능하다는 뜻입니다.',
    originEn: 'An emphatic prefix "Ssap-" attached to "Ganeung" (possible), meaning "totally doable without a doubt".',
    exampleKo: '오늘 저녁 7시에 강남역에서 만나는 거 쌉가능!',
    exampleRomanized: 'Oneul jeonyeok chil-si-e gangnam-yeok-eseo mannaneun geo ssapganeung!',
    exampleEn: 'Meeting at Gangnam Station at 7 PM tonight? 100% doable!',
    politeEquivalentKo: '충분히 가능합니다. / 문제없습니다.',
    politeEquivalentEn: 'That is entirely possible / No problem at all.',
    registerWarning: 'Slang intensifier — strictly for friends and informal texting.'
  },
  {
    id: 'eokka',
    wordKo: '억까',
    wordRomanized: 'Eok-kka',
    category: 'reaction',
    meaningEn: 'Unreasonable criticism / Total bad luck (Unfair absurdity)',
    originKo: '‘억지로 까다’의 줄임말. 정당한 이유 없이 억지로 비난하거나, 운이 너무 안 따르는 상황을 말합니다.',
    originEn: 'Short for "unreasonable nitpicking". Used when the universe feels unfairly stacked against you.',
    exampleKo: '비 오는 날 우산 망가진 거 실화냐... 이건 진짜 억까다.',
    exampleRomanized: 'Bi oneun nal usan manggajin geo silhwanya... igeon jinjja eokkada.',
    exampleEn: 'My umbrella broke on a rainy day, is this real... This is total unfair bad luck.',
    politeEquivalentKo: '부당한 비판입니다. / 운이 별로 안 좋았네요.',
    politeEquivalentEn: 'That is unreasonable criticism / It was an unfortunate situation.',
    registerWarning: 'Common in gaming and internet culture; avoid in business or academic discussions.'
  },
  {
    id: 'mangwanbu',
    wordKo: '만관부',
    wordRomanized: 'Man-gwan-bu',
    category: 'chat',
    meaningEn: 'Please show lots of interest and love (Abbreviation)',
    originKo: '‘많은 관심 부탁드립니다’의 앞 글자를 딴 MZ세대 대표 줄임말입니다.',
    originEn: 'An acronym for "Man-eun Gwan-sim Bu-tak-deu-rim-ni-da" (Please show lots of interest).',
    exampleKo: '저희가 새로 런칭한 유튜브 채널 만관부~ ❤️',
    exampleRomanized: 'Jeohwi-ga saero reonching-han yutubeu chaeneol mangwanbu~ ❤️',
    exampleEn: 'Please show lots of love for our newly launched YouTube channel~ ❤️',
    politeEquivalentKo: '많은 관심과 성원 부탁드립니다.',
    politeEquivalentEn: 'We kindly ask for your interest and support.',
    registerWarning: 'Cute and friendly abbreviation often used on Instagram, KakaoTalk, or promo headers.'
  },
  {
    id: 'sohwakhaeng',
    wordKo: '소확행',
    wordRomanized: 'So-hwak-haeng',
    category: 'life',
    meaningEn: 'Small but certain happiness (Simple joys in daily life)',
    originKo: '‘소소하지만 확실한 행복’의 줄임말. 일상 속 작고 평범한 것에서 느끼는 즐거움을 뜻합니다.',
    originEn: 'Acronym for "Small but Certain Happiness", like fresh coffee, a warm bath, or reading a good book.',
    exampleKo: '퇴근하고 집에서 맛있는 디저트 먹는 게 내 소확행이야.',
    exampleRomanized: 'Toegeun-hago jib-eseo masinneun dijeoteu meongneun ge nae sohwakhaeng-iya.',
    exampleEn: 'Eating a delicious dessert at home after work is my small certain happiness.',
    politeEquivalentKo: '소소하지만 확실한 일상의 행복입니다.',
    politeEquivalentEn: 'It is a humble yet certain joy of everyday life.',
    registerWarning: 'Standard enough to be used in books, articles, and conversation with anyone.'
  },
  {
    id: 'naeronambul',
    wordKo: '내로남불',
    wordRomanized: 'Nae-ro-nam-bul',
    category: 'reaction',
    meaningEn: 'Double standard / Hypocrisy (Romance if I do it, adultery if others do it)',
    originKo: '‘내가 하면 로맨스, 남이 하면 불륜’의 네 글자 줄임말로, 남에게는 엄격하고 자신에게는 관대한 이중 잣대를 비판할 때 씁니다.',
    originEn: 'An idiom meaning "If I do it, it is romance; if someone else does it, it is an affair." Used to call out hypocrisy.',
    exampleKo: '자기는 약속 맨날 늦으면서 나한테 5분 늦었다고 화내는 건 내로남불이지!',
    exampleRomanized: 'Jagi-neun yaksok maennal neujeumyeonseo nahante obun neujeotdago hwanaeneun geon naeronamburiji!',
    exampleEn: 'Being angry at me for being 5 minutes late when you are always late is a total double standard!',
    politeEquivalentKo: '이중 잣대입니다. / 일관성이 없는 태도입니다.',
    politeEquivalentEn: 'That is a double standard / inconsistent attitude.',
    registerWarning: 'Can be confrontational; widely understood in news and debates.'
  },
  {
    id: 'hyeonta',
    wordKo: '현타',
    wordRomanized: 'Hyeon-ta',
    category: 'reaction',
    meaningEn: 'Reality check / Sudden disillusionment',
    originKo: '‘현실 자각 타임(Time)’의 줄임말. 헛된 꿈이나 충동구매 후 현실을 깨닫고 밀려오는 허탈함을 말합니다.',
    originEn: 'Short for "Reality Awareness Time". Describes the sudden sigh when facing practical reality.',
    exampleKo: '주말 내내 게임만 하다가 월요일 아침 되니까 현타 오네...',
    exampleRomanized: 'Jumal naenae geim-man hadaga woryoil achim doenikka hyeonta one...',
    exampleEn: 'After gaming all weekend, Monday morning arrived and I suddenly got a reality check...',
    politeEquivalentKo: '현실을 실감하게 되었습니다. / 허탈감을 느낍니다.',
    politeEquivalentEn: 'I suddenly realized reality / I feel disillusioned.',
    registerWarning: 'Common among young adults and coworkers talking about relatable daily struggles.'
  }
];

interface QuizQuestion {
  questionKo: string;
  questionEn: string;
  options: string[];
  correctIndex: number;
  explanationKo: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    questionKo: '친구에게 "오늘 저녁 약속 쌉가능!"이라고 보냈을 때 무슨 뜻인가요?',
    questionEn: 'What does "Ssap-ga-neung!" mean when replying to a friend about dinner plans?',
    options: [
      '100% 확실히 가능하다 (Totally possible!)',
      '아마 불가능할 것 같다 (Probably impossible)',
      '약속 장소를 바꾸자 (Let us change the location)',
      '나중에 다시 연락할게 (I will call you later)'
    ],
    correctIndex: 0,
    explanationKo: '‘쌉가능’은 강한 긍정과 확신을 표현하는 유행어로, 어떤 일이 100% 가능하다는 의미입니다!'
  },
  {
    questionKo: '시험 기간에 "우리 시험 끝날 때까지 존버하자"에서 \'존버\'의 뜻은 무엇인가요?',
    questionEn: 'What does "Jon-beo" mean in "Let’s Jon-beo until exams are over"?',
    options: [
      '빨리 포기하다 (Give up quickly)',
      '끝까지 끈기 있게 버티다 (Hold out patiently until the end)',
      '친구와 함께 여행 가다 (Go on a trip with friends)',
      '조용히 집에 돌아가다 (Go home quietly)'
    ],
    correctIndex: 1,
    explanationKo: '‘존버’는 힘든 상황이나 주식/시험 등에서 포기하지 않고 끝까지 참고 버틴다는 뜻입니다.'
  },
  {
    questionKo: '다음 중 \'갓생(God-saeng)\'을 살고 있는 사람의 행동으로 가장 알맞은 것은?',
    questionEn: 'Which behavior best represents living a "God-saeng"?',
    options: [
      '하루 종일 침대에 누워 스마트폰만 하기 (Lying in bed all day)',
      '아침 6시에 일어나 운동하고 성실하게 자기개발 하기 (Waking up at 6 AM, working out, and studying hard)',
      '약속 시간에 맨날 30분씩 늦기 (Always arriving 30 minutes late)',
      '해야 할 일을 내일로 미루기 (Procrastinating everything)'
    ],
    correctIndex: 1,
    explanationKo: '‘갓생’은 신(God)처럼 부지런하고 모범적이며 생산적으로 하루하루를 사는 삶을 뜻합니다!'
  },
  {
    questionKo: '내가 하면 괜찮고 남이 하면 비판하는 \'이중 잣대\'를 뜻하는 유행어는?',
    questionEn: 'Which slang term means a double standard ("Romance if I do it, affair if others do it")?',
    options: [
      '만관부',
      '소확행',
      '내로남불',
      '현타'
    ],
    correctIndex: 2,
    explanationKo: '‘내로남불(내가 하면 로맨스 남이 하면 불륜)’은 남에게는 엄격하고 나에게는 관대한 이중 잣대를 의미합니다.'
  }
];

export default function KSlangMenu({ credits = 0, onSpendCredits, onOpenCreditModal }: KSlangMenuProps = {}) {
  const [activeTab, setActiveTab] = useState<'slang' | 'quiz'>('slang');
  const [filter, setFilter] = useState<'all' | 'reaction' | 'life' | 'chat'>('all');
  const [selectedSlangId, setSelectedSlangId] = useState<string>('jonbeo');

  // AI Custom Slang Deep Search (1 CR)
  const [customSlangInput, setCustomSlangInput] = useState<string>('');
  const [isSearchingAiSlang, setIsSearchingAiSlang] = useState<boolean>(false);
  const [aiSlangResult, setAiSlangResult] = useState<any | null>(null);
  const [aiSlangError, setAiSlangError] = useState<string | null>(null);

  // Quiz state
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const filteredItems = filter === 'all'
    ? SLANG_ITEMS
    : SLANG_ITEMS.filter(item => item.category === filter);

  const currentSlang = SLANG_ITEMS.find(s => s.id === selectedSlangId) || SLANG_ITEMS[0];

  const handleSpeakText = (text: string, slow = false) => {
    speakKoreanText(text, { rate: slow ? 0.75 : 1.0 });
  };

  const handleAiSearchSlang = async (overrideTerm?: string) => {
    const term = (overrideTerm || customSlangInput).trim();
    if (!term) return;

    if (overrideTerm) {
      setCustomSlangInput(overrideTerm);
    }

    if (onSpendCredits) {
      const success = onSpendCredits(1, `MZ 신조어 AI 어원 & 뉘앙스 분석 (${term}) (-1 CR)`);
      if (!success) {
        if (onOpenCreditModal) onOpenCreditModal();
        setAiSlangError('크레딧이 부족합니다. (1 크레딧 필요)');
        return;
      }
    }

    setIsSearchingAiSlang(true);
    setAiSlangError(null);
    setAiSlangResult(null);

    try {
      const res = await fetch('/api/explain-slang', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slang: term })
      });
      const data = await res.json();
      setAiSlangResult(data);
    } catch (err: any) {
      console.warn("AI slang error:", err);
      setAiSlangError('신조어 분석을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsSearchingAiSlang(false);
    }
  };

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (idx === QUIZ_QUESTIONS[currentQuizIdx].correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIdx(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Billboard Banner */}
      <div className="bg-[#1A1A1A] border border-editorial-border rounded-sm p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-editorial-accent/15 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="space-y-3 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="bg-editorial-accent/20 border border-editorial-accent/40 text-editorial-accent-light px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider">
              🔥 MZ Generation K-Slang & Idioms
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('slang')}
                className={`px-4 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'slang'
                    ? 'bg-white text-editorial-text shadow-sm'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                📚 Slang Dictionary (신조어 사전)
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-4 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'quiz'
                    ? 'bg-white text-editorial-text shadow-sm'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                🧩 MZ Slang Quiz (신조어 퀴즈)
              </button>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
            요즘 젊은이들이 쓰는 진짜 한국어 유행어 (존버, 킹받네, 갓생...)
          </h2>
          <p className="text-sm text-gray-300 max-w-3xl leading-relaxed">
            Understand trending Korean slangs used in KakaoTalk chats, K-dramas, and YouTube comments. Learn when it is fun to use with friends—and when to switch to polite standard Korean!
          </p>
        </div>
      </div>

      {/* AI Slang Deep Analyzer Banner (⚡ 1 CR) */}
      <div className="bg-white border-2 border-editorial-accent/30 rounded-sm p-5 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-editorial-border pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-sm bg-editorial-accent-light flex items-center justify-center text-editorial-accent">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-serif text-editorial-text flex items-center space-x-1.5">
                <span>Gemini 3.7 MZ 신조어·줄임말 AI 실시간 어원 분석기</span>
              </h4>
              <p className="text-[11px] text-editorial-muted">
                궁금한 신조어나 밈(예: 억까, 억빠, 폼미쳤다, 알잘딱깔센, 너T야)을 검색하면 AI가 어원과 존댓말 대안을 분석합니다.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
              <Zap className="w-3 h-3 mr-0.5 fill-amber-500 text-amber-500" />
              1 CR / 회
            </span>
            <span className="text-[11px] font-mono text-editorial-muted font-bold">
              (보유: {credits} CR)
            </span>
          </div>
        </div>

        {/* Quick Slang Preset Chips */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-editorial-muted uppercase tracking-wider">추천 신조어 검색 (Click to analyze):</span>
          <div className="flex flex-wrap gap-1.5">
            {[
              "억까", "억빠", "알잘딱깔센", "폼미쳤다", "너T야?", "디토(Ditto)", "중꺾마", "갓생"
            ].map((term, tIdx) => (
              <button
                key={tIdx}
                onClick={() => handleAiSearchSlang(term)}
                disabled={isSearchingAiSlang}
                className="px-2.5 py-1 bg-editorial-bg hover:bg-editorial-accent hover:text-white border border-editorial-border text-editorial-text rounded-sm text-[11px] font-medium transition-colors cursor-pointer"
              >
                🔥 #{term}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="궁금한 신조어나 줄임말을 입력하세요 (예: 억까, 갓생, 캘박)"
            value={customSlangInput}
            onChange={(e) => setCustomSlangInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAiSearchSlang();
              }
            }}
            className="flex-1 px-3 py-2 text-xs bg-editorial-bg border border-editorial-border rounded-sm focus:outline-none focus:border-editorial-accent font-serif"
          />
          <button
            onClick={() => handleAiSearchSlang()}
            disabled={isSearchingAiSlang || !customSlangInput.trim()}
            className="px-4 py-2 bg-editorial-text hover:bg-editorial-accent text-white text-xs font-bold rounded-sm transition-colors flex items-center space-x-1.5 disabled:opacity-50 cursor-pointer shrink-0"
          >
            {isSearchingAiSlang ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>AI 분석 중...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI 어원 분석 (1 CR)</span>
              </>
            )}
          </button>
        </div>

        {aiSlangError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-sm text-xs text-rose-800 flex items-center justify-between">
            <span>{aiSlangError}</span>
            {onOpenCreditModal && (
              <button
                onClick={onOpenCreditModal}
                className="underline font-bold text-rose-900 ml-2 cursor-pointer"
              >
                크레딧 충전하기
              </button>
            )}
          </div>
        )}

        {/* AI Slang Result Card */}
        {aiSlangResult && (
          <div className="bg-editorial-bg border border-editorial-border p-4 rounded-sm space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-editorial-border pb-2">
              <div>
                <span className="text-[10px] font-bold text-editorial-accent uppercase tracking-wider">AI Slang Breakdown</span>
                <h4 className="text-xl font-bold font-serif text-editorial-text">
                  {aiSlangResult.slang || customSlangInput} <span className="text-xs text-editorial-accent font-sans">({aiSlangResult.romanized})</span>
                </h4>
              </div>
              <button
                onClick={() => handleSpeakText(aiSlangResult.slang || customSlangInput)}
                className="px-2.5 py-1 bg-editorial-accent-light hover:bg-editorial-accent hover:text-white text-editorial-text text-xs font-bold rounded-sm flex items-center space-x-1 transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>발음</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-sm border border-editorial-border space-y-1">
                <span className="text-[10px] font-bold text-editorial-accent uppercase">의미 & 어원</span>
                <p className="text-xs font-bold font-serif text-editorial-text">{aiSlangResult.origin}</p>
                <p className="text-xs text-editorial-muted">{aiSlangResult.meaning}</p>
              </div>

              <div className="bg-white p-3 rounded-sm border border-editorial-border space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 uppercase">예문 & 대화</span>
                <p className="text-xs font-serif font-bold text-emerald-950">"{aiSlangResult.exampleDialog?.korean || aiSlangResult.example}"</p>
                <p className="text-xs text-emerald-800 italic">{aiSlangResult.exampleDialog?.english || aiSlangResult.exampleTranslation}</p>
              </div>
            </div>

            {(aiSlangResult.politeAlternative || aiSlangResult.warning) && (
              <div className="bg-amber-50 border border-amber-300 p-2.5 rounded-sm text-xs text-amber-900 flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">예절 주의: </span>
                  {aiSlangResult.warning || "친한 친구나 SNS에서만 사용하고 격식 있는 자리에서는 존댓말을 사용하세요."}
                  {aiSlangResult.politeAlternative && (
                    <div className="mt-1 font-bold text-emerald-900">
                      → 정중한 표현: {aiSlangResult.politeAlternative}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {activeTab === 'slang' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT LIST: Category Filters & Slang Words (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-white border border-editorial-border p-2 rounded-sm">
              {[
                { id: 'all', labelKo: '전체 보기', labelEn: 'All Slang' },
                { id: 'life', labelKo: '생활/태도', labelEn: 'Life (존버, 갓생)' },
                { id: 'reaction', labelKo: '감정/리액션', labelEn: 'Reactions (열받네)' },
                { id: 'chat', labelKo: '대화/채팅', labelEn: 'Chat (쌉가능, 만관부)' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id as any)}
                  className={`px-2.5 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                    filter === cat.id
                      ? 'bg-editorial-text text-white'
                      : 'bg-editorial-bg text-editorial-text hover:bg-editorial-accent-light/40'
                  }`}
                >
                  <span>{cat.labelKo}</span>
                </button>
              ))}
            </div>

            {/* Slang Cards List */}
            <div className="bg-white border border-editorial-border rounded-sm p-2 space-y-1.5 max-h-[580px] overflow-y-auto">
              {filteredItems.map(item => {
                const isSelected = item.id === selectedSlangId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSlangId(item.id)}
                    className={`w-full text-left p-3.5 rounded-sm transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-editorial-bg border-editorial-text shadow-sm'
                        : 'bg-white border-transparent hover:bg-editorial-bg/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-serif font-bold text-editorial-text">
                        {item.wordKo}
                      </span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm bg-editorial-accent/10 text-editorial-accent">
                        {item.wordRomanized}
                      </span>
                    </div>
                    <p className="text-xs text-editorial-muted font-medium mt-1 line-clamp-1">
                      {item.meaningEn}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT DETAIL VIEW: Deep Dive into Selected Slang (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-editorial-border rounded-sm p-6 sm:p-8 space-y-6">
            {/* Header & Pronunciation */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-editorial-border pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-editorial-accent font-serif">
                  K-Slang Deep Dive • 신조어 탐구
                </span>
                <div className="flex items-center space-x-3 mt-1">
                  <h3 className="text-3xl sm:text-4xl font-serif font-bold text-editorial-text">
                    {currentSlang.wordKo}
                  </h3>
                  <span className="text-base font-bold text-editorial-accent">
                    ({currentSlang.wordRomanized})
                  </span>
                </div>
                <p className="text-sm font-bold text-editorial-text mt-1">
                  {currentSlang.meaningEn}
                </p>
              </div>

              {/* Audio Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSpeakText(currentSlang.wordKo)}
                  className="px-3 py-2 bg-editorial-text hover:bg-editorial-accent text-white text-xs font-bold rounded-sm flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
                  title="Hear natural pronunciation"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>발음 듣기 (Listen)</span>
                </button>
              </div>
            </div>

            {/* Origin & Etymology Box */}
            <div className="bg-editorial-bg border border-editorial-border rounded-sm p-4 space-y-2">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-editorial-text uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-editorial-accent" />
                <span>Etymology & Nuance (어원과 의미)</span>
              </div>
              <p className="text-sm font-bold font-serif text-editorial-text">
                {currentSlang.originKo}
              </p>
              <p className="text-xs text-editorial-muted leading-relaxed">
                {currentSlang.originEn}
              </p>
            </div>

            {/* Real KakaoTalk / SNS Example Dialog */}
            <div className="border border-editorial-border rounded-sm p-5 space-y-3 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-editorial-text uppercase tracking-wider flex items-center space-x-1.5">
                  <MessageSquare className="w-4 h-4 text-editorial-accent" />
                  <span>Real-World Chat Example (실생활 대화 예문)</span>
                </span>
                <button
                  onClick={() => handleSpeakText(currentSlang.exampleKo)}
                  className="px-2.5 py-1 bg-editorial-accent-light/50 hover:bg-editorial-accent hover:text-white text-editorial-text text-xs font-bold rounded-sm flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>예문 듣기</span>
                </button>
              </div>

              <div className="bg-editorial-bg p-4 rounded-sm border border-editorial-border space-y-1">
                <p className="text-base sm:text-lg font-serif font-bold text-editorial-text">
                  “{currentSlang.exampleKo}”
                </p>
                <p className="text-xs font-bold text-editorial-accent">
                  {currentSlang.exampleRomanized}
                </p>
                <p className="text-xs text-editorial-muted italic">
                  “{currentSlang.exampleEn}”
                </p>
              </div>
            </div>

            {/* Register & Polite Equivalent Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Polite Standard Equivalent */}
              <div className="bg-emerald-50 border border-emerald-300 rounded-sm p-4 space-y-1.5">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Polite Standard Equivalent (존댓말 표현)</span>
                </div>
                <p className="text-sm font-bold font-serif text-emerald-950">
                  {currentSlang.politeEquivalentKo}
                </p>
                <p className="text-xs text-emerald-800 italic">
                  {currentSlang.politeEquivalentEn}
                </p>
              </div>

              {/* Cultural Register Warning */}
              <div className="bg-amber-50 border border-amber-300 rounded-sm p-4 space-y-1.5">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Register Note (사용 시 주의)</span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                  {currentSlang.registerWarning}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* QUIZ MODE */
        <div className="bg-white border border-editorial-border rounded-sm p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
          {!quizFinished ? (
            <>
              <div className="flex items-center justify-between border-b border-editorial-border pb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-editorial-accent font-serif">
                  MZ Slang Challenge • Question {currentQuizIdx + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-xs font-bold text-editorial-text">
                  Score: {score} / {QUIZ_QUESTIONS.length}
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-editorial-text leading-relaxed">
                  {QUIZ_QUESTIONS[currentQuizIdx].questionKo}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-editorial-muted italic">
                  {QUIZ_QUESTIONS[currentQuizIdx].questionEn}
                </p>

                <div className="space-y-2 pt-2">
                  {QUIZ_QUESTIONS[currentQuizIdx].options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === QUIZ_QUESTIONS[currentQuizIdx].correctIndex;
                    let btnStyle = 'bg-white border-editorial-border text-editorial-text hover:bg-editorial-bg';
                    if (selectedOption !== null) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                      } else {
                        btnStyle = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={selectedOption !== null}
                        className={`w-full text-left p-4 rounded-sm border transition-all text-sm font-bold cursor-pointer flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {selectedOption !== null && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <div className="bg-editorial-bg border border-editorial-border p-4 rounded-sm space-y-2 mt-4 animate-fadeIn">
                    <p className="text-xs font-bold text-editorial-accent uppercase tracking-wider">
                      💡 Explanation
                    </p>
                    <p className="text-sm font-bold font-serif text-editorial-text">
                      {QUIZ_QUESTIONS[currentQuizIdx].explanationKo}
                    </p>
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleNextQuestion}
                        className="px-5 py-2 bg-editorial-text hover:bg-editorial-accent text-white text-xs font-bold rounded-sm flex items-center space-x-1.5 transition-colors cursor-pointer"
                      >
                        <span>{currentQuizIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-editorial-accent-light/50 text-editorial-accent flex items-center justify-center mx-auto text-3xl font-bold">
                🎉
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-text">
                  K-Slang Challenge Complete!
                </h3>
                <p className="text-base font-bold text-editorial-accent">
                  You scored {score} out of {QUIZ_QUESTIONS.length}!
                </p>
                <p className="text-sm text-editorial-muted max-w-md mx-auto">
                  {score === QUIZ_QUESTIONS.length
                    ? '완벽해요! 이제 한국 젊은이들과 카카오톡으로 대화할 때 완벽하게 통할 수 있습니다!'
                    : '훌륭한 성적입니다! 신조어 사전을 다시 보며 복습해보세요.'}
                </p>
              </div>
              <button
                onClick={resetQuiz}
                className="px-6 py-2.5 bg-editorial-text hover:bg-editorial-accent text-white text-xs font-bold rounded-sm flex items-center space-x-2 mx-auto cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry Quiz (다시 도전하기)</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
