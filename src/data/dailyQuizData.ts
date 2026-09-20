export interface DailyQuizQuestion {
  id: string;
  sourceType: 'history' | 'kpop' | 'slang' | 'grammar' | 'topik' | 'kdrama';
  sourceLabel: string;
  questionKo: string;
  questionEn: string;
  targetWord: string;
  romanized: string;
  contextSentenceKo?: string;
  contextSentenceEn?: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
  explanationKo: string;
  explanationEn: string;
  masteryTip: string;
}

export interface DailyQuizSet {
  dateKey: string;
  theme: string;
  rewardCredits: number;
  rewardXp: number;
  questions: DailyQuizQuestion[];
}

// Curated pool of high-yield review questions based on the user's learning path
export const DAILY_QUIZ_POOL: DailyQuizQuestion[] = [
  {
    id: 'dq-honorific-1',
    sourceType: 'history',
    sourceLabel: 'Completed: Honorifics (존댓말)',
    questionKo: '"식사하셨습니까?"의 기본 동사인 "먹다/마시다"의 높임말 형태는 무엇일까요?',
    questionEn: 'What is the honorific equivalent of the verb "먹다 (to eat)" when speaking politely to elders?',
    targetWord: '드시다 / 잡수시다',
    romanized: 'deusida / japsusida',
    contextSentenceKo: '할아버지, 진지 맛있게 드세요.',
    contextSentenceEn: 'Grandfather, please enjoy your meal.',
    options: [
      { text: '드시다 (Deusida)', isCorrect: true },
      { text: '말씀하시다 (Malsseumhasida)', isCorrect: false },
      { text: '주무시다 (Jumusida)', isCorrect: false },
      { text: '계시다 (Gyesida)', isCorrect: false }
    ],
    explanationKo: '"먹다"의 높임말은 "드시다" 또는 "잡수시다"이며, 밥은 "진지"로 높여 부릅니다.',
    explanationEn: '"드시다" is the honorific verb for "먹다 (to eat)", paired with "진지 (meal/rice)".',
    masteryTip: '주무시다 = 자다(sleep), 말씀하시다 = 말하다(speak), 계시다 = 있다(stay/be)'
  },
  {
    id: 'dq-kpop-2',
    sourceType: 'kpop',
    sourceLabel: 'LyricsLab: NewJeans - Hype Boy',
    questionKo: '"망설임은 이제 그만해"에서 "그만하다"의 뜻은 무엇일까요?',
    questionEn: 'In the lyric "망설임은 이제 그만해", what is the meaning of "그만하다"?',
    targetWord: '그만하다',
    romanized: 'geumanhada',
    contextSentenceKo: '더 이상 고민하지 말고 그만해.',
    contextSentenceEn: 'Stop worrying any longer.',
    options: [
      { text: 'To start fresh', isCorrect: false },
      { text: 'To stop / cease doing', isCorrect: true },
      { text: 'To hurry up', isCorrect: false },
      { text: 'To celebrate', isCorrect: false }
    ],
    explanationKo: '"그만하다"는 하던 일이나 생각을 중단하고 멈추는 것을 의미합니다.',
    explanationEn: '"그만하다" means to stop or discontinue an ongoing action or hesitation.',
    masteryTip: '동사 어간 + -지 마세요 (Please do not do) vs 그만하세요 (Please stop now)'
  },
  {
    id: 'dq-slang-3',
    sourceType: 'slang',
    sourceLabel: 'Trendy K-Slang: 뇌피셜',
    questionKo: '신조어 "뇌피셜(Noe-pi-syeol)"의 올바른 의미는?',
    questionEn: 'What does the modern trendy slang "뇌피셜" (Brain + Official) mean?',
    targetWord: '뇌피셜',
    romanized: 'Noe-pi-syeol',
    contextSentenceKo: '그건 공식 뉴스가 아니라 내 뇌피셜이야.',
    contextSentenceEn: "That's not official news, just my personal unverified theory.",
    options: [
      { text: 'An official government press release', isCorrect: false },
      { text: "One's personal, unverified theory / subjective speculation", isCorrect: true },
      { text: 'A medical brain scan examination', isCorrect: false },
      { text: 'A high IQ genius student', isCorrect: false }
    ],
    explanationKo: '"뇌(Brain)" + "오피셜(Official)"의 합성어로, 공인되지 않은 개인적 추측을 뜻합니다.',
    explanationEn: 'Portmanteau of "뇌 (Brain)" and "Official", denoting subjective speculations presented humorously.',
    masteryTip: '격식 있는 자리에선 "개인적인 추측입니다"로 바꾸어 말하세요.'
  },
  {
    id: 'dq-kdrama-4',
    sourceType: 'kdrama',
    sourceLabel: 'K-Drama Vocab: 심쿵',
    questionKo: 'K-드라마에서 설레는 장면을 볼 때 쓰는 표현 "심쿵"의 뜻은?',
    questionEn: 'Which feeling does the popular K-Drama term "심쿵 (Sim-kung)" express?',
    targetWord: '심쿵',
    romanized: 'Sim-kung',
    contextSentenceKo: '주인공이 미소 지을 때마다 완전 심쿵했어!',
    contextSentenceEn: 'Every time the lead character smiled, my heart fluttered!',
    options: [
      { text: 'Feeling heart-fluttering romantic excitement', isCorrect: true },
      { text: 'Being deeply disappointed and sad', isCorrect: false },
      { text: 'Getting extremely hungry after watching food', isCorrect: false },
      { text: 'Feeling tired and falling asleep', isCorrect: false }
    ],
    explanationKo: '"심장이 쿵쾅쿵쾅 뛴다"의 줄임말로, 가슴 뛰는 설렘이나 매력에 반했을 때 씁니다.',
    explanationEn: 'Abbreviation for "heart thumping with sudden excitement or romantic flutter".',
    masteryTip: '비슷한 표현: "설레다", "가슴이 콩닥거리다"'
  },
  {
    id: 'dq-topik-5',
    sourceType: 'topik',
    sourceLabel: 'TOPIK Essential: 시간 & 빈도 부사',
    questionKo: '"자주"와 반대되는 의미로, "거의 ~하지 않다 / 드물게"를 뜻하는 부사는?',
    questionEn: 'Which Korean adverb means "rarely / seldom" (opposite of "자주 - often")?',
    targetWord: '거의 / 좀처럼',
    romanized: 'geoui / jomcheoreom',
    contextSentenceKo: '저는 바빠서 외식을 거의 하지 않아요.',
    contextSentenceEn: 'I am so busy that I rarely dine out.',
    options: [
      { text: '항상 (Always)', isCorrect: false },
      { text: '매일 (Everyday)', isCorrect: false },
      { text: '거의 / 좀처럼 (Rarely / Seldom)', isCorrect: true },
      { text: '가끔 (Sometimes)', isCorrect: false }
    ],
    explanationKo: '"거의 ~않다" 또는 "좀처럼 ~않다"는 부정어와 호응하여 "드물게" 일어남을 나타냅니다.',
    explanationEn: '"거의 / 좀처럼" combined with negative verbs means "rarely" or "hardly ever".',
    masteryTip: '빈도 스펙트럼: 항상(100%) > 자주(70%) > 가끔(40%) > 거의 안 함(10%) > 전혀 안 함(0%)'
  },
  {
    id: 'dq-etiquette-6',
    sourceType: 'history',
    sourceLabel: 'Cultural Etiquette: Dining & Drinking',
    questionKo: '한국에서 어른과 식사할 때 가장 바른 식탁 예절은 무엇일까요?',
    questionEn: 'What is the most proper table etiquette when dining with elders in Korea?',
    targetWord: '수저 예절',
    romanized: 'Sujeo yejeol',
    contextSentenceKo: '어른이 먼저 수저를 드신 후에 식사를 시작합니다.',
    contextSentenceEn: 'Wait until the elders pick up their utensils before eating.',
    options: [
      { text: '어른이 먼저 수저를 드신 후 식사를 시작한다.', isCorrect: true },
      { text: '밥그릇을 손으로 높이 들고 먹는다.', isCorrect: false },
      { text: '숟가락과 젓가락을 한 손에 동시에 쥐고 먹는다.', isCorrect: false },
      { text: '가장 맛있는 반찬을 먼저 모두 가져온다.', isCorrect: false }
    ],
    explanationKo: '한국 식사 예절에서는 연장자가 먼저 수저를 든 뒤 식사를 시작하며, 밥그릇은 식탁 위에 두고 먹습니다.',
    explanationEn: 'Always wait for the oldest person to pick up utensils first, and keep bowls on the table.',
    masteryTip: '식사 전 인사: "잘 먹겠습니다!" / 식사 후 인사: "잘 먹었습니다!"'
  },
  {
    id: 'dq-grammar-7',
    sourceType: 'grammar',
    sourceLabel: 'Core Grammar: 이유와 원인 (-아서/어서)',
    questionKo: '"날씨가 좋다 + 기분이 좋다"를 자연스럽게 연결한 올바른 문장은?',
    questionEn: 'Which is the grammatically correct way to combine "날씨가 좋다" and "기분이 좋다" using "-아서/어서 (because)"?',
    targetWord: '좋아서',
    romanized: 'jo-aseo',
    contextSentenceKo: '오늘 날씨가 좋아서 산책을 갔어요.',
    contextSentenceEn: 'The weather was so nice today that I went for a walk.',
    options: [
      { text: '날씨가 좋아서 기분이 좋아요.', isCorrect: true },
      { text: '날씨가 좋어서 기분이 좋아요.', isCorrect: false },
      { text: '날씨가 좋고서 기분이 좋아요.', isCorrect: false },
      { text: '날씨가 좋은데서 기분이 좋아요.', isCorrect: false }
    ],
    explanationKo: '"좋다"의 어간 모음이 양성모음(ㅗ)이므로 "-아서"가 결합하여 "좋아서"가 됩니다.',
    explanationEn: 'Since the vowel in "좋다" is "ㅗ" (bright vowel), it conjugates with "-아서" to form "좋아서".',
    masteryTip: '양성 모음 (ㅏ, ㅗ) → -아서 / 음성 모음 (ㅓ, ㅜ, ㅣ 등) → -어서'
  }
];

export function getTodayQuizQuestions(): DailyQuizQuestion[] {
  // Return a deterministic but rotating selection of 5 questions
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  // Pick 5 questions from the pool using day offset
  const poolCopy = [...DAILY_QUIZ_POOL];
  const selected: DailyQuizQuestion[] = [];
  
  for (let i = 0; i < 5; i++) {
    const idx = (dayOfYear + i) % poolCopy.length;
    selected.push(poolCopy[idx]);
  }
  
  return selected;
}
