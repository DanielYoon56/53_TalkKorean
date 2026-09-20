import React, { useState } from 'react';
import { Volume2, Star, CheckCircle, Search, Bookmark } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { speakKoreanText } from '../../utils/tts';

interface Phrase {
  id: number;
  category: string;
  korean: string;
  romanized: string;
  english: string;
  japanese: string;
  spanish: string;
  tip: string;
  tipJa: string;
  tipEs: string;
}

export default function DailyPhrasesMenu() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedPhrases, setSavedPhrases] = useState<number[]>([]);

  const phrases: Phrase[] = [
    {
      id: 1,
      category: 'Greetings (인사)',
      korean: '안녕하세요',
      romanized: 'Annyeonghaseyo',
      english: 'Hello / Good morning / Good evening',
      japanese: 'こんにちは / おはようございます',
      spanish: 'Hola / Buenos días',
      tip: 'Universal polite greeting used with anyone.',
      tipJa: '誰にでも使える丁寧で万能な挨拶表現です。',
      tipEs: 'Saludo cortés universal utilizado con cualquier persona.'
    },
    {
      id: 2,
      category: 'Greetings (인사)',
      korean: '감사합니다',
      romanized: 'Gamsahamnida',
      english: 'Thank you (Formal)',
      japanese: 'ありがとうございます（丁寧語）',
      spanish: 'Muchas gracias (Formal)',
      tip: 'Standard formal expression of gratitude.',
      tipJa: '日常やビジネスで最も一般的で丁寧な感謝の言葉です。',
      tipEs: 'Expresión formal estándar de agradecimiento.'
    },
    {
      id: 3,
      category: 'Greetings (인사)',
      korean: '반갑습니다',
      romanized: 'Bangapseumnida',
      english: 'Nice to meet you',
      japanese: 'お会いできて嬉しいです / 初めまして',
      spanish: 'Mucho gusto / Encantado de conocerte',
      tip: 'Use when meeting someone for the first time.',
      tipJa: '初対面の人と挨拶を交わすときに使います。',
      tipEs: 'Se usa al conocer a alguien por primera vez.'
    },
    {
      id: 4,
      category: 'Dining (식사)',
      korean: '여기요, 주문할게요',
      romanized: 'Yeogiyo, jumun-halgeyo',
      english: 'Excuse me, I would like to order',
      japanese: 'すみません、注文します',
      spanish: 'Disculpe, quisiera ordenar',
      tip: 'Say "여기요 (Yeogiyo)" to get a server’s attention in restaurants.',
      tipJa: '飲食店で店員さんを呼ぶ時に「여기요（ヨギヨ）」と言います。',
      tipEs: 'Di "여기요 (Yeogiyo)" para llamar la atención del camarero.'
    },
    {
      id: 5,
      category: 'Dining (식사)',
      korean: '물 좀 더 주시겠어요?',
      romanized: 'Mul jom deo jusigesseoyo?',
      english: 'Could I have some more water, please?',
      japanese: 'お水をもう少しいただけますか？',
      spanish: '¿Me podría dar más agua, por favor?',
      tip: 'Water is usually free and refillable in Korean restaurants.',
      tipJa: '韓国の食堂ではお水は基本的におかわり無料です。',
      tipEs: 'El agua generalmente es gratuita y rellenable en los restaurantes coreanos.'
    },
    {
      id: 6,
      category: 'Dining (식사)',
      korean: '잘 먹겠습니다',
      romanized: 'Jal meokgesseumnida',
      english: 'I will enjoy this meal (Bon appétit)',
      japanese: 'いただきます',
      spanish: '¡Buen provecho! / Disfrutaré esta comida',
      tip: 'Said politely before eating a meal.',
      tipJa: '食事を始める前に礼儀正しく言う挨拶です。',
      tipEs: 'Se dice de manera educada antes de comer.'
    },
    {
      id: 7,
      category: 'Shopping (쇼핑)',
      korean: '이거 얼마예요?',
      romanized: 'Igeo eolmayeyo?',
      english: 'How much is this?',
      japanese: 'これいくらですか？',
      spanish: '¿Cuánto cuesta esto?',
      tip: 'Essential question when buying goods or street food.',
      tipJa: '屋台やショップでお会計・値段を聞く時の必須フレーズ。',
      tipEs: 'Pregunta esencial al comprar artículos o comida callejera.'
    },
    {
      id: 8,
      category: 'Shopping (쇼핑)',
      korean: '조금만 깎아주세요',
      romanized: 'Jogeum-man kkakka-juseyo',
      english: 'Please give me a little discount',
      japanese: '少し負けて（まけて）ください / 安くしてください',
      spanish: 'Por favor, hágame un pequeño descuento',
      tip: 'Can be used playfully at traditional markets (not department stores).',
      tipJa: '伝統市場や露店で愛嬌を込めて値切るときに使えます。',
      tipEs: 'Se puede usar amigablemente en mercados tradicionales.'
    },
    {
      id: 9,
      category: 'Directions (교통/길찾기)',
      korean: '지하철역이 어디에 있어요?',
      romanized: 'Jihacheol-yeogi eodie isseoyo?',
      english: 'Where is the subway station?',
      japanese: '地下鉄の駅はどこにありますか？',
      spanish: '¿Dónde está la estación de metro?',
      tip: 'Useful for finding nearest transit stations in Seoul.',
      tipJa: 'ソウル市内などで最寄りの地下鉄駅を探す時に役立ちます。',
      tipEs: 'Útil para encontrar las estaciones de transporte en Seúl.'
    },
    {
      id: 10,
      category: 'Directions (교통/길찾기)',
      korean: '여기서 얼마나 걸려요?',
      romanized: 'Yeogiseo eolmana geollyeoyo?',
      english: 'How long does it take from here?',
      japanese: 'ここからどれくらい時間がかかりますか？',
      spanish: '¿Cuánto tiempo se tarda desde aquí?',
      tip: 'Ask when estimating walk or bus travel times.',
      tipJa: '徒歩やバス・タクシーの移動時間を尋ねる時に使います。',
      tipEs: 'Pregunta útil al estimar el tiempo de caminata o autobús.'
    },
    {
      id: 11,
      category: 'Emergencies (긴급/안전)',
      korean: '도와주세요!',
      romanized: 'Dowajuseyo!',
      english: 'Please help me!',
      japanese: '助けてください！',
      spanish: '¡Ayúdeme, por favor!',
      tip: 'Emergency shout for immediate assistance.',
      tipJa: '緊急時に周りの助けを求める時の叫び声です。',
      tipEs: 'Grito de emergencia para obtener ayuda inmediata.'
    },
    {
      id: 12,
      category: 'Emergencies (긴급/안전)',
      korean: '약국이 어디예요?',
      romanized: 'Yakgugi eodiyeyo?',
      english: 'Where is the pharmacy?',
      japanese: '薬局はどこですか？',
      spanish: '¿Dónde está la farmacia?',
      tip: 'Korean pharmacies (약국) are marked with a green cross.',
      tipJa: '韓国の薬局（약국）は緑色の十字マークが目印です。',
      tipEs: 'Las farmacias coreanas (약국) están marcadas con una cruz verde.'
    }
  ];

  const categories = ['All', 'Greetings (인사)', 'Dining (식사)', 'Shopping (쇼핑)', 'Directions (교통/길찾기)', 'Emergencies (긴급/안전)'];

  const getPhraseMeaning = (p: Phrase) => {
    if (language === 'JA') return p.japanese;
    if (language === 'ES') return p.spanish;
    return p.english;
  };

  const getPhraseTip = (p: Phrase) => {
    if (language === 'JA') return p.tipJa;
    if (language === 'ES') return p.tipEs;
    return p.tip;
  };

  const filteredPhrases = phrases.filter((p) => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const meaning = getPhraseMeaning(p).toLowerCase();
    const matchesSearch = p.korean.includes(searchQuery) ||
      meaning.includes(searchQuery.toLowerCase()) ||
      p.romanized.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSpeakText = (text: string) => {
    speakKoreanText(text);
  };

  const toggleSavePhrase = (id: number) => {
    if (savedPhrases.includes(id)) {
      setSavedPhrases(savedPhrases.filter(item => item !== id));
    } else {
      setSavedPhrases([...savedPhrases, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-editorial-border rounded-sm p-6 space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-sm bg-editorial-accent-light/50 text-editorial-accent flex items-center justify-center font-bold">
            <span>🗣️</span>
          </div>
          <h2 className="text-xl font-serif font-bold text-editorial-text">Daily Phrases (생활 필수 한국어 표현)</h2>
        </div>
        <p className="text-xs text-editorial-muted leading-relaxed">
          Master the most frequently used Korean phrases for everyday situations. Tap the speaker icon to listen to native pronunciation and save your favorites.
        </p>

        {/* Search Input */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-editorial-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Korean, English, or Romanization..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-editorial-bg border border-editorial-border rounded-sm focus:outline-none focus:border-editorial-accent text-editorial-text"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-editorial-text text-white shadow-sm'
                  : 'bg-white border border-editorial-border text-editorial-text hover:bg-editorial-accent-light/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Phrases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPhrases.map((phrase) => {
          const isSaved = savedPhrases.includes(phrase.id);
          return (
            <div
              key={phrase.id}
              className="bg-white border border-editorial-border rounded-sm p-5 flex flex-col justify-between space-y-3 hover:shadow-sm transition-all"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-editorial-accent bg-editorial-accent-light/40 px-2 py-0.5 rounded-sm">
                    {phrase.category}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => toggleSavePhrase(phrase.id)}
                      className={`p-1.5 rounded-sm border transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-amber-400/20 border-amber-400 text-amber-600'
                          : 'bg-white border-editorial-border text-editorial-muted hover:text-editorial-text'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save phrase'}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleSpeakText(phrase.korean)}
                      className="p-1.5 rounded-sm bg-editorial-accent-light/50 hover:bg-editorial-accent hover:text-white text-editorial-accent border border-editorial-border transition-colors cursor-pointer"
                      title="Speak pronunciation"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-serif font-bold text-editorial-text">{phrase.korean}</h3>
                <p className="text-xs text-editorial-accent font-semibold">{phrase.romanized}</p>
                <p className="text-sm font-bold text-editorial-text">{phrase.english}</p>
              </div>

              <div className="bg-editorial-bg/70 border border-editorial-border/60 p-2.5 rounded-sm text-xs text-editorial-muted">
                <span className="font-bold text-editorial-text uppercase text-[10px] block mb-0.5">Tip</span>
                <span>{phrase.tip}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
