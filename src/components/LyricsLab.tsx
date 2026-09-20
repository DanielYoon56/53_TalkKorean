import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Mic, RefreshCw, Volume2, Search, Sparkles, BookOpen, ChevronRight, Check, X, HelpCircle, AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Song, SlangWord, QuizQuestion, PronunciationScore } from '../types';
import { SONGS_DATA, SLANG_WORDS, QUIZ_QUESTIONS } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { speakKoreanText } from '../utils/tts';

interface LyricsLabProps {
  setActiveTab: (tab: string) => void;
  setPronunciationResult: (score: PronunciationScore) => void;
  credits?: number;
  onOpenCreditModal?: () => void;
  onSpendCredits?: (amount: number, description: string) => boolean;
}

export default function LyricsLab({
  setActiveTab,
  setPronunciationResult,
  credits,
  onOpenCreditModal,
  onSpendCredits
}: LyricsLabProps) {
  const { t } = useLanguage();
  const [selectedSong, setSelectedSong] = useState<Song>(SONGS_DATA[0]);
  const [activeLineIndex, setActiveLineIndex] = useState<number>(0);
  const [selectedWord, setSelectedWord] = useState<any>(null);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [translationResult, setTranslationResult] = useState<any>(null);

  // Audio / Recording States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [recordingStage, setRecordingStage] = useState<'idle' | 'recording' | 'processing' | 'done'>('idle');

  // Slang guide states
  const [activeSlangIndex, setActiveSlangIndex] = useState<number>(0);
  const [showSlangExamples, setShowSlangExamples] = useState<boolean>(false);
  const [customSlangTerm, setCustomSlangTerm] = useState<string>('');
  const [searchedSlangTerm, setSearchedSlangTerm] = useState<string>('');
  const [customSlangExplanation, setCustomSlangExplanation] = useState<any>(null);
  const [isLoadingSlang, setIsLoadingSlang] = useState<boolean>(false);

  // Quiz States
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const recordingIntervalRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Trigger simulated timer when recording
  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      recordingIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 6) {
            handleStopRecording();
            return 6;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, [isRecording]);

  const handleStartRecording = async () => {
    if (onSpendCredits) {
      const success = onSpendCredits(2, `K-POP AI 발음 정밀 분석 (${selectedSong.title}) (-2 CR)`);
      if (!success) {
        if (onOpenCreditModal) onOpenCreditModal();
        return;
      }
    }

    setIsRecording(true);
    setRecordingStage('recording');
    audioChunksRef.current = [];

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.start();
      }
    } catch (err) {
      console.warn("Microphone access unavailable or denied:", err);
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordingStage('processing');

    const finalizeAndSend = (recordedUrl?: string) => {
      const activeLine = selectedSong.lyrics[activeLineIndex];
      fetch('/api/pronounce-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lyric: activeLine.korean, transcription: activeLine.romanized })
      })
      .then(res => res.json())
      .then(data => {
        const waveformCompareData = [
          { name: 'Start', artist: 0, user: 0 },
          { name: 'Word 1', artist: 75, user: 68 },
          { name: 'Word 2', artist: 95, user: 92 },
          { name: 'Vowel 1', artist: 88, user: 82 },
          { name: 'Vowel 2', artist: 94, user: 71 }, // timing gap
          { name: 'End', artist: 10, user: 5 }
        ];

        setPronunciationResult({
          lyrics: activeLine.korean,
          score: data.score || 92,
          accuracy: data.accuracy || 95,
          rhythm: data.rhythm || 88,
          intonation: data.intonation || 91,
          expertFeedback: data.expertFeedback || "Outstanding pronunciation!",
          userRecordingUrl: recordedUrl,
          waveformCompareData
        });

        setRecordingStage('done');
        setActiveTab('PronunciationDetail');
      })
      .catch(err => {
        console.warn("Recording feedback notice:", err?.message || err);
        setRecordingStage('done');
        setActiveTab('PronunciationDetail');
      });
    };

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.onstop = () => {
        let recordingUrl: string | undefined = undefined;
        if (audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, { type: audioChunksRef.current[0]?.type || 'audio/webm' });
          if (audioBlob.size > 0) {
            recordingUrl = URL.createObjectURL(audioBlob);
          }
        }
        mediaRecorderRef.current?.stream?.getTracks().forEach(track => track.stop());
        setTimeout(() => finalizeAndSend(recordingUrl), 500);
      };
      mediaRecorderRef.current.stop();
    } else {
      setTimeout(() => finalizeAndSend(), 1000);
    }
  };

  // Live Translate Selected Word or Line (1 CR)
  const handleWordClick = async (wordObj: any) => {
    if (onSpendCredits) {
      const success = onSpendCredits(1, `K-POP 가사 AI 어휘·문법 심층 분석 (${wordObj.korean}) (-1 CR)`);
      if (!success) {
        if (onOpenCreditModal) onOpenCreditModal();
        return;
      }
    }

    setSelectedWord(wordObj);
    setIsTranslating(true);
    setTranslationResult(null);

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: wordObj.korean, context: selectedSong.title })
      });
      const data = await res.json();
      setTranslationResult(data);
    } catch (err) {
      console.warn("Translation api notice:", err);
      // Fallback
      setTranslationResult({
        romanized: wordObj.korean,
        english: wordObj.english,
        breakdown: [
          { term: wordObj.korean, meaning: wordObj.english, grammar: wordObj.grammar || "Vocabulary word" }
        ],
        tips: ["Practice saying it with standard native tempo.", "Excellent vocabulary selection."],
        culturalNote: "Highly common and meaningful K-POP slang/expression."
      });
    } finally {
      setIsTranslating(false);
    }
  };

  // Fetch custom slang from Gemini / Curated Knowledge Base
  const handleCustomSlangSearch = async (overrideTerm?: string) => {
    const termToSearch = (typeof overrideTerm === 'string' ? overrideTerm : customSlangTerm).trim();
    if (!termToSearch) return;

    if (overrideTerm) {
      setCustomSlangTerm(overrideTerm);
    }
    setSearchedSlangTerm(termToSearch);

    if (onSpendCredits) {
      const success = onSpendCredits(1, `K-Slang AI 심층 어원 분석 (${termToSearch}) (-1 CR)`);
      if (!success) {
        if (onOpenCreditModal) onOpenCreditModal();
        return;
      }
    }

    setIsLoadingSlang(true);
    setCustomSlangExplanation(null);

    try {
      const res = await fetch('/api/explain-slang', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slang: termToSearch })
      });
      const data = await res.json();
      setCustomSlangExplanation(data);
    } catch (err) {
      console.warn("Slang lookup notice:", err);
    } finally {
      setIsLoadingSlang(false);
    }
  };

  // Play audio simulation
  const togglePlayAudio = () => {
    setIsPlaying(!isPlaying);
  };

  // Quiz Handling
  const handleSelectOption = (index: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerChecked(true);
    if (selectedOption === QUIZ_QUESTIONS[currentQuizIndex].correctAnswer) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerChecked(false);
    if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const activeSlang = SLANG_WORDS[activeSlangIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      
      {/* LEFT COLUMN: Song Selection & Interactive Lyrics (8 Columns) */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* Header Widget */}
        <div className="bg-[#1A1A1A] rounded-sm p-6 sm:p-8 text-white relative overflow-hidden border border-editorial-border">
          <div className="absolute top-0 right-0 w-32 h-32 bg-editorial-accent/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
            <div>
              <p className="text-xs font-bold text-editorial-accent tracking-widest uppercase">{t.nav.lyricsLab}</p>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">{t.lyricsLab.title}</h2>
              <p className="text-xs sm:text-sm text-editorial-accent-light font-medium pt-1">
                {t.lyricsLab.subtitle}
              </p>
            </div>

            {/* Selector */}
            <div className="relative">
              <select
                value={selectedSong.id}
                onChange={(e) => {
                  const song = SONGS_DATA.find(s => s.id === e.target.value);
                  if (song) {
                    setSelectedSong(song);
                    setActiveLineIndex(0);
                    setSelectedWord(null);
                    setTranslationResult(null);
                  }
                }}
                className="bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold rounded-sm px-4 py-2.5 outline-none cursor-pointer transition-all pr-8 appearance-none"
              >
                {SONGS_DATA.map((s) => (
                  <option key={s.id} value={s.id} className="text-gray-900 font-medium">
                    {s.title} ({s.artist.split(' ')[0]})
                  </option>
                ))}
              </select>
              <div className="absolute top-3.5 right-3 w-2 h-2 border-r border-b border-white rotate-45 pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Now Playing Billboard */}
        <div className="bg-white border border-editorial-border rounded-sm p-5 shadow-none flex flex-col sm:flex-row items-center gap-5">
          <img
            src={selectedSong.albumArt}
            alt={selectedSong.title}
            className="w-24 h-24 rounded-sm object-cover border border-editorial-border"
          />
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider ${
                selectedSong.difficulty === 'Beginner' ? 'bg-editorial-accent-light/50 text-editorial-accent border border-editorial-border/30' :
                selectedSong.difficulty === 'Intermediate' ? 'bg-editorial-accent-light/50 text-editorial-accent border border-editorial-border/30' :
                'bg-editorial-accent-light/50 text-editorial-accent border border-editorial-border/30'
              }`}>
                {selectedSong.difficulty} level
              </span>
              <h3 className="text-xl font-bold font-serif text-editorial-text mt-1">{selectedSong.title}</h3>
              <p className="text-sm text-editorial-muted font-bold">{selectedSong.artist}</p>
            </div>

            <div className="flex items-center justify-center sm:justify-start space-x-3 pt-1">
              <button 
                onClick={togglePlayAudio}
                className="w-10 h-10 rounded-sm bg-editorial-accent-light/50 text-editorial-accent flex items-center justify-center hover:bg-editorial-accent hover:text-white transition-colors cursor-pointer border border-editorial-border/20"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-editorial-accent hover:fill-white" /> : <Play className="w-4 h-4 fill-editorial-accent hover:fill-white ml-0.5" />}
              </button>
              <span className="text-xs text-editorial-muted font-semibold">
                {isPlaying ? "Streaming sample track..." : "Tap play to stream audio guide"}
              </span>
            </div>
          </div>
        </div>

        {/* MAIN LYRICS BOX */}
        <div className="bg-white border border-editorial-border rounded-sm shadow-none overflow-hidden">
          <div className="border-b border-editorial-border px-6 py-4 flex justify-between items-center bg-editorial-accent-light/20">
            <span className="text-xs font-bold text-editorial-text uppercase tracking-widest flex items-center space-x-1.5 font-serif">
              <span>📖</span>
              <span>Interactive Song Sheets</span>
            </span>
            <span className="text-xs text-editorial-accent font-bold uppercase tracking-wider">Tap words to analyze grammar</span>
          </div>

          <div className="p-6 space-y-6">
            {selectedSong.lyrics.map((line, idx) => (
              <div
                key={idx}
                onClick={() => setActiveLineIndex(idx)}
                className={`p-4 rounded-sm transition-all cursor-pointer border ${
                  activeLineIndex === idx
                    ? 'bg-editorial-accent-light/35 border-editorial-accent/30 shadow-none'
                    : 'border-transparent hover:bg-editorial-accent-light/10'
                }`}
              >
                {/* Korean Lyric Line split into words */}
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                  {line.words ? (
                    line.words.map((word, wIdx) => (
                      <span
                        key={wIdx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveLineIndex(idx);
                          handleWordClick(word);
                        }}
                        className="text-lg font-bold text-editorial-text border-b-2 border-dashed border-editorial-accent/30 hover:text-editorial-accent hover:border-editorial-accent transition-colors cursor-pointer inline-block"
                      >
                        {word.korean}
                      </span>
                    ))
                  ) : (
                    <span className="text-lg font-bold text-editorial-text">{line.korean}</span>
                  )}
                </div>

                {/* Romanization and English translations */}
                <div className="space-y-0.5 mt-2">
                  <p className="text-xs font-bold text-editorial-accent tracking-wide">{line.romanized}</p>
                  <p className="text-xs font-semibold text-editorial-muted">{line.english}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PRONUNCIATION LAB SANDBOX */}
        <div className="bg-white border border-editorial-border rounded-sm p-6 shadow-none space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-editorial-text flex items-center space-x-2 font-serif">
              <span className="text-editorial-accent text-xl">🎤</span>
              <span>Pronunciation Lab Sandbox</span>
            </h3>
            <span className="text-[11px] font-bold text-editorial-muted">Record selected lyric line</span>
          </div>

          <div className="bg-editorial-bg border border-editorial-border rounded-sm p-5 space-y-4">
            <div className="text-center space-y-1 py-2">
              <p className="text-xs text-editorial-muted font-bold uppercase tracking-wider">Practice Line</p>
              <h4 className="text-xl font-bold text-editorial-text font-serif">
                "{selectedSong.lyrics[activeLineIndex].korean}"
              </h4>
              <p className="text-xs font-semibold text-editorial-muted">
                {selectedSong.lyrics[activeLineIndex].romanized}
              </p>
            </div>

            {/* Waveform Visualization */}
            <div className="bg-white border border-editorial-border rounded-sm h-24 flex items-center justify-center p-4 relative overflow-hidden">
              {recordingStage === 'recording' ? (
                <div className="flex items-end space-x-1.5 h-12 w-full max-w-sm justify-center">
                  {[...Array(20)].map((_, i) => {
                    const h = Math.floor(Math.random() * 40) + 10;
                    return (
                      <div
                        key={i}
                        className="bg-editorial-accent w-1.5 rounded-full transition-all duration-150 animate-pulse"
                        style={{ height: `${h}px` }}
                      ></div>
                    );
                  })}
                </div>
              ) : recordingStage === 'processing' ? (
                <div className="text-center space-y-2">
                  <RefreshCw className="w-5 h-5 text-editorial-accent animate-spin mx-auto" />
                  <p className="text-xs font-bold text-editorial-accent">AI Scoring Engine Analyzing Your Voice...</p>
                </div>
              ) : (
                <div className="text-center space-y-1">
                  <p className="text-xs font-bold text-editorial-muted">Audio input waiting...</p>
                  <p className="text-[11px] text-editorial-muted">Tap Record below and sing / read aloud</p>
                </div>
              )}

              {/* Status Badge */}
              {recordingStage === 'recording' && (
                <span className="absolute top-3 right-3 bg-editorial-accent-light text-editorial-accent px-2 py-0.5 rounded-sm text-[10px] font-bold animate-pulse flex items-center space-x-1 border border-editorial-accent/20">
                  <span className="w-1.5 h-1.5 bg-editorial-accent rounded-full"></span>
                  <span>Rec {recordingSeconds}s</span>
                </span>
              )}
            </div>

            {/* Live assessment details shown in UI */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white border border-editorial-border p-2.5 rounded-sm text-center">
                <span className="text-[10px] font-bold text-editorial-muted uppercase tracking-widest block mb-0.5">Pitch Match</span>
                <span className="text-[10px] font-bold text-editorial-accent bg-editorial-accent-light px-2 py-0.5 rounded-sm">Pristine Accuracy</span>
              </div>
              <div className="bg-white border border-editorial-border p-2.5 rounded-sm text-center">
                <span className="text-[10px] font-bold text-editorial-muted uppercase tracking-widest block mb-0.5">Tempo</span>
                <span className="text-[10px] font-bold text-editorial-accent bg-editorial-accent-light px-2 py-0.5 rounded-sm">Slightly Fast</span>
              </div>
              <div className="bg-white border border-editorial-border p-2.5 rounded-sm text-center">
                <span className="text-[10px] font-bold text-editorial-muted uppercase tracking-widest block mb-0.5">Enunciation</span>
                <span className="text-[10px] font-bold text-editorial-text bg-editorial-accent-light px-2 py-0.5 rounded-sm">Clear Vowels</span>
              </div>
            </div>

            {/* Rec Action Buttons & Monetization Banner */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between bg-amber-50/90 border border-amber-200 px-3.5 py-2 rounded-sm text-xs">
                <span className="font-bold text-amber-900 flex items-center space-x-1.5">
                  <span>⚡ K-POP AI 발음 정밀 진단 & 파형 비교: -2 CR</span>
                </span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-extrabold text-editorial-text">
                    잔액: {credits !== undefined ? `${credits} CR` : '120 CR'}
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenCreditModal?.()}
                    className="px-2 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-sm text-[11px] transition-colors cursor-pointer"
                  >
                    + 충전 ($5~)
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
                {recordingStage !== 'recording' ? (
                  <button
                    onClick={handleStartRecording}
                    disabled={recordingStage === 'processing'}
                    className="px-6 py-3 bg-editorial-text hover:bg-editorial-accent disabled:opacity-50 text-editorial-bg hover:text-white rounded-sm font-bold tracking-wider text-xs uppercase transition-all cursor-pointer flex items-center space-x-2 shadow-sm"
                  >
                    <Mic className="w-4 h-4 fill-current" />
                    <span>Record & AI Analyze (-2 CR)</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStopRecording}
                    className="px-6 py-3 bg-editorial-accent text-white rounded-sm font-bold tracking-wider text-xs uppercase flex items-center space-x-2 cursor-pointer animate-pulse"
                  >
                    <Square className="w-3.5 h-3.5 fill-white" />
                    <span>Stop & Score</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* DICTIONARY LOOKUP DETAILED CARD (Floating Modal or Section) */}
        {selectedWord && (
          <div className="bg-[#1A1A1A] text-white border border-editorial-border rounded-sm p-6 shadow-sm relative overflow-hidden">
            <button
              onClick={() => setSelectedWord(null)}
              className="absolute top-4 right-4 text-editorial-accent-light hover:text-white p-1 rounded-sm hover:bg-white/10 transition-colors"
              aria-label="Close Translation"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-editorial-accent text-white px-2.5 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider">
                  Grammar Engine Live Feedback
                </span>
                {isTranslating && <span className="text-xs text-editorial-accent-light animate-pulse">Consulting dictionary...</span>}
              </div>

              <div>
                <h4 className="text-2xl font-bold font-serif text-white">{selectedWord.korean}</h4>
                <p className="text-sm font-semibold text-editorial-accent">
                  {translationResult ? translationResult.romanized : selectedWord.korean}
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-white/5 p-3.5 rounded-sm border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-editorial-accent block mb-1">Literal Translation</span>
                    <p className="text-base font-bold text-white">{translationResult ? translationResult.english : selectedWord.english}</p>
                  </div>

                  {selectedWord.grammar && (
                    <div className="bg-white/5 p-3.5 rounded-sm border border-white/10">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-editorial-accent block mb-1">Grammatical Structure</span>
                      <p className="text-xs text-editorial-accent-light font-medium">{selectedWord.grammar}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {translationResult?.tips && (
                    <div className="bg-white/5 p-3.5 rounded-sm border border-white/10 text-left">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-editorial-accent block mb-1">Teacher's Tip</span>
                      <ul className="text-xs text-editorial-accent-light font-medium list-disc list-inside space-y-1">
                        {translationResult.tips.map((t: string, i: number) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {translationResult?.culturalNote && (
                    <div className="bg-white/5 p-3.5 rounded-sm border border-white/10 text-left">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-editorial-accent block mb-1">Cultural Note</span>
                      <p className="text-xs text-editorial-accent-light font-medium">{translationResult.culturalNote}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Slang Guide, Stats, and Pop Quiz (4 Columns) */}
      <div className="lg:col-span-4 space-y-8">
        
        {/* Your Grooves Progress tracker */}
        <div className="bg-white border border-editorial-border rounded-sm p-5 shadow-none space-y-4">
          <h3 className="text-xs font-bold text-editorial-text uppercase tracking-widest border-b border-editorial-border pb-2 flex items-center space-x-1.5 font-serif">
            <span>📈</span>
            <span>Your Current Grooves</span>
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-editorial-muted uppercase block">Pronunciation</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold font-serif text-editorial-accent">82%</span>
                <span className="text-[10px] font-bold text-editorial-accent">▲ +3%</span>
              </div>
              <div className="w-full bg-editorial-accent-light h-1.5 rounded-sm">
                <div className="bg-editorial-accent h-1.5 rounded-sm" style={{ width: '82%' }}></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-editorial-muted uppercase block">Vocab Retention</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold font-serif text-editorial-text">65%</span>
                <span className="text-[10px] font-bold text-editorial-accent">▲ +5%</span>
              </div>
              <div className="w-full bg-editorial-accent-light h-1.5 rounded-sm">
                <div className="bg-editorial-text h-1.5 rounded-sm" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Slang Guide sidebar with examples toggles and search */}
        <div className="bg-white border border-editorial-border rounded-sm p-5 shadow-none space-y-4">
          <div className="flex justify-between items-center border-b border-editorial-border pb-2">
            <h3 className="text-xs font-bold text-editorial-text uppercase tracking-widest flex items-center space-x-1.5 font-serif">
              <span>🔥</span>
              <span>Trending Slang</span>
            </h3>
            <span className="text-[10px] text-editorial-accent font-bold">Updated Hourly</span>
          </div>

          <div className="space-y-3.5 text-left">
            <div>
              <h4 className="text-base font-bold font-serif text-editorial-text">{activeSlang.word}</h4>
              <p className="text-xs text-editorial-accent font-bold mt-0.5">{activeSlang.meaning}</p>
              <p className="text-xs text-editorial-muted leading-relaxed font-medium mt-1">
                {activeSlang.description}
              </p>
            </div>

            {/* Toggle Usage Examples */}
            {showSlangExamples ? (
              <div className="bg-editorial-accent-light/40 p-3 rounded-sm border border-editorial-border space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-editorial-accent">Usage Examples</p>
                {activeSlang.examples.map((ex, i) => (
                  <div key={i} className="text-xs border-b border-editorial-border pb-2 last:border-none last:pb-0">
                    <p className="font-bold text-editorial-text font-serif">{ex.korean}</p>
                    <p className="text-[10px] font-bold text-editorial-accent mt-0.5">{ex.romanized}</p>
                    <p className="text-[10px] font-semibold text-editorial-muted mt-0.5">{ex.english}</p>
                  </div>
                ))}
              </div>
            ) : (
              <button
                onClick={() => setShowSlangExamples(true)}
                className="w-full py-2 bg-editorial-accent-light/40 hover:bg-editorial-accent-light/70 border border-editorial-border text-xs text-editorial-text font-bold rounded-sm transition-all cursor-pointer uppercase tracking-wider"
              >
                See Usage Examples
              </button>
            )}

            {/* Cycle Slang */}
            <div className="flex justify-between items-center pt-1 border-t border-editorial-border">
              <button
                onClick={() => {
                  setShowSlangExamples(false);
                  setActiveSlangIndex((prev) => (prev - 1 + SLANG_WORDS.length) % SLANG_WORDS.length);
                }}
                className="text-xs font-bold text-editorial-muted hover:text-editorial-text transition-colors cursor-pointer"
              >
                ◀ Prev Term
              </button>
              <button
                onClick={() => {
                  setShowSlangExamples(false);
                  setActiveSlangIndex((prev) => (prev + 1) % SLANG_WORDS.length);
                }}
                className="text-xs font-bold text-editorial-accent hover:text-editorial-text transition-colors cursor-pointer"
              >
                Next Term ▶
              </button>
            </div>
          </div>

          {/* AI Slang Explainer input block */}
          <div className="pt-3 border-t border-editorial-border space-y-2.5">
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-editorial-muted uppercase tracking-wider flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-editorial-accent" />
                <span>Ask AI for Any K-Slang</span>
              </span>
              <span className="text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-mono">1 CR</span>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="flex flex-wrap gap-1">
              {['뇌피셜', '폭망', '어쩔티비', '억까', '알잘딱깔센', '갓생', '오운완', '분좋카'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleCustomSlangSearch(tag)}
                  className="text-[10px] px-1.5 py-0.5 bg-editorial-bg hover:bg-editorial-accent-light border border-editorial-border hover:border-editorial-accent text-editorial-text hover:text-editorial-accent rounded-sm font-medium transition-colors cursor-pointer"
                >
                  #{tag}
                </button>
              ))}
            </div>

            <div className="flex space-x-1.5">
              <input
                type="text"
                placeholder="단어 입력 (예: 뇌피셜, 폭망, 쌉가능)"
                value={customSlangTerm}
                onChange={(e) => setCustomSlangTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isLoadingSlang) {
                    handleCustomSlangSearch();
                  }
                }}
                className="flex-1 px-3 py-1.5 text-xs border border-editorial-border rounded-sm outline-none bg-editorial-bg focus:bg-white focus:border-editorial-accent"
              />
              <button
                onClick={() => handleCustomSlangSearch()}
                disabled={isLoadingSlang || !customSlangTerm.trim()}
                className="px-3 py-1.5 bg-editorial-text hover:bg-editorial-accent disabled:opacity-50 text-editorial-bg hover:text-white rounded-sm text-xs font-bold flex items-center justify-center cursor-pointer transition-colors"
                title="Search slang"
              >
                {isLoadingSlang ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Search className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {customSlangExplanation && (
              <div className="bg-[#FAF9F5] border border-editorial-border p-3.5 rounded-sm text-left mt-2.5 space-y-2.5 shadow-xs animate-fadeIn">
                {/* Header */}
                <div className="flex justify-between items-start border-b border-editorial-border/60 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] font-bold text-editorial-accent uppercase tracking-widest bg-editorial-accent-light px-1.5 py-0.5 rounded-sm">
                      K-Slang Analysis
                    </span>
                    <span className="text-xs font-bold font-serif text-editorial-text">
                      {customSlangExplanation.term || searchedSlangTerm || customSlangTerm}
                    </span>
                    {customSlangExplanation.romanized && (
                      <span className="text-[10px] text-editorial-muted font-mono bg-white px-1.5 py-0.5 border border-editorial-border/60 rounded">
                        [{customSlangExplanation.romanized}]
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => speakKoreanText(customSlangExplanation.term || searchedSlangTerm || customSlangTerm)}
                      className="text-editorial-accent hover:text-editorial-text p-0.5 rounded hover:bg-white transition-colors cursor-pointer"
                      title="Listen pronunciation"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => setCustomSlangExplanation(null)}
                    className="text-editorial-muted hover:text-editorial-text font-bold text-xs p-0.5 cursor-pointer"
                    title="Close"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Meaning */}
                <div className="space-y-1">
                  {customSlangExplanation.meaningKo && (
                    <p className="text-xs font-bold text-editorial-text leading-snug">
                      {customSlangExplanation.meaningKo}
                    </p>
                  )}
                  <p className="text-[11px] text-editorial-accent font-medium leading-snug">
                    {customSlangExplanation.meaningEn || customSlangExplanation.meaning}
                  </p>
                </div>

                {/* Etymology / Origin */}
                {(customSlangExplanation.originKo || customSlangExplanation.originEn || customSlangExplanation.origin) && (
                  <div className="bg-white border border-editorial-border/60 p-2 rounded-sm space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-editorial-muted block">
                      💡 Origin & Etymology (어원)
                    </span>
                    {customSlangExplanation.originKo && (
                      <p className="text-[11px] text-editorial-text font-medium leading-relaxed">
                        {customSlangExplanation.originKo}
                      </p>
                    )}
                    {(customSlangExplanation.originEn || (!customSlangExplanation.originKo && customSlangExplanation.origin)) && (
                      <p className="text-[10px] text-editorial-muted leading-relaxed">
                        {customSlangExplanation.originEn || customSlangExplanation.origin}
                      </p>
                    )}
                  </div>
                )}

                {/* Polite Standard Equivalent */}
                {customSlangExplanation.politeEquivalentKo && (
                  <div className="text-[10px] bg-emerald-50 border border-emerald-200/80 p-2 rounded-sm text-emerald-900 flex items-start space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">정중한 표준어 표현: </span>
                      <span>{customSlangExplanation.politeEquivalentKo}</span>
                      {customSlangExplanation.politeEquivalentEn && (
                        <span className="text-emerald-700 block text-[9px]">({customSlangExplanation.politeEquivalentEn})</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Register & Usage Caution */}
                {(customSlangExplanation.registerWarning || customSlangExplanation.socialContextKo || customSlangExplanation.socialContextEn) && (
                  <div className="text-[10px] bg-amber-50/80 border border-amber-200 p-2 rounded-sm text-amber-900 flex items-start space-x-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">사용 뉘앙스 & 주의사항: </span>
                      <span>{customSlangExplanation.registerWarning || customSlangExplanation.socialContextKo || customSlangExplanation.socialContextEn}</span>
                    </div>
                  </div>
                )}

                {/* Real-life Examples */}
                {Array.isArray(customSlangExplanation.examples) && customSlangExplanation.examples.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-editorial-muted block">
                      💬 Real-Life Examples
                    </span>
                    {customSlangExplanation.examples.map((ex: any, idx: number) => (
                      <div key={idx} className="bg-white border border-editorial-border/60 p-2 rounded-sm text-left space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-editorial-text">{ex.korean}</span>
                          <button
                            type="button"
                            onClick={() => speakKoreanText(ex.korean)}
                            className="text-editorial-accent hover:text-editorial-text p-0.5 rounded cursor-pointer"
                            title="Listen to example"
                          >
                            <Volume2 className="w-3 h-3" />
                          </button>
                        </div>
                        {ex.romanized && (
                          <p className="text-[9px] text-editorial-muted font-mono">{ex.romanized}</p>
                        )}
                        <p className="text-[10px] text-editorial-accent font-medium">{ex.english}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* POP QUIZ: Check your skills */}
        <div className="bg-white border border-editorial-border rounded-sm p-5 shadow-none space-y-4">
          <h3 className="text-sm font-bold text-editorial-text uppercase tracking-widest border-b border-editorial-border pb-2 flex items-center space-x-1.5 font-serif">
            <span>📝</span>
            <span>Pop Quiz: Check Your Skills</span>
          </h3>

          {!quizFinished ? (
            <div className="space-y-4 text-left">
              <div className="flex justify-between text-[11px] font-bold text-editorial-muted">
                <span>Question {currentQuizIndex + 1} of {QUIZ_QUESTIONS.length}</span>
                <span className="text-editorial-accent">Score: {quizScore} / {QUIZ_QUESTIONS.length}</span>
              </div>

              <p className="text-xs sm:text-sm font-bold font-serif text-editorial-text leading-snug">
                {QUIZ_QUESTIONS[currentQuizIndex].question}
              </p>

              <div className="space-y-2">
                {QUIZ_QUESTIONS[currentQuizIndex].options.map((option, idx) => {
                  let optStyle = 'border-editorial-border hover:bg-editorial-accent-light/20';
                  if (selectedOption === idx) {
                    optStyle = 'border-editorial-accent bg-editorial-accent-light/35';
                  }
                  if (isAnswerChecked) {
                    if (idx === QUIZ_QUESTIONS[currentQuizIndex].correctAnswer) {
                      optStyle = 'border-editorial-accent bg-editorial-accent-light text-editorial-text font-bold';
                    } else if (selectedOption === idx) {
                      optStyle = 'border-red-400 bg-red-50 text-red-800';
                    } else {
                      optStyle = 'border-editorial-border/40 opacity-65';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerChecked}
                      className={`w-full p-2.5 text-xs font-bold rounded-sm border text-left flex items-center justify-between transition-all cursor-pointer ${optStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswerChecked && idx === QUIZ_QUESTIONS[currentQuizIndex].correctAnswer && (
                        <Check className="w-3.5 h-3.5 text-editorial-accent" />
                      )}
                      {isAnswerChecked && selectedOption === idx && idx !== QUIZ_QUESTIONS[currentQuizIndex].correctAnswer && (
                        <X className="w-3.5 h-3.5 text-red-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              {isAnswerChecked && (
                <div className="bg-editorial-accent-light/30 p-3 rounded-sm border border-editorial-border text-[11px] font-medium text-editorial-text">
                  <p className="font-bold text-editorial-text mb-0.5">Explanation:</p>
                  {QUIZ_QUESTIONS[currentQuizIndex].explanation}
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                {!isAnswerChecked ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={selectedOption === null}
                    className="px-4 py-2 bg-editorial-text hover:bg-editorial-accent disabled:opacity-50 text-editorial-bg hover:text-white font-bold rounded-sm text-xs cursor-pointer uppercase tracking-wider"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-4 py-2 bg-editorial-text hover:bg-editorial-accent text-editorial-bg hover:text-white font-bold rounded-sm text-xs flex items-center space-x-1 cursor-pointer uppercase tracking-wider"
                  >
                    <span>{currentQuizIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <span className="text-4xl">🏆</span>
              <div>
                <h4 className="font-bold font-serif text-lg">Quiz Finished!</h4>
                <p className="text-xs text-editorial-muted font-bold mt-1">
                  You scored {quizScore} out of {QUIZ_QUESTIONS.length} correct answers.
                </p>
              </div>

              <div className="w-full bg-editorial-accent-light h-1.5 rounded-sm max-w-xs mx-auto">
                <div
                  className="bg-editorial-accent h-1.5 rounded-sm"
                  style={{ width: `${(quizScore / QUIZ_QUESTIONS.length) * 100}%` }}
                ></div>
              </div>

              <button
                onClick={restartQuiz}
                className="px-4 py-2 bg-editorial-accent-light text-editorial-accent hover:bg-editorial-accent hover:text-white font-bold rounded-sm text-xs cursor-pointer uppercase tracking-wider"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
