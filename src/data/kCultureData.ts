import hanbokFashionImage from '../assets/images/hanbok_fashion_heritage_1787065031745.jpg';
import ondolPalaceImage from '../assets/images/ondol_palace_architecture_1787065459730.jpg';
import yutnoriSceneImage from '../assets/images/korean_yutnori_scene_1787065559431.jpg';
import koreanCalligraphyImage from '../assets/images/korean_calligraphy_art_1787066698427.jpg';
import traditionalKimchiImage from '../assets/images/traditional_kimchi_making_1787795440693.jpg';
import tteokbokkiImage from '../assets/images/korean_tteokbokki_premium_1787795629824.jpg';
import samgyeopsalImage from '../assets/images/korean_samgyeopsal_bbq_1787795467757.jpg';
import noraebangImage from '../assets/images/korean_noraebang_room_1787795482728.jpg';

export type KCultureCategory = 
  | 'K-FOOD' 
  | 'K-WEAR' 
  | 'K-HOUSE & PALACE' 
  | 'K-Literature' 
  | 'K-MUSIC' 
  | 'K-PLAY' 
  | 'K-ART' 
  | 'K-GAME';

export interface CultureItemVocab {
  ko: string;
  en: string;
  tip: string;
}

export interface CultureItemStep {
  stepLabel: string;
  titleKo: string;
  descEn: string;
}

export interface LiteratureExcerpt {
  quoteKo: string;
  quoteEn?: string;
  authorOrSource?: string;
  contextNoteKo?: string;
  contextNoteEn?: string;
  literaryDevice?: string;
}

export interface CultureItem {
  id: string;
  category: KCultureCategory;
  badge: string;
  titleKo: string;
  titleEn: string;
  subtitleKo: string;
  subtitleEn: string;
  image: string;
  imageCaption: string;
  commentaryHeader: string;
  commentarySub: string;
  commentaryKo: string;
  commentaryEn: string;
  cultureTipKo: string;
  cultureTipEn: string;
  heritageTitleKo: string;
  heritageDescKo: string;
  keyVocabulary: CultureItemVocab[];
  keyIngredientsLabel: string;
  keyIngredients: { ko: string; en: string }[];
  stepsLabel: string;
  steps: CultureItemStep[];
  literatureGenre?: '신화' | '전설' | '민담(야담)' | '전래동화' | '속담' | '수수께끼' | '고전소설' | '현대소설' | '현대희곡' | '현대수필' | '서정시';
  literatureSubgenre?: '고전소설' | '애정소설' | '세태소설' | '우화소설';
  literatureExcerpt?: LiteratureExcerpt;
}

export function getGenreEnglish(genre?: string): string {
  switch (genre) {
    case '신화': return 'Mythology';
    case '전설': return 'Legend';
    case '민담(야담)': return 'Folktale & Yadam';
    case '전래동화': return 'Traditional Fairy Tale';
    case '속담': return 'Proverbs';
    case '수수께끼': return 'Riddles';
    case '고전소설': return 'Classical Novel';
    case '현대소설': return 'Modern Novel';
    case '현대희곡': return 'Modern Drama';
    case '현대수필': return 'Modern Essay';
    case '서정시': return 'Lyric Poetry';
    default: return 'Literature';
  }
}

export function getSubgenreEnglish(subgenre?: string): string {
  switch (subgenre) {
    case '고전소설': return 'Heroic Classic';
    case '애정소설': return 'Romance Classic';
    case '세태소설': return 'Satirical Classic';
    case '우화소설': return 'Fable Classic';
    default: return subgenre || '';
  }
}

export const K_CULTURE_ITEMS: CultureItem[] = [
  // ==========================================
  // K-FOOD (4 Rich Content Items)
  // ==========================================
  {
    id: 'food-bibimbap',
    category: 'K-FOOD',
    badge: 'Trending Food • Best Seller',
    titleKo: 'Taste of Korean Culture: 비빔밥 (Bibimbap)',
    titleEn: 'Jeonju Royal Bibimbap & Five-Color Harmony',
    subtitleKo: '언어와 미식이 만나는 순간, 전통 비빔밥에 담긴 조화의 철학과 식당 실전 한국어를 함께 배웁니다.',
    subtitleEn: 'Language learning comes alive through culture and cuisine. Explore traditional Korean gastronomy while mastering culinary vocabulary and expressions.',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80',
    imageCaption: '전주 전통 비빔밥 (Jeonju Style Bibimbap)',
    commentaryHeader: 'Cultural Commentary • 오방색의 미학',
    commentarySub: '"비비다" + "밥"',
    commentaryKo: '비빔밥은 음양오행(Yin-Yang and Five Elements)의 철학을 담아 청·적·황·백·흑의 5가지 색상(오방색) 재료가 한 그릇에서 조화를 이루는 한식 최고의 미학입니다.',
    commentaryEn: 'Bibimbap represents balance and harmony ("조화") in traditional Korean philosophy, bringing together five cardinal colors that symbolize seasonal vitality and complete nutrition.',
    cultureTipKo: '밥알이 으깨지지 않도록 젓가락으로 나물을 먼저 살살 푼 뒤, 숟가락으로 부드럽게 비벼 드시면 재료 본연의 식감을 가장 잘 느낄 수 있습니다.',
    cultureTipEn: 'Tip: Use chopsticks to gently loosen the seasoned vegetables first so the rice grains stay intact, then mix smoothly with a spoon. You can also say "고추장 따로 주세요" to adjust spiciness!',
    heritageTitleKo: '한식의 문화해설과 실전 어휘 (Bibimbap Heritage & Vocabulary)',
    heritageDescKo: '전통 궁중 음식에서 시작되어 세계적인 K-Food 아이콘으로 사랑받는 비빔밥의 문화적 배경과, 식당에서 즉시 활용 가능한 핵심 회화 표현을 학습합니다.',
    keyVocabulary: [
      { ko: '비비다', en: 'to mix / stir together', tip: '동사 Verb' },
      { ko: '나물', en: 'seasoned vegetables', tip: '명사 Noun' },
      { ko: '오방색', en: 'five traditional cardinal colors', tip: '문화 Culture' },
      { ko: '조화', en: 'harmony / balance', tip: '핵심 개념' },
      { ko: '고추장 따로 주세요', en: 'Please serve Gochujang on the side', tip: '식당 표현' },
      { ko: '참기름 많이 넣어 주세요', en: 'Please add extra sesame oil', tip: '식당 표현' }
    ],
    keyIngredientsLabel: '주요 재료 (Key Ingredients)',
    keyIngredients: [
      { ko: '밥', en: 'Steamed Rice' },
      { ko: '고사리', en: 'Bracken' },
      { ko: '시금치', en: 'Spinach' },
      { ko: '도라지', en: 'Bellflower Root' },
      { ko: '소고기', en: 'Sautéed Beef' },
      { ko: '계란후라이', en: 'Fried Egg' },
      { ko: '고추장', en: 'Gochujang Paste' },
      { ko: '참기름', en: 'Sesame Oil' }
    ],
    stepsLabel: '조리 및 식사 순서 (Step-by-Step Culinary Method)',
    steps: [
      { stepLabel: 'Step 1 • 나물 준비', titleKo: '1. 나물 데치고 양념하기', descEn: 'Blanch spinach, bracken, and bellflower roots separately. Season lightly with sesame oil and garlic.' },
      { stepLabel: 'Step 2 • 고기 볶기', titleKo: '2. 소고기 간장 볶음', descEn: 'Sauté minced beef with soy sauce, sugar, and sesame oil until tender and flavorful.' },
      { stepLabel: 'Step 3 • 그릇에 담기', titleKo: '3. 색상 맞춰 밥 위에 올리기', descEn: 'Arrange seasoned vegetables and beef in a colorful circular pattern over a bowl of warm rice.' },
      { stepLabel: 'Step 4 • 비벼 먹기', titleKo: '4. 고추장 넣고 비비기', descEn: 'Top with a sunny-side-up egg, Gochujang, and sesame seeds. Mix thoroughly before eating!' }
    ]
  },
  {
    id: 'food-kimchi',
    category: 'K-FOOD',
    badge: 'UNESCO Heritage • Kimjang',
    titleKo: 'Taste of Korean Culture: 전통 김치담그기 (Traditional Kimchi Making)',
    titleEn: 'Traditional Kimchi Making & UNESCO Kimjang Heritage',
    subtitleKo: '사계절을 대비하는 공동체 협동 문화인 김장과 천연 젖산 발효 과학에 깃든 한식 문화의 정수를 체험합니다.',
    subtitleEn: 'Explore UNESCO-inscribed Kimjang heritage and the natural lactic acid fermentation science behind Korea’s national dish.',
    image: traditionalKimchiImage,
    imageCaption: '전통 포기김치 속 넣기 (Traditional Kimchi Making)',
    commentaryHeader: 'Cultural Commentary • 발효 과학과 공동체',
    commentarySub: '유네스코 인류무형문화유산',
    commentaryKo: '김치는 단순한 반찬을 넘어 늦가을 온 마을이 모여 함께 담그고 나누는 "김장" 문화를 통해 공동체의 나눔과 유대감을 상징합니다.',
    commentaryEn: 'Kimchi embodies the communal heritage of Kimjang—where neighbors gather in late autumn to prepare winter provisions together, fostering deep social solidarity.',
    cultureTipKo: '갓 담근 겉절이는 보쌈 고기나 굴과 함께 곁들여 먹고, 잘 묵은 묵은지는 김치찌개나 김치찜으로 끓여 깊은 감칠맛을 즐깁니다.',
    cultureTipEn: 'Tip: Pair freshly made Geotjeori kimchi with boiled pork (Bossam). When kimchi matures into Mukeunji, simmer it into hearty Kimchi-jjigae stew!',
    heritageTitleKo: '김치의 문화해설과 실전 표현 (Kimchi Heritage & Phrases)',
    heritageDescKo: '발효 과학이 선사하는 영양학적 가치와 한국 식당에서 유용하게 쓰이는 반찬 및 주문 관련 한국어 표현을 익혀봅니다.',
    keyVocabulary: [
      { ko: '발효', en: 'fermentation / lactic acid', tip: '과학 Science' },
      { ko: '김장', en: 'winter kimchi-making tradition', tip: '유네스코 문화' },
      { ko: '겉절이 / 묵은지', en: 'fresh kimchi / aged kimchi', tip: '종류 Types' },
      { ko: '감칠맛', en: 'umami / savory depth', tip: '맛 표현' },
      { ko: '김치 좀 더 주세요', en: 'Please give me more kimchi', tip: '식당 표현' },
      { ko: '안 맵게 해주세요', en: 'Please make it less spicy', tip: '식당 표현' }
    ],
    keyIngredientsLabel: '주요 재료 (Key Ingredients)',
    keyIngredients: [
      { ko: '배추', en: 'Napa Cabbage' },
      { ko: '무', en: 'Korean Radish' },
      { ko: '고춧가루', en: 'Chili Powder' },
      { ko: '마늘', en: 'Garlic' },
      { ko: '생강', en: 'Ginger' },
      { ko: '새우젓', en: 'Salted Shrimp' },
      { ko: '쪽파', en: 'Green Onion' },
      { ko: '천일염', en: 'Coarse Sea Salt' }
    ],
    stepsLabel: '김장 및 담그기 순서 (Step-by-Step Kimchi Method)',
    steps: [
      { stepLabel: 'Step 1 • 배추 절이기', titleKo: '1. 천일염 소금물에 절이기', descEn: 'Soak halved cabbage in salted sea water until leaves become pliable and tender.' },
      { stepLabel: 'Step 2 • 김치 소 만들기', titleKo: '2. 고춧가루와 젓갈 양념 만들기', descEn: 'Mix julienned radish, chili powder, garlic, ginger, and fermented seafood paste.' },
      { stepLabel: 'Step 3 • 양념 바르기', titleKo: '3. 배추 잎마다 골고루 속 채우기', descEn: 'Spread seasoning paste evenly between every single leaf of the salted cabbage.' },
      { stepLabel: 'Step 4 • 숙성 및 보관', titleKo: '4. 항아리 및 냉장 숙성', descEn: 'Pack tightly in a sealed earthenware jar or kimchi container for natural fermentation.' }
    ]
  },
  {
    id: 'food-tteokbokki',
    category: 'K-FOOD',
    badge: 'Street Food • Bunsik Culture',
    titleKo: 'Taste of Korean Culture: 국민 분식 떡볶이 (Tteokbokki)',
    titleEn: 'Korean Comfort Food Tteokbokki & Bunsik Culture',
    subtitleKo: '조선 왕실의 간장 떡볶이에서 오늘날 매콤달콤한 국민 미식으로 진화한 한국의 분식(Bunsik) 문화를 만납니다.',
    subtitleEn: 'From royal palace dish to spicy-sweet street food sensation: explore the culture of Korean casual snacks (Bunsik).',
    image: tteokbokkiImage,
    imageCaption: '매콤달콤 국민 떡볶이와 어묵 (Authentic Korean Tteokbokki)',
    commentaryHeader: 'Cultural Commentary • 매콤달콤한 분식의 미학',
    commentarySub: '궁중 요리에서 길거리 음식으로',
    commentaryKo: '원래 왕실에서 간장 양념으로 먹던 "궁중 떡볶이"가 1950년대 이후 고추장과 만나 누구나 즐기는 대중 소울푸드 "분식"으로 거듭났습니다.',
    commentaryEn: 'Originally a non-spicy royal palace delicacy seasoned with soy sauce, Tteokbokki evolved into red chili-glazed street food, uniting people of all generations.',
    cultureTipKo: '떡볶이 국물에 바삭한 모둠 튀김이나 김밥, 순대를 콕 찍어 먹는 "찍먹"은 한국 분식을 200% 즐기는 정석 맛팁입니다!',
    cultureTipEn: 'Tip: Dip crispy fried shrimp or vegetable tempura (Twigim) directly into the spicy-sweet Tteokbokki sauce for the ultimate Korean street food experience!',
    heritageTitleKo: '분식의 문화해설과 실전 표현 (Bunsik Heritage & Phrases)',
    heritageDescKo: '쫄깃한 쌀떡과 밀떡의 차이, 떡튀순(떡볶이·튀김·순대) 조화, 그리고 분식집에서 자주 쓰는 어휘와 표현을 배웁니다.',
    keyVocabulary: [
      { ko: '분식', en: 'Korean casual street food', tip: '문화 Culture' },
      { ko: '쫄깃하다', en: 'to be chewy / bouncy', tip: '식감 Texture' },
      { ko: '찍먹', en: 'dipping snacks into sauce', tip: '먹팁 Trend' },
      { ko: '매콤달콤하다', en: 'to be sweet and spicy', tip: '맛 표현' },
      { ko: '국물 좀 많이 주세요', en: 'Please give me extra sauce/broth', tip: '식당 표현' },
      { ko: '너무 매워요', en: 'It is too spicy', tip: '식당 표현' }
    ],
    keyIngredientsLabel: '주요 재료 (Key Ingredients)',
    keyIngredients: [
      { ko: '떡 (쌀/밀)', en: 'Rice or Wheat Cakes' },
      { ko: '어묵', en: 'Korean Fish Cake' },
      { ko: '고추장', en: 'Gochujang Paste' },
      { ko: '대파', en: 'Large Green Onion' },
      { ko: '삶은 계란', en: 'Hard-boiled Egg' },
      { ko: '어묵 국물', en: 'Kelp & Anchovy Broth' },
      { ko: '올리고당', en: 'Rice Syrup / Sugar' },
      { ko: '통깨', en: 'Sesame Seeds' }
    ],
    stepsLabel: '조리 및 식사 순서 (Step-by-Step Tteokbokki Method)',
    steps: [
      { stepLabel: 'Step 1 • 육수 끓이기', titleKo: '1. 멸치와 다시마 감칠맛 육수', descEn: 'Simmer anchovy and kelp stock to create a savory umami-rich base broth.' },
      { stepLabel: 'Step 2 • 양념장 풀기', titleKo: '2. 고추장과 간장, 설탕 배합', descEn: 'Stir Gochujang, soy sauce, and sweet syrup into the boiling broth until smooth.' },
      { stepLabel: 'Step 3 • 떡과 어묵 넣기', titleKo: '3. 떡과 어묵 한입 크기로 넣기', descEn: 'Add cylindrical rice cakes and triangular fish cake slices, stirring continuously.' },
      { stepLabel: 'Step 4 • 국물 졸이기', titleKo: '4. 대파 넣고 걸쭉하게 졸이기', descEn: 'Simmer with green onions until the sauce thickens into a rich, glossy glaze.' }
    ]
  },
  {
    id: 'food-samgyeopsal',
    category: 'K-FOOD',
    badge: 'K-BBQ • Ssam Dining',
    titleKo: 'Taste of Korean Culture: 삼겹살 구이와 쌈 문화 (Samgyeopsal & Ssam)',
    titleEn: 'Korean Pork Belly BBQ & Traditional Ssam Dining',
    subtitleKo: '지글지글 굽는 불판의 로맨스, 신선한 채소에 고기를 싸 먹는 한국 고유의 "쌈" 식문화와 식당 실전 한국어를 마스터합니다.',
    subtitleEn: 'Master the art of Korean tabletop BBQ, understanding the etiquette of "Ssam" (leaf wraps) and essential barbecue phrases.',
    image: samgyeopsalImage,
    imageCaption: '불판 위 삼겹살과 모둠 쌈 (Authentic Korean Samgyeopsal & Ssam)',
    commentaryHeader: 'Cultural Commentary • 복을 싸 먹는 쌈 문화',
    commentarySub: '한국인 최대의 소울푸드',
    commentaryKo: '채소 잎 위에 고기와 쌈장, 마늘을 올려 복(福)을 포개듯 한입에 넣어 먹는 "쌈"은 건강과 풍요를 기원하는 한국만의 독창적 미식입니다.',
    commentaryEn: '"Ssam" (wrapping food in leaves) represents folding blessings and abundance into a single delicious bite—a cherished symbol of health and communal bonding.',
    cultureTipKo: '삼겹살 기름에 신맛이 나는 묵은지 김치와 마늘을 함께 구워 먹고, 식사 마무리로 볶음밥(K-디저트)이나 냉면을 드시면 완벽합니다.',
    cultureTipEn: 'Tip: Grill aged kimchi and garlic slices in the flavorful pork oil! Finish your BBQ meal with kimchi fried rice or icy Mul-naengmyeon.',
    heritageTitleKo: 'K-BBQ 문화해설과 실전 표현 (Korean BBQ Heritage & Phrases)',
    heritageDescKo: '불판 교체 요청부터 추가 주문, 그리고 함께 잔을 부딪치며 외치는 건배 표현까지 고깃집에서 꼭 필요한 실전 한국어를 배웁니다.',
    keyVocabulary: [
      { ko: '쌈 / 쌈장', en: 'leaf wrap / seasoned soybean paste', tip: '문화 Culture' },
      { ko: '불판 갈아주세요', en: 'Please change the grill pan', tip: '식당 표현' },
      { ko: '1인분 추가해 주세요', en: 'One more serving, please', tip: '주문 표현' },
      { ko: '볶음밥 해 주세요', en: 'Please make fried rice on the grill', tip: '식사 마무리' },
      { ko: '건배 / 위하여!', en: 'Cheers / To our health!', tip: '건배사' },
      { ko: '노릇노릇하다', en: 'to be golden brown and crispy', tip: '굽기 상태' }
    ],
    keyIngredientsLabel: '주요 구성 및 소스 (Key Elements & Sauces)',
    keyIngredients: [
      { ko: '삼겹살', en: 'Pork Belly (3 layers)' },
      { ko: '상추 / 깻잎', en: 'Lettuce & Perilla Leaves' },
      { ko: '쌈장', en: 'Seasoned Soybean Paste' },
      { ko: '기름장', en: 'Sesame Oil & Salt Dip' },
      { ko: '마늘 / 고추', en: 'Garlic & Green Chili' },
      { ko: '파절이', en: 'Green Onion Salad' },
      { ko: '묵은지', en: 'Aged Fermented Kimchi' },
      { ko: '볶음밥', en: 'Grill Fried Rice' }
    ],
    stepsLabel: '구이 및 쌈 식사 순서 (Step-by-Step Ssam Dining Guide)',
    steps: [
      { stepLabel: 'Step 1 • 불판 달구기', titleKo: '1. 불판 달구고 고기 올리기', descEn: 'Preheat the grill pan and lay out the thick slices of pork belly.' },
      { stepLabel: 'Step 2 • 노릇하게 굽기', titleKo: '2. 앞뒤로 노릇하게 굽고 자르기', descEn: 'Flip once when golden brown, then use tongs and scissors to cut into bite-sized pieces.' },
      { stepLabel: 'Step 3 • 쌈 싸 먹기', titleKo: '3. 상추에 고기와 쌈장, 마늘 얹기', descEn: 'Place a piece of meat on a lettuce leaf, top with Ssamjang and garlic, and eat in one bite.' },
      { stepLabel: 'Step 4 • K-디저트 마무리', titleKo: '4. 철판 볶음밥으로 식사 마무리', descEn: 'Mix leftover meat and kimchi with rice on the grill for classic Korean fried rice.' }
    ]
  },

  // ==========================================
  // K-WEAR
  // ==========================================
  {
    id: 'wear-hanbok',
    category: 'K-WEAR',
    badge: 'Heritage & Fashion • Palace Free Entry',
    titleKo: 'Hanbok & Fashion: 조선 궁중 한복과 개량 한복 (Traditional & Modern Hanbok)',
    titleEn: 'Aesthetic Curves of Hanbok & Modern K-Fashion Styling',
    subtitleKo: '조선 왕실의 품격 있는 궁중 한복(당의·홍룡포)부터 현대적 감각으로 재해석되어 세계 무대를 사로잡은 개량 한복까지, 한복의 고유한 곡선미와 색채 철학을 함께 탐구합니다.',
    subtitleEn: 'Explore the majestic elegance of Joseon royal court Hanbok (Dangui, Hongryongpo) and the chic evolution of modern daily Hanbok (Gaeryang Hanbok) celebrated on global stages.',
    image: hanbokFashionImage,
    imageCaption: '조선 궁중 한복과 현대 개량 한복 (Royal Court & Modern Hanbok)',
    commentaryHeader: 'Cultural Commentary • 곡선과 바람의 의복',
    commentarySub: '궁중 예복에서 글로벌 K-패션으로',
    commentaryKo: '조선 왕실의 정갈한 금박 당의와 곤룡포에서부터 오늘날 가볍고 실용적인 원단으로 재해석된 현대 개량 한복(Modern Hanbok)까지, 한복은 몸을 억죄지 않고 넉넉한 품과 유려한 곡선으로 착용자에게 고아한 여백의 미를 선사합니다.',
    commentaryEn: 'From gilded Joseon royal court garments (Dangui & Gonryongpo) to trendy modernized daily Hanbok, this iconic Korean attire features flowing silhouettes that breathe with movement, embodying harmony between heritage and contemporary style.',
    cultureTipKo: '경복궁·창덕궁 등 서울 4대 고궁 방문 시 한복을 착용하면 무료로 입장할 수 있으며, 고궁 야간 개장이나 현대식 개량 한복 데일리룩으로도 큰 인기를 끌고 있습니다.',
    cultureTipEn: 'Tip: Wearing either traditional or modernized Hanbok grants complimentary admission to Seoul’s royal palaces! Rental shops near Gyeongbokgung offer both authentic royal robes and trendy modern styles.',
    heritageTitleKo: '조선 궁중 한복·개량 한복 문화해설과 실전 어휘 (Hanbok Heritage & Vocabulary)',
    heritageDescKo: '당의, 곤룡포, 저고리, 옷고름 등 전통 명칭과 한복 대여점 및 매장에서 바로 쓸 수 있는 실용 회화 표현을 학습합니다.',
    keyVocabulary: [
      { ko: '궁중 한복 / 당의', en: 'royal court Hanbok / ceremonial jacket', tip: '전통 Royal' },
      { ko: '개량 한복 / 생활 한복', en: 'modernized / daily casual Hanbok', tip: '트렌드 Modern' },
      { ko: '저고리 / 치마', en: 'upper jacket / traditional wrap skirt', tip: '기본 구성' },
      { ko: '옷고름', en: 'traditional chest ribbon knot', tip: '명칭 Noun' },
      { ko: '한복 대여점 어디예요?', en: 'Where is the Hanbok rental shop?', tip: '관광 표현' },
      { ko: '선이 참 우아해요', en: 'The silhouette is so graceful and elegant', tip: '칭찬 표현' }
    ],
    keyIngredientsLabel: '한복의 핵심 구성 및 장신구 (Key Elements of Hanbok)',
    keyIngredients: [
      { ko: '당의 (궁중 예복)', en: 'Royal Court Dangui' },
      { ko: '개량 저고리', en: 'Modernized Cropped Jeogori' },
      { ko: '치마 (풀스커트)', en: 'High-waist Wrap Chima' },
      { ko: '바지 (남성/공용)', en: 'Spacious Trousers' },
      { ko: '옷고름', en: 'Chest Ribbon Knot' },
      { ko: '노리개 (전통 장신구)', en: 'Ornamental Silk Pendant' },
      { ko: '갓 / 족두리', en: 'Traditional Hat / Headpiece' },
      { ko: '꽃신 / 버선', en: 'Embroidered Shoes & Socks' }
    ],
    stepsLabel: '한복 체험 및 착용 순서 (Step-by-Step Hanbok Guide)',
    steps: [
      { stepLabel: 'Step 1 • 스타일 선택', titleKo: '1. 궁중 전통 vs 현대 개량 한복 고르기', descEn: 'Choose between regal Joseon royal court garments with gold embroidery or lightweight modern casual Hanbok.' },
      { stepLabel: 'Step 2 • 저고리 및 치마 매칭', titleKo: '2. 체형과 색감에 맞는 저고리 매칭', descEn: 'Match an upper jacket (Jeogori/Dangui) that harmonizes with your skirt or trouser palette.' },
      { stepLabel: 'Step 3 • 옷고름과 노리개', titleKo: '3. 옷고름 매기 및 노리개 달기', descEn: 'Fasten the signature asymmetric chest ribbon knot and accentuate with an ornamental silk pendant.' },
      { stepLabel: 'Step 4 • 고궁 산책 및 사진 촬영', titleKo: '4. 고궁 무료 입장 및 인생샷 촬영', descEn: 'Enjoy free admission to Gyeongbokgung Palace and capture unforgettable photos in authentic attire.' }
    ]
  },

  // ==========================================
  // K-HOUSE & PALACE
  // ==========================================
  {
    id: 'house-palace-1',
    category: 'K-HOUSE & PALACE',
    badge: 'Royal Heritage • Ondol Science',
    titleKo: 'Hanok & Palaces: 경복궁과 한옥의 온돌 과학 (Gyeongbokgung & Ondol)',
    titleEn: 'Royal Palace Architecture & Hanok Ondol Floor Heating',
    subtitleKo: '조선 왕조 500년 역사가 깃든 경복궁 궁궐 건축미와 아궁이-구들장-굴뚝으로 이어지는 한옥의 독창적 온돌 난방 열역학 과학을 탐구합니다.',
    subtitleEn: 'Discover the architectural magnificence of Seoul’s royal palaces and the ingenious thermodynamic science of traditional Hanok Ondol underfloor heating.',
    image: ondolPalaceImage,
    imageCaption: '경복궁 궁궐 건축과 한옥의 온돌 난방 과학 (Gyeongbokgung & Ondol Science)',
    commentaryHeader: 'Cultural Commentary • 자연과 과학을 품은 건축',
    commentarySub: '아궁이와 구들장의 열역학',
    commentaryKo: '한옥과 조선 궁궐의 온돌(Ondol)은 아궁이(Agungi)에서 지핀 불의 열기와 연기가 바닥 밑 구들장(Gudeul)을 통과하며 방바닥 전체를 은은하고 오래 덥히는 세계 최초의 전도·복사 바닥 복합 난방 시스템입니다.',
    commentaryEn: 'Ondol operates through a sophisticated thermal storage system where heat from the Agungi furnace flows beneath flat stone slabs (Gudeul), warming the living space through conductive and radiant heat while venting smoke through decorative chimneys like Gyeongbokgung’s Jagyeongjeon.',
    cultureTipKo: '경복궁 자경전 뒤뜰에는 보물로 지정된 "십장생 굴뚝"이 있어 온돌 연기를 배출하는 기능성과 궁궐 미술의 극치를 동시에 보여줍니다.',
    cultureTipEn: 'Tip: Behind Jagyeongjeon in Gyeongbokgung Palace stands the famous Chimney of the Ten Longevity Symbols—a masterpiece blending Ondol smoke ventilation with royal artistic relief.',
    heritageTitleKo: '경복궁·온돌 과학 해설과 건축 어휘 (Palace & Ondol Heritage)',
    heritageDescKo: '경복궁 근정전·자경전과 한옥마을 방문 시 필수적인 아궁이, 구들장, 대청마루 등 전통 건축 과학 어휘와 실용 회화 표현을 학습합니다.',
    keyVocabulary: [
      { ko: '온돌 / 구들장', en: 'underfloor radiant heating / stone heat slabs', tip: '과학 Science' },
      { ko: '아궁이 / 굴뚝', en: 'firebox furnace / smoke chimney', tip: '구조 Element' },
      { ko: '대청마루', en: 'open summer wooden hall (cooling)', tip: '구조 Element' },
      { ko: '처마 / 단청', en: 'curved roof eaves / multicolored paint', tip: '건축 Architecture' },
      { ko: '방바닥이 따뜻해요', en: 'The floor is warmly heated (Ondol)', tip: '체험 표현' },
      { ko: '사진 찍기 좋은 곳이 어디예요?', en: 'Where is the best photo spot?', tip: '관광 표현' }
    ],
    keyIngredientsLabel: '온돌 및 궁궐 건축 핵심 구조 (Key Elements & Structures)',
    keyIngredients: [
      { ko: '아궁이 (열원)', en: 'Agungi (Fire Furnace)' },
      { ko: '구들장 (열 저장석)', en: 'Gudeul (Flat Thermal Stones)' },
      { ko: '고래 (연기 통로)', en: 'Gorae (Underfloor Smoke Flues)' },
      { ko: '굴뚝 (자경전 굴뚝)', en: 'Chimney (Ventilation)' },
      { ko: '대청마루 (여름 공간)', en: 'Daecheongmaru (Cooling Deck)' },
      { ko: '창호지 (채광·습도 조절)', en: 'Changhoji (Mulberry Paper)' },
      { ko: '기와 처마 (태양각도 조절)', en: 'Giwa Eaves (Solar Angle Control)' },
      { ko: '근정전 / 경회루', en: 'Geunjeongjeon & Gyeonghoeru' }
    ],
    stepsLabel: '고궁 및 온돌 한옥 투어 추천 코스 (Step-by-Step Palace Tour)',
    steps: [
      { stepLabel: 'Step 1 • 광화문 & 근정전', titleKo: '1. 광화문 입장 및 웅장한 근정전 감상', descEn: 'Enter through Gwanghwamun Gate and marvel at Geunjeongjeon Throne Hall, the royal center of Joseon state affairs.' },
      { stepLabel: 'Step 2 • 자경전 십장생 굴뚝', titleKo: '2. 자경전 온돌과 십장생 굴뚝 관람', descEn: 'Inspect the historic underfloor Ondol system and the treasure-designated Ten Longevity Symbols chimney at Jagyeongjeon.' },
      { stepLabel: 'Step 3 • 경회루 연못 산책', titleKo: '3. 호수 위 연회장 경회루 감상', descEn: 'Stroll around Gyeonghoeru Pavilion floating serenely over the lotus pond.' },
      { stepLabel: 'Step 4 • 한옥 온돌 체험', titleKo: '4. 북촌 한옥마을 온돌방 힐링 체험', descEn: 'Experience the cozy radiant warmth of a traditional Ondol heated room in historic Bukchon.' }
    ]
  },

  // ==========================================
  // K-Literature (신화, 전설, 민담/야담, 속담, 수수께끼, 고전소설[영웅·애정·세태·우화], 현대소설, 현대희곡, 현대수필)
  // ==========================================
  {
    id: 'lit-myth-dangun',
    category: 'K-Literature',
    literatureGenre: '신화',
    badge: '신화 • 건국신화 (Mythology • Founding Myth)',
    titleKo: '신화: 단군신화 (Dangun Myth) - 고조선 건국과 홍익인간(弘益人間)의 이념',
    titleEn: 'Mythology: The Dangun Myth & The Ethos of Hongik Ingan',
    subtitleKo: '하늘의 아들 환웅과 인간이 된 곰(웅녀)의 결합으로 태어난 단군왕검이 세운 고조선과 "널리 인간을 이롭게 한다"는 홍익인간 정신을 배웁니다.',
    subtitleEn: 'The sacred founding myth of Gojoseon: Prince Hwanung, Ungnyeo the bear-woman, and the noble ethos of broadly benefiting all mankind.',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    imageCaption: '태백산 신단수와 신령스러운 아침 햇살 (Sacred Birch Tree & Mountain Mist)',
    commentaryHeader: 'Cultural Commentary • 인본주의와 조화의 건국 철학',
    commentarySub: '홍익인간(弘益人間)의 뿌리',
    commentaryKo: '단군신화는 무력 정복이 아닌 하늘과 땅, 인간과 자연의 평화로운 조화 속에서 나라가 세워졌음을 보여줍니다. 특히 인간 세계를 널리 이롭게 하겠다는 "홍익인간" 정신은 오늘날 대한민국의 교육과 건국 이념으로 면면히 이어지고 있습니다.',
    commentaryEn: 'The Dangun Myth reflects cosmic harmony, peaceful communion, and human devotion rather than military domination. The motto "Hongik Ingan" (to benefit all humanity) remains the foundational constitutional ethos of Korea.',
    cultureTipKo: '삼칠일(21일) 동안 동굴에서 쑥과 마늘을 먹으며 인내한 웅녀의 설화는 한국인의 강인한 끈기와 인내심(은근과 끈기)을 상징합니다.',
    cultureTipEn: 'Tip: The tale of the bear enduring 21 days on mugwort and garlic in a cave symbolizes the celebrated Korean cultural virtues of patience and resilience (Eungeun & Kkeun-gi).',
    heritageTitleKo: '신화 문학 해설과 핵심 어휘 (Mythological Heritage & Vocabulary)',
    heritageDescKo: '건국신화의 신성성과 고조선의 역사적 기원, 그리고 현대 한국인들의 자긍심을 표현하는 필수 문학 어휘입니다.',
    keyVocabulary: [
      { ko: '건국신화 (建國神話)', en: 'founding myth of a nation', tip: '문학 장르' },
      { ko: '홍익인간 (弘益人間)', en: 'to broadly benefit humanity', tip: '건국 이념' },
      { ko: '신단수 (神壇樹)', en: 'sacred divine tree atop Mt. Taebaek', tip: '신화 상징' },
      { ko: '웅녀 (熊女)', en: 'bear-woman who became human', tip: '등장인물' },
      { ko: '환웅 (桓雄)', en: 'heavenly prince Hwanung', tip: '천손 사상' },
      { ko: '삼칠일 (三七日)', en: 'three weeks (21 days of ascetic patience)', tip: '전통 숫자' }
    ],
    keyIngredientsLabel: '신화의 핵심 모티프 (Key Motifs & Characters)',
    keyIngredients: [
      { ko: '단군왕검', en: 'Dangun Wanggeom (King & High Priest)' },
      { ko: '천손 하강 모티프', en: 'Descent from Heaven Motif' },
      { ko: '쑥과 마늘', en: 'Sacred Mugwort & Garlic' },
      { ko: '태백산 신시(神市)', en: 'Sacred City on Mt. Taebaek' },
      { ko: '풍백·우사·운사', en: 'Deities of Wind, Rain & Cloud' },
      { ko: '백일기도와 인내', en: 'Prayer of Endurance' }
    ],
    stepsLabel: '신화 감상 및 독해 길잡이 (Literary Appreciation Guide)',
    steps: [
      { stepLabel: 'Step 1 • 신화적 배경', titleKo: '1. 하늘과 인간 세계의 연결 이해하기', descEn: 'Understand how heavenly deities descended to care for human agriculture, ethics, and community life.' },
      { stepLabel: 'Step 2 • 상징 동물 탐구', titleKo: '2. 곰과 호랑이 토템 부족의 역사성 파악', descEn: 'Analyze the bear and tiger as historical totemic clans seeking cultural integration.' },
      { stepLabel: 'Step 3 • 인본주의 고찰', titleKo: '3. 홍익인간 정신의 현대적 의미 되새기기', descEn: 'Reflect on how the commitment to benefit all people resonates across Korean history.' },
      { stepLabel: 'Step 4 • 원문 낭독', titleKo: '4. 삼국유사 고조선조 기록 낭독해보기', descEn: 'Read aloud the classical excerpts from Samguk Yusa to feel the solemn cadence of Korean origins.' }
    ],
    literatureExcerpt: {
      quoteKo: '환웅이 무리 삼천을 거느리고 태백산 꼭대기 신단수 아래로 내려와 이곳을 신시(神市)라 불렀다. 곰과 호랑이가 사람이 되기를 원하자 쑥 한 심지와 마늘 스무 개를 주며 "이것을 먹고 백일 동안 햇빛을 보지 말라" 하니, 곰은 삼칠일을 참아 여인의 몸을 얻었도다.',
      quoteEn: 'Hwanung descended with three thousand followers beneath the sacred divine tree atop Mount Taebaek, establishing the Sacred City. When a bear and a tiger yearned to become human, he granted them sacred mugwort and twenty cloves of garlic, bidding them stay out of sunlight. The bear endured twenty-one days and became a woman...',
      authorOrSource: '일연 <삼국유사(三國遺事)> 기이편 고조선조',
      contextNoteKo: '단군신화는 한국 최초의 국가 고조선의 건국을 기록한 한국 신화의 모태로, 천손의 신성성과 인간 존중의 가치를 담고 있습니다.',
      contextNoteEn: 'The quintessential Korean founding myth highlighting peaceful coexistence, human devotion, and the emergence of Gojoseon.',
      literaryDevice: '건국신화와 천손강림(天孫降臨)의 원형 상징'
    }
  },
  {
    id: 'lit-legend-uturi',
    category: 'K-Literature',
    literatureGenre: '전설',
    badge: '전설 • 비극적 민중영웅 (Legend • The Winged Hero)',
    titleKo: '전설: 아기장수 우투리 전설 (Baby General Uturi) - 날개 달린 비운의 영웅',
    titleEn: 'Legend: The Legend of Baby General Uturi & Folk Aspirations',
    subtitleKo: '억압받던 백성들을 구원하고자 겨드랑이에 날개를 달고 태어났으나, 지배층의 탄압으로 비극적 최후를 맞이한 한국 대표 민중 전설을 살펴봅니다.',
    subtitleEn: 'The tragic legend of the child hero born with wings under his arms to liberate the oppressed commoners, embodying grassroots hopes and deep sorrow.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    imageCaption: '우투리가 숨었던 지리산 험준한 바위봉우리 (Jirisan Crags & Mist)',
    commentaryHeader: 'Cultural Commentary • 한(恨)과 민중의 개혁 열망',
    commentarySub: '한국 전설 특유의 비장미(悲壯美)',
    commentaryKo: '신화가 승리와 영광을 노래한다면, 전설은 증거물(바위, 무덤 등)과 함께 비극적 결말을 담는 경우가 많습니다. 아기장수 우투리는 낡은 신분제를 무너뜨릴 새로운 영웅을 간절히 바랐던 민중의 염원과 그것이 좌절되었을 때의 깊은 한(恨)을 가슴 뭉클하게 전합니다.',
    commentaryEn: 'While myths celebrate royal triumphs, Korean legends often embrace sublime tragedy anchored to specific geological landmarks. Uturi embodies the common folk’s longing for justice and social transformation.',
    cultureTipKo: '우투리 전설에서 콩과 팥을 볶아 병사로 기르는 모티프는 흙과 곡식을 생명의 근원으로 여겼던 농경 민족의 상상력을 보여줍니다.',
    cultureTipEn: 'Tip: Uturi training bean soldiers in the cave reflects the agrarian worldview where grain symbolizes life, resilience, and latent power.',
    heritageTitleKo: '전설 문학 해설과 핵심 어휘 (Legend Heritage & Literary Terms)',
    heritageDescKo: '영웅의 좌절과 한(恨), 그리고 증거물을 바탕으로 전승되는 한국 설화의 특징적 어휘를 학습합니다.',
    keyVocabulary: [
      { ko: '전설 (傳說)', en: 'legend (rooted in historical setting & relics)', tip: '문학 갈래' },
      { ko: '아기장수', en: 'baby hero / child prodigy general', tip: '인물 유형' },
      { ko: '겨드랑이 날개', en: 'wings under the armpits (flight & transcendence)', tip: '상징 모티프' },
      { ko: '비장미 (悲壯美)', en: 'sublime tragedy / poignant heroism', tip: '문학 미학' },
      { ko: '민중의 염원', en: 'ardent aspirations of common folk', tip: '주제 의식' },
      { ko: '증거물 (전설의 표식)', en: 'relic/geological evidence (caves, rocks)', tip: '전설 특성' }
    ],
    keyIngredientsLabel: '전설의 핵심 구성 (Legend Characters & Symbols)',
    keyIngredients: [
      { ko: '아기장수 우투리', en: 'Uturi, the Winged Child Hero' },
      { ko: '날개와 서까래', en: 'Sprouting Wings & Flying Rafters' },
      { ko: '콩과 팥 군사', en: 'Mystic Bean Soldiers in the Cave' },
      { ko: '지리산 바위동굴', en: 'Hidden Caverns of Mount Jiri' },
      { ko: '관군의 습격', en: 'Royal Army’s Persecution' },
      { ko: '억압과 해방의 꿈', en: 'Dream of Popular Liberation' }
    ],
    stepsLabel: '전설 감상 및 독해 길잡이 (Literary Appreciation Guide)',
    steps: [
      { stepLabel: 'Step 1 • 신화와 전설 구별', titleKo: '1. 신화의 성공과 전설의 비극성 대비', descEn: 'Contrast the celebratory tone of myths with the poignant realism and tragic undertones of folk legends.' },
      { stepLabel: 'Step 2 • 상징적 모티프 파악', titleKo: '2. 날개와 곡식 군사의 상징적 의미 분석', descEn: 'Interpret the wings as aspirations for freedom and the bean soldiers as rural grassroots strength.' },
      { stepLabel: 'Step 3 • 비장미 공감', titleKo: '3. 민중의 한(恨)과 역사적 아픔 느끼기', descEn: 'Reflect on how historical oppression was transformed into poetic storytelling by the common folk.' },
      { stepLabel: 'Step 4 • 증거물 탐방', titleKo: '4. 각 지역의 아기장수 바위 전설 비교하기', descEn: 'Explore how variant versions exist across Korean provinces with local "General Rocks".' }
    ],
    literatureExcerpt: {
      quoteKo: '아이가 태어난 지 사흘 만에 선반 위로 훌쩍 날아오르고 서까래에 거꾸로 매달려 웃고 있었다. 어머니가 놀라 들여다보니 아이의 양쪽 겨드랑이에 깃털 돋은 날개가 돋아 있더라. 우투리는 지리산 바위굴 속에 숨어 볶은 콩과 팥으로 수만 군사를 기르며 새 세상을 꿈꾸었으나...',
      quoteEn: 'Only three days after birth, the baby fluttered onto the high shelf and laughed, suspended from the ceiling rafters. When his mother peeked in awe, pristine feathered wings were sprouting beneath his arms. Uturi hid in a rocky cave on Mount Jiri, raising tens of thousands of soldiers from roasted beans and red beans, dreaming of a new egalitarian world...',
      authorOrSource: '한국 구비문학대계 (Oral Literature of Korea)',
      contextNoteKo: '한국 전역에 전승되는 대표적 영웅 전설로, 신분제의 억압에 맞서 새 세상을 열고자 했던 민중의 간절한 소망을 담고 있습니다.',
      contextNoteEn: 'A poignant folk legend highlighting grassroots aspirations for social justice and the tragic sacrifice of a winged infant savior.',
      literaryDevice: '비극적 결말을 통한 현실 비판과 비장미(悲壯美)'
    }
  },
  {
    id: 'lit-folktale-sun-moon',
    category: 'K-Literature',
    literatureGenre: '민담(야담)',
    badge: '민담(야담) • 전래동화 (Folktale & Yadam • Oral Lore)',
    titleKo: '민담(야담): 해와 달이 된 오누이 (The Sun and the Moon) & 조선 야담',
    titleEn: 'Folktale & Yadam: The Sun and the Moon & Historical Folk Anecdotes',
    subtitleKo: '"떡 하나 주면 안 잡아먹지!"로 시작되는 호랑이의 위협을 슬기와 기도로 극복한 오누이의 모험과 조선 시대 흥미진진한 야담(野談)의 세계를 만납니다.',
    subtitleEn: 'The beloved oral folktale of clever siblings outwitting an insatiable tiger through quick wit and heavenly ropes, alongside fascinating Joseon folk anecdotes (Yadam).',
    image: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=800&q=80',
    imageCaption: '달빛이 은은하게 비추는 한국의 밤하늘 (Moonlit Sky of Folk Wonder)',
    commentaryHeader: 'Cultural Commentary • 권선징악과 민중의 해학',
    commentarySub: '민담과 야담의 매력',
    commentaryKo: '민담은 평범한 민중들의 일상 속 흥미와 교훈을 담은 구전 설화이며, 야담은 조선 후기 민간에서 회자되던 생생한 인물 일화와 풍자입니다. 호랑이라는 두려운 자연의 맹수를 어리석고 우스꽝스러운 존재로 묘사함으로써 민중들은 삶의 고난을 웃음으로 이겨냈습니다.',
    commentaryEn: 'Folktales (Mindam) entertained village gatherings with moral justice, while historical anecdotes (Yadam) captured witty street tales. Depicting fearsome tigers as gullible villains provided comic relief against life’s hardships.',
    cultureTipKo: '"동아줄을 잡다"라는 현대 한국어 관용구는 이 민담에서 유래한 것으로, 절체절명의 위기에서 구원의 기회를 얻음을 뜻합니다.',
    cultureTipEn: 'Tip: The modern idiom "동아줄을 잡다 (to grasp a sturdy rope)" originates from this tale, meaning seizing a lifeline in dire crisis.',
    heritageTitleKo: '민담·야담 문학 해설과 핵심 어휘 (Folktale Heritage & Idioms)',
    heritageDescKo: '권선징악, 구전 서사, 해학적 반전 등 한국 옛이야기의 매력을 깊이 이해하는 핵심 어휘입니다.',
    keyVocabulary: [
      { ko: '민담 / 야담 (民譚/野談)', en: 'folktale / informal historical anecdote', tip: '문학 장르' },
      { ko: '권선징악 (勸善懲惡)', en: 'rewarding virtue and punishing evil', tip: '전통 교훈' },
      { ko: '동아줄 (튼튼한 밧줄)', en: 'sturdy hemp rope from heaven', tip: '구원의 상징' },
      { ko: '떡 하나 주면 안 잡아먹지', en: 'Give me a rice cake and I won’t eat you', tip: '유명 관용 대사' },
      { ko: '해학과 골계미', en: 'humor and comic burlesque', tip: '미학 개념' },
      { ko: '수수밭의 붉은빛', en: 'red color of sorghum field (folklore origin)', tip: '설화 유래' }
    ],
    keyIngredientsLabel: '민담의 핵심 요소 (Core Tale Elements)',
    keyIngredients: [
      { ko: '영리한 오누이', en: 'Clever Brother & Sister' },
      { ko: '욕심쟁이 호랑이', en: 'Greedy, Duplicitous Tiger' },
      { ko: '고갯길 떡 바구니', en: 'Basket of Rice Cakes on the Pass' },
      { ko: '참기름 바른 미끄러운 나무', en: 'Tree Coated with Sesame Oil' },
      { ko: '하늘의 튼튼한 동아줄', en: 'Heavenly Golden Rope' },
      { ko: '썩은 새끼줄과 수수밭', en: 'Rotten Rope & Sorghum Stalks' }
    ],
    stepsLabel: '민담 감상 및 독해 길잡이 (Literary Appreciation Guide)',
    steps: [
      { stepLabel: 'Step 1 • 구비문학 리듬 체득', titleKo: '1. "옛날 옛적 어느 마을에" 구비 설화 운율 느끼기', descEn: 'Immerse in the rhythmic opening cadence common to traditional Korean oral storytelling.' },
      { stepLabel: 'Step 2 • 지혜와 기지 분석', titleKo: '2. 참기름 꾀와 도끼 힌트 속 유머 포착하기', descEn: 'Appreciate the witty dialogue between the hiding children and the bumbling tiger below.' },
      { stepLabel: 'Step 3 • 상벌의 상징성 고찰', titleKo: '3. 새 동아줄과 썩은 줄의 권선징악 상징 이해', descEn: 'Analyze how cosmic justice rewards pure hearts while punishing deception.' },
      { stepLabel: 'Step 4 • 야담 확장 감상', titleKo: '4. 조선 후기 청구야담 속 인물 기담 살펴보기', descEn: 'Read short anecdotes from Cheonggu Yadam to see how folktales influenced late Joseon town culture.' }
    ],
    literatureExcerpt: {
      quoteKo: '"떡 하나 주면 안 잡아먹지!" 산고개마다 어머니의 떡을 빼앗아 먹은 호랑이가 마침내 오누이의 집 앞까지 이르렀다. 오누이는 나무 꼭대기로 도망쳐 두 손을 모아 빌었다. "하늘님, 저희를 살리시려거든 튼튼한 동아줄을 내려주시고, 호랑이를 벌하시려거든 썩은 새끼줄을 내려주소서!"',
      quoteEn: '"Give me a rice cake and I won’t eat you!" The tiger, having devoured all the rice cakes on each mountain pass, reached the children’s home. Perched atop a tall tree, the siblings prayed to heaven with clasped hands: "O Heaven, if you wish to save us, send down a sturdy rope; if you wish to punish the tiger, send down a rotten rope!"',
      authorOrSource: '한국 구비전승 민담 <해와 달이 된 오누이>',
      contextNoteKo: '한국인이라면 누구나 어린 시절 어머니의 무릎을 베고 들었던 대표 민담으로, 위기 속 지혜와 천도(天道)의 섭리를 상징합니다.',
      contextNoteEn: 'Korea’s most universally treasured bedtime folktale, illustrating courage against adversity, clever wit, and poetic cosmic retribution.',
      literaryDevice: '권선징악(勸善懲惡)과 자연 현상의 설화적 기원 설명'
    }
  },
  {
    id: 'lit-fairytale-heungbu',
    category: 'K-Literature',
    literatureGenre: '전래동화',
    badge: '전래동화 • 보은과 권선징악 (Fairy Tale • Gratitude & Virtue)',
    titleKo: '전래동화: <흥부와 놀부> (Heungbu and Nolbu) - 제비의 보은과 슬근슬근 박 타기',
    titleEn: 'Traditional Fairy Tale: Heungbu & Nolbu, The Swallows’ Gift and Brotherhood',
    subtitleKo: '부러진 제비 다리를 정성껏 치료해 준 착한 흥부의 박에서는 금은보화가 쏟아져 나오고, 욕심을 부려 제비 다리를 일부러 부러뜨린 놀부의 박에서는 도깨비가 나오는 한국 대표 전래동화입니다.',
    subtitleEn: 'Korea’s most beloved traditional fairy tale: Kindhearted Heungbu nurses an injured swallow and is rewarded with miraculous treasure gourds, while greedy Nolbu learns a lifelong lesson in fraternal virtue.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    imageCaption: '초가지붕 위에 탐스럽게 열린 둥근 박과 제비 (Traditional Thatch Roof & Gourd)',
    commentaryHeader: 'Cultural Commentary • 권선징악(勸善懲惡)과 형제 우애의 가치',
    commentarySub: '한국 전래동화의 핵심 윤리관',
    commentaryKo: '전래동화 《흥부와 놀부》는 선한 행동에 대한 복(보은)과 탐욕에 대한 징벌이라는 권선징악의 법칙을 가장 유쾌하고 해학적인 박 타기 장면으로 형상화했습니다. 특히 물질적 욕심보다 가족 간의 화목과 형제 우애를 가장 소중한 가치로 여기는 한국인의 전통적 공동체 미덕을 생생히 보여줍니다.',
    commentaryEn: 'Heungbu and Nolbu portrays karmic justice (Gwon-seon-jing-ak): virtue rewarded through miraculous gourds and greed punished by mischievous goblins. Above all, it celebrates familial reconciliation and fraternal love over boundless material wealth.',
    cultureTipKo: '"슬근슬근 톱질하세!(Sawing, sawing back and forth!)"라는 흥겨운 후렴구는 판소리 흥보가의 <박타령>에서 유래한 것으로, 한국인 누구나 아는 국민 유행어입니다.',
    cultureTipEn: 'Tip: "Seulgeun-seulgeun topjilhase! (Sawing, sawing back and forth!)" is the iconic rhythmic work chant chanted when sawing open the giant autumn gourds.',
    heritageTitleKo: '전래동화 문학 해설과 핵심 어휘 (Traditional Fairy Tale Heritage & Terms)',
    heritageDescKo: '제비의 보은, 박 타기, 도깨비와 권선징악 등 한국 전통 동화 속 핵심 어휘와 관용적 표현을 익힙니다.',
    keyVocabulary: [
      { ko: '전래동화 (傳來童話)', en: 'traditional fairy tale passed down through generations', tip: '문학 갈래' },
      { ko: '보은 (報恩)', en: 'repaying a debt of gratitude / returning kindness', tip: '전통 미덕' },
      { ko: '박 타기 (톱질)', en: 'sawing open giant ripe autumn gourds', tip: '핵심 모티프' },
      { ko: '권선징악 (勸善懲惡)', en: 'encouraging good and reproving evil', tip: '교훈 주제' },
      { ko: '형제 우애 (友愛)', en: 'brotherly affection and harmony', tip: '가족 가치' },
      { ko: '도깨비의 방망이', en: 'goblin’s magic club punishing greed', tip: '전래 상징' }
    ],
    keyIngredientsLabel: '흥부와 놀부의 핵심 구성 (Core Motifs & Symbols)',
    keyIngredients: [
      { ko: '마음씨 착한 흥부', en: 'Kindhearted Younger Brother Heungbu' },
      { ko: '심술궂은 형 놀부', en: 'Greedy Elder Brother Nolbu' },
      { ko: '다리 다친 제비와 박씨', en: 'Injured Swallow & Magic Gourd Seed' },
      { ko: '초가지붕 위 탐스런 박', en: 'Plump Gourds on the Thatched Roof' },
      { ko: '금은보화와 쌀궤', en: 'Gold, Jewels & Endless Rice Chests' },
      { ko: '형제의 눈물겨운 화해', en: 'Tearful Fraternal Reconciliation' }
    ],
    stepsLabel: '전래동화 감상 및 독해 길잡이 (Fairy Tale Appreciation Guide)',
    steps: [
      { stepLabel: 'Step 1 • 대비되는 형제 관찰', titleKo: '1. 가난하지만 선한 흥부와 부유하지만 인색한 놀부 대비', descEn: 'Contrast the virtuous, generous younger brother with the miserly, envious elder brother.' },
      { stepLabel: 'Step 2 • 제비와 은혜 갚기', titleKo: '2. 생명을 아끼는 흥부의 자비심과 제비의 보은 이해', descEn: 'Appreciate the tenderness shown to a wounded creature and the swallow’s karmic gratitude.' },
      { stepLabel: 'Step 3 • 슬근슬근 박 타기', titleKo: '3. 톱질 소리와 함께 터져 나오는 금은보화의 희열 체감', descEn: 'Immerse in the rhythmic folk joy of opening the mystic gourds filled with treasures.' },
      { stepLabel: 'Step 4 • 진정한 우애 성찰', titleKo: '4. 몰락한 형을 용서하고 함께 나누는 형제애의 가치', descEn: 'Reflect on the heart-touching climax where Heungbu embraces and shares his wealth with redeemed Nolbu.' }
    ],
    literatureExcerpt: {
      quoteKo: '"슬근슬근 톱질하세! 톱질하세 슬근슬근! 박 한 통을 타니 금은보화가 와르르 쏟아져 나오고, 또 한 통을 타니 비단과 쌀가마가 끝없이 솟아나더라. 가난에 울던 흥부네 집안에 온갖 복이 깃들었으니, 착한 마음씨로 미물인 제비의 다리를 보살펴 준 은혜의 열매였도다."',
      quoteEn: '"Sawing, sawing back and forth! Sawing, sawing with steady rhythm! As the first gourd cracked open, gold, silver, and sparkling jewels cascaded out in abundance, and from the next, endless bolts of fine silk and heaps of pure white rice emerged! Such was the fruit of gratitude for kindly nursing the swallow..."',
      authorOrSource: '한국 전통 판소리계 전래동화 <흥부전(興夫傳)>',
      contextNoteKo: '한국인이 가장 먼저 접하고 평생 기억하는 대표 전래동화로, 약자에 대한 자비와 권선징악, 진정한 가족 우애를 감동적으로 가르쳐 줍니다.',
      contextNoteEn: 'Korea’s most universally celebrated fairy tale, teaching deep compassion for living creatures, poetic justice, and unconditional brotherly love.',
      literaryDevice: '선악의 극적 대비(Contrast of Virtue and Vice)와 판소리 율문적 리듬'
    }
  },
  {
    id: 'lit-proverb-wisdom',
    category: 'K-Literature',
    literatureGenre: '속담',
    badge: '속담 • 생활 지혜 (Proverbs • Living Heritage)',
    titleKo: '속담: 한국인의 삶과 지혜가 담긴 대표 속담 (Korean Proverbs & Folk Wisdom)',
    titleEn: 'Proverbs: Timeless Korean Proverbs & The Art of Warm Speech',
    subtitleKo: '"가는 말이 고와야 오는 말이 곱다", "백지장도 맞들면 낫다" 등 한국인의 오랜 공동체 철학과 배려, 언어 예절이 응축된 명언들을 익힙니다.',
    subtitleEn: 'Explore the profound collective wisdom, human empathy, and everyday philosophy embedded in quintessential Korean proverbs.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    imageCaption: '지혜의 글귀가 새겨진 옛 서책과 붓 (Ancient Books & Ink Wisdom)',
    commentaryHeader: 'Cultural Commentary • 말 한마디로 천 냥 빚을 갚는다',
    commentarySub: '한국인의 언어 철학과 공동체 연대',
    commentaryKo: '한국 속담에는 오랜 농경 공동체에서 다져진 상부상조(품앗이)와 타인을 향한 존중의 미덕이 가득합니다. 직설적인 훈계 대신 사물과 일상 비유를 활용하여 듣는 이의 마음을 다치지 않게 하면서도 깊은 깨달음을 줍니다.',
    commentaryEn: 'Korean proverbs emphasize mutual cooperation, linguistic empathy, and social harmony. Rather than blunt lecturing, they employ vivid natural metaphors to impart gentle yet unforgettable ethical insights.',
    cultureTipKo: '"발 없는 말이 천 리 간다"와 "낮말은 새가 듣고 밤말은 쥐가 듣는다"는 말을 조심해야 한다는 경계 속담으로 현대 SNS 소통에서도 가장 자주 인용됩니다.',
    cultureTipEn: 'Tip: "Words without feet travel a thousand li" and "Birds hear words spoken by day, mice hear words spoken by night" remain vital warnings against gossiping in digital communication.',
    heritageTitleKo: '속담 문학 해설과 핵심 어휘 (Proverb Wisdom & Key Phrases)',
    heritageDescKo: '한국어 일상 회화와 TOPIK 시험, 뉴스에서도 단골로 등장하는 핵심 속담 및 표현을 체계적으로 익힙니다.',
    keyVocabulary: [
      { ko: '속담 (俗談)', en: 'proverb / folk maxim', tip: '문학 갈래' },
      { ko: '가는 말이 고와야 오는 말이 곱다', en: 'Warm words spoken yield warm words in return', tip: '소통 황금률' },
      { ko: '백지장도 맞들면 낫다', en: 'Even a sheet of paper is lighter when lifted together', tip: '협동 지혜' },
      { ko: '티끌 모아 태산', en: 'Specks of dust gather to form a mountain', tip: '꾸준함의 가치' },
      { ko: '낮말은 새가 듣고 밤말은 쥐가 듣는다', en: 'Birds hear day speech, mice hear night speech', tip: '언행 경계' },
      { ko: '말 한마디로 천 냥 빚을 갚는다', en: 'A sincere word can settle a debt of a thousand nyang', tip: '화술의 미덕' }
    ],
    keyIngredientsLabel: '속담 속 한국적 소재 (Metaphorical Materials)',
    keyIngredients: [
      { ko: '백지장 (한지 종이)', en: 'Delicate Sheet of White Paper' },
      { ko: '티끌과 태산', en: 'Tiny Dust Motes & Grand Mount Tai' },
      { ko: '천 냥 빚', en: 'Thousand-Nyang Debt of Gold' },
      { ko: '새와 쥐', en: 'Attentive Birds & Night Mice' },
      { ko: '우물 안 개구리', en: 'Frog Trapped in a Deep Well' },
      { ko: '소 잃고 외양간 고치기', en: 'Mending Stable After Losing the Ox' }
    ],
    stepsLabel: '속담 감상 및 실전 활용법 (Proverb Application Guide)',
    steps: [
      { stepLabel: 'Step 1 • 표면 의미 이해', titleKo: '1. 속담의 직관적 상황과 단어 파악하기', descEn: 'Learn the literal imagery: lifting paper together, gathering dust, or speaking softly.' },
      { stepLabel: 'Step 2 • 속뜻과 교훈 추론', titleKo: '2. 비유 속에 숨은 삶의 윤리와 철학 유추', descEn: 'Deduce the underlying ethical moral regarding cooperation, patience, or discretion.' },
      { stepLabel: 'Step 3 • 실전 대화 적용', titleKo: '3. 친구나 동료를 격려할 때 속담 인용하기', descEn: 'Use proverbs naturally to empathize or encourage friends: "백지장도 맞들면 낫다니까 같이 하자!"' },
      { stepLabel: 'Step 4 • 문화적 공감대 형성', titleKo: '4. 한국인의 정(情)과 배려 문화 깊이 체감', descEn: 'Appreciate how proverbs soften social friction and build community warmth.' }
    ],
    literatureExcerpt: {
      quoteKo: '"가는 말이 고와야 오는 말이 곱다." 내가 먼저 고운 마음과 따뜻한 존댓말로 상대를 대할 때 비로소 상대방도 나에게 향기로운 존중을 돌려주는 법이니, 이는 수천 년 한국인의 인간관계와 말의 품격을 지켜온 으뜸가는 생활 속담이니라.',
      quoteEn: '"Words that go must be gentle for words that return to be sweet." When you treat another with warm empathy and honorific care, beautiful goodwill inevitably blossoms in return...',
      authorOrSource: '한국 전통 민속 구비 속담집 (Anthology of Korean Proverbs)',
      contextNoteKo: '한국인의 예절 문화와 공동체 의식을 대변하는 으뜸 속담으로, 상대방을 먼저 존중하는 배려의 언어 철학을 담고 있습니다.',
      contextNoteEn: 'The golden rule of Korean interpersonal communication, teaching that respectful discourse begets respectful harmony.',
      literaryDevice: '상호 호혜성(Reciprocity)과 대구법(Antithesis)을 통한 명쾌한 언어적 교훈'
    }
  },
  {
    id: 'lit-riddle-mystery',
    category: 'K-Literature',
    literatureGenre: '수수께끼',
    badge: '수수께끼 • 언어유희 (Riddles • Folk Wit & Wordplay)',
    titleKo: '수수께끼: 재치와 언어유희가 빛나는 전통 한국어 수수께끼 (Traditional Riddles)',
    titleEn: 'Riddles: Folk Wit, Metaphor & Playful Wordplay in Korean Riddles',
    subtitleKo: '사물의 숨겨진 특징을 기발한 비유로 포착하고, 한글의 음운과 동음이의어를 활용하여 즐겼던 조상들의 유쾌한 지혜 놀이 수수께끼를 풀어봅니다.',
    subtitleEn: 'Unlock playful Korean riddles that transform everyday household objects and nature into delightful metaphors, puns, and brain-teasers.',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    imageCaption: '수수께끼를 풀며 밤을 지새우던 고즈넉한 한옥 뜰 (Hanok Courtyard Under Starlight)',
    commentaryHeader: 'Cultural Commentary • 해학과 창의적 사고의 원천',
    commentarySub: '한국 전통 언어 놀이의 지혜',
    commentaryKo: '한국의 수수께끼는 단순한 지식 퀴즈가 아니라, 사물을 관찰하는 다각도의 시선과 언어의 유연성을 기르는 지혜 놀이였습니다. 사랑방에 둘러앉아 남녀노소가 서로 문제를 내고 맞추며 정을 나누고 긴 겨울밤을 웃음으로 채웠습니다.',
    commentaryEn: 'Korean riddles served as imaginative intellectual games cultivating poetic intuition and wit. Gathered in heated Sarangbangs on winter evenings, villagers bonded over clever questions and hearty laughter.',
    cultureTipKo: '한국어 수수께끼에는 "눈(Eye)"과 "눈(Snow)", "다리(Leg)"와 "다리(Bridge)" 같은 동음이의어를 재치 있게 비튼 문제가 많아 어휘 학습에 최고의 재미를 줍니다.',
    cultureTipEn: 'Tip: Riddles frequently play on homophones like "Nun (eye / snow)" or "Dari (leg / bridge)", making them one of the most entertaining tools for mastering vocabulary nuances.',
    heritageTitleKo: '수수께끼 문학 해설과 핵심 어휘 (Riddle Heritage & Wordplay Terms)',
    heritageDescKo: '수수께끼의 출제 방식, 비유적 연상, 유쾌한 정답 풀이 과정을 담은 핵심 한국어 표현입니다.',
    keyVocabulary: [
      { ko: '수수께끼', en: 'riddle / folk conundrum', tip: '놀이 갈래' },
      { ko: '언어유희 (말장난)', en: 'play on words / witty pun', tip: '문학 기법' },
      { ko: '동음이의어', en: 'homophone (same sound, different meanings)', tip: '한국어 특성' },
      { ko: '기발한 비유', en: 'ingenious metaphorical comparison', tip: '사고 방식' },
      { ko: '정답을 알아맞히다', en: 'to guess the correct answer', tip: '동사 표현' },
      { ko: '무릎을 탁 치다', en: 'to slap one’s knee in sudden realization', tip: '감탄 관용구' }
    ],
    keyIngredientsLabel: '대표 수수께끼 명제와 답 (Classic Riddles & Answers)',
    keyIngredients: [
      { ko: '낮에는 길고 밤에는 짧은 것? (그림자)', en: 'Grows long by day, disappears at night? (Shadow)' },
      { ko: '눈은 눈인데 볼 수 없는 눈? (하늘의 눈)', en: 'An eye that cannot see, cold and white? (Snow)' },
      { ko: '다리는 넷인데 걷지 못하는 것? (밥상/탁자)', en: 'Has four legs but cannot walk a step? (Table)' },
      { ko: '낮에는 올라가고 밤에는 내려오는 것? (이불)', en: 'Goes up by morning, comes down at night? (Quilt)' },
      { ko: '가장 맛있는 배는? (사람의 배/타는 배)', en: 'The most delicious boat? (Belly / Pear pun)' },
      { ko: '들어가면 세 개, 나오면 하나인 것? (바지)', en: 'Three openings going in, one coming out? (Trousers)' }
    ],
    stepsLabel: '수수께끼 감상 및 놀이 방법 (Riddle Solving & Play Guide)',
    steps: [
      { stepLabel: 'Step 1 • 질문의 모순 음미', titleKo: '1. "다리가 있는데 못 걷는다?" 질문 속 역설 파악', descEn: 'Analyze the apparent paradox: an eye that does not see, or legs that do not step.' },
      { stepLabel: 'Step 2 • 일상 사물 연상', titleKo: '2. 방 안의 일상 가구나 자연 현상 둘러보기', descEn: 'Scan traditional household objects: quilts, dining tables, shadows, or seasonal weather.' },
      { stepLabel: 'Step 3 • 한글 동음이의어 점검', titleKo: '3. 발음은 같지만 뜻이 다른 단어 연상하기', descEn: 'Check for dual meanings: Bae (pear / ship / belly), Nun (eye / snow), Dari (bridge / leg).' },
      { stepLabel: 'Step 4 • 정답 공개와 웃음', titleKo: '4. 무릎을 치며 웃고 친구에게 새로운 문제 내기', descEn: 'Reveal the solution with laughter, learning the cultural warmth behind playful reasoning.' }
    ],
    literatureExcerpt: {
      quoteKo: '"문제: 낮에는 마당에 길게 누워 있고, 저녁에는 살금살금 방 안까지 따라오더니, 등불을 끄면 감쪽같이 사라지는 것은 무엇일까요? 정답은 바로 <그림자>라! 사물의 모양을 날카롭게 관찰하여 시적인 질문으로 빚어낸 한국 전통 수수께끼의 정수니라."',
      quoteEn: '"Question: What lies stretched long across the yard by day, creeps quietly into the room at dusk, yet vanishes entirely the moment the lantern is blown out? The answer: A Shadow!"',
      authorOrSource: '한국 전통 구비문학 수수께끼 놀이',
      contextNoteKo: '한국의 옛 민중들이 사랑방에 모여 사물의 관찰력과 언어적 상상력을 뽐내던 전통 지혜 퀴즈의 대표작입니다.',
      contextNoteEn: 'An exemplar of traditional oral riddles showing poetic observation, figurative reasoning, and delightful community bonding.',
      literaryDevice: '의인화(Personification)와 시각적 관찰을 통한 역설적 은유'
    }
  },
  {
    id: 'lit-classic-honggildong',
    category: 'K-Literature',
    literatureGenre: '고전소설',
    literatureSubgenre: '고전소설',
    badge: '고전소설 • 최초 한글 영웅소설 (Classical Novel • Heroic Epic)',
    titleKo: '고전소설: 허균 <홍길동전> (The Story of Hong Gildong) - 신분 차별에 맞선 최초의 한글 소설',
    titleEn: 'Classical Novel: The Story of Hong Gildong & The Quest for Social Equality',
    subtitleKo: '"아버지를 아버지라 부르지 못하고 형을 형이라 부르지 못하니..." 적서차별의 한을 딛고 의적 활빈당을 이끌어 이상국 율도국을 세운 조선 최초의 한글 영웅소설을 탐구합니다.',
    subtitleEn: 'The foundational Korean novel written in Hangul by Heo Gyun: the heroic outcast who championed righteous bandits (Hwalbindang) and founded the utopian realm of Yuldo.',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    imageCaption: '의적들이 넘나들던 조선의 산채와 고성 (Historic Mountain Fortress)',
    commentaryHeader: 'Cultural Commentary • 시대의 모순을 꿰뚫은 한글 문학의 효시',
    commentarySub: '허균의 개혁 사상과 민중의 영웅',
    commentaryKo: '조선 시대 양반 사대부 사회는 서자(첩의 자식)를 철저히 차별했습니다. 허균은 한글로 소설을 지어 피지배 계층의 억울함을 대변하고, 탐관오리의 부정한 재물을 털어 굶주린 백성에게 베푸는 의적 활빈당을 통해 이상적인 사회 정의를 꿈꾸었습니다.',
    commentaryEn: 'Joseon’s strict social caste system severely disenfranchised illegitimate sons (Seoja). Author Heo Gyun penned the first Hangul novel to give voice to the oppressed, presenting the righteous bandit group Hwalbindang who stole from corrupt officials to feed the starving poor.',
    cultureTipKo: '"호부호형(呼父呼兄: 아버지를 아버지라 부르고 형을 형이라 부름)"은 한국인들이 억울한 제약이나 금기를 비유할 때 오늘날에도 빈번하게 인용하는 사자성어입니다.',
    cultureTipEn: 'Tip: "Ho-bu-ho-hyeong (calling father father and brother brother)" remains an iconic cultural idiom used whenever speaking out against unfair institutional taboos.',
    heritageTitleKo: '홍길동전 문학 해설과 핵심 어휘 (Hong Gildong Jeon Heritage & Words)',
    heritageDescKo: '적서차별, 도술, 의적, 이상향 등 고전 영웅소설의 핵심 서사 구조를 학습하는 핵심 문학 어휘입니다.',
    keyVocabulary: [
      { ko: '적서차별 (嫡庶差別)', en: 'discrimination between legitimate and concubine sons', tip: '조선 신분제' },
      { ko: '호부호형 (呼父呼兄)', en: 'calling one’s father father and brother brother', tip: '명대사 어휘' },
      { ko: '활빈당 (活貧黨)', en: 'party to revive and rescue the poor', tip: '의적 단체' },
      { ko: '율도국 (栗島國)', en: 'utopian kingdom founded by Gildong', tip: '이상향' },
      { ko: '둔갑술과 도술', en: 'Daoist sorcery and shape-shifting arts', tip: '전기적 요소' },
      { ko: '탐관오리 (貪官汚吏)', en: 'corrupt and rapacious government officials', tip: '풍자 대상' }
    ],
    keyIngredientsLabel: '홍길동전의 핵심 요소 (Narrative Motifs & Heroes)',
    keyIngredients: [
      { ko: '주인공 홍길동', en: 'Hong Gildong, Master Swordsman & Sorcerer' },
      { ko: '의적 활빈당 결성', en: 'Formation of the Righteous Bandits' },
      { ko: '분신술과 볏짚 인형', en: 'Straw-Doll Clones & Mystic Escapes' },
      { ko: '해인사 쌀 탈취 사건', en: 'Redistributing Hoarded Rice to Commoners' },
      { ko: '병조판서 제수와 화해', en: 'Appointment as Minister of Military' },
      { ko: '이상국가 율도국 건국', en: 'Establishing the Egalitarian Realm of Yuldo' }
    ],
    stepsLabel: '고전소설 감상 및 독해 길잡이 (Literary Appreciation Guide)',
    steps: [
      { stepLabel: 'Step 1 • 신분 갈등 파악', titleKo: '1. 홍길동의 개인적 출생 한계와 울분 이해', descEn: 'Analyze the personal dilemma of gifted talents denied advancement due to archaic caste lines.' },
      { stepLabel: 'Step 2 • 의적 활동 추적', titleKo: '2. 활빈당의 도술과 탐관오리 징벌 장면 음미', descEn: 'Trace the Robin Hood-like redistribution of hoarded wealth back to the famished peasantry.' },
      { stepLabel: 'Step 3 • 이상향 분석', titleKo: '3. 율도국 건설을 통한 작가의 유토피아 고찰', descEn: 'Evaluate author Heo Gyun’s radical utopian vision of a society without birth discrimination.' },
      { stepLabel: 'Step 4 • 한글 문학사적 의의', titleKo: '4. 한문 대신 훈민정음으로 창작된 혁신성 평가', descEn: 'Reflect on how writing in vernacular Hangul democratized literature for commoners.' }
    ],
    literatureExcerpt: {
      quoteKo: '"대장부 세상에 나서 공명을 세우지 못할진대, 아버지를 아버지라 부르지 못하고 형을 형이라 부르지 못하니 어찌 사람이라 하오리까! 길동이 눈물을 흘리며 활빈당을 일으켜 팔도 수령들의 불의한 재물을 거두어 가난한 백성을 구휼하니라."',
      quoteEn: '"A true man born into this world is unable to achieve honor—yet when I cannot call my own father father, nor call my own brother brother, how can I deem myself a human being? With tears streaming, Gildong rallied the Hwalbindang, taking the unjust plunder of magistrates to succor the destitute people..."',
      authorOrSource: '교산 허균(許筠) <홍길동전(洪吉童傳)>',
      contextNoteKo: '조선 중기 광해군 시절 허균이 지은 우리나라 최초의 한글 소설이자 영웅소설로, 불합리한 신분제 철폐와 사회 개혁을 부르짖은 걸작입니다.',
      contextNoteEn: 'The pioneering classic of vernacular Korean literature, embodying dramatic martial heroism, social justice, and revolutionary vision.',
      literaryDevice: '전기적(傳奇的) 도술 모티프와 날카로운 사회 부조리 고발'
    }
  },
  {
    id: 'lit-romance-chunhyang',
    category: 'K-Literature',
    literatureGenre: '고전소설',
    literatureSubgenre: '애정소설',
    badge: '고전소설 • 애정소설 (Classical Romance • True Devotion)',
    titleKo: '애정소설: <춘향전> (The Story of Chunhyang) - 신분을 뛰어넘은 지고지순한 사랑과 절개',
    titleEn: 'Classical Romance: The Story of Chunhyang & The Triumph of Fidelity',
    subtitleKo: '남원 기생의 딸 성춘향과 양반 이몽룡의 신분을 초월한 사랑, 그리고 탐관오리 변학도의 폭정에 맞서 지조와 절개를 지켜낸 판소리계 고전 애정소설의 금자탑을 만납니다.',
    subtitleEn: 'The immortal Korean love story of Chunhyang and Mongryong: defying rigid class hierarchies and resisting tyrant Byeon Hak-do through unyielding fidelity and royal justice.',
    image: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=800&q=80',
    imageCaption: '이몽룡과 춘향이 사랑을 싹틔운 남원 광한루 연못 (Gwanghallu Lotus Pond)',
    commentaryHeader: 'Cultural Commentary • 열녀(烈女) 이데올로기를 넘어선 인간 존엄의 승리',
    commentarySub: '사랑과 저항의 판소리계 소설',
    commentaryKo: '춘향전은 단순한 연애담이 아닙니다. 천민 신분인 춘향이 양반 사또의 부당한 수청(성적 강요) 요구를 목숨 걸고 거부한 것은, 자신의 몸과 마음의 주인이 자기 자신임을 천명한 위대한 인간 존엄성의 선언이었습니다. 판소리의 흥겨운 사설과 서민들의 염원이 합쳐져 한국 최고의 고전으로 자리 잡았습니다.',
    commentaryEn: 'Chunhyang’s refusal to submit to magistrate Byeon Hak-do was not merely obedience to traditional chastity, but a defiant declaration of personal autonomy and human dignity by an oppressed woman.',
    cultureTipKo: '"암행어사 출도야!(Secret royal inspector arrives!)"는 부패한 권력자가 마침내 응징당하는 통쾌한 순간을 나타내는 한국 문화의 상징적 외침입니다.',
    cultureTipEn: 'Tip: "Amhaeng-eosa Chuldoya! (The Secret Royal Inspector arrives!)" is the ultimate cultural cheer celebrating poetic justice over corrupted tyrants.',
    heritageTitleKo: '춘향전 문학 해설과 핵심 어휘 (Chunhyangjeon Heritage & Literary Terms)',
    heritageDescKo: '판소리계 소설의 운율, 지조와 절개, 암행어사 제도 등 한국 고전 로맨스를 감상하는 필수 어휘입니다.',
    keyVocabulary: [
      { ko: '애정소설 (愛情小說)', en: 'romance novel / tale of romantic love', tip: '소설 갈래' },
      { ko: '지조와 절개 (志操/節介)', en: 'unyielding integrity and fidelity', tip: '춘향의 정신' },
      { ko: '암행어사 (暗行御史)', en: 'secret royal inspector disguised in rags', tip: '조선 관직' },
      { ko: '마패 (馬牌)', en: 'horse medallion verifying royal authority', tip: '어사의 상징' },
      { ko: '수청을 거부하다', en: 'to refuse coerced courtesan duty', tip: '갈등의 핵' },
      { ko: '백년가약 (百年佳約)', en: 'solemn hundred-year matrimonial pledge', tip: '사랑의 맹세' }
    ],
    keyIngredientsLabel: '춘향전의 명장면과 모티프 (Famous Scenes & Characters)',
    keyIngredients: [
      { ko: '성춘향과 이몽룡', en: 'Seong Chunhyang & Lee Mong-ryong' },
      { ko: '단오날 광한루 그네', en: 'Swinging on Dano Day at Gwanghallu' },
      { ko: '탐관오리 변학도', en: 'Tyrannical Magistrate Byeon Hak-do' },
      { ko: '옥중가와 춘향의 절개', en: 'Song of the Prison & Unbroken Spirit' },
      { ko: '거지 차림의 어사 이몽룡', en: 'Mongryong Disguised as a Destitute Beggar' },
      { ko: '암행어사 출도와 재회', en: 'Dramatic Royal Raid & Jubilant Reunion' }
    ],
    stepsLabel: '애정소설 감상 및 독해 길잡이 (Literary Appreciation Guide)',
    steps: [
      { stepLabel: 'Step 1 • 신분 차이와 첫 만남', titleKo: '1. 광한루 그네 타는 춘향과 몽룡의 만남 음미', descEn: 'Feel the poetic romanticism of their first encounter during the spring Dano festival.' },
      { stepLabel: 'Step 2 • 이별과 시련', titleKo: '2. 과거 급제를 위한 이별과 변학도의 폭압 분석', descEn: 'Analyze the emotional trauma of separation and the abuse of power by the new governor.' },
      { stepLabel: 'Step 3 • 절개와 저항', titleKo: '3. 칼을 쓰고 옥에 갇혀서도 굴하지 않는 춘향의 기개', descEn: 'Reflect on Chunhyang’s famous prison poetry affirming steadfast devotion to her true love.' },
      { stepLabel: 'Step 4 • 암행어사 출도와 카타르시스', titleKo: '4. 마패를 치켜든 통쾌한 반전과 백년해로 감상', descEn: 'Experience the theatrical catharsis of the secret inspector unveiling and freeing Chunhyang.' }
    ],
    literatureExcerpt: {
      quoteKo: '"충신은 불사이군이요, 열녀는 불경이부라! 내 비록 기생의 딸이나 몽룡 도령과 백년가약을 맺었거늘, 관의 서슬 퍼런 칼날 아래 목이 달아날지언정 수청은 들 수 없소!" 춘향이 칼을 쓴 채 옥중에서 절개를 외치니, 마침내 "암행어사 출도야!" 소리와 함께 옥문이 열리니라.',
      quoteEn: '"A loyal subject serves not two monarchs; a faithful woman wedded in heart yields not to two husbands! Though I was born a courtesan’s daughter, my vow to Mongryong is sacred, and though your blades sever my neck, I will not submit!" As Chunhyang shouted in shackles, the cry echoed: "Amhaeng-eosa Chuldoya!"',
      authorOrSource: '판소리계 고전소설 <열녀춘향수절가(烈女春香守節歌)>',
      contextNoteKo: '한국 고전소설 중 가장 널리 사랑받은 애정소설의 정수로, 신분제의 한계를 극복하고 진정한 사랑과 인간 존엄을 지켜낸 승리의 서사입니다.',
      contextNoteEn: 'The supreme gem of Korean romance fiction, celebrating true devotion that conquers social prejudice and political tyranny.',
      literaryDevice: '판소리 특유의 3·4조 율문체와 극적인 반전(Catharsis)'
    }
  },
  {
    id: 'lit-satire-baebijang',
    category: 'K-Literature',
    literatureGenre: '고전소설',
    literatureSubgenre: '세태소설',
    badge: '고전소설 • 세태·풍자소설 (Satirical Novel • Social Manners)',
    titleKo: '세태소설: <배비장전> (The Story of Officer Bae) - 양반 사대부의 위선과 체면을 꼬집는 유쾌한 풍자',
    titleEn: 'Satirical Novel: The Story of Officer Bae & The Mockery of Aristocratic Pretense',
    subtitleKo: '여색을 멀리하고 체면을 지킨다고 호언장담하던 양반 배비장이 제주 기생 애랑의 매혹적인 유혹에 넘어가 알몸으로 궤짝에 숨는 희대의 해학 풍자 소설입니다.',
    subtitleEn: 'A masterclass in comic satire: Officer Bae brags of untouchable moral austerity, only to be thoroughly humiliated in a wooden grain chest by the clever Jeju courtesan Aerang.',
    image: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=800&q=80',
    imageCaption: '양반들의 허세를 풍자하던 전통 민속 탈춤 마당 (Traditional Mask & Courtyard)',
    commentaryHeader: 'Cultural Commentary • 점잔 빼는 지배층의 가면을 벗기다',
    commentarySub: '조선 후기 세태소설의 날카로운 웃음',
    commentaryKo: '배비장전은 겉으로는 엄격한 도덕과 성리학적 명분을 내세우면서도 속으로는 욕망에 굶주려 있던 조선 양반층의 표리부동(表裏不同)을 신랄하게 폭로합니다. 민중들은 점잖은 척하던 지배층이 망신당하는 장면을 통해 통쾌한 해방감을 맛보았습니다.',
    commentaryEn: 'Officer Bae exposes the stark hypocrisy of the Joseon aristocracy, who publicly preached stoic Confucian austerity while privately indulging base desires. Commoners reveled in seeing pompous elites utterly stripped of their masks.',
    cultureTipKo: '소설 속 배비장이 궤짝 속에 갇혀 바다에 던져진 줄 알고 헤엄치는 시늉을 하는 대목은 한국 희극 문학 최고의 명장면으로 꼽힙니다.',
    cultureTipEn: 'Tip: Officer Bae pretending to dog-paddle desperately inside a dry wooden chest believing he was thrown into the ocean is one of Korean satire’s most famous comic moments.',
    heritageTitleKo: '배비장전 문학 해설과 핵심 어휘 (Bae Bijang Jeon Heritage & Satire Terms)',
    heritageDescKo: '세태 풍자, 위선과 체면, 골계미 등 한국 풍자소설의 해학적 묘미를 이해하는 필수 어휘입니다.',
    keyVocabulary: [
      { ko: '세태소설 (世態小說)', en: 'novel of manners / satire of contemporary society', tip: '문학 갈래' },
      { ko: '풍자와 해학 (諷刺/諧謔)', en: 'satire and genial humor', tip: '문학 기법' },
      { ko: '표리부동 (表裏不同)', en: 'two-faced / differing words and inner thoughts', tip: '양반 비판' },
      { ko: '체면과 허세', en: 'saving face and pretentious vanity', tip: '배비장의 약점' },
      { ko: '기생 애랑 (愛娘)', en: 'clever courtesan Aerang of Jeju', tip: '주요 인물' },
      { ko: '궤짝 속 망신살', en: 'public disgrace trapped naked in a wooden chest', tip: '희극적 절정' }
    ],
    keyIngredientsLabel: '배비장전의 해학적 구성 (Comic Elements & Scenes)',
    keyIngredients: [
      { ko: '주인공 배비장 (배걸덕)', en: 'Officer Bae, the Pompous Purist' },
      { ko: '제주 명기 애랑', en: 'Aerang, the Charming & Witty Courtesan' },
      { ko: '방자 (사환)', en: 'Bangja, the Witty Conspiring Servant' },
      { ko: '거문고와 목욕 유혹', en: 'Moonlit Bathing & Zither Seduction' },
      { ko: '방앗간 궤짝 속 감금', en: 'Hidden Naked in the Grain Chest' },
      { ko: '목사 앞의 알몸 헤엄치기', en: 'The Naked "Swimming" Spectacle before the Governor' }
    ],
    stepsLabel: '세태소설 감상 및 독해 길잡이 (Literary Appreciation Guide)',
    steps: [
      { stepLabel: 'Step 1 • 허세의 시작', titleKo: '1. "나는 여색에 흔들리지 않는다" 배비장의 장담 관찰', descEn: 'Observe Officer Bae’s boastful pride about his incorruptible moral righteousness.' },
      { stepLabel: 'Step 2 • 유혹과 본색', titleKo: '2. 애랑의 자태 앞에 속절없이 무너지는 이중성 포착', descEn: 'Watch his rigid facade crumble instantly when faced with Aerang’s moonlit charms.' },
      { stepLabel: 'Step 3 • 골계미와 망신', titleKo: '3. 궤짝에 갇혀 바다인 줄 알고 허우적대는 명장면 감상', descEn: 'Laugh along as Bae frantically mimics swimming on dry ground before the entire town hall.' },
      { stepLabel: 'Step 4 • 사회적 메시지 성찰', titleKo: '4. 지배 계급의 허위의식에 대한 서민들의 통쾌한 웃음', descEn: 'Reflect on how folk humor served as a healthy, empowering critique of social hierarchy.' }
    ],
    literatureExcerpt: {
      quoteKo: '"배비장이 여색을 돌같이 보겠노라 맹세하더니, 애랑의 아리따운 교태에 혼이 빠져 옷을 벗어던지고 밤길을 달려갔도다. 남편이 들이닥친다는 거짓 소리에 알몸으로 방앗간 궤짝 속에 기어들어 가 숨었으니, 날이 밝아 관아 마당 한가운데서 궤짝 문이 활짝 열릴 줄 꿈엔들 알았으랴!"',
      quoteEn: '"Officer Bae had vowed to treat worldly temptresses as cold stones—yet intoxicated by Aerang’s bewitching smile, he discarded his garments and rushed into the night. At the false shout that her fierce husband had returned, he dove naked into the mill chest, never dreaming it would be swung open in the bright light of day before the magistrate!"',
      authorOrSource: '판소리계 풍자소설 <배비장전(裵裨將傳)>',
      contextNoteKo: '조선 후기 지배층 양반들의 위선과 허세를 통쾌하게 발가벗긴 대표적 세태 풍자소설로, 뛰어난 언어유희와 희극적 상황 설정이 돋보입니다.',
      contextNoteEn: 'A sparkling satire exposing the dual nature of elitist pretensions through side-splitting situational comedy and witty colloquial prose.',
      literaryDevice: '상황적 아이러니(Situational Irony)와 희화화(Caricature)'
    }
  },
  {
    id: 'lit-fable-rabbit',
    category: 'K-Literature',
    literatureGenre: '고전소설',
    literatureSubgenre: '우화소설',
    badge: '고전소설 • 우화소설 (Classical Fable • Wit & Survival)',
    titleKo: '우화소설: <토끼전 (별주부전)> (The Tale of the Rabbit and Turtle) - 권력의 횡포를 이겨낸 토끼의 번뜩이는 기지',
    titleEn: 'Classical Fable: The Tale of the Rabbit and Turtle & Survival Wit',
    subtitleKo: '용왕의 병을 고치기 위해 토끼의 간을 구하러 육지로 온 자라(별주부)와, 절체절명의 위기 속에서 "간을 육지에 두고 왔다"는 기지로 살아남은 한국 대표 동물 우화소설을 만납니다.',
    subtitleEn: 'The celebrated allegorical fable where the innocent rabbit outsmarts the dragon king and loyal turtle Byeoljubu by claiming his liver was left to dry on a sunlit rock.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    imageCaption: '용궁과 육지가 맞닿은 푸른 바닷가 (The Azure Ocean & Turtle Shore)',
    commentaryHeader: 'Cultural Commentary • 피지배 서민의 생존 지혜와 권력 풍자',
    commentarySub: '동물의 의인화에 담긴 비판 의식',
    commentaryKo: '토끼전에서 용왕은 백성의 희생을 당연시하는 부패한 최고 권력자, 자라(별주부)는 맹목적인 충성심에 사로잡힌 지배 관료, 토끼는 억울하게 끌려간 무고한 민중을 상징합니다. 죽음의 문턱에서 임기응변의 기지로 살아남는 토끼의 승리는 권력의 횡포에 굴하지 않는 민중의 생명력을 웅변합니다.',
    commentaryEn: 'The Dragon King represents selfish rulers demanding commoners’ lifeblood, the Turtle symbolizes blind bureaucratic obedience, and the Rabbit embodies the resilient, quick-witted common folk who outsmart tyranny.',
    cultureTipKo: '"토끼의 간"은 한국 문화에서 생존을 위해 결코 내어줄 수 없는 가장 소중한 밑천이나 비장의 무기를 비유할 때 쓰입니다.',
    cultureTipEn: 'Tip: "The Rabbit’s Liver" has become an enduring idiom in business and negotiation for one’s indispensable asset or ultimate trump card.',
    heritageTitleKo: '토끼전 문학 해설과 핵심 어휘 (Rabbit & Turtle Fable Terms)',
    heritageDescKo: '우화 소설의 의인화 기법, 맹목적 충성과 생존 기지 등 고전 우화의 풍자적 어휘를 학습합니다.',
    keyVocabulary: [
      { ko: '우화소설 (寓話小說)', en: 'allegorical animal fable', tip: '문학 갈래' },
      { ko: '의인화 (擬人化)', en: 'anthropomorphic personification', tip: '표현 기법' },
      { ko: '별주부 (鼈主簿)', en: 'Turtle Byeoljubu (loyal maritime civil servant)', tip: '인물 상징' },
      { ko: '용궁 (龍宮)', en: 'Underwater Dragon Palace (seat of imperial power)', tip: '공간 배경' },
      { ko: '임기응변 (臨機應變)', en: 'quick-witted improvisation / survival resourcefulness', tip: '토끼의 지혜' },
      { ko: '맹목적 충성', en: 'blind unquestioning loyalty', tip: '풍자 주제' }
    ],
    keyIngredientsLabel: '토끼전의 핵심 모티프 (Fable Symbols & Conflict)',
    keyIngredients: [
      { ko: '영민한 산토끼', en: 'The Witty Forest Rabbit' },
      { ko: '충직한 자라 별주부', en: 'The Loyal Turtle Official' },
      { ko: '중병에 걸린 남해 용왕', en: 'The Ailing Sea Dragon King' },
      { ko: '감언이설과 벼슬 유혹', en: 'Flattery & False Promises of High Office' },
      { ko: '토끼의 간(肝)과 거짓말', en: 'The Detachable Liver Lie' },
      { ko: '육지로의 통쾌한 탈출', en: 'Triumphant Escape Back to the Forest' }
    ],
    stepsLabel: '우화소설 감상 및 독해 길잡이 (Literary Appreciation Guide)',
    steps: [
      { stepLabel: 'Step 1 • 유혹과 속임수', titleKo: '1. 자라의 감언이설에 속아 용궁으로 향하는 토끼 관찰', descEn: 'Analyze the turtle’s tempting flattery luring the naive forest rabbit into deep waters.' },
      { stepLabel: 'Step 2 • 용궁의 위기와 공포', titleKo: '2. "배를 갈라 간을 내놓아라!" 용왕의 횡포 체감', descEn: 'Feel the acute mortal terror as the ruler casually orders the rabbit’s slaughter.' },
      { stepLabel: 'Step 3 • 번뜩이는 생존 기지', titleKo: '3. "간을 바위 위에 널어 말리고 왔다"는 기막힌 거짓말', descEn: 'Marvel at the audacious improvisation turning the tables on the entire sea court.' },
      { stepLabel: 'Step 4 • 우화의 사회적 풍자', titleKo: '4. 백성을 착취하는 부패 권력에 대한 풍자 메시지 성찰', descEn: 'Reflect on the allegory: commoners’ wit triumphs over institutional authoritarianism.' }
    ],
    literatureExcerpt: {
      quoteKo: '"토끼 배를 갈라 간을 바치라!" 용왕의 호령에 토끼가 간담이 서늘했으나 곧 방긋 웃으며 아뢰었다. "제 간은 신령하여 아침이슬에 씻어 달빛 깃든 청산 바위 틈에 감추어 두고 왔나이다. 저를 다시 육지로 데려다주시면 간을 정성껏 캐어 바치오리다!"',
      quoteEn: '"Slice open the rabbit’s belly and deliver his liver!" thundered the Dragon King. Though frozen in fear, the rabbit smiled serenely and bowed: "My liver is sacred and draws moonlight, so I placed it safe atop a mountain rock. If you return me to the shore, I shall gladly dig it up and present it to your majesty!"',
      authorOrSource: '판소리계 우화소설 <수궁가(水宮歌) / 별주부전>',
      contextNoteKo: '동물을 의인화하여 조선 후기 지배층의 무능과 권력 남용을 꼬집고, 사회적 약자인 민중의 기지와 생존력을 통쾌하게 그려낸 대표 우화소설입니다.',
      contextNoteEn: 'The preeminent Korean animal allegory, demonstrating that wit and presence of mind can triumph over lethal authoritarian coercion.',
      literaryDevice: '동물 의인화(Anthropomorphism)와 우의적 풍자(Allegory)'
    }
  },
  {
    id: 'lit-modern-spring',
    category: 'K-Literature',
    literatureGenre: '현대소설',
    badge: '현대소설 • 농촌 해학소설 (Modern Novel • Rural Humor)',
    titleKo: '현대소설: 김유정 <봄·봄> (Spring, Spring) - 투박한 농촌의 순박한 사랑과 해학의 절정',
    titleEn: 'Modern Novel: Kim Yu-jeong’s "Spring, Spring" & Rural Korean Humor',
    subtitleKo: '점순이 키가 아직 안 컸다는 핑계로 삼 년 넘게 새경(품삯) 없이 일만 부려 먹는 교활한 봉필 영감과, 혼례를 치르고 싶어 안달 난 순박한 데릴사위 \'나\'의 배꼽 잡는 갈등을 그린 한국 근대 단편소설의 백미입니다.',
    subtitleEn: 'The comedic rural masterpiece by Kim Yu-jeong: a gullible prospective son-in-law toiling for years without pay, waiting for his feisty bride Jeomsun-i to "grow up."',
    image: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80',
    imageCaption: '노란 동백꽃(생강나무꽃) 흐드러진 강원도 산골 마을 (Spring Countryside in Bloom)',
    commentaryHeader: 'Cultural Commentary • 일제강점기 억압을 이겨낸 토속적 웃음과 해학',
    commentarySub: '김유정 문학의 독보적 토속어와 익살',
    commentaryKo: '1930년대 일제강점기의 암울한 농촌 현실 속에서도 김유정은 절망 대신 한국 고유의 구수한 토속 방언과 해학을 빚어냈습니다. 어리숙한 주인공의 시점을 통해 독자에게 폭소를 선사하면서도, 당시 가난한 소작농들의 처절한 생존 현실을 가슴 찡하게 포착합니다.',
    commentaryEn: 'Written during the colonial 1930s, Kim Yu-jeong infused grim rural poverty with native Gangwon dialect and buoyant wit. The narrator’s rustic naivety evokes both hearty laughter and tender empathy for resilient peasant lives.',
    cultureTipKo: '소설 속 "점순이가 구워 준 감자"를 둘러싼 신경전은 한국 현대문학에서 풋풋하고 퉁명스러운 츤데레식 사랑 표현의 대명사로 사랑받습니다.',
    cultureTipEn: 'Tip: Jeomsun-i awkwardly pressing hot steamed potatoes into the narrator’s hand is Korea’s ultimate literary archetype of clumsy, tsundere first love.',
    heritageTitleKo: '봄·봄 문학 해설과 핵심 어휘 (Spring, Spring Heritage & Dialect)',
    heritageDescKo: '데릴사위 풍습, 토속적 비속어의 해학적 변용, 1인칭 관찰자 시점 등 한국 근대소설의 문학 용어를 익힙니다.',
    keyVocabulary: [
      { ko: '현대소설 (단편소설)', en: 'modern Korean novel / short story', tip: '문학 갈래' },
      { ko: '데릴사위', en: 'prospective son-in-law living and working with in-laws', tip: '전통 풍습' },
      { ko: '성례 (혼인식)', en: 'wedding ceremony / marriage rites', tip: '소망의 대상' },
      { ko: '해학과 익살', en: 'genial humor and comical jesting', tip: '작품 분위기' },
      { ko: '새경 (품삯)', en: 'annual farm laborer wages', tip: '경제적 갈등' },
      { ko: '구수한 강원도 방언', en: 'rich, savory Gangwon province dialect', tip: '문체 특성' }
    ],
    keyIngredientsLabel: '봄·봄의 명장면과 인물 (Key Characters & Dynamic)',
    keyIngredients: [
      { ko: '우직하고 어리숙한 "나"', en: 'The Naive, Hardworking Groom "I"' },
      { ko: '욕심쟁이 장인 봉필 영감', en: 'Bongpil, the Cunning Father-in-Law' },
      { ko: '야무지고 당찬 점순이', en: 'Jeomsun-i, the Spunky & Elusive Bride' },
      { ko: '점순이의 키재기 핑계', en: 'The Excuse that Jeomsun Hasn’t Grown Tall Enough' },
      { ko: '구운 감자와 자존심 싸움', en: 'Steamed Potato Feud & Hurt Pride' },
      { ko: '바짓가랑이 잡고 벌인 몸싸움', en: 'The Epic Wrestling Match in the Muddy Field' }
    ],
    stepsLabel: '현대소설 감상 및 독해 길잡이 (Literary Appreciation Guide)',
    steps: [
      { stepLabel: 'Step 1 • 우직한 화자의 시선 파악', titleKo: '1. 바보스러울 정도로 순박한 \'나\'의 독백에 공감', descEn: 'Immerse yourself in the charmingly naive first-person interior monologue of the hardworking groom.' },
      { stepLabel: 'Step 2 • 토속적 어휘의 맛 체감', titleKo: '2. "구장님", "생색", "마름" 등 당시 농촌 어휘 탐색', descEn: 'Savor authentic 1930s agricultural vocabulary reflecting tenancy dynamics.' },
      { stepLabel: 'Step 3 • 갈등의 최고조와 반전', titleKo: '3. 장인과의 격투 중 점순이가 누구 편을 드는지 확인', descEn: 'Observe the hilarious climax when Jeomsun-i unexpectedly strikes the groom for attacking her father.' },
      { stepLabel: 'Step 4 • 해학 이면의 애환 성찰', titleKo: '4. 웃음 뒤에 가려진 일제강점기 소작농의 척박한 삶', descEn: 'Reflect on how rustic comedy cushioned the harsh realities of tenant farming under colonial rule.' }
    ],
    literatureExcerpt: {
      quoteKo: '"장인님! 인제 저 나이도 찼으니 성례를 시켜 줘야 하지 않겠습니까!" "이 자식아, 점순이가 아직 덜 자랐는데 어찌 성례를 한단 말이냐?" 장인의 턱수염을 잡고 바짓가랑이를 물고 뒹굴며 몸싸움을 벌이는데, 뒤에서 점순이가 쪼르르 달려와 "에구, 우리 아버지 죽네!" 하며 내 등을 내리치는 것이 아닌가!',
      quoteEn: '"Father-in-law! I am well of age now, so shouldn’t you hold the wedding?" "You rascal, Jeomsun hasn’t grown up yet, so how could we marry you off?" Tussling in the dirt and clutching his whiskers, Jeomsun-i came dashing over crying "Aiyo, you’re killing my father!" and began pummeling my back!',
      authorOrSource: '김유정(金裕貞) <봄·봄(1935)>',
      contextNoteKo: '1930년대 한국 농촌을 배경으로 봉건적 악습과 해학적 사랑을 그린 한국 현대문학 대표 명작으로, 투박한 토속어와 반전의 미학이 빛납니다.',
      contextNoteEn: 'A pinnacle of modern Korean short fiction, balancing comic dialogue, lively regional slang, and heartwarming pastoral romance.',
      literaryDevice: '어리숙한 서술자(Naive Narrator)를 통한 해학과 아이러니'
    }
  },
  {
    id: 'lit-play-wedding',
    category: 'K-Literature',
    literatureGenre: '현대희곡',
    badge: '현대희곡 • 전통 혼례 희곡 (Modern Drama • Comic Play)',
    titleKo: '현대희곡: 오영진 <시집가는 날 (맹진사댁 경사)> (The Wedding Day) - 인간의 허영심을 꼬집는 유쾌한 전통 희곡',
    titleEn: 'Modern Drama: Oh Young-jin’s "The Wedding Day" & Satirical Folk Theater',
    subtitleKo: '지체 높은 판서 댁 아들이 절름발이라는 헛소문에 속아 귀한 딸 대신 몸종을 가마에 태워 시집보낸 맹진사의 허영심과, 헌헌장부 미남 신랑이 나타나며 벌어지는 극적인 반전을 그린 한국 대표 희곡입니다.',
    subtitleEn: 'The quintessential modern Korean comic play: Lord Maeng swaps his spoiled daughter with a humble maid to avoid a supposed cripple groom, only for the groom to arrive as a dazzling gentleman.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    imageCaption: '전통 청사초롱과 혼례 가마가 놓인 대청마루 (Traditional Wedding Porch & Lanterns)',
    commentaryHeader: 'Cultural Commentary • 민속극의 흥과 서양 희곡 기법의 아름다운 결합',
    commentarySub: '허욕과 신분 상승욕에 대한 통렬한 풍자',
    commentaryKo: '오영진의 <시집가는 날>은 한국 고유의 민속적 소재(전통 혼례와 신랑 시험)를 탄탄한 희곡 구조로 완성한 걸작입니다. 딸의 행복보다 양반 권세가와의 정략결혼에만 눈먼 맹진사의 얄팍한 계산이 자업자득(自業自得)으로 귀결되는 과정은 관객에게 배꼽 잡는 웃음과 깊은 교훈을 동시에 안깁니다.',
    commentaryEn: 'A masterwork blending traditional folk theater with modern dramatic architecture. Lord Maeng’s vain social climbing leads to self-inflicted embarrassment, celebrating virtue and inner beauty over hollow aristocratic pedigree.',
    cultureTipKo: '이 작품은 <시집가는 날>이라는 영화로도 제작되어 제4회 아시아영화제에서 한국 영화 사상 최초로 해외 영화제 특별희극상을 수상한 문화적 기념비입니다.',
    cultureTipEn: 'Tip: Adapted into an award-winning feature film in 1957, it won the Best Comedy Award at the 4th Asian Film Festival, making cinema history for Korea.',
    heritageTitleKo: '시집가는 날 희곡 해설과 핵심 어휘 (The Wedding Day Drama Terms)',
    heritageDescKo: '대사와 지시문, 극적 반전, 풍자 희극 등 한국 연극과 희곡을 감상하는 전문 어휘입니다.',
    keyVocabulary: [
      { ko: '현대희곡 (現代戱曲)', en: 'modern dramatic play / theater script', tip: '문학 갈래' },
      { ko: '무대 지시문 (指示文)', en: 'stage directions (movements, lighting, tone)', tip: '희곡 요소' },
      { ko: '대사 (독백/대화)', en: 'dialogue and dramatic lines', tip: '희곡 요소' },
      { ko: '자업자득 (自業自得)', en: 'reaping what one sows / self-wrought disaster', tip: '교훈 주제' },
      { ko: '정략결혼과 허영심', en: 'arranged marriage of convenience & social vanity', tip: '인물 동기' },
      { ko: '극적 반전 (反轉)', en: 'dramatic plot reversal / comic twist', tip: '플롯 구성' }
    ],
    keyIngredientsLabel: '희곡의 등장인물과 갈등 (Dramatis Personae & Conflict)',
    keyIngredients: [
      { ko: '맹진사 (탐욕스런 가장)', en: 'Lord Maeng, the Vain Aristocrat' },
      { ko: '갑분이 (오만한 친딸)', en: 'Gapbun-i, the Arrogant Spoiled Daughter' },
      { ko: '입분이 (순박한 몸종)', en: 'Ipbun-i, the Devoted & Kind Maid' },
      { ko: '김미언 (미남 지략가 신랑)', en: 'Kim Myeon, the Clever & Handsome Groom' },
      { ko: '절름발이라는 헛소문', en: 'The False Rumor of the Limping Groom' },
      { ko: '가마 바꿔치기의 대반전', en: 'The Bride-Swap & The Triumphant Wedding' }
    ],
    stepsLabel: '현대희곡 감상 및 연극 독해법 (Drama Reading & Performance Guide)',
    steps: [
      { stepLabel: 'Step 1 • 희곡 형식 이해', titleKo: '1. 인물의 대사와 지시문(괄호 속 행동 묘사) 구분', descEn: 'Distinguish between spoken dialogue and italicized bracketed stage directions.' },
      { stepLabel: 'Step 2 • 인물의 허영심 관찰', titleKo: '2. 권세를 탐하다 헛소문에 허둥대는 맹진사의 심리 파악', descEn: 'Analyze Lord Maeng’s frantic panic upon hearing his prospective son-in-law limps.' },
      { stepLabel: 'Step 3 • 희극적 갈등과 대반전', titleKo: '3. 가마에 탄 몸종 입분이와 당당하게 걸어 들어오는 신랑', descEn: 'Feel the electrifying comedic tension when the groom walks in robustly on two handsome legs.' },
      { stepLabel: 'Step 4 • 진정한 인간미 성찰', titleKo: '4. 허세와 신분을 뛰어넘어 착한 성품이 승리하는 결말', descEn: 'Celebrate the poetic justice where the kindhearted maid becomes the beloved noble bride.' }
    ],
    literatureExcerpt: {
      quoteKo: '[무대 지시문: 맹진사는 사위 될 신랑이 절름발이라는 소식에 대경실색하여 마당을 서성인다.] 맹진사: "내 애지중지 기른 갑분이를 어찌 병신에게 보낸단 말이냐! 입분이 네가 갑분이 옷을 입고 대신 가마를 타거라!" [혼례 당일, 헌헌장부 미남 신랑 미언이 늠름하게 걸어 들어오자 맹진사는 턱이 빠질 듯 넋을 잃는다.]',
      quoteEn: '[Stage Direction: Lord Maeng paces the courtyard in wild terror upon hearing the rumor that his future son-in-law is a cripple.] Lord Maeng: "How can I deliver my darling Gapbun-i to a lame man! Ipbun-i, put on her silk wedding robe and take her place in the bridal sedan chair!" [On the wedding day, handsome nobleman Myeon walks in with dashing poise, leaving Lord Maeng utterly paralyzed with shock.]',
      authorOrSource: '오영진(吳泳鎭) 희곡 <시집가는 날 (맹진사댁 경사, 1943)>',
      contextNoteKo: '한국 전통 혼례를 배경으로 양반 가문의 속물근성과 허영을 유쾌하게 풍자한 한국 현대희곡의 최고봉으로, 따뜻한 인간애와 권선징악을 담고 있습니다.',
      contextNoteEn: 'The crowning achievement of modern Korean dramatic comedy, skewering aristocratic greed while rewarding honest humility and pure affection.',
      literaryDevice: '희극적 상황 착오(Comic Mistaken Identity)와 카타르시스적 반전'
    }
  },
  {
    id: 'lit-essay-inyeon',
    category: 'K-Literature',
    literatureGenre: '현대수필',
    badge: '현대수필 • 서정 수필 (Modern Essay • Lyrical Prose)',
    titleKo: '현대수필: 피천득 <인연> (Destiny / Inyeon) - 옷깃만 스쳐도 인연, 서정 수필의 정수',
    titleEn: 'Modern Essay: Pi Chon-deuk’s "Inyeon" & The Aesthetics of Human Ties',
    subtitleKo: '어린 시절 도쿄에서 만난 소녀 아사코와의 세 번의 만남과 헤어짐을 담담하고 맑은 필치로 그려내며, 인생에서 스쳐 지나가는 인연의 소중함과 아련함을 노래한 한국 수필의 불후의 명작입니다.',
    subtitleEn: 'The immortal lyric essay by Pi Chon-deuk: reflecting on three meetings across decades with Asako, meditating on the delicate fleeting beauty of destiny and human bonds.',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
    imageCaption: '은은한 찻잔과 봄 햇살이 머무는 창가 (Quiet Window of Nostalgic Reminiscence)',
    commentaryHeader: 'Cultural Commentary • 은은한 난초 향기처럼 맑은 수필의 미학',
    commentarySub: '붓 가는 대로 쓰는 고백과 성찰',
    commentaryKo: '피천득의 수필은 과장이나 거창한 수식 없이 소박하고 진솔한 일상의 순간에서 인생의 영원한 진리를 길어 올립니다. "수필은 청자 연적과 같고, 난초의 향기 같다"는 그의 말처럼, 담백하면서도 가슴 깊은 울림을 주는 문장은 한국인들이 가장 사랑하는 서정의 모범입니다.',
    commentaryEn: 'Pi Chon-deuk’s prose flows with crystalline serenity, finding cosmic poignancy in intimate personal memories. He famously likened the essay to "a celadon water dropper or delicate orchid scent"—unpretentious yet lingering in the heart.',
    cultureTipKo: '"옷깃만 스쳐도 인연이다"라는 한국인의 속담적 믿음은 불교의 윤회 사상과 한국인 특유의 정(情) 문화가 결합된 것으로, 이 수필을 통해 가장 아름답게 형상화되었습니다.',
    cultureTipEn: 'Tip: "Even a brief brush of sleeves is destiny (인연)" epitomizes the Korean reverence for human connections, teaching deep mindfulness in every encounter.',
    heritageTitleKo: '인연 수필 문학 해설과 핵심 어휘 (Inyeon Essay Terms & Words)',
    heritageDescKo: '수필의 서정성, 인연의 미학, 관조적 태도 등 한국 에세이와 수필 문학을 음미하는 정갈한 어휘입니다.',
    keyVocabulary: [
      { ko: '현대수필 (現代隨筆)', en: 'modern personal essay / lyric prose', tip: '문학 갈래' },
      { ko: '인연 (因緣)', en: 'karmic connection / fateful human bond', tip: '핵심 주제' },
      { ko: '옷깃만 스쳐도 인연', en: 'even brushing sleeves creates a destiny', tip: '한국적 세계관' },
      { ko: '은은한 여운', en: 'delicate, lingering emotional resonance', tip: '감상 표현' },
      { ko: '관조와 회상', en: 'contemplative serenity and fond reminiscence', tip: '수필적 태도' },
      { ko: '청초한 서정', en: 'pure, graceful lyricism', tip: '문체 특성' }
    ],
    keyIngredientsLabel: '수필 속 세 번의 만남과 상징 (Three Encounters & Motifs)',
    keyIngredients: [
      { ko: '어린 소녀 아사코와의 첫 만남', en: 'First Meeting: The Playful Little Girl in Tokyo' },
      { ko: '청순한 여대생과의 두 번째 만남', en: 'Second Meeting: The Graceful University Student' },
      { ko: '전쟁 후 초라해진 세 번째 만남', en: 'Third Meeting: Post-War Years & Bitter Disillusion' },
      { ko: '스위트피 꽃과 손수건', en: 'Sweet Pea Flowers & Parting Keepsakes' },
      { ko: '은반지와 작별', en: 'The Silver Ring of Pure Memory' },
      { ko: '"세 번째는 아니 만났어야 좋았을 것"', en: 'The Poignant Conclusion: Preserving Memory Untarnished' }
    ],
    stepsLabel: '현대수필 감상 및 문장 필사법 (Essay Reading & Penmanship Guide)',
    steps: [
      { stepLabel: 'Step 1 • 담담한 어조 음미', titleKo: '1. 화려한 수식 없이 맑고 투명한 문장의 리듬 느끼기', descEn: 'Absorb the transparent, unadorned prose rhythm that reads like soft personal conversation.' },
      { stepLabel: 'Step 2 • 만남의 시간 궤적 추적', titleKo: '2. 소년과 소녀에서 어른으로 흘러간 세월의 무상함 체감', descEn: 'Trace the passage of time across three encounters separated by decades and global war.' },
      { stepLabel: 'Step 3 • 결말의 아련한 여운', titleKo: '3. "그리워하는데도 한 번 만나고는 못 만나게 되기도 한다"', descEn: 'Reflect on the famous closing lines on the mysterious, delicate nature of human destiny.' },
      { stepLabel: 'Step 4 • 나만의 인연 필사하기', titleKo: '4. 마음에 와닿은 구절을 정성껏 노트에 필사해보기', descEn: 'Transcribe a favorite line by hand to internalize the gentle warmth of Korean essay writing.' }
    ],
    literatureExcerpt: {
      quoteKo: '"어리석은 사람은 인연을 만나도 몰라보고, 보통 사람은 인연인 줄 알면서도 놓치고, 현명한 사람은 옷깃만 스쳐도 인연을 살려낸다. 그리워하는데도 한 번 만나고는 못 만나게 되기도 하고, 일생을 못 잊으면서도 아니 만나고 살기도 한다. 아사코와 나는 세 번 만났다. 세 번째는 아니 만났어야 좋았을 것이다."',
      quoteEn: '"The foolish do not recognize destiny when it arrives; the ordinary let destiny slip away even knowing it; but the wise cherish destiny even in the briefest brush of sleeves. Sometimes we long for someone yet meet only once in a lifetime; sometimes we remember someone all our lives yet never meet again. Asako and I met three times. The third time—it would have been better had we never met."',
      authorOrSource: '금아 피천득(皮千得) 수필집 <인연(因緣)>',
      contextNoteKo: '한국인이 가장 애송하는 불후의 명수필로, 인생의 덧없음과 스쳐 지나간 인연의 순수한 아름다움을 투명하고 맑은 문체로 노래했습니다.',
      contextNoteEn: 'The crown jewel of modern Korean essay literature, reflecting on the sacred fragility of memory, time, and cherished connections.',
      literaryDevice: '관조적 어조(Contemplative Tone)와 점층적 회상(Progressive Reminiscence)'
    }
  },
  {
    id: 'lit-poetry-1',
    category: 'K-Literature',
    literatureGenre: '서정시',
    badge: '서정시 • 민족 서정시 (Lyric Poetry • National Poetry)',
    titleKo: '서정시: 윤동주 <서시(序詩)> - 한국 문학 속 정(情)과 한(恨), 부끄러움의 미학',
    titleEn: 'Lyric Poetry: Yun Dong-ju’s "Foreword" & The Poetics of Pure Conscience',
    subtitleKo: '윤동주 시인의 맑고 깊은 서정시부터 노벨문학상 수상작까지, 한국 문학을 관통하는 정(情)과 깊은 정서적 연대감을 만나봅니다.',
    subtitleEn: 'From beloved poet Yun Dong-ju to contemporary literary masters, explore deep Korean emotional concepts like Jung, Han, and moral purity.',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    imageCaption: '책이 가득한 전통 문학 도서관 (Korean Literary Study & Books)',
    commentaryHeader: 'Cultural Commentary • 정(情)과 유대감',
    commentarySub: '한국 문학의 고유 세계관',
    commentaryKo: '한국 문학 속 "정(情)"은 단순한 우정이나 사랑을 넘어 오랜 시간 함께 희로애락을 겪으며 마음 깊이 뿌리내린 인간적 유대와 끈끈한 사랑을 뜻합니다.',
    commentaryEn: 'In Korean literature, "Jung" goes beyond simple affection—it represents deep human empathy and emotional resilience born of shared history and mutual care.',
    cultureTipKo: '윤동주 시인의 <서시(序詩)> 중 "잎새에 이는 바람에도 나는 괴로워했다"는 구절은 한국인이 가장 사랑하는 명구입니다.',
    cultureTipEn: 'Tip: Reciting "I suffered even from the wind stirring the leaves" from poet Yun Dong-ju’s Foreword connects instantly with any Korean reader!',
    heritageTitleKo: '한국 문학 해설과 감상 어휘 (Literary Heritage & Words)',
    heritageDescKo: '서정시, 은유 등 문학적 개념과 감동을 나누거나 서점에서 책을 추천받을 때 활용하는 따뜻한 어휘 표현을 학습합니다.',
    keyVocabulary: [
      { ko: '서정시 / 시인', en: 'lyric poetry / poet', tip: '문학 Literature' },
      { ko: '정(情) / 한(恨)', en: 'deep human affection / long-held sorrow', tip: '정서 Concept' },
      { ko: '은유와 상징', en: 'metaphor and symbolism', tip: '문학 문법' },
      { ko: '여운이 남다', en: 'to leave a lingering emotional impression', tip: '감상 표현' },
      { ko: '이 책 추천해 주세요', en: 'Please recommend a good book', tip: '서점 표현' },
      { ko: '마음에 와닿다', en: 'to touch one’s heart deeply', tip: '감상 표현' }
    ],
    keyIngredientsLabel: '쟝르 (Genre & Classic Works)',
    keyIngredients: [
      { ko: '서시 (윤동주)', en: 'Foreword (Yun Dong-ju)' },
      { ko: '진달래꽃 (김소월)', en: 'Azaleas (Kim Sowol)' },
      { ko: '소나기 (황순원)', en: 'The Shower (Hwang Sun-won)' },
      { ko: '토지 (박경리)', en: 'Toji / The Land (Park Kyung-ni)' },
      { ko: '현대 장편소설', en: 'Contemporary Bestselling Novels' },
      { ko: '수필 / 에세이', en: 'Reflective Personal Essays' },
      { ko: '문학 잡지', en: 'Modern Literary Journals' },
      { ko: '동화 / 시집', en: 'Poetry Anthologies & Fables' }
    ],
    stepsLabel: '한국문학 감상법 (Korean Literature Appreciation Guide)',
    steps: [
      { stepLabel: 'Step 1 • 낭독하기', titleKo: '1. 천천히 소리 내어 낭독하기', descEn: 'Read the poem aloud slowly, feeling the natural rhythm and intonation of Korean sentences.' },
      { stepLabel: 'Step 2 • 어휘 탐구', titleKo: '2. 은유적 단어와 상징 의미 찾기', descEn: 'Discover beautiful metaphors and cultural symbols hidden within nature-oriented vocabulary.' },
      { stepLabel: 'Step 3 • 정서 공감', titleKo: '3. 시인의 정(情)과 심상 느끼기', descEn: 'Reflect on the emotion and resonance that the writer seeks to share with the reader.' },
      { stepLabel: 'Step 4 • 문장 기록', titleKo: '4. 마음에 드는 구절 필사하기', descEn: 'Write out your favorite line by hand in a notebook to deepen your Korean penmanship.' }
    ],
    literatureExcerpt: {
      quoteKo: '죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다. 별을 노래하는 마음으로 모든 죽어가는 것을 사랑해야지. 그리고 나한테 주어진 길을 걸어가야겠다. 오늘 밤에도 별이 바람에 스치운다.',
      quoteEn: 'Wishing not to have so much as a speck of shame toward heaven until the day I die, I suffered even from the wind stirring the leaves. With a heart singing to the stars, I must love all dying things. And I must walk the path given to me. Tonight, too, the stars are grazed by the wind.',
      authorOrSource: '윤동주(尹東柱) 유고시집 <하늘과 바람과 별과 시(詩)> 중 <서시(序詩)>',
      contextNoteKo: '한국인이 가장 사랑하는 민족 시인 윤동주의 대표 서정시로, 순결한 양심과 시대적 고뇌, 꺼지지 않는 희망을 노래합니다.',
      contextNoteEn: 'Korea’s most universally beloved lyric poem, embodying pure conscience, existential anguish, and unwavering hope.',
      literaryDevice: '상징(Symbolism)과 고백적 어조(Confessional Tone)'
    }
  },

  // ==========================================
  // K-MUSIC (2 items: Noraebang Karaoke & K-POP/Gugak)
  // ==========================================
  {
    id: 'music-noraebang',
    category: 'K-MUSIC',
    badge: 'Karaoke Culture • Coin Noraebang',
    titleKo: 'K-MUSIC: 한국의 노래방(Noraebang) 문화와 실전 회화 (Korean Karaoke)',
    titleEn: 'Korean Karaoke (Noraebang) Culture & Social Bonding Etiquette',
    subtitleKo: '친구·동료와 노래로 스트레스를 풀고 정을 나누는 한국인의 핵심 여가 문화, 노래방과 코인노래방(코노) 실전 표현을 익힙니다.',
    subtitleEn: 'In Korea, Noraebang is more than just karaoke—it is a central social ritual for bonding with friends and colleagues.',
    image: noraebangImage,
    imageCaption: '한국식 노래연습장과 코인노래방 (Authentic Korean Noraebang)',
    commentaryHeader: 'Cultural Commentary • 덤의 미학 "서비스 시간"',
    commentarySub: '노래방 보너스 시간 문화',
    commentaryKo: '한국 노래방에서는 마감 시간이 다가올 때 사장님이 무료로 추가 시간을 넣어주는 "서비스(Service) 시간" 문화가 있어 마지막까지 흥을 돋웁니다.',
    commentaryEn: 'In Korean Noraebang, owners frequently gift free bonus minutes called "Service time" as the timer runs low, keeping the room vibrant and happy.',
    cultureTipKo: '노래방에서는 다른 사람의 노래에 탬버린을 치거나 환호해 주고, "우선예약" 버튼을 활용하면 바로 다음 노래를 부를 수 있습니다.',
    cultureTipEn: 'Tip: Cheer for friends with a tambourine! Use "우선예약 (Priority Reserve)" on the remote to jump your song to the front of the queue.',
    heritageTitleKo: '노래방 문화해설과 실전 어휘 (Noraebang Heritage & Phrases)',
    heritageDescKo: '코노(코인노래방) 이용 방법, 예약 취소, 그리고 사장님께 보너스 시간을 정중하게 부탁하는 실용 회화 표현을 학습합니다.',
    keyVocabulary: [
      { ko: '코인노래방 (코노)', en: 'coin-operated karaoke room', tip: '여가 문화' },
      { ko: '우선예약 / 취소', en: 'priority reservation / cancel song', tip: '리모컨 버튼' },
      { ko: '서비스 시간 (보너스)', en: 'free extra bonus time', tip: '노래방 문화' },
      { ko: '애창곡', en: 'favorite go-to signature song', tip: '명사 Noun' },
      { ko: '사장님, 서비스 좀 주세요!', en: 'Owner, please give us extra time!', tip: '실전 회화' },
      { ko: '분위기 띄우다', en: 'to liven up the room’s atmosphere', tip: '관용 표현' }
    ],
    keyIngredientsLabel: '노래방 필수 아이템 (Essential Noraebang Features)',
    keyIngredients: [
      { ko: '노래방 리모컨', en: 'Song Selector Remote Control' },
      { ko: '무선 마이크', en: 'Wireless Microphones' },
      { ko: '탬버린', en: 'Tambourine for Cheering' },
      { ko: '노래번호 책자', en: 'Song Code Number Directory' },
      { ko: '우선예약 버튼', en: 'Priority Song Reserve Button' },
      { ko: '서비스 시간', en: 'Free Bonus Time Display' },
      { ko: '점수 제거 기능', en: 'Turn Off Score Grading' },
      { ko: '에코 조절기', en: 'Microphone Echo Control' }
    ],
    stepsLabel: '코인노래방 실전 4단계 활용법 (Step-by-Step Noraebang Guide)',
    steps: [
      { stepLabel: 'Step 1 • 방 입장', titleKo: '1. 빈방 들어가서 코인/카드 결제', descEn: 'Find an open room (온에어 green sign) and pay by coin, cash, or credit card.' },
      { stepLabel: 'Step 2 • 노래 검색', titleKo: '2. 리모컨으로 가수나 제목 검색', descEn: 'Search your favorite K-POP artist or title using the Korean keypad remote.' },
      { stepLabel: 'Step 3 • 예약 및 열창', titleKo: '3. 예약 누르고 신나게 부르기', descEn: 'Press 예약 (Reserve), pick up the microphone, and sing with your friends!' },
      { stepLabel: 'Step 4 • 서비스 즐기기', titleKo: '4. 보너스 서비스 시간까지 즐기기', descEn: 'Watch for surprise bonus minutes added to the clock and sing one last encore.' }
    ]
  },
  {
    id: 'music-kpop-gugak',
    category: 'K-MUSIC',
    badge: 'Global Rhythm • K-POP & Gugak',
    titleKo: 'K-MUSIC: K-POP 글로벌 트렌드와 국악의 콜라보 (K-POP & Gugak)',
    titleEn: 'K-POP Global Trends & Traditional Korean Gugak Crossovers',
    subtitleKo: '전 세계인의 마음을 사로잡은 K-POP 음악과 판소리, 가야금 등 한국 전통 국악 요소가 만들어내는 독창적 사운드 융합을 만납니다.',
    subtitleEn: 'Explore how modern K-POP production blends with traditional Korean instruments like the Gayageum and thrilling folk rhythms.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    imageCaption: '전통 국악 장단과 현대 K-POP 무대 (Traditional & Modern Beats)',
    commentaryHeader: 'Cultural Commentary • 옛것과 새것의 장단',
    commentarySub: '한국 전통 국악의 세계화',
    commentaryKo: 'K-POP 아티스트들은 종종 대취타나 사물놀이의 전통 타악기 비트를 힙합 트랩 장르에 접목하여 한국적 정체성이 담긴 강렬한 에너지를 발산합니다.',
    commentaryEn: 'K-POP artists frequently infuse traditional Daechwita and Samulnori percussion into modern beats, creating powerful sounds rooted in Korean heritage.',
    cultureTipKo: '공연장이나 국악 무대에서는 "얼쑤!", "잘한다!"와 같은 한국 전통 추임새(Cheering shout)를 넣으면 신명이 한층 더해집니다.',
    cultureTipEn: 'Tip: Call out traditional Korean cheering shouts like "얼쑤! (Eol-ssu!)" or "잘한다! (Great job!)" to connect with performers!',
    heritageTitleKo: 'K-POP·국악 문화해설과 음악 어휘 (Music Heritage & Phrases)',
    heritageDescKo: '가야금, 해금 등 전통 악기 이름과 K-POP 팬덤에서 자주 쓰이는 응원 및 음악 감상 관련 표현을 배웁니다.',
    keyVocabulary: [
      { ko: '국악 / 판소리', en: 'traditional music / epic vocal chanting', tip: '장르 Genre' },
      { ko: '장단 / 추임새', en: 'rhythmic beat / cheering shout', tip: '음악 요소' },
      { ko: '칼군무', en: 'perfectly synchronized group choreography', tip: 'K-POP' },
      { ko: '얼쑤! / 좋다!', en: 'Eolssu! / Bravo!', tip: '추임새 Shout' },
      { ko: '라이브 최고예요!', en: 'The live performance is amazing!', tip: '공연 칭찬' },
      { ko: '중독성 있다', en: 'The melody/hook is catchy and addictive', tip: '감상 표현' }
    ],
    keyIngredientsLabel: '국악 및 K-POP 악기·장단 (Traditional Instruments & Beats)',
    keyIngredients: [
      { ko: '가야금', en: '12-string Zither (Gayageum)' },
      { ko: '해금', en: '2-string Fiddle (Haegeum)' },
      { ko: '대금', en: 'Traditional Bamboo Flute' },
      { ko: '꽹과리 / 징', en: 'Traditional Gong & Metal Beat' },
      { ko: '장구 / 북', en: 'Hourglass Drum & Barrel Drum' },
      { ko: '판소리', en: 'Dramatic Vocal Chanting' },
      { ko: '대취타', en: 'Royal Marching Percussion' },
      { ko: '칼군무 안무', en: 'Synchronized Stage Dance' }
    ],
    stepsLabel: 'K-MUSIC 리듬 감상 4단계 (Step-by-Step K-MUSIC Guide)',
    steps: [
      { stepLabel: 'Step 1 • 비트 듣기', titleKo: '1. 국악 장단과 타악 비트 파악', descEn: 'Listen for traditional Korean percussion rhythms woven beneath modern basslines.' },
      { stepLabel: 'Step 2 • 악기 구별', titleKo: '2. 가야금·해금 선율 찾아내기', descEn: 'Identify the metallic twang of the Gayageum or soulful cry of the Haegeum in the track.' },
      { stepLabel: 'Step 3 • 가사 발음', titleKo: '3. 한국어 라임과 사자성어 익히기', descEn: 'Practice rap and lyrical lines that incorporate Korean idioms and poetic rhymes.' },
      { stepLabel: 'Step 4 • 추임새 외치기', titleKo: '4. 무대와 함께 "얼쑤!" 외치기', descEn: 'Join the energy by clapping to the beat and calling out traditional encouragement!' }
    ]
  },

  // ==========================================
  // K-PLAY
  // ==========================================
  {
    id: 'play-folk-1',
    category: 'K-PLAY',
    badge: 'Traditional Games • K-Drama Fun',
    titleKo: 'K-PLAY: 한국의 전통 민속놀이와 윷놀이 (Korean Folk Games & Yutnori)',
    titleEn: 'Traditional Folk Games, Yutnori Strategy & Entertainment Culture',
    subtitleKo: '설날·추석 명절마다 온 가족이 모여 멍석 위에 윷가락을 던지는 윷놀이부터 딱지치기, 제기차기 등 정겨운 한국 전통 민속놀이 문화를 체험합니다.',
    subtitleEn: 'Experience the exhilarating holiday spirit of Yutnori—tossing four wooden sticks across a straw mat, strategizing tokens, and cheering with family.',
    image: yutnoriSceneImage,
    imageCaption: '설날·추석 명절 전통 윷놀이 한마당 (Traditional Korean Yutnori Game)',
    commentaryHeader: 'Cultural Commentary • 함께 어울리는 대동(大同) 놀이',
    commentarySub: '도·개·걸·윷·모의 상징과 규칙',
    commentaryKo: '윷놀이는 부여 5부족의 가축(돼지-도, 개-개, 양-걸, 소-윷, 말-모)에서 유래한 윷가락 4개를 던져 말을 운용하는 전통 보드게임입니다. 윷이나 모가 나오면 한 번 더 던질 수 있고 상대 말을 잡거나 내 말을 업어서 함께 이동하는 치열한 두뇌 전략과 역전의 드라마가 펼쳐집니다.',
    commentaryEn: 'Yutnori is Korea’s iconic holiday board game where players toss four curved wooden sticks (Yut) onto a woven mat. Originating from ancient agricultural culture, moving tokens involves thrilling risk-taking—capturing opponent pieces, riding tokens together, and rolling bonus throws on "Yut" or "Mo".',
    cultureTipKo: '윷놀이에서 윷가락 하나에 X 표시가 된 "빽도(Back-Do)"가 나오면 말이 뒤로 한 칸 후퇴합니다. 출발점에 있던 말이 빽도를 하면 한 칸 뒤로 가서 바로 출구에 도달하는 기적의 찬스가 됩니다!',
    cultureTipEn: 'Tip: Look out for "Back-Do (빽도)"—a marked stick that moves your piece one step backward! If you hit Back-Do on your very first step, you can loop instantly into the goal on your next turn!',
    heritageTitleKo: '윷놀이 민속놀이 해설과 실전 게임 어휘 (Yutnori Heritage & Words)',
    heritageDescKo: '윷가락 점수(도·개·걸·윷·모), 말 업기, 말 잡기, 낙(Out) 규칙 및 실제 게임할 때 신나게 외치는 응원과 감탄사 표현을 학습합니다.',
    keyVocabulary: [
      { ko: '윷놀이 / 윷가락', en: 'traditional stick game / wooden Yut sticks', tip: '전통 놀이' },
      { ko: '도·개·걸·윷·모', en: '1, 2, 3, 4, 5 step scores (Pig, Dog, Sheep, Cow, Horse)', tip: '점수 규칙' },
      { ko: '빽도 (Back-Do)', en: 'move one step backward (special strategic move)', tip: '전략' },
      { ko: '말 업기 / 말 잡기', en: 'stacking own tokens / capturing opponent token', tip: '전략 액션' },
      { ko: '윷이야! / 모다!', en: 'It is Yut! / It is Mo! (Bonus throw shouts)', tip: '환호 감탄사' },
      { ko: '한 번 더 던져요!', en: 'Throw one more time! (Bonus turn)', tip: '게임 표현' }
    ],
    keyIngredientsLabel: '윷놀이 및 전통 민속놀이 구성 요소 (Yutnori Elements & Folk Games)',
    keyIngredients: [
      { ko: '윷가락 4개 (나무)', en: '4 Carved Wooden Yut Sticks' },
      { ko: '윷판 (전통 보드)', en: 'Cloth Yut Game Board (29 points)' },
      { ko: '윷말 (각 팀 4개)', en: 'Game Tokens (4 pieces per team)' },
      { ko: '멍석 / 돗자리', en: 'Woven Straw Toss Mat' },
      { ko: '딱지치기', en: 'Origami Slap Game' },
      { ko: '제기차기', en: 'Shuttlecock Foot Kicking' },
      { ko: '투호놀이', en: 'Pitch-pot Arrow Throwing' },
      { ko: '공기놀이', en: 'Five Stones Jacks Game' }
    ],
    stepsLabel: '윷놀이 실전 4단계 게임 가이드 (Step-by-Step Yutnori Guide)',
    steps: [
      { stepLabel: 'Step 1 • 팀 및 윷말 준비', titleKo: '1. 팀 나누고 윷말 4개씩 배정', descEn: 'Form two teams (e.g. Red vs. Blue) and prepare four tokens for each side at the starting gate.' },
      { stepLabel: 'Step 2 • 윷 던지기 & 점수 확인', titleKo: '2. 멍석 위로 윷을 높이 던지기', descEn: 'Toss all 4 sticks over the straw mat; count flat vs. curved faces (Do=1, Gae=2, Geol=3, Yut=4, Mo=5).' },
      { stepLabel: 'Step 3 • 전략적 말 이동 & 잡기', titleKo: '3. 지름길 타기, 말 잡기, 말 업기', descEn: 'Navigate diagonals for shortcuts. Land on opposing tokens to capture them and earn bonus throws!' },
      { stepLabel: 'Step 4 • 4개 말 전원 탈출 승리', titleKo: '4. 모든 말을 먼저 완주시키면 승리', descEn: 'Safely circle all 4 pieces through the finish line to claim ultimate holiday victory!' }
    ]
  },

  // ==========================================
  // K-ART
  // ==========================================
  {
    id: 'art-calligraphy-1',
    category: 'K-ART',
    badge: 'Korean Art • Calligraphy & Hanji',
    titleKo: 'K-ART: 한국 전통 서예와 문방사우 (Korean Traditional Calligraphy & Munbangsawoo)',
    titleEn: 'Korean Calligraphy Aesthetics, Hanji Paper & The Four Treasures of the Study',
    subtitleKo: '지·필·묵·연(문방사우)의 조화와 여백의 미, 먹의 농담으로 한글과 한자의 깊은 기품을 담아내는 한국 전통 서예 예술을 탐구합니다.',
    subtitleEn: 'Discover the profound spirit of Korean brush calligraphy (Seoye)—mastering brush strokes, ink tones on handmade Hanji paper, and the tranquility of the scholar’s study.',
    image: koreanCalligraphyImage,
    imageCaption: '선비의 기품과 여백의 미를 담은 한국 전통 서예 (Traditional Korean Calligraphy & Four Treasures of the Study)',
    commentaryHeader: 'Cultural Commentary • 먹의 농담(濃淡)과 여백의 미(美)',
    commentarySub: '붓끝에 담긴 선비의 정신과 기운생동(氣韻生動)',
    commentaryKo: '한국의 전통 서예(書藝)는 단순한 글씨 쓰기를 넘어 마음을 닦는 수양의 예술입니다. 먹을 가는 정성부터 붓끝의 필압과 속도, 닥나무로 만든 전통 한지 위에 번지는 먹의 짙고 옅음(농담)을 통해 선비의 곧은 기품과 여백의 조화로움을 완성합니다.',
    commentaryEn: 'Korean calligraphy ("서예 - Seoye") transcends writing; it is an art of spiritual cultivation. Scholars channel vitality through brush pressure, ink saturation on handcrafted Hanji mulberry paper, and the harmonious balance of empty space ("여백의 미").',
    cultureTipKo: '서예 작품을 감상하거나 직접 쓸 때, 마지막에 찍는 붉은색 도장인 "낙관(落款)"은 작가의 서명 역할을 하며 흑백의 묵향 속에 강렬한 예술적 생명력을 불어넣습니다.',
    cultureTipEn: 'Tip: The bright red cinnabar seal ("낙관 - Nakkwan") stamped upon completion serves as the master artist’s signature, bringing vibrant contrast and soul to the black-and-white ink scroll!',
    heritageTitleKo: '한국 전통 서예 해설과 문방사우 어휘 (Calligraphy Heritage & Vocab)',
    heritageDescKo: '지·필·묵·연(문방사우), 필압, 벼루, 낙관 등 전통 서예와 미술관 전시 감상에 필요한 고품격 한국어 어휘를 배웁니다.',
    keyVocabulary: [
      { ko: '서예 (書藝)', en: 'traditional Korean brush calligraphy', tip: '예술 장르' },
      { ko: '문방사우 (지·필·묵·연)', en: 'Four Treasures of the Scholar Study (Paper, Brush, Ink, Inkstone)', tip: '핵심 도구' },
      { ko: '한지 (닥종이)', en: 'traditional handmade mulberry Hanji paper', tip: '전통 종이' },
      { ko: '여백의 미(美)', en: 'beauty of white/empty space and spatial balance', tip: '핵심 미학' },
      { ko: '먹의 농담 (濃淡)', en: 'gradation and depth of ink tone (thick vs. soft)', tip: '기법 어휘' },
      { ko: '낙관 (落款)', en: 'artist’s signature red seal stamp', tip: '완성 도장' }
    ],
    keyIngredientsLabel: '문방사우와 전통 서예 도구 (Calligraphy Tools & Four Friends)',
    keyIngredients: [
      { ko: '붓 (筆 - 필)', en: 'Bamboo & Fine Hair Calligraphy Brush' },
      { ko: '먹 (墨 - 묵)', en: 'Traditional Pine/Oil Soot Ink Stick' },
      { ko: '벼루 (硯 - 연)', en: 'Hand-carved Stone Grinding Inkstone' },
      { ko: '한지 (紙 - 지)', en: 'Handmade Mulberry Hanji Paper Scroll' },
      { ko: '연적 (硯滴)', en: 'Porcelain Water Dropper for Grinding Ink' },
      { ko: '문진 (文鎭)', en: 'Paperweight to Hold Hanji Flat' },
      { ko: '붓걸이', en: 'Wooden Calligraphy Brush Stand' },
      { ko: '인주 & 낙관', en: 'Red Cinnabar Ink Paste & Artist Seal Stamp' }
    ],
    stepsLabel: '전통 서예 4단계 실전 제작 가이드 (Step-by-Step Calligraphy Guide)',
    steps: [
      { stepLabel: 'Step 1 • 문방사우 정돈', titleKo: '1. 한지와 문진으로 화폭 바르게 펴기', descEn: 'Spread soft textured Hanji paper flat on the wooden desk and secure it with paperweights.' },
      { stepLabel: 'Step 2 • 묵향 피우며 먹 갈기', titleKo: '2. 연적으로 물을 붓고 먹을 원형으로 갈기', descEn: 'Drop fresh water on the inkstone and grind the ink stick in smooth, calm circular motions.' },
      { stepLabel: 'Step 3 • 필압으로 붓글씨 쓰기', titleKo: '3. 붓을 곧게 세우고 완급 조절하며 글씨 쓰기', descEn: 'Hold the brush upright with steady posture, infusing vitality into every Hangul stroke.' },
      { stepLabel: 'Step 4 • 붉은 낙관 찍기', titleKo: '4. 서명을 마치고 모서리에 붉은 낙관 날인', descEn: 'Stamp the bright red cinnabar seal (Nakkwan) to seal your finished masterpiece.' }
    ]
  },

  // ==========================================
  // K-GAME
  // ==========================================
  {
    id: 'game-esports-1',
    category: 'K-GAME',
    badge: 'eSports Mecca • PC Bang Culture',
    titleKo: 'K-GAME: e스포츠 메카 대한민국과 PC방 문화 (eSports & PC Bang)',
    titleEn: 'South Korea eSports Mecca & High-Speed PC Bang Culture',
    subtitleKo: '세계 최고 수준의 e스포츠 대회 문화와 24시간 쾌적한 게임 및 맛있는 먹거리를 즐길 수 있는 한국의 독특한 "PC방" 문화를 알아봅니다.',
    subtitleEn: 'Explore Korea’s legendary eSports stadiums and PC Bangs—where high-speed gaming meets gourmet tableside food service.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    imageCaption: '최첨단 게이밍 PC와 화려한 PC방 시설 (Korean PC Bang Lounge)',
    commentaryHeader: 'Cultural Commentary • 게임과 미식의 결합',
    commentarySub: '한국 PC방(PC Bang)의 진화',
    commentaryKo: '한국의 PC방은 단순한 컴퓨터실이 아닌, 초고속 인터넷과 고급 게이밍 장비는 물론 라면, 핫도그, 볶음밥 등을 자리에서 주문하는 종합 엔터테인먼트 공간입니다.',
    commentaryEn: 'Korean PC Bangs combine ultra-fast optical fiber internet with digital seat-side menus offering hot gourmet ramen, iced coffee, and snacks delivered right to your desk.',
    cultureTipKo: 'PC방 좌석 모니터의 "먹거리 주문" 버튼을 누르면 자리 이동 없이 카드로 즉석에서 다양한 간식을 주문할 수 있습니다.',
    cultureTipEn: 'Tip: Click "먹거리 주문 (Order Food)" on your screen in any PC Bang to have steam-hot Korean ramen delivered straight to your chair!',
    heritageTitleKo: 'PC방 문화해설과 게임 회화 (PC Bang Heritage & Words)',
    heritageDescKo: '선불 충전 방법, 먹거리 주문, e스포츠 경기 관람 및 온라인 게임에서 자주 쓰는 긍정적인 한국어 표현을 학습합니다.',
    keyVocabulary: [
      { ko: 'PC방 / e스포츠', en: 'Korean internet cafe / eSports', tip: '여가 문화' },
      { ko: '선불 시간 충전', en: 'prepaid time top-up', tip: '이용 방법' },
      { ko: '먹거리 주문', en: 'in-seat digital food ordering', tip: 'PC방 문화' },
      { ko: '나이스 / 캐리하다', en: 'Nice play / to carry the team to victory', tip: '게임 용어' },
      { ko: '한 게임 더 해요!', en: 'Let’s play one more round!', tip: '게임 표현' },
      { ko: '자리 있나요?', en: 'Are there seats available together?', tip: 'PC방 표현' }
    ],
    keyIngredientsLabel: 'PC방 대표 먹거리 및 시설 (PC Bang Essentials & Food)',
    keyIngredients: [
      { ko: '게이밍 모니터', en: 'High-Refresh Gaming Monitor' },
      { ko: '기계식 키보드', en: 'Mechanical RGB Keyboard' },
      { ko: '끓인 라면', en: 'Freshly Cooked PC Bang Ramen' },
      { ko: '소세지 / 핫도그', en: 'Grilled Sausage & Hotdog' },
      { ko: '아이스 앗메리카노', en: 'Large Iced Americano Coffee' },
      { ko: '김치볶음밥', en: 'Kimchi Fried Rice with Egg' },
      { ko: '선불 키오스크', en: 'Self-service Payment Kiosk' },
      { ko: '헤드셋 / 마이크', en: 'Noise-canceling Gaming Headset' }
    ],
    stepsLabel: '한국 PC방 200% 즐기기 4단계 (Step-by-Step PC Bang Guide)',
    steps: [
      { stepLabel: 'Step 1 • 키오스크 충전', titleKo: '1. 입구 키오스크에서 좌석 선택 및 충전', descEn: 'Select an available seat number on the kiosk touchscreen and pay for hourly time.' },
      { stepLabel: 'Step 2 • 로그인 및 접속', titleKo: '2. 좌석 번호 찾아 로그인하고 헤드셋 착용', descEn: 'Find your computer, log in with your receipt ticket code, and put on your headset.' },
      { stepLabel: 'Step 3 • 먹거리 주문', titleKo: '3. 바탕화면 메뉴로 끓인 라면 주문하기', descEn: 'Click the Food Menu icon on your screen and order a hot bowl of ramen to your desk.' },
      { stepLabel: 'Step 4 • e스포츠 및 게임', titleKo: '4. 친구들과 함께 게임 또는 e스포츠 시청', descEn: 'Enjoy lag-free gaming with friends or watch live LCK eSports tournament broadcasts!' }
    ]
  }
];
