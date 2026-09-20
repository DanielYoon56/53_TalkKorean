export interface OnomatopoeiaItem {
  id: string;
  word: string;
  type: '의성어' | '의태어';
  subType: '자연·소리' | '마음·감정' | '동작·움직임' | '음식·요리' | '사물·충격' | '신체·상태';
  romanized: string;
  meaningKo: string;
  meaningEn: string;
  emoji: string;
  pairWord?: {
    word: string;
    nuance: string;
  };
  exampleKo: string;
  exampleEn: string;
  nuanceTip: string;
  webtoonContext: string;
}

export interface VowelNuancePair {
  id: string;
  brightWord: string;
  brightMeaning: string;
  brightVowel: '양성 모음 (ㅏ, ㅗ)';
  darkWord: string;
  darkMeaning: string;
  darkVowel: '음성 모음 (ㅓ, ㅜ)';
  explanation: string;
  exampleBright: string;
  exampleDark: string;
}

export interface WebtoonScene {
  id: string;
  title: string;
  situation: string;
  koreanText: string;
  englishTranslation: string;
  soundEffects: string[];
  emoji: string;
  bgGradient: string;
}

export interface SoundQuizQuestion {
  id: string;
  question: string;
  soundClue?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  type: '의성어' | '의태어';
}

export const VOWEL_NUANCE_PAIRS: VowelNuancePair[] = [
  {
    id: 'vp-1',
    brightWord: '퐁당퐁당',
    brightMeaning: '작고 가벼운 돌멩이나 물방울이 물에 가볍게 빠지는 소리',
    brightVowel: '양성 모음 (ㅏ, ㅗ)',
    darkWord: '풍덩풍덩',
    darkMeaning: '크고 무거운 바위나 사람이 깊은 물에 거칠게 빠지는 소리',
    darkVowel: '음성 모음 (ㅓ, ㅜ)',
    explanation: '한국어 모음조화의 대표 규칙! 양성 모음(ㅏ, ㅗ)은 작고, 가볍고, 밝은 어감을 주며, 음성 모음(ㅓ, ㅜ)은 크고, 무겁고, 깊은 어감을 만듭니다.',
    exampleBright: '아이들이 시냇물에 작은 조약돌을 퐁당퐁당 던져요.',
    exampleDark: '다이빙 선수가 깊은 수영장 물에 풍덩풍덩 뛰어들었어요.'
  },
  {
    id: 'vp-2',
    brightWord: '알록달록',
    brightMeaning: '밝고 다양한 고운 색깔들이 예쁘게 어우러진 모양',
    brightVowel: '양성 모음 (ㅏ, ㅗ)',
    darkWord: '얼룩덜룩',
    darkMeaning: '어둡고 칙칙한 얼룩이나 때가 여기저기 묻어 지저분한 모양',
    darkVowel: '음성 모음 (ㅓ, ㅜ)',
    explanation: '옷이나 풍경을 칭찬할 때는 밝은 "알록달록"을, 옷에 커피나 흙탕물이 묻어 더러워졌을 때는 "얼룩덜룩"을 씁니다.',
    exampleBright: '가을 단풍잎이 산을 알록달록 곱게 물들였어요.',
    exampleDark: '흰 셔츠에 김치 국물이 튀어서 얼룩덜룩해졌어요.'
  },
  {
    id: 'vp-3',
    brightWord: '반짝반짝',
    brightMeaning: '작은 불빛이나 보석, 별이 곱고 앙증맞게 빛나는 모양',
    brightVowel: '양성 모음 (ㅏ, ㅗ)',
    darkWord: '번쩍번쩍',
    darkMeaning: '번개나 거대한 금빛 조명이 강렬하고 위협적으로 빛나는 모양',
    darkVowel: '음성 모음 (ㅓ, ㅜ)',
    explanation: '"반짝반짝"은 귀엽고 아름다운 광채, "번쩍번쩍"은 압도적이거나 눈이 부실 정도로 강한 빛에 사용합니다.',
    exampleBright: '밤하늘에 작은 별들이 반짝반짝 속삭이듯 빛나요.',
    exampleDark: '먹구름 사이로 천둥과 함께 번개가 번쩍번쩍 쳤어요.'
  },
  {
    id: 'vp-4',
    brightWord: '살랑살랑',
    brightMeaning: '봄바람이나 강아지 꼬리가 가볍고 부드럽게 흔들리는 모양',
    brightVowel: '양성 모음 (ㅏ, ㅗ)',
    darkWord: '설렁설렁',
    darkMeaning: '바람이 쌀쌀하게 불거나, 일을 진지하지 않고 대충대충 건성으로 하는 모양',
    darkVowel: '음성 모음 (ㅓ, ㅜ)',
    explanation: '"살랑살랑"은 사랑스럽고 산뜻한 움직임, "설렁설렁"은 집중하지 않고 겉핥기로 대충 하는 태도를 뜻하기도 합니다.',
    exampleBright: '봄바람이 살랑살랑 불어와 벚꽃잎이 흩날려요.',
    exampleDark: '숙제를 설렁설렁 대충 끝내고 게임을 시작했어요.'
  }
];

export const ONOMATOPOEIA_ITEMS: OnomatopoeiaItem[] = [
  // 1. 의성어 (소리 흉내)
  {
    id: 'ono-1',
    word: '두근두근',
    type: '의성어',
    subType: '마음·감정',
    romanized: 'dugeun-dugeun',
    meaningKo: '가슴이 심하게 뛰는 소리 (설렘, 긴장)',
    meaningEn: 'Pitter-patter / Thump-thump (heart beating with excitement or nervousness)',
    emoji: '💓',
    pairWord: { word: '콩닥콩닥', nuance: '조금 더 가볍고 수줍게 뛰는 심장 소리' },
    exampleKo: '좋아하는 사람에게 고백하기 직전에 심장이 두근두근 뛰었어요.',
    exampleEn: 'My heart was beating pitter-patter right before confessing to my crush.',
    nuanceTip: '드라마 고백 장면이나 면접 대기실에서 한국인이 가장 많이 쓰는 대표 표현입니다.',
    webtoonContext: '로맨스 웹툰에서 주인공들이 눈을 마주칠 때 배경 효과음으로 항상 등장합니다.'
  },
  {
    id: 'ono-2',
    word: '보글보글',
    type: '의성어',
    subType: '음식·요리',
    romanized: 'bogeul-bogeul',
    meaningKo: '찌개나 국물이 냄비에서 맛있게 끓는 소리',
    meaningEn: 'Bubbling / Simmering stew boiling appetizingly',
    emoji: '🍲',
    pairWord: { word: '지글지글', nuance: '삼겹살이나 고기가 불판 위에서 구워지는 기름 소리' },
    exampleKo: '비 오는 날 따뜻한 김치찌개가 보글보글 끓고 있어요.',
    exampleEn: 'A warm kimchi stew is bubbling away in the pot on this rainy day.',
    nuanceTip: '한국의 먹방(Mukbang)이나 식당 예능에서 국물 요리의 맛있음을 극대화할 때 씁니다.',
    webtoonContext: '음식 만화에서 뚝배기 주위에 "보글보글" 글씨가 김과 함께 몽글몽글 피어오릅니다.'
  },
  {
    id: 'ono-3',
    word: '주룩주룩',
    type: '의성어',
    subType: '자연·소리',
    romanized: 'juruk-juruk',
    meaningKo: '비나 눈물이 굵게 쏟아지는 소리',
    meaningEn: 'Pouring down / Rain raining cats and dogs',
    emoji: '🌧️',
    pairWord: { word: '보슬보슬', nuance: '봄비가 안개처럼 부드럽고 가늘게 내리는 소리' },
    exampleKo: '창밖으로 시원한 여름 소나기가 주룩주룩 내리고 있네요.',
    exampleEn: 'A refreshing summer rain shower is pouring down outside the window.',
    nuanceTip: '가벼운 비는 "보슬보슬", 폭우처럼 쏟아지는 비는 "주룩주룩" 또는 "장대비"라고 부릅니다.',
    webtoonContext: '비 오는 날 창가 씬이나 슬픈 이별 장면에서 빗줄기 배경음으로 쓰입니다.'
  },
  {
    id: 'ono-4',
    word: '꼬르륵',
    type: '의성어',
    subType: '신체·상태',
    romanized: 'kkoreureuk',
    meaningKo: '배가 고파서 뱃속에서 요동치는 민망한 소리',
    meaningEn: 'Stomach growling / Tummy rumbling with hunger',
    emoji: '🤤',
    exampleKo: '조용한 도서관에서 공부하다가 갑자기 배에서 꼬르륵 소리가 났어요.',
    exampleEn: 'While studying in the quiet library, my stomach suddenly gave a loud rumble.',
    nuanceTip: '민망하거나 친구끼리 "배고프다, 밥 먹으러 가자!"라고 말할 때 재치 있게 인용합니다.',
    webtoonContext: '주인공이 다이어트를 하거나 배고파서 쓰러질 때 배 주위에 지그재그 번개 효과음으로 표현됩니다.'
  },
  {
    id: 'ono-5',
    word: '바삭바삭',
    type: '의성어',
    subType: '음식·요리',
    romanized: 'basak-basak',
    meaningKo: '과자나 갓 튀긴 치킨을 씹을 때 나는 경쾌한 소리',
    meaningEn: 'Crispy / Crunchy sound when biting fried food or cookies',
    emoji: '🍗',
    pairWord: { word: '아삭아삭', nuance: '사과나 오이, 김치 같은 채소를 씹을 때 시원한 소리' },
    exampleKo: '방금 튀겨낸 한국 양념치킨이 겉은 바삭바삭하고 속은 촉촉해요.',
    exampleEn: 'The freshly fried Korean fried chicken is crispy on the outside and moist inside.',
    nuanceTip: '한국의 "겉바속촉(겉은 바삭 속은 촉촉)"이라는 신조어의 핵심 어원이 바로 바삭바삭입니다.',
    webtoonContext: '음식을 씹는 입 주위에 별빛 효과와 함께 강조선으로 등장합니다.'
  },
  {
    id: 'ono-6',
    word: '콜록콜록',
    type: '의성어',
    subType: '신체·상태',
    romanized: 'kollok-kollok',
    meaningKo: '목이 간지럽거나 감기에 걸려 기침하는 소리',
    meaningEn: 'Coughing / Hack-hack sound of coughing',
    emoji: '😷',
    exampleKo: '환절기라 감기 환자가 많아서 강의실 곳곳에서 콜록콜록 소리가 들려요.',
    exampleEn: 'Because of the seasonal shift, people are coughing here and there in the lecture room.',
    nuanceTip: '약국이나 병원에서 "제가 콜록콜록 기침이 심해요"라고 증상을 설명할 때 자주 씁니다.',
    webtoonContext: '환자 마스크 주위에 흩날리는 공기 방울과 함께 배치됩니다.'
  },
  {
    id: 'ono-7',
    word: '쿵쾅쿵쾅',
    type: '의성어',
    subType: '사물·충격',
    romanized: 'kungkwhang-kungkwhang',
    meaningKo: '무거운 발소리나 물건이 크게 울리며 부딪히는 소리',
    meaningEn: 'Thumping / Pounding / Heavy footsteps stomping loudly',
    emoji: '🔨',
    exampleKo: '아파트 층간소음으로 위층에서 쿵쾅쿵쾅 뛰는 소리가 들렸어요.',
    exampleEn: 'Due to inter-floor noise in the apartment, loud stomping sounds were heard from above.',
    nuanceTip: '한국 아파트 생활에서 "층간소음"을 말할 때 거의 100% 사용되는 필수 의성어입니다.',
    webtoonContext: '괴물이나 거인이 걸어오거나 천장이 흔들릴 때 화면 전체가 진동하는 연출에 쓰입니다.'
  },
  {
    id: 'ono-8',
    word: '째깍째깍',
    type: '의성어',
    subType: '사물·충격',
    romanized: 'jjaegak-jjaegak',
    meaningKo: '시계 초침이 규칙적으로 돌아가는 소리',
    meaningEn: 'Tick-tock / The rhythmic ticking of a clock',
    emoji: '⏰',
    exampleKo: '시험 종료 1분을 남겨두고 벽시계가 째깍째깍 긴장감을 더해요.',
    exampleEn: 'With 1 minute left on the exam, the clock ticks away, adding to the tension.',
    nuanceTip: '시간이 촉박하거나 마감 시간이 다가올 때 심리적 긴장감을 묘사합니다.',
    webtoonContext: '폭탄 카운트다운이나 시험 시간 직전의 팽팽한 장면에 등장합니다.'
  },
  {
    id: 'ono-9',
    word: '멍멍 & 야옹',
    type: '의성어',
    subType: '자연·소리',
    romanized: 'meong-meong & ya-ong',
    meaningKo: '강아지(멍멍)와 고양이(야옹)의 울음소리',
    meaningEn: 'Woof-woof (Barking dog) & Meow (Purring cat)',
    emoji: '🐶',
    exampleKo: '마당에서 강아지가 멍멍 짖고, 담장 위에서는 고양이가 야옹 울어요.',
    exampleEn: 'The puppy barks woof-woof in the yard, and a cat meows on the fence.',
    nuanceTip: '한국인은 강아지를 귀엽게 부를 때 "댕댕이" 혹은 "멍멍이"라고 부릅니다.',
    webtoonContext: '반려동물 캐릭터가 말풍선에 귀엽게 표기하는 감초 소리입니다.'
  },
  {
    id: 'ono-10',
    word: '뚝딱뚝딱',
    type: '의성어',
    subType: '사물·충격',
    romanized: 'ttukttak-ttukttak',
    meaningKo: '목공 도구를 쓰거나 음식을 능숙하게 순식간에 만드는 소리',
    meaningEn: 'Hammering / Whipping something up swiftly and skillfully',
    emoji: '🛠️',
    exampleKo: '엄마는 냉장고에 있는 재료로 맛있는 볶음밥을 뚝딱뚝딱 만드셨어요.',
    exampleEn: 'Mom quickly whipped up delicious fried rice using the ingredients in the fridge.',
    nuanceTip: '한국어로 "밥 한 그릇 뚝딱 비웠다"처럼 아주 빠르고 손쉽게 해치울 때도 비유적으로 씁니다.',
    webtoonContext: '대장장이가 검을 만들거나 요리사가 신들린 칼질을 할 때의 효과음입니다.'
  },
  {
    id: 'ono-11',
    word: '찰랑찰랑',
    type: '의성어',
    subType: '자연·소리',
    romanized: 'challang-challang',
    meaningKo: '맑은 물이나 술이 잔에 가득 차 가볍게 출렁이는 소리와 모양',
    meaningEn: 'Sloshing / Splashing gently in a full cup or calm water',
    emoji: '🌊',
    exampleKo: '유리잔에 시원한 보리차가 찰랑찰랑 넘칠 듯 담겨 있어요.',
    exampleEn: 'Refreshing barley tea is filled to the brim in the glass, sloshing gently.',
    nuanceTip: '의성어이면서 의태어로도 쓰입니다. 머리카락이 윤기 있게 흔들릴 때도 "찰랑거린다"고 합니다.',
    webtoonContext: '샴푸 광고 연출이나 술잔을 부딪히기 전 건배 장면에 자주 보입니다.'
  },
  {
    id: 'ono-12',
    word: '찰칵',
    type: '의성어',
    subType: '사물·충격',
    romanized: 'chakkak',
    meaningKo: '카메라 셔터를 눌러 사진을 찍는 소리',
    meaningEn: 'Click / Snap (Camera shutter taking a photograph)',
    emoji: '📸',
    exampleKo: '노을 지는 한강공원을 배경으로 스마트폰 카메라 셔터를 찰칵 눌렀어요.',
    exampleEn: 'I clicked the smartphone camera shutter against the sunset backdrop of Han River Park.',
    nuanceTip: '한국에서는 인생샷을 찍을 때 "자, 하나 둘 셋~ 찰칵!" 하고 구호를 외칩니다.',
    webtoonContext: '인스타그램 인증샷 씬이나 파파라치 취재 장면의 대표 사운드입니다.'
  },

  // 2. 의태어 (모습·상태 흉내)
  {
    id: 'ono-13',
    word: '반짝반짝',
    type: '의태어',
    subType: '신체·상태',
    romanized: 'banjjak-banjjak',
    meaningKo: '작은 빛이나 별, 보석이 곱게 빛나는 모양',
    meaningEn: 'Twinkling / Sparkling / Shimmering beautifully',
    emoji: '✨',
    pairWord: { word: '번쩍번쩍', nuance: '훨씬 크고 강렬하며 위압적인 섬광' },
    exampleKo: '아이의 초롱초롱한 눈망울이 호기심으로 반짝반짝 빛나고 있었어요.',
    exampleEn: 'The child’s bright eyes were sparkling with sheer curiosity.',
    nuanceTip: '동요 "반짝반짝 작은 별"로 모든 한국인이 태어나서 가장 먼저 배우는 의태어 중 하나입니다.',
    webtoonContext: '첫눈에 반했을 때 주인공 등 뒤로 흩날리는 반짝이 특수효과입니다.'
  },
  {
    id: 'ono-14',
    word: '살금살금',
    type: '의태어',
    subType: '동작·움직임',
    romanized: 'salgeum-salgeum',
    meaningKo: '발소리가 나지 않도록 조심스럽게 살며시 걷는 모양',
    meaningEn: 'Tiptoeing / Creeping stealthily without making a sound',
    emoji: '🤫',
    exampleKo: '밤늦게 귀가해서 가족들이 깰까 봐 살금살금 발끝으로 걸어 들어왔어요.',
    exampleEn: 'Returning home late at night, I tiptoed in on my toes so as not to wake my family.',
    nuanceTip: '서프라이즈 파티를 준비하거나 몰래 다가갈 때 쓰는 가장 재미있는 한국어 걸음걸이 표현입니다.',
    webtoonContext: '도둑고양이나 장난꾸러기가 뒤에서 몰래 접근하는 서스펜스 씬에 쓰입니다.'
  },
  {
    id: 'ono-15',
    word: '싱글벙글',
    type: '의태어',
    subType: '마음·감정',
    romanized: 'singgeul-beonggeul',
    meaningKo: '기분이 아주 좋아 입꼬리를 올리며 환하게 웃는 모양',
    meaningEn: 'Grinning from ear to ear / Smiling cheerfully with delight',
    emoji: '😁',
    pairWord: { word: '방긋방긋', nuance: '아기나 수줍은 소녀가 소리 없이 귀엽게 웃는 모습' },
    exampleKo: '원하던 회사에 합격 통보를 받은 삼촌이 하루 종일 싱글벙글 웃어요.',
    exampleEn: 'My uncle, who received an acceptance letter from his dream company, has been grinning all day.',
    nuanceTip: '얼굴 전체에서 행복한 아우라가 뿜어져 나올 때 다른 사람이 "무슨 좋은 일 있어? 왜 싱글벙글이야?"라고 묻습니다.',
    webtoonContext: '주인공이 행복한 상상을 할 때 입이 찢어지도록 웃는 캐리커처 씬에 배치됩니다.'
  },
  {
    id: 'ono-16',
    word: '꽁냥꽁냥',
    type: '의태어',
    subType: '마음·감정',
    romanized: 'kkongnyang-kkongnyang',
    meaningKo: '연인들이 다정하게 속닥이며 귓속말하거나 애정표현을 하는 모양',
    meaningEn: 'Lovey-dovey / Flirting affectionately and whispering sweet nothings',
    emoji: '👩‍❤️‍👨',
    exampleKo: '저기 한강 벤치에 앉은 커플이 꽁냥꽁냥 다정하게 데이트하고 있네요.',
    exampleEn: 'That couple sitting on the Han River bench is being all lovey-dovey on their date.',
    nuanceTip: 'K-드라마 팬들이 연인 케미를 칭찬할 때 가장 열광하는 트렌디한 감성 의태어입니다.',
    webtoonContext: '풋풋한 신혼부부나 썸 타는 남녀 주인공 사이에서 분홍빛 하트와 함께 뜹니다.'
  },
  {
    id: 'ono-17',
    word: '꾸벅꾸벅',
    type: '의태어',
    subType: '동작·움직임',
    romanized: 'kkubeok-kkubeok',
    meaningKo: '잠이 쏟아져 머리를 앞으로 떨어뜨리며 조는 모양',
    meaningEn: 'Nodding off / Dozing off repeatedly while sitting',
    emoji: '😴',
    exampleKo: '따뜻한 오후 수업 시간, 학생들이 졸음을 참지 못하고 꾸벅꾸벅 졸아요.',
    exampleEn: 'During warm afternoon classes, students cannot resist sleepiness and nod off.',
    nuanceTip: '"꾸벅"은 공손하게 고개 숙여 인사하는 동작("꾸벅 인사하다")으로도 씁니다.',
    webtoonContext: '졸고 있는 캐릭터 머리 위에 "Zzz" 기호와 함께 고개가 꺾이는 궤적으로 연출됩니다.'
  },
  {
    id: 'ono-18',
    word: '아장아장',
    type: '의태어',
    subType: '동작·움직임',
    romanized: 'ajang-ajang',
    meaningKo: '어린 아기나 병아리가 짧은 다리로 귀엽게 걷는 모양',
    meaningEn: 'Toddling / Taking cute, wobbly baby steps',
    emoji: '👶',
    exampleKo: '돌 지난 조카가 아장아장 엄마 품을 향해 첫걸음마를 뗐어요.',
    exampleEn: 'My one-year-old nephew took his first cute toddler steps towards his mother’s arms.',
    nuanceTip: '귀여운 것을 극찬할 때 "아장아장 걷는 모습이 심장에 무리를 준다"는 한국식 밈이 있습니다.',
    webtoonContext: '귀여운 동물이나 아기 캐릭터의 걸음걸이 효과음으로 몽글몽글하게 적힙니다.'
  },
  {
    id: 'ono-19',
    word: '안절부절',
    type: '의태어',
    subType: '마음·감정',
    romanized: 'anjeol-bujeol',
    meaningKo: '마음이 몹시 초조하고 불안하여 가만히 앉아있지 못하는 모습',
    meaningEn: 'Fidgeting restlessly / On pins and needles with anxiety',
    emoji: '😰',
    exampleKo: '아내의 출산을 기다리는 남편이 분만실 밖에서 안절부절못하며 서성였어요.',
    exampleEn: 'The husband waiting for his wife’s childbirth paced outside the delivery room, on pins and needles.',
    nuanceTip: '보통 부정형 동사 "-못하다"와 결합하여 "안절부절못하다" 형태로 90% 이상 쓰입니다.',
    webtoonContext: '초조한 인물의 뺨을 타고 흐르는 식은땀과 어지러운 발자국 궤적에 들어갑니다.'
  },
  {
    id: 'ono-20',
    word: '헐레벌떡',
    type: '의태어',
    subType: '동작·움직임',
    romanized: 'heolle-beoltteok',
    meaningKo: '숨이 차서 가쁘게 헐떡이며 급하게 서두르는 모양',
    meaningEn: 'Panting in a mad rush / Huffing and puffing in a frantic hurry',
    emoji: '🏃💨',
    exampleKo: '약속 시간에 늦을까 봐 지하철역 계단을 헐레벌떡 뛰어올라왔어요.',
    exampleEn: 'Fearing I would be late for our appointment, I dashed up the subway stairs huffing and puffing.',
    nuanceTip: '"늦어서 미안해! 헐레벌떡 뛰어왔어"처럼 약속 장소에 늦었을 때 진정성을 담아 해명하기 좋습니다.',
    webtoonContext: '지각 직전 토스트를 물고 뛰는 학생의 등 뒤로 모래 먼지 구름과 함께 적힙니다.'
  },
  {
    id: 'ono-21',
    word: '빈둥빈둥',
    type: '의태어',
    subType: '동작·움직임',
    romanized: 'bindung-bindung',
    meaningKo: '아무 일도 하지 않고 게으르게 뒹굴거리며 시간을 보내는 모양',
    meaningEn: 'Idling away / Lounging around lazily / Couch potato mode',
    emoji: '🛋️',
    exampleKo: '일요일에는 아무 계획 없이 하루 종일 소파에서 빈둥빈둥 쉬고 싶어요.',
    exampleEn: 'On Sundays, I just want to lounge around lazily on the couch all day with no plans.',
    nuanceTip: '한국 직장인과 학생들이 주말의 달콤한 휴식을 표현할 때 애용하는 단어입니다.',
    webtoonContext: '만화책과 과자 봉지를 뜯어놓고 뒹구는 백수 캐릭터의 방바닥에 깔리는 글씨입니다.'
  },
  {
    id: 'ono-22',
    word: '끄덕끄덕',
    type: '의태어',
    subType: '동작·움직임',
    romanized: 'kkeudeok-kkeudeok',
    meaningKo: '상대방의 말에 크게 공감하며 고개를 위아래로 흔드는 모양',
    meaningEn: 'Nodding head repeatedly in strong agreement or understanding',
    emoji: '🙋‍♂️',
    exampleKo: '친구의 진솔한 고민 상담을 들으며 깊이 공감하듯 고개를 끄덕끄덕했어요.',
    exampleEn: 'Listening to my friend’s heartfelt worries, I nodded my head repeatedly in deep empathy.',
    nuanceTip: '한국의 리액션 문화에서 "아~ 진짜?"와 함께 고개를 끄덕끄덕하는 것은 최고의 경청 매너입니다.',
    webtoonContext: '멘토의 조언을 메모하며 열성적으로 고개를 끄덕이는 학생 머리 위에 표시됩니다.'
  },
  {
    id: 'ono-23',
    word: '꿀꺽꿀꺽',
    type: '의태어',
    subType: '신체·상태',
    romanized: 'kkulkkeok-kkulkkeok',
    meaningKo: '목이 말라 물이나 시원한 음료수를 크게 들이켜 마시는 모습',
    meaningEn: 'Gulping down thirstily / Chugging down a cold beverage',
    emoji: '🥤',
    exampleKo: '등산을 마치고 정상에서 시원한 얼음물을 꿀꺽꿀꺽 마시니 살 것 같아요.',
    exampleEn: 'After hiking, gulping down ice-cold water at the peak made me feel revived.',
    nuanceTip: '갈증을 풀 때의 시원함을 생생하게 표현해 주는 단골 어휘입니다.',
    webtoonContext: '캔 음료를 원샷할 때 목젖이 오르내리는 클로즈업 컷에 들어갑니다.'
  },
  {
    id: 'ono-24',
    word: '우물쭈물',
    type: '의태어',
    subType: '마음·감정',
    romanized: 'umul-jjumul',
    meaningKo: '말이나 행동을 자신 있게 하지 못하고 머뭇거리는 모양',
    meaningEn: 'Hesitating nervously / Dilly-dallying / Beating around the bush',
    emoji: '🫣',
    exampleKo: '선생님 질문에 자신감이 없어서 답을 우물쭈물 얼버무리고 말았어요.',
    exampleEn: 'Lacking confidence in the teacher’s question, I hesitated nervously and mumbled my answer.',
    nuanceTip: '"우물쭈물하지 말고 솔직히 털어놔!"처럼 답답한 상황에서 결단을 촉구할 때 자주 씁니다.',
    webtoonContext: '손가락을 꼬며 시선을 회피하는 부끄럼쟁이 캐릭터의 발밑에 그려집니다.'
  }
];

export const WEBTOON_SCENES: WebtoonScene[] = [
  {
    id: 'scene-1',
    title: '장면 1: 비 오는 날 한옥 카페에서 고백',
    situation: '바깥에는 여름비가 세차게 내리고, 카페 안에서는 두근거리는 마음으로 마음을 전합니다.',
    koreanText: '창밖에는 비가 주룩주룩 내리고, 따뜻한 차가 찰랑찰랑 담겨 있었어요. 마침내 눈을 마주치자 가슴이 두근두근 뛰기 시작했죠.',
    englishTranslation: 'Rain was pouring down outside, and warm tea sloshed gently in the cup. When our eyes finally met, my heart began thumping with anticipation.',
    soundEffects: ['주룩주룩', '찰랑찰랑', '두근두근'],
    emoji: '☔',
    bgGradient: 'from-blue-900 via-indigo-900 to-slate-900'
  },
  {
    id: 'scene-2',
    title: '장면 2: 한밤중 몰래 라면 끓여먹기 대작전',
    situation: '모두가 잠든 야심한 밤, 들키지 않고 야식을 해 먹는 스릴 넘치는 순간!',
    koreanText: '배에서 꼬르륵 소리가 나서 살금살금 부엌으로 나왔어요. 냄비에 라면이 보글보글 끓자 꿀꺽 침을 삼켰죠.',
    englishTranslation: 'My stomach grumbled with hunger, so I crept into the kitchen tiptoeing. As the ramyeon bubbled in the pot, I gulped my saliva.',
    soundEffects: ['꼬르륵', '살금살금', '보글보글'],
    emoji: '🍜',
    bgGradient: 'from-amber-950 via-neutral-900 to-neutral-950'
  },
  {
    id: 'scene-3',
    title: '장면 3: 시험 지각 위기 탈출기',
    situation: '알람을 끄고 자버린 아침! 학교를 향해 전력 질주하는 긴박한 상황.',
    koreanText: '시계가 째깍째깍 흐르고 있었어요! 계단을 헐레벌떡 뛰어올라 교실 문을 쾅 열었더니, 친구들이 싱글벙글 웃고 있었어요. 아직 시험 전이었거든요!',
    englishTranslation: 'The clock was ticking tick-tock! I dashed up the stairs huffing and puffing and burst open the door, only to find my friends grinning ear-to-ear. The test hadn’t started yet!',
    soundEffects: ['째깍째깍', '헐레벌떡', '싱글벙글'],
    emoji: '🏃‍♂️',
    bgGradient: 'from-rose-950 via-neutral-900 to-stone-900'
  }
];

export const SOUND_QUIZZES: SoundQuizQuestion[] = [
  {
    id: 'sq-1',
    question: '찌개나 뚝배기 국물이 맛있게 끓어오를 때 나는 한국어 의성어는 무엇일까요?',
    soundClue: '보글보글 vs 지글지글',
    options: ['주룩주룩', '보글보글', '콜록콜록', '째깍째깍'],
    correctIndex: 1,
    explanation: '"보글보글"은 찌개나 물이 끓는 소리입니다. 삼겹살을 구울 때는 "지글지글", 비가 올 때는 "주룩주룩"을 씁니다.',
    type: '의성어'
  },
  {
    id: 'sq-2',
    question: '좋아하는 사람을 보거나 긴장되어 심장이 쿵쾅대며 설렐 때 쓰는 표현은?',
    soundClue: 'Heartbeat throbbing',
    options: ['두근두근', '아장아장', '우물쭈물', '빈둥빈둥'],
    correctIndex: 0,
    explanation: '"두근두근"은 가슴이 설레거나 긴장되어 뛸 때 쓰는 대표 의성어입니다. "아장아장"은 아기의 걸음걸이입니다.',
    type: '의성어'
  },
  {
    id: 'sq-3',
    question: '밤하늘의 별이나 보석이 작고 앙증맞게 빛나는 모양을 묘사하는 의태어는?',
    soundClue: 'Twinkle twinkle little star',
    options: ['번쩍번쩍', '반짝반짝', '살금살금', '헐레벌떡'],
    correctIndex: 1,
    explanation: '양성 모음이 들어간 "반짝반짝"은 작고 예쁘게 빛나는 모양입니다. "번쩍번쩍"은 번개나 큰 금빛 조명처럼 거대한 섬광에 씁니다.',
    type: '의태어'
  },
  {
    id: 'sq-4',
    question: '연인들이 카페나 공원에서 다정하게 속닥이며 귓속말과 애정행각을 나누는 모습은?',
    soundClue: 'Lovey-dovey romantic vibes',
    options: ['쿵쾅쿵쾅', '꽁냥꽁냥', '안절부절', '우물쭈물'],
    correctIndex: 1,
    explanation: '"꽁냥꽁냥"은 연인들이 달콤하게 데이트하며 알콩달콩 애정 표현을 하는 모습을 나타내는 신조어형 의태어입니다.',
    type: '의태어'
  },
  {
    id: 'sq-5',
    question: '소리가 나지 않도록 조심스럽게 발끝으로 걸어가는 모양을 나타내는 말은?',
    soundClue: 'Tiptoeing quietly',
    options: ['살금살금', '뒤뚱뒤뚱', '뚝딱뚝딱', '바삭바삭'],
    correctIndex: 0,
    explanation: '"살금살금"은 발소리를 죽이고 조심스레 걷는 모습입니다. "뒤뚱뒤뚱"은 오리나 펭귄의 기우뚱한 걸음걸이입니다.',
    type: '의태어'
  }
];
