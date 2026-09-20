export interface TopikQuestion {
  id: string;
  type: 'listening' | 'reading' | 'writing';
  level: 'TOPIK I' | 'TOPIK II';
  questionNumber: number;
  category: string;
  passage?: string;
  passageEnglish?: string;
  question: string;
  questionEnglish?: string;
  options?: string[];
  correctAnswer?: number; // 0-indexed option
  writingPrompt?: {
    type: 'fill_blank' | 'short_essay' | 'long_essay';
    sampleAnswer: string;
    keyPoints: string[];
  };
  explanation: string;
  explanationKorean?: string;
  vocabularyTips: { word: string; meaning: string }[];
}

export interface TopikVocabItem {
  id: string;
  word: string;
  hanja?: string;
  meaningEn: string;
  meaningKo: string;
  level: 'TOPIK I' | 'TOPIK II';
  category: string;
  exampleKo: string;
  exampleEn: string;
}

export const TOPIK_I_QUESTIONS: TopikQuestion[] = [
  // Listening / Reading TOPIK I
  {
    id: 't1-r1',
    level: 'TOPIK I',
    type: 'reading',
    questionNumber: 1,
    category: '무엇에 대한 글입니까? (Topic Identification)',
    passage: '저는 한국 노래를 자주 듣습니다. 그리고 방탄소년단(BTS)을 정말 좋아합니다.',
    passageEnglish: 'I listen to Korean songs often. And I really like BTS.',
    question: '다음은 무엇에 대한 이야기입니까?',
    questionEnglish: 'What is the following passage about?',
    options: ['취미 (Hobby / Interest)', '음식 (Food)', '날씨 (Weather)', '직업 (Occupation)'],
    correctAnswer: 0,
    explanation: 'The passage talks about listening to Korean music and liking BTS, which relates to a hobby or interest (취미).',
    explanationKorean: '한국 노래를 듣고 BTS를 좋아한다는 내용이므로 "취미"에 대한 글입니다.',
    vocabularyTips: [
      { word: '자주', meaning: 'Often' },
      { word: '듣다', meaning: 'To listen' },
      { word: '취미', meaning: 'Hobby' }
    ]
  },
  {
    id: 't1-r2',
    level: 'TOPIK I',
    type: 'reading',
    questionNumber: 2,
    category: '장소 찾기 (Location Context)',
    passage: '가: 책 두 권 대출하고 싶어요.\n나: 학생증을 보여 주시겠어요?',
    passageEnglish: 'A: I would like to borrow two books.\nB: Could you show me your student ID card?',
    question: '두 사람이 대화하고 있는 장소는 어디입니까?',
    questionEnglish: 'Where are the two people conversing?',
    options: ['도서관 (Library)', '은행 (Bank)', '약국 (Pharmacy)', '공항 (Airport)'],
    correctAnswer: 0,
    explanation: 'Borrowing books (책 대출) and showing student ID card occurs at a library (도서관).',
    explanationKorean: '책 대출과 학생증 제시가 언급되었으므로 대화 장소는 "도서관"입니다.',
    vocabularyTips: [
      { word: '대출하다', meaning: 'To borrow (books/loans)' },
      { word: '학생증', meaning: 'Student ID card' },
      { word: '도서관', meaning: 'Library' }
    ]
  },
  {
    id: 't1-r3',
    level: 'TOPIK I',
    type: 'reading',
    questionNumber: 3,
    category: '문맥 빈칸 채우기 (Grammar & Context)',
    passage: '오늘 날씨가 매우 춥습니다. 따뜻한 옷을 (   ) 나가는 것이 좋습니다.',
    passageEnglish: 'It is very cold today. It is good to (   ) warm clothes before going out.',
    question: '빈칸 (   )에 들어갈 가장 알맞은 것을 고르십시오.',
    questionEnglish: 'Choose the most appropriate word to fill in the blank.',
    options: ['입고 (Wear and...)', '벗고 (Take off and...)', '씻고 (Wash and...)', '사고 (Buy and...)'],
    correctAnswer: 0,
    explanation: 'When it is cold, you should wear (입고) warm clothes before going out.',
    explanationKorean: '추운 날씨에는 따뜻한 옷을 "입고" 나가는 것이 알맞습니다.',
    vocabularyTips: [
      { word: '춥다', meaning: 'To be cold' },
      { word: '따뜻하다', meaning: 'To be warm' },
      { word: '입다', meaning: 'To wear' }
    ]
  },
  {
    id: 't1-r4',
    level: 'TOPIK I',
    type: 'reading',
    questionNumber: 4,
    category: '중심 내용 파악 (Main Point)',
    passage: '저는 주말마다 한강 공원에 갑니다. 자전거를 타면서 바람을 쐬면 기분이 아주 좋아집니다.',
    passageEnglish: 'I go to Han River Park every weekend. Riding a bike and breathing fresh air makes me feel great.',
    question: '이 글의 중심 내용을 고르십시오.',
    questionEnglish: 'Choose the main idea of this text.',
    options: [
      '주말에 한강에서 자전거 타는 것을 좋아한다. (Likes riding a bike at Han River on weekends.)',
      '새 자전거를 사기 위해 돈을 모으고 있다. (Saving money to buy a new bicycle.)',
      '한강 공원 위치를 몰라서 찾고 있다. (Looking for Han River Park because of unknown location.)',
      '친구와 함께 한강 공원에 가기로 했다. (Decided to go to Han River Park with friends.)'
    ],
    correctAnswer: 0,
    explanation: 'The writer shares how riding a bike at Han River Park every weekend makes them feel good.',
    explanationKorean: '주말마다 한강 공원에서 자전거를 타며 기분 전환을 하는 것을 좋아한다는 것이 핵심 내용입니다.',
    vocabularyTips: [
      { word: '바람을 쐬다', meaning: 'To get fresh air' },
      { word: '자전거', meaning: 'Bicycle' },
      { word: '기분', meaning: 'Mood / Feeling' }
    ]
  },
  {
    id: 't1-l1',
    level: 'TOPIK I',
    type: 'listening',
    questionNumber: 5,
    category: '알맞은 대답 고르기 (Listening Dialogue)',
    passage: '남: 주말에 보통 뭐 해요?\n여: (   )',
    passageEnglish: 'Man: What do you usually do on weekends?\nWoman: (   )',
    question: '남자의 말에 이어질 여자의 알맞은 대답을 고르십시오.',
    questionEnglish: 'Choose the most appropriate response from the woman.',
    options: [
      '친구를 만나서 카페에 가요. (I meet friends and go to a cafe.)',
      '네, 주말이 너무 길어요. (Yes, the weekend is too long.)',
      '어제 영화를 봤어요. (I watched a movie yesterday.)',
      '서울역에서 만납시다. (Let us meet at Seoul Station.)'
    ],
    correctAnswer: 0,
    explanation: 'When asked what you usually do on weekends, answering with a weekend activity ("I meet friends and go to a cafe") is natural.',
    explanationKorean: '주말에 보통 무엇을 하는지 묻고 있으므로 일상적 주말 활동을 대답하는 1번이 알맞습니다.',
    vocabularyTips: [
      { word: '주말', meaning: 'Weekend' },
      { word: '보통', meaning: 'Usually' },
      { word: '만나다', meaning: 'To meet' }
    ]
  },
  {
    id: 't1-l2',
    level: 'TOPIK I',
    type: 'listening',
    questionNumber: 6,
    category: '이어지는 행동 고르기 (Listening Action Response)',
    passage: '남: 비가 오는데 우산 가지고 왔어요?\n여: 아니요, 안 가져왔어요. 어쩌죠?\n남: 제 우산이 크니까 같이 쓰고 가요.',
    passageEnglish: 'Man: It is raining, did you bring an umbrella?\nWoman: No, I did not bring one. What should I do?\nMan: My umbrella is big, so let us share it.',
    question: '여자는 이어서 어떤 행동을 하겠습니까?',
    questionEnglish: 'What will the woman most likely do next?',
    options: [
      '남자의 우산을 같이 쓰고 간다. (Walk together sharing the man\'s umbrella.)',
      '편의점에 가서 우산을 산다. (Go to the convenience store to buy an umbrella.)',
      '비가 그칠 때까지 기다린다. (Wait until the rain stops.)',
      '집으로 다시 돌아간다. (Go back home.)'
    ],
    correctAnswer: 0,
    explanation: 'The man offers to share his umbrella, so the woman will accept and walk together under it.',
    explanationKorean: '남자가 우산을 같이 쓰고 가자고 제안했으므로 여자는 남자의 우산을 함께 쓰게 됩니다.',
    vocabularyTips: [
      { word: '우산', meaning: 'Umbrella' },
      { word: '쓰다', meaning: 'To wear / use (umbrella)' },
      { word: '같이', meaning: 'Together' }
    ]
  }
];

export const TOPIK_II_QUESTIONS: TopikQuestion[] = [
  // TOPIK II Reading, Listening, Writing
  {
    id: 't2-r1',
    level: 'TOPIK II',
    type: 'reading',
    questionNumber: 1,
    category: '문법 및 어휘 (Intermediate Grammar)',
    passage: '비가 내리기 (   ) 우산을 미리 준비하십시오.',
    passageEnglish: 'Please prepare an umbrella in advance (   ) it starts to rain.',
    question: '빈칸에 들어갈 가장 알맞은 표현을 고르십시오.',
    questionEnglish: 'Choose the most appropriate grammar expression for the blank.',
    options: ['시작하기 전에 (Before starting to...)', '시작하는 바람에 (Because it started...)', '시작함에 따라 (As it starts...)', '시작할 정도로 (To the extent of starting...)'],
    correctAnswer: 0,
    explanation: '`-기 전에` means "before doing something". Preparing an umbrella before it starts raining is logical.',
    explanationKorean: '비가 내리기 "전에" 미리 우산을 준비하라는 문맥이 올바릅니다.',
    vocabularyTips: [
      { word: '-기 전에', meaning: 'Before doing...' },
      { word: '미리', meaning: 'In advance / beforehand' },
      { word: '준비하다', meaning: 'To prepare' }
    ]
  },
  {
    id: 't2-r2',
    level: 'TOPIK II',
    type: 'reading',
    questionNumber: 2,
    category: '신문 기사 제목 이해 (News Headline Interpretation)',
    passage: '전자상거래 급증, 오프라인 매장 "변신하지 않으면 살아남기 힘들다"',
    passageEnglish: 'E-commerce surge; Offline stores: "Hard to survive without transformation"',
    question: '다음 신문 기사 제목을 가장 잘 설명한 것을 고르십시오.',
    questionEnglish: 'Select the option that best explains the newspaper headline.',
    options: [
      '온라인 쇼핑 이용자가 늘어나면서 오프라인 매장들이 변화를 시도하고 있다. (Offline stores are attempting changes as online shoppers surge.)',
      '오프라인 매장이 늘어나면서 전자상거래 시장이 위축되고 있다. (E-commerce market is shrinking as offline stores increase.)',
      '전자상거래와 오프라인 매장의 매출이 동시에 감소하고 있다. (Sales of both e-commerce and offline stores are declining.)',
      '소비자들이 오프라인 매장 이용을 더 선호하고 있다. (Consumers prefer using offline stores more.)'
    ],
    correctAnswer: 0,
    explanation: 'The headline indicates that due to the e-commerce surge, traditional offline stores must adapt and transform to survive.',
    explanationKorean: '전자상거래 증가로 인해 오프라인 매장이 변화를 시도해야 살아남을 수 있다는 의미입니다.',
    vocabularyTips: [
      { word: '급증하다', meaning: 'To surge / rapidly increase' },
      { word: '변신', meaning: 'Transformation / change' },
      { word: '살아남다', meaning: 'To survive' }
    ]
  },
  {
    id: 't2-r3',
    level: 'TOPIK II',
    type: 'reading',
    questionNumber: 3,
    category: '글의 순서 배열 (Text Sequencing)',
    passage: '(가) 또한 이 기술은 의료 및 교육 분야에서도 활용 가능성이 높다.\n(나) 최근 인공지능 기술의 발전 속도가 급격히 빨라지고 있다.\n(다) 특히 맞춤형 학습을 가능하게 하여 교육의 질을 높여 준다.\n(라) 이에 따라 다양한 산업 현장에서 혁신적인 변화가 일어나는 중이다.',
    passageEnglish: '(A) Furthermore, this technology has high applicability in healthcare and education.\n(B) Recently, the speed of AI technology development has accelerated rapidly.\n(C) In particular, it enables customized learning, enhancing educational quality.\n(D) Accordingly, innovative changes are taking place across various industrial fields.',
    question: '다음 글을 자연스럽게 연결한 순서를 고르십시오.',
    questionEnglish: 'Choose the option with the most natural sequence.',
    options: [
      '(나) - (라) - (가) - (다)',
      '(나) - (가) - (다) - (라)',
      '(라) - (나) - (가) - (다)',
      '(가) - (나) - (라) - (다)'
    ],
    correctAnswer: 0,
    explanation: 'General introductory statement (나) -> consequence (라) -> additional industry application (가) -> specific example (다).',
    explanationKorean: '기술 발전 서두(나) 후 산업 변화(라), 의료/교육 확대(가), 교육 맞춤 학습 예시(다) 순서가 자연스럽습니다.',
    vocabularyTips: [
      { word: '발전 속도', meaning: 'Speed of development' },
      { word: '맞춤형', meaning: 'Customized / Tailored' },
      { word: '혁신적', meaning: 'Innovative' }
    ]
  },
  {
    id: 't2-l1',
    level: 'TOPIK II',
    type: 'listening',
    questionNumber: 4,
    category: '듣기 - 남자의 중심 생각 (Listening Main Thought)',
    passage: '여: 요즘 회사 근무 시간을 직원 마음대로 조절하는 수시 출퇴근제가 인기라면서요?\n남: 네, 하지만 업무 협조가 제대로 이루어지지 않아서 불편하다는 의견도 많습니다. 업무의 효율성을 높이려면 정해진 시간에 함께 일하는 기본 규칙이 지켜져야 한다고 봅니다.',
    passageEnglish: 'Woman: I heard flexible working hours are popular these days?\nMan: Yes, but many complain about lack of smooth collaboration. To boost work efficiency, I believe basic rules of working together at set hours should be kept.',
    question: '남자의 중심 생각으로 가장 알맞은 것을 고르십시오.',
    questionEnglish: 'Select the main opinion of the man.',
    options: [
      '업무 효율을 위해 정해진 근무 규칙을 준수해야 한다. (Fixed work rules must be kept for efficiency.)',
      '수시 출퇴근제를 모든 기업으로 확대 적용해야 한다. (Flexible working hours should be expanded to all companies.)',
      '직원들의 자율성을 보장하는 것이 가장 중요하다. (Guaranteeing employee autonomy is most important.)',
      '근무 시간보다 업무 성과 중심으로 평가해야 한다. (Evaluation should focus on results rather than hours.)'
    ],
    correctAnswer: 0,
    explanation: 'The man explicitly states that fixed working rules and working together at set hours are necessary for efficiency.',
    explanationKorean: '남자는 정해진 시간에 함께 일하는 기본 규칙이 지켜져야 업무 효율성이 높아진다고 주장하고 있습니다.',
    vocabularyTips: [
      { word: '수시 출퇴근제', meaning: 'Flexible working hours' },
      { word: '효율성', meaning: 'Efficiency' },
      { word: '규칙', meaning: 'Rules' }
    ]
  },
  {
    id: 't2-l2',
    level: 'TOPIK II',
    type: 'listening',
    questionNumber: 5,
    category: '듣기 - 내용 일치 (Listening Content Agreement)',
    passage: '여: 이번에 새로 개관한 국립한글박물관 특별전에 다녀오셨지요? 어땠나요?\n남: 한글의 역사와 현대 디자인이 결합된 전시가 인상적이었습니다. 특히 체험 공간에서 직접 한글 캘리그래피를 써볼 수 있어서 관람객들의 반응이 매우 뜨거웠습니다.',
    passageEnglish: 'Woman: You visited the new National Hangeul Museum special exhibition, right? How was it?\nMan: The exhibition combining Hangeul history and modern design was impressive. Visitors especially loved writing Hangeul calligraphy in the interactive zone.',
    question: '들은 내용과 일치하는 것을 고르십시오.',
    questionEnglish: 'Choose the statement that agrees with what you heard.',
    options: [
      '관람객들이 직접 한글 캘리그래피를 체험할 수 있다. (Visitors can experience writing Hangeul calligraphy themselves.)',
      '박물관 이용료가 지난달보다 인상되었다. (Museum entrance fee was increased last month.)',
      '전시회에는 고서적만 전시되어 있다. (Only ancient books are exhibited in the exhibition.)',
      '남자는 시간이 부족해서 체험 공간에 들르지 못했다. (The man could not visit the interactive zone due to lack of time.)'
    ],
    correctAnswer: 0,
    explanation: 'The man explicitly mentions that visitors can write Hangeul calligraphy in the interactive zone.',
    explanationKorean: '남자가 "체험 공간에서 직접 한글 캘리그래피를 써볼 수 있어서 반응이 뜨거웠다"고 언급했으므로 1번이 일치합니다.',
    vocabularyTips: [
      { word: '개관하다', meaning: 'To open (museum/building)' },
      { word: '캘리그래피', meaning: 'Calligraphy' },
      { word: '체험 공간', meaning: 'Interactive / Experiential space' }
    ]
  },
  {
    id: 't2-w1',
    level: 'TOPIK II',
    type: 'writing',
    questionNumber: 51,
    category: 'TOPIK II 쓰기 51번 (실용문 빈칸 완성)',
    passage: '제목: 도서관 이용 안내\n\n도서관 내에서는 정숙을 유지해 주시기 바랍니다. 특히 통화를 할 때는 반드시 (  ㉠  ).\n또한 음식물 반납 시 쓰레기는 지정된 장소에 (  ㉡  ). 감사하겠습니다.',
    passageEnglish: 'Subject: Library Usage Notice\n\nPlease maintain silence inside the library. Especially when making a phone call, you must ( ㉠ ).\nAlso, when returning food items, please ( ㉡ ) trash in designated places.',
    question: '다음 안내문을 읽고 ㉠과 ㉡에 들어갈 가장 알맞은 말을 문맥에 맞게 쓰십시오.',
    questionEnglish: 'Read the announcement and write the most appropriate phrases for ㉠ and ㉡.',
    writingPrompt: {
      type: 'fill_blank',
      sampleAnswer: '㉠ 밖으로 나가셔야 합니다 (또는 로비로 나가시기 바랍니다)\n㉡ 버려 주시면 (또는 분리수거해 주시면)',
      keyPoints: [
        '㉠ 공공장소 통화 규칙에 맞는 격식체 당부 표현 (~으셔야 합니다, ~기 바랍니다)',
        '㉡ 문장의 종결조건(~감사하겠습니다)과 호응하는 연결어미 (~아/어 주시면 감사하겠습니다)'
      ]
    },
    explanation: 'TOPIK II 51번 실용문은 공공 안내문/이메일 격식체(~아/어 주시기 바랍니다, ~으셔야 합니다, ~으면 감사하겠습니다) 어미를 정확히 구사해야 만점을 받습니다.',
    explanationKorean: '공공 안내문 격식체 호응 관계를 파악하여 ㉠에는 의무/권유(~바랍니다), ㉡에는 조건형(~주시면)을 작성해야 합니다.',
    vocabularyTips: [
      { word: '정숙', meaning: 'Silence / Quietness' },
      { word: '지정되다', meaning: 'To be designated' },
      { word: '반납하다', meaning: 'To return (items)' }
    ]
  },
  {
    id: 't2-w2',
    level: 'TOPIK II',
    type: 'writing',
    questionNumber: 52,
    category: 'TOPIK II 쓰기 52번 (설명문 빈칸 완성)',
    passage: '사람들은 보통 스트레스를 받으면 단 음식을 찾는다. 단 음식을 먹으면 뇌에서 행복 호르몬이 분비되어 기분이 (  ㉠  ). 그러나 단 음식을 너무 많이 섭취하면 혈당이 급격히 올라갔다가 떨어지기 때문에 오히려 더 큰 피로감을 (  ㉡  ). 따라서 스트레스를 해소할 때는 단 음식에만 의존하지 않는 것이 좋다.',
    passageEnglish: 'People usually look for sweet foods when stressed. When eating sweets, happiness hormones are secreted in the brain, causing mood to ( ㉠ ). However, consuming too much sweet food causes blood sugar to spike and crash, thus ( ㉡ ) greater fatigue. Therefore, it is better not to rely solely on sweet foods when relieving stress.',
    question: '다음 글을 읽고 ㉠과 ㉡에 들어갈 가장 알맞은 말을 문맥에 맞게 쓰십시오.',
    questionEnglish: 'Read the explanatory text and write the most appropriate expressions for ㉠ and ㉡.',
    writingPrompt: {
      type: 'fill_blank',
      sampleAnswer: '㉠ 좋아지기 때문이다 (또는 좋아진다)\n㉡ 느낄 수 있다 (또는 유발할 수 있다 / 느끼게 된다)',
      keyPoints: [
        '㉠ 행복 호르몬 분비의 긍정적 결과 서술 (기분이 좋아지다 / 나아지다)',
        '㉡ 혈당 급변으로 인한 부정적 결과 호응 (~피로감을 느끼게 된다 / 유발한다)',
        '설명문 객관적 서술체 (~ㄴ다/는다, ~기 때문이다) 종결어미 준수'
      ]
    },
    explanation: 'Question 52 requires objective explanatory endings (~ㄴ다/는다, ~기 때문이다). Match the logical cause-and-effect relationship in scientific or explanatory texts.',
    explanationKorean: '52번 설명문은 원인과 결과의 논리적 인과관계를 파악하여 객관적 서술체(~ㄴ다/는다)로 작성해야 합니다.',
    vocabularyTips: [
      { word: '분비되다', meaning: 'To be secreted' },
      { word: '섭취하다', meaning: 'To consume / ingest' },
      { word: '의존하다', meaning: 'To depend on / rely upon' }
    ]
  },
  {
    id: 't2-w3',
    level: 'TOPIK II',
    type: 'writing',
    questionNumber: 53,
    category: 'TOPIK II 쓰기 53번 (도표·그래프 분석 서술문 - 200~300자)',
    passage: '【조사 개요 및 그래프 자료】\n■ 조사 기관: 한국사회연구소\n■ 조사 대상: 전국 성인 남녀 2,000명\n■ 조사 주제: 한국인의 인공지능(AI) 사용 현황 및 인식\n\n[1. AI 서비스 이용률 추이]\n- 2020년: 18%\n- 2024년: 64% (4년 만에 약 3.5배 급증)\n\n[2. 주요 활용 분야]\n- 업무 및 학업 보조: 45%\n- 어학 및 지식 검색: 32%\n- 문화 및 여가 생활: 23%\n\n[3. AI 이용 증가 원인 및 향후 전망]\n- 원인: 모바일 앱 보급 확대 및 생성형 AI의 정확도 향상\n- 전망: 향후 일상 전반의 필수 도구로 자리매김할 것으로 기대됨',
    passageEnglish: '【Survey Overview & Data】\n■ Institution: Korea Social Research Institute\n■ Subjects: 2,000 adult men and women nationwide\n■ Topic: South Koreans\' AI Usage Status and Perception\n\n[1. AI Service Usage Rate Trend]\n- 2020: 18%\n- 2024: 64% (Surged approx. 3.5x in 4 years)\n\n[2. Main Usage Fields]\n- Work & Academic Assistance: 45%\n- Language & Knowledge Search: 32%\n- Culture & Leisure: 23%\n\n[3. Reasons for Growth & Future Outlook]\n- Reason: Expansion of mobile apps & improved accuracy of generative AI\n- Outlook: Expected to become an essential tool in overall daily life',
    question: '위 조사 결과를 바탕으로 "한국인의 인공지능 사용 현황"에 대해 200~300자로 기술하십시오. (단, 글의 제목을 쓰지 말고, 자신의 주관적 의견은 쓰지 마십시오.)',
    questionEnglish: 'Based on the survey results above, write a 200-300 character objective report on "South Koreans\' AI Usage Status". (Do NOT write a title, and do NOT include personal opinions).',
    writingPrompt: {
      type: 'short_essay',
      sampleAnswer: `한국사회연구소에서 성인 남녀 2,000명을 대상으로 '한국인의 인공지능 사용 현황'에 대해 조사한 결과에 따르면, 2020년 18%에 불과했던 AI 이용률이 2024년에는 64%로 약 3.5배 크게 증가한 것으로 나타났다.

주요 활용 분야를 살펴보면 업무 및 학업 보조가 45%로 가장 높은 비중을 차지하였으며, 어학 및 지식 검색(32%), 문화 및 여가 생활(23%)이 그 뒤를 이었다. 이러한 증가 원인으로는 모바일 앱의 보급 확대와 생성형 AI의 정확도 향상이 꼽혔다. 앞으로도 인공지능은 일상 전반의 필수 도구로 자리매김할 것으로 전망된다.`,
      keyPoints: [
        '조사 기관, 대상, 주제를 서두에 자연스럽게 명시 (~에 대해 조사한 결과에 따르면)',
        '수치 변화와 증가 폭 명확한 기술 (18% → 64%, 3.5배 증가)',
        '항목별 비중 및 순위 연결 (~가 가장 높았으며, 그 뒤를 이었다)',
        '증가 원인과 향후 전망으로 마무리 (~것으로 꼽혔다, ~전망된다)',
        '자신의 주관적 생각 배제 및 객관적 서술체(~ㄴ다/는다) 준수'
      ]
    },
    explanation: 'TOPIK II 53번은 주어진 도표와 통계 자료를 객관적으로 서술하는 문항입니다. 조사기관 소개 → 수치 변화 → 세부 항목 비교 → 원인 및 전망 순서로 문단을 유기적으로 연결해야 높은 점수를 받습니다.',
    explanationKorean: '53번은 주관적 견해를 쓰지 않고 도표의 모든 데이터(조사기관, 수치 변화, 원인, 전망)를 서술체(~ㄴ다/는다)로 빠짐없이 기술하는 것이 핵심입니다.',
    vocabularyTips: [
      { word: '조사 결과에 따르면', meaning: 'According to survey results' },
      { word: '비중을 차지하다', meaning: 'To account for a percentage' },
      { word: '그 뒤를 잇다', meaning: 'To be followed by' },
      { word: '자리매김하다', meaning: 'To establish a position / settle into' }
    ]
  },
  {
    id: 't2-w4',
    level: 'TOPIK II',
    type: 'writing',
    questionNumber: 54,
    category: 'TOPIK II 쓰기 54번 (논설문 장문 논술 - 600~700자)',
    passage: '【논제: 현대 사회에서 실패에 대한 태도와 극복 방안】\n\n현대 사회를 살아가는 사람들은 크고 작은 실패를 경험한다. 실패는 좌절과 낙담을 주기도 하지만, 한편으로는 개인의 성장과 발전을 위한 중요한 계기가 되기도 한다. 이에 대해 다음 내용을 중심으로 자신의 생각을 논리적으로 쓰십시오.\n\n1. 실패가 개인과 사회에 미치는 긍정적·부정적 영향은 무엇인가?\n2. 실패를 겪었을 때 필요한 올바른 태도는 무엇인가?\n3. 실패를 딛고 성공으로 나아가기 위해 사회적으로 어떤 지원이 필요한가?',
    passageEnglish: '【Essay Topic: Attitude Toward Failure and Solutions in Modern Society】\n\nPeople living in modern society experience big and small failures. Although failure brings frustration, it also serves as a crucial opportunity for personal growth and progress. Write a 600-700 character essay logically presenting your thoughts around the 3 core questions above.',
    question: '위 제시문을 읽고 3가지 질문을 중심으로 자신의 생각을 서론-본론-결론 구조로 600~700자로 논술하십시오.',
    questionEnglish: 'Write a 600-700 character argumentative essay addressing the three questions with an Introduction-Body-Conclusion structure.',
    writingPrompt: {
      type: 'long_essay',
      sampleAnswer: `현대 사회에서 사람들은 누구나 끊임없는 경쟁 속에서 실패를 경험한다. 실패는 개인에게 심리적 좌절감과 경제적 손실을 가져다주며 도전을 기피하게 만드는 부정적 영향을 미칠 수 있다. 그러나 다른 한편으로 실패는 자신의 부족한 점을 점검하고 새로운 통찰을 얻게 하는 성장의 발판이 되기도 한다.

실패를 겪었을 때 가장 중요한 것은 이를 부끄러워하거나 회피하지 않고 객관적으로 원인을 분석하는 태도이다. 실패는 끝이 아니라 성공으로 향하는 과정 중 하나임을 인식하고, 긍정적인 마음가짐으로 재도전의 기회로 삼아야 한다.

이와 함께 사회적 지원 역시 필수적이다. 실패한 사람에게 다시 일어설 기회를 제공하는 재도전 지원 제도와 금융·교육 안전망이 구축되어야 한다. 실패를 용인하고 격려하는 사회적 분위기가 조성될 때 비로소 개인과 사회 모두가 더욱 역동적인 발전을 이룰 수 있을 것이다.`,
      keyPoints: [
        '서론: 현대 사회에서 실패의 양면성(부정적/긍정적 영향) 제시',
        '본론: 개인이 가져야 할 올바른 태도(원인 분석, 긍정적 재도전 마인드)',
        '결론: 사회적 지원 체계(재도전 안전망, 실패를 격려하는 문화) 및 기대 효과',
        '서술체(~ㄴ다/는다) 및 논리적 접속사(그러나, 이와 함께, 비로소) 활용'
      ]
    },
    explanation: 'TOPIK II 54번은 600~700자의 논설문입니다. 서론-본론-결론 3단 구성을 갖추고, 문제에서 제시한 세 가지 질문에 명확한 답변과 근거를 논리적인 문장으로 전개해야 최고점을 받습니다.',
    explanationKorean: '54번은 제시된 3가지 질문에 대한 답을 서론, 본론, 결론으로 나누어 600~700자 분량과 서술체 격식으로 작성해야 합니다.',
    vocabularyTips: [
      { word: '양면성', meaning: 'Double-sidedness / Two aspects' },
      { word: '발판', meaning: 'Stepping stone / Foothold' },
      { word: '안전망', meaning: 'Safety net' },
      { word: '역동적', meaning: 'Dynamic' }
    ]
  }
];

export const TOPIK_VOCABULARY_BANK: TopikVocabItem[] = [
  // TOPIK I Vocab
  {
    id: 'v1',
    word: '약속',
    hanja: '約束',
    meaningEn: 'Appointment / Promise',
    meaningKo: '다른 사람과 만나기로 한 정함',
    level: 'TOPIK I',
    category: '일상생활 (Daily Life)',
    exampleKo: '오늘 저녁에 친구와 중요한 약속이 있습니다.',
    exampleEn: 'I have an important appointment with a friend this evening.'
  },
  {
    id: 'v2',
    word: '환영하다',
    hanja: '歡迎--',
    meaningEn: 'To welcome',
    meaningKo: '기쁜 마음으로 맞아들이다',
    level: 'TOPIK I',
    category: '인간관계 (Social Relations)',
    exampleKo: '한국어 교실에 오신 것을 진심으로 환영합니다.',
    exampleEn: 'We sincerely welcome you to the Korean language class.'
  },
  {
    id: 'v3',
    word: '불편하다',
    hanja: '不便--',
    meaningEn: 'Inconvenient / Uncomfortable',
    meaningKo: '편하지 못하다',
    level: 'TOPIK I',
    category: '상태 및 감정 (State & Emotion)',
    exampleKo: '지하철에 사람이 많아서 조금 불편했습니다.',
    exampleEn: 'It was a bit uncomfortable because there were many people on the subway.'
  },
  {
    id: 'v4',
    word: '신청하다',
    hanja: '申請--',
    meaningEn: 'To apply for',
    meaningKo: '어떤 일을 어떤 기관에 요청하다',
    level: 'TOPIK I',
    category: '행정/공공 (Administrative)',
    exampleKo: '다음 주까지 TOPIK 시험을 인터넷으로 신청해야 합니다.',
    exampleEn: 'You must apply for the TOPIK exam online by next week.'
  },

  // TOPIK II Vocab
  {
    id: 'v5',
    word: '영향을 미치다',
    hanja: '影響--',
    meaningEn: 'To exert an influence on',
    meaningKo: '어떤 사물의 상태나 변화에 작용을 주다',
    level: 'TOPIK II',
    category: '사회/문화 (Society & Culture)',
    exampleKo: '기후 변화는 인류의 삶에 커다란 영향을 미치고 있다.',
    exampleEn: 'Climate change is exerting a huge influence on human life.'
  },
  {
    id: 'v6',
    word: '극복하다',
    hanja: '克服--',
    meaningEn: 'To overcome / surmount',
    meaningKo: '어려움이나 위기를 이겨 내다',
    level: 'TOPIK II',
    category: '논설/학술 (Argumentative)',
    exampleKo: '꾸준한 노력과 의지로 언어 장벽을 극복했습니다.',
    exampleEn: 'I overcome the language barrier through steady effort and willpower.'
  },
  {
    id: 'v7',
    word: '구체적이다',
    hanja: '具體的--',
    meaningEn: 'Concrete / Specific',
    meaningKo: '실제를 바탕으로 뚜렷하고 분명하다',
    level: 'TOPIK II',
    category: '학술/논증 (Academic)',
    exampleKo: '문제를 해결하려면 구체적인 방안을 마련해야 합니다.',
    exampleEn: 'To solve the problem, we must prepare concrete measures.'
  },
  {
    id: 'v8',
    word: '유지하다',
    hanja: '維持--',
    meaningEn: 'To maintain / preserve',
    meaningKo: '어떤 상태나 현상을 그대로 이어 가다',
    level: 'TOPIK II',
    category: '사회/과학 (Science & Society)',
    exampleKo: '건강을 유지하기 위해서는 규칙적인 운동이 필수적이다.',
    exampleEn: 'Regular exercise is essential to maintain health.'
  }
];
