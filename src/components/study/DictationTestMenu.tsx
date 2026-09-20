import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, RotateCcw, CheckCircle2, AlertCircle, 
  HelpCircle, Award, Sparkles, Send, Mic, MicOff, 
  ChevronRight, ArrowRight, Play, Check, X,
  FileEdit, Eye, EyeOff, Lightbulb, Trophy, Sliders, BookOpen
} from 'lucide-react';
import { speakKoreanText, initSpeechVoices } from '../../utils/tts';
import { 
  DICTATION_CATEGORIES, 
  DICTATION_QUESTIONS, 
  DictationQuestion, 
  DictationCategoryMeta 
} from '../../data/dictationData';

interface DictationTestMenuProps {
  onAddXp?: (xp: number) => void;
  onOpenCreditModal?: () => void;
}

type InputMode = 'keyboard' | 'wordbank';

// Helper to normalize strings for comparison (ignoring trailing punctuation and extra whitespace)
function cleanStringForCheck(str: string): string {
  return str.trim().replace(/[.,?!]/g, '').replace(/\s+/g, ' ');
}

// Calculate character-level diff / similarity
function calculateDiff(userText: string, targetText: string) {
  const cleanUser = cleanStringForCheck(userText);
  const cleanTarget = cleanStringForCheck(targetText);
  const isExact = cleanUser === cleanTarget;
  
  // Calculate approximate accuracy
  let matchCount = 0;
  const maxLen = Math.max(cleanUser.length, cleanTarget.length);
  for (let i = 0; i < Math.min(cleanUser.length, cleanTarget.length); i++) {
    if (cleanUser[i] === cleanTarget[i]) matchCount++;
  }
  const accuracyPercent = maxLen > 0 ? Math.round((matchCount / maxLen) * 100) : 0;

  return {
    isExact,
    accuracyPercent,
    userText,
    targetText
  };
}

export default function DictationTestMenu({ onAddXp }: DictationTestMenuProps = {}) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'daily' | 'kculture' | 'kpop' | 'topik' | 'idiom'>('all');
  const [activeLevel, setActiveLevel] = useState<'all' | '초급' | '중급' | '고급'>('all');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [inputMode, setInputMode] = useState<InputMode>('keyboard');
  
  // Test evaluation states
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [accuracyScore, setAccuracyScore] = useState<number>(0);
  const [playCount, setPlayCount] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  
  // Hints
  const [showInitialHint, setShowInitialHint] = useState<boolean>(false);
  const [showEnglishHint, setShowEnglishHint] = useState<boolean>(false);
  const [showAnswerDirectly, setShowAnswerDirectly] = useState<boolean>(false);
  
  // History / Results tracking
  const [solvedCount, setSolvedCount] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [totalXpEarned, setTotalXpEarned] = useState<number>(0);

  // Speech Recognition for optional voice dictation
  const [isListening, setIsListening] = useState<boolean>(false);
  const [micSupported, setMicSupported] = useState<boolean>(true);
  const recognitionRef = useRef<any>(null);

  // Filter questions list
  const filteredQuestions: DictationQuestion[] = DICTATION_QUESTIONS.filter(q => {
    const matchCat = activeCategory === 'all' || q.category === activeCategory;
    const matchLevel = activeLevel === 'all' || q.level.includes(activeLevel);
    return matchCat && matchLevel;
  });

  const currentQuestion: DictationQuestion = filteredQuestions[currentIdx] || filteredQuestions[0] || DICTATION_QUESTIONS[0];

  useEffect(() => {
    initSpeechVoices();
  }, []);

  // Voice recognition init
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ko-KR';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setUserInput(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch {
      setMicSupported(false);
    }
  }, []);

  // Reset states when changing question
  useEffect(() => {
    resetQuestionState();
    // Auto-play question audio once when new question loads
    const timer = setTimeout(() => {
      handlePlayAudio(1.0);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentIdx, activeCategory, activeLevel]);

  const resetQuestionState = () => {
    setUserInput('');
    setSelectedWords([]);
    setIsSubmitted(false);
    setIsCorrect(false);
    setAccuracyScore(0);
    setShowInitialHint(false);
    setShowEnglishHint(false);
    setShowAnswerDirectly(false);
    setPlayCount(0);
  };

  const handlePlayAudio = (rate: number = playbackSpeed) => {
    if (!currentQuestion) return;
    setPlayCount(prev => prev + 1);
    speakKoreanText(currentQuestion.audioPromptKo, {
      role: 'ai',
      rate: rate,
      forceImmediate: true
    });
  };

  const handleToggleMic = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setUserInput('');
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  const handleSelectWordBlock = (word: string) => {
    if (isSubmitted) return;
    const updated = [...selectedWords, word];
    setSelectedWords(updated);
    setUserInput(updated.join(' '));
  };

  const handleRemoveWordBlock = (index: number) => {
    if (isSubmitted) return;
    const updated = selectedWords.filter((_, i) => i !== index);
    setSelectedWords(updated);
    setUserInput(updated.join(' '));
  };

  const handleCheckAnswer = () => {
    if (!userInput.trim() || isSubmitted) return;
    
    const diff = calculateDiff(userInput, currentQuestion.audioPromptKo);
    setIsSubmitted(true);
    setIsCorrect(diff.isExact);
    setAccuracyScore(diff.accuracyPercent);

    setSolvedCount(prev => prev + 1);
    if (diff.isExact) {
      setCorrectCount(prev => prev + 1);
      const earnedXp = showInitialHint ? 15 : 25;
      setTotalXpEarned(prev => prev + earnedXp);
      if (onAddXp) onAddXp(earnedXp);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < filteredQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setCurrentIdx(0); // Loop back or finish
    }
  };

  const handlePrevQuestion = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-[#1A1A1A] text-white rounded-xl p-5 sm:p-6 border border-neutral-800 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center space-x-1">
                <FileEdit className="w-3.5 h-3.5 text-amber-400" />
                <span>Korean Dictation Test (한국어 실전 받아쓰기)</span>
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Spelling & Sound Linking Rules
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              Train Your Ears & Spelling with Native Audio Dictation
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Listen carefully to native Korean audio and practice accurate spelling, spacing, and sound assimilation rules.
            </p>
          </div>

          {/* Test Performance Metrics Box */}
          <div className="bg-neutral-900 border border-neutral-700/80 rounded-lg p-3 sm:p-4 flex items-center justify-around gap-4 shrink-0 shadow-xs">
            <div className="text-center">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Question</span>
              <span className="text-base sm:text-lg font-bold font-mono text-white">
                {currentIdx + 1} <span className="text-xs text-neutral-400">/ {filteredQuestions.length}</span>
              </span>
            </div>
            <div className="w-[1px] h-8 bg-neutral-800" />
            <div className="text-center">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Accuracy</span>
              <span className="text-base sm:text-lg font-bold font-mono text-amber-300">
                {solvedCount > 0 ? Math.round((correctCount / solvedCount) * 100) : 100}%
              </span>
            </div>
            <div className="w-[1px] h-8 bg-neutral-800" />
            <div className="text-center">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">XP Earned</span>
              <span className="text-base sm:text-lg font-bold font-mono text-emerald-400 flex items-center justify-center space-x-0.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400 mr-1" />
                +{totalXpEarned}
              </span>
            </div>
          </div>
        </div>

        {/* Category & Level Filter Selectors */}
        <div className="pt-3 border-t border-neutral-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5">
            {DICTATION_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setCurrentIdx(0);
                }}
                className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-amber-400 text-black shadow-xs font-bold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.titleEn}</span>
              </button>
            ))}
          </div>

          {/* Level Filter */}
          <div className="flex items-center space-x-1.5 self-start md:self-auto bg-neutral-900 p-1 rounded-md border border-neutral-800 text-xs">
            {(['all', '초급', '중급', '고급'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => {
                  setActiveLevel(lvl);
                  setCurrentIdx(0);
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                  activeLevel === lvl
                    ? 'bg-neutral-700 text-white'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {lvl === 'all' ? 'All Levels' : lvl === '초급' ? 'Beginner' : lvl === '중급' ? 'Intermediate' : 'Advanced'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Dictation Audio & Input Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Audio Player & Input Board (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border-2 border-neutral-200 rounded-xl p-5 sm:p-6 shadow-md space-y-5">
            
            {/* Top Metadata Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-3.5">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-950 font-mono font-bold text-xs border border-amber-300">
                  Question #{currentIdx + 1}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-neutral-100 text-neutral-700 border border-neutral-300">
                  {currentQuestion.level}
                </span>
              </div>

              {/* Playback speed controls */}
              <div className="flex items-center space-x-1.5 text-xs font-bold text-neutral-600">
                <Sliders className="w-3.5 h-3.5 text-amber-700" />
                <span>재생 속도:</span>
                {[0.8, 1.0, 1.2].map(speed => (
                  <button
                    key={speed}
                    onClick={() => {
                      setPlaybackSpeed(speed);
                      handlePlayAudio(speed);
                    }}
                    className={`px-2 py-0.5 rounded text-[11px] cursor-pointer font-mono font-bold ${
                      playbackSpeed === speed
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            {/* Central Audio Playback Stage */}
            <div className="bg-gradient-to-b from-amber-50/60 to-white border-2 border-amber-200/80 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center space-y-4 text-center">
              <p className="text-xs sm:text-sm font-bold text-amber-900 uppercase tracking-widest font-mono">
                🎧 음성을 듣고 정확하게 받아쓰세요
              </p>

              {/* Big Play Button */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handlePlayAudio(1.0)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500 hover:bg-amber-400 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer group ring-4 ring-amber-200"
                  title="표준 속도로 다시 듣기 (1.0x)"
                >
                  <Volume2 className="w-8 h-8 sm:w-10 sm:h-10 fill-white" />
                </button>
                <button
                  onClick={() => handlePlayAudio(0.8)}
                  className="px-3 py-2 bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold shadow-xs cursor-pointer flex items-center space-x-1"
                  title="느리게 또박또박 듣기 (0.8x)"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
                  <span>느리게 (0.8x)</span>
                </button>
              </div>

              <div className="flex items-center space-x-2 text-xs text-neutral-500 font-mono">
                <span>듣기 횟수: <strong>{playCount}회</strong></span>
                <span>•</span>
                <span>음성 안내: 한국어 표준 발음</span>
              </div>

              {/* Optional Hints Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => setShowInitialHint(!showInitialHint)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1 ${
                    showInitialHint 
                      ? 'bg-amber-200 text-amber-950 border border-amber-400' 
                      : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>초성 힌트 {showInitialHint ? '숨기기' : '보기'}</span>
                </button>

                <button
                  onClick={() => setShowEnglishHint(!showEnglishHint)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1 ${
                    showEnglishHint 
                      ? 'bg-sky-200 text-sky-950 border border-sky-400' 
                      : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 text-sky-600" />
                  <span>영어 의미 힌트 {showEnglishHint ? '숨기기' : '보기'}</span>
                </button>
              </div>

              {/* Revealed Hints Box */}
              {(showInitialHint || showEnglishHint) && (
                <div className="w-full bg-white/90 border border-amber-200 rounded-xl p-3.5 text-left space-y-2 animate-in fade-in duration-200 text-xs shadow-2xs">
                  {showInitialHint && (
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-amber-900 shrink-0 font-mono">🔤 초성 힌트:</span>
                      <span className="font-bold text-amber-800 font-mono tracking-widest text-sm bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {currentQuestion.initialConsonantHint}
                      </span>
                    </div>
                  )}
                  {showEnglishHint && (
                    <div className="flex items-start space-x-2">
                      <span className="font-bold text-sky-900 shrink-0">🇬🇧 영어 의미:</span>
                      <span className="text-neutral-700 italic font-medium">
                        "{currentQuestion.englishTranslation}"
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input Method Toggle & Mode Switcher */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 flex items-center space-x-1.5">
                  <FileEdit className="w-4 h-4 text-amber-700" />
                  <span>받아쓰기 입력 방식 선택:</span>
                </span>
                
                <div className="flex items-center bg-neutral-100 p-0.5 rounded-lg border border-neutral-200 text-xs font-bold">
                  <button
                    onClick={() => setInputMode('keyboard')}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      inputMode === 'keyboard' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    직접 타이핑 (키보드/마이크)
                  </button>
                  <button
                    onClick={() => setInputMode('wordbank')}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      inputMode === 'wordbank' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    단어 블록 조합 모드
                  </button>
                </div>
              </div>

              {/* Mode 1: Keyboard / Microphone Input */}
              {inputMode === 'keyboard' && (
                <div className="space-y-3">
                  <div className="relative">
                    <textarea
                      rows={3}
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      disabled={isSubmitted}
                      placeholder="들은 한국어 문장을 정확하게 띄어쓰기 및 맞춤법에 맞추어 작성하세요..."
                      className={`w-full p-4 text-base font-serif font-bold rounded-xl border-2 transition-all focus:outline-none ${
                        isSubmitted
                          ? isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                            : 'bg-rose-50 border-rose-400 text-rose-950'
                          : 'bg-neutral-50 border-neutral-300 focus:border-amber-500 focus:bg-white text-neutral-900'
                      }`}
                    />

                    {/* Mic dictation button inside input box */}
                    {micSupported && !isSubmitted && (
                      <button
                        onClick={handleToggleMic}
                        className={`absolute right-3 bottom-3 p-2 rounded-full border transition-all cursor-pointer ${
                          isListening
                            ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                            : 'bg-white text-neutral-600 hover:text-neutral-900 border-neutral-300 shadow-2xs'
                        }`}
                        title="한국어로 말해서 입력하기"
                      >
                        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Mode 2: Word Bank Block Puzzle Mode */}
              {inputMode === 'wordbank' && (
                <div className="space-y-3">
                  {/* Selected Words Canvas */}
                  <div className="min-h-[70px] p-3.5 bg-neutral-50 border-2 border-neutral-300 rounded-xl flex flex-wrap items-center gap-2">
                    {selectedWords.length === 0 ? (
                      <span className="text-xs text-neutral-400 italic">
                        아래 단어 블록을 클릭하여 올바른 어순으로 문장을 완성하세요.
                      </span>
                    ) : (
                      selectedWords.map((word, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRemoveWordBlock(idx)}
                          disabled={isSubmitted}
                          className="px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-sm font-serif font-bold hover:bg-rose-700 transition-colors flex items-center space-x-1 cursor-pointer shadow-xs"
                        >
                          <span>{word}</span>
                          {!isSubmitted && <X className="w-3.5 h-3.5 text-neutral-400" />}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Available Word Pool */}
                  <div className="p-3 bg-neutral-100/70 border border-neutral-200 rounded-xl space-y-2">
                    <p className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider">
                      사용 가능한 단어 목록 (클릭하여 추가):
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentQuestion.wordBank.map((word, idx) => {
                        const countInSelected = selectedWords.filter(w => w === word).length;
                        const isUsed = countInSelected > 0;

                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectWordBlock(word)}
                            disabled={isSubmitted || isUsed}
                            className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold border transition-all cursor-pointer ${
                              isUsed
                                ? 'bg-neutral-200 text-neutral-400 border-neutral-300 opacity-50 cursor-not-allowed'
                                : 'bg-white hover:bg-amber-50 hover:border-amber-400 text-neutral-900 border-neutral-300 shadow-2xs'
                            }`}
                          >
                            + {word}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons: Submit / Reset / Next */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={resetQuestionState}
                    className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 cursor-pointer border border-neutral-300"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>다시 쓰기</span>
                  </button>

                  <button
                    onClick={() => setShowAnswerDirectly(!showAnswerDirectly)}
                    className="px-3 py-2 text-xs font-bold text-neutral-500 hover:text-neutral-800 cursor-pointer"
                  >
                    {showAnswerDirectly ? '정답 가리기' : '정답 먼저 확인'}
                  </button>
                </div>

                {!isSubmitted ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={!userInput.trim()}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4 font-bold" />
                    <span>채점하기 (Check Answer)</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleNextQuestion}
                      className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
                    >
                      <span>다음 문제 풀기</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Evaluation & Detailed Feedback Result */}
            {(isSubmitted || showAnswerDirectly) && (
              <div className={`p-5 rounded-2xl border-2 space-y-4 animate-in fade-in duration-200 ${
                isCorrect 
                  ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950' 
                  : 'bg-amber-50/90 border-amber-400 text-neutral-950'
              }`}>
                {/* Result Title */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {isCorrect ? (
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-base font-serif font-bold">
                        {isCorrect ? '완벽한 정답입니다! 🎉' : '아쉬워요! 아래 맞춤법 해설을 확인해 보세요.'}
                      </h4>
                      <p className="text-xs text-neutral-600">
                        문장 정확도: <strong>{accuracyScore}%</strong>
                      </p>
                    </div>
                  </div>

                  {isCorrect && (
                    <span className="px-3 py-1 bg-emerald-600 text-white font-mono font-bold text-xs rounded-full">
                      +{showInitialHint ? 15 : 25} XP 획득!
                    </span>
                  )}
                </div>

                {/* Target vs User text comparison */}
                <div className="bg-white p-4 rounded-xl border border-neutral-300 space-y-2.5 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase font-mono block">
                      정답 한국어 원문:
                    </span>
                    <p className="text-base sm:text-lg font-serif font-bold text-neutral-900 pt-0.5">
                      "{currentQuestion.audioPromptKo}"
                    </p>
                    <p className="text-xs font-mono text-neutral-500 pt-1">
                      🗣️ 발음: {currentQuestion.romanized}
                    </p>
                    <p className="text-xs text-neutral-600">
                      🇬🇧 의미: {currentQuestion.englishTranslation}
                    </p>
                  </div>

                  {!isCorrect && userInput.trim() && (
                    <div className="pt-2 border-t border-neutral-200">
                      <span className="text-[10px] font-bold text-rose-800 uppercase font-mono block">
                        내가 입력한 내용:
                      </span>
                      <p className="text-sm font-serif font-medium text-rose-900 pt-0.5">
                        "{userInput}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Grammar & Spelling Focus Point */}
                <div className="bg-white/80 p-3.5 rounded-xl border border-amber-300/80 space-y-1.5 text-xs">
                  <div className="flex items-center space-x-1.5 font-bold text-amber-900">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>핵심 맞춤법 및 연음 법칙 해설:</span>
                  </div>
                  <p className="text-neutral-800 leading-relaxed pl-5">
                    {currentQuestion.grammarTipKo}
                  </p>
                  <p className="text-amber-900 font-semibold pl-5 pt-1">
                    🔍 <strong>체크 포인트:</strong> {currentQuestion.spellingCheckFocus}
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Question List & Study Guides (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Question Navigator Grid */}
          <div className="bg-white border-2 border-neutral-200 rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5">
              <span className="text-xs font-bold text-neutral-900 flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>문제 목록 ({filteredQuestions.length}문항)</span>
              </span>
              <span className="text-[10px] text-neutral-500 font-mono">
                {currentIdx + 1} / {filteredQuestions.length}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-1">
              {filteredQuestions.map((q, idx) => {
                const isSelected = idx === currentIdx;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-amber-400 text-neutral-950 border-amber-500 shadow-xs'
                        : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                    }`}
                  >
                    #{idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dictation Strategy & Korean Phonology Guide */}
          <div className="bg-white border-2 border-neutral-200 rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center space-x-1.5 border-b border-neutral-200 pb-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold text-neutral-900">한국어 받아쓰기 3대 핵심 비결</span>
            </div>

            <div className="space-y-2.5 text-xs text-neutral-700 leading-relaxed">
              <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
                <strong className="text-neutral-900 block font-serif">1. 연음 법칙 (Liaison) 구별</strong>
                <p className="text-neutral-600">
                  받침 뒤에 모음이 오면 받침이 다음 글자의 첫소리로 넘어가 소리 납니다. (예: <strong>[무대 위에]</strong> → 표기는 <strong>"무대 위에"</strong>)
                </p>
              </div>

              <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
                <strong className="text-neutral-900 block font-serif">2. 자음동화 & 비음화</strong>
                <p className="text-neutral-600">
                  '좋네요'는 [존네요], '빛나는'은 [빈나는]으로 발음되지만 본래 형태소 받침(ㅎ, ㅊ)을 밝혀 적어야 합니다.
                </p>
              </div>

              <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
                <strong className="text-neutral-900 block font-serif">3. 띄어쓰기 & 단위명사</strong>
                <p className="text-neutral-600">
                  '한 잔', '4번 출구'처럼 수량을 나타내는 단위명사 및 조사는 앞말과의 결합 규칙을 지킵니다.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
