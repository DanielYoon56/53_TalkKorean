export interface SlangExplanation {
  term: string;
  romanized: string;
  category?: 'reaction' | 'life' | 'chat' | 'fandom';
  meaningKo: string;
  meaningEn: string;
  meaning?: string;
  originKo: string;
  originEn: string;
  origin?: string;
  socialContextKo: string;
  socialContextEn: string;
  socialContext?: string;
  politeEquivalentKo: string;
  politeEquivalentEn: string;
  registerWarning: string;
  examples: {
    korean: string;
    romanized: string;
    english: string;
  }[];
}

export const CURATED_SLANG_DICTIONARY: Record<string, SlangExplanation> = {
  '뇌피셜': {
    term: '뇌피셜',
    romanized: 'Noe-pi-syeol',
    category: 'reaction',
    meaningKo: '공식적인 근거 없이 자신의 머리(생각)에서 나온 주관적인 주장이나 추측',
    meaningEn: "One's personal, unverified theory / Brain-official (subjective speculation presented as fact)",
    meaning: "One's personal, unverified theory / Brain-official (subjective speculation presented as fact)",
    originKo: '‘뇌(腦, Brain)’ + ‘오피셜(Official, 공식 발표)’의 합성어. 공인된 공식 발표에 빗대어 오직 개인의 뇌 속 생각일 뿐임을 풍자하는 단어입니다.',
    originEn: 'Portmanteau of "Noe (뇌 - Brain)" and "Official (오피셜)". Sarcastic wordplay contrasting official verified news with subjective musings in one’s own head.',
    origin: 'Portmanteau of "Noe (뇌 - Brain)" and "Official (오피셜)". Sarcastic wordplay contrasting official verified news with subjective musings in one’s own head.',
    socialContextKo: '인터넷 커뮤니티, 유튜브 추측 영상, 친구와의 토론 등에서 근거 없는 썰이나 가설을 제시할 때 자조적/유머러스하게 씁니다.',
    socialContextEn: 'Widely used in online forums, YouTube analysis videos, and friendly banters when proposing hypotheses or unconfirmed rumors.',
    socialContext: 'Widely used in online forums, YouTube analysis videos, and friendly banters when proposing hypotheses or unconfirmed rumors.',
    politeEquivalentKo: '개인적인 추측(의견)입니다. / 공식적으로 확인되지 않은 생각입니다.',
    politeEquivalentEn: 'This is my personal speculation / unverified opinion.',
    registerWarning: '인터넷 신조어이므로 직장 공식 보고서, 학술 발표, 어르신과의 대화에서는 절대 피하세요.',
    examples: [
      {
        korean: '그 뉴스 진짜 공식 기사야, 아니면 그냥 네 뇌피셜이야?',
        romanized: 'Geu nyuseu jinjja gongsik gisaya, animyeon geunyang ne noepisyeoriya?',
        english: 'Is that news an official article, or just your own wild speculation?'
      },
      {
        korean: '제 뇌피셜이지만, 이번 신곡 뮤직비디오는 세계관 떡밥인 것 같아요.',
        romanized: 'Je noepisyeor-ijiman, ibeon singok myujikbidioneun segyegwan tteokbap-in geot gatayo.',
        english: "It's just my personal theory, but I think this music video drops huge hints for their lore."
      }
    ]
  },
  '폭망': {
    term: '폭망',
    romanized: 'Pok-mang',
    category: 'reaction',
    meaningKo: '폭발하듯 엄청나게 심하게 완전히 망함',
    meaningEn: 'Epic disaster / Total flop / Completely ruined',
    meaning: 'Epic disaster / Total flop / Completely ruined',
    originKo: '‘폭(暴, 폭발적/심하게)’ + ‘망하다(亡, 망치다)’의 합성어로 어떤 계획이나 시험, 흥행이 돌이킬 수 없이 실패했음을 뜻합니다.',
    originEn: 'Combines "Pok (폭 - explosively/severely)" + "Mang-hada (망하다 - to be ruined/fail)", meaning an absolute, catastrophic failure.',
    origin: 'Combines "Pok (폭 - explosively/severely)" + "Mang-hada (망하다 - to be ruined/fail)", meaning an absolute, catastrophic failure.',
    socialContextKo: '시험 점수, 주식 투자, 영화 박스오피스, 비즈니스 등이 처참하게 잘 안 풀렸을 때 과장하여 코믹하게 탄식할 때 씁니다.',
    socialContextEn: 'Used when laughing off bad test results, failed business ventures, or movie flops among close peers.',
    socialContext: 'Used when laughing off bad test results, failed business ventures, or movie flops among close peers.',
    politeEquivalentKo: '완전히 실패했습니다. / 큰 낭패를 보았습니다.',
    politeEquivalentEn: 'It was a complete failure / It turned into a major setback.',
    registerWarning: '격식 있는 자리에서는 "실패", "부진" 등의 표준어를 사용하는 것이 안전합니다.',
    examples: [
      {
        korean: '어제 밤샘 공부 하나도 안 하고 잤더니 오늘 시험 완전 폭망했어 ㅠㅠ',
        romanized: 'Eoje bamsaem gongbu hanado an hago jatdeoni oneul siheom wanjeon pokmanghaesseo ㅠㅠ',
        english: "I fell asleep without studying last night and totally bombed today's exam ㅠㅠ"
      },
      {
        korean: '그 영화 기대 엄청 많이 했는데 스토리 개연성 부족으로 흥행 폭망했대.',
        romanized: 'Geu yeonghwa gidae eomcheong mani haenneunde seutori gaeyeonseong bujog-euro heunghaeng pokmanghaettae.',
        english: 'People had high hopes for that movie, but due to poor plot logic it totally flopped at the box office.'
      }
    ]
  },
  '어쩔티비': {
    term: '어쩔티비',
    romanized: 'Eojjeol-TV',
    category: 'reaction',
    meaningKo: '“어쩌라고 가서 TV나 봐”라는 의미로 상대방의 말에 빈정거리며 유치하게 대꾸하는 밈',
    meaningEn: '“So what? Go watch TV / Whatever, who asked?” (Playful playground comeback)',
    meaning: '“So what? Go watch TV / Whatever, who asked?” (Playful playground comeback)',
    originKo: '‘어쩌라고’에 무의미한 가전제품 ‘티비(TV)’를 붙인 말. 이후 ‘저쩔냉장고’, ‘안물세탁기’ 등으로 파생되었습니다.',
    originEn: 'Combines "Eojjeorago" (So what?) + "TV". Started as elementary school/TikTok comeback banter, spawning variants like "Jeojjeol-refrigerator".',
    origin: 'Combines "Eojjeorago" (So what?) + "TV". Started as elementary school/TikTok comeback banter, spawning variants like "Jeojjeol-refrigerator".',
    socialContextKo: '잔소리나 참견을 하는 친구에게 장난으로 약 올릴 때 씁니다.',
    socialContextEn: 'Playful meme used jokingly among friends or siblings to dismiss unsolicited nagging.',
    socialContext: 'Playful meme used jokingly among friends or siblings to dismiss unsolicited nagging.',
    politeEquivalentKo: '제 일은 제가 알아서 하겠습니다.',
    politeEquivalentEn: 'I will take care of my own matter, thank you.',
    registerWarning: '장난이 아닌 상대나 상급자에게 쓰면 큰 결례가 되므로 오직 절친 사이의 농담으로만 쓰세요.',
    examples: [
      {
        korean: 'A: 야 너 오늘 옷 스타일 좀 이상해. / B: 어쩔티비~ 내 맘인데?',
        romanized: 'A: Ya neo oneul ot seutail jom isanghae. / B: Eojjeol-TV~ nae mam-inde?',
        english: 'A: Hey, your outfit today is weird. / B: So what, go watch TV~ I wear what I want!'
      }
    ]
  },
  '억까': {
    term: '억까',
    romanized: 'Eok-kka',
    category: 'reaction',
    meaningKo: '정당한 이유 없이 억지로 꼬투리를 잡아 비난하거나, 운이 극도로 안 따르는 억울한 상황',
    meaningEn: 'Unreasonable criticism / Total bad luck (Unfair absurdity / Forced hate)',
    meaning: 'Unreasonable criticism / Total bad luck (Unfair absurdity / Forced hate)',
    originKo: '‘억지로 까다(비난하다)’의 줄임말. 게임 및 인터넷 방송 문화에서 불합리한 억울함을 호소하며 널리 퍼졌습니다.',
    originEn: 'Short for "Eokjiro Kkada (억지로 까다 - unreasonably bashing)". Used when being unfairly scrutinized or when game mechanics/luck conspire against you.',
    origin: 'Short for "Eokjiro Kkada (억지로 까다 - unreasonably bashing)". Used when being unfairly scrutinized or when game mechanics/luck conspire against you.',
    socialContextKo: '인터넷 악플러들의 억지 비난을 방어하거나, 일상에서 억울하게 손해를 보았을 때 씁니다.',
    socialContextEn: 'Used to call out unreasonable haters or lament absurd streaks of bad luck.',
    socialContext: 'Used to call out unreasonable haters or lament absurd streaks of bad luck.',
    politeEquivalentKo: '부당한 비판입니다. / 불합리한 상황이었습니다.',
    politeEquivalentEn: 'That is unreasonable criticism / It was an unfortunate, unfair situation.',
    registerWarning: '비속어 어원(까다)이 포함되어 있으므로 공적인 발표나 공식 문서에서는 사용을 피하세요.',
    examples: [
      {
        korean: '단지 실수 한 번 했다고 인신공격까지 하는 건 완전 억까잖아.',
        romanized: 'Danji silsu han beon haetdago insingonggyeok-kkaji haneun geon wanjeon eok-kkajana.',
        english: 'Making personal attacks just over a single mistake is totally unfair nitpicking.'
      },
      {
        korean: '우산 챙겨 나온 날만 맑고, 깜빡한 날만 폭우 오는 거 실화냐? 진짜 날씨 억까 심하네.',
        romanized: 'Usan chaenggyeo naon nalman malgo, kkamppakhan nalman pogu oneun geo silhwanya? Jinjja nalssi eok-kka simhane.',
        english: 'It is sunny only when I carry an umbrella and pours when I forget it? The weather is totally trolling me.'
      }
    ]
  },
  '알잘딱깔센': {
    term: '알잘딱깔센',
    romanized: 'Al-jal-ttak-kkal-sen',
    category: 'life',
    meaningKo: '말하지 않아도 알아서 잘 딱 깔끔하고 센스 있게 행동함',
    meaningEn: 'Doing things skillfully, neatly, and sensibly without needing instructions',
    meaning: 'Doing things skillfully, neatly, and sensibly without needing instructions',
    originKo: '‘알아서 + 잘 + 딱 + 깔끔하고 + 센스있게’의 5단어 머리글자를 딴 조어입니다. 스트리머 우왁굳의 방송에서 유래하여 전국민 유행어가 되었습니다.',
    originEn: 'Acronym for "Al-aseo (알아서 - on your own) + Jal (잘 - well) + Ttak (딱 - just right) + Kkal-kkeum (깔끔하게 - neatly) + Sense (센스있게 - with tact)".',
    origin: 'Acronym for "Al-aseo (알아서 - on your own) + Jal (잘 - well) + Ttak (딱 - just right) + Kkal-kkeum (깔끔하게 - neatly) + Sense (센스있게 - with tact)".',
    socialContextKo: '능숙하고 일머리 좋은 동료나 센스 있는 후배를 칭찬하거나 지시할 때 유쾌하게 씁니다.',
    socialContextEn: 'Used as high praise for a proactive colleague or friend who handles things flawlessly.',
    socialContext: 'Used as high praise for a proactive colleague or friend who handles things flawlessly.',
    politeEquivalentKo: '능숙하고 센스 있게 잘 처리하겠습니다.',
    politeEquivalentEn: 'I will handle this skillfully and tactfully on my own initiative.',
    registerWarning: '긍정적인 뉘앙스로 직장 동료 간 가벼운 대화나 SNS에서도 널리 허용됩니다.',
    examples: [
      {
        korean: '김 대리는 지시 안 해도 알아서 보고서 알잘딱깔센으로 준비해오네!',
        romanized: 'Kim daeri-neun jisi an haedo araseo bogoseo aljalttakkalsen-euro junbihaeone!',
        english: 'Assistant Manager Kim prepares reports neatly and sensibly without even needing instructions!'
      }
    ]
  },
  '갓생': {
    term: '갓생',
    romanized: 'God-saeng',
    category: 'life',
    meaningKo: '신(God)처럼 모범적이고 성실하며 부지런하게 하루하루를 알차게 사는 삶',
    meaningEn: 'Living a disciplined, diligent, and inspiringly productive lifestyle',
    meaning: 'Living a disciplined, diligent, and inspiringly productive lifestyle',
    originKo: '영어 ‘God(신)’ + 한국어 ‘생(生, 삶)’의 합성어로 2020년대 자기계발 열풍 속에서 대표 키워드로 정착했습니다.',
    originEn: 'Blend of English "God" and Sino-Korean "Saeng (生 - life)", referring to an admirable daily routine filled with exercise, study, and positive habits.',
    origin: 'Blend of English "God" and Sino-Korean "Saeng (生 - life)", referring to an admirable daily routine filled with exercise, study, and positive habits.',
    socialContextKo: '아침 기상(미라클 모닝), 운동, 독서 등 긍정적 목표를 다짐하거나 실천하는 사람을 응원할 때 씁니다.',
    socialContextEn: 'Widely shared on social media by young Koreans striving for self-improvement and fitness.',
    socialContext: 'Widely shared on social media by young Koreans striving for self-improvement and fitness.',
    politeEquivalentKo: '성실하고 모범적인 일상을 보내고 있습니다.',
    politeEquivalentEn: 'I am maintaining a diligent and exemplary daily routine.',
    registerWarning: '신문 기사나 출판물에서도 널리 쓰일 정도로 건강하고 긍정적인 단어입니다.',
    examples: [
      {
        korean: '새해 목표로 매일 아침 러닝하고 한국어 공부하면서 갓생 살기 도전 중이야!',
        romanized: 'Saehae mokpyo-ro maeil achim reonning-hago hangugeo gongbuhandamyeonseo godsaeng salgi dojeon jung-iya!',
        english: 'As my New Year resolution, I am challenging myself to live a productive God-saeng by running every morning and studying Korean!'
      }
    ]
  },
  '존버': {
    term: '존버',
    romanized: 'Jon-beo',
    category: 'life',
    meaningKo: '극심한 고통이나 하락장, 어려운 상황 속에서도 포기하지 않고 끝까지 인내하며 버팀',
    meaningEn: 'Holding on for dear life / Patiently enduring tough times (Diamond hands)',
    meaning: 'Holding on for dear life / Patiently enduring tough times (Diamond hands)',
    originKo: '‘존나(매우/지독하게)’ + ‘버티다’의 축약어. 주식 및 가상화폐 시장에서 폭락을 견디는 투자자들의 유행어에서 시작되었습니다.',
    originEn: 'Portmanteau of "Jon-na (intensely)" + "Beo-ti-da (to endure)". Originally from crypto/stock trading, meaning stubbornly holding on through thick and thin.',
    origin: 'Portmanteau of "Jon-na (intensely)" + "Beo-ti-da (to endure)". Originally from crypto/stock trading, meaning stubbornly holding on through thick and thin.',
    socialContextKo: '힘든 시험 기간, 취업 준비, 프로젝트 마감, 투자 등에서 꿋꿋이 참아낼 때 씁니다.',
    socialContextEn: 'Used when encouraging someone or pledging to endure demanding jobs, exams, or financial dips.',
    socialContext: 'Used when encouraging someone or pledging to endure demanding jobs, exams, or financial dips.',
    politeEquivalentKo: '끝까지 끈기 있게 참고 견뎌보겠습니다.',
    politeEquivalentEn: 'I will patiently persevere until the very end.',
    registerWarning: '어원에 비속어가 포함되어 있어 직장 상사나 격식 있는 자리에서는 "인내", "버티다"를 쓰세요.',
    examples: [
      {
        korean: '이번 프로젝트 마감일까지 힘들어도 카페에서 커피 마시면서 존버하자!',
        romanized: 'Ibeon peurojekteu magam-ilkkaji himdeureodo kape-eseo keopi masimyeonseo jonbeohaja!',
        english: "Even though this project deadline is tough, let's tough it out at the café with coffee!"
      }
    ]
  },
  '쌉가능': {
    term: '쌉가능',
    romanized: 'Ssap-ga-neung',
    category: 'chat',
    meaningKo: '100% 완벽하게 충분히 가능함 (누워서 떡 먹기)',
    meaningEn: '100% possible / Totally doable / Piece of cake',
    meaning: '100% possible / Totally doable / Piece of cake',
    originKo: '강조 접두사 ‘쌉-’ + 한자어 ‘가능(可能)’의 결합. 어떤 요구사항이나 약속이 아주 손쉽게 가능하다는 뜻입니다.',
    originEn: 'An emphatic slang prefix "Ssap-" attached to "Ganeung (가능 - possible)", meaning "absolutely, undeniably doable without question".',
    origin: 'An emphatic slang prefix "Ssap-" attached to "Ganeung (가능 - possible)", meaning "absolutely, undeniably doable without question".',
    socialContextKo: '친구와의 약속 시간, 게임 요청, 심부름 등 흔쾌히 수락할 때 시원하게 씁니다.',
    socialContextEn: 'Used when confidently and casually accepting a friend’s invitation or challenge.',
    socialContext: 'Used when confidently and casually accepting a friend’s invitation or challenge.',
    politeEquivalentKo: '충분히 가능합니다. / 문제없이 처리할 수 있습니다.',
    politeEquivalentEn: 'That is completely possible / I can handle it without any issue.',
    registerWarning: '친구 및 인터넷 채팅용 강조어이므로 공식 업무 이메일에서는 피해야 합니다.',
    examples: [
      {
        korean: 'A: 30분 안에 역 앞으로 나올 수 있어? / B: 지금 바로 나가면 쌉가능이지!',
        romanized: 'A: Samsipbun ane yeok apeuro naol su isseo? / B: Jigeum baro nagamyeon ssapganeung-iji!',
        english: 'A: Can you come to the front of the station in 30 minutes? / B: If I leave right now, 100% doable!'
      }
    ]
  },
  '점메추': {
    term: '점메추',
    romanized: 'Jeom-me-chu',
    category: 'chat',
    meaningKo: '“점심 메뉴 추천”을 줄여 부르는 말 (저녁은 저메추)',
    meaningEn: 'Lunch Menu Recommendation Request (Short for Jeomsim Menu Chucheon)',
    meaning: 'Lunch Menu Recommendation Request (Short for Jeomsim Menu Chucheon)',
    originKo: '‘점심 + 메뉴 + 추천’의 앞 글자를 딴 3음절 축약어입니다.',
    originEn: 'Acronym formed from "Jeomsim (점심 - lunch) + Menu (메뉴) + Chucheon (추천 - recommendation)". Dinner version is "Jeo-me-chu".',
    origin: 'Acronym formed from "Jeomsim (점심 - lunch) + Menu (메뉴) + Chucheon (추천 - recommendation)". Dinner version is "Jeo-me-chu".',
    socialContextKo: '직장인 단체 카톡방이나 친구들과 점심 먹기 전 메뉴를 고민할 때 가장 많이 씁니다.',
    socialContextEn: 'Essential everyday phrase asked in group chats among coworkers and friends around 11:30 AM.',
    socialContext: 'Essential everyday phrase asked in group chats among coworkers and friends around 11:30 AM.',
    politeEquivalentKo: '점심 메뉴를 추천해주실 수 있나요?',
    politeEquivalentEn: 'Could you please recommend a lunch menu?',
    registerWarning: '친근한 직장 동료나 친구들 사이에서 즐겁게 쓸 수 있는 무해하고 귀여운 줄임말입니다.',
    examples: [
      {
        korean: '오늘 비도 오는데 따뜻한 국물 있는 걸로 점메추 좀 해주세요!',
        romanized: 'Oneul bido oneunde ttatteut-han gukmul inneun geollo jeommechu jom haejuseyo!',
        english: "It's raining today, please give me some lunch recommendations for warm soup!"
      }
    ]
  },
  '스불재': {
    term: '스불재',
    romanized: 'Seu-bul-jae',
    category: 'life',
    meaningKo: '스스로 자초하여 불러온 재앙 (자업자득)',
    meaningEn: 'Self-inflicted disaster / Suffering from one’s own poor choices',
    meaning: 'Self-inflicted disaster / Suffering from one’s own poor choices',
    originKo: '‘스스로 불러온 재앙’의 머리글자. 애니메이션 신해철의 노래 가사 "스스로 불러온 재앙에 짓눌려"에서 유래된 인터넷 밈입니다.',
    originEn: 'Short for "Seuseuro Bul-leon Jaeang (스스로 불러온 재앙 - a disaster brought upon oneself)". Used self-deprecatingly when regretting procrastination or impulse spending.',
    origin: 'Short for "Seuseuro Bul-leon Jaeang (스스로 불러온 재앙 - a disaster brought upon oneself)". Used self-deprecatingly when regretting procrastination or impulse spending.',
    socialContextKo: '새벽까지 넷플릭스 보다가 지각하거나, 무리하게 약속을 많이 잡고 후회할 때 자조적으로 씁니다.',
    socialContextEn: 'Humorously self-deprecating when suffering the predictable consequences of staying up late or overspending.',
    socialContext: 'Humorously self-deprecating when suffering the predictable consequences of staying up late or overspending.',
    politeEquivalentKo: '제가 자초한 결과입니다. / 자업자득입니다.',
    politeEquivalentEn: 'It is a result I brought upon myself / You reap what you sow.',
    registerWarning: '자책형 유머 단어로 친구끼리 웃으며 쓰기 좋습니다.',
    examples: [
      {
        korean: '내일 아침 9시 출근인데 밤새 게임한 건 진짜 내 스불재다...',
        romanized: 'Naeil achim ahopsi chulgeun-inde bamsae geim-han geon jinjja nae seubuljaeda...',
        english: "Having to be at work at 9 AM and gaming all night was truly my own self-inflicted disaster..."
      }
    ]
  },
  '핑프': {
    term: '핑프',
    romanized: 'Ping-peu',
    category: 'chat',
    meaningKo: '검색창에 3초만 쳐보면 나오는 기본 정보도 스스로 찾지 않고 남에게 다 물어보는 사람',
    meaningEn: '“Finger Princess/Prince” (Someone too lazy to google simple things)',
    meaning: '“Finger Princess/Prince” (Someone too lazy to google simple things)',
    originKo: '‘핑거 프린세스(Finger Princess/Prince)’의 줄임말. 손가락 하나 까딱하기 싫어하는 게으른 태도를 꼬집는 단어입니다.',
    originEn: 'Short for "Finger Princess/Prince". Describes someone who refuses to lift a finger to search Google and expects others to spoon-feed answers.',
    origin: 'Short for "Finger Princess/Prince". Describes someone who refuses to lift a finger to search Google and expects others to spoon-feed answers.',
    socialContextKo: '커뮤니티 질문글이나 스터디 단톡방에서 검색 없이 뻔한 질문을 올리는 사람을 비판할 때 씁니다.',
    socialContextEn: 'Used on internet forums to tell lazy questioners to search before asking repetitive basics.',
    socialContext: 'Used on internet forums to tell lazy questioners to search before asking repetitive basics.',
    politeEquivalentKo: '직접 검색해보신 후 질문해주시면 감사하겠습니다.',
    politeEquivalentEn: 'I would appreciate it if you searched first before asking.',
    registerWarning: '상대방을 직접 "핑프"라고 부르면 비난이 될 수 있으므로 주의하세요.',
    examples: [
      {
        korean: '포털 사이트에 검색하면 1초 만에 나오는 걸 왜 자꾸 물어봐? 핑프 탈출하자!',
        romanized: 'Poteol saiteu-e geomsaekhamyeon ilcho mane naoneun geol wae jakku mureobwa? Pingpeu talchulhaja!',
        english: "Why do you keep asking things that show up in 1 second on a search engine? Don't be a finger princess!"
      }
    ]
  },
  '분좋카': {
    term: '분좋카',
    romanized: 'Bun-jo-ka',
    category: 'life',
    meaningKo: '인테리어, 조명, 뷰 등 분위기가 근사하고 감성적인 카페',
    meaningEn: 'Café with great aesthetic vibes and cozy atmosphere',
    meaning: 'Café with great aesthetic vibes and cozy atmosphere',
    originKo: '‘분위기 좋은 카페’의 앞 글자를 딴 3음절 축약어입니다.',
    originEn: 'Portmanteau of "Bun-wi-gi (분위기 - atmosphere/vibe) + Jo-eun (좋은 - good) + Café (카페)".',
    origin: 'Portmanteau of "Bun-wi-gi (분위기 - atmosphere/vibe) + Jo-eun (좋은 - good) + Café (카페)".',
    socialContextKo: '인스타그램 핫플레이스나 성수동, 연남동 데이트 코스를 추천할 때 활발히 쓰입니다.',
    socialContextEn: 'Popular hashtag on Instagram and KakaoTalk when looking for photogenic aesthetic cafés.',
    socialContext: 'Popular hashtag on Instagram and KakaoTalk when looking for photogenic aesthetic cafés.',
    politeEquivalentKo: '분위기가 아늑하고 훌륭한 카페입니다.',
    politeEquivalentEn: 'It is a café with wonderful, cozy ambiance.',
    registerWarning: '일상 대화나 SNS 포스팅에 아주 자연스럽게 사용되는 표준적 트렌드 용어입니다.',
    examples: [
      {
        korean: '주말에 성수동에서 커피 마시려고 하는데 분좋카 아는 곳 있으면 추천해줘!',
        romanized: 'Jumare seongsudong-eseo keopi masiryeogo haneunde bunjoka aneun got isseumyeon chucheonhaejwo!',
        english: 'I plan to drink coffee in Seongsu-dong this weekend, please recommend a café with great vibes if you know any!'
      }
    ]
  },
  '삼귀다': {
    term: '삼귀다',
    romanized: 'Sam-gwi-da',
    category: 'chat',
    meaningKo: '연인으로 ‘사(4)귀기’ 전 단계로, 서로 호감을 갖고 알아가는 ‘썸 타는 3단계’ 상태',
    meaningEn: 'In the “Some” talking stage (The stage 3 before officially dating/4-gwida)',
    meaning: 'In the “Some” talking stage (The stage 3 before officially dating/4-gwida)',
    originKo: '‘사귀다’의 ‘사’가 숫자 ‘4(사)’와 발음이 같은 점에 착안하여, 4 이전의 ‘3(삼)’을 붙여 연애 직전 썸 단계를 표현한 위트 있는 조어입니다.',
    originEn: 'Playful pun on "Sa-gwi-da (사귀다 - to date)". Since "Sa" sounds like number 4, "Sam (3)" is used for the preliminary mutual-crush talking stage before officially dating.',
    origin: 'Playful pun on "Sa-gwi-da (사귀다 - to date)". Since "Sa" sounds like number 4, "Sam (3)" is used for the preliminary mutual-crush talking stage before officially dating.',
    socialContextKo: '친구들에게 아직 정식 연인은 아니지만 매일 연락하며 썸 타고 있는 달콤한 상태를 고백할 때 씁니다.',
    socialContextEn: 'Used among young Koreans teasingly discussing a blossoming romantic interest.',
    socialContext: 'Used among young Koreans teasingly discussing a blossoming romantic interest.',
    politeEquivalentKo: '서로 호감을 갖고 알아가는 단계입니다.',
    politeEquivalentEn: 'We are currently in the stage of getting to know each other with mutual interest.',
    registerWarning: '달콤한 신조어로 연애 상담이나 친구 간의 대화에 적합합니다.',
    examples: [
      {
        korean: '우리 아직 정식으로 사귀는 건 아니고 삼귀는 중이야 ㅎㅎ',
        romanized: 'Uri ajik jeongsik-euro sagwineun geon anigo samgwineun jung-iya ㅎㅎ',
        english: "We are not officially dating yet, but we are in that sweet talking stage (samgwi-da) ㅎㅎ"
      }
    ]
  },
  '완내스': {
    term: '완내스',
    romanized: 'Wan-nae-seu',
    category: 'life',
    meaningKo: '완전 내 스타일! (자신의 취향에 완벽하게 맞음)',
    meaningEn: 'Totally my style / Completely my cup of tea',
    meaning: 'Totally my style / Completely my cup of tea',
    originKo: '‘완전 + 내 + 스타일’의 3음절 축약어입니다.',
    originEn: 'Short for "Wanjeon (완전 - totally) + Nae (내 - my) + Style (스타일)".',
    origin: 'Short for "Wanjeon (완전 - totally) + Nae (내 - my) + Style (스타일)".',
    socialContextKo: '마음에 드는 옷, 인테리어 소품, 음식, 음악 등을 발견했을 때 감탄사로 씁니다.',
    socialContextEn: 'Exclaimed enthusiastically when spotting favorite fashion, music, or food.',
    socialContext: 'Exclaimed enthusiastically when spotting favorite fashion, music, or food.',
    politeEquivalentKo: '제 취향에 완벽히 부합합니다.',
    politeEquivalentEn: 'It aligns perfectly with my personal taste.',
    registerWarning: '가벼운 쇼핑이나 일상 리액션으로 쓰기 좋습니다.',
    examples: [
      {
        korean: '이번 신상 재킷 컬러감 진짜 완내스라서 바로 결제했잖아!',
        romanized: 'Ibeon sinsang jaekit keolleogam jinjja wannaeseu-raseo baro gyeoljehaetjana!',
        english: 'The color of this new jacket is totally my style so I purchased it right away!'
      }
    ]
  },
  '좋댓구알': {
    term: '좋댓구알',
    romanized: 'Jo-daet-gu-al',
    category: 'chat',
    meaningKo: '유튜브 채널 운영자가 요청하는 "좋아요, 댓글, 구독, 알림설정"',
    meaningEn: 'Like, Comment, Subscribe, and Notifications (YouTube standard mantra)',
    meaning: 'Like, Comment, Subscribe, and Notifications (YouTube standard mantra)',
    originKo: '‘좋아요 + 댓글 + 구독 + 알림설정’의 4음절 축약어입니다.',
    originEn: 'Acronym for "Johayo (좋아요 - Like) + Daetgeul (댓글 - Comment) + Gudok (구독 - Subscribe) + Allim-seoljeong (알림설정 - Bell Notification)".',
    origin: 'Acronym for "Johayo (좋아요 - Like) + Daetgeul (댓글 - Comment) + Gudok (구독 - Subscribe) + Allim-seoljeong (알림설정 - Bell Notification)".',
    socialContextKo: '유튜브 크리에이터나 인플루언서들이 영상 마무리 멘트로 유쾌하게 외칩니다.',
    socialContextEn: 'Universally used by Korean YouTubers at the end of every video.',
    socialContext: 'Universally used by Korean YouTubers at the end of every video.',
    politeEquivalentKo: '구독과 좋아요, 알림 설정을 부탁드립니다.',
    politeEquivalentEn: 'Please like, subscribe, and turn on notifications.',
    registerWarning: '미디어 플랫폼 유행어입니다.',
    examples: [
      {
        korean: '오늘 영상이 유익하셨다면 좋댓구알 잊지 마세요~!',
        romanized: 'Oneul yeongsang-i yuikhasyeotdamyeon jodaetgual itji maseyo~!',
        english: "If today's video was helpful, don't forget to Like, Comment, Subscribe, and hit the Notification bell~!"
      }
    ]
  },
  '최애': {
    term: '최애',
    romanized: 'Choe-ae',
    category: 'fandom',
    meaningKo: '그룹이나 작품 중에서 가장 아끼고 사랑하는 대상 (본진/원픽)',
    meaningEn: 'My absolute favorite / Bias (in a K-POP group or show)',
    meaning: 'My absolute favorite / Bias (in a K-POP group or show)',
    originKo: '‘최고(最高)로 애정(愛情)하는 대상’의 한자어 축약. 2위는 ‘차애’, 가장 덜 아끼는 쪽은 ‘삼애’라고도 부릅니다.',
    originEn: 'Portmanteau of Sino-Korean "Choego (최고 - Best/Most)" + "Aejeong (애정 - Affection/Love)". The second favorite is called "Cha-ae (차애)".',
    origin: 'Portmanteau of Sino-Korean "Choego (최고 - Best/Most)" + "Aejeong (애정 - Affection/Love)". The second favorite is called "Cha-ae (차애)".',
    socialContextKo: 'K-POP 팬덤, 애니메이션, 음식 취향(예: 내 최애 떡볶이) 등 폭넓게 사용됩니다.',
    socialContextEn: 'Essential K-culture word used for bias member, favorite café menu, or beloved movie.',
    socialContext: 'Essential K-culture word used for bias member, favorite café menu, or beloved movie.',
    politeEquivalentKo: '가장 좋아하는 대상(멤버)입니다.',
    politeEquivalentEn: 'This is my favorite member / item.',
    registerWarning: '방송 자막과 일상 대화에 완전히 정착된 대중적인 표현입니다.',
    examples: [
      {
        korean: '내 뉴진스 최애는 해린이고, 차애는 민지야!',
        romanized: 'Nae NewJeans choeaeneun Haerin-igo, cha-aeneun Minji-ya!',
        english: 'My bias in NewJeans is Haerin, and my bias-wrecker is Minji!'
      }
    ]
  },
  '입덕': {
    term: '입덕',
    romanized: 'Ip-deok',
    category: 'fandom',
    meaningKo: '어떤 연예인, 아티스트, 취미에 매료되어 열렬한 팬이 되는 첫 순간',
    meaningEn: 'Becoming a devoted fan / Falling down the rabbit hole for a group or hobby',
    meaning: 'Becoming a devoted fan / Falling down the rabbit hole for a group or hobby',
    originKo: '‘들 입(入)’ + ‘덕후(Otaku/팬)’의 결합. 반대말은 팬 활동을 그만두는 ‘탈덕(脫德)’입니다.',
    originEn: 'Combines Sino-Korean "Ip (입 - to enter)" + "Deokhu (덕후 - fan/enthusiast)". The opposite (quitting a fandom) is "Tal-deok (탈덕)".',
    origin: 'Combines Sino-Korean "Ip (입 - to enter)" + "Deokhu (덕후 - fan/enthusiast)". The opposite (quitting a fandom) is "Tal-deok (탈덕)".',
    socialContextKo: 'K-POP 아이돌의 직캠 무대나 음악을 듣고 팬클럽에 가입할 때 씁니다.',
    socialContextEn: 'Describes the exact magical moment you fell in love with a group and became an official fan.',
    socialContext: 'Describes the exact magical moment you fell in love with a group and became an official fan.',
    politeEquivalentKo: '팬이 되었습니다. / 팬클럽에 가입했습니다.',
    politeEquivalentEn: 'I became a passionate fan / joined the fandom.',
    registerWarning: 'K-컬처 및 취미 생활을 이야기할 때 표준어처럼 널리 쓰입니다.',
    examples: [
      {
        korean: '이번 라이브 콘서트 영상 보고 보컬 실력에 치여서 완전히 입덕했어!',
        romanized: 'Ibeon raibeu konseoteu yeongsang bogo bokeol sillyeog-e chiyeoseo wanjeonhi ipdeokhaesseo!',
        english: 'After seeing the live concert video, their vocal prowess struck me and I completely became a devoted fan!'
      }
    ]
  },
  '내로남불': {
    term: '내로남불',
    romanized: 'Nae-ro-nam-bul',
    category: 'reaction',
    meaningKo: '내가 하면 로맨스, 남이 하면 불륜 (남에겐 엄격하고 자신에겐 관대한 이중 잣대)',
    meaningEn: 'Double standard / Hypocrisy (Romance if I do it, affair if others do it)',
    meaning: 'Double standard / Hypocrisy (Romance if I do it, affair if others do it)',
    originKo: '‘내가 하면 로맨스 남이 하면 불륜’의 사자성어 형태 줄임말로, 1990년대 정계에서 유래하여 보편적 비판 용어가 되었습니다.',
    originEn: 'Famous Korean idiom: "If I do it, it is romance; if others do it, it is infidelity." Used to call out hypocrisy and double standards.',
    origin: 'Famous Korean idiom: "If I do it, it is romance; if others do it, it is infidelity." Used to call out hypocrisy and double standards.',
    socialContextKo: '자신은 약속에 늦으면서 남의 지각에 화를 내는 등 모순된 태도를 지적할 때 씁니다.',
    socialContextEn: 'Used widely in news editorials, political debates, and everyday disagreements against hypocrites.',
    socialContext: 'Used widely in news editorials, political debates, and everyday disagreements against hypocrites.',
    politeEquivalentKo: '이중 잣대입니다. / 일관성이 부족한 처사입니다.',
    politeEquivalentEn: 'That is a double standard / inconsistent attitude.',
    registerWarning: '비판적 뉘앙스가 강하므로 상대와의 관계를 고려하여 신중히 쓰세요.',
    examples: [
      {
        korean: '자기도 스마트폰 보면서 남한테 집중 안 한다고 화내는 건 완전 내로남불이지.',
        romanized: 'Jagido seumateupon bomyeonseo namhante jipjung an handago hwanaeneun geon wanjeon naeronamburiji.',
        english: "Looking at your own phone while getting angry at others for not paying attention is a complete double standard."
      }
    ]
  },
  '현타': {
    term: '현타',
    romanized: 'Hyeon-ta',
    category: 'reaction',
    meaningKo: '현실 자각 타임 (헛된 환상이나 과도한 몰입 후 현실을 깨닫고 밀려오는 허탈감)',
    meaningEn: 'Reality check / Sudden disillusionment (Reality awareness time)',
    meaning: 'Reality check / Sudden disillusionment (Reality awareness time)',
    originKo: '‘현실 자각 타임(Time)’의 축약어로 일본어 ‘현자타임’에서 파생되어 대중화되었습니다.',
    originEn: 'Short for "Hyeonsil Jagak Time (현실 자각 타임 - Reality Awareness Time)". Describes the sudden sigh when returning to earthly reality.',
    origin: 'Short for "Hyeonsil Jagak Time (현실 자각 타임 - Reality Awareness Time)". Describes the sudden sigh when returning to earthly reality.',
    socialContextKo: '주말 내내 밤샘 게임을 하거나 과소비 후 월요일 출근길에 느낄 때 씁니다.',
    socialContextEn: 'Common when reflecting on long hours of gaming or excessive shopping after a fun binge.',
    socialContext: 'Common when reflecting on long hours of gaming or excessive shopping after a fun binge.',
    politeEquivalentKo: '현실을 실감하게 되었습니다. / 허탈감을 느낍니다.',
    politeEquivalentEn: 'I realized practical reality / I feel a wave of disillusionment.',
    registerWarning: '일상적인 한탄이나 위트 있는 자기반성 대화에 널리 쓰입니다.',
    examples: [
      {
        korean: '콘서트 끝나고 집에 돌아오는 지하철 안에서 갑자기 깊은 현타가 찾아왔다...',
        romanized: 'Konseoteu kkeutnago jibe doraoneun jihacheol aneseo gapjagi gipeun hyeontaga chajawatda...',
        english: 'On the subway ride home after the epic concert, a deep reality check suddenly hit me...'
      }
    ]
  },
  '만관부': {
    term: '만관부',
    romanized: 'Man-gwan-bu',
    category: 'chat',
    meaningKo: '많은 관심 부탁드립니다 (홍보, 신곡 발표 시 인사)',
    meaningEn: '“Please show lots of interest and love!” (Friendly promo abbreviation)',
    meaning: '“Please show lots of interest and love!” (Friendly promo abbreviation)',
    originKo: '‘많은 관심 부탁드립니다’의 첫 글자를 딴 MZ세대 대표 인사 축약어입니다.',
    originEn: 'Acronym for "Man-eun Gwan-sim Bu-tak-deu-rim-ni-da (많은 관심 부탁드립니다)".',
    origin: 'Acronym for "Man-eun Gwan-sim Bu-tak-deu-rim-ni-da (많은 관심 부탁드립니다)".',
    socialContextKo: '유튜브 신규 영상, 인스타그램 게시물, 공연 홍보 등에서 산뜻하게 씁니다.',
    socialContextEn: 'Used on Twitter/X, Instagram, and YouTube by creators launching new songs or content.',
    socialContext: 'Used on Twitter/X, Instagram, and YouTube by creators launching new songs or content.',
    politeEquivalentKo: '많은 관심과 성원 부탁드립니다.',
    politeEquivalentEn: 'We kindly request your earnest attention and support.',
    registerWarning: '밝고 긍정적인 줄임말로 SNS와 캐주얼 마케팅에서 널리 활용됩니다.',
    examples: [
      {
        korean: '저희가 6개월 동안 열심히 준비한 한국어 앱 드디어 런칭했습니다! 만관부~ ❤️',
        romanized: 'Jeohwiga yukgaewol dongan yeolsimhi junbihan hangugeo aep deudieo reonchinghaetseumnida! Mangwanbu~ ❤️',
        english: "We finally launched the Korean learning app we worked on for 6 months! Please show lots of love~ ❤️"
      }
    ]
  },
  '소확행': {
    term: '소확행',
    romanized: 'So-hwak-haeng',
    category: 'life',
    meaningKo: '소소하지만 확실한 행복 (일상 속의 작은 즐거움)',
    meaningEn: 'Small but certain happiness (Joy found in humble everyday moments)',
    meaning: 'Small but certain happiness (Joy found in humble everyday moments)',
    originKo: '무라카미 하루키의 수필집에서 유래된 문구를 바탕으로 한국 사회에 정착한 힐링 키워드입니다.',
    originEn: 'Acronym for "So-sohajiman Hwaksilhan Haengbok (소소하지만 확실한 행복)". Derived from a literary essay, celebrated as a cornerstone of Korean lifestyle philosophy.',
    origin: 'Acronym for "So-sohajiman Hwaksilhan Haengbok (소소하지만 확실한 행복)". Derived from a literary essay, celebrated as a cornerstone of Korean lifestyle philosophy.',
    socialContextKo: '퇴근 후 따뜻한 샤워, 좋아하는 베이커리 빵 한 조각 등 평범한 행복을 이야기할 때 씁니다.',
    socialContextEn: 'Used when appreciating simple pleasures like fresh coffee, a warm blanket, or good music.',
    socialContext: 'Used when appreciating simple pleasures like fresh coffee, a warm blanket, or good music.',
    politeEquivalentKo: '일상 속의 소박하고 확실한 행복입니다.',
    politeEquivalentEn: 'It is a humble and certain joy in daily life.',
    registerWarning: '신문 사설, 방송, 책 제목 등 격식 있는 자리에서도 품격 있게 인정받는 표현입니다.',
    examples: [
      {
        korean: '퇴근하고 시원한 바람맞으며 좋아하는 노래 듣는 게 나의 가장 큰 소확행이야.',
        romanized: 'Toegeunhago siwonhan baram-majeumyeo joahaneun norae deunneun ge naui gajang keun sohwakhaeng-iya.',
        english: 'Listening to my favorite song while feeling the cool breeze after work is my biggest small-certain-happiness.'
      }
    ]
  },
  '심쿵': {
    term: '심쿵',
    romanized: 'Sim-kung',
    category: 'reaction',
    meaningKo: '심장이 쿵쾅거릴 정도로 설레거나 너무 귀여워서 마음이 흔들림',
    meaningEn: 'Heart-throb / Heart skips a beat (Heart-attack from cuteness or charm)',
    meaning: 'Heart-throb / Heart skips a beat (Heart-attack from cuteness or charm)',
    originKo: '‘심장(心臟)’ + ‘쿵(쿵쾅)’의 합성어로 심장이 쿵 내려앉는 설렘을 귀엽게 의성어화한 단어입니다.',
    originEn: 'Blend of "Sim-jang (심장 - heart)" + "Kung (쿵 - thump sound)". Expresses heart-fluttering moments when seeing a cute pet, charismatic idol, or romantic crush.',
    origin: 'Blend of "Sim-jang (심장 - heart)" + "Kung (쿵 - thump sound)". Expresses heart-fluttering moments when seeing a cute pet, charismatic idol, or romantic crush.',
    socialContextKo: '아이돌의 눈빛, 아기 고양이의 애교, 로맨스 드라마 명장면에 반응할 때 씁니다.',
    socialContextEn: 'Universally used across K-Dramas, variety shows, and social media comments.',
    socialContext: 'Universally used across K-Dramas, variety shows, and social media comments.',
    politeEquivalentKo: '가슴이 두근거릴 정도로 설렙니다.',
    politeEquivalentEn: 'My heart flutters with deep excitement.',
    registerWarning: '귀엽고 친근한 표현으로 모든 세대가 알아듣습니다.',
    examples: [
      {
        korean: '배우가 카메라 보고 활짝 웃어주는데 진짜 심쿵해서 숨 멎는 줄 알았어!',
        romanized: 'Baeuga kamera bogo hwaljjak useojuneunde jinjja simkunghaeseo sum meonneun jul arasseo!',
        english: 'When the actor smiled brightly into the camera, my heart skipped a beat and I thought I stopped breathing!'
      }
    ]
  },
  '팩폭': {
    term: '팩폭 / 팩트폭격',
    romanized: 'Paek-pok / Paek-teu-pok-gyeok',
    category: 'reaction',
    meaningKo: '부인할 수 없는 객관적 사실(Fact)로 뼈아프게 직언을 날림',
    meaningEn: 'Fact bomb / Hitting someone with harsh, undeniable truth',
    meaning: 'Fact bomb / Hitting someone with harsh, undeniable truth',
    originKo: '‘팩트(Fact)’ + ‘폭격(Bombardment)’의 합성어로 반박할 수 없는 사실로 정곡을 찌르는 행위를 뜻합니다.',
    originEn: 'Combines English "Fact" with Sino-Korean "Pok-gyeok (폭격 - bombing)", meaning delivering a stinging dose of reality that leaves no room for excuses.',
    origin: 'Combines English "Fact" with Sino-Korean "Pok-gyeok (폭격 - bombing)", meaning delivering a stinging dose of reality that leaves no room for excuses.',
    socialContextKo: '핑계를 대는 친구에게 현실적인 직언을 날리거나 뼈 있는 농담을 할 때 씁니다.',
    socialContextEn: 'Used when a friend tells you the brutal truth you needed to hear.',
    socialContext: 'Used when a friend tells you the brutal truth you needed to hear.',
    politeEquivalentKo: '정곡을 찌르는 사실적 지적입니다.',
    politeEquivalentEn: 'That is a spot-on, factual observation.',
    registerWarning: '격식 있는 대화에서는 "직언", "객관적 지적"으로 바꾸어 표현하세요.',
    examples: [
      {
        korean: 'A: 나 내일부터 진짜 다이어트할 거야! / B: 너 어제도 그 말 했잖아. (A: 팩폭 멈춰 ㅠㅠ)',
        romanized: 'A: Na naeilbuteo jinjja daieoteuhal geoya! / B: Neo eojedo geu mal haetjana. (A: Paekpok meomchwo ㅠㅠ)',
        english: 'A: I will start dieting for real tomorrow! / B: You said that exact thing yesterday. (A: Stop the fact bombing ㅠㅠ)'
      }
    ]
  },
  '국룰': {
    term: '국룰 / 극룰',
    romanized: 'Guk-rul / Geuk-rul',
    category: 'life',
    meaningKo: '전 국민이 암묵적으로 인정하는 보편적인 규칙이나 필수 코스',
    meaningEn: 'Unwritten national rule / Universal standard consensus',
    meaning: 'Unwritten national rule / Universal standard consensus',
    originKo: '‘국민(國民) 룰(Rule)’의 합성어로 법으로 정해지지 않았어도 누구나 당연히 따르는 행동 양식을 의미합니다.',
    originEn: 'Portmanteau of "Guk-min (국민 - Nation/Citizen)" + "Rule (룰)". Refers to undisputed universal customs (e.g. eating fried rice after Korean BBQ).',
    origin: 'Portmanteau of "Guk-min (국민 - Nation/Citizen)" + "Rule (룰)". Refers to undisputed universal customs (e.g. eating fried rice after Korean BBQ).',
    socialContextKo: '삼겹살 먹은 후 볶음밥 볶기, 비 오는 날 파전에 막걸리 마시기 등 한국인의 식문화/생활 습관에 자주 쓰입니다.',
    socialContextEn: 'Ubiquitous phrase describing essential food pairings and social etiquette.',
    socialContext: 'Ubiquitous phrase describing essential food pairings and social etiquette.',
    politeEquivalentKo: '대중적으로 통용되는 보편적인 방식입니다.',
    politeEquivalentEn: 'This is a widely accepted, standard way of doing things.',
    registerWarning: '예능, 유튜브, 일상 대화 어디서나 환영받는 친근한 어휘입니다.',
    examples: [
      {
        korean: '한국에서 닭갈비나 떡볶이 다 먹고 남은 양념에 밥 볶아 먹는 건 완전 국룰이지!',
        romanized: 'Hangug-eseo dakgalbi-na tteokbokki da meokgo nameun yangnyeome bap bok-a meongneun geon wanjeon gukruriji!',
        english: 'In Korea, stir-frying rice in the remaining sauce after eating Dakgalbi or Tteokbokki is an absolute national rule!'
      }
    ]
  },
  '꿀잼': {
    term: '꿀잼',
    romanized: 'Kkul-jaem',
    category: 'reaction',
    meaningKo: '꿀처럼 달콤하고 엄청나게 재미있음 (반대말: 노잼, 핵노잼)',
    meaningEn: 'Super fun / Incredibly entertaining and sweet (Opposite: No-jaem)',
    meaning: 'Super fun / Incredibly entertaining and sweet (Opposite: No-jaem)',
    originKo: '‘꿀(Honey, 매우 좋은)’ + ‘재미(Fun)’의 결합. 재미가 넘쳐날 때 씁니다.',
    originEn: 'Combines "Kkul (꿀 - honey)" + "Jaemi (재미 - fun)".',
    origin: 'Combines "Kkul (꿀 - honey)" + "Jaemi (재미 - fun)".',
    socialContextKo: '영화, 드라마, 웹툰, 보드게임, 파티 등이 매우 즐거웠을 때 한마디로 평가할 때 씁니다.',
    socialContextEn: 'Common evaluation for great movies, funny variety episodes, and parties.',
    socialContext: 'Common evaluation for great movies, funny variety episodes, and parties.',
    politeEquivalentKo: '대단히 흥미롭고 재미있습니다.',
    politeEquivalentEn: 'It is highly engaging and enjoyable.',
    registerWarning: '친한 친구 간의 추천이나 후기 작성에 알맞습니다.',
    examples: [
      {
        korean: '어제 새로 시작한 드라마 봤는데 전개가 엄청 빠르고 완전 꿀잼이야!',
        romanized: 'Eoje saero sijakhan deurama bwanneunde jeongaega eomcheong ppareugo wanjeon kkuljaemiya!',
        english: 'I watched the newly premiered drama yesterday and the pacing is super fast and so much fun!'
      }
    ]
  },
  '댕댕이': {
    term: '댕댕이',
    romanized: 'Daeng-daeng-i',
    category: 'life',
    meaningKo: '귀여운 강아지를 부르는 애칭 (야민정음)',
    meaningEn: 'Cute puppy / Doggo (Hangul typographic visual pun on 멍멍이)',
    meaning: 'Cute puppy / Doggo (Hangul typographic visual pun on 멍멍이)',
    originKo: '한글 글자 모양에서 ‘멍멍이’의 ‘멍’ 자 모양이 ‘댕’과 비슷하게 보이는 시각적 언어유희(야민정음)에서 유래한 국민 애칭입니다.',
    originEn: 'Visual Hangul wordplay where the character "멍 (Meong)" resembles "댕 (Daeng)". Affectionately refers to cute dogs and puppies.',
    origin: 'Visual Hangul wordplay where the character "멍 (Meong)" resembles "댕 (Daeng)". Affectionately refers to cute dogs and puppies.',
    socialContextKo: '산책하는 귀여운 강아지를 보거나 반려견 사진을 SNS에 올릴 때 사랑스럽게 씁니다.',
    socialContextEn: 'Affectionately used online and in person when meeting lovely puppies and pets.',
    socialContext: 'Affectionately used online and in person when meeting lovely puppies and pets.',
    politeEquivalentKo: '귀여운 강아지(반려견)입니다.',
    politeEquivalentEn: 'It is a lovely puppy / pet dog.',
    registerWarning: '따뜻하고 귀여운 표현으로 방송 자막에서도 활발히 사용됩니다.',
    examples: [
      {
        korean: '공원에서 꼬리 흔들며 뛰어오는 댕댕이 보니까 하루 피로가 다 날아가네!',
        romanized: 'Gongwon-eseo kkori heundeulmyeo ttwieo-oneun daengdaengi bonikka haru piroga da naragane!',
        english: 'Seeing the happy puppy wagging its tail and running in the park melts away all my fatigue!'
      }
    ]
  },
  '오운완': {
    term: '오운완',
    romanized: 'O-un-wan',
    category: 'life',
    meaningKo: '“오늘 운동 완료”의 줄임말 (헬스/러닝 인증 챌린지 밈)',
    meaningEn: '“Today’s Workout Completed!” (Fitness milestone hashtag)',
    meaning: '“Today’s Workout Completed!” (Fitness milestone hashtag)',
    originKo: '‘오늘 + 운동 + 완료’의 앞 글자를 딴 인증샷 신조어입니다.',
    originEn: 'Acronym for "Oneul (오늘 - today) + Undong (운동 - workout) + Wanryo (완료 - completed)". The quintessential Korean fitness community hashtag.',
    origin: 'Acronym for "Oneul (오늘 - today) + Undong (운동 - workout) + Wanryo (완료 - completed)". The quintessential Korean fitness community hashtag.',
    socialContextKo: '헬스장에서 운동 후 거울 셀카를 찍거나 러닝 기록을 올릴 때 씁니다.',
    socialContextEn: 'Used every day across Instagram and fitness apps when finishing a gym session.',
    socialContext: 'Used every day across Instagram and fitness apps when finishing a gym session.',
    politeEquivalentKo: '오늘의 운동을 모두 마쳤습니다.',
    politeEquivalentEn: 'I have finished today’s workout.',
    registerWarning: '운동 동기부여를 위한 건강하고 트렌디한 표현입니다.',
    examples: [
      {
        korean: '퇴근하고 5km 러닝 뛰고 오운완 인증 완료! 내일도 파이팅!',
        romanized: 'Toegeunhago o-kiro reonning ttwigo ounwan injeung wanryo! Naeildo paiting!',
        english: 'Ran 5km after work and stamped today’s workout completed (#Ounwan)! Fighting for tomorrow too!'
      }
    ]
  }
};

/**
 * Normalizes search terms (removes whitespace, punctuation, lowercases)
 */
export function normalizeSlangKey(term: string): string {
  return term.replace(/[\s\-_~!?.,#@]/g, '').trim().toLowerCase();
}

/**
 * Searches the curated dictionary first.
 */
export function findCuratedSlang(term: string): SlangExplanation | null {
  if (!term) return null;
  const clean = normalizeSlangKey(term);

  // Exact match on normalized key
  for (const [key, value] of Object.entries(CURATED_SLANG_DICTIONARY)) {
    if (normalizeSlangKey(key) === clean || normalizeSlangKey(value.term) === clean) {
      return value;
    }
  }

  // Substring or synonym match
  for (const [key, value] of Object.entries(CURATED_SLANG_DICTIONARY)) {
    if (clean.includes(normalizeSlangKey(key)) || normalizeSlangKey(key).includes(clean)) {
      return value;
    }
    if (value.romanized.toLowerCase().replace(/[\s\-]/g, '') === clean) {
      return value;
    }
  }

  return null;
}
