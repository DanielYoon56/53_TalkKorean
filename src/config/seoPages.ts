export interface SeoDialogueTurn {
  speaker: string;
  korean: string;
  romanized: string;
  english: string;
}

export interface SeoFaqItem {
  question: string;
  answer: string;
}

export interface SeoPageConfig {
  path: string;
  title: string;
  description: string;
  h1: string;
  category: 'core' | 'situation';
  categoryLabel: string;
  parentCategoryName: string;
  parentCategoryPath: string;
  heroSubtitle: string;
  primaryCtaText: string;
  metaKeywords: string[];
  problemExplanation: {
    heading: string;
    paragraphs: string[];
  };
  howItWorks: {
    heading: string;
    description: string;
    steps: {
      stepNumber: number;
      title: string;
      detail: string;
    }[];
  };
  features: {
    title: string;
    description: string;
  }[];
  exampleConversation: {
    scenarioTitle: string;
    context: string;
    turns: SeoDialogueTurn[];
  };
  whyAiSection: {
    heading: string;
    paragraphs: string[];
    bulletPoints: {
      title: string;
      text: string;
    }[];
  };
  faq: SeoFaqItem[];
  relatedPaths: string[];
}

export const SEO_PAGES: Record<string, SeoPageConfig> = {
  // -------------------------------------------------------------
  // 1. /korean-conversation
  // -------------------------------------------------------------
  '/korean-conversation': {
    path: '/korean-conversation',
    title: 'Korean Conversation Practice with AI | Talk Korean',
    description: 'Practice interactive Korean conversation with AI. Master daily Korean dialogue, realistic roleplays, honorifics, and immediate feedback with Talk Korean.',
    h1: 'Korean Conversation Practice with AI',
    category: 'core',
    categoryLabel: 'Core Korean Skills',
    parentCategoryName: 'Learn Korean',
    parentCategoryPath: '/korean-conversation',
    heroSubtitle: 'Build authentic conversational Korean fluency through interactive AI dialogues, real-time feedback, and practical situational roleplays.',
    primaryCtaText: 'Start Korean Conversation Practice',
    metaKeywords: ['korean conversation', 'practice korean conversation', 'learn korean dialogue', 'interactive korean speaking'],
    problemExplanation: {
      heading: 'The Challenge of Finding Conversation Practice in Korean',
      paragraphs: [
        'Many foreign learners spend months memorizing vocabulary and textbook grammar rules, only to freeze when asked a simple question in real life. Korean conversation involves dynamic honorific levels, sentence-ending particles, and rapid verbal exchanges that textbooks rarely simulate effectively.',
        'Without a dedicated native speaking partner, learners lack a safe environment to practice making mistakes, testing sentence structures, and receiving instant phonetic and grammatical feedback.'
      ]
    },
    howItWorks: {
      heading: 'How Talk Korean Develops Your Conversational Reflexes',
      description: 'Talk Korean provides an immersive dialogue engine where you engage in turn-by-turn spoken conversations with native-speed audio and context tips.',
      steps: [
        {
          stepNumber: 1,
          title: 'Select a Realistic Scenario',
          detail: 'Choose from everyday Korean scenarios such as taking a Seoul taxi, ordering iced Americanos in Hongdae, or having casual small talk.'
        },
        {
          stepNumber: 2,
          title: 'Speak or Type in Korean',
          detail: 'Reply using your microphone or keyboard. Practice natural pronunciation with instant romanization assistance and pitch references.'
        },
        {
          stepNumber: 3,
          title: 'Receive Instant Linguistic Feedback',
          detail: 'Our AI tutor immediately analyzes your word choice, particle accuracy, and politeness register, suggesting more natural native alternatives.'
        }
      ]
    },
    features: [
      {
        title: 'Dynamic Turn-by-Turn Dialogue',
        description: 'Participate in unscripted, branching conversations that adapt to what you say instead of rigid flashcard templates.'
      },
      {
        title: 'Politeness & Speech Styles',
        description: 'Learn when to naturally transition between formal (하십시오체), polite (해요체), and casual (반말) Korean.'
      },
      {
        title: 'Native Audio Pronunciation',
        description: 'Listen to every dialogue turn pronounced with natural rhythm, authentic intonation, and adjustable playback speeds.'
      },
      {
        title: 'Vocabulary in Living Context',
        description: 'Acquire high-frequency Korean vocabulary by using words directly in conversation rather than rote memorization.'
      }
    ],
    exampleConversation: {
      scenarioTitle: 'Casual Meetup & Daily Catch-up',
      context: 'Meeting a Korean acquaintance after work near Gangnam Station.',
      turns: [
        {
          speaker: 'AI Partner (민지)',
          korean: '오랜만이에요! 요즘 한국어 공부는 잘 되어 가요?',
          romanized: 'Oraenmanieyo! Yojeum hangugeo gongbuneun jal doeeo gayo?',
          english: 'Long time no see! How is your Korean study going these days?'
        },
        {
          speaker: 'Learner',
          korean: '네, 매일 조금씩 말하기 연습을 하고 있어요.',
          romanized: 'Ne, maeil jogeumssik malhagi yeonseubeul hago isseoyo.',
          english: 'Yes, I am practicing speaking a little bit every day.'
        },
        {
          speaker: 'AI Partner (민지)',
          korean: '정말 대단해요! 꾸준히 연습하는 게 가장 중요하죠.',
          romanized: 'Jeongmal daedanhaeyo! Kkujunhi yeonseubhaneun ge gajang jungyohajyo.',
          english: 'That is truly amazing! Practicing consistently is the most important thing.'
        }
      ]
    },
    whyAiSection: {
      heading: 'Why Practice Korean Conversation with AI?',
      paragraphs: [
        'Practicing with an AI conversation tutor eliminates social anxiety. You never have to worry about feeling embarrassed or taking too long to formulate your sentences.',
        'Unlike human conversation sessions that require scheduling and high hourly fees, AI allows you to practice at midnight or during your morning commute, as many times as you need.'
      ],
      bulletPoints: [
        {
          title: 'Zero Judgment Environment',
          text: 'Make pronunciation mistakes and test different honorific endings without fear of awkwardness.'
        },
        {
          title: 'Immediate Grammatical Correction',
          text: 'Get clear explanations of subtle particle nuances right after you utter your response.'
        },
        {
          title: 'Unlimited Repetition',
          text: 'Repeat dialogue turns and listen to playback until your tongue and ears feel completely comfortable.'
        }
      ]
    },
    faq: [
      {
        question: 'What is Korean conversation practice with Talk Korean?',
        answer: 'Talk Korean provides interactive, turn-by-turn conversation practice where learners converse with an AI partner across diverse everyday and professional scenarios, receiving immediate feedback on sentence structure and pronunciation.'
      },
      {
        question: 'Can beginners practice Korean conversation?',
        answer: 'Yes. Talk Korean includes Hangul support, romanized phonetics, and English translations alongside suggested response options so beginner learners never get stuck.'
      },
      {
        question: 'How does Talk Korean handle speech recognition for foreign accents?',
        answer: 'Our system utilizes Korean speech recognition tuned to handle varying accents, accompanied by visual feedback so you can see exactly how clearly your Korean was recognized.'
      },
      {
        question: 'Do I need to pay to practice Korean conversation?',
        answer: 'New users receive complimentary learning credits upon starting. Multiple introductory dialogue scenarios and 1:1 free talk are immediately accessible.'
      }
    ],
    relatedPaths: [
      '/korean-speaking-practice',
      '/korean-for-beginners',
      '/daily-korean-conversation',
      '/korean-roleplay'
    ]
  },

  // -------------------------------------------------------------
  // 2. /korean-speaking-practice
  // -------------------------------------------------------------
  '/korean-speaking-practice': {
    path: '/korean-speaking-practice',
    title: 'Korean Speaking Practice with AI | Talk Korean',
    description: 'Practice speaking Korean with AI. Improve your Korean speaking skills through realistic conversations, pronunciation corrections, and guided practice.',
    h1: 'Korean Speaking Practice with AI',
    category: 'core',
    categoryLabel: 'Core Korean Skills',
    parentCategoryName: 'Learn Korean',
    parentCategoryPath: '/korean-conversation',
    heroSubtitle: 'Overcome hesitation and speak Korean aloud with confidence through voice interaction, pronunciation scoring, and natural pacing.',
    primaryCtaText: 'Start Korean Speaking Practice',
    metaKeywords: ['korean speaking practice', 'speak korean', 'korean speaking app', 'practice speaking korean aloud'],
    problemExplanation: {
      heading: 'Why Speaking Korean Out Loud Feels So Difficult',
      paragraphs: [
        'Passive listening to K-dramas and memorizing vocabulary flashcards rarely translate into active speaking fluency. The physical motor skills required to produce Korean vowels and batchim (final consonants) require deliberate vocal output.',
        'Many learners understand Korean sentences when reading them, but struggle to retrieve vocabulary and construct sentences quickly when placed on the spot.'
      ]
    },
    howItWorks: {
      heading: 'The Active Speaking Loop in Talk Korean',
      description: 'Our structured speaking loop activates your vocal output through speech-to-text, acoustic analysis, and conversational follow-ups.',
      steps: [
        {
          stepNumber: 1,
          title: 'Prompt & Context Audio',
          detail: 'Listen to a natural Korean prompt with native cadence. Review the English meaning and romanized pronunciation guide.'
        },
        {
          stepNumber: 2,
          title: 'Vocal Response',
          detail: 'Activate the microphone and speak your answer in Korean. Practice sentence pacing and clear vowel articulation.'
        },
        {
          stepNumber: 3,
          title: 'Acoustic Scoring & Correction',
          detail: 'Receive immediate visual feedback on your pronunciation accuracy, rhythm, and intonation curve.'
        }
      ]
    },
    features: [
      {
        title: 'Voice-Activated Mic Practice',
        description: 'Speak your answers naturally using browser microphone speech recognition with real-time transcript matching.'
      },
      {
        title: 'Sentence Building Drills',
        description: 'Learn to combine subject markers (이/가), topic markers (은/는), and verb stems quickly into fluent phrases.'
      },
      {
        title: 'Instant Speech Rate Adjustment',
        description: 'Adjust speech output between 0.8x, 1.0x, and 1.2x to practice listening and shadowing at your personal comfort level.'
      },
      {
        title: 'Confidence Building Progress',
        description: 'Track your daily speaking streaks, completed scenario turns, and experience points across multiple modules.'
      }
    ],
    exampleConversation: {
      scenarioTitle: 'Asking for Recommendations at a Bakery',
      context: 'Speaking to a baker in Yeonnam-dong about fresh bread.',
      turns: [
        {
          speaker: 'Baker',
          korean: '방금 나온 소금빵 추천해 드릴까요?',
          romanized: 'Bang-geum naon sogeum-ppang chucheonhae deurilkkayo?',
          english: 'Shall I recommend the salt bread that just came out of the oven?'
        },
        {
          speaker: 'Learner',
          korean: '네, 소금빵 두 개 포장해 주세요.',
          romanized: 'Ne, sogeum-ppang du gae pojanghae juseyo.',
          english: 'Yes, please pack two salt breads to go.'
        },
        {
          speaker: 'Baker',
          korean: '네, 따뜻할 때 바로 드시면 아주 맛있습니다!',
          romanized: 'Ne, ttatteuthal ttae baro deusimyeon aju masitsseumnida!',
          english: 'Sure thing, it is delicious if you enjoy it while it is still warm!'
        }
      ]
    },
    whyAiSection: {
      heading: 'Why Daily Speaking Drills Transform Fluency',
      paragraphs: [
        'Speaking requires muscle memory. Repeatedly vocalizing Korean syllables strengthens the coordination of your lips, tongue, and throat for distinct Korean sounds like ㅓ, ㅡ, and double consonants (ㄲ, ㄸ, ㅃ).',
        'Talk Korean gives you a partner available 24/7 who listens patiently, prompts you with authentic questions, and never interrupts.'
      ],
      bulletPoints: [
        {
          title: 'Muscle Memory Formation',
          text: 'Develop native-like tongue positioning through targeted vocal repetition.'
        },
        {
          title: 'Reduced Hesitation',
          text: 'Shorten the cognitive delay between thinking in English and vocalizing in Korean.'
        },
        {
          title: 'Continuous Reinforcement',
          text: 'Practice high-frequency phrases until they become second nature.'
        }
      ]
    },
    faq: [
      {
        question: 'How does Talk Korean evaluate my speaking?',
        answer: 'Talk Korean utilizes speech recognition and linguistic analysis to check sentence clarity, word choice accuracy, and grammar coherence, highlighting areas for improvement.'
      },
      {
        question: 'Can I practice speaking without a microphone?',
        answer: 'Yes. If you are in a quiet room or public transit, you can select suggested replies or type your Korean responses while still listening to native audio.'
      },
      {
        question: 'How often should I practice speaking Korean?',
        answer: 'Consistent 10 to 15-minute daily practice sessions yield significantly better retention and speech fluidity than long sessions once a week.'
      },
      {
        question: 'Does speaking practice help with TOPIK exams?',
        answer: 'Yes. Active sentence construction and verbal fluency reinforce grammatical patterns and vocabulary required for both TOPIK I and TOPIK II.'
      }
    ],
    relatedPaths: [
      '/korean-pronunciation',
      '/korean-listening-practice',
      '/korean-grammar-practice',
      '/ai-korean-tutor'
    ]
  },

  // -------------------------------------------------------------
  // 3. /korean-pronunciation
  // -------------------------------------------------------------
  '/korean-pronunciation': {
    path: '/korean-pronunciation',
    title: 'Korean Pronunciation Practice with AI | Talk Korean',
    description: 'Master Korean pronunciation with AI feedback. Practice tense consonants, batchim final consonants, vowel distinctions, and pitch accents.',
    h1: 'Korean Pronunciation Practice with AI',
    category: 'core',
    categoryLabel: 'Core Korean Skills',
    parentCategoryName: 'Learn Korean',
    parentCategoryPath: '/korean-conversation',
    heroSubtitle: 'Refine your Korean accent, clarify tricky batchim sounds, and master subtle vowel differences with instant acoustic feedback.',
    primaryCtaText: 'Start Pronunciation Practice',
    metaKeywords: ['korean pronunciation', 'korean accent practice', 'learn batchim', 'korean vowel sounds'],
    problemExplanation: {
      heading: 'The Nuances of Korean Phonology for Foreign Speakers',
      paragraphs: [
        'Korean features a three-way consonant distinction that does not exist in English: plain (ㄱ, ㄷ, ㅂ), aspirated (ㅋ, ㅌ, ㅍ), and tense (ㄲ, ㄸ, ㅃ). Confusing these sounds can alter the entire meaning of a word—for example, 달 (moon), 탈 (mask), and 딸 (daughter).',
        'Additionally, sound shift rules such as nasalization (비음화), t-palatalization (구개음화), and tensification (경음화) make words sound different from how they are written in Hangul.'
      ]
    },
    howItWorks: {
      heading: 'Acoustic Sound Breakdown in Talk Korean',
      description: 'Our pronunciation engine records your voice, breaks down phonetic components, and provides pinpoint advice.',
      steps: [
        {
          stepNumber: 1,
          title: 'Listen to Reference Audio',
          detail: 'Hear clear phonetic examples of targeted words and sentences at standard or slowed playback rates.'
        },
        {
          stepNumber: 2,
          title: 'Record Your Voice',
          detail: 'Vocalize the phrase into your microphone with minimal background noise.'
        },
        {
          stepNumber: 3,
          title: 'Receive Syllable Breakdown',
          detail: 'See visual score markers highlighting accurate vowels, breath aspiration levels, and final consonant closures.'
        }
      ]
    },
    features: [
      {
        title: 'Consonant Contrast Drills',
        description: 'Targeted minimal pair exercises distinguishing plain, aspirated, and tense Korean consonants.'
      },
      {
        title: 'Batchim Rule Explanations',
        description: 'Clear explanations and examples of how final consonants connect to following vowels and consonants.'
      },
      {
        title: 'K-POP Lyrics Pronunciation Lab',
        description: 'Practice rapid articulation and rhythm using authentic Korean lyrics broken down line by line.'
      },
      {
        title: 'Visual Pitch & Stress Guidance',
        description: 'Understand Korean intonation patterns and avoid transferring English stress accents onto Korean syllables.'
      }
    ],
    exampleConversation: {
      scenarioTitle: 'Ordering Drinks with Distinct Vowels',
      context: 'Distinguishing ㅓ (eo) and ㅗ (o) sounds in a Seoul café.',
      turns: [
        {
          speaker: 'Barista',
          korean: '따뜻한 커피 드릴까요, 차가운 커피 드릴까요?',
          romanized: 'Ttatteut-han keopi deurilkkayo, chagaun keopi deurilkkayo?',
          english: 'Would you like warm coffee or iced coffee?'
        },
        {
          speaker: 'Learner',
          korean: '따뜻한 아메리카노로 한 잔 부탁드려요.',
          romanized: 'Ttatteut-han amerikano-ro han jan butakdeuryeoyo.',
          english: 'One warm Americano, please.'
        },
        {
          speaker: 'Barista',
          korean: '네, 준비되면 진동벨로 알려드릴게요.',
          romanized: 'Ne, junbidoemyeon jindongbel-lo allyeodeurilgeyo.',
          english: 'Got it, we will alert you with the buzzer when it is ready.'
        }
      ]
    },
    whyAiSection: {
      heading: 'The Advantage of Objective Acoustic Feedback',
      paragraphs: [
        'Native Korean speakers are often too polite to correct slight pronunciation inaccuracies, leaving learners unaware of persistent accent errors.',
        'An AI pronunciation analyzer delivers impartial, consistent evaluations, helping you identify exactly which vowels or consonants need minor tongue adjustments.'
      ],
      bulletPoints: [
        {
          title: 'Precise Error Pinpointing',
          text: 'Know immediately if your final consonant was released instead of closed.'
        },
        {
          title: 'Safe Repetition Space',
          text: 'Re-record the same syllable ten times in a row without feeling self-conscious.'
        },
        {
          title: 'Sound Connection Training',
          text: 'Master smooth liaison rules so your speech flows naturally.'
        }
      ]
    },
    faq: [
      {
        question: 'Why do Korean vowels like ㅓ and ㅗ sound so similar to me?',
        answer: 'For English speakers, both sounds map close to "o". ㅓ requires dropping your jaw with relaxed lips, whereas ㅗ requires rounding your lips tightly. Talk Korean guides you through these mouth shapes.'
      },
      {
        question: 'What is batchim in Korean pronunciation?',
        answer: 'Batchim refers to consonants placed at the bottom of a Hangul syllable block. While there are 27 possible written batchim, they collapse into only 7 distinct representative ending sounds when pronounced.'
      },
      {
        question: 'Can I improve my pronunciation without an expensive accent coach?',
        answer: 'Yes. Consistent targeted practice using acoustic feedback and shadow listening builds strong native-like pronunciation fundamentals.'
      },
      {
        question: 'Does Talk Korean score both speed and accuracy?',
        answer: 'Yes, our feedback includes accuracy, rhythmic pacing, and intonation clarity.'
      }
    ],
    relatedPaths: [
      '/korean-speaking-practice',
      '/korean-listening-practice',
      '/korean-for-beginners',
      '/korean-expression-practice'
    ]
  },

  // -------------------------------------------------------------
  // 4. /korean-listening-practice
  // -------------------------------------------------------------
  '/korean-listening-practice': {
    path: '/korean-listening-practice',
    title: 'Korean Listening Practice with AI | Talk Korean',
    description: 'Improve Korean listening comprehension. Train your ears with native speed audio, conversational dialogue, dictation quizzes, and variable playback speeds.',
    h1: 'Korean Listening Practice with AI',
    category: 'core',
    categoryLabel: 'Core Korean Skills',
    parentCategoryName: 'Learn Korean',
    parentCategoryPath: '/korean-conversation',
    heroSubtitle: 'Train your ear to recognize real-world Korean pacing, contractions, and colloquial speech patterns with interactive listening exercises.',
    primaryCtaText: 'Start Korean Listening Practice',
    metaKeywords: ['korean listening practice', 'korean audio comprehension', 'listen to korean', 'korean dictation practice'],
    problemExplanation: {
      heading: 'Why Real-Life Korean Sounds Different from Audiobooks',
      paragraphs: [
        'Slowly spoken textbook dialogues give learners a false sense of security. In real Korean life, speakers blend syllables together, drop grammatical particles, and use colloquial contractions like 뭘 (from 무엇을) and 이건 (from 이것은).',
        'When listening to native speakers, foreign learners often miss familiar words simply because sound assimilation rules alter how those words sound in rapid context.'
      ]
    },
    howItWorks: {
      heading: 'Ear Training via Contextual Listening Drills',
      description: 'Progressively develop your auditory comprehension from isolated words to multi-speaker exchanges.',
      steps: [
        {
          stepNumber: 1,
          title: 'Blind Audio Listening',
          detail: 'Listen to a native Korean conversational turn without reading the subtitles first to test your genuine auditory recognition.'
        },
        {
          stepNumber: 2,
          title: 'Toggle Subtitles on Demand',
          detail: 'Reveal Hangul text, romanized phonetic transcriptions, and English translations step by step to verify your understanding.'
        },
        {
          stepNumber: 3,
          title: 'Dictation & Comprehension Quiz',
          detail: 'Type what you heard or answer comprehension questions to reinforce sound-to-meaning mapping in your memory.'
        }
      ]
    },
    features: [
      {
        title: 'Authentic Conversational Cadence',
        description: 'Listen to dialogues recorded at genuine conversational speeds reflecting modern Seoul speech.'
      },
      {
        title: 'Dictation Testing (받아쓰기)',
        description: 'Practice Korean spelling, spacing (띄어쓰기), and sound change rules through dedicated dictation exercises.'
      },
      {
        title: 'Speed Control Slider',
        description: 'Slow down challenging passages to 0.8x to deconstruct complex liaison shifts, then return to full 1.0x native speed.'
      },
      {
        title: 'Comprehensive Subtitle Modes',
        description: 'Switch freely between Full (Hangul + Romanization + English), Korean + English, or Korean Only mode.'
      }
    ],
    exampleConversation: {
      scenarioTitle: 'Subway Station Announcement & Inquiry',
      context: 'Understanding transit directions inside Seoul Metro Station.',
      turns: [
        {
          speaker: 'Station Staff',
          korean: '잠실역 가시려면 2호선 승강장으로 내려가셔야 합니다.',
          romanized: 'Jamsil-yeok gasiryeomyeon i-hoseon seung-gangjang-euro naeryeogasyeoya hamnida.',
          english: 'To go to Jamsil Station, you need to go down to the Line 2 platform.'
        },
        {
          speaker: 'Passenger',
          korean: '감사합니다! 여기서 몇 정거장 더 가야 하나요?',
          romanized: 'Gamsahamnida! Yeogiseo myeot jeong-geojang deo gaya hanayo?',
          english: 'Thank you! How many more stops do I need to go from here?'
        },
        {
          speaker: 'Station Staff',
          korean: '여기서 네 정거장만 더 가시면 도착합니다.',
          romanized: 'Yeogiseo ne jeong-geojang-man deo gasimyeon dochakhamnida.',
          english: 'You will arrive after just four more stops from here.'
        }
      ]
    },
    whyAiSection: {
      heading: 'How Interactive Listening Fast-Tracks Comprehension',
      paragraphs: [
        'Passive listening (playing podcasts in the background) produces minimal results compared to active listening where you are required to respond or transcribe.',
        'Interactive dialogues force your brain to parse incoming sounds, extract intent, and formulate answers in real time.'
      ],
      bulletPoints: [
        {
          title: 'Active Processing',
          text: 'Shift your brain from passive hearing to active linguistic comprehension.'
        },
        {
          title: 'Contraction Familiarity',
          text: 'Recognize shortened everyday Korean expressions effortlessly.'
        },
        {
          title: 'Dialect & Register Sensitivity',
          text: 'Notice subtle differences between polite ending variations.'
        }
      ]
    },
    faq: [
      {
        question: 'Should I read subtitles while practicing Korean listening?',
        answer: 'We recommend listening once without subtitles first to test your baseline recognition, then enabling Korean subtitles to identify any missed vocabulary.'
      },
      {
        question: 'What is Korean dictation (받아쓰기)?',
        answer: 'Dictation is a classic Korean educational practice where learners listen to spoken sentences and transcribe them accurately, testing both listening discernment and spelling rules.'
      },
      {
        question: 'How do sound change rules affect listening?',
        answer: 'Rules like nasalization turn "국물" (soup) into "궁물" in speech. Practicing with Talk Korean helps you recognize these spoken variants instantly.'
      },
      {
        question: 'Can beginners benefit from native-speed listening exercises?',
        answer: 'Yes, because our playback speed can be slowed to 0.8x, enabling beginners to catch individual phonemes without losing authentic intonation.'
      }
    ],
    relatedPaths: [
      '/korean-speaking-practice',
      '/korean-pronunciation',
      '/daily-korean-conversation',
      '/travel-korean'
    ]
  },

  // -------------------------------------------------------------
  // 5. /korean-grammar-practice
  // -------------------------------------------------------------
  '/korean-grammar-practice': {
    path: '/korean-grammar-practice',
    title: 'Korean Grammar Practice with AI | Talk Korean',
    description: 'Learn and practice Korean grammar in conversation. Understand particles (은/는, 이/가), verb conjugations, honorifics, and sentence endings.',
    h1: 'Korean Grammar Practice with AI',
    category: 'core',
    categoryLabel: 'Core Korean Skills',
    parentCategoryName: 'Learn Korean',
    parentCategoryPath: '/korean-conversation',
    heroSubtitle: 'Understand how Korean grammar structures function in real conversations instead of memorizing dry textbook tables.',
    primaryCtaText: 'Start Korean Grammar Practice',
    metaKeywords: ['korean grammar practice', 'korean particles', 'korean honorifics', 'learn korean verb conjugation'],
    problemExplanation: {
      heading: 'The Frustration of Abstract Korean Grammar Rules',
      paragraphs: [
        'Traditional grammar instruction often presents endless conjugation charts and rules out of context. Learners learn the rule on paper but have no intuition for when to use -거든요 versus -잖아요, or whether to attach 은/는 versus 이/가.',
        'Without applying grammar directly inside conversational dialogues, grammatical knowledge remains theoretical and hard to deploy during real interactions.'
      ]
    },
    howItWorks: {
      heading: 'Contextual Grammar Mastery in Talk Korean',
      description: 'Our grammar engine illustrates how each grammatical particle and verb ending alters communicative intent.',
      steps: [
        {
          stepNumber: 1,
          title: 'Contextual Introduction',
          detail: 'Explore a target grammar pattern introduced naturally within a realistic dialogue or story.'
        },
        {
          stepNumber: 2,
          title: 'Pattern Application',
          detail: 'Construct your own sentences utilizing the target grammar structure and test different politeness registers.'
        },
        {
          stepNumber: 3,
          title: 'Detailed Linguistic Analysis',
          detail: 'Our AI engine breaks down stem changes, irregular verbs (ㄷ, ㅂ, ㅅ 불규칙), and provides corrective tips.'
        }
      ]
    },
    features: [
      {
        title: 'Core Particle Visualizer',
        description: 'Understand the critical differences between topic markers (은/는), subject markers (이/가), and object markers (을/를).'
      },
      {
        title: 'Honorific & Politeness Registers',
        description: 'Master formal high polite (하십시오체), informal polite (해요체), and casual intimate (반말) speech levels.'
      },
      {
        title: 'Nuance Comparison Engine',
        description: 'Detailed side-by-side linguistic comparisons of confusing pairs like -는데 vs -지만, and -아서/어서 vs -(으)니까.'
      },
      {
        title: 'Real-Time Error Corrections',
        description: 'Get respectful, encouraging feedback pinpointing awkward particle usage or improper tense agreements.'
      }
    ],
    exampleConversation: {
      scenarioTitle: 'Giving Reasons Using -아서/어서 vs -(으)니까',
      context: 'Explaining why you were late to an afternoon meeting.',
      turns: [
        {
          speaker: 'Colleague',
          korean: '오늘 왜 이렇게 늦게 도착했어요?',
          romanized: 'Oneul wae ireohge neutge dochakhaesseoyo?',
          english: 'Why did you arrive so late today?'
        },
        {
          speaker: 'Learner',
          korean: '비가 많이 와서 지하철이 연착되었어요.',
          romanized: 'Biga mani waseo jihacheori yeonchakdoeeosseoyo.',
          english: 'Because it rained a lot, the subway was delayed.'
        },
        {
          speaker: 'Colleague',
          korean: '아 그랬군요! 날씨가 안 좋으니까 다들 고생하네요.',
          romanized: 'A geuraetgunyo! Nalssiga an joeunikka dadeul gosaenghaneyo.',
          english: 'Ah I see! Because the weather is bad, everyone is having a tough time.'
        }
      ]
    },
    whyAiSection: {
      heading: 'Why Learn Grammar Through Practical Dialogue?',
      paragraphs: [
        'In Korean, grammar endings convey the speaker’s relationship with the listener, their emotional state, and whether the information is new or shared.',
        'Practicing grammar through dialogue teaches you to perceive these communicative nuances instinctively rather than translating word by word.'
      ],
      bulletPoints: [
        {
          title: 'Nuance Intuition',
          text: 'Feel the difference between stating facts and expressing surprise.'
        },
        {
          title: 'Reduced Translation Delay',
          text: 'Stop translating grammar mentally from English word order (SVO) to Korean (SOV).'
        },
        {
          title: 'Immediate Feedback',
          text: 'Instantly correct minor conjugation slips before they turn into fossilized habits.'
        }
      ]
    },
    faq: [
      {
        question: 'What is the hardest part of Korean grammar for beginners?',
        answer: 'Most beginners find particles (은/는 vs 이/가) and verb conjugations across politeness registers the most challenging. Talk Korean provides clear contextual examples of each.'
      },
      {
        question: 'Does Korean have gendered grammar or grammatical gender?',
        answer: 'No. Korean has no grammatical gender for nouns or adjectives. However, it possesses an intricate honorific system reflecting age, social hierarchy, and familiarity.'
      },
      {
        question: 'How do verb endings change meaning in Korean?',
        answer: 'In Korean, the verb always comes at the end of the sentence, and changing the verb suffix can transform a statement into a question, a gentle suggestion, a command, or an exclamation.'
      },
      {
        question: 'Can I ask the AI specific grammar questions?',
        answer: 'Yes. Talk Korean includes dedicated grammar analysis endpoints that explain specific nuances, exceptions, and TOPIK guidelines on demand.'
      }
    ],
    relatedPaths: [
      '/korean-conversation',
      '/korean-vocabulary',
      '/korean-for-beginners',
      '/business-korean'
    ]
  },

  // -------------------------------------------------------------
  // 6. /korean-vocabulary
  // -------------------------------------------------------------
  '/korean-vocabulary': {
    path: '/korean-vocabulary',
    title: 'Korean Vocabulary Practice with AI | Talk Korean',
    description: 'Build practical Korean vocabulary through interactive conversation. Master high-frequency words, K-Culture terms, and onomatopoeia with Talk Korean.',
    h1: 'Korean Vocabulary Practice with AI',
    category: 'core',
    categoryLabel: 'Core Korean Skills',
    parentCategoryName: 'Learn Korean',
    parentCategoryPath: '/korean-conversation',
    heroSubtitle: 'Learn words that native speakers actually use in daily life, anchored in realistic conversations and visual interactive cards.',
    primaryCtaText: 'Start Korean Vocabulary Practice',
    metaKeywords: ['korean vocabulary', 'learn korean words', 'korean flashcards', 'korean onomatopoeia'],
    problemExplanation: {
      heading: 'The Problem with Memorizing Isolated Word Lists',
      paragraphs: [
        'Rote memorization of alphabetical word lists is notoriously inefficient. Learners might remember that "차" means tea, car, or difference, but have no feeling for how collocations, verbs, and particles attach to it.',
        'To truly own a Korean word, you must encounter it within a sentence, hear its native pronunciation, and actively use it in response to a conversational question.'
      ]
    },
    howItWorks: {
      heading: 'Contextual Word Acquisition in Talk Korean',
      description: 'Our vocabulary system pairs interactive flashcards with dynamic conversational application.',
      steps: [
        {
          stepNumber: 1,
          title: 'Interactive Vocabulary Cards',
          detail: 'Explore thematic card sets featuring native pronunciation, syllable breakdown, and authentic sample sentences.'
        },
        {
          stepNumber: 2,
          title: 'Onomatopoeia & Mimetic Words',
          detail: 'Master unique Korean expressive words like 반짝반짝 (twinkling) and 뚝딱뚝딱 (quickly crafting) that enrich everyday speech.'
        },
        {
          stepNumber: 3,
          title: 'Conversational Integration',
          detail: 'Use newly learned vocabulary immediately inside roleplay scenarios to cement long-term memory retention.'
        }
      ]
    },
    features: [
      {
        title: 'High-Frequency Thematic Sets',
        description: 'Curated vocabulary organized by real-world topics: food, travel, emotions, daily routines, and workplace.'
      },
      {
        title: 'Onomatopoeia & Mimetic Words',
        description: 'Explore over 30 expressive Korean 의성어 and 의태어 words with sound audio and situational cultural tips.'
      },
      {
        title: 'Daily Vocab Quizzes (+15 CR)',
        description: 'Complete interactive 4-choice vocabulary challenges daily to reinforce memory and earn study credits.'
      },
      {
        title: 'Modern Slang & Buzzwords',
        description: 'Learn trending Korean neologisms (신조어) like 뇌피셜, 내돈내산, and 갓생 used across Korean social media.'
      }
    ],
    exampleConversation: {
      scenarioTitle: 'Discussing Weather Using Korean Expressive Words',
      context: 'Talking about a rainy afternoon with a friend.',
      turns: [
        {
          speaker: 'Friend',
          korean: '밖을 보니 비가 주룩주룩 내리고 있네요.',
          romanized: 'Bakkeul boni biga juruk-juruk naerigo itneyo.',
          english: 'Looking outside, the rain is pouring down steadily.'
        },
        {
          speaker: 'Learner',
          korean: '비 오는 날에는 따뜻한 파전이 생각나요.',
          romanized: 'Bi oneun nareneun ttatteut-han pajeoni saeng-gaknayo.',
          english: 'On rainy days, I always crave warm green onion pancakes.'
        },
        {
          speaker: 'Friend',
          korean: '좋은 생각이에요! 저녁에 같이 먹으러 가요.',
          romanized: 'Joeun saeng-gak-ieyo! Jeonyeoge gachi meogeureo gayo.',
          english: 'Great idea! Let us go eat together this evening.'
        }
      ]
    },
    whyAiSection: {
      heading: 'Why Spaced Conversational Repetition Works',
      paragraphs: [
        'Studies in second-language acquisition show that learners must encounter a new word in context between 7 and 12 times before it enters active working memory.',
        'By combining card reviews with responsive conversational dialogues, Talk Korean provides the natural encounters needed for effortless word recall.'
      ],
      bulletPoints: [
        {
          title: 'Contextual Retrieval',
          text: 'Retrieve words naturally when triggered by dialogue context instead of flashcards.'
        },
        {
          title: 'Collocation Learning',
          text: 'Learn verbs and nouns together as natural pairs (e.g., 약을 먹다, not 약을 마시다).'
        },
        {
          title: 'Active Production',
          text: 'Vocalize new vocabulary immediately to strengthen neural connections.'
        }
      ]
    },
    faq: [
      {
        question: 'How many Korean words do I need to know for basic conversation?',
        answer: 'Knowing approximately 800 to 1,200 high-frequency Korean words and basic grammar patterns allows you to handle over 75% of everyday conversational situations.'
      },
      {
        question: 'What are onomatopoeia and mimetic words in Korean?',
        answer: 'Korean is exceptionally rich in sound-symbolic words (의성어, sounds) and manner-symbolic words (의태어, movements and feelings), such as 반짝반짝 (sparkling) or 두근두근 (heart pounding).'
      },
      {
        question: 'How does Talk Korean test my vocabulary retention?',
        answer: 'Through daily interactive 4-choice quizzes, fill-in-the-blank dictations, and responsive conversational prompts that check if you can use the word accurately.'
      },
      {
        question: 'Can I learn Sino-Korean roots (Hanja)?',
        answer: 'Yes. Many vocabulary explanations highlight core root words (like 학 for learning in 학생, 학교, 학원) to help you decode hundreds of related terms easily.'
      }
    ],
    relatedPaths: [
      '/korean-grammar-practice',
      '/korean-for-beginners',
      '/daily-korean-conversation',
      '/restaurant-korean'
    ]
  },

  // -------------------------------------------------------------
  // 7. /korean-for-beginners
  // -------------------------------------------------------------
  '/korean-for-beginners': {
    path: '/korean-for-beginners',
    title: 'Korean for Beginners | AI Korean Practice | Talk Korean',
    description: 'Start learning Korean from scratch. Master the Hangul alphabet, essential beginner phrases, polite greetings, and basic daily conversations with Talk Korean.',
    h1: 'Korean for Beginners',
    category: 'core',
    categoryLabel: 'Core Korean Skills',
    parentCategoryName: 'Learn Korean',
    parentCategoryPath: '/korean-conversation',
    heroSubtitle: 'A friendly, step-by-step introduction to reading Hangul, speaking basic greetings, and holding your very first Korean conversations.',
    primaryCtaText: 'Start Beginner Korean Practice',
    metaKeywords: ['korean for beginners', 'learn hangul', 'beginner korean conversation', 'basic korean phrases'],
    problemExplanation: {
      heading: 'The First Steps in Korean Can Feel Overwhelming',
      paragraphs: [
        'Many beginners want to speak Korean right away but feel intimidated by the Hangul writing system, unfamiliar sounds, and complex social etiquette rules.',
        'Relying solely on English romanization leads to inaccurate pronunciation and slows down your long-term progress. Beginners need a structured, supportive environment that introduces reading, listening, and speaking together in small, digestible steps.'
      ]
    },
    howItWorks: {
      heading: 'The 3-Step Beginner Journey in Talk Korean',
      description: 'From your first Hangul syllable block to your first spoken dialogue in Korea.',
      steps: [
        {
          stepNumber: 1,
          title: 'Master Hangul Alphabet & Stroke Order',
          detail: 'Learn consonants, vowels, and syllable assembly through interactive visual tracing and audio cards.'
        },
        {
          stepNumber: 2,
          title: 'Learn Essential Survival Phrases',
          detail: 'Practice high-utility phrases for saying hello, thank you, ordering items, and asking for directions.'
        },
        {
          stepNumber: 3,
          title: 'Complete Your First AI Roleplay',
          detail: 'Step into gentle beginner roleplays with full romanization and English translations available at all times.'
        }
      ]
    },
    features: [
      {
        title: 'Interactive Hangul Assembler',
        description: 'Combine initial consonants (초성), vowels (중성), and final consonants (종성) to see and hear how blocks are built.'
      },
      {
        title: 'Stroke Tracing Practice',
        description: 'Interactive stroke-by-stroke handwriting guide ensuring you write Hangul cleanly and in proper order.'
      },
      {
        title: 'Beginner-Friendly Audio Support',
        description: 'Crystal-clear native audio with romanized guides so you always know how each phrase is pronounced.'
      },
      {
        title: 'Safe First Conversations',
        description: 'Gentle, forgiving AI dialogues that guide you with suggested reply buttons whenever you need help.'
      }
    ],
    exampleConversation: {
      scenarioTitle: 'First Introduction at a Meetup',
      context: 'Introducing your name and nationality for the first time.',
      turns: [
        {
          speaker: 'Native Tutor (지우)',
          korean: '안녕하세요! 저는 지우예요. 이름이 뭐예요?',
          romanized: 'Annyeonghaseyo! Jeoneun Ji-uyeoyo. Ireumi mwoyeyo?',
          english: 'Hello! I am Ji-woo. What is your name?'
        },
        {
          speaker: 'Beginner Learner',
          korean: '안녕하세요! 저는 마이클이에요. 미국 사람이에요.',
          romanized: 'Annyeonghaseyo! Jeoneun maikeul-ieyo. Miguk saram-ieyo.',
          english: 'Hello! I am Michael. I am American.'
        },
        {
          speaker: 'Native Tutor (지우)',
          korean: '만나서 반가워요, 마이클 씨! 한국어 공부 파이팅!',
          romanized: 'Mannaseo bangawoyo, maikeul ssi! Hangugeo gongbu paiting!',
          english: 'Nice to meet you, Michael! Good luck with your Korean study!'
        }
      ]
    },
    whyAiSection: {
      heading: 'Why Beginners Thrive with Talk Korean',
      paragraphs: [
        'Beginning a new language can trigger performance anxiety. Practicing with an AI allows beginners to repeat simple phrases dozens of times without worrying about wasting a teacher’s time.',
        'With immediate positive encouragement and scaffolded support, beginners build speaking confidence from their very first day.'
      ],
      bulletPoints: [
        {
          title: 'Zero Intimidation',
          text: 'Practice at your own speed without pressure or embarrassment.'
        },
        {
          title: 'Scaffolded Assistance',
          text: 'Use suggested replies and romanized guides whenever you need a hint.'
        },
        {
          title: 'Real Speaking from Day One',
          text: 'Start saying practical phrases out loud immediately instead of waiting months.'
        }
      ]
    },
    faq: [
      {
        question: 'Is Hangul difficult to learn for English speakers?',
        answer: 'No. Created by King Sejong in 1443, Hangul is one of the most logical and scientific writing systems in the world. Most learners master reading basic Hangul within 2 to 3 hours.'
      },
      {
        question: 'Can I start using Talk Korean if I know zero Korean?',
        answer: 'Yes! Step 1 of our Study Board begins with the Hangul Alphabet and basic stroke tracing, providing full audio support for absolute beginners.'
      },
      {
        question: 'What is the most important phrase to learn first?',
        answer: '안녕하세요 (Hello / How are you) and 감사합니다 (Thank you) are the fundamental greetings that unlock respectful communication in Korea.'
      },
      {
        question: 'How long until a beginner can have a simple conversation?',
        answer: 'With 15 minutes of daily practice using Talk Korean, most beginners can hold simple introductions and order food within 2 to 3 weeks.'
      }
    ],
    relatedPaths: [
      '/korean-conversation',
      '/korean-vocabulary',
      '/daily-korean-conversation',
      '/korean-speaking-practice'
    ]
  },

  // -------------------------------------------------------------
  // 8. /learn-korean-speaking
  // -------------------------------------------------------------
  '/learn-korean-speaking': {
    path: '/learn-korean-speaking',
    title: 'Learn Korean Speaking with AI | Talk Korean',
    description: 'Learn to speak Korean through active verbal training. Shift from passive study to conversational fluency with AI roleplays and pronunciation feedback.',
    h1: 'Learn to Speak Korean with AI',
    category: 'core',
    categoryLabel: 'Core Korean Skills',
    parentCategoryName: 'Learn Korean',
    parentCategoryPath: '/korean-conversation',
    heroSubtitle: 'A speech-first approach designed to transform passive knowledge into spontaneous, fluent spoken Korean.',
    primaryCtaText: 'Start Learning to Speak Korean',
    metaKeywords: ['learn korean speaking', 'how to speak korean', 'fluent korean speaking', 'korean speaking course'],
    problemExplanation: {
      heading: 'The Gap Between Knowing Korean and Speaking Korean',
      paragraphs: [
        'Many learners understand K-drama dialogues and pass grammar quizzes, but find themselves completely tongue-tied when having to speak with a native Korean.',
        'Traditional language apps focus heavily on multiple-choice taps and passive translation. Speaking requires motor coordination, fast phrase retrieval, and confidence under conversational pacing.'
      ]
    },
    howItWorks: {
      heading: 'The Speech-First Learning Methodology',
      description: 'Talk Korean prioritizes vocal output at every stage of your study path.',
      steps: [
        {
          stepNumber: 1,
          title: 'Hear the Native Phrasing',
          detail: 'Listen to native spoken cadence and observe how words blend naturally in connected speech.'
        },
        {
          stepNumber: 2,
          title: 'Shadow & Vocalize',
          detail: 'Repeat the sentence aloud, matching the speaker’s pitch, vowel lengths, and emotional nuance.'
        },
        {
          stepNumber: 3,
          title: 'Engage in Freeform Response',
          detail: 'Answer open-ended questions using your own words, receiving immediate feedback on your naturalness.'
        }
      ]
    },
    features: [
      {
        title: 'Speech Shadowing Drills',
        description: 'Practice synchronous shadowing to match the natural speed and rhythm of native Seoul speakers.'
      },
      {
        title: 'Open-Ended Conversational Prompts',
        description: 'Answer authentic situational questions that challenge you to formulate thoughts in Korean on the fly.'
      },
      {
        title: 'Speech Rate Calibration',
        description: 'Train your speech pacing gradually from deliberate beginner rates to full native conversational tempo.'
      },
      {
        title: 'Real-World Roleplay Situations',
        description: 'Immerse yourself in authentic Korean environments: ordering K-BBQ, navigating subways, and making friends.'
      }
    ],
    exampleConversation: {
      scenarioTitle: 'Asking for Help at an Information Desk',
      context: 'Speaking with an attendant at Incheon International Airport.',
      turns: [
        {
          speaker: 'Attendant',
          korean: '무엇을 도와드릴까요, 손님?',
          romanized: 'Mueos-eul dowadeurilkkayo, sonnim?',
          english: 'How may I help you, customer?'
        },
        {
          speaker: 'Learner',
          korean: '서울역으로 가는 공항철도는 어디서 타나요?',
          romanized: 'Seoul-yeok-euro ganeun gonghangcheoldoneun eodiseo tanayo?',
          english: 'Where do I take the airport railroad going to Seoul Station?'
        },
        {
          speaker: 'Attendant',
          korean: '지하 1층으로 내려가시면 바로 탑승하실 수 있습니다.',
          romanized: 'Jiha il-cheung-euro naeryeogasimyeon baro tapseunghasil su isseumnida.',
          english: 'If you go down to basement level 1, you can board right away.'
        }
      ]
    },
    whyAiSection: {
      heading: 'Why Active Speaking Replaces Passive Study',
      paragraphs: [
        'When you speak a sentence aloud, your brain coordinates motor memory, auditory monitoring, and linguistic syntax simultaneously.',
        'This multi-sensory reinforcement builds durable neural pathways, allowing you to recall phrases effortlessly when you travel to Korea or converse with Korean friends.'
      ],
      bulletPoints: [
        {
          title: 'Active Retrieval',
          text: 'Force your brain to produce language rather than merely recognizing it.'
        },
        {
          title: 'Real-Time Reaction Speed',
          text: 'Learn to answer in seconds instead of pausing to translate.'
        },
        {
          title: 'Spoken Fluency Confidence',
          text: 'Overcome self-doubt by holding real conversations every single day.'
        }
      ]
    },
    faq: [
      {
        question: 'Can I learn to speak Korean without living in Korea?',
        answer: 'Yes. With AI conversational roleplays, native audio listening, and daily speaking practice, you can build strong speaking reflexes from anywhere in the world.'
      },
      {
        question: 'How is this different from memorizing a phrasebook?',
        answer: 'A phrasebook teaches static sentences that you may forget. Talk Korean engages you in dynamic dialogues where you must listen and react spontaneously.'
      },
      {
        question: 'Does this app help with natural intonation?',
        answer: 'Yes. Our speech audio and feedback train you to speak with natural Korean melodic pitch rather than flat, monotonic syllable delivery.'
      },
      {
        question: 'How quickly will I see improvement in speaking?',
        answer: 'Learners who practice speaking aloud for 15 minutes daily typically report feeling markedly more confident within two to three weeks.'
      }
    ],
    relatedPaths: [
      '/korean-speaking-practice',
      '/ai-korean-conversation',
      '/korean-roleplay',
      '/daily-korean-conversation'
    ]
  },

  // -------------------------------------------------------------
  // 9. /ai-korean-tutor
  // -------------------------------------------------------------
  '/ai-korean-tutor': {
    path: '/ai-korean-tutor',
    title: 'AI Korean Tutor for Conversation Practice | Talk Korean',
    description: 'Practice Korean with your personal AI tutor. Get 1:1 conversation practice, grammar corrections, culturally authentic feedback, and personalized guidance.',
    h1: 'Your AI Korean Tutor for Conversation Practice',
    category: 'core',
    categoryLabel: 'Core Korean Skills',
    parentCategoryName: 'Learn Korean',
    parentCategoryPath: '/korean-conversation',
    heroSubtitle: 'An encouraging, intelligent AI companion that listens attentively, answers questions, and guides your Korean speaking journey 24/7.',
    primaryCtaText: 'Practice with AI Korean Tutor',
    metaKeywords: ['ai korean tutor', 'korean tutor app', 'practice korean with ai', 'personal korean teacher'],
    problemExplanation: {
      heading: 'The High Cost and Inconvenience of Private Tutoring',
      paragraphs: [
        'Hiring a private native Korean tutor typically costs $25 to $50 per hour and requires scheduling days in advance. Many learners cannot afford multiple weekly sessions or feel nervous during human lessons.',
        'An AI conversation tutor provides a complementary practice partner that is always available, endlessly patient, and tailored to your personal learning pace.'
      ]
    },
    howItWorks: {
      heading: 'How Your AI Korean Tutor Supports You',
      description: 'Your AI tutor adapts to your skill level, whether you need gentle beginner guidance or advanced cultural nuances.',
      steps: [
        {
          stepNumber: 1,
          title: 'Start a Free Talk or Scenario',
          detail: 'Choose an open-ended conversation topic or select a targeted situational challenge.'
        },
        {
          stepNumber: 2,
          title: 'Express Yourself Naturally',
          detail: 'Type or speak in Korean. Ask questions about vocabulary, sentence structures, or Korean customs.'
        },
        {
          stepNumber: 3,
          title: 'Receive Encouraging Guidance',
          detail: 'Your tutor responds in natural Korean, accompanied by romanization, translation, and encouraging constructive tips.'
        }
      ]
    },
    features: [
      {
        title: 'Adaptive Learning Persona',
        description: 'Tutor Ji-woo speaks warmly in natural, polite Korean (해요체) and adjusts sentence complexity to your level.'
      },
      {
        title: 'Instant Explanations on Demand',
        description: 'Ask "이 표현이 자연스러운가요?" (Is this expression natural?) and get immediate linguistic guidance.'
      },
      {
        title: 'Cultural Etiquette Tips',
        description: 'Learn crucial etiquette advice, such as two-handed pouring, bowing angles, and honorific age terms.'
      },
      {
        title: 'Suggested Follow-Up Replies',
        description: 'Every AI response includes 3 natural response ideas so your conversation never stalls.'
      }
    ],
    exampleConversation: {
      scenarioTitle: 'Asking Tutor Ji-woo for Travel Advice',
      context: 'Consulting your AI tutor about places to visit in Seoul.',
      turns: [
        {
          speaker: 'AI Tutor (지우)',
          korean: '서울 여행 계획 중이시군요! 어떤 분위기의 장소를 좋아하세요?',
          romanized: 'Seoul yeohaeng gyehoek jung-isigunyo! Eotteon bunwigieui jangsoreul joahaseyo?',
          english: 'You are planning a trip to Seoul! What kind of atmosphere do you like?'
        },
        {
          speaker: 'Learner',
          korean: '전통적인 분위기와 맛있는 길거리 음식이 있는 곳이 좋아요.',
          romanized: 'Jeontongjeogin bunwigiwa masinneun gilgeori eomsigi inneun gosi joayo.',
          english: 'I like places with traditional atmosphere and delicious street food.'
        },
        {
          speaker: 'AI Tutor (지우)',
          korean: '그렇다면 종로의 인사동과 광장시장을 강력 추천해 드려요!',
          romanized: 'Geureotamyeon jongnoeui insadong-gwa gwangjangsijang-eul gangryeok chucheonhae deuryeoyo!',
          english: 'In that case, I strongly recommend Insa-dong and Gwangjang Market in Jongno!'
        }
      ]
    },
    whyAiSection: {
      heading: 'The Complementary Power of AI Tutoring',
      paragraphs: [
        'While AI tutors do not replace professional human educators for comprehensive academic certification, they offer an unparalleled tool for daily conversational reinforcement.',
        'You can practice late at night, test new slang phrases, and ask basic grammar questions repeatedly without hesitation.'
      ],
      bulletPoints: [
        {
          title: 'Always Ready',
          text: 'Practice at any hour of the day or night with zero scheduling.'
        },
        {
          title: 'Patience Without Limits',
          text: 'Repeat the exact same dialogue turn twenty times until you feel confident.'
        },
        {
          title: 'Affordable Fluency',
          text: 'Gain hours of interactive conversational practice for a fraction of human tutor fees.'
        }
      ]
    },
    faq: [
      {
        question: 'Does the AI Korean tutor replace human teachers?',
        answer: 'No. The AI tutor serves as an accessible daily practice partner to build speaking reflexes and confidence between or alongside formal Korean classes.'
      },
      {
        question: 'Can the tutor explain grammar rules in English?',
        answer: 'Yes. Every response includes English translations and clear English explanations of grammatical nuances.'
      },
      {
        question: 'What speech style does the AI tutor use?',
        answer: 'Tutor Ji-woo default uses natural polite Korean (존댓말, 해요체), which is the standard, respectful speech style used among adults in Korea.'
      },
      {
        question: 'Can I practice preparing for the TOPIK speaking test?',
        answer: 'Yes, practicing spontaneous responses to conversational questions builds the cognitive agility required for TOPIK speaking tasks.'
      }
    ],
    relatedPaths: [
      '/ai-korean-conversation',
      '/korean-speaking-practice',
      '/korean-roleplay',
      '/korean-conversation'
    ]
  },

  // -------------------------------------------------------------
  // 10. /ai-korean-conversation
  // -------------------------------------------------------------
  '/ai-korean-conversation': {
    path: '/ai-korean-conversation',
    title: 'AI Korean Conversation Practice | Talk Korean',
    description: 'Experience real-time AI Korean conversation practice. Converse freely with realistic Korean roleplays, instant corrections, and native speech audio.',
    h1: 'Practice Korean Conversation with AI',
    category: 'core',
    categoryLabel: 'Core Korean Skills',
    parentCategoryName: 'Learn Korean',
    parentCategoryPath: '/korean-conversation',
    heroSubtitle: 'Engage in fluid, realistic Korean conversations powered by modern conversational AI that understands your intent and responds naturally.',
    primaryCtaText: 'Start AI Korean Conversation',
    metaKeywords: ['ai korean conversation', 'real-time korean chat', 'ai korean language partner', 'conversational ai korean'],
    problemExplanation: {
      heading: 'Moving Beyond Canned Dialogue Scripts',
      paragraphs: [
        'Traditional language software relies on scripted multiple-choice dialogue trees. If you reply with an unexpected answer, the app breaks or forces you down a predetermined path.',
        'Real human conversations are unpredictable. An effective conversation practice tool must understand unexpected questions, colloquial slang, and grammar imperfections without breaking character.'
      ]
    },
    howItWorks: {
      heading: 'How Modern AI Powers Conversational Fluidity',
      description: 'Our system analyzes your speech in real time, maintains persistent dialogue memory, and crafts organic native responses.',
      steps: [
        {
          stepNumber: 1,
          title: 'Contextual Dialogue Memory',
          detail: 'The AI retains full memory of previous turns so it never asks for your destination or name twice.'
        },
        {
          stepNumber: 2,
          title: 'Intent Understanding',
          detail: 'Even if your Korean has minor particle errors, the AI grasps your meaning and models the correct phrasing in its reply.'
        },
        {
          stepNumber: 3,
          title: 'Dynamic Suggested Replies',
          detail: 'At every turn, receive 3 contextually logical suggested replies you can click to keep the dialogue flowing smoothly.'
        }
      ]
    },
    features: [
      {
        title: 'Persistent Scenario Context',
        description: 'Full multi-turn dialogue memory ensures logical conversational progression from start to finish.'
      },
      {
        title: 'Authentic Cultural Personas',
        description: 'Converse with diverse personas: an experienced Seoul taxi driver, a trendy Hongdae barista, or a market vendor.'
      },
      {
        title: 'Bilingual Feedback Blocks',
        description: 'Read Korean feedback and encouraging English grammar notes alongside every conversational exchange.'
      },
      {
        title: 'Audio Autoplay & Replay',
        description: 'Listen to every turn automatically with native voice synthesis and review your own voice recordings.'
      }
    ],
    exampleConversation: {
      scenarioTitle: 'Seoul Taxi Ride & Route Discussion',
      context: 'Directing a Seoul taxi driver during rush hour.',
      turns: [
        {
          speaker: 'Taxi Driver',
          korean: '어서 오세요! 어디로 모실까요? 손님, 목적지를 말씀해 주세요.',
          romanized: 'Eoseo oseyo! Eodiro mosilkkayo? Sonnim, mokjeokji-reul malsseum-hae juseyo.',
          english: 'Welcome! Where may I take you? Passenger, please tell me your destination.'
        },
        {
          speaker: 'Learner',
          korean: '강남역 4번 출구로 가주세요. 조금 급해요!',
          romanized: 'Gangnam-yeok sabeon chulguro gajuseyo. Jogeum geuphaeyo!',
          english: 'Please take me to Gangnam Station Exit 4. I am in a bit of a hurry!'
        },
        {
          speaker: 'Taxi Driver',
          korean: '네 알겠습니다! 네비 우회도로로 가장 빠른 길로 안내해 드릴게요.',
          romanized: 'Ne algesseumnida! Nebi uhoedoro-ro gajang ppareun gillo annaehae deurilgeyo.',
          english: 'Understood! I will take the fastest bypass route on navigation.'
        }
      ]
    },
    whyAiSection: {
      heading: 'The Power of Adaptive Dialogue Training',
      paragraphs: [
        'By simulating realistic conversational unpredictability, AI conversation trains you to listen attentively rather than reciting memorized scripts.',
        'You build the mental flexibility to handle real-life Korean conversations where native speakers use slang, ask follow-ups, and react warmly to your comments.'
      ],
      bulletPoints: [
        {
          title: 'Unscripted Freedom',
          text: 'Say whatever you want in Korean and receive a logical, in-character response.'
        },
        {
          title: 'Consistent Dialogue Flow',
          text: 'Experience conversations that feel like real human exchanges.'
        },
        {
          title: 'Continuous Fluency Growth',
          text: 'Expand your vocabulary as the AI introduces natural contextual expressions.'
        }
      ]
    },
    faq: [
      {
        question: 'Does the AI understand spoken Korean with an accent?',
        answer: 'Yes, our speech recognition models are trained on diverse international speaker accents and transcribe foreign learners with high fidelity.'
      },
      {
        question: 'Can I type my responses instead of speaking?',
        answer: 'Yes, you can freely switch between microphone voice input, text typing, or clicking one of the 3 suggested reply options.'
      },
      {
        question: 'What happens if I make a major grammar mistake?',
        answer: 'The AI will still understand your intent, respond politely in character, and provide a helpful grammar tip in the feedback card.'
      },
      {
        question: 'Are the conversations recorded or private?',
        answer: 'Your conversation sessions are processed securely and stored locally in your session state without public exposure.'
      }
    ],
    relatedPaths: [
      '/ai-korean-tutor',
      '/korean-roleplay',
      '/korean-speaking-practice',
      '/korean-conversation'
    ]
  },

  // -------------------------------------------------------------
  // 11. /korean-roleplay
  // -------------------------------------------------------------
  '/korean-roleplay': {
    path: '/korean-roleplay',
    title: 'Korean Roleplay Practice with AI | Talk Korean',
    description: 'Immerse yourself in authentic Korean roleplays. Practice taking taxis, ordering at cafes, convenience store shopping, and casual hangouts with AI.',
    h1: 'Korean Roleplay Practice with AI',
    category: 'core',
    categoryLabel: 'Core Korean Skills',
    parentCategoryName: 'Learn Korean',
    parentCategoryPath: '/korean-conversation',
    heroSubtitle: 'Step into real-life Korean scenarios and practice what to say before you ever set foot in a Seoul shop or subway station.',
    primaryCtaText: 'Start Korean Roleplay Practice',
    metaKeywords: ['korean roleplay', 'situational korean', 'korean dialogue practice', 'roleplay korean conversations'],
    problemExplanation: {
      heading: 'Why Situational Context Matters in Korean',
      paragraphs: [
        'Language is deeply tied to physical and social settings. In a Korean convenience store, you need phrases for 1+1 promotions, plastic bags, and transit card recharges. In a traditional market, you need friendly conversational warmth with market aunties.',
        'Practicing without situational context leaves learners unprepared for the fast-paced, specific vocabulary used in everyday Korean commercial and social venues.'
      ]
    },
    howItWorks: {
      heading: 'Authentic Situational Immersion in Talk Korean',
      description: 'Choose from 11 distinct Korean scenarios modeled on real-life Seoul venues.',
      steps: [
        {
          stepNumber: 1,
          title: 'Choose Your Venue',
          detail: 'Select from taxis, Hongdae cafes, GS25 convenience stores, Korean BBQ spots, pharmacies, subways, and karaoke rooms.'
        },
        {
          stepNumber: 2,
          title: 'Review Key Vocabulary',
          detail: 'Inspect essential vocabulary cards for the scenario before entering the dialogue.'
        },
        {
          stepNumber: 3,
          title: 'Complete the Interaction',
          detail: 'Navigate the complete transaction from initial greeting to payment and farewell, earning XP and completion badges.'
        }
      ]
    },
    features: [
      {
        title: '11 Immersive Roleplay Scenarios',
        description: 'Comprehensive coverage spanning travel, dining, daily lifestyle, and casual social encounters.'
      },
      {
        title: 'Authentic Character Voices & Emojis',
        description: 'Interact with distinct native personas each with their own unique customer service speech style and tone.'
      },
      {
        title: 'Branching Tree & Freeform Modes',
        description: 'Switch between structured branching decision trees and open-ended generative AI mode at any time.'
      },
      {
        title: 'Achievement Badges & Rewards',
        description: 'Earn experience points (XP) and unlock scenario mastery badges as you complete dialogue paths.'
      }
    ],
    exampleConversation: {
      scenarioTitle: 'Ordering at a GS25 Convenience Store',
      context: 'Buying snacks and recharging a T-money transit card.',
      turns: [
        {
          speaker: 'Cashier (편의점 직원)',
          korean: '어서오세요! GS25입니다. 필요한 물건 있으시면 말씀해 주세요!',
          romanized: 'Eoseo-oseyo! GS25-imnida. Piryo-hasin mulgeon isseusimyeon malsseum-hae juseyo!',
          english: 'Welcome! This is GS25. Let me know if you need anything!'
        },
        {
          speaker: 'Learner',
          korean: '티머니 카드 만 원 충전해 주시고, 봉투도 하나 주세요.',
          romanized: 'Timoni kadeu man won chungjeonhae jusigo, bongtudo hana juseyo.',
          english: 'Please recharge 10,000 won on my T-money card, and give me a bag too.'
        },
        {
          speaker: 'Cashier (편의점 직원)',
          korean: '네, 카드를 단말기에 올려주세요. 봉투는 종량제 봉투로 드릴까요?',
          romanized: 'Ne, kadeureul danmalgie ollyeojuseyo. Bongtuneun jongnyangje bongturo deurilkkayo?',
          english: 'Sure, please place your card on the terminal. Would you like a standard trash bag?'
        }
      ]
    },
    whyAiSection: {
      heading: 'Why Roleplaying Builds Real Travel Readiness',
      paragraphs: [
        'Roleplay creates a mental blueprint. When you encounter the same scenario in Korea, your brain recognizes the visual and auditory cues and retrieves the appropriate phrasing effortlessly.',
        'You transform theoretical vocabulary into practical survival skills.'
      ],
      bulletPoints: [
        {
          title: 'Anxiety Inoculation',
          text: 'Practice high-pressure situations like ordering food before arriving in Korea.'
        },
        {
          title: 'Specialized Jargon Mastery',
          text: 'Learn venue-specific terms that rarely appear in standard textbooks.'
        },
        {
          title: 'Complete Transaction Practice',
          text: 'Master the whole conversational arc from greeting to final goodbye.'
        }
      ]
    },
    faq: [
      {
        question: 'What scenarios are included in Talk Korean roleplay?',
        answer: 'Our 11 scenarios include Seoul Taxi, Hongdae Cafe, GS25 Convenience Store, Korean BBQ, Coin Noraebang (Karaoke), Metro Station, Pharmacy, Traditional Market, Language Exchange, Restaurant, and 1:1 Free Talk.'
      },
      {
        question: 'Can I do roleplay practice as an absolute beginner?',
        answer: 'Yes! Scenarios feature difficulty ratings from Beginner to Advanced, and beginner scenarios include full romanized guides and suggested response buttons.'
      },
      {
        question: 'Do roleplay scenarios support speech voice input?',
        answer: 'Yes, you can speak directly into your microphone to simulate real verbal interactions in every scenario.'
      },
      {
        question: 'Are Korean payment methods covered in the roleplays?',
        answer: 'Yes, dialogues practice realistic payment phrases including credit cards, Samsung Pay, and transit cards.'
      }
    ],
    relatedPaths: [
      '/korean-conversation',
      '/daily-korean-conversation',
      '/travel-korean',
      '/restaurant-korean'
    ]
  },

  // -------------------------------------------------------------
  // 12. /korean-translation-practice
  // -------------------------------------------------------------
  '/korean-translation-practice': {
    path: '/korean-translation-practice',
    title: 'Korean Translation Practice with AI | Talk Korean',
    description: 'Practice Korean translation in context. Translate between Korean and English with deep grammatical breakdowns, particle analyses, and learning tips.',
    h1: 'Korean Translation Practice with AI',
    category: 'core',
    categoryLabel: 'Core Korean Skills',
    parentCategoryName: 'Learn Korean',
    parentCategoryPath: '/korean-conversation',
    heroSubtitle: 'Deconstruct Korean sentences word by word and understand the cultural context behind every phrase.',
    primaryCtaText: 'Start Korean Translation Practice',
    metaKeywords: ['korean translation practice', 'translate korean to english', 'korean sentence breakdown', 'learn korean translation'],
    problemExplanation: {
      heading: 'The Flaws of Automated Machine Translation',
      paragraphs: [
        'Generic online translation tools give you an English sentence without explaining why words were chosen or how grammar was conjugated. They often misinterpret Korean politeness levels and omit critical cultural nuances.',
        'Learners need an educational translation breakdown that explains particles, verb stems, and idiomatic implications.'
      ]
    },
    howItWorks: {
      heading: 'Deep Educational Translation in Talk Korean',
      description: 'Our translation system combines grammatical parsing with cultural context tips.',
      steps: [
        {
          stepNumber: 1,
          title: 'Submit Korean Text',
          detail: 'Enter any Korean sentence from a K-pop lyric, drama, or study book.'
        },
        {
          stepNumber: 2,
          title: 'Detailed Grammatical Breakdown',
          detail: 'View a term-by-term breakdown explaining root verbs, attached particles, and tense markers.'
        },
        {
          stepNumber: 3,
          title: 'Cultural Context & Pronunciation Tips',
          detail: 'Read curated pedagogical notes detailing formality levels, historical roots, and pronunciation advice.'
        }
      ]
    },
    features: [
      {
        title: 'Syllable-by-Syllable Breakdown',
        description: 'See exactly how complex sentences are formed from root verbs and agglutinative particles.'
      },
      {
        title: 'Politeness Level Classification',
        description: 'Identify whether the text is written in formal, polite, or casual register.'
      },
      {
        title: 'Romanization & Audio Playback',
        description: 'Listen to the natural spoken cadence of every translated sentence at adjustable speeds.'
      },
      {
        title: 'Idiomatic & Slang Decoding',
        description: 'Understand modern Korean internet slang and idioms that confuse standard translation engines.'
      }
    ],
    exampleConversation: {
      scenarioTitle: 'Deconstructing an Idiomatic Expression',
      context: 'Translating the popular expression "손이 크다" (generous).',
      turns: [
        {
          speaker: 'Student Inquiry',
          korean: '"우리 할머니는 손이 정말 크셔요"의 뜻이 무엇인가요?',
          romanized: 'Uri halmeonineun soni jeongmal keusyeoyo-eui tteusi mueosingayo?',
          english: 'What does "My grandmother has really big hands" mean?'
        },
        {
          speaker: 'AI Translation Tutor',
          korean: '여기서 "손이 크다"는 손의 크기가 아니라, 음식을 넉넉하게 많이 만드시는 후한 인심을 뜻해요!',
          romanized: 'Yeogiseo soni keudaneun soneui keugiga anira, eumsigeul neongneokhage mani mandeusineun huhan insimeul tteushaeyo!',
          english: 'Here, "손이 크다" does not mean physical hand size, but refers to her generous spirit of cooking abundant food!'
        }
      ]
    },
    whyAiSection: {
      heading: 'Why Contextual Translation Builds Reading Autonomy',
      paragraphs: [
        'Translating sentences by dissecting their grammatical building blocks teaches you how Korean grammar actually fits together.',
        'Over time, you stop relying on English translations and begin parsing Korean sentence structures directly.'
      ],
      bulletPoints: [
        {
          title: 'Structural Clarity',
          text: 'Understand how particles like 은/는 and 을/를 define grammatical roles.'
        },
        {
          title: 'Idiom Mastery',
          text: 'Learn the metaphorical cultural meanings behind Korean body idioms.'
        },
        {
          title: 'Independent Reading',
          text: 'Gain the skills to read social media posts, lyrics, and news articles on your own.'
        }
      ]
    },
    faq: [
      {
        question: 'Does Talk Korean support both English and Korean translation?',
        answer: 'Yes, our dictionary and translation endpoints support analyzing Korean text into English and providing Korean equivalents for English concepts.'
      },
      {
        question: 'Why does Korean word order differ from English?',
        answer: 'English is Subject-Verb-Object (SVO), while Korean is Subject-Object-Verb (SOV). Learning to identify the verb at the very end is key to translation.'
      },
      {
        question: 'Can I translate K-POP song lyrics?',
        answer: 'Yes! Our Lyrics Lab feature provides line-by-line lyric breakdowns, vocabulary notes, and pronunciation scoring for popular K-pop songs.'
      },
      {
        question: 'Does the translator explain honorific endings?',
        answer: 'Yes, it breaks down respectful suffixes like -시- and politer forms of nouns like 댁 (home) and 성함 (name).'
      }
    ],
    relatedPaths: [
      '/korean-grammar-practice',
      '/korean-vocabulary',
      '/korean-expression-practice',
      '/korean-conversation'
    ]
  },

  // -------------------------------------------------------------
  // 13. /korean-expression-practice
  // -------------------------------------------------------------
  '/korean-expression-practice': {
    path: '/korean-expression-practice',
    title: 'Practice Natural Korean Expressions | Talk Korean',
    description: 'Learn and practice natural Korean expressions. Master real-life phrases, conversation fillers, reaction words, and modern colloquial Korean with AI.',
    h1: 'Practice Natural Korean Expressions',
    category: 'core',
    categoryLabel: 'Core Korean Skills',
    parentCategoryName: 'Learn Korean',
    parentCategoryPath: '/korean-conversation',
    heroSubtitle: 'Sound like a real person instead of a textbook. Learn natural Korean conversation fillers, enthusiastic reactions, and everyday idiomatic phrases.',
    primaryCtaText: 'Practice Natural Korean Expressions',
    metaKeywords: ['korean expressions', 'natural korean phrases', 'korean slang and reactions', 'colloquial korean'],
    problemExplanation: {
      heading: 'Why Textbook Phrases Often Sound Stiff in Korea',
      paragraphs: [
        'Foreign learners frequently learn phrases like "안녕하십니까? 저는 미국인입니다." While grammatically flawless, native speakers in casual settings sound much more natural using lively expressions like "진짜요?", "대박!", or "그렇군요!".',
        'Without conversational reactions and natural transition phrases (맞장구), your speech sounds stiff, robotic, and emotionally detached.'
      ]
    },
    howItWorks: {
      heading: 'Acquiring Natural Korean Expressions',
      description: 'Practice high-frequency spoken expressions across realistic conversational dialogues.',
      steps: [
        {
          stepNumber: 1,
          title: 'Learn Native Reactions',
          detail: 'Master essential Korean reaction words (맞장구) like 맞아요, 그렇네요, 대박, and 헐.'
        },
        {
          stepNumber: 2,
          title: 'Use Fillers and Transitions',
          detail: 'Incorporate natural filler words like 있잖아요 (you know), 그러니까 (I mean), and 글쎄요 (well...).'
        },
        {
          stepNumber: 3,
          title: 'Deploy in Live Conversation',
          detail: 'Practice weaving these expressions naturally into turn-by-turn AI conversations to sound relaxed and authentic.'
        }
      ]
    },
    features: [
      {
        title: 'Authentic Reaction Training',
        description: 'Learn how native Koreans actively show interest and empathy during conversations.'
      },
      {
        title: 'Casual vs Polite Equivalents',
        description: 'Know when an expression is safe for polite company and when it should strictly stay among friends.'
      },
      {
        title: 'Trending MZ Buzzwords',
        description: 'Stay culturally up to date with modern slang words featured in K-dramas, variety shows, and YouTube.'
      },
      {
        title: 'Audio Emotion & Pitch Nuance',
        description: 'Hear how pitch variation transforms words like "진짜?" from polite curiosity into shocked disbelief.'
      }
    ],
    exampleConversation: {
      scenarioTitle: 'Reacting to Surprising News with a Friend',
      context: 'Hearing about a friend winning a concert ticket lottery.',
      turns: [
        {
          speaker: 'Friend',
          korean: '나 이번 주말 콘서트 티켓팅 드디어 성공했어!',
          romanized: 'Na ibeon jumal konseoteu tiketing deudieo seong-gonghaesseo!',
          english: 'I finally succeeded in getting concert tickets for this weekend!'
        },
        {
          speaker: 'Learner',
          korean: '대박! 진짜 부럽다. 어떻게 구했어?',
          romanized: 'Daebak! Jinjja bureopda. Eotteohge guhaesseo?',
          english: 'Awesome! I am so jealous. How did you get it?'
        },
        {
          speaker: 'Friend',
          korean: '취소표가 기적처럼 딱 한 자리 떴지 뭐야!',
          romanized: 'Chwisopyoga gijeokcheoreom ttak han jari tteotji mwoya!',
          english: 'A cancellation miraculously popped up with just one seat, of all things!'
        }
      ]
    },
    whyAiSection: {
      heading: 'Why Expressions Create Instant Warmth and Connection',
      paragraphs: [
        'Korean culture places high value on interpersonal harmony (정) and mutual engagement (눈치). Using expressive reactions shows your conversation partner that you are truly listening.',
        'Practicing with Talk Korean helps you internalize these expressive markers until you react instinctively without thinking.'
      ],
      bulletPoints: [
        {
          title: 'Instant Empathy',
          text: 'Make native Korean friends feel comfortable and understood.'
        },
        {
          title: 'Smoother Flow',
          text: 'Fill pauses naturally without resorting to English "um" or "uh".'
        },
        {
          title: 'Cultural Fluency',
          text: 'Demonstrate genuine familiarity with contemporary Korean culture.'
        }
      ]
    },
    faq: [
      {
        question: 'What does "대박" (Daebak) actually mean?',
        answer: 'Originally meaning a huge jackpot or windfall, "대박" is now the universal Korean exclamation for "Awesome!", "Incredible!", or "No way!".'
      },
      {
        question: 'Is it rude to use casual reactions with older people?',
        answer: 'Yes! Words like "대박" or "헐" should be reserved for close friends. In polite company, use "정말요?" (Really?) or "대단하네요!" (That is wonderful!).'
      },
      {
        question: 'What are Korean reaction words called?',
        answer: 'They are called 맞장구 (matjang-gu), referring to the rhythm of actively affirming and nodding along with your conversation partner.'
      },
      {
        question: 'How do I know if an expression is still popular or outdated?',
        answer: 'Talk Korean regularly updates its slang and curated expression databases to ensure you learn modern, active Korean expressions.'
      }
    ],
    relatedPaths: [
      '/korean-conversation',
      '/korean-small-talk',
      '/daily-korean-conversation',
      '/korean-speaking-practice'
    ]
  },

  // -------------------------------------------------------------
  // 14. /korean-conversation-topics
  // -------------------------------------------------------------
  '/korean-conversation-topics': {
    path: '/korean-conversation-topics',
    title: 'Korean Conversation Topics for Practice | Talk Korean',
    description: 'Explore engaging Korean conversation topics. Practice discussions on food, travel, K-pop, weekend plans, hobbies, and Korean culture with AI.',
    h1: 'Korean Conversation Topics for Practice',
    category: 'core',
    categoryLabel: 'Core Korean Skills',
    parentCategoryName: 'Learn Korean',
    parentCategoryPath: '/korean-conversation',
    heroSubtitle: 'Never run out of things to say. Explore curated topic starters spanning personal interests, travel dreams, and contemporary Korean life.',
    primaryCtaText: 'Explore Conversation Topics',
    metaKeywords: ['korean conversation topics', 'korean discussion questions', 'talk about korean culture', 'korean speaking prompts'],
    problemExplanation: {
      heading: 'The Dreaded "What Should We Talk About?" Moment',
      paragraphs: [
        'Even intermediate learners get stuck when conversation drops into awkward silence. Without clear topic prompts and associated vocabulary, conversations stall after simple greetings.',
        'Having structured conversation topics with prepared vocabulary lists and starter questions enables you to practice substantive, engaging discussions.'
      ]
    },
    howItWorks: {
      heading: 'Structured Topic-Based Conversation Practice',
      description: 'Choose a topic, review key concepts, and dive into guided conversational exploration.',
      steps: [
        {
          stepNumber: 1,
          title: 'Select an Inspiring Topic',
          detail: 'Choose from hobbies, Korean cuisine, travel destinations, K-dramas, university life, or career dreams.'
        },
        {
          stepNumber: 2,
          title: 'Inspect Topic Vocabulary',
          detail: 'Review essential terminology and question structures tailored specifically to the chosen topic.'
        },
        {
          stepNumber: 3,
          title: 'Engage in In-Depth Dialogue',
          detail: 'Answer thoughtful follow-up questions from your AI partner and express your personal opinions.'
        }
      ]
    },
    features: [
      {
        title: 'Diverse Curated Themes',
        description: 'Explore dozens of topics: K-POP fandom, traditional holidays (추석, 설날), weekend leisure, and food culture.'
      },
      {
        title: 'Starter Questions for Both Sides',
        description: 'Learn questions you can ask native speakers as well as how to answer when asked yourself.'
      },
      {
        title: 'Opinion & Preference Phrasing',
        description: 'Master phrases for sharing personal viewpoints: 제 생각에는, ~는 편이에요, and ~을 선호해요.'
      },
      {
        title: 'Real-Time Conversational Follow-Ups',
        description: 'Our AI tutor listens to your answers and asks natural follow-up questions to keep the conversation going.'
      }
    ],
    exampleConversation: {
      scenarioTitle: 'Discussing Favorite Korean Foods',
      context: 'Sharing culinary preferences with an AI language exchange partner.',
      turns: [
        {
          speaker: 'AI Partner',
          korean: '한국 음식 중에서 제일 좋아하는 음식이 뭐예요?',
          romanized: 'Hanguk eumsik jung-eseo jeil joahaneun eumsigi mwoyeyo?',
          english: 'Among Korean foods, what is your favorite dish?'
        },
        {
          speaker: 'Learner',
          korean: '저는 매콤한 김치찌개랑 바삭한 파전을 제일 좋아해요.',
          romanized: 'Jeoneun maekomhan gimchijjigaerang basakhan pajeoneul jeil joahaeyo.',
          english: 'I like spicy kimchi stew and crispy green onion pancakes the most.'
        },
        {
          speaker: 'AI Partner',
          korean: '좋은 조합이네요! 매운 음식을 꽤 잘 드시는 편이신가요?',
          romanized: 'Joeun johab-ineyo! Maeun eumsigeul kkwae jal deusineun pyeon-isingayo?',
          english: 'That is a great combination! Do you handle spicy food pretty well?'
        }
      ]
    },
    whyAiSection: {
      heading: 'Why Thematic Practice Expands Vocabulary Horizons',
      paragraphs: [
        'When you practice around a specific theme, related words cluster together in your memory. A discussion about travel naturally activates terms for transportation, hotels, schedules, and sightseeing.',
        'This contextual clustering accelerates fluency and makes vocabulary recall effortless during real-world social gatherings.'
      ],
      bulletPoints: [
        {
          title: 'Depth Over Superficiality',
          text: 'Move past basic greetings into meaningful conversations.'
        },
        {
          title: 'Opinion Articulation',
          text: 'Practice expressing personal viewpoints and explaining why you like something.'
        },
        {
          title: 'Natural Follow-Up Skills',
          text: 'Learn how to keep dialogues alive with reciprocal questions.'
        }
      ]
    },
    faq: [
      {
        question: 'What are good beginner Korean conversation topics?',
        answer: 'Self-introductions, favorite foods, weather, daily morning routines, and hobbies are ideal low-pressure topics for beginners.'
      },
      {
        question: 'How do I say "In my opinion" in Korean?',
        answer: 'You can say "제 생각에는..." (In my thinking...) or "제가 보기에는..." (From what I see...), followed by your thoughts.'
      },
      {
        question: 'Can I discuss K-dramas and K-pop with the AI tutor?',
        answer: 'Yes! Talk Korean features dedicated K-culture modules where you can discuss your favorite artists, shows, and song lyrics.'
      },
      {
        question: 'Are suggested replies available for each topic?',
        answer: 'Yes, every turn provides 3 logical response suggestions so you always have ideas on how to proceed.'
      }
    ],
    relatedPaths: [
      '/korean-conversation',
      '/korean-small-talk',
      '/daily-korean-conversation',
      '/travel-korean'
    ]
  },

  // -------------------------------------------------------------
  // 15. /daily-korean-conversation
  // -------------------------------------------------------------
  '/daily-korean-conversation': {
    path: '/daily-korean-conversation',
    title: 'Daily Korean Conversation Practice | Talk Korean',
    description: 'Master everyday Korean conversation. Practice daily routines, weather chat, weekend plans, polite greetings, and casual dialogues with AI.',
    h1: 'Daily Korean Conversation Practice',
    category: 'situation',
    categoryLabel: 'Practice by Situation',
    parentCategoryName: 'Practice by Situation',
    parentCategoryPath: '/daily-korean-conversation',
    heroSubtitle: 'The essential Korean phrases and conversational exchanges you need every single day when living, studying, or working in Korea.',
    primaryCtaText: 'Start Daily Korean Conversation',
    metaKeywords: ['daily korean conversation', 'everyday korean', 'korean daily phrases', 'routine korean talk'],
    problemExplanation: {
      heading: 'The Gap Between Classroom Korean and Daily Life',
      paragraphs: [
        'Classroom Korean often teaches formal, bookish dialogues that native speakers rarely use at home or with acquaintances. Real daily life revolves around asking if someone has eaten, commenting on the weather, and sharing weekend plans.',
        'Practicing daily conversational exchanges ensures you can smoothly navigate ordinary social encounters without awkwardness.'
      ]
    },
    howItWorks: {
      heading: 'Mastering the Rhythm of Daily Korean Interaction',
      description: 'Practice the high-frequency daily routines that form the bedrock of Korean social life.',
      steps: [
        {
          stepNumber: 1,
          title: 'Morning Greetings & Inquiries',
          detail: 'Practice common daily check-ins like "식사하셨어요?" (Have you eaten?) and "좋은 아침이에요!" (Good morning!).'
        },
        {
          stepNumber: 2,
          title: 'Daily Routine Discussions',
          detail: 'Talk about commuting, work tasks, gym routines, and cooking meals at home.'
        },
        {
          stepNumber: 3,
          title: 'Evening Sign-Offs & Plans',
          detail: 'Wrap up conversations respectfully with warm goodbyes like "수고하셨습니다" and "오늘 하루도 파이팅!".'
        }
      ]
    },
    features: [
      {
        title: 'Everyday Politeness Standards',
        description: 'Understand the everyday polite register (해요체) that native speakers use with neighbors and peers.'
      },
      {
        title: 'Meal Inquiries & Food Culture',
        description: 'Learn why asking "밥 먹었어요?" is a gesture of care and how to respond naturally.'
      },
      {
        title: 'Weather & Seasons Vocabulary',
        description: 'Talk effortlessly about the changing seasons, cold winter winds (칼바람), and warm spring blossoms.'
      },
      {
        title: 'Interactive Daily Phrase Cards',
        description: 'Browse curated daily phrases with audio pronunciation and cultural context tips.'
      }
    ],
    exampleConversation: {
      scenarioTitle: 'Casual Morning Greeting with a Neighbor',
      context: 'Meeting an apartment neighbor near the elevator in the morning.',
      turns: [
        {
          speaker: 'Neighbor',
          korean: '안녕하세요! 출근하시는 길인가 봐요?',
          romanized: 'Annyeonghaseyo! Chulgeunhasineun girin-ga bwayo?',
          english: 'Hello! Looks like you are on your way to work?'
        },
        {
          speaker: 'Learner',
          korean: '네, 안녕하세요! 오늘 날씨가 꽤 쌀쌀하네요.',
          romanized: 'Ne, annyeonghaseyo! Oneul nalssiga kkwae ssalssalhaneyo.',
          english: 'Yes, hello! The weather is quite chilly today.'
        },
        {
          speaker: 'Neighbor',
          korean: '맞아요, 따뜻하게 입고 나가세요. 좋은 하루 보내세요!',
          romanized: 'Majayo, ttatteuthage ipgo nagaseyo. Joeun haru bonaeseyo!',
          english: 'That is right, dress warmly when you go out. Have a wonderful day!'
        }
      ]
    },
    whyAiSection: {
      heading: 'Why Daily Habitual Practice Builds Natural Confidence',
      paragraphs: [
        'Speaking a language requires building automatic cognitive routines. By practicing the same daily check-in exchanges regularly, your responses become instant reflexes.',
        'You stop worrying about grammar particles and start communicating with natural warmth.'
      ],
      bulletPoints: [
        {
          title: 'Effortless Automaticity',
          text: 'Respond to common daily greetings without hesitation.'
        },
        {
          title: 'Cultural Warmth',
          text: 'Understand how simple phrases reflect traditional Korean care and affection.'
        },
        {
          title: 'Daily Consistency',
          text: 'Practice 10 minutes every day to maintain speaking momentum.'
        }
      ]
    },
    faq: [
      {
        question: 'Why do Koreans ask "밥 먹었어요?" (Did you eat?) as a greeting?',
        answer: 'Historically, asking about meals was a sincere way to check on someone\'s well-being. Today, it functions similarly to "How are you doing?" and shows friendly care.'
      },
      {
        question: 'What is the most useful phrase for ending work or school?',
        answer: '"수고하셨습니다" (You worked hard / Thank you for your effort) is the essential expression used when leaving colleagues or concluding an activity.'
      },
      {
        question: 'Can I practice both formal and informal daily conversation?',
        answer: 'Yes, you can practice polite 존댓말 used with acquaintances or casual 반말 used with close friends.'
      },
      {
        question: 'How do I comment on the weather in Korean?',
        answer: 'Common daily phrases include "오늘 날씨 정말 좋네요" (The weather is so nice today) or "오늘 비가 많이 오네요" (It is raining a lot today).'
      }
    ],
    relatedPaths: [
      '/korean-conversation',
      '/korean-small-talk',
      '/korean-speaking-practice',
      '/travel-korean'
    ]
  },

  // -------------------------------------------------------------
  // 16. /travel-korean
  // -------------------------------------------------------------
  '/travel-korean': {
    path: '/travel-korean',
    title: 'Travel Korean Conversation Practice | Talk Korean',
    description: 'Learn practical travel Korean for your trip. Master airport dialogues, taxi directions, subway navigation, hotel check-ins, and emergency phrases.',
    h1: 'Travel Korean Conversation Practice',
    category: 'situation',
    categoryLabel: 'Practice by Situation',
    parentCategoryName: 'Practice by Situation',
    parentCategoryPath: '/daily-korean-conversation',
    heroSubtitle: 'Travel across Seoul, Busan, and Jeju with complete confidence. Practice essential phrases for transit, hotels, directions, and shopping.',
    primaryCtaText: 'Start Travel Korean Practice',
    metaKeywords: ['travel korean', 'korean for travel', 'seoul travel phrases', 'korean taxi phrases', 'korean hotel conversation'],
    problemExplanation: {
      heading: 'The Anxiety of Navigating a Foreign Country Alone',
      paragraphs: [
        'Traveling in Korea is exciting, but being unable to communicate with taxi drivers, ask for directions, or clarify hotel reservations creates unnecessary stress.',
        'While many tourist hubs in Seoul have English signage, interacting in Korean unlocks warmer hospitality, smoother travel, and access to authentic local spots.'
      ]
    },
    howItWorks: {
      heading: 'Practical Transit & Exploration Simulations',
      description: 'Prepare for every stage of your Korean journey through realistic travel roleplays.',
      steps: [
        {
          stepNumber: 1,
          title: 'Airport & Transit Arrival',
          detail: 'Practice purchasing SIM cards, buying T-money transit cards, and asking for the airport express train (AREX).'
        },
        {
          stepNumber: 2,
          title: 'Taxi & Street Directions',
          detail: 'Direct taxi drivers using specific landmark exits and ask pedestrians for directions politely.'
        },
        {
          stepNumber: 3,
          title: 'Hotel Check-in & Inquiries',
          detail: 'Request room keycards, inquire about breakfast hours, and ask for luggage storage.'
        }
      ]
    },
    features: [
      {
        title: 'Seoul Taxi Simulator',
        description: 'Practice telling the driver your destination, requesting fast routes, adjusting air conditioning, and paying with card.'
      },
      {
        title: 'Metro & Bus Navigation Drills',
        description: 'Learn essential station terms: 환승 (transfer), 출구 (exit), and 승강장 (platform).'
      },
      {
        title: 'Hotel & Guesthouse Inquiries',
        description: 'Practice checking in, asking for extra towels, and arranging luggage holding before departure.'
      },
      {
        title: 'Emergency Phrases & Assistance',
        description: 'Essential phrases for seeking medical help at pharmacies, locating restrooms, or reporting lost items.'
      }
    ],
    exampleConversation: {
      scenarioTitle: 'Asking for Luggage Storage at a Hotel',
      context: 'Arriving at a Myeongdong hotel before check-in time.',
      turns: [
        {
          speaker: 'Front Desk Staff',
          korean: '어서오세요, 손님! 체크인 도와드릴까요?',
          romanized: 'Eoseo-oseyo, sonnim! Chekeuin dowadeurilkkayo?',
          english: 'Welcome, guest! Shall I help you with check-in?'
        },
        {
          speaker: 'Traveler',
          korean: '체크인 시간 전에 짐을 먼저 맡길 수 있을까요?',
          romanized: 'Chekeuin sigan jeone jimeul meonjeo matgil su isseulkkayo?',
          english: 'Could I store my luggage first before check-in time?'
        },
        {
          speaker: 'Front Desk Staff',
          korean: '네, 물론입니다! 짐 보관증 드릴 테니 보관증을 잘 챙겨주세요.',
          romanized: 'Ne, mullon-imnida! Jim bogwanjeung deuril teni bogwanjeung-eul jal chaeng-gyeojuseyo.',
          english: 'Yes, of course! I will give you a luggage receipt, so please keep it safe.'
        }
      ]
    },
    whyAiSection: {
      heading: 'Why Roleplaying Travel Situations Guarantees Peace of Mind',
      paragraphs: [
        'When you arrive exhausted after a long flight, trying to remember grammar rules on the spot is stressful.',
        'Practicing travel roleplays in advance cements survival phrases into your memory, so you can direct your taxi or order meals on autopilot.'
      ],
      bulletPoints: [
        {
          title: 'Travel Autonomy',
          text: 'Explore off-the-beaten-path Korean neighborhoods without relying on guided tours.'
        },
        {
          title: 'Warm Local Connections',
          text: 'Receive smiles and complimentary service (서비스) when you make the effort to speak Korean.'
        },
        {
          title: 'Stress-Free Logistics',
          text: 'Navigate transit hubs, tickets, and hotels effortlessly.'
        }
      ]
    },
    faq: [
      {
        question: 'How do I tell a taxi driver my destination in Korean?',
        answer: 'Use the pattern: "[Destination] + (으)로 가주세요." For example, "서울역으로 가주세요" (Please take me to Seoul Station).'
      },
      {
        question: 'How do I ask where the restroom is in Korean?',
        answer: '"화장실이 어디에 있어요?" (Where is the restroom?) is the essential phrase to remember.'
      },
      {
        question: 'Do Korean taxis accept foreign credit cards?',
        answer: 'Yes, nearly all Seoul taxis accept international Visa, MasterCard, and T-money transit cards. You can say "카드로 계산할게요" (I will pay by card).'
      },
      {
        question: 'Is English widely spoken in Korea?',
        answer: 'While young Koreans and staff in major Seoul tourist hubs know basic English, taxi drivers, market vendors, and staff outside central Seoul often speak only Korean.'
      }
    ],
    relatedPaths: [
      '/restaurant-korean',
      '/shopping-korean',
      '/daily-korean-conversation',
      '/korean-roleplay'
    ]
  },

  // -------------------------------------------------------------
  // 17. /restaurant-korean
  // -------------------------------------------------------------
  '/restaurant-korean': {
    path: '/restaurant-korean',
    title: 'Korean Restaurant Conversation Practice | Talk Korean',
    description: 'Order food like a local in Korea. Practice ordering barbecue, asking for menu recommendations, requesting side dish refills, and paying the bill.',
    h1: 'Korean Restaurant Conversation Practice',
    category: 'situation',
    categoryLabel: 'Practice by Situation',
    parentCategoryName: 'Practice by Situation',
    parentCategoryPath: '/daily-korean-conversation',
    heroSubtitle: 'Order mouth-watering Korean meals with complete confidence. Practice table seatings, ordering meat portions, side-dish refills, and paying the bill.',
    primaryCtaText: 'Start Restaurant Korean Practice',
    metaKeywords: ['restaurant korean', 'order food in korean', 'korean barbecue ordering', 'korean food phrases'],
    problemExplanation: {
      heading: 'The Intimidation of Korean Dining Etiquette',
      paragraphs: [
        'Korean restaurants have unique dining customs: meat is ordered by number of servings (인분), side dishes (반찬) are complimentary and refillable, and calling the waiter requires ringing a table bell or calling out "여기요!".',
        'Many foreign visitors end up pointing at pictures silently because they are unsure how to ask for recommendations, request water, or pay at the front counter.'
      ]
    },
    howItWorks: {
      heading: 'Complete Restaurant Flow in Talk Korean',
      description: 'Simulate the full dining experience from entering the restaurant to paying your bill.',
      steps: [
        {
          stepNumber: 1,
          title: 'Seating & Group Size',
          detail: 'Tell the staff your party size: "두 명이에요" (Two people) or "세 명 자리 있나요?" (Is there a table for three?).'
        },
        {
          stepNumber: 2,
          title: 'Ordering Dishes & Customizations',
          detail: 'Order servings of meat, request spice adjustments, and order drinks.'
        },
        {
          stepNumber: 3,
          title: 'Side Dish Refills & Checkout',
          detail: 'Politely ask for more kimchi, request the bill, and complete payment at the counter.'
        }
      ]
    },
    features: [
      {
        title: 'Portion & Counter System (인분)',
        description: 'Learn to use correct Korean counters for servings (1인분, 2인분) and bottles (한 병, 두 병).'
      },
      {
        title: 'Dietary & Spice Guidance',
        description: 'Phrases for requesting less spicy food (덜 맵게 해주세요) or checking for ingredients.'
      },
      {
        title: 'Complimentary Refills (리필)',
        description: 'How to politely ask for extra side dishes: "반찬 좀 더 주시겠어요?".'
      },
      {
        title: 'Table Etiquette & Bells',
        description: 'Know when to call "여기요!" or use the table call button without feeling impolite.'
      }
    ],
    exampleConversation: {
      scenarioTitle: 'Ordering Pork Belly at a K-BBQ Restaurant',
      context: 'Ordering dinner with a friend at a Gangnam barbecue restaurant.',
      turns: [
        {
          speaker: 'Waiter (직원)',
          korean: '어서오세요! 몇 분이서 오셨나요?',
          romanized: 'Eoseo-oseyo! Myeot bun-iseo osyeonnayo?',
          english: 'Welcome! How many are in your party?'
        },
        {
          speaker: 'Customer',
          korean: '두 명이에요. 삼겹살 2인분 먼저 주세요.',
          romanized: 'Du myeong-ieyo. Samgyeopsal i-inbun meonjeo juseyo.',
          english: 'Two people. Please give us two servings of pork belly first.'
        },
        {
          speaker: 'Waiter (직원)',
          korean: '네, 삼겹살 2인분 바로 준비해 드릴게요. 된장찌개도 추가하시겠어요?',
          romanized: 'Ne, samgyeopsal i-inbun baro junbihae deurilgeyo. Doenjangjjigaedo chugahasigesseoyo?',
          english: 'Sure, I will prepare 2 servings of pork belly right away. Would you like to add soybean stew?'
        }
      ]
    },
    whyAiSection: {
      heading: 'Why Food Conversation Unlocks True Korean Culture',
      paragraphs: [
        'Food is central to Korean hospitality. Knowing how to praise the food ("정말 맛있어요!"), ask for recommendations, and interact respectfully with the staff turns ordinary meals into memorable cultural experiences.',
        'Practicing with Talk Korean gives you the confidence to visit authentic local eateries where no English menu exists.'
      ],
      bulletPoints: [
        {
          title: 'Authentic Local Dining',
          text: 'Venture beyond tourist restaurants into neighborhood spots.'
        },
        {
          title: 'Seamless Customization',
          text: 'Ask for water, ice, scissors, and extra lettuce without hesitation.'
        },
        {
          title: 'Complimentary Service (서비스)',
          text: 'Often receive free soda or side dishes when staff appreciate your polite Korean.'
        }
      ]
    },
    faq: [
      {
        question: 'How do I call a waiter in a Korean restaurant?',
        answer: 'You can press the table call bell if available, or gently raise your hand and say "여기요!" (Over here!) or "저기요!" (Excuse me!).'
      },
      {
        question: 'Do you tip in Korean restaurants?',
        answer: 'No. Tipping is not practiced in South Korea and can cause confusion. Excellent service is included in the menu price.'
      },
      {
        question: 'How do I ask for the check in Korean?',
        answer: 'You typically walk up to the counter near the front exit and say "계산해 주세요" (Please calculate the bill).'
      },
      {
        question: 'How do I say that food is delicious in Korean?',
        answer: 'You can say "정말 맛있어요!" (It is really delicious!) or when leaving, "잘 먹었습니다!" (I ate very well!).'
      }
    ],
    relatedPaths: [
      '/travel-korean',
      '/korean-vocabulary',
      '/shopping-korean',
      '/korean-roleplay'
    ]
  },

  // -------------------------------------------------------------
  // 18. /shopping-korean
  // -------------------------------------------------------------
  '/shopping-korean': {
    path: '/shopping-korean',
    title: 'Korean Shopping Conversation Practice | Talk Korean',
    description: 'Shop with confidence in Korea. Practice asking prices, sizes, colors, tax refund procedures, and payment options with AI.',
    h1: 'Korean Shopping Conversation Practice',
    category: 'situation',
    categoryLabel: 'Practice by Situation',
    parentCategoryName: 'Practice by Situation',
    parentCategoryPath: '/daily-korean-conversation',
    heroSubtitle: 'Master shopping dialogues for fashion boutiques in Dongdaemun, cosmetics stores in Myeongdong, and traditional markets.',
    primaryCtaText: 'Start Shopping Korean Practice',
    metaKeywords: ['shopping korean', 'korean shopping phrases', 'ask price in korean', 'korean clothing sizes'],
    problemExplanation: {
      heading: 'Navigating Korean Retail Environments',
      paragraphs: [
        'From department stores to bustling street markets, shopping in Korea involves rapid interactions: staff greeting you with "찾으시는 것 있으세요?", trying on clothes in fitting rooms, and inquiring about tax refunds.',
        'Without conversational practice, learners struggle to ask if a different size is available or whether an item can be exchanged.'
      ]
    },
    howItWorks: {
      heading: 'The Retail Shopping Flow in Talk Korean',
      description: 'Practice the complete retail process from browsing to checkout.',
      steps: [
        {
          stepNumber: 1,
          title: 'Browsing & Asking Assistance',
          detail: 'Politely say "그냥 둘러보는 중이에요" (I am just looking around) or ask for specific items.'
        },
        {
          stepNumber: 2,
          title: 'Sizes, Colors & Fitting',
          detail: 'Inquire about different sizes (사이즈), colors (다른 색상), and ask to try items on (입어봐도 되나요?).'
        },
        {
          stepNumber: 3,
          title: 'Discounts, Tax Refunds & Payment',
          detail: 'Ask about discounts, request tax refund forms (택스 리펀), and choose your payment method.'
        }
      ]
    },
    features: [
      {
        title: 'Price Inquiries & Numbers',
        description: 'Master large Korean number units: 만 (10,000) and 천 (1,000) so you never misread prices.'
      },
      {
        title: 'Clothing & Footwear Fit Drills',
        description: 'Phrases for asking if something fits too tight (작아요), loose (커요), or just right (딱 맞아요).'
      },
      {
        title: 'Cosmetics & Skincare Terms',
        description: 'Understand recommendations for skin types: 건성 (dry), 지성 (oily), and 민감성 (sensitive).'
      },
      {
        title: 'Tax Refund Protocols',
        description: 'Learn to request instant tax exemptions at duty-free and tax-refund participating shops.'
      }
    ],
    exampleConversation: {
      scenarioTitle: 'Asking for Another Size in a Boutique',
      context: 'Shopping for a jacket in Hongdae.',
      turns: [
        {
          speaker: 'Clerk (직원)',
          korean: '찾으시는 스타일이나 사이즈 있으신가요?',
          romanized: 'Chajeusineun seutairina saijeu isseusingayo?',
          english: 'Is there a particular style or size you are looking for?'
        },
        {
          speaker: 'Shopper',
          korean: '이 자켓 디자인이 마음에 드는데, 한 치수 큰 사이즈 있나요?',
          romanized: 'I jaket dijaini maeume deuneunde, han chisu keun saijeu innayo?',
          english: 'I like this jacket design, do you have one size larger?'
        },
        {
          speaker: 'Clerk (직원)',
          korean: '네, 피팅룸에서 한번 입어보세요. 라지 사이즈로 가져다 드릴게요.',
          romanized: 'Ne, pitingrumeseo hanbeon ibeoboseyo. Raji saijeuro gajyeoda deurilgeyo.',
          english: 'Sure, try it on in the fitting room. I will bring you a Large size.'
        }
      ]
    },
    whyAiSection: {
      heading: 'Why Shopping Practice Builds Number & Currency Mastery',
      paragraphs: [
        'Korean currency numbers can be confusing because 10,000 won is referred to as "일만 원" rather than "ten thousand".',
        'Practicing shopping dialogues trains your ears to hear numbers rapidly and convert them effortlessly during transactions.'
      ],
      bulletPoints: [
        {
          title: 'Rapid Currency Calculation',
          text: 'Understand spoken numbers in the thousands and ten-thousands effortlessly.'
        },
        {
          title: 'Polite Negotiations',
          text: 'Know when friendly bargaining (깎아주세요) is acceptable in markets and when prices are strictly fixed.'
        },
        {
          title: 'Smooth Purchases',
          text: 'Confirm receipts (영수증), shopping bags (쇼핑백), and payment receipts.'
        }
      ]
    },
    faq: [
      {
        question: 'How do I ask "How much is this?" in Korean?',
        answer: '"이거 얼마예요?" (How much is this?) is the standard polite phrase.'
      },
      {
        question: 'Is bargaining common in Korea?',
        answer: 'Bargaining is not accepted in department stores, malls, or branded retail shops. It is occasionally possible in traditional open-air markets like Namdaemun when paying with cash.'
      },
      {
        question: 'How do I ask if I can try on clothes?',
        answer: '"입어봐도 돼요?" or more politely "입어봐도 될까요?" (May I try this on?).'
      },
      {
        question: 'How do I request a tax refund receipt?',
        answer: '"택스 리펀 영수증 끊어주세요" (Please issue a tax refund receipt).'
      }
    ],
    relatedPaths: [
      '/travel-korean',
      '/restaurant-korean',
      '/daily-korean-conversation',
      '/korean-roleplay'
    ]
  },

  // -------------------------------------------------------------
  // 19. /business-korean
  // -------------------------------------------------------------
  '/business-korean': {
    path: '/business-korean',
    title: 'Business Korean Conversation Practice | Talk Korean',
    description: 'Master professional Korean workplace communication. Practice business introductions, email language, meeting etiquette, and formal honorifics.',
    h1: 'Business Korean Conversation Practice',
    category: 'situation',
    categoryLabel: 'Practice by Situation',
    parentCategoryName: 'Practice by Situation',
    parentCategoryPath: '/daily-korean-conversation',
    heroSubtitle: 'Communicate with professional elegance. Practice high-level honorifics (하십시오체), business card etiquette, and corporate meeting discussions.',
    primaryCtaText: 'Start Business Korean Practice',
    metaKeywords: ['business korean', 'korean workplace phrases', 'formal korean conversation', 'professional korean'],
    problemExplanation: {
      heading: 'The Intricacies of Korean Corporate Culture',
      paragraphs: [
        'Korean workplace communication requires precise mastery of the formal polite register (하십시오체), humble verbs (드리다, 말씀드리다), and professional job titles (부장님, 과장님, 팀장님).',
        'Using informal casual speech in a Korean office can inadvertently offend colleagues or clients. Practicing corporate dialogues ensures you speak with appropriate deference and professionalism.'
      ]
    },
    howItWorks: {
      heading: 'Navigating Corporate Interactions in Talk Korean',
      description: 'Practice high-stakes workplace exchanges in a risk-free AI environment.',
      steps: [
        {
          stepNumber: 1,
          title: 'Formal Introductions & Business Cards',
          detail: 'Practice exchanging business cards with two hands and presenting your company and department cleanly.'
        },
        {
          stepNumber: 2,
          title: 'Meeting Participation & Opinions',
          detail: 'Politely present proposals, agree or disagree respectfully, and summarize action items.'
        },
        {
          stepNumber: 3,
          title: 'Workplace Courtesy & Team Dinners (회식)',
          detail: 'Navigate respectful conversations during company dinners and casual breaks with colleagues.'
        }
      ]
    },
    features: [
      {
        title: 'High-Register Honorifics (격식체)',
        description: 'Master formal verb endings: -ㅂ니다/습니다, -십니까, and respectful grammatical markers.'
      },
      {
        title: 'Humble Verb Forms (겸양어)',
        description: 'Learn to lower the speaker appropriately: 말씀드리다 (to speak), 드리다 (to give), and 뵙다 (to meet).'
      },
      {
        title: 'Job Titles & Organizational Hierarchy',
        description: 'Address colleagues correctly by title + 님 (대표님, 팀장님, 대리님) without using personal names inappropriately.'
      },
      {
        title: 'Professional Email & Phone Etiquette',
        description: 'Standard formulaic greetings for professional emails and polite telephone inquiries.'
      }
    ],
    exampleConversation: {
      scenarioTitle: 'First Meeting with a Corporate Partner',
      context: 'Exchanging business cards and greeting a client at their Seoul office.',
      turns: [
        {
          speaker: 'Client (박 부장님)',
          korean: '먼 길 오시느라 고생 많으셨습니다. 박 부장이라고 합니다.',
          romanized: 'Meon gil osineura gosaeng maneusyeosseumnida. Bak bujang-irago hamnida.',
          english: 'Thank you for making the long journey here. I am General Manager Park.'
        },
        {
          speaker: 'Business Associate',
          korean: '처음 뵙겠습니다. 말씀 많이 들었습니다. 오늘 미팅 잘 부탁드립니다.',
          romanized: 'Cheoeum boepgesseumnida. Malsseum mani deureosseumnida. Oneul miting jal butakdeurimnida.',
          english: 'Pleased to meet you for the first time. I have heard so much about you. Looking forward to our meeting today.'
        },
        {
          speaker: 'Client (박 부장님)',
          korean: '저희야말로 반갑습니다. 회의실로 안내해 드리겠습니다.',
          romanized: 'Jeohuiyamallo bangapseumnida. Hoe-uisil-ro annaehae deurigesseumnida.',
          english: 'The pleasure is ours. Allow me to guide you to our conference room.'
        }
      ]
    },
    whyAiSection: {
      heading: 'Why Professional Roleplay Prevents Workplace Misunderstandings',
      paragraphs: [
        'In corporate environments, tone and honorific accuracy convey reliability and respect. A slip into casual language can inadvertently compromise your professional image.',
        'Practicing business dialogues with Talk Korean builds muscle memory for formal corporate conventions, so you project composure during real negotiations.'
      ],
      bulletPoints: [
        {
          title: 'Professional Credibility',
          text: 'Demonstrate respect and cultural competence to Korean partners.'
        },
        {
          title: 'Polite Disagreements',
          text: 'Learn how to express differing viewpoints diplomatically without causing loss of face.'
        },
        {
          title: 'Career Advancement',
          text: 'Communicate smoothly in international companies and Korean multinational teams.'
        }
      ]
    },
    faq: [
      {
        question: 'How do you address colleagues in a Korean company?',
        answer: 'Never address colleagues by their first name alone. Always use their family name + job title + 님 (e.g., 김 팀장님) or Full Name + 씨 among peers of equal rank.'
      },
      {
        question: 'What is the standard phrase when receiving a business card?',
        answer: 'Receive the card with both hands, study it respectfully for a few moments, and say "감사합니다. 처음 뵙겠습니다" (Thank you. Nice to meet you).'
      },
      {
        question: 'Does this app guarantee employment or business certifications?',
        answer: 'No. Talk Korean provides language and dialogue practice tools to build conversational skills; it does not issue professional certifications.'
      },
      {
        question: 'Can I practice writing professional Korean emails?',
        answer: 'Yes, our grammar and translation tools help analyze formal written structures commonly used in corporate correspondence.'
      }
    ],
    relatedPaths: [
      '/korean-grammar-practice',
      '/korean-conversation',
      '/korean-small-talk',
      '/korean-speaking-practice'
    ]
  },

  // -------------------------------------------------------------
  // 20. /korean-small-talk
  // -------------------------------------------------------------
  '/korean-small-talk': {
    path: '/korean-small-talk',
    title: 'Korean Small Talk Practice with AI | Talk Korean',
    description: 'Master Korean small talk and casual conversation. Practice icebreakers, discussing hobbies, weekend plans, and making Korean friends with AI.',
    h1: 'Korean Small Talk Practice with AI',
    category: 'situation',
    categoryLabel: 'Practice by Situation',
    parentCategoryName: 'Practice by Situation',
    parentCategoryPath: '/daily-korean-conversation',
    heroSubtitle: 'Break the ice effortlessly. Learn friendly conversational starters, light banter, and casual small talk topics that forge lasting connections.',
    primaryCtaText: 'Start Korean Small Talk Practice',
    metaKeywords: ['korean small talk', 'korean icebreakers', 'casual korean conversation', 'make korean friends'],
    problemExplanation: {
      heading: 'The Challenge of Making Casual Small Talk in Korean',
      paragraphs: [
        'Many learners know how to introduce themselves, but struggle to keep a conversation going for more than two minutes. When small talk stalls, awkward silence takes over.',
        'Knowing light, safe topics—such as weekend leisure, favorite cafe spots, K-dramas, and pets—allows you to bridge the gap between strangers and genuine friends.'
      ]
    },
    howItWorks: {
      heading: 'Mastering Light Conversational Banter',
      description: 'Practice natural conversation openers and friendly follow-ups.',
      steps: [
        {
          stepNumber: 1,
          title: 'Warm Icebreakers',
          detail: 'Open with natural situational questions: "오늘 날씨 정말 좋죠?" or "여기 자주 오세요?".'
        },
        {
          stepNumber: 2,
          title: 'Reciprocal Questions (되묻기)',
          detail: 'Keep the dialogue balanced by asking "~씨는요?" (How about you?) and sharing brief personal anecdotes.'
        },
        {
          stepNumber: 3,
          title: 'Active Listening Sounds (맞장구)',
          detail: 'Nod along verbally with "아 그래요?", "진짜요?", and "그렇구나" to convey warmth.'
        }
      ]
    },
    features: [
      {
        title: 'Safe Cultural Icebreakers',
        description: 'Explore topics that Koreans naturally enjoy chatting about: MBTI personality types, pets, coffee, and weekend getaways.'
      },
      {
        title: 'Age & Politeness Etiquette',
        description: 'Learn why Koreans ask about birth year or age and how to transition gracefully between speech styles.'
      },
      {
        title: 'Social Media & Contact Sharing',
        description: 'Phrases for naturally exchanging Instagram handles or KakaoTalk IDs: "혹시 인스타 하세요?".'
      },
      {
        title: 'Gentle Conversation Exits',
        description: 'How to conclude a casual conversation politely: "오늘 이야기 즐거웠어요! 다음에 또 봐요!".'
      }
    ],
    exampleConversation: {
      scenarioTitle: 'Chatting with a Peer at a Language Exchange',
      context: 'Meeting a Korean university student at a casual weekend study cafe.',
      turns: [
        {
          speaker: 'Korean Peer (민수)',
          korean: '주말인데 카페에 사람이 꽤 많네요. 혹시 평소에 커피 좋아하세요?',
          romanized: 'Jumarinde kape-e sarami kkwae manneyo. Hoksi pyeongsoe keopi joahaseyo?',
          english: 'It is the weekend and there are quite a lot of people in this cafe. Do you usually like coffee?'
        },
        {
          speaker: 'Learner',
          korean: '네! 매일 아침 커피를 마셔요. 민수 씨는 어떤 음료 좋아하세요?',
          romanized: 'Ne! Maeil achim keopireul masyeoyo. Minsu ssineun eotteon eumnyo joahaseyo?',
          english: 'Yes! I drink coffee every morning. What kind of drinks do you like, Min-su?'
        },
        {
          speaker: 'Korean Peer (민수)',
          korean: '저는 달콤한 바닐라 라떼를 자주 마셔요. 다음엔 제가 한 잔 살게요!',
          romanized: 'Jeoneun dalkomhan banilla rattereul jaju masyeoyo. Daeumen jega han jan salgeyo!',
          english: 'I often drink sweet vanilla lattes. Next time, I will buy you a cup!'
        }
      ]
    },
    whyAiSection: {
      heading: 'Why Low-Pressure Small Talk Practice Accelerates Social Confidence',
      paragraphs: [
        'Small talk is the universal gateway to deeper friendships. Without practicing casual back-and-forth banter, you miss opportunities to connect with Korean peers.',
        'Practicing with Talk Korean lets you experiment with natural banter and light humor in a friendly, zero-judgment environment.'
      ],
      bulletPoints: [
        {
          title: 'Approachable Confidence',
          text: 'Feel comfortable speaking to acquaintances without rehearsing sentences in advance.'
        },
        {
          title: 'Cultural Resonance',
          text: 'Discuss popular topics like MBTI personality types that native Koreans talk about constantly.'
        },
        {
          title: 'Smooth Transitions',
          text: 'Seamlessly shift from small talk into plans to grab lunch or coffee.'
        }
      ]
    },
    faq: [
      {
        question: 'Why do Koreans ask about MBTI personality types?',
        answer: 'MBTI is an extremely popular social icebreaker in South Korea. Asking "MBTI가 어떻게 되세요?" is a very common, friendly conversation starter.'
      },
      {
        question: 'Is it rude if someone asks my age right away in Korea?',
        answer: 'No! Koreans often ask about age or birth year early on to determine the correct respectful speech register and pronouns to use with you.'
      },
      {
        question: 'How do I exchange contacts politely in Korean?',
        answer: '"혹시 카카오톡이나 인스타그램 하세요?" (Do you happen to use KakaoTalk or Instagram?) followed by "아이디 알려주실 수 있나요?" (Could you let me know your ID?).'
      },
      {
        question: 'What is the best small talk topic when meeting someone new?',
        answer: 'Asking about the weather, how they spent their weekend, or their favorite Korean cafes/food are always reliable, friendly topics.'
      }
    ],
    relatedPaths: [
      '/daily-korean-conversation',
      '/korean-conversation-topics',
      '/korean-expression-practice',
      '/korean-speaking-practice'
    ]
  }
};
