export interface ThreeCRChallenge {
  goalKo: string;
  goalEn: string;
  contextKo: string;
  contextEn: string;
  difficultyTag?: string;
}

export interface ThreeCRConsequence {
  outcomeKo: string;
  outcomeEn: string;
  reactionMood: 'positive' | 'neutral' | 'curious' | 'surprised' | 'impressed' | 'cautious';
  impactTagKo: string;
}

export interface ThreeCRReflection {
  nuanceAnalysisKo: string;
  grammarPatternKo: string;
  culturalEtiquetteKo: string;
  nativeAlternativeKo?: string;
}

export interface DialogueChoice {
  id: string;
  textKo: string;
  romanized: string;
  textEn: string;
  nuanceTip?: string;
  intentTag?: string;
  strategyTag?: '정중·표준형' | '신속·직설형' | '우회·질문형' | '친근·스몰토크형' | '신중·확인형' | string;
  formality?: '존경어/격식체' | '정중 해요체' | '친근 구어체' | string;
  nextNodeId: string;
  consequencePreviewKo?: string;
}

export interface DialogueEnding {
  status: 'success' | 'perfect' | 'alt-ending';
  badgeKo: string;
  badgeEn: string;
  xpEarned: number;
  feedbackKo: string;
  feedbackEn: string;
  keyPoints: string[];
  grammarNotes: { title: string; desc: string }[];
  threeCRSummary?: {
    totalChallengesResolved: number;
    bestStrategy: string;
    keyLearningPoint: string;
  };
}

export interface DialogueNode {
  id: string;
  stepIndex: number;
  totalSteps: number;
  speakerRoleKo: string;
  speakerRoleEn: string;
  speakerAvatar?: string;
  aiMessageKo: string;
  aiMessageRomanized: string;
  aiMessageEn: string;
  sceneNote?: string;
  sceneNoteKo?: string;
  challenge?: ThreeCRChallenge;
  consequence?: ThreeCRConsequence;
  reflection?: ThreeCRReflection;
  choices: DialogueChoice[];
  isEnding?: boolean;
  endingSummary?: DialogueEnding;
}

export interface BranchingScenario {
  id: string;
  titleKo: string;
  titleEn: string;
  badge: string;
  category: 'travel' | 'lifestyle' | 'food' | 'social';
  difficulty: 'Beginner' | 'Elementary' | 'Intermediate';
  roleKo: string;
  roleEn: string;
  settingKo: string;
  settingEn: string;
  image: string;
  keyVocab: { ko: string; en: string; pronunciation: string }[];
  rootNodeId: string;
  nodes: Record<string, DialogueNode>;
}

export const BRANCHING_SCENARIOS: BranchingScenario[] = [
  // 1. TAXI SCENARIO
  {
    id: 'taxi',
    titleKo: '🚕 서울 택시 타고 목적지 가기',
    titleEn: 'Taking a Taxi in Seoul',
    badge: 'Travel & Mobility',
    category: 'travel',
    difficulty: 'Beginner',
    roleKo: '택시 기사님 (AI) vs 승객 (회원님)',
    roleEn: 'Taxi Driver (AI) vs Passenger (You)',
    settingKo: '저녁 무렵 서울역 1번 출구 택시 승강장에서 택시에 탑승했습니다. 기사님에게 목적지를 말하고 최적 경로와 결제를 진행해 보세요.',
    settingEn: 'You just hailed a taxi near Seoul Station. Tell the driver your destination, choose the route, and pay smoothly.',
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=600&q=80',
    keyVocab: [
      { ko: '어디로 모실까요?', en: 'Where can I take you?', pronunciation: 'eodiro mosilkkayo?' },
      { ko: '강남역 4번 출구', en: 'Gangnam Station Exit 4', pronunciation: 'gangnam-yeok sabeon chulgu' },
      { ko: '차가 밀리다', en: 'Traffic is heavy', pronunciation: 'chaga millida' },
      { ko: '영수증 주세요', en: 'Please give me the receipt', pronunciation: 'yeongsujeung juseyo' }
    ],
    rootNodeId: 'taxi_root',
    nodes: {
      taxi_root: {
        id: 'taxi_root',
        stepIndex: 1,
        totalSteps: 4,
        speakerRoleKo: '택시 기사님',
        speakerRoleEn: 'Taxi Driver',
        aiMessageKo: '어서 오세요! 손님 어디로 모실까요?',
        aiMessageRomanized: 'Eoseo oseyo! Sonnim eodiro mosilkkayo?',
        aiMessageEn: 'Welcome! Where can I take you, passenger?',
        sceneNoteKo: '기사님이 미터기를 켜며 백미러로 목적지를 묻습니다.',
        sceneNote: 'The driver turns on the meter and politely asks for your destination.',
        choices: [
          {
            id: 'c_taxi_gangnam',
            textKo: '강남역 4번 출구 쪽으로 가주세요.',
            romanized: 'Gangnam-yeok sa-beon chulgu jjog-euro gajuseyo.',
            textEn: 'Please go toward Gangnam Station Exit 4.',
            nuanceTip: '목적지 + "(으)로 가주세요"는 가장 명확하고 정중한 한국 택시 탑승 표현입니다.',
            intentTag: '강남역 행',
            nextNodeId: 'taxi_gangnam_route'
          },
          {
            id: 'c_taxi_seoul_rush',
            textKo: '서울역 KTX 타는 곳으로 가주세요. 기차 시간이 촉박해서요.',
            romanized: 'Seoul-yeok KTX taneun gos-euro gajuseyo. Gicha sigan-i chokbakhaeseoyo.',
            textEn: 'Please go to the Seoul Station KTX boarding area. My train time is tight.',
            nuanceTip: '"촉박해서요"를 덧붙여 기사님에게 신속한 이동이 필요함을 자연스럽게 알립니다.',
            intentTag: '서울역 급행',
            nextNodeId: 'taxi_rush_route'
          },
          {
            id: 'c_taxi_hongdae',
            textKo: '홍대입구역 9번 출구 앞이요. 지금 가면 얼마나 걸릴까요?',
            romanized: 'Hongdae-ipgu-yeok gu-beon chulgu apiyo. Jigeum gamyeon eolmana geollilkkayo?',
            textEn: 'In front of Hongik Univ. Station Exit 9. How long will it take right now?',
            nuanceTip: '"얼마나 걸릴까요?"로 예상 소요 시간을 묻는 자연스러운 회화입니다.',
            intentTag: '홍대입구역 행',
            nextNodeId: 'taxi_hongdae_route'
          }
        ]
      },

      // Branch 1: Gangnam
      taxi_gangnam_route: {
        id: 'taxi_gangnam_route',
        stepIndex: 2,
        totalSteps: 4,
        speakerRoleKo: '택시 기사님',
        speakerRoleEn: 'Taxi Driver',
        aiMessageKo: '네, 강남역으로 가겠습니다. 지금 올림픽대로가 조금 막히는데, 강변북로로 우회해서 갈까요?',
        aiMessageRomanized: 'Ne, Gangnam-yeok-euro gagesseumnida. Jigeum Ollimpik-daeroga jogeum makinneunde, Gangbyeon-bungno-ro uhoehaeseo galkkayo?',
        aiMessageEn: 'Sure, heading to Gangnam Station. Olympic Boulevard is a bit crowded now. Shall we detour via Gangbyeon Northern Expressway?',
        sceneNoteKo: '기사님이 실시간 교통상황 내비게이션을 확인하며 우회 여부를 제안합니다.',
        sceneNote: 'The driver checks live traffic and proposes an alternate expressway route.',
        choices: [
          {
            id: 'c_taxi_fast',
            textKo: '네, 기사님 편하신 빠른 길로 우회해 주세요.',
            romanized: 'Ne, gisa-nim pyeonhasin ppareun gil-lo uhoehae juseyo.',
            textEn: 'Yes, please take whichever faster detour route you prefer, driver.',
            nuanceTip: '기사님의 도로 전문성을 존중하며 빠른 길을 부탁하는 원어민스러운 뉘앙스입니다.',
            intentTag: '빠른 우회로',
            nextNodeId: 'taxi_drive_flow'
          },
          {
            id: 'c_taxi_navi',
            textKo: '내비게이션 추천 경로대로 안내받아 가주세요.',
            romanized: 'Naebigeisyeon chucheon gyeongro-daero annaebada gajuseyo.',
            textEn: 'Please just follow the GPS navigation recommended route.',
            nuanceTip: '정석대로 내비게이션 경로를 따르도록 요청하는 명확한 표현입니다.',
            intentTag: '내비게이션 추천',
            nextNodeId: 'taxi_drive_flow'
          }
        ]
      },

      // Branch 2: Rush
      taxi_rush_route: {
        id: 'taxi_rush_route',
        stepIndex: 2,
        totalSteps: 4,
        speakerRoleKo: '택시 기사님',
        speakerRoleEn: 'Taxi Driver',
        aiMessageKo: '기차 시간이 급하시군요! 그럼 신호 덜 걸리는 도시고속도로 쪽으로 최대한 안 밀리게 모셔다 드릴게요.',
        aiMessageRomanized: 'Gicha sigan-i geuphasigun-yo! Geureom sinho deol geollineun dosigoseokdoro jjok-euro choedaehan an millige mosyeoda deurilgeyo.',
        aiMessageEn: 'You must be in a rush for your train! I will take the urban expressway with fewer traffic lights to avoid congestion.',
        sceneNoteKo: '기사님이 신속하게 차선을 변경하며 안전 운행을 시작합니다.',
        sceneNote: 'The driver efficiently maneuvers onto the fastest path.',
        choices: [
          {
            id: 'c_taxi_rush_thanks',
            textKo: '정말 감사합니다! 15분 안에 도착할 수 있을까요?',
            romanized: 'Jeongmal gamsahamnida! Sibobo-bun an-e dochakhal su isseulkkayo?',
            textEn: 'Thank you so much! Will we be able to arrive within 15 minutes?',
            nuanceTip: '감사와 함께 구체적인 시간(15분 안)을 확인하는 자연스러운 표현입니다.',
            intentTag: '시간 재확인',
            nextNodeId: 'taxi_drive_flow'
          },
          {
            id: 'c_taxi_rush_safe',
            textKo: '빠르면 좋지만 안전 운전 부탁드립니다!',
            romanized: 'Ppareumyeon jochiman anjeon unjeon butakdeurimnida!',
            textEn: 'Speed is good, but please drive safely as well!',
            nuanceTip: '서두르면서도 안전을 챙기는 배려 깊은 한국어 표현입니다.',
            intentTag: '안전운전 요청',
            nextNodeId: 'taxi_drive_flow'
          }
        ]
      },

      // Branch 3: Hongdae
      taxi_hongdae_route: {
        id: 'taxi_hongdae_route',
        stepIndex: 2,
        totalSteps: 4,
        speakerRoleKo: '택시 기사님',
        speakerRoleEn: 'Taxi Driver',
        aiMessageKo: '홍대입구역이요? 지금 시간대면 한 20분 정도 걸리겠네요. 차 안 온도나 에어컨은 괜찮으세요?',
        aiMessageRomanized: 'Hongdae-ipgu-yeok-iyo? Jigeum sigandaemyeon han isip-bun jeongdo geolligenneyo. Cha an ondona eeokeon-eun gwaenchanheuseyo?',
        aiMessageEn: 'Hongik Univ. Station? Around this time, it should take about 20 minutes. Is the temperature/AC comfortable for you?',
        sceneNoteKo: '기사님이 예상 시간과 함께 차내 쾌적도를 체크해 줍니다.',
        sceneNote: 'The driver informs you of the duration and asks if the car climate is fine.',
        choices: [
          {
            id: 'c_taxi_temp_good',
            textKo: '네, 실내 온도 딱 좋습니다. 편하게 가주세요.',
            romanized: 'Ne, silnae ondo ttak joseumnida. Pyeonhage gajuseyo.',
            textEn: 'Yes, the indoor temperature is perfect. Please proceed comfortably.',
            nuanceTip: '"딱 좋습니다"는 "아주 적당하다"는 뉘앙스의 자연스러운 구어체입니다.',
            intentTag: '온도 적당',
            nextNodeId: 'taxi_drive_flow'
          },
          {
            id: 'c_taxi_temp_adjust',
            textKo: '조금 쌀쌀한데 바람을 조금만 줄여주실 수 있나요?',
            romanized: 'Jogeum ssalssalhande baram-eul jogeumman juryeojusil su 있nayo?',
            textEn: 'It feels a bit chilly, could you lower the airflow just a bit?',
            nuanceTip: '정중하게 차량 상태 조절을 요청하는 완곡한 부탁 표현입니다.',
            intentTag: '에어컨 조절',
            nextNodeId: 'taxi_drive_flow'
          }
        ]
      },

      // Mid step: Arrival & Payment
      taxi_drive_flow: {
        id: 'taxi_drive_flow',
        stepIndex: 3,
        totalSteps: 4,
        speakerRoleKo: '택시 기사님',
        speakerRoleEn: 'Taxi Driver',
        aiMessageKo: '손님, 목적지 근처에 다 도착했습니다. 어디 앞에 세워드릴까요? 요금은 13,800원 나왔습니다.',
        aiMessageRomanized: 'Sonnim, mokjeokji geuncheo-e da dochakhaesseumnida. Eodi ape seowodeurilkkayo? Yogeum-eun man samcheon palbaek-won nawasseumnida.',
        aiMessageEn: 'Passenger, we have almost arrived near your destination. Where in front should I pull over? The fare came out to 13,800 KRW.',
        sceneNoteKo: '택시가 목적지 골목에 접근하며 비상등을 켜고 정차 위치를 확인합니다.',
        sceneNote: 'The taxi slows down near the destination and asks where exactly to drop off.',
        choices: [
          {
            id: 'c_taxi_card_receipt',
            textKo: '저기 지하철 입구 앞에 세워주세요. 신용카드로 결제하고 영수증도 부탁드립니다.',
            romanized: 'Jeogi jihacheol ipgu ape seowojuseyo. Sinyongkadeu-ro gyeolje-hago yeongsujeung-do butakdeurimnida.',
            textEn: 'Please drop me in front of the subway entrance over there. I will pay by credit card and please provide a receipt.',
            nuanceTip: '정차 위치 + 결제 수단 + 영수증 요구를 한 번에 유창하게 전달하는 표준 문장입니다.',
            intentTag: '카드 + 영수증',
            nextNodeId: 'taxi_end_card'
          },
          {
            id: 'c_taxi_tmoney',
            textKo: '신호등 건너편에서 내려주세요. 교통카드(티머니) 태그할게요.',
            romanized: 'Sinhodeung geonneopyeon-eseo naeryeojuseyo. Gyotongkadeu(T-money) taegeuhalgeyo.',
            textEn: 'Please let me off across the traffic light. I will tap my T-money transportation card.',
            nuanceTip: '한국 택시는 교통카드 단말기 접촉(태그) 결제가 완벽히 지원됩니다.',
            intentTag: '티머니 결제',
            nextNodeId: 'taxi_end_tmoney'
          },
          {
            id: 'c_taxi_cash',
            textKo: '편하신 곳에 세워주세요. 현금 2만 원 드릴게요. 거스름돈 주세요.',
            romanized: 'Pyeonhasin gos-e seowojuseyo. Hyeongeum iman-won deurilgeyo. Geoseureumdon juseyo.',
            textEn: 'Please stop wherever is convenient for you. Here is 20,000 KRW cash. Please give me change.',
            nuanceTip: '현금 지불 및 거스름돈 요청을 자연스럽게 전달합니다.',
            intentTag: '현금 결제',
            nextNodeId: 'taxi_end_cash'
          }
        ]
      },

      // Endings
      taxi_end_card: {
        id: 'taxi_end_card',
        stepIndex: 4,
        totalSteps: 4,
        speakerRoleKo: '택시 기사님',
        speakerRoleEn: 'Taxi Driver',
        aiMessageKo: '네! 결제 승인 완료되었고, 여기 영수증입니다. 내리실 때 폰이나 소지품 빠진 거 없는지 확인하시고요. 좋은 하루 보내세요!',
        aiMessageRomanized: 'Ne! Gyeolje seung-in wanryo-doe-eotgo, yeogi yeongsujeung-imnida. Naerisil ttae pon-ina sojipum ppajin geo eomneunji hwaginhasi-goyo. Joeun haru bonaeseyo!',
        aiMessageEn: 'Yes! Payment approved, and here is your receipt. Please check that you have not left behind your phone or belongings. Have a wonderful day!',
        sceneNoteKo: '기사님이 영수증을 건네며 환하게 인사합니다.',
        sceneNote: 'The driver hands over the receipt and wishes you a great day.',
        choices: [],
        isEnding: true,
        endingSummary: {
          status: 'perfect',
          badgeKo: '🚕 서울 택시 마스터 (Seoul Taxi Master)',
          badgeEn: 'Seoul Taxi Master',
          xpEarned: 50,
          feedbackKo: '목적지 설명부터 우회 경로 판단, 카드 결제 및 영수증 요청까지 100% 원어민 수준으로 완수하셨습니다!',
          feedbackEn: 'Flawlessly navigated from specifying destinations to deciding routes, card payment, and receipt handling!',
          keyPoints: [
            '~로 가주세요 (Clear destination instruction)',
            '우회 경로 합의 (Route coordination with driver)',
            '신용카드 결제 및 영수증 발급 (Payment & receipt etiquette)'
          ],
          grammarNotes: [
            { title: '(으)로 가주세요', desc: '방향/목적지를 지정할 때 받침 여부에 따라 "로/으로"를 붙입니다.' },
            { title: '~에 세워주세요', desc: '구체적인 하차 장소(입구 앞, 건너편) 뒤에 붙여 하차를 요청합니다.' }
          ]
        }
      },

      taxi_end_tmoney: {
        id: 'taxi_end_tmoney',
        stepIndex: 4,
        totalSteps: 4,
        speakerRoleKo: '택시 기사님',
        speakerRoleEn: 'Taxi Driver',
        aiMessageKo: '네, 단말기에 삑- 태그 잘 되었습니다! 짐 잊지 말고 챙겨서 조심히 들어가세요!',
        aiMessageRomanized: 'Ne, danmalgi-e ppik- taegeu jal doe-eosseumnida! Jim itji malgo chaenggyeoseo josimhi deureogaseyo!',
        aiMessageEn: 'Yes, the T-money card beeped successfully on the terminal! Make sure not to forget your luggage and take care!',
        sceneNoteKo: '단말기에 승인 신호음이 울리고 문이 열립니다.',
        sceneNote: 'The card reader beeps successfully and the transaction completes.',
        choices: [],
        isEnding: true,
        endingSummary: {
          status: 'success',
          badgeKo: '💳 스마트 교통카드 결제러',
          badgeEn: 'Smart T-Money Commuter',
          xpEarned: 45,
          feedbackKo: '대중교통 티머니를 이용해 택시에서 스마트하고 신속하게 결제를 완료했습니다.',
          feedbackEn: 'Successfully utilized T-money transit card to pay swiftly in a Korean taxi.',
          keyPoints: ['교통카드 태그 결제 (T-money tap payment)', '하차 위치 지정 (Drop-off specification)'],
          grammarNotes: [
            { title: '~건너편에서 내려주세요', desc: '반대편 차선이나 건너편에서 하차하고 싶을 때 유용한 표현입니다.' }
          ]
        }
      },

      taxi_end_cash: {
        id: 'taxi_end_cash',
        stepIndex: 4,
        totalSteps: 4,
        speakerRoleKo: '택시 기사님',
        speakerRoleEn: 'Taxi Driver',
        aiMessageKo: '네, 2만 원 받았습니다. 6,200원 거스름돈 여기 있습니다. 안녕히 가세요!',
        aiMessageRomanized: 'Ne, iman-won badasseumnida. Yukcheon ibaek-won geoseureumdon yeogi isseumnida. Annyeonghi gaseyo!',
        aiMessageEn: 'Yes, received 20,000 KRW. Here is 6,200 KRW in change. Goodbye!',
        sceneNoteKo: '기사님이 잔돈을 정확하게 세어서 건네줍니다.',
        sceneNote: 'The driver counts the change and hands it over safely.',
        choices: [],
        isEnding: true,
        endingSummary: {
          status: 'success',
          badgeKo: '💵 현금 계산 완수',
          badgeEn: 'Cash Payment Completion',
          xpEarned: 40,
          feedbackKo: '현금 지불 및 거스름돈 수령을 정중하고 깔끔하게 마쳤습니다.',
          feedbackEn: 'Politely and accurately paid cash and received correct change.',
          keyPoints: ['금액 제시 (Stating cash amount)', '거스름돈 수령 (Receiving change)'],
          grammarNotes: [
            { title: '~드릴게요', desc: '상대방에게 물건/돈을 건넬 때 자신을 낮추고 공손히 주는 표현입니다.' }
          ]
        }
      }
    }
  },

  // 2. CONVENIENCE STORE SCENARIO
  {
    id: 'convenience',
    titleKo: '🏪 편의점 계산 및 행사·봉투 요청',
    titleEn: 'Convenience Store Checkout & Promo',
    badge: 'Daily Essentials',
    category: 'lifestyle',
    difficulty: 'Beginner',
    roleKo: '편의점 직원 (AI) vs 손님 (회원님)',
    roleEn: 'Convenience Store Staff (AI) vs Customer (You)',
    settingKo: '서울 GS25 편의점 계산대 앞입니다. 음료와 삼각김밥을 계산하며 봉투 구매 여부, 2+1 행사, 통신사 포인트 적립을 처리해 보세요.',
    settingEn: 'At a GS25 counter in Seoul. Answer questions about plastic bags, 2+1 promotions, and telecom discount points.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    keyVocab: [
      { ko: '봉투 필요하신가요?', en: 'Do you need a bag?', pronunciation: 'bongtu piryohasingayo?' },
      { ko: '2+1 행사 상품', en: 'Buy 2 Get 1 Free item', pronunciation: 'i peulleoseu il haengsa sangpum' },
      { ko: '통신사 할인', en: 'Telecom membership discount', pronunciation: 'tongsin-sa harin' },
      { ko: '영수증 버려주세요', en: 'Please discard the receipt', pronunciation: 'yeongsujeung beoryeojuseyo' }
    ],
    rootNodeId: 'cvs_root',
    nodes: {
      cvs_root: {
        id: 'cvs_root',
        stepIndex: 1,
        totalSteps: 4,
        speakerRoleKo: '편의점 직원',
        speakerRoleEn: 'Cashier Staff',
        aiMessageKo: '어서 오세요! 바코드 찍어드릴게요. 담아가실 봉투 필요하신가요?',
        aiMessageRomanized: 'Eoseo oseyo! Bakodeu jjigeodeurilgeyo. Dam-agasin bongtu piryohasingayo?',
        aiMessageEn: 'Welcome! I will scan the barcodes. Do you need a bag to carry your items in?',
        sceneNoteKo: '직원이 스캐너로 상품 바코드를 찍으며 봉투 구매를 확인합니다.',
        sceneNote: 'The cashier scans items and asks if you require a paid shopping bag.',
        choices: [
          {
            id: 'c_cvs_bag_yes',
            textKo: '네, 일반 종량제 봉투(쓰레기봉투) 10리터 하나 같이 결제해 주세요.',
            romanized: 'Ne, ilban jongryangje bongtu(sseuregi-bongtu) sim-liteo hana gati gyeoljehae juseyo.',
            textEn: 'Yes, please add a 10-liter standard waste disposal bag to the purchase.',
            nuanceTip: '한국 편의점에서는 일반 비닐 대신 실생활 쓰레기 배출이 가능한 "종량제 봉투" 구매가 매우 흔합니다.',
            intentTag: '종량제 봉투 요청',
            nextNodeId: 'cvs_promo_check'
          },
          {
            id: 'c_cvs_bag_small',
            textKo: '네, 100원짜리 작은 손잡이 비닐봉투 하나만 주세요.',
            romanized: 'Ne, baek-won-jjari jageun sonjabi binil-bongtu hanaman juseyo.',
            textEn: 'Yes, just one small 100-KRW plastic bag with handles please.',
            nuanceTip: '간단한 물건을 담을 때 100원 봉투를 명확하게 요구하는 표현입니다.',
            intentTag: '일반 비닐봉투',
            nextNodeId: 'cvs_promo_check'
          },
          {
            id: 'c_cvs_bag_no',
            textKo: '아니요, 가방이 있어서 봉투는 괜찮습니다.',
            romanized: 'Aniyo, gabang-i isseoseo bongtu-neun gwaenchanhseumnida.',
            textEn: 'No thank you, I have a backpack so a bag is not needed.',
            nuanceTip: '"~는 괜찮습니다"는 한국에서 부담 없이 정중하게 거절하는 표준 매너 표현입니다.',
            intentTag: '봉투 거절 (에코)',
            nextNodeId: 'cvs_promo_check'
          }
        ]
      },

      // Step 2: 2+1 Promotion Alert
      cvs_promo_check: {
        id: 'cvs_promo_check',
        stepIndex: 2,
        totalSteps: 4,
        speakerRoleKo: '편의점 직원',
        speakerRoleEn: 'Cashier Staff',
        aiMessageKo: '네 알겠습니다. 손님, 고르신 이 바나나우유가 지금 "2+1 행사" 상품인데, 하나 더 안 가져오시나요?',
        aiMessageRomanized: 'Ne algesseumnida. Sonnim, goreusin i banana-uyu-ga jigeum "i peulleoseu il haengsa" sangpum-inde, hana deo an gajyeo-osinayo?',
        aiMessageEn: 'Got it. Customer, this banana milk you picked is currently on a "Buy 2 Get 1 Free" promo. Would you like to grab one more?',
        sceneNoteKo: '직원이 행사 팝업 알림을 보고 친절하게 추가 증정 혜택을 알려줍니다.',
        sceneNote: 'The cashier notices the 2+1 promotion tag on the POS display.',
        choices: [
          {
            id: 'c_cvs_promo_bring',
            textKo: '아, 몰랐네요! 얼른 냉장고에서 하나 더 가져올게요. 잠시만요!',
            romanized: 'A, mollanneyo! Eolleun naengjanggo-eseo hana deo gajyeo-olgeyo. Jamsimanyo!',
            textEn: 'Oh, I did not know! I will quickly grab one more from the fridge. Just a moment!',
            nuanceTip: '행사 혜택을 챙기기 위해 신속하게 양해를 구하는 실생활 구어 표현입니다.',
            intentTag: '추가 상품 가져오기',
            nextNodeId: 'cvs_payment_choice'
          },
          {
            id: 'c_cvs_promo_skip',
            textKo: '알려주셔서 감사한데, 들고 가기 무거워서 그냥 2개만 살게요.',
            romanized: 'Alryeojusyeoseo gamsahande, deulgo gagi mugeowoseo geunyang du-gaeman salgeyo.',
            textEn: 'Thank you for letting me know, but it is heavy to carry so I will just purchase two.',
            nuanceTip: '감사 인사와 함께 불필요한 증정을 스마트하게 사양하는 표현입니다.',
            intentTag: '증정 사양',
            nextNodeId: 'cvs_payment_choice'
          }
        ]
      },

      // Step 3: Membership & Payment method
      cvs_payment_choice: {
        id: 'cvs_payment_choice',
        stepIndex: 3,
        totalSteps: 4,
        speakerRoleKo: '편의점 직원',
        speakerRoleEn: 'Cashier Staff',
        aiMessageKo: '네, 계산 도와드릴게요. 총 4,800원입니다. 통신사 멤버십 할인이나 포인트 적립 있으신가요?',
        aiMessageRomanized: 'Ne, gyesan dowadeurilgeyo. Chong sabeak palbaek-won-imnida. Tongsin-sa meombeosip harin-ina pointeu jeongnip isseusingayo?',
        aiMessageEn: 'Alright, let us proceed with the checkout. Total is 4,800 KRW. Do you have any telecom membership discount or reward points?',
        sceneNoteKo: '단말기에 최종 금액이 뜨고 바코드 리더기를 대기합니다.',
        sceneNote: 'The total appears on the screen and the cashier waits for payment.',
        choices: [
          {
            id: 'c_cvs_telco_apple',
            textKo: '네, 통신사 바코드 여기 있어요. 할인이랑 애플페이로 결제할게요.',
            romanized: 'Ne, tongsin-sa bakodeu yeogi isseoyo. Harin-irang Epeul-pei-ro gyeoljehalgeyo.',
            textEn: 'Yes, here is my telecom barcode. Please apply the discount and I will pay with Apple Pay.',
            nuanceTip: '통신사 할인(KT/SKT/LG)을 제시하고 간편결제를 요청하는 고급 회화입니다.',
            intentTag: '통신사할인 + 간편결제',
            nextNodeId: 'cvs_end_success'
          },
          {
            id: 'c_cvs_card_receipt_trash',
            textKo: '포인트는 없고 신용카드로 할게요. 영수증은 버려주셔도 돼요.',
            romanized: 'Pointeu-neun eopgo sinyongkadeu-ro halgeyo. Yeongsujeung-eun beoryeojusyeodo dwaeyo.',
            textEn: 'No points, I will pay with a credit card. You can discard the receipt.',
            nuanceTip: '"영수증은 버려주셔도 돼요"는 한국 편의점에서 계산을 신속하게 끝낼 때 가장 많이 쓰는 문장입니다.',
            intentTag: '카드 + 영수증 미발급',
            nextNodeId: 'cvs_end_fast'
          },
          {
            id: 'c_cvs_kakao_pay',
            textKo: '카카오페이 QR코드 찍어주세요!',
            romanized: 'Kakao-pei QR-kodeu jjigeojuseyo!',
            textEn: 'Please scan my Kakao Pay QR code!',
            nuanceTip: '한국의 대표 모바일 간편결제(카카오페이/네이버페이) 결제 요청 표현입니다.',
            intentTag: '카카오페이 QR',
            nextNodeId: 'cvs_end_success'
          }
        ]
      },

      // Endings
      cvs_end_success: {
        id: 'cvs_end_success',
        stepIndex: 4,
        totalSteps: 4,
        speakerRoleKo: '편의점 직원',
        speakerRoleEn: 'Cashier Staff',
        aiMessageKo: '할인 480원 적용되어서 4,320원 결제 완료되었습니다! 구매하신 물품 봉투에 잘 담아드렸습니다. 안녕히 가세요!',
        aiMessageRomanized: 'Harin sa-baek palsip-won jeok-yong-doe-eoseo sa-cheon sam-baek i-sip-won gyeolje wanryo-doe-eosseumnida! Gumaehasin mulpum bongtu-e jal dam-adeuryeosseumnida. Annyeonghi gaseyo!',
        aiMessageEn: 'Discount of 480 KRW applied, so 4,320 KRW was paid! Your purchased items are packed nicely. Have a wonderful day!',
        sceneNoteKo: '직원이 정성스럽게 물품을 전달하고 영수증 처리를 마칩니다.',
        sceneNote: 'The items are handed over with discount applied.',
        choices: [],
        isEnding: true,
        endingSummary: {
          status: 'perfect',
          badgeKo: '🏪 한국 편의점 알뜰 마스터 (GS25 Pro)',
          badgeEn: 'Smart Korean CVS Shopper',
          xpEarned: 50,
          feedbackKo: '봉투 선택, 2+1 행사 파악, 통신사 멤버십 할인과 간편결제까지 완벽하게 소화하셨습니다!',
          feedbackEn: 'Flawlessly handled shopping bags, promotional 2+1 items, telecom discount, and mobile pay!',
          keyPoints: [
            '2+1 행사 파악 및 대처 (Taking advantage of 2+1 promotions)',
            '통신사 멤버십 할인 (Applying carrier discounts)',
            '봉투 및 간편결제 소통 (Bag preference & modern mobile payment)'
          ],
          grammarNotes: [
            { title: '2+1 (투 플러스 원)', desc: '한국 편의점에서 2개를 사면 1개를 무료 증정하는 대표적인 할인 행사입니다.' },
            { title: '~버려주셔도 돼요', desc: '불필요한 영수증을 폐기해달라고 정중히 부탁할 때 쓰는 유용한 표현입니다.' }
          ]
        }
      },

      cvs_end_fast: {
        id: 'cvs_end_fast',
        stepIndex: 4,
        totalSteps: 4,
        speakerRoleKo: '편의점 직원',
        speakerRoleEn: 'Cashier Staff',
        aiMessageKo: '네, 결제 승인되었습니다. 영수증은 폐기해 드릴게요. 또 오세요~!',
        aiMessageRomanized: 'Ne, gyeolje seung-in doe-eosseumnida. Yeongsujeung-eun pyegihae deurilgeyo. Tto oseyo~!',
        aiMessageEn: 'Yes, card payment approved. I will discard the receipt for you. Come again~!',
        sceneNoteKo: '결제 카드를 돌려받고 기분 좋게 퇴장합니다.',
        sceneNote: 'The card is returned and the quick checkout is complete.',
        choices: [],
        isEnding: true,
        endingSummary: {
          status: 'success',
          badgeKo: '⚡ 신속 정확 계산러',
          badgeEn: 'Speedy CVS Shopper',
          xpEarned: 45,
          feedbackKo: '한국인들이 가장 선호하는 빠르고 깔끔한 편의점 계산 매너를 보여주셨습니다.',
          feedbackEn: 'Exhibited smooth, polite, and rapid Korean convenience store checkout etiquette.',
          keyPoints: ['간결한 카드 결제 (Concise card payment)', '영수증 생략 (Receipt waiver)'],
          grammarNotes: [
            { title: '~는 괜찮습니다', desc: '물건이나 제안을 정중히 사양할 때 쓰는 깔끔한 존댓말입니다.' }
          ]
        }
      }
    }
  },

  // 3. CAFE SCENARIO
  {
    id: 'cafe',
    titleKo: '☕ 서울 카페에서 맞춤 음료 주문하기',
    titleEn: 'Custom Coffee Order at a Seoul Café',
    badge: 'Food & Dining',
    category: 'food',
    difficulty: 'Beginner',
    roleKo: '바리스타 (AI) vs 고객 (회원님)',
    roleEn: 'Barista (AI) vs Customer (You)',
    settingKo: '서울 홍대 거리의 테라스 카페입니다. 매장 이용 여부를 밝히고, 디카페인/얼음 양/우유 변경 등 커스텀 옵션을 넣어 주문해 보세요.',
    settingEn: 'At a trendy café in Hongdae. Choose dine-in or takeout, customize milk/ice options, and settle payment.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    keyVocab: [
      { ko: '먹고 갈게요', en: 'For here (dine in)', pronunciation: 'meokgo galgeyo' },
      { ko: '아이스 아메리카노', en: 'Iced Americano', pronunciation: 'aiseu amerikano' },
      { ko: '오트밀크로 변경', en: 'Change to oat milk', pronunciation: 'oteu-milkeu-ro byeon-gyeong' },
      { ko: '진동벨 울리면', en: 'When the buzzer rings', pronunciation: 'jindongbel ullimyeon' }
    ],
    rootNodeId: 'cafe_root',
    nodes: {
      cafe_root: {
        id: 'cafe_root',
        stepIndex: 1,
        totalSteps: 4,
        speakerRoleKo: '바리스타',
        speakerRoleEn: 'Barista',
        aiMessageKo: '어서 오세요! 주문 도와드릴게요. 매장에서 드시고 가시나요, 아니면 테이크아웃(포장)이신가요?',
        aiMessageRomanized: 'Eoseo oseyo! Jumun dowadeurilgeyo. Maejang-eseo deusigo gasinayo, animyeon teikeu-aut(pojang)isingayo?',
        aiMessageEn: 'Welcome! Can I take your order? Are you having it here in the café, or is it for takeout?',
        sceneNoteKo: '바리스타가 메뉴판을 가리키며 컵 종류 결정을 위해 매장 이용 여부를 묻습니다.',
        sceneNote: 'The barista asks about dine-in or takeout to comply with Korean reusable cup laws.',
        choices: [
          {
            id: 'c_cafe_dine_in',
            textKo: '매장에서 마시고 갈게요. 머그잔에 부탁드려요.',
            romanized: 'Maejang-eseo masigo galgeyo. Meogeujan-e butakdeuryeo-yo.',
            textEn: 'I will drink it here in the store. Please serve in a mug cup.',
            nuanceTip: '"매장에서 마시고 갈게요"는 실내 취식 시 사용하는 가장 표준적인 문장입니다.',
            intentTag: '매장 이용',
            nextNodeId: 'cafe_drink_order'
          },
          {
            id: 'c_cafe_takeout',
            textKo: '테이크아웃으로 포장해 갈게요.',
            romanized: 'Teikeu-aut-euro pojanghae galgeyo.',
            textEn: 'I will take it out to go.',
            nuanceTip: '포장 주문 시 1회용 컵 및 캐리어 제공 여부로 이어집니다.',
            intentTag: '테이크아웃',
            nextNodeId: 'cafe_drink_order'
          }
        ]
      },

      // Step 2: Drink selection
      cafe_drink_order: {
        id: 'cafe_drink_order',
        stepIndex: 2,
        totalSteps: 4,
        speakerRoleKo: '바리스타',
        speakerRoleEn: 'Barista',
        aiMessageKo: '네, 확인했습니다! 어떤 음료로 준비해 드릴까요? 원두나 우유 변경도 가능합니다.',
        aiMessageRomanized: 'Ne, hwaginhaesseumnida! Eotteon eumnyoro junbihae deurilkkayo? Wondu-na uyu byeongyeong-do ganeunghamnida.',
        aiMessageEn: 'Noted! What beverage can I prepare for you? We also offer decaf beans and milk substitutions.',
        sceneNoteKo: '다양한 원두 및 시럽 옵션이 적힌 주문 화면을 가리킵니다.',
        sceneNote: 'The barista explains available customization options.',
        choices: [
          {
            id: 'c_cafe_ice_decaf',
            textKo: '아이스 아메리카노 디카페인으로 한 잔, 얼음 많이 넣어주세요.',
            romanized: 'Aiseu amerikano dikapein-euro han jan, eoleum mani neoh-eojuseyo.',
            textEn: 'One iced Americano with decaf beans, and plenty of ice please.',
            nuanceTip: '한국의 국민 음료 "아아(아이스 아메리카노)"와 "얼음 많이" 커스텀 표현입니다.',
            intentTag: '아아 디카페인',
            nextNodeId: 'cafe_custom_dessert'
          },
          {
            id: 'c_cafe_oat_latte',
            textKo: '따뜻한 카페라떼 한 잔에 우유를 오트밀크(귀리우유)로 변경해 주세요.',
            romanized: 'Ttatteut-han kape-ratte han jan-e uyu-reul oteu-milkeu-ro byeon-gyeonghae juseyo.',
            textEn: 'One hot café latte, and please switch the milk to oat milk.',
            nuanceTip: '식물성 우유 변경 요청을 매끄럽게 전달하는 표현입니다.',
            intentTag: '오트 라떼',
            nextNodeId: 'cafe_custom_dessert'
          },
          {
            id: 'c_cafe_signature',
            textKo: '여기 시그니처 흑임자 크림라떼 하나 주세요. 덜 달게 가능한가요?',
            romanized: 'Yeogi sigeunicheo heugimja keurim-ratte hana juseyo. Deol dalge ganeunghangayo?',
            textEn: 'One signature black sesame cream latte please. Can you make it less sweet?',
            nuanceTip: '"덜 달게 가능한가요?"는 당도를 조절할 때 가장 유용한 필수 구문입니다.',
            intentTag: '시그니처 덜 달게',
            nextNodeId: 'cafe_custom_dessert'
          }
        ]
      },

      // Step 3: Dessert & payment
      cafe_custom_dessert: {
        id: 'cafe_custom_dessert',
        stepIndex: 3,
        totalSteps: 4,
        speakerRoleKo: '바리스타',
        speakerRoleEn: 'Barista',
        aiMessageKo: '네, 음료 맞춤 옵션 적용해 드렸습니다. 함께 드실 조각 케이크나 디저트도 필요하신가요? 결제는 어떻게 도와드릴까요?',
        aiMessageRomanized: 'Ne, eumnyo matchum opsyeon jeok-yonghae deuryeosseumnida. Hamkke deusin jogak keikeu-na dijeoteu-do piryohasingayo? Gyeolje-neun eotteoke dowadeurilkkayo?',
        aiMessageEn: 'Yes, customized options applied! Would you like any slice of cake or dessert to go with it? How would you like to pay?',
        sceneNoteKo: '쇼케이스에 진열된 수제 딸기 생크림 케이크를 가리킵니다.',
        sceneNote: 'The barista checks for dessert pairing and proceeds to payment.',
        choices: [
          {
            id: 'c_cafe_cake_card',
            textKo: '쇼케이스에 있는 딸기 생크림 케이크도 한 조각 추가해 주시고, 카드로 결제할게요.',
            romanized: 'Syokeiseu-e inneun ttalgi saengkeurim keikeu-do han jogak chugahae jusigo, kadeu-ro gyeoljehalgeyo.',
            textEn: 'Please add a slice of strawberry fresh cream cake from the showcase, and I will pay by card.',
            nuanceTip: '디저트 추가 주문과 카드 결제를 자연스럽게 연계한 표현입니다.',
            intentTag: '케이크 추가 + 카드',
            nextNodeId: 'cafe_end_buzzer'
          },
          {
            id: 'c_cafe_no_dessert_pay',
            textKo: '디저트는 괜찮고 음료만 삼성페이로 결제할게요!',
            romanized: 'Dijeoteu-neun gwaenchanhko eumnyo-man Samseong-pei-ro gyeoljehalgeyo!',
            textEn: 'Dessert is fine, I will just pay for the drink with Samsung Pay!',
            nuanceTip: '간결하게 음료 단독 주문을 확인하고 모바일 결제를 진행합니다.',
            intentTag: '음료 단독 결제',
            nextNodeId: 'cafe_end_buzzer'
          }
        ]
      },

      // Ending
      cafe_end_buzzer: {
        id: 'cafe_end_buzzer',
        stepIndex: 4,
        totalSteps: 4,
        speakerRoleKo: '바리스타',
        speakerRoleEn: 'Barista',
        aiMessageKo: '결제 완료되었습니다! 여기 진동벨 챙겨드릴게요. 음료 준비되면 진동벨이 울리니 픽업대에서 받아 가시면 됩니다. 맛있게 만들어 드릴게요!',
        aiMessageRomanized: 'Gyeolje wanryo-doe-eosseumnida! Yeogi jindongbel chaenggyeodeurilgeyo. Eumnyo junbidoemyeon jindongbel-i ullini pikeop-dae-eseo bada gasimyeon doemnida. Mas-itge mandeureo deurilgeyo!',
        aiMessageEn: 'Payment complete! Here is your vibration buzzer. When your drink is ready, it will vibrate, so you can pick it up at the counter. We will make it deliciously for you!',
        sceneNoteKo: '진동벨에 불빛이 깜빡이며 영수증과 함께 전달됩니다.',
        sceneNote: 'The vibrating pager is handed over alongside the receipt.',
        choices: [],
        isEnding: true,
        endingSummary: {
          status: 'perfect',
          badgeKo: '☕ 서울 카페 감성 오더 마스터',
          badgeEn: 'Seoul Café Order Master',
          xpEarned: 50,
          feedbackKo: '매장 이용 여부부터 디카페인/얼음 조절, 우유 변경 및 진동벨 픽업 프로세스까지 완벽하게 마스터하셨습니다!',
          feedbackEn: 'Mastered café dine-in policies, decaf & ice preferences, milk substitutes, and buzzer pickup workflows!',
          keyPoints: [
            '매장 이용 vs 포장 구분 (Dine-in vs takeout distinction)',
            '세부 커스터마이징 (Decaf, oat milk, less sweetness)',
            '진동벨 픽업 소통 (Buzzer pickup etiquette)'
          ],
          grammarNotes: [
            { title: '~덜 달게 해주세요', desc: '음식이나 음료의 당도를 낮추고 싶을 때 "덜 + 형용사" 구조를 사용합니다.' },
            { title: '~로 변경해 주세요', desc: '기본 재료(일반 우유, 기본 원두)를 다른 옵션으로 바꿀 때 사용하는 표현입니다.' }
          ]
        }
      }
    }
  },

  // 4. KOREAN BBQ RESTAURANT
  {
    id: 'bbq',
    titleKo: '🥩 삼겹살 식당 주문 및 반찬 추가',
    titleEn: 'Korean BBQ Restaurant Ordering',
    badge: 'K-Food & Culture',
    category: 'food',
    difficulty: 'Elementary',
    roleKo: '식당 직원 (AI) vs 손님 (회원님)',
    roleEn: 'Restaurant Staff (AI) vs Customer (You)',
    settingKo: '강남의 활기찬 삼겹살 전문 고깃집입니다. 인원수를 말하고 고기 첫 주문, 쌈 채소 및 된장찌개 추가 주문을 실전으로 진행해 보세요.',
    settingEn: 'At a bustling Samgyeopsal BBQ spot in Gangnam. Order meats for your party, ask for extra lettuce/ssamjang, and enjoy.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    keyVocab: [
      { ko: '몇 분이세요?', en: 'How many people in your party?', pronunciation: 'myeot bun-iseyo?' },
      { ko: '삼겹살 2인분', en: '2 servings of pork belly', pronunciation: 'samgyeopsal i-inbun' },
      { ko: '상추 더 주세요', en: 'Please give us more lettuce', pronunciation: 'sangchu deo juseyo' },
      { ko: '된장찌개 추가', en: 'Add soybean paste stew', pronunciation: 'doenjang-jjigae chuga' }
    ],
    rootNodeId: 'bbq_root',
    nodes: {
      bbq_root: {
        id: 'bbq_root',
        stepIndex: 1,
        totalSteps: 4,
        speakerRoleKo: '식당 직원',
        speakerRoleEn: 'Restaurant Staff',
        aiMessageKo: '어서 오세요! 몇 분이신가요? 편하신 안쪽 테이블로 안내해 드릴게요.',
        aiMessageRomanized: 'Eoseo oseyo! Myeot bun-isingayo? Pyeonhasin anjjok teibeul-ro annaehae deurilgeyo.',
        aiMessageEn: 'Welcome! How many people in your party? I will guide you to a comfortable inner table.',
        sceneNoteKo: '직원이 불판 테이블을 닦으며 인원수를 확인합니다.',
        sceneNote: 'The waiter greets you and asks for your party size.',
        choices: [
          {
            id: 'c_bbq_two_people',
            textKo: '두 명이에요. 창가 쪽 자리 앉아도 될까요?',
            romanized: 'Du myeong-ieyo. Chang-ga jjok jari anj-ado doelkkayo?',
            textEn: 'We are two people. May we sit at the window table?',
            nuanceTip: '인원수("두 명이에요")와 선호 자리 정중한 요청("앉아도 될까요?")의 모범적 조합입니다.',
            intentTag: '2명 창가석',
            nextNodeId: 'bbq_order_meat'
          },
          {
            id: 'c_bbq_four_people',
            textKo: '네 명인데 넓은 자리로 부탁드려요!',
            romanized: 'Ne myeong-inde neolbeun jari-ro butakdeuryeo-yo!',
            textEn: 'We are four people, please seat us at a spacious table!',
            nuanceTip: '단체 인원수와 넓은 자리를 명쾌하게 요청하는 표현입니다.',
            intentTag: '4명 단체석',
            nextNodeId: 'bbq_order_meat'
          }
        ]
      },

      bbq_order_meat: {
        id: 'bbq_order_meat',
        stepIndex: 2,
        totalSteps: 4,
        speakerRoleKo: '식당 직원',
        speakerRoleEn: 'Restaurant Staff',
        aiMessageKo: '네! 기본 상차림 차려드렸습니다. 저희는 숙성 생삼겹살이랑 목살이 대표 메뉴인데, 첫 주문은 2인분부터 가능합니다. 어떻게 주문하시겠어요?',
        aiMessageRomanized: 'Ne! Gibon sangcharim charyeodeuryeosseumnida. Jeohui-neun sukseong saengsamgyeopsal-irang moksal-i daepyo menyu-inde, cheot jumun-eun i-inbun-buteo ganeunghamnida. Eotteoke jumunhasigesseoyo?',
        aiMessageEn: 'Yes! Side dishes are set. Our specialties are aged pork belly and neck meat. First orders start from 2 servings. What would you like to order?',
        sceneNoteKo: '김치, 파절이, 마늘, 쌈장이 차려지고 불판이 달궈집니다.',
        sceneNote: 'Basic banchan sides are laid out and the grill heats up.',
        choices: [
          {
            id: 'c_bbq_samgyeop_2',
            textKo: '삼겹살 2인분이랑 계란찜 하나 먼저 주세요.',
            romanized: 'Samgyeopsal i-inbun-irang gyeranjjim hana meonjeo juseyo.',
            textEn: 'Two servings of pork belly and one steamed egg to start please.',
            nuanceTip: '한국 고깃집에서 사이드 메뉴로 폭신한 "계란찜"을 함께 주문하는 정석 스타일입니다.',
            intentTag: '삼겹 2인분 + 계란찜',
            nextNodeId: 'bbq_side_request'
          },
          {
            id: 'c_bbq_mix_meat',
            textKo: '삼겹살 1인분, 목살 1인분 섞어서도 주문 가능한가요?',
            romanized: 'Samgyeopsal il-inbun, moksal il-inbun seokkeoseodo jumun ganeunghangayo?',
            textEn: 'Is it possible to mix 1 serving of pork belly and 1 serving of neck meat?',
            nuanceTip: '부위별 1인분씩 교차 주문이 가능한지 정중히 확인하는 실전 표현입니다.',
            intentTag: '부위 믹스 주문',
            nextNodeId: 'bbq_side_request'
          }
        ]
      },

      bbq_side_request: {
        id: 'bbq_side_request',
        stepIndex: 3,
        totalSteps: 4,
        speakerRoleKo: '식당 직원',
        speakerRoleEn: 'Restaurant Staff',
        aiMessageKo: '네, 고기 올려드렸습니다! 노릇노릇해지면 뒤집어 드릴게요. 드시다가 부족한 반찬이나 찌개 필요하시면 언제든 말씀해 주세요.',
        aiMessageRomanized: 'Ne, gogi ollyeodeuryeosseumnida! Noreut-noreut-haejimyeon dwijibeo deurilgeyo. Deusi-daga bujokhan banchan-ina jjigae piryohasimyeon eonjedeun malsseumhae juseyo.',
        aiMessageEn: 'Yes, meat is placed on the grill! When it turns golden, I will flip it for you. If you need more side dishes or stew, feel free to call!',
        sceneNoteKo: '지글지글 고기가 익어가며 고소한 냄새가 퍼집니다.',
        sceneNote: 'The pork sizzles on the hot grill plate.',
        choices: [
          {
            id: 'c_bbq_refill_sides',
            textKo: '여기 상추랑 깻잎, 쌈장 리필 좀 부탁드립니다!',
            romanized: 'Yeogi sangchu-rang kkaennip, ssamjang ripil jom butakdeurimnida!',
            textEn: 'Excuse me, could we please get a refill on lettuce, perilla leaves, and ssamjang?',
            nuanceTip: '한국 식당에서 반찬 리필을 요청할 때 "여기 ~ 리필 좀 부탁드립니다"는 매우 자연스럽습니다.',
            intentTag: '쌈 채소 리필',
            nextNodeId: 'bbq_end_success'
          },
          {
            id: 'c_bbq_stew_rice',
            textKo: '공깃밥 두 개랑 차돌 된장찌개 하나 추가해 주세요!',
            romanized: 'Gong-gitbap du gae-rang chadol doenjang-jjigae hana chugahae juseyo!',
            textEn: 'Please add two bowls of rice and one brisket soybean paste stew!',
            nuanceTip: '고기와 함께 식사로 밥과 된장찌개를 추가하는 필수 회화입니다.',
            intentTag: '밥 + 된장찌개 추가',
            nextNodeId: 'bbq_end_success'
          }
        ]
      },

      bbq_end_success: {
        id: 'bbq_end_success',
        stepIndex: 4,
        totalSteps: 4,
        speakerRoleKo: '식당 직원',
        speakerRoleEn: 'Restaurant Staff',
        aiMessageKo: '네! 싱싱한 상추 듬뿍 가져다드렸습니다. 고기 지금 딱 맛있게 익었으니 마늘이랑 쌈 싸서 맛있게 드세요! 필요한 거 있으면 또 벨 눌러주세요~',
        aiMessageRomanized: 'Ne! Singsinghan sangchu deumpuk gajyeodadeuryeosseumnida. Gogi jigeum ttak mas-itge ik-eosseuni maneul-irang ssam ssaseo mas-itge deuseyo! Piryohan geo isseumyeon tto bel nulleojuseyo~',
        aiMessageEn: 'Yes! Brought plenty of fresh lettuce. The meat is grilled to perfection right now, so wrap it with garlic and enjoy! Ring the call bell whenever you need more~',
        sceneNoteKo: '직원이 노릇한 고기를 먹기 좋게 잘라주고 상추를 채워줍니다.',
        sceneNote: 'The meat is neatly cut into bite-sized pieces.',
        choices: [],
        isEnding: true,
        endingSummary: {
          status: 'perfect',
          badgeKo: '🥩 K-BBQ 쌈싸기 달인 (Samgyeopsal Guru)',
          badgeEn: 'Korean BBQ Master',
          xpEarned: 50,
          feedbackKo: '인원수 착석부터 인분 수 주문, 쌈 채소 리필과 찌개 추가까지 한국 식당 매너를 완벽하게 정복하셨습니다!',
          feedbackEn: 'Mastered Korean BBQ table seating, meat ordering by servings, banchan refills, and stew pairings!',
          keyPoints: [
            '~인분 단위 주문 (~inbun serving unit counting)',
            '반찬 리필 요청 (Free banchan refill etiquette)',
            '호출 벨 및 정중한 존댓말 (Polite interaction with restaurant staff)'
          ],
          grammarNotes: [
            { title: '~인분 주세요', desc: '고깃집이나 식당에서 "1인분(일인분), 2인분(이인분)"처럼 한자어 수사를 붙여 인분 수를 나타냅니다.' },
            { title: '~리필 좀 부탁드립니다', desc: '무료로 제공되는 반찬이나 쌈을 추가 요청할 때 정중하게 사용하는 관용 표현입니다.' }
          ]
        }
      }
    }
  },

  // 5. COIN NORAEBANG
  {
    id: 'noraebang',
    titleKo: '🎤 코인노래방 방 배정 및 서비스 요청',
    titleEn: 'Coin Noraebang (Karaoke) Experience',
    badge: 'K-Culture & Fun',
    category: 'lifestyle',
    difficulty: 'Elementary',
    roleKo: '노래방 사장님 (AI) vs 손님 (회원님)',
    roleEn: 'Noraebang Owner (AI) vs Customer (You)',
    settingKo: '홍대 입구의 깔끔한 코인노래방입니다. 코인 vs 시간제 요금을 선택하고, 마이크 위생 커버 수령 및 인기 차트 예약 노하우를 익혀보세요.',
    settingEn: 'At a trendy Coin Noraebang in Hongdae. Choose coin vs hourly play, grab mic covers, and sing K-POP songs.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80',
    keyVocab: [
      { ko: '시간제로 할게요', en: 'I will pay by the hour', pronunciation: 'siganje-ro halgeyo' },
      { ko: '마이크 커버', en: 'Microphone hygiene cover', pronunciation: 'maikeu keobeo' },
      { ko: '우선예약', en: 'Priority reservation (next song)', pronunciation: 'useon-yeyak' },
      { ko: '서비스 시간', en: 'Bonus service time', pronunciation: 'seobiseu sigan' }
    ],
    rootNodeId: 'norae_root',
    nodes: {
      norae_root: {
        id: 'norae_root',
        stepIndex: 1,
        totalSteps: 3,
        speakerRoleKo: '노래방 사장님',
        speakerRoleEn: 'Noraebang Host',
        aiMessageKo: '어서 오세요! 몇 분이세요? 곡 수로 계산하는 코인으로 하시나요, 아니면 시간제로 하시나요?',
        aiMessageRomanized: 'Eoseo oseyo! Myeot bun-iseyo? Gok su-ro gyesanhaneun koin-euro hasinayo, animyeon siganje-ro hasinayo?',
        aiMessageEn: 'Welcome! How many in your group? Are you playing by number of songs (coin) or by the hour?',
        sceneNoteKo: '사장님이 키오스크 화면 앞에서 방 배정을 도와줍니다.',
        sceneNote: 'The host asks whether you prefer paying per song or by the hour.',
        choices: [
          {
            id: 'c_norae_time',
            textKo: '두 명인데 1시간 시간제로 이용할게요. 카드 결제 되나요?',
            romanized: 'Du myeong-inde han-sigan siganje-ro iyonghalgeyo. Kadeu gyeolje doenayo?',
            textEn: 'We are two people and will use 1 hour by time. Can we pay with card?',
            nuanceTip: '시간제 요금제와 카드 결제 가능 여부를 묻는 스마트한 질문입니다.',
            intentTag: '1시간 시간제',
            nextNodeId: 'norae_room_assign'
          },
          {
            id: 'c_norae_coin',
            textKo: '혼자 왔어요! 5천 원 넣고 곡 수로 부를게요.',
            romanized: 'Honja wasseoyo! O-cheon won neohgo gok su-ro bureulgeyo.',
            textEn: 'I came alone! I will insert 5,000 KRW and sing by song count.',
            nuanceTip: '혼코노(혼자 코인노래방) 문화에 맞춘 유용한 표현입니다.',
            intentTag: '혼코노 코인제',
            nextNodeId: 'norae_room_assign'
          }
        ]
      },

      norae_room_assign: {
        id: 'norae_room_assign',
        stepIndex: 2,
        totalSteps: 3,
        speakerRoleKo: '노래방 사장님',
        speakerRoleEn: 'Noraebang Host',
        aiMessageKo: '네! 7번 방으로 들어가시면 됩니다. 카운터 앞에 일회용 마이크 위생 커버 두 개 챙겨가세요!',
        aiMessageRomanized: 'Ne! Chil-beon bang-euro deureogasimyeon doemnida. Kaunteo ape ilhoe-yong maikeu wisaeng keobeo du gae chaenggyeogaseyo!',
        aiMessageEn: 'Great! You can head into Room 7. Please grab two disposable microphone covers in front of the counter!',
        sceneNoteKo: '사장님이 7번 방 조명을 켜고 마이크 커버 바구니를 가리킵니다.',
        sceneNote: 'The room lights turn on and hygiene covers are ready.',
        choices: [
          {
            id: 'c_norae_service_ask',
            textKo: '감사합니다! 사장님, 혹시 신나게 부르면 서비스 시간 조금 더 주시나요? ㅎㅎ',
            romanized: 'Gamsahamnida! Sajangnim, hoksi sinnage bureumyeon seobiseu sigan jogeum deo jusinayo? ㅎㅎ',
            textEn: 'Thank you! Boss, if we sing passionately, will you give us a little bonus service time? ㅎㅎ',
            nuanceTip: '한국 노래방의 고유한 "서비스 시간(보너스 10~20분)" 문화를 애교 있게 요청하는 위트 있는 표현입니다.',
            intentTag: '서비스 시간 요청',
            nextNodeId: 'norae_end_success'
          },
          {
            id: 'c_norae_remote_ask',
            textKo: '네 챙겨갈게요! 리모컨에서 최신 K-POP 인기 차트는 어떻게 보나요?',
            romanized: 'Ne chaenggyeogalgeyo! Rimokeon-eseo choesin K-POP ingi chateu-neun eotteoke bonayo?',
            textEn: 'Yes, I will take them! How do I view the latest K-POP hit chart on the remote?',
            nuanceTip: '노래방 리모컨 조작법(인기차트/신곡)을 질문하는 실전 표현입니다.',
            intentTag: '인기차트 질문',
            nextNodeId: 'norae_end_success'
          }
        ]
      },

      norae_end_success: {
        id: 'norae_end_success',
        stepIndex: 3,
        totalSteps: 3,
        speakerRoleKo: '노래방 사장님',
        speakerRoleEn: 'Noraebang Host',
        aiMessageKo: '하하, 한국말을 정말 재치 있게 잘하시네요! 서비스 시간 20분 넉넉하게 넣어드렸습니다. 100점 나오면 보너스 곡도 나오니까 신나게 즐기다 가세요!',
        aiMessageRomanized: 'Haha, Hanguk-mal-eul jeongmal jaechi itge jalhasineyol Seobiseu sigan isip-bun neokneok-hage neoh-eodeuryeosseumnida. Baek-jeom naomyeon boneoseu gok-do naonikka sinnage jeulgida gaseyo!',
        aiMessageEn: 'Haha, you speak Korean with such great wit! I added a generous 20-minute bonus service time for you. If you score 100 points you get free songs too, enjoy singing!',
        sceneNoteKo: '방 화면에 서비스 시간 +20분이 추가되며 흥겨운 반주가 시작됩니다.',
        sceneNote: '+20 minutes bonus time flashes on the karaoke screen.',
        choices: [],
        isEnding: true,
        endingSummary: {
          status: 'perfect',
          badgeKo: '🎤 K-POP 노래방 인싸 (Karaoke Master)',
          badgeEn: 'Karaoke Culture Pro',
          xpEarned: 50,
          feedbackKo: '시간제 요금 선택부터 마이크 커버 챙기기, 재치 있는 서비스 시간 획득까지 완벽한 한국 노래방 바이브를 보여주셨습니다!',
          feedbackEn: 'Mastered hourly options, mic hygiene covers, and obtained generous bonus service time with charm!',
          keyPoints: [
            '코인 vs 시간제 구분 (Per-song vs hourly distinction)',
            '마이크 위생 커버 (Hygiene etiquette)',
            '서비스 시간 문화 (Bonus service time tradition)'
          ],
          grammarNotes: [
            { title: '~에 챙겨갈게요', desc: '물건이나 혜택을 잊지 않고 챙기겠다는 다짐과 감사의 표현입니다.' },
            { title: '혹시 ~주시나요?', desc: '상대방에게 정중하고 부드럽게 추가 혜택이나 배려를 물어볼 때 쓰는 공손 표현입니다.' }
          ]
        }
      }
    }
  },

  // 6. LANGUAGE EXCHANGE MEETUP
  {
    id: 'intro',
    titleKo: '🤝 언어교환 모임에서 자기소개 & 친해지기',
    titleEn: 'Language Exchange Intro & Friendship',
    badge: 'Social & Friendship',
    category: 'social',
    difficulty: 'Elementary',
    roleKo: '한국인 친구 민준 (AI) vs 회원님',
    roleEn: 'Korean Friend Minjun (AI) vs You',
    settingKo: '서울 신촌의 글로벌 언어교환 스터디 카페입니다. 한국인 친구들과 자연스럽게 통성명하고, 한국어를 배우게 된 계기와 K-컬처 취향을 나눠보세요.',
    settingEn: 'At a global language meetup café in Sinchon. Introduce yourself, share why you study Korean, and exchange contacts.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80',
    keyVocab: [
      { ko: '처음 뵙겠습니다', en: 'Nice to meet you for the first time', pronunciation: 'cheoeum boepgesseumnida' },
      { ko: '한국어 공부한 지 6개월', en: 'Studied Korean for 6 months', pronunciation: 'hangugeo gongbuhan ji yuk-gaewol' },
      { ko: '드라마 보면서 배웠어요', en: 'Learned while watching dramas', pronunciation: 'deurama bomyeonseo baewosseoyo' },
      { ko: '인스타 맞팔해요', en: 'Let us follow each other on Instagram', pronunciation: 'inseuta matpal-haeyo' }
    ],
    rootNodeId: 'intro_root',
    nodes: {
      intro_root: {
        id: 'intro_root',
        stepIndex: 1,
        totalSteps: 4,
        speakerRoleKo: '한국인 친구 민준',
        speakerRoleEn: 'Minjun (Language Partner)',
        aiMessageKo: '안녕하세요! 처음 뵙겠습니다. 오늘 신촌 언어교환 모임 처음 오셨나요? 옆에 편하게 앉으세요!',
        aiMessageRomanized: 'Annyeonghaseyo! Cheoeum boepgesseumnida. Oneul Sinchon eoneo-gyohwan moim cheoeum osyeonnayo? Yeope pyeonhage anjeuseyo!',
        aiMessageEn: 'Hello! Nice to meet you for the first time. Is this your first time at the Sinchon language exchange meetup? Feel free to sit next to me!',
        sceneNoteKo: '민준이가 미소 지으며 따뜻하게 인사를 건네고 자리를 권합니다.',
        sceneNote: 'Minjun smiles warmly and offers a seat at the study table.',
        choices: [
          {
            id: 'c_intro_first_time',
            textKo: '안녕하세요! 네, 모임은 처음이에요. 만나서 정말 반갑습니다.',
            romanized: 'Annyeonghaseyo! Ne, moim-eun cheoeum-ieyo. Mannaseo jeongmal bangapseumnida.',
            textEn: 'Hello! Yes, it is my first meetup. It is really great to meet you.',
            nuanceTip: '"처음이에요"와 "반갑습니다"로 예의 바르고 단정한 첫인상을 줍니다.',
            intentTag: '정중한 첫인사',
            nextNodeId: 'intro_study_duration'
          },
          {
            id: 'c_intro_exchange_student',
            textKo: '반가워요! 지난달에 서울에 온 교환학생이에요. 한국 친구 사귀고 싶어서 왔어요.',
            romanized: 'Bangawoyo! Jinandal-e Seoul-e on gyohwan-haksaeng-ieyo. Hanguk chingu sagwigo sipeoseo wasseoyo.',
            textEn: 'Nice to meet you! I am an exchange student who arrived in Seoul last month. I came to make Korean friends.',
            nuanceTip: '자신의 신분과 참여 목적을 자연스럽게 밝히는 친근한 오프닝입니다.',
            intentTag: '교환학생 소개',
            nextNodeId: 'intro_study_duration'
          }
        ]
      },

      intro_study_duration: {
        id: 'intro_study_duration',
        stepIndex: 2,
        totalSteps: 4,
        speakerRoleKo: '한국인 친구 민준',
        speakerRoleEn: 'Minjun (Language Partner)',
        aiMessageKo: '와, 한국어 억양이랑 발음이 되게 자연스러우세요! 한국어 공부하신 지 얼마나 되셨어요? 특별히 좋아하게 된 계기가 있나요?',
        aiMessageRomanized: 'Wa, hangugeo eog-yang-irang bal-eum-i doege jayeonseureouseyo! Hangugeo gongbuhasin ji eolmana doesyeosseoyo? Teukbyeolhi joahage doen gyegiga 있nayo?',
        aiMessageEn: 'Wow, your Korean accent and pronunciation are remarkably natural! How long have you been studying Korean? What motivated you?',
        sceneNoteKo: '민준이가 감탄하며 호기심 가득한 눈빛으로 경청합니다.',
        sceneNote: 'Minjun compliments your pronunciation and asks about your study history.',
        choices: [
          {
            id: 'c_intro_kdrama_kpop',
            textKo: '혼자 6개월 정도 공부했어요. K-POP 노래 가사랑 한국 드라마를 너무 좋아해서 자막 없이 보고 싶었거든요!',
            romanized: 'Honja yuk-gaewol jeongdo gongbuhaesseoyo. K-POP norae gasa-rang Hanguk deurama-reul neomu joahaeseo jamak eopsi bogo sipeotgeodeun-yo!',
            textEn: 'I studied on my own for about 6 months. I love K-POP lyrics and K-dramas so much that I wanted to watch without subtitles!',
            nuanceTip: '"~고 싶었거든요"로 자신의 동기를 친근하게 설명하는 실생활 문법입니다.',
            intentTag: 'K-드라마 & K-POP 동기',
            nextNodeId: 'intro_food_hobby'
          },
          {
            id: 'c_intro_travel_culture',
            textKo: '1년 전 한국 여행 왔을 때 사람들의 친절함과 길거리 음식에 반해서 본격적으로 배우기 시작했어요.',
            romanized: 'Il-nyeon jeon Hanguk yeohaeng wasseul ttae saramdeul-ui chinjeolham-gwa gilgeori eumsik-e banhaeseo bongyeokjeok-euro baeugi sijakhaesseoyo.',
            textEn: 'When I traveled to Korea a year ago, I fell in love with people\'s kindness and street food, so I started learning earnestly.',
            nuanceTip: '"~에 반해서"를 사용하여 매력에 매료되었음을 감성적으로 표현합니다.',
            intentTag: '여행 및 문화 동기',
            nextNodeId: 'intro_food_hobby'
          }
        ]
      },

      intro_food_hobby: {
        id: 'intro_food_hobby',
        stepIndex: 3,
        totalSteps: 4,
        speakerRoleKo: '한국인 친구 민준',
        speakerRoleEn: 'Minjun (Language Partner)',
        aiMessageKo: '대단하네요! 열정이 느껴져요. 그럼 한국 음식 중에선 어떤 걸 제일 좋아하세요? 매운 음식도 잘 드시나요?',
        aiMessageRomanized: 'Daedanhanehyo! Yeoljeong-i neukkyeojyeoyo. Geureom Hanguk eumsik jung-eseon eotteon geol jeil joahaseyo? Maeun eumsik-do jal deusinayo?',
        aiMessageEn: 'That is amazing! I can feel your passion. What is your favorite Korean food? Can you eat spicy food well?',
        sceneNoteKo: '한국 음식 이야기로 분위기가 한층 더 화기애애해집니다.',
        sceneNote: 'The conversation moves to delicious Korean food recommendations.',
        choices: [
          {
            id: 'c_intro_tteokbokki_spicy',
            textKo: '떡볶이랑 김치찌개 정말 좋아해요! 조금 맵지만 맛있게 매워서 중독성이 있어요.',
            romanized: 'Tteokbokki-rang gimchi-jjigae jeongmal joahaeyo! Jogeum maepjiman mas-itge maewoseo jungdokseong-i isseoyo.',
            textEn: 'I really love Tteokbokki and Kimchi stew! It is slightly spicy, but addictively flavorful.',
            nuanceTip: '"맛있게 맵다"는 한국인들이 가장 좋아하는 맛의 칭찬 표현입니다.',
            intentTag: '떡볶이 & 매운맛 호감',
            nextNodeId: 'intro_end_insta'
          },
          {
            id: 'c_intro_korean_bbq_soup',
            textKo: '삼겹살에 된장찌개 조합을 제일 좋아해요. 매운 건 조금 약하지만 계속 도전 중이에요!',
            romanized: 'Samgyeopsal-e doenjang-jjigae johap-eul jeil joahaeyo. Maeun geon jogeum yakhajiman gyesok dojeon jung-ieyo!',
            textEn: 'I love the pork belly and soybean paste stew combination the most. I am a bit weak with spicy food, but I keep trying!',
            nuanceTip: '자신의 취향을 솔직하고 유쾌하게 털어놓는 호감형 답변입니다.',
            intentTag: '삼겹살 & 한식 취향',
            nextNodeId: 'intro_end_insta'
          }
        ]
      },

      intro_end_insta: {
        id: 'intro_end_insta',
        stepIndex: 4,
        totalSteps: 4,
        speakerRoleKo: '한국인 친구 민준',
        speakerRoleEn: 'Minjun (Language Partner)',
        aiMessageKo: '입맛이 완전 한국인이시네요! 오늘 대화 너무 즐거웠어요. 괜찮으시면 인스타그램 아이디나 카카오톡 알려주세요. 맞팔하고 다음 스터디 때 또 같이 수다 떨어요!',
        aiMessageRomanized: 'Ipmos-i wanjeon Hangukin-isineyo! Oneul daehwa neomu jeulgeowosseoyo. Gwaenchanheusimyeon Inseutageuraem aidina Kakaotok alryeojuseyo. Matpal-hago daeum seuteodi ttae tto gati suda tteoreo-yo!',
        aiMessageEn: 'Your taste is totally Korean! I had so much fun chatting with you today. If you do not mind, please share your Instagram ID or KakaoTalk. Let us follow each other and chat again at the next study session!',
        sceneNoteKo: '민준이가 스마트폰을 꺼내 인스타그램 QR코드를 보여줍니다.',
        sceneNote: 'Minjun pulls out his phone to exchange social accounts.',
        choices: [],
        isEnding: true,
        endingSummary: {
          status: 'perfect',
          badgeKo: '🤝 글로벌 인싸 & 소통왕 (Language Exchange Star)',
          badgeEn: 'Social Butterfly & Global Friend',
          xpEarned: 50,
          feedbackKo: '첫인사부터 학습 계기 전달, 음식 취향 공감 및 소셜 계정 교환까지 완벽한 100점짜리 소통 능력을 발휘하셨습니다!',
          feedbackEn: 'Flawlessly handled intros, study motives, food empathy, and exchanging social media handles!',
          keyPoints: [
            '자연스러운 자기소개 (Natural self-introduction)',
            '계기와 취향 설명 (Expressing motivations & favorites)',
            '소셜 계정 맞팔 소통 (Connecting via Instagram / KakaoTalk)'
          ],
          grammarNotes: [
            { title: '~한 지 [기간] 되었어요', desc: '어떤 행동을 시작하고 지난 시간("공부한 지 6개월")을 나타내는 핵심 문법입니다.' },
            { title: '~맛있게 맵다', desc: '단순히 고통스러운 매운맛이 아닌 감칠맛이 도는 매콤함을 칭찬하는 한국적 표현입니다.' }
          ]
        }
      }
    }
  },

  // 7. SEOUL METRO & TRANSIT
  {
    id: 'subway',
    titleKo: '🚇 서울 지하철 환승 & 역무실 문의',
    titleEn: 'Seoul Metro Transit & Directions',
    badge: 'Transit & Mobility',
    category: 'travel',
    difficulty: 'Intermediate',
    roleKo: '지하철 역무원 (AI) vs 승객 (회원님)',
    roleEn: 'Metro Staff (AI) vs Passenger (You)',
    settingKo: '유동 인구가 많은 서울 지하철 환승역 고객안내센터(역무실)입니다. 환승 방향, 출구 위치 및 교통카드 태그 오류를 역무원에게 문의해 보세요.',
    settingEn: 'At the customer service center of a busy Seoul transit station. Ask about transfer gates, exit numbers, and card tap issues.',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    keyVocab: [
      { ko: '갈아타다 (환승)', en: 'transfer lines', pronunciation: 'garatada (hwanseung)' },
      { ko: '개찰구 오류', en: 'turnstile card error', pronunciation: 'gaechalgu oryu' },
      { ko: '몇 번 출구예요?', en: 'Which exit is it?', pronunciation: 'myeot beon chulgueyo?' },
      { ko: '교통카드 충전', en: 'transit card recharge', pronunciation: 'gyotongkadeu chungjeon' }
    ],
    rootNodeId: 'subway_root',
    nodes: {
      subway_root: {
        id: 'subway_root',
        stepIndex: 1,
        totalSteps: 4,
        speakerRoleKo: '지하철 역무원',
        speakerRoleEn: 'Metro Staff',
        aiMessageKo: '네, 고객안내센터입니다. 무엇을 도와드릴까요?',
        aiMessageRomanized: 'Ne, gogaek-annae-senteo-imnida. Mueos-eul dowadeurilkkayo?',
        aiMessageEn: 'Yes, station customer service. How may I assist you?',
        sceneNoteKo: '역무원이 모니터에서 눈을 들어 승객의 질문을 경청합니다.',
        choices: [
          {
            id: 'c_subway_transfer_2',
            textKo: '실례합니다. 2호선으로 갈아타려면 어느 쪽 계단으로 내려가야 하나요?',
            romanized: 'Sillyehamnida. Ihoseon-euro garataryeomyeon eoneu jjok gyedan-euro naeryeogaya hanayo?',
            textEn: 'Excuse me. Which stairs should I take to transfer to Line 2?',
            nuanceTip: '"~하려면 어느 쪽으로 가야 하나요?"는 방향 문의의 가장 정중한 표준 표현입니다.',
            intentTag: '2호선 환승 계단 문의',
            nextNodeId: 'subway_transfer_gate'
          },
          {
            id: 'c_subway_exit_1',
            textKo: '저기요, 시청 쪽 1번 출구로 나가려면 개찰구를 통과해야 하나요?',
            romanized: 'Jeogiyo, Sicheong jjok ilbeon chulgu-ro nagaryeomyeon gaechalgu-reul tonggwahaeya hanayo?',
            textEn: 'Excuse me, do I have to pass the turnstile to go toward Exit 1 for City Hall?',
            nuanceTip: '출구 번호와 개찰구 통과 여부를 명확히 확인하는 실전 표현입니다.',
            intentTag: '1번 출구 개찰구 확인',
            nextNodeId: 'subway_transfer_gate'
          }
        ]
      },

      subway_transfer_gate: {
        id: 'subway_transfer_gate',
        stepIndex: 2,
        totalSteps: 4,
        speakerRoleKo: '지하철 역무원',
        speakerRoleEn: 'Metro Staff',
        aiMessageKo: '2호선은 바로 앞 초록색 바닥 유도선을 따라가셔서 에스컬레이터 타고 지하 2층으로 내려가시면 됩니다. 혹시 교통카드에 문제가 있으신가요?',
        aiMessageRomanized: 'Ihoseon-eun baro ap choroksaek badak yudoseon-eul ttaragasyeoseo eseukeolleiteo tago jiha icheung-euro naeryeogasimyeon doemnida. Hoksi gyotongkadeu-e munje-ga isseusingayo?',
        aiMessageEn: 'For Line 2, follow the green guide line on the floor in front and take the escalator down to B2. Is there any problem with your transit card?',
        sceneNoteKo: '역무원이 바닥의 환승 유도 라인을 가리키며 친절히 안내합니다.',
        choices: [
          {
            id: 'c_subway_card_tag_err',
            textKo: '방금 개찰구에 카드를 찍었는데 "이미 처리되었습니다"라고 뜨며 문이 안 열려요.',
            romanized: 'Banggeum gaechalgu-e kadeu-reul jjigeotneunde "imi cheoridoeeosseumnida"rago tteumyeo mun-i an yeollyeoyo.',
            textEn: 'I tapped my card just now, but it said "Already processed" and the gate didn\'t open.',
            nuanceTip: '개찰구 오류 메시지를 구체적으로 전달하여 역무원의 즉각 조치를 돕습니다.',
            intentTag: '중복 태그 오류 설명',
            nextNodeId: 'subway_error_card'
          },
          {
            id: 'c_subway_time_ask',
            textKo: '안내 감사합니다! 환승 플랫폼까지 걸어서 몇 분 정도 걸릴까요?',
            romanized: 'Annae gamsahamnida! Hwanseung peullaethom-kkaji georeoseo myeot bun jeongdo geollilkkayo?',
            textEn: 'Thank you for the guidance! How many minutes does it take to walk to the transfer platform?',
            nuanceTip: '예상 이동 시간을 질의하여 지하철 탑승 계획을 세우는 자연스러운 후속 질문입니다.',
            intentTag: '환승 소요 시간 질의',
            nextNodeId: 'subway_error_card'
          }
        ]
      },

      subway_error_card: {
        id: 'subway_error_card',
        stepIndex: 3,
        totalSteps: 4,
        speakerRoleKo: '지하철 역무원',
        speakerRoleEn: 'Metro Staff',
        aiMessageKo: '아, 카드가 중복 인식되었군요. 카드 단말기에 한번 대주세요... 네, 오류 리셋 처리해 드렸습니다. 바로 비상 게이트로 통과하시면 됩니다!',
        aiMessageRomanized: 'A, kadeu-ga jungbok insik-doeeotgunyo. Kadeu danmalgi-e hanbeon daejuseyo... Ne, oryu riset cheorihae deuryeosseumnida. Baro bisang geiteu-ro tonggwahasimyeon doemnida!',
        aiMessageEn: 'Ah, the card was read twice. Please place it on the scanner... Done, error reset! You may pass through the emergency gate now!',
        sceneNoteKo: '역무원이 단말기로 카드를 태그하여 승하차 상태를 정상으로 재설정합니다.',
        choices: [
          {
            id: 'c_subway_thanks_gate',
            textKo: '정말 감사합니다! 덕분에 제시간에 환승할 수 있겠어요. 수고하세요!',
            romanized: 'Jeongmal gamsahamnida! Deokbune jesigan-e hwanseunghal su itgesseoyo. Sugohaseyo!',
            textEn: 'Thank you so much! Thanks to you I can transfer on time. Have a good day!',
            nuanceTip: '공공기관 및 지하철 직원에게 감사를 표하는 따뜻한 마무리 인사입니다.',
            intentTag: '감사 및 수고하세요 인사',
            nextNodeId: 'subway_end_success'
          },
          {
            id: 'c_subway_t_recharge_ask',
            textKo: '해결해 주셔서 감사합니다! 혹시 T-Money 카드 충전기는 어느 쪽에 있나요?',
            romanized: 'Haegyeolhae jusyeoseo gamsahamnida! Hoksi T-Money kadeu chungjeongi-neun eoneu jjok-e 있nayo?',
            textEn: 'Thank you for resolving it! By any chance, which side is the T-Money recharge machine?',
            nuanceTip: '카드 충전기 위치까지 꼼꼼히 확인하는 스마트한 대중교통 이용자 표현입니다.',
            intentTag: '교통카드 충전기 위치 질의',
            nextNodeId: 'subway_end_success'
          }
        ]
      },

      subway_end_success: {
        id: 'subway_end_success',
        stepIndex: 4,
        totalSteps: 4,
        speakerRoleKo: '지하철 역무원',
        speakerRoleEn: 'Metro Staff',
        aiMessageKo: '네, 충전기는 개찰구 바로 오른쪽 1회용 발매기 옆에 있습니다. 2호선 안전하고 편안하게 이용하세요! 좋은 하루 보내세요.',
        aiMessageRomanized: 'Ne, chungjeongi-neun gaechalgu baro oreunjok ilhoeyong balmaegi yeop-e isseumnida. Ihoseon anjeonhago pyeon-anhage iyonghaseyo! Joeun haru bonaeseyo.',
        aiMessageEn: 'The recharge machine is right beside the single-journey ticket machine to the right of the turnstile. Have a safe and comfortable ride on Line 2! Have a great day.',
        sceneNoteKo: '역무원이 미소를 지으며 비상 게이트를 열어줍니다.',
        choices: [],
        isEnding: true,
        endingSummary: {
          status: 'perfect',
          badgeKo: '🚇 서울 메트로 환승 마스터 (Seoul Transit Explorer)',
          badgeEn: 'Seoul Subway Navigator',
          xpEarned: 50,
          feedbackKo: '노선 환승 방향 질의, 교통카드 태그 오류 해결, 충전기 위치 확인까지 서울 메트로를 완벽하게 정복하셨습니다!',
          feedbackEn: 'Mastered Seoul Metro route transfers, turnstile error resets, and station navigation with native confidence!',
          keyPoints: [
            '~으려면 어느 쪽으로 가야 하나요? (Asking directions politely)',
            '개찰구 오류 증상 설명 (Explaining transit card issues)',
            '수고하세요 마무리 에티켓 (Korean service farewell)'
          ],
          grammarNotes: [
            { title: '동사 어간 + -(으)려면', desc: '목적이나 의도("환승하려면", "가려면")를 조건으로 나타낼 때 사용하는 핵심 연결어미입니다.' },
            { title: '덕분에 ~할 수 있었어요', desc: '상대방의 도움에 진심 어린 감사를 표현할 때 사용하는 대표적 표현입니다.' }
          ]
        }
      }
    }
  },

  // 8. PHARMACY
  {
    id: 'pharmacy',
    titleKo: '💊 약국에서 증상 설명 & 복약 상담',
    titleEn: 'Pharmacy Health & Medication Advice',
    badge: 'Health & Care',
    category: 'lifestyle',
    difficulty: 'Intermediate',
    roleKo: '약사님 (AI) vs 환자 (회원님)',
    roleEn: 'Pharmacist (AI) vs Customer (You)',
    settingKo: '서울 도심의 깔끔한 동네 약국입니다. 감기 기운, 두통, 소화불량 등 본인의 신체 증상을 정확히 설명하고 안전한 복약 지도를 받아보세요.',
    settingEn: 'At a neighborhood pharmacy in Seoul. Describe your physical symptoms clearly, check dosage instructions, and buy remedies.',
    image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=600&q=80',
    keyVocab: [
      { ko: '두통 / 열나요', en: 'headache / feverish', pronunciation: 'dutong / yeolnayo' },
      { ko: '식후 30분 복용', en: 'take 30 mins after meal', pronunciation: 'sikhu samsipbun bogyong' },
      { ko: '소화제 / 진통제', en: 'digestive aid / painkiller', pronunciation: 'sohwaje / jintongje' },
      { ko: '졸리지 않는 약', en: 'non-drowsy medication', pronunciation: 'jolliji anneun yak' }
    ],
    rootNodeId: 'pharmacy_root',
    nodes: {
      pharmacy_root: {
        id: 'pharmacy_root',
        stepIndex: 1,
        totalSteps: 4,
        speakerRoleKo: '약사님',
        speakerRoleEn: 'Pharmacist',
        aiMessageKo: '어서 오세요! 어디가 불편하신가요? 증상을 말씀해 주세요.',
        aiMessageRomanized: 'Eoseo oseyo! Eodiga bulpyeon-hasingayo? Jeungsang-eul malsseumhae juseyo.',
        aiMessageEn: 'Welcome! What seems to be troubling you? Please tell me your symptoms.',
        sceneNoteKo: '약사님이 카운터에서 증상을 경청할 준비를 합니다.',
        choices: [
          {
            id: 'c_pharm_headache_cold',
            textKo: '어제부터 머리가 띵하고 으슬으슬 감기 기운이 있어요. 열도 조금 나는 것 같아요.',
            romanized: 'Eojebuteo meoriga ttinghago euseul-euseul gamgi giun-i isseoyo. Yeol-do jogeum naneun geot gatayo.',
            textEn: 'Since yesterday my head feels heavy and I have chills with cold symptoms. I think I have a slight fever too.',
            nuanceTip: '"머리가 띵하다", "으슬으슬하다"는 한국인들이 감기 초기에 가장 많이 쓰는 생생한 묘사입니다.',
            intentTag: '두통 및 몸살감기 증상',
            nextNodeId: 'pharmacy_symptom_detail'
          },
          {
            id: 'c_pharm_stomach_ache',
            textKo: '어제 과식을 해서 체한 것 같아요. 속이 메스껍고 더부룩한데 소화제 좀 주세요.',
            romanized: 'Eoje gwasik-eul haeseo chehan geot gatayo. Sog-i meseukkeopgo deoburukhande sohwaje jom juseyo.',
            textEn: 'I overate yesterday and feel indigestion. My stomach feels nauseous and bloated, please give me a digestive aid.',
            nuanceTip: '"체하다", "속이 더부룩하다"는 소화기 장애를 설명하는 필수 어휘입니다.',
            intentTag: '소화불량 및 급체 증상',
            nextNodeId: 'pharmacy_symptom_detail'
          }
        ]
      },

      pharmacy_symptom_detail: {
        id: 'pharmacy_symptom_detail',
        stepIndex: 2,
        totalSteps: 4,
        speakerRoleKo: '약사님',
        speakerRoleEn: 'Pharmacist',
        aiMessageKo: '아, 환절기라 몸살감기 환자가 많네요. 혹시 약 복용하시고 운전이나 집중해서 일하셔야 하나요? 졸음이 오는 성분이 들어있을 수 있어서요.',
        aiMessageRomanized: 'A, hwanjeolgi-ra momsalgamgi hwanja-ga manneyo. Hoksi yak bogyonghasigo unjeon-ina jipjunghaeseo ilhasyeoya hanayo? Joreum-i oneun seongbun-i deureoisseul su isseoseoyo.',
        aiMessageEn: 'Ah, many people catch body chills during the seasonal change. Do you need to drive or do focused work after taking the medicine? It may contain drowsy components.',
        sceneNoteKo: '약사님이 약통을 살피며 복용 환경을 세심하게 체크합니다.',
        choices: [
          {
            id: 'c_pharm_non_drowsy',
            textKo: '네, 오후에 업무 회의가 있어서 졸리지 않는 약으로 처방 부탁드려요.',
            romanized: 'Ne, ohu-e eommu hoeui-ga isseoseo jolliji anneun yak-euro cheobang butakdeuryeoyo.',
            textEn: 'Yes, I have business meetings this afternoon, so please give me non-drowsy medicine.',
            nuanceTip: '"졸리지 않는 약"을 명확히 요청하여 일상생활에 지장이 없도록 하는 스마트한 표현입니다.',
            intentTag: '졸리지 않는 성분 요청',
            nextNodeId: 'pharmacy_dosage_guide'
          },
          {
            id: 'c_pharm_fast_relief',
            textKo: '퇴근하고 바로 푹 잘 예정이라, 밤에 푹 자면서 빨리 나을 수 있는 약으로 주세요.',
            romanized: 'Toegeunhago baro puk jal yejeong-ira, bam-e puk jamyeonseo ppalli naeul su inneun yak-euro juseyo.',
            textEn: 'I plan to sleep soundly right after work, so please give me something that helps me sleep well and recover fast.',
            nuanceTip: '수면과 회복을 목적으로 약을 요청하는 솔직한 생활 회화입니다.',
            intentTag: '숙면 및 빠른 회복 약 요청',
            nextNodeId: 'pharmacy_dosage_guide'
          }
        ]
      },

      pharmacy_dosage_guide: {
        id: 'pharmacy_dosage_guide',
        stepIndex: 3,
        totalSteps: 4,
        speakerRoleKo: '약사님',
        speakerRoleEn: 'Pharmacist',
        aiMessageKo: '네! 해열진통 성분이 든 캡슐과 목감기 시럽입니다. 이 알약은 식사하시고 30분 뒤에 1알씩, 하루 3번 미온수와 함께 드세요. 빈속에 드시면 속 쓰릴 수 있습니다.',
        aiMessageRomanized: 'Ne! Haeyeoljintong seongbun-i deun kaepsyul-gwa mokgamgi sireop-imnida. I allyak-eun siksa-hasigo samsipbun dwi-e il-al-ssik, haru sebeon mionsu-wa hamkke deuseyo. Binsok-e deusimyeon sok sseuril su isseumnida.',
        aiMessageEn: 'Here is an antipyretic pain relief capsule and throat syrup. Take 1 capsule 30 minutes after meals, 3 times a day with warm water. Taking it on an empty stomach may cause heartburn.',
        sceneNoteKo: '약사님이 약 봉투에 네임펜으로 "식후 30분 1정"을 적어줍니다.',
        choices: [
          {
            id: 'c_pharm_water_recharge',
            textKo: '네, 잘 알겠습니다. 혹시 비타민C 음료랑 마스크도 하나 같이 계산해 주시겠어요?',
            romanized: 'Ne, jal algess-seumnida. Hoksi bitamin-C eumryo-rang maseukeu-do hana gati gyesanhae jusigesseoyo?',
            textEn: 'Yes, understood well. Could you also ring up a Vitamin C drink and a mask together?',
            nuanceTip: '약국에서 비타민 드링크나 마스크를 함께 구매할 때 쓰는 자연스러운 덧붙임 표현입니다.',
            intentTag: '비타민 음료 & 마스크 추가',
            nextNodeId: 'pharmacy_end_success'
          },
          {
            id: 'c_pharm_check_meals',
            textKo: '밥맛이 없어서 죽을 조금 먹고 복용해도 괜찮을까요?',
            romanized: 'Bapmat-i eopseoseo juk-eul jogeum meokgo bogyonghaedo gwaenchanheulkkayo?',
            textEn: 'I have no appetite, is it okay if I eat a little porridge before taking it?',
            nuanceTip: '식사를 제대로 못 할 때 안전한 복약 방법을 재확인하는 모범적인 질문입니다.',
            intentTag: '간편식 후 복용 여부 확인',
            nextNodeId: 'pharmacy_end_success'
          }
        ]
      },

      pharmacy_end_success: {
        id: 'pharmacy_end_success',
        stepIndex: 4,
        totalSteps: 4,
        speakerRoleKo: '약사님',
        speakerRoleEn: 'Pharmacist',
        aiMessageKo: '네, 부드러운 죽이나 바나나 조금 드시고 약 드시면 위장에 부담 없습니다! 총 7,500원입니다. 따뜻한 물 자주 드시고 푹 쉬세요, 쾌차하세요!',
        aiMessageRomanized: 'Ne, budeureoun juk-ina banana jogeum deusigo yak deusimyeon wijang-e budam eopseumnida! Chong chilcheon-obaekwon-imnida. Ttatteuthan mul jaju deusigo puk swiseyo, kwaechahaseyo!',
        aiMessageEn: 'Yes, eating mild porridge or a banana will prevent stomach irritation! Total is 7,500 won. Drink warm water frequently and get plenty of rest, get well soon!',
        sceneNoteKo: '약사님이 따뜻한 인사와 함께 약 봉투를 건넵니다.',
        choices: [],
        isEnding: true,
        endingSummary: {
          status: 'perfect',
          badgeKo: '💊 건강 지킴이 & 스마트 환자 (Healthy Seoulite)',
          badgeEn: 'Healthcare Communication Master',
          xpEarned: 50,
          feedbackKo: '구체적 신체 증상 설명, 졸리지 않는 옵션 요청, 식후 복약 지도 확인까지 한국 약국 회화를 완벽하게 해내셨습니다!',
          feedbackEn: 'Mastered precise symptom descriptions, non-drowsy options, dosage schedules, and health etiquette!',
          keyPoints: [
            '머리가 띵하다 / 으슬으슬하다 (Describing nuanced symptoms)',
            '졸리지 않는 약 요청 (Requesting non-drowsy medication)',
            '식후 30분 복용 (Medication timetable etiquette)'
          ],
          grammarNotes: [
            { title: '형용사 + ~아/어 보이다 / ~는 것 같다', desc: '자신의 상태나 기운을 완곡하고 자연스럽게 표현하는 화용적 패턴입니다.' },
            { title: '쾌차하세요', desc: '환자에게 "빨리 나으세요"를 정중하고 품격 있게 건네는 격식 인사말입니다.' }
          ]
        }
      }
    }
  },

  // 9. TRADITIONAL KOREAN RESTAURANT
  {
    id: 'restaurant',
    titleKo: '🍲 한국 전통 식당 식사 주문 & 찌개 요청',
    titleEn: 'Korean Restaurant Dining & Ordering',
    badge: 'K-Food & Dining',
    category: 'food',
    difficulty: 'Beginner',
    roleKo: '식당 직원 (AI) vs 손님 (회원님)',
    roleEn: 'Restaurant Staff (AI) vs Customer (You)',
    settingKo: '인사동 골목의 정갈한 한식 백반 식당입니다. 대표 찌개 메뉴를 추천받고 덜 맵게 조리 요청하거나 밑반찬을 추가해 보세요.',
    settingEn: 'At a traditional Korean Baekban restaurant in Insadong. Ask for signature stews, request less spicy seasoning, and enjoy side dishes.',
    image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=600&q=80',
    keyVocab: [
      { ko: '추천 메뉴', en: 'recommended menu', pronunciation: 'chucheon menyu' },
      { ko: '덜 맵게 해주세요', en: 'make it less spicy please', pronunciation: 'deol maepge haejuseyo' },
      { ko: '반찬 더 주세요', en: 'more side dishes please', pronunciation: 'banchan deo juseyo' },
      { ko: '공깃밥 추가', en: 'add extra rice bowl', pronunciation: 'gong-gitbap chuga' }
    ],
    rootNodeId: 'restaurant_root',
    nodes: {
      restaurant_root: {
        id: 'restaurant_root',
        stepIndex: 1,
        totalSteps: 4,
        speakerRoleKo: '식당 이모님',
        speakerRoleEn: 'Restaurant Auntie',
        aiMessageKo: '어서 오세요! 두 분이신가요? 안쪽 방석 자리나 창가 의자 자리 편한 곳에 앉으세요~',
        aiMessageRomanized: 'Eoseo oseyo! Du bun-isingayo? Anjjok bangseok jari-na chang-ga uija jari pyeonhan got-e anjeuseyo~',
        aiMessageEn: 'Welcome! Two people? Please take a seat either on the inner floor cushions or window chair tables~',
        sceneNoteKo: '따뜻한 보리차 주전자와 물컵을 테이블에 올려놓습니다.',
        choices: [
          {
            id: 'c_rest_window_seat',
            textKo: '창가 의자 자리로 앉을게요. 이모님, 메뉴판 좀 볼 수 있을까요?',
            romanized: 'Chang-ga uija jari-ro anjeulgeyo. Imonim, menyupan jom bol su isseulkkayo?',
            textEn: 'We will sit by the window chair table. Auntie, may we look at the menu?',
            nuanceTip: '원하는 좌석 형태를 고르고 메뉴판을 정중히 요청하는 자연스러운 시작입니다.',
            intentTag: '창가석 착석 & 메뉴판 요청',
            nextNodeId: 'restaurant_menu_order'
          },
          {
            id: 'c_rest_signature_ask',
            textKo: '감사합니다! 혹시 이 집에서 손님들이 제일 많이 찾는 시그니처 메뉴가 뭐예요?',
            romanized: 'Gamsahamnida! Hoksi i jip-eseo sonnimdeul-i jeil mani chatneun sigeunicheo menyu-ga mwoyeyo?',
            textEn: 'Thank you! By any chance, what is the most popular signature dish customers order here?',
            nuanceTip: '식당 특화 인기 메뉴를 친근하게 추천해달라고 부탁하는 센스 있는 표현입니다.',
            intentTag: '대표 메뉴 추천 문의',
            nextNodeId: 'restaurant_menu_order'
          }
        ]
      },

      restaurant_menu_order: {
        id: 'restaurant_menu_order',
        stepIndex: 2,
        totalSteps: 4,
        speakerRoleKo: '식당 이모님',
        speakerRoleEn: 'Restaurant Auntie',
        aiMessageKo: '저희 집은 묵은지 돼지 김치찌개랑 뚝배기 제육볶음이 제일 인기예요! 돌솥비빔밥도 나물이 아주 신선하고 맛있어요.',
        aiMessageRomanized: 'Jeohui jip-eun mugeunji dwaeji gimchi-jjigae-rang ttukbaegi jeyukbokkeum-i jeil inki-yeyo! Dolsot-bibimbap-do namul-i aju sinseonhago mas-isseoyo.',
        aiMessageEn: 'Our aged Kimchi pork stew and earthenware spicy pork are the most popular! The hot stone bibimbap has fresh wild greens too.',
        sceneNoteKo: '이모님이 메뉴판을 짚으며 자신 있는 메뉴들을 추천해 줍니다.',
        choices: [
          {
            id: 'c_rest_stew_order',
            textKo: '그럼 돼지 김치찌개 하나랑 돌솥비빔밥 하나 주세요. 찌개에 라면사리도 추가할게요!',
            romanized: 'Geureom dwaeji gimchi-jjigae hana-rang dolsot-bibimbap hana juseyo. Jjigae-e ramyeon-sari-do chugahalgeyo!',
            textEn: 'Then please give us one Kimchi pork stew and one hot stone bibimbap. We will also add ramen noodles to the stew!',
            nuanceTip: '김치찌개에 "라면사리 추가"는 한국 백반 식당의 최고 정석 조합입니다.',
            intentTag: '김치찌개 + 돌솥비빔밥 + 라면사리',
            nextNodeId: 'restaurant_side_refill'
          },
          {
            id: 'c_rest_less_spicy',
            textKo: '제육볶음 하나랑 된장찌개 하나 주세요. 제가 매운 걸 잘 못 먹어서 제육볶음은 덜 맵게 부탁드려요!',
            romanized: 'Jeyukbokkeum hana-rang doenjang-jjigae hana juseyo. Jega maeun geol jal mot meogeoseo jeyukbokkeum-eun deol maepge butakdeuryeoyo!',
            textEn: 'One spicy pork and one soybean stew please. I cannot handle very spicy food, so please make the pork less spicy!',
            nuanceTip: '"덜 맵게 부탁드려요"는 매운맛 조절을 요청하는 필수 한국어 표현입니다.',
            intentTag: '덜 맵게 조리 요청',
            nextNodeId: 'restaurant_side_refill'
          }
        ]
      },

      restaurant_side_refill: {
        id: 'restaurant_side_refill',
        stepIndex: 3,
        totalSteps: 4,
        speakerRoleKo: '식당 이모님',
        speakerRoleEn: 'Restaurant Auntie',
        aiMessageKo: '네, 보글보글 찌개랑 밑반찬 6가지 나왔습니다~ 어묵볶음이랑 잡채, 겉절이 김치 모자라면 언제든 더 달라고 하세요!',
        aiMessageRomanized: 'Ne, bogeul-bogeul jjigae-rang mitbanchan yeoseot-gaji nawasseumnida~ Eomuk-bokkeum-irang japchae, geotjeori gimchi mojaramyeon eonjedeun deo dallago haseyo!',
        aiMessageEn: 'Here is the bubbling stew and 6 side dishes~ If you need more stir-fried fish cakes, japchae, or fresh kimchi, ask anytime!',
        sceneNoteKo: '뚝배기에서 찌개가 보글보글 끓고 정갈한 밑반찬이 차려집니다.',
        choices: [
          {
            id: 'c_rest_banchan_refill',
            textKo: '이모님! 잡채랑 어묵볶음이 너무 맛있는데 조금만 더 주실 수 있나요?',
            romanized: 'Imonim! Japchae-rang eomuk-bokkeum-i neomu mas-itneunde jogeumman deo jusil su 있nayo?',
            textEn: 'Auntie! The japchae and fish cakes are so delicious, could you give us a little more?',
            nuanceTip: '"너무 맛있는데 조금만 더 주실 수 있나요?"는 칭찬과 함께 부탁하는 가장 사랑받는 리필 화법입니다.',
            intentTag: '반찬 칭찬 및 리필 요청',
            nextNodeId: 'restaurant_end_success'
          },
          {
            id: 'c_rest_apron_water',
            textKo: '감사합니다! 혹시 옷에 튈까 봐 그런데 앞치마 두 개만 가져다주실 수 있나요?',
            romanized: 'Gamsahamnida! Hoksi ot-e twilkka bwa geureonde apchima du gae-man gajyeodajusil su 있nayo?',
            textEn: 'Thank you! In case it splatters on our clothes, could you bring us two aprons?',
            nuanceTip: '빨간 찌개를 먹기 전 "앞치마"를 요청하는 한국 식당의 생활 지혜입니다.',
            intentTag: '앞치마 요청',
            nextNodeId: 'restaurant_end_success'
          }
        ]
      },

      restaurant_end_success: {
        id: 'restaurant_end_success',
        stepIndex: 4,
        totalSteps: 4,
        speakerRoleKo: '식당 이모님',
        speakerRoleEn: 'Restaurant Auntie',
        aiMessageKo: '아이구, 맛있게 잘 먹어주니 내가 더 기분이 좋네! 깨끗한 앞치마랑 잡채 방금 무친 거 듬뿍 담아왔어요. 밥 부족하면 밥솥에서 더 퍼다 먹어요~',
        aiMessageRomanized: 'Aigu, mas-itge jal meogeojuni naega deo gibun-i jone! Kkaekkeut-han apchima-rang japchae banggeum muchin geo deumpuk dam-awasseoyo. Bap bujokhamyeon bapsot-eseo deo peoda meogeoyo~',
        aiMessageEn: 'Aww, seeing you enjoy the food makes me so happy! Brought clean aprons and a generous bowl of freshly seasoned japchae. Take more rice from the cooker if needed~',
        sceneNoteKo: '이모님이 푸근한 미소로 잡채를 가득 담아 테이블에 놓아줍니다.',
        choices: [],
        isEnding: true,
        endingSummary: {
          status: 'perfect',
          badgeKo: '🍲 백반 맛집 단골손님 (K-Dining Master)',
          badgeEn: 'Korean Dining Etiquette Pro',
          xpEarned: 50,
          feedbackKo: '메뉴 추천 청취, 덜 맵게 조리 옵션, 사리 추가 및 기분 좋은 반찬 리필 화법까지 한국 식당 소통을 완벽히 마스터하셨습니다!',
          feedbackEn: 'Mastered authentic Korean restaurant ordering, spicy seasoning adjustments, ramen add-ons, and warm banchan refill etiquette!',
          keyPoints: [
            '덜 맵게 해주세요 (Requesting milder spiciness)',
            '사리 추가 (Adding ramen or noodle portions)',
            '앞치마 요청 및 반찬 칭찬 리필 (Apron requests and complimenting banchan)'
          ],
          grammarNotes: [
            { title: '부사 "덜" + 형용사', desc: '정도를 낮출 때("덜 맵게", "덜 달게") 사용하는 대표적인 표현입니다.' },
            { title: '~을까 봐 그런데', desc: '우려되는 상황("옷에 튈까 봐")을 이유로 대며 부탁할 때 부드럽게 완곡화하는 문법입니다.' }
          ]
        }
      }
    }
  },

  // 10. TRADITIONAL STREET MARKET (GWANGJANG MARKET)
  {
    id: 'market',
    titleKo: '🍎 광장시장 분식 주문 & 이모님 정겨운 소통',
    titleEn: 'Gwangjang Traditional Market Street Food',
    badge: 'Street Food & Culture',
    category: 'lifestyle',
    difficulty: 'Beginner',
    roleKo: '시장 이모님 (AI) vs 손님 (회원님)',
    roleEn: 'Market Vendor Auntie (AI) vs Customer (You)',
    settingKo: '활기찬 종로 광장시장 포장마차 분식 골목입니다. 떡볶이, 찹쌀순대, 마약김밥을 주문하고 따끈한 어묵 국물을 마시며 이모님과 정을 나눠보세요.',
    settingEn: 'At the bustling street food alleys of Gwangjang Market. Order tteokbokki, blood sausage, and mini gimbap with warm broth.',
    image: 'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?auto=format&fit=crop&w=600&q=80',
    keyVocab: [
      { ko: '1인분 포장 / 먹고 가요', en: '1 serving takeout / dine here', pronunciation: 'il-inbun pojang / meokgo gayo' },
      { ko: '내장 섞어 주세요', en: 'mix with organs please', pronunciation: 'naejang seokkeo juseyo' },
      { ko: '어묵 국물', en: 'fish cake broth', pronunciation: 'eomuk gukmul' },
      { ko: '마약김밥 (겨자 소스)', en: 'mini gimbap with mustard sauce', pronunciation: 'mayak-gimbap' }
    ],
    rootNodeId: 'market_root',
    nodes: {
      market_root: {
        id: 'market_root',
        stepIndex: 1,
        totalSteps: 4,
        speakerRoleKo: '시장 이모님',
        speakerRoleEn: 'Market Vendor Auntie',
        aiMessageKo: '어서 와 학생! 방금 만든 쫀득쫀득한 쌀떡볶이랑 따끈한 순대 있어. 앉아서 먹고 갈 거지?',
        aiMessageRomanized: 'Eoseo wa haksaeng! Banggeum mandeun jjondeuk-jjondeuk-han ssal-tteokbokki-rang ttakkeunhan sundae isseo. Anj-aseo meokgo gal geoji?',
        aiMessageEn: 'Welcome student! Just made chewy rice tteokbokki and warm sundae. You\'ll sit and eat here, right?',
        sceneNoteKo: '김이 모락모락 나는 새빨간 떡볶이 판 앞에서 이모님이 반갑게 맞이합니다.',
        choices: [
          {
            id: 'c_market_eat_here',
            textKo: '네, 여기서 먹고 갈게요! 쌀떡볶이 1인분이랑 찹쌀순대 1인분 주세요.',
            romanized: 'Ne, yeogiseo meokgo galgeyo! Ssal-tteokbokki il-inbun-irang chapssal-sundae il-inbun juseyo.',
            textEn: 'Yes, I will eat here! 1 serving of rice tteokbokki and 1 serving of sticky sundae please.',
            nuanceTip: '매장에서 먹고 갈 것임을 밝히고 메뉴별 인분 수를 주문하는 모범적인 시장 표현입니다.',
            intentTag: '먹고 가기 + 떡볶이 1, 순대 1',
            nextNodeId: 'market_spicy_soup'
          },
          {
            id: 'c_market_pack_combo',
            textKo: '이모님, 숙소 가서 먹으려고 하는데 떡볶이랑 모둠 튀김 1인분씩 포장도 되나요?',
            romanized: 'Imonim, sukso gaseo meogeuryeogo haneunde tteokbokki-rang modum twigim il-inbun-ssik pojang-do doenayo?',
            textEn: 'Auntie, I want to eat at my lodging, can you pack 1 serving of tteokbokki and fried snacks for takeout?',
            nuanceTip: '포장(Takeout) 여부를 확인하며 친근하게 질문하는 표현입니다.',
            intentTag: '포장 주문 확인',
            nextNodeId: 'market_spicy_soup'
          }
        ]
      },

      market_spicy_soup: {
        id: 'market_spicy_soup',
        stepIndex: 2,
        totalSteps: 4,
        speakerRoleKo: '시장 이모님',
        speakerRoleEn: 'Market Vendor Auntie',
        aiMessageKo: '자, 종이컵에 따끈한 어묵 국물 먼저 마시고 있어~ 순대에 간이나 허파 같은 내장도 골고루 섞어줄까, 아니면 순대만 줄까?',
        aiMessageRomanized: 'Ja, jong-ikeop-e ttakkeunhan eomuk gukmul meonjeo masigo isseo~ Sundae-e gan-ina heopa gateun naejang-do golgoru seokkeojulkka, animyeon sundae-man julkka?',
        aiMessageEn: 'Here, drink some warm fish cake broth in a paper cup first~ Shall I mix in liver and lung organs with the sundae, or just pure sausage?',
        sceneNoteKo: '파가 송송 썰린 따끈한 어묵 국물 종이컵을 손에 쥐여줍니다.',
        choices: [
          {
            id: 'c_market_mix_organs',
            textKo: '간이랑 내장 다 좋아해요! 골고루 섞어 주시면 감사하겠습니다.',
            romanized: 'Gan-irang naejang da joahaeyo! Golgoru seokkeo jusimyeon gamsahagess-seumnida.',
            textEn: 'I love liver and all the organs! I would appreciate it if you mix them evenly.',
            nuanceTip: '한국인들이 분식집에서 순대 주문할 때 가장 좋아하는 취향 표현입니다.',
            intentTag: '내장 골고루 섞어 요청',
            nextNodeId: 'market_extra_treat'
          },
          {
            id: 'c_market_sundae_only',
            textKo: '저는 내장은 조금 어려워서 찰순대만 듬뿍 썰어주세요!',
            romanized: 'Jeoneun naejang-eun jogeum eoryeowoseo chal-sundae-man deumpuk sseoreojuseyo!',
            textEn: 'Organs are a bit difficult for me, so please just slice plenty of sticky sundae!',
            nuanceTip: '부담스러운 부위를 거절할 때 "조금 어렵다"라고 완곡하게 말하는 세련된 화법입니다.',
            intentTag: '순대만 요청 (완곡한 거절)',
            nextNodeId: 'market_extra_treat'
          }
        ]
      },

      market_extra_treat: {
        id: 'market_extra_treat',
        stepIndex: 3,
        totalSteps: 4,
        speakerRoleKo: '시장 이모님',
        speakerRoleEn: 'Market Vendor Auntie',
        aiMessageKo: '푸짐하게 썰어 담았어! 떡볶이 국물에 순대 콕 찍어 먹으면 꿀맛이야. 우리 집 겨자 소스 찍어 먹는 꼬마 마약김밥도 진짜 유명한데 맛볼래?',
        aiMessageRomanized: 'Pujimhage sseoreo dam-asseo! Tteokbokki gukmul-e sundae kok jjigeo meogeumyeon kkulmas-iya. Uri jip gyeoja soseu jjigeo meogneun kkoma mayak-gimbap-do jinjja yumyeonghande matbollae?',
        aiMessageEn: 'Generously sliced! Dipping sundae into tteokbokki sauce tastes like honey. Our mini gimbap dipped in mustard sauce is super famous too, wanna try?',
        sceneNoteKo: '새빨간 떡볶이와 김이 나는 순대 접시가 눈앞에 차려집니다.',
        choices: [
          {
            id: 'c_market_add_gimbap',
            textKo: '와, 떡볶이 국물에 김밥 찍어 먹으면 최고겠네요! 꼬마김밥 1인분도 추가해 주세요.',
            romanized: 'Wa, tteokbokki gukmul-e gimbap jjigeo meogeumyeon choegogetneyo! Kkoma-gimbap il-inbun-do chugahae juseyo.',
            textEn: 'Wow, dipping gimbap into tteokbokki sauce would be the best! Please add 1 serving of mini gimbap too.',
            nuanceTip: '시장 이모님의 추천에 기분 좋게 호응하며 세트를 완성하는 소통 표현입니다.',
            intentTag: '꼬마김밥 추가 주문',
            nextNodeId: 'market_end_success'
          },
          {
            id: 'c_market_full_pay',
            textKo: '이것만으로도 양이 진짜 많네요! 먹어보고 부족하면 더 시킬게요. 계좌이체나 카드 되나요?',
            romanized: 'Igeot-man-eurodo yang-i jinjja manneyo! Meogeobogo bujokhamyeon deo sikilgeyo. Gyejwai-che-na kadeu doenayo?',
            textEn: 'This alone is already a lot of food! I will try this first. Do you accept bank transfer or card?',
            nuanceTip: '정중하게 양해를 구하고 결제 수단을 확인하는 실속 있는 회화입니다.',
            intentTag: '양 칭찬 및 결제 수단 확인',
            nextNodeId: 'market_end_success'
          }
        ]
      },

      market_end_success: {
        id: 'market_end_success',
        stepIndex: 4,
        totalSteps: 4,
        speakerRoleKo: '시장 이모님',
        speakerRoleEn: 'Market Vendor Auntie',
        aiMessageKo: '당연히 카드도 되고 계좌이체도 되지! 어묵 국물 식으면 언제든 더 달라고 해~ 광장시장 와줘서 고마워, 맛있게 먹고 재미있게 구경하고 가!',
        aiMessageRomanized: 'Dang-yeonhi kadeu-do doego gyejwai-che-do doeji! Eomuk gukmul sig-eumyeon eonjedeun deo dallago hae~ Gwangjang sijang wajwoseo gomawo, mas-itge meokgo jaemi-itge gugyeonghago ga!',
        aiMessageEn: 'Of course card and bank transfer both work! Tell me anytime if the broth gets cold~ Thanks for coming to Gwangjang Market, enjoy your meal and have fun sightseeing!',
        sceneNoteKo: '이모님이 환한 미소로 어묵 국물 리필을 권하며 정을 베풉니다.',
        choices: [],
        isEnding: true,
        endingSummary: {
          status: 'perfect',
          badgeKo: '🍎 광장시장 정겨운 단골 (Market Food Explorer)',
          badgeEn: 'Traditional Market Master',
          xpEarned: 50,
          feedbackKo: '떡볶이·순대 주문, 내장 섞기 옵션, 떡볶이 국물 찍어먹기 팁과 따뜻한 시장 소통까지 한국 전통시장의 정(情)을 완벽하게 체험하셨습니다!',
          feedbackEn: 'Mastered authentic street food ordering, organ mixing choices, dipping etiquette, and heartfelt traditional market interactions!',
          keyPoints: [
            '내장 골고루 섞어 주세요 (Mixing organs with sundae)',
            '국물에 찍어 먹다 (Dipping food into tteokbokki sauce)',
            '시장 계좌이체/카드 결제 확인 (Market payment check)'
          ],
          grammarNotes: [
            { title: '어렵다 (완곡한 거절)', desc: '한국에서는 원치 않는 제안을 직설적으로 거절하기보다 "조금 어렵다"라고 돌려 말하는 것이 예의입니다.' },
            { title: '~에 찍어 먹다', desc: '소스나 국물에 음식을 살짝 묻혀 먹는 대표적인 식사 동작 표현입니다.' }
          ]
        }
      }
    }
  }
];

export interface Node3CRData {
  challenge: ThreeCRChallenge;
  consequence?: ThreeCRConsequence;
  reflection: ThreeCRReflection;
}

/**
 * Generates or retrieves the 3CR (Challenge - Choice - Consequence - Reflection) breakdown
 * for a specific node in a branching dialogue tree.
 */
export function getNode3CRBreakdown(
  scenario: BranchingScenario,
  node: DialogueNode,
  selectedChoice?: DialogueChoice
): Node3CRData {
  // 1. Challenge derivation
  let challenge: ThreeCRChallenge = node.challenge || {
    goalKo: `${scenario.roleKo.split('vs')[1]?.trim() || '학습자'} 입장에서 상황에 맞게 목적을 명확히 전달하고 응답하기`,
    goalEn: `State your intent clearly and respond appropriately as a ${scenario.roleEn.split('vs')[1]?.trim() || 'learner'}.`,
    contextKo: node.sceneNoteKo || scenario.settingKo,
    contextEn: node.sceneNote || scenario.settingEn,
    difficultyTag: node.stepIndex === 1 ? '도입 과제' : node.stepIndex === node.totalSteps ? '최종 매듭 과제' : '심화 대응 과제'
  };

  // Scenario specific tailored challenges for first nodes if not custom
  if (node.stepIndex === 1) {
    if (scenario.id === 'taxi') {
      challenge = {
        goalKo: '기사님에게 목적지를 정확히 전달하고 예상 소요 시간 및 경로를 질의하기',
        goalEn: 'Clearly convey your destination to the driver and inquire about route/time.',
        contextKo: '서울역 택시 승강장에서 기사님이 미터기를 켜며 목적지를 묻는 상황입니다.',
        contextEn: 'You just boarded a taxi at Seoul Station; the driver asks for your destination.',
        difficultyTag: '기초 도전과제'
      };
    } else if (scenario.id === 'cafe') {
      challenge = {
        goalKo: '원하는 음료 종류와 퍼스널 옵션(원두/온도/포장)을 점원에게 정중히 주문하기',
        goalEn: 'Politely order your beverage with personal options (bean, ice/hot, takeaway).',
        contextKo: '성수동 카페 카운터에서 바리스타가 주문을 준비하는 상황입니다.',
        contextEn: 'At a trendy cafe counter in Seongsu, the barista is ready for your order.',
        difficultyTag: '기초 주문과제'
      };
    } else if (scenario.id === 'hospital') {
      challenge = {
        goalKo: '통증이 발생한 부위와 증상 발생 시점을 의사에게 구체적으로 설명하기',
        goalEn: 'Describe the affected body part and onset of pain clearly to the doctor.',
        contextKo: '내과 진료실에서 의사가 어디가 불편한지 문진을 시작하는 상황입니다.',
        contextEn: 'In the consultation room, the doctor starts asking about your symptoms.',
        difficultyTag: '정확한 증상표현'
      };
    }
  }

  // 2. Consequence derivation based on chosen action
  let consequence: ThreeCRConsequence | undefined = node.consequence;
  if (!consequence && selectedChoice) {
    let reactionMood: ThreeCRConsequence['reactionMood'] = 'positive';
    let outcomeKo = `상대방(${node.speakerRoleKo})이 사용자의 요청을 수용하고 다음 대화로 이어집니다.`;
    let outcomeEn = `The speaker accepts your request and moves the conversation forward.`;
    let impactTagKo = '원활한 소통 진행';

    if (selectedChoice.intentTag?.includes('우회') || selectedChoice.intentTag?.includes('급행')) {
      reactionMood = 'impressed';
      outcomeKo = `기사님이 빠른 이동을 위해 최적의 도로 상황을 즉시 반영하여 경로를 잡습니다.`;
      outcomeEn = `The driver quickly takes the fastest alternate route.`;
      impactTagKo = '시간 단축 경로 선택';
    } else if (selectedChoice.intentTag?.includes('디카페인') || selectedChoice.intentTag?.includes('옵션')) {
      reactionMood = 'positive';
      outcomeKo = `바리스타가 고객의 맞춤 옵션을 포스기에 정확히 입력하고 결제를 준비합니다.`;
      outcomeEn = `The barista notes your exact custom order on the POS.`;
      impactTagKo = '맞춤형 옵션 반영';
    } else if (selectedChoice.intentTag?.includes('약국') || selectedChoice.intentTag?.includes('진통제')) {
      reactionMood = 'cautious';
      outcomeKo = `의사가 복용 중인 약을 고려해 안전한 처방전과 식후 복용법을 지도합니다.`;
      outcomeEn = `The doctor provides a safe prescription considering prior meds.`;
      impactTagKo = '안전한 맞춤 처방';
    }

    consequence = {
      outcomeKo,
      outcomeEn,
      reactionMood,
      impactTagKo
    };
  }

  // 3. Reflection derivation
  let reflection: ThreeCRReflection = node.reflection || {
    nuanceAnalysisKo: selectedChoice?.nuanceTip || (
      node.isEnding 
        ? '상황 전체의 맥락에 맞춰 존댓말 격식과 화용적 완곡 어법을 모범적으로 구사하셨습니다.' 
        : '한국어 일상 회화에서는 상대방의 직책/역할(기사님, 사장님, 원장님)을 배려하는 어미를 쓰는 것이 중요합니다.'
    ),
    grammarPatternKo: node.endingSummary?.grammarNotes?.[0]?.desc || '요청 표현: 동사 어간 + "~아/어 주세요" (정중한 부탁) / "~(으)시겠어요?" (정중한 권유)',
    culturalEtiquetteKo: '한국에서는 서비스 직종이나 초면인 상대에게 "저기요", "선생님/기사님/사장님" 호칭과 함께 부드러운 종결어미(~요, ~습니다)를 사용하는 것이 기본 에티켓입니다.',
    nativeAlternativeKo: '상대방의 제안에 동의할 때: "네, 그렇게 부탁드릴게요." / 조건을 붙일 때: "혹시 ~도 가능할까요?"'
  };

  return {
    challenge,
    consequence,
    reflection
  };
}

