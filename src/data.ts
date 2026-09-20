import { Song, SlangWord, QuizQuestion, UserStats } from './types';

export const SONGS_DATA: Song[] = [
  {
    id: 'hype-boy',
    title: 'Hype Boy',
    artist: 'NewJeans (뉴진스)',
    albumArt: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop',
    difficulty: 'Intermediate',
    lyrics: [
      {
        korean: '보고 싶다 말하고 싶어',
        romanized: 'Bogo sipda malhago sipeo',
        english: 'I want to say that I miss you',
        words: [
          { korean: '보고 싶다', english: 'I miss you / want to see you', grammar: 'Verb block: 보다 (to see) + -고 싶다 (want to)' },
          { korean: '말하고 싶어', english: 'I want to say', grammar: 'Verb: 말하다 (to say/speak) + -고 싶어 (want to, casual)' }
        ]
      },
      {
        korean: '너는 나의 Hype Boy, 너만 보여',
        romanized: 'Neoneun naui Hype Boy, neoman boyeo',
        english: 'You are my hype boy, I only see you',
        words: [
          { korean: '너는', english: 'you are', grammar: '너 (you) + 는 (topic particle)' },
          { korean: '나의', english: 'my', grammar: '나 (I) + 의 (possessive particle)' },
          { korean: '너만', english: 'only you', grammar: '너 (you) + 만 (only)' },
          { korean: '보여', english: 'can see / is visible', grammar: 'Passive verb of 보다: 보이다 (to be seen)' }
        ]
      },
      {
        korean: '내게로 와서 꼭 안아줘',
        romanized: 'Naegero waseo kkok anajwo',
        english: 'Come to me and hold me tight',
        words: [
          { korean: '내게로', english: 'towards me', grammar: '나 (me) + 에게로 (towards)' },
          { korean: '와서', english: 'come and then', grammar: '오다 (to come) + 어서/아서 (sequence connector)' },
          { korean: '꼭', english: 'tightly / surely', grammar: 'Adverb' },
          { korean: '안아줘', english: 'hug me', grammar: '안다 (to hug) + 아/어 주다 (do for someone, casual)' }
        ]
      },
      {
        korean: '망설임은 이제 그만해',
        romanized: 'Mangseorimeun ije geumanhae',
        english: 'Stop hesitating now',
        words: [
          { korean: '망설임은', english: 'hesitation', grammar: '망설이다 (to hesitate) turned into noun + 은 (topic particle)' },
          { korean: '이제', english: 'now', grammar: 'Noun/Adverb' },
          { korean: '그만해', english: 'stop doing it', grammar: '그만하다 (to stop doing)' }
        ]
      }
    ]
  },
  {
    id: 'spring-day',
    title: 'Spring Day (봄날)',
    artist: 'BTS (방탄소년단)',
    albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop',
    difficulty: 'Advanced',
    lyrics: [
      {
        korean: '보고 싶다 이렇게 말하니까 더',
        romanized: 'Bogo sipda ireoke malhanikka deo',
        english: 'I miss you, saying this makes me miss you more',
        words: [
          { korean: '보고 싶다', english: 'I miss you', grammar: '보다 (to see) + -고 싶다 (want to)' },
          { korean: '이렇게', english: 'like this / in this way', grammar: 'Adverbial form of 이렇다' },
          { korean: '말하니까', english: 'because I say it', grammar: '말하다 (to speak) + -(으)니까 (because)' },
          { korean: '더', english: 'more', grammar: 'Adverb' }
        ]
      },
      {
        korean: '끝을 지나 추운 겨울',
        romanized: 'Chuun gyeoul kkeuteul jina',
        english: 'Past the end of this cold winter',
        words: [
          { korean: '끝을', english: 'the end (object)', grammar: '끝 (end) + 을 (object particle)' },
          { korean: '지나', english: 'passing / past', grammar: '지나다 (to pass)' },
          { korean: '추운', english: 'cold', grammar: 'Adjective form of 춥다 (to be cold, ㅂ-irregular)' },
          { korean: '겨울', english: 'winter', grammar: 'Noun' }
        ]
      },
      {
        korean: '니 사진을 보고 있어도 보고 싶다',
        romanized: 'Ni sa jineul bogo isseodo bogo sipda',
        english: 'Even when looking at your picture, I miss you',
        words: [
          { korean: '니', english: 'your', grammar: 'Casual form of 네 (your)' },
          { korean: '사진을', english: 'picture (object)', grammar: '사진 (photo) + 을 (object particle)' },
          { korean: '보고 있어도', english: 'even while looking', grammar: '보다 (to see) + -고 있다 (continuous) + -어도 (even if)' }
        ]
      }
    ]
  },
  {
    id: 'love-scenario',
    title: 'Love Scenario (사랑을 했다)',
    artist: 'iKON (아이콘)',
    albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=500&auto=format&fit=crop',
    difficulty: 'Beginner',
    lyrics: [
      {
        korean: '사랑을 했다 우리가 만나',
        romanized: 'Sarangeul haetta uriga manna',
        english: 'We fell in love, we met',
        words: [
          { korean: '사랑을 했다', english: 'loved / did love', grammar: '사랑을 하다 (to love) in past tense' },
          { korean: '우리가', english: 'we', grammar: '우리 (we/us) + 가 (subject particle)' },
          { korean: '만나', english: 'meeting / meet', grammar: '만나다 (to meet)' }
        ]
      },
      {
        korean: '지우지 못할 추억이 됐다',
        romanized: 'Jiuji mothal chueogi dwaetta',
        english: 'It became an unforgettable memory',
        words: [
          { korean: '지우지 못할', english: 'unforgettable / cannot erase', grammar: '지우다 (to erase) + -지 못하다 (cannot) + -(으)ㄹ (future adjective modifier)' },
          { korean: '추억이', english: 'memory', grammar: '추억 (memory) + 이 (subject particle)' },
          { korean: '됐다', english: 'became', grammar: '되다 (to become) in past tense' }
        ]
      }
    ]
  }
];

export const SLANG_WORDS: SlangWord[] = [
  {
    word: '최애 (Choe-ae)',
    meaning: 'Absolute Favorite (Bias)',
    description: 'A combination of 최 (Choi - Most/Best) and 애 (Ae - Love/Affection). Used in K-POP culture to denote your absolute favorite member of a group.',
    examples: [
      {
        korean: '내 뉴진스 최애는 민지야.',
        romanized: 'Nae NewJeans choe-aeneun Minji-ya.',
        english: 'My absolute favorite (bias) in NewJeans is Minji.'
      },
      {
        korean: '네 최애는 누구야?',
        romanized: 'Ne choe-aeneun nugu-ya?',
        english: 'Who is your bias/favorite?'
      }
    ]
  },
  {
    word: '입덕 (Ip-deok)',
    meaning: 'Becoming a Dedicated Fan',
    description: 'A blend of 입 (Ip - to enter) and 덕후 (Deokhu - otaku/geek). It signifies the exact moment or process of falling in love with an artist or group and joining the fandom.',
    examples: [
      {
        korean: '나 이번 신곡 듣고 완전히 입덕했어!',
        romanized: 'Na ibeon singok deutgo wanjeonhi ipdeokhaesseo!',
        english: 'I completely became a fan after hearing this new song!'
      }
    ]
  },
  {
    word: '케미 (Kemi)',
    meaning: 'Chemistry',
    description: 'Derived from the English word "chemistry". It describes the natural rapport or spark between two or more people, frequently used to describe co-stars or bandmates.',
    examples: [
      {
        korean: '두 사람 케미가 장난 아니네.',
        romanized: 'Du saram kemiga jangnan anine.',
        english: 'The chemistry between those two is no joke.'
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: "What does '최애' (Choe-ae) mean in K-POP culture?",
    options: [
      'Favorite song',
      'Absolute favorite (bias)',
      'New debut artist',
      'Concert ticket'
    ],
    correctAnswer: 1,
    explanation: "최애 (Choe-ae) comes from '최고 (best) + 사랑 (love)', meaning your absolute favorite member or bias."
  },
  {
    id: 'q2',
    question: "What grammatical pattern represents 'want to do' in '보고 싶다' (Bogo sipda)?",
    options: [
      '-고 싶다 (-go sipda)',
      '-아/어 주다 (-a/eo juda)',
      '-(으)니까 (-(eu)nikka)',
      '-고 있다 (-go itda)'
    ],
    correctAnswer: 0,
    explanation: "The suffix '-고 싶다' attached to a verb stem expresses the speaker's desire to perform that action."
  },
  {
    id: 'q3',
    question: "How do you translate the slang '입덕' (Ip-deok)?",
    options: [
      'Exiting a fandom',
      'Buying merchandise',
      'Entering a fandom / becoming a dedicated fan',
      'Slandering other groups'
    ],
    correctAnswer: 2,
    explanation: "'입덕' combines '입 (enter)' and '덕 (fan/geek)', meaning to officially fall in love with an artist or show."
  },
  {
    id: 'q4',
    question: "What particle is '는' in the line '너는 나의 Hype Boy'?",
    options: [
      'Subject particle',
      'Object particle',
      'Topic particle',
      'Possessive particle'
    ],
    correctAnswer: 2,
    explanation: "'-은/는' is the topic particle, establishing '너 (you)' as the main theme of the sentence."
  },
  {
    id: 'q5',
    question: "Which of these describes the slang '케미' (Kemi)?",
    options: [
      'A toxic fan',
      'Natural chemistry or rapport between people',
      'Lip-syncing during live shows',
      'Traditional Korean outfits'
    ],
    correctAnswer: 1,
    explanation: "'케미' is a direct transliteration/abbreviation of the English word 'Chemistry' used for chemistry between bandmates."
  }
];

export const INITIAL_USER_STATS: UserStats = {
  name: 'Learner (민준)',
  streak: 1,
  totalXp: 180,
  dailyGoalProgress: 45,
  dailyGoalXp: 150,
  completedLessons: ['kpop-hype-boy', 'onomatopoeia-basics'],
  credits: 100,
  plan: 'free',
  creditHistory: [
    {
      id: 'tx-1',
      date: 'Today',
      amount: 100,
      description: 'Welcome Bonus Credits (신규 시작 지원 크레딧)'
    }
  ],
  tutorBookings: [
    {
      id: 'booking-seed-1',
      tutorId: 'tutor-1',
      tutorName: '김지현 (Ji-hyun Kim) 튜터',
      tutorTitle: '한국어교원 1급 자격 보유 / 외국인 대상 5년 지도',
      certificateLevel: '한국어교원 1급',
      tutorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      date: '2026-09-20 (일)',
      time: '19:00 - 19:30 (KST)',
      topic: 'K-POP 억양 & 일상 경어 대화 실전 코칭',
      meetingUrl: 'https://meet.google.com/abc-kore-tut',
      status: 'upcoming',
      creditsSpent: 50,
      notes: 'AI 발음 정밀 분석 리포트(자음 연음 및 음절 피치) 기반 1:1 실시간 억양 교정'
    }
  ]
};

export const LEADERBOARD_USERS = [
  { rank: 1, name: 'Sarah K.', xp: 1980, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', isYou: false },
  { rank: 2, name: 'Min-jun (You)', xp: 1450, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80', isYou: true },
  { rank: 3, name: 'Elena R.', xp: 1320, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', isYou: false },
  { rank: 4, name: 'Kenji T.', xp: 1190, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', isYou: false }
];

export const WORD_OF_THE_DAY = {
  korean: '꿈',
  romanized: 'kkum',
  english: 'Dream',
  sentenceKorean: '꿈을 향해 달려가세요.',
  sentenceEnglish: 'Run towards your dream.'
};
