import React, { useState } from 'react';
import { Award, CheckCircle2, ArrowRight, RotateCcw, Volume2, Trophy } from 'lucide-react';
import { speakKoreanText } from '../../utils/tts';

interface QuizQuestion {
  id: number;
  korean: string;
  romanized: string;
  options: string[];
  correct: number;
  explanation: string;
}

export default function WordsQuizMenu() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      korean: '사과',
      romanized: 'sagwa',
      options: ['Apple', 'Banana', 'Watermelon', 'Strawberry'],
      correct: 0,
      explanation: '"사과" means Apple. It also means "apology" depending on context!'
    },
    {
      id: 2,
      korean: '약국',
      romanized: 'yakguk',
      options: ['Hospital', 'Pharmacy', 'Supermarket', 'Post Office'],
      correct: 1,
      explanation: '"약" means medicine and "국" means dispensary/store → Pharmacy.'
    },
    {
      id: 3,
      korean: '비행기',
      romanized: 'bihaenggi',
      options: ['Subway', 'Taxi', 'Airplane', 'Bicycle'],
      correct: 2,
      explanation: '"비행기" is Airplane. "비행" means flight and "기" means machine.'
    },
    {
      id: 4,
      korean: '감사합니다',
      romanized: 'gamsahamnida',
      options: ['I am sorry', 'Thank you', 'Goodbye', 'Nice to meet you'],
      correct: 1,
      explanation: 'Formal Korean expression of gratitude.'
    },
    {
      id: 5,
      korean: '오늘',
      romanized: 'oneul',
      options: ['Yesterday', 'Tomorrow', 'Today', 'Weekend'],
      correct: 2,
      explanation: '"오늘" is Today. Yesterday is "어제" and Tomorrow is "내일".'
    },
    {
      id: 6,
      korean: '친구',
      romanized: 'chingu',
      options: ['Family', 'Friend', 'Teacher', 'Doctor'],
      correct: 1,
      explanation: '"친구" means Friend in Korean.'
    },
    {
      id: 7,
      korean: '도서관',
      romanized: 'doseogwan',
      options: ['Library', 'Restaurant', 'School', 'Café'],
      correct: 0,
      explanation: '"도서관" means Library where books are stored and read.'
    },
    {
      id: 8,
      korean: '지하철',
      romanized: 'jihacheol',
      options: ['Bus', 'Train', 'Subway / Underground', 'Airport'],
      correct: 2,
      explanation: '"지하철" refers to Seoul’s rapid subway system.'
    }
  ];

  const currentQ = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);
    if (idx === currentQ.correct) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setScore(0);
    setStreak(0);
    setIsAnswered(false);
    setIsCompleted(false);
  };

  const handleSpeakText = (text: string) => {
    speakKoreanText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-editorial-border rounded-sm p-6 space-y-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-sm bg-editorial-accent-light/50 text-editorial-accent flex items-center justify-center font-bold">
            <span>🧩</span>
          </div>
          <h2 className="text-xl font-serif font-bold text-editorial-text">Words Quiz (단어 퀴즈)</h2>
        </div>
        <p className="text-xs text-editorial-muted leading-relaxed">
          Test your vocabulary recall with quick multiple-choice challenges. Maintain a winning streak to earn extra XP!
        </p>
      </div>

      {!isCompleted ? (
        <div className="bg-white border border-editorial-border rounded-sm p-6 sm:p-8 space-y-6 max-w-3xl mx-auto">
          {/* Top Info */}
          <div className="flex justify-between items-center border-b border-editorial-border pb-3">
            <span className="text-xs font-bold text-editorial-accent uppercase tracking-widest">
              Question {currentIdx + 1} of {questions.length}
            </span>
            <div className="flex items-center space-x-4 text-xs font-bold">
              <span className="text-amber-600">🔥 {streak} Streak</span>
              <span className="text-editorial-text">Score: {score}</span>
            </div>
          </div>

          {/* Question Word */}
          <div className="text-center py-6 space-y-2 bg-editorial-bg border border-editorial-border rounded-sm">
            <h3 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-text">
              {currentQ.korean}
            </h3>
            <p className="text-xs font-bold text-editorial-accent uppercase tracking-widest">
              ({currentQ.romanized})
            </p>
            <button
              onClick={() => handleSpeakText(currentQ.korean)}
              className="mt-2 inline-flex items-center space-x-1 text-xs text-editorial-muted hover:text-editorial-text cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Hear Pronunciation</span>
            </button>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, idx) => {
              let btnStyle = "bg-white border-editorial-border hover:bg-editorial-accent-light/40 text-editorial-text";
              if (isAnswered) {
                if (idx === currentQ.correct) {
                  btnStyle = "bg-emerald-600 text-white border-emerald-700 font-bold";
                } else if (idx === selectedAnswer) {
                  btnStyle = "bg-rose-600 text-white border-rose-700 font-bold";
                }
              } else if (selectedAnswer === idx) {
                btnStyle = "border-editorial-accent bg-editorial-accent-light/50 font-bold";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`p-4 rounded-sm border text-left text-base font-serif transition-all cursor-pointer ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="p-4 rounded-sm bg-editorial-accent-light/40 border border-editorial-border space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-editorial-text uppercase">
                  <CheckCircle2 className="w-4 h-4 text-editorial-accent" />
                  <span>{selectedAnswer === currentQ.correct ? 'Correct! 정답입니다!' : 'Incorrect'}</span>
                </div>
                <button
                  onClick={handleNext}
                  className="px-5 py-2 bg-editorial-text hover:bg-editorial-accent text-white rounded-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center space-x-1"
                >
                  <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-editorial-muted">
                {currentQ.explanation}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border border-editorial-border rounded-sm p-8 text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-editorial-accent-light/60 text-editorial-accent mx-auto flex items-center justify-center">
            <Trophy className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold text-editorial-accent uppercase tracking-widest">
              Quiz Completed
            </span>
            <h2 className="text-3xl font-serif font-bold text-editorial-text">
              Final Score: {score} / {questions.length}
            </h2>
            <p className="text-sm text-editorial-muted">
              {score >= 6
                ? 'Excellent work! You have a strong command of daily Korean vocabulary.'
                : 'Good practice! Revisit the Daily Phrases and Hangul Alphabet menus to strengthen your recall.'}
            </p>
          </div>

          <div>
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-editorial-text hover:bg-editorial-accent text-white rounded-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Another Round</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
