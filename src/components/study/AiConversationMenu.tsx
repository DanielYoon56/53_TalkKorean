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
  Check, Sparkles, Loader2, Bot, ArrowLeft
} from 'lucide-react';

interface LiveMessage {
  id: string;
  sender: 'ai' | 'user';
  textKo: string;
  romanized?: string;
  textEn?: string;
  feedbackKo?: string;
  feedbackEn?: string;
  suggestedReplies?: string[];
  speakerRoleKo?: string;
  speakerRoleEn?: string;
  timestamp?: string;
}

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
type ConversationMode = 'live' | 'tree';

const CONVERSATION_COST = 3; // 3 Credits per session

interface ScenarioOpening {
  aiKorean: string;
  aiRomanized: string;
  aiEnglish: string;
  roleKo: string;
  roleEn: string;
  suggestedReplies: string[];
}

const SCENARIO_OPENINGS: Record<string, ScenarioOpening> = {
  taxi: {
    aiKorean: "어서 오세요! 어디로 모실까요? 손님, 목적지를 말씀해 주세요.",
    aiRomanized: "Eoseo oseyo! Eodiro mosilkkayo? Sonnim, mokjeokji-reul malsseum-hae juseyo.",
    aiEnglish: "Welcome! Where can I take you today? Please tell me your destination.",
    roleKo: "택시 기사님",
    roleEn: "Seoul Taxi Driver",
    suggestedReplies: [
      "강남역 4번 출구로 가주세요. (To Gangnam Station Exit 4 please.)",
      "서울역으로 가주세요. (Please take me to Seoul Station.)",
      "조금 급한데 빠른 길로 가주실 수 있나요? (I am in a hurry, can you take a fast route?)"
    ]
  },
  cafe: {
    aiKorean: "어서오세요! 홍대 카페입니다. 어떤 음료로 주문하시겠어요?",
    aiRomanized: "Eoseo-oseyo! Hongdae kape-imnida. Eotteon eumryo-ro jumun-hasigesseoyo?",
    aiEnglish: "Welcome! This is Hongdae Cafe. What drink would you like to order?",
    roleKo: "바리스타",
    roleEn: "Hongdae Barista",
    suggestedReplies: [
      "따뜻한 아메리카노 한 잔 주세요. (One warm Americano please.)",
      "시그니처 메뉴 추천해 주세요. (Please recommend your signature menu.)",
      "디카페인 아이스 라떼 되나요? (Can I get a decaf iced latte?)"
    ]
  },
  convenience: {
    aiKorean: "어서오세요! GS25입니다. 필요한 물건 있으시면 말씀해 주세요!",
    aiRomanized: "Eoseo-oseyo! GS25-imnida. Piryo-hasin mulgeon isseusimyeon malsseum-hae juseyo!",
    aiEnglish: "Welcome! This is GS25. Let me know if you need anything!",
    roleKo: "편의점 직원",
    roleEn: "Convenience Store Staff",
    suggestedReplies: [
      "교통카드 충전할 수 있나요? (Can I recharge my transit card?)",
      "종량제 봉투 하나 주세요. (Please give me one standard trash bag.)",
      "이거 1+1 행사 상품 맞나요? (Is this a 1+1 promotion item?)"
    ]
  },
  restaurant: {
    aiKorean: "어서오세요! 몇 분이서 오셨나요? 편하신 자리에 앉으세요!",
    aiRomanized: "Eoseo-oseyo! Myeot bun-iseo osyeonnayo? Pyeon-hasin jari-e anjeuseyo!",
    aiEnglish: "Welcome! How many are in your party? Please take any comfortable seat!",
    roleKo: "식당 직원",
    roleEn: "Korean Restaurant Staff",
    suggestedReplies: [
      "두 명이에요. 삼겹살 2인분 먼저 주세요. (Two people. 2 servings of pork belly first please.)",
      "여기서 제일 인기 있는 메뉴가 뭐예요? (What is the most popular menu here?)",
      "물냉면 하나랑 된장찌개도 추가할게요. (I will also add one cold noodles and soybean stew.)"
    ]
  },
  subway: {
    aiKorean: "네, 역무실입니다. 무엇을 도와드릴까요?",
    aiRomanized: "Ne, yeongmusil-imnida. Mueos-eul dowadeurilkkayo?",
    aiEnglish: "Yes, station office. How can I help you?",
    roleKo: "지하철 역무원",
    roleEn: "Metro Station Staff",
    suggestedReplies: [
      "잠실역으로 가려면 몇 호선으로 갈아타야 하나요? (Which line should I transfer to for Jamsil?)",
      "교통카드를 개찰구에 찍었는데 오류가 났어요. (I tapped my card at the turnstile and got an error.)",
      "1번 출구로 나가려면 어디로 가야 하나요? (Which way should I go for Exit 1?)"
    ]
  },
  pharmacy: {
    aiKorean: "어서오세요! 어디가 불편하신가요?",
    aiRomanized: "Eoseo-oseyo! Eodiga bulpyeon-hasingayo?",
    aiEnglish: "Welcome! What symptoms are troubling you?",
    roleKo: "약사님",
    roleEn: "Pharmacist",
    suggestedReplies: [
      "머리가 아프고 열이 조금 나요. 진통제 있나요? (I have a headache and slight fever. Do you have painkillers?)",
      "소화가 잘 안 돼서 소화제 좀 주세요. (I have indigestion, please give me digestive medicine.)",
      "이 약은 식후에 먹어야 하나요? (Should this medicine be taken after meals?)"
    ]
  },
  market: {
    aiKorean: "어서와요 학생! 맛있는 떡볶이랑 순대 방금 만들었어, 먹고 갈래?",
    aiRomanized: "Eoseowayo haksaeng! Masitneun tteokbokki-rang sundae banggeum mandeureosseo, meokgo gallae?",
    aiEnglish: "Welcome! Just made fresh tteokbokki and sundae, want to eat here?",
    roleKo: "시장 이모님",
    roleEn: "Traditional Market Vendor",
    suggestedReplies: [
      "이모님, 떡볶이 1인분 포장해 주세요! (Auntie, please pack 1 serving of tteokbokki!)",
      "순대랑 튀김도 섞어서 주실 수 있나요? (Can you mix sundae and fried snacks too?)",
      "이거 많이 맵나요? (Is this very spicy?)"
    ]
  },
  noraebang: {
    aiKorean: "어서오세요! 코인노래방입니다. 몇 곡 부르시거나 시간제로 하실 건가요?",
    aiRomanized: "Eoseo-oseyo! Koin noraebang-imnida. Myeot gok bureusigeona siganje-ro hasil geongayo?",
    aiEnglish: "Welcome to Coin Karaoke! Are you singing by songs or by time?",
    roleKo: "노래방 사장님",
    roleEn: "Coin Karaoke Owner",
    suggestedReplies: [
      "코인으로 3곡 부를게요. (I will sing 3 songs with coin.)",
      "1시간 시간제로 계산해 주세요. (Please charge for 1 hour by time.)",
      "마이크 커버 두 개 주시겠어요? (Could you give us two mic covers?)"
    ]
  },
  friend: {
    aiKorean: "안녕! 만나서 반가워. 나는 민지야! 한국어 공부한 지 얼마나 됐어?",
    aiRomanized: "Annyeong! Mannaseo bangawo. Naneun Minji-ya! Hangugeo gongbu-han ji eolmana dwaesseo?",
    aiEnglish: "Hi! Nice to meet you. I'm Min-ji! How long have you been studying Korean?",
    roleKo: "언어교환 친구 민지",
    roleEn: "Language Exchange Friend Min-ji",
    suggestedReplies: [
      "안녕 민지야! 한국어 배운 지 6개월 정도 됐어. (Hi Min-ji! It's been about 6 months since I started.)",
      "K-POP 좋아해서 독학으로 공부하고 있어. (I study by myself because I love K-POP.)",
      "한국인 친구 사귀고 싶어서 모임에 나왔어! (I came to this meetup because I want to make Korean friends!)"
    ]
  },
  freetalk: {
    aiKorean: "안녕하세요! 원어민 튜터 지우예요 😊 오늘 하루는 어떠셨나요? 한국어나 일상에 대해 편하게 이야기 나눠요!",
    aiRomanized: "Annyeonghaseyo! Woneomin tyuteo Ji-u-yeyo. Oneul haru-neun eotteosyeonnayo? Hangugeo-na ilsang-e daehae pyeon-hage iyagi nanwoyo!",
    aiEnglish: "Hello! I am native tutor Ji-woo 😊 How was your day? Feel free to chat about Korean or daily life!",
    roleKo: "지우 튜터",
    roleEn: "Native Tutor Ji-woo",
    suggestedReplies: [
      "오늘 기분 좋은 하루 보냈어요! (I had a great day today!)",
      "한국 여행 갈 때 꼭 알아야 할 표현이 궁금해요. (I am curious about essential expressions when traveling in Korea.)",
      "한국어 발음 잘하는 팁 좀 알려주세요! (Please give me tips on speaking Korean with good pronunciation!)"
    ]
  }
};

const ALL_SCENARIOS = [
  ...BRANCHING_SCENARIOS,
  {
    id: 'freetalk',
    titleKo: '💬 원어민 지우 튜터 자유 대화',
    titleEn: '1:1 Free Talk with Ji-woo',
    badge: '1:1 Free Talk',
    category: 'social' as const,
    difficulty: 'All Levels' as any,
    roleKo: '지우 튜터',
    roleEn: 'Native Tutor Ji-woo',
    settingKo: '자유로운 주제로 원어민 튜터와 일상, 취미, 고민, 한국 문화를 편안하게 이야기해 보세요.',
    settingEn: 'Chat freely about any topic, daily life, hobbies, and Korea.',
    image: '',
    keyVocab: [
      { ko: '오늘 하루 어땠어요?', en: 'How was your day?', pronunciation: 'oneul haru eottaesseoyo?' },
      { ko: '한국어 공부하는 중이에요', en: 'I am studying Korean', pronunciation: 'hangugeo gongbuhaneun jung-ieyo' },
      { ko: '자연스러운 표현', en: 'Natural expression', pronunciation: 'jayeonseureoun pyohyeon' }
    ],
    rootNodeId: 'freetalk_root',
    nodes: {}
  }
];

function getSpeakerEmoji(scenarioId: string, roleKo: string = ''): string {
  if (scenarioId.includes('taxi') || roleKo.includes('기사')) return '🚕';
  if (scenarioId.includes('cafe') || roleKo.includes('바리스타') || roleKo.includes('카페')) return '☕';
  if (scenarioId.includes('restaurant') || roleKo.includes('식당') || roleKo.includes('음식점')) return '🍲';
  if (scenarioId.includes('convenience') || roleKo.includes('편의점')) return '🏪';
  if (scenarioId.includes('subway') || roleKo.includes('역무원')) return '🚇';
  if (scenarioId.includes('pharmacy') || roleKo.includes('약사')) return '💊';
  if (scenarioId.includes('market') || roleKo.includes('상인')) return '🍎';
  if (scenarioId.includes('noraebang') || roleKo.includes('노래방')) return '🎤';
  if (scenarioId.includes('friend') || roleKo.includes('친구') || roleKo.includes('민지')) return '🙋‍♀️';
  if (scenarioId.includes('freetalk') || roleKo.includes('지우')) return '💬';
  return '💬';
}

export default function AiConversationMenu({
  credits = 0,
  onSpendCredits,
  onOpenCreditModal
}: AiConversationMenuProps = {}) {
  // Scenario Selection Gate: Banner only appears AFTER a scenario is selected
  const [isScenarioSelected, setIsScenarioSelected] = useState<boolean>(false);
  
  // Modes: 'live' (Real-time Gemini AI roleplay) vs 'tree' (Branching Tree)
  const [conversationMode, setConversationMode] = useState<ConversationMode>('live');
  const [activeScenarioId, setActiveScenarioId] = useState<string>('taxi');
  const [activeCategory, setActiveCategory] = useState<'all' | 'travel' | 'food' | 'lifestyle' | 'social'>('all');
  
  // Live AI Conversation State
  const [liveMessages, setLiveMessages] = useState<LiveMessage[]>([]);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [liveSuggestedReplies, setLiveSuggestedReplies] = useState<string[]>([]);
  
  // Tree mode state
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
  const [inputMessage, setInputMessage] = useState<string>('');
  
  // Track scenarios unlocked with credits
  const [unlockedScenarios, setUnlockedScenarios] = useState<Record<string, boolean>>({
    taxi: true // Taxi is default unlocked for immediate trial
  });
  const [creditError, setCreditError] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const speakTimeoutRef = useRef<any>(null);

  const currentScenario = 
    ALL_SCENARIOS.find(s => s.id === activeScenarioId) || ALL_SCENARIOS[0];
  const currentNode: DialogueNode = 
    (currentScenario as any).nodes?.[currentNodeId] || (currentScenario as any).nodes?.[(currentScenario as any).rootNodeId] || {
      id: 'default',
      stepIndex: 1,
      totalSteps: 1,
      speakerRoleKo: currentScenario?.roleKo || 'AI Partner',
      speakerRoleEn: currentScenario?.roleEn || 'AI Partner',
      aiMessageKo: SCENARIO_OPENINGS[activeScenarioId]?.aiKorean || '안녕하세요!',
      aiMessageRomanized: SCENARIO_OPENINGS[activeScenarioId]?.aiRomanized || '',
      aiMessageEn: SCENARIO_OPENINGS[activeScenarioId]?.aiEnglish || '',
      choices: []
    };

  const speakerEmoji = getSpeakerEmoji(activeScenarioId, currentScenario?.roleKo);

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
  }, []);

  // Handle scenario switch
  useEffect(() => {
    if (isScenarioSelected) {
      startScenario(activeScenarioId);
    }
    return () => {
      if (speakTimeoutRef.current) {
        clearTimeout(speakTimeoutRef.current);
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeScenarioId, conversationMode, isScenarioSelected]);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [liveMessages, history, isAiThinking, currentNodeId, selectedEnding]);

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
      const targetScenario = ALL_SCENARIOS.find(s => s.id === scenarioId);
      const desc = `AI 실시간 회화 (${targetScenario?.titleKo || '시나리오'}) (-${CONVERSATION_COST} CR)`;
      const success = onSpendCredits(CONVERSATION_COST, desc);
      if (!success) {
        setCreditError(`회화 세션 시작을 위해 ${CONVERSATION_COST} 크레딧(CR)이 필요합니다. 크레딧을 충전해 주세요.`);
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

    const opening = SCENARIO_OPENINGS[scenarioId] || SCENARIO_OPENINGS.taxi;
    const initialAiMsg: LiveMessage = {
      id: `ai_init_${Date.now()}`,
      sender: 'ai',
      textKo: opening.aiKorean,
      romanized: opening.aiRomanized,
      textEn: opening.aiEnglish,
      speakerRoleKo: opening.roleKo,
      speakerRoleEn: opening.roleEn,
      suggestedReplies: opening.suggestedReplies,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setLiveMessages([initialAiMsg]);
    setLiveSuggestedReplies(opening.suggestedReplies);
    setIsAiThinking(false);

    // Tree Mode reset
    const scenario = BRANCHING_SCENARIOS.find(s => s.id === scenarioId) || BRANCHING_SCENARIOS[0];
    setCurrentNodeId(scenario.rootNodeId);
    setSelectedEnding(null);
    setInputMessage('');
    setHistory([]);
    setCreditError(null);

    if (autoSpeak) {
      speakTimeoutRef.current = setTimeout(() => {
        handleSpeakText(opening.aiKorean, 'ai', true);
      }, 500);
    }
  };

  // Live AI Message Submission (Real API Call to /api/live-conversation)
  const handleSendLiveMessage = async (userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed || isAiThinking) return;

    // Check credits
    if (!unlockedScenarios[activeScenarioId]) {
      const ok = checkAndDeductCredits(activeScenarioId);
      if (!ok) return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const userMsg: LiveMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      textKo: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const nextHistory = [...liveMessages, userMsg];
    setLiveMessages(nextHistory);
    setInputMessage('');
    setIsAiThinking(true);

    if (autoSpeak) {
      handleSpeakText(trimmed, 'user', true);
    }

    try {
      const res = await fetch('/api/live-conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: activeScenarioId,
          userMessage: trimmed,
          history: nextHistory.map(m => ({
            sender: m.sender,
            korean: m.textKo,
            text: m.textKo
          }))
        })
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      const opening = SCENARIO_OPENINGS[activeScenarioId] || SCENARIO_OPENINGS.taxi;

      const aiMsg: LiveMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        textKo: data.aiKorean || '네, 말씀 잘 들었습니다! 더 말씀해 주세요.',
        romanized: data.aiRomanized,
        textEn: data.aiEnglish,
        feedbackKo: data.feedbackKo,
        feedbackEn: data.feedbackEn,
        suggestedReplies: data.suggestedReplies || [],
        speakerRoleKo: opening.roleKo,
        speakerRoleEn: opening.roleEn,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setLiveMessages(prev => [...prev, aiMsg]);
      if (data.suggestedReplies && data.suggestedReplies.length > 0) {
        setLiveSuggestedReplies(data.suggestedReplies);
      }

      if (autoSpeak && aiMsg.textKo) {
        setTimeout(() => {
          handleSpeakText(aiMsg.textKo, 'ai', false);
        }, 300);
      }
    } catch (err) {
      console.warn('[Live Conversation Error]:', err);
      const opening = SCENARIO_OPENINGS[activeScenarioId] || SCENARIO_OPENINGS.taxi;
      const fallbackAiMsg: LiveMessage = {
        id: `ai_fallback_${Date.now()}`,
        sender: 'ai',
        textKo: '네, 말씀 잘 들었습니다! 계속해서 편하게 한국어로 말씀해 보세요 😊',
        romanized: 'Ne, malsseum jal deureosseumnida! Gyesokhaeseo pyeonhage hangugeoro malsseumhae boseyo.',
        textEn: 'Yes, I heard you well! Please continue speaking comfortably in Korean 😊',
        feedbackKo: '자연스러운 질문 표현이에요! 아주 훌륭합니다.',
        feedbackEn: 'Clear and natural sentence structure! Great job.',
        suggestedReplies: [
          '네, 감사합니다! 계속 연습할게요. (Yes, thank you! I will keep practicing.)',
          '다시 한번 천천히 말씀해 주세요. (Please say that again slowly.)',
          '이 표현이 자연스러운가요? (Does this expression sound natural?)'
        ],
        speakerRoleKo: opening.roleKo,
        speakerRoleEn: opening.roleEn,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setLiveMessages(prev => [...prev, fallbackAiMsg]);
      setLiveSuggestedReplies(fallbackAiMsg.suggestedReplies || []);
    } finally {
      setIsAiThinking(false);
    }
  };

  // Tree Mode Choice Selection
  const handleSelectChoice = (choice: DialogueChoice) => {
    if (!unlockedScenarios[activeScenarioId]) {
      const success = checkAndDeductCredits(activeScenarioId);
      if (!success) return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    if (autoSpeak) {
      handleSpeakText(choice.textKo, 'user', true);
    }

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

    const nextNode = (currentScenario as any).nodes?.[choice.nextNodeId];
    if (nextNode) {
      setCurrentNodeId(choice.nextNodeId);
      setInputMessage('');

      if (nextNode.isEnding && nextNode.endingSummary) {
        setSelectedEnding(nextNode.endingSummary);
      } else {
        setSelectedEnding(null);
      }

      if (autoSpeak && nextNode.aiMessageKo) {
        setTimeout(() => {
          handleSpeakText(nextNode.aiMessageKo, 'ai', false);
        }, 800);
      }
    }
  };

  // Form submit handler for both modes
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isAiThinking) return;

    if (conversationMode === 'live') {
      handleSendLiveMessage(inputMessage);
    } else {
      const cleanInput = inputMessage.replace(/[\s.,?!]/g, '').toLowerCase();
      const matched = currentNode.choices.find(c => {
        const cleanChoice = c.textKo.replace(/[\s.,?!]/g, '').toLowerCase();
        return cleanChoice.includes(cleanInput) || cleanInput.includes(cleanChoice);
      });

      if (matched) {
        handleSelectChoice(matched);
      } else {
        setConversationMode('live');
        handleSendLiveMessage(inputMessage);
      }
    }
  };

  const toggleMicListen = () => {
    if (!recognitionRef.current) {
      alert('마이크 음성 인식이 지원되지 않는 브라우저입니다. 직접 입력하거나 추천 답변을 클릭해 보세요!');
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

  // 1. SCENARIO SELECTION SCREEN (Shown BEFORE scenario is selected)
  if (!isScenarioSelected) {
    return (
      <div className="space-y-6">
        {/* Intro Banner */}
        <div className="bg-[#1A1A1A] text-white rounded-xl p-5 sm:p-6 border border-neutral-800 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>AI Live Roleplay & Conversation</span>
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center space-x-1 font-mono">
                  <Coins className="w-3 h-3 text-rose-400" />
                  <span>{CONVERSATION_COST} CR / Session</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                시나리오를 선택해 주세요 (Choose a Scenario)
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300">
                원하시는 한국어 상황을 선택하시면 해당 상황의 상세 배너와 원어민 AI 실시간 대화창이 시작됩니다.
              </p>
            </div>

            {/* User Credit Balance */}
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

          {/* Conversation Mode Tabs */}
          <div className="flex items-center space-x-2 pt-2 border-t border-neutral-800">
            <button
              onClick={() => setConversationMode('live')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                conversationMode === 'live'
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI 실시간 대화 (Live AI)</span>
              <span className="px-1.5 py-0.2 bg-red-600 text-white text-[9px] rounded font-bold">Recommended</span>
            </button>

            <button
              onClick={() => setConversationMode('tree')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                conversationMode === 'tree'
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>단계별 시나리오 트리 (Branching Tree)</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="pt-2 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-neutral-400">
              카테고리 필터:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All (전체 10개)' },
                { id: 'travel', label: '🚗 Travel & Transit (3)' },
                { id: 'food', label: '☕ Food & Cafe (2)' },
                { id: 'lifestyle', label: '🏪 Daily Life (3)' },
                { id: 'social', label: '🤝 Social & Friends (2)' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-amber-400 text-black font-extrabold'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 10 Scenario Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_SCENARIOS
            .filter((sc) => activeCategory === 'all' || sc.category === activeCategory)
            .map((sc) => (
              <div
                key={sc.id}
                onClick={() => handleSelectScenario(sc.id)}
                className="bg-white border-2 border-neutral-200 hover:border-amber-400 rounded-xl p-5 cursor-pointer transition-all hover:shadow-lg flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl p-2 bg-neutral-100 group-hover:bg-amber-100 rounded-lg transition-colors">
                      {getSpeakerEmoji(sc.id, sc.roleKo)}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-300">
                      {sc.difficulty}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-base text-neutral-900 group-hover:text-amber-900 transition-colors">
                      {sc.titleKo}
                    </h3>
                    <p className="text-xs text-neutral-500">{sc.titleEn}</p>
                  </div>

                  <div className="text-xs text-neutral-600 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200">
                    <span className="font-bold text-neutral-800 block text-[11px] mb-0.5">상대방: {sc.roleKo}</span>
                    <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">{sc.settingKo}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full py-2.5 bg-neutral-900 group-hover:bg-amber-400 text-white group-hover:text-black font-bold text-xs rounded-lg transition-all flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
                >
                  <span>이 시나리오 대화 시작하기</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            ))}
        </div>
      </div>
    );
  }

  // 2. ACTIVE CONVERSATION SCREEN (Banner appears AFTER scenario is selected)
  return (
    <div className="space-y-6">
      {/* Top Banner (Shown AFTER selecting a scenario) */}
      <div className="bg-[#1A1A1A] text-white rounded-xl p-5 sm:p-6 border border-neutral-800 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>AI Live Roleplay & Conversation</span>
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center space-x-1 font-mono">
                <Coins className="w-3 h-3 text-rose-400" />
                <span>{CONVERSATION_COST} CR / Session</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-800 text-neutral-300 border border-neutral-700">
                Level: {currentScenario?.difficulty || 'All Levels'}
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight flex items-center space-x-2">
              <span>{currentScenario?.titleEn || 'Korean Conversation'}</span>
              <span className="text-sm sm:text-base font-normal text-neutral-400">({currentScenario?.titleKo})</span>
            </h2>

            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-neutral-300 pt-0.5">
              <span className="bg-neutral-800 text-amber-300 px-2.5 py-0.5 rounded font-bold border border-neutral-700">
                {speakerEmoji} {currentScenario?.roleEn || currentScenario?.roleKo}
              </span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-400 text-xs">
                원어민 AI와 실시간으로 묻고 답하며 피드백을 받는 쌍방향 회화
              </span>
            </div>
          </div>

          {/* Action Buttons & Credits */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => setIsScenarioSelected(false)}
              className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>다른 시나리오 선택</span>
            </button>

            <div className="bg-neutral-900 border border-neutral-700/80 rounded-lg p-2.5 sm:p-3 flex items-center justify-between sm:flex-col sm:justify-center shrink-0 min-w-[130px] shadow-xs">
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                Available Credits
              </span>
              <div className="flex items-center space-x-1.5 my-0.5">
                <Coins className="w-4 h-4 text-amber-400" />
                <span className="text-base sm:text-lg font-bold font-mono text-amber-300">
                  {credits} <span className="text-xs font-normal text-neutral-400">CR</span>
                </span>
              </div>
            </div>
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

        {/* Conversation Mode Tabs & Quick Scenario Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-800">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setConversationMode('live')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                conversationMode === 'live'
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI 실시간 대화 (Live AI)</span>
              <span className="px-1.5 py-0.2 bg-red-600 text-white text-[9px] rounded font-bold">Active</span>
            </button>

            <button
              onClick={() => setConversationMode('tree')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                conversationMode === 'tree'
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>단계별 시나리오 트리 (Branching Tree)</span>
            </button>
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
            {ALL_SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setActiveScenarioId(sc.id)}
                className={`px-2 py-1 rounded text-xs transition-all cursor-pointer shrink-0 ${
                  sc.id === activeScenarioId
                    ? 'bg-amber-400 text-black font-bold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
                title={sc.titleKo}
              >
                <span>{getSpeakerEmoji(sc.id, sc.roleKo)}</span>
                <span className="hidden sm:inline ml-1">{sc.titleKo.replace(/^[^\s]+\s/, '').substring(0, 5)}...</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Conversation Interactive Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left/Center Chat Screen (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <div className="bg-white border-2 border-neutral-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[650px]">
            
            {/* Top Bar: Active Status, Subtitles & Voice Options */}
            <div className="p-3.5 bg-neutral-100 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1.5 bg-amber-100 text-amber-950 font-bold px-2.5 py-1 rounded-md border border-amber-300 shadow-2xs">
                  <span>{speakerEmoji}</span>
                  <span>상대방: {SCENARIO_OPENINGS[activeScenarioId]?.roleKo || currentScenario?.roleKo}</span>
                </div>
                {conversationMode === 'live' ? (
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[11px] flex items-center space-x-1 border border-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    <span>AI 실시간 대화 모드</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-sky-100 text-sky-800 font-bold rounded text-[11px] border border-sky-300">
                    시나리오 분기 트리 모드
                  </span>
                )}
              </div>

              {/* View options & TTS Speed */}
              <div className="flex items-center space-x-2">
                {/* Reset button */}
                <button
                  onClick={() => startScenario(activeScenarioId)}
                  className="px-2 py-1 bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-300 rounded font-bold text-[11px] flex items-center space-x-1 cursor-pointer transition-colors shadow-2xs"
                  title="대화 처음부터 다시 시작"
                >
                  <RotateCcw className="w-3 h-3 text-neutral-500" />
                  <span>새로 시작</span>
                </button>

                {/* Subtitle mode */}
                <div className="flex items-center bg-white rounded border border-neutral-300 p-0.5 text-[11px] shadow-2xs">
                  <button
                    onClick={() => setSubtitleMode('full')}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      subtitleMode === 'full' ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                    title="한글 + 발음 + 영어 번역 모두 표시"
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
                    title="한글 전용"
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
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-neutral-300 rounded-lg shadow-xl p-2 z-30 space-y-1.5">
                      <p className="text-[10px] font-bold text-neutral-900">음성 속도</p>
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
            <div ref={chatContainerRef} className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-[#F9F8F6]">
              {conversationMode === 'live' ? (
                /* LIVE AI CONVERSATION TIMELINE */
                liveMessages.map((msg, idx) => {
                  const isAi = msg.sender === 'ai';

                  if (isAi) {
                    return (
                      <div key={msg.id || idx} className="space-y-2">
                        <div className="flex items-start space-x-3">
                          <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ring-1 ring-amber-300">
                            {speakerEmoji}
                          </div>
                          <div className="flex-1 space-y-1.5 max-w-[90%]">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold text-amber-950 bg-amber-100/90 px-2 py-0.5 rounded border border-amber-200">
                                {msg.speakerRoleKo || 'AI Partner'}
                              </span>
                              <button
                                onClick={() => handleSpeakText(msg.textKo, 'ai')}
                                className="text-neutral-500 hover:text-amber-800 p-0.5 cursor-pointer flex items-center space-x-1 text-[11px]"
                                title="다시 듣기"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                                <span>다시 듣기</span>
                              </button>
                            </div>

                            {/* Korean Speech Box */}
                            <div className="bg-white p-4 rounded-2xl rounded-tl-none border-2 border-amber-200 shadow-xs space-y-1.5">
                              <p className="text-base sm:text-lg font-serif font-bold text-neutral-900 leading-relaxed">
                                {msg.textKo}
                              </p>

                              {subtitleMode === 'full' && msg.romanized && (
                                <p className="text-xs font-mono text-amber-900/80 bg-amber-50/60 px-2.5 py-1 rounded border border-amber-200/50">
                                  🗣️ 발음: {msg.romanized}
                                </p>
                              )}

                              {subtitleMode !== 'ko-only' && msg.textEn && (
                                <p className="text-xs text-neutral-600 pt-1 border-t border-neutral-100">
                                  🇬🇧 번역: {msg.textEn}
                                </p>
                              )}
                            </div>

                            {/* Optional AI Feedback & Encouragement */}
                            {msg.feedbackKo && (
                              <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-950 flex items-start space-x-1.5 shadow-2xs">
                                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <div>
                                  <strong className="font-bold text-emerald-900">AI 튜터 피드백:</strong> {msg.feedbackKo}
                                  {subtitleMode !== 'ko-only' && msg.feedbackEn && (
                                    <span className="block text-[11px] text-emerald-800 mt-0.5 italic">{msg.feedbackEn}</span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // User message
                  return (
                    <div key={msg.id || idx} className="flex items-start justify-end space-x-3">
                      <div className="flex-1 text-right space-y-1 max-w-[85%]">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleSpeakText(msg.textKo, 'user')}
                            className="text-neutral-400 hover:text-neutral-700 p-0.5 cursor-pointer flex items-center space-x-1 text-[11px]"
                            title="내 발화 다시 듣기"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>내 발화</span>
                          </button>
                          <span className="text-xs font-bold text-neutral-700 bg-neutral-200 px-2 py-0.5 rounded">
                            화자 2 • 나
                          </span>
                        </div>
                        <div className="bg-[#1f1e1b] text-white px-4 py-3 rounded-2xl rounded-tr-none shadow-sm inline-block text-left">
                          <p className="text-sm sm:text-base font-serif font-medium leading-relaxed">
                            {msg.textKo}
                          </p>
                        </div>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-neutral-800 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm ring-1 ring-neutral-600">
                        <User className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })
              ) : (
                /* TREE CONVERSATION TIMELINE */
                <div className="space-y-4">
                  {history.map((turn, idx) => (
                    <div key={`turn-${idx}`} className="space-y-3 pb-3 border-b border-neutral-200/80">
                      <div className="flex items-start space-x-3">
                        <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                          {speakerEmoji}
                        </div>
                        <div className="flex-1 space-y-1">
                          <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                            {turn.speakerRoleKo}
                          </span>
                          <div className="bg-white px-4 py-3 rounded-xl border border-neutral-200 shadow-xs inline-block">
                            <p className="text-sm sm:text-base font-serif font-bold text-neutral-900">
                              {turn.aiMessageKo}
                            </p>
                          </div>
                        </div>
                      </div>

                      {turn.selectedChoice && (
                        <div className="flex items-start justify-end space-x-3 pt-1">
                          <div className="bg-[#242424] text-white px-4 py-2.5 rounded-xl text-left">
                            <p className="text-sm font-serif font-medium">{turn.selectedChoice.textKo}</p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-neutral-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            <User className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Current Active Node */}
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3">
                      <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
                        {speakerEmoji}
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <span className="text-xs font-bold text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded">
                          {currentNode.speakerRoleKo}
                        </span>
                        <div className="bg-white p-4 rounded-xl border-2 border-amber-300 shadow-sm space-y-1.5">
                          <p className="text-base sm:text-lg font-serif font-bold text-neutral-900">
                            "{currentNode.aiMessageKo}"
                          </p>
                          {subtitleMode !== 'ko-only' && (
                            <p className="text-xs text-neutral-600 border-t border-neutral-100 pt-1">
                              {currentNode.aiMessageEn}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {selectedEnding && (
                      <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-neutral-900 flex items-center space-x-1.5">
                            <Trophy className="w-4 h-4 text-amber-600" />
                            <span>{selectedEnding.badgeKo}</span>
                          </h4>
                          <span className="text-xs font-mono font-bold bg-amber-400 text-black px-2 py-0.5 rounded">
                            +{selectedEnding.xpEarned} XP
                          </span>
                        </div>
                        <p className="text-xs text-neutral-700">{selectedEnding.feedbackKo}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* AI Typing Indicator */}
              {isAiThinking && (
                <div className="flex items-center space-x-3 animate-in fade-in duration-200">
                  <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                    {speakerEmoji}
                  </div>
                  <div className="bg-white border border-amber-300 px-4 py-2.5 rounded-2xl rounded-tl-none shadow-2xs flex items-center space-x-2 text-xs font-medium text-neutral-600">
                    <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                    <span>원어민 AI가 자연스러운 한국어 답변을 생각하는 중입니다...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Interaction Area */}
            <div className="p-4 bg-white border-t-2 border-neutral-200 space-y-3">
              
              {/* Dynamic Suggested Replies (Click to Send Immediately) */}
              {conversationMode === 'live' && liveSuggestedReplies.length > 0 && !isAiThinking && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-neutral-600">
                    <span className="flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>추천 답변 선택 (클릭하면 바로 전송됩니다):</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {liveSuggestedReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendLiveMessage(reply.replace(/\s*\([^)]*\)$/, ''))}
                        className="px-3 py-1.5 bg-amber-50/90 hover:bg-amber-100 text-amber-950 border border-amber-300/80 rounded-lg text-xs font-serif font-medium text-left transition-all hover:scale-[1.01] cursor-pointer shadow-2xs flex items-center space-x-1"
                      >
                        <ChevronRight className="w-3 h-3 text-amber-700 shrink-0" />
                        <span>{reply}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tree Mode Choices Grid */}
              {conversationMode === 'tree' && !currentNode.isEnding && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-neutral-900">
                    답변 선택지 ({currentNode.choices.length}가지):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentNode.choices.map((choice, index) => (
                      <button
                        key={choice.id || index}
                        onClick={() => handleSelectChoice(choice)}
                        className="p-2.5 bg-neutral-50 hover:bg-amber-50 border border-neutral-200 hover:border-amber-400 rounded-lg text-left transition-all cursor-pointer"
                      >
                        <div className="text-xs font-serif font-bold text-neutral-900">{choice.textKo}</div>
                        <div className="text-[10px] text-neutral-500">{choice.textEn}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Form & Microphone */}
              <form onSubmit={handleFormSubmit} className="flex items-center space-x-2 pt-1">
                {micSupported && (
                  <button
                    type="button"
                    onClick={toggleMicListen}
                    className={`px-3 py-2.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-2xs shrink-0 ${
                      isListening 
                        ? 'bg-rose-600 text-white animate-pulse' 
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-300'
                    }`}
                    title={isListening ? "음성 인식 중지" : "마이크로 말하기"}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-amber-700" />}
                    <span className="hidden sm:inline">{isListening ? '듣는 중...' : '마이크'}</span>
                  </button>
                )}

                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="한국어로 자유롭게 질문하거나 답변을 입력하세요 (예: 강남역 가주세요, 얼만가요?)"
                  disabled={isAiThinking}
                  className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-amber-600 focus:bg-white font-serif transition-colors shadow-inner"
                />

                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isAiThinking}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-amber-600 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm shrink-0"
                >
                  {isAiThinking ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>생성 중</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>전송</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column: Scenario Context & Info (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Scenario Overview Card */}
          <div className="bg-white border-2 border-neutral-200 rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5">
              <span className="text-xs font-bold text-neutral-900 flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-amber-700" />
                <span>시나리오 맥락 및 역할</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold">
                {currentScenario?.badge || 'Roleplay'}
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <strong className="text-neutral-500 block text-[10px] uppercase font-mono">시나리오 제목</strong>
                <p className="text-sm font-serif font-bold text-neutral-900">{currentScenario?.titleKo}</p>
                <p className="text-xs text-neutral-500">{currentScenario?.titleEn}</p>
              </div>

              <div>
                <strong className="text-neutral-500 block text-[10px] uppercase font-mono">참여 인물</strong>
                <p className="font-bold text-neutral-800">{currentScenario?.roleKo || 'AI 원어민 상대방'}</p>
                <p className="text-[11px] text-neutral-500">{currentScenario?.roleEn}</p>
              </div>

              <div>
                <strong className="text-neutral-500 block text-[10px] uppercase font-mono">상황 설정 (Setting)</strong>
                <p className="text-neutral-700 leading-relaxed">{currentScenario?.settingKo || '한국 현지에서 자연스럽게 대화를 나눠보세요.'}</p>
              </div>
            </div>
          </div>

          {/* Useful Key Vocabulary for Scenario */}
          {currentScenario?.keyVocab && currentScenario.keyVocab.length > 0 && (
            <div className="bg-white border-2 border-neutral-200 rounded-xl p-4 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <span className="text-xs font-bold text-neutral-900 flex items-center space-x-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>이 상황 필수 표현</span>
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">Vocab</span>
              </div>

              <div className="space-y-2">
                {currentScenario.keyVocab.map((v, i) => (
                  <div key={i} className="p-2 bg-neutral-50 rounded border border-neutral-200 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-serif font-bold text-neutral-900 block">{v.ko}</span>
                      <span className="text-[10px] text-neutral-500">{v.en}</span>
                    </div>
                    <button
                      onClick={() => handleSpeakText(v.ko, 'ai')}
                      className="p-1 text-neutral-400 hover:text-amber-800 cursor-pointer"
                      title="발음 듣기"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Conversation Tips */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200 rounded-xl p-4 space-y-2 text-xs">
            <h4 className="font-bold text-amber-950 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>실전 회화 팁 (Pro-Tips)</span>
            </h4>
            <ul className="text-neutral-700 space-y-1.5 list-disc list-inside leading-relaxed text-[11px]">
              <li>원어민 AI에게 원하는 질문이나 요구사항을 자유롭게 말씀해 보세요.</li>
              <li>음성 마이크 버튼을 눌러 실시간 발음으로 직접 말해보세요.</li>
              <li>막힐 때는 AI가 제공하는 <strong>추천 답변 칩</strong>을 클릭하여 매끄럽게 대화를 이어갈 수 있습니다.</li>
              <li>상단 <strong>스피커</strong> 버튼으로 원어민 발음을 언제든 다시 들을 수 있습니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
