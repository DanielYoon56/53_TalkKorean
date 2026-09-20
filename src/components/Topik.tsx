import React, { useState, useEffect } from 'react';
import { Award, BookOpen, CheckCircle2, Clock, FileText, HelpCircle, ArrowRight, Volume2, Search, Edit3, Check, RotateCcw, AlertCircle, Sparkles, Loader2, Coins, CheckCircle, ShieldCheck, Play, Bookmark, ChevronLeft, ChevronRight, BarChart2, XCircle, CheckSquare, RefreshCw, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { speakKoreanText } from '../utils/tts';
import { TOPIK_I_QUESTIONS, TOPIK_II_QUESTIONS, TOPIK_VOCABULARY_BANK, TopikQuestion } from '../data/topikData';

interface TopikProps {
  credits?: number;
  onOpenCreditModal?: () => void;
  onSpendCredits?: (amount: number, description?: string) => boolean;
}

interface EvaluationResult {
  totalScore: number;
  maxScore: number;
  gradeLevel: string;
  overallSummary: string;
  criteriaScores?: {
    taskCompletion?: string;
    grammarAndStyle?: string;
    vocabulary?: string;
  };
  corrections?: Array<{ original: string; corrected: string; reason: string }>;
  strengths?: string[];
  improvements?: string[];
  improvedEssay?: string;
}

interface ExamResultReport {
  totalScore: number;
  maxScore: number;
  readingScore: number;
  maxReading: number;
  listeningScore: number;
  maxListening: number;
  percentage: number;
  gradeLevel: string;
  passed: boolean;
  timeSpentSeconds: number;
  questionDetails: Array<{
    question: TopikQuestion;
    userChoice: number | null;
    isCorrect: boolean;
    points: number;
  }>;
}

export default function Topik({ credits = 100, onOpenCreditModal, onSpendCredits }: TopikProps = {}) {
  const { t } = useLanguage();
  const [selectedLevel, setSelectedLevel] = useState<'TOPIK I' | 'TOPIK II'>('TOPIK I');
  const [activeSection, setActiveSection] = useState<'practice' | 'mock' | 'writing' | 'vocab' | 'overview'>('practice');

  // Practice state
  const questionsList = selectedLevel === 'TOPIK I' ? TOPIK_I_QUESTIONS : TOPIK_II_QUESTIONS;
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const currentQ = questionsList[currentQIdx] || questionsList[0];
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<number>(0);
  const [answeredCount, setAnsweredCount] = useState<number>(0);

  // Mock Exam State
  const [mockExamStatus, setMockExamStatus] = useState<'intro' | 'in_progress' | 'completed'>('intro');
  const [mockExamLevel, setMockExamLevel] = useState<'TOPIK I' | 'TOPIK II'>('TOPIK I');
  const [mockDurationMinutes, setMockDurationMinutes] = useState<number>(30);
  const [timeLeft, setTimeLeft] = useState<number>(30 * 60);
  const [currentExamQIdx, setCurrentExamQIdx] = useState<number>(0);
  const [userExamAnswers, setUserExamAnswers] = useState<Record<number, number>>({});
  const [markedQuestions, setMarkedQuestions] = useState<Record<number, boolean>>({});
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'correct'>('all');
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState<boolean>(false);
  const [examReport, setExamReport] = useState<ExamResultReport | null>(null);

  // Timer Effect
  useEffect(() => {
    if (activeSection !== 'mock' || mockExamStatus !== 'in_progress') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishMockExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeSection, mockExamStatus, mockDurationMinutes, mockExamLevel, userExamAnswers, timeLeft]);

  const getExamQuestions = () => {
    const list = mockExamLevel === 'TOPIK I' ? TOPIK_I_QUESTIONS : TOPIK_II_QUESTIONS;
    return list.filter(q => q.type === 'reading' || q.type === 'listening');
  };

  const startMockExam = (level: 'TOPIK I' | 'TOPIK II', durationMins: number) => {
    setMockExamLevel(level);
    setMockDurationMinutes(durationMins);
    setTimeLeft(durationMins * 60);
    setCurrentExamQIdx(0);
    setUserExamAnswers({});
    setMarkedQuestions({});
    setExamReport(null);
    setMockExamStatus('in_progress');
  };

  const finishMockExam = () => {
    const examQuestions = getExamQuestions();
    let readingScore = 0;
    let maxReading = 0;
    let listeningScore = 0;
    let maxListening = 0;

    const pointsPerQuestion = Math.max(1, Math.round(100 / Math.max(1, examQuestions.length)));

    const questionDetails = examQuestions.map((q, idx) => {
      const userChoice = userExamAnswers[idx] !== undefined ? userExamAnswers[idx] : null;
      const isCorrect = userChoice === q.correctAnswer;

      if (q.type === 'reading') {
        maxReading += pointsPerQuestion;
        if (isCorrect) readingScore += pointsPerQuestion;
      } else {
        maxListening += pointsPerQuestion;
        if (isCorrect) listeningScore += pointsPerQuestion;
      }

      return {
        question: q,
        userChoice,
        isCorrect,
        points: isCorrect ? pointsPerQuestion : 0
      };
    });

    const totalScore = readingScore + listeningScore;
    const maxScore = maxReading + maxListening;
    const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

    let gradeLevel = '불합격';
    let passed = false;

    if (mockExamLevel === 'TOPIK I') {
      if (percentage >= 80) {
        gradeLevel = 'TOPIK I - 2급 (Pass)';
        passed = true;
      } else if (percentage >= 50) {
        gradeLevel = 'TOPIK I - 1급 (Pass)';
        passed = true;
      } else {
        gradeLevel = '불합격 (Fail)';
        passed = false;
      }
    } else {
      if (percentage >= 85) {
        gradeLevel = 'TOPIK II - 6급 (Master Pass)';
        passed = true;
      } else if (percentage >= 70) {
        gradeLevel = 'TOPIK II - 5급 (Advanced Pass)';
        passed = true;
      } else if (percentage >= 55) {
        gradeLevel = 'TOPIK II - 4급 (Intermediate Pass)';
        passed = true;
      } else if (percentage >= 40) {
        gradeLevel = 'TOPIK II - 3급 (Pass)';
        passed = true;
      } else {
        gradeLevel = '불합격 (Fail)';
        passed = false;
      }
    }

    const timeSpentSeconds = (mockDurationMinutes * 60) - timeLeft;

    setExamReport({
      totalScore,
      maxScore,
      readingScore,
      maxReading,
      listeningScore,
      maxListening,
      percentage,
      gradeLevel,
      passed,
      timeSpentSeconds,
      questionDetails
    });

    setMockExamStatus('completed');
    setShowSubmitConfirmModal(false);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Writing state (for TOPIK II)
  const writingQuestions = TOPIK_II_QUESTIONS.filter(q => q.type === 'writing');
  const [writingIdx, setWritingIdx] = useState(0);
  const currentWritingQ = writingQuestions[writingIdx] || writingQuestions[0];
  const [userWritingInput, setUserWritingInput] = useState('');
  const [showWritingSample, setShowWritingSample] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [evalError, setEvalError] = useState<string | null>(null);

  // Vocab state
  const [vocabSearchTerm, setVocabSearchTerm] = useState('');
  const [vocabLevelFilter, setVocabLevelFilter] = useState<'ALL' | 'TOPIK I' | 'TOPIK II'>('ALL');

  const handleAnswerClick = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(idx);
    setIsAnswerSubmitted(true);
    setAnsweredCount(prev => prev + 1);
    if (idx === currentQ.correctAnswer) {
      setUserScore(prev => prev + 1);
    }
  };

  const handleNextQ = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setCurrentQIdx((prev) => (prev + 1) % questionsList.length);
  };

  const handleAiEvaluate = async () => {
    if (!userWritingInput || userWritingInput.trim().length < 5) {
      setEvalError('답안을 최소 5자 이상 작성해 주세요.');
      return;
    }

    if (credits < 3) {
      if (onOpenCreditModal) {
        onOpenCreditModal();
      }
      setEvalError('크레딧이 부족합니다. (TOPIK AI 작문 첨삭: 3 크레딧 필요)');
      return;
    }

    const success = onSpendCredits ? onSpendCredits(3, 'TOPIK II 서술형·작문 AI 첨삭') : true;
    if (!success) {
      if (onOpenCreditModal) onOpenCreditModal();
      setEvalError('크레딧 차감에 실패했습니다.');
      return;
    }

    setIsEvaluating(true);
    setEvalError(null);
    setEvaluationResult(null);

    try {
      const res = await fetch('/api/topik/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionCategory: currentWritingQ.category,
          passage: currentWritingQ.passage,
          userEssay: userWritingInput,
          sampleAnswer: currentWritingQ.writingPrompt?.sampleAnswer || ''
        })
      });

      if (!res.ok) {
        throw new Error('채점 요청 중 오류가 발생했습니다.');
      }

      const data = await res.json();
      setEvaluationResult(data);
    } catch (err: any) {
      console.warn('AI Evaluation notice:', err?.message || err);
      setEvalError('채점 서버 연결 실패. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsEvaluating(false);
    }
  };

  const filteredVocab = TOPIK_VOCABULARY_BANK.filter(v => {
    const matchesLevel = vocabLevelFilter === 'ALL' || v.level === vocabLevelFilter;
    const matchesSearch = v.word.includes(vocabSearchTerm) || 
                          v.meaningEn.toLowerCase().includes(vocabSearchTerm.toLowerCase()) ||
                          v.exampleKo.includes(vocabSearchTerm);
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Hero Banner */}
      <div className="bg-[#1A1A1A] border border-editorial-border rounded-sm p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-editorial-accent/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex items-center space-x-2">
            <span className="bg-editorial-accent text-white px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest">
              Official Exam Center
            </span>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded text-[10px] font-mono">
              한국어능력시험
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
            TOPIK I & TOPIK II Prep Center
          </h1>
          <p className="text-editorial-accent-light text-sm sm:text-base leading-relaxed">
            Practice real past exam patterns, master essential vocabulary, listen to audio passages, and practice TOPIK II writing with sample breakdowns.
          </p>
        </div>
      </div>

      {/* Level Selection & Section Tabs */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-editorial-border pb-4">
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedLevel('TOPIK I');
              setCurrentQIdx(0);
              setSelectedAnswer(null);
              setIsAnswerSubmitted(false);
            }}
            className={`px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedLevel === 'TOPIK I'
                ? 'bg-editorial-text text-white shadow-sm'
                : 'bg-white border border-editorial-border text-editorial-text hover:bg-editorial-accent-light/40'
            }`}
          >
            TOPIK I (1~2급 Beginner)
          </button>
          <button
            onClick={() => {
              setSelectedLevel('TOPIK II');
              setCurrentQIdx(0);
              setSelectedAnswer(null);
              setIsAnswerSubmitted(false);
            }}
            className={`px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedLevel === 'TOPIK II'
                ? 'bg-editorial-text text-white shadow-sm'
                : 'bg-white border border-editorial-border text-editorial-text hover:bg-editorial-accent-light/40'
            }`}
          >
            TOPIK II (3~6급 Intermediate/Advanced)
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSection('practice')}
            className={`px-4 py-2 rounded-sm text-xs font-semibold cursor-pointer ${
              activeSection === 'practice'
                ? 'bg-editorial-accent-light text-editorial-text border border-editorial-border font-bold'
                : 'text-editorial-muted hover:text-editorial-text'
            }`}
          >
            Practice Questions (기출 문제)
          </button>

          <button
            onClick={() => setActiveSection('mock')}
            className={`px-4 py-2 rounded-sm text-xs font-semibold cursor-pointer flex items-center space-x-1.5 ${
              activeSection === 'mock'
                ? 'bg-editorial-accent-light text-editorial-text border border-editorial-border font-bold'
                : 'text-editorial-muted hover:text-editorial-text'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-editorial-accent" />
            <span>Timed Mock Exam (실전 모의고사)</span>
          </button>

          <button
            onClick={() => {
              setSelectedLevel('TOPIK II');
              setActiveSection('writing');
            }}
            className={`px-4 py-2 rounded-sm text-xs font-semibold cursor-pointer flex items-center space-x-1.5 ${
              activeSection === 'writing'
                ? 'bg-editorial-accent-light text-editorial-text border border-editorial-border font-bold'
                : 'text-editorial-muted hover:text-editorial-text'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5 text-editorial-accent" />
            <span>TOPIK II Writing Lab (쓰기 51~54번)</span>
          </button>

          <button
            onClick={() => setActiveSection('vocab')}
            className={`px-4 py-2 rounded-sm text-xs font-semibold cursor-pointer ${
              activeSection === 'vocab'
                ? 'bg-editorial-accent-light text-editorial-text border border-editorial-border font-bold'
                : 'text-editorial-muted hover:text-editorial-text'
            }`}
          >
            Vocab Bank (필수 어휘)
          </button>

          <button
            onClick={() => setActiveSection('overview')}
            className={`px-4 py-2 rounded-sm text-xs font-semibold cursor-pointer ${
              activeSection === 'overview'
                ? 'bg-editorial-accent-light text-editorial-text border border-editorial-border font-bold'
                : 'text-editorial-muted hover:text-editorial-text'
            }`}
          >
            Exam Guide (시험 안내)
          </button>
        </div>
      </div>

      {/* SECTION 1: Practice Questions */}
      {activeSection === 'practice' && currentQ && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-white border border-editorial-border rounded-sm p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-editorial-border pb-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-editorial-accent uppercase tracking-widest block">
                  {currentQ.level} • {currentQ.category}
                </span>
                <h3 className="font-serif font-bold text-base text-editorial-text">
                  Question #{currentQ.questionNumber}
                </h3>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono font-bold text-editorial-muted">
                  Score: {userScore}/{answeredCount}
                </span>
                <button
                  onClick={handleNextQ}
                  className="px-3 py-1.5 bg-editorial-text hover:bg-editorial-accent text-white font-bold text-xs rounded-sm transition-all cursor-pointer flex items-center space-x-1"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Passage Box if available */}
            {currentQ.passage && (
              <div className="bg-editorial-bg border border-editorial-border p-4 rounded-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-editorial-accent uppercase tracking-wider">
                    Passage / Dialogue Text (지문)
                  </span>
                  <button
                    onClick={() => speakKoreanText(currentQ.passage || '', { role: 'ai' })}
                    className="text-editorial-accent hover:text-editorial-text flex items-center space-x-1 text-xs font-bold cursor-pointer"
                    title="Listen to audio reading"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Audio Read</span>
                  </button>
                </div>
                <p className="text-sm font-semibold text-editorial-text whitespace-pre-line leading-relaxed">
                  {currentQ.passage}
                </p>
                {currentQ.passageEnglish && (
                  <p className="text-xs text-editorial-muted italic whitespace-pre-line border-t border-editorial-border/60 pt-2">
                    {currentQ.passageEnglish}
                  </p>
                )}
              </div>
            )}

            {/* Question Prompt */}
            <div className="space-y-2">
              <p className="text-base sm:text-lg font-serif font-bold text-editorial-text whitespace-pre-line leading-relaxed">
                {currentQ.question}
              </p>
              {currentQ.questionEnglish && (
                <p className="text-xs text-editorial-muted italic whitespace-pre-line">
                  {currentQ.questionEnglish}
                </p>
              )}
            </div>

            {/* Options or Writing Input */}
            {currentQ.type === 'writing' ? (
              <div className="p-5 bg-amber-50/70 border border-amber-300/80 rounded-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Edit3 className="w-4 h-4 text-amber-800" />
                    <span className="text-xs font-bold text-amber-950">
                      TOPIK II 주관식 / 작문 서술형 문항 (Writing Question)
                    </span>
                  </div>
                  <span className="text-[10px] bg-amber-200 text-amber-900 border border-amber-400 px-2 py-0.5 rounded font-mono font-bold">
                    {currentQ.questionNumber === 53 ? '200~300자' : currentQ.questionNumber === 54 ? '600~700자' : '빈칸 완성'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => {
                      const wIdx = writingQuestions.findIndex(wq => wq.questionNumber === currentQ.questionNumber);
                      if (wIdx >= 0) setWritingIdx(wIdx);
                      setSelectedLevel('TOPIK II');
                      setActiveSection('writing');
                    }}
                    className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-sm cursor-pointer transition-all flex items-center space-x-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Writing Lab 스튜디오에서 작성 및 AI 첨삭받기</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsAnswerSubmitted(prev => !prev);
                    }}
                    className="px-3.5 py-2 bg-white border border-amber-300 hover:bg-amber-100 text-amber-950 font-semibold text-xs rounded-sm cursor-pointer transition-all flex items-center space-x-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-800" />
                    <span>{isAnswerSubmitted ? '모범 답안 닫기' : '모범 답안 및 채점 기준 보기'}</span>
                  </button>
                </div>

                {isAnswerSubmitted && currentQ.writingPrompt && (
                  <div className="p-4 bg-white border border-amber-200 rounded-sm space-y-3 animate-fadeIn">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                        Standard Model Answer (공식 모범 답안)
                      </span>
                      <p className="text-xs font-semibold text-editorial-text whitespace-pre-line leading-relaxed mt-1">
                        {currentQ.writingPrompt.sampleAnswer}
                      </p>
                    </div>

                    <div className="border-t border-amber-100 pt-2 space-y-1.5">
                      <span className="text-[11px] font-bold text-amber-900 block">
                        🎯 Essential Scoring Points (채점 키포인트):
                      </span>
                      <ul className="list-disc list-inside space-y-0.5 text-xs text-editorial-text">
                        {currentQ.writingPrompt.keyPoints.map((pt, pIdx) => (
                          <li key={pIdx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ) : currentQ.options ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQ.options.map((optText, optIdx) => {
                  let btnStyle = "border-editorial-border bg-editorial-bg hover:bg-editorial-accent-light/30 text-editorial-text";
                  if (isAnswerSubmitted) {
                    if (optIdx === currentQ.correctAnswer) {
                      btnStyle = "bg-emerald-600 text-white border-emerald-700 font-bold";
                    } else if (optIdx === selectedAnswer && selectedAnswer !== currentQ.correctAnswer) {
                      btnStyle = "bg-rose-600 text-white border-rose-700 font-bold";
                    }
                  } else if (selectedAnswer === optIdx) {
                    btnStyle = "border-editorial-accent bg-editorial-accent-light/50 font-bold";
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleAnswerClick(optIdx)}
                      className={`p-4 rounded-sm border text-left transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span className="text-sm font-bold">{optIdx + 1}. {optText}</span>
                      {isAnswerSubmitted && optIdx === currentQ.correctAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-white shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            ) : null}

            {/* Answer Explanation & Vocabulary Tips */}
            {isAnswerSubmitted && (
              <div className="p-5 rounded-sm bg-editorial-accent-light/40 border border-editorial-border space-y-4 animate-fadeIn">
                <div className="flex items-center space-x-2 font-bold text-sm text-editorial-text">
                  <CheckCircle2 className="w-4 h-4 text-editorial-accent" />
                  <span>
                    {selectedAnswer === currentQ.correctAnswer ? 'Correct! 정답입니다!' : 'Incorrect (오답). Explanation:'}
                  </span>
                </div>
                <p className="text-xs text-editorial-text leading-relaxed">
                  {currentQ.explanation}
                </p>
                {currentQ.explanationKorean && (
                  <p className="text-xs text-editorial-muted font-medium leading-relaxed">
                    💡 {currentQ.explanationKorean}
                  </p>
                )}

                {/* Vocabulary Tips */}
                {currentQ.vocabularyTips && currentQ.vocabularyTips.length > 0 && (
                  <div className="border-t border-editorial-border/80 pt-3 space-y-2">
                    <span className="text-[11px] font-bold text-editorial-text block">
                      📌 Key Vocabulary in this question:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentQ.vocabularyTips.map((tip, idx) => (
                        <span key={idx} className="bg-white border border-editorial-border px-2.5 py-1 rounded text-xs font-medium text-editorial-text">
                          <strong className="text-editorial-accent">{tip.word}</strong>: {tip.meaning}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Question Index Navigator */}
          <div className="md:col-span-4 bg-white border border-editorial-border rounded-sm p-6 space-y-4">
            <h4 className="font-serif font-bold text-sm text-editorial-text border-b border-editorial-border pb-2">
              Question Navigator ({selectedLevel})
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {questionsList.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentQIdx(idx);
                    setSelectedAnswer(null);
                    setIsAnswerSubmitted(false);
                  }}
                  className={`p-2.5 rounded-sm border text-xs font-bold transition-all text-left cursor-pointer flex flex-col space-y-0.5 ${
                    idx === currentQIdx
                      ? 'border-editorial-text bg-editorial-text text-white'
                      : 'border-editorial-border bg-editorial-bg text-editorial-text hover:bg-editorial-accent-light/40'
                  }`}
                >
                  <span>Q{q.questionNumber}. {q.type.toUpperCase()}</span>
                  <span className="text-[10px] font-normal truncate opacity-80">{q.category}</span>
                </button>
              ))}
            </div>

            <div className="bg-editorial-bg border border-editorial-border p-4 rounded-sm space-y-2 text-xs text-editorial-muted">
              <p className="font-bold text-editorial-text">💡 Test Taking Tip:</p>
              <p className="leading-relaxed">
                In TOPIK, pay close attention to grammar connectors (~기 전에, ~하는 바람에) and keywords in the first and last sentence of paragraphs.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION MOCK: Interactive Timed Mock Exam Engine */}
      {activeSection === 'mock' && (
        <div className="space-y-6">
          {/* INTRO SCREEN */}
          {mockExamStatus === 'intro' && (
            <div className="bg-white border border-editorial-border rounded-sm p-6 sm:p-8 space-y-8">
              <div className="border-b border-editorial-border pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      Official Simulation Engine
                    </span>
                    <span className="text-xs font-mono font-bold text-editorial-accent">
                      {mockExamLevel} Timed Mode
                    </span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-editorial-text">
                    TOPIK Interactive Timed Mock Exam (실전 모의고사)
                  </h2>
                  <p className="text-xs text-editorial-muted">
                    Simulate real test conditions with timed Reading & Listening sections, OMR question navigation, auto-grading, and level placement report.
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setMockExamLevel('TOPIK I')}
                    className={`px-4 py-2 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                      mockExamLevel === 'TOPIK I'
                        ? 'bg-editorial-text text-white'
                        : 'bg-editorial-bg border border-editorial-border text-editorial-text'
                    }`}
                  >
                    TOPIK I Mock
                  </button>
                  <button
                    onClick={() => setMockExamLevel('TOPIK II')}
                    className={`px-4 py-2 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                      mockExamLevel === 'TOPIK II'
                        ? 'bg-editorial-text text-white'
                        : 'bg-editorial-bg border border-editorial-border text-editorial-text'
                    }`}
                  >
                    TOPIK II Mock
                  </button>
                </div>
              </div>

              {/* Time Selection Cards */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-editorial-text">
                  1. Select Timer Duration (시험 시간 설정):
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { min: 15, label: '15 Minutes', desc: 'Express Speed Test (스피드 체크)' },
                    { min: 30, label: '30 Minutes', desc: 'Standard Simulation (표준 모의고사)' },
                    { min: 60, label: '60 Minutes', desc: 'Full Practice Mode (정식 집중 평가)' }
                  ].map((opt) => (
                    <button
                      key={opt.min}
                      onClick={() => setMockDurationMinutes(opt.min)}
                      className={`p-4 rounded-sm border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        mockDurationMinutes === opt.min
                          ? 'border-editorial-accent bg-editorial-accent-light/50 shadow-sm'
                          : 'border-editorial-border bg-editorial-bg hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-editorial-text flex items-center space-x-1.5">
                          <Clock className="w-4 h-4 text-editorial-accent" />
                          <span>{opt.label}</span>
                        </span>
                        {mockDurationMinutes === opt.min && (
                          <CheckCircle2 className="w-4 h-4 text-editorial-accent" />
                        )}
                      </div>
                      <span className="text-[11px] text-editorial-muted mt-2 block">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Exam Rules & Format Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-editorial-bg p-4 rounded-sm border border-editorial-border space-y-1.5">
                  <div className="font-bold text-editorial-text flex items-center space-x-1.5">
                    <Volume2 className="w-4 h-4 text-editorial-accent" />
                    <span>Listening Section (듣기)</span>
                  </div>
                  <p className="text-editorial-muted leading-relaxed">
                    Listen to natural voice prompts with AI audio TTS. Match dialogue intent and choose appropriate actions.
                  </p>
                </div>

                <div className="bg-editorial-bg p-4 rounded-sm border border-editorial-border space-y-1.5">
                  <div className="font-bold text-editorial-text flex items-center space-x-1.5">
                    <BookOpen className="w-4 h-4 text-editorial-accent" />
                    <span>Reading Section (읽기)</span>
                  </div>
                  <p className="text-editorial-muted leading-relaxed">
                    Interpret notices, news headlines, grammar blanks, and paragraph sequences under real clock pressure.
                  </p>
                </div>

                <div className="bg-editorial-bg p-4 rounded-sm border border-editorial-border space-y-1.5">
                  <div className="font-bold text-editorial-text flex items-center space-x-1.5">
                    <BarChart2 className="w-4 h-4 text-editorial-accent" />
                    <span>Instant Grading & Review</span>
                  </div>
                  <p className="text-editorial-muted leading-relaxed">
                    Auto-scored OMR report instantly reveals your level placement (1~6급), score breakdown, and item explanations.
                  </p>
                </div>
              </div>

              {/* Start Exam CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-editorial-border">
                <div className="text-xs text-editorial-muted font-medium">
                  Total Questions: <strong className="text-editorial-text font-bold">{getExamQuestions().length} Questions</strong> (Listening & Reading)
                </div>

                <button
                  onClick={() => startMockExam(mockExamLevel, mockDurationMinutes)}
                  className="w-full sm:w-auto px-8 py-3.5 bg-editorial-accent hover:bg-editorial-text text-white font-bold text-sm rounded-sm transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Timed Mock Exam (시험 시작)</span>
                </button>
              </div>
            </div>
          )}

          {/* IN PROGRESS SCREEN */}
          {mockExamStatus === 'in_progress' && (() => {
            const examQuestions = getExamQuestions();
            const currentExamQ = examQuestions[currentExamQIdx];
            const answeredTotal = Object.keys(userExamAnswers).length;

            return (
              <div className="space-y-6">
                {/* Sticky Top Status Bar */}
                <div className="bg-[#1A1A1A] border border-editorial-border text-white p-4 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-3 sticky top-4 z-20 shadow-md">
                  <div className="flex items-center space-x-3">
                    <span className="bg-editorial-accent text-white px-2.5 py-1 rounded text-[10px] font-bold uppercase">
                      {mockExamLevel} Mock
                    </span>
                    <span className="text-xs font-mono text-gray-300">
                      Q {currentExamQIdx + 1} of {examQuestions.length}
                    </span>
                  </div>

                  {/* Timer Display */}
                  <div className={`flex items-center space-x-2 px-4 py-1.5 rounded font-mono font-bold text-sm ${
                    timeLeft < 180 ? 'bg-red-900/80 text-red-200 animate-pulse border border-red-500' : 'bg-gray-800 text-amber-300 border border-gray-700'
                  }`}>
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Time Left: {formatTimer(timeLeft)}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-400 font-mono">
                      Answered: {answeredTotal}/{examQuestions.length}
                    </span>
                    <button
                      onClick={() => setShowSubmitConfirmModal(true)}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded transition-all cursor-pointer"
                    >
                      Submit Exam (제출)
                    </button>
                  </div>
                </div>

                {/* Main Exam Area */}
                {currentExamQ && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Left Question Card */}
                    <div className="md:col-span-8 bg-white border border-editorial-border rounded-sm p-6 sm:p-8 space-y-6">
                      <div className="flex justify-between items-center border-b border-editorial-border pb-3">
                        <div className="space-y-1">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                            currentExamQ.type === 'listening' ? 'bg-indigo-100 text-indigo-900 border border-indigo-200' : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                          }`}>
                            {currentExamQ.type === 'listening' ? '🎧 Listening (듣기)' : '📖 Reading (읽기)'}
                          </span>
                          <span className="text-xs font-bold text-editorial-muted ml-2">
                            {currentExamQ.category}
                          </span>
                        </div>

                        <button
                          onClick={() => setMarkedQuestions(prev => ({ ...prev, [currentExamQIdx]: !prev[currentExamQIdx] }))}
                          className={`flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded border transition-all cursor-pointer ${
                            markedQuestions[currentExamQIdx]
                              ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                              : 'bg-white text-editorial-muted border-editorial-border hover:text-editorial-text'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${markedQuestions[currentExamQIdx] ? 'fill-current text-amber-600' : ''}`} />
                          <span>{markedQuestions[currentExamQIdx] ? 'Marked (검토)' : 'Mark Question'}</span>
                        </button>
                      </div>

                      {/* Passage if present */}
                      {currentExamQ.passage && (
                        <div className="bg-editorial-bg border border-editorial-border p-4 rounded-sm space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-editorial-accent uppercase">
                              Passage Text (지문)
                            </span>
                            <button
                              onClick={() => speakKoreanText(currentExamQ.passage || '', { role: 'ai' })}
                              className="text-editorial-accent hover:text-editorial-text flex items-center space-x-1 text-xs font-bold cursor-pointer"
                              title="Listen to Passage Audio"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Listen Audio</span>
                            </button>
                          </div>
                          <p className="text-sm font-semibold text-editorial-text whitespace-pre-line leading-relaxed">
                            {currentExamQ.passage}
                          </p>
                        </div>
                      )}

                      {/* Question Prompt */}
                      <div className="space-y-1">
                        <h3 className="text-base sm:text-lg font-serif font-bold text-editorial-text">
                          Q{currentExamQIdx + 1}. {currentExamQ.question}
                        </h3>
                        {currentExamQ.questionEnglish && (
                          <p className="text-xs text-editorial-muted italic">
                            {currentExamQ.questionEnglish}
                          </p>
                        )}
                      </div>

                      {/* Options List */}
                      {currentExamQ.options && (
                        <div className="space-y-2.5 pt-2">
                          {currentExamQ.options.map((optText, optIdx) => {
                            const isSelected = userExamAnswers[currentExamQIdx] === optIdx;

                            return (
                              <button
                                key={optIdx}
                                onClick={() => setUserExamAnswers(prev => ({ ...prev, [currentExamQIdx]: optIdx }))}
                                className={`w-full p-4 rounded-sm border text-left transition-all cursor-pointer flex items-center justify-between ${
                                  isSelected
                                    ? 'border-editorial-text bg-editorial-text text-white font-bold shadow-sm'
                                    : 'border-editorial-border bg-editorial-bg hover:bg-white text-editorial-text'
                                }`}
                              >
                                <span className="text-sm">
                                  {optIdx + 1}. {optText}
                                </span>
                                {isSelected && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Bottom Exam Navigation Controls */}
                      <div className="pt-4 border-t border-editorial-border flex justify-between items-center">
                        <button
                          disabled={currentExamQIdx === 0}
                          onClick={() => setCurrentExamQIdx(prev => Math.max(0, prev - 1))}
                          className="px-4 py-2 border border-editorial-border rounded-sm text-xs font-bold text-editorial-text disabled:opacity-40 flex items-center space-x-1 cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Previous</span>
                        </button>

                        <span className="text-xs font-mono text-editorial-muted">
                          Question {currentExamQIdx + 1} / {examQuestions.length}
                        </span>

                        <button
                          disabled={currentExamQIdx === examQuestions.length - 1}
                          onClick={() => setCurrentExamQIdx(prev => Math.min(examQuestions.length - 1, prev + 1))}
                          className="px-4 py-2 bg-editorial-text hover:bg-editorial-accent text-white rounded-sm text-xs font-bold disabled:opacity-40 flex items-center space-x-1 cursor-pointer"
                        >
                          <span>Next</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Right Column: OMR Sheet Palette */}
                    <div className="md:col-span-4 space-y-4">
                      <div className="bg-white border border-editorial-border rounded-sm p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-editorial-border pb-3">
                          <h4 className="font-serif font-bold text-sm text-editorial-text">
                            OMR Answer Sheet (답안지)
                          </h4>
                          <span className="text-[10px] font-mono bg-editorial-bg border border-editorial-border px-2 py-0.5 rounded text-editorial-muted">
                            Click to jump
                          </span>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          {examQuestions.map((q, idx) => {
                            const isAnswered = userExamAnswers[idx] !== undefined;
                            const isMarked = markedQuestions[idx];
                            const isCurrent = idx === currentExamQIdx;

                            let btnStyle = "bg-white border-editorial-border text-editorial-text hover:bg-editorial-accent-light/40";
                            if (isAnswered) {
                              btnStyle = "bg-editorial-text text-white font-bold border-editorial-text";
                            }
                            if (isCurrent) {
                              btnStyle += " ring-2 ring-editorial-accent ring-offset-1";
                            }

                            return (
                              <button
                                key={idx}
                                onClick={() => setCurrentExamQIdx(idx)}
                                className={`p-2.5 rounded text-xs text-center transition-all cursor-pointer relative ${btnStyle}`}
                              >
                                <span>{idx + 1}</span>
                                {isMarked && (
                                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white"></span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* OMR Legend */}
                        <div className="pt-3 border-t border-editorial-border space-y-1.5 text-[11px] text-editorial-muted">
                          <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 rounded bg-editorial-text"></span>
                            <span>Answered (답안 제출)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 rounded bg-white border border-editorial-border"></span>
                            <span>Unanswered (미답변)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 rounded bg-amber-500"></span>
                            <span>Marked for Review (검토 표시)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* COMPLETED RESULT REPORT SCREEN */}
          {mockExamStatus === 'completed' && examReport && (
            <div className="space-y-8 animate-fadeIn">
              {/* Top Result Banner */}
              <div className={`p-8 rounded-sm border ${
                examReport.passed ? 'bg-emerald-900 border-emerald-800 text-white' : 'bg-amber-950 border-amber-800 text-white'
              }`}>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      {examReport.passed ? (
                        <span className="bg-emerald-500 text-emerald-950 px-3 py-1 rounded text-xs font-bold uppercase tracking-widest flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Official Pass (합격)</span>
                        </span>
                      ) : (
                        <span className="bg-amber-500 text-amber-950 px-3 py-1 rounded text-xs font-bold uppercase tracking-widest flex items-center space-x-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Needs Practice (재도전)</span>
                        </span>
                      )}
                      <span className="text-xs font-mono opacity-80">
                        {mockExamLevel} Simulation Report
                      </span>
                    </div>

                    <h2 className="text-3xl font-serif font-bold tracking-tight">
                      {examReport.gradeLevel}
                    </h2>

                    <p className="text-xs opacity-80 leading-relaxed max-w-2xl">
                      {examReport.passed
                        ? 'Congratulations! Your target accuracy and speed meet official TOPIK level thresholds.'
                        : 'Review your incorrect answers below to master grammar patterns and key vocabulary for your next attempt.'}
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm p-5 rounded-sm border border-white/20 text-center space-y-1 min-w-[200px]">
                    <span className="text-[10px] uppercase font-bold tracking-wider block opacity-80">
                      Total Test Score
                    </span>
                    <div className="text-4xl font-serif font-bold text-amber-300">
                      {examReport.totalScore} <span className="text-lg font-normal text-white">/ {examReport.maxScore}</span>
                    </div>
                    <span className="text-xs font-mono block text-emerald-200">
                      {examReport.percentage}% Accuracy
                    </span>
                  </div>
                </div>
              </div>

              {/* Section Breakdown Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-sm border border-editorial-border space-y-2">
                  <span className="text-[10px] font-bold text-editorial-muted uppercase tracking-wider block">
                    📖 Reading Section (읽기)
                  </span>
                  <div className="text-2xl font-serif font-bold text-editorial-text">
                    {examReport.readingScore} / {examReport.maxReading}
                  </div>
                  <div className="w-full bg-editorial-bg h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all"
                      style={{ width: `${examReport.maxReading > 0 ? (examReport.readingScore / examReport.maxReading) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-sm border border-editorial-border space-y-2">
                  <span className="text-[10px] font-bold text-editorial-muted uppercase tracking-wider block">
                    🎧 Listening Section (듣기)
                  </span>
                  <div className="text-2xl font-serif font-bold text-editorial-text">
                    {examReport.listeningScore} / {examReport.maxListening}
                  </div>
                  <div className="w-full bg-editorial-bg h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all"
                      style={{ width: `${examReport.maxListening > 0 ? (examReport.listeningScore / examReport.maxListening) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-sm border border-editorial-border space-y-2">
                  <span className="text-[10px] font-bold text-editorial-muted uppercase tracking-wider block">
                    ⏱️ Time Spent
                  </span>
                  <div className="text-2xl font-serif font-bold text-editorial-text">
                    {Math.floor(examReport.timeSpentSeconds / 60)}m {examReport.timeSpentSeconds % 60}s
                  </div>
                  <p className="text-[11px] text-editorial-muted">
                    Allocated: {mockDurationMinutes} minutes
                  </p>
                </div>
              </div>

              {/* Item-by-Item Detailed Review */}
              <div className="bg-white border border-editorial-border rounded-sm p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-editorial-border pb-4">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-editorial-text">
                      Detailed Answer Review & Explanations (문제별 상세 해설)
                    </h3>
                    <p className="text-xs text-editorial-muted">
                      Inspect official explanations, vocabulary tips, and correct options.
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setReviewFilter('all')}
                      className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                        reviewFilter === 'all'
                          ? 'bg-editorial-text text-white'
                          : 'bg-editorial-bg border border-editorial-border text-editorial-text'
                      }`}
                    >
                      All ({examReport.questionDetails.length})
                    </button>
                    <button
                      onClick={() => setReviewFilter('incorrect')}
                      className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                        reviewFilter === 'incorrect'
                          ? 'bg-rose-700 text-white'
                          : 'bg-editorial-bg border border-editorial-border text-editorial-text'
                      }`}
                    >
                      Incorrect Only ({examReport.questionDetails.filter(d => !d.isCorrect).length})
                    </button>
                    <button
                      onClick={() => setReviewFilter('correct')}
                      className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                        reviewFilter === 'correct'
                          ? 'bg-emerald-700 text-white'
                          : 'bg-editorial-bg border border-editorial-border text-editorial-text'
                      }`}
                    >
                      Correct Only ({examReport.questionDetails.filter(d => d.isCorrect).length})
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {examReport.questionDetails
                    .filter((item) => {
                      if (reviewFilter === 'incorrect') return !item.isCorrect;
                      if (reviewFilter === 'correct') return item.isCorrect;
                      return true;
                    })
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-5 rounded-sm border space-y-4 text-xs ${
                          item.isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
                        }`}
                      >
                        <div className="flex items-center justify-between border-b pb-3 border-editorial-border/60">
                          <div className="flex items-center space-x-2">
                            {item.isCorrect ? (
                              <span className="px-2.5 py-1 bg-emerald-700 text-white font-bold rounded text-[11px] flex items-center space-x-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Correct (+{item.points} pts)</span>
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 bg-rose-700 text-white font-bold rounded text-[11px] flex items-center space-x-1">
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Incorrect (0 pts)</span>
                              </span>
                            )}
                            <span className="font-bold text-editorial-text text-sm font-serif">
                              Q#{item.question.questionNumber} • {item.question.category}
                            </span>
                          </div>

                          <button
                            onClick={() => speakKoreanText(item.question.passage || item.question.question, { role: 'ai' })}
                            className="text-editorial-accent hover:text-editorial-text flex items-center space-x-1 font-bold cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Audio</span>
                          </button>
                        </div>

                        {item.question.passage && (
                          <div className="bg-white p-3 rounded border border-editorial-border text-editorial-text font-medium whitespace-pre-line leading-relaxed">
                            {item.question.passage}
                          </div>
                        )}

                        <div className="font-bold text-sm text-editorial-text">
                          {item.question.question}
                        </div>

                        {/* Options breakdown */}
                        {item.question.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {item.question.options.map((optText, oIdx) => {
                              const isCorrectOpt = oIdx === item.question.correctAnswer;
                              const isUserChosen = oIdx === item.userChoice;

                              let optStyle = "bg-white border-editorial-border text-editorial-text";
                              if (isCorrectOpt) {
                                optStyle = "bg-emerald-600 text-white border-emerald-700 font-bold";
                              } else if (isUserChosen && !isCorrectOpt) {
                                optStyle = "bg-rose-600 text-white border-rose-700 font-bold";
                              }

                              return (
                                <div key={oIdx} className={`p-3 rounded border flex items-center justify-between ${optStyle}`}>
                                  <span>{oIdx + 1}. {optText}</span>
                                  {isUserChosen && (
                                    <span className="text-[10px] uppercase font-bold bg-black/20 px-1.5 py-0.5 rounded ml-2">
                                      Your Choice
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Explanation Box */}
                        <div className="bg-white p-4 rounded border border-editorial-border space-y-2">
                          <span className="font-bold text-editorial-accent block">💡 Official Tutor Explanation:</span>
                          <p className="text-editorial-text leading-relaxed">{item.question.explanation}</p>
                          {item.question.explanationKorean && (
                            <p className="text-editorial-muted text-[11px] pt-1 border-t border-editorial-border/60">
                              {item.question.explanationKorean}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-editorial-border">
                  <button
                    onClick={() => setMockExamStatus('intro')}
                    className="px-6 py-2.5 bg-editorial-text hover:bg-editorial-accent text-white font-bold text-xs rounded-sm transition-all cursor-pointer flex items-center space-x-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retake Mock Exam (다시 응시)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SUBMIT CONFIRMATION MODAL */}
          {showSubmitConfirmModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
              <div className="bg-white border border-editorial-border rounded-sm max-w-md w-full p-6 space-y-5 text-editorial-text">
                <div className="flex items-center space-x-3 text-amber-700">
                  <AlertCircle className="w-6 h-6 shrink-0" />
                  <h3 className="font-serif font-bold text-lg">Submit Timed Exam?</h3>
                </div>

                <p className="text-xs text-editorial-muted leading-relaxed">
                  Are you sure you want to finish and submit your exam for auto-scoring?
                </p>

                <div className="bg-editorial-bg p-3 rounded text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Total Questions:</span>
                    <span className="font-bold">{getExamQuestions().length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Answered:</span>
                    <span className="font-bold text-emerald-700">{Object.keys(userExamAnswers).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unanswered:</span>
                    <span className="font-bold text-rose-700">
                      {getExamQuestions().length - Object.keys(userExamAnswers).length}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={() => setShowSubmitConfirmModal(false)}
                    className="flex-1 py-2.5 border border-editorial-border text-editorial-text font-bold text-xs rounded-sm hover:bg-gray-100 cursor-pointer"
                  >
                    Continue Exam (돌아가기)
                  </button>
                  <button
                    onClick={finishMockExam}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-sm shadow cursor-pointer"
                  >
                    Submit & Grade (제출 및 채점)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: Writing Lab (TOPIK II) */}
      {activeSection === 'writing' && selectedLevel === 'TOPIK II' && (
        <div className="bg-white border border-editorial-border rounded-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-editorial-border pb-4">
            <div>
              <span className="text-[10px] font-bold text-editorial-accent uppercase tracking-wider block">
                TOPIK II Writing Studio (쓰기 영역)
              </span>
              <h2 className="text-xl font-serif font-bold text-editorial-text">
                {currentWritingQ.category}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {writingQuestions.map((wq, i) => {
                let badge = `Q${wq.questionNumber}`;
                if (wq.questionNumber === 51) badge = 'Q51. 실용문 빈칸';
                if (wq.questionNumber === 52) badge = 'Q52. 설명문 빈칸';
                if (wq.questionNumber === 53) badge = 'Q53. 도표분석 (200~300자)';
                if (wq.questionNumber === 54) badge = 'Q54. 장문논술 (600~700자)';

                return (
                  <button
                    key={wq.id}
                    onClick={() => {
                      setWritingIdx(i);
                      setUserWritingInput('');
                      setShowWritingSample(false);
                      setEvaluationResult(null);
                      setEvalError(null);
                    }}
                    className={`px-3 py-1.5 rounded-sm text-xs font-bold cursor-pointer border transition-all ${
                      i === writingIdx
                        ? 'bg-editorial-text text-white border-editorial-text shadow-sm'
                        : 'bg-white border-editorial-border text-editorial-text hover:bg-editorial-accent-light/40'
                    }`}
                  >
                    {badge}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-6 space-y-4">
              {/* Question Task Instructions (지시문 / 문제 요구사항) */}
              <div className="bg-amber-500/10 border-2 border-amber-500/30 p-4 rounded-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-900 uppercase flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-600 inline-block"></span>
                    <span>Q{currentWritingQ.questionNumber} 작성 지시문 (Question Task)</span>
                  </span>
                  <span className="text-[10px] font-bold font-mono bg-amber-200 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                    {currentWritingQ.questionNumber === 53 ? '목표 분량: 200~300자' : currentWritingQ.questionNumber === 54 ? '목표 분량: 600~700자' : '빈칸 2개 완성'}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-serif font-bold text-editorial-text leading-snug">
                  {currentWritingQ.question}
                </h3>
                {currentWritingQ.questionEnglish && (
                  <p className="text-xs text-editorial-muted italic border-t border-amber-200/60 pt-1.5">
                    {currentWritingQ.questionEnglish}
                  </p>
                )}
              </div>

              {/* Passage & Survey Data Box (제시 자료 및 본문) */}
              {currentWritingQ.passage && (
                <div className="bg-editorial-bg border border-editorial-border p-4 rounded-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-editorial-accent uppercase tracking-wider">
                      {currentWritingQ.questionNumber === 53 ? '📊 도표·조사 통계 자료 (Survey & Chart Data)' : '📄 본문 제시문 (Passage)'}
                    </span>
                    <button
                      onClick={() => speakKoreanText(currentWritingQ.passage || '', { role: 'ai' })}
                      className="text-editorial-accent hover:text-editorial-text flex items-center space-x-1 text-xs font-bold cursor-pointer"
                      title="Listen to audio reading"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>지문 듣기</span>
                    </button>
                  </div>
                  <div className="p-3 bg-white border border-editorial-border/80 rounded-sm font-sans text-xs sm:text-sm text-editorial-text whitespace-pre-line leading-relaxed shadow-inner">
                    {currentWritingQ.passage}
                  </div>
                  {currentWritingQ.passageEnglish && (
                    <details className="text-[11px] text-editorial-muted">
                      <summary className="cursor-pointer font-semibold hover:text-editorial-text">
                        English Translation (지문 영문 번역 보기)
                      </summary>
                      <p className="italic whitespace-pre-line border-t border-editorial-border/60 pt-1.5 mt-1 leading-relaxed">
                        {currentWritingQ.passageEnglish}
                      </p>
                    </details>
                  )}
                </div>
              )}

              {/* Answer Input Box */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-editorial-text block flex items-center justify-between">
                  <span>Your Answer Box (답안 작성란):</span>
                  <span className="text-[10px] text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded">
                    ⚡ AI 첨삭 : 3 크레딧
                  </span>
                </label>
                <textarea
                  rows={currentWritingQ.questionNumber === 54 ? 10 : currentWritingQ.questionNumber === 53 ? 7 : 5}
                  value={userWritingInput}
                  onChange={(e) => {
                    setUserWritingInput(e.target.value);
                    if (evalError) setEvalError(null);
                  }}
                  placeholder={
                    currentWritingQ.questionNumber === 53
                      ? "200~300자로 작성하십시오. 제목을 쓰지 말고, 격식 서술체(~ㄴ다/는다)로 도표의 조사기관, 수치 변화, 원인, 전망을 객관적으로 작성하세요."
                      : currentWritingQ.questionNumber === 54
                      ? "600~700자로 작성하십시오. 서론-본론-결론 구조로 3가지 질문에 대한 답을 논리적으로 서술하세요."
                      : "한국어 답안을 문맥에 맞게 작성해 주세요..."
                  }
                  className="w-full p-4 border border-editorial-border rounded-sm text-xs sm:text-sm outline-none bg-white focus:border-editorial-accent font-sans leading-relaxed shadow-sm"
                />
              </div>

              {evalError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{evalError}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleAiEvaluate}
                    disabled={isEvaluating}
                    className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-sm shadow-sm transition-all cursor-pointer flex items-center space-x-2 disabled:opacity-50"
                  >
                    {isEvaluating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>AI 채점 중...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-200" />
                        <span>AI 주관식 / 작문 첨삭받기</span>
                        <span className="bg-amber-800 text-amber-100 text-[10px] px-1.5 py-0.5 rounded font-mono">3 CR</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setShowWritingSample(!showWritingSample)}
                    className="px-3.5 py-2.5 bg-editorial-text hover:bg-editorial-accent text-white font-semibold text-xs rounded-sm transition-all cursor-pointer flex items-center space-x-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{showWritingSample ? '모범 답안 닫기' : '모범 답안 보기'}</span>
                  </button>
                </div>

                <div className="text-right">
                  <span className={`text-xs font-mono font-bold ${
                    currentWritingQ.questionNumber === 53
                      ? userWritingInput.length >= 200 && userWritingInput.length <= 300
                        ? 'text-emerald-700'
                        : userWritingInput.length > 300
                        ? 'text-red-600'
                        : 'text-amber-700'
                      : currentWritingQ.questionNumber === 54
                      ? userWritingInput.length >= 600 && userWritingInput.length <= 700
                        ? 'text-emerald-700'
                        : userWritingInput.length > 700
                        ? 'text-red-600'
                        : 'text-amber-700'
                      : 'text-editorial-muted'
                  }`}>
                    {userWritingInput.length}자 작성
                  </span>
                  {(currentWritingQ.questionNumber === 53 || currentWritingQ.questionNumber === 54) && (
                    <span className="text-[10px] text-editorial-muted block">
                      (권장: {currentWritingQ.questionNumber === 53 ? '200~300자' : '600~700자'})
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Panel: AI Evaluation Result or Model Answer / Tips */}
            <div className="md:col-span-6 space-y-4">
              {evaluationResult ? (
                <div className="bg-amber-50/90 border border-amber-300 p-5 rounded-sm space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-amber-800" />
                      <span className="font-serif font-bold text-base text-amber-950">
                        TOPIK II AI Official Evaluation Report
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-1 bg-amber-800 text-amber-50 text-xs font-bold rounded">
                        {evaluationResult.totalScore} / {evaluationResult.maxScore}점
                      </span>
                      <span className="px-2 py-0.5 bg-amber-200 text-amber-900 border border-amber-400 text-[11px] font-bold rounded">
                        {evaluationResult.gradeLevel}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-amber-950 font-medium leading-relaxed bg-white/80 p-3 rounded border border-amber-200">
                    {evaluationResult.overallSummary}
                  </p>

                  {evaluationResult.criteriaScores && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                      {Object.entries(evaluationResult.criteriaScores).map(([k, v]) => (
                        <div key={k} className="bg-white p-2 rounded border border-amber-200">
                          <div className="text-amber-800 font-bold uppercase text-[9px]">{k}</div>
                          <div className="text-amber-950 font-semibold mt-0.5">{v}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {evaluationResult.corrections && evaluationResult.corrections.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-amber-200">
                      <span className="text-xs font-bold text-amber-950 block">✏️ 정밀 첨삭 및 교정 (Corrections):</span>
                      <div className="space-y-2">
                        {evaluationResult.corrections.map((cor, cIdx) => (
                          <div key={cIdx} className="bg-white p-3 rounded border border-amber-200 text-xs space-y-1">
                            <div className="text-red-700 line-through">원본: {cor.original}</div>
                            <div className="text-emerald-800 font-bold">교정: {cor.corrected}</div>
                            <div className="text-amber-900 text-[11px] italic">사유: {cor.reason}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {evaluationResult.strengths && evaluationResult.strengths.length > 0 && (
                    <div className="text-xs space-y-1 pt-1">
                      <span className="font-bold text-emerald-900">✅ 강점 (Strengths):</span>
                      <ul className="list-disc list-inside text-emerald-950 space-y-0.5">
                        {evaluationResult.strengths.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                  )}

                  {evaluationResult.improvements && evaluationResult.improvements.length > 0 && (
                    <div className="text-xs space-y-1 pt-1">
                      <span className="font-bold text-amber-900">💡 개선점 (Improvements):</span>
                      <ul className="list-disc list-inside text-amber-950 space-y-0.5">
                        {evaluationResult.improvements.map((im, i) => <li key={i}>{im}</li>)}
                      </ul>
                    </div>
                  )}

                  {evaluationResult.improvedEssay && (
                    <div className="bg-emerald-900 text-emerald-50 p-3.5 rounded text-xs space-y-1">
                      <span className="font-bold text-amber-300 block">✨ AI 완벽 교정 모범 답안:</span>
                      <p className="whitespace-pre-line font-serif leading-relaxed text-emerald-100">
                        {evaluationResult.improvedEssay}
                      </p>
                    </div>
                  )}
                </div>
              ) : showWritingSample && currentWritingQ.writingPrompt ? (
                <div className="bg-emerald-50/80 border border-emerald-200 p-5 rounded-sm space-y-4 animate-fadeIn">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                      Standard Model Answer (모범 답안)
                    </span>
                    <p className="text-xs font-semibold text-emerald-950 whitespace-pre-line leading-relaxed mt-1">
                      {currentWritingQ.writingPrompt.sampleAnswer}
                    </p>
                  </div>

                  <div className="border-t border-emerald-200 pt-3 space-y-2">
                    <span className="text-[11px] font-bold text-emerald-900 block">
                      🎯 Scoring Criteria Key Points (채점 키포인트):
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-xs text-emerald-900 font-medium">
                      {currentWritingQ.writingPrompt.keyPoints.map((pt, kIdx) => (
                        <li key={kIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-emerald-200 pt-3 text-xs text-emerald-800 leading-relaxed">
                    <strong>Tutor Note:</strong> {currentWritingQ.explanation}
                  </div>
                </div>
              ) : (
                <div className="bg-editorial-bg border border-editorial-border p-6 rounded-sm space-y-3 text-editorial-muted text-xs">
                  <h4 className="font-serif font-bold text-sm text-editorial-text flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-editorial-accent" />
                    <span>Writing Tip & AI Grading Guide</span>
                  </h4>
                  <p className="leading-relaxed">
                    답안 작성란에 답안을 입력하신 후 <strong>'AI 주관식 / 작문 채점받기'</strong>를 클릭하시면 15 크레딧이 사용되며, AI 감독관이 문법, 어휘, 문체, 원고지 정서법을 분석하여 정밀 점수와 교정안을 제공합니다.
                  </p>
                  <p className="leading-relaxed">
                    For Question 51 & 52, match the honorific level of the notice (~합니다 / ~바랍니다).
                  </p>
                  <p className="leading-relaxed">
                    For Question 53, write in neutral report style (~ㄴ다/는다) without using personal pronouns (나, 저) or colloquial endings (~해요).
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: Essential Vocab Bank */}
      {activeSection === 'vocab' && (
        <div className="bg-white border border-editorial-border rounded-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-editorial-border pb-4">
            <div>
              <h2 className="text-xl font-serif font-bold text-editorial-text">
                TOPIK Essential Vocabulary Bank
              </h2>
              <p className="text-xs text-editorial-muted">
                Master high-frequency vocabulary for TOPIK I and TOPIK II.
              </p>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-editorial-muted absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search word or meaning..."
                  value={vocabSearchTerm}
                  onChange={(e) => setVocabSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-editorial-border rounded-sm text-xs outline-none focus:border-editorial-accent bg-white"
                />
              </div>

              <select
                value={vocabLevelFilter}
                onChange={(e) => setVocabLevelFilter(e.target.value as any)}
                className="px-3 py-2 border border-editorial-border rounded-sm text-xs font-bold text-editorial-text bg-white outline-none cursor-pointer"
              >
                <option value="ALL">All Levels</option>
                <option value="TOPIK I">TOPIK I</option>
                <option value="TOPIK II">TOPIK II</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVocab.map((v) => (
              <div key={v.id} className="bg-editorial-bg border border-editorial-border p-4 rounded-sm space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-serif font-bold text-lg text-editorial-text">
                        {v.word}
                      </h4>
                      {v.hanja && (
                        <span className="text-xs font-mono text-editorial-muted bg-white border border-editorial-border px-1.5 py-0.5 rounded">
                          {v.hanja}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => speakKoreanText(v.word, { role: 'ai' })}
                      className="text-editorial-accent hover:text-editorial-text p-1 cursor-pointer"
                      title="Audio Pronunciation"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs font-bold text-editorial-accent">
                    {v.meaningEn} <span className="text-editorial-muted font-normal">({v.meaningKo})</span>
                  </p>
                </div>

                <div className="border-t border-editorial-border/60 pt-2 text-xs space-y-1">
                  <p className="font-semibold text-editorial-text">"{v.exampleKo}"</p>
                  <p className="text-editorial-muted italic">{v.exampleEn}</p>
                </div>

                <div className="pt-2 flex justify-between items-center text-[10px]">
                  <span className="bg-white border border-editorial-border px-2 py-0.5 rounded font-bold text-editorial-text">
                    {v.level}
                  </span>
                  <span className="text-editorial-muted font-mono">{v.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: Exam Overview & Passing Criteria */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-editorial-border rounded-sm p-6 space-y-3">
              <div className="w-10 h-10 rounded-sm bg-editorial-accent-light/60 text-editorial-accent flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-editorial-text">Reading (읽기)</h3>
              <p className="text-xs text-editorial-muted leading-relaxed">
                40 questions in 60 minutes for TOPIK I. Covers daily vocabulary, sentence completion, short notices, and paragraph comprehension.
              </p>
            </div>

            <div className="bg-white border border-editorial-border rounded-sm p-6 space-y-3">
              <div className="w-10 h-10 rounded-sm bg-editorial-accent-light/60 text-editorial-accent flex items-center justify-center">
                <Volume2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-editorial-text">Listening (듣기)</h3>
              <p className="text-xs text-editorial-muted leading-relaxed">
                30 questions in 40 minutes for TOPIK I. Covers situational dialogues, announcements, and conversational responses.
              </p>
            </div>

            <div className="bg-white border border-editorial-border rounded-sm p-6 space-y-3">
              <div className="w-10 h-10 rounded-sm bg-editorial-accent-light/60 text-editorial-accent flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-editorial-text">Passing Criteria</h3>
              <p className="text-xs text-editorial-muted leading-relaxed">
                Level 1 (80+ / 200 pts), Level 2 (140+ / 200 pts). TOPIK II (3~6급) includes Writing (쓰기) for up to 300 total score.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

