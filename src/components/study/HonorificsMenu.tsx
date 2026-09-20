import React, { useState } from 'react';
import { speakKoreanText } from '../../utils/tts';
import { 
  BookOpen, Volume2, CheckCircle2, AlertCircle, Sparkles, 
  RefreshCw, Award, ArrowRight, User, Users, MessageSquare, 
  HelpCircle, HeartHandshake 
} from 'lucide-react';

interface HonorificLevel {
  id: 'formal' | 'polite' | 'casual';
  nameKo: string;
  nameEn: string;
  endingKo: string;
  formalityBadge: string;
  whenToUse: string;
  exampleSentenceKo: string;
  exampleSentenceRom: string;
  exampleSentenceEn: string;
  description: string;
}

interface HonorificWordPair {
  standardKo: string;
  standardRom: string;
  honorificKo: string;
  honorificRom: string;
  english: string;
  category: 'verb' | 'noun' | 'particle';
  exampleKo: string;
  exampleEn: string;
}

interface SituationConverterItem {
  id: number;
  titleEn: string;
  situation: string;
  formal: { ko: string; rom: string; note: string };
  polite: { ko: string; rom: string; note: string };
  casual: { ko: string; rom: string; note: string };
}

interface QuizQuestion {
  id: number;
  questionKo: string;
  questionEn: string;
  scenario: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function HonorificsMenu() {
  const [activeSection, setActiveSection] = useState<'levels' | 'vocabulary' | 'converter' | 'quiz'>('levels');
  const [selectedConverterId, setSelectedConverterId] = useState<number>(1);
  const [activeFormalityTab, setActiveFormalityTab] = useState<'formal' | 'polite' | 'casual'>('polite');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'verb' | 'noun' | 'particle'>('all');

  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Browser Text-to-Speech audio helper
  const handleSpeakText = (text: string) => {
    speakKoreanText(text);
  };

  const speechLevels: HonorificLevel[] = [
    {
      id: 'formal',
      nameKo: '합쇼체 (Formal Honorific)',
      nameEn: 'Highest Politeness • -ㅂ니다 / -습니다',
      endingKo: '-ㅂ니다 / -습니다 / -십니까?',
      formalityBadge: '👑 Formal & Respectful (격식체)',
      whenToUse: 'Used in business presentations, news broadcasts, public speaking, military, customer service, or speaking to elderly strangers or superiors.',
      exampleSentenceKo: '만나서 반갑습니다. 저는 한국어 학생입니다.',
      exampleSentenceRom: 'Mannaseo bangapseumnida. Jeoneun hangugeo haksaeng-imnida.',
      exampleSentenceEn: 'Nice to meet you. I am a Korean language student.',
      description: 'The most authoritative and polite ending. Add "-ㅂ니다" after vowel stems (가다 → 갑니다) and "-습니다" after consonant stems (먹다 → 먹습니다). Questions end with "-습니까? / -십니까?".'
    },
    {
      id: 'polite',
      nameKo: '해요체 (Polite Everyday)',
      nameEn: 'Standard Polite • -아요 / -어요',
      endingKo: '-아요 / -어요 / -여요(해요)',
      formalityBadge: '🌟 Standard Polite conversational (비격식 존대)',
      whenToUse: 'The standard politeness level for 80% of daily life in Korea! Used with acquaintances, colleagues, café baristas, taxi drivers, teachers, and everyday conversations.',
      exampleSentenceKo: '오늘 날씨가 정말 좋아요. 커피 한 잔 주세요.',
      exampleSentenceRom: 'Oneul nalssi-ga jeongmal joayo. Keopi han jan juseyo.',
      exampleSentenceEn: 'The weather is really nice today. Please give me a cup of coffee.',
      description: 'Friendly yet respectful. Formed by adding "-아요" if the last vowel is ㅏ/ㅗ (가다 → 가요), "-어요" for other vowels (먹다 → 먹어요), and "하다 → 해요".'
    },
    {
      id: 'casual',
      nameKo: '해체 / 반말 (Casual Informal)',
      nameEn: 'Intimate / Banmal • -아 / -어',
      endingKo: '-아 / -어 / -지 / -야',
      formalityBadge: '💬 Informal Intimate (반말)',
      whenToUse: 'ONLY used with close friends of the same age, siblings, younger people, or when an adult explicitly gives permission ("말 편하게 해"). Never use with strangers or superiors!',
      exampleSentenceKo: '우리 내일 몇 시에 만나? 밥 먹었어?',
      exampleSentenceRom: 'Uri naeil myeot si-e manna? Bap meogeosseo?',
      exampleSentenceEn: 'What time are we meeting tomorrow? Did you eat?',
      description: 'Formed simply by dropping the "요" from the 해요체 polite form (가요 → 가, 먹어요 → 먹어, 해요 → 해). Shows intimacy and closeness.'
    }
  ];

  const honorificWords: HonorificWordPair[] = [
    {
      standardKo: '먹다 / 마시다',
      standardRom: 'meokda / masida',
      honorificKo: '드시다 / 잡수시다',
      honorificRom: 'deusida / japsusida',
      english: 'To eat / to drink',
      category: 'verb',
      exampleKo: '할아버지께서 저녁을 드십니다.',
      exampleEn: 'Grandfather is eating dinner (honorific).'
    },
    {
      standardKo: '자다',
      standardRom: 'jada',
      honorificKo: '주무시다',
      honorificRom: 'jumusida',
      english: 'To sleep',
      category: 'verb',
      exampleKo: '안녕히 주무셨어요?',
      exampleEn: 'Did you sleep peacefully? (Good morning to elder)'
    },
    {
      standardKo: '있다',
      standardRom: 'itda',
      honorificKo: '계시다 (사람) / 있으시다 (소유)',
      honorificRom: 'gyesida / isseusida',
      english: 'To be / to stay / to have',
      category: 'verb',
      exampleKo: '선생님께서는 지금 학교에 계십니다.',
      exampleEn: 'The teacher is at school right now.'
    },
    {
      standardKo: '말하다',
      standardRom: 'malhada',
      honorificKo: '말씀하시다',
      honorificRom: 'malsseum-hasida',
      english: 'To speak / say',
      category: 'verb',
      exampleKo: '부모님께서 좋은 말씀을 해주셨어요.',
      exampleEn: 'My parents gave me words of advice.'
    },
    {
      standardKo: '죽다',
      standardRom: 'jukda',
      honorificKo: '돌아가시다',
      honorificRom: 'doragasida',
      english: 'To pass away (lit: to return)',
      category: 'verb',
      exampleKo: '작년에 할머니께서 돌아가셨습니다.',
      exampleEn: 'My grandmother passed away last year.'
    },
    {
      standardKo: '이름',
      standardRom: 'ireum',
      honorificKo: '성함',
      honorificRom: 'seongham',
      english: 'Name',
      category: 'noun',
      exampleKo: '성함이 어떻게 되세요?',
      exampleEn: 'What is your name? (Polite inquiry)'
    },
    {
      standardKo: '나이',
      standardRom: 'nai',
      honorificKo: '연세',
      honorificRom: 'yeonse',
      english: 'Age',
      category: 'noun',
      exampleKo: '할머니의 연세가 어떻게 되세요?',
      exampleEn: 'How old is your grandmother?'
    },
    {
      standardKo: '집',
      standardRom: 'jip',
      honorificKo: '댁',
      honorificRom: 'daek',
      english: 'Home / House',
      category: 'noun',
      exampleKo: '오늘 선생님 댁에 방문했습니다.',
      exampleEn: 'I visited my teacher’s home today.'
    },
    {
      standardKo: '생일',
      standardRom: 'saeng-il',
      honorificKo: '생신',
      honorificRom: 'saengsin',
      english: 'Birthday',
      category: 'noun',
      exampleKo: '아버지 생신을 축하드립니다.',
      exampleEn: 'Happy birthday to my father (respectful).'
    },
    {
      standardKo: '사람',
      standardRom: 'saram',
      honorificKo: '분',
      honorificRom: 'bun',
      english: 'Person',
      category: 'noun',
      exampleKo: '저분이 우리 대학교 교수님이세요.',
      exampleEn: 'That person is our university professor.'
    },
    {
      standardKo: '이 / 가 (주격 조사)',
      standardRom: 'i / ga',
      honorificKo: '께서',
      honorificRom: 'kkeseo',
      english: 'Subject particle (Honors the subject)',
      category: 'particle',
      exampleKo: '사장님께서 회의를 시작하셨습니다.',
      exampleEn: 'The CEO started the meeting.'
    },
    {
      standardKo: '에게 / 한테',
      standardRom: 'ege / hante',
      honorificKo: '께',
      honorificRom: 'kke',
      english: 'To (recipient particle)',
      category: 'particle',
      exampleKo: '어머니께 선물을 드렸어요.',
      exampleEn: 'I gave a gift to my mother.'
    }
  ];

  const situationConverters: SituationConverterItem[] = [
    {
      id: 1,
      titleEn: 'Asking "Have you eaten?" (Greeting meal check)',
      situation: 'Checking if someone has eaten a meal—a very common polite greeting in Korean culture.',
      formal: {
        ko: '식사하셨습니까? / 저녁 드셨습니까?',
        rom: 'Siksa-hasyeot-seumnikka? / Jeonyeok deusyeot-seumnikka?',
        note: 'Use with senior colleagues, clients, or elderly strangers.'
      },
      polite: {
        ko: '식사하셨어요? / 밥 먹었어요?',
        rom: 'Siksa-hasyeosseoyo? / Bap meogeosseoyo?',
        note: 'Use with daily acquaintances, colleagues, or friendly seniors.'
      },
      casual: {
        ko: '밥 먹었어? / 뭐 먹었어?',
        rom: 'Bap meogeosseo? / Mwo meogeosseo?',
        note: 'Use with close friends, younger siblings, or classmates.'
      }
    },
    {
      id: 2,
      titleEn: 'Saying "Thank you so much"',
      situation: 'Expressing gratitude after receiving help or service.',
      formal: {
        ko: '대단히 감사합니다. / 고맙습니다.',
        rom: 'Daedanhi gamsahamnida. / Gomapseumnida.',
        note: 'The most standard formal appreciation in professional or public settings.'
      },
      polite: {
        ko: '정말 감사해요. / 고마워요.',
        rom: 'Jeongmal gamsahaeyo. / Gomawoyo.',
        note: 'Warm polite gratitude used with friends, peers, or helpers.'
      },
      casual: {
        ko: '진짜 고마워! / 땡큐!',
        rom: 'Jinjja gomawo! / Ttaengkkyu!',
        note: 'Casual gratitude between close friends.'
      }
    },
    {
      id: 3,
      titleEn: 'Asking "What are you doing right now?"',
      situation: 'Checking on what someone is currently busy with.',
      formal: {
        ko: '지금 무엇을 하십니까? / 무슨 일 하고 계십니까?',
        rom: 'Jigeum mueoseul hasimnikka? / Museun il hago gyesimnikka?',
        note: 'Formal inquiry when addressing an elder or superior.'
      },
      polite: {
        ko: '지금 뭐 하세요? / 뭐 하고 계세요?',
        rom: 'Jigeum mwo haseyo? / Mwo hago gyeseyo?',
        note: 'Polite everyday question for teachers, coworkers, or acquaintances.'
      },
      casual: {
        ko: '지금 뭐 해? / 뭐 하고 있어?',
        rom: 'Jigeum mwo hae? / Mwo hago isseo?',
        note: 'Casual text message or spoken question between friends.'
      }
    },
    {
      id: 4,
      titleEn: 'Saying "I am sorry / Excuse me"',
      situation: 'Apologizing for a mistake or requesting understanding.',
      formal: {
        ko: '대단히 죄송합니다. / 사과드립니다.',
        rom: 'Daedanhi joesonghamnida. / Sagwa-deurimnida.',
        note: 'Formal business apology or deep regret to a superior.'
      },
      polite: {
        ko: '죄송해요. / 미안해요.',
        rom: 'Joesonghaeyo. / Mianhaeyo.',
        note: 'Polite everyday apology for bumping someone or minor delays.'
      },
      casual: {
        ko: '미안해! / 미안!',
        rom: 'Mianhae! / Mian!',
        note: 'Casual apology between close friends.'
      }
    },
    {
      id: 5,
      titleEn: 'Saying "See you tomorrow"',
      situation: 'Saying goodbye at the end of the day.',
      formal: {
        ko: '내일 뵙겠습니다. / 안녕히 계십시오.',
        rom: 'Naeil boepgesseumnida. / Annyeonghi gyesipsio.',
        note: 'Formal respectful farewell to professors or seniors.'
      },
      polite: {
        ko: '내일 봬요! / 내일 만나요!',
        rom: 'Naeil bwaeyo! / Naeil mannayo!',
        note: 'Friendly polite goodbye at work or study groups.'
      },
      casual: {
        ko: '내일 봐! / 내일 보자!',
        rom: 'Naeil bwa! / Naeil boja!',
        note: 'Casual goodbye with friends.'
      }
    }
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      questionKo: '할머니께 나이를 정중하게 여쭤볼 때 올바른 표현은 무엇일까요?',
      questionEn: 'How should you politely ask an elderly grandmother about her age?',
      scenario: 'You are meeting your Korean friend’s grandmother for the first time.',
      options: [
        '할머니, 나이가 몇 살이에요?',
        '할머니, 연세가 어떻게 되세요?',
        '할머니, 몇 살이야?',
        '할머니, 나이가 어떻게 됩니까요?'
      ],
      correctIndex: 1,
      explanation: 'For elders, replace standard "나이" (age) with honorific "연세", and ask "어떻게 되세요?" (How does it become?) rather than "몇 살이에요?".'
    },
    {
      id: 2,
      questionKo: '회사에서 사장님이 방금 사무실에 도착하셨습니다. 올바른 주격 조사는?',
      questionEn: 'The CEO just arrived at the office. Which honorific subject particle should you use?',
      scenario: 'Honoring the subject of the sentence (사장님).',
      options: [
        '사장님이 오셨습니다.',
        '사장님가 오셨습니다.',
        '사장님께서 오셨습니다.',
        '사장님에게 오셨습니다.'
      ],
      correctIndex: 2,
      explanation: 'The honorific subject particle "께서" replaces "이/가" when the person performing the action is a respected elder or superior.'
    },
    {
      id: 3,
      questionKo: '부모님께 식사를 권할 때 가장 정중한 존댓말 표현은 무엇인가요?',
      questionEn: 'Which sentence is the correct honorific way to say "Please eat delicious dinner" to your parents?',
      scenario: 'Dinner table etiquette with parents.',
      options: [
        '엄마 아빠, 밥 맛있게 먹어!',
        '부모님, 저녁 맛있게 먹어요.',
        '부모님, 저녁 맛있게 드세요.',
        '부모님, 저녁 맛있게 먹으세요.'
      ],
      correctIndex: 2,
      explanation: 'The verb "먹다" (to eat) changes to its special honorific noun/verb form "드시다". Adding polite imperative "-세요" gives "드세요".'
    },
    {
      id: 4,
      questionKo: '다음 중 "합쇼체 (-ㅂ니다 / -습니다)"를 사용해야 하는 가장 적절한 상황은?',
      questionEn: 'In which situation is it most appropriate to use Formal Honorific "-ㅂ니다 / -습니다" ending?',
      scenario: 'Choosing the right speech level.',
      options: [
        '고등학교 친구와 카카오톡으로 수다 떨 때',
        '회사 공식 발표회나 뉴스 브리핑에서 발표할 때',
        '동생에게 방 청소하라고 부탁할 때',
        '친한 동료와 카페에서 점심 메뉴 고를 때'
      ],
      correctIndex: 1,
      explanation: 'Formal honorific "합쇼체" is required in public presentations, news broadcasts, business meetings, and formal ceremonies.'
    },
    {
      id: 5,
      questionKo: '선생님이 집에 계신지 물어보는 문장으로 올바른 것은?',
      questionEn: 'How do you ask if your teacher is at home using honorific vocabulary?',
      scenario: 'Checking if teacher is at home.',
      options: [
        '선생님, 지금 집에 있어요?',
        '선생님, 지금 댁에 계세요?',
        '선생님, 지금 댁에 있으세요?',
        '선생님, 지금 집에 계서요?'
      ],
      correctIndex: 1,
      explanation: '"집" (home) changes to honorific "댁", and "있다" (to be/stay for a person) changes to "계시다" → "댁에 계세요?".'
    }
  ];

  const handleQuizSelect = (optionIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex);

    const currentQ = quizQuestions[currentQuizIndex];
    if (optionIndex === currentQ.correctIndex) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  const currentConverter = situationConverters.find((item) => item.id === selectedConverterId) || situationConverters[0];
  const filteredWords = selectedCategory === 'all' 
    ? honorificWords 
    : honorificWords.filter((w) => w.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="bg-[#1A1A1A] border border-editorial-border rounded-sm p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-editorial-accent/15 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="space-y-3 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="bg-editorial-accent text-white px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                ESSENTIAL ETIQUETTE
              </span>
              <span className="bg-white/10 text-editorial-accent-light border border-white/20 px-2.5 py-0.5 rounded-sm text-xs font-bold flex items-center space-x-1.5">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>존댓말과 한국어 높임법 (Honorifics & Politeness)</span>
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
            Mastering Korean Honorifics: The Soul of Respect (존댓말)
          </h2>
          <p className="text-sm text-gray-300 max-w-3xl leading-relaxed">
            Korean polishes every interaction with social respect. Learn when to use formal speech (<strong>-습니다</strong>), polite everyday speech (<strong>-어요</strong>), and casual banter (<strong>-어</strong>), along with special honorific nouns and verbs.
          </p>

          {/* Section Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
            {[
              { id: 'levels', labelKo: '3대 존댓말 체계', labelEn: 'Politeness Levels' },
              { id: 'vocabulary', labelKo: '존대 특수 어휘 & 호칭', labelEn: 'Honorific Words' },
              { id: 'converter', labelKo: '실전 말투 변환기', labelEn: 'Tone Converter' },
              { id: 'quiz', labelKo: '존댓말 실전 퀴즈', labelEn: 'Etiquette Quiz' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`px-4 py-2 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                  activeSection === tab.id
                    ? 'bg-white text-editorial-text shadow-md font-serif'
                    : 'bg-white/10 hover:bg-white/20 text-gray-200 border border-white/15'
                }`}
              >
                <span>{tab.labelKo}</span>
                <span className="opacity-70 block text-[10px] font-normal">{tab.labelEn}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 1. SECTION: POLITE LEVELS MATRIX */}
      {activeSection === 'levels' && (
        <div className="space-y-6">
          <div className="bg-white border border-editorial-border rounded-sm p-6 space-y-4">
            <div className="border-b border-editorial-border pb-3">
              <span className="text-[10px] font-bold text-editorial-accent uppercase tracking-widest">
                Core Politeness Framework
              </span>
              <h3 className="text-lg font-serif font-bold text-editorial-text mt-1">
                The Three Daily Speech Levels in Korean
              </h3>
              <p className="text-xs text-editorial-muted">
                Korean verbs change their ending suffix depending on your relationship with the listener. Always default to <strong>해요체 (-아요/-어요)</strong> with new acquaintances!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
              {speechLevels.map((level) => (
                <div
                  key={level.id}
                  className="bg-editorial-bg border border-editorial-border rounded-sm p-5 flex flex-col justify-between space-y-4 hover:border-editorial-accent transition-colors"
                >
                  <div className="space-y-3">
                    <span className="inline-block bg-white border border-editorial-border px-2.5 py-1 rounded-sm text-xs font-bold text-editorial-accent">
                      {level.formalityBadge}
                    </span>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-editorial-text">{level.nameKo}</h4>
                      <p className="text-xs font-semibold text-editorial-muted">{level.nameEn}</p>
                    </div>

                    <div className="p-3 bg-white border border-editorial-border rounded-sm space-y-1">
                      <span className="text-[10px] font-bold text-editorial-accent uppercase tracking-wider block">
                        When To Use
                      </span>
                      <p className="text-xs text-editorial-text leading-relaxed">{level.whenToUse}</p>
                    </div>

                    <p className="text-xs text-editorial-muted leading-relaxed">
                      {level.description}
                    </p>
                  </div>

                  {/* Audio Example Box */}
                  <div className="p-3 bg-editorial-accent-light/30 border border-editorial-border rounded-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-editorial-text uppercase tracking-wider">
                        Example Sentence
                      </span>
                      <button
                        onClick={() => handleSpeakText(level.exampleSentenceKo)}
                        className="w-7 h-7 rounded-sm bg-white hover:bg-editorial-accent hover:text-white text-editorial-text border border-editorial-border flex items-center justify-center transition-colors cursor-pointer"
                        title="Hear pronunciation"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-sm font-serif font-bold text-editorial-text">{level.exampleSentenceKo}</p>
                    <p className="text-xs text-editorial-accent font-semibold">{level.exampleSentenceRom}</p>
                    <p className="text-xs text-editorial-muted italic">{level.exampleSentenceEn}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cultural Tip Footer */}
            <div className="p-4 bg-amber-50 border border-amber-300 rounded-sm text-xs text-amber-900 flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold">Golden Rule for Learners: When in doubt, use '-요' (-yo)!</h4>
                <p>
                  Adding <strong>"-요" (-yo)</strong> to the end of your sentence instantly makes it polite (해요체). Even if your vocabulary isn't perfect, ending with "-요" ensures you will never sound rude to a Korean speaker.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SECTION: HONORIFIC VOCABULARY & PARTICLES */}
      {activeSection === 'vocabulary' && (
        <div className="bg-white border border-editorial-border rounded-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-editorial-border pb-4">
            <div>
              <span className="text-[10px] font-bold text-editorial-accent uppercase tracking-widest">
                Special Honorific Vocabulary
              </span>
              <h3 className="text-lg font-serif font-bold text-editorial-text mt-1">
                존대 특수 어휘 & 호칭 (Honorific Nouns, Verbs & Particles)
              </h3>
              <p className="text-xs text-editorial-muted">
                Certain common words have completely different honorific counterparts when referring to parents, teachers, grandparents, or superiors.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All Words (전체)' },
                { id: 'verb', label: 'Verbs (동사)' },
                { id: 'noun', label: 'Nouns (명사)' },
                { id: 'particle', label: 'Particles (조사)' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-editorial-text text-white shadow-sm'
                      : 'bg-editorial-bg text-editorial-text hover:bg-editorial-accent-light/40 border border-editorial-border'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Word Pairs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredWords.map((word, idx) => (
              <div
                key={idx}
                className="p-4 bg-editorial-bg border border-editorial-border rounded-sm space-y-3 hover:border-editorial-accent transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white border border-editorial-border text-editorial-text">
                        {word.category}
                      </span>
                      <span className="text-xs font-bold text-editorial-muted">{word.english}</span>
                    </div>
                    <div className="flex items-center space-x-2 pt-1">
                      <span className="text-sm font-semibold text-editorial-muted line-through">
                        {word.standardKo}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-editorial-accent" />
                      <span className="text-base font-serif font-bold text-editorial-text">
                        {word.honorificKo}
                      </span>
                    </div>
                    <p className="text-xs text-editorial-accent font-semibold">{word.honorificRom}</p>
                  </div>

                  <button
                    onClick={() => handleSpeakText(word.honorificKo)}
                    className="w-8 h-8 rounded-sm bg-white hover:bg-editorial-accent hover:text-white text-editorial-text border border-editorial-border flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    title="Speak honorific word"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Example sentence */}
                <div className="p-2.5 bg-white border border-editorial-border rounded-sm text-xs space-y-0.5">
                  <div className="flex items-center justify-between">
                    <p className="font-serif font-bold text-editorial-text">{word.exampleKo}</p>
                    <button
                      onClick={() => handleSpeakText(word.exampleKo)}
                      className="text-editorial-accent hover:underline cursor-pointer font-bold text-[11px]"
                    >
                      🔊 Listen
                    </button>
                  </div>
                  <p className="text-editorial-muted italic">{word.exampleEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. SECTION: SITUATION TONE CONVERTER */}
      {activeSection === 'converter' && (
        <div className="bg-white border border-editorial-border rounded-sm p-6 space-y-6">
          <div className="border-b border-editorial-border pb-3">
            <span className="text-[10px] font-bold text-editorial-accent uppercase tracking-widest">
              Interactive Sandbox
            </span>
            <h3 className="text-lg font-serif font-bold text-editorial-text mt-1">
              실전 말투 변환기 (Speech-Level Tone Converter)
            </h3>
            <p className="text-xs text-editorial-muted">
              Select a daily Korean sentence below, then switch between Formal (-습니다), Polite (-어요), and Casual (-어) to hear how the tone and vocabulary change!
            </p>
          </div>

          {/* Scenario Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {situationConverters.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedConverterId(item.id)}
                className={`px-4 py-2 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                  selectedConverterId === item.id
                    ? 'bg-editorial-text text-white shadow-sm font-serif'
                    : 'bg-editorial-bg text-editorial-text hover:bg-editorial-accent-light/40 border border-editorial-border'
                }`}
              >
                <span>{item.titleEn}</span>
              </button>
            ))}
          </div>

          {/* Active Converter Card */}
          <div className="bg-editorial-bg border border-editorial-border rounded-sm p-6 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-editorial-accent">
                Situation Context
              </span>
              <h4 className="text-lg font-serif font-bold text-editorial-text">
                "{currentConverter.titleEn}"
              </h4>
              <p className="text-xs text-editorial-muted">{currentConverter.situation}</p>
            </div>

            {/* Formality Level Selector */}
            <div className="flex border-b border-editorial-border gap-2">
              {[
                { id: 'formal', labelKo: '합쇼체 (Formal)', labelEn: '-ㅂ니다 / -습니다', icon: '👑' },
                { id: 'polite', labelKo: '해요체 (Polite)', labelEn: '-아요 / -어요', icon: '🌟' },
                { id: 'casual', labelKo: '반말 (Casual)', labelEn: '-아 / -어', icon: '💬' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFormalityTab(tab.id as any)}
                  className={`px-5 py-2.5 rounded-t-sm text-xs font-bold transition-all cursor-pointer border-b-2 flex items-center space-x-2 ${
                    activeFormalityTab === tab.id
                      ? 'border-editorial-accent bg-white text-editorial-text shadow-xs'
                      : 'border-transparent text-editorial-muted hover:text-editorial-text'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.labelKo}</span>
                  <span className="text-[10px] text-editorial-muted hidden sm:inline">({tab.labelEn})</span>
                </button>
              ))}
            </div>

            {/* Formality Display Box */}
            <div className="p-6 bg-white border border-editorial-border rounded-sm space-y-4 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-editorial-accent uppercase tracking-wider">
                    {activeFormalityTab === 'formal' && '👑 Formal Honorific Speech (-습니다)'}
                    {activeFormalityTab === 'polite' && '🌟 Standard Polite Speech (-어요)'}
                    {activeFormalityTab === 'casual' && '💬 Casual Banmal Speech (-어)'}
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-text">
                    {currentConverter[activeFormalityTab].ko}
                  </h4>
                  <p className="text-sm font-semibold text-editorial-accent tracking-wide">
                    {currentConverter[activeFormalityTab].rom}
                  </p>
                </div>

                <button
                  onClick={() => handleSpeakText(currentConverter[activeFormalityTab].ko)}
                  className="px-4 py-3 bg-editorial-text hover:bg-editorial-accent text-white rounded-sm text-xs font-bold flex items-center space-x-2 transition-colors cursor-pointer shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Hear Audio</span>
                </button>
              </div>

              <div className="p-3 bg-editorial-accent-light/40 border border-editorial-border rounded-sm text-xs text-editorial-text font-medium">
                💡 <strong>Social Etiquette Note:</strong> {currentConverter[activeFormalityTab].note}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. SECTION: HONORIFICS ETIQUETTE QUIZ */}
      {activeSection === 'quiz' && (
        <div className="bg-white border border-editorial-border rounded-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-editorial-border pb-4">
            <div>
              <span className="text-[10px] font-bold text-editorial-accent uppercase tracking-widest">
                Knowledge Check
              </span>
              <h3 className="text-lg font-serif font-bold text-editorial-text mt-1">
                존댓말 실전 예절 퀴즈 (Honorifics & Etiquette Quiz)
              </h3>
              <p className="text-xs text-editorial-muted">
                Test your understanding of honorific vocabulary, speech levels, and particles in real social scenarios!
              </p>
            </div>

            <div className="flex items-center space-x-2 text-xs font-bold text-editorial-text bg-editorial-bg border border-editorial-border px-3 py-1.5 rounded-sm">
              <Award className="w-4 h-4 text-editorial-accent" />
              <span>Score: {quizScore} / {quizQuestions.length}</span>
            </div>
          </div>

          {!quizCompleted ? (
            <div className="space-y-6 max-w-3xl">
              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-editorial-muted">
                  <span>Question {currentQuizIndex + 1} of {quizQuestions.length}</span>
                  <span>{Math.round(((currentQuizIndex + 1) / quizQuestions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-editorial-bg rounded-sm h-1.5 border border-editorial-border">
                  <div
                    className="bg-editorial-accent h-1.5 rounded-sm transition-all"
                    style={{ width: `${((currentQuizIndex + 1) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question Box */}
              <div className="bg-editorial-bg border border-editorial-border rounded-sm p-5 space-y-3">
                <span className="px-2.5 py-0.5 rounded-sm bg-white border border-editorial-border text-[10px] font-bold uppercase tracking-wider text-editorial-accent">
                  Scenario: {quizQuestions[currentQuizIndex].scenario}
                </span>
                <h4 className="text-lg font-serif font-bold text-editorial-text">
                  {quizQuestions[currentQuizIndex].questionKo}
                </h4>
                <p className="text-xs text-editorial-muted italic">
                  {quizQuestions[currentQuizIndex].questionEn}
                </p>
              </div>

              {/* Options Grid */}
              <div className="space-y-2.5">
                {quizQuestions[currentQuizIndex].options.map((option, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === quizQuestions[currentQuizIndex].correctIndex;

                  let buttonStyle = 'bg-white border-editorial-border hover:bg-editorial-accent-light/40 text-editorial-text';
                  if (selectedAnswer !== null) {
                    if (isCorrect) {
                      buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                    } else if (isSelected && !isCorrect) {
                      buttonStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                    } else {
                      buttonStyle = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizSelect(idx)}
                      disabled={selectedAnswer !== null}
                      className={`w-full p-4 rounded-sm border text-left text-sm font-serif transition-all flex items-center justify-between cursor-pointer ${buttonStyle}`}
                    >
                      <span className="font-bold">{option}</span>
                      {selectedAnswer !== null && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {selectedAnswer !== null && isSelected && !isCorrect && (
                        <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              {selectedAnswer !== null && (
                <div className="p-4 bg-white border border-editorial-border rounded-sm space-y-3 animate-fadeIn">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-editorial-accent uppercase tracking-wider">
                      💡 Etiquette Explanation
                    </span>
                  </div>
                  <p className="text-xs text-editorial-text font-medium leading-relaxed">
                    {quizQuestions[currentQuizIndex].explanation}
                  </p>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 bg-editorial-text hover:bg-editorial-accent text-white rounded-sm text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5"
                    >
                      <span>
                        {currentQuizIndex < quizQuestions.length - 1 ? 'Next Question' : 'View Results'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Completed Result Board */
            <div className="bg-editorial-bg border border-editorial-border rounded-sm p-8 text-center space-y-6 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-editorial-accent text-white flex items-center justify-center mx-auto shadow-md">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-editorial-accent uppercase tracking-widest">
                  Quiz Completed!
                </span>
                <h3 className="text-2xl font-serif font-bold text-editorial-text">
                  You scored {quizScore} out of {quizQuestions.length}!
                </h3>
                <p className="text-xs text-editorial-muted">
                  {quizScore === quizQuestions.length
                    ? '🎉 Perfect Score! You are a master of Korean respect and polite speech etiquette.'
                    : 'Great effort! Practice with the speech-level tone converter to build confidence in everyday conversations.'}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleRestartQuiz}
                  className="px-6 py-3 bg-editorial-text hover:bg-editorial-accent text-white rounded-sm text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-2 mx-auto uppercase tracking-wider"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retake Honorifics Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
