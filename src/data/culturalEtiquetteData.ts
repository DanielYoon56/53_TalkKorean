export interface EtiquetteRule {
  id: string;
  category: 'greeting' | 'dining' | 'social' | 'gift';
  titleKo: string;
  titleEn: string;
  badge: string;
  situation: string;
  doTextKo: string;
  doTextEn: string;
  dontTextKo: string;
  dontTextEn: string;
  keyPhraseKo: string;
  keyPhraseEn: string;
  romanized: string;
  explanation: string;
  culturalNote: string;
}

export interface EtiquetteQuiz {
  id: string;
  questionKo: string;
  questionEn: string;
  situationContext: string;
  options: {
    textKo: string;
    textEn: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export const ETIQUETTE_RULES: EtiquetteRule[] = [
  // 1. 인사 및 호칭 (Greeting & Bowing)
  {
    id: 'bowing-angles',
    category: 'greeting',
    titleKo: '상황별 인사(절)의 각도와 예절',
    titleEn: 'Bowing Hierarchy & Angle Guidelines',
    badge: '필수 기본 예절',
    situation: '어른, 직장 상사, 비즈니스 파트너, 친구를 만났을 때',
    doTextKo: '상대방의 지위와 나이에 따라 허리를 곧게 펴고 정중히 15°~45° 숙여 인사합니다.',
    doTextEn: 'Bow at 15° for light greetings, 30°~45° for elders and formal business partners.',
    dontTextKo: '주머니에 손을 넣은 채로 고개만 까딱이거나, 눈을 똑바로 치켜뜨며 인사하지 않습니다.',
    dontTextEn: 'Never bow with hands in pockets or nod casually without bending your upper body.',
    keyPhraseKo: '처음 뵙겠습니다. 잘 부탁드립니다.',
    keyPhraseEn: 'Nice to meet you for the first time. Please treat me well.',
    romanized: 'Cheoeum boepgetseumnida. Jal butakdeurimnida.',
    explanation: '한국에서는 악수를 할 때도 오른손으로 악수하며 왼손으로 오른팔이나 가슴 부위를 가볍게 받치는 것이 공경의 표현입니다.',
    culturalNote: '눈을 마주친 후 천천히 허리를 숙이고, 1~2초간 멈춘 후 일어나는 것이 가장 품격 있는 인사법입니다.'
  },
  {
    id: 'honorific-names',
    category: 'greeting',
    titleKo: '한국식 직함 및 호칭 사용법',
    titleEn: 'Proper Korean Titles & Social Address',
    badge: '관계 존중',
    situation: '직장 동료, 손윗사람, 거래처 사람을 부를 때',
    doTextKo: '이름 뒤에 "님" 또는 "직급+님"(예: 김 부장님, 팀장님)을 붙여 부릅니다.',
    doTextEn: 'Always append "-nim" or "Position + nim" (e.g., Team Leader-nim, Manager-nim).',
    dontTextKo: '자신보다 나이가 많거나 직급이 높은 사람에게 "당신"이나 직책 없이 이름만 부르지 않습니다.',
    dontTextEn: 'Never call elders or superiors by their first name alone or use the word "Dangsin" (당신).',
    keyPhraseKo: '김 과장님, 오늘 회의 자료 전달해 드렸습니다.',
    keyPhraseEn: 'Manager Kim, I have delivered today’s meeting materials.',
    romanized: 'Gim gwajang-nim, oneul hoeui jaryo jeondalhae deuryeotseumnida.',
    explanation: '"당신"은 낯선 사람과의 말다툼이나 부부 사이에서만 쓰이며, 존댓말 상대에게 직접 "당신"이라 부르면 큰 결례가 됩니다.',
    culturalNote: '식당에서는 "저기요" 또는 "사장님/이모님", 상점에서는 "사장님/직원분"이라 부르는 것이 자연스럽습니다.'
  },

  // 2. 식사 및 음주 (Dining & Drinking)
  {
    id: 'dining-elders-first',
    category: 'dining',
    titleKo: '식사 시작: 어른이 먼저 수저를 든 후',
    titleEn: 'Dining Etiquette: Elders Lift Spoons First',
    badge: '식탁 예절 No.1',
    situation: '식당이나 가정에서 어른과 함께 식사할 때',
    doTextKo: '가장 연장자가 먼저 수저를 들고 식사를 시작할 때까지 기다렸다가 수저를 듭니다.',
    doTextEn: 'Wait until the oldest person at the table picks up their spoon and begins eating.',
    dontTextKo: '어른이 앉기도 전에 먼저 숟가락을 들고 음식을 먹기 시작하지 않습니다.',
    dontTextEn: 'Do not start eating or digging into side dishes before the elders do.',
    keyPhraseKo: '맛있게 드세요! / 잘 먹겠습니다!',
    keyPhraseEn: 'Please enjoy your meal! / I will eat well (thank you for the meal)!',
    romanized: 'Mas-itge deuseyo! / Jal meokgetseumnida!',
    explanation: '식사 속도도 어른의 속도에 맞추며, 식사가 끝난 뒤에도 어른이 수저를 내려놓을 때까지 수저를 국그릇에 걸쳐두는 것이 전통 예절입니다.',
    culturalNote: '밥그릇을 손으로 들고 먹는 것은 한국에서 복이 달아난다고 여겨 식탁 위에 두고 먹습니다.'
  },
  {
    id: 'drinking-culture',
    category: 'dining',
    titleKo: '음주 예절: 두 손으로 받고 고개 돌려 마시기',
    titleEn: 'Drinking Etiquette: Two Hands & Turning Away',
    badge: '회식 & 친목 필수',
    situation: '어른, 직장 상사, 선배와 술자리를 가질 때',
    doTextKo: '술을 따르거나 받을 때 두 손으로 잔과 병을 잡고, 마실 때는 어른 반대쪽으로 고개를 살짝 돌려 입을 가리고 마십니다.',
    doTextEn: 'Pour and receive with both hands. Turn your head slightly away when drinking in front of elders.',
    dontTextKo: '한 손으로 거만하게 술을 따르거나, 어른과 눈을 똑바로 마주치며 정면으로 들이키지 않습니다.',
    dontTextEn: 'Never pour alcohol with one hand or drink directly facing the senior person.',
    keyPhraseKo: '감사합니다, 제가 한 잔 올려도 되겠습니까?',
    keyPhraseEn: 'Thank you! May I pour a drink for you as well?',
    romanized: 'Gamsahamnida, jega han jan ollyeodo doegesseumnikka?',
    explanation: '한국에서는 자신의 잔을 스스로 따르는 "자작(自酌)"보다 서로 술을 따라주는 "수작(酬酌)" 문화를 통해 유대감을 쌓습니다.',
    culturalNote: '상대방의 잔이 비어 있으면 "제가 한 잔 따라드리겠습니다"라며 정중히 채워주는 것이 센스입니다.'
  },

  // 3. 사회생활 & 배려 (Social Interactions)
  {
    id: 'two-hands-transfer',
    category: 'social',
    titleKo: '물건 건네기: 두 손으로 주고받기',
    titleEn: 'Giving & Receiving Items with Both Hands',
    badge: '정중한 태도',
    situation: '명함, 신용카드, 선물, 서류를 주고받을 때',
    doTextKo: '두 손으로 물건을 건네거나, 오른손으로 건네며 왼손으로 오른쪽 손목/팔꿈치를 가볍게 받칩니다.',
    doTextEn: 'Hand over business cards, credit cards, or gifts with both hands or supporting right forearm.',
    dontTextKo: '한 손으로 툭 던지듯 건네거나 받지 않습니다.',
    dontTextEn: 'Never throw or toss items carelessly with a single hand.',
    keyPhraseKo: '여기 있습니다. 확인 부탁드립니다.',
    keyPhraseEn: 'Here it is. Please take a look.',
    romanized: 'Yeogi itseumnida. Hwagin butakdeurimnida.',
    explanation: '편의점이나 마트에서 카드로 계산할 때도 두 손으로 카드를 건네면 상대방을 존중하는 훌륭한 매너로 칭찬받습니다.',
    culturalNote: '받은 명함은 즉시 주머니에 넣지 않고 테이블 위에 공손히 올려두고 대화에 집중합니다.'
  },

  // 4. 방문 & 선물 (Visiting & Gifts)
  {
    id: 'shoes-off-indoor',
    category: 'gift',
    titleKo: '실내 출입 시 신발 벗기 & 실내화 착용',
    titleEn: 'Taking Shoes Off Indoors & Slippers',
    badge: '주거 문화 필수',
    situation: '한국인 친구의 집, 전통 온돌 한옥, 좌식 식당에 방문할 때',
    doTextKo: '현관(신발장)에서 반드시 신발을 벗고, 신발 코를 문 쪽으로 정돈한 뒤 실내로 들어갑니다.',
    doTextEn: 'Always remove your shoes in the entryway (hyeon-gwan) and point shoe toes toward the door.',
    dontTextKo: '신발을 신은 채 방 안으로 발을 들이거나 맨발로 신발장 바닥을 밟지 않습니다.',
    dontTextEn: 'Never step onto wooden floors or tatami with outside footwear.',
    keyPhraseKo: '실례하겠습니다. 초대해 주셔서 감사합니다.',
    keyPhraseEn: 'Excuse me for entering. Thank you so much for inviting me.',
    romanized: 'Sillyehagetseumnida. Chodaehae jusyeoseo gamsahamnida.',
    explanation: '한국은 온돌 바닥에서 생활하는 입식/좌식 융합 주거 문화이므로 바닥 청결이 매우 중요합니다.',
    culturalNote: '집들이(Housewarming) 방문 시에는 "휴지(일이 술술 풀려라)"나 "세제(거품처럼 부자 되어라)"를 선물하는 전통이 있습니다.'
  }
];

export const ETIQUETTE_QUIZZES: EtiquetteQuiz[] = [
  {
    id: 'quiz-dining-1',
    questionKo: '직장 회식 자리에서 부장님이 술을 따라주실 때 가장 올바른 행동은?',
    questionEn: 'What is the most polite behavior when your Director pours you a drink at dinner?',
    situationContext: '상황: 첫 회식에서 연장자인 부장님이 소주를 권하는 순간',
    options: [
      {
        textKo: '한 손으로 잔을 든 채 편하게 받는다.',
        textEn: 'Hold the glass with one hand casually.',
        isCorrect: false,
        feedback: '한 손으로 받는 것은 윗사람에 대한 결례입니다.'
      },
      {
        textKo: '두 손으로 잔을 잡고 받고, 마실 때는 고개를 살짝 돌려 마신다.',
        textEn: 'Hold the glass with both hands and turn head away while sipping.',
        isCorrect: true,
        feedback: '정답입니다! 두 손으로 공손히 받고 고개를 돌려 마시는 것이 한국의 정통 주도(酒道)입니다.'
      },
      {
        textKo: '술을 받자마자 부장님의 눈을 똑바로 쳐다보며 원샷한다.',
        textEn: 'Make direct eye contact and drink it in one shot immediately.',
        isCorrect: false,
        feedback: '어른 앞에서 정면으로 원샷하는 것은 위협적이거나 예의에 어긋날 수 있습니다.'
      }
    ]
  },
  {
    id: 'quiz-greeting-2',
    questionKo: '비즈니스 미팅에서 처음 만난 한국 파트너에게 명함을 건넬 때 바른 매너는?',
    questionEn: 'How should you hand your business card to a Korean partner in a first meeting?',
    situationContext: '상황: 양사 첫 미팅 시작 전 명함 교환 시간',
    options: [
      {
        textKo: '두 손으로 명함의 글자가 상대방을 향하도록 공손히 건넨다.',
        textEn: 'Present the card with both hands so the text faces the recipient.',
        isCorrect: true,
        feedback: '완벽합니다! 상대방이 이름을 읽기 편한 방향으로 두 손으로 건네는 것이 비즈니스 매너입니다.'
      },
      {
        textKo: '테이블 위로 쓱 미끄러뜨려 전달한다.',
        textEn: 'Slide it across the table like a poker card.',
        isCorrect: false,
        feedback: '물건을 미끄러뜨리거나 던지는 것은 매우 무례한 행위입니다.'
      },
      {
        textKo: '받자마자 바로 뒷주머니에 찔러 넣는다.',
        textEn: 'Shove the received card into your back pocket immediately.',
        isCorrect: false,
        feedback: '상대방의 명함은 정중히 테이블 위에 올려두고 회의 내내 소중히 다루어야 합니다.'
      }
    ]
  }
];
