import React from 'react';
import { Shield, ExternalLink, HelpCircle, Heart } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: (tab?: 'costs' | 'analytics' | 'simulator' | 'system' | 'users' | 'creator') => void;
  setActiveTab: (tab: string) => void;
}

export default function Footer({ onOpenAdmin, setActiveTab }: FooterProps) {
  return (
    <footer className="w-full bg-[#161616] text-editorial-muted border-t border-editorial-border/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-neutral-800">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-sm bg-editorial-accent text-white flex items-center justify-center font-serif font-black text-base">
                T
              </div>
              <span className="font-serif font-bold text-lg text-white tracking-tight">
                Talk Korean
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
              AI 기반 원어민 발음 정밀 분석, TOPIK 실전 작문 첨삭 및 실시간 인터랙티브 K-컬처 몰입형 한국어 학습 플랫폼입니다.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider font-sans">
              학습 코스 & 서비스
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('LyricsLab')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  K-POP 가사 랩 & 발음 분석
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('Topik')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  TOPIK I & II 실전 모의고사
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('Dashboard')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  존댓말 & 문법 마스터클래스
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('KCulture')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  K-Culture 8대 문화 가이드
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Admin Col */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider font-sans">
              고객지원 및 운영
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('Support')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
                >
                  <HelpCircle className="w-3 h-3 text-sky-400" />
                  <span>1:1 고객문의 & FAQ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('MyPage')}
                  className="hover:text-white transition-colors cursor-pointer text-left text-amber-400 font-semibold"
                >
                  My Page (마이페이지)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('LevelTest')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  한국어 실력 진단 레벨테스트
                </button>
              </li>
            </ul>
          </div>

        </div>


        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 VibeX, Inc. cypro@hanmail.net. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span className="hover:text-neutral-400 cursor-pointer">개인정보처리방침 (Privacy)</span>
            <span className="hover:text-neutral-400 cursor-pointer">이용약관 (Terms)</span>
            <span className="hover:text-neutral-400 cursor-pointer">SSL 256-bit Secure</span>
            {/* Direct Admin Link in Bottom Row */}
            <button
              onClick={() => onOpenAdmin('costs')}
              className="text-neutral-600 hover:text-neutral-400 transition-colors flex items-center space-x-1 cursor-pointer font-mono text-[10px]"
              title="관리자 전용 로그인 (Admin)"
            >
              <Shield className="w-2.5 h-2.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
