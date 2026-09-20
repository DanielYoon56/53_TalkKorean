export interface DictationQuestion {
  id: string;
  category: 'daily' | 'kculture' | 'kpop' | 'topik' | 'idiom';
  level: '초급 (Beginner)' | '중급 (Intermediate)' | '고급 (Advanced)';
  audioPromptKo: string;        // 원문 정답 한국어 문장 (TTS로 음성 재생됨)
  romanized: string;            // 발음 로마자
  englishTranslation: string;   // 영어 번역
  grammarTipKo: string;         // 맞춤법/연음 법칙 및 문법 해설
  spellingCheckFocus: string;   // 받아쓰기 시 특히 주의해야 할 맞춤법/띄어쓰기 포인트 (예: 연음 법칙, 받침 구별)
  initialConsonantHint: string; // 초성 힌트 (예: ㅇㄴㅎㅅㅇ)
  wordBank: string[];           // 단어 조합 모드용 블록 리스트 (오답 방해 단어 포함)
}

export interface DictationCategoryMeta {
  id: 'all' | 'daily' | 'kculture' | 'kpop' | 'topik' | 'idiom';
  titleKo: string;
  titleEn: string;
  icon: string;
  badgeColor: string;
}

export const DICTATION_CATEGORIES: DictationCategoryMeta[] = [
  { id: 'all', titleKo: '전체 문제', titleEn: 'All Tests', icon: '📝', badgeColor: 'bg-neutral-800 text-white' },
  { id: 'daily', titleKo: '일상 회화', titleEn: 'Daily Life', icon: '☕', badgeColor: 'bg-amber-100 text-amber-900 border-amber-300' },
  { id: 'kpop', titleKo: 'K-POP & 드라마', titleEn: 'K-POP & Drama', icon: '🎵', badgeColor: 'bg-purple-100 text-purple-900 border-purple-300' },
  { id: 'kculture', titleKo: '한국 문화 & 음식', titleEn: 'K-Culture & Food', icon: '🍲', badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
  { id: 'topik', titleKo: 'TOPIK 필수 문장', titleEn: 'TOPIK Grammar', icon: '🎯', badgeColor: 'bg-sky-100 text-sky-900 border-sky-300' },
  { id: 'idiom', titleKo: '속담 & 관용구', titleEn: 'Idioms & Slang', icon: '💡', badgeColor: 'bg-rose-100 text-rose-900 border-rose-300' },
];

export const DICTATION_QUESTIONS: DictationQuestion[] = [
  // 1. 일상 회화 (Daily)
  {
    id: 'dict_daily_01',
    category: 'daily',
    level: '초급 (Beginner)',
    audioPromptKo: '안녕하세요! 오늘 날씨가 정말 좋네요.',
    romanized: 'Annyeonghaseyo! Oneul nalssiga jeongmal jonneyo.',
    englishTranslation: 'Hello! The weather is really nice today.',
    grammarTipKo: '[연음 및 자음동화] "좋네요"는 [존네요]로 비음화 현상이 일어납니다. "날씨가"의 조사 "-가" 결합 시 띄어쓰기에 주의하세요.',
    spellingCheckFocus: '좋네요 (발음 [존네요] 주의), 날씨가 (붙여쓰기)',
    initialConsonantHint: 'ㅇㄴㅎㅅㅇ! ㅇㄴ ㄴㅆㄱ ㅈㅁ ㅈㄴㅇ.',
    wordBank: ['안녕하세요!', '오늘', '날씨가', '정말', '좋네요.', '어제', '비가', '왔어요.']
  },
  {
    id: 'dict_daily_02',
    category: 'daily',
    level: '초급 (Beginner)',
    audioPromptKo: '따뜻한 아메리카노 한 잔 부탁드립니다.',
    romanized: 'Ttatteuthan amerikano han jan butakdeurimnida.',
    englishTranslation: 'One cup of warm Americano, please.',
    grammarTipKo: '[단위명사 띄어쓰기] "한 잔", "두 개"처럼 수량을 세는 단위명사는 앞의 수관형사와 띄어 씁니다. "따뜻한"의 받침 "ㅅ"에 유의하세요.',
    spellingCheckFocus: '한 잔 (띄어쓰기), 따뜻한 (ㅅ 받침)',
    initialConsonantHint: 'ㄸㄸㅎ ㅇㅁㄹㅋㄴ ㅎ ㅈ ㅂㅌㄷㄹㄴㄷ.',
    wordBank: ['따뜻한', '아메리카노', '한', '잔', '부탁드립니다.', '차가운', '두', '주세요.']
  },
  {
    id: 'dict_daily_03',
    category: 'daily',
    level: '중급 (Intermediate)',
    audioPromptKo: '강남역 4번 출구 쪽에서 만나요.',
    romanized: 'Gangnam-yeok sa-beon chulgu jjok-eseo mannayo.',
    englishTranslation: 'Let’s meet around Gangnam Station Exit 4.',
    grammarTipKo: '[연음 및 띄어쓰기] "강남역" [강남녁] 사이 첨가 발음, "쪽에서"는 방향을 나타내는 의존명사 "쪽"에 조사 "-에서"가 결합한 형태입니다.',
    spellingCheckFocus: '4번 출구 (띄어쓰기), 쪽에서 (조사 결합)',
    initialConsonantHint: 'ㄱㄴㅇ 4ㅂ ㅊㄱ ㅉㅇㅅ ㅁㄴㅇ.',
    wordBank: ['강남역', '4번', '출구', '쪽에서', '만나요.', '홍대입구', '앞에서', '기다릴게요.']
  },
  {
    id: 'dict_daily_04',
    category: 'daily',
    level: '중급 (Intermediate)',
    audioPromptKo: '지하철을 잘못 타서 반대 방향으로 갔어요.',
    romanized: 'Jihacheor-eul jalmot taseo bandae banghyang-euro gasseoyo.',
    englishTranslation: 'I took the wrong subway and went in the opposite direction.',
    grammarTipKo: '[구별하기] "잘못"은 한 단어 부사이므로 붙여 씁니다. "갔어요"는 과거 시제 "-았/었-"이 쓰였습니다.',
    spellingCheckFocus: '잘못 (한 단어 붙여쓰기), 갔어요 (ㅆ 받침)',
    initialConsonantHint: 'ㅈㅎㅊㅇ ㅈㅁ ㅌㅅ ㅂㄷ ㅂㅎㅇㄹ ㄱㅆㅇ.',
    wordBank: ['지하철을', '잘못', '타서', '반대', '방향으로', '갔어요.', '버스를', '놓쳤어요.']
  },

  // 2. K-POP & 드라마 (K-POP & Drama)
  {
    id: 'dict_kpop_01',
    category: 'kpop',
    level: '초급 (Beginner)',
    audioPromptKo: '너와 함께하는 모든 순간이 눈부셨다.',
    romanized: 'Neowa hamkkehaneun modeun sungani nunbusyeotda.',
    englishTranslation: 'Every moment spent with you was dazzling.',
    grammarTipKo: '[도깨비 명대사] "함께하는"의 형태소 결합과 "눈부셨다"의 과거 시제 종결어미 "-었다"의 ㅆ 받침에 주의하세요.',
    spellingCheckFocus: '눈부셨다 (ㅆ 받침), 모든 순간 (띄어쓰기)',
    initialConsonantHint: 'ㄴㅇ ㅎㄲㅎㄴ ㅁㄷ ㅅㄱㅇ ㄴㅂㅅㄷ.',
    wordBank: ['너와', '함께하는', '모든', '순간이', '눈부셨다.', '나와', '영원히', '빛났다.']
  },
  {
    id: 'dict_kpop_02',
    category: 'kpop',
    level: '중급 (Intermediate)',
    audioPromptKo: '무대 위에서 가장 빛나는 별이 될 거야.',
    romanized: 'Mudae wieseo gajang binnaneun byeori doel geoya.',
    englishTranslation: 'I will become the brightest star on the stage.',
    grammarTipKo: '[자음동화 및 의존명사] "빛나는"은 [빈나는]으로 자음동화가 일어납니다. "될 거야"에서 의존명사 "거"는 앞 말과 띄어 씁니다.',
    spellingCheckFocus: '빛나는 (ㅊ 받침), 될 거야 (띄어쓰기 및 "될" vs "됄" 구별)',
    initialConsonantHint: 'ㅁㄷ ㅇㅇㅅ ㄱㅈ ㅂㄴㄴ ㅂㅇ ㄷ ㄱㅇ.',
    wordBank: ['무대', '위에서', '가장', '빛나는', '별이', '될', '거야.', '하늘', '꿈을', '이룰']
  },
  {
    id: 'dict_kpop_03',
    category: 'kpop',
    level: '고급 (Advanced)',
    audioPromptKo: '우리가 함께 부르는 노랫소리가 세상에 울려 퍼진다.',
    romanized: 'Uriga hamkke bureuneun noraetsoriga sesang-e ullyeo peojinda.',
    englishTranslation: 'The sound of the song we sing together echoes across the world.',
    grammarTipKo: '[사이시옷 법칙] "노래" + "소리"가 결합하여 합성어가 될 때 된소리 [노래쏘리]로 발음되므로 사이시옷(ㅅ)을 받쳐 적어 "노랫소리"가 됩니다.',
    spellingCheckFocus: '노랫소리 (사이시옷 ㅅ), 울려 퍼진다 (유음화 [울려] 및 띄어쓰기)',
    initialConsonantHint: 'ㅇㄹㄱ ㅎㄲ ㅂㄹㄴ ㄴㄹㅅㄹㄱ ㅅㅅㅇ ㅇㄹ ㅍㅈㄷ.',
    wordBank: ['우리가', '함께', '부르는', '노랫소리가', '세상에', '울려', '퍼진다.', '목소리가', '가득']
  },

  // 3. 한국 문화 & 음식 (K-Culture & Food)
  {
    id: 'dict_culture_01',
    category: 'kculture',
    level: '초급 (Beginner)',
    audioPromptKo: '추운 겨울에는 따뜻한 온돌방이 최고예요.',
    romanized: 'Chuun gyeoureneun ttatteuthan ondolbangi choegoyeyo.',
    englishTranslation: 'In cold winter, a warm Ondol room is the best.',
    grammarTipKo: '[종결어미] 받침 없는 체언 "최고" 뒤에는 "-예요"가 붙습니다 ("-이에요"의 축약형). "-에요"로 잘못 쓰지 않도록 주의합니다.',
    spellingCheckFocus: '최고예요 ("-예요" vs "-에요"), 온돌방이 (연음 [온돌방이])',
    initialConsonantHint: 'ㅊㅇ ㄱㅇㅇㄴ ㄸㄸㅎ ㅇㄷㅂㅇ ㅊㄱㅇㅇ.',
    wordBank: ['추운', '겨울에는', '따뜻한', '온돌방이', '최고예요.', '시원한', '여름에는', '좋아요.']
  },
  {
    id: 'dict_culture_02',
    category: 'kculture',
    level: '중급 (Intermediate)',
    audioPromptKo: '비 오는 날에는 바삭한 파전과 막걸리가 생각나요.',
    romanized: 'Bi oneun nareneun basakhan pajeon-gwa makgeolliga saenggangnayo.',
    englishTranslation: 'On a rainy day, crispy Pajeon and Makgeolli come to mind.',
    grammarTipKo: '[관형사형 전성어미 띄어쓰기] "비 오는 날"처럼 관형사형 어미 "-는" 뒤의 명사는 띄어 씁니다. "생각나요"는 자음동화 [생강나요]로 소리 납니다.',
    spellingCheckFocus: '비 오는 날 (띄어쓰기), 바삭한 (ㄱ 받침), 생각나요 (ㄱ+ㄴ 비음화)',
    initialConsonantHint: 'ㅂ ㅇㄴ ㄴㅇㄴ ㅂㅅㅎ ㅍㅈㄱ ㅁㄱㄹㄱ ㅅㄱㄴㅇ.',
    wordBank: ['비', '오는', '날에는', '바삭한', '파전과', '막걸리가', '생각나요.', '눈', '김치전']
  },
  {
    id: 'dict_culture_03',
    category: 'kculture',
    level: '고급 (Advanced)',
    audioPromptKo: '김치는 알맞게 발효될수록 감칠맛과 영양이 더욱 풍부해집니다.',
    romanized: 'Gimchineun almaotge balhyodoelsurok gamchilmatgwa yeong-yang-i deouk pungbuhaejimnida.',
    englishTranslation: 'As kimchi ferments just right, its savory flavor and nutrients become richer.',
    grammarTipKo: '[알맞게 vs 걸맞게] "알맞다"는 형용사이므로 "알맞은/알맞게"가 맞고 "알맞는"은 틀립니다. "감칠맛"의 칠+맛 합성어 표기에 주의하세요.',
    spellingCheckFocus: '알맞게 ("알맞는" X), 감칠맛 (칠+맛), 발효될수록 (연결어미)',
    initialConsonantHint: 'ㄱㅊㄴ ㅇㅁㄱ ㅂㅎㄷㅅㄹ ㄱㅊㅁㄱ ㅇㅇㅇ ㄷㅇ ㅍㅂㅎㅈㄴㄷ.',
    wordBank: ['김치는', '알맞게', '발효될수록', '감칠맛과', '영양이', '더욱', '풍부해집니다.', '된장은', '깊은맛']
  },

  // 4. TOPIK 필수 문장 (TOPIK)
  {
    id: 'dict_topik_01',
    category: 'topik',
    level: '초급 (Beginner)',
    audioPromptKo: '주말에 도서관에 가서 한국어 시험공부를 했습니다.',
    romanized: 'Jumare doseogwane gaseo hangugeo siheomgongbureul haetseumnida.',
    englishTranslation: 'On the weekend, I went to the library and studied for the Korean test.',
    grammarTipKo: '[조사 결합] 장소 이동 목적격 조사 "-에 가서"와 "한국어 시험공부"의 명사 나열 표기 및 "-습니다" 격식체 종결형입니다.',
    spellingCheckFocus: '시험공부를 (합성 명사), 했습니다 (ㅆ 받침)',
    initialConsonantHint: 'ㅈㅁㅇ ㄷㅅㄱㅇ ㄱㅅ ㅎㄱㅇ ㅅㅎㄱㅂㄹ ㅎㅅㄴㄷ.',
    wordBank: ['주말에', '도서관에', '가서', '한국어', '시험공부를', '했습니다.', '평일에', '카페에서']
  },
  {
    id: 'dict_topik_02',
    category: 'topik',
    level: '중급 (Intermediate)',
    audioPromptKo: '환경 보호를 위해 일회용품 사용을 줄여야 합니다.',
    romanized: 'Hwan-gyeong boho-reul wihae il-hoeyongpum sayong-eul juryeoya hamnida.',
    englishTranslation: 'To protect the environment, we must reduce the use of disposable products.',
    grammarTipKo: '[필수 문법: -(으)려/기 위해, -아/어야 하다] "줄여야"는 "줄이다" + "-어야"가 축약된 형태입니다. "일회용품"의 "회" 모음에 유의하세요.',
    spellingCheckFocus: '일회용품 (ㅚ 모음), 줄여야 (줄이다+-어야)',
    initialConsonantHint: 'ㅎㄱ ㅂㅎㄹ ㅇㅎ ㅇㅎㅇㅍ ㅅㅇㅇ ㅈㅇㅇ ㅎㄴㄷ.',
    wordBank: ['환경', '보호를', '위해', '일회용품', '사용을', '줄여야', '합니다.', '자연', '플라스틱']
  },
  {
    id: 'dict_topik_03',
    category: 'topik',
    level: '고급 (Advanced)',
    audioPromptKo: '기술이 발전함에 따라 인간의 삶의 질도 크게 향상되었습니다.',
    romanized: 'Gisuri baljeonhame ttara in-ganui salmui jildo keuge hyangsangdoeeotseumnida.',
    englishTranslation: 'As technology develops, the quality of human life has also significantly improved.',
    grammarTipKo: '[고급 연결어미: -(으)ㅁ에 따라] "삶의"는 명사 "삶"([삼])에 관형격 조사 "-의"가 결합하여 [살믜] 또는 [살메]로 발음되지만 표기는 반드시 "삶의"로 적어야 합니다.',
    spellingCheckFocus: '삶의 (ㄹㅁ 겹받침), 발전함에 따라 (띄어쓰기)',
    initialConsonantHint: 'ㄱㅅㅇ ㅂㅈㅎㅇ ㄸㄹ ㅇㄱㅇ ㅅㅇ ㅈㄷ ㅋㅋ ㅎㅅㄷㅇㅅㄴㄷ.',
    wordBank: ['기술이', '발전함에', '따라', '인간의', '삶의', '질도', '크게', '향상되었습니다.', '사회가', '변화하면서']
  },

  // 5. 속담 & 관용구 (Idioms)
  {
    id: 'dict_idiom_01',
    category: 'idiom',
    level: '초급 (Beginner)',
    audioPromptKo: '가는 말이 고와야 오는 말이 곱다.',
    romanized: 'Ganeun mari gowaya oneun mari gopda.',
    englishTranslation: 'Speak kind words to hear kind words return. (What goes around comes around.)',
    grammarTipKo: '[속담 & ㅂ 불규칙] "곱다"에 연결어미 "-아야"가 결합할 때 ㅂ 불규칙 활용으로 "고와야"가 됩니다.',
    spellingCheckFocus: '고와야 (곱다 ㅂ 불규칙 활용: 고와야 O / 고아야 X), 오는 말이 (띄어쓰기)',
    initialConsonantHint: 'ㄱㄴ ㅁㅇ ㄱㅇㅇ ㅇㄴ ㅁㅇ ㄱㄷ.',
    wordBank: ['가는', '말이', '고와야', '오는', '말이', '곱다.', '좋은', '행동이', '예쁘다.']
  },
  {
    id: 'dict_idiom_02',
    category: 'idiom',
    level: '중급 (Intermediate)',
    audioPromptKo: '천 리 길도 한 걸음부터 시작하는 법이다.',
    romanized: 'Cheon ri gildo han georeumbuteo sijakhaneun beobida.',
    englishTranslation: 'Even a journey of a thousand miles begins with a single step.',
    grammarTipKo: '[단위명사 & 의존명사] "천 리", "한 걸음" 단위명사 띄어쓰기와 의존명사 "법이다" 결합 규칙입니다. "길도"의 거센소리화에 유의하세요.',
    spellingCheckFocus: '천 리 (띄어쓰기), 한 걸음부터 (단위명사 띄어쓰기)',
    initialConsonantHint: 'ㅊ ㄹ ㄱㄷ ㅎ ㄱㅇㅂㅌ ㅅㅈㅎㄴ ㅂㅇㄷ.',
    wordBank: ['천', '리', '길도', '한', '걸음부터', '시작하는', '법이다.', '만', '백', '출발이다.']
  },
  {
    id: 'dict_idiom_03',
    category: 'idiom',
    level: '고급 (Advanced)',
    audioPromptKo: '호랑이도 제 말 하면 온다더니 마침 네 이야기를 하고 있었어.',
    romanized: 'Horang-ido je mal hamyeon ondadeoni machim ne iyagireul hago isseosseo.',
    englishTranslation: 'Speak of the tiger and it appears—we were just talking about you!',
    grammarTipKo: '[구어체 인용 축약] "온다더니"는 "온다고 하더니"의 준말입니다. "마침"과 "있었어"(쌍시옷 받침)의 맞춤법을 확인하세요.',
    spellingCheckFocus: '온다더니 (준말 표기), 있었어 (ㅆ 받침), 제 말 하면 (띄어쓰기)',
    initialConsonantHint: 'ㅎㄹㅇㄷ ㅈ ㅁ ㅎㅁ ㅇㄷㄷㄴ ㅁㅊ ㄴ ㅇㅇㄱㄹ ㅎㄱ ㅇㅇㅇ.',
    wordBank: ['호랑이도', '제', '말', '하면', '온다더니', '마침', '네', '이야기를', '하고', '있었어.', '소문이', '진짜']
  }
];
