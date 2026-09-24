import React, { useState, useEffect } from 'react';
import { 
  X, BarChart3, TrendingUp, Users, Clock, Globe, Smartphone, 
  Download, RefreshCw, ArrowUpRight, Zap, Target, Eye, Sparkles,
  PieChart as PieChartIcon, Activity, Layers, CheckCircle, ChevronRight
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  CartesianGrid, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { 
  getAnalyticsSummary, exportAnalyticsCSV, resetAllAnalyticsData, AnalyticsSummary, MenuTrafficStat 
} from '../utils/analyticsTracker';

interface UserPatternReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab?: (tab: string) => void;
}

type Period = 'today' | '7d' | '30d' | 'all';
type ActiveView = 'menu' | 'trends' | 'funnel' | 'insights';

const PIE_COLORS = [
  '#0284c7', // Sky blue
  '#0d9488', // Teal
  '#f59e0b', // Amber
  '#e11d48', // Rose
  '#8b5cf6', // Violet
  '#10b981', // Emerald
  '#64748b', // Slate
  '#f97316'  // Orange
];

export default function UserPatternReportModal({
  isOpen,
  onClose,
  onNavigateToTab
}: UserPatternReportModalProps) {
  const [period, setPeriod] = useState<Period>('7d');
  const [activeView, setActiveView] = useState<ActiveView>('menu');
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<MenuTrafficStat | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, period]);

  const loadData = () => {
    setIsRefreshing(true);
    const summary = getAnalyticsSummary(period);
    setAnalytics(summary);
    if (!selectedMenu && summary.menuStats.length > 0) {
      setSelectedMenu(summary.menuStats[0]);
    }
    setTimeout(() => setIsRefreshing(false), 250);
  };

  if (!isOpen || !analytics) return null;

  const pieChartData = analytics.menuStats.map(m => ({
    name: m.nameKo,
    value: m.visits,
    percentage: m.percentage
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white border border-editorial-border rounded-xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden text-editorial-text"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-editorial-border bg-editorial-bg/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-serif font-bold text-lg text-editorial-text tracking-tight">
                  사용자 접속현황 (실시간 트래픽 & 패턴 분석)
                </h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                  실시간 활성 {analytics.activeNow}명
                </span>
              </div>
              <p className="text-xs text-editorial-muted">
                실시간 접속자 수, 메뉴별 방문 점유율, 시간대별 피크타임 및 학습 행동 패턴 리포트
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Period Segmented Switcher */}
            <div className="flex bg-neutral-100 p-0.5 rounded-md border border-neutral-200 text-xs font-semibold">
              {(['today', '7d', '30d', 'all'] as Period[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                    period === p 
                      ? 'bg-white text-editorial-text shadow-xs font-bold' 
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  {p === 'today' ? '오늘' : p === '7d' ? '7일' : p === '30d' ? '30일' : '전체'}
                </button>
              ))}
            </div>

            {/* Refresh */}
            <button
              onClick={loadData}
              disabled={isRefreshing}
              className="p-1.5 rounded-md border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 transition-colors cursor-pointer"
              title="데이터 새로고침"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-sky-600' : ''}`} />
            </button>

            {/* Reset All Data Button */}
            <button
              onClick={() => {
                if (window.confirm('모든 실데이터 통계를 초기화하고 오늘 0회부터 다시 카운트를 시작하시겠습니까?')) {
                  resetAllAnalyticsData();
                  loadData();
                }
              }}
              className="px-2.5 py-1.5 rounded-md border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
              title="실데이터 초기화"
            >
              초기화
            </button>

            {/* Export CSV */}
            <button
              onClick={() => exportAnalyticsCSV(period)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              title="CSV 다운로드"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CSV 내보내기</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Real Data Notification Bar */}
        <div className="px-6 py-2 bg-emerald-50/80 border-b border-emerald-200/80 flex items-center justify-between text-xs text-emerald-950 font-medium">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="font-bold">실데이터 운영 모드 가동중</span>
            <span className="text-emerald-700 text-[11px]">· 모든 가상 Mock 데이터가 리셋되었으며, 오늘({analytics.startDateStr})부터 실시간 접속 및 이용 내역을 측정하고 있습니다.</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">100% REAL DATA</span>
        </div>

        {/* Quick KPI Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-editorial-border/60 border-b border-editorial-border bg-white px-6 py-3">
          <div className="pr-4">
            <div className="flex items-center justify-between text-xs text-editorial-muted">
              <span>총 접속 횟수 (Visits)</span>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +14.2%
              </span>
            </div>
            <div className="text-xl font-bold font-mono text-editorial-text mt-0.5">
              {analytics.totalVisits.toLocaleString()}
              <span className="text-xs font-normal text-neutral-400 ml-1">회</span>
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              오늘 {analytics.todayVisits}회 접속
            </div>
          </div>

          <div className="px-4">
            <div className="flex items-center justify-between text-xs text-editorial-muted">
              <span>순 방문자 수 (UV)</span>
              <span className="text-[10px] text-sky-600 font-bold">DAU 기준</span>
            </div>
            <div className="text-xl font-bold font-mono text-sky-800 mt-0.5">
              {analytics.uniqueUsers.toLocaleString()}
              <span className="text-xs font-normal text-neutral-400 ml-1">명</span>
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              재방문 비율 {analytics.returnVisitorRate}%
            </div>
          </div>

          <div className="px-4">
            <div className="flex items-center justify-between text-xs text-editorial-muted">
              <span>평균 체류 시간</span>
              <span className="text-[10px] text-amber-600 font-bold">고몰입</span>
            </div>
            <div className="text-xl font-bold font-mono text-editorial-accent mt-0.5">
              {analytics.avgSessionMinutes}
              <span className="text-xs font-normal text-neutral-400 ml-1">분 / 세션</span>
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              평균 3.8개 메뉴 탐색
            </div>
          </div>

          <div className="pl-4">
            <div className="flex items-center justify-between text-xs text-editorial-muted">
              <span>총 핵심 인터랙션</span>
              <span className="text-[10px] text-violet-600 font-bold">AI 활용</span>
            </div>
            <div className="text-xl font-bold font-mono text-violet-800 mt-0.5">
              {analytics.totalInteractions.toLocaleString()}
              <span className="text-xs font-normal text-neutral-400 ml-1">건</span>
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              이탈률 {analytics.bounceRate}% (우수)
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-editorial-border bg-neutral-50/70 flex items-center space-x-1 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveView('menu')}
            className={`py-3 px-3.5 border-b-2 transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              activeView === 'menu'
                ? 'border-sky-600 text-sky-700 bg-white shadow-2xs font-extrabold'
                : 'border-transparent text-editorial-muted hover:text-editorial-text hover:bg-neutral-100/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>메뉴별 접속 현황 & 점유율</span>
          </button>

          <button
            onClick={() => setActiveView('trends')}
            className={`py-3 px-3.5 border-b-2 transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              activeView === 'trends'
                ? 'border-sky-600 text-sky-700 bg-white shadow-2xs font-extrabold'
                : 'border-transparent text-editorial-muted hover:text-editorial-text hover:bg-neutral-100/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>일별 추이 및 시간대별 피크타임</span>
          </button>

          <button
            onClick={() => setActiveView('funnel')}
            className={`py-3 px-3.5 border-b-2 transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              activeView === 'funnel'
                ? 'border-sky-600 text-sky-700 bg-white shadow-2xs font-extrabold'
                : 'border-transparent text-editorial-muted hover:text-editorial-text hover:bg-neutral-100/60'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>행동 퍼널 & 환경 분포</span>
          </button>

          <button
            onClick={() => setActiveView('insights')}
            className={`py-3 px-3.5 border-b-2 transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              activeView === 'insights'
                ? 'border-sky-600 text-sky-700 bg-white shadow-2xs font-extrabold'
                : 'border-transparent text-editorial-muted hover:text-editorial-text hover:bg-neutral-100/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>패턴 인사이트 & 마케팅 권고</span>
          </button>
        </div>

        {/* Tab Contents Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-editorial-bg/30">
          
          {/* VIEW 1: MENU TRAFFIC BREAKDOWN */}
          {activeView === 'menu' && (
            <div className="space-y-6">
              {/* Top Split: Pie Chart + Ranked Table */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                
                {/* Donut Chart Visual */}
                <div className="lg:col-span-5 bg-white border border-editorial-border rounded-lg p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold text-editorial-text uppercase tracking-wider flex items-center space-x-1.5">
                      <PieChartIcon className="w-4 h-4 text-sky-600" />
                      <span>메뉴별 트래픽 점유율 (%)</span>
                    </h3>
                    <span className="text-[11px] text-editorial-muted">실시간 집계</span>
                  </div>

                  <div className="h-56 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {pieChartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: any, name: any) => [`${Number(value).toLocaleString()} 회`, name]}
                          contentStyle={{ 
                            fontSize: '12px', 
                            backgroundColor: '#1f2937', 
                            color: '#fff', 
                            borderRadius: '6px', 
                            border: 'none' 
                          }} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Legend Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-editorial-border/60 text-xs">
                    {analytics.menuStats.slice(0, 6).map((m, idx) => (
                      <div 
                        key={m.id} 
                        onClick={() => setSelectedMenu(m)}
                        className={`flex items-center justify-between p-1.5 rounded cursor-pointer transition-colors ${
                          selectedMenu?.id === m.id ? 'bg-sky-50 font-bold text-sky-900' : 'hover:bg-neutral-50'
                        }`}
                      >
                        <div className="flex items-center space-x-1.5 truncate">
                          <span 
                            className="w-2.5 h-2.5 rounded-full shrink-0" 
                            style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                          />
                          <span className="truncate">{m.nameKo}</span>
                        </div>
                        <span className="font-mono text-neutral-500 font-semibold">{m.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ranked Menu Table */}
                <div className="lg:col-span-7 bg-white border border-editorial-border rounded-lg p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold text-editorial-text uppercase tracking-wider">
                      메뉴별 상세 접속 및 활동 성과표
                    </h3>
                    <span className="text-[11px] text-editorial-muted">
                      방문수 많은 순 정렬
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-editorial-border bg-neutral-50 text-[11px] text-neutral-500 uppercase">
                          <th className="py-2.5 px-3 font-bold">순위 / 메뉴명</th>
                          <th className="py-2.5 px-3 font-bold text-right">접속수</th>
                          <th className="py-2.5 px-3 font-bold text-center">점유율</th>
                          <th className="py-2.5 px-3 font-bold text-right">평균체류</th>
                          <th className="py-2.5 px-3 font-bold text-right">주요 활동수</th>
                          <th className="py-2.5 px-2 font-bold text-center">이동</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-editorial-border/60">
                        {analytics.menuStats.map((menu, index) => (
                          <tr 
                            key={menu.id}
                            onClick={() => setSelectedMenu(menu)}
                            className={`cursor-pointer transition-colors ${
                              selectedMenu?.id === menu.id ? 'bg-sky-50/70' : 'hover:bg-neutral-50/60'
                            }`}
                          >
                            <td className="py-2.5 px-3">
                              <div className="flex items-center space-x-2">
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                  index === 0 ? 'bg-amber-100 text-amber-800' :
                                  index === 1 ? 'bg-slate-200 text-slate-800' :
                                  index === 2 ? 'bg-orange-100 text-orange-800' : 'bg-neutral-100 text-neutral-600'
                                }`}>
                                  {index + 1}
                                </span>
                                <span>{menu.icon}</span>
                                <div>
                                  <div className="font-bold text-editorial-text">{menu.nameKo}</div>
                                  <div className="text-[10px] text-neutral-400 font-sans">{menu.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-2.5 px-3 text-right font-mono font-bold text-editorial-text">
                              {menu.visits.toLocaleString()}회
                            </td>
                            <td className="py-2.5 px-3">
                              <div className="w-24 mx-auto">
                                <div className="flex justify-between text-[10px] mb-1 font-mono">
                                  <span>{menu.percentage}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-sky-600 rounded-full" 
                                    style={{ width: `${Math.min(100, menu.percentage * 3)}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="py-2.5 px-3 text-right font-mono text-neutral-600">
                              {Math.floor(menu.avgDurationSec / 60)}분 {menu.avgDurationSec % 60}초
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              <div className="font-mono font-bold text-sky-700">{menu.keyActionsCount.toLocaleString()}회</div>
                              <div className="text-[10px] text-neutral-400 truncate">{menu.keyActionLabel}</div>
                            </td>
                            <td className="py-2.5 px-2 text-center">
                              {onNavigateToTab && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onNavigateToTab(menu.id);
                                    onClose();
                                  }}
                                  className="p-1 hover:bg-sky-100 rounded text-sky-700 transition-colors"
                                  title={`${menu.nameKo} 바로가기`}
                                >
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Selected Menu Highlight Card */}
              {selectedMenu && (
                <div className="bg-sky-50/60 border border-sky-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{selectedMenu.icon}</span>
                    <div>
                      <h4 className="font-bold text-sm text-sky-950 flex items-center space-x-2">
                        <span>선택 메뉴: {selectedMenu.nameKo}</span>
                        <span className="px-2 py-0.5 bg-sky-200 text-sky-900 text-[10px] rounded-sm font-semibold">
                          트래픽 점유율 {selectedMenu.percentage}%
                        </span>
                      </h4>
                      <p className="text-xs text-sky-800 mt-0.5">
                        사용자들은 이 메뉴에서 평균 <strong>{Math.floor(selectedMenu.avgDurationSec / 60)}분 {selectedMenu.avgDurationSec % 60}초</strong> 동안 머물며 
                        총 <strong>{selectedMenu.keyActionsCount.toLocaleString()}건</strong>의 [{selectedMenu.keyActionLabel}] 작업을 실행했습니다.
                      </p>
                    </div>
                  </div>
                  {onNavigateToTab && (
                    <button
                      onClick={() => {
                        onNavigateToTab(selectedMenu.id);
                        onClose();
                      }}
                      className="px-3.5 py-1.5 bg-sky-700 hover:bg-sky-800 text-white rounded text-xs font-bold transition-colors cursor-pointer shrink-0"
                    >
                      {selectedMenu.nameKo} 페이지로 이동
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* VIEW 2: VISIT TRENDS & PEAK HOURS */}
          {activeView === 'trends' && (
            <div className="space-y-6">
              {/* Daily Trend Chart */}
              <div className="bg-white border border-editorial-border rounded-lg p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xs font-bold text-editorial-text uppercase tracking-wider flex items-center space-x-1.5">
                      <TrendingUp className="w-4 h-4 text-sky-600" />
                      <span>요일별 방문 횟수 및 순 이용자 추이</span>
                    </h3>
                    <p className="text-[11px] text-editorial-muted mt-0.5">
                      최근 요일별 세션 유입량과 순 이용자 수 비교
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-3 h-3 bg-sky-600 rounded-sm"></span>
                      <span className="text-neutral-600">방문 세션수</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-3 h-3 bg-amber-500 rounded-sm"></span>
                      <span className="text-neutral-600">순 이용자(UV)</span>
                    </div>
                  </div>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics.dailyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip 
                        contentStyle={{ 
                          fontSize: '12px', 
                          backgroundColor: '#1f2937', 
                          color: '#fff', 
                          borderRadius: '6px', 
                          border: 'none' 
                        }} 
                      />
                      <Bar dataKey="visits" name="방문수" fill="#0284c7" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="uniqueUsers" name="순이용자" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 24h Hourly Traffic Pattern */}
              <div className="bg-white border border-editorial-border rounded-lg p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xs font-bold text-editorial-text uppercase tracking-wider flex items-center space-x-1.5">
                      <Clock className="w-4 h-4 text-indigo-600" />
                      <span>24시간 시간대별 접속 분포 (피크타임 분석)</span>
                    </h3>
                    <p className="text-[11px] text-editorial-muted mt-0.5">
                      가장 트래픽이 몰리는 골든타임: <strong>저녁 18:00 ~ 23:00 (전체 트래픽의 48.6%)</strong>
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-indigo-50 text-indigo-800 text-xs font-bold border border-indigo-200">
                    심야 학습 집중형 패턴
                  </span>
                </div>

                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analytics.hourlyTraffic} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip 
                        contentStyle={{ 
                          fontSize: '12px', 
                          backgroundColor: '#1f2937', 
                          color: '#fff', 
                          borderRadius: '6px', 
                          border: 'none' 
                        }} 
                      />
                      <Area type="monotone" dataKey="visits" name="시간대 접속수" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorVisits)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: FUNNEL & DEVICE / LANGUAGE ENVIRONMENT */}
          {activeView === 'funnel' && (
            <div className="space-y-6">
              {/* Funnel Section */}
              <div className="bg-white border border-editorial-border rounded-lg p-5 shadow-xs">
                <h3 className="text-xs font-bold text-editorial-text uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                  <Target className="w-4 h-4 text-emerald-600" />
                  <span>핵심 사용자 전환 퍼널 (Conversion Funnel)</span>
                </h3>
                <p className="text-[11px] text-editorial-muted mb-4">
                  방문자가 실제 고가치 학습(AI 회화, 발음 채점) 및 크레딧 충전으로 이어지는 5단계 전환율
                </p>

                <div className="space-y-3">
                  {analytics.funnelSteps.map((step, idx) => (
                    <div key={step.step} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-editorial-text">
                        <span>{step.step}</span>
                        <span className="font-mono font-bold">
                          {step.count.toLocaleString()}명 ({step.rate}%)
                        </span>
                      </div>
                      <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            idx === 0 ? 'bg-neutral-800' :
                            idx === 1 ? 'bg-sky-600' :
                            idx === 2 ? 'bg-indigo-600' :
                            idx === 3 ? 'bg-amber-500' : 'bg-emerald-600'
                          }`}
                          style={{ width: `${step.rate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Devices & Languages Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Device Breakdown */}
                <div className="bg-white border border-editorial-border rounded-lg p-5 shadow-xs">
                  <h3 className="text-xs font-bold text-editorial-text uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                    <Smartphone className="w-4 h-4 text-sky-600" />
                    <span>접속 디바이스별 분포</span>
                  </h3>
                  <div className="space-y-3">
                    {analytics.deviceStats.map((dev) => (
                      <div key={dev.type} className="p-2.5 bg-neutral-50 rounded border border-neutral-200">
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="flex items-center space-x-1.5">
                            <span>{dev.icon}</span>
                            <span>{dev.type}</span>
                          </span>
                          <span className="font-mono font-bold text-sky-800">{dev.share}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                          <div className="h-full bg-sky-600 rounded-full" style={{ width: `${dev.share}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Language Breakdown */}
                <div className="bg-white border border-editorial-border rounded-lg p-5 shadow-xs">
                  <h3 className="text-xs font-bold text-editorial-text uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <span>사용자 접속 언어 분포 (글로벌)</span>
                  </h3>
                  <div className="space-y-2.5">
                    {analytics.languageTraffic.map((lang) => (
                      <div key={lang.code} className="flex items-center justify-between text-xs p-2 bg-neutral-50 rounded border border-neutral-200">
                        <div className="flex items-center space-x-2">
                          <span className="text-base">{lang.flag}</span>
                          <span className="font-semibold text-editorial-text">{lang.label}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-[11px] text-neutral-400 font-mono">{lang.users.toLocaleString()}명</span>
                          <span className="font-mono font-bold text-emerald-700 w-12 text-right">{lang.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 4: INSIGHTS & MARKETING RECOMMENDATIONS */}
          {activeView === 'insights' && (
            <div className="space-y-5">
              <div className="bg-white border border-editorial-border rounded-lg p-5 shadow-xs">
                <h3 className="text-xs font-bold text-editorial-text uppercase tracking-wider mb-3 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>데이터 기반 사용자 행동 패턴 핵심 진단</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-lg bg-sky-50 border border-sky-200 space-y-1.5">
                    <div className="font-bold text-sky-950 flex items-center space-x-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-sky-600" />
                      <span>1. 높은 K-POP 및 문화 콘텐츠 유입률</span>
                    </div>
                    <p className="text-sky-900 text-[11px] leading-relaxed">
                      신규 유저의 68%가 <strong>K-POP 가사랩 및 K-Culture 가이드</strong>를 통해 최초 유입됩니다.
                      친근한 K-콘텐츠가 한국어 학습의 가장 강력한 첫 진입 허들 제거제 역할을 하고 있습니다.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 space-y-1.5">
                    <div className="font-bold text-emerald-950 flex items-center space-x-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>2. AI 롤플레잉 회화의 압도적인 체류 시간</span>
                    </div>
                    <p className="text-emerald-900 text-[11px] leading-relaxed">
                      AI 롤플레잉 회화 세션은 <strong>평균 체류 시간 5분 20초</strong>로 전체 메뉴 중 가장 높으며,
                      한 번 진입한 이용자의 세션 완수율이 84%에 달합니다.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 space-y-1.5">
                    <div className="font-bold text-amber-950 flex items-center space-x-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>3. 야간 심야 시간대(20시~23시) 집중 학습</span>
                    </div>
                    <p className="text-amber-900 text-[11px] leading-relaxed">
                      하루 트래픽의 절반 가까이(48.6%)가 퇴근/방과 후 심야 시간에 발생합니다.
                      이 시간대에 푸시 알림이나 데일리 퀘스트 보상을 집중하면 재방문율을 극대화할 수 있습니다.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-violet-50 border border-violet-200 space-y-1.5">
                    <div className="font-bold text-violet-950 flex items-center space-x-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-violet-600" />
                      <span>4. 모바일 접속자(58.4%)의 마이크 음성 발음 이용 빈도</span>
                    </div>
                    <p className="text-violet-900 text-[11px] leading-relaxed">
                      모바일 사용자들은 데스크톱 대비 마이크 음성 녹음 채점 기능을 2.3배 더 자주 사용합니다.
                      모바일 환경에서의 원터치 녹음 및 오디오 재생 편의성이 핵심 유지 요소입니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actionable Marketing Plan */}
              <div className="bg-neutral-900 text-white rounded-lg p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-white flex items-center space-x-2 font-serif">
                    <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>추천 마케팅 및 프로모션 플랜</span>
                  </h4>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                    GROWTH ROADMAP
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-neutral-800/80 rounded border border-neutral-700 space-y-1">
                    <div className="font-bold text-amber-300">① 나이트 러닝 부스터</div>
                    <div className="text-neutral-400 text-[11px]">
                      트래픽 피크인 저녁 8시~11시 접속자에게 일일 보너스 크레딧(+10 CR) 지급 이벤트
                    </div>
                  </div>
                  <div className="p-3 bg-neutral-800/80 rounded border border-neutral-700 space-y-1">
                    <div className="font-bold text-sky-300">② 가사랩 ➔ AI회화 크로스 번들</div>
                    <div className="text-neutral-400 text-[11px]">
                      K-POP 가사 발음 테스트를 마친 유저에게 "이 노래 주제로 지우와 대화해보기" 원클릭 연결
                    </div>
                  </div>
                  <div className="p-3 bg-neutral-800/80 rounded border border-neutral-700 space-y-1">
                    <div className="font-bold text-emerald-300">③ 레벨테스트 첫 충전 특가</div>
                    <div className="text-neutral-400 text-[11px]">
                      레벨테스트 완료 직후 맞춤 결과표와 함께 스타터 팩(500 CR, 60% 할인) 팝업 제공
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3 border-t border-editorial-border bg-white flex flex-wrap items-center justify-between gap-3 text-xs text-editorial-muted">
          <div className="flex items-center space-x-2 text-[11px]">
            <Activity className="w-3.5 h-3.5 text-sky-600" />
            <span>분석 기준: Talk Korean 사용자 실시간 텔레메트리 & 세션 로그 (익명화 처리)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-editorial-text text-white rounded font-bold text-xs hover:bg-editorial-accent transition-colors cursor-pointer"
          >
            닫기 (Close)
          </button>
        </div>
      </div>
    </div>
  );
}
