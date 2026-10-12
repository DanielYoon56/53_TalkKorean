import React, { useState } from 'react';
import { Zap, X, Crown, Sparkles, Check, History, Plus, ShieldCheck, ArrowRight, TrendingUp } from 'lucide-react';
import { UserStats, CreditPlanType, CreditTransaction } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface CreditStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
  onUpdateStats: (newStats: UserStats) => void;
}

export default function CreditStoreModal({
  isOpen,
  onClose,
  stats,
  onUpdateStats
}: CreditStoreModalProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'plans' | 'topup' | 'history'>('plans');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSelectPlan = (planId: CreditPlanType) => {
    if (stats.plan === planId) {
      showToast('이미 사용 중인 요금제입니다.');
      return;
    }

    if (planId === 'free') {
      onUpdateStats({
        ...stats,
        plan: 'free',
      });
      showToast('기본 무료 요금제로 변경되었습니다.');
      return;
    }

    // Direct client-side purchase bypass disabled for security
    showToast('유료 멤버십 플랜 변경은 하단의 정식 토스페이먼츠(Toss Payments) 결제창을 통해 진행되어야 합니다.');
  };

  const handleBuyCredits = (_amount: number, _priceStr: string, _packName: string) => {
    // Direct client-side purchase bypass disabled for security
    showToast('크레딧 팩 구매는 정식 PG 결제 승인을 통해서만 충전됩니다. 토스 결제창을 이용해주세요.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-editorial-border animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-editorial-border bg-editorial-bg flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-lg bg-editorial-accent/15 flex items-center justify-center text-editorial-accent">
              <Zap className="w-6 h-6 fill-editorial-accent" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-serif font-bold text-editorial-text">
                  AI 크레딧 & 수익모델 멤버십
                </h2>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-editorial-accent text-white uppercase tracking-wider">
                  Monetization Center
                </span>
              </div>
              <p className="text-xs text-editorial-muted mt-0.5">
                AI 발음 평가, TOPIK 채점, 회화 시뮬레이션을 크레딧 기반으로 스마트하게 관리하세요.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-editorial-muted hover:text-editorial-text hover:bg-editorial-border/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Balance Banner */}
        <div className="px-6 py-4 bg-gradient-to-r from-editorial-bg via-editorial-accent-light/30 to-editorial-bg border-b border-editorial-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-4">
            <div>
              <span className="text-xs font-semibold text-editorial-muted uppercase tracking-wider">
                현재 보유 AI 크레딧
              </span>
              <div className="flex items-baseline space-x-2 mt-0.5">
                <span className="text-2xl font-bold font-serif text-editorial-text">
                  {stats.credits}
                </span>
                <span className="text-sm font-semibold text-editorial-accent">
                  Credits ⚡
                </span>
              </div>
            </div>

            <div className="h-8 w-px bg-editorial-border hidden sm:block" />

            <div>
              <span className="text-xs font-semibold text-editorial-muted uppercase tracking-wider">
                이용 중인 플랜
              </span>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <Crown className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span className="text-sm font-bold text-editorial-text uppercase">
                  {stats.plan === 'free' ? 'Free Starter (무료)' : stats.plan === 'pro' ? 'Pro Learner ($9.99/월)' : 'Fluency Unlimited ($19.99/월)'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-lg border border-editorial-border text-xs text-editorial-muted">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>회원 등급별 일일 무료 크레딧 자동 충전</span>
          </div>
        </div>

        {/* Toast feedback */}
        {toastMessage && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-editorial-accent text-white text-sm font-medium flex items-center justify-between shadow-md animate-in fade-in duration-150">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-editorial-border flex space-x-6">
          <button
            onClick={() => setActiveTab('plans')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'plans'
                ? 'border-editorial-accent text-editorial-text'
                : 'border-transparent text-editorial-muted hover:text-editorial-text'
            }`}
          >
            <Crown className="w-4 h-4" />
            <span>월간 멤버십 요금제 (Plans)</span>
          </button>

          <button
            onClick={() => setActiveTab('topup')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'topup'
                ? 'border-editorial-accent text-editorial-text'
                : 'border-transparent text-editorial-muted hover:text-editorial-text'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>크레딧 단건 충전 (Top-up Packs)</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'history'
                ? 'border-editorial-accent text-editorial-text'
                : 'border-transparent text-editorial-muted hover:text-editorial-text'
            }`}
          >
            <History className="w-4 h-4" />
            <span>크레딧 사용 내역 (History)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'plans' && (
            <div className="space-y-6">
              <div className="text-center max-w-lg mx-auto mb-2">
                <h3 className="text-lg font-serif font-bold text-editorial-text">
                  학습 목표에 맞는 AI 크레딧 멤버십을 선택하세요
                </h3>
                <p className="text-xs text-editorial-muted mt-1">
                  언제든 해지 가능하며, 플랜 업그레이드 시 보너스 AI 크레딧이 즉시 지급됩니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Free Plan */}
                <div className={`p-5 rounded-xl border flex flex-col justify-between transition-all ${
                  stats.plan === 'free'
                    ? 'border-editorial-accent bg-editorial-accent-light/20 ring-2 ring-editorial-accent/20'
                    : 'border-editorial-border hover:border-editorial-muted'
                }`}>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-editorial-muted">
                        Starter
                      </span>
                      {stats.plan === 'free' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-editorial-text text-white">
                          현재 요금제
                        </span>
                      )}
                    </div>
                    <h4 className="text-xl font-serif font-bold text-editorial-text">
                      Free Learner
                    </h4>
                    <div className="mt-2 flex items-baseline">
                      <span className="text-2xl font-extrabold text-editorial-text">무료</span>
                      <span className="text-xs text-editorial-muted ml-1">/ 평생</span>
                    </div>

                    <ul className="mt-4 space-y-2.5 text-xs text-editorial-text">
                      <li className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>매일 50 크레딧</strong> 무료 자동 리필</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>기본 AI 회화 & 챗봇 학습</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>K-POP 노래 가사 학습 접근</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => handleSelectPlan('free')}
                    disabled={stats.plan === 'free'}
                    className={`mt-6 w-full py-2.5 rounded-lg text-xs font-bold transition-all ${
                      stats.plan === 'free'
                        ? 'bg-editorial-border/60 text-editorial-muted cursor-default'
                        : 'bg-white border border-editorial-border hover:bg-editorial-bg text-editorial-text'
                    }`}
                  >
                    {stats.plan === 'free' ? '이용 중' : '무료 플랜으로 변경'}
                  </button>
                </div>

                {/* Pro Plan (Best Value) */}
                <div className={`p-5 rounded-xl border flex flex-col justify-between transition-all relative ${
                  stats.plan === 'pro'
                    ? 'border-editorial-accent bg-editorial-accent-light/30 ring-2 ring-editorial-accent'
                    : 'border-editorial-accent/60 bg-white shadow-lg hover:shadow-xl'
                }`}>
                  <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-editorial-accent text-white text-[10px] font-bold uppercase tracking-wider shadow">
                    Most Popular
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-editorial-accent">
                        Pro Value
                      </span>
                      {stats.plan === 'pro' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-editorial-text text-white">
                          현재 요금제
                        </span>
                      )}
                    </div>
                    <h4 className="text-xl font-serif font-bold text-editorial-text">
                      Pro Learner
                    </h4>
                    <div className="mt-2 flex items-baseline">
                      <span className="text-2xl font-extrabold text-editorial-text">$9.99</span>
                      <span className="text-xs text-editorial-muted ml-1">/ 월</span>
                    </div>

                    <ul className="mt-4 space-y-2.5 text-xs text-editorial-text">
                      <li className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-editorial-accent shrink-0 mt-0.5" />
                        <span><strong>매월 1,000 크레딧</strong> 지급 (+일일 100)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-editorial-accent shrink-0 mt-0.5" />
                        <span>TOPIK 실전 작문 AI 무제한 채점</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-editorial-accent shrink-0 mt-0.5" />
                        <span>크롬/클라우드 프리미엄 한국어 음성</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-editorial-accent shrink-0 mt-0.5" />
                        <span>고급 파형 정밀 비교 분석</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => handleSelectPlan('pro')}
                    disabled={stats.plan === 'pro'}
                    className={`mt-6 w-full py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                      stats.plan === 'pro'
                        ? 'bg-editorial-border/60 text-editorial-muted cursor-default'
                        : 'bg-editorial-text hover:bg-editorial-accent text-white shadow-sm'
                    }`}
                  >
                    <span>{stats.plan === 'pro' ? '이용 중' : 'Pro 플랜 시작 (+1,000 크레딧)'}</span>
                    {stats.plan !== 'pro' && <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Unlimited Plan */}
                <div className={`p-5 rounded-xl border flex flex-col justify-between transition-all ${
                  stats.plan === 'unlimited'
                    ? 'border-editorial-accent bg-editorial-accent-light/30 ring-2 ring-editorial-accent'
                    : 'border-editorial-border hover:border-editorial-muted bg-white'
                }`}>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                        VIP Unlimited
                      </span>
                      {stats.plan === 'unlimited' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-editorial-text text-white">
                          현재 요금제
                        </span>
                      )}
                    </div>
                    <h4 className="text-xl font-serif font-bold text-editorial-text">
                      Fluency Unlimited
                    </h4>
                    <div className="mt-2 flex items-baseline">
                      <span className="text-2xl font-extrabold text-editorial-text">$19.99</span>
                      <span className="text-xs text-editorial-muted ml-1">/ 월</span>
                    </div>

                    <ul className="mt-4 space-y-2.5 text-xs text-editorial-text">
                      <li className="flex items-start space-x-2">
                        <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span><strong>AI 크레딧 완전 무제한</strong> 사용</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>EduBridge 1:1 튜터 화상 수업 15% 할인</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>모든 AI 역할극 & 발음 교정 무제한</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => handleSelectPlan('unlimited')}
                    disabled={stats.plan === 'unlimited'}
                    className={`mt-6 w-full py-2.5 rounded-lg text-xs font-bold transition-all ${
                      stats.plan === 'unlimited'
                        ? 'bg-editorial-border/60 text-editorial-muted cursor-default'
                        : 'bg-editorial-accent hover:bg-editorial-text text-white shadow-sm'
                    }`}
                  >
                    {stats.plan === 'unlimited' ? '이용 중' : '무제한 플랜 시작'}
                  </button>
                </div>
              </div>

              {/* Credit consumption rate reference */}
              <div className="p-4 rounded-xl bg-editorial-bg border border-editorial-border">
                <h4 className="text-xs font-bold uppercase tracking-wider text-editorial-text mb-2 flex items-center space-x-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-editorial-accent" />
                  <span>AI 고도화 기능별 크레딧 차감 기준 안내</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-editorial-border">
                    <div className="text-editorial-muted">AI 어휘·상황별 문장 분석</div>
                    <div className="font-bold text-editorial-text mt-0.5">1 크레딧 / 회</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-editorial-border">
                    <div className="text-editorial-muted">K-POP AI 음성 발음 진단</div>
                    <div className="font-bold text-editorial-text mt-0.5">2 크레딧 / 회</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-editorial-border">
                    <div className="text-editorial-muted">TOPIK II 서술형·작문 첨삭</div>
                    <div className="font-bold text-editorial-text mt-0.5">3 크레딧 / 회</div>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-editorial-border">
                    <div className="text-editorial-muted">대시보드 롤플레잉 회화</div>
                    <div className="font-bold text-emerald-600 mt-0.5">0 CR (무제한 무료)</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'topup' && (
            <div className="space-y-6">
              <div className="text-center max-w-lg mx-auto mb-2">
                <h3 className="text-lg font-serif font-bold text-editorial-text">
                  크레딧 단건 충전 (Pay-As-You-Go Packs)
                </h3>
                <p className="text-xs text-editorial-muted mt-1">
                  정기 구독 없이 필요한 만큼 AI 크레딧을 자유롭게 충전하세요. 유효기간은 없습니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 100 Credits Pack */}
                <div className="p-5 rounded-xl border border-editorial-border bg-white flex flex-col justify-between hover:border-editorial-accent transition-all">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-editorial-bg flex items-center justify-center mb-3">
                      <Zap className="w-5 h-5 text-editorial-accent" />
                    </div>
                    <h4 className="text-lg font-bold text-editorial-text">100 크레딧 팩</h4>
                    <p className="text-xs text-editorial-muted mt-1">
                      가벼운 복습이나 짧은 회화 연습을 위한 기본 팩
                    </p>
                    <div className="mt-4 text-2xl font-serif font-extrabold text-editorial-text">
                      $1.99
                    </div>
                  </div>

                  <button
                    onClick={() => handleBuyCredits(100, '$1.99', 'Starter 100 Pack')}
                    className="mt-6 w-full py-2.5 rounded-lg border border-editorial-border hover:bg-editorial-accent hover:text-white hover:border-editorial-accent text-xs font-bold transition-all"
                  >
                    +100 크레딧 즉시 충전
                  </button>
                </div>

                {/* 500 Credits Pack */}
                <div className="p-5 rounded-xl border border-editorial-accent bg-editorial-accent-light/20 flex flex-col justify-between relative shadow-sm">
                  <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-editorial-accent text-white text-[10px] font-bold uppercase tracking-wider">
                    20% Bonus
                  </div>
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-editorial-accent/20 flex items-center justify-center mb-3">
                      <Zap className="w-5 h-5 text-editorial-accent fill-editorial-accent" />
                    </div>
                    <h4 className="text-lg font-bold text-editorial-text">500 크레딧 팩</h4>
                    <p className="text-xs text-editorial-muted mt-1">
                      가장 사랑받는 인기 충전 팩 (+100 추가 크레딧 효과)
                    </p>
                    <div className="mt-4 text-2xl font-serif font-extrabold text-editorial-text">
                      $7.99
                    </div>
                  </div>

                  <button
                    onClick={() => handleBuyCredits(500, '$7.99', 'Popular 500 Pack')}
                    className="mt-6 w-full py-2.5 rounded-lg bg-editorial-text hover:bg-editorial-accent text-white text-xs font-bold transition-all"
                  >
                    +500 크레딧 즉시 충전
                  </button>
                </div>

                {/* 1500 Credits Pack */}
                <div className="p-5 rounded-xl border border-amber-400 bg-amber-50/30 flex flex-col justify-between relative">
                  <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider">
                    50% Bonus
                  </div>
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mb-3">
                      <Crown className="w-5 h-5 text-amber-600 fill-amber-400" />
                    </div>
                    <h4 className="text-lg font-bold text-editorial-text">1,500 대용량 팩</h4>
                    <p className="text-xs text-editorial-muted mt-1">
                      TOPIK 모의고사 및 집중 회화 학습을 위한 대용량
                    </p>
                    <div className="mt-4 text-2xl font-serif font-extrabold text-editorial-text">
                      $19.99
                    </div>
                  </div>

                  <button
                    onClick={() => handleBuyCredits(1500, '$19.99', 'Pro 1500 Pack')}
                    className="mt-6 w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all"
                  >
                    +1,500 크레딧 즉시 충전
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-editorial-text uppercase tracking-wider">
                  크레딧 이용 및 충전 기록
                </h3>
                <span className="text-xs text-editorial-muted">
                  총 {stats.creditHistory.length}개의 내역
                </span>
              </div>

              <div className="space-y-2">
                {stats.creditHistory.length === 0 ? (
                  <div className="text-center py-10 text-editorial-muted text-sm">
                    아직 크레딧 사용 내역이 없습니다.
                  </div>
                ) : (
                  stats.creditHistory.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-3.5 rounded-lg bg-editorial-bg border border-editorial-border flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          tx.amount > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {tx.amount > 0 ? '+' : '-'}
                        </div>
                        <div>
                          <div className="font-bold text-editorial-text">{tx.description}</div>
                          <div className="text-[11px] text-editorial-muted mt-0.5">{tx.date}</div>
                        </div>
                      </div>
                      <div className={`font-mono font-bold text-sm ${
                        tx.amount > 0 ? 'text-emerald-600' : 'text-editorial-text'
                      }`}>
                        {tx.amount > 0 ? `+${tx.amount}` : tx.amount} ⚡
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-editorial-border bg-editorial-bg flex items-center justify-between text-xs text-editorial-muted">
          <div className="flex items-center space-x-2">
            <span>💡 팁: EduBridge 1:1 화상 한국어 수업 이용 시 모든 AI 학습 기능이 무료로 연동됩니다.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-editorial-text hover:bg-editorial-accent text-white font-bold transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
