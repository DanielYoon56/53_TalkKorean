import React, { useState } from 'react';
import { BookOpen, Volume2, CheckCircle2, AlertCircle, HelpCircle, Search, ExternalLink, Sparkles } from 'lucide-react';
import { speakKoreanText } from '../../utils/tts';
import DynamicGrammarEngine from './DynamicGrammarEngine';

interface Example {
  korean: string;
  grammarTargets: string[];
  grammarFocusLabel: string;
  romanized: string;
  romanizedTargets: string[];
  english: string;
  englishTargets: string[];
  japanese?: string;
  spanish?: string;
}

interface GrammarTopic {
  id: string;
  titleKo: string;
  titleEn: string;
  titleJa?: string;
  level: string;
  grammarKeywords: string[];
  badgeTag: string;
  overview: string;
  overviewJa?: string;
  ruleSummary: string;
  ruleSummaryJa?: string;
  ruleElements: string[];
  examples: Example[];
  quiz: {
    questionKo: string;
    questionEn: string;
    questionJa?: string;
    options: string[];
    correct: number;
    explanation: string;
    explanationJa?: string;
  };
}

interface GrammarMenuProps {
  onOpenHonorifics?: () => void;
  credits?: number;
  onSpendCredits?: (amount: number, description: string) => boolean;
  onOpenCreditModal?: () => void;
}

/**
 * Renders Korean sentence text with grammar elements specifically highlighted in bold RED.
 */
function renderRedGrammarKorean(text: string, targets: string[] = []) {
  if (!text) return text;

  // If text contains markdown bold syntax (**term**), parse and highlight directly in bold red
  if (text.includes('**')) {
    const mdParts = text.split(/(\*\*.*?\*\*)/g);
    return (
      <>
        {mdParts.map((segment, idx) => {
          if (segment.startsWith('**') && segment.endsWith('**') && segment.length >= 4) {
            const inner = segment.slice(2, -2);
            return (
              <span key={idx} className="text-red-600 font-bold" title={`핵심 문법: ${inner}`}>
                {inner}
              </span>
            );
          }
          return <span key={idx}>{targets && targets.length > 0 ? renderRedGrammarKorean(segment, targets) : segment}</span>;
        })}
      </>
    );
  }

  if (!targets || targets.length === 0) {
    return text;
  }
  // Sort targets by length descending to match longer substrings first
  const sorted = [...targets].filter(Boolean).sort((a, b) => b.length - a.length);
  if (sorted.length === 0) return text;

  const escaped = sorted.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${escaped})`, 'g');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        const isMatch = sorted.includes(part);
        if (isMatch) {
          return (
            <span
              key={i}
              className="text-red-600 font-bold"
              title={`핵심 문법 요소: ${part}`}
            >
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/**
 * Highlights corresponding romanized syllables in RED without box or underline.
 */
function renderRedRomanized(text: string, targets: string[] = []) {
  if (!targets || targets.length === 0) return text;
  const sorted = [...targets].filter(Boolean).sort((a, b) => b.length - a.length);
  if (sorted.length === 0) return text;

  const escaped = sorted.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        const isMatch = sorted.some(t => t.toLowerCase() === part.toLowerCase());
        if (isMatch) {
          return (
            <span key={i} className="text-red-600 font-bold">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/**
 * Highlights grammatical translation elements in RED without box or underline.
 */
function renderRedEnglish(text: string, targets: string[] = []) {
  if (!targets || targets.length === 0) return text;
  const sorted = [...targets].filter(Boolean).sort((a, b) => b.length - a.length);
  if (sorted.length === 0) return text;

  const escaped = sorted.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        const isMatch = sorted.some(t => t.toLowerCase() === part.toLowerCase());
        if (isMatch) {
          return (
            <span key={i} className="text-red-600 font-bold not-italic">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

const KCENTER_GRAMMAR_SEARCH_URL = "https://kcenter.korean.go.kr/kcenter/search/dgrammar.do?mode=&id=&srchChosung=%E3%84%B1&searchCategory=&searchGrade=&searchTabMenu=&searchChineseYn=&curPage=1&srchKey=headword&srchKeyword=";

const getKCenterSearchUrl = (keyword?: string) => {
  if (!keyword) return KCENTER_GRAMMAR_SEARCH_URL;
  return `https://kcenter.korean.go.kr/kcenter/search/dgrammar.do?mode=&id=&srchChosung=&searchCategory=&searchGrade=&searchTabMenu=&searchChineseYn=&curPage=1&srchKey=headword&srchKeyword=${encodeURIComponent(keyword)}`;
};

export default function GrammarMenu({ onOpenHonorifics, credits = 0, onSpendCredits, onOpenCreditModal }: GrammarMenuProps = {}) {
  const [activeTopicId, setActiveTopicId] = useState<string>('particles');
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'topics' | 'dynamicEngine'>('topics');
  const [kcenterKeyword, setKcenterKeyword] = useState<string>('');

  const topics: GrammarTopic[] = [
    {
      id: 'particles',
      titleKo: '은/는 vs 이/가 (조사)',
      titleEn: 'Topic vs. Subject Particles',
      titleJa: '助詞 은/는 と 이/가 の違い',
      level: 'Beginner • Lesson 1',
      badgeTag: '은/는 • 이/가',
      grammarKeywords: ['은', '는', '이', '가'],
      ruleElements: ['은', '는', '이', '가'],
      overview: '한국어 조사는 명사 뒤에 결합하여 문법적 역할을 나타냅니다. "은/는"은 문장의 화제(Topic) 및 대조를 나타내며, "이/가"는 문장의 주어(Subject) 또는 새로운 정보를 지칭합니다.',
      overviewJa: '韓国語の助詞は名詞の後ろについて文法的な役割を示します。「은/는」は主題・トピック（〜は）を表し、「이/가」は主語（〜が）を表します。',
      ruleSummary: '받침 자음 있을 때: [은] (화제) / [이] (주어). 받침 없을 때: [는] (화제) / [가] (주어).',
      ruleSummaryJa: 'パッチムあり: [은] / [이]。パッチムなし: [는] / [가]。',
      examples: [
        {
          korean: '저는 학생입니다.',
          grammarTargets: ['는'],
          grammarFocusLabel: '-는 (화제 조사 / 모음 뒤)',
          romanized: 'Jeo-neun haksaeng-imnida.',
          romanizedTargets: ['neun'],
          english: 'As for me (topic), I am a student.',
          englishTargets: ['(topic)'],
          japanese: '私は（主題）学生です。',
          spanish: 'En cuanto a mí (tema), soy estudiante.'
        },
        {
          korean: '날씨가 좋습니다.',
          grammarTargets: ['가'],
          grammarFocusLabel: '-가 (주격 조사 / 모음 뒤)',
          romanized: 'Nalssi-ga jot-seumnida.',
          romanizedTargets: ['ga'],
          english: 'The weather (subject) is good.',
          englishTargets: ['(subject)'],
          japanese: '天気が（主語）良いです。',
          spanish: 'El tiempo (sujeto) es bueno.'
        },
        {
          korean: '사과는 맛있어요.',
          grammarTargets: ['는'],
          grammarFocusLabel: '-는 (화제 조사 / 대조)',
          romanized: 'Sagwa-neun masisseoyo.',
          romanizedTargets: ['neun'],
          english: 'As for apples (topic), they are delicious.',
          englishTargets: ['(topic)'],
          japanese: 'リンゴは（主題）美味しいです。',
          spanish: 'En cuanto a las manzanas (tema), son deliciosas.'
        },
        {
          korean: '친구가 옵니다.',
          grammarTargets: ['가'],
          grammarFocusLabel: '-가 (주격 조사 / 새 정보)',
          romanized: 'Chingu-ga omnida.',
          romanizedTargets: ['ga'],
          english: 'A friend (subject) is coming.',
          englishTargets: ['(subject)'],
          japanese: '友達が（主語）来ます。'
        },
        {
          korean: '책은 재미있습니다.',
          grammarTargets: ['은'],
          grammarFocusLabel: '-은 (화제 조사 / 자음 받침 뒤)',
          romanized: 'Chaek-eun jaemi-itseumnida.',
          romanizedTargets: ['eun'],
          english: 'As for the book (topic), it is interesting.',
          englishTargets: ['(topic)'],
          japanese: '本は（主題）面白いです。'
        },
        {
          korean: '동생이 노래해요.',
          grammarTargets: ['이'],
          grammarFocusLabel: '-이 (주격 조사 / 자음 받침 뒤)',
          romanized: 'Dongsaeng-i noraehaeyo.',
          romanizedTargets: ['-i'],
          english: 'My younger sibling (subject) sings.',
          englishTargets: ['(subject)']
        }
      ],
      quiz: {
        questionKo: '빈칸에 알맞은 조사를 고르세요: "이것(  ) 제 책입니다."',
        questionEn: 'Choose the correct particle: "This () is my book."',
        questionJa: '空欄に入る正しい助詞を選んでください: "이것(  ) 제 책입니다." (これは私の本です)',
        options: ['은 (eun)', '는 (neun)', '이 (i)', '가 (ga)'],
        correct: 0,
        explanation: '"이것"은 자음 받침(ㅅ)으로 끝나므로 화제 조사 "은"을 사용합니다.',
        explanationJa: '「이것」はパッチム（ㅅ）で終わるため、主題を表す助詞「은」が使われます。'
      }
    },
    {
      id: 'object-particles',
      titleKo: '을/를 (목적격 조사)',
      titleEn: 'Object Marking Particles',
      titleJa: '目的格助詞 을/를',
      level: 'Beginner • Lesson 2',
      badgeTag: '을/를',
      grammarKeywords: ['을', '를'],
      ruleElements: ['을', '를'],
      overview: '행동의 직접적인 대상(목적어) 뒤에 결합하여 무엇을 하는지 나타냅니다.',
      overviewJa: '他動詞の直接の対象（目的語）を表す助詞です。日本語の「〜を」に相当します。',
      ruleSummary: '받침 자음 있을 때: [을]. 받침 모음으로 끝날 때: [를].',
      ruleSummaryJa: 'パッチムあり: [을]。パッチムなし: [를]。',
      examples: [
        {
          korean: '사과를 먹어요.',
          grammarTargets: ['를'],
          grammarFocusLabel: '-를 (목적격 조사 / 받침 없는 모음 뒤)',
          romanized: 'Sagwa-reul meogeoyo.',
          romanizedTargets: ['reul'],
          english: 'I eat an apple (object).',
          englishTargets: ['(object)'],
          japanese: 'リンゴを食べます。',
          spanish: 'Como una manzana.'
        },
        {
          korean: '한국어를 공부해요.',
          grammarTargets: ['를'],
          grammarFocusLabel: '-를 (목적격 조사 / 언어 대상)',
          romanized: 'Hangugeo-reul gongbuhaeyo.',
          romanizedTargets: ['reul'],
          english: 'I study Korean (object).',
          englishTargets: ['(object)'],
          japanese: '韓国語を勉強します。',
          spanish: 'Estudio coreano.'
        },
        {
          korean: '책을 읽어요.',
          grammarTargets: ['을'],
          grammarFocusLabel: '-을 (목적격 조사 / 자음 받침 뒤)',
          romanized: 'Chaek-eul ilgeoyo.',
          romanizedTargets: ['eul'],
          english: 'I read a book (object).',
          englishTargets: ['(object)'],
          japanese: '本を読みます。',
          spanish: 'Leo un libro.'
        },
        {
          korean: '음악을 들어요.',
          grammarTargets: ['을'],
          grammarFocusLabel: '-을 (목적격 조사 / 음악 청취)',
          romanized: 'Eumak-eul deureoyo.',
          romanizedTargets: ['eul'],
          english: 'I listen to music (object).',
          englishTargets: ['(object)'],
          japanese: '音楽を聴きます。',
          spanish: 'Escucho música.'
        }
      ],
      quiz: {
        questionKo: '빈칸에 들어갈 목적격 조사는? "커피(  ) 마셔요."',
        questionEn: 'Choose the object particle for: "커피(  ) 마셔요."',
        options: ['를 (reul)', '을 (eul)', '이 (i)', '에 (e)'],
        correct: 0,
        explanation: '"커피"는 받침이 없는 모음(ㅣ)으로 끝나므로 "를"을 사용합니다.'
      }
    },
    {
      id: 'conjugation',
      titleKo: '-아요 / -어요 (현재형 정중체)',
      titleEn: 'Polite Present Tense Conjugation',
      titleJa: '丁寧語の現在形 (-아요 / -어요)',
      level: 'Beginner • Lesson 3',
      badgeTag: '-아요 • -어요 • 해요',
      grammarKeywords: ['-아요', '-어요', '-해요', '아요', '어요', '해요', '가요', '먹어요', '공부해요', '봐요'],
      ruleElements: ['-아요', '-어요', '해요'],
      overview: '한국어 동사/형용사는 어간 끝 모음에 따라 형태가 변합니다. 일상 대화에서 가장 널리 쓰이는 표준 정중체(해요체)입니다.',
      overviewJa: '韓国語の動詞や形容詞は、語幹の最後の母音によって活用形が変わります。丁寧語の現在形（〜です・〜ます）は会話で最もよく使われます。',
      ruleSummary: '어간 끝 모음이 ㅏ, ㅗ: [-아요]. 그 외 모음(ㅓ, ㅜ, ㅡ, ㅣ 등): [-어요]. 하다 동사: [해요].',
      ruleSummaryJa: '語幹の最後の母音が ㅏ または ㅗ → [-아요]。それ以外の母音 → [-어요]。「하다」動詞 → [해요]。',
      examples: [
        {
          korean: '가다 → 가요',
          grammarTargets: ['가요'],
          grammarFocusLabel: '-아요 활용 (가 + 아요 → 가요)',
          romanized: 'Gada → Gayo',
          romanizedTargets: ['Gayo'],
          english: 'to go → I go / you go',
          englishTargets: ['go'],
          japanese: '行く → 行きます',
          spanish: 'ir → voy / vas'
        },
        {
          korean: '먹다 → 먹어요',
          grammarTargets: ['먹어요'],
          grammarFocusLabel: '-어요 활용 (먹 + 어요 → 먹어요)',
          romanized: 'Meokda → Meogeoyo',
          romanizedTargets: ['Meogeoyo'],
          english: 'to eat → I eat',
          englishTargets: ['eat'],
          japanese: '食べる → 食べます',
          spanish: 'comer → como'
        },
        {
          korean: '공부하다 → 공부해요',
          grammarTargets: ['공부해요'],
          grammarFocusLabel: '하다 동사 활용 (하다 → 해요)',
          romanized: 'Gongbuhada → Gongbuhaeyo',
          romanizedTargets: ['Gongbuhaeyo'],
          english: 'to study → I study',
          englishTargets: ['study'],
          japanese: '勉強する → 勉強します',
          spanish: 'estudiar → estudio'
        },
        {
          korean: '보다 → 봐요',
          grammarTargets: ['봐요'],
          grammarFocusLabel: '-아요 축약 (보 + 아요 → 봐요)',
          romanized: 'Boda → Bwayo',
          romanizedTargets: ['Bwayo'],
          english: 'to see/watch → I watch',
          englishTargets: ['watch'],
          japanese: '見る → 見ます',
          spanish: 'ver → veo'
        }
      ],
      quiz: {
        questionKo: '"마시다" (to drink)의 알맞은 현재형은 무엇일까요?',
        questionEn: 'What is the correct present polite form of "마시다" (to drink)?',
        questionJa: '「마시다（飲む）」の正しい現在丁寧形はどれですか？',
        options: ['마시아요', '마셔요 (마시+어요)', '마시해요', '마사요'],
        correct: 1,
        explanation: '"마시 + 어요"가 자연스럽게 축약되어 "마셔요"가 됩니다.',
        explanationJa: '「마시 + 어요」が自然に縮約されて「마셔요（飲みます）」になります。'
      }
    },
    {
      id: 'location-particles',
      titleKo: '에 vs 에서 (장소·시간 조사)',
      titleEn: 'Location & Direction Particles',
      titleJa: '場所の助詞 에 と 에서',
      level: 'Beginner/Intermediate • Lesson 4',
      badgeTag: '에 vs 에서',
      grammarKeywords: ['에', '에서'],
      ruleElements: ['에', '에서'],
      overview: '"에"는 도착지(가다/오다), 존재 위치(있다/없다), 특정 시간을 가리키며, "에서"는 역동적인 동작이 일어나는 활동 장소나 출발지를 가리킵니다.',
      overviewJa: '「에」は静的な所在・目的地・時間を表し、「에서」は動作が行われる動的な場所（〜で）や出発点を表します。',
      ruleSummary: '도착지 / 정적 위치 / 시간: [에] (학교에 가요 / 집에 있어요). 동작 활동 장소 / 출발지: [에서] (도서관에서 공부해요).',
      examples: [
        {
          korean: '학교에 가요.',
          grammarTargets: ['에'],
          grammarFocusLabel: '-에 (도착지 / 목적 방향 조사)',
          romanized: 'Hakgyo-e gayo.',
          romanizedTargets: ['-e'],
          english: 'I go to school.',
          englishTargets: ['to'],
          japanese: '学校に行きます。'
        },
        {
          korean: '도서관에서 공부해요.',
          grammarTargets: ['에서'],
          grammarFocusLabel: '-에서 (행위·동작 장소 조사)',
          romanized: 'Doseogwan-eseo gongbuhaeyo.',
          romanizedTargets: ['eseo'],
          english: 'I study at the library.',
          englishTargets: ['at'],
          japanese: '図書館で勉強します。'
        },
        {
          korean: '집에 있어요.',
          grammarTargets: ['에'],
          grammarFocusLabel: '-에 (정적 존재 위치 조사)',
          romanized: 'Jib-e isseoyo.',
          romanizedTargets: ['-e'],
          english: 'I am at home.',
          englishTargets: ['at'],
          japanese: '家にいます。'
        },
        {
          korean: '식당에서 밥을 먹어요.',
          grammarTargets: ['에서', '을'],
          grammarFocusLabel: '-에서 (식사 장소) & -을 (목적어)',
          romanized: 'Sikdang-eseo bab-eul meogeoyo.',
          romanizedTargets: ['eseo', 'eul'],
          english: 'I eat a meal at the restaurant.',
          englishTargets: ['at'],
          japanese: '食堂でご飯を食べます。'
        }
      ],
      quiz: {
        questionKo: '빈칸에 알맞은 조사는? "카페(  ) 친구를 만나요."',
        questionEn: 'Choose the correct particle: "I meet my friend (  ) the cafe."',
        options: ['에서 (eseo)', '에 (e)', '은 (eun)', '로 (ro)'],
        correct: 0,
        explanation: '친구를 만나는 동작/행위가 일어나는 장소이므로 "에서"를 사용합니다.'
      }
    },
    {
      id: 'tenses',
      titleKo: '-았/었어요 & -(으)ㄹ 거예요 (시제)',
      titleEn: 'Past & Future Tense',
      titleJa: '過去形と未来形 (-았/었어요 / -(으)ㄹ 거예요)',
      level: 'Beginner/Intermediate • Lesson 5',
      badgeTag: '과거 & 미래 시제',
      grammarKeywords: ['-았어요', '-었어요', '-였어요', '-(으)ㄹ 거예요', '았어요', '었어요', '였어요', '봤어요', '갈 거예요', '먹었어요', '할 거예요'],
      ruleElements: ['-았/었어요', '-(으)ㄹ 거예요'],
      overview: '이미 일어난 과거 사건이나 앞으로 일어날 미래의 계획을 표현하는 필수 핵심 시제 문법입니다.',
      overviewJa: 'すでに起きた過去の出来事や、これから行う未来の計画を表現する必須の活用文法です。',
      ruleSummary: '과거 시제: 어간 + [-았어요] / [-었어요] / [했어요]. 미래 시제: 어간 + [-(으)ㄹ 거예요].',
      ruleSummaryJa: '過去形: 語幹 + [-았어요] / [-었어요]。未来形: 語幹 + [-(으)ㄹ 거예요]。',
      examples: [
        {
          korean: '어제 영화를 봤어요.',
          grammarTargets: ['를', '봤어요'],
          grammarFocusLabel: '-았어요 (과거 시제 축약)',
          romanized: 'Eoje yeonghwa-reul bwasseoyo.',
          romanizedTargets: ['reul', 'bwasseoyo'],
          english: 'I watched a movie yesterday.',
          englishTargets: ['watched'],
          japanese: '昨日映画を見ました。',
          spanish: 'Ayer vi una película.'
        },
        {
          korean: '내일 서울에 갈 거예요.',
          grammarTargets: ['에', '갈 거예요'],
          grammarFocusLabel: '-(으)ㄹ 거예요 (미래 예정)',
          romanized: 'Naeil Seoul-e gal geoyeyo.',
          romanizedTargets: ['-e', 'gal geoyeyo'],
          english: 'I will go to Seoul tomorrow.',
          englishTargets: ['will go'],
          japanese: '明日ソウルに行く予定です（行きます）。',
          spanish: 'Mañana iré a Seúl.'
        },
        {
          korean: '점심에 피자를 먹었어요.',
          grammarTargets: ['에', '를', '먹었어요'],
          grammarFocusLabel: '-었어요 (과거 시제)',
          romanized: 'Jeomsim-e pija-reul meogeosseoyo.',
          romanizedTargets: ['-e', 'reul', 'meogeosseoyo'],
          english: 'I ate pizza for lunch.',
          englishTargets: ['ate'],
          japanese: 'お昼にピザを食べました。'
        },
        {
          korean: '주말에 운동할 거예요.',
          grammarTargets: ['에', '할 거예요'],
          grammarFocusLabel: '-(으)ㄹ 거예요 (미래 계획)',
          romanized: 'Jumal-e undonghal geoyeyo.',
          romanizedTargets: ['-e', 'undonghal geoyeyo'],
          english: 'I will exercise on the weekend.',
          englishTargets: ['will exercise'],
          japanese: '週末に運動する予定です。'
        }
      ],
      quiz: {
        questionKo: '"만나다" (to meet)의 알맞은 과거형은 무엇일까요?',
        questionEn: 'What is the correct past tense form of "만나다" (to meet)?',
        questionJa: '「만나다（会う）」の正しい過去形はどれですか？',
        options: ['만나요', '만났어요', '만날 거예요', '만나었어요'],
        correct: 1,
        explanation: '"만나 + 았어요"가 축약되어 "만났어요"가 됩니다.',
        explanationJa: '「만나 + 았어요」が縮約して「만났어요（会いました）」になります。'
      }
    },
    {
      id: 'honorifics',
      titleKo: '-시- / -(으)세요 (존댓말·높임말)',
      titleEn: 'Honorific Verb Suffix',
      titleJa: '尊敬語の接尾辞 (-시- / -세요)',
      level: 'Intermediate • Lesson 6',
      badgeTag: '-시- • -(으)세요',
      grammarKeywords: ['-시-', '-세요', '-으세요', '시', '세요', '으세요', '오세요', '찾으세요', '읽으세요', '잡수세요', '께서'],
      ruleElements: ['-시-', '-(으)세요'],
      overview: '웃어른, 선생님, 고객, 상사 등 존경해야 할 주체를 높일 때 동사 어간에 존경 선어말어미 "-시-"를 결합합니다.',
      overviewJa: '韓国文化では目上の人やお客様に対する敬意表現が非常に重要です。動詞の語幹に「-시-」を入れることで尊敬の意を表します。',
      ruleSummary: '받침 없는 모음 어간: [-세요] (-시- + -어요). 받침 있는 자음 어간: [-으세요]. 주어 높임: [께서].',
      ruleSummaryJa: '母音 어간: [-세요]。子音 어간: [-으세요]。主語の敬語: [께서]。',
      examples: [
        {
          korean: '선생님이 오세요.',
          grammarTargets: ['이', '오세요'],
          grammarFocusLabel: '-세요 (오다 + -시- + -어요)',
          romanized: 'Seonsaengnim-i oseyo.',
          romanizedTargets: ['-i', 'oseyo'],
          english: 'The teacher is coming. (Respectful)',
          englishTargets: ['(Respectful)'],
          japanese: '先生がいらっしゃいます。 / 先生が来られます。',
          spanish: 'El profesor viene. (Respetuoso)'
        },
        {
          korean: '무엇을 찾으세요?',
          grammarTargets: ['을', '찾으세요'],
          grammarFocusLabel: '-으세요 (찾다 + -으시- + -어요)',
          romanized: 'Mueos-eul chajeuseyo?',
          romanizedTargets: ['eul', 'chajeuseyo'],
          english: 'What are you looking for? (To a customer)',
          englishTargets: ['(To a customer)'],
          japanese: '何をお探しですか？',
          spanish: '¿Qué está buscando? (A un cliente)'
        },
        {
          korean: '할머니께서 진지를 잡수세요.',
          grammarTargets: ['께서', '잡수세요'],
          grammarFocusLabel: '께서 (존경 주격 조사) & 잡수세요 (특수 존경)',
          romanized: 'Halmeoni-kkeseo jinji-reul japsuseyo.',
          romanizedTargets: ['kkeseo', 'japsuseyo'],
          english: 'Grandmother is having a meal. (Special honorific)',
          englishTargets: ['(Special honorific)'],
          japanese: '祖母がお食事を召し上がります。'
        }
      ],
      quiz: {
        questionKo: '부모님께 말할 때 "읽다" (to read)의 알맞은 높임말은?',
        questionEn: 'What is the honorific present form of "읽다" (to read)?',
        questionJa: '「읽다（読む）」の正しい尊敬現在形はどれですか？',
        options: ['읽세요', '읽으세요', '읽어요', '읽으시해요'],
        correct: 1,
        explanation: '어간 "읽-"에 받침이 있으므로 "-으세요"를 붙여 "읽으세요"가 됩니다.',
        explanationJa: '語幹「읽-」にはパッチムがあるため、「-으세요」をつけて「읽으세요（お読みになります）」となります。'
      }
    },
    {
      id: 'wants',
      titleKo: '-고 싶다 / -고 싶어요 (희망·소망)',
      titleEn: 'Desire & Wanting (Want to do)',
      titleJa: '希望・願望 (-고 싶어요)',
      level: 'Beginner • Lesson 7',
      badgeTag: '-고 싶다',
      grammarKeywords: ['-고 싶어요', '-고 싶다', '고 싶어요', '고 싶다', '가고 싶어요', '먹고 싶어요'],
      ruleElements: ['-고 싶어요', '-고 싶다'],
      overview: '동사 어간에 붙어 화자의 희망, 바램, 욕구를 나타내는 핵심 표현입니다. (영어의 "want to")',
      overviewJa: '動詞の語幹について、話者の希望や願いを表します。（日本語の「〜したいです」）',
      ruleSummary: '동사 어간(받침 유무 상관없이) + [-고 싶어요] (정중체) / [-고 싶다] (기본형).',
      examples: [
        {
          korean: '한국에 가고 싶어요.',
          grammarTargets: ['에', '가고 싶어요'],
          grammarFocusLabel: '-고 싶어요 (희망 표현: 가다 + -고 싶어요)',
          romanized: 'Hanguk-e gago sipeoyo.',
          romanizedTargets: ['-e', 'gago sipeoyo'],
          english: 'I want to go to Korea.',
          englishTargets: ['want to go'],
          japanese: '韓国に行きたいです。'
        },
        {
          korean: '불고기를 먹고 싶어요.',
          grammarTargets: ['를', '먹고 싶어요'],
          grammarFocusLabel: '-고 싶어요 (희망 표현: 먹다 + -고 싶어요)',
          romanized: 'Bulgogi-reul meokgo sipeoyo.',
          romanizedTargets: ['reul', 'meokgo sipeoyo'],
          english: 'I want to eat bulgogi.',
          englishTargets: ['want to eat'],
          japanese: 'プルコギを食べたいです。'
        }
      ],
      quiz: {
        questionKo: '"영화를 보다"를 사용해 "영화를 보고 싶어요"로 만들 때 알맞은 형태는?',
        questionEn: 'How to say "I want to watch a movie"?',
        options: ['영화를 보고 싶어요', '영화를 봐고 싶어요', '영화를 보니 싶어요', '영화를 보러 싶어요'],
        correct: 0,
        explanation: '동사 어간 "보-"에 직접 "-고 싶어요"를 붙여 "보고 싶어요"가 됩니다.'
      }
    },
    {
      id: 'reasons',
      titleKo: '-아/어서 vs -(으)니까 (이유·원인)',
      titleEn: 'Cause & Reason Connectors',
      titleJa: '理由・原因 (-아/어서 vs -(으)니까)',
      level: 'Intermediate • Lesson 8',
      badgeTag: '-아/어서 vs -(으)니까',
      grammarKeywords: ['-아/어서', '-(으)니까', '와서', '없으니까', '아서', '어서', '니까', '으니까'],
      ruleElements: ['-아/어서', '-(으)니까'],
      overview: '두 연결어미 모두 이유나 원인("~때문에 / ~해서")을 나타내지만, 청유문/명령문에서는 반드시 "-(으)니까"를 써야 합니다.',
      overviewJa: '理由や原因を表す接続語尾です。勧誘や命令文では「-(으)니까」を使用する必要があります。',
      ruleSummary: '자연스러운 인과/서술: [-아/어서]. 명령/청유/주관적 판단: [-(으)니까].',
      examples: [
        {
          korean: '비가 와서 집에 있어요.',
          grammarTargets: ['가', '와서', '에'],
          grammarFocusLabel: '-아/어서 (객관적 인과 관계)',
          romanized: 'Bi-ga waseo jib-e isseoyo.',
          romanizedTargets: ['ga', 'waseo', '-e'],
          english: 'Because it rains, I stay home.',
          englishTargets: ['Because'],
          japanese: '雨が降って（降るから）家にいます。'
        },
        {
          korean: '시간이 없으니까 빨리 가요.',
          grammarTargets: ['이', '없으니까'],
          grammarFocusLabel: '-(으)니까 (주관적 이유 & 청유문)',
          romanized: 'Sigan-i eopseunikka ppalli gayo.',
          romanizedTargets: ['-i', 'eopseunikka'],
          english: 'Since we don’t have time, let’s go fast.',
          englishTargets: ['Since'],
          japanese: '時間がないから早く行きましょう。'
        }
      ],
      quiz: {
        questionKo: '명령문 "날씨가 추(  ) 옷을 입으세요"에 알맞은 연결어미는?',
        questionEn: 'Choose the correct reason connector for imperative sentence:',
        options: ['추우니까', '추워서', '춥고', '추우며'],
        correct: 0,
        explanation: '명령형 종결어미(-으세요)와 함께 쓰일 때는 "-아/어서"를 쓸 수 없고 "-(으)니까"만 사용 가능합니다.'
      }
    }
  ];

  const currentTopic = topics.find(t => t.id === activeTopicId) || topics[0];

  const handleSpeakText = (text: string) => {
    speakKoreanText(text);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Clean Red Highlight Indicator & Official Search Link */}
      <div className="bg-white border border-editorial-border rounded-sm p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-sm bg-editorial-text text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-serif font-bold text-editorial-text inline-flex flex-wrap items-center gap-2">
                  <span>Korean Grammar (핵심 문법 & 조사)</span>
                  <a
                    href={KCENTER_GRAMMAR_SEARCH_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-sans font-semibold transition-all shadow-xs cursor-pointer ml-1"
                    title="국립국어원 한국어교수학습샘터 문법 검색 바로가기"
                  >
                    <Search className="w-3.5 h-3.5 text-white" />
                    <span>국립국어원 문법 검색링크</span>
                    <ExternalLink className="w-3 h-3 text-red-200" />
                  </a>
                </h2>
                <span className="px-2 py-0.5 bg-red-50 text-red-600 border border-red-200 rounded text-[10px] font-bold">
                  문법 요소 적색 표기
                </span>
              </div>
              <p className="text-xs text-editorial-muted mt-0.5">
                한국어 문장 속 조사, 연결어미, 시제 형태소, 존칭 접미사를 <strong className="text-red-600 font-bold">적색</strong>으로 표시합니다.
              </p>

              {/* Quick direct search on KCenter */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const targetUrl = getKCenterSearchUrl(kcenterKeyword.trim());
                  window.open(targetUrl, '_blank', 'noopener,noreferrer');
                }}
                className="flex items-center gap-1.5 mt-2 max-w-md"
              >
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={kcenterKeyword}
                    onChange={(e) => setKcenterKeyword(e.target.value)}
                    placeholder="국립국어원 검색어 입력 (예: -에 대해, -고 싶다)"
                    className="w-full pl-8 pr-3 py-1 bg-editorial-bg border border-editorial-border rounded text-xs text-editorial-text placeholder:text-neutral-400 focus:outline-none focus:border-red-600 focus:bg-white transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-neutral-900 hover:bg-red-700 text-white rounded text-xs font-semibold transition-colors flex items-center space-x-1 cursor-pointer shrink-0 shadow-2xs"
                >
                  <span>검색</span>
                  <ExternalLink className="w-3 h-3 text-neutral-300" />
                </button>
                <a
                  href={KCENTER_GRAMMAR_SEARCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded text-xs font-semibold transition-colors flex items-center space-x-1 cursor-pointer shrink-0"
                  title="국립국어원 기본 검색링크 열기"
                >
                  <span>기본 링크</span>
                  <ExternalLink className="w-3 h-3 text-red-500" />
                </a>
              </form>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href={KCENTER_GRAMMAR_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-neutral-900 hover:bg-red-700 text-white rounded-sm text-xs font-bold font-serif transition-colors shadow-xs"
              title="국립국어원 한국어교수학습샘터 문법 검색 포털"
            >
              <Search className="w-3.5 h-3.5 text-red-300" />
              <span>국립국어원 샘터 문법검색</span>
              <ExternalLink className="w-3 h-3 text-neutral-300" />
            </a>
          </div>
        </div>

        {/* View Mode Toggle: Core Grammar Lessons vs DynamicGrammarEngine */}
        <div className="flex items-center border-b border-editorial-border pt-1 gap-2">
          <button
            onClick={() => setViewMode('topics')}
            className={`pb-2.5 px-3 text-xs font-bold font-serif transition-all cursor-pointer flex items-center space-x-1.5 border-b-2 ${
              viewMode === 'topics'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-editorial-muted hover:text-editorial-text'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>기본 문법 코스 (Level 1~8)</span>
          </button>
          <button
            onClick={() => setViewMode('dynamicEngine')}
            className={`pb-2.5 px-3 text-xs font-bold font-serif transition-all cursor-pointer flex items-center space-x-1.5 border-b-2 ${
              viewMode === 'dynamicEngine'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-editorial-muted hover:text-editorial-text'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>AI 실시간 문법 분석 (DynamicGrammarEngine)</span>
            <span className="px-1.5 py-0.2 bg-red-100 text-red-700 text-[9px] rounded font-bold">Live</span>
          </button>
        </div>

        {viewMode === 'topics' && (
          <>
            {/* Visual Legend Bar */}
            <div className="p-2.5 bg-editorial-bg border border-editorial-border rounded-sm text-xs text-editorial-text flex flex-wrap items-center gap-2">
              <span className="font-semibold text-editorial-text">적색 표시 기준:</span>
              <span>조사 (<span className="text-red-600 font-bold">은/는, 이/가, 을/를, 에, 에서</span>)</span>
              <span className="text-neutral-300">•</span>
              <span>어미 (<span className="text-red-600 font-bold">-아요/어요, 해요</span>)</span>
              <span className="text-neutral-300">•</span>
              <span>시제 (<span className="text-red-600 font-bold">-았/었어요, -(으)ㄹ 거예요</span>)</span>
              <span className="text-neutral-300">•</span>
              <span>존칭 (<span className="text-red-600 font-bold">-시-, -세요, 께서</span>)</span>
            </div>

            {/* Topic Selectors */}
            <div className="flex flex-wrap gap-2 pt-1">
              {topics.map((t) => {
                const isSelected = activeTopicId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveTopicId(t.id);
                      setSelectedQuizAnswer(null);
                    }}
                    className={`px-3.5 py-2 rounded-sm text-xs font-bold transition-all cursor-pointer text-left border ${
                      isSelected
                        ? 'bg-editorial-text text-white border-editorial-text shadow-sm'
                        : 'bg-editorial-bg border-editorial-border text-editorial-text hover:bg-red-50/40 hover:border-red-300'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5">
                      <span className="text-red-500 font-black">🔴</span>
                      <span>{t.titleKo}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5 gap-2">
                      <span className={`text-[10px] font-normal ${isSelected ? 'text-neutral-300' : 'text-editorial-muted'}`}>
                        {t.titleEn}
                      </span>
                      <span className={`text-[9px] font-bold px-1.5 rounded ${
                        isSelected ? 'bg-red-500 text-white' : 'bg-red-50 text-red-600 border border-red-200'
                      }`}>
                        {t.badgeTag}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {viewMode === 'dynamicEngine' ? (
        <DynamicGrammarEngine
          onSelectTopic={(tId) => {
            setActiveTopicId(tId);
            setViewMode('topics');
          }}
        />
      ) : (
        /* Main Topic Content */
        <div className="bg-white border border-editorial-border rounded-sm p-6 space-y-6">
        {/* Title & Level */}
        <div className="border-b border-editorial-border pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-700 bg-red-100 px-2 py-0.5 rounded border border-red-300">
                {currentTopic.level}
              </span>
              <span className="text-[10px] font-black text-white bg-red-600 px-2 py-0.5 rounded">
                문법 요소 적색 표기
              </span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-editorial-text mt-2 flex items-center space-x-2">
              <span>{currentTopic.titleKo}</span>
            </h3>
            <p className="text-sm text-editorial-muted font-medium">{currentTopic.titleEn}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-editorial-muted">
              <span className="font-semibold text-editorial-text">핵심 문법:</span>
              {currentTopic.ruleElements.map((kw, i) => (
                <span key={i} className="text-red-600 font-bold">
                  {kw}{i < currentTopic.ruleElements.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1 sm:pt-0">
              <a
                href={getKCenterSearchUrl(currentTopic.ruleElements?.[0] || currentTopic.badgeTag)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded text-[11px] font-semibold transition-all cursor-pointer shadow-2xs"
                title={`국립국어원 한국어교수학습샘터에서 '${currentTopic.titleKo}' 검색`}
              >
                <Search className="w-3 h-3 text-red-600" />
                <span>샘터 검색: {currentTopic.ruleElements?.[0] || currentTopic.badgeTag}</span>
                <ExternalLink className="w-2.5 h-2.5 text-red-400" />
              </a>
              <button
                type="button"
                onClick={() => setViewMode('dynamicEngine')}
                className="inline-flex items-center space-x-1 px-2.5 py-1 bg-neutral-900 hover:bg-red-700 text-white rounded text-[11px] font-bold transition-all cursor-pointer shadow-2xs"
                title="DynamicGrammarEngine으로 실시간 AI 분석"
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>AI 분석</span>
              </button>
            </div>
          </div>
        </div>

        {currentTopic.id === 'honorifics' && onOpenHonorifics && (
          <div className="p-4 bg-amber-50 border border-amber-300 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                🙇 실전 존댓말 마스터 레슨
              </span>
              <p className="text-xs font-bold text-amber-950">
                합쇼체(-습니다), 해요체(-어요), 반말(-어) 변환기와 특수 존대 호칭 특강이 준비되어 있습니다!
              </p>
            </div>
            <button
              onClick={onOpenHonorifics}
              className="px-4 py-2 bg-amber-900 hover:bg-amber-800 text-white rounded-sm text-xs font-bold transition-colors cursor-pointer shrink-0"
            >
              존댓말 실전 레슨 보기 →
            </button>
          </div>
        )}

        {/* Overview & Rule Box with Red Highlights */}
        <div className="space-y-3">
          <p className="text-xs text-editorial-text leading-relaxed">
            {currentTopic.overview}
          </p>

          <div className="p-4 bg-editorial-bg border border-editorial-border rounded-sm space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-editorial-muted flex items-center space-x-1.5">
              <span>📐</span>
              <span>Key Grammar Rule (문법 공식 및 활용법)</span>
            </span>
            <p className="text-sm font-serif font-bold text-editorial-text leading-relaxed">
              {renderRedGrammarKorean(currentTopic.ruleSummary, currentTopic.ruleElements)}
            </p>
          </div>
        </div>

        {/* Examples List with Red Highlights */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-editorial-border/60 pb-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-editorial-muted flex items-center space-x-2">
              <span>Examples & Breakdown (예문 분석)</span>
            </h4>
            <span className="text-[11px] text-editorial-muted">스피커 버튼을 눌러 원어민 음성을 들어보세요</span>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {currentTopic.examples.map((ex, idx) => (
              <div
                key={idx}
                className="p-4 bg-white border border-editorial-border rounded-sm flex items-start justify-between hover:border-editorial-accent/40 transition-all shadow-2xs group"
              >
                <div className="space-y-2 min-w-0">
                  {/* Grammar Focus Label */}
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-editorial-muted">
                      문법: <span className="text-red-600 font-bold">{ex.grammarFocusLabel}</span>
                    </span>
                  </div>

                  {/* Korean Text with Clean Red Highlighting */}
                  <p className="text-xl font-serif font-bold text-editorial-text leading-snug">
                    {renderRedGrammarKorean(ex.korean, ex.grammarTargets)}
                  </p>

                  {/* Romanized Text with Red Syllable Highlighting */}
                  <p className="text-xs text-editorial-accent font-semibold tracking-wide">
                    {renderRedRomanized(ex.romanized, ex.romanizedTargets || [])}
                  </p>

                  {/* English Translation with Red Grammar Role Highlighting */}
                  <p className="text-xs text-editorial-muted italic">
                    {renderRedEnglish(ex.english, ex.englishTargets || [])}
                    {ex.japanese && <span className="ml-2 not-italic text-neutral-500 font-normal">({ex.japanese})</span>}
                  </p>
                </div>

                <button
                  onClick={() => handleSpeakText(ex.korean)}
                  className="w-10 h-10 rounded-sm bg-red-50 hover:bg-red-600 hover:text-white text-red-600 border border-red-200 flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-3 shadow-2xs"
                  title="원어민 발음 듣기"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Mini Quiz Box */}
        <div className="p-5 bg-red-50/30 border-2 border-red-200 rounded-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-editorial-text uppercase tracking-wider font-serif">
              <CheckCircle2 className="w-4 h-4 text-red-600" />
              <span>Mini Grammar Check (확인 문제)</span>
            </div>
            <span className="text-[10px] text-red-600 font-bold bg-white px-2 py-0.5 rounded border border-red-300">
              적색 조사/어미 선택
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-serif font-bold text-editorial-text">{currentTopic.quiz.questionKo}</p>
            <p className="text-xs text-editorial-muted italic">
              {currentTopic.quiz.questionEn}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentTopic.quiz.options.map((opt, idx) => {
              let btnStyle = "bg-white border-editorial-border hover:bg-red-50 hover:border-red-300 text-editorial-text";
              if (selectedQuizAnswer !== null) {
                if (idx === currentTopic.quiz.correct) {
                  btnStyle = "bg-emerald-600 text-white border-emerald-700 font-bold shadow-xs";
                } else if (idx === selectedQuizAnswer) {
                  btnStyle = "bg-rose-600 text-white border-rose-700 font-bold shadow-xs";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedQuizAnswer(idx)}
                  className={`p-3 rounded-sm border text-left text-xs transition-all cursor-pointer font-serif ${btnStyle}`}
                >
                  {renderRedGrammarKorean(opt, currentTopic.grammarKeywords)}
                </button>
              );
            })}
          </div>

          {selectedQuizAnswer !== null && (
            <div className="p-3 bg-white border border-editorial-border rounded-sm text-xs space-y-1">
              <span className="font-bold text-editorial-text block">
                {selectedQuizAnswer === currentTopic.quiz.correct ? '🎉 정답입니다!' : '💡 오답 해설:'}
              </span>
              <p className="text-editorial-muted leading-relaxed">
                {renderRedGrammarKorean(currentTopic.quiz.explanation, currentTopic.grammarKeywords)}
              </p>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
}
