import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  Zap, 
  Volume2, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  HelpCircle,
  Clock,
  CheckCircle,
  Coins,
  Flame,
  BookmarkCheck
} from 'lucide-react';
import { speakKoreanText } from '../../utils/tts';
import { DailyQuizQuestion, getTodayQuizQuestions } from '../../data/dailyQuizData';

interface DailyQuizProps {
  onRewardCredits: (amount: number, description: string) => void;
  onAddXp: (amount: number) => void;
  onBackToOverview?: () => void;
}

export default function DailyQuiz({ onRewardCredits, onAddXp, onBackToOverview }: DailyQuizProps) {
  const [questions, setQuestions] = useState<DailyQuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [hasClaimedReward, setHasClaimedReward] = useState<boolean>(false);

  // Local storage key for daily completion tracking
  const todayKey = `talking_korean_daily_quiz_${new Date().toISOString().slice(0, 10)}`;

  useEffect(() => {
    const qList = getTodayQuizQuestions();
    setQuestions(qList);

    // Check if already completed today
    const savedState = localStorage.getItem(todayKey);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.completed) {
          setIsCompleted(true);
          setCorrectCount(parsed.correctCount || 5);
          setHasClaimedReward(true);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [todayKey]);

  if (questions.length === 0) {
    return (
      <div className="p-8 text-center bg-white border border-editorial-border rounded-sm">
        <p className="text-sm text-editorial-muted">Loading today's vocabulary review questions...</p>
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const progressPercent = Math.round(((currentIdx + (isAnswered ? 1 : 0)) / questions.length) * 100);

  const handleSelectOption = (idx: number) => {
    if (isAnswered || isCompleted) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    setUserAnswers(prev => ({ ...prev, [currentIdx]: idx }));

    const isCorrect = currentQ.options[idx]?.isCorrect;
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Completed quiz
      setIsCompleted(true);
      const earnedCredits = 15;
      const earnedXp = (correctCount + (selectedOption !== null && currentQ.options[selectedOption]?.isCorrect ? 1 : 0)) * 20;

      if (!hasClaimedReward) {
        onRewardCredits(earnedCredits, 'Completed 5-Question Daily Vocab Review (+15 Credits)');
        onAddXp(earnedXp);
        setHasClaimedReward(true);
        localStorage.setItem(todayKey, JSON.stringify({
          completed: true,
          correctCount: correctCount + (selectedOption !== null && currentQ.options[selectedOption]?.isCorrect ? 1 : 0),
          earnedCredits,
          date: new Date().toISOString()
        }));
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setUserAnswers({});
    setIsCompleted(false);
    setCorrectCount(0);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header Banner */}
      <div className="bg-white border border-editorial-border p-6 rounded-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-editorial-border pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 rounded-sm">
                Daily Booster
              </span>
              <span className="text-xs font-mono text-editorial-muted">
                {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-editorial-text">
              Daily Vocabulary Review Quiz
            </h2>
            <p className="text-xs text-editorial-muted">
              5 high-yield review questions based on your recent learning history (K-POP, Honorifics, TOPIK & Slang).
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-amber-50/80 border border-amber-200 px-3.5 py-2 rounded-sm self-start sm:self-center">
            <Coins className="w-4 h-4 text-amber-600" />
            <div>
              <p className="text-[10px] font-bold uppercase text-amber-800 tracking-wider">Completion Bonus</p>
              <p className="text-xs font-bold text-amber-950">+15 Credits & +100 XP</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-editorial-muted font-mono">
              Question {Math.min(currentIdx + 1, questions.length)} of {questions.length}
            </span>
            <span className="text-editorial-accent font-mono">{progressPercent}%</span>
          </div>
          <div className="w-full bg-editorial-bg border border-editorial-border h-2 rounded-sm overflow-hidden">
            <div 
              className="h-full bg-editorial-accent transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {!isCompleted ? (
        /* ACTIVE QUESTION CARD */
        <div className="bg-white border border-editorial-border p-6 rounded-sm space-y-6">
          
          {/* Question Topic & Category Badge */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-sm text-xs font-bold bg-editorial-bg border border-editorial-border text-editorial-text">
              <BookmarkCheck className="w-3.5 h-3.5 text-editorial-accent" />
              <span>{currentQ.sourceLabel}</span>
            </span>

            <button
              onClick={() => speakKoreanText(currentQ.targetWord || currentQ.contextSentenceKo || '')}
              className="px-2.5 py-1 text-xs font-bold text-editorial-muted hover:text-editorial-text border border-editorial-border rounded-sm hover:bg-editorial-bg flex items-center space-x-1.5 transition-colors cursor-pointer"
              title="Hear Native Pronunciation"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Listen</span>
            </button>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold font-serif text-editorial-text leading-snug">
              {currentQ.questionKo}
            </h3>
            <p className="text-xs text-editorial-muted">
              {currentQ.questionEn}
            </p>

            {/* Context sentence box if available */}
            {currentQ.contextSentenceKo && (
              <div className="mt-3 p-3 bg-editorial-bg border border-editorial-border rounded-sm space-y-1">
                <p className="text-xs font-bold font-serif text-editorial-text">
                  예문: {currentQ.contextSentenceKo}
                </p>
                <p className="text-[11px] text-editorial-muted italic">
                  {currentQ.contextSentenceEn}
                </p>
              </div>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-2.5 pt-2">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = "bg-white hover:bg-neutral-50 text-editorial-text border-editorial-border";

              if (isAnswered) {
                if (option.isCorrect) {
                  btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                } else if (isSelected && !option.isCorrect) {
                  btnStyle = "bg-rose-50 border-rose-400 text-rose-900 font-bold";
                } else {
                  btnStyle = "bg-neutral-50 border-neutral-200 text-neutral-400 opacity-60";
                }
              } else if (isSelected) {
                btnStyle = "bg-editorial-accent-light/40 border-editorial-accent text-editorial-text";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-3.5 text-left border rounded-sm transition-all flex items-center justify-between text-xs sm:text-sm cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold font-mono shrink-0">
                      {idx + 1}
                    </span>
                    <span>{option.text}</span>
                  </div>

                  {isAnswered && option.isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isSelected && !option.isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation Box */}
          {isAnswered && (
            <div className={`p-4 rounded-sm border space-y-2 animate-fadeIn ${
              currentQ.options[selectedOption || 0]?.isCorrect
                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                : 'bg-amber-50/70 border-amber-300 text-amber-950'
            }`}>
              <div className="flex items-center space-x-2">
                {currentQ.options[selectedOption || 0]?.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                )}
                <span className="text-xs font-bold uppercase tracking-wider">
                  {currentQ.options[selectedOption || 0]?.isCorrect ? '정답입니다! (Correct)' : '학습 팁 & 오답 노트 (Review Tip)'}
                </span>
              </div>
              <p className="text-xs leading-relaxed font-medium">
                {currentQ.explanationKo}
              </p>
              <p className="text-[11px] opacity-80 italic">
                {currentQ.explanationEn}
              </p>
              <div className="pt-2 border-t border-current/15 text-[11px] font-mono">
                💡 <span className="font-bold">Key Takeaway:</span> {currentQ.masteryTip}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between pt-4 border-t border-editorial-border">
            <span className="text-xs text-editorial-muted">
              {isAnswered ? 'Check explanation above and proceed' : 'Select an option to verify your memory'}
            </span>

            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-editorial-accent text-white text-xs font-bold rounded-sm flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs"
              >
                <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'Complete & Claim Credits'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* QUIZ COMPLETED SUMMARY CARD */
        <div className="bg-white border border-editorial-border p-8 rounded-sm text-center space-y-6">
          <div className="w-16 h-16 bg-amber-100 text-amber-700 border border-amber-300 rounded-full flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-widest rounded-sm border border-emerald-200">
              Daily Mission Cleared
            </span>
            <h3 className="text-2xl font-bold font-serif text-editorial-text">
              오늘의 데일리 퀴즈 완료!
            </h3>
            <p className="text-xs text-editorial-muted max-w-md mx-auto">
              You scored <span className="font-bold text-editorial-text">{correctCount} out of {questions.length}</span> correct on your past learning review.
            </p>
          </div>

          {/* Reward Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-sm flex items-center space-x-3 text-left">
              <div className="w-10 h-10 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Reward Claimed</p>
                <p className="text-sm font-bold text-amber-950">+15 AI Credits Added</p>
              </div>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-sm flex items-center space-x-3 text-left">
              <div className="w-10 h-10 rounded-full bg-neutral-200 text-neutral-800 flex items-center justify-center font-bold">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider">Experience Bonus</p>
                <p className="text-sm font-bold text-neutral-900">+{correctCount * 20} XP Earned</p>
              </div>
            </div>
          </div>

          {/* Questions Summary Accordion */}
          <div className="text-left border-t border-editorial-border pt-6 max-w-xl mx-auto space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-editorial-text">Questions Summary</p>
            <div className="space-y-2">
              {questions.map((q, i) => (
                <div key={q.id} className="p-3 bg-editorial-bg border border-editorial-border rounded-sm flex items-start justify-between text-xs gap-3">
                  <div className="space-y-0.5">
                    <p className="font-bold font-serif text-editorial-text">{i + 1}. {q.targetWord} ({q.romanized})</p>
                    <p className="text-[11px] text-editorial-muted">{q.sourceLabel}</p>
                  </div>
                  <button
                    onClick={() => speakKoreanText(q.targetWord)}
                    className="p-1 text-editorial-muted hover:text-editorial-text cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Button actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-editorial-border">
            <button
              onClick={handleRestart}
              className="px-4 py-2 border border-editorial-border text-editorial-text hover:bg-neutral-100 text-xs font-bold rounded-sm flex items-center space-x-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Practice</span>
            </button>

            {onBackToOverview && (
              <button
                onClick={onBackToOverview}
                className="px-6 py-2 bg-[#1A1A1A] hover:bg-editorial-accent text-white text-xs font-bold rounded-sm flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Back to Dashboard Overview</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
