import { GeneratedBlogPost, GeneratedShortsScript } from '../types';

export const DEFAULT_APP_PROMO_URL = "https://talkkorean.ai.studio";

interface DomainProfile {
  categoryLabel: string;
  categoryLabelEn: string;
  vocabularies: Array<{ word: string; romanization: string; meaning: string; example: string; exampleEn: string }>;
  sectionHeadings: [string, string, string];
  sectionHeadingsEn: [string, string, string];
  sectionInsights: [string, string, string];
  sectionInsightsEn: [string, string, string];
  quotes: [string, string, string];
  quotesEn: [string, string, string];
  culturalNuance: string;
  culturalNuanceEn: string;
  shortsStory: {
    bgm: string;
    hookVisual: string;
    hookSfx: string;
    scene2Visual: string;
    scene2Sfx: string;
    scene3Visual: string;
    scene3Sfx: string;
    scene4Visual: string;
    scene4Sfx: string;
  };
}

function detectDomain(cleanTopic: string, category: string): string {
  const t = cleanTopic.toLowerCase();

  // 1. Explicit Category Priority if specifically selected
  if (category === 'language') return 'grammar';
  if (category === 'literature') return 'heritage';
  if (category === 'trend') return 'trend';
  if (category === 'food') return 'food';
  if (category === 'travel') return 'travel';
  if (category === 'entertainment') return 'entertainment';
  if (category === 'society') return 'society';
  if (category === 'culture') {
    if (/치킨|음식|맛집|식당|식사|요리|라면|커피|카페|삼겹살|김치|찌개/i.test(t)) return 'food';
    if (/지하철|회사|직장|예절|사회|치안|아파트/i.test(t)) return 'society';
    if (/역사|전통|한옥|궁|한복/i.test(t)) return 'heritage';
    if (/여행|명소|호텔|핫플/i.test(t)) return 'travel';
    return 'society';
  }

  // 2. Keyword heuristic detection
  if (/문법|조사|발음|존댓말|반말|사투리|단어|표현|어휘|토픽|topik|어미|높임말|말투|grammar|language|vocab|pronunciation/i.test(t)) {
    return 'grammar';
  }
  if (/김치|찌개|떡볶이|삼겹살|치킨|고기|국물|디저트|카페|커피|소주|맥주|막걸리|포차|배달음식|먹방|요리|맛집|식당|레시피|반찬|라면|food|cook|noodle|soup/i.test(t)) {
    return 'food';
  }
  if (/mz|신조어|슬랭|밈|트렌드|갓생|억까|인스타|틱톡|숏폼|팝업|패션|성수|홍대|알잘딱깔센|폼미쳤다|slang|meme|trend/i.test(t)) {
    return 'trend';
  }
  if (/드라마|아이돌|케이팝|kpop|kdrama|영화|배우|노래|가사|팬덤|덕질|포카|콘서트|연예인|ost|drama|movie|actor|music|idol/i.test(t)) {
    return 'entertainment';
  }
  if (/지하철|버스|직장|회사|회식|퇴근|출근|야근|아파트|분리수거|빨리빨리|예절|한국생활|이웃|office|subway|work/i.test(t)) {
    return 'society';
  }
  if (/문학|소설|시인|역사|전통|조선|한옥|경복궁|단청|한복|명절|추석|설날|유산|history|tradition|palace|heritage|novel|poem/i.test(t)) {
    return 'heritage';
  }
  if (/여행|제주도|부산|서울여행|명소|호텔|캠핑|핫플|관광|야경|travel|trip|tour|seoul|busan|jeju/i.test(t)) {
    return 'travel';
  }
  return 'general';
}

const DOMAIN_PROFILES: Record<string, DomainProfile> = {
  food: {
    categoryLabel: "K-FOOD & 미식 문화",
    categoryLabelEn: "K-Food & Gourmet Culture",
    vocabularies: [
      { word: "감칠맛", romanization: "gam-chil-mat", meaning: "Savory, mouthwatering umami depth", example: "오랜 시간 우려낸 국물에서 깊은 감칠맛이 난다.", exampleEn: "The slow-simmered broth yields a deep, mouthwatering umami flavor." },
      { word: "단짠맵", romanization: "dan-jjan-maep", meaning: "Sweet, salty, and spicy all in harmonious balance", example: "한국인이 가장 중독되는 마성의 맛은 단짠맵이다.", exampleEn: "The most addictive Korean culinary balance is sweet, salty, and spicy." },
      { word: "칼칼하다", romanization: "kal-kal-ha-da", meaning: "Pleasantly spicy and clear in the throat without heaviness", example: "이 찌개는 국물이 칼칼해서 밥 한 공기가 뚝딱이다.", exampleEn: "This stew has a crisp, throat-clearing spice that makes rice disappear instantly." },
      { word: "밥도둑", romanization: "bap-do-duk", meaning: "Rice thief (A dish so delicious it makes you devour rice)", example: "간장게장은 한국의 대표적인 밥도둑이다.", exampleEn: "Soy-marinated crab is Korea's iconic 'rice thief'." },
      { word: "겉바속촉", romanization: "geot-ba-sok-chok", meaning: "Crispy on the outside, juicy and moist on the inside", example: "갓 튀겨낸 치킨이 겉바속촉의 정석을 보여준다.", exampleEn: "Freshly fried chicken is the epitome of crispy exterior and juicy interior." }
    ],
    sectionHeadings: [
      "1. 한 그릇에 담긴 한국 고유의 조리 지혜와 풍미",
      "2. 현지인들만 아는 궁극의 꿀조합과 반찬 페어링",
      "3. 외국인 여행자를 위한 식당 주문 실전 꿀팁"
    ],
    sectionHeadingsEn: [
      "1. Culinary Roots: The Savory Wisdom & Soulful Simmer",
      "2. Local Insider Pairings: Banchan Harmony & Hacks",
      "3. Ordering Like a Local: Survival Hacks for Travelers"
    ],
    sectionInsights: [
      "단순한 끼니를 넘어, 발효와 정성으로 오랜 시간 우려내는 한국 음식의 진수를 품고 있습니다.",
      "메인 요리와 함께 차려지는 밑반찬, 쌈, 그리고 마무리 볶음밥까지 이어지는 유기적인 식사 리듬이 핵심입니다.",
      "'맵기 조절'이나 '사리 추가' 등 현지인들이 쓰는 간단한 한마디로 200% 더 풍성한 맛을 즐길 수 있습니다."
    ],
    sectionInsightsEn: [
      "Beyond mere sustenance, it embodies fermentation mastery and slow-simmered culinary devotion.",
      "The meal flows seamlessly from savory side dishes (banchan) to wraps, culminating in crispy fried rice.",
      "Simple phrases like customizing spice levels or adding noodle extras let you enjoy meals like a true Seoul foodie."
    ],
    quotes: [
      "“한국 음식의 비밀은 식재료가 서로의 맛을 해치지 않고 깊게 어우러지는 조화에 있습니다.”",
      "“마지막에 비벼 먹는 볶음밥이야말로 K-푸드 미식의 완성이자 진정한 디저트입니다.”",
      "“맛있게 차려진 밥상 한 그릇에는 상대방의 건강을 염려하는 정(情)이 녹아 있습니다.”"
    ],
    quotesEn: [
      "“The secret of Korean cuisine lies in the deep harmony of ingredients lifting each other up.”",
      "“The final pan-fried crispy rice at the end of a meal is the true dessert of Korean dining.”",
      "“Behind every generous meal lies the warm affection (Jeong) wishing for your health.”"
    ],
    culturalNuance: "한국의 음식 문화는 '함께 냄비를 나누어 먹는 연대감'과 지친 하루를 달래주는 '따뜻한 한 끼의 위로'를 바탕으로 합니다. 맛있는 음식을 먹을 때 '시원하다(속이 풀린다)'고 표현하는 역설적인 감탄사를 기억해 보세요.",
    culturalNuanceEn: "Korean dining culture thrives on communal sharing from a bubbling pot and finding soulful healing in a hot meal. Remember the unique expression 'Siwonhada'—exclaiming 'cool and refreshing!' even while drinking piping-hot stew.",
    shortsStory: {
      bgm: "경쾌하고 군침 도는 업비트 먹방 비트",
      hookVisual: "보글보글 김이 피어오르고 군침 도는 초근접 슬로모션 음식 컷",
      hookSfx: "지글지글 보글보글 ASMR 사운드",
      scene2Visual: "식재료가 냄비에 듬뿍 담기며 화려하게 조리되는 과정",
      scene2Sfx: "칼질 탁탁탁 + 냄비 뚜껑 덜컹 효과음",
      scene3Visual: "숟가락 가득 퍼 올려 입안 가득 넣는 먹방 리액션",
      scene3Sfx: "꿀꺽 삼키며 '캬~' 감탄사 효과음",
      scene4Visual: "현지인 추천 꿀조합 메뉴와 반찬 얹는 클로즈업",
      scene4Sfx: "딩동댕 정답 차임벨"
    }
  },

  grammar: {
    categoryLabel: "한국어 문법 & 원어민 뉘앙스",
    categoryLabelEn: "Korean Grammar & Native Nuance",
    vocabularies: [
      { word: "뉘앙스", romanization: "nwi-ang-seu", meaning: "Subtle shade of meaning and situational tone", example: "말 한마디에 담긴 미묘한 뉘앙스를 파악해야 한다.", exampleEn: "One must grasp the subtle nuance tucked inside every phrase." },
      { word: "입에 착 붙다", romanization: "ip-e chak but-da", meaning: "Rolling naturally and effortlessly off the tongue", example: "이 표현은 원어민처럼 입에 착 붙는다.", exampleEn: "This expression rolls naturally off the tongue like a native speaker." },
      { word: "어색하다", romanization: "eo-saek-ha-da", meaning: "Awkward, stiff, or unnatural in context", example: "문법은 맞지만 실제 회화에서는 어색하게 들린다.", exampleEn: "It is grammatically correct, yet sounds stiff in real conversation." },
      { word: "말버릇", romanization: "mal-beo-reut", meaning: "Speech habit / conversational verbal quirk", example: "한국인들이 자주 쓰는 친근한 말버릇이다.", exampleEn: "It is a warm conversational habit frequently used by native Koreans." },
      { word: "직관적", romanization: "jik-gwan-jeok", meaning: "Intuitive and immediately comprehensible", example: "상황을 알면 훨씬 더 직관적으로 이해할 수 있다.", exampleEn: "Understanding the context makes it far more intuitive to grasp." }
    ],
    sectionHeadings: [
      "1. 교과서 문법 vs 원어민의 진짜 뉘앙스 분별법",
      "2. 외국인 학습자가 가장 자주 범하는 실수와 3초 교정",
      "3. 실전 카톡과 일상 대화에서 바로 써먹는 치트키 예문"
    ],
    sectionHeadingsEn: [
      "1. Textbook Rules vs Native Intuition: Deciphering the Nuance",
      "2. The Most Frequent Foreigner Pitfalls & 3-Second Fixes",
      "3. KakaoTalk & Real Conversation: Instant Cheat-Code Examples"
    ],
    sectionInsights: [
      "사전적 번역에 의존하기보다, 화자가 어떤 감정과 의도로 이 표현을 꺼냈는지 맥락을 짚는 것이 핵심입니다.",
      "단순한 주격/보조사나 어미의 미세한 차이가 전체 문장의 친밀도와 공손함을 결정짓습니다.",
      "친구끼리의 편한 반말부터 정중한 존댓말까지, 적절한 온도를 맞추면 원어민들의 감탄을 이끌어낼 수 있습니다."
    ],
    sectionInsightsEn: [
      "Rather than translating literally, grasp the speaker's emotional intention and social stance.",
      "A subtle nuance in sentence endings dramatically shifts warmth, politeness, and perceived fluency.",
      "Mastering casual banmal versus polite jondaetmal will earn immediate praise from native speakers."
    ],
    quotes: [
      "“한국어는 단어의 뜻보다 상대방과의 '관계의 거리'를 조율하는 문법입니다.”",
      "“원어민처럼 말하는 비결은 규칙 암기가 아니라, 상황의 온도를 느끼는 데 있습니다.”",
      "“작은 뉘앙스 하나를 터득하는 순간, 당신의 한국어는 살아 숨 쉬게 됩니다.”"
    ],
    quotesEn: [
      "“Korean grammar isn't just about vocabulary; it calibrates emotional distance between speakers.”",
      "“The secret to speaking naturally is sensing conversational temperature rather than rote memorization.”",
      "“Grasping a single cultural nuance brings your Korean alive with authentic resonance.”"
    ],
    culturalNuance: "한국어의 문법 요소(조사, 존칭, 어미)는 상대방을 존중하고 배려하는 언어적 완충 장치 역할을 합니다. 직설적인 표현 대신 완곡한 뉘앙스를 사용하는 것이 한국식 미덕입니다.",
    culturalNuanceEn: "Korean grammatical elements (particles, honorifics, sentence endings) serve as linguistic cushions of empathy and mutual respect.",
    shortsStory: {
      bgm: "통통 튀는 지적이고 유쾌한 퀴즈 비트",
      hookVisual: "양손에 문법 카드 들고 갸우뚱하는 표정과 큰 물음표 이모지",
      hookSfx: "물음표 띵! 퀴즈 효과음",
      scene2Visual: "어색한 예시와 함께 화면이 흑백으로 변하고 삐- 경고음",
      scene2Sfx: "레코드 스크래치 + 삐- 부저음",
      scene3Visual: "원어민의 완벽한 3초 교정 공식과 초록색 체크 마크 팡파르",
      scene3Sfx: "딩동댕 정답 차임벨 + 반짝 효과음",
      scene4Visual: "실제 카톡 채팅창 말풍선이 톡톡 올라오는 화면 연출",
      scene4Sfx: "스마트폰 키보드 타닥타닥 효과음"
    }
  },

  trend: {
    categoryLabel: "MZ 라이프 & K-컬처 트렌드",
    categoryLabelEn: "MZ Lifestyle & K-Culture Trends",
    vocabularies: [
      { word: "갓생", romanization: "gat-saeng", meaning: "God-life (Living an ultra-productive, disciplined, fulfilling life)", example: "오늘도 새벽 운동과 공부로 갓생 살았다.", exampleEn: "I lived a disciplined 'God-life' today with early morning workouts and study." },
      { word: "알잘딱깔센", romanization: "al-jal-ttak-kkal-ssen", meaning: "Handling tasks smartly, neatly, and with impeccable flair", example: "부장님의 지시를 알잘딱깔센하게 처리했다.", exampleEn: "I executed the manager's directions smartly and impeccably." },
      { word: "폼 미쳤다", romanization: "pom mi-chyeot-da", meaning: "Form is insane / performing at an absolute peak peak level", example: "오늘 네 패션 스타일 폼 미쳤다!", exampleEn: "Your fashion style today is performing on an insane level!" },
      { word: "억까", romanization: "eok-kka", meaning: "Unjustified criticism / bad luck forced on someone", example: "이건 날씨의 명백한 억까야.", exampleEn: "This terrible weather is an absolute case of bad luck out of nowhere." },
      { word: "취향 저격", romanization: "chwi-hyang jeo-gyeok", meaning: "Sniping someone's exact aesthetic taste perfectly", example: "성수동 새로 생긴 카페가 완전 취향 저격이다.", exampleEn: "That newly opened cafe in Seongsu-dong snipes my aesthetic taste perfectly." }
    ],
    sectionHeadings: [
      "1. SNS와 숏폼을 뒤흔든 트렌드의 탄생 배경",
      "2. 한국의 2030 세대가 이 문화에 열광하는 3가지 이유",
      "3. 촌스럽지 않게 센스 만점으로 활용하는 실전 팁"
    ],
    sectionHeadingsEn: [
      "1. Viral Spark: How Social Media & Short-form Ignited the Trend",
      "2. 3 Reasons Korea's 2030 Generation is Obsessed with It",
      "3. Using It Like an Insider: Seamless Practical Tips"
    ],
    sectionInsights: [
      "치열한 경쟁 속에서 유머와 자기표현으로 활로를 찾는 한국 젊은 세대의 생생한 감각이 녹아 있습니다.",
      "인스타그램, 틱톡, 유튜브 쇼츠의 알고리즘을 타며 전 세계적인 파급력을 획득한 비결을 분석합니다.",
      "과하지 않게 대화 중간에 유쾌한 추임새로 던지면 즉각적으로 웃음과 친밀감을 형성할 수 있습니다."
    ],
    sectionInsightsEn: [
      "It mirrors Korean youth finding playful humor, identity, and relief amidst fast-paced competition.",
      "Fueled by algorithmic virality, it transformed from niche subculture into a national movement.",
      "Tossing it into conversation as a witty remark builds effortless rapport and shared laughs."
    ],
    quotes: [
      "“트렌드는 단순한 유행이 아니라, 동시대를 살아가는 청년들의 솔직한 목소리입니다.”",
      "“어려운 현실 앞에서도 위트를 잃지 않는 쾌활함이야말로 K-트렌드의 원동력입니다.”",
      "“새로운 밈 하나로 세대와 국경을 넘어 순식간에 하나로 연결됩니다.”"
    ],
    quotesEn: [
      "“Trends aren't superficial fads; they are the unfiltered voices of youth living right now.”",
      "“Unshakable humor in the face of pressure is the true engine of K-culture vitality.”",
      "“A single witty meme bridges borders and generations in an instant.”"
    ],
    culturalNuance: "한국의 트렌드는 세계에서 가장 역동적이고 빠릅니다. 새로운 신조어나 유행에 열린 마음으로 동참하는 것은 상대방의 세계를 온전히 이해하려는 가장 트렌디한 소통법입니다.",
    culturalNuanceEn: "Korean trend velocity is unmatched globally. Embracing new slang signals genuine openness to understanding how people live today.",
    shortsStory: {
      bgm: "스피디하고 감각적인 하이퍼팝 틱톡 사운드",
      hookVisual: "스마트폰 화면 속 100만 뷰 떡상 영상 캡처와 놀라는 리액션",
      hookSfx: "스마트폰 알림 팝팝팝 + 카메라 셔터",
      scene2Visual: "거리 팝업스토어와 인스타 감성 핫플의 빠른 몽타주",
      scene2Sfx: "빠른 스와이프 휘리릭 효과음",
      scene3Visual: "핵심 신조어/트렌드 타이포그래피가 리듬에 맞춰 쿵쿵 튀는 연출",
      scene3Sfx: "비트 드롭 쿵! 베이스 사운드",
      scene4Visual: "친구에게 써먹었을 때 빵 터지는 리액션 컷",
      scene4Sfx: "관객 웃음소리와 박수 효과음"
    }
  },

  entertainment: {
    categoryLabel: "K-드라마 & 엔터테인먼트",
    categoryLabelEn: "K-Drama & Entertainment",
    vocabularies: [
      { word: "케미", romanization: "ke-mi", meaning: "Chemistry between actors or characters", example: "두 주인공의 티키타카 케미가 돋보인다.", exampleEn: "The witty banter chemistry between the two leads is dazzling." },
      { word: "최애", romanization: "choe-ae", meaning: "Ultimate bias / all-time favorite person", example: "내 인생 최고의 최애 드라마 캐릭터다.", exampleEn: "This is my all-time ultimate favorite drama character." },
      { word: "정주행", romanization: "jeong-ju-haeng", meaning: "Binge-watching an entire series from start to finish", example: "주말 내내 밤새워서 시리즈를 정주행했다.", exampleEn: "I binge-watched the entire series all weekend long." },
      { word: "입덕", romanization: "ip-deok", meaning: "Falling deeply into a fandom", example: "단 10초짜리 클립 하나 보고 완전히 입덕했다.", exampleEn: "Watching just a 10-second clip made me fall completely into the fandom." },
      { word: "킬링파트", romanization: "kil-ling-pa-teu", meaning: "Killing part (The most captivating highlight moment)", example: "후반부 눈물 연기가 이 작품의 킬링파트다.", exampleEn: "The emotional weeping scene at the climax is the killing part of this work." }
    ],
    sectionHeadings: [
      "1. 전 세계 시청자를 사로잡은 스토리텔링과 복선",
      "2. 대사 속에 숨겨진 한국 사회의 리얼한 정서와 갈등",
      "3. 팬덤 사이에서 유행하는 명대사와 명장면 다시 보기"
    ],
    sectionHeadingsEn: [
      "1. Global Spell: Irresistible Story Arcs & Foreshadowing",
      "2. Dialogue Subtext: Real Korean Societal Dynamics",
      "3. Fandom Favorites: Iconic Quotes & Viral Scenes"
    ],
    sectionInsights: [
      "촘촘한 복선과 캐릭터들의 입체적인 심리 묘사가 전 세계 시청자들의 과몰입을 유발합니다.",
      "단순한 오락물을 넘어, 가족주의, 학벌, 계급, 로맨스 등 한국 사회의 현실적인 고민이 투영되어 있습니다.",
      "원작 대사의 맛을 그대로 살려 한마디씩 읊어보는 것은 살아있는 한국어 감각을 익히는 최고의 지름길입니다."
    ],
    sectionInsightsEn: [
      "Tight narrative foreshadowing and multi-dimensional character psychology trigger intense binge-watching.",
      "Beyond entertainment, it mirrors authentic societal anxieties around family, class, and love.",
      "Reciting iconic lines in their original cadence is the fastest shortcut to mastering emotional Korean."
    ],
    quotes: [
      "“좋은 콘텐츠는 언어의 장벽을 뛰어넘어 인간 본연의 감정에 가닿습니다.”",
      "“대사 한마디에 맺힌 눈물과 웃음 속에 그 사회의 영혼이 담겨 있습니다.”",
      "“화려한 볼거리 뒤에 자리한 탄탄한 인간애야말로 K-콘텐츠의 진짜 힘입니다.”"
    ],
    quotesEn: [
      "“Great storytelling transcends language barriers to touch universal human hearts.”",
      "“Inside laughter and tears etched into memorable dialogue lies the soul of a society.”",
      "“Deep human warmth anchoring dazzling visuals is the true powerhouse of K-content.”"
    ],
    culturalNuance: "K-콘텐츠의 매력은 극적인 서사 속에서도 사람에 대한 따뜻한 온기(인간미)를 잃지 않는 데 있습니다. 등장인물들의 미묘한 눈빛과 침묵의 순간에 주목해 보세요.",
    culturalNuanceEn: "The magic of K-content rests in preserving raw human warmth even amid breathtaking dramatic tension.",
    shortsStory: {
      bgm: "몰입감 넘치는 감성 시네마틱 OST",
      hookVisual: "드라마 속 명장면 명대사 자막이 크게 박히는 화면",
      hookSfx: "드라마 긴장감 피아노 코드 + 심장 쿵",
      scene2Visual: "주인공의 감정선이 폭발하는 클라이맥스 컷 오버레이",
      scene2Sfx: "감동적인 오케스트라 크레셴도",
      scene3Visual: "숨겨진 복선과 명대사 해석 텍스트 애니메이션",
      scene3Sfx: "반짝 깨달음 차임",
      scene4Visual: "팬들의 열광적인 실시간 댓글 반응 팝업",
      scene4Sfx: "타자기 타닥타닥 소리"
    }
  },

  society: {
    categoryLabel: "한국 사회 & 일상 라이프",
    categoryLabelEn: "Korean Society & Daily Living",
    vocabularies: [
      { word: "빨리빨리", romanization: "ppal-li ppal-li", meaning: "Quickly-quickly mindset driving efficiency", example: "빨리빨리 문화 덕분에 초고속 행정 서비스가 가능하다.", exampleEn: "The hurry-hurry mindset enables world-class high-speed public services." },
      { word: "칼퇴", romanization: "kal-toe", meaning: "Leaving work with knife-sharp punctuality right at 6PM", example: "오늘은 일이 끝나자마자 칼퇴할 예정이다.", exampleEn: "I plan to punch out with razor-sharp punctuality the moment work finishes." },
      { word: "눈치껏", romanization: "nun-chi-kkeot", meaning: "Tactfully and sensibly gauging the situation", example: "선배들의 분위기를 보고 눈치껏 행동했다.", exampleEn: "I observed the seniors' vibe and acted tactfully." },
      { word: "가성비", romanization: "ga-seong-bi", meaning: "Price-to-performance value", example: "이 식당은 음식 맛과 양 모두 가성비가 최고다.", exampleEn: "This restaurant offers the absolute best value in flavor and portion." },
      { word: "정(情)", romanization: "jeong", meaning: "Deep mutual warmth, empathy, and bonding", example: "한국 이웃 간에는 아직도 따뜻한 정이 살아있다.", exampleEn: "Warm bonds of affection still thrive among Korean neighbors." }
    ],
    sectionHeadings: [
      "1. 외국인이 한국에 오면 가장 먼저 놀라는 문화 충격",
      "2. 한국인들 사이에 통하는 보이지 않는 암묵적인 약속",
      "3. 현지인과 자연스럽게 녹아드는 실전 에티켓 가이드"
    ],
    sectionHeadingsEn: [
      "1. First-Day Culture Shocks Every Foreigner Experiences",
      "2. The Unwritten Social Codes Governing Korean Daily Life",
      "3. Seamless Etiquette Guide to Blending in with Locals"
    ],
    sectionInsights: [
      "카페 테이블 위에 노트북과 스마트폰을 두고 화장실을 다녀와도 도난당하지 않는 세계 최고의 치안과 신뢰 사회를 목격합니다.",
      "지하철 임산부 배려석 비워두기, 에스컬레이터 한 줄 서기 등 서로의 동선을 배려하는 일상의 질서가 돋보입니다.",
      "작은 예의와 정을 건네면 기대 이상으로 따뜻하게 화답해 주는 한국인들의 정서를 직접 체험할 수 있습니다."
    ],
    sectionInsightsEn: [
      "Witnessing unmatched civic safety—leaving laptops and phones on cafe tables without fear of theft.",
      "Unspoken harmony—leaving pink pregnancy seats open and queuing neatly on escalators.",
      "Extending courteous greetings unlocks overflowing warmth and hospitality from local Koreans."
    ],
    quotes: [
      "“서로에 대한 높은 신뢰와 배려가 서울이라는 거대 도시를 움직이는 숨은 동력입니다.”",
      "“빨리빨리의 속도감 속에서도 이웃을 향한 정(情)의 온도는 식지 않습니다.”",
      "“규칙을 지키는 것은 불편함이 아니라, 모두가 안전하고 편안하기 위한 약속입니다.”"
    ],
    quotesEn: [
      "“Deep civic trust and daily consideration are the quiet engines powering metropolitan Seoul.”",
      "“Even amidst rapid hurry-hurry speed, the warmth of community affection never cools.”",
      "“Following unwritten social codes is a shared pact ensuring safety and comfort for all.”"
    ],
    culturalNuance: "한국의 사회적 규범은 공동체의 조화와 상호 존중을 중시합니다. 처음에는 엄격해 보일 수 있지만, 그 안에는 모든 구성원이 안전하고 편안하게 살아가도록 돕는 배려가 있습니다.",
    culturalNuanceEn: "Korean social norms prioritize community harmony and mutual safety over selfish convenience.",
    shortsStory: {
      bgm: "활기차고 경쾌한 시티라이프 비트",
      hookVisual: "서울 지하철의 정돈된 풍경과 카페 테이블 위 노트북 방치 실험 컷",
      hookSfx: "지하철 환승 차임벨 띠리리리~",
      scene2Visual: "외국인이 눈이 둥그레져 놀라는 리액션",
      scene2Sfx: "놀람 효과음 띠용!",
      scene3Visual: "한국인들이 암묵적으로 지키는 3대 사회적 룰 그래픽",
      scene3Sfx: "체크 표시 착! 착! 착!",
      scene4Visual: "친절한 미소로 길을 알려주고 도와주는 따뜻한 현지인 모습",
      scene4Sfx: "따뜻한 피아노 차임"
    }
  },

  heritage: {
    categoryLabel: "한국 역사 & 전통 문화",
    categoryLabelEn: "Korean History & Heritage",
    vocabularies: [
      { word: "고즈넉하다", romanization: "go-jeu-neok-ha-da", meaning: "Quiet, peaceful, and traditionally serene", example: "비 내리는 한옥의 고즈넉한 정취가 아름답다.", exampleEn: "The peaceful, quiet serenity of the rainy hanok is captivating." },
      { word: "여운(餘韻)", romanization: "yeo-un", meaning: "Lingering resonance and poetic aftertaste", example: "오랜 역사의 흔적이 가슴 깊은 여운을 준다.", exampleEn: "Traces of ancient history leave a deeply moving resonance." },
      { word: "애틋하다", romanization: "ae-teut-ha-da", meaning: "Tender, wistful, and heartbreakingly sweet", example: "선조들의 애틋한 사랑과 희생이 느껴진다.", exampleEn: "One can feel the wistful love and sacrifices of ancestors." },
      { word: "정취(情趣)", romanization: "jeong-chwi", meaning: "Poetic flavor, mood, and historic atmosphere", example: "고궁을 걸으며 선조들의 고결한 정취를 만끽했다.", exampleEn: "Strolling through ancient palaces, I soaked in the noble heritage mood." },
      { word: "풍류(風流)", romanization: "pung-ryu", meaning: "Appreciating nature, arts, and elegant leisure", example: "자연 속에서 시를 짓던 선비들의 풍류가 깃들어 있다.", exampleEn: "It holds the poetic elegance of scholars composing verse in nature." }
    ],
    sectionHeadings: [
      "1. 수백 년 세월을 뛰어넘어 살아 숨 쉬는 역사적 배경",
      "2. 전통의 상징과 조형미 속에 깃든 선조들의 철학",
      "3. 현대 한국인의 일상과 예술 속에 이어지는 정신"
    ],
    sectionHeadingsEn: [
      "1. Timeless Echoes: Historic Roots Breathing Across Centuries",
      "2. Ancient Philosophy Embedded in Heritage Architecture",
      "3. Living Heritage: How Tradition Inspires Modern Korea"
    ],
    sectionInsights: [
      "격동의 역사를 겪으면서도 꿋꿋이 지켜온 문화유산의 고결한 가치를 조명합니다.",
      "자연을 거스르지 않고 자연과 하나 되어 숨 쉬던 한국 전통 건축과 예술의 백미입니다.",
      "전통은 박물관에 박제된 과거가 아니라, 오늘날의 K-컬처 속에서 현대적으로 재해석되고 있습니다."
    ],
    sectionInsightsEn: [
      "Shining light on cultural resilience that endured tumultuous centuries intact.",
      "The pinnacle of Korean traditional aesthetics: breathing in harmony with nature rather than dominating it.",
      "Tradition isn't trapped in museums; it continuously inspires modern Korean creativity."
    ],
    quotes: [
      "“역사를 잊은 민족에게 미래는 없다는 말처럼, 전통은 오늘을 비추는 거울입니다.”",
      "“자연의 곡선을 닮은 지붕 처마 끝에 선조들의 너그러운 품성이 깃들어 있습니다.”",
      "“오랜 시간 묵혀둔 장맛처럼, 세월이 흐를수록 한국 전통의 깊이는 더해집니다.”"
    ],
    quotesEn: [
      "“As the proverb says, tradition is the sacred mirror illuminating our future.”",
      "“Along the graceful curves of eaves lies the generous spirit of our ancestors.”",
      "“Like well-aged earthenware sauce, time only deepens the sublime flavor of Korean heritage.”"
    ],
    culturalNuance: "한국 전통문화의 핵심은 '자연과의 합일'과 '비움의 미학'입니다. 화려함으로 억누르기보다 여백을 두고 절제하는 담백한 아름다움을 느껴보세요.",
    culturalNuanceEn: "At the heart of Korean heritage lies the aesthetics of negative space and oneness with nature.",
    shortsStory: {
      bgm: "서정적인 가야금과 대금 퓨전 국악 사운드",
      hookVisual: "웅장한 고궁 처마 곡선과 단청 색채의 시네마틱 드론 샷",
      hookSfx: "고즈넉한 풍경 소리 짤랑~",
      scene2Visual: "역사적 유적과 한복 입은 사람들의 고풍스러운 모습",
      scene2Sfx: "장엄한 북소리 둥~",
      scene3Visual: "전통 기술과 예술품의 섬세한 디테일 클로즈업",
      scene3Sfx: "맑은 징 소리 댕~",
      scene4Visual: "과거와 현대 서울의 스카이라인이 오버랩되는 전환",
      scene4Sfx: "부드러운 현악기 선율"
    }
  },

  travel: {
    categoryLabel: "한국 여행 & 핫플레이스",
    categoryLabelEn: "Korea Travel & Hotspots",
    vocabularies: [
      { word: "인생샷", romanization: "in-saeng-syat", meaning: "Life-shot (The greatest photo of your entire lifetime)", example: "여기서 사진 찍으면 무조건 인생샷 나온다.", exampleEn: "Taking a photo here guarantees the greatest shot of your life." },
      { word: "핫플", romanization: "hat-peul", meaning: "Hot place / trending destination", example: "주말에는 성수동 핫플 탐방을 떠난다.", exampleEn: "On weekends, I explore the trending hotspots of Seongsu-dong." },
      { word: "발길이 닿다", romanization: "bal-gil-i dat-da", meaning: "Feet wandering naturally to a captivating spot", example: "골목길을 걷다 발길이 닿은 곳이 명소였다.", exampleEn: "Wandering alleyways, my feet led me to an enchanting hidden gem." },
      { word: "힐링", romanization: "hil-ling", meaning: "Restorative healing and peace of mind", example: "탁 트인 바다를 보며 완벽한 힐링을 즐겼다.", exampleEn: "Gazing at the endless sea brought complete healing to my mind." },
      { word: "야경", romanization: "ya-gyeong", meaning: "Nightscape / shimmering evening cityscape", example: "남산타워에서 바라본 서울 야경이 환상적이다.", exampleEn: "The glittering Seoul nightscape viewed from Namsan Tower is magical." }
    ],
    sectionHeadings: [
      "1. 현지인만 아는 숨은 뷰포인트와 방문 최적 시간",
      "2. 실패 없는 인생샷 촬영 명당과 포토존 비밀",
      "3. 주변 도보 코스와 찰떡궁합 로컬 맛집 추천"
    ],
    sectionHeadingsEn: [
      "1. Local Insider Secret: Optimal Timing & Hidden Viewpoints",
      "2. Flawless 'Life-Shot' Photo Spots & Lighting Hacks",
      "3. Nearby Walking Trails & Unbeatable Local Eateries"
    ],
    sectionInsights: [
      "관광객들로 붐비는 시간대를 피해 호젓하게 풍경을 독점할 수 있는 꿀팁을 전합니다.",
      "SNS에 올리면 질문이 쏟아지는 감각적인 앵글과 사진 촬영 팁을 공유합니다.",
      "여행의 피로를 단숨에 씻어줄 인근 골목의 숨은 노포와 감성 카페 코스를 연결해 드립니다."
    ],
    sectionInsightsEn: [
      "Beat tourist crowds and savor panoramic views in serene tranquility with insider timing.",
      "Master photo angles that spark floods of 'Where is this?!' comments on your social feed.",
      "Connect historic sights to tucked-away neighborhood food stalls and aesthetic cafes."
    ],
    quotes: [
      "“여행이란 새로운 풍경을 보는 것이 아니라, 새로운 눈을 갖는 것입니다.”",
      "“서울의 골목길 하나하나에는 지루할 틈이 없는 다채로운 이야기가 숨어 있습니다.”",
      "“발길 닿는 곳마다 역사와 현대의 세련미가 눈부시게 공존합니다.”"
    ],
    quotesEn: [
      "“Travel is not merely seeing new landscapes, but acquiring new eyes.”",
      "“Tucked inside every Seoul alleyway are vibrant stories waiting to be discovered.”",
      "“Every turn blends ancient heritage with cutting-edge metropolitan chic.”"
    ],
    culturalNuance: "한국 여행의 묘미는 첨단 대도시의 편리함과 600년 역사 유적, 그리고 아늑한 자연이 대중교통 30분 거리 안에서 모두 완벽하게 맞닿아 있다는 점입니다.",
    culturalNuanceEn: "The miracle of traveling Korea is experiencing 600-year palaces, futuristic tech, and quiet mountains within a 30-minute subway ride.",
    shortsStory: {
      bgm: "청량하고 산뜻한 트래블 인디팝 비트",
      hookVisual: "숨이 멎을 듯한 파노라마 뷰와 함께 '여기가 한국이라고?!' 자막 팝업",
      hookSfx: "비행기 이륙 휘잉 + 카메라 찰칵",
      scene2Visual: "빛나는 핫스팟 골목길을 걸어 들어가는 역동적인 1인칭 워킹 샷",
      scene2Sfx: "발걸음 또각또각 소리",
      scene3Visual: "환상적인 인생샷 구도 3가지와 격자 그리드 가이드",
      scene3Sfx: "카메라 셔터 연사 효과음 찰칵찰칵",
      scene4Visual: "근처 감성 카페에서 시원한 음료와 디저트 먹는 컷",
      scene4Sfx: "얼음 달그락 + 차임벨"
    }
  },

  general: {
    categoryLabel: "K-컬처 인사이트",
    categoryLabelEn: "K-Culture Insights",
    vocabularies: [
      { word: "공감대(共感帶)", romanization: "gong-gam-dae", meaning: "Bond of shared empathy and resonance", example: "많은 사람들의 깊은 공감대를 형성했다.", exampleEn: "It struck a deep chord of empathy with the broad public." },
      { word: "특색(特色)", romanization: "teuk-saek", meaning: "Distinctive characteristic / unique flavor", example: "한국만의 고유한 문화적 특색이 살아있다.", exampleEn: "Korea's unique cultural flavor shines brightly through it." },
      { word: "자연스럽다", romanization: "ja-yeon-seu-reop-da", meaning: "Smooth, organic, and natural", example: "대화 속에서 이 맥락을 자연스럽게 활용해 보세요.", exampleEn: "Try weaving this context organically into daily conversations." },
      { word: "살아있다", romanization: "sal-a-it-da", meaning: "Full of vitality, alive, and vibrant", example: "거리의 활기찬 에너지가 고스란히 살아있다.", exampleEn: "The vibrant street energy is palpably alive." },
      { word: "정(情)", romanization: "jeong", meaning: "Warm human bonding and affection", example: "그 배경에는 따뜻한 한국인의 정이 깃들어 있다.", exampleEn: "Behind it lies the warm communal bonding of the Korean people." }
    ],
    sectionHeadings: [
      "1. 일상 속에 자연스럽게 뿌리내린 배경과 핵심 원리",
      "2. 현지인들의 대화와 미디어에서 발견하는 3가지 포인트",
      "3. 외국인 학습자가 실생활에서 200% 활용하는 꿀팁"
    ],
    sectionHeadingsEn: [
      "1. Roots & Origin: How It Flourished in Daily Korean Life",
      "2. 3 Key Observations from Native Daily Discourse & Media",
      "3. Insider Application: How Learners Can Use This Naturally"
    ],
    sectionInsights: [
      "단순한 유행을 넘어, 한국인들이 서로 소통하고 관계를 맺어온 오랜 방식과 맞닿아 있습니다.",
      "시대의 흐름에 따라 현대적으로 변모하면서도 한국 고유의 따뜻한 배려 정신을 보존하고 있습니다.",
      "직접 경험하고 대화 속에서 인용해 보면 한국인 친구들과의 친밀도가 수직 상승합니다."
    ],
    sectionInsightsEn: [
      "Beyond surface-level phenomena, it taps into how Koreans form lasting relationships.",
      "Adapting dynamically to modern times, it preserves authentic interpersonal warmth.",
      "Mentioning it to Korean acquaintances builds instant rapport and mutual warmth."
    ],
    quotes: [
      "“작은 문화적 디테일을 이해하는 순간, 한국어는 소리에서 감동으로 바뀝니다.”",
      "“문화는 사람과 사람을 이어주는 가장 따뜻하고 단단한 다리입니다.”",
      "“있는 그대로의 모습을 깊이 들여다볼 때 진정한 문화적 즐거움이 시작됩니다.”"
    ],
    quotesEn: [
      "“The moment you grasp cultural nuance, Korean transforms from sounds into heartfelt emotion.”",
      "“Culture is the warmest, most enduring bridge connecting human hearts.”",
      "“True appreciation begins when you look beneath the surface with genuine curiosity.”"
    ],
    culturalNuance: "한국 문화는 타인에 대한 세심한 관심과 빠른 역동성이 조화롭게 어우러져 있습니다. 이 주제 역시 상대방과의 소통을 풍요롭게 만들어주는 훌륭한 대화 소재입니다.",
    culturalNuanceEn: "Korean culture harmoniously combines thoughtful empathy for others with lightning dynamism.",
    shortsStory: {
      bgm: "밝고 세련된 업비트 K-바이브 사운드",
      hookVisual: "주제와 관련된 호기심 자극 텍스트와 눈길을 사로잡는 오프닝 제스처",
      hookSfx: "손가락 스냅 딱! 효과음",
      scene2Visual: "일상생활에서 실제로 벌어지는 흥미로운 상황극 컷",
      scene2Sfx: "배경 차임벨",
      scene3Visual: "핵심 요약 포인트 1, 2, 3 인포그래픽 텍스트 강조",
      scene3Sfx: "딩동댕 정답 차임",
      scene4Visual: "한국인 친구와의 대화에서 감탄을 자아내는 리액션 컷",
      scene4Sfx: "반짝이는 효과음"
    }
  }
};

/**
 * Intelligent Dynamic Content Synthesizer that categorizes custom topics into
 * distinct semantic domains (Food, Grammar, Trend, Entertainment, Society, Heritage, Travel, General)
 * ensuring custom, high-converting, non-repetitive content generation.
 */
export function synthesizeDynamicContent(
  topic: string,
  category: string = "general",
  tone: string = "casual_mz",
  appUrl: string = DEFAULT_APP_PROMO_URL
): { blog: GeneratedBlogPost; shorts: GeneratedShortsScript } {
  const cleanTopic = topic.trim() || "한국의 일상과 문화";
  const domainKey = detectDomain(cleanTopic, category);
  const profile = DOMAIN_PROFILES[domainKey] || DOMAIN_PROFILES.general;

  const catLabel = profile.categoryLabel;
  const catLabelEn = profile.categoryLabelEn;

  const blog: GeneratedBlogPost = {
    titleSuggestions: [
      `[${catLabel}] 지금 꼭 알아야 할 '${cleanTopic}'의 모든 것 (${cleanTopic}: Essential Guide)`,
      `한국인도 깜짝 놀라는 '${cleanTopic}' 속 반전과 진짜 뉘앙스 (The Deep Nuance Behind ${cleanTopic})`,
      `외국인이 현지인처럼 마스터하는 '${cleanTopic}' 핵심 3가지 정리 (Mastering ${cleanTopic} Like a Native)`
    ],
    selectedTitle: `[${catLabel}] 지금 꼭 알아야 할 '${cleanTopic}'의 모든 것`,
    selectedTitleEn: `[${catLabelEn}] Everything You Need to Know About '${cleanTopic}'`,
    metaDescription: `${cleanTopic}의 핵심 배경, 원어민 표현, 실전 활용 팁 및 문화적 뉘앙스를 한눈에 파악하는 고품격 가이드입니다.`,
    metaDescriptionEn: `An insightful cultural & conversational guide to '${cleanTopic}', complete with authentic Korean vocabulary, cultural context, and practical tips.`,
    readingTime: "3분 30초",
    targetAudience: "글로벌 한국어 학습자, K-컬처 팬 및 한국의 진짜 매력을 탐구하는 독자",
    hook: `‘아는 만큼 보이고, 이해할수록 반하게 되는 한국의 이야기.’ 오늘 집중 탐구할 주제는 바로 많은 분들이 궁금해하시는 **"${cleanTopic}"**입니다. 겉으로 드러난 모습 너머에 담긴 흥미진진한 맥락과 원어민들의 속마음을 짚어드립니다.`,
    hookEn: `"The more you understand, the deeper you fall in love with Korea." Today's focal topic is "${cleanTopic}". Let's dive deep beneath the surface to explore the genuine cultural sentiment and practical conversational secrets.`,
    sections: [
      {
        heading: `${profile.sectionHeadings[0]} - '${cleanTopic}'`,
        headingEn: `${profile.sectionHeadingsEn[0]} - '${cleanTopic}'`,
        content: `'${cleanTopic}'은(는) 한국의 독특한 문화적 토양 속에서 자연스럽게 싹터 오늘날 많은 이들의 일상에 깊숙이 자리 잡았습니다. ${profile.sectionInsights[0]}`,
        contentEn: `'${cleanTopic}' organically took root within Korea's unique cultural soil and has become an essential part of daily life. ${profile.sectionInsightsEn[0]}`,
        highlightQuote: profile.quotes[0],
        highlightQuoteEn: profile.quotesEn[0],
        koreanVocabulary: [profile.vocabularies[0], profile.vocabularies[1]]
      },
      {
        heading: `${profile.sectionHeadings[1]} - '${cleanTopic}'`,
        headingEn: `${profile.sectionHeadingsEn[1]} - '${cleanTopic}'`,
        content: `원어민들의 시선에서 바라보는 '${cleanTopic}'은(는) 단순한 현상 그 이상의 의미를 지닙니다. ${profile.sectionInsights[1]}`,
        contentEn: `Seen through native eyes, '${cleanTopic}' carries far deeper resonance than mere surface trends. ${profile.sectionInsightsEn[1]}`,
        highlightQuote: profile.quotes[1],
        highlightQuoteEn: profile.quotesEn[1],
        koreanVocabulary: [profile.vocabularies[2], profile.vocabularies[3]]
      },
      {
        heading: `${profile.sectionHeadings[2]} - '${cleanTopic}'`,
        headingEn: `${profile.sectionHeadingsEn[2]} - '${cleanTopic}'`,
        content: `한국인 친구나 현지 생활에서 '${cleanTopic}'을(를) 센스 있게 인용해 보세요. ${profile.sectionInsights[2]}`,
        contentEn: `Try bringing up '${cleanTopic}' naturally when chatting with Korean friends or traveling. ${profile.sectionInsightsEn[2]}`,
        highlightQuote: profile.quotes[2],
        highlightQuoteEn: profile.quotesEn[2],
        koreanVocabulary: [profile.vocabularies[4] || profile.vocabularies[0]]
      }
    ],
    culturalNuance: `'${cleanTopic}' 속에 담긴 가장 특별한 가치는 바로 ${profile.culturalNuance}`,
    culturalNuanceEn: `The most distinctive value within '${cleanTopic}' lies in how ${profile.culturalNuanceEn}`,
    conclusion: `'${cleanTopic}'에 대해 함께 살펴보았습니다. 사소해 보이는 일상 디테일 하나에도 그 문화권 사람들의 삶과 철학, 따뜻한 마음이 고스란히 깃들어 있습니다.`,
    conclusionEn: `We explored '${cleanTopic}' together. Even in the smallest daily detail, the history, philosophy, and heartfelt warmth of Korean culture shine brightly.`,
    callToAction: `여러분이 느끼는 '${cleanTopic}'의 가장 매력적인 점은 무엇인가요? 여러분만의 생각이나 경험을 댓글로 자유롭게 남겨주세요!`,
    callToActionEn: `What do you find most intriguing about '${cleanTopic}'? Share your perspective and experiences in the comments below!`,
    hashtags: [`#${cleanTopic.replace(/\s+/g, '')}`, "#한국문화", "#TalkKorean", "#KoreanCulture", "#LearnKorean", "#KCulture"]
  };

  const story = profile.shortsStory;

  const shorts: GeneratedShortsScript = {
    title: `30초 만에 끝내는 '${cleanTopic}' 핵심 비밀! ⚡`,
    titleEn: `'${cleanTopic}' Explained in 30 Seconds ⚡`,
    estimatedDuration: "45초",
    thumbnailHook: `한국인도 잘 모르는 '${cleanTopic}'의 반전?!`,
    thumbnailHookEn: `The Secret Truth About '${cleanTopic}'?!`,
    bgmSuggestion: story.bgm,
    retentionTip: "첫 2초 안에 시선 집중 자막과 호기심 유발 질문으로 이탈률 방어",
    scenes: [
      {
        sceneNumber: 1,
        timeRange: "00:00 - 00:05",
        visual: `${story.hookVisual}: 화면 중앙에 큼직한 텍스트 팝업 '${cleanTopic}'`,
        narrationKo: `한국에서 제일 핫한 '${cleanTopic}', 이거 진짜 알고 계셨나요?`,
        narrationEn: `Everyone’s talking about '${cleanTopic}' in Korea—did you know this?`,
        captionText: `🔥 제일 핫한 '${cleanTopic}'의 비밀!`,
        captionTextEn: `🔥 The Secret of '${cleanTopic}'!`,
        sfx: story.hookSfx
      },
      {
        sceneNumber: 2,
        timeRange: "00:05 - 00:15",
        visual: story.scene2Visual,
        narrationKo: `외국인들이 처음 보면 다들 깜짝 놀라는데요. 사실 여기엔 한국인들의 깊은 문화와 생활 방식이 담겨 있습니다.`,
        narrationEn: `Foreigners are always surprised at first, but it reflects deep Korean culture and daily lifestyle.`,
        captionText: `외국인들이 보고 깜짝 놀라는 이유 😲`,
        captionTextEn: `Why Foreigners are Shocked 😲`,
        sfx: story.scene2Sfx
      },
      {
        sceneNumber: 3,
        timeRange: "00:15 - 00:27",
        visual: story.scene3Visual,
        narrationKo: `핵심 포인트는 바로 이겁니다! ${profile.sectionInsights[0]}`,
        narrationEn: `Here is the key takeaway! ${profile.sectionInsightsEn[0]}`,
        captionText: `💡 핵심 포인트: ${profile.vocabularies[0].word}의 비밀!`,
        captionTextEn: `💡 Key Secret: ${profile.vocabularies[0].meaning}`,
        sfx: story.scene3Sfx
      },
      {
        sceneNumber: 4,
        timeRange: "00:27 - 00:37",
        visual: story.scene4Visual,
        narrationKo: `한국 친구에게 이거 아냐고 물어보세요! '너 이거 어떻게 알았어?'라며 깜짝 놀랄 겁니다.`,
        narrationEn: `Ask your Korean friends about this! They will be amazed by how much you know!`,
        captionText: `한국 친구 감동시키는 원어민 꿀팁 ✨`,
        captionTextEn: `How to Impress Korean Friends ✨`,
        sfx: story.scene4Sfx
      },
      {
        sceneNumber: 5,
        timeRange: "00:37 - 00:45",
        visual: "구독 & 좋아요 애니메이션 클릭 효과와 토크코리안 앱 배너",
        narrationKo: `더 많은 리얼 한국어 꿀팁은 구독 누르고 TalkKorean에서 매일 무료로 만나보세요!`,
        narrationEn: `For more authentic Korean insights, hit subscribe and check out TalkKorean!`,
        captionText: "구독하고 한국 마스터하기! 🚀",
        captionTextEn: "Subscribe to Master Korean! 🚀",
        sfx: "경쾌한 팝 차임벨"
      }
    ],
    fullScriptKo: `한국에서 제일 핫한 '${cleanTopic}', 이거 진짜 알고 계셨나요? 외국인들이 처음 보면 다들 깜짝 놀라는데요. 사실 여기엔 한국인들의 깊은 문화와 생활 방식이 담겨 있습니다. 핵심 포인트는 바로 이겁니다! ${profile.sectionInsights[0]} 한국 친구에게 이거 아냐고 물어보세요! '너 이거 어떻게 알았어?'라며 깜짝 놀랄 겁니다. 더 많은 리얼 한국어 꿀팁은 구독 누르고 TalkKorean에서 매일 무료로 만나보세요!`,
    fullScriptEn: `Everyone’s talking about '${cleanTopic}' in Korea—did you know this? Foreigners are always surprised at first, but it reflects deep Korean culture and daily lifestyle. Here is the key takeaway! ${profile.sectionInsightsEn[0]} Ask your Korean friends about this! They will be amazed by how much you know! For more authentic Korean insights, hit subscribe and check out TalkKorean!`
  };

  return { blog, shorts };
}
