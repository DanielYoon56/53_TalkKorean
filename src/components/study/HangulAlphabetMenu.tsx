import React, { useState } from 'react';
import { Volume2, Sparkles, Layers, BookOpen, RotateCcw, ArrowRight, Play, Info, CheckCircle2 } from 'lucide-react';
import { speakKoreanText } from '../../utils/tts';

interface HangulChar {
  char: string;
  nameKo: string;
  romanized: string;
  exampleKo: string;
  exampleEn: string;
  type: 'vowel' | 'consonant' | 'double' | 'complex';
}

interface CompoundExample {
  word: string;
  pronunciation: string;
  meaning: string;
  ruleTag: string;
}

interface SyllablePhoneticInfo {
  insightNote: string;
  compounds: CompoundExample[];
}

// Unicode Hangul Syllable Builder Constants
const CHOSUNG_LIST = [
  { char: 'ㄱ', rom: 'g' }, { char: 'ㄲ', rom: 'kk' }, { char: 'ㄴ', rom: 'n' },
  { char: 'ㄷ', rom: 'd' }, { char: 'ㄸ', rom: 'tt' }, { char: 'ㄹ', rom: 'r' },
  { char: 'ㅁ', rom: 'm' }, { char: 'ㅂ', rom: 'b' }, { char: 'ㅃ', rom: 'pp' },
  { char: 'ㅅ', rom: 's' }, { char: 'ㅆ', rom: 'ss' }, { char: 'ㅇ', rom: '' },
  { char: 'ㅈ', rom: 'j' }, { char: 'ㅉ', rom: 'jj' }, { char: 'ㅊ', rom: 'ch' },
  { char: 'ㅋ', rom: 'k' }, { char: 'ㅌ', rom: 't' }, { char: 'ㅍ', rom: 'p' },
  { char: 'ㅎ', rom: 'h' }
];

const JUNGSUNG_LIST = [
  { char: 'ㅏ', rom: 'a' }, { char: 'ㅐ', rom: 'ae' }, { char: 'ㅑ', rom: 'ya' },
  { char: 'ㅒ', rom: 'yae' }, { char: 'ㅓ', rom: 'eo' }, { char: 'ㅔ', rom: 'e' },
  { char: 'ㅕ', rom: 'yeo' }, { char: 'ㅖ', rom: 'ye' }, { char: 'ㅗ', rom: 'o' },
  { char: 'ㅘ', rom: 'wa' }, { char: 'ㅙ', rom: 'wae' }, { char: 'ㅚ', rom: 'oe' },
  { char: 'ㅛ', rom: 'yo' }, { char: 'ㅜ', rom: 'u' }, { char: 'ㅝ', rom: 'wo' },
  { char: 'ㅞ', rom: 'we' }, { char: 'ㅟ', rom: 'wi' }, { char: 'ㅠ', rom: 'yu' },
  { char: 'ㅡ', rom: 'eu' }, { char: 'ㅢ', rom: 'ui' }, { char: 'ㅣ', rom: 'i' }
];

const JONGSUNG_LIST = [
  { char: '없음 (No 받침)', rom: '', soundRule: 'No Batchim' },
  { char: 'ㄱ', rom: 'k', soundRule: '[k] sound (대표음 ㄱ)' },
  { char: 'ㄲ', rom: 'k', soundRule: '[k] sound (대표음 ㄱ)' },
  { char: 'ㄳ', rom: 'k', soundRule: '[k] sound (대표음 ㄱ)' },
  { char: 'ㄴ', rom: 'n', soundRule: '[n] sound (대표음 ㄴ)' },
  { char: 'ㄵ', rom: 'n', soundRule: '[n] sound (대표음 ㄴ)' },
  { char: 'ㄶ', rom: 'n', soundRule: '[n] sound (대표음 ㄴ)' },
  { char: 'ㄷ', rom: 't', soundRule: '[t] sound (대표음 ㄷ)' },
  { char: 'ㄹ', rom: 'l', soundRule: '[l] sound (대표음 ㄹ)' },
  { char: 'ㄺ', rom: 'k', soundRule: '[k] sound (대표음 ㄱ)' },
  { char: 'ㄻ', rom: 'm', soundRule: '[m] sound (대표음 ㅁ)' },
  { char: 'ㄼ', rom: 'p', soundRule: '[p] sound (대표음 ㅂ)' },
  { char: 'ㄽ', rom: 'l', soundRule: '[l] sound (대표음 ㄹ)' },
  { char: 'ㄾ', rom: 'l', soundRule: '[l] sound (대표음 ㄹ)' },
  { char: 'ㄿ', rom: 'p', soundRule: '[p] sound (대표음 ㅂ)' },
  { char: 'ㅀ', rom: 'l', soundRule: '[l] sound (대표음 ㄹ)' },
  { char: 'ㅁ', rom: 'm', soundRule: '[m] sound (대표음 ㅁ)' },
  { char: 'ㅂ', rom: 'p', soundRule: '[p] sound (대표음 ㅂ)' },
  { char: 'ㅄ', rom: 'p', soundRule: '[p] sound (대표음 ㅂ)' },
  { char: 'ㅅ', rom: 't', soundRule: '[t] sound (대표음 ㄷ) - s becomes t stop' },
  { char: 'ㅆ', rom: 't', soundRule: '[t] sound (대표음 ㄷ)' },
  { char: 'ㅇ', rom: 'ng', soundRule: '[ng] sound (대표음 ㅇ) - nasal ending' },
  { char: 'ㅈ', rom: 't', soundRule: '[t] sound (대표음 ㄷ)' },
  { char: 'ㅊ', rom: 't', soundRule: '[t] sound (대표음 ㄷ)' },
  { char: 'ㅋ', rom: 'k', soundRule: '[k] sound (대표음 ㄱ)' },
  { char: 'ㅌ', rom: 't', soundRule: '[t] sound (대표음 ㄷ)' },
  { char: 'ㅍ', rom: 'p', soundRule: '[p] sound (대표음 ㅂ)' },
  { char: 'ㅎ', rom: 't', soundRule: '[t] sound (대표음 ㄷ)' }
];

// Rich Compound Words & Phonetics for Single-Syllable Words
const COMPOUND_DICTIONARY: Record<string, SyllablePhoneticInfo> = {
  '꽃': {
    insightNote: "'꽃'은 1음절 단독 발음 시 ㅊ 받침이 음절 말 폐쇄음 [t/ㄷ]로 닫혀 소리가 짧고 잘 안 들릴 수 있습니다. 이때 '꽃잎'[꼰닙], '꽃집'[꼳찝], '꽃이'[꼬치]처럼 복합어나 모음 조사가 결합된 예시 발음으로 들으면 '꽃'의 진짜 음가와 받침 변화를 가장 선명하게 깨우칠 수 있습니다.",
    compounds: [
      { word: '꽃잎', pronunciation: '[꼰닙]', meaning: 'Flower petal (꽃의 잎사귀)', ruleTag: 'ㄴ 첨가 & 비음화' },
      { word: '꽃집', pronunciation: '[꼳찝]', meaning: 'Flower shop (꽃을 파는 가게)', ruleTag: '된소리되기 (경음화)' },
      { word: '꽃이', pronunciation: '[꼬치]', meaning: 'The flower is (주격 조사 결합)', ruleTag: '모음 연음 법칙' },
      { word: '꽃을', pronunciation: '[꼬츨]', meaning: 'The flower (목적격 조사 결합)', ruleTag: '모음 연음 법칙' },
      { word: '꽃다발', pronunciation: '[꼳따발]', meaning: 'Bouquet (선물용 꽃 묶음)', ruleTag: '된소리되기 [꼳따발]' },
      { word: '꽃길', pronunciation: '[꼳낄]', meaning: 'Flower path (꽃길만 걸어요)', ruleTag: '된소리되기 [꼳낄]' }
    ]
  },
  '빛': {
    insightNote: "'빛' 또한 ㅊ 받침이 단독 발음 시 [빋]으로 닫힙니다. '햇빛'[핻삗], '빛이'[비치], '빛나다'[빈나다]를 연속 청취하면 [ㅊ]의 연음과 비음화 규칙이 귀에 쏙 들어옵니다.",
    compounds: [
      { word: '햇빛', pronunciation: '[핻삗]', meaning: 'Sunlight (따스한 햇살)', ruleTag: '사잇소리 & 대표음' },
      { word: '빛이', pronunciation: '[비치]', meaning: 'The light is (주격 조사)', ruleTag: '모음 연음 법칙' },
      { word: '빛나다', pronunciation: '[빈나다]', meaning: 'To shine / glow (반짝이다)', ruleTag: '자음 앞 비음화 [빈]' },
      { word: '달빛', pronunciation: '[달빋]', meaning: 'Moonlight (밤하늘의 달빛)', ruleTag: '합성어 대표음' },
      { word: '빛을', pronunciation: '[비츨]', meaning: 'The light (목적격 조사)', ruleTag: '모음 연음 법칙' }
    ]
  },
  '잎': {
    insightNote: "'잎'의 ㅍ 받침은 단독 발음 시 [입]으로 소리납니다. '꽃잎'[꼰닙], '나뭇잎'[나무닙], '잎사귀'[입싸귀]를 들으면 받침 ㅍ이 복합어에서 어떻게 살아나는지 체득할 수 있습니다.",
    compounds: [
      { word: '꽃잎', pronunciation: '[꼰닙]', meaning: 'Flower petal (꽃잎이 날리다)', ruleTag: 'ㄴ 첨가 & 비음화' },
      { word: '나뭇잎', pronunciation: '[나무닙]', meaning: 'Tree leaf (단풍 나뭇잎)', ruleTag: '사잇소리 & ㄴ첨가' },
      { word: '잎이', pronunciation: '[이피]', meaning: 'The leaf is (주격 조사)', ruleTag: '모음 연음 법칙' },
      { word: '잎사귀', pronunciation: '[입싸귀]', meaning: 'Leafage (푸른 잎사귀)', ruleTag: '된소리되기' },
      { word: '풀잎', pronunciation: '[풀립]', meaning: 'Blade of grass (이슬 맺힌 풀잎)', ruleTag: '유음화 [ㄹ]' }
    ]
  },
  '집': {
    insightNote: "'집'은 ㅂ 받침입니다. '집에'[지베]의 연음, '꽃집'[꼳찝]의 된소리, '우리집'[우리집]의 자연스러운 결합을 비교해 보세요.",
    compounds: [
      { word: '꽃집', pronunciation: '[꼳찝]', meaning: 'Flower shop (꽃가게)', ruleTag: '된소리되기' },
      { word: '집에', pronunciation: '[지베]', meaning: 'At home / To home (장소 조사)', ruleTag: '모음 연음 법칙' },
      { word: '우리집', pronunciation: '[우리집]', meaning: 'Our home (가장 편안한 집)', ruleTag: '단어 결합' },
      { word: '집들이', pronunciation: '[집뜨리]', meaning: 'Housewarming party (이사 축하 파티)', ruleTag: '된소리되기' },
      { word: '옆집', pronunciation: '[엽찝]', meaning: 'Next door neighbor (이웃집)', ruleTag: '대표음 & 된소리' }
    ]
  },
  '밥': {
    insightNote: "'밥' 단독음 [밥]보다 '밥을'[바블], '김밥'[김빱], '볶음밥'[보끔밥]을 함께 들으면 ㅂ 받침의 개폐와 리듬감을 명확히 익힐 수 있습니다.",
    compounds: [
      { word: '밥을', pronunciation: '[바블]', meaning: 'Eat a meal (목적격 조사)', ruleTag: '모음 연음 법칙' },
      { word: '김밥', pronunciation: '[김빱]', meaning: 'Gimbap (한국 대표 분식)', ruleTag: '된소리되기' },
      { word: '볶음밥', pronunciation: '[보끔밥]', meaning: 'Fried rice (김치볶음밥)', ruleTag: '연음 & 복합어' },
      { word: '밥상', pronunciation: '[밥쌍]', meaning: 'Dining table (정갈한 밥상)', ruleTag: '된소리되기' },
      { word: '아침밥', pronunciation: '[아침빱]', meaning: 'Breakfast (아침 식사)', ruleTag: '합성어 경음화' }
    ]
  },
  '책': {
    insightNote: "'책'의 ㄱ 받침은 '책을'[채글], '책방'[책빵], '책상'[책쌍]을 통해 ㄱ이 다음 모음에서 [g]로 연음되거나 뒤 자음을 된소리로 만드는 규칙을 배웁니다.",
    compounds: [
      { word: '책을', pronunciation: '[채글]', meaning: 'A book (목적격 조사)', ruleTag: '모음 연음 법칙' },
      { word: '책방', pronunciation: '[책빵]', meaning: 'Bookstore (서점/책가게)', ruleTag: '된소리되기' },
      { word: '책상', pronunciation: '[책쌍]', meaning: 'Desk (공부 책상)', ruleTag: '된소리되기' },
      { word: '공책', pronunciation: '[공책]', meaning: 'Notebook (필기용 공책)', ruleTag: '복합 명사' },
      { word: '책장', pronunciation: '[책짱]', meaning: 'Bookshelf / Page (책을 꽂는 장)', ruleTag: '된소리되기' }
    ]
  },
  '달': {
    insightNote: "'달'의 ㄹ 받침은 모음 앞에서 부드러운 [r]로 연음됩니다. '달이'[다리], '달빛'[달빋], '보름달'[보름달]을 비교해 보세요.",
    compounds: [
      { word: '달이', pronunciation: '[다리]', meaning: 'The moon is (주격 조사)', ruleTag: '모음 연음 법칙 [다리]' },
      { word: '달빛', pronunciation: '[달빋]', meaning: 'Moonlight (은은한 달빛)', ruleTag: '합성어' },
      { word: '보름달', pronunciation: '[보름달]', meaning: 'Full moon (둥근 보름달)', ruleTag: '복합 명사' },
      { word: '달력', pronunciation: '[달력]', meaning: 'Calendar (날짜를 보는 달력)', ruleTag: '유음화 [ㄹ]' },
      { word: '초승달', pronunciation: '[초승달]', meaning: 'Crescent moon (초저녁 초승달)', ruleTag: '단어 결합' }
    ]
  },
  '강': {
    insightNote: "'강'의 ㅇ 받침은 비음 [ŋ]으로 모음이 와도 소리가 넘어가지 않고 독립적 비음으로 유지됩니다.",
    compounds: [
      { word: '한강', pronunciation: '[한강]', meaning: 'Han River (서울의 중심 강)', ruleTag: '복합 고유명사' },
      { word: '강물', pronunciation: '[강물]', meaning: 'River water (흘러가는 강물)', ruleTag: '합성어' },
      { word: '강가', pronunciation: '[강까]', meaning: 'Riverside (강변 산책로)', ruleTag: '사잇소리 경음화' },
      { word: '강변', pronunciation: '[강변]', meaning: 'River side (시원한 강변)', ruleTag: '한자 복합어' }
    ]
  },
  '한': {
    insightNote: "'한'의 ㄴ 받침은 뒤에 모음이 오면 [한구거]처럼 부드럽게 이어집니다.",
    compounds: [
      { word: '한국', pronunciation: '[한국]', meaning: 'Korea (대한민국)', ruleTag: '고유 명사' },
      { word: '한국어', pronunciation: '[한구거]', meaning: 'Korean language (한국말)', ruleTag: '모음 연음 법칙' },
      { word: '한식', pronunciation: '[한식]', meaning: 'Korean food (전통 한식)', ruleTag: '복합 단어' },
      { word: '한복', pronunciation: '[한복]', meaning: 'Hanbok (전통 의상)', ruleTag: '복합 명사' }
    ]
  },
  '글': {
    insightNote: "'글'의 ㄹ 받침은 '글자'[글짜], '한글'[한글], '글씨'[글씨]로 결합될 때 한국어의 독특한 리듬을 형성합니다.",
    compounds: [
      { word: '한글', pronunciation: '[한글]', meaning: 'Hangul (세종대왕이 창제한 문자)', ruleTag: '고유 명사' },
      { word: '글자', pronunciation: '[글짜]', meaning: 'Letter / Character (문자)', ruleTag: '된소리되기' },
      { word: '글씨', pronunciation: '[글씨]', meaning: 'Handwriting (예쁜 글씨)', ruleTag: '된소리되기' },
      { word: '글을', pronunciation: '[그를]', meaning: 'Writing / Text (목적격 조사)', ruleTag: '모음 연음 법칙' }
    ]
  },
  '눈': {
    insightNote: "'눈'은 Snow(눈)와 Eye(눈)의 동음이의어입니다. '눈사람'[눈사람], '첫눈'[천눈], '눈이'[누니]를 들어보세요.",
    compounds: [
      { word: '눈이', pronunciation: '[누니]', meaning: 'Snow falls / The eye (주격 조사)', ruleTag: '모음 연음 법칙' },
      { word: '눈사람', pronunciation: '[눈사람]', meaning: 'Snowman (겨울 눈사람)', ruleTag: '합성어' },
      { word: '첫눈', pronunciation: '[천눈]', meaning: 'First snowfall (첫눈 오는 날)', ruleTag: '비음화 [천눈]' },
      { word: '눈물', pronunciation: '[눈물]', meaning: 'Tears (흘리는 눈물)', ruleTag: '합성어' },
      { word: '눈꽃', pronunciation: '[눈꼳]', meaning: 'Snowflakes / Snow flower', ruleTag: '합성어 대표음' }
    ]
  },
  '옷': {
    insightNote: "'옷'의 ㅅ 받침은 단독 발음 시 [옫]이지만, 모음 조사가 오면 '옷을'[오슬], 자음이 오면 '옷장'[옫짱]으로 바뀝니다.",
    compounds: [
      { word: '옷을', pronunciation: '[오슬]', meaning: 'Clothes (목적격 조사 결합)', ruleTag: '모음 연음 법칙' },
      { word: '옷장', pronunciation: '[옫짱]', meaning: 'Wardrobe / Closet (옷장)', ruleTag: '대표음 & 된소리' },
      { word: '새옷', pronunciation: '[새옫]', meaning: 'New clothes (새로 산 옷)', ruleTag: '대표음 [옫]' },
      { word: '옷가게', pronunciation: '[옫까게]', meaning: 'Clothing store (옷 파는 매장)', ruleTag: '대표음 & 된소리' }
    ]
  },
  '낮': {
    insightNote: "'낮'의 ㅈ 받침은 단독 시 [낟]이지만, '낮에'[나제]처럼 연음되거나 '낮잠'[낟짬]처럼 된소리를 유도합니다.",
    compounds: [
      { word: '낮에', pronunciation: '[나제]', meaning: 'In the daytime (시간 조사)', ruleTag: '모음 연음 법칙' },
      { word: '낮잠', pronunciation: '[낟짬]', meaning: 'Afternoon nap (달콤한 낮잠)', ruleTag: '대표음 & 된소리' },
      { word: '한낮', pronunciation: '[한낟]', meaning: 'Midday / Noon (뜨거운 한낮)', ruleTag: '합성어' }
    ]
  },
  '밭': {
    insightNote: "'밭'의 ㅌ 받침은 '밭에'[바테], '꽃밭'[꼳빧], '밭이'[바치](구개음화)로 다양하게 발음됩니다.",
    compounds: [
      { word: '꽃밭', pronunciation: '[꼳빧]', meaning: 'Flower garden (아름다운 꽃밭)', ruleTag: '대표음 & 경음화' },
      { word: '밭에', pronunciation: '[바테]', meaning: 'In the field (장소 조사)', ruleTag: '모음 연음 법칙' },
      { word: '밭이', pronunciation: '[바치]', meaning: 'The field is (주격 조사)', ruleTag: '구개음화 [ㅌ→ㅊ]' },
      { word: '논밭', pronunciation: '[논빧]', meaning: 'Paddy & field (시골 논밭)', ruleTag: '대표음' }
    ]
  },
  '물': {
    insightNote: "'물'은 ㄹ 받침으로 '물을'[무를], '물병'[물뼝], '물결'[물껼]의 발음으로 ㄹ의 개방을 확인합니다.",
    compounds: [
      { word: '물을', pronunciation: '[무를]', meaning: 'Water (목적격 조사)', ruleTag: '모음 연음 법칙' },
      { word: '물병', pronunciation: '[물뼝]', meaning: 'Water bottle (휴대용 물병)', ruleTag: '된소리되기' },
      { word: '물결', pronunciation: '[물껼]', meaning: 'Wave / ripple (출렁이는 물결)', ruleTag: '된소리되기' },
      { word: '생수물', pronunciation: '[생수물]', meaning: 'Spring water (깨끗한 물)', ruleTag: '단어 결합' }
    ]
  }
};

/**
 * Fallback phonetic generator for any arbitrary assembled Hangul syllable
 */
function getPhoneticInfoForChar(syllable: string, hasBatchim: boolean): SyllablePhoneticInfo {
  if (COMPOUND_DICTIONARY[syllable]) {
    return COMPOUND_DICTIONARY[syllable];
  }

  if (hasBatchim) {
    return {
      insightNote: `'${syllable}'처럼 받침이 있는 단어는 단독 발음 시 말음 폐쇄로 끝이 짧게 끊길 수 있으나, 뒤에 모음 조사(-이, -을, -에)나 다른 단어가 이어질 때 연음(Liaison)되어 본래의 음가를 훨씬 뚜렷하게 들을 수 있습니다.`,
      compounds: [
        { word: `${syllable}이`, pronunciation: `[${syllable}이 (연음)]`, meaning: `'${syllable}'이(가) 주어로 쓰일 때`, ruleTag: '모음 연음 법칙' },
        { word: `${syllable}을`, pronunciation: `[${syllable}을 (연음)]`, meaning: `'${syllable}'을(를) 목적으로 할 때`, ruleTag: '모음 연음 법칙' },
        { word: `${syllable}에`, pronunciation: `[${syllable}에 (연음)]`, meaning: `'${syllable}'에 도달하거나 위치할 때`, ruleTag: '모음 연음 법칙' },
        { word: `${syllable}도`, pronunciation: `[${syllable}도]`, meaning: `'${syllable}' 역시 포함될 때`, ruleTag: '조사 결합' }
      ]
    };
  } else {
    return {
      insightNote: `'${syllable}'은 모음으로 끝나는 음절로 단독 발음도 부드럽게 울립니다. 뒤에 조사(-가, -를, -는)가 결합될 때의 흐름을 확인해 보세요.`,
      compounds: [
        { word: `${syllable}가`, pronunciation: `[${syllable}가]`, meaning: `'${syllable}'이(가) 주어일 때`, ruleTag: '주격 조사 결합' },
        { word: `${syllable}를`, pronunciation: `[${syllable}를]`, meaning: `'${syllable}'을(를) 목적어로 할 때`, ruleTag: '목적격 조사 결합' },
        { word: `${syllable}는`, pronunciation: `[${syllable}는]`, meaning: `'${syllable}'은(는) 화제일 때`, ruleTag: '화제 조사 결합' },
        { word: `${syllable}도`, pronunciation: `[${syllable}도]`, meaning: `'${syllable}' 또한 포함될 때`, ruleTag: '보조사 결합' }
      ]
    };
  }
}

export default function HangulAlphabetMenu() {
  const [menuMode, setMenuMode] = useState<'alphabet' | 'builder'>('builder');
  const [activeTab, setActiveTab] = useState<'vowel' | 'consonant' | 'double' | 'complex'>('vowel');

  // Syllable Builder State: Default '꽃' (cho: 1 [ㄲ], jung: 8 [ㅗ], jong: 23 [ㅊ]) for instant demonstration!
  const [choIdx, setChoIdx] = useState<number>(1);  // ㄲ
  const [jungIdx, setJungIdx] = useState<number>(8); // ㅗ
  const [jongIdx, setJongIdx] = useState<number>(23); // ㅊ  => "꽃"

  const [isPlayingSequence, setIsPlayingSequence] = useState<boolean>(false);
  const [currentPlayingWord, setCurrentPlayingWord] = useState<string | null>(null);

  const hangulList: HangulChar[] = [
    // Vowels
    { char: 'ㅏ', nameKo: '아', romanized: 'a', exampleKo: '아이 (ai)', exampleEn: 'Child', type: 'vowel' },
    { char: 'ㅓ', nameKo: '어', romanized: 'eo', exampleKo: '어머니 (eomeoni)', exampleEn: 'Mother', type: 'vowel' },
    { char: 'ㅗ', nameKo: '오', romanized: 'o', exampleKo: '오이 (oi)', exampleEn: 'Cucumber', type: 'vowel' },
    { char: 'ㅜ', nameKo: '우', romanized: 'u', exampleKo: '우유 (uyu)', exampleEn: 'Milk', type: 'vowel' },
    { char: 'ㅡ', nameKo: '으', romanized: 'eu', exampleKo: '음식 (eumsik)', exampleEn: 'Food', type: 'vowel' },
    { char: 'ㅣ', nameKo: '이', romanized: 'i', exampleKo: '이름 (ireum)', exampleEn: 'Name', type: 'vowel' },
    { char: 'ㅑ', nameKo: '야', romanized: 'ya', exampleKo: '야구 (yagu)', exampleEn: 'Baseball', type: 'vowel' },
    { char: 'ㅕ', nameKo: '여', romanized: 'yeo', exampleKo: '여자 (yeoja)', exampleEn: 'Woman', type: 'vowel' },

    // Consonants
    { char: 'ㄱ', nameKo: '기역 (giyeok)', romanized: 'g / k', exampleKo: '가방 (gabang)', exampleEn: 'Bag', type: 'consonant' },
    { char: 'ㄴ', nameKo: '니은 (nieun)', romanized: 'n', exampleKo: '나무 (namu)', exampleEn: 'Tree', type: 'consonant' },
    { char: 'ㄷ', nameKo: '디귿 (digeut)', romanized: 'd / t', exampleKo: '다리 (dari)', exampleEn: 'Bridge / Leg', type: 'consonant' },
    { char: 'ㄹ', nameKo: '리을 (rieul)', romanized: 'r / l', exampleKo: '라디오 (radio)', exampleEn: 'Radio', type: 'consonant' },
    { char: 'ㅁ', nameKo: '미음 (mieum)', romanized: 'm', exampleKo: '모자 (moja)', exampleEn: 'Hat', type: 'consonant' },
    { char: 'ㅂ', nameKo: '비읍 (bieup)', romanized: 'b / p', exampleKo: '바다 (bada)', exampleEn: 'Sea / Ocean', type: 'consonant' },
    { char: 'ㅅ', nameKo: '시옷 (siot)', romanized: 's', exampleKo: '사과 (sagwa)', exampleEn: 'Apple', type: 'consonant' },
    { char: 'ㅇ', nameKo: '이응 (ieung)', romanized: 'ng / silent', exampleKo: '우산 (usan)', exampleEn: 'Umbrella', type: 'consonant' },
    { char: 'ㅈ', nameKo: '지읒 (jieut)', romanized: 'j', exampleKo: '자전거 (jajeon-geo)', exampleEn: 'Bicycle', type: 'consonant' },

    // Double & Aspirated
    { char: 'ㅋ', nameKo: '키읔 (kieuk)', romanized: 'k', exampleKo: '코끼리 (kokkiri)', exampleEn: 'Elephant', type: 'double' },
    { char: 'ㅌ', nameKo: '티읕 (tieut)', romanized: 't', exampleKo: '토마토 (tomato)', exampleEn: 'Tomato', type: 'double' },
    { char: 'ㅍ', nameKo: '피읖 (pieup)', romanized: 'p', exampleKo: '피아노 (piano)', exampleEn: 'Piano', type: 'double' },
    { char: 'ㅎ', nameKo: '히읗 (hieut)', romanized: 'h', exampleKo: '하늘 (haneul)', exampleEn: 'Sky', type: 'double' },
    { char: 'ㄲ', nameKo: '쌍기역', romanized: 'kk', exampleKo: '꼬리 (kkori)', exampleEn: 'Tail', type: 'double' },
    { char: 'ㄸ', nameKo: '쌍디귿', romanized: 'tt', exampleKo: '딸기 (ttalgi)', exampleEn: 'Strawberry', type: 'double' },
    { char: 'ㅃ', nameKo: '쌍비읍', romanized: 'pp', exampleKo: '빵 (ppang)', exampleEn: 'Bread', type: 'double' },

    // Complex Vowels
    { char: 'ㅐ', nameKo: '애', romanized: 'ae', exampleKo: '사과 (sagwa)', exampleEn: 'Apple', type: 'complex' },
    { char: 'ㅔ', nameKo: '에', romanized: 'e', exampleKo: '가게 (gage)', exampleEn: 'Store', type: 'complex' },
    { char: 'ㅘ', nameKo: '와', romanized: 'wa', exampleKo: '과일 (gwail)', exampleEn: 'Fruit', type: 'complex' },
    { char: 'ㅝ', nameKo: '워', romanized: 'wo', exampleKo: '병원 (byeong-won)', exampleEn: 'Hospital', type: 'complex' },
    { char: 'ㅟ', nameKo: '위', romanized: 'wi', exampleKo: '가위 (gawi)', exampleEn: 'Scissors', type: 'complex' },
    { char: 'ㅢ', nameKo: '의', romanized: 'ui', exampleKo: '의자 (uija)', exampleEn: 'Chair', type: 'complex' }
  ];

  const filteredList = hangulList.filter(h => h.type === activeTab);

  // Compute Unicode Hangul Syllable Code Point: 0xAC00 + (cho * 21 * 28) + (jung * 28) + jong
  const getCombinedChar = () => {
    const codePoint = 0xAC00 + (choIdx * 21 * 28) + (jungIdx * 28) + jongIdx;
    return String.fromCharCode(codePoint);
  };

  const getCombinedRomanization = () => {
    const choRom = CHOSUNG_LIST[choIdx].rom;
    const jungRom = JUNGSUNG_LIST[jungIdx].rom;
    const jongRom = JONGSUNG_LIST[jongIdx].rom;
    return `${choRom}${jungRom}${jongRom}`;
  };

  const currentChar = getCombinedChar();
  const hasBatchim = jongIdx > 0;
  const phoneticInfo = getPhoneticInfoForChar(currentChar, hasBatchim);

  const handleSpeakText = (text: string) => {
    setCurrentPlayingWord(text);
    speakKoreanText(text);
    setTimeout(() => {
      setCurrentPlayingWord(null);
    }, 1200);
  };

  // Play Sequence: Root syllable -> Compound 1 -> Compound 2 ...
  const handlePlaySequence = async () => {
    if (isPlayingSequence) return;
    setIsPlayingSequence(true);

    const playlist = [currentChar, ...phoneticInfo.compounds.map(c => c.word)];
    
    for (let i = 0; i < playlist.length; i++) {
      const item = playlist[i];
      setCurrentPlayingWord(item);
      speakKoreanText(item);
      // wait 1.6s between words
      await new Promise(resolve => setTimeout(resolve, 1600));
    }

    setCurrentPlayingWord(null);
    setIsPlayingSequence(false);
  };

  const presetWords = [
    { label: '꽃 (kkot)', ko: '꽃 (Flower - ㅊ받침)', cho: 1, jung: 8, jong: 23, desc: '꽃잎/꽃집으로 발음 깨우치기' },
    { label: '한 (han)', ko: '한국 (Korea)', cho: 18, jung: 0, jong: 4, desc: 'ㄴ 받침 기초' },
    { label: '글 (geul)', ko: '한글 (Hangul)', cho: 0, jung: 18, jong: 8, desc: 'ㄹ 받침 유음' },
    { label: '밥 (bap)', ko: '밥 (Rice / Meal)', cho: 7, jung: 0, jong: 17, desc: 'ㅂ 받침 폐쇄' },
    { label: '집 (jip)', ko: '집 (House)', cho: 12, jung: 20, jong: 17, desc: '꽃집/집에' },
    { label: '빛 (bit)', ko: '빛 (Light - ㅊ받침)', cho: 7, jung: 20, jong: 23, desc: '햇빛/빛이' },
    { label: '잎 (ip)', ko: '잎 (Leaf - ㅍ받침)', cho: 11, jung: 20, jong: 26, desc: '꽃잎/나뭇잎' },
    { label: '책 (chaek)', ko: '책 (Book - ㄱ받침)', cho: 14, jung: 1, jong: 1, desc: '책을/책방' },
    { label: '달 (dal)', ko: '달 (Moon - ㄹ받침)', cho: 3, jung: 0, jong: 8, desc: '달이/달빛' },
    { label: '눈 (nun)', ko: '눈 (Snow/Eye - ㄴ받침)', cho: 2, jung: 13, jong: 4, desc: '눈사람/눈이' }
  ];

  const applyPreset = (preset: typeof presetWords[0]) => {
    setChoIdx(preset.cho);
    setJungIdx(preset.jung);
    setJongIdx(preset.jong);
    handleSpeakText(preset.ko.split(' ')[0]);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-editorial-border rounded-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-sm bg-red-100 text-red-600 flex items-center justify-center font-bold text-lg">
              <span>🔤</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-serif font-bold text-editorial-text">Hangul Alphabet & Syllable Assembler (한글 자모 & 단어조립기)</h2>
                <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                  STEP 1 입문
                </span>
              </div>
              <p className="text-xs text-editorial-muted mt-0.5">
                초성·중성·종성(받침)을 결합하고, <strong>'꽃'</strong>처럼 단독으로 잘 안 들리는 단어는 <strong>'꽃잎'·'꽃집'</strong> 등 실전 복합어로 명확히 깨우치세요!
              </p>
            </div>
          </div>

          {/* Top Mode Toggle */}
          <div className="flex bg-editorial-bg border border-editorial-border p-1 rounded-sm shrink-0">
            <button
              onClick={() => setMenuMode('builder')}
              className={`px-4 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                menuMode === 'builder'
                  ? 'bg-editorial-text text-white shadow-sm'
                  : 'text-editorial-text hover:text-editorial-accent'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>단어조립기 (Syllable Builder)</span>
            </button>
            <button
              onClick={() => setMenuMode('alphabet')}
              className={`px-4 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                menuMode === 'alphabet'
                  ? 'bg-editorial-text text-white shadow-sm'
                  : 'text-editorial-text hover:text-editorial-accent'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>자모표 (Alphabet Chart)</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          MODE 1: 단어조립기 (INTERACTIVE SYLLABLE & BATCHIM BUILDER)
         ========================================================= */}
      {menuMode === 'builder' && (
        <div className="space-y-6">
          {/* Main Syllable Display Banner */}
          <div className="bg-[#1A1A1A] border border-editorial-border rounded-sm p-6 sm:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/15 rounded-full blur-3xl -mr-20 -mt-20"></div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              {/* Left Combined Preview Card */}
              <div className="flex items-center space-x-6">
                <div
                  onClick={() => handleSpeakText(currentChar)}
                  className={`w-32 h-32 sm:w-36 sm:h-36 rounded-sm bg-white text-editorial-text flex flex-col items-center justify-center border-2 border-red-500 shadow-xl cursor-pointer hover:scale-105 transition-all group ${
                    currentPlayingWord === currentChar ? 'ring-4 ring-red-400 bg-red-50' : ''
                  }`}
                  title="클릭하여 단어 발음 듣기"
                >
                  <span className="text-6xl sm:text-7xl font-serif font-bold text-red-600 group-hover:text-red-700 transition-colors">
                    {currentChar}
                  </span>
                  <span className="text-xs font-bold text-editorial-muted uppercase mt-1">
                    [ {getCombinedRomanization()} ]
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-red-600 text-white px-2.5 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                      조립 결과 (Assembled Syllable)
                    </span>
                    <button
                      onClick={() => handleSpeakText(currentChar)}
                      className="px-3 py-1 bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-sm text-xs font-bold flex items-center space-x-1 cursor-pointer transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-red-400" />
                      <span>{currentChar} 단독 발음</span>
                    </button>
                    <button
                      onClick={handlePlaySequence}
                      disabled={isPlayingSequence}
                      className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-sm text-xs font-bold flex items-center space-x-1 cursor-pointer transition-colors disabled:opacity-50"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isPlayingSequence ? '연속 청취 중...' : '예시 연속 듣기 ▶'}</span>
                    </button>
                  </div>

                  <h3 className="text-2xl font-serif font-bold flex items-center space-x-2">
                    <span>{CHOSUNG_LIST[choIdx].char}</span>
                    <span className="text-red-400 font-normal">+</span>
                    <span>{JUNGSUNG_LIST[jungIdx].char}</span>
                    <span className="text-red-400 font-normal">+</span>
                    <span className="text-red-400 font-bold">{JONGSUNG_LIST[jongIdx].char === '없음 (No 받침)' ? '(받침 없음)' : JONGSUNG_LIST[jongIdx].char}</span>
                    <span className="text-white font-normal">=</span>
                    <span className="text-red-400 font-bold">{currentChar}</span>
                  </h3>

                  <div className="text-xs text-gray-300 space-y-1">
                    <p>
                      • <strong className="text-red-300">초성 (Initial):</strong> {CHOSUNG_LIST[choIdx].char} [{CHOSUNG_LIST[choIdx].rom || 'silent'}]
                    </p>
                    <p>
                      • <strong className="text-red-300">중성 (Vowel):</strong> {JUNGSUNG_LIST[jungIdx].char} [{JUNGSUNG_LIST[jungIdx].rom}]
                    </p>
                    <p>
                      • <strong className="text-red-300">종성 (받침 / Batchim):</strong> {JONGSUNG_LIST[jongIdx].char} <span className="opacity-80">({JONGSUNG_LIST[jongIdx].soundRule})</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Quick Practical Batchim Presets */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-sm w-full md:w-88 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-red-300 uppercase tracking-widest block">
                    ✨ 추천 받침 단어 프리셋
                  </span>
                  <span className="text-[10px] text-gray-400">클릭 즉시 조립</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {presetWords.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => applyPreset(item)}
                      className={`px-2.5 py-1.5 rounded-sm text-xs font-bold transition-all text-left cursor-pointer border ${
                        currentChar === item.ko.split(' ')[0]
                          ? 'bg-red-600 text-white border-red-500 shadow-sm'
                          : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                      }`}
                    >
                      <div className="font-bold flex items-center justify-between">
                        <span>{item.label}</span>
                        {currentChar === item.ko.split(' ')[0] && <span className="text-[10px]">선택됨</span>}
                      </div>
                      <span className="block text-[10px] opacity-75 font-normal truncate mt-0.5">
                        {item.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              NEW: '꽃' 등 1음절 단어 발음 깨우치기 전용 복합어 예시 청취 섹션 (User Request 3)
             ========================================================================= */}
          <div className="bg-white border-2 border-red-200 rounded-sm p-6 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-red-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-sm bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                  🌸
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-editorial-text flex items-center space-x-2">
                    <span>'{currentChar}' 발음 깨우치기: 실전 연계 복합어 예시 발음</span>
                    <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      {phoneticInfo.compounds.length}개 예시
                    </span>
                  </h3>
                  <p className="text-xs text-editorial-muted">
                    한 단어 단독 발음의 한계를 넘어, 뒤에 결합되는 말과 함께 들을 때 받침의 본래 음가를 가장 또렷하게 체득할 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={handlePlaySequence}
                  disabled={isPlayingSequence}
                  className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-sm text-xs font-bold transition-all flex items-center space-x-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlayingSequence ? '연속 발음 중...' : '전체 예시 연속 듣기'}</span>
                </button>
              </div>
            </div>

            {/* Explanatory Pedagogical Callout Box */}
            <div className="bg-red-50/70 border border-red-200 rounded-sm p-4 text-xs text-red-950 space-y-1 leading-relaxed">
              <div className="flex items-center space-x-1.5 font-bold text-red-800">
                <Info className="w-4 h-4 text-red-600 shrink-0" />
                <span>💡 왜 '꽃' 같은 한 단어는 단독으로 들으면 발음이 잘 안 들릴까요?</span>
              </div>
              <p className="pl-5 text-editorial-text font-serif">
                {phoneticInfo.insightNote}
              </p>
            </div>

            {/* Interactive Compound Word Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
              {phoneticInfo.compounds.map((comp, cIdx) => {
                const isPlayingThis = currentPlayingWord === comp.word;
                return (
                  <div
                    key={cIdx}
                    onClick={() => handleSpeakText(comp.word)}
                    className={`p-4 rounded-sm border transition-all cursor-pointer flex items-center justify-between group ${
                      isPlayingThis
                        ? 'bg-red-50 border-red-500 ring-2 ring-red-400 shadow-md scale-[1.02]'
                        : 'bg-editorial-bg/40 border-editorial-border hover:border-red-400 hover:bg-red-50/30'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-serif font-black text-editorial-text group-hover:text-red-600 transition-colors">
                          {comp.word}
                        </span>
                        <span className="text-xs font-bold text-red-600 font-mono bg-white px-1.5 py-0.5 rounded border border-red-200">
                          {comp.pronunciation}
                        </span>
                      </div>
                      <p className="text-xs text-editorial-muted truncate">
                        {comp.meaning}
                      </p>
                      <div className="pt-0.5">
                        <span className="text-[10px] font-bold text-red-700 bg-red-100/60 px-1.5 py-0.2 rounded inline-block">
                          {comp.ruleTag}
                        </span>
                      </div>
                    </div>

                    <div className="ml-3 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeakText(comp.word);
                        }}
                        className={`w-9 h-9 rounded-sm flex items-center justify-center transition-all cursor-pointer ${
                          isPlayingThis
                            ? 'bg-red-600 text-white ring-2 ring-red-300'
                            : 'bg-white border border-editorial-border text-editorial-muted group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600'
                        }`}
                        title={`${comp.word} 발음 듣기`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3-Column Interactive Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: 초성 (Initial Consonant) */}
            <div className="bg-white border border-editorial-border rounded-sm p-5 space-y-3">
              <div className="flex justify-between items-center border-b border-editorial-border pb-2">
                <span className="text-xs font-bold text-editorial-text uppercase tracking-wider font-serif">
                  1. 초성 (Initial Consonant)
                </span>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  선택: {CHOSUNG_LIST[choIdx].char}
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 max-h-64 overflow-y-auto pr-1">
                {CHOSUNG_LIST.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setChoIdx(idx);
                      handleSpeakText(String.fromCharCode(0xAC00 + (idx * 21 * 28) + (jungIdx * 28) + jongIdx));
                    }}
                    className={`p-2 rounded-sm text-center border transition-all cursor-pointer ${
                      choIdx === idx
                        ? 'bg-editorial-text text-white border-editorial-text font-bold shadow-sm'
                        : 'bg-editorial-bg border-editorial-border text-editorial-text hover:bg-editorial-accent-light/40'
                    }`}
                  >
                    <span className="text-lg font-serif font-bold block">{item.char}</span>
                    <span className="text-[10px] opacity-75 block">{item.rom || '∅'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Column 2: 중성 (Vowel) */}
            <div className="bg-white border border-editorial-border rounded-sm p-5 space-y-3">
              <div className="flex justify-between items-center border-b border-editorial-border pb-2">
                <span className="text-xs font-bold text-editorial-text uppercase tracking-wider font-serif">
                  2. 중성 (Vowel)
                </span>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  선택: {JUNGSUNG_LIST[jungIdx].char}
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 max-h-64 overflow-y-auto pr-1">
                {JUNGSUNG_LIST.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setJungIdx(idx);
                      handleSpeakText(String.fromCharCode(0xAC00 + (choIdx * 21 * 28) + (idx * 28) + jongIdx));
                    }}
                    className={`p-2 rounded-sm text-center border transition-all cursor-pointer ${
                      jungIdx === idx
                        ? 'bg-editorial-text text-white border-editorial-text font-bold shadow-sm'
                        : 'bg-editorial-bg border-editorial-border text-editorial-text hover:bg-editorial-accent-light/40'
                    }`}
                  >
                    <span className="text-lg font-serif font-bold block">{item.char}</span>
                    <span className="text-[10px] opacity-75 block">{item.rom}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3: 종성 (받침 / Final Consonant) */}
            <div className="bg-white border border-editorial-border rounded-sm p-5 space-y-3">
              <div className="flex justify-between items-center border-b border-editorial-border pb-2">
                <span className="text-xs font-bold text-editorial-text uppercase tracking-wider font-serif">
                  3. 종성 (받침 / Batchim)
                </span>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  {jongIdx === 0 ? '없음 (None)' : JONGSUNG_LIST[jongIdx].char}
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 max-h-64 overflow-y-auto pr-1">
                {JONGSUNG_LIST.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setJongIdx(idx);
                      handleSpeakText(String.fromCharCode(0xAC00 + (choIdx * 21 * 28) + (jungIdx * 28) + idx));
                    }}
                    className={`p-2 rounded-sm text-center border transition-all cursor-pointer ${
                      jongIdx === idx
                        ? 'bg-red-600 text-white border-red-600 font-bold shadow-sm'
                        : 'bg-editorial-bg border-editorial-border text-editorial-text hover:bg-editorial-accent-light/40'
                    }`}
                  >
                    <span className="text-base font-serif font-bold block truncate">
                      {item.char}
                    </span>
                    <span className="text-[10px] opacity-75 block">
                      {idx === 0 ? 'None' : `[${item.rom}]`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODE 2: 자모표 (ALPHABET CHART)
         ========================================================= */}
      {menuMode === 'alphabet' && (
        <div className="space-y-6">
          {/* Tab Selector */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'vowel', labelKo: '모음', labelEn: 'Basic Vowels' },
              { id: 'consonant', labelKo: '자음', labelEn: 'Basic Consonants' },
              { id: 'double', labelKo: '쌍자음/격음', labelEn: 'Double / Aspirated' },
              { id: 'complex', labelKo: '복합모음', labelEn: 'Complex Vowels' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-editorial-text text-white shadow-sm'
                    : 'bg-editorial-bg border border-editorial-border text-editorial-text hover:bg-editorial-accent-light/40'
                }`}
              >
                <span>{tab.labelKo}</span>
                <span className="opacity-70 block text-[10px] font-normal">{tab.labelEn}</span>
              </button>
            ))}
          </div>

          {/* Characters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredList.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSpeakText(item.exampleKo.split(' ')[0])}
                className="bg-white border border-editorial-border rounded-sm p-5 flex flex-col justify-between space-y-4 hover:border-red-400 hover:shadow-sm transition-all cursor-pointer group text-center"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-editorial-muted uppercase tracking-wider">{item.nameKo}</span>
                  <Volume2 className="w-4 h-4 text-red-600 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="py-2">
                  <h3 className="text-5xl font-serif font-bold text-editorial-text group-hover:text-red-600 transition-colors">
                    {item.char}
                  </h3>
                  <p className="text-xs font-bold text-red-600 uppercase mt-2 tracking-widest">
                    [ {item.romanized} ]
                  </p>
                </div>

                <div className="border-t border-editorial-border pt-3 text-xs space-y-0.5">
                  <p className="font-bold text-editorial-text font-serif">{item.exampleKo}</p>
                  <p className="text-editorial-muted italic">{item.exampleEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
