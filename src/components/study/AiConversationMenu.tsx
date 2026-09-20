import React, { useState, useEffect, useRef } from 'react';
import { speakKoreanText, initSpeechVoices } from '../../utils/tts';
import { 
  BRANCHING_SCENARIOS, 
  BranchingScenario, 
  DialogueNode, 
  DialogueChoice, 
  DialogueEnding 
} from '../../data/dialogueTrees';
import { 
  MessageSquare, Volume2, VolumeX, User, 
  Send, Mic, MicOff, RotateCcw, CheckCircle2, 
  AlertCircle, ChevronRight, Sliders, MapPin, 
  GitBranch, Compass, Trophy, ArrowRight,
  Lightbulb, RefreshCw, Coins, PlusCircle,
  Check, Sparkles
} from 'lucide-react';

interface HistoryTurn {
  nodeId: string;
  speakerRoleKo: string;
  aiMessageKo: string;
  aiMessageRomanized: string;
  aiMessageEn: string;
  sceneNoteKo?: string;
  selectedChoice?: DialogueChoice;
}

interface AiConversationMenuProps {
  credits?: number;
  onSpendCredits?: (amount: number, description: string) => boolean;
  onOpenCreditModal?: () => void;
}

type SubtitleMode = 'full' | 'ko-en' | 'ko-only';

const CONVERSATION_COST = 3; // 3 Credits per session

function getSpeakerEmoji(scenarioId: string, roleKo: string = ''): string {
  if (scenarioId.includes('taxi') || roleKo.includes('기사')) return '🚕';
  if (scenarioId.includes('cafe') || roleKo.includes('바리스타') || roleKo.includes('카페')) return '☕';
  if (scenarioId.includes('restaurant') || roleKo.includes('식당') || roleKo.includes('음식점')) return '🍲';
  if (scenarioId.includes('convenience') || roleKo.includes('편의점')) return '🏪';
  if (scenarioId.includes('subway') || roleKo.includes('역무원')) return '🚇';
  if (scenarioId.includes('pharmacy') || roleKo.includes('약사')) return '💊';
  if (scenarioId.includes('market') || roleKo.includes('상인')) return '🍎';
  if (roleKo.includes('친구')) return '🙋‍♂️';
  return '💬';
}

export default function AiConversationMenu({
  credits = 0,
  onSpendCredits,
  onOpenCreditModal
}: AiConversationMenuProps = {}) {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('taxi');
  const [activeCategory, setActiveCategory] = useState<'all' | 'travel' | 'food' | 'lifestyle' | 'social'>('all');
  const [currentNodeId, setCurrentNodeId] = useState<string>('taxi_root');
  const [history, setHistory] = useState<HistoryTurn[]>([]);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [subtitleMode, setSubtitleMode] = useState<SubtitleMode>('full');
  const [autoSpeak, setAutoSpeak] = useState<boolean>(true);
  const [showSpeedPanel, setShowSpeedPanel] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [micSupported, setMicSupported] = useState<boolean>(true);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [selectedEnding, setSelectedEnding] = useState<DialogueEnding | null>(null);
  
  // Track scenarios unlocked with credits
  const [unlockedScenarios, setUnlockedScenarios] = useState<Record<string, boolean>>({
    taxi: true // Taxi is default unlocked for immediate trial
  });
  const [creditError, setCreditError] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const speakTimeoutRef = useRef<any>(null);

  const currentScenario: BranchingScenario = 
    BRANCHING_SCENARIOS.find(s => s.id === activeScenarioId) || BRANCHING_SCENARIOS[0];
  const currentNode: DialogueNode = 
    currentScenario.nodes[currentNodeId] || currentScenario.nodes[currentScenario.rootNodeId];

  const speakerEmoji = getSpeakerEmoji(currentScenario.id, currentNode?.speakerRoleKo);

  // Preload speech synthesis voices
  useEffect(() => {
    initSpeechVoices();
  }, []);

  // Initialize Speech Recognition
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
        setInputMessage(transcript);
        
        // Auto-match voice transcript with available choices
        if (event.results[0].isFinal && transcript.trim()) {
          matchAndSelectChoice(transcript.trim());
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition warning:', event.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      setMicSupported(false);
    }
  }, [currentNode]);

  // Handle scenario switch
  useEffect(() => {
    startScenario(activeScenarioId);
    return () => {
      if (speakTimeoutRef.current) {
        clearTimeout(speakTimeoutRef.current);
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeScenarioId]);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [history, currentNodeId, selectedEnding]);

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
      const desc = `AI 분기 회화 연습 (${targetScenario?.titleKo || '시나리오'}) (-${CONVERSATION_COST} CR)`;
      const success = onSpendCredits(CONVERSATION_COST, desc);
      if (!success) {
        setCreditError(`회화 세션 시작을 위해 ${CONVERSATION_COST} 크레딧(CR)이 필요합니다. 크레딧을 충전해 주세요.`);
        return false;
      }
    } else if (credits < CONVERSATION_COST) {
      setCreditError(`보유 크레딧이 부족합니다 (${credits} / ${CONVERSATION_COST} CR).`);
      return false;
    }

    // Mark as unlocked
    setUnlockedScenarios(prev => ({ ...prev, [scenarioId]: true }));
    setCreditError(null);
    return true;
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
    const rootNode = scenario.nodes[scenario.rootNodeId];
    
    setCurrentNodeId(scenario.rootNodeId);
    setSelectedEnding(null);
    setInputMessage('');
    setHistory([]);
    setCreditError(null);

    if (autoSpeak && rootNode) {
      speakTimeoutRef.current = setTimeout(() => {
        handleSpeakText(rootNode.aiMessageKo, 'ai', true);
      }, 400);
    }
  };

  const handleSelectChoice = (choice: DialogueChoice) => {
    // If not unlocked yet, check credits
    if (!unlockedScenarios[activeScenarioId]) {
      const success = checkAndDeductCredits(activeScenarioId);
      if (!success) return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    // Play User Voice
    if (autoSpeak) {
      handleSpeakText(choice.textKo, 'user', true);
    }

    // Add current turn to history
    const updatedHistory: HistoryTurn[] = [
      ...history,
      {
        nodeId: currentNode.id,
        speakerRoleKo: currentNode.speakerRoleKo,
        aiMessageKo: currentNode.aiMessageKo,
        aiMessageRomanized: currentNode.aiMessageRomanized,
        aiMessageEn: currentNode.aiMessageEn,
        sceneNoteKo: currentNode.sceneNoteKo,
        selectedChoice: choice
      }
    ];
    setHistory(updatedHistory);

    // Transition to next node
    const nextNode = currentScenario.nodes[choice.nextNodeId];
    if (nextNode) {
      setCurrentNodeId(choice.nextNodeId);
      setInputMessage('');

      if (nextNode.isEnding && nextNode.endingSummary) {
        setSelectedEnding(nextNode.endingSummary);
      } else {
        setSelectedEnding(null);
      }

      // Auto play AI's response in next turn
      if (autoSpeak && nextNode.aiMessageKo) {
        setTimeout(() => {
          handleSpeakText(nextNode.aiMessageKo, 'ai', false);
        }, 800);
      }
    }
  };

  // Match voice or text input to the best candidate choice
  const matchAndSelectChoice = (userInput: string) => {
    const cleanInput = userInput.replace(/[\s.,?!]/g, '').toLowerCase();
    
    // Exact or partial substring match
    const matched = currentNode.choices.find(c => {
      const cleanChoice = c.textKo.replace(/[\s.,?!]/g, '').toLowerCase();
      return cleanChoice.includes(cleanInput) || cleanInput.includes(cleanChoice) ||
             c.intentTag?.toLowerCase().includes(cleanInput) ||
             c.strategyTag?.toLowerCase().includes(cleanInput);
    });

    if (matched) {
      handleSelectChoice(matched);
    } else if (currentNode.choices.length > 0) {
      // Fallback to first choice if no match
      handleSelectChoice(currentNode.choices[0]);
    }
  };

  const handleCustomInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !currentNode.choices.length) return;
    matchAndSelectChoice(inputMessage.trim());
  };

  // Rewind timeline to an earlier step to explore different branching
  const handleRewindToStep = (turnIndex: number) => {
    if (turnIndex < 0 || turnIndex >= history.length) return;
    
    const targetTurn = history[turnIndex];
    const newHistory = history.slice(0, turnIndex);
    
    setHistory(newHistory);
    setCurrentNodeId(targetTurn.nodeId);
    setSelectedEnding(null);
    setInputMessage('');

    if (autoSpeak) {
      const targetNode = currentScenario.nodes[targetTurn.nodeId];
      if (targetNode) {
        setTimeout(() => {
          handleSpeakText(targetNode.aiMessageKo, 'ai', true);
        }, 200);
      }
    }
  };

  const toggleMicListen = () => {
    if (!recognitionRef.current) {
      alert('마이크 음성 인식이 지원되지 않는 환경입니다. 아래 선택지를 직접 클릭하여 대화하실 수 있습니다!');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInputMessage('');
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Scenario Selectors */}
      <div className="bg-[#1A1A1A] text-white rounded-xl p-5 sm:p-6 border border-neutral-800 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center space-x-1">
                <GitBranch className="w-3 h-3 text-amber-400" />
                <span>Branching Scenario Dialogue (트리형 분기 회화)</span>
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center space-x-1 font-mono">
                <Coins className="w-3 h-3 text-amber-400" />
                <span>3 CR / Session</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-800 text-neutral-300 border border-neutral-700">
                Level: {currentScenario.difficulty}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight flex items-center space-x-2">
              <span>{currentScenario.titleEn}</span>
              <span className="text-sm sm:text-base font-normal text-neutral-400">({currentScenario.titleKo})</span>
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-neutral-300 pt-0.5">
              <span className="bg-neutral-800 text-amber-300 px-2.5 py-0.5 rounded font-bold border border-neutral-700">
                {speakerEmoji} {currentScenario.roleEn || currentScenario.roleKo}
              </span>
            </div>
          </div>

          {/* User Credit Balance & Action */}
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

        {/* Credit Insufficient Alert */}
        {creditError && (
          <div className="p-3 bg-rose-950/80 border border-rose-600/60 rounded-lg text-rose-200 text-xs flex items-center justify-between gap-3 animate-in fade-in duration-200">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{creditError}</span>
            </div>
            {onOpenCreditModal && (
              <button
                onClick={onOpenCreditModal}
                className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded transition-colors shrink-0 cursor-pointer"
              >
                Get Credits
              </button>
            )}
          </div>
        )}

        {/* Category Filter Pills & Scenario Selector */}
        <div className="pt-3 border-t border-neutral-800/80 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-neutral-400">
              Select Scenario (9 Branching Trees):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All (9)' },
                { id: 'travel', label: '🚗 Travel & Transit (3)' },
                { id: 'food', label: '☕ Food & Cafe (2)' },
                { id: 'lifestyle', label: '🏪 Daily Life (3)' },
                { id: 'social', label: '🤝 Socializing (1)' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-amber-400 text-black shadow-xs'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scenario Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {BRANCHING_SCENARIOS
              .filter((sc) => activeCategory === 'all' || sc.category === activeCategory)
              .map((sc) => {
                const isActive = sc.id === activeScenarioId;
                const isUnlocked = !!unlockedScenarios[sc.id];

                return (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setActiveScenarioId(sc.id);
                    }}
                    className={`p-3 rounded-lg text-left transition-all cursor-pointer relative flex flex-col justify-between border ${
                      isActive 
                        ? 'bg-amber-400/15 text-white font-bold border-amber-400 shadow-md ring-1 ring-amber-400/50' 
                        : 'bg-neutral-900/90 text-neutral-300 hover:bg-neutral-800/90 hover:text-white border-neutral-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-xs sm:text-sm font-serif font-bold line-clamp-1 text-neutral-100">
                        {sc.titleEn || sc.titleKo}
                      </div>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono shrink-0 font-bold ${
                        isActive ? 'bg-amber-400 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {sc.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] mt-2 pt-2 border-t border-neutral-800/60">
                      <span className={`${isActive ? 'text-amber-300 font-medium' : 'text-neutral-400'}`}>
                        {sc.roleEn || sc.roleKo.split('vs')[0].trim()}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono flex items-center space-x-1">
                        {isUnlocked ? (
                          <span className="text-emerald-400 font-bold">✓ Active</span>
                        ) : (
                          <span className="text-amber-400/90 font-bold">💎 3 CR</span>
                        )}
                      </span>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      {/* Main Dialogue Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Chat & Timeline (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border-2 border-neutral-200 rounded-xl shadow-md flex flex-col min-h-[620px] overflow-hidden">
            
            {/* Top Bar: Speaker Indicators & Subtitle Controls */}
            <div className="p-3.5 bg-neutral-100 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Step Tracker & Active Speaker Tag */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center space-x-1.5 bg-white px-2.5 py-1 rounded-md border border-neutral-300 shadow-2xs">
                  <span className="font-bold text-neutral-900 flex items-center space-x-1">
                    <Compass className="w-3.5 h-3.5 text-amber-700" />
                    <span>진행:</span>
                  </span>
                  <span className="font-bold text-amber-700">{currentNode.stepIndex}</span>
                  <span className="text-neutral-400">/ {currentNode.totalSteps} 단계</span>
                </div>

                <div className="flex items-center space-x-1 bg-amber-100 text-amber-950 font-bold px-2.5 py-1 rounded-md border border-amber-300 shadow-2xs">
                  <span>{speakerEmoji}</span>
                  <span>화자 1: {currentNode.speakerRoleKo}</span>
                </div>

                {currentNode.isEnding && (
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-md text-xs flex items-center space-x-1 border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>대화 완료 (Ending)</span>
                  </span>
                )}
              </div>

              {/* View options & TTS Speed */}
              <div className="flex items-center space-x-2">
                {/* Subtitle mode */}
                <div className="flex items-center bg-white rounded border border-neutral-300 p-0.5 text-[11px] shadow-2xs">
                  <button
                    onClick={() => setSubtitleMode('full')}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      subtitleMode === 'full' ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                    title="한글 + 로마자 발음 + 영어 번역 모두 표시"
                  >
                    전체
                  </button>
                  <button
                    onClick={() => setSubtitleMode('ko-en')}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      subtitleMode === 'ko-en' ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                    title="한글 + 영어 번역만 표시"
                  >
                    한/영
                  </button>
                  <button
                    onClick={() => setSubtitleMode('ko-only')}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      subtitleMode === 'ko-only' ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                    title="한글 전용 (실전 몰입 모드)"
                  >
                    한글만
                  </button>
                </div>

                {/* Auto speak toggle */}
                <button
                  onClick={() => setAutoSpeak(!autoSpeak)}
                  className={`p-1.5 rounded border transition-colors cursor-pointer ${
                    autoSpeak 
                      ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold' 
                      : 'bg-white border-neutral-300 text-neutral-400'
                  }`}
                  title={autoSpeak ? "자동 음성 발화 켜짐" : "자동 음성 발화 꺼짐"}
                >
                  {autoSpeak ? <Volume2 className="w-4 h-4 text-amber-700" /> : <VolumeX className="w-4 h-4" />}
                </button>

                {/* Speed toggle */}
                <div className="relative">
                  <button
                    onClick={() => setShowSpeedPanel(!showSpeedPanel)}
                    className="px-2.5 py-1 bg-white hover:bg-neutral-50 text-neutral-800 rounded border border-neutral-300 font-bold text-[11px] flex items-center space-x-1 cursor-pointer shadow-2xs"
                  >
                    <Sliders className="w-3 h-3 text-amber-700" />
                    <span>{speechRate.toFixed(1)}x</span>
                  </button>

                  {showSpeedPanel && (
                    <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-neutral-300 rounded-lg shadow-xl p-2.5 z-30 space-y-2">
                      <p className="text-[11px] font-bold text-neutral-900">한국어 음성 속도</p>
                      <div className="grid grid-cols-3 gap-1">
                        {[0.8, 1.0, 1.2].map((rate) => (
                          <button
                            key={rate}
                            onClick={() => {
                              setSpeechRate(rate);
                              setShowSpeedPanel(false);
                            }}
                            className={`py-1 text-center rounded text-xs font-bold cursor-pointer ${
                              speechRate === rate ? 'bg-amber-600 text-white' : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
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

            {/* Chat Body & Timeline */}
            <div ref={chatContainerRef} className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-5 bg-[#F9F8F6]">
              
              {/* Prior Turns in Timeline */}
              {history.map((turn, idx) => (
                <div key={`turn-${idx}`} className="space-y-3 pb-4 border-b border-neutral-200/80">
                  {/* AI Prior Message (화자 1) */}
                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                      {speakerEmoji}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded border border-amber-200">
                          화자 1 • {turn.speakerRoleKo}
                        </span>
                        <button
                          onClick={() => handleSpeakText(turn.aiMessageKo, 'ai')}
                          className="text-neutral-500 hover:text-amber-800 p-0.5 cursor-pointer"
                          title="다시 듣기"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="bg-white px-4 py-3 rounded-xl border border-neutral-200 shadow-xs inline-block max-w-full">
                        <p className="text-sm sm:text-base font-serif font-bold text-neutral-900 leading-relaxed">
                          {turn.aiMessageKo}
                        </p>
                        {subtitleMode !== 'ko-only' && (
                          <p className="text-xs text-neutral-500 pt-1 border-t border-neutral-100 mt-1">
                            {turn.aiMessageEn}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* User's Selected Choice in this turn (화자 2 - 나) */}
                  {turn.selectedChoice && (
                    <div className="flex items-start justify-end space-x-3 pt-1">
                      <div className="flex-1 text-right space-y-1 max-w-[85%]">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleRewindToStep(idx)}
                            className="text-[10px] text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-2 py-0.5 rounded font-bold transition-colors cursor-pointer flex items-center space-x-1"
                            title="이 단계로 되돌아가서 다른 선택지 선택하기"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>다른 분기 탐색</span>
                          </button>
                          <span className="text-xs font-bold text-neutral-700 bg-neutral-200 px-2 py-0.5 rounded">
                            화자 2 • 나 (승객/학습자)
                          </span>
                        </div>
                        <div className="bg-[#242424] text-white px-4 py-3 rounded-xl shadow-sm inline-block text-left">
                          <p className="text-sm sm:text-base font-serif font-medium leading-relaxed">
                            {turn.selectedChoice.textKo}
                          </p>
                          {subtitleMode !== 'ko-only' && (
                            <p className="text-xs text-neutral-400 pt-1 border-t border-neutral-700 mt-1">
                              {turn.selectedChoice.textEn}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-neutral-800 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                        <User className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* CURRENT ACTIVE NODE (현재 턴 - 화자 1의 대사) */}
              <div className="space-y-3 pt-1">
                {/* Scene action context note */}
                {currentNode.sceneNoteKo && (
                  <div className="bg-amber-50 border border-amber-300 rounded-lg px-4 py-2.5 text-xs text-amber-950 flex items-start space-x-2 shadow-2xs">
                    <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-amber-900">상황 맥락:</strong> {currentNode.sceneNoteKo}
                    </div>
                  </div>
                )}

                {/* AI Active Question/Dialogue Card (화자 1: 기사님/상대방) */}
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-md ring-2 ring-amber-300">
                    {speakerEmoji}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-amber-950 bg-amber-200/80 px-2.5 py-0.5 rounded-full border border-amber-400/80">
                          화자 1 • {currentNode.speakerRoleKo}
                        </span>
                        <span className="text-[11px] text-neutral-500 font-medium">
                          ({currentNode.speakerRoleEn})
                        </span>
                      </div>
                      <button
                        onClick={() => handleSpeakText(currentNode.aiMessageKo, 'ai', true)}
                        className="text-amber-900 hover:text-black p-1 rounded-md hover:bg-amber-100 transition-colors cursor-pointer flex items-center space-x-1.5 bg-amber-50 border border-amber-300 text-xs font-bold px-2.5 py-1 shadow-2xs"
                      >
                        <Volume2 className="w-4 h-4 text-amber-700" />
                        <span>다시 듣기</span>
                      </button>
                    </div>

                    {/* Main Korean Speech Box */}
                    <div className="bg-white p-5 rounded-2xl border-2 border-amber-400 shadow-md space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-lg sm:text-xl font-serif font-bold text-neutral-900 leading-relaxed tracking-tight">
                          "{currentNode.aiMessageKo}"
                        </p>
                      </div>

                      {subtitleMode === 'full' && (
                        <p className="text-xs sm:text-sm font-mono text-amber-900/90 leading-normal bg-amber-50/60 px-3 py-1.5 rounded-md border border-amber-200/60">
                          🗣️ 발음: {currentNode.aiMessageRomanized}
                        </p>
                      )}

                      {subtitleMode !== 'ko-only' && (
                        <p className="text-xs sm:text-sm text-neutral-600 pt-1 border-t border-neutral-100">
                          🇬🇧 번역: {currentNode.aiMessageEn}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* If reached ending, display result card */}
                {selectedEnding && (
                  <div className="mt-4 p-5 bg-gradient-to-br from-amber-50 via-white to-amber-50/40 border-2 border-amber-300 rounded-xl shadow-lg space-y-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold shadow-md">
                          <Trophy className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-serif font-bold text-neutral-900">
                            {selectedEnding.badgeKo}
                          </h4>
                          <p className="text-xs text-neutral-600 font-medium">{selectedEnding.badgeEn}</p>
                        </div>
                      </div>
                      <div className="bg-amber-400 text-black font-extrabold px-3 py-1 rounded-full text-xs font-mono shadow-xs">
                        +{selectedEnding.xpEarned} XP 획득!
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed bg-white/80 p-3 rounded-lg border border-amber-200/80">
                      {selectedEnding.feedbackKo}
                    </p>

                    {/* Key points */}
                    <div className="space-y-1.5">
                      <p className="text-xs font-bold text-neutral-800 uppercase tracking-wider">🌟 핵심 학습 포인트</p>
                      <ul className="text-xs text-neutral-600 space-y-1 list-disc list-inside">
                        {selectedEnding.keyPoints.map((pt, i) => (
                          <li key={i} className="font-medium">{pt}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => startScenario(activeScenarioId)}
                        className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>이 시나리오 처음부터 다시 하기</span>
                      </button>
                      <button
                        onClick={() => {
                          const nextIdx = (BRANCHING_SCENARIOS.findIndex(s => s.id === activeScenarioId) + 1) % BRANCHING_SCENARIOS.length;
                          setActiveScenarioId(BRANCHING_SCENARIOS[nextIdx].id);
                        }}
                        className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm"
                      >
                        <span>다음 상황 시나리오로 넘어가기</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Choice Panel: Branching Choices for Current Node */}
            {!currentNode.isEnding && (
              <div className="p-4 bg-white border-t-2 border-neutral-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-neutral-900 flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-amber-700" />
                      <span>화자 2 (나)의 답변 선택 ({currentNode.choices.length}가지 분기 경로):</span>
                    </span>
                  </div>
                  
                  {micSupported && (
                    <button
                      onClick={toggleMicListen}
                      className={`px-3 py-1 rounded text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs ${
                        isListening 
                          ? 'bg-rose-500 text-white animate-pulse' 
                          : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-300'
                      }`}
                    >
                      {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-amber-700" />}
                      <span>{isListening ? '듣는 중...' : '마이크로 말하기'}</span>
                    </button>
                  )}
                </div>

                {/* Choices Buttons Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentNode.choices.map((choice, index) => (
                    <button
                      key={choice.id || index}
                      onClick={() => handleSelectChoice(choice)}
                      className="p-3 bg-neutral-50 hover:bg-amber-50/80 border-2 border-neutral-200 hover:border-amber-400 rounded-xl text-left transition-all group cursor-pointer shadow-2xs hover:shadow-xs relative overflow-hidden flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-mono">
                            선택 {index + 1} {choice.intentTag ? `• ${choice.intentTag}` : ''}
                          </span>
                          <span className="text-[10px] text-neutral-400 group-hover:text-amber-700 font-bold flex items-center space-x-0.5">
                            <span>선택</span>
                            <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                        
                        <p className="text-sm font-serif font-bold text-neutral-900 group-hover:text-amber-950 pt-0.5">
                          {choice.textKo}
                        </p>

                        {subtitleMode === 'full' && (
                          <p className="text-[11px] font-mono text-neutral-500">
                            {choice.romanized}
                          </p>
                        )}
                        
                        {subtitleMode !== 'ko-only' && (
                          <p className="text-xs text-neutral-600">
                            {choice.textEn}
                          </p>
                        )}
                      </div>

                      {choice.nuanceTip && (
                        <div className="mt-2 pt-1.5 border-t border-neutral-200/60 text-[10px] text-amber-800/90 font-medium">
                          💡 {choice.nuanceTip}
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Optional Custom Input Field */}
                <form onSubmit={handleCustomInputSubmit} className="flex items-center space-x-2 pt-1">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="직접 한국어로 입력하거나 위 선택지를 선택하세요..."
                    className="flex-1 px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-amber-600 font-serif"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>전송</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Scenario Context & Decision Tree Overview (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Scenario Overview Card */}
          <div className="bg-white border-2 border-neutral-200 rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5">
              <span className="text-xs font-bold text-neutral-900 flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-amber-700" />
                <span>시나리오 맥락 및 역할</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold">
                {currentScenario.badge}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <strong className="text-neutral-500 block text-[10px] uppercase font-mono">시나리오 제목</strong>
                <p className="text-sm font-serif font-bold text-neutral-900">{currentScenario.titleKo}</p>
                <p className="text-xs text-neutral-500">{currentScenario.titleEn}</p>
              </div>

              <div>
                <strong className="text-neutral-500 block text-[10px] uppercase font-mono">참여 인물 및 관계</strong>
                <p className="font-bold text-neutral-800">{currentScenario.roleKo}</p>
                <p className="text-[11px] text-neutral-500">{currentScenario.roleEn}</p>
              </div>

              <div>
                <strong className="text-neutral-500 block text-[10px] uppercase font-mono">상황 및 배경 (Setting)</strong>
                <p className="text-neutral-700 leading-relaxed">{currentScenario.settingKo}</p>
                <p className="text-[11px] text-neutral-500 italic mt-0.5">{currentScenario.settingEn}</p>
              </div>
            </div>
          </div>

          {/* Branching Tree Node Map */}
          <div className="bg-white border-2 border-neutral-200 rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5">
              <span className="text-xs font-bold text-neutral-900 flex items-center space-x-1.5">
                <GitBranch className="w-4 h-4 text-amber-700" />
                <span>분기 트리 경로 시각화</span>
              </span>
              <span className="text-[10px] text-neutral-500">
                총 {Object.keys(currentScenario.nodes).length}개 노드
              </span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {Object.values(currentScenario.nodes).map((node) => {
                const isCurrent = node.id === currentNodeId;
                const isVisited = history.some(h => h.nodeId === node.id) || isCurrent;

                return (
                  <div
                    key={node.id}
                    className={`p-2.5 rounded-lg border text-xs transition-all flex items-start space-x-2 ${
                      isCurrent
                        ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold shadow-xs'
                        : isVisited
                        ? 'bg-neutral-50 border-neutral-300 text-neutral-800'
                        : 'bg-white border-dashed border-neutral-200 text-neutral-400'
                    }`}
                  >
                    <div className="pt-0.5">
                      {isCurrent ? (
                        <span className="w-2 h-2 rounded-full bg-amber-500 block animate-ping" />
                      ) : isVisited ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-neutral-300 block" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase text-neutral-500">
                          {node.stepIndex}단계 {node.isEnding ? '(결말)' : ''}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-bold">
                            현재 위치
                          </span>
                        )}
                      </div>
                      <p className="text-xs truncate font-serif">{node.aiMessageKo}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pragmatics & Cultural Insights */}
          <div className="bg-white border-2 border-neutral-200 rounded-xl p-4 shadow-sm space-y-2.5">
            <span className="text-xs font-bold text-neutral-900 flex items-center space-x-1.5 border-b border-neutral-200 pb-2">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>실전 한국어 화용론 & 문화 팁</span>
            </span>

            <div className="text-xs text-neutral-700 space-y-2 leading-relaxed">
              <p>
                💡 <strong>존댓말 뉘앙스:</strong> 한국에서는 첫 대면 상황이나 서비스 업종(택시, 식당, 카페)에서 정중한 존댓말(~해요 / ~해주세요)을 사용하는 것이 기본 예절입니다.
              </p>
              <p>
                🔄 <strong>분기 탐색 팁:</strong> 대화 중 언제든지 [다른 분기 탐색]을 누르면 이전 단계로 돌아가 다른 선택지를 시도해볼 수 있습니다.
              </p>
            </div>

            <div className="pt-2 border-t border-neutral-200 flex justify-end">
              <button
                onClick={() => startScenario(activeScenarioId)}
                className="text-xs text-amber-800 hover:text-amber-950 font-bold flex items-center space-x-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>시나리오 처음부터 다시 하기</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
