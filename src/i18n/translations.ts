export type Language = 'EN' | 'JA' | 'ES' | 'KO';

export interface TranslationSchema {
  nav: {
    home: string;
    kculture: string;
    lyricsLab: string;
    dashboard: string;
    topik: string;
    levelTest: string;
    aiTutor: string;
    liveTutor: string;
    recharge: string;
    credits: string;
    betaTitle: string;
  };
  home: {
    badge: string;
    title: string;
    subtitle: string;
    startLearning: string;
    tryLyrics: string;
    aiChatTutor: string;
    featuresTitle: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    feature4Title: string;
    feature4Desc: string;
    levelTestBannerTitle: string;
    levelTestBannerDesc: string;
    takeLevelTest: string;
  };
  kculture: {
    title: string;
    subtitle: string;
    tutorBannerTitle: string;
    tutorBannerDesc: string;
    bookTutorBtn: string;
    bookingConfirmed: string;
    needMoreCredits: string;
    rechargeLink: string;
  };
  lyricsLab: {
    title: string;
    subtitle: string;
    selectSong: string;
    pronunciationDiagnose: string;
    recordBtn: string;
    stopBtn: string;
    balance: string;
    recharge: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    menuHangul: string;
    menuPhrases: string;
    menuSlang: string;
    menuHonorifics: string;
    menuGrammar: string;
    menuTracing: string;
    menuQuiz: string;
    menuAiConversation: string;
    streak: string;
    xp: string;
    credits: string;
  };
  topik: {
    title: string;
    subtitle: string;
    level1: string;
    level2: string;
    startExam: string;
    costNotice: string;
  };
  aiTutor: {
    title: string;
    subtitle: string;
    welcomeMsg: string;
    placeholder: string;
    costNotice: string;
    send: string;
  };
  creditModal: {
    title: string;
    subtitle: string;
    currentBalance: string;
    basicPlan: string;
    proPlan: string;
    masterPlan: string;
    buyBtn: string;
    payMethod: string;
  };
  tutors: {
    title: string;
    subtitle: string;
    bookBtn: string;
    confirmedMsg: string;
  };
  levelTest: {
    title: string;
    subtitle: string;
    startBtn: string;
    questionProgress: string;
    resultTitle: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  EN: {
    nav: {
      home: 'Home',
      kculture: 'K-Culture',
      lyricsLab: 'K-POP Lyrics Lab',
      dashboard: 'Study Center',
      topik: 'TOPIK Test',
      levelTest: 'Level Test',
      aiTutor: 'AI Tutor',
      liveTutor: '1:1 Live Tutor',
      recharge: 'Recharge',
      credits: 'Credits',
      betaTitle: 'Heritage & AI Korean'
    },
    home: {
      badge: 'Bridging Tradition & Trends',
      title: 'Master Korean with Heritage & Modernity',
      subtitle: 'Bridge academic depth with modern fluency through AI feedback, K-Culture, and K-POP hits.',
      startLearning: 'Start Learning Free',
      tryLyrics: 'Practice K-POP Lyrics',
      aiChatTutor: 'Talk to AI Tutor',
      featuresTitle: 'Why Talk Korean?',
      feature1Title: 'Interactive Audio Pitch Analyzer',
      feature1Desc: 'Analyze your native intonation and rhythm with real-time waveform pitch tracking.',
      feature2Title: 'K-Culture Heritage Module',
      feature2Desc: 'Master vocabulary and cultural background from traditional gastronomy to modern K-POP.',
      feature3Title: 'TOPIK Test Prep System',
      feature3Desc: 'Take timed official mock tests with automated scoring and detailed explanation reports.',
      feature4Title: '1:1 Verified Native Tutors',
      feature4Desc: 'Book 1:1 live video sessions with professional verified Korean tutors for personalized feedback.',
      levelTestBannerTitle: 'Find Your Exact Korean Level in 3 Minutes',
      levelTestBannerDesc: 'Take our free AI diagnostic test to get a customized study path tailored to your skills.',
      takeLevelTest: 'Take Diagnostic Level Test'
    },
    kculture: {
      title: 'K-Culture Heritage & Modernity',
      subtitle: 'Explore authentic Korean traditions, cuisine, music, and lifestyle while building your vocabulary.',
      tutorBannerTitle: 'Book 1:1 Live Session with Native K-Culture Expert',
      tutorBannerDesc: 'Get personalized pronunciation feedback and deep cultural insights in a 30-minute 1:1 video class.',
      bookTutorBtn: 'Book 1:1 Native Tutor (30m / -50 CR)',
      bookingConfirmed: '✅ 1:1 Video Session Confirmed! Check your email or My Page for Google Meet link. (-50 CR)',
      needMoreCredits: 'Need more credits?',
      rechargeLink: '+ Recharge Credits'
    },
    lyricsLab: {
      title: 'K-POP Lyrics Pitch & Pronunciation Lab',
      subtitle: 'Practice singing and speaking K-POP lyrics line by line with AI pitch & waveform diagnostic feedback.',
      selectSong: 'Select Song',
      pronunciationDiagnose: 'Pronunciation Diagnostic Report',
      recordBtn: 'Record Voice (6s)',
      stopBtn: 'Stop & Analyze',
      balance: 'Balance',
      recharge: 'Recharge'
    },
    dashboard: {
      title: 'Study Center & Learning Path',
      subtitle: 'Track your daily streak, complete grammar units, and master Korean step-by-step.',
      menuHangul: 'Hangul Alphabet',
      menuPhrases: 'Daily Phrases',
      menuSlang: 'Trendy K-Slang',
      menuHonorifics: 'Honorifics (존댓말)',
      menuGrammar: 'Essential Grammar',
      menuTracing: 'Tracing Practice',
      menuQuiz: 'Words Quiz',
      menuAiConversation: 'Conversation',
      streak: 'Day Streak',
      xp: 'XP',
      credits: 'Credits'
    },
    topik: {
      title: 'Official TOPIK Practice & Mock Exam',
      subtitle: 'Prepare for official Test of Proficiency in Korean (TOPIK I & II) with timed mock exams and explanations.',
      level1: 'TOPIK I (Beginner / Level 1-2)',
      level2: 'TOPIK II (Intermediate / Level 3-6)',
      startExam: 'Start Mock Exam (-20 CR)',
      costNotice: 'Takes 20 CR per exam attempt'
    },
    aiTutor: {
      title: '24/7 AI Korean Conversation Tutor',
      subtitle: 'Practice natural conversation, ask grammar questions, or request translations anytime with AI Ji-woo.',
      welcomeMsg: "Annyeonghaseyo! 👋 I am Ji-woo, your Talk Korean AI tutor. How can I help you study Korean today?",
      placeholder: 'Type your message in English, Japanese, Spanish, or Korean...',
      costNotice: 'Uses 5 Credits per message session',
      send: 'Send'
    },
    creditModal: {
      title: 'Credit Store & Subscription',
      subtitle: 'Recharge credits to unlock 1:1 native tutor sessions, TOPIK mock exams, and AI voice analysis.',
      currentBalance: 'Current Balance',
      basicPlan: 'Starter Package',
      proPlan: 'Pro Learner Package',
      masterPlan: 'Master Culture Package',
      buyBtn: 'Charge Now',
      payMethod: 'Select Payment Method'
    },
    tutors: {
      title: '1:1 Native Korean Verified Tutors',
      subtitle: 'Connect with certified tutors for personalized conversation practice and feedback.',
      bookBtn: 'Reserve 30-Min Session (-50 CR)',
      confirmedMsg: 'Session reserved successfully!'
    },
    levelTest: {
      title: 'AI Diagnostic Korean Level Test',
      subtitle: 'Answer 5 quick adaptive questions to determine your vocabulary and grammar proficiency level.',
      startBtn: 'Start Diagnostic Test',
      questionProgress: 'Question',
      resultTitle: 'Your Diagnostic Level Result'
    }
  },

  JA: {
    nav: {
      home: 'ホーム',
      kculture: 'K-カルチャー',
      lyricsLab: 'K-POP 歌詞ラボ',
      dashboard: '学習センター',
      topik: 'TOPIK 試験',
      levelTest: 'レベルテスト',
      aiTutor: 'AI 講師',
      liveTutor: '1:1 ライブ講師',
      recharge: 'チャージ',
      credits: 'クレジット',
      betaTitle: '伝統とAIの韓国語学習'
    },
    home: {
      badge: '伝統とトレンドの融合',
      title: '伝統と現代で深める韓国語マスター',
      subtitle: '学術的な深さと現代の会話力をAIフィードバック、K-カルチャー、K-POPヒット曲で身につけます。',
      startLearning: '無料で学習を始める',
      tryLyrics: 'K-POP 歌詞で練習',
      aiChatTutor: 'AI 講師と会話する',
      featuresTitle: 'Talk Korean の特徴',
      feature1Title: 'インタラクティブ音声ピッチ解析器',
      feature1Desc: 'リアルタイムの波形ピッチ追跡で、ネイティブの抑揚とリズムを正確に測定します。',
      feature2Title: 'K-カルチャー継承モジュール',
      feature2Desc: '伝統的な宮廷料理から最新のK-POPまで、背景文化と語彙をセットで学びます。',
      feature3Title: 'TOPIK 対策・模擬試験',
      feature3Desc: '制限時間付きの公式模擬試験と自動採点・詳細解説で目標級合格を目指します。',
      feature4Title: '1:1 検証済みネイティブ講師',
      feature4Desc: '厳選されたプロのネイティブ韓国人講師と1:1オンラインビデオレッスンを受講できます。',
      levelTestBannerTitle: '3分であなたの正確な韓国語レベルを診断',
      levelTestBannerDesc: '無料のAIレベルテストを受けて、あなたのレベルに最適化された学習パスを提示します。',
      takeLevelTest: 'レベル診断テストを受ける'
    },
    kculture: {
      title: 'K-カルチャー 伝統と現代',
      subtitle: '韓国の伝統、食文化、音楽、ライフスタイルを学びながら、実践的な語彙力を高めましょう。',
      tutorBannerTitle: 'K-カルチャー専門ネイティブ講師と1:1ライブレッスン予約',
      tutorBannerDesc: 'AIの発音リポートを元に、ネイティブ講師と30分間の1:1オンラインレッスンを受講できます。',
      bookTutorBtn: '1:1 ネイティブ講師を予約する (30分 / -50 CR)',
      bookingConfirmed: '✅ 1:1レッスンが確定しました！メールまたはマイページからZoom/Meetリンクをご確認ください。(-50 CR)',
      needMoreCredits: 'クレジットが必要ですか？',
      rechargeLink: '+ クレジットをチャージ'
    },
    lyricsLab: {
      title: 'K-POP 歌詞ピッチ＆発音ラボ',
      subtitle: 'K-POPの歌詞を1行ずつ歌いながら、AIによるピッチと波形診断フィードバックを受けられます。',
      selectSong: '曲を選択',
      pronunciationDiagnose: '発音診断リポート',
      recordBtn: '録音開始 (6秒)',
      stopBtn: '停止して解析',
      balance: '残高',
      recharge: 'チャージ'
    },
    dashboard: {
      title: '学習センター ＆ ラーニングパス',
      subtitle: '毎日のストリークを記録し、文法や語彙を段階的にマスターしましょう。',
      menuHangul: 'ハングル文字',
      menuPhrases: '日常フレーズ',
      menuSlang: 'トレンドK-スラング',
      menuHonorifics: '敬語・敬称 (존댓말)',
      menuGrammar: '必須文法',
      menuTracing: '書き順・なぞり書き',
      menuQuiz: '単語クイズ',
      menuAiConversation: '会話 (Conversation)',
      streak: '日連続',
      xp: 'XP',
      credits: 'クレジット'
    },
    topik: {
      title: 'TOPIK（韓国語能力試験）対策模擬試験',
      subtitle: 'TOPIK I & II の制限時間付き模擬試験と丁寧な解説で合格を目指します。',
      level1: 'TOPIK I (初級 / 1-2級)',
      level2: 'TOPIK II (中級・高級 / 3-6級)',
      startExam: '模擬試験を開始 (-20 CR)',
      costNotice: '1回の受験につき 20 CR 消費します'
    },
    aiTutor: {
      title: '24時間対応 AI 韓国語講師 ジウ',
      subtitle: '日常会話の練習、文法の質問、翻訳の依頼など何でもAIジウにお尋ねください。',
      welcomeMsg: "안녕하세요! 👋 Talk Korean AI講師のジウです。日本語、英語、韓国語で気軽にお話ししましょう！今日はどんな韓国語を勉強したいですか？",
      placeholder: '日本語、韓国語、英語でメッセージを入力...',
      costNotice: '1回のセッションにつき 5 CR 消費します',
      send: '送信'
    },
    creditModal: {
      title: 'クレジットストア ＆ 決済',
      subtitle: 'クレジットをチャージして1:1ネイティブ講師、TOPIK模擬試験、AI発音解析を利用できます。',
      currentBalance: '現在の保有クレジット',
      basicPlan: 'スターターパッケージ',
      proPlan: 'プロパッケージ',
      masterPlan: 'マスターカルチャーパッケージ',
      buyBtn: 'チャージする',
      payMethod: '決済方法を選択'
    },
    tutors: {
      title: '1:1 検証済みネイティブ韓国人講師',
      subtitle: '認定講師と一緒にパーソナライズされた会話練習と発音フィードバックを受けましょう。',
      bookBtn: '30分セッションを予約 (-50 CR)',
      confirmedMsg: '予約が正常に完了しました！'
    },
    levelTest: {
      title: 'AI レベル診断テスト',
      subtitle: '5つの適応型質問に答えて、現在の語彙・文法レベルを診断します。',
      startBtn: '診断テストを開始',
      questionProgress: '問題',
      resultTitle: 'レベル診断結果'
    }
  },

  ES: {
    nav: {
      home: 'Inicio',
      kculture: 'Cultura K',
      lyricsLab: 'Lab de Letras K-POP',
      dashboard: 'Centro de Estudio',
      topik: 'Examen TOPIK',
      levelTest: 'Test de Nivel',
      aiTutor: 'Tutor IA',
      liveTutor: 'Tutor 1:1 en Vivo',
      recharge: 'Recargar',
      credits: 'Créditos',
      betaTitle: 'Coreano con IA y Tradición'
    },
    home: {
      badge: 'Uniendo Tradición y Tendencias',
      title: 'Domina el Coreano con Tradición y Modernidad',
      subtitle: 'Combina la profundidad académica con fluidez moderna mediante IA, Cultura K y éxitos de K-POP.',
      startLearning: 'Empieza Gratis',
      tryLyrics: 'Practica Letras K-POP',
      aiChatTutor: 'Habla con Tutor IA',
      featuresTitle: '¿Por qué Talk Korean?',
      feature1Title: 'Analizador de Tono y Formas de Onda Interactivo',
      feature1Desc: 'Mide la entonación y ritmo nativos en tiempo real con seguimiento de tono de onda.',
      feature2Title: 'Módulo del Patrimonio Cultural K',
      feature2Desc: 'Aprende vocabulario y contexto cultural desde gastronomía tradicional hasta K-POP actual.',
      feature3Title: 'Sistema de Preparación TOPIK',
      feature3Desc: 'Realiza simulacros oficiales con cronómetro, calificación automática y explicaciones detalladas.',
      feature4Title: 'Tutores Nativos Verificados 1:1',
      feature4Desc: 'Reserva clases en vivo 1:1 con tutores nativos de coreano certificados para retroalimentación personalizada.',
      levelTestBannerTitle: 'Descubre tu Nivel Exacto de Coreano en 3 Minutos',
      levelTestBannerDesc: 'Haz nuestro test de diagnóstico gratuito para obtener una ruta de aprendizaje personalizada.',
      takeLevelTest: 'Hacer Test de Nivel'
    },
    kculture: {
      title: 'Patrimonio y Modernidad de la Cultura K',
      subtitle: 'Explora las tradiciones, gastronomía, música y estilo de vida de Corea mientras enriqueces tu vocabulario.',
      tutorBannerTitle: 'Reserva una Clase 1:1 en Vivo con un Tutor Nativo Experto',
      tutorBannerDesc: 'Recibe retroalimentación personalizada de pronunciación e inmersión cultural en una clase de 30 minutos.',
      bookTutorBtn: 'Reservar Tutor Nativo 1:1 (30m / -50 CR)',
      bookingConfirmed: '✅ ¡Sesión 1:1 confirmada! Revisa tu correo o Mi Cuenta para el enlace de Google Meet. (-50 CR)',
      needMoreCredits: '¿Necesitas más créditos?',
      rechargeLink: '+ Recargar Créditos'
    },
    lyricsLab: {
      title: 'Laboratorio de Pronunciación y Tono de Letras K-POP',
      subtitle: 'Practica cantando y hablando letras de K-POP línea por línea con análisis de tono e entonación.',
      selectSong: 'Seleccionar Canción',
      pronunciationDiagnose: 'Informe de Diagnóstico de Pronunciación',
      recordBtn: 'Grabar Voz (6s)',
      stopBtn: 'Detener y Analizar',
      balance: 'Balance',
      recharge: 'Recargar'
    },
    dashboard: {
      title: 'Centro de Estudio y Ruta de Aprendizaje',
      subtitle: 'Mantiene tu racha diaria, completa módulos de gramática y domina el coreano paso a paso.',
      menuHangul: 'Alfabeto Hangul',
      menuPhrases: 'Frases Cotidianas',
      menuSlang: 'K-Slang de Tendencia',
      menuHonorifics: 'Honoríficos (존댓말)',
      menuGrammar: 'Gramática Esencial',
      menuTracing: 'Práctica de Trazos',
      menuQuiz: 'Cuestionario de Palabras',
      menuAiConversation: 'Juego de Roles con IA',
      streak: 'Días de Racha',
      xp: 'XP',
      credits: 'Créditos'
    },
    topik: {
      title: 'Práctica Oficial y Examen de Prueba TOPIK',
      subtitle: 'Prepárate para el examen oficial de suficiencia en coreano (TOPIK I y II) con exámenes de prueba con tiempo.',
      level1: 'TOPIK I (Principiante / Nivel 1-2)',
      level2: 'TOPIK II (Intermedio / Nivel 3-6)',
      startExam: 'Iniciar Examen de Prueba (-20 CR)',
      costNotice: 'Consume 20 CR por intento'
    },
    aiTutor: {
      title: 'Tutor de Conversación de Coreano con IA 24/7',
      subtitle: 'Practica conversación natural, haz preguntas de gramática o solicita traducciones en cualquier momento con IA Ji-woo.',
      welcomeMsg: "¡Annyeonghaseyo! 👋 Soy Ji-woo, tu tutora de IA en Talk Korean. ¿Cómo puedo ayudarte a estudiar coreano hoy?",
      placeholder: 'Escribe tu mensaje en español, inglés, japonés o coreano...',
      costNotice: 'Utiliza 5 Créditos por sesión de mensaje',
      send: 'Enviar'
    },
    creditModal: {
      title: 'Tienda de Créditos y Suscripción',
      subtitle: 'Recarga créditos para desbloquear sesiones con tutores nativos, exámenes TOPIK y análisis de voz.',
      currentBalance: 'Saldo Actual',
      basicPlan: 'Paquete Inicial',
      proPlan: 'Paquete Pro',
      masterPlan: 'Paquete Maestro',
      buyBtn: 'Recargar Ahora',
      payMethod: 'Seleccionar Método de Pago'
    },
    tutors: {
      title: 'Tutores Nativos Coreanos Verificados 1:1',
      subtitle: 'Conéctate con tutores certificados para una práctica de conversación personalizada.',
      bookBtn: 'Reservar Sesión de 30 Min (-50 CR)',
      confirmedMsg: '¡Sesión reservada con éxito!'
    },
    levelTest: {
      title: 'Test de Diagnóstico de Nivel de Coreano con IA',
      subtitle: 'Responde 5 preguntas adaptativas rápidas para determinar tu nivel de vocabulario y gramática.',
      startBtn: 'Iniciar Test de Diagnóstico',
      questionProgress: 'Pregunta',
      resultTitle: 'Resultado de tu Diagnóstico de Nivel'
    }
  },

  KO: {
    nav: {
      home: '홈',
      kculture: 'K-컬처 헤리티지',
      lyricsLab: 'K-POP 가사 발음 랩',
      dashboard: '학습 센터',
      topik: 'TOPIK 모의고사',
      levelTest: '레벨 테스트',
      aiTutor: 'AI 튜터',
      liveTutor: '1:1 원어민 튜터',
      recharge: '충전',
      credits: '크레딧',
      betaTitle: 'Heritage & AI Korean'
    },
    home: {
      badge: '전통과 현대 트렌드의 유기적 결합',
      title: '전통과 현대가 어우러진 한국어 마스터',
      subtitle: '학술적 정통성과 현대적인 실전 회화를 AI 음성 피드백, K-컬처 콘텐츠, K-POP 가사 분석으로 터득하세요.',
      startLearning: '무료 학습 시작하기',
      tryLyrics: 'K-POP 가사로 실습',
      aiChatTutor: 'AI 튜터와 대화하기',
      featuresTitle: 'Talk Korean만의 특별함',
      feature1Title: '인터랙티브 음성 피치 분석기',
      feature1Desc: '실시간 파형 피치 트래킹으로 원어민의 억양, 피치, 리듬을 정밀하게 측정합니다.',
      feature2Title: 'K-Culture 헤리티지 전문 모듈',
      feature2Desc: '전통 궁중 음식부터 현대 K-POP 및 미디어 문화까지, 어휘와 배경지식을 함께 익힙니다.',
      feature3Title: 'TOPIK 공식 대비 시스템',
      feature3Desc: '타이머 기반 공식 모의고사와 자동 채점, 정밀 해설 리포트로 목표 등급을 달성합니다.',
      feature4Title: '1:1 검증된 한국인 원어민 튜터',
      feature4Desc: '전문 한국인 원어민 튜터와 30분간 1:1 실시간 화상 클래스를 진행하며 개인별 맞춤 피드백을 받으세요.',
      levelTestBannerTitle: '3분 만에 진단하는 나의 정밀 한국어 레벨',
      levelTestBannerDesc: '무료 AI 진단 테스트를 수행하고 개인 맞춤형 학습 경로를 추천받으세요.',
      takeLevelTest: '진단 레벨 테스트 받기'
    },
    kculture: {
      title: 'K-Culture 헤리티지 & 현대 문화',
      subtitle: '한국의 아름다운 전통, 음식, 음악, 라이프스타일을 탐구하며 풍부한 어휘력을 다지세요.',
      tutorBannerTitle: 'K-Culture 전문 원어민 1:1 라이브 화상 수업 예약',
      tutorBannerDesc: 'AI 발음 피드백을 기반으로 한국인 전문 튜터와 30분간 1:1 실시간 화상 심층 클래스를 수강하세요.',
      bookTutorBtn: '1:1 원어민 튜터 예약하기 (30분 / -50 CR)',
      bookingConfirmed: '✅ 1:1 화상 클래스가 확정되었습니다! (이메일 또는 마이페이지에서 화상 입장 링크를 확인하세요. -50 CR)',
      needMoreCredits: '크레딧이 부족하신가요?',
      rechargeLink: '+ 크레딧 패키지 충전'
    },
    lyricsLab: {
      title: 'K-POP 가사 피치 & 발음 진단 랩',
      subtitle: 'K-POP 히트곡 가사를 한 줄씩 따라 부르고 말하며 AI 피치 파형 진단 리포트를 받아보세요.',
      selectSong: '곡 선택',
      pronunciationDiagnose: '발음 정밀 진단 리포트',
      recordBtn: '음성 녹음 시작 (6초)',
      stopBtn: '중지 및 AI 분석',
      balance: '잔액',
      recharge: '충전'
    },
    dashboard: {
      title: '학습 센터 & 맞춤 커리큘럼',
      subtitle: '일일 스트릭을 유지하고 단계별 커리큘럼으로 한국어 실력을 키우세요.',
      menuHangul: '한글 자모',
      menuPhrases: '생활 필수 표현',
      menuSlang: 'MZ 신조어 • 밈',
      menuHonorifics: '존경어 • 높임말 (존댓말)',
      menuGrammar: '핵심 문법',
      menuTracing: '따라 쓰기 연습',
      menuQuiz: '단어 퀴즈',
      menuAiConversation: 'AI 회화 역할극',
      streak: '일 연속',
      xp: 'XP',
      credits: '크레딧'
    },
    topik: {
      title: 'TOPIK (한국어능력시험) 실전 모의고사',
      subtitle: '실제 시험 타이머와 정밀 오답 해설이 포함된 TOPIK I & II 모의고사를 시작하세요.',
      level1: 'TOPIK I (초급 / 1-2급)',
      level2: 'TOPIK II (중고급 / 3-6급)',
      startExam: '실전 모의고사 시작 (-20 CR)',
      costNotice: '1회 응시 시 20 CR 차감'
    },
    aiTutor: {
      title: '24시간 AI 한국어 대화 튜터 지우',
      subtitle: '자연스러운 대화 연습, 문법 질문, 번역 요청을 AI 지우와 실시간으로 나눠보세요.',
      welcomeMsg: "안녕하세요! 👋 저는 Talk Korean의 AI 한국어 튜터 지우입니다. 한국어, 영어, 일본어, 스페인어로 무엇이든 편하게 물어보세요!",
      placeholder: '한국어, 영어, 일본어, 스페인어로 메시지를 입력하세요...',
      costNotice: '대화 세션당 5 CR 차감',
      send: '전송'
    },
    creditModal: {
      title: '크레딧 스토어 & 결제',
      subtitle: '크레딧을 충전하고 1:1 원어민 튜터, TOPIK 모의고사, AI 음성 분석을 자유롭게 이용하세요.',
      currentBalance: '현재 보유 크레딧',
      basicPlan: '스타터 패키지',
      proPlan: '프로 러너 패키지',
      masterPlan: '마스터 컬처 패키지',
      buyBtn: '지금 충전하기',
      payMethod: '결제 수단 선택'
    },
    tutors: {
      title: '1:1 검증된 한국인 원어민 튜터',
      subtitle: '전문 자격증을 보유한 한국인 튜터와 1:1 개인 맞춤 화상 수업을 수강하세요.',
      bookBtn: '30분 클래스 예약 (-50 CR)',
      confirmedMsg: '클래스 예약이 확정되었습니다!'
    },
    levelTest: {
      title: 'AI 한국어 진단 레벨 테스트',
      subtitle: '5가지 적응형 문항을 풀고 나의 현재 한국어 어휘 및 문법 등급을 확인하세요.',
      startBtn: '진단 테스트 시작',
      questionProgress: '문항',
      resultTitle: '나의 정밀 진단 레벨 결과'
    }
  }
};
