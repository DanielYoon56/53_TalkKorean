export const DEFAULT_APP_PROMO_URL = "https://ais-pre-sobxxs6vawjuxr5h3qc4vu-429123162697.asia-northeast1.run.app";

export interface GeneratedBlogSection {
  heading: string;
  headingEn?: string;
  content: string;
  contentEn?: string;
  highlightQuote?: string;
  highlightQuoteEn?: string;
  koreanVocabulary?: Array<{
    word: string;
    romanization?: string;
    hanjaOrOrigin?: string;
    meaning: string;
    example: string;
    exampleEn?: string;
  }>;
}

export interface GeneratedBlogPromo {
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  url: string;
}

export interface GeneratedBlogPost {
  titleSuggestions: string[];
  selectedTitle: string;
  selectedTitleEn?: string;
  metaDescription: string;
  metaDescriptionEn?: string;
  readingTime: string;
  targetAudience: string;
  hook: string;
  hookEn?: string;
  sections: GeneratedBlogSection[];
  culturalNuance: string;
  culturalNuanceEn?: string;
  conclusion: string;
  conclusionEn?: string;
  callToAction: string;
  callToActionEn?: string;
  hashtags: string[];
  appPromoLink?: string;
  promoBanner?: GeneratedBlogPromo;
}

export interface GeneratedShortsScene {
  sceneNumber: number;
  timeRange: string;
  visual: string;
  narrationKo: string;
  narrationEn: string;
  captionText: string;
  captionTextEn?: string;
  sfx: string;
}

export interface GeneratedShortsScript {
  title: string;
  titleEn?: string;
  estimatedDuration: string;
  thumbnailHook: string;
  thumbnailHookEn?: string;
  bgmSuggestion: string;
  retentionTip: string;
  scenes: GeneratedShortsScene[];
  fullScriptKo: string;
  fullScriptEn: string;
  appPromoLink?: string;
  pinnedCommentKo?: string;
  pinnedCommentEn?: string;
  videoDescriptionKo?: string;
  videoDescriptionEn?: string;
  socialPromoPostKo?: string;
  socialPromoPostEn?: string;
}

export interface GeneratedContentBundle {
  topic: string;
  category: string;
  tone: string;
  generatedAt: string;
  blog?: GeneratedBlogPost;
  shorts?: GeneratedShortsScript;
  appPromoLink?: string;
}

// Curated high-impact templates for instant, top-quality generation
export const CURATED_TOPIC_TEMPLATES: Record<string, { blog: GeneratedBlogPost; shorts: GeneratedShortsScript }> = {
  "소나기": {
    blog: {
      titleSuggestions: [
        "한국인이 평생 잊지 못하는 첫사랑의 문학, 황순원의 <소나기> 완벽 해설",
        "비가 오면 왜 <소나기>가 떠오를까? 소년과 소녀의 순수한 보랏빛 서정미",
        "[한국 문학 깊이 읽기] 소나기가 남긴 것: 짧지만 영원한 순수의 미학"
      ],
      selectedTitle: "한국인이 평생 잊지 못하는 첫사랑의 문학, 황순원의 <소나기> 완벽 해설",
      metaDescription: "한국 단편문학의 최고 걸작 황순원의 <소나기> 줄거리, 소나기와 보라색 꽃이 지닌 문학적 상징, 그리고 한국인이 간직한 애틋한 첫사랑의 정서를 심층 분석합니다.",
      readingTime: "3분 40초",
      targetAudience: "한국 문학에 입문하는 한국어 학습자 및 깊이 있는 인문학 애호가",
      hook: "‘갑자기 쏟아지는 소나기처럼, 예고 없이 찾아왔다가 영원한 그리움으로 남는 감정이 있습니다.’ 한국 사람이라면 누구나 학창 시절 교과서에서 가슴 뭉클하게 읽었던 소설, 바로 황순원 작가의 1953년 명작 단편소설 <소나기>입니다.",
      sections: [
        {
          heading: "1. 개울가에서 시작된 소년과 서울 소녀의 만남",
          content: "소설은 시골 마을의 맑은 징검다리를 배경으로 시작됩니다. 윤초시 댁 증손녀인 서울 소녀는 개울가에서 물장난을 치며 시골 소년의 관심을 끌고자 조약돌을 던집니다. ‘이 바보!’라는 짧은 외침과 함께 던져진 조약돌은 소년의 가슴에 깊은 파문을 일으킵니다. 두 사람의 서툰 감정 표현은 계산 없는 순수함 그 자체를 보여줍니다.",
          highlightQuote: "‘소년은 개울가로 달려갔다. 거기 소녀가 앉아 물장난을 하고 있었다.’",
          koreanVocabulary: [
            { word: "징검다리", meaning: "Stepping stones in a brook", example: "소녀는 징검다리 한가운데 앉아 물장난을 쳤다." },
            { word: "조약돌", meaning: "Small smooth pebble", example: "소녀가 던진 하얀 조약돌을 소년은 주머니에 고이 간직했다." },
            { word: "풋풋하다", meaning: "Fresh, youthful, and innocent", example: "두 주인공의 모습은 풋풋한 첫사랑의 정형을 보여준다." }
          ]
        },
        {
          heading: "2. 산 너머 꽃밭과 갑작스럽게 쏟아진 '소나기'",
          content: "어느 날 소년과 소녀는 마을 너머 산으로 함께 소풍을 떠납니다. 소녀가 꺾은 '도라지꽃의 보라색'은 소설 전체에 깔린 서정적이면서도 비극적인 복선을 상징합니다. 맑던 하늘이 순식간에 어두워지며 쏟아진 소나기 속에서, 소년은 원두막과 수수단 속으로 소녀를 이끌고 비를 피하게 해줍니다. 좁은 수수단 속에서 서로의 체온을 느끼며 둘의 마음은 가장 가까워집니다.",
          highlightQuote: "‘수수단 속은 비가 새지 않았다. 안은 비록 좁았으나 둘의 체온으로 따스했다.’",
          koreanVocabulary: [
            { word: "수수단", meaning: "Bundle of sorghum stalks used as shelter", example: "소년은 수수단을 엮어 비를 피할 작은 공간을 마련했다." },
            { word: "도라지꽃", meaning: "Bellflower (purple)", example: "보랏빛 도라지꽃은 슬픈 결말을 암시하는 상징물이다." }
          ]
        },
        {
          heading: "3. 비에 젖은 분홍 스웨터, 그리고 영원한 이별",
          content: "소나기를 맞은 병약한 소녀는 결국 앓아눕게 됩니다. 며칠 뒤 소년은 마을 어른들의 대화를 엿듣다가 충격적인 소식을 접합니다. 소녀가 세상을 떠나며 ‘자신이 입던 분홍 스웨터를 그대로 입혀서 묻어달라’는 유언을 남겼다는 것입니다. 소년과 함께 소나기를 맞으며 진흙물이 튀었던 그 스웨터는 소녀에게 일생에서 가장 눈부셨던 추억의 증표였습니다.",
          highlightQuote: "‘자기가 입던 옷을 꼭 그대로 입혀서 묻어 달라고 했다더군...’",
          koreanVocabulary: [
            { word: "유언 (遺言)", meaning: "Last wish / testament", example: "소녀는 세상을 떠나기 전 애틋한 유언을 남겼다." },
            { word: "여운 (餘韻)", meaning: "Lingering resonance / aftertaste", example: "마지막 문장은 독자에게 가슴 시린 긴 여운을 남긴다." }
          ]
        }
      ],
      culturalNuance: "한국 문학에서 '소나기'는 찰나에 지나가는 인생의 무상함과 동시에, 순간이기에 더욱 영원히 퇴색되지 않는 순수의 절정을 상징합니다. 한국인들이 왜 '비'와 '소나기'라는 단어에서 첫사랑의 아련함을 자연스레 떠올리는지 그 원형을 담고 있는 작품입니다.",
      conclusion: "<소나기>는 70여 년이 지난 지금도 한국 문학 최고의 명작으로 손꼽힙니다. 복잡하고 빠른 현대 사회에서 잠시 멈추어, 마음속 깊은 곳에 묻어둔 맑고 깨끗했던 첫 감정을 되살려주는 귀한 작품이기 때문입니다.",
      callToAction: "여러분의 인생에서 '소나기'처럼 강렬하고 애틋하게 스쳐 지나간 순간이나 첫사랑의 기억이 있으신가요? 댓글로 여러분만의 이야기를 들려주세요!",
      hashtags: ["#한국문학", "#소나기", "#황순원", "#한국소설", "#첫사랑", "#한국어공부", "#K문학", "#한국문화"]
    },
    shorts: {
      title: "한국인이 비만 오면 첫사랑을 떠올리는 소름 돋는 이유 (소나기)",
      estimatedDuration: "55초",
      thumbnailHook: "소녀의 마지막 유언... '이 옷을 입혀 묻어주세요'",
      bgmSuggestion: "잔잔한 어쿠스틱 피아노 (Lo-fi Rain Beats)",
      retentionTip: "3초 안에 소녀의 충격적인 유언 문구를 띄워 시청자 이탈을 방지",
      scenes: [
        {
          sceneNumber: 1,
          timeRange: "00:00 - 00:04",
          visual: "비 내리는 창가 화면 줌인, 흑백 느낌의 징검다리 일러스트",
          narrationKo: "한국인에게 '비'가 오면 무조건 떠오르는 소설이 있습니다.",
          narrationEn: "In Korea, there is one legendary story that everyone thinks of when it rains.",
          captionText: "☔ 비 올 때 한국인이 떠올리는 이야기",
          sfx: "빗소리와 함께 둥! 임팩트 효과음"
        },
        {
          sceneNumber: 2,
          timeRange: "00:04 - 00:15",
          visual: "수수단 속에 소년과 소녀가 쪼그리고 앉아 있는 컷",
          narrationKo: "바로 황순원의 <소나기>인데요. 개울가에서 조약돌을 던지던 서울 소녀와 시골 소년이 산으로 소풍을 갔다가 갑자기 거센 소나기를 만납니다.",
          narrationEn: "It’s 'The Shower' by Hwang Sun-won. A boy and a girl take shelter inside a sorghum bundle during a sudden rainstorm.",
          captionText: "갑작스러운 소나기 ⛈️ 수수단 속 두 사람",
          sfx: "천둥번개 효과음 + 심장 박동음"
        },
        {
          sceneNumber: 3,
          timeRange: "00:15 - 00:30",
          visual: "좁은 수수단 안에서 서로 비를 막아주는 장면",
          narrationKo: "좁은 짚더미 속에서 서로의 체온으로 비를 피하며 둘은 처음으로 가슴 뛰는 교감을 나누죠.",
          narrationEn: "Huddled in the narrow shelter, sharing warmth, they experience an unforgettable pure connection.",
          captionText: "좁은 공간, 뛰는 심장소리... 💓",
          sfx: "감성적인 피아노 멜로디 시작"
        },
        {
          sceneNumber: 4,
          timeRange: "00:30 - 00:46",
          visual: "소녀의 분홍 스웨터에 흙탕물이 묻은 클로즈업 컷, 슬픈 분위기",
          narrationKo: "하지만 비를 맞은 소녀는 병이 악화되어 세상을 떠납니다. 그리고 남긴 마지막 유언... '소년과 함께 비 맞을 때 입었던 분홍 스웨터를 꼭 그대로 입혀서 묻어주세요.'",
          narrationEn: "Tragically, the sick girl passes away soon after. Her final wish? 'Bury me in the pink sweater stained with mud from the rain with him.'",
          captionText: "“그 분홍 스웨터를 입혀서 묻어줘...” 😭",
          sfx: "피아노 옥타브 다운 + 묵직한 울림"
        },
        {
          sceneNumber: 5,
          timeRange: "00:46 - 00:55",
          visual: "개울가에 홀로 남은 소년의 뒷모습, 책 표지 전환",
          narrationKo: "찰나의 소나기처럼 짧았지만 영원이 된 첫사랑. 여러분의 인생에도 이런 소나기 같은 순간이 있었나요? 구독하고 한국 명작을 더 만나보세요!",
          narrationEn: "Like a passing shower, brief yet eternal. Have you ever had a moment like this? Subscribe for more Korean stories!",
          captionText: "찰나였지만 영원했던 순수 💧 구독 & 좋아요!",
          sfx: "화면 페이드 아웃 차임벨 효과음"
        }
      ],
      fullScriptKo: "한국인에게 '비'가 오면 무조건 떠오르는 소설이 있습니다. 바로 황순원의 <소나기>인데요. 개울가에서 조약돌을 던지던 서울 소녀와 시골 소년이 산으로 소풍을 갔다가 갑자기 거센 소나기를 만납니다. 좁은 짚더미 속에서 서로의 체온으로 비를 피하며 둘은 처음으로 가슴 뛰는 교감을 나누죠. 하지만 비를 맞은 소녀는 병이 악화되어 세상을 떠납니다. 그리고 남긴 마지막 유언... '소년과 함께 비 맞을 때 입었던 분홍 스웨터를 꼭 그대로 입혀서 묻어주세요.' 찰나의 소나기처럼 짧았지만 영원이 된 첫사랑. 여러분의 인생에도 이런 소나기 같은 순간이 있었나요? 구독하고 한국 명작을 더 만나보세요!",
      fullScriptEn: "In Korea, there is one legendary story that everyone thinks of when it rains. It’s 'The Shower' by Hwang Sun-won. A boy and a girl take shelter inside a sorghum bundle during a sudden rainstorm. Huddled in the narrow shelter, sharing warmth, they experience an unforgettable pure connection. Tragically, the sick girl passes away soon after. Her final wish? 'Bury me in the pink sweater stained with mud from the rain with him.' Like a passing shower, brief yet eternal. Have you ever had a moment like this? Subscribe for more Korean stories!"
    }
  },
  "밥먹었냐": {
    blog: {
      titleSuggestions: [
        "외국인이 100% 오해하는 한국 인사 '밥 먹었어?'에 숨겨진 눈물겨운 역사",
        "한국인은 왜 만나자마자 밥부터 물어볼까? K-인사법의 3가지 숨은 심리",
        "밥심으로 살아온 민족: '밥 먹었니?'가 한국인 최고의 사랑 고백인 이유"
      ],
      selectedTitle: "외국인이 100% 오해하는 한국 인사 '밥 먹었어?'에 숨겨진 눈물겨운 역사",
      metaDescription: "한국인들이 만날 때마다 '밥 먹었어?'라고 묻는 이유와 그 역사적 배경, 정(情)의 문화, 상황별 자연스러운 한국어 답변 팁을 알기 쉽게 정리해 드립니다.",
      readingTime: "3분 10초",
      targetAudience: "한국 문화에 호기심 많은 외국인 학습자 및 K-컬처 크리에이터",
      hook: "한국 친구를 사귀면 가장 먼저 듣게 되는 질문 중 하나가 바로 “밥 먹었어?”(Have you eaten?)입니다. 외국인들은 ‘나한테 밥 사주려고 그러나?’, ‘왜 내 식사 시간을 체크하지?’ 하고 당황하기 일쑤인데요. 사실 이 말은 진짜 식사 여부를 묻는 것이 아닙니다!",
      sections: [
        {
          heading: "1. 굶주림을 이겨낸 역사적 아픔에서 시작된 인사",
          content: "한국은 6.25 전쟁과 보릿고개 등 극심한 빈곤의 시기를 겪었습니다. 당시에는 끼니를 거르지 않고 하루 세끼 밥을 먹는 것이 생존과 직결된 문제였습니다. 따라서 '식사는 하셨습니까?'라는 말은 '어젯밤 굶지 않고 무탈하게 살아 계십니까?'를 묻는 가장 절실하고 따뜻한 안부 확인이었습니다.",
          highlightQuote: "‘밥을 먹었느냐는 물음은 곧 생존과 안녕을 염려하는 가장 깊은 애정이었습니다.’",
          koreanVocabulary: [
            { word: "보릿고개", meaning: "Spring poverty period (before barley harvest)", example: "어르신들은 보릿고개를 넘기며 끼니의 소중함을 배웠다." },
            { word: "안부 (安否)", meaning: "Inquiring after someone's safety and well-being", example: "오랜만에 친구에게 안부를 물었다." }
          ]
        },
        {
          heading: "2. '밥'을 빼놓고는 설명할 수 없는 한국어 관용구들",
          content: "한국어에서 '밥'은 단순한 쌀밥(Rice) 이상의 의미를 가집니다. '밥심으로 일한다'(밥의 힘), '밥벌이한다'(직업), '콩밥 먹는다'(감옥 가다), 심지어 호소할 때도 '밥맛 떨어진다'는 표현을 씁니다. 한국인에게 밥은 생명, 에너지, 그리고 인간관계의 척도입니다.",
          highlightQuote: "‘한국인에게 밥은 물리적 탄수화물이 아니라 감정의 교환 매개체입니다.’",
          koreanVocabulary: [
            { word: "밥심", meaning: "Strength derived from eating a good meal", example: "한국인은 역시 밥심으로 살아야지!" },
            { word: "밥벌이", meaning: "Making a livelihood / earning bread", example: "힘들어도 밥벌이를 위해 매일 출근한다." }
          ]
        },
        {
          heading: "3. '언제 밥 한번 먹자'는 진짜 약속일까?",
          content: "헤어질 때 한국인이 던지는 단골 멘트인 '언제 밥 한번 먹자!' 역시 외국인을 멘붕에 빠뜨리는 표현입니다. 당장 달력을 펴고 날짜를 잡으려 하면 한국인이 당황하죠. 이는 영어의 'See you later'처럼 '당신과 좋은 인연을 계속 이어가고 싶다'는 친근감의 표현이자 정중한 작별 인사입니다.",
          highlightQuote: "‘날짜를 정하지 않는 밥 약속은 거절이 아니라 다음을 기약하는 정중한 인사입니다.’",
          koreanVocabulary: [
            { word: "빈말", meaning: "Pleasantry / empty words with goodwill", example: "‘언제 밥 먹자’는 악의 없는 따뜻한 빈말일 때가 많다." },
            { word: "정 (情)", meaning: "Affection, bonding, and deep human warmth", example: "한국 문화의 바탕에는 끈끈한 정이 흐른다." }
          ]
        }
      ],
      culturalNuance: "외국인이 '밥 먹었어?'라는 질문을 받았을 때 가장 자연스러운 답변은 '네, 맛있게 먹었어요. OO님은요?'입니다. 진짜 굶었다고 해서 당장 밥을 차려주지 않더라도 섭섭해하지 마세요. 그 한마디에 담긴 진심은 '당신이 오늘도 건강하고 편안하길 바랍니다'라는 따뜻한 응원입니다.",
      conclusion: "작은 밥 한 공기에도 사람을 위하는 따뜻한 온기가 깃들어 있는 나라. 오늘 주변 소중한 사람에게 가벼운 미소와 함께 건네보세요. “밥은 먹고 일하고 있어?”",
      callToAction: "외국인 친구에게 '밥 먹었냐'고 물어봤다가 겪은 재미있는 에피소드가 있으신가요? 댓글로 공유해주세요!",
      hashtags: ["#한국어인사", "#밥먹었어", "#한국문화", "#K컬처", "#한국어표현", "#한국음식", "#정문화"]
    },
    shorts: {
      title: "한국인이 만나자마자 '밥 먹었어?'라고 묻는 진짜 이유 🍚",
      estimatedDuration: "50초",
      thumbnailHook: "외국인이 100% 오해하는 한국 1등 인사법!",
      bgmSuggestion: "통통 튀는 경쾌한 재즈 힙합 (Upbeat Korean Cafe Vibes)",
      retentionTip: "외국인 시점의 당황하는 표정 밈으로 시작하여 0.5초 만에 몰입 유도",
      scenes: [
        {
          sceneNumber: 1,
          timeRange: "00:00 - 00:05",
          visual: "한국인이 반갑게 손 흔들며 '밥 먹었어?' 묻고, 외국인이 당황하는 분할 화면",
          narrationKo: "한국 친구가 만나자마자 '밥 먹었어?'라고 물어보면 밥 사주겠다는 뜻일까요?",
          narrationEn: "When a Korean friend asks 'Have you eaten?', does it mean they’re buying you food?",
          captionText: "“밥 먹었어?” = 밥 사준다는 뜻? 🍚",
          sfx: "물음표 띵! 효과음"
        },
        {
          sceneNumber: 2,
          timeRange: "00:05 - 00:15",
          visual: "엑스(X) 마크 그래픽과 함께 과거 1950년대 흑백 사진 오버레이",
          narrationKo: "아닙니다! 사실 이건 한국의 눈물겨운 역사에서 시작된 안부 인사예요.",
          narrationEn: "Nope! It actually comes from a deeply touching part of Korean history.",
          captionText: "정답은 NO! ❌ 눈물겨운 역사 이야기",
          sfx: "레코드 스크래치 + 슬라이드 효과음"
        },
        {
          sceneNumber: 3,
          timeRange: "00:15 - 00:30",
          visual: "김이 모락모락 나는 흰 쌀밥과 찌개 그래픽",
          narrationKo: "전쟁 직후 굶주림이 극심했던 시절, '오늘 끼니를 굶지 않고 무사히 살아있는가'를 묻던 가장 절실하고 따뜻한 위로였죠.",
          narrationEn: "After the war, asking 'Did you eat?' was the most heartfelt way to ask, 'Are you safe and surviving?'",
          captionText: "“굶지 않고 잘 살아있니?” 🥺 밥 = 생명",
          sfx: "따뜻한 피아노 차임"
        },
        {
          sceneNumber: 4,
          timeRange: "00:30 - 00:42",
          visual: "헤어질 때 손 흔들며 '언제 밥 한번 먹자!' 자막 팝업",
          narrationKo: "심지어 헤어질 때 '언제 밥 한번 먹자!'도 날짜 잡자는 게 아니라 '너랑 계속 친하게 지내고 싶다'는 뜻이랍니다.",
          narrationEn: "And 'Let’s eat together sometime!' isn't a fixed date—it just means 'I truly enjoy being your friend!'",
          captionText: "“언제 밥 한번 먹자!” = 너랑 더 친해지고 싶어 💛",
          sfx: "반짝이는 효과음"
        },
        {
          sceneNumber: 5,
          timeRange: "00:42 - 00:50",
          visual: "하트 이모지와 구독 버튼 애니메이션",
          narrationKo: "한국인의 밥은 '사랑'입니다. 여러분은 오늘 밥 챙겨 드셨나요? 구독 누르고 한국 꿀팁 받아가세요!",
          narrationEn: "In Korea, food is love. Did you eat well today? Subscribe for more fun Korean insights!",
          captionText: "여러분 오늘 밥 드셨나요? 🍚 구독 & 좋아요!",
          sfx: "경쾌한 팝 효과음"
        }
      ],
      fullScriptKo: "한국 친구가 만나자마자 '밥 먹었어?'라고 물어보면 밥 사주겠다는 뜻일까요? 아닙니다! 사실 이건 한국의 눈물겨운 역사에서 시작된 안부 인사예요. 전쟁 직후 굶주림이 극심했던 시절, '오늘 끼니를 굶지 않고 무사히 살아있는가'를 묻던 가장 절실하고 따뜻한 위로였죠. 심지어 헤어질 때 '언제 밥 한번 먹자!'도 날짜 잡자는 게 아니라 '너랑 계속 친하게 지내고 싶다'는 뜻이랍니다. 한국인의 밥은 '사랑'입니다. 여러분은 오늘 밥 챙겨 드셨나요? 구독 누르고 한국 꿀팁 받아가세요!",
      fullScriptEn: "When a Korean friend asks 'Have you eaten?', does it mean they’re buying you food? Nope! It actually comes from a deeply touching part of Korean history. After the war, asking 'Did you eat?' was the most heartfelt way to ask, 'Are you safe and surviving?' And 'Let’s eat together sometime!' isn't a fixed date—it just means 'I truly enjoy being your friend!' In Korea, food is love. Did you eat well today? Subscribe for more fun Korean insights!"
    }
  }
};

// Dynamic Content Synthesizer when topic is not in static presets
export function synthesizeDynamicContent(topic: string, category: string, tone: string, appUrl: string = DEFAULT_APP_PROMO_URL): { blog: GeneratedBlogPost; shorts: GeneratedShortsScript } {
  const cleanTopic = topic.trim() || "한국의 매력적인 문화와 일상";
  const catLabel = category === 'literature' ? '한국 문학' : category === 'food' ? 'K-FOOD' : category === 'language' ? '한국어 표현' : 'K-컬처 트렌드';

  const blog: GeneratedBlogPost = {
    titleSuggestions: [
      `[${catLabel}] 지금 가장 주목해야 할 '${cleanTopic}'의 모든 것 (${cleanTopic}: Essential Guide)`,
      `한국인도 몰랐던 '${cleanTopic}' 속에 담긴 반전과 깊은 의미 (The Hidden Nuance Behind ${cleanTopic})`,
      `외국인이 보면 깜짝 놀라는 '${cleanTopic}' 핵심 3가지 정리 (3 Things Foreigners Love About ${cleanTopic})`
    ],
    selectedTitle: `[${catLabel}] 지금 가장 주목해야 할 '${cleanTopic}'의 모든 것`,
    selectedTitleEn: `[${catLabel}] Everything You Need to Know About '${cleanTopic}'`,
    metaDescription: `${cleanTopic}에 대해 핵심 배경, 한국어 표현, 문화적 뉘앙스를 한눈에 파악할 수 있는 고품격 에디토리얼 칼럼입니다.`,
    metaDescriptionEn: `An essential cultural & linguistic guide to '${cleanTopic}' in Korea, complete with authentic vocabulary, cultural nuances, and conversational tips for learners.`,
    readingTime: "3분 20초",
    targetAudience: "글로벌 외국인 한국어 학습자, K-컬처 팬 및 인문학 블로그 독자",
    hook: `‘알고 보면 더 흥미롭고 매력적인 한국의 이야기.’ 오늘 다룰 주제는 바로 최근 많은 분들이 궁금해하시는 **"${cleanTopic}"**입니다. 겉으로 보이는 모습 너머에 숨겨진 흥미진진한 맥락을 짚어드립니다.`,
    hookEn: `"Stories of Korea that become deeper the more you understand them." Today's topic is "${cleanTopic}", a cultural concept that has captivated countless global learners. Let's explore the hidden nuances beneath the surface.`,
    sections: [
      {
        heading: `1. '${cleanTopic}'가 시작된 배경과 핵심 개념`,
        headingEn: `1. The Origin & Core Concept of '${cleanTopic}'`,
        content: `${cleanTopic}은(는) 한국 사회와 대중문화의 고유한 흐름 속에서 자연스럽게 형성되었습니다. 단순한 일회성 현상이나 표현을 넘어, 한국인들의 일상 정서와 밀접하게 맞닿아 있습니다.`,
        contentEn: `'${cleanTopic}' naturally took root within the unique rhythm of Korean society and popular culture. Far beyond a fleeting trend, it is deeply intertwined with the emotional fabric and daily routines of Koreans.`,
        highlightQuote: `“${cleanTopic} 속에 한국인 특유의 감성과 시대상이 고스란히 녹아 있습니다.”`,
        highlightQuoteEn: `"Within '${cleanTopic}' lies the authentic sensibility and living history of the Korean people."`,
        koreanVocabulary: [
          { word: "공감대 (共感帶)", romanization: "gong-gam-dae", meaning: "Sympathy / common ground of feeling", example: "많은 대중의 뜨거운 공감대를 형성했다.", exampleEn: "It formed a deep bond of empathy with the broad public." },
          { word: "뉘앙스", romanization: "nwi-ang-seu", meaning: "Subtle shade of meaning / nuance", example: "말 한마디에 담긴 섬세한 뉘앙스를 이해하는 것이 중요하다.", exampleEn: "It is crucial to grasp the delicate nuance behind every phrase." },
          { word: "트렌드", romanization: "teu-ren-deu", meaning: "Cultural trend / movement", example: "한국의 트렌드는 전 세계의 주목을 받고 있다.", exampleEn: "Korean cultural trends are capturing the world's attention." }
        ]
      },
      {
        heading: `2. 현지인처럼 깊이 이해하는 3가지 포인트`,
        headingEn: `2. Three Key Insights to Understand Like a Native`,
        content: `첫째, 상황에 따른 미묘한 온도 차이를 알아야 합니다. 둘째, 온라인 커뮤니티와 미디어에서 어떻게 회자되는지 맥락을 살펴보면 훨씬 생생하게 다가옵니다. 셋째, 외국인 학습자의 시선에서 비교해 보면 한국만의 독특한 매력이 한층 선명해집니다.`,
        contentEn: `First, notice the delicate emotional temperatures across different social settings. Second, observe how Korean native speakers discuss it in media and daily life. Third, examining it through a global lens brings out the distinctive beauty of Korea with crystal clarity.`,
        highlightQuote: `“디테일을 아는 순간, 한국 문화가 2배 더 재미있어집니다.”`,
        highlightQuoteEn: `"The moment you grasp these nuances, Korean culture becomes twice as fascinating."`,
        koreanVocabulary: [
          { word: "취향 저격", romanization: "chwi-hyang jeo-gyeok", meaning: "Hitting someone's exact taste", example: "이 콘텐츠는 MZ세대의 취향을 완벽하게 저격했다.", exampleEn: "This content perfectly targeted the taste of the younger generation." },
          { word: "신선하다", romanization: "sin-seon-ha-da", meaning: "Fresh, novel, and refreshing", example: "새로운 관점에서 바라보니 매우 신선하다.", exampleEn: "Looking at it from a fresh perspective feels truly refreshing." }
        ]
      },
      {
        heading: `3. 실생활 적용과 알아두면 쓸모 있는 꿀팁`,
        headingEn: `3. Practical Conversation Tips & Real-Life Usage`,
        content: `친구와의 대화나 SNS 포스팅에서 이 내용을 인용해 보세요. 단순한 단편 지식이 아닌, 한국 문화를 폭넓게 이해하고 있다는 인상을 줄 수 있습니다.`,
        contentEn: `Try bringing up this topic in conversations with Korean friends or in your social media posts. Demonstrating genuine cultural depth creates immediate warmth and sincere friendship.`,
        highlightQuote: `“작은 관심과 이해가 더 깊은 교류의 다리를 놓아줍니다.”`,
        highlightQuoteEn: `"A touch of genuine cultural curiosity builds the most enduring bridges."`,
        koreanVocabulary: [
          { word: "자연스럽다", romanization: "ja-yeon-seu-reop-da", meaning: "Natural, effortless, and smooth", example: "대화 속에서 이 표현을 자연스럽게 활용해 보세요.", exampleEn: "Try weaving this expression naturally into your daily conversations." }
        ]
      }
    ],
    culturalNuance: `한국 문화는 관계 속에서의 '정(情)'과 빠른 변화를 흡수하는 역동성이 공존합니다. '${cleanTopic}' 역시 이러한 한국 사회의 생동감을 증명하는 대표적인 사례입니다.`,
    culturalNuanceEn: `Korean culture is characterized by 'Jeong' (deep emotional warmth and bond) paired with rapid dynamism. '${cleanTopic}' is a quintessential example of this lively societal blend.`,
    conclusion: `${cleanTopic}에 대해 함께 살펴보았습니다. 작은 디테일 하나에도 그 문화권 사람들의 삶과 철학이 깃들어 있다는 사실은 언제나 흥미롭습니다.`,
    conclusionEn: `We explored '${cleanTopic}' together. It is always inspiring to discover how a single cultural facet mirrors the warmth and worldview of an entire society.`,
    callToAction: `여러분이 생각하는 '${cleanTopic}'의 가장 매력적인 점은 무엇인가요? 여러분의 생각을 댓글로 자유롭게 남겨주세요!`,
    callToActionEn: `What do you find most intriguing about '${cleanTopic}'? Share your perspective in the comments below!`,
    hashtags: [`#${cleanTopic.replace(/\s+/g, '')}`, "#한국문화", "#KoreanCulture", "#LearnKorean", "#TalkKorean", "#StudyKorean"]
  };

  const shorts: GeneratedShortsScript = {
    title: `30초 만에 끝내는 '${cleanTopic}' 핵심 요약! ⚡`,
    titleEn: `'${cleanTopic}' Explained in 30 Seconds ⚡`,
    estimatedDuration: "50초",
    thumbnailHook: `한국인도 잘 모르는 '${cleanTopic}'의 진실?!`,
    thumbnailHookEn: `The Truth About '${cleanTopic}'?!`,
    bgmSuggestion: "트렌디한 업비트 틱톡 사운드 (Trending TikTok Beat)",
    retentionTip: "첫 2초 안에 시선 집중 자막과 빠른 화면 전환 적용",
    scenes: [
      {
        sceneNumber: 1,
        timeRange: "00:00 - 00:04",
        visual: `카메라 정면 응시, 손가락 스냅과 함께 큰 글씨 텍스트 팝업: '${cleanTopic}'`,
        narrationKo: `요즘 한국에서 제일 핫한 '${cleanTopic}', 이거 진짜 알고 계셨나요?`,
        narrationEn: `Everyone’s talking about '${cleanTopic}' in Korea right now—did you know this?`,
        captionText: `🔥 요즘 제일 핫한 '${cleanTopic}'`,
        captionTextEn: `🔥 Hottest Topic: '${cleanTopic}'`,
        sfx: "손가락 스냅 딱! 효과음"
      },
      {
        sceneNumber: 2,
        timeRange: "00:04 - 00:16",
        visual: "빠른 템포의 관련 사진/영상 슬라이드쇼 오버레이",
        narrationKo: `외국인들이 처음 보면 다들 깜짝 놀라는데요. 알고 보면 한국인들의 깊은 정서와 생활 방식이 담겨 있습니다.`,
        narrationEn: `Foreigners are always surprised at first, but it reflects deep Korean culture and daily life.`,
        captionText: "외국인들이 보고 깜짝 놀라는 이유 😲",
        captionTextEn: "Why Foreigners are Shocked 😲",
        sfx: "카메라 셔터 효과음"
      },
      {
        sceneNumber: 3,
        timeRange: "00:16 - 00:32",
        visual: "1, 2, 3 인포그래픽 텍스트 강조",
        narrationKo: `핵심 포인트는 바로 이겁니다! 겉으로는 단순해 보여도, 그 속엔 상대방을 배려하고 소통하려는 특별한 문화가 있거든요.`,
        narrationEn: `Here is the key takeaway! Behind the simple surface lies a culture of mutual care and connection.`,
        captionText: "💡 핵심 요약: 깊은 배려와 소통의 기술",
        captionTextEn: "💡 Key Takeaway: Connection & Care",
        sfx: "딩동댕 정답 차임벨"
      },
      {
        sceneNumber: 4,
        timeRange: "00:32 - 00:44",
        visual: "웃는 얼굴로 제스처 취하며 자막 강조",
        narrationKo: `한국 친구에게 이거 아냐고 한번 물어보세요! '너 이거 어떻게 알았어?'라며 깜짝 놀랄 겁니다.`,
        narrationEn: `Try mentioning this to your Korean friends! They will be shocked by how much you know!`,
        captionText: "한국인 친구 감동시키는 꿀팁 ✨",
        captionTextEn: "How to Impress Korean Friends ✨",
        sfx: "반짝이는 효과음"
      },
      {
        sceneNumber: 5,
        timeRange: "00:44 - 00:50",
        visual: "구독 & 좋아요 애니메이션 클릭 효과",
        narrationKo: `오늘 영상이 유익했다면 구독과 좋아요 누르고 매일 새로운 한국 이야기를 만나보세요!`,
        narrationEn: `If you enjoyed this, hit like and subscribe for daily Korean stories!`,
        captionText: "구독하고 한국 마스터하기! 🚀",
        captionTextEn: "Subscribe to Master Korean! 🚀",
        sfx: "경쾌한 팝 차임"
      }
    ],
    fullScriptKo: `요즘 한국에서 제일 핫한 '${cleanTopic}', 이거 진짜 알고 계셨나요? 외국인들이 처음 보면 다들 깜짝 놀라는데요. 알고 보면 한국인들의 깊은 정서와 생활 방식이 담겨 있습니다. 핵심 포인트는 바로 이겁니다! 겉으로는 단순해 보여도, 그 속엔 상대방을 배려하고 소통하려는 특별한 문화가 있거든요. 한국 친구에게 이거 아냐고 한번 물어보세요! '너 이거 어떻게 알았어?'라며 깜짝 놀랄 겁니다. 오늘 영상이 유익했다면 구독과 좋아요 누르고 매일 새로운 한국 이야기를 만나보세요!`,
    fullScriptEn: `Everyone’s talking about '${cleanTopic}' in Korea right now—did you know this? Foreigners are always surprised at first, but it reflects deep Korean culture and daily life. Here is the key takeaway! Behind the simple surface lies a culture of mutual care and connection. Try mentioning this to your Korean friends! They will be shocked by how much you know! If you enjoyed this, hit like and subscribe for daily Korean stories!`
  };

  return ensureAppPromotion({ blog, shorts }, appUrl);
}

/**
 * Ensures that the app link is explicitly inserted into the generated scripts,
 * scenes, full text, and promotional banners for promotion.
 */
export function ensureAppPromotion<T extends { blog?: GeneratedBlogPost; shorts?: GeneratedShortsScript; appPromoLink?: string }>(
  bundle: T,
  appUrl: string = DEFAULT_APP_PROMO_URL
): T {
  const finalUrl = appUrl && appUrl.trim() ? appUrl.trim() : DEFAULT_APP_PROMO_URL;
  bundle.appPromoLink = finalUrl;

  if (bundle.shorts) {
    const shorts = bundle.shorts;
    shorts.appPromoLink = finalUrl;

    // 1. Ensure the final scene specifically directs viewers to the app link in both Korean and English
    if (shorts.scenes && shorts.scenes.length > 0) {
      const lastIdx = shorts.scenes.length - 1;
      const lastScene = shorts.scenes[lastIdx];

      if (!lastScene.visual.includes(finalUrl)) {
        lastScene.visual = `${lastScene.visual} (화면 중앙: TalkKorean 공식 앱 로고 & 링크 자막 [${finalUrl}])`;
      }
      if (!lastScene.narrationKo.includes(finalUrl) && !lastScene.narrationKo.includes("TalkKorean")) {
        lastScene.narrationKo = `${lastScene.narrationKo} 더 많은 실전 표현과 AI 원어민 튜터는 TalkKorean 앱(${finalUrl})에서 지금 무료로 만나보세요!`;
      }
      if (!lastScene.narrationEn.includes(finalUrl) && !lastScene.narrationEn.includes("TalkKorean")) {
        lastScene.narrationEn = `${lastScene.narrationEn} Practice speaking real Korean 1:1 with our 24/7 AI tutor on TalkKorean (${finalUrl}) for free!`;
      }
      if (!lastScene.captionText.includes(finalUrl)) {
        lastScene.captionText = `${lastScene.captionText} | AI 한국어 튜터 👉 ${finalUrl}`;
      }
      if (lastScene.captionTextEn && !lastScene.captionTextEn.includes(finalUrl)) {
        lastScene.captionTextEn = `${lastScene.captionTextEn} | AI Korean Tutor 👉 ${finalUrl}`;
      }
    }

    // 2. Ensure fullScriptKo ends with app promotion link
    const promoKo = `\n\n👉 [TalkKorean 앱 바로가기 - AI 튜터와 무료로 실전 대화하기]: ${finalUrl}`;
    if (!shorts.fullScriptKo.includes(finalUrl)) {
      shorts.fullScriptKo = `${shorts.fullScriptKo.trim()}${promoKo}`;
    }

    const promoEn = `\n\n👉 [TalkKorean App Link - Practice Real Korean with 24/7 AI Tutor]: ${finalUrl}`;
    if (shorts.fullScriptEn && !shorts.fullScriptEn.includes(finalUrl)) {
      shorts.fullScriptEn = `${shorts.fullScriptEn.trim()}${promoEn}`;
    }

    // 3. Set dedicated YouTube Shorts pinned comment and description with app link (BILINGUAL)
    shorts.pinnedCommentKo = `📌 [고정 댓글 / Pinned Comment]
Want to speak real Korean like a native? Practice today's expressions 1:1 with your personal AI Korean Tutor!
오늘 영상에서 배운 한국어 표현, 직접 AI 튜터와 입으로 말하며 연습해보세요!

👉 Try TalkKorean App Free / 공식 앱 무료 체험하기: ${finalUrl}
#TalkKorean #LearnKorean #KoreanCulture #Shorts #StudyKorean`;

    shorts.pinnedCommentEn = `📌 [Pinned Comment]
Want to speak real Korean like a native? Practice today's expressions 1:1 with your personal AI Korean Tutor!
👉 Try TalkKorean App Free: ${finalUrl}
#TalkKorean #LearnKorean #KoreanCulture #Shorts`;

    shorts.videoDescriptionKo = `🎬 영상 속 한국어 표현과 문화 배경을 더 깊이 배우고 싶다면?
Want to dive deeper into Korean expressions and cultural nuances?
실시간 24시간 원어민 AI 튜터 1:1 대화 & 정밀 발음 분석이 가능한 TalkKorean 앱을 확인하세요!

👉 Official App / 공식 앱 바로가기: ${finalUrl}

#TalkKorean #Korean #LearnKorean #KCulture #Shorts #Reels`;

    shorts.videoDescriptionEn = `🎬 Want to dive deeper into Korean expressions and cultural nuances?
Experience 24/7 1:1 conversational practice and real-time pronunciation scoring with TalkKorean!
👉 Official App: ${finalUrl}

#TalkKorean #Korean #LearnKorean #KCulture #Shorts`;

    shorts.socialPromoPostKo = `🇰🇷 ${shorts.title}

${shorts.thumbnailHook}
Want to master authentic Korean conversation?
원어민 AI 튜터와 함께 1:1 실전 대화를 무료로 시작하세요!

👉 TalkKorean Official: ${finalUrl}

#TalkKorean #LearnKorean #KoreanCulture #KWave #StudyKorean`;

    shorts.socialPromoPostEn = `🇰🇷 ${shorts.titleEn || shorts.title}

${shorts.thumbnailHookEn || shorts.thumbnailHook}
Master authentic Korean conversation with a 24/7 AI Native Tutor!

👉 TalkKorean Official App: ${finalUrl}

#TalkKorean #LearnKorean #KoreanCulture #KWave #StudyKorean`;
  }

  if (bundle.blog) {
    const blog = bundle.blog;
    blog.appPromoLink = finalUrl;
    blog.promoBanner = {
      title: "🇰🇷 TalkKorean - AI와 함께하는 실전 한국어 & K-컬처 스튜디오",
      titleEn: "🇰🇷 TalkKorean - Real-Life Korean & K-Culture AI Studio",
      description: "실시간 원어민 AI 튜터와 1:1 회화 연습 및 정밀 발음 분석을 지금 무료로 시작해보세요!",
      descriptionEn: "Start practicing 1:1 native conversation and instant pronunciation analysis with our AI tutor for free!",
      url: finalUrl
    };

    const blogPromo = `\n\n💡 [TalkKorean 공식 앱에서 AI 원어민 튜터와 1:1 실전 회화 & 발음 교정을 지금 무료로 체험해보세요! 👉 ${finalUrl}]\n💡 [Practice real-life Korean conversation 1:1 with our AI Native Tutor for free on TalkKorean! 👉 ${finalUrl}]`;
    if (!blog.conclusion.includes(finalUrl)) {
      blog.conclusion = `${blog.conclusion.trim()}${blogPromo}`;
    }
    if (!blog.callToAction.includes(finalUrl)) {
      blog.callToAction = `${blog.callToAction.trim()} (Practice with AI Tutor / 더 많은 실전 대화: ${finalUrl})`;
    }
  }

  return bundle;
}

// Automatically enforce app promotional link injection across all curated presets
for (const key of Object.keys(CURATED_TOPIC_TEMPLATES)) {
  ensureAppPromotion(CURATED_TOPIC_TEMPLATES[key]);
}

