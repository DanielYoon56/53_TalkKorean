import React, { useState } from 'react';
import { Award, CheckCircle2, ArrowRight, RotateCcw, Sparkles, Filter, BookOpen, Target } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Question {
  id: number;
  stage: 'Beginner' | 'Elementary' | 'Intermediate' | 'Advanced';
  levelTag: string;
  questionKo: string;
  questionEn: string;
  options: string[];
  correct: number;
  explanation: string;
}

type StageFilter = 'All' | 'Beginner' | 'Elementary' | 'Intermediate' | 'Advanced';

export default function LevelTest() {
  const [selectedStage, setSelectedStage] = useState<StageFilter>('All');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const allQuestions: Question[] = [
    // --- 1. Beginner (초급 기초 - TOPIK Level 1) ---
    {
      id: 1,
      stage: 'Beginner',
      levelTag: 'Beginner • Basic Vocabulary',
      questionKo: '다음 단어의 뜻으로 알맞은 것은? "사과"',
      questionEn: 'What is the correct English meaning of the Korean word "사과"?',
      options: ['Apple', 'Banana', 'Watermelon', 'Strawberry'],
      correct: 0,
      explanation: '"사과" (sagwa) means Apple in Korean. (It can also mean "apology" depending on context!)'
    },
    {
      id: 2,
      stage: 'Beginner',
      levelTag: 'Beginner • Topic Particle',
      questionKo: '빈칸에 들어갈 알맞은 조사를 고르세요: "저(   ) 학생입니다."',
      questionEn: 'Choose the correct topic particle for the blank: "As for me, I am a student."',
      options: ['는 (neun)', '이 (i)', '를 (reul)', '에서 (eseo)'],
      correct: 0,
      explanation: '"저" ends with a vowel (ㅓ), so the topic particle "는" is used.'
    },
    {
      id: 3,
      stage: 'Beginner',
      levelTag: 'Beginner • Essential Greetings',
      questionKo: '처음 만난 사람에게 하는 올바른 인사말은?',
      questionEn: 'Which expression is the most appropriate formal greeting when meeting someone for the first time?',
      options: [
        '만나서 반갑습니다. (Nice to meet you.)',
        '잘 먹겠습니다. (I will enjoy the meal.)',
        '다녀오겠습니다. (I will be back.)',
        '실례합니다. (Excuse me.)'
      ],
      correct: 0,
      explanation: '"만나서 반갑습니다" is the standard polite greeting when meeting someone for the first time.'
    },

    // --- 2. Elementary (초급 응용 - TOPIK Level 2) ---
    {
      id: 4,
      stage: 'Elementary',
      levelTag: 'Elementary • Present Conjugation',
      questionKo: '빈칸에 알맞은 형태를 고르세요: "저는 지금 커피를 (   )."',
      questionEn: 'Choose the correct verb conjugation: "I am drinking coffee right now."',
      options: ['마셔요 (masyeoyo)', '마셨어요 (masyeosseoyo)', '마실 거예요 (masil geoyeyo)', '마십시다 (masipsida)'],
      correct: 0,
      explanation: '"마시다" (to drink) in the polite present tense contracts from "마시 + 어요" to "마셔요".'
    },
    {
      id: 5,
      stage: 'Elementary',
      levelTag: 'Elementary • Practical Survival Dialogue',
      questionKo: '식당에서 음식을 다 먹고 계산할 때 알맞은 표현은?',
      questionEn: 'Which expression is most natural when asking for the bill/price at a Korean restaurant or market?',
      options: [
        '이거 얼마예요? (How much is this?)',
        '물 좀 더 주세요. (More water please.)',
        '메뉴판 어디에 있어요? (Where is the menu?)',
        '다시 말씀해 주세요. (Please say that again.)'
      ],
      correct: 0,
      explanation: '"이거 얼마예요?" (How much is this?) or "계산해 주세요" is used when asking for the total cost.'
    },
    {
      id: 6,
      stage: 'Elementary',
      levelTag: 'Elementary • Past Tense & Time Words',
      questionKo: '빈칸에 알맞은 단어는? "저는 (   ) 친구와 영화를 봤어요."',
      questionEn: 'Choose the appropriate time word: "I watched a movie with my friend _____."',
      options: ['어제 (Yesterday)', '내일 (Tomorrow)', '다음 주 (Next week)', '지금 (Right now)'],
      correct: 0,
      explanation: 'The verb "봤어요" is in the past tense, so it pairs naturally with "어제" (yesterday).'
    },

    // --- 3. Intermediate (중급 - TOPIK Level 3~4) ---
    {
      id: 7,
      stage: 'Intermediate',
      levelTag: 'Intermediate • Honorific Forms (존댓말)',
      questionKo: '할머니께 말씀드릴 때 올바른 높임말 문장은?',
      questionEn: 'Which sentence uses correct honorific grammar when speaking about your grandmother?',
      options: [
        '할머니께서 책을 읽으십니다.',
        '할머니가 책을 읽는다.',
        '할머니께서 책을 읽어라.',
        '할머니가 책을 읽어.'
      ],
      correct: 0,
      explanation: 'When speaking about elders, use the subject honorific marker "-께서" and the honorific verb suffix "-시-" ("읽으십니다").'
    },
    {
      id: 8,
      stage: 'Intermediate',
      levelTag: 'Intermediate • Connectives (이유/원인)',
      questionKo: '빈칸에 들어갈 알맞은 연결 어미는? "날씨가 추웠(   ) 코트를 입었다."',
      questionEn: 'Choose the correct connective showing cause/reason: "Because the weather was cold, I wore a coat."',
      options: [
        '기 때문에 (because)',
        '지만 (even though)',
        '는 데도 (despite)',
        '자마자 (as soon as)'
      ],
      correct: 0,
      explanation: '"-기 때문에" clearly expresses cause/reason ("because it was cold").'
    },
    {
      id: 9,
      stage: 'Intermediate',
      levelTag: 'Intermediate • Indirect Speech (간접화법)',
      questionKo: '친구가 내일 서울에 간다고 했을 때 이를 다른 사람에게 전하는 말로 알맞은 것은?',
      questionEn: 'How do you correctly report what your friend said ("I am going to Seoul tomorrow") using indirect speech?',
      options: [
        '친구가 내일 서울에 간다고 해요.',
        '친구가 내일 서울에 가라고 해요.',
        '친구가 내일 서울에 가자고 해요.',
        '친구가 내일 서울에 가냐고 해요.'
      ],
      correct: 0,
      explanation: '"-ㄴ/는다고 하다" is used to quote/report someone else’s statement (평서문 간접화법).'
    },

    // --- 4. Advanced (고급 - TOPIK Level 5~6) ---
    {
      id: 10,
      stage: 'Advanced',
      levelTag: 'Advanced • Advanced Connectives & Nuance',
      questionKo: '다음 괄호에 알맞은 표현은? "많은 노력을 했(   ) 기대한 만큼의 결과를 얻지 못했다."',
      questionEn: 'Choose the advanced connective expressing strong contrast: "Despite having made a great effort, I did not obtain the expected results."',
      options: [
        '음에도 불구하고 (-eum-edo bulguhago)',
        '기에 망정이지 (-gie mangjeong-iji)',
        'ㄹ 뿐만 아니라 (-l ppun-man anira)',
        '는 탓에 (-neun tase)'
      ],
      correct: 0,
      explanation: '"-음에도 불구하고" is an advanced formal expression meaning "in spite of / despite the fact that..."'
    },
    {
      id: 11,
      stage: 'Advanced',
      levelTag: 'Advanced • Korean Idioms (관용어)',
      questionKo: '다음 관용어 "발이 넓다"의 올바른 의미는?',
      questionEn: 'What is the true meaning of the Korean idiom "발이 넓다" (literally: "to have wide feet")?',
      options: [
        '아는 사람이 많고 사교 관계가 넓다 (To have a wide network of acquaintances)',
        '걸음걸이가 매우 빠르다 (To walk very fast)',
        '발 사이즈가 크다 (To wear a large shoe size)',
        '여행을 자주 다닌다 (To travel frequently)'
      ],
      correct: 0,
      explanation: '"발이 넓다" is an idiomatic expression meaning a person is well-connected and knows many people.'
    },
    {
      id: 12,
      stage: 'Advanced',
      levelTag: 'Advanced • Academic & Media Vocabulary',
      questionKo: '다음 문장의 괄호에 알맞은 한자어는? "최근 친환경 에너지 개발의 중요성이 점차 (   )되고 있다."',
      questionEn: 'Choose the academic Sino-Korean word: "Recently, the importance of green energy development is gradually being ________."',
      options: [
        '대두 (emerging/coming to the fore)',
        '단절 (severing)',
        '왜곡 (distorting)',
        '방치 (neglecting)'
      ],
      correct: 0,
      explanation: '"대두되다" (대두) means for a significant issue or topic to emerge and gain prominence in academic or news contexts.'
    }
  ];

  const filteredQuestions = selectedStage === 'All'
    ? allQuestions
    : allQuestions.filter(q => q.stage === selectedStage);

  const currentQ = filteredQuestions[currentQIndex] || filteredQuestions[0];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);
    if (idx === currentQ.correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < filteredQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = (stage?: StageFilter) => {
    if (stage) setSelectedStage(stage);
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsFinished(false);
    setIsAnswered(false);
  };

  // Diagnostic 4-stage calculation
  const getLevelResult = () => {
    const total = filteredQuestions.length;
    const ratio = score / total;

    if (selectedStage !== 'All') {
      if (ratio >= 0.7) {
        return {
          stageKo: `${selectedStage} 단계 통과 (Passed)`,
          level: `TOPIK Proficiency • ${selectedStage}`,
          desc: `훌륭합니다! ${selectedStage} 단계의 문법과 어휘를 잘 숙지하고 있습니다. 다음 상위 레벨에 도전해 보세요!`,
          badgeColor: 'bg-emerald-600 text-white'
        };
      }
      return {
        stageKo: `${selectedStage} 단계 복습 권장 (Needs Practice)`,
        level: `${selectedStage} In Progress`,
        desc: `${selectedStage} 단계의 핵심 개념을 조금 더 복습하면 완벽해질 거예요! 오답 해설을 확인해 보세요.`,
        badgeColor: 'bg-amber-600 text-white'
      };
    }

    // 4-stage diagnostic scale for 'All' (12 questions: 3 Beginner, 3 Elementary, 3 Intermediate, 3 Advanced)
    if (score >= 10) {
      return {
        stageKo: '4단계 • Advanced (고급)',
        level: 'TOPIK Level 5-6 (Advanced)',
        desc: '놀랍습니다! 고급 관용어, 학술 어휘, 복잡한 연결 어미까지 구사할 수 있는 최고 수준(Advanced)입니다.',
        badgeColor: 'bg-purple-600 text-white'
      };
    }
    if (score >= 7) {
      return {
        stageKo: '3단계 • Intermediate (중급)',
        level: 'TOPIK Level 3-4 (Intermediate)',
        desc: '훌륭합니다! 높임말과 간접화법 등 한국어의 다양한 표현을 자연스럽게 활용할 수 있는 중급(Intermediate) 레벨입니다.',
        badgeColor: 'bg-blue-600 text-white'
      };
    }
    if (score >= 4) {
      return {
        stageKo: '2단계 • Elementary (초급 응용)',
        level: 'TOPIK Level 2 (Elementary)',
        desc: '잘하고 계십니다! 일상 대화, 과거/현재형 동사 변화, 기본 연결어미를 활용할 수 있는 응용 초급(Elementary) 단계입니다.',
        badgeColor: 'bg-emerald-600 text-white'
      };
    }
    return {
      stageKo: '1단계 • Beginner (초급 기초)',
      level: 'TOPIK Level 1 (Beginner)',
      desc: '한국어 입문을 환영합니다! 한글 기초 어휘와 은/는/이/가 기본 조사를 익혀나가는 기초 초급(Beginner) 단계입니다.',
      badgeColor: 'bg-amber-600 text-white'
    };
  };

  const stagesInfo = [
    { id: 'Beginner', titleKo: '1단계: Beginner (초급 기초)', topik: 'TOPIK Level 1', desc: '한글 읽기, 기초 명사, 은/는/이/가 기본 조사' },
    { id: 'Elementary', titleKo: '2단계: Elementary (초급 응용)', topik: 'TOPIK Level 2', desc: '과거/현재 시제(-아요/어요), 식당/쇼핑 생활 회화' },
    { id: 'Intermediate', titleKo: '3단계: Intermediate (중급)', topik: 'TOPIK Level 3-4', desc: '높임말(-시-), 이유/원인 연결어미, 간접화법(-다고 하다)' },
    { id: 'Advanced', titleKo: '4단계: Advanced (고급)', topik: 'TOPIK Level 5-6', desc: '고급 관용어/속담, 학술 한자어, 미묘한 대비 어미' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 text-left">
      {/* Billboard */}
      <div className="bg-[#1A1A1A] border border-editorial-border rounded-sm p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-editorial-accent/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-editorial-accent text-white px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest">
              Level Test
            </span>
            <span className="bg-white/10 text-editorial-accent-light border border-white/20 px-2.5 py-0.5 rounded-sm text-[10px] font-bold">
              4-Stage Proficiency System
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
            Korean Proficiency Diagnostic
          </h1>
          <p className="text-editorial-accent-light text-sm sm:text-base leading-relaxed">
            진단 테스트는 <strong className="text-white font-semibold">Beginner, Elementary, Intermediate, Advanced</strong> 4단계로 구성되어 있습니다. 전체 종합 진단(All Levels)을 보거나 특정 단계별로 실력을 검증해 보세요.
          </p>
        </div>
      </div>

      {/* 4-Stage Summary Cards & Stage Selector */}
      <div className="bg-white border border-editorial-border rounded-sm p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-editorial-border pb-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-editorial-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-editorial-text font-serif">
              Select Diagnostic Mode (진단 모드 선택)
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'All', labelKo: '전체 종합 진단', labelEn: 'All 4 Stages (12 Qs)' },
              { id: 'Beginner', labelKo: 'Beginner', labelEn: '초급 기초' },
              { id: 'Elementary', labelKo: 'Elementary', labelEn: '초급 응용' },
              { id: 'Intermediate', labelKo: 'Intermediate', labelEn: '중급' },
              { id: 'Advanced', labelKo: 'Advanced', labelEn: '고급' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleRestart(tab.id as StageFilter)}
                className={`px-3.5 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                  selectedStage === tab.id
                    ? 'bg-editorial-text text-white shadow-sm'
                    : 'bg-editorial-bg border border-editorial-border text-editorial-text hover:bg-editorial-accent-light/40'
                }`}
              >
                <span>{tab.labelKo}</span>
                <span className="opacity-70 block text-[9px] font-normal">{tab.labelEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4-Stage Overview Mini Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          {stagesInfo.map((st) => (
            <div
              key={st.id}
              onClick={() => handleRestart(st.id as StageFilter)}
              className={`p-3 rounded-sm border transition-all cursor-pointer ${
                selectedStage === st.id
                  ? 'bg-editorial-accent-light/30 border-editorial-accent shadow-sm'
                  : 'bg-editorial-bg border-editorial-border hover:border-editorial-accent/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-editorial-accent uppercase tracking-wider">{st.topik}</span>
                {selectedStage === st.id && (
                  <span className="w-2 h-2 rounded-full bg-editorial-accent"></span>
                )}
              </div>
              <h3 className="text-xs font-serif font-bold text-editorial-text">{st.titleKo}</h3>
              <p className="text-[11px] text-editorial-muted mt-1 leading-snug">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-white border border-editorial-border rounded-sm p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-editorial-border pb-3">
            <span className="text-xs font-bold text-editorial-accent uppercase tracking-wider">
              Question {currentQIndex + 1} of {filteredQuestions.length} • {currentQ.levelTag}
            </span>
            <div className="flex items-center space-x-3 text-xs font-bold">
              <span className="text-editorial-muted">Current Score:</span>
              <span className="px-2.5 py-0.5 rounded-sm bg-editorial-accent-light/50 text-editorial-accent">
                {score} / {currentQIndex + (isAnswered ? 1 : 0)}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-editorial-text leading-snug">
              {currentQ.questionKo}
            </h2>
            <p className="text-sm text-editorial-muted italic">
              {currentQ.questionEn}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              let btnStyle = "border-editorial-border bg-editorial-bg hover:bg-editorial-accent-light/30 text-editorial-text";
              if (isAnswered) {
                if (idx === currentQ.correct) {
                  btnStyle = "bg-emerald-600 text-white border-emerald-700 font-bold shadow-sm";
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
                  className={`p-4 rounded-sm border text-left transition-all cursor-pointer font-serif text-base ${btnStyle}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt}</span>
                    {isAnswered && idx === currentQ.correct && (
                      <span className="text-xs font-bold uppercase tracking-wider">✓ Correct</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="p-4 rounded-sm bg-editorial-accent-light/40 border border-editorial-border space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 font-bold text-sm text-editorial-text">
                  <CheckCircle2 className="w-4 h-4 text-editorial-accent" />
                  <span>Grammar & Vocab Explanation (해설)</span>
                </div>
                <button
                  onClick={handleNext}
                  className="px-5 py-2 bg-editorial-text hover:bg-editorial-accent text-white rounded-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center space-x-1.5"
                >
                  <span>{currentQIndex < filteredQuestions.length - 1 ? 'Next Question' : 'View Diagnostic Results'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-editorial-text leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border border-editorial-border rounded-sm p-8 sm:p-10 text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-editorial-accent-light/60 text-editorial-accent mx-auto flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <span className={`inline-block px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest ${getLevelResult().badgeColor}`}>
              {getLevelResult().stageKo}
            </span>
            <h2 className="text-3xl font-serif font-bold text-editorial-text">
              {getLevelResult().level}
            </h2>
            <p className="text-sm text-editorial-muted max-w-md mx-auto leading-relaxed">
              {getLevelResult().desc}
            </p>
          </div>

          <div className="p-5 bg-editorial-bg border border-editorial-border rounded-sm inline-block px-10">
            <p className="text-xs text-editorial-muted font-bold uppercase tracking-widest">Final Diagnostic Score</p>
            <p className="text-3xl font-serif font-bold text-editorial-text mt-1">
              {score} <span className="text-base font-normal text-editorial-muted">/ {filteredQuestions.length}</span>
            </p>
          </div>

          {/* Re-test Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleRestart('All')}
              className="px-6 py-3 bg-editorial-text hover:bg-editorial-accent text-white rounded-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake All 4 Stages (전체 진단)</span>
            </button>

            <button
              onClick={() => handleRestart(selectedStage)}
              className="px-5 py-3 bg-white hover:bg-editorial-accent-light/40 border border-editorial-border text-editorial-text rounded-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Retry Current Stage ({selectedStage})</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

