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
  // K-Literature
  // ==========================================
  {
    id: 'lit-poetry-1',
    category: 'K-Literature',
    badge: 'Korean Literature • Lyric Poetry',
    titleKo: 'Literature & Poetry: 한국 문학 속 정(情)과 한(恨)의 미학 (Korean Poetry)',
    titleEn: 'Korean Lyric Poetry & World Bestsellers: Emotions of Jung & Han',
    subtitleKo: '윤동주 시인의 맑고 깊은 서정시부터 노벨문학상 수상작까지, 한국 문학을 관통하는 정(情)과 깊은 정서적 연대감을 만나봅니다.',
    subtitleEn: 'From beloved poet Yun Dong-ju to contemporary literary award winners, explore deep Korean emotional concepts like Jung and Han.',
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
    ]
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
