import { GeneratedBlogPost, GeneratedShortsScript } from '../types';

export interface CuratedTopicItem {
  blog: GeneratedBlogPost;
  shorts: GeneratedShortsScript;
  aliases: string[];
}

export const CURATED_TOPIC_TEMPLATES: Record<string, { blog: GeneratedBlogPost; shorts: GeneratedShortsScript }> = {
  "소나기": {
    blog: {
      titleSuggestions: [
        "한국인이 평생 잊지 못하는 첫사랑의 문학, 황순원의 <소나기> 완벽 해설",
        "비가 오면 왜 <소나기>가 떠오를까? 소년과 소녀의 순수한 보랏빛 서정미",
        "[한국 문학 깊이 읽기] 소나기가 남긴 것: 짧지만 영원한 순수의 미학"
      ],
      selectedTitle: "한국인이 평생 잊지 못하는 첫사랑의 문학, 황순원의 <소나기> 완벽 해설",
      selectedTitleEn: "Korea's Timeless First Love Classic: Hwang Sun-won's 'Rain Shower' Explained",
      metaDescription: "한국 단편문학의 최고 걸작 황순원의 <소나기> 줄거리, 소나기와 보라색 꽃이 지닌 문학적 상징, 그리고 한국인이 간직한 애틋한 첫사랑의 정서를 심층 분석합니다.",
      readingTime: "3분 40초",
      targetAudience: "한국 문학에 입문하는 한국어 학습자 및 깊이 있는 인문학 애호가",
      hook: "‘갑자기 쏟아지는 소나기처럼, 예고 없이 찾아왔다가 영원한 그리움으로 남는 감정이 있습니다.’ 한국 사람이라면 누구나 학창 시절 교과서에서 가슴 뭉클하게 읽었던 소설, 바로 황순원 작가의 1953년 명작 단편소설 <소나기>입니다.",
      hookEn: "'Like a sudden summer rain shower that catches you unawares, some memories leave a lifelong imprint.' Every Korean remembers the poignant short story 'Rain Shower' (Sonagi) by Hwang Sun-won.",
      sections: [
        {
          heading: "1. 개울가에서 시작된 소년과 서울 소녀의 만남",
          headingEn: "1. Meeting by the Stepping Stones: The Boy and the Seoul Girl",
          content: "소설은 시골 마을의 맑은 징검다리를 배경으로 시작됩니다. 윤초시 댁 증손녀인 서울 소녀는 개울가에서 물장난을 치며 시골 소년의 관심을 끌고자 조약돌을 던집니다. ‘이 바보!’라는 짧은 외침과 함께 던져진 조약돌은 소년의 가슴에 깊은 파문을 일으킵니다. 두 사람의 서툰 감정 표현은 계산 없는 순수함 그 자체를 보여줍니다.",
          contentEn: "The story opens at the stepping stones of a quiet country stream. A delicate girl from Seoul splashes water and tosses a smooth pebble toward a shy village boy, whispering 'Silly boy!'. This small gesture awakens a deep flutter in the boy's heart.",
          highlightQuote: "‘소년은 개울가로 달려갔다. 거기 소녀가 앉아 물장난을 하고 있었다.’",
          highlightQuoteEn: "'The boy ran toward the stream. There sat the girl, splashing the cool water.'",
          koreanVocabulary: [
            { word: "징검다리", romanization: "jing-geom-da-ri", meaning: "Stepping stones across a stream", example: "소녀는 징검다리 한가운데 앉아 물장난을 쳤다.", exampleEn: "The girl sat in the middle of the stepping stones playing with water." },
            { word: "조약돌", romanization: "jo-yak-dol", meaning: "Small smooth pebble", example: "소녀가 던진 하얀 조약돌을 소년은 주머니에 고이 간직했다.", exampleEn: "The boy kept the white pebble she threw safely inside his pocket." },
            { word: "풋풋하다", romanization: "put-put-ha-da", meaning: "Fresh, youthful, and innocent", example: "두 주인공의 모습은 풋풋한 첫사랑의 정형을 보여준다.", exampleEn: "The two characters embody the fresh innocence of first love." }
          ]
        },
        {
          heading: "2. 산 너머 꽃밭과 갑작스럽게 쏟아진 '소나기'",
          headingEn: "2. The Mountain Field and the Sudden Summer Shower",
          content: "어느 날 소년과 소녀는 마을 너머 산으로 함께 소풍을 떠납니다. 소녀가 꺾은 '도라지꽃의 보라색'은 소설 전체에 깔린 서정적이면서도 비극적인 복선을 상징합니다. 맑던 하늘이 순식간에 어두워지며 쏟아진 소나기 속에서, 소년은 원두막과 수수단 속으로 소녀를 이끌고 비를 피하게 해줍니다. 좁은 수수단 속에서 서로의 체온을 느끼며 둘의 마음은 가장 가까워집니다.",
          contentEn: "Venturing into the hills, the girl picks purple bellflowers—a poetic foreshadowing of sorrow. When sudden rain torrents pour down, the boy shelters her inside a small teepee of harvested sorghum stalks. Sharing body heat in the tiny shelter, their unspoken affection deepens.",
          highlightQuote: "‘수수단 속은 비가 새지 않았다. 안은 비록 좁았으나 둘의 체온으로 따스했다.’",
          highlightQuoteEn: "'Inside the sorghum shelter, not a drop fell. Though cramped, it was warm with each other's warmth.'",
          koreanVocabulary: [
            { word: "수수단", romanization: "su-su-dan", meaning: "Bundle of harvested sorghum stalks", example: "소년은 수수단을 엮어 비를 피할 작은 공간을 마련했다.", exampleEn: "The boy gathered sorghum stalks to make a cozy shelter." },
            { word: "도라지꽃", romanization: "do-ra-ji-kkot", meaning: "Purple bellflower", example: "보랏빛 도라지꽃은 슬픈 결말을 암시하는 상징물이다.", exampleEn: "The purple bellflower foreshadows the poignant ending." }
          ]
        },
        {
          heading: "3. 비에 젖은 분홍 스웨터, 그리고 영원한 이별",
          headingEn: "3. The Mud-Stained Pink Sweater and Eternal Parting",
          content: "소나기를 맞은 병약한 소녀는 결국 앓아눕게 됩니다. 며칠 뒤 소년은 마을 어른들의 대화를 엿듣다가 충격적인 소식을 접합니다. 소녀가 세상을 떠나며 ‘자신이 입던 분홍 스웨터를 그대로 입혀서 묻어달라’는 유언을 남겼다는 것입니다. 소년과 함께 소나기를 맞으며 진흙물이 튀었던 그 스웨터는 소녀에게 일생에서 가장 눈부셨던 추억의 증표였습니다.",
          contentEn: "Chilled by the rain, the frail girl falls gravely ill. Days later, the boy overhears the village elders whisper heartbreaking news: the girl has passed away, leaving a final wish to be buried in her mud-stained pink sweater—the cherished souvenir of their afternoon together.",
          highlightQuote: "‘자기가 입던 옷을 꼭 그대로 입혀서 묻어 달라고 했다더군...’",
          highlightQuoteEn: "'She asked to be buried dressed in the exact same clothes she wore that day...'",
          koreanVocabulary: [
            { word: "유언 (遺言)", romanization: "yu-eon", meaning: "Last wish / testament", example: "소녀는 세상을 떠나기 전 애틋한 유언을 남겼다.", exampleEn: "The girl left a deeply touching final wish before passing." },
            { word: "여운 (餘韻)", romanization: "yeo-un", meaning: "Lingering emotional resonance", example: "마지막 문장은 독자에게 가슴 시린 긴 여운을 남긴다.", exampleEn: "The ending leaves an aching, beautiful resonance in every reader." }
          ]
        }
      ],
      culturalNuance: "한국 문학에서 '소나기'는 찰나에 지나가는 인생의 무상함과 동시에, 순간이기에 더욱 영원히 퇴색되지 않는 순수의 절정을 상징합니다. 한국인들이 왜 '비'와 '소나기'라는 단어에서 첫사랑의 아련함을 자연스레 떠올리는지 그 원형을 담고 있는 작품입니다.",
      culturalNuanceEn: "In Korean literary culture, a 'sonagi' (sudden shower) represents the ephemerality of fleeting moments, paradoxically etched into eternity because they were never tarnished by time.",
      conclusion: "<소나기>는 70여 년이 지난 지금도 한국 문학 최고의 명작으로 손꼽힙니다. 복잡하고 빠른 현대 사회에서 잠시 멈추어, 마음속 깊은 곳에 묻어둔 맑고 깨끗했던 첫 감정을 되살려주는 귀한 작품이기 때문입니다.",
      conclusionEn: "Even after seven decades, 'Rain Shower' remains an undisputed masterpiece of Korean fiction, offering modern souls a pure sanctuary of unblemished emotion.",
      callToAction: "여러분의 인생에서 '소나기'처럼 강렬하고 애틋하게 스쳐 지나간 순간이나 첫사랑의 기억이 있으신가요? 댓글로 여러분만의 이야기를 들려주세요!",
      callToActionEn: "Do you have a memory that passed like a sudden rain shower yet lingers forever? Share your story in the comments!",
      hashtags: ["#한국문학", "#소나기", "#황순원", "#한국소설", "#첫사랑", "#한국어공부", "#K문학", "#한국문화"]
    },
    shorts: {
      title: "한국인이 평생 잊지 못하는 소설 <소나기> 40초 요약 ☔",
      titleEn: "Korea's Most Heartbreaking Classic 'Rain Shower' in 40s ☔",
      estimatedDuration: "45초",
      thumbnailHook: "소녀가 분홍 스웨터를 입고 묻힌 슬픈 이유?!",
      thumbnailHookEn: "Why She Wanted to Be Buried in a Dirty Sweater?!",
      bgmSuggestion: "서정적인 어쿠스틱 피아노 멜로디 (Acoustic Lofi Piano)",
      retentionTip: "도라지꽃과 빗방울 그래픽을 빠르게 보여주며 마지막 대사 반전에 집중",
      scenes: [
        {
          sceneNumber: 1,
          timeRange: "00:00 - 00:05",
          visual: "맑은 시골 개울가 징검다리 일러스트, 소녀가 조약돌 던지는 애니메이션",
          narrationKo: "‘이 바보!’ 조약돌 하나 던지고 도망간 서울 소녀와 시골 소년의 이야기, 들어보셨나요?",
          narrationEn: "'You silly boy!' Have you heard the story of the Seoul girl who threw a pebble at a country boy?",
          captionText: "“이 바보!” 🪨 개울가에서 시작된 첫사랑",
          captionTextEn: "'You silly boy!' 🪨 First Love at the Stream",
          sfx: "물장구 퐁당 + 조약돌 딱! 효과음"
        },
        {
          sceneNumber: 2,
          timeRange: "00:05 - 00:15",
          visual: "산길에서 보라색 도라지꽃을 꺾는 소녀, 갑자기 먹구름 몰려오는 연출",
          narrationKo: "함께 산으로 소풍 간 날, 소녀는 보랏빛 도라지꽃을 꺾고 갑자기 굵은 소나기가 쏟아집니다.",
          narrationEn: "Exploring the hills together, she picks purple bellflowers just as a massive rainstorm strikes.",
          captionText: "갑자기 쏟아진 여름 소나기 ⛈️",
          captionTextEn: "A Sudden Torrential Summer Shower ⛈️",
          sfx: "천둥소리와 거센 빗소리 효과음"
        },
        {
          sceneNumber: 3,
          timeRange: "00:15 - 00:28",
          visual: "좁은 수수단 움막 속, 비에 젖은 소년과 소녀가 서로를 바라보는 클로즈업",
          narrationKo: "소년은 소녀를 좁은 수수단 속으로 대피시키고, 둘은 체온을 나누며 첫사랑의 두근거림을 느낍니다.",
          narrationEn: "Huddled inside a tiny sorghum shelter, they share warmth as their hearts beat as one.",
          captionText: "수수단 속 둘만의 비밀 🌾 두근두근",
          captionTextEn: "Sheltered Together in the Sorghum Hut 🌾",
          sfx: "토닥토닥 빗소리 속 심장 박동 소리"
        },
        {
          sceneNumber: 4,
          timeRange: "00:28 - 00:40",
          visual: "분홍 스웨터에 진흙물이 묻은 그림, 어두워지는 화면 전환",
          narrationKo: "하지만 비를 맞은 소녀는 결국 세상을 떠나며 '진흙 묻은 분홍 스웨터를 그대로 입혀 묻어달라'는 유언을 남깁니다.",
          narrationEn: "Tragically, the girl falls ill and passes away, leaving a wish to be buried in the mud-splattered pink sweater they shared.",
          captionText: "“그 분홍 스웨터를 입혀서 묻어주세요...” 💔",
          captionTextEn: "'Please bury me in that mud-stained pink sweater...' 💔",
          sfx: "아련한 첼로 멜로디"
        },
        {
          sceneNumber: 5,
          timeRange: "00:40 - 00:48",
          visual: "책 표지와 함께 잔잔한 여운의 텍스트 오버레이",
          narrationKo: "황순원의 <소나기>, 여러분의 첫사랑은 어떤 기억인가요? 댓글로 들려주세요!",
          narrationEn: "Hwang Sun-won's 'Rain Shower'—what was your first love like? Share below!",
          captionText: "영원히 기억될 첫사랑의 명작 📖",
          captionTextEn: "An Unforgettable Classic of First Love 📖",
          sfx: "부드러운 종소리 차임"
        }
      ],
      fullScriptKo: "‘이 바보!’ 조약돌 하나 던지고 도망간 서울 소녀와 시골 소년의 이야기, 들어보셨나요? 함께 산으로 소풍 간 날, 소녀는 보랏빛 도라지꽃을 꺾고 갑자기 굵은 소나기가 쏟아집니다. 소년은 소녀를 좁은 수수단 속으로 대피시키고, 둘은 체온을 나누며 첫사랑의 두근거림을 느낍니다. 하지만 비를 맞은 소녀는 결국 세상을 떠나며 '진흙 묻은 분홍 스웨터를 그대로 입혀 묻어달라'는 유언을 남깁니다. 황순원의 <소나기>, 여러분의 첫사랑은 어떤 기억인가요? 댓글로 들려주세요!",
      fullScriptEn: "'You silly boy!' Have you heard the story of the Seoul girl who threw a pebble at a country boy? Exploring the hills together, she picks purple bellflowers just as a massive rainstorm strikes. Huddled inside a tiny sorghum shelter, they share warmth as their hearts beat as one. Tragically, the girl falls ill and passes away, leaving a wish to be buried in the mud-splattered pink sweater they shared. Hwang Sun-won's 'Rain Shower'—what was your first love like? Share below!"
    }
  },

  "밥먹었냐": {
    blog: {
      titleSuggestions: [
        "한국인이 만나자마자 '밥 먹었어?'라고 묻는 진짜 이유 3가지",
        "밥 = 안부이자 사랑: '언제 밥 한번 먹자'에 담긴 한국인의 정(情)",
        "외국인이 오해하기 쉬운 한국인의 밥 인사 완전 정복"
      ],
      selectedTitle: "한국인이 만나자마자 '밥 먹었어?'라고 묻는 진짜 이유 3가지",
      selectedTitleEn: "Why Koreans Greet You with 'Have You Eaten?' - The Real Cultural Meaning",
      metaDescription: "한국인들이 인사말로 '밥 먹었냐'를 묻는 역사적 배경과 '언제 밥 한번 먹자'의 진짜 속뜻, 그리고 한국 문화에서 밥이 갖는 특별한 의미를 탐구합니다.",
      readingTime: "3분 10초",
      targetAudience: "한국인 친구를 사귀고 싶거나 한국 문화를 깊이 이해하고자 하는 글로벌 학습자",
      hook: "한국인 친구를 사귀면 가장 먼저 듣는 질문 중 하나가 바로 '밥 먹었어?'입니다. 점심시간도 아닌데 불쑥 밥을 먹었냐고 물어보면, '나한테 밥을 사주겠다는 뜻인가?'라고 오해하기 십상이죠. 하지만 이 질문 속에는 한국의 가슴 뭉클한 역사와 따뜻한 인간미가 숨겨져 있습니다.",
      hookEn: "One of the very first things a Korean friend asks you is 'Have you eaten?'. It's not necessarily lunch time, so you might wonder: 'Are they inviting me to eat?' In truth, it holds a deeply touching historical warmth.",
      sections: [
        {
          heading: "1. 굶주림을 걱정하던 가슴 아픈 역사에서 피어난 안부 인사",
          headingEn: "1. Born from Survival: Asking If You Survived the Hunger",
          content: "한국은 20세기 초중반 일제강점기와 6·25 한국전쟁을 거치며 극심한 식량난을 겪었습니다. 하루 세끼를 온전히 챙겨 먹는 것조차 기적이었던 시절, 아침에 이웃을 만나 '식사하셨습니까?'라고 묻는 것은 '어젯밤 굶지 않고 무사히 살아 계십니까?'를 확인하는 가장 절실하고도 따뜻한 생존 확인 인사였습니다.",
          contentEn: "Throughout the devastation of the Korean War, securing three meals a day was a daily miracle. Asking neighbors 'Did you eat?' was the most heartfelt way to check: 'Did you survive the night without starving?'",
          highlightQuote: "‘밥을 먹었는가’를 묻는 것은 ‘오늘도 무사한가’를 묻는 가장 인간적인 기도였습니다.",
          highlightQuoteEn: "'Asking if you ate was the most heartfelt prayer asking if you survived.'",
          koreanVocabulary: [
            { word: "끼니", romanization: "kki-ni", meaning: "Daily meal / sustenance", example: "제때 끼니를 거르지 않는 것이 중요하다.", exampleEn: "It is important not to skip your daily meals." },
            { word: "안부 (安否)", romanization: "an-bu", meaning: "Inquiring after someone's safety and well-being", example: "오랜만에 친구의 안부를 물었다.", exampleEn: "I asked after my longtime friend's well-being." }
          ]
        },
        {
          heading: "2. '언제 밥 한번 먹자'는 진짜 약속일까, 예의일까?",
          headingEn: "2. 'Let's Eat Together Sometime' - Promise or Polite Goodbye?",
          content: "한국인들이 헤어질 때 단골로 쓰는 '언제 밥 한번 먹자!'는 캘린더를 열고 날짜를 잡자는 제안이 아닙니다. 영어의 'Let's keep in touch!'와 같은 따뜻한 작별 인사입니다. 한국인에게 '함께 밥을 먹는 사이(식구, 밥상 공동체)'는 곧 가족과 다름없는 신뢰 관계를 의미하기 때문입니다.",
          contentEn: "When Koreans say 'Let's eat together sometime!' upon parting, they aren't fixing a calendar date. It is the Korean equivalent of 'Keep in touch!'. Sharing a meal signifies elevating someone into one's trusted circle.",
          highlightQuote: "‘언제 밥 한번 먹자’는 ‘당신과 앞으로도 따뜻한 인연을 이어가고 싶다’는 마음의 신호입니다.",
          highlightQuoteEn: "'Let's eat sometime' is a tender social signal: 'I cherish our bond and hope to see you again.'",
          koreanVocabulary: [
            { word: "식구 (食口)", romanization: "sik-gu", meaning: "Family members (literally: mouths that eat together)", example: "우리는 한 솥밥을 먹는 식구다.", exampleEn: "We are family who eat from the same rice pot." },
            { word: "빈말", romanization: "bin-mal", meaning: "Empty words / casual courtesy phrase", example: "그 말은 빈말이 아니라 진심이었다.", exampleEn: "Those words were not mere social pleasantry, but sincere." }
          ]
        },
        {
          heading: "3. '밥심'으로 살아온 한국인의 일상 표현들",
          headingEn: "3. Living on 'Rice Power': Everyday Korean Idioms",
          content: "한국어에는 유독 밥과 관련된 관용구가 많습니다. '밥심으로 산다(밥의 힘으로 버틴다)', '밥값은 해야지(제 몫을 다해야지)', '콩밥을 먹다(교도소에 가다)' 등 밥은 단순한 음식이 아니라 삶과 직업, 도덕을 가늠하는 척도입니다.",
          contentEn: "From 'Bapsim' (rice power) to 'earning your bowl of rice', food idioms permeate every layer of Korean communication.",
          highlightQuote: "한국인에게 밥은 단순한 탄수화물이 아니라 생명과 정(情) 그 자체입니다.",
          highlightQuoteEn: "To Koreans, rice isn't just carbs—it is life, resilience, and affection itself.",
          koreanVocabulary: [
            { word: "밥심", romanization: "bap-sim", meaning: "Energy and resilience gained from eating good rice", example: "한국인은 역시 밥심으로 일한다.", exampleEn: "Koreans power through their work on the strength of rice." },
            { word: "정 (情)", romanization: "jeong", meaning: "Deep communal warmth, bonding, and affection", example: "한국 음식 나눔에는 따뜻한 정이 묻어난다.", exampleEn: "Sharing food in Korea is infused with genuine warmth and affection." }
          ]
        }
      ],
      culturalNuance: "한국인에게 식사는 홀로 배를 채우는 행위가 아니라, 서로의 고단한 하루를 보듬고 환대하는 가장 솔직한 사랑의 언어입니다. 친구가 밥을 먹었냐고 물어보면 '응 잘 먹었어, 너는?'이라고 다정하게 답해보세요.",
      culturalNuanceEn: "Eating together in Korea is an intimate ritual of solace and mutual hospitality. When asked, answer warmly: 'Yes, I ate well! What about you?'.",
      conclusion: "‘밥 먹었어?’라는 세 글자에는 상대방이 오늘 하루 굶주리지 않고 평안하기를 바라는 숭고한 배려가 깃들어 있습니다.",
      conclusionEn: "Beneath the casual question 'Have you eaten?' lies a profound wish that you walk through your day safe, nourished, and cherished.",
      callToAction: "여러분은 오늘 소중한 사람에게 따뜻한 안부 인사를 건네셨나요? '밥 먹었어?' 한마디로 마음을 전해보세요!",
      callToActionEn: "Have you checked in on someone you care about today? Brighten their day with a warm 'Have you eaten?'!",
      hashtags: ["#밥먹었어", "#한국문화", "#KCulture", "#정문화", "#식구", "#한국어공부", "#한국어회화"]
    },
    shorts: {
      title: "한국인이 '밥 먹었어?' 물어보면 밥 사준다는 뜻일까? 🍚",
      titleEn: "Does 'Have you eaten?' mean Koreans will buy you food? 🍚",
      estimatedDuration: "45초",
      thumbnailHook: "“밥 먹었어?”의 진짜 숨겨진 비밀 🍚",
      thumbnailHookEn: "The Hidden Truth Behind 'Have You Eaten?' 🍚",
      bgmSuggestion: "통통 튀는 밝은 어쿠스틱 비트",
      retentionTip: "질문 훅으로 호기심을 유발하고 1950년대 역사 반전으로 몰입감 극대화",
      scenes: [
        {
          sceneNumber: 1,
          timeRange: "00:00 - 00:05",
          visual: "한국인이 반갑게 손 흔들며 '밥 먹었어?' 묻고, 외국인이 당황하는 분할 화면",
          narrationKo: "한국 친구가 만나자마자 '밥 먹었어?'라고 물어보면 밥 사주겠다는 뜻일까요?",
          narrationEn: "When a Korean friend asks 'Have you eaten?', does it mean they’re buying you food?",
          captionText: "“밥 먹었어?” = 밥 사준다는 뜻? 🍚",
          captionTextEn: "“Have you eaten?” = Free food? 🍚",
          sfx: "물음표 띵! 효과음"
        },
        {
          sceneNumber: 2,
          timeRange: "00:05 - 00:15",
          visual: "엑스(X) 마크 그래픽과 함께 과거 1950년대 흑백 사진 오버레이",
          narrationKo: "아닙니다! 사실 이건 한국의 눈물겨운 역사에서 시작된 안부 인사예요.",
          narrationEn: "Nope! It actually comes from a deeply touching part of Korean history.",
          captionText: "정답은 NO! ❌ 눈물겨운 역사 이야기",
          captionTextEn: "Answer: NO! ❌ A Touching History",
          sfx: "레코드 스크래치 + 슬라이드 효과음"
        },
        {
          sceneNumber: 3,
          timeRange: "00:15 - 00:30",
          visual: "김이 모락모락 나는 흰 쌀밥과 찌개 그래픽",
          narrationKo: "전쟁 직후 굶주림이 극심했던 시절, '오늘 끼니를 굶지 않고 무사히 살아있는가'를 묻던 가장 절실하고 따뜻한 위로였죠.",
          narrationEn: "After the war, asking 'Did you eat?' was the most heartfelt way to ask, 'Are you safe and surviving?'",
          captionText: "“굶지 않고 잘 살아있니?” 🥺 밥 = 생명",
          captionTextEn: "“Are you surviving well?” 🥺 Rice = Life",
          sfx: "따뜻한 피아노 차임"
        },
        {
          sceneNumber: 4,
          timeRange: "00:30 - 00:40",
          visual: "헤어질 때 손 흔들며 '언제 밥 한번 먹자!' 자막 팝업",
          narrationKo: "심지어 헤어질 때 '언제 밥 한번 먹자!'도 날짜 잡자는 게 아니라 '너랑 계속 친하게 지내고 싶다'는 뜻이랍니다.",
          narrationEn: "And 'Let’s eat together sometime!' isn't a fixed date—it just means 'I truly enjoy being your friend!'",
          captionText: "“언제 밥 한번 먹자!” = 너랑 더 친해지고 싶어 💛",
          captionTextEn: "“Let's eat sometime!” = Want to stay close 💛",
          sfx: "반짝이는 효과음"
        },
        {
          sceneNumber: 5,
          timeRange: "00:40 - 00:48",
          visual: "하트 이모지와 구독 버튼 애니메이션",
          narrationKo: "한국인의 밥은 '사랑'입니다. 여러분은 오늘 밥 챙겨 드셨나요? 구독 누르고 한국 꿀팁 받아가세요!",
          narrationEn: "In Korea, food is love. Did you eat well today? Subscribe for more fun Korean insights!",
          captionText: "여러분 오늘 밥 드셨나요? 🍚 구독 & 좋아요!",
          captionTextEn: "Did you eat well today? 🍚 Subscribe!",
          sfx: "경쾌한 팝 효과음"
        }
      ],
      fullScriptKo: "한국 친구가 만나자마자 '밥 먹었어?'라고 물어보면 밥 사주겠다는 뜻일까요? 아닙니다! 사실 이건 한국의 눈물겨운 역사에서 시작된 안부 인사예요. 전쟁 직후 굶주림이 극심했던 시절, '오늘 끼니를 굶지 않고 무사히 살아있는가'를 묻던 가장 절실하고 따뜻한 위로였죠. 심지어 헤어질 때 '언제 밥 한번 먹자!'도 날짜 잡자는 게 아니라 '너랑 계속 친하게 지내고 싶다'는 뜻이랍니다. 한국인의 밥은 '사랑'입니다. 여러분은 오늘 밥 챙겨 드셨나요? 구독 누르고 한국 꿀팁 받아가세요!",
      fullScriptEn: "When a Korean friend asks 'Have you eaten?', does it mean they’re buying you food? Nope! It actually comes from a deeply touching part of Korean history. After the war, asking 'Did you eat?' was the most heartfelt way to ask, 'Are you safe and surviving?' And 'Let’s eat together sometime!' isn't a fixed date—it just means 'I truly enjoy being your friend!' In Korea, food is love. Did you eat well today? Subscribe for more fun Korean insights!"
    }
  },

  "얼죽아": {
    blog: {
      titleSuggestions: [
        "영하 15도에도 아이스 아메리카노! 한국인의 '얼죽아' 심리학",
        "한국 직장인은 왜 한겨울에도 차가운 커피를 마실까? '얼죽아'의 비밀",
        "K-직장인 생존 음료: '얼죽아(Eoljukah)' 신드롬과 한국의 속도전 문화"
      ],
      selectedTitle: "영하 15도에도 아이스 아메리카노! 한국인의 '얼죽아' 심리학",
      selectedTitleEn: "Iced Americano at -15°C?! The Psychology of Korea's 'Eol-Juk-Ah' Culture",
      metaDescription: "영하의 혹한기에도 얼음 든 아이스 아메리카노를 고집하는 한국인의 '얼죽아(얼어 죽어도 아아)' 문화의 3가지 이유와 빠른 일상 속 카페인 수혈 심리를 심층 분석합니다.",
      readingTime: "3분 15초",
      targetAudience: "한국 트렌드에 관심 있는 외국인 학습자 및 K-라이프스타일 탐구자",
      hook: "영하 15도를 밑도는 북극 한파가 몰아쳐도, 롱패딩을 꽁꽁 여며 입은 한국인들의 손에는 어김없이 투명한 플라스틱 컵 속 얼음이 찰랑입니다. '얼어 죽어도 아이스 아메리카노'의 줄임말인 '얼죽아(Eoljukah)' 현상! 전 세계가 신기해하는 이 독특한 문화의 이면에는 무엇이 있을까요?",
      hookEn: "Even when sub-zero blizzards howl through Seoul streets, Koreans clad in long puffer jackets carry plastic cups clinking with ice. Why does Korea champion 'Eol-Juk-Ah' (Iced Americano even if I freeze to death)?",
      sections: [
        {
          heading: "1. 1분 1초가 바쁜 한국인의 '초고속 카페인 수혈'",
          headingEn: "1. Rapid Caffeine Infusion for Korea's Ultra-Fast Pace",
          content: "뜨거운 커피는 호호 불어가며 천천히 식혀 마셔야 합니다. 하지만 '빨리빨리'가 체화된 한국의 직장인과 학생들에게 점심시간 10분은 금쪽같습니다. 빨대로 즉각 들이켤 수 있는 아이스 아메리카노는 뇌를 번쩍 깨우는 가장 효율적인 피로회복제인 셈입니다.",
          contentEn: "Hot coffee requires slow sipping. For Koreans navigating high-speed workdays, an iced americano offers instant gulpable caffeine to reboot focus in seconds.",
          highlightQuote: "‘커피를 맛으로 마시는 게 아니라, 생존을 위한 카페인 수혈로 마신다.’",
          highlightQuoteEn: "'We don't just drink coffee for flavor; we drink it as a vital caffeine transfusion to survive the day.'",
          koreanVocabulary: [
            { word: "수혈 (輸血)", romanization: "su-hyeol", meaning: "Blood transfusion (slang: urgent caffeine recharge)", example: "월요일 아침엔 아아 수혈이 필수다.", exampleEn: "On Monday mornings, an iced coffee transfusion is non-negotiable." },
            { word: "빨리빨리", romanization: "ppal-li ppal-li", meaning: "Quickly quickly / speed-first mindset", example: "한국 특유의 빨리빨리 문화가 음료 선택에도 반영된다.", exampleEn: "Korea's speedy culture directly shapes beverage habits." }
          ]
        },
        {
          heading: "2. 매운 음식과 찌개 뒤에 찾아오는 시원한 '개운함'",
          headingEn: "2. The Ultimate Palate Cleanser After Spicy, Piping-Hot Food",
          content: "한국인의 점심 식단은 김치찌개, 뚝배기 불고기, 짬뽕, 제육볶음처럼 뜨겁고 칼칼한 요리가 주를 이룹니다. 식사를 마치고 달아오른 입안과 속을 개운하고 차갑게 정돈해 주는 데는 차가운 쓴맛의 아이스 아메리카노만 한 마무리가 없습니다.",
          contentEn: "Korean lunches revolve around piping hot, spicy stews. A frigid, crisp iced americano serves as the quintessential palate cleanser to cool down fiery tastebuds.",
          highlightQuote: "‘뜨거운 찌개 뒤에 마시는 차가운 얼음 한 모금의 완벽한 밸런스.’",
          highlightQuoteEn: "'The absolute harmony of a freezing cold gulp right after scorching spicy stew.'",
          koreanVocabulary: [
            { word: "개운하다", romanization: "gae-un-ha-da", meaning: "Feeling refreshed, clean, and uncluttered", example: "아이스 커피를 마시니 입안이 개운하다.", exampleEn: "Sipping iced coffee leaves my mouth feeling crisp and clean." },
            { word: "단짝", romanization: "dan-jjak", meaning: "Inseparable best buddy / perfect pair", example: "점심 찌개와 아아는 환상의 단짝이다.", exampleEn: "Spicy lunch stew and iced americano are an unbeatable duo." }
          ]
        },
        {
          heading: "3. '온돌 문화'가 만든 실내의 따뜻함과 '쪄죽따'와의 유쾌한 대결",
          headingEn: "3. Toasty Ondol Indoors & The Counter-Culture 'Jjeo-Juk-Tta'",
          content: "한국의 사무실과 대중교통은 온돌 난방과 히터 덕분에 한겨울에도 반팔을 입을 만큼 훈훈합니다. 따뜻한 실내에서 시원한 음료를 마시는 것은 사치가 아닌 자연스러운 선택입니다. 한편 '쪄 죽어도 따뜻한 물 샤워/커피'를 외치는 '쪄죽따' 파와의 유쾌한 밈 대결도 흥미롭습니다.",
          contentEn: "With world-class ondol and indoor heating, Korean offices remain remarkably toasty in winter. Drinking iced drinks indoors is effortlessly comfortable.",
          highlightQuote: "‘얼어 죽어도 아아(얼죽아) vs 쪄 죽어도 따뜻한 물(쪄죽따)의 세기의 대결.’",
          highlightQuoteEn: "'The iconic showdown: Freeze to death for iced vs roast to death for piping hot.'",
          koreanVocabulary: [
            { word: "쪄죽따", romanization: "jjeo-juk-tta", meaning: "Slang: Hot water/coffee even if I boil to death", example: "추위를 많이 타는 친구는 대표적인 쪄죽따 파다.", exampleEn: "My friend who hates chills belongs to the die-hard hot coffee camp." },
            { word: "온돌 (溫突)", romanization: "on-dol", meaning: "Traditional Korean underfloor radiant heating", example: "온돌 난방 덕분에 한국 실내는 겨울에도 포근하다.", exampleEn: "Underfloor ondol heating keeps Korean interiors cozy all winter long." }
          ]
        }
      ],
      culturalNuance: "'얼죽아'는 혹독한 스트레스와 분주한 일상을 씩씩하게 이겨내는 현대 한국인들의 유쾌한 자조이자 연대감의 상징입니다. 찬바람 속에서도 얼음 컵을 쥔 친구에게 '너도 얼죽아구나!' 하고 말을 건네보세요.",
      culturalNuanceEn: "'Eol-Juk-Ah' is a humorous emblem of solidarity among modern Koreans conquering high-pressure days with playful grit.",
      conclusion: "영하의 날씨에도 시원함을 택하는 한국인들의 열정! 올겨울, 여러분도 서울의 거리에서 '얼죽아'의 짜릿한 매력에 도전해보는 건 어떨까요?",
      conclusionEn: "Next time you visit Seoul in winter, bundle up and order an iced americano like a true local!",
      callToAction: "여러분은 한겨울에 '얼죽아' 파이신가요, 아니면 '쪄죽따' 파이신가요? 댓글로 여러분의 커피 취향을 알려주세요!",
      callToActionEn: "Are you Team Eol-Juk-Ah (Iced) or Team Jjeo-Juk-Tta (Hot)? Vote in the comments below!",
      hashtags: ["#얼죽아", "#아이스아메리카노", "#한국카페", "#K트렌드", "#한국직장인", "#빨리빨리", "#MZ트렌드"]
    },
    shorts: {
      title: "영하 15도에 한국인들이 아이스 아메리카노 마시는 진짜 이유?! 🥶☕",
      titleEn: "Why Koreans Drink Iced Americano at -15°C?! 🥶☕",
      estimatedDuration: "40초",
      thumbnailHook: "영하 15도인데 얼음 컵을 들고 다닌다고?! 🥶",
      thumbnailHookEn: "Holding Iced Drinks in a -15°C Blizzard?! 🥶",
      bgmSuggestion: "트렌디하고 긴장감 넘치는 틱톡 비트",
      retentionTip: "얼음 달그락거리는 ASMR 사운드로 시작해 반전 이유 3가지 쾌속 전달",
      scenes: [
        {
          sceneNumber: 1,
          timeRange: "00:00 - 00:05",
          visual: "눈보라 치는 서울 거리, 롱패딩 입은 사람이 얼음 가득 든 투명 컵 든 손 클로즈업",
          narrationKo: "영하 15도 한파에 한국인 손에 들려있는 이것! 바로 얼음 동동 띄운 아이스 아메리카노입니다.",
          narrationEn: "In a -15°C blizzard, look what’s in Koreans' hands: an ice-packed Americano!",
          captionText: "영하 15도에 아이스 커피?! 🥶 실화?",
          captionTextEn: "Iced Coffee in -15°C?! 🥶 For real?",
          sfx: "칼바람 쌩쌩 + 얼음 달그락 ASMR"
        },
        {
          sceneNumber: 2,
          timeRange: "00:05 - 00:15",
          visual: "시계 초침이 빠르게 돌아가고 사무실에서 일하는 직장인 컷",
          narrationKo: "‘얼어 죽어도 아아’의 줄임말 ‘얼죽아’! 왜 추운 겨울에도 찬 커피를 마실까요?",
          narrationEn: "Known as 'Eol-Juk-Ah'—why do Koreans insist on cold coffee in freezing winter?",
          captionText: "한국인의 필수 생존어: 얼.죽.아 🧊",
          captionTextEn: "Korean Survival Code: Eol-Juk-Ah 🧊",
          sfx: "시계 째깍째깍 사운드"
        },
        {
          sceneNumber: 3,
          timeRange: "00:15 - 00:26",
          visual: "빨대로 한 모금 쭉 마시며 눈이 번쩍 뜨이는 캐릭터 애니메이션",
          narrationKo: "첫째, 뜨거운 커피 식힐 시간이 없는 바쁜 일상에서 즉각적인 '카페인 초고속 수혈'이 가능하기 때문입니다!",
          narrationEn: "Reason 1: No time to wait for hot coffee to cool! It’s instant high-speed caffeine infusion!",
          captionText: "바쁜 현대인의 '초고속 카페인 수혈' ⚡",
          captionTextEn: "Instant High-Speed Caffeine Infusion ⚡",
          sfx: "빨대 호로록 + 번개 찌릿 효과음"
        },
        {
          sceneNumber: 4,
          timeRange: "00:26 - 00:36",
          visual: "얼큰한 김치찌개 보글보글 끓는 장면과 커피 컵 대비",
          narrationKo: "둘째, 매운 찌개를 먹고 난 뒤 텁텁한 입안을 깔끔하게 정리해 주는 최고의 짝꿍이기 때문이죠!",
          narrationEn: "Reason 2: It’s the ultimate refreshing palate cleanser after fiery Korean stews!",
          captionText: "매운 찌개 먹고 입안 개운하게 싹! 🍲",
          captionTextEn: "Refreshes your palate after spicy stew! 🍲",
          sfx: "사이다 탄산 캬! 효과음"
        },
        {
          sceneNumber: 5,
          timeRange: "00:36 - 00:45",
          visual: "커피잔 들고 윙크하는 캐릭터, 구독 버튼 팝업",
          narrationKo: "여러분은 얼죽아인가요, 쪄죽따인가요? 댓글로 알려주시고 구독 눌러주세요!",
          narrationEn: "Are you Team Iced or Team Hot? Vote below and subscribe!",
          captionText: "얼죽아 vs 쪄죽따! 당신의 선택은? ☕",
          captionTextEn: "Iced vs Hot! What’s your pick? ☕",
          sfx: "통통 튀는 벨소리"
        }
      ],
      fullScriptKo: "영하 15도 한파에 한국인 손에 들려있는 이것! 바로 얼음 동동 띄운 아이스 아메리카노입니다. ‘얼어 죽어도 아아’의 줄임말 ‘얼죽아’! 왜 추운 겨울에도 찬 커피를 마실까요? 첫째, 뜨거운 커피 식힐 시간이 없는 바쁜 일상에서 즉각적인 '카페인 초고속 수혈'이 가능하기 때문입니다! 둘째, 매운 찌개를 먹고 난 뒤 텁텁한 입안을 깔끔하게 정리해 주는 최고의 짝꿍이기 때문이죠! 여러분은 얼죽아인가요, 쪄죽따인가요? 댓글로 알려주시고 구독 눌러주세요!",
      fullScriptEn: "In a -15°C blizzard, look what’s in Koreans' hands: an ice-packed Americano! Known as 'Eol-Juk-Ah'—why do Koreans insist on cold coffee in freezing winter? Reason 1: No time to wait for hot coffee to cool! It’s instant high-speed caffeine infusion! Reason 2: It’s the ultimate refreshing palate cleanser after fiery Korean stews! Are you Team Iced or Team Hot? Vote below and subscribe!"
    }
  },

  "은는이가": {
    blog: {
      titleSuggestions: [
        "한국어 최고 난제 '은/는' vs '이/가' 3초 만에 구분하는 절대 법칙",
        "원어민만 아는 뉘앙스 차이: 왜 '내가'와 '나는'은 다를까?",
        "외국인 학습자 99%가 틀리는 조사 비교 완전 정복"
      ],
      selectedTitle: "한국어 최고 난제 '은/는' vs '이/가' 3초 만에 구분하는 절대 법칙",
      selectedTitleEn: "Mastering 'Eun/Neun' vs 'I/Ga': The 3-Second Rule Koreans Naturally Use",
      metaDescription: "외국인 학습자가 가장 혼란스러워하는 한국어 조사 '은/는(화제·대조)'과 '이/가(주어 초점·신정보)'의 핵심 차이와 원어민식 직관적 구분법을 명쾌하게 해설합니다.",
      readingTime: "3분 30초",
      targetAudience: "초·중급 한국어 학습자 및 자연스러운 한국어 구사를 목표로 하는 학습자",
      hook: "“선생님, ‘제가 학생입니다’와 ‘저는 학생입니다’는 뭐가 다른가요?” 한국어를 가르치다 보면 가장 많이 듣는 질문입니다. 사전에는 둘 다 주어를 나타낸다고 적혀 있지만, 원어민이 느끼는 뉘앙스는 하늘과 땅 차이입니다. 평생 헷갈리지 않는 3초 구분 공식을 공개합니다.",
      hookEn: "'Teacher, what is the difference between Je-ga haksaeng-imnida and Jeo-neun haksaeng-imnida?' This is the universal puzzle of Korean grammar. Here is the foolproof 3-second distinction formula.",
      sections: [
        {
          heading: "1. '누가(Who)?'에 답할 때는 무조건 '이/가'",
          headingEn: "1. Answering 'Who did it?': Always Use 'I / Ga'",
          content: "질문 속에 '누가?'가 들어가면 정답은 100% '이/가'입니다. '누가 커피 샀어?'라는 질문에 '내가 샀어'라고 하지, '나는 샀어'라고 하면 어색합니다. '이/가'는 세상의 수많은 사람 중 바로 '이 사람(특정 주어)'을 손가락으로 콕 짚어주는 포인터 역할을 하기 때문입니다.",
          contentEn: "When the core question is 'Who?', the answer must always use 'I / Ga'. 'Who bought coffee?' -> 'Nae-ga sasseo' (I did!). 'I/Ga' functions like a spotlight pinpointing the exact agent.",
          highlightQuote: "‘질문에 '누가?'가 있다면 고민하지 말고 '이/가'를 선택하세요.’",
          highlightQuoteEn: "'If the question asks 'Who?', never hesitate: select 'I / Ga'.' ",
          koreanVocabulary: [
            { word: "주격조사", romanization: "ju-gyeok-jo-sa", meaning: "Subject case marker", example: "‘이/가’는 행동의 주체를 가리키는 주격조사이다.", exampleEn: "'I/Ga' is a subject marker identifying the actor." },
            { word: "초점 (焦點)", romanization: "cho-jeom", meaning: "Focus / spotlight", example: "이 문장에서는 행동한 사람에게 초점이 맞춰져 있다.", exampleEn: "In this sentence, the focus rests squarely on who performed the act." }
          ]
        },
        {
          heading: "2. 대화의 화제나 다른 것과의 비교(대조)는 '은/는'",
          headingEn: "2. Setting the Topic or Drawing Contrast: Use 'Eun / Neun'",
          content: "반면 '은/는'은 '너는 어때?(What about you?)'나 '다른 건 몰라도 이것만큼은'이라는 대조의 뉘앙스를 품고 있습니다. '사과는 좋아하지만 배는 싫어해요'처럼 두 대상을 맞비교하거나, '저는 민우예요'처럼 앞으로 내가 말할 대화의 주제를 펼쳐놓을 때 사용합니다.",
          contentEn: "Conversely, 'Eun/Neun' brings topic framing and contrast ('As for me...', 'Unlike others...'). 'I like apples, but as for pears, I dislike them.'",
          highlightQuote: "‘은/는은 대화의 렌즈를 맞추고 차이점을 보여주는 마법의 돋보기입니다.’",
          highlightQuoteEn: "'Eun/Neun acts as a magnifying lens bringing the topic and contrasts into sharp view.'",
          koreanVocabulary: [
            { word: "보조사 (補助詞)", romanization: "bo-jo-sa", meaning: "Auxiliary particle adding nuanced meaning", example: "‘은/는’은 특별한 의미를 더해주는 보조사이다.", exampleEn: "'Eun/Neun' is an auxiliary particle adding contrast and nuance." },
            { word: "대조 (對照)", romanization: "dae-jo", meaning: "Contrast / comparison", example: "두 가지 상황을 대조할 때 '은/는'이 유용하다.", exampleEn: "'Eun/Neun' is indispensable when contrasting two situations." }
          ]
        },
        {
          heading: "3. 실전 대화로 한눈에 보는 완벽 비교",
          headingEn: "3. Real Conversation: Side-by-Side Comparison",
          content: "새로운 정보를 처음 밝힐 때는 '옛날 옛적에 착한 흥부**가** 살았습니다(새로운 인물 등장: 이/가)'로 시작하고, 그 뒤에 설명을 이어갈 때는 '흥부**는** 마음씨가 고왔습니다(이미 언급된 화제: 은/는)'로 자연스럽게 넘어갑니다. 이야기의 시작은 '이/가', 전개는 '은/는'입니다.",
          contentEn: "When introducing a new character: 'Once upon a time, Heungbu-ga lived...' (New info: Ga). When expanding on him: 'Now, Heungbu-neun was gentle-hearted...' (Established topic: Neun).",
          highlightQuote: "‘새로운 등장은 이/가, 이어지는 설명은 은/는!’",
          highlightQuoteEn: "'New spotlight uses I/Ga; ongoing exposition uses Eun/Neun!'",
          koreanVocabulary: [
            { word: "맥락 (脈絡)", romanization: "maek-rak", meaning: "Context / discourse flow", example: "문법 규칙보다 대화의 맥락을 살피는 것이 더 중요하다.", exampleEn: "Observing conversational context is even more crucial than rigid rules." },
            { word: "자연스럽다", romanization: "ja-yeon-seu-reop-da", meaning: "Natural-sounding to native ears", example: "이 문장이 훨씬 더 원어민답고 자연스럽다.", exampleEn: "This phrasing sounds far more natural to native speakers." }
          ]
        }
      ],
      culturalNuance: "한국어 조사는 단순한 문법 부호가 아니라, 말하는 이의 섬세한 시선과 청자에 대한 배려를 담아내는 소통의 온도계입니다.",
      culturalNuanceEn: "Korean particles are not cold syntactic tokens; they are emotional thermometers conveying respect and social focus.",
      conclusion: "‘누가?’엔 ‘이/가’, ‘너는?’엔 ‘은/는’! 이 3초 치트키 하나만 기억해도 여러분의 한국어 회화는 원어민 수준으로 도약합니다.",
      conclusionEn: "Remember this simple cheat-code: 'Who?' matches 'I/Ga', while 'What about?' matches 'Eun/Neun'!",
      callToAction: "지금 바로 댓글에 '은/는'과 '이/가'를 넣은 예문을 하나씩 남겨보세요! 직접 써봐야 완벽히 내 것이 됩니다.",
      callToActionEn: "Leave a comment using both particles in a sentence to lock in your practice!",
      hashtags: ["#한국어문법", "#은는이가", "#한국어공부", "#TOPIK", "#외국인한국어", "#한국어기초", "#한국어독학"]
    },
    shorts: {
      title: "한국어 '은/는' vs '이/가' 3초 만에 끝내는 공식! 💡",
      titleEn: "Korean 'Eun/Neun' vs 'I/Ga' in 3 Seconds! 💡",
      estimatedDuration: "45초",
      thumbnailHook: "외국인 99%가 틀리는 ‘은/는’ vs ‘이/가’?!",
      thumbnailHookEn: "The #1 Grammar Mistake 99% of Learners Make?!",
      bgmSuggestion: "경쾌하고 지적인 퀴즈 쇼 사운드트랙",
      retentionTip: "퀴즈로 시청자를 참여시키고 명쾌한 치트키 공식 제시",
      scenes: [
        {
          sceneNumber: 1,
          timeRange: "00:00 - 00:06",
          visual: "양손에 '은/는'과 '이/가' 팻말을 들고 고민하는 강사 표정",
          narrationKo: "“누가 커피 샀어?”라는 질문에 “나는 샀어”가 맞을까요, “내가 샀어”가 맞을까요?",
          narrationEn: "To the question 'Who bought coffee?', is it 'Na-neun sasseo' or 'Nae-ga sasseo'?",
          captionText: "Q: “누가 커피 샀어?” 🤔 정답은?",
          captionTextEn: "Q: Who bought coffee? 🤔 Which is right?",
          sfx: "퀴즈 틱톡 시계음"
        },
        {
          sceneNumber: 2,
          timeRange: "00:06 - 00:16",
          visual: "초록색 체크 마크와 '내가 샀어!' 큰 글씨 강조",
          narrationKo: "정답은 '내가 샀어'입니다! '누가?'라는 질문에는 무조건 '이/가'로 대답해야 자연스럽습니다.",
          narrationEn: "The answer is 'Nae-ga sasseo'! When the question asks 'Who?', always use 'I / Ga'!",
          captionText: "정답: “내가 샀어!” (O) 🎯",
          captionTextEn: "Answer: 'Nae-ga sasseo!' (O) 🎯",
          sfx: "딩동댕 정답 차임벨"
        },
        {
          sceneNumber: 3,
          timeRange: "00:16 - 00:28",
          visual: "손가락 포인터 애니메이션과 하이라이트 박스",
          narrationKo: "‘이/가’는 세상의 수많은 사람 중 ‘바로 나!’를 손가락으로 콕 짚어주는 스포트라이트 역할을 하거든요.",
          narrationEn: "'I/Ga' acts like a spotlight pinpointing 'Exactly Me!' out of everyone.",
          captionText: "이/가 = 바로 나를 콕! 짚는 스포트라이트 🔦",
          captionTextEn: "I / Ga = Pinpoint Spotlight 🔦",
          sfx: "카메라 플래시 팡! 효과음"
        },
        {
          sceneNumber: 4,
          timeRange: "00:28 - 00:38",
          visual: "사과와 배 그림 대비, 저울 그래픽",
          narrationKo: "반대로 '은/는'은 '사과는 좋은데 배는 싫어'처럼 대조하거나 앞으로 할 대화의 주제를 밝힐 때 씁니다.",
          narrationEn: "On the other hand, 'Eun/Neun' is for contrasting ('I like apples, but as for pears...') or introducing a topic!",
          captionText: "은/는 = 비교·대조와 대화의 주제 제시 ⚖️",
          captionTextEn: "Eun / Neun = Comparison & Topic ⚖️",
          sfx: "스위치 딸깍 소리"
        },
        {
          sceneNumber: 5,
          timeRange: "00:38 - 00:45",
          visual: "핵심 공식 요약 카드와 구독 아이콘",
          narrationKo: "‘누가?’엔 ‘이/가’, ‘너는?’엔 ‘은/는’! 구독 누르고 한국어 완벽 마스터하세요!",
          narrationEn: "'Who?' matches 'I/Ga', 'What about?' matches 'Eun/Neun'! Subscribe to master Korean!",
          captionText: "치트키: ‘누가?’=이/가, ‘너는?’=은/는 ✨",
          captionTextEn: "Cheat Code: 'Who?'=I/Ga, 'About?'=Eun/Neun ✨",
          sfx: "경쾌한 마무리 팡파르"
        }
      ],
      fullScriptKo: "“누가 커피 샀어?”라는 질문에 “나는 샀어”가 맞을까요, “내가 샀어”가 맞을까요? 정답은 '내가 샀어'입니다! '누가?'라는 질문에는 무조건 '이/가'로 대답해야 자연스럽습니다. ‘이/가’는 세상의 수많은 사람 중 ‘바로 나!’를 손가락으로 콕 짚어주는 스포트라이트 역할을 하거든요. 반대로 '은/는'은 '사과는 좋은데 배는 싫어'처럼 대조하거나 앞으로 할 대화의 주제를 밝힐 때 씁니다. ‘누가?’엔 ‘이/가’, ‘너는?’엔 ‘은/는’! 구독 누르고 한국어 완벽 마스터하세요!",
      fullScriptEn: "To the question 'Who bought coffee?', is it 'Na-neun sasseo' or 'Nae-ga sasseo'? The answer is 'Nae-ga sasseo'! When the question asks 'Who?', always use 'I / Ga'! 'I/Ga' acts like a spotlight pinpointing 'Exactly Me!' out of everyone. On the other hand, 'Eun/Neun' is for contrasting ('I like apples, but as for pears...') or introducing a topic! 'Who?' matches 'I/Ga', 'What about?' matches 'Eun/Neun'! Subscribe to master Korean!"
    }
  }
};
