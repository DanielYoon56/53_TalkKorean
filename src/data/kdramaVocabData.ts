export interface KDramaQuote {
  id: string;
  dramaTitleKo: string;
  dramaTitleEn: string;
  genre: 'Romance' | 'Fantasy' | 'Thriller' | 'Slice of Life';
  speaker: string;
  quoteKo: string;
  quoteEn: string;
  romanized: string;
  situation: string;
  grammarFocus: string;
  nuanceExplanation: string;
}

export interface KDramaVocabItem {
  id: string;
  termKo: string;
  termEn: string;
  romanized: string;
  category: 'Relationship & Romance' | 'Emotional Nuances' | 'Plot Tropes' | 'Workplace & Conflict';
  definitionKo: string;
  definitionEn: string;
  exampleSentenceKo: string;
  exampleSentenceEn: string;
  dramaContext: string;
}

export const KDRAMA_QUOTES: KDramaQuote[] = [
  {
    id: 'quote-goblin-1',
    dramaTitleKo: '쓸쓸하고 찬란하神 - 도깨비',
    dramaTitleEn: 'Guardian: The Lonely and Great God (Goblin)',
    genre: 'Fantasy',
    speaker: '김신 (공유)',
    quoteKo: '너와 함께한 시간 모두 눈부셨다. 날이 좋아서, 날이 좋지 않아서, 날이 적당해서 모든 날이 좋았다.',
    quoteEn: 'Every moment spent with you was dazzling. Because the weather was good, because it was bad, and because it was just right. I loved every single day.',
    romanized: 'Neowa hamkkehan sigan modu nunbusyeotda. Nari joaseo, nari joji anaseo, nari jeokdanghaeseo modeun nari joatda.',
    situation: '도깨비가 은탁에게 사랑과 감사의 마음을 고백하는 불후의 명장면',
    grammarFocus: '-(으)ㄴ 시간 (관형사형), -아/어서 (이유 연결어미), -았다/었다 (과거 회상 종결형)',
    nuanceExplanation: '한국 시문학적 운율감이 살아있는 문장으로, 어떤 상황 속에서도 너와 함께였다는 사실 자체가 축복이었음을 시적으로 표현합니다.'
  },
  {
    id: 'quote-cloy-2',
    dramaTitleKo: '사랑의 불시착',
    dramaTitleEn: 'Crash Landing on You',
    genre: 'Romance',
    speaker: '리정혁 (현빈)',
    quoteKo: '내 눈에 보이는 곳에만 있어 주시오. 내가 지켜줄 테니.',
    quoteEn: 'Just stay within my line of sight. Because I will protect you.',
    romanized: 'Nae nune boineun goseman isseo jusio. Naega jikyeojul teni.',
    situation: '위험한 북한 땅에서 윤세리를 안심시키며 든든하게 지켜주겠다고 약속하는 장면',
    grammarFocus: '-어 주시오 (정중한 고어풍 하오체 종결형), -(으)ㄹ 테니 (의지 및 이유 제시)',
    nuanceExplanation: '"-시오"는 클래식하고 신사적인 어투로 무게감과 헌신적인 사랑의 깊이를 전해줍니다.'
  },
  {
    id: 'quote-sun-descendants-3',
    dramaTitleKo: '태양의 후예',
    dramaTitleEn: 'Descendants of the Sun',
    genre: 'Romance',
    speaker: '유시진 (송중기)',
    quoteKo: '사과할까요, 고백할까요?',
    quoteEn: 'Should I apologize, or should I confess my feelings?',
    romanized: 'Sagwahalkkayo, gobaekhalkkayo?',
    situation: '강모연에게 기습 키스 후 진심을 솔직하게 물어보는 심쿵 명대사',
    grammarFocus: '-(으)ㄹ까요? (상대방의 의견이나 선택을 묻는 의문형 종결어미)',
    nuanceExplanation: '다나까 군대식 어투를 쓰던 주인공이 로맨틱한 순간 부드러운 존댓말로 전환하여 설렘을 극대화하는 명대사입니다.'
  },
  {
    id: 'quote-itaewon-4',
    dramaTitleKo: '이태원 클라쓰',
    dramaTitleEn: 'Itaewon Class',
    genre: 'Slice of Life',
    speaker: '박새로이 (박서준)',
    quoteKo: '내 가치를 네가 정하지 마. 내 인생 이제 시작이고, 난 원하는 거 다 이루면서 살 거야.',
    quoteEn: 'Don’t define my worth. My life is just beginning, and I will achieve everything I want.',
    romanized: 'Nae gachireul nega jeonghaji ma. Nae insaeng ije sijagigo, nan wonhaneun geo da irumyeonseo sal geoya.',
    situation: '현실의 벽과 편견 앞에서도 결코 무릎 꿇지 않는 청춘의 단단한 결의',
    grammarFocus: '-지 마 (금지 명령형), -(으)면서 (동시 동작 연결어미), -(으)ㄹ 거야 (확고한 미래 의지)',
    nuanceExplanation: '자기 주도적인 삶을 살아가는 주인공의 당당함과 카리스마를 가장 직관적으로 보여주는 대사입니다.'
  }
];

export const KDRAMA_VOCAB_ITEMS: KDramaVocabItem[] = [
  {
    id: 'vocab-simkung',
    termKo: '심쿵 (Sim-kung)',
    termEn: 'Heart-fluttering / Heart-throb',
    romanized: 'Sim-kung',
    category: 'Emotional Nuances',
    definitionKo: '‘심장이 쿵쾅쿵쾅 뛴다’의 줄임말로, 예상치 못한 설렘이나 감동을 받았을 때 쓰는 표현',
    definitionEn: 'An abbreviation for "heart thumping with sudden excitement or romantic fluttering".',
    exampleSentenceKo: '그 주인공이 미소 지을 때마다 완전 심쿵했잖아!',
    exampleSentenceEn: 'Every time the lead character smiled, my heart skipped a beat!',
    dramaContext: '로맨스 드라마에서 주인공이 기습 포옹이나 따뜻한 눈빛을 보낼 때 시청자 반응 1순위 단어'
  },
  {
    id: 'vocab-tsundere',
    termKo: '츤데레 (Tsundere / 겉차속따)',
    termEn: 'Cold on the outside, warm on the inside',
    romanized: 'Cheon-de-re',
    category: 'Relationship & Romance',
    definitionKo: '겉으로는 쌀쌀맞고 무뚝뚝하게 굴지만, 속으로는 다정하고 뒤에서 묵묵히 챙겨주는 성격 유형',
    definitionEn: 'A character archetype who acts aloof or grumpy externally but secretly cares deeply.',
    exampleSentenceKo: '남주가 완전 츤데레라서 뒤에서 몰래 약 사다 주는 거 봐봐.',
    exampleSentenceEn: 'The male lead is such a tsundere—look at him secretly buying her medicine.',
    dramaContext: '‘사랑의 불시착’, ‘도깨비’ 등 수많은 K-드라마 인기 남주 캐릭터들의 핵심 매력 포인트'
  },
  {
    id: 'vocab-some',
    termKo: '썸 (Some / 썸타다)',
    termEn: 'Romantic tension before officially dating',
    romanized: 'Sseom / Sseom-tada',
    category: 'Relationship & Romance',
    definitionKo: '‘Something’에서 유래한 말로, 사귀기 전 서로 호감을 갖고 알아가는 설레는 단계',
    definitionEn: 'The sweet "in-between" stage where two people like each other before making it official.',
    exampleSentenceKo: '둘이 사귀는 거야? 아니면 아직 썸 타는 사이야?',
    exampleSentenceEn: 'Are those two dating, or are they still having "some" tension?',
    dramaContext: '청춘 로맨스 드라마 3~6화 구간의 가장 풋풋하고 흥미진진한 관계 설정'
  },
  {
    id: 'vocab-gapjil',
    termKo: '갑질 (Gap-jil)',
    termEn: 'Abuse of power / Power tripping by elites',
    romanized: 'Gap-jil',
    category: 'Workplace & Conflict',
    definitionKo: '우월한 신분이나 지위(‘갑’)를 악용하여 상대방(‘을’)에게 부당한 대우나 횡포를 부리는 행위',
    definitionEn: 'When powerful superiors or wealthy conglomerates mistreat vulnerable employees.',
    exampleSentenceKo: '재벌 2세가 직원들에게 갑질하는 장면에서 너무 화가 났어.',
    exampleSentenceEn: 'I was so angry during the scene where the chaebol heir abused his power over employees.',
    dramaContext: '‘이태원 클라쓰’, ‘빈센조’ 등 권선징악 사이다 복수극의 핵심 갈등 유발 요소'
  },
  {
    id: 'vocab-saida',
    termKo: '사이다 (Cider / 사이다 전개)',
    termEn: 'Satisfying, refreshing plot resolution',
    romanized: 'Sa-i-da',
    category: 'Plot Tropes',
    definitionKo: '답답한 고구마 같은 상황을 톡 쏘는 탄산음료(사이다)처럼 통쾌하고 시원하게 해결하는 순간',
    definitionEn: 'A thrilling, cathartic moment where villains get instant justice and problems are cleanly resolved.',
    exampleSentenceKo: '주인공이 악당의 거짓말을 한 방에 밝혀내서 완전 사이다였어!',
    exampleSentenceEn: 'It was pure cider when the protagonist exposed the villain’s lies in one swift move!',
    dramaContext: '드라마 후반부 시청자들에게 최고의 카타르시스를 안겨주는 명장면 클리셰'
  }
];
