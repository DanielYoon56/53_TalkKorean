import React, { useState, useEffect, useRef } from 'react';
import { speakKoreanText, initSpeechVoices } from '../../utils/tts';
import { 
  BRANCHING_SCENARIOS, 
  BranchingScenario, 
  DialogueNode, 
  DialogueChoice, 
  DialogueEnding,
  getNode3CRBreakdown
} from '../../data/dialogueTrees';
import { 
  Volume2, VolumeX, RotateCcw, 
  AlertCircle, ChevronRight, Sliders, MapPin, 
  Trophy, ArrowRight, Lightbulb, Coins, PlusCircle,
  Check, Sparkles, ArrowLeft, Mic, MicOff,
  BookOpen, Star, Award, Compass, HelpCircle
} from 'lucide-react';

export interface HistoryTurn {
  nodeId: string;
  speakerRoleKo: string;
  speakerRoleEn: string;
  aiMessageKo: string;
  aiMessageRomanized: string;
  aiMessageEn: string;
  sceneNoteKo?: string;
  selectedChoice?: DialogueChoice;
}

export interface ScenarioConversationMenuProps {
  credits?: number;
  onSpendCredits?: (amount: number, description: string) => boolean;
  onOpenCreditModal?: () => void;
  onAddXp?: (xp: number) => void;
}

export type SubtitleMode = 'full' | 'ko-en' | 'ko-only';

const CONVERSATION_COST = 3; // 3 Credits per session

function getSpeakerEmoji(scenarioId: string, roleKo: string = ''): string {
  if (scenarioId.includes('taxi') || roleKo.includes('기사')) return '🚕';
  if (scenarioId.includes('cafe') || roleKo.includes('바리스타') || roleKo.includes('카페')) return '☕';
  if (scenarioId.includes('restaurant') || roleKo.includes('식당') || roleKo.includes('음식점')) return '🍲';
  if (scenarioId.includes('convenience') || roleKo.includes('편의점')) return '🏪';
  if (scenarioId.includes('subway') || roleKo.includes('역무원')) return '🚇';
  if (scenarioId.includes('pharmacy') || roleKo.includes('약사')) return '💊';
  if (scenarioId.includes('market') || roleKo.includes('상인') || roleKo.includes('이모님')) return '🍎';
  if (scenarioId.includes('noraebang') || roleKo.includes('노래방')) return '🎤';
  if (scenarioId.includes('bbq') || roleKo.includes('삼겹살') || roleKo.includes('고기')) return '🥩';
  if (scenarioId.includes('intro') || roleKo.includes('친구') || roleKo.includes('민지') || roleKo.includes('민준')) return '🙋';
  return '💬';
}

export default function AiConversationMenu({
  credits = 0,
  onSpendCredits,
  onOpenCreditModal,
  onAddXp
}: ScenarioConversationMenuProps = {}) {
  // Scenario Selection State
  const [isScenarioSelected, setIsScenarioSelected] = useState<boolean>(false);
  const [activeScenarioId, setActiveScenarioId] = useState<string>('taxi');
  const [activeCategory, setActiveCategory] = useState<'all' | 'travel' | 'food' | 'lifestyle' | 'social'>('all');

  // Active Dialogue Tree State
  const [currentNodeId, setCurrentNodeId] = useState<string>('taxi_root');
  const [history, setHistory] = useState<HistoryTurn[]>([]);
  const [selectedEnding, setSelectedEnding] = useState<DialogueEnding | null>(null);

  // Common UI State
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [subtitleMode, setSubtitleMode] = useState<SubtitleMode>('full');
  const [autoSpeak, setAutoSpeak] = useState<boolean>(true);
  const [showSpeedPanel, setShowSpeedPanel] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [micSupported, setMicSupported] = useState<boolean>(true);
  const [voicePracticingChoiceId, setVoicePracticingChoiceId] = useState<string | null>(null);
  const [voiceMatchResult, setVoiceMatchResult] = useState<string | null>(null);

  // Track scenarios unlocked with credits (taxi, convenience, intro are free preview)
  const [unlockedScenarios, setUnlockedScenarios] = useState<Record<string, boolean>>({
    taxi: true,
    convenience: true,
    intro: true
  });
  const [creditError, setCreditError] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const speakTimeoutRef = useRef<any>(null);

  const currentScenario = BRANCHING_SCENARIOS.find(s => s.id === activeScenarioId) || BRANCHING_SCENARIOS[0];
  const currentNode: DialogueNode = currentScenario.nodes[currentNodeId] || currentScenario.nodes[currentScenario.rootNodeId];
  const lastTurn = history.length > 0 ? history[history.length - 1] : undefined;
  const current3CR = getNode3CRBreakdown(currentScenario, currentNode, lastTurn?.selectedChoice);
  const speakerEmoji = getSpeakerEmoji(activeScenarioId, currentScenario.roleKo);

  // Preload speech synthesis voices
  useEffect(() => {
    initSpeechVoices();
  }, []);

  // Initialize Speech Recognition for practice
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
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0]?.[0]?.transcript || '';
        setVoiceMatchResult(`인식된 발음: "${transcript}"`);
        setIsListening(false);
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

  // Auto scroll chat to bottom when dialogue progresses
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [currentNodeId, history, selectedEnding]);

  const handleSpeakText = (text: string, role: 'ai' | 'user' = 'ai', forceImmediate: boolean = false) => {
    speakKoreanText(text, {
      role,
      rate: speechRate,
      forceImmediate
    });
  };

  const checkAndDeductCredits = (scenarioId: string): boolean => {
    if (unlockedScenarios[scenarioId]) {
      return true;
    }

    if (onSpendCredits) {
      const targetScenario = BRANCHING_SCENARIOS.find(s => s.id === scenarioId);
      const desc = `실전 시나리오 회화 (${targetScenario?.titleKo || '시나리오'}) (-${CONVERSATION_COST} CR)`;
      const success = onSpendCredits(CONVERSATION_COST, desc);
      if (!success) {
        setCreditError(`시나리오 세션 시작을 위해 ${CONVERSATION_COST} 크레딧(CR)이 필요합니다. 크레딧을 충전해 주세요.`);
        return false;
      }
    } else if (credits < CONVERSATION_COST) {
      setCreditError(`보유 크레딧이 부족합니다 (${credits} / ${CONVERSATION_COST} CR).`);
      return false;
    }

    setUnlockedScenarios(prev => ({ ...prev, [scenarioId]: true }));
    setCreditError(null);
    return true;
  };

  const handleSelectScenario = (scenarioId: string) => {
    const ok = checkAndDeductCredits(scenarioId);
    if (!ok) return;

    setActiveScenarioId(scenarioId);
    setIsScenarioSelected(true);
    startScenario(scenarioId);
  };

  const startScenario = (scenarioId: string) => {
    if (speakTimeoutRef.current) {
      clearTimeout(speakTimeoutRef.current);
      speakTimeoutRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const scenario = BRANCHING_SCENARIOS.find(s => s.id === scenarioId) || BRANCHING_SCENARIOS[0];
    setCurrentNodeId(scenario.rootNodeId);
    setHistory([]);
    setSelectedEnding(null);
    setVoiceMatchResult(null);
    setVoicePracticingChoiceId(null);
    setCreditError(null);

    const rootNode = scenario.nodes[scenario.rootNodeId];
    if (autoSpeak && rootNode) {
      speakTimeoutRef.current = setTimeout(() => {
        handleSpeakText(rootNode.aiMessageKo, 'ai', true);
      }, 400);
    }
  };

  const handleSelectChoice = (choice: DialogueChoice) => {
    if (speakTimeoutRef.current) {
      clearTimeout(speakTimeoutRef.current);
      speakTimeoutRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // 1. Add current turn to history
    const turn: HistoryTurn = {
      nodeId: currentNodeId,
      speakerRoleKo: currentNode.speakerRoleKo,
      speakerRoleEn: currentNode.speakerRoleEn,
      aiMessageKo: currentNode.aiMessageKo,
      aiMessageRomanized: currentNode.aiMessageRomanized,
      aiMessageEn: currentNode.aiMessageEn,
      sceneNoteKo: currentNode.sceneNoteKo || currentNode.sceneNote,
      selectedChoice: choice
    };
    setHistory(prev => [...prev, turn]);

    // 2. Play learner speech if autoSpeak
    if (autoSpeak) {
      handleSpeakText(choice.textKo, 'user', true);
    }

    // 3. Move to next node
    const nextNode = currentScenario.nodes[choice.nextNodeId];
    if (nextNode) {
      setCurrentNodeId(choice.nextNodeId);
      setVoiceMatchResult(null);
      setVoicePracticingChoiceId(null);

      // Check ending
      if (nextNode.isEnding && nextNode.endingSummary) {
        setSelectedEnding(nextNode.endingSummary);
        if (onAddXp) {
          onAddXp(nextNode.endingSummary.xpEarned || 50);
        }
      }

      // Auto play partner speech after learner finished
      if (autoSpeak) {
        speakTimeoutRef.current = setTimeout(() => {
          handleSpeakText(nextNode.aiMessageKo, 'ai', false);
        }, 800);
      }
    }
  };

  const handleStepBack = () => {
    if (history.length === 0) return;
    const previousTurns = [...history];
    const last = previousTurns.pop();
    if (last) {
      setHistory(previousTurns);
      setCurrentNodeId(last.nodeId);
      setSelectedEnding(null);
      setVoiceMatchResult(null);
      setVoicePracticingChoiceId(null);
    }
  };

  const toggleMicForChoice = (choice: DialogueChoice) => {
    if (!recognitionRef.current) return;
    if (isListening && voicePracticingChoiceId === choice.id) {
      recognitionRef.current.stop();
      setIsListening(false);
      setVoicePracticingChoiceId(null);
    } else {
      setVoicePracticingChoiceId(choice.id);
      setVoiceMatchResult(null);
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch {
        setIsListening(false);
      }
    }
  };

  // 1. SCENARIO BROWSER VIEW (when no scenario is selected)
  if (!isScenarioSelected) {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        {/* Billboard Hero Header */}
        <div className="bg-[#1A1A1A] text-white rounded-xl p-5 sm:p-7 border border-neutral-800 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>실전 시나리오 인터랙티브 회화</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-800 text-neutral-300 border border-neutral-700">
                  10대 현지 상황 수록
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  3CR 심층 성찰 학습
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                실전 시나리오 회화 (Interactive Scenario Dialogue)
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl font-sans">
                택시 타기부터 편의점 행사, 감성 카페 주문, 고깃집 리필, 지하철 환승, 약국 증상 상담까지—검증된 10대 한국 실생활 시나리오에서 선택지마다 상대방의 반응과 뉘앙스를 배우는 인터랙티브 분기 회화입니다.
              </p>
            </div>

            {/* Credit status card */}
            <div className="bg-neutral-900 border border-neutral-700/80 rounded-lg p-3 sm:p-4 flex flex-col items-center justify-center shrink-0 min-w-[150px] shadow-xs">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                Available Credits
              </span>
              <div className="flex items-center space-x-1.5 my-1">
                <Coins className="w-4 h-4 text-amber-400" />
                <span className="text-lg sm:text-xl font-bold font-mono text-amber-300">
                  {credits} <span className="text-xs font-normal text-neutral-400">CR</span>
                </span>
              </div>
              {onOpenCreditModal && (
                <button
                  onClick={onOpenCreditModal}
                  className="mt-1 text-[10px] px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <PlusCircle className="w-3 h-3" />
                  <span>Add Credits</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-neutral-400 font-mono">
              카테고리 분류 (Category Filter):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All (전체 10개)' },
                { id: 'travel', label: '🚗 교통·이동 (2)' },
                { id: 'food', label: '🍲 음식·카페 (4)' },
                { id: 'lifestyle', label: '🏪 일상·생활 (3)' },
                { id: 'social', label: '🤝 소셜·모임 (1)' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-amber-400 text-black font-extrabold shadow-xs'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Credit error alert */}
        {creditError && (
          <div className="p-3 bg-rose-950/80 border border-rose-600/60 rounded-lg text-rose-200 text-xs flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{creditError}</span>
            </div>
            {onOpenCreditModal && (
              <button
                onClick={onOpenCreditModal}
                className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded transition-colors shrink-0 cursor-pointer"
              >
                크레딧 충전하기
              </button>
            )}
          </div>
        )}

        {/* 10 Scenario Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BRANCHING_SCENARIOS
            .filter((sc) => activeCategory === 'all' || sc.category === activeCategory)
            .map((sc) => {
              const isFree = unlockedScenarios[sc.id];
              return (
                <div
                  key={sc.id}
                  onClick={() => handleSelectScenario(sc.id)}
                  className="bg-white border-2 border-neutral-200 hover:border-amber-400 rounded-xl p-5 cursor-pointer transition-all hover:shadow-lg flex flex-col justify-between space-y-4 group text-left"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl p-2.5 bg-neutral-100 group-hover:bg-amber-100 rounded-xl transition-colors shrink-0">
                        {getSpeakerEmoji(sc.id, sc.roleKo)}
                      </span>
                      <div className="flex items-center space-x-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                          isFree ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}>
                          {isFree ? '무료 체험' : `${CONVERSATION_COST} CR`}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-300">
                          {sc.difficulty}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-serif font-bold text-base text-neutral-900 group-hover:text-amber-900 transition-colors">
                        {sc.titleKo}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-0.5">{sc.titleEn}</p>
                    </div>

                    <div className="text-xs text-neutral-600 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200 space-y-1">
                      <span className="font-bold text-neutral-800 block text-[11px]">
                        상대방: {sc.roleKo}
                      </span>
                      <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
                        {sc.settingKo}
                      </p>
                    </div>

                    {/* Key vocabulary chips */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase font-mono block">
                        핵심 표현 미리보기:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {sc.keyVocab.slice(0, 3).map((v, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded border border-neutral-200 font-serif">
                            {v.ko}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full py-2.5 bg-neutral-900 group-hover:bg-amber-500 text-white group-hover:text-black font-bold text-xs rounded-lg transition-all flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
                  >
                    <span>이 시나리오 대화 시작하기</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  // 2. ACTIVE SCENARIO CONVERSATION VIEW
  return (
    <div className="space-y-5 animate-in fade-in duration-200 text-left">
      {/* Top Banner & Control Bar */}
      <div className="bg-[#1A1A1A] text-white rounded-xl p-4 sm:p-5 border border-neutral-800 space-y-3.5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsScenarioSelected(false)}
                className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white rounded-md text-xs font-bold flex items-center space-x-1 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
                <span>시나리오 목록으로</span>
              </button>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                {currentScenario.badge}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-800 text-neutral-300 border border-neutral-700">
                난이도: {currentScenario.difficulty}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight flex items-center space-x-2">
              <span>{currentScenario.titleKo}</span>
              <span className="text-xs text-neutral-400 font-sans font-normal hidden md:inline">({currentScenario.titleEn})</span>
            </h2>
          </div>

          {/* Quick Scenario Selector & Reset Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => startScenario(activeScenarioId)}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-neutral-200 rounded-lg text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-colors shadow-2xs"
              title="대화를 처음부터 다시 시작합니다"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>새로 시작</span>
            </button>

            {history.length > 0 && !selectedEnding && (
              <button
                onClick={handleStepBack}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-neutral-200 rounded-lg text-xs font-bold flex items-center space-x-1 cursor-pointer transition-colors"
                title="한 단계 이전으로 되돌립니다"
              >
                <span>← 이전 단계</span>
              </button>
            )}
          </div>
        </div>

        {/* Progress Step Bar */}
        <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center space-x-2 font-mono">
            <span>진행 단계:</span>
            <span className="font-bold text-amber-300">
              Step {currentNode.stepIndex} / {currentNode.totalSteps}
            </span>
            <div className="flex items-center space-x-1 ml-2">
              {Array.from({ length: currentNode.totalSteps }).map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx + 1 === currentNode.stepIndex
                      ? 'bg-amber-400 scale-125'
                      : idx + 1 < currentNode.stepIndex
                      ? 'bg-amber-600'
                      : 'bg-neutral-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Subtitle & Audio Controls */}
          <div className="flex items-center space-x-2">
            {/* Subtitle toggle */}
            <div className="flex items-center bg-neutral-900 rounded border border-neutral-700 p-0.5 text-[11px]">
              <button
                onClick={() => setSubtitleMode('full')}
                className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                  subtitleMode === 'full' ? 'bg-amber-500 text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
                title="한글 + 발음 + 영문 모두 표시"
              >
                전체
              </button>
              <button
                onClick={() => setSubtitleMode('ko-en')}
                className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                  subtitleMode === 'ko-en' ? 'bg-amber-500 text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
                title="한글 + 영문만 표시"
              >
                한/영
              </button>
              <button
                onClick={() => setSubtitleMode('ko-only')}
                className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                  subtitleMode === 'ko-only' ? 'bg-amber-500 text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
                title="한글만 표시"
              >
                한글만
              </button>
            </div>

            {/* Auto speak toggle */}
            <button
              onClick={() => setAutoSpeak(!autoSpeak)}
              className={`p-1.5 rounded border transition-colors cursor-pointer ${
                autoSpeak ? 'bg-amber-500 text-black border-amber-400' : 'bg-neutral-800 text-neutral-400 border-neutral-700'
              }`}
              title={autoSpeak ? "자동 음성 발화 켜짐" : "자동 음성 발화 꺼짐"}
            >
              {autoSpeak ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Speech rate toggle */}
            <div className="relative">
              <button
                onClick={() => setShowSpeedPanel(!showSpeedPanel)}
                className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded border border-neutral-700 font-bold text-[11px] flex items-center space-x-1 cursor-pointer"
              >
                <Sliders className="w-3 h-3 text-amber-400" />
                <span>{speechRate.toFixed(1)}x</span>
              </button>

              {showSpeedPanel && (
                <div className="absolute right-0 top-full mt-1 w-32 bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl p-2 z-30 space-y-1">
                  <p className="text-[10px] font-bold text-neutral-300">음성 재생 속도</p>
                  <div className="grid grid-cols-3 gap-1">
                    {[0.8, 1.0, 1.2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => {
                          setSpeechRate(rate);
                          setShowSpeedPanel(false);
                        }}
                        className={`py-1 text-center rounded text-xs font-bold cursor-pointer ${
                          speechRate === rate ? 'bg-amber-500 text-black' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Conversation Interactive Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Dialogue Timeline & Choice Action Panel (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <div className="bg-white border-2 border-neutral-200 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[580px]">
            
            {/* Top Bar: Active Speaker Info */}
            <div className="p-3 bg-neutral-100 border-b border-neutral-200 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{speakerEmoji}</span>
                <span className="font-bold text-neutral-800">
                  대화 상대방: {currentScenario.roleKo}
                </span>
                <span className="text-[10px] text-neutral-500 font-sans hidden sm:inline">
                  ({currentScenario.roleEn})
                </span>
              </div>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded font-bold text-[11px] border border-amber-300">
                실전 분기 시나리오 모드
              </span>
            </div>

            {/* Chat Body & Timeline */}
            <div ref={chatContainerRef} className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-[#F9F8F6]">
              {/* Previous History Turns */}
              {history.map((turn, idx) => (
                <div key={idx} className="space-y-3">
                  {/* AI Partner message */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-800 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
                      {speakerEmoji}
                    </div>
                    <div className="flex-1 space-y-1 max-w-[90%]">
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] font-bold text-neutral-600 bg-neutral-200 px-2 py-0.5 rounded">
                          {turn.speakerRoleKo}
                        </span>
                        <button
                          onClick={() => handleSpeakText(turn.aiMessageKo, 'ai')}
                          className="text-neutral-400 hover:text-amber-800 p-0.5 cursor-pointer flex items-center space-x-1 text-[11px]"
                          title="다시 듣기"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>다시 듣기</span>
                        </button>
                      </div>
                      <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-neutral-200 shadow-2xs space-y-1">
                        <p className="text-base font-serif font-bold text-neutral-800 leading-relaxed">
                          {turn.aiMessageKo}
                        </p>
                        {subtitleMode === 'full' && turn.aiMessageRomanized && (
                          <p className="text-xs font-mono text-neutral-500">
                            {turn.aiMessageRomanized}
                          </p>
                        )}
                        {subtitleMode !== 'ko-only' && turn.aiMessageEn && (
                          <p className="text-xs text-neutral-500 font-sans">
                            {turn.aiMessageEn}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Learner chosen reply */}
                  {turn.selectedChoice && (
                    <div className="flex items-start justify-end space-x-2">
                      <div className="space-y-1 max-w-[85%] text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          {turn.selectedChoice.intentTag && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-900 rounded border border-amber-300">
                              {turn.selectedChoice.intentTag}
                            </span>
                          )}
                          <span className="text-[11px] font-bold text-neutral-500">나의 선택</span>
                        </div>
                        <div className="bg-amber-500 text-neutral-950 p-3.5 rounded-2xl rounded-tr-none font-serif font-bold text-sm sm:text-base shadow-xs text-left">
                          <p>{turn.selectedChoice.textKo}</p>
                          {subtitleMode !== 'ko-only' && (
                            <p className="text-xs font-sans text-neutral-800 font-normal mt-1">
                              {turn.selectedChoice.textEn}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Current Active Node */}
              <div className="space-y-3 pt-1">
                {/* AI Partner current message */}
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs ring-2 ring-amber-300">
                    {speakerEmoji}
                  </div>
                  <div className="flex-1 space-y-1.5 max-w-[90%]">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-amber-950 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                        {currentNode.speakerRoleKo}
                      </span>
                      <button
                        onClick={() => handleSpeakText(currentNode.aiMessageKo, 'ai')}
                        className="text-neutral-500 hover:text-amber-800 p-0.5 cursor-pointer flex items-center space-x-1 text-xs"
                        title="다시 듣기"
                      >
                        <Volume2 className="w-4 h-4 text-amber-700" />
                        <span className="font-bold">발음 듣기</span>
                      </button>
                    </div>

                    <div className="bg-white p-4 rounded-2xl rounded-tl-none border-2 border-amber-200 shadow-xs space-y-1.5">
                      <p className="text-lg sm:text-xl font-serif font-bold text-neutral-900 leading-relaxed">
                        {currentNode.aiMessageKo}
                      </p>
                      {subtitleMode === 'full' && currentNode.aiMessageRomanized && (
                        <p className="text-xs font-mono text-amber-900/80 bg-amber-50 px-2 py-1 rounded border border-amber-200/50">
                          🗣️ 발음: {currentNode.aiMessageRomanized}
                        </p>
                      )}
                      {subtitleMode !== 'ko-only' && currentNode.aiMessageEn && (
                        <p className="text-xs sm:text-sm text-neutral-600 font-sans">
                          💬 {currentNode.aiMessageEn}
                        </p>
                      )}
                      {currentNode.sceneNoteKo && (
                        <div className="pt-1.5 border-t border-neutral-100 text-[11px] text-neutral-500 flex items-center space-x-1">
                          <Compass className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          <span>상황: {currentNode.sceneNoteKo}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Area: Branching Choices OR Ending Dashboard */}
            <div className="p-4 sm:p-5 bg-white border-t border-neutral-200 space-y-3">
              {!currentNode.isEnding ? (
                /* INTERACTIVE CHOICES PANEL */
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900 flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>답변 선택지 ({currentNode.choices.length}가지 중 선택):</span>
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      원하는 뉘앙스와 전략의 답변을 클릭하세요
                    </span>
                  </div>

                  {voiceMatchResult && (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-lg text-xs font-bold text-emerald-900 flex items-center justify-between animate-in fade-in">
                      <span>🎤 {voiceMatchResult}</span>
                      <button
                        onClick={() => setVoiceMatchResult(null)}
                        className="text-[10px] text-emerald-700 underline cursor-pointer"
                      >
                        닫기
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-2.5">
                    {currentNode.choices.map((choice, index) => (
                      <div
                        key={choice.id || index}
                        className="p-3.5 rounded-xl border-2 border-neutral-200 hover:border-amber-500 bg-neutral-50/80 hover:bg-amber-50/60 transition-all cursor-pointer group space-y-1.5"
                        onClick={() => handleSelectChoice(choice)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="w-5 h-5 rounded-full bg-neutral-200 group-hover:bg-amber-500 group-hover:text-black text-neutral-700 text-xs font-bold flex items-center justify-center shrink-0">
                                {index + 1}
                              </span>
                              <p className="font-serif font-bold text-sm sm:text-base text-neutral-900 group-hover:text-amber-950">
                                {choice.textKo}
                              </p>
                            </div>
                            {subtitleMode === 'full' && (
                              <p className="text-[11px] font-mono text-neutral-500 pl-7">
                                {choice.romanized}
                              </p>
                            )}
                            {subtitleMode !== 'ko-only' && (
                              <p className="text-xs text-neutral-600 pl-7">
                                {choice.textEn}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center space-x-1.5 shrink-0">
                            {/* Practice Speak Button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSpeakText(choice.textKo, 'user', true);
                              }}
                              className="p-1.5 rounded-md hover:bg-white text-neutral-500 hover:text-amber-700 cursor-pointer"
                              title="선택지 발음 먼저 들어보기"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>

                            {/* Mic practice button */}
                            {micSupported && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleMicForChoice(choice);
                                }}
                                className={`p-1.5 rounded-md text-xs cursor-pointer ${
                                  isListening && voicePracticingChoiceId === choice.id
                                    ? 'bg-rose-600 text-white animate-pulse'
                                    : 'hover:bg-white text-neutral-500 hover:text-amber-700'
                                }`}
                                title="이 문장 마이크로 직접 소리 내어 말해보기"
                              >
                                {isListening && voicePracticingChoiceId === choice.id ? (
                                  <MicOff className="w-4 h-4" />
                                ) : (
                                  <Mic className="w-4 h-4" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Nuance & Strategy Tip Badge */}
                        {choice.nuanceTip && (
                          <div className="ml-7 pt-1 border-t border-neutral-200/60 text-[11px] text-amber-950 font-sans flex items-center space-x-1.5">
                            <Lightbulb className="w-3 h-3 text-amber-600 shrink-0" />
                            <span className="font-medium">{choice.nuanceTip}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* ENDING SUMMARY DASHBOARD */
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3 border-b border-amber-200 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Trophy className="w-5 h-5 text-amber-600 shrink-0" />
                        <h3 className="font-serif font-bold text-base sm:text-lg text-amber-950">
                          {selectedEnding?.badgeKo || '🎉 시나리오 완료!'}
                        </h3>
                      </div>
                      <p className="text-xs text-neutral-600">
                        {selectedEnding?.feedbackKo || '현지 상황에 꼭 맞는 모범적인 한국어 회화를 완성하셨습니다.'}
                      </p>
                    </div>

                    <div className="px-3 py-1.5 bg-amber-400 text-neutral-950 rounded-lg text-xs font-bold font-mono shrink-0 shadow-2xs flex items-center space-x-1">
                      <Award className="w-4 h-4" />
                      <span>+{selectedEnding?.xpEarned || 50} XP</span>
                    </div>
                  </div>

                  {/* Key Learning Points */}
                  {selectedEnding?.keyPoints && selectedEnding.keyPoints.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-amber-950 flex items-center space-x-1">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>이번 시나리오 핵심 학습 포인트:</span>
                      </span>
                      <ul className="text-xs text-neutral-700 space-y-1 list-disc list-inside bg-white/80 p-3 rounded-lg border border-amber-200">
                        {selectedEnding.keyPoints.map((pt, i) => (
                          <li key={i} className="leading-relaxed">{pt}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Grammar Notes */}
                  {selectedEnding?.grammarNotes && selectedEnding.grammarNotes.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-amber-950 flex items-center space-x-1">
                        <BookOpen className="w-4 h-4 text-amber-700" />
                        <span>핵심 문법 및 어휘 정리:</span>
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedEnding.grammarNotes.map((gn, i) => (
                          <div key={i} className="p-2.5 bg-white rounded-lg border border-amber-200 text-xs space-y-0.5">
                            <span className="font-serif font-bold text-neutral-900 block">{gn.title}</span>
                            <p className="text-[11px] text-neutral-600 leading-relaxed">{gn.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Replay and Switch Buttons */}
                  <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-amber-200">
                    <button
                      type="button"
                      onClick={() => startScenario(activeScenarioId)}
                      className="px-4 py-2 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 rounded-lg text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-2xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                      <span>다른 선택지로 다시 도전하기</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsScenarioSelected(false)}
                      className="px-5 py-2 bg-neutral-900 hover:bg-amber-600 text-white text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs"
                    >
                      <span>다른 시나리오 선택</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: 3CR Framework & Vocabulary Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* 3CR Learning Breakdown Card */}
          <div className="bg-white border-2 border-neutral-200 rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5">
              <span className="text-xs font-bold text-neutral-900 flex items-center space-x-1.5">
                <Compass className="w-4 h-4 text-amber-600" />
                <span>3CR 단계별 실전 분석</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded font-bold font-mono">
                Challenge & Reflection
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Challenge */}
              <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-200 space-y-1">
                <strong className="text-[11px] font-bold text-amber-950 uppercase font-mono flex items-center space-x-1">
                  <span>🎯 현재 도전 과제 (Challenge)</span>
                </strong>
                <p className="font-serif font-bold text-neutral-900 leading-snug">
                  {current3CR.challenge.goalKo}
                </p>
                <p className="text-[11px] text-neutral-600 font-sans">
                  {current3CR.challenge.goalEn}
                </p>
              </div>

              {/* Reflection */}
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1.5">
                <strong className="text-[11px] font-bold text-neutral-700 uppercase font-mono flex items-center space-x-1">
                  <span>💡 뉘앙스 & 문화 에티켓 (Reflection)</span>
                </strong>
                <p className="text-neutral-800 leading-relaxed font-sans text-xs">
                  {current3CR.reflection.culturalEtiquetteKo}
                </p>
                {current3CR.reflection.grammarPatternKo && (
                  <div className="pt-1.5 border-t border-neutral-200 text-[11px] text-amber-900">
                    <strong>문법 패턴:</strong> {current3CR.reflection.grammarPatternKo}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Useful Key Vocabulary for Scenario */}
          {currentScenario.keyVocab && currentScenario.keyVocab.length > 0 && (
            <div className="bg-white border-2 border-neutral-200 rounded-xl p-4 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <span className="text-xs font-bold text-neutral-900 flex items-center space-x-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>이 상황 필수 표현 (Key Vocab)</span>
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">Audio</span>
              </div>

              <div className="space-y-2">
                {currentScenario.keyVocab.map((v, i) => (
                  <div key={i} className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-serif font-bold text-neutral-900 block">{v.ko}</span>
                      <span className="text-[10px] text-neutral-500">{v.en}</span>
                    </div>
                    <button
                      onClick={() => handleSpeakText(v.ko, 'ai')}
                      className="p-1.5 text-neutral-400 hover:text-amber-800 cursor-pointer"
                      title="발음 듣기"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scenario Context Setting */}
          <div className="bg-white border-2 border-neutral-200 rounded-xl p-4 shadow-sm space-y-2.5 text-xs">
            <span className="font-bold text-neutral-900 flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-amber-700" />
              <span>상황 및 장소 설정 (Setting)</span>
            </span>
            <p className="text-neutral-600 leading-relaxed text-[11px]">
              {currentScenario.settingKo}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
