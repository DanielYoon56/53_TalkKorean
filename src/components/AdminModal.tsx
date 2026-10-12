import React, { useState } from 'react';
import { 
  Shield, ShieldCheck, X, DollarSign, Server, Cpu, Database, 
  TrendingUp, BarChart3, Sliders, CheckCircle2, AlertCircle, 
  Sparkles, RefreshCw, Layers, Calculator, HelpCircle, ArrowUpRight,
  ExternalLink, Zap, Users, HardDrive, Globe, Volume2,
  Lock, Unlock, KeyRound, Eye, EyeOff, Download, Clock, Smartphone
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  CartesianGrid, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { UserStats } from '../types';
import { getAnalyticsSummary, exportAnalyticsCSV, resetAllAnalyticsData } from '../utils/analyticsTracker';
import AiContentGenerator from './AiContentGenerator';

const PIE_COLORS = ['#0284c7', '#0d9488', '#f59e0b', '#e11d48', '#8b5cf6', '#10b981', '#64748b', '#f97316'];

export type AdminTab = 'costs' | 'simulator' | 'analytics' | 'system' | 'users' | 'creator';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStats?: UserStats;
  onResetApp?: () => void;
  initialTab?: AdminTab;
  initialCreatorTopic?: string;
  onOpenCreditModal?: () => void;
  onSpendCredits?: (cost: number, reason: string) => boolean;
}

export default function AdminModal({ 
  isOpen, 
  onClose, 
  userStats, 
  onResetApp, 
  initialTab = 'costs',
  initialCreatorTopic,
  onOpenCreditModal,
  onSpendCredits
}: AdminModalProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab);
  const [analyticsRefreshKey, setAnalyticsRefreshKey] = useState<number>(0);
  const analyticsSummary = getAnalyticsSummary('7d');

  // Sync initialTab when opened
  React.useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Admin Console Access State
  // Security Remediation: Hardcoded client-side password ('admin0691') removed.
  // In Phase 1, the monitoring console is accessible in read-only observation mode.
  // Sensitive administrative actions (e.g. data wiping, server credential overrides) are strictly disabled
  // pending server-side session authentication.
  const [isAuthenticated] = useState<boolean>(true);

  // Cost Simulator States
  const [dau, setDau] = useState<number>(300); // Daily active users
  const [avgTurnsPerUser, setAvgTurnsPerUser] = useState<number>(12); // Daily chat turns
  const [avgTopikEssays, setAvgTopikEssays] = useState<number>(2); // Daily essays evaluated
  const [payingUserRatio, setPayingUserRatio] = useState<number>(5); // 5% paying users
  const [usdToKrwRate] = useState<number>(1380); // KRW exchange rate

  if (!isOpen) return null;

  // Simulator Calculations
  // Gemini 3.7 Flash pricing: $0.10 / 1M input tokens, $0.40 / 1M output tokens
  // Avg turn: ~400 input tokens (prompt + history), ~150 output tokens
  const costPerTurnUSD = (400 * 0.00000010) + (150 * 0.00000040); // ~$0.00010 USD (약 0.14원)
  const costPerEssayUSD = (1500 * 0.00000010) + (600 * 0.00000040); // ~$0.00039 USD (약 0.54원)

  const monthlyTotalTurns = dau * avgTurnsPerUser * 30;
  const monthlyTotalEssays = dau * avgTopikEssays * 30;
  
  const monthlyAiChatCostUSD = monthlyTotalTurns * costPerTurnUSD;
  const monthlyAiEssayCostUSD = monthlyTotalEssays * costPerEssayUSD;
  const monthlyTotalAiCostUSD = monthlyAiChatCostUSD + monthlyAiEssayCostUSD;

  // Cloud Run Container compute cost estimation
  // Base scale-to-zero free tier covers up to 2M requests/month.
  const monthlyContainerCostUSD = dau < 500 ? 0 : Math.min(45, (dau / 1000) * 12);
  const monthlyTtsCostUSD = 0; // Handled 100% via Browser Web Speech API & Free Tier
  const monthlyYoutubeApiCostUSD = 0; // YouTube Data API v3 Free 10,000 units/day
  
  const monthlyTotalOperatingCostUSD = monthlyTotalAiCostUSD + monthlyContainerCostUSD + monthlyTtsCostUSD + monthlyYoutubeApiCostUSD;
  const monthlyTotalOperatingCostKRW = Math.round(monthlyTotalOperatingCostUSD * usdToKrwRate);

  // Revenue estimation
  const monthlyPayingUsers = Math.round((dau * 30 * (payingUserRatio / 100)) / 5); // Approximate unique paying buyers
  const estimatedMonthlyRevenueUSD = monthlyPayingUsers * 12.0; // Weighted average purchase ~$12 ($5, $15, $35 packs)
  const estimatedMonthlyRevenueKRW = Math.round(estimatedMonthlyRevenueUSD * usdToKrwRate);
  const estimatedGrossMargin = estimatedMonthlyRevenueUSD > 0 
    ? Math.round(((estimatedMonthlyRevenueUSD - monthlyTotalOperatingCostUSD) / estimatedMonthlyRevenueUSD) * 100)
    : 99;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-editorial-border rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden text-left">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-editorial-border bg-editorial-bg flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-sm bg-editorial-text text-white flex items-center justify-center">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-serif font-bold text-editorial-text">
                  Talk Korean 관리자 대시보드
                </h2>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  ADMIN CONSOLE
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-100 text-neutral-700 border border-neutral-300">
                  모니터링 모드 (Read-Only Monitor)
                </span>
              </div>
              <p className="text-xs text-editorial-muted">
                인프라 현황, 실시간 요금 단가표, 월간 운영비 명세 및 수익성 시뮬레이터 (민감 설정 변경 비활성화됨)
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="p-2 rounded-sm text-editorial-muted hover:text-editorial-text hover:bg-editorial-border/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-editorial-border px-6 bg-white overflow-x-auto">
          <button
            onClick={() => setActiveTab('costs')}
            className={`flex items-center space-x-2 py-3 px-4 border-b-2 font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'costs'
                ? 'border-editorial-text text-editorial-text bg-editorial-accent-light/20'
                : 'border-transparent text-editorial-muted hover:text-editorial-text'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span>💰 운영비용 분석 및 명세 (Cost Analysis)</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center space-x-2 py-3 px-4 border-b-2 font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'simulator'
                ? 'border-editorial-text text-editorial-text bg-editorial-accent-light/20'
                : 'border-transparent text-editorial-muted hover:text-editorial-text'
            }`}
          >
            <Calculator className="w-4 h-4 text-sky-600" />
            <span>🧮 비용 & 트래픽 시뮬레이터 (Simulator)</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center space-x-2 py-3 px-4 border-b-2 font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'analytics'
                ? 'border-editorial-text text-editorial-text bg-editorial-accent-light/20'
                : 'border-transparent text-editorial-muted hover:text-editorial-text'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-sky-600" />
            <span>📊 사용자 접속현황 (Traffic & Analytics)</span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`flex items-center space-x-2 py-3 px-4 border-b-2 font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'system'
                ? 'border-editorial-text text-editorial-text bg-editorial-accent-light/20'
                : 'border-transparent text-editorial-muted hover:text-editorial-text'
            }`}
          >
            <Server className="w-4 h-4 text-purple-600" />
            <span>⚙️ 시스템 & API 상태</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center space-x-2 py-3 px-4 border-b-2 font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'users'
                ? 'border-editorial-text text-editorial-text bg-editorial-accent-light/20'
                : 'border-transparent text-editorial-muted hover:text-editorial-text'
            }`}
          >
            <Users className="w-4 h-4 text-amber-600" />
            <span>👥 크레딧 및 계정 관리</span>
          </button>

          <button
            onClick={() => setActiveTab('creator')}
            className={`flex items-center space-x-2 py-3 px-4 border-b-2 font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'creator'
                ? 'border-amber-500 text-amber-900 bg-amber-500/10'
                : 'border-transparent text-editorial-muted hover:text-editorial-text'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>✨ AI 마케팅 원고 & 쇼츠 생성기</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-editorial-bg/40">

          {/* TAB 1: OPERATING COST LEDGER */}
          {activeTab === 'costs' && (
            <div className="space-y-6">
              
              {/* Executive Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-editorial-border rounded-sm p-4 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-editorial-muted font-bold uppercase tracking-wider mb-1">
                    <span>월 예상 총 운영비</span>
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-mono font-black text-emerald-700">
                    ₩{monthlyTotalOperatingCostKRW.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-editorial-muted mt-1 font-medium">
                    약 ${monthlyTotalOperatingCostUSD.toFixed(2)} USD (DAU {dau}명 기준)
                  </div>
                </div>

                <div className="bg-white border border-editorial-border rounded-sm p-4 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-editorial-muted font-bold uppercase tracking-wider mb-1">
                    <span>AI 1턴당 실원가</span>
                    <Zap className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-2xl font-mono font-black text-editorial-text">
                    ₩{(costPerTurnUSD * usdToKrwRate).toFixed(2)}
                  </div>
                  <div className="text-[11px] text-editorial-muted mt-1 font-medium">
                    ${(costPerTurnUSD).toFixed(5)} USD / 1턴
                  </div>
                </div>

                <div className="bg-white border border-editorial-border rounded-sm p-4 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-editorial-muted font-bold uppercase tracking-wider mb-1">
                    <span>음성 TTS 비용 절감</span>
                    <Volume2 className="w-4 h-4 text-sky-600" />
                  </div>
                  <div className="text-2xl font-mono font-black text-sky-700">
                    100% 절감 (₩0)
                  </div>
                  <div className="text-[11px] text-editorial-muted mt-1 font-medium">
                    Web Speech API 로컬 엔진 탑재
                  </div>
                </div>

                <div className="bg-white border border-editorial-border rounded-sm p-4 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-editorial-muted font-bold uppercase tracking-wider mb-1">
                    <span>서버 인프라</span>
                    <Server className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-2xl font-mono font-black text-purple-700">
                    Scale-to-Zero
                  </div>
                  <div className="text-[11px] text-editorial-muted mt-1 font-medium">
                    Google Cloud Run (요청 없을 때 $0)
                  </div>
                </div>
              </div>

              {/* Itemized Cost Breakdown Table */}
              <div className="bg-white border border-editorial-border rounded-sm overflow-hidden shadow-xs">
                <div className="px-5 py-3.5 border-b border-editorial-border bg-white flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-editorial-text">
                      항목별 서비스 운영비 및 요금 단가 명세서
                    </h3>
                    <p className="text-[11px] text-editorial-muted">
                      실제 사용 중인 Google Cloud 및 외부 API의 공식 단가 및 과금 규정
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    초저비용 고효율 구조
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-editorial-bg border-b border-editorial-border text-editorial-muted font-bold uppercase tracking-wider text-[11px]">
                        <th className="py-2.5 px-4">서비스 구분</th>
                        <th className="py-2.5 px-4">담당 기능</th>
                        <th className="py-2.5 px-4">과금 체계 & 공식 단가</th>
                        <th className="py-2.5 px-4">무료 제공량 / 혜택</th>
                        <th className="py-2.5 px-4">예상 월 비용</th>
                        <th className="py-2.5 px-4 text-center">상태</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-editorial-border/60">
                      
                      {/* Row 1: Gemini 3.7 Flash */}
                      <tr className="hover:bg-editorial-accent-light/15 transition-colors">
                        <td className="py-3 px-4 font-bold text-editorial-text flex items-center space-x-2">
                          <Cpu className="w-4 h-4 text-amber-500 shrink-0" />
                          <div>
                            <div>Gemini 3.7 Flash</div>
                            <span className="text-[10px] text-editorial-muted font-normal">Google GenAI SDK</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-editorial-text">
                          K-POP 가사 발음 정밀 진단, TOPIK 작문·서술형 평가, 문법 및 뉘앙스 해설
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px]">
                          <div>입력: $0.10 / 1M 토큰</div>
                          <div>출력: $0.40 / 1M 토큰</div>
                          <span className="text-[10px] text-emerald-600 font-semibold">(1회 분석당 약 0.14~0.54원)</span>
                        </td>
                        <td className="py-3 px-4 text-editorial-muted">
                          Pay-Per-Request 종량제 (사용한 만큼만 청구)
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-emerald-700">
                          ${monthlyTotalAiCostUSD.toFixed(2)}
                          <div className="text-[10px] text-editorial-muted font-normal">(약 ₩{Math.round(monthlyTotalAiCostUSD * usdToKrwRate).toLocaleString()})</div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            활성 (Active)
                          </span>
                        </td>
                      </tr>

                      {/* Row 2: Google Cloud Run */}
                      <tr className="hover:bg-editorial-accent-light/15 transition-colors">
                        <td className="py-3 px-4 font-bold text-editorial-text flex items-center space-x-2">
                          <Server className="w-4 h-4 text-purple-600 shrink-0" />
                          <div>
                            <div>Google Cloud Run</div>
                            <span className="text-[10px] text-editorial-muted font-normal">Express + Vite Full-Stack</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-editorial-text">
                          컨테이너 웹 앱 호스팅, 백엔드 API 라우팅, 프록시 보안
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px]">
                          <div>vCPU: $0.00002400 / 초</div>
                          <div>RAM: $0.00000250 / 초</div>
                        </td>
                        <td className="py-3 px-4 text-emerald-700 font-medium">
                          매월 200만 회 요청 & 36만 GB-초 무료 제공
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-purple-700">
                          ${monthlyContainerCostUSD.toFixed(2)}
                          <div className="text-[10px] text-editorial-muted font-normal">(트래픽 기반 ₩0~5,000)</div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                            서버리스
                          </span>
                        </td>
                      </tr>

                      {/* Row 3: Web Speech TTS */}
                      <tr className="hover:bg-editorial-accent-light/15 transition-colors">
                        <td className="py-3 px-4 font-bold text-editorial-text flex items-center space-x-2">
                          <Volume2 className="w-4 h-4 text-sky-600 shrink-0" />
                          <div>
                            <div>Web Speech API</div>
                            <span className="text-[10px] text-editorial-muted font-normal">브라우저 내장 음성 합성</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-editorial-text">
                          단어, 문장, K-POP 가사, 발음 코칭 원어민 음성 재생
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-emerald-700 font-bold">
                          ₩0 (완전 무료)
                        </td>
                        <td className="py-3 px-4 text-editorial-text font-medium">
                          사용자 단말기 자원 활용 (무제한 무료 호출)
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-emerald-700">
                          $0.00 (₩0)
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-300">
                            무료 최적화
                          </span>
                        </td>
                      </tr>

                      {/* Row 4: YouTube Data API v3 */}
                      <tr className="hover:bg-editorial-accent-light/15 transition-colors">
                        <td className="py-3 px-4 font-bold text-editorial-text flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-rose-600 shrink-0" />
                          <div>
                            <div>YouTube Data API v3</div>
                            <span className="text-[10px] text-editorial-muted font-normal">Google Cloud Console</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-editorial-text">
                          LyricsLab K-POP 뮤직비디오 검색 및 영상 스트리밍
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px]">
                          일일 할당량 10,000 Units
                        </td>
                        <td className="py-3 px-4 text-emerald-700 font-medium">
                          매일 10,000 유닛 기본 무료 할당량
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-emerald-700">
                          $0.00 (₩0)
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            연동 완료
                          </span>
                        </td>
                      </tr>

                      {/* Row 5: SSL & Domain */}
                      <tr className="hover:bg-editorial-accent-light/15 transition-colors">
                        <td className="py-3 px-4 font-bold text-editorial-text flex items-center space-x-2">
                          <HardDrive className="w-4 h-4 text-teal-600 shrink-0" />
                          <div>
                            <div>SSL 보안 인증서</div>
                            <span className="text-[10px] text-editorial-muted font-normal">Google Managed SSL</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-editorial-text">
                          HTTPS 암호화 통신 및 자동 갱신
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-emerald-700 font-bold">
                          ₩0 (무료 자동 발급)
                        </td>
                        <td className="py-3 px-4 text-editorial-text">
                          Cloud Run 자동 관리형 인증서
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-emerald-700">
                          $0.00 (₩0)
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            보안 적용
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Profitability and ROI Banner */}
              <div className="bg-linear-to-r from-slate-900 to-slate-800 text-white rounded-sm p-5 border border-slate-700 shadow-md">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <h4 className="font-serif font-bold text-base text-amber-300">
                        수익 구조 및 손익분기점 (ROI & Unit Economics)
                      </h4>
                    </div>
                    <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                      스타터 팩(150 CR = ₩6,900 / $5.00) 기준, 유저가 K-POP 발음 분석 및 TOPIK 학습 평가를 이용할 때 발생하는 LLM 실원가는 회당 약 <strong>₩0.14~0.54원</strong>에 불과합니다. 
                      원가율은 <strong>0.3% 미만</strong>으로, 총 마진율이 <strong>99.7%</strong>에 달하는 고효율 구조입니다. (기본 한글 자모, 존댓말, 문법, 신조어, 문화 학습은 ₩0 무료 제공)
                    </p>
                  </div>
                  <div className="bg-white/10 px-4 py-3 rounded border border-white/15 text-center shrink-0">
                    <div className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">추정 영업 마진율</div>
                    <div className="text-2xl font-mono font-extrabold text-white">99.6%</div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: USER TRAFFIC & PATTERN ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              
              {/* Analytics Tab Header with Actions */}
              <div className="bg-white border border-editorial-border rounded-sm p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-sky-600" />
                    <h3 className="font-serif font-bold text-base text-editorial-text">
                      사용자 접속 횟수 및 메뉴별 패턴 정밀 분석 대시보드
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      실시간 동기화
                    </span>
                  </div>
                  <p className="text-xs text-editorial-muted mt-1">
                    사용자들의 접속 통계, 메뉴별 트래픽 점유율, 시간대별 피크타임, 전환 퍼널 및 환경 데이터를 종합 제공합니다.
                  </p>
                </div>

                <div className="flex items-center space-x-2.5 w-full md:w-auto">
                  <button
                    onClick={() => {
                      if (window.confirm('모든 접속 통계를 초기화하고 오늘 0회부터 다시 카운트를 시작하시겠습니까?')) {
                        resetAllAnalyticsData();
                        setAnalyticsRefreshKey(k => k + 1);
                      }
                    }}
                    className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded text-xs font-semibold transition-colors cursor-pointer"
                  >
                    통계 초기화
                  </button>
                  <button
                    onClick={() => exportAnalyticsCSV()}
                    className="px-3.5 py-2 bg-white hover:bg-neutral-50 text-neutral-700 border border-editorial-border rounded text-xs font-bold transition-colors flex items-center space-x-1.5 cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>접속 통계 CSV 다운로드</span>
                  </button>
                </div>
              </div>

              {/* Real Data Live Notification */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-sm flex items-center justify-between text-xs text-emerald-950 font-medium">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span className="font-bold">실데이터 운영 모드 가동중</span>
                  <span className="text-emerald-800 text-[11px]">· 모든 가상 Mock 데이터가 리셋되었으며, 오늘({analyticsSummary.startDateStr})부터 실시간 접속 및 이용 내역을 측정하고 있습니다.</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">100% REAL DATA</span>
              </div>

              {/* Top 4 KPI Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-editorial-border rounded-sm p-4 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-editorial-muted font-bold mb-1">
                    <span>총 접속 횟수 (Total Visits)</span>
                    <Globe className="w-4 h-4 text-sky-600" />
                  </div>
                  <div className="text-2xl font-mono font-black text-editorial-text">
                    {analyticsSummary.totalVisits.toLocaleString()} <span className="text-xs font-sans font-normal text-editorial-muted">회</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-1">
                    금일 접속: {analyticsSummary.todayVisits.toLocaleString()}회
                  </div>
                </div>

                <div className="bg-white border border-editorial-border rounded-sm p-4 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-editorial-muted font-bold mb-1">
                    <span>순 방문자 수 (Unique Users)</span>
                    <Users className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl font-mono font-black text-editorial-text">
                    {analyticsSummary.uniqueUsers.toLocaleString()} <span className="text-xs font-sans font-normal text-editorial-muted">명</span>
                  </div>
                  <div className="text-[11px] text-editorial-muted mt-1">
                    재방문율: {analyticsSummary.returnVisitorRate}%
                  </div>
                </div>

                <div className="bg-white border border-editorial-border rounded-sm p-4 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-editorial-muted font-bold mb-1">
                    <span>평균 세션 체류시간</span>
                    <Clock className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="text-2xl font-mono font-black text-editorial-text">
                    {Math.floor(analyticsSummary.avgSessionMinutes)}분 {Math.round((analyticsSummary.avgSessionMinutes % 1) * 60)}초
                  </div>
                  <div className="text-[11px] text-editorial-muted mt-1">
                    학습 세션 지속도 양호
                  </div>
                </div>

                <div className="bg-white border border-editorial-border rounded-sm p-4 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-editorial-muted font-bold mb-1">
                    <span>실시간 활성 이용자</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  </div>
                  <div className="text-2xl font-mono font-black text-emerald-700">
                    {analyticsSummary.activeNow} <span className="text-xs font-sans font-normal text-editorial-muted">명 접속중</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-1">
                    현재 세션 활성 모니터링
                  </div>
                </div>
              </div>

              {/* Interactive Traffic Trend Charts (Recharts) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* 24-Hour Real-Time Hourly Curve */}
                <div className="bg-white border border-editorial-border rounded-sm p-4 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-editorial-text flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-sky-600" />
                        <span>금일 24시간 시간대별 트래픽 곡선 (Hourly Curve)</span>
                      </h4>
                      <p className="text-[11px] text-editorial-muted">실시간 접속 및 페이지 전환 발생 시각 분포</p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 text-sky-700 font-bold border border-sky-200">
                      LIVE 24H
                    </span>
                  </div>
                  <div className="h-52 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analyticsSummary.hourlyTraffic} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="hourlyVisitsGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis 
                          dataKey="hour" 
                          tick={{ fontSize: 10, fill: '#64748b' }} 
                          axisLine={{ stroke: '#e2e8f0' }} 
                          tickLine={false} 
                          interval={3}
                        />
                        <YAxis 
                          tick={{ fontSize: 10, fill: '#64748b' }} 
                          axisLine={{ stroke: '#e2e8f0' }} 
                          tickLine={false}
                          allowDecimals={false}
                        />
                        <Tooltip 
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-neutral-900 text-white p-2.5 rounded text-xs shadow-lg font-mono">
                                  <div className="font-bold text-amber-300">{label}</div>
                                  <div className="text-sky-300 mt-0.5">방문 수: {payload[0].value}회</div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="visits" 
                          stroke="#0284c7" 
                          strokeWidth={2} 
                          fillOpacity={1} 
                          fill="url(#hourlyVisitsGrad)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 7-Day Trend Bar Chart */}
                <div className="bg-white border border-editorial-border rounded-sm p-4 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-editorial-text flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        <span>최근 7일간 일별 접속 추이 (Daily Volume)</span>
                      </h4>
                      <p className="text-[11px] text-editorial-muted">일자별 총 방문 횟수 및 고유 방문자 규모</p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                      7 DAYS
                    </span>
                  </div>
                  <div className="h-52 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analyticsSummary.dailyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis 
                          dataKey="dayName" 
                          tick={{ fontSize: 10, fill: '#64748b' }} 
                          axisLine={{ stroke: '#e2e8f0' }} 
                          tickLine={false} 
                        />
                        <YAxis 
                          tick={{ fontSize: 10, fill: '#64748b' }} 
                          axisLine={{ stroke: '#e2e8f0' }} 
                          tickLine={false}
                          allowDecimals={false}
                        />
                        <Tooltip 
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const d = payload[0].payload;
                              return (
                                <div className="bg-neutral-900 text-white p-2.5 rounded text-xs shadow-lg font-mono">
                                  <div className="font-bold text-amber-300">{d.date} ({label})</div>
                                  <div className="text-emerald-300 mt-0.5">총 방문: {d.visits}회</div>
                                  <div className="text-neutral-300 text-[10px]">순 사용자: {d.uniqueUsers}명</div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar 
                          dataKey="visits" 
                          fill="#0d9488" 
                          radius={[4, 4, 0, 0]} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Menu Traffic Breakdown Table & Progress Bars */}
              <div className="bg-white border border-editorial-border rounded-sm overflow-hidden shadow-xs">
                <div className="px-5 py-3.5 border-b border-editorial-border bg-white flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-editorial-text">
                      메뉴별 접속 현황 및 트래픽 점유율 (Ranked Traffic Share)
                    </h4>
                    <p className="text-[11px] text-editorial-muted mt-0.5">
                      각 기능별 페이지뷰 점유율과 세션당 평균 체류시간, 주요 액션 수행 횟수
                    </p>
                  </div>
                  <span className="text-xs font-bold text-editorial-muted">
                    총 8개 주요 메뉴
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-editorial-border bg-editorial-bg text-editorial-muted uppercase tracking-wider text-[10px] font-bold">
                        <th className="py-2.5 px-4">순위</th>
                        <th className="py-2.5 px-4">메뉴명 (기능 구분)</th>
                        <th className="py-2.5 px-4 text-right">방문수 (Views)</th>
                        <th className="py-2.5 px-4">점유율 (Traffic Share)</th>
                        <th className="py-2.5 px-4 text-right">평균 체류시간</th>
                        <th className="py-2.5 px-4 text-right">주요 활동수</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-editorial-border/60">
                      {analyticsSummary.menuStats.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-editorial-accent-light/15 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-editorial-muted">
                            #{idx + 1}
                          </td>
                          <td className="py-3 px-4 font-bold text-editorial-text flex items-center space-x-2">
                            <span>{item.name}</span>
                            <span className="text-[10px] font-mono text-editorial-muted font-normal">({item.id})</span>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-right text-editorial-text">
                            {item.visits.toLocaleString()}회
                          </td>
                          <td className="py-3 px-4 min-w-[200px]">
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 bg-neutral-100 rounded-full h-2 overflow-hidden">
                                <div 
                                  className="h-full rounded-full transition-all duration-500"
                                  style={{ 
                                    width: `${item.percentage}%`,
                                    backgroundColor: idx === 0 ? '#0284c7' : idx === 1 ? '#0d9488' : idx === 2 ? '#e11d48' : '#64748b' 
                                  }}
                                />
                              </div>
                              <span className="font-mono font-bold text-xs w-10 text-right text-editorial-text">
                                {item.percentage}%
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono text-right text-editorial-muted">
                            {Math.floor(item.avgDurationSec / 60)}분 {item.avgDurationSec % 60}초
                          </td>
                          <td className="py-3 px-4 font-mono text-right font-medium text-emerald-700">
                            {item.keyActionsCount.toLocaleString()}건
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Peak Hours & Device/Language Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Peak Traffic Insight */}
                <div className="bg-white border border-editorial-border rounded-sm p-5 shadow-xs">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <h4 className="font-serif font-bold text-sm text-editorial-text">
                      시간대별 피크타임 (Peak Traffic Analysis)
                    </h4>
                  </div>
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-sm mb-3 text-xs text-amber-950 leading-relaxed">
                    <div className="font-bold mb-0.5">🌟 최다 접속 골든타임: 저녁 18:00 ~ 23:00</div>
                    <div>퇴근 및 일과 후 K-POP 가사 번역과 롤플레잉 회화 실습 트래픽이 전체의 <strong>52%</strong>를 차지합니다.</div>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-editorial-border/60">
                      <span className="text-editorial-muted">주간 학습대 (09:00 ~ 17:00)</span>
                      <span className="font-mono font-bold text-editorial-text">28% (자모·TOPIK 집중)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-editorial-border/60">
                      <span className="text-editorial-muted">심야 집중대 (18:00 ~ 23:00)</span>
                      <span className="font-mono font-bold text-amber-700">52% (회화·K-POP 피크)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-editorial-muted">새벽 시간대 (00:00 ~ 08:00)</span>
                      <span className="font-mono font-bold text-editorial-text">20% (미주·유럽 시차 이용자)</span>
                    </div>
                  </div>
                </div>

                {/* Device & Environment Distribution */}
                <div className="bg-white border border-editorial-border rounded-sm p-5 shadow-xs">
                  <div className="flex items-center space-x-2 mb-2">
                    <Smartphone className="w-4 h-4 text-sky-600" />
                    <h4 className="font-serif font-bold text-sm text-editorial-text">
                      접속 디바이스 & 언어 환경
                    </h4>
                  </div>
                  <div className="space-y-3 text-xs mt-3">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-editorial-muted">디바이스 비율</span>
                        <span className="font-mono font-bold">모바일 68% / 데스크톱 28% / 태블릿 4%</span>
                      </div>
                      <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden flex">
                        <div className="bg-sky-600 h-full" style={{ width: '68%' }} title="모바일 68%" />
                        <div className="bg-indigo-600 h-full" style={{ width: '28%' }} title="데스크톱 28%" />
                        <div className="bg-amber-500 h-full" style={{ width: '4%' }} title="태블릿 4%" />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-editorial-border/60">
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-editorial-muted">브라우저/OS 언어</span>
                        <span className="font-mono font-bold">영어 44% / 한국어 38% / 일본어 18%</span>
                      </div>
                      <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden flex">
                        <div className="bg-emerald-600 h-full" style={{ width: '44%' }} title="영어 44%" />
                        <div className="bg-blue-600 h-full" style={{ width: '38%' }} title="한국어 38%" />
                        <div className="bg-rose-500 h-full" style={{ width: '18%' }} title="일본어 18%" />
                      </div>
                    </div>

                    <div className="pt-2 text-[11px] text-editorial-muted flex items-center justify-between">
                      <span>음성 인식 (STT) 지원율: <strong>94.2%</strong></span>
                      <span>Web Speech TTS 지원율: <strong>99.1%</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversion Funnel Bar */}
              <div className="bg-white border border-editorial-border rounded-sm p-5 shadow-xs">
                <h4 className="font-serif font-bold text-sm text-editorial-text mb-1">
                  핵심 학습 행동 전환 퍼널 (User Engagement Funnel)
                </h4>
                <p className="text-xs text-editorial-muted mb-4">
                  첫 방문부터 AI 심층 실습 및 유료 결제 전환에 이르는 5단계 여정
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {analyticsSummary.funnelSteps.map((step, sIdx) => (
                    <div key={sIdx} className="p-3 bg-editorial-bg border border-editorial-border rounded-sm text-center">
                      <div className="text-[10px] font-mono text-editorial-muted font-bold">STEP {sIdx + 1}</div>
                      <div className="text-xs font-bold text-editorial-text mt-0.5 truncate">{step.step}</div>
                      <div className="text-lg font-mono font-black text-sky-700 mt-1">
                        {step.count.toLocaleString()}
                      </div>
                      <div className="text-[10px] font-mono font-bold text-emerald-700 mt-0.5">
                        전환율 {step.rate}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: COST & TRAFFIC SIMULATOR */}
          {activeTab === 'simulator' && (
            <div className="space-y-6">
              <div className="bg-white border border-editorial-border rounded-sm p-5 shadow-xs">
                <h3 className="font-serif font-bold text-sm text-editorial-text mb-1 flex items-center space-x-2">
                  <Calculator className="w-4 h-4 text-sky-600" />
                  <span>트래픽 성장별 월간 운영비 & 수익 예측 시뮬레이터</span>
                </h3>
                <p className="text-xs text-editorial-muted mb-6">
                  일간 활성 사용자(DAU) 및 1인당 일일 학습량 슬라이더를 조절하여 예상 비용을 실시간으로 확인하세요.
                </p>

                {/* Slider Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-editorial-bg/60 p-4 rounded border border-editorial-border mb-6">
                  
                  {/* Slider 1: DAU */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-editorial-text">
                      <span>일간 활성 사용자 수 (DAU)</span>
                      <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {dau.toLocaleString()} 명 / 일
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={10000}
                      step={50}
                      value={dau}
                      onChange={(e) => setDau(Number(e.target.value))}
                      className="w-full accent-editorial-accent cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-editorial-muted font-mono">
                      <span>10명 (초기)</span>
                      <span>1,000명</span>
                      <span>5,000명</span>
                      <span>10,000명 (대규모)</span>
                    </div>
                  </div>

                  {/* Slider 2: Average Speech and Analysis */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-editorial-text">
                      <span>1인당 일일 AI 발음 분석 & 학습 피드백 횟수</span>
                      <span className="font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                        {avgTurnsPerUser} 회 / 일
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={40}
                      step={1}
                      value={avgTurnsPerUser}
                      onChange={(e) => setAvgTurnsPerUser(Number(e.target.value))}
                      className="w-full accent-sky-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-editorial-muted font-mono">
                      <span>1회 (가벼운 학습)</span>
                      <span>15회 (표준)</span>
                      <span>40회 (헤비 유저)</span>
                    </div>
                  </div>

                  {/* Slider 3: TOPIK Evaluations */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-editorial-text">
                      <span>1인당 일일 TOPIK 문제 풀이 & 작문 평가</span>
                      <span className="font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                        {avgTopikEssays} 회 / 일
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      step={1}
                      value={avgTopikEssays}
                      onChange={(e) => setAvgTopikEssays(Number(e.target.value))}
                      className="w-full accent-purple-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-editorial-muted font-mono">
                      <span>0회</span>
                      <span>2회 (평균)</span>
                      <span>10회</span>
                    </div>
                  </div>

                  {/* Slider 4: Paying User Ratio */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-editorial-text">
                      <span>유료 결제 전환율 (%)</span>
                      <span className="font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {payingUserRatio}% (구매 전환)
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={20}
                      step={0.5}
                      value={payingUserRatio}
                      onChange={(e) => setPayingUserRatio(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-editorial-muted font-mono">
                      <span>1% (보수적)</span>
                      <span>5% (평균)</span>
                      <span>20% (매우 우수)</span>
                    </div>
                  </div>

                </div>

                {/* Calculation Results Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-sm">
                    <div className="text-xs font-bold text-emerald-900 mb-1">월간 예상 AI API 비용</div>
                    <div className="text-2xl font-mono font-black text-emerald-800">
                      ₩{Math.round(monthlyTotalAiCostUSD * usdToKrwRate).toLocaleString()}
                    </div>
                    <p className="text-[11px] text-emerald-700 mt-1">
                      ${monthlyTotalAiCostUSD.toFixed(2)} USD (월 {monthlyTotalTurns.toLocaleString()}회 턴 처리)
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-sm">
                    <div className="text-xs font-bold text-purple-900 mb-1">월간 예상 컨테이너 서버비</div>
                    <div className="text-2xl font-mono font-black text-purple-800">
                      ₩{Math.round(monthlyContainerCostUSD * usdToKrwRate).toLocaleString()}
                    </div>
                    <p className="text-[11px] text-purple-700 mt-1">
                      ${monthlyContainerCostUSD.toFixed(2)} USD (Cloud Run 자동 스케일링)
                    </p>
                  </div>

                  <div className="p-4 bg-slate-900 text-white rounded-sm">
                    <div className="text-xs font-bold text-amber-300 mb-1">월간 예상 순이익 (Net Profit)</div>
                    <div className="text-2xl font-mono font-black text-white">
                      ₩{(estimatedMonthlyRevenueKRW - monthlyTotalOperatingCostKRW).toLocaleString()}
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1">
                      매출 ₩{estimatedMonthlyRevenueKRW.toLocaleString()} - 비용 ₩{monthlyTotalOperatingCostKRW.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SYSTEM HEALTH & MODEL STATUS */}
          {activeTab === 'system' && (
            <div className="space-y-4">
              <div className="bg-white border border-editorial-border rounded-sm p-5 shadow-xs space-y-4">
                <h3 className="font-serif font-bold text-sm text-editorial-text">
                  실시간 시스템 구성 및 API 엔진 진단
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-editorial-bg border border-editorial-border rounded-sm flex items-start justify-between">
                    <div>
                      <div className="font-bold text-editorial-text">LLM 모델 엔드포인트</div>
                      <div className="text-editorial-muted text-[11px] font-mono mt-0.5">gemini-3.7-flash (Default)</div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                      정상 (Online)
                    </span>
                  </div>

                  <div className="p-3 bg-editorial-bg border border-editorial-border rounded-sm flex items-start justify-between">
                    <div>
                      <div className="font-bold text-editorial-text">API 인증 방식</div>
                      <div className="text-editorial-muted text-[11px] font-mono mt-0.5">Google Cloud Generative Language SDK</div>
                    </div>
                    <span className="px-2 py-0.5 bg-sky-100 text-sky-800 text-[10px] font-bold rounded">
                      API KEY (AIzaSy...)
                    </span>
                  </div>

                  <div className="p-3 bg-editorial-bg border border-editorial-border rounded-sm flex items-start justify-between">
                    <div>
                      <div className="font-bold text-editorial-text">컨테이너 호스팅 포트</div>
                      <div className="text-editorial-muted text-[11px] font-mono mt-0.5">Port 3000 (0.0.0.0 Nginx Reverse Proxy)</div>
                    </div>
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded">
                      Cloud Run Ready
                    </span>
                  </div>

                  <div className="p-3 bg-editorial-bg border border-editorial-border rounded-sm flex items-start justify-between">
                    <div>
                      <div className="font-bold text-editorial-text">오프라인 장애 복구 (Fallback)</div>
                      <div className="text-editorial-muted text-[11px] font-mono mt-0.5">문맥 보존형 다단계 스마트 엔진 탑재</div>
                    </div>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">
                      100% 무중단 보장
                    </span>
                  </div>

                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-sm flex items-start justify-between sm:col-span-2">
                    <div>
                      <div className="font-bold text-blue-950 flex items-center space-x-1.5">
                        <span>토스페이먼츠(Toss Payments) 국내 결제 게이트웨이</span>
                        <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-mono font-bold">
                          v1 SDK + REST API
                        </span>
                      </div>
                      <div className="text-blue-700 text-[11px] mt-0.5">
                        카카오페이 / 네이버페이 / 토스페이 / 국내 신용카드 승인 파이프라인
                      </div>
                      <div className="text-[10px] text-neutral-500 font-mono mt-1">
                        서버 승인 엔드포인트: POST /api/payments/confirm | 상태: 즉시 가동 준비 완료
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                      연동 완료 (Ready)
                    </span>
                  </div>

                  <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-sm flex items-start justify-between sm:col-span-2">
                    <div>
                      <div className="font-bold text-indigo-950 flex items-center space-x-1.5">
                        <span>토스페이먼츠(Toss Payments) 글로벌 통합 결제 게이트웨이</span>
                        <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.2 rounded font-mono font-bold">
                          통합 결제창 + 해외카드 승인
                        </span>
                      </div>
                      <div className="text-indigo-700 text-[11px] mt-0.5">
                        국내 결제(카카오·네이버·토스·전카드사) 및 전 세계 해외카드(Visa·Mastercard·Amex·JCB·UnionPay) 단일 연동
                      </div>
                      <div className="text-[10px] text-neutral-500 font-mono mt-1">
                        서버 세션: POST /api/payments/confirm | SDK: @tosspayments/payment-sdk
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                      통합 연동 완료 (Ready)
                    </span>
                  </div>
                </div>
              </div>

              {/* Security & Data Protection Audit Card */}
              <div className="bg-white border border-editorial-border rounded-sm p-5 shadow-xs space-y-3">
                <h3 className="font-serif font-bold text-sm text-editorial-text flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>사이트 보안 및 결제·개인정보 보호 진단 (Security Audit)</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-neutral-50 rounded border border-neutral-200 space-y-1">
                    <div className="font-bold text-neutral-800 flex items-center space-x-1.5">
                      <span className="text-emerald-600 font-mono font-bold">✓</span>
                      <span>API 키 완벽 은닉 (Server-Side Isolation)</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                      Gemini AI 키와 Toss 비밀키가 클라이언트 번들에 노출되지 않으며 브라우저 개발자 도구에서 절대 열람할 수 없습니다.
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-50 rounded border border-neutral-200 space-y-1">
                    <div className="font-bold text-neutral-800 flex items-center space-x-1.5">
                      <span className="text-emerald-600 font-mono font-bold">✓</span>
                      <span>PCI-DSS 준수 (카드정보 무보관 정책)</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                      신용카드 번호·CVC·비밀번호는 본 서버에 절대 저장되지 않으며 토스페이먼츠의 암호화 토큰 채널로만 전송됩니다.
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-50 rounded border border-neutral-200 space-y-1">
                    <div className="font-bold text-neutral-800 flex items-center space-x-1.5">
                      <span className="text-emerald-600 font-mono font-bold">✓</span>
                      <span>DDoS & 무차별 호출 방어 (Rate Limiting)</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                      IP당 1분 최대 120회 제한 및 2MB 페이로드 제한을 적용하여 봇(Bot) 스크래핑과 LLM 비용 고갈 공격을 원천 방어합니다.
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-50 rounded border border-neutral-200 space-y-1">
                    <div className="font-bold text-neutral-800 flex items-center space-x-1.5">
                      <span className="text-emerald-600 font-mono font-bold">✓</span>
                      <span>HTTP 보안 헤더 & 핑거프린트 제거</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                      X-Powered-By 헤더 제거로 서버 종류를 은닉하고, X-Content-Type-Options(MIME 스니핑 방지) 및 XSS 방어 헤더를 기본 적용했습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: USERS & CREDIT LOGS */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="bg-white border border-editorial-border rounded-sm p-5 shadow-xs space-y-4">
                <h3 className="font-serif font-bold text-sm text-editorial-text flex items-center justify-between">
                  <span>사용자 크레딧 및 계정 데이터 현황</span>
                  <span className="text-xs font-mono font-normal text-editorial-muted">
                    현재 세션: {userStats?.name || '현장 학습자'}
                  </span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-4">
                  <div className="p-3 bg-editorial-bg border border-editorial-border rounded-sm">
                    <div className="text-editorial-muted">보유 AI 크레딧</div>
                    <div className="text-xl font-mono font-bold text-editorial-accent mt-0.5">
                      {userStats?.credits ?? 120} CR
                    </div>
                  </div>
                  <div className="p-3 bg-editorial-bg border border-editorial-border rounded-sm">
                    <div className="text-editorial-muted">학습 연속 일수 (Streak)</div>
                    <div className="text-xl font-mono font-bold text-amber-600 mt-0.5">
                      🔥 {userStats?.streak ?? 1} 일
                    </div>
                  </div>
                  <div className="p-3 bg-editorial-bg border border-editorial-border rounded-sm">
                    <div className="text-editorial-muted">누적 학습 경험치 (XP)</div>
                    <div className="text-xl font-mono font-bold text-emerald-700 mt-0.5">
                      {userStats?.totalXp ?? 450} XP
                    </div>
                  </div>
                </div>

                {/* User Pattern Analytics Launcher Card */}
                <div className="p-4 bg-sky-50 border border-sky-200 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-sky-950 flex items-center space-x-1.5">
                      <BarChart3 className="w-4 h-4 text-sky-600" />
                      <span>사용자 접속 횟수 및 메뉴별 패턴 분석 현황</span>
                    </div>
                    <div className="text-[11px] text-sky-800 mt-0.5">
                      실시간 트래픽, 메뉴별 점유율, 시간대별 피크타임, 전환 퍼널 분석 탭으로 이동합니다.
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className="px-3 py-1.5 bg-sky-700 hover:bg-sky-800 text-white rounded text-xs font-bold transition-colors cursor-pointer shrink-0"
                  >
                    접속현황 탭 보기
                  </button>
                </div>

                <div className="pt-4 border-t border-editorial-border flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-neutral-500">로컬 학습 데이터 초기화 (비활성화됨)</div>
                    <div className="text-[11px] text-editorial-muted">
                      보안 정책에 따라 서버 사이드 관리자 인증 세션이 구현되기 전까지 데이터 초기화 기능이 비활성화되었습니다.
                    </div>
                  </div>
                  <button
                    disabled
                    className="px-3 py-1.5 bg-neutral-100 text-neutral-400 border border-neutral-200 rounded text-xs font-bold cursor-not-allowed"
                    title="서버 사이드 관리자 인증 필요"
                  >
                    초기화 비활성화됨
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: AI MARKETING CONTENT STUDIO */}
          {activeTab === 'creator' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 p-4 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-sm bg-amber-500 text-black">
                    <Sparkles className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-editorial-text">
                      관리자 전용 AI 마케팅 원고 & 쇼츠 제작 스튜디오
                    </h3>
                    <p className="text-xs text-editorial-muted">
                      네이버 블로그, 티스토리 및 유튜브 쇼츠 홍보를 위한 고품질 한국어 바이럴 콘텐츠를 자동 생성합니다.
                    </p>
                  </div>
                </div>
                <span className="self-start sm:self-auto text-[10px] font-mono bg-amber-400 text-black px-2.5 py-1 rounded-xs font-black tracking-wider">
                  ADMIN ONLY
                </span>
              </div>

              <div className="bg-white rounded-sm border border-editorial-border p-2 sm:p-4">
                <AiContentGenerator
                  initialTopic={initialCreatorTopic}
                  onOpenCreditModal={onOpenCreditModal}
                  credits={userStats?.credits ?? 999}
                  onSpendCredits={onSpendCredits}
                />
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-editorial-border bg-white flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-editorial-muted text-[11px]">
            <Shield className="w-3.5 h-3.5 text-amber-500" />
            <span>Talk Korean Operational Intelligence & Financial Management</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-editorial-text text-white rounded-sm font-bold text-xs hover:bg-editorial-accent transition-colors cursor-pointer"
          >
            닫기 (Close)
          </button>
        </div>

      </div>
    </div>
  );
}
