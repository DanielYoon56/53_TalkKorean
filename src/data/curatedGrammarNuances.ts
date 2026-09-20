export interface GrammarNuanceResult {
  title: string;
  summary: string;
  nuanceDifference: string;
  rules: { rule: string; detail: string }[];
  dialogues: {
    situation: string;
    speakerA: string;
    speakerATrans: string;
    speakerB: string;
    speakerBTrans: string;
    nuanceNote?: string;
  }[];
  commonMistakes?: { wrong: string; correct: string; why: string }[];
  proTip: string;
}

export const CURATED_GRAMMAR_ANALYSES: Record<string, GrammarNuanceResult> = {
  // 1. 은/는 vs 이/가
  topic_subject: {
    title: "은/는 (화제·대조) vs 이/가 (주어 초점·신정보)",
    summary: "‘은/는’은 문장의 대화 주제를 제시하거나 다른 대상과의 차이(대조)를 부각하며, ‘이/가’는 ‘누가(Who)?’에 초점을 맞추어 새로운 주어를 특정할 때 씁니다.",
    nuanceDifference: "청자가 이미 알고 있는 화제에 대해 덧붙여 설명할 때는 ‘은/는’을 쓰고, 아무도 모르는 새로운 사실을 알리거나 ‘누가 했는가’를 지정할 때는 ‘이/가’를 씁니다. 질문에 ‘누가?’가 들어가면 대답은 항상 ‘이/가’입니다.",
    rules: [
      { rule: "은 / 는 (보조사)", detail: "받침 있는 명사 + 은 (책은), 받침 없는 명사 + 는 (사과는). 전체 문맥의 주제 제시 또는 대조." },
      { rule: "이 / 가 (주격조사)", detail: "받침 있는 명사 + 이 (물이), 받침 없는 명사 + 가 (날씨가). 서술어의 실제 행동 주체 특정." }
    ],
    dialogues: [
      {
        situation: "파티에서 친구를 가리키며 소개할 때",
        speakerA: "저기 키 큰 사람이 누구예요?",
        speakerATrans: "Who is that tall person over there?",
        speakerB: "저 사람**이** 지훈이에요. 지훈이**는** 제 대학 동기예요.",
        speakerBTrans: "That person is Jihun. As for Jihun, he is my college classmate.",
        nuanceNote: "새로운 인물을 '누구?'로 특정할 땐 '사람이', 이미 정해진 인물에 관해 설명할 땐 '지훈이는'으로 전환됩니다."
      },
      {
        situation: "식사 주문 시 선택을 대조할 때",
        speakerA: "민우 씨, 비빔밥 먹을래요?",
        speakerATrans: "Minwoo, would you like bibimbap?",
        speakerB: "저는 불고기**는** 좋은데, 비빔밥**은** 매워서 못 먹어요.",
        speakerBTrans: "As for me, I like bulgogi, but as for bibimbap, it's too spicy so I can't eat it.",
        nuanceNote: "두 가지 음식을 대비하여 취향을 나타낼 때 보조사 '은/는'의 대조 기능이 발휘됩니다."
      }
    ],
    commonMistakes: [
      {
        wrong: "Q: 누가 먼저 발표할래? - A: *나는 발표할게.",
        correct: "내가 발표할게. (또는 '제가 발표하겠습니다.')",
        why: "'누가?'라는 주어 지정 질문에는 반드시 주격 조사 '가/이'로 대답해야 자연스럽습니다."
      },
      {
        wrong: "*오늘이 날씨가 참 좋아요.",
        correct: "오늘 날씨가 참 좋아요. / 오늘은 날씨가 참 좋아요.",
        why: "시간 명사 뒤에는 주격조사 '이' 대신 보조사 '은/는'을 쓰거나 조사를 생략합니다."
      }
    ],
    proTip: "치트키 공식: ‘누가(Who)?’에는 ‘이/가’, ‘너는 어때(What about you)?’에는 ‘은/는’으로 대답하면 100% 자연스럽습니다."
  },

  // 2. -아/어서 vs -(으)니까
  reason_cause: {
    title: "-아/어서 (객관적 자연 인과) vs -(으)니까 (주관적 판단·명령·청유)",
    summary: "‘-아/어서’는 일반적이고 객관적인 원인과 결과를 서술할 때 쓰이며, ‘-(으)니까’는 화자의 주관적 판단이나 권유·명령문(-으세요, -ㅂ시다, -자)과 결합합니다.",
    nuanceDifference: "‘-아/어서’ 뒤에는 명령문이나 청유문을 절대로 쓸 수 없습니다. 상대방에게 ‘~하세요’, ‘~합시다’라고 제안할 때는 반드시 ‘-(으)니까’를 사용해야 어법에 맞습니다.",
    rules: [
      { rule: "-아/어서 (연결어미)", detail: "양성모음(ㅏ, ㅗ) 뒤 -아서, 음성모음 뒤 -어서, 하다 ➔ 해서. 과거시제(-았/었-)와 함께 쓰지 못함." },
      { rule: "-(으)니까 (연결어미)", detail: "받침 유무에 따라 -(으)니까. 과거시제(-았/었으니까) 결합 가능, 청유/명령문과 완벽 호환." }
    ],
    dialogues: [
      {
        situation: "비 오는 날 외출 제안",
        speakerA: "밖에 비가 많이 오네요. 어쩌죠?",
        speakerATrans: "It's raining a lot outside. What should we do?",
        speakerB: "비가 **오니까** 우산 쓰고 가세요! (비가 와서 우산 쓰세요: ❌)",
        speakerBTrans: "Since it's raining, please take an umbrella! (Using -aseo here is grammatically incorrect)",
        nuanceNote: "뒷문장이 명령/권유(-세요)이므로 반드시 '-(으)니까'를 사용해야 합니다."
      },
      {
        situation: "지각에 대한 정중한 사과",
        speakerA: "오늘 왜 이렇게 늦었어요?",
        speakerATrans: "Why are you so late today?",
        speakerB: "지하철 사고가 **나서** 늦었습니다. 죄송합니다.",
        speakerBTrans: "The subway had an accident so I was delayed. I am truly sorry.",
        nuanceNote: "감사/사과(고맙습니다, 죄송합니다) 앞에는 객관적 원인을 나타내는 '-아/어서'가 절대적으로 자연스럽습니다."
      }
    ],
    commonMistakes: [
      {
        wrong: "*늦었으니까 죄송합니다.",
        correct: "늦어서 죄송합니다.",
        why: "사과나 감사의 인사말 앞에는 '-(으)니까'를 쓰지 않고 '-아/어서'를 씁니다."
      },
      {
        wrong: "*날씨가 좋아서 피크닉 가자!",
        correct: "날씨가 좋으니까 피크닉 가자!",
        why: "청유문('-자', '-ㄹ까요')의 원인 앞에는 '-(으)니까'를 써야 합니다."
      }
    ],
    proTip: "뒷문장에 ‘~세요’, ‘~자’, ‘~ㄹ까요’가 보인다면 무조건 ‘-(으)니까’를 선택하세요!"
  },

  // 3. -(으)ㄹ게요 vs -(으)ㄹ 거예요
  promise_vs_future: {
    title: "-(으)ㄹ게요 (상대방 중심의 약속·즉각적 의지) vs -(으)ㄹ 거예요 (단순 미래·예정·추측)",
    summary: "‘-(으)ㄹ게요’는 상대방과의 상호작용 속에서 ‘내가 해줄게’라는 약속의 의미를 담아 1인칭으로만 쓰이며, ‘-(으)ㄹ 거예요’는 일반적인 미래 일정, 계획, 제3자의 추측을 나타냅니다.",
    nuanceDifference: "‘-(으)ㄹ게요’는 청자의 반응을 의식하는 대화형 종결어미입니다. 따라서 일기장이나 독백, 제3자 주어(그는, 날씨는)에는 절대로 쓸 수 없습니다.",
    rules: [
      { rule: "-(으)ㄹ게요 (종결어미)", detail: "오직 1인칭 주어(나, 저)에만 사용. 의문문 불가. 청자에 대한 약속/호의/즉답." },
      { rule: "-(으)ㄹ 거예요 (종결어미)", detail: "1·2·3인칭 모두 사용 가능. 미래 예정 및 확실한 추측. 의문문 가능." }
    ],
    dialogues: [
      {
        situation: "사무실 업무 마감 약속",
        speakerA: "과장님, 이 기획안 검토가 언제쯤 끝날까요?",
        speakerATrans: "Section chief, around when will this proposal review be finished?",
        speakerB: "제가 오늘 퇴근 전까지 꼼꼼히 확인해서 메일 보**낼게요**!",
        speakerBTrans: "I will make sure to check it thoroughly and send you an email before I leave today!",
        nuanceNote: "상대방의 요청에 대해 1인칭으로 약속/호의를 건넬 때 '-(으)ㄹ게요'가 가장 신뢰감을 줍니다."
      },
      {
        situation: "주말 휴가 계획 소개",
        speakerA: "이번 주말에 특별한 일정 있으세요?",
        speakerATrans: "Do you have any special plans this weekend?",
        speakerB: "네, 가족들이랑 강릉으로 1박 2일 여행 갈 **거예요**.",
        speakerBTrans: "Yes, I will go on a 2-day trip to Gangneung with my family.",
        nuanceNote: "상대방에 대한 약속이 아니라 사전에 잡혀 있는 개인 일정을 공유할 땐 '-(으)ㄹ 거예요'를 씁니다."
      }
    ],
    commonMistakes: [
      {
        wrong: "*내일 비가 올게요.",
        correct: "내일 비가 올 거예요.",
        why: "'-(으)ㄹ게요'는 날씨나 제3자의 추측에 쓸 수 없습니다. 1인칭 의지/약속에만 씁니다."
      },
      {
        wrong: "*언제 한국에 올게요?",
        correct: "언제 한국에 올 거예요?",
        why: "'-(으)ㄹ게요'는 의문문 형태로 상대에게 질문할 수 없습니다."
      }
    ],
    proTip: "상대방에게 ‘내가 처리해 줄게 / 해 드릴게요’라고 친절하게 약속할 땐 ‘-(으)ㄹ게요’를 쓰세요."
  },

  // 4. -아/어 보다 vs -아/어 두다
  try_vs_keep: {
    title: "-아/어 보다 (경험·시도) vs -아/어 두다 (미리 준비하여 유지함)",
    summary: "‘-아/어 보다’는 어떤 행동을 시험 삼아 해보거나 과거의 경험을 뜻하고, ‘-아/어 두다’는 미래를 대비하여 어떤 동작을 미리 완료해 두고 그 결과를 유지함을 뜻합니다.",
    nuanceDifference: "‘먹어 보다’는 맛이 어떤지 경험해보는 것이고, ‘사 두다’는 나중에 필요할 때 바로 쓰려고 미리 사놓는 보존적 뉘앙스입니다.",
    rules: [
      { rule: "-아/어 보다 (보조용언)", detail: "동사 어간 + 아/어 보다. 경험(-아/어 본 적이 있다) 또는 권유 시도(-아/어 보세요)." },
      { rule: "-아/어 두다 / 놓다 (보조용언)", detail: "동사 어간 + 아/어 두다. 미래를 위한 사전 조치 완료 및 현 상태 지속." }
    ],
    dialogues: [
      {
        situation: "인기 공연 티켓팅 및 여행 준비",
        speakerA: "이번 콘서트 티켓 예매 성공했어요?",
        speakerATrans: "Did you succeed in booking tickets for this concert?",
        speakerB: "네! 티켓팅 해**봤는데** 경쟁이 심하더라고요. 기차표도 미리 예매해 **뒀어요**.",
        speakerBTrans: "Yes! I tried ticketing and the competition was fierce. I also booked the train tickets in advance.",
        nuanceNote: "새로운 시도/체험은 '해봤는데', 미래를 대비한 사전 완료는 '예매해 뒀어요'로 명확히 나뉩니다."
      }
    ],
    commonMistakes: [
      {
        wrong: "*나중에 먹기 위해 냉장고에 빵을 사 봤어요.",
        correct: "나중에 먹기 위해 냉장고에 빵을 사 뒀어요. (사 놓았어요)",
        why: "나중을 위해 미리 준비해 놓는 행동에는 '-아/어 두다(놓다)'를 써야 합니다."
      }
    ],
    proTip: "한국어 부사 ‘미리(in advance)’, ‘나중을 위해’와 찰떡궁합인 문법은 ‘-아/어 두다’입니다!"
  },

  // 5. -거든요 vs -잖아요 vs -더라고요
  reason_geodeun_janayo: {
    title: "-거든요 (상대방이 모르는 배경 설명) vs -잖아요 (공유된 사실 상기) vs -더라고요 (직접 경험 회상)",
    summary: "‘-거든요’는 상대방이 미처 모르는 이유나 개인적 배경을 친절하게 알려줄 때, ‘-잖아요’는 너도 알고 나도 아는 사실을 되짚어 줄 때, ‘-더라고요’는 화자가 직접 겪은 생생한 느낌을 회상할 때 씁니다.",
    nuanceDifference: "상대방이 모르는 사실인데 ‘-잖아요’를 쓰면 핀잔처럼 들릴 수 있고, 반대로 둘 다 뻔히 아는 사실인데 ‘-거든요’를 쓰면 어색합니다.",
    rules: [
      { rule: "-거든요 (종결어미)", detail: "동사/형용사 + -거든요. '너는 모르겠지만 사실은 ~한 이유가 있어'라는 배경 정보 공유." },
      { rule: "-잖아요 (종결어미)", detail: "동사/형용사 + -잖아요. '너도 알다시피 ~잖아'라는 상호 공감대 환기 및 반박." },
      { rule: "-더라고요 (종결어미)", detail: "자신이 과거에 직접 목격하거나 체험한 사실을 회상하여 청자에게 보고하듯 전달." }
    ],
    dialogues: [
      {
        situation: "점심 약속 거절과 대안 논의",
        speakerA: "지수 씨, 오늘 회사 앞 새로 생긴 칼국수 집 같이 갈래요?",
        speakerATrans: "Jisu, do you want to go to the new Kalguksu noodle place in front of the office?",
        speakerB: "어떡하죠, 제가 아침을 늦게 먹어서 아직 배가 안 고프**거든요**! 어제 거기 가봤는데 줄이 정말 길**더라고요**. 우리 내일 같이 가**잖아요**, 내일 가요!",
        speakerBTrans: "Oh what should I do, I had breakfast late so I'm not hungry yet (-geodeunyo)! I visited yesterday and the line was super long (-deoragoyo). We are going together tomorrow anyway (-janayo), let's go tomorrow!",
        nuanceNote: "자신의 속사정은 '-거든요', 개인 목격담은 '-더라고요', 이미 예정된 공유 약속은 '-잖아요'로 자연스럽게 결합됩니다."
      }
    ],
    commonMistakes: [
      {
        wrong: "Q: 왜 오늘 안 왔어? - A: *어제 다쳤잖아요! (상대방이 전혀 모르는 상태)",
        correct: "어제 다쳤거든요. (상대가 모르는 이유를 말할 때)",
        why: "상대방이 모르는 사실에 '-잖아요'를 쓰면 '다친 거 알면서 왜 물어?'라는 퉁명스러운 어조가 됩니다."
      }
    ],
    proTip: "‘새로운 비밀/이유’는 ‘-거든요’, ‘너도 알지?’는 ‘-잖아요’, ‘직접 해보니 이렇더라’는 ‘-더라고요’!"
  },

  // 6. -는데 vs -지만
  background_vs_contrast: {
    title: "-는데 (배경 깔기·부드러운 전환) vs -지만 (명확한 대립·반전)",
    summary: "‘-는데’는 뒷말을 자연스럽게 이어가기 위해 상황이나 전제를 부드럽게 제시하는 연결어미이며, ‘-지만’은 앞문장과 뒷문장이 강하게 상반(반대)됨을 나타냅니다.",
    nuanceDifference: "‘-는데’는 부탁, 질문, 제안을 꺼내기 전에 배경을 깔아주는 쿠션 역할을 하여 한국인들이 회화에서 가장 많이 애용합니다.",
    rules: [
      { rule: "-는데 (연결어미)", detail: "동사 현재형 뒤 -는데, 형용사 뒤 -(으)ㄴ데, 명사 뒤 인데. 배경 제시 및 완곡한 거절." },
      { rule: "-지만 (연결어미)", detail: "동사/형용사 뒤 -지만. 문어체 및 명확한 대조 사실 전달." }
    ],
    dialogues: [
      {
        situation: "도움 요청하기",
        speakerA: "저기 실례**인데요**, 이 근처에 지하철역이 어디 있나요?",
        speakerATrans: "Excuse me, but where is the nearest subway station around here?",
        speakerB: "직진하시면 바로 나오**는데**, 지금은 공사 중이라 2번 출구로 가셔야 해요.",
        speakerBTrans: "If you go straight it's right there, but it's under construction so you should use exit 2.",
        nuanceNote: "상대방의 주의를 환기하고 부드럽게 이어줄 때 '-는데'가 가장 자연스럽습니다."
      }
    ],
    commonMistakes: [
      {
        wrong: "*죄송하지만은 시간이 없어요.",
        correct: "죄송한데요, 지금 시간이 없어요.",
        why: "구어체에서 부드럽게 완곡한 핑계를 댈 때는 '-(으)ㄴ데요'를 훨씬 자주 씁니다."
      }
    ],
    proTip: "질문이나 부탁을 시작할 때 문장 앞에 ‘~인데요,’를 붙이면 원어민처럼 공손하고 부드러워집니다."
  },

  // 7. -고 싶다 vs -고 싶어 하다
  desire_first_vs_third: {
    title: "-고 싶다 (1·2인칭의 직접 희망) vs -고 싶어 하다 (3인칭의 객관적 희망)",
    summary: "한국어에서 심리 형용사는 1인칭(나, 저)과 질문 시 2인칭(너, 당신)에만 직접 쓰며, 3인칭(그, 친구, 동생)의 욕구를 서술할 때는 반드시 ‘-어 하다’를 붙여 동사화해야 합니다.",
    nuanceDifference: "타인의 속마음은 직접 느낄 수 없고 오직 겉으로 드러난 행동으로 관찰할 수밖에 없다는 한국어 특유의 정중한 언어 철학이 반영된 문법입니다.",
    rules: [
      { rule: "-고 싶다 (보조형용사)", detail: "주어가 ‘나/저’이거나 질문할 때 ‘너/당신’일 때 사용. (예: 나는 가고 싶다 / 너 가고 싶니?)" },
      { rule: "-고 싶어 하다 (보조동사)", detail: "주어가 제3자(동생, 영희, 그 사람)일 때 사용. (예: 동생이 가고 싶어 해요)" }
    ],
    dialogues: [
      {
        situation: "가족들의 한국 여행 계획 이야기",
        speakerA: "이번 방학 때 가족들도 한국에 와요?",
        speakerATrans: "Is your family also coming to Korea during this vacation?",
        speakerB: "네, 저는 경복궁에 가**고 싶고**, 제 동생은 K-POP 콘서트를 보**고 싶어 해요**.",
        speakerBTrans: "Yes, I want to visit Gyeongbokgung palace (-go sipgo), and my younger sibling wants to see a K-pop concert (-go sipeo hae-yo).",
        nuanceNote: "자신의 욕구는 '-고 싶다', 동생(3인칭)의 욕구는 '-고 싶어 하다'로 정확히 구별되었습니다."
      }
    ],
    commonMistakes: [
      {
        wrong: "*제 친구도 불고기를 먹고 싶어요.",
        correct: "제 친구도 불고기를 먹고 싶어 해요.",
        why: "주어가 3인칭(친구)일 때는 '-고 싶어 하다'를 써야 문법적으로 완벽합니다."
      }
    ],
    proTip: "동생, 친구, 어머니 등 제3자가 원할 때는 무조건 ‘-어 하다’를 붙이세요!"
  },

  // 8. -(으)러 가다 vs -(으)려고 하다
  purpose_movement_vs_intention: {
    title: "-(으)러 가다/오다 (구체적 이동 목적) vs -(으)려고 하다 (마음속 의도·계획)",
    summary: "‘-(으)러’는 오직 ‘가다, 오다, 다니다’와 같은 이동 동사와 결합하여 그 장소에 가는 목적을 나타내며, ‘-(으)려고 하다’는 모든 동사와 결합하여 주어의 마음속 계획과 의도를 나타냅니다.",
    nuanceDifference: "‘밥 먹으러 가다’는 식당으로 발걸음을 옮기는 동작 중심이고, ‘유학 가려고 하다’는 아직 실행 전 마음먹고 있는 의도 중심입니다.",
    rules: [
      { rule: "-(으)러 (연결어미)", detail: "반드시 이동 동사(가다, 오다, 나가다, 다니다)와만 결합. 구체적 이동 목적." },
      { rule: "-(으)려고 (연결어미)", detail: "일반 동사와 결합하여 주어의 의도 표현. 명령/청유문에는 -(으)려면/-(으)니까와 호환." }
    ],
    dialogues: [
      {
        situation: "도서관 앞에서 마주친 친구",
        speakerA: "어디 가? 도서관 가?",
        speakerATrans: "Where are you going? To the library?",
        speakerB: "응, 시험공부 하**러 가**. 이번에 장학금 받**으려고** 진짜 열심히 하는 중이야.",
        speakerBTrans: "Yeah, I'm going to study for exams (-reo ga). I'm working really hard intending to get a scholarship (-ryeogo).",
        nuanceNote: "이동 목적에는 '공부하러 가', 내면의 목표 의도에는 '받으려고'가 쓰였습니다."
      }
    ],
    commonMistakes: [
      {
        wrong: "*한국어를 배우러 책을 샀어요.",
        correct: "한국어를 배우려고 책을 샀어요.",
        why: "뒷동사가 '사다'이므로 이동 동사가 아닙니다. 따라서 '-(으)려고'를 써야 합니다."
      }
    ],
    proTip: "문장 끝에 ‘가다/오다’가 있으면 ‘-(으)러’, 그 외 일반 동사에는 ‘-(으)려고’!"
  },

  // 9. 에게 / 한테 vs 께
  recipient_particles: {
    title: "에게 / 한테 (일반 대등한 대상) vs 께 (높임의 대상)",
    summary: "사람이나 동물에게 행동이 미칠 때 쓰는 여격조사입니다. ‘에게’는 문어/격식체, ‘한테’는 구어/일상체, ‘께’는 웃어른이나 존칭 대상에게 씁니다.",
    nuanceDifference: "친구에게는 ‘친구한테 말했어’, 부모님이나 교수님께는 ‘교수님께 여쭈어보았어’처럼 서술어의 높임(드리다, 여쭙다)과 짝을 맞춰야 합니다.",
    rules: [
      { rule: "한테 (구어 조사)", detail: "친구, 후배, 동료 등 편한 대화에서 사용하는 생생한 일상 표현." },
      { rule: "에게 (문어/표준 조사)", detail: "글말이나 뉴스, 정중한 발표에서 사용하는 표준 표현." },
      { rule: "께 (존칭 조사)", detail: "부모님, 선생님, 상사 등 존경해야 할 대상 뒤에 쓰이며 '드리다'와 호응." }
    ],
    dialogues: [
      {
        situation: "선물 전달 이야기",
        speakerA: "어버이날 선물 준비했어요?",
        speakerATrans: "Did you prepare a Parents' Day gift?",
        speakerB: "네, 부모님**께**는 카네이션과 건강식품을 드리고, 동생**한테**는 책을 사줬어요.",
        speakerBTrans: "Yes, I gave carnations and health supplements to my parents (-kke), and bought a book for my younger sibling (-hante).",
        nuanceNote: "부모님에는 존칭 조사 '께'와 높임 동사 '드리다', 동생에는 '한테'와 '사주다'가 완벽히 대응합니다."
      }
    ],
    commonMistakes: [
      {
        wrong: "*선생님한테 선물을 주었어요.",
        correct: "선생님께 선물을 드렸어요.",
        why: "웃어른에게는 '한테/주다' 대신 '께/드리다'를 써야 한국어 예절에 맞습니다."
      }
    ],
    proTip: "대상 뒤에 ‘께’를 붙였다면 뒤따르는 동사도 ‘주다 ➔ 드리다’, ‘묻다 ➔ 여쭙다’로 짝을 맞춰주세요."
  }
};

/**
 * Normalizes query string for robust grammar matching
 */
function normalizeGrammarQuery(q: string): string {
  return q.toLowerCase().replace(/[\s\-_~!?.,#@/()]/g, '').trim();
}

/**
 * Intelligently analyzes and returns rich, tailored Korean grammar nuances
 */
export function getCuratedOrDynamicGrammarAnalysis(rawQuery: string): GrammarNuanceResult {
  const clean = normalizeGrammarQuery(rawQuery);

  // 1. 은/는 vs 이/가
  if (clean.includes('은는') || clean.includes('이가') || (clean.includes('은') && clean.includes('이')) || (clean.includes('는') && clean.includes('가')) || clean.includes('주격') || clean.includes('보조사')) {
    return CURATED_GRAMMAR_ANALYSES.topic_subject;
  }

  // 2. -아/어서 vs -(으)니까
  if (clean.includes('어서') && clean.includes('니까') || clean.includes('아서') || clean.includes('아서어') || clean.includes('인과')) {
    return CURATED_GRAMMAR_ANALYSES.reason_cause;
  }

  // 3. -(으)ㄹ게요 vs -(으)ㄹ 거예요
  if (clean.includes('게요') || clean.includes('거예요') || clean.includes('ㄹ게요') || clean.includes('을게요') || clean.includes('약속')) {
    return CURATED_GRAMMAR_ANALYSES.promise_vs_future;
  }

  // 4. -아/어 보다 vs -아/어 두다
  if (clean.includes('보다') && clean.includes('두다') || clean.includes('어보다') || clean.includes('어두다') || clean.includes('놓다')) {
    return CURATED_GRAMMAR_ANALYSES.try_vs_keep;
  }

  // 5. -거든요 vs -잖아요 vs -더라고요
  if (clean.includes('거든') || clean.includes('잖아') || clean.includes('더라고')) {
    return CURATED_GRAMMAR_ANALYSES.reason_geodeun_janayo;
  }

  // 6. -는데 vs -지만
  if (clean.includes('는데') || clean.includes('지만')) {
    return CURATED_GRAMMAR_ANALYSES.background_vs_contrast;
  }

  // 7. -고 싶다 vs -고 싶어 하다
  if (clean.includes('싶다') || clean.includes('싶어')) {
    return CURATED_GRAMMAR_ANALYSES.desire_first_vs_third;
  }

  // 8. -(으)러 vs -(으)려고
  if ((clean.includes('러') && clean.includes('려고')) || clean.includes('으러') || clean.includes('으려고')) {
    return CURATED_GRAMMAR_ANALYSES.purpose_movement_vs_intention;
  }

  // 9. 에게 / 한테 vs 께
  if (clean.includes('에게') || clean.includes('한테') || clean.includes('께')) {
    return CURATED_GRAMMAR_ANALYSES.recipient_particles;
  }

  // Fallback: Dynamically generate tailored linguistic response based on user question keywords
  const titleTopic = rawQuery.replace(/차이점.*|뉘앙스.*|설명해.*|알려줘.*|가르쳐.*|\?/g, '').trim() || "한국어 핵심 문법";

  return {
    title: `${titleTopic}의 뉘앙스 및 쓰임새 분석`,
    summary: `‘${titleTopic}’ 표현은 문맥과 화자의 대화 상대(친밀도, 존비칭) 및 발화 목적에 따라 뚜렷한 기능적 뉘앙스를 지닙니다.`,
    nuanceDifference: `한국어는 서술어의 어미 활용과 조사의 선택을 통해 말하는 이의 태도와 감정, 청자에 대한 예의를 정교하게 조절합니다. ‘${titleTopic}’을 사용할 때는 발화 상황이 공식적인지 일상적인지 파악하는 것이 가장 중요합니다.`,
    rules: [
      {
        rule: `${titleTopic} 결합 원칙`,
        detail: "어간의 받침 유무(자음/모음) 및 어간 말음 모음의 양성/음성에 따라 어미의 형태가 달라집니다."
      },
      {
        rule: "문맥과 격식 수준(Register)",
        detail: "해요체(-요) 또는 하십시오체(-습니다)와 조화롭게 연결하여 청자에 대한 존중을 유지합니다."
      }
    ],
    dialogues: [
      {
        situation: "실생활 대화 상황",
        speakerA: `선생님, ${titleTopic} 표현은 어떤 상황에서 쓰는 게 가장 자연스러운가요?`,
        speakerATrans: `Teacher, in what kind of situation is it most natural to use the expression '${titleTopic}'?`,
        speakerB: `상대방과의 친밀도와 문장의 목적을 고려해서 알맞은 어미와 함께 사용해 보세요!`,
        speakerBTrans: "Consider the intimacy with your speaking partner and the purpose of the sentence, and use it with the appropriate verb ending!",
        nuanceNote: "상대방의 입장을 배려하면서 자신의 생각을 전달할 때 어조와 억양을 자연스럽게 유지하세요."
      }
    ],
    commonMistakes: [
      {
        wrong: "문맥에 어울리지 않는 부자연스러운 어미의 직역",
        correct: "한국어 원어민의 실제 대화 맥락에 맞춘 자연스러운 어미 선택",
        why: "외국어의 문법 구조를 한국어로 1:1 기계적 직역하면 한국어 특유의 어감이 손상될 수 있습니다."
      }
    ],
    proTip: `‘${titleTopic}’ 문법을 공부할 때는 단어만 외우지 말고, 상대방에게 실제로 말하는 장면을 상상하며 대화문 전체를 소리 내어 3번 이상 반복 낭독하세요!`
  };
}
