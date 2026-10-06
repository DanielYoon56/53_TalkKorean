import React from 'react';
import { Sparkles, ArrowRight, MessageSquare, Volume2, ShieldCheck } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';

interface SeoHeroProps {
  h1: string;
  subtitle: string;
  categoryLabel: string;
  parentCategoryName: string;
  parentCategoryPath: string;
  currentPath: string;
  primaryCtaText: string;
  onNavigateToPractice: () => void;
  onNavigatePath?: (path: string) => void;
}

export default function SeoHero({
  h1,
  subtitle,
  categoryLabel,
  parentCategoryName,
  parentCategoryPath,
  currentPath,
  primaryCtaText,
  onNavigateToPractice,
  onNavigatePath
}: SeoHeroProps) {
  return (
    <header className="relative bg-[#1A1A1A] text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-800 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-6 relative z-10 text-left">
        {/* Breadcrumbs inside header container */}
        <div className="border-b border-neutral-800/80 pb-3">
          <Breadcrumbs
            items={[
              { name: parentCategoryName, path: parentCategoryPath },
              { name: h1, path: currentPath }
            ]}
            onNavigate={onNavigatePath}
          />
        </div>

        {/* Category Badge & Live Tag */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center space-x-1.5 font-sans">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{categoryLabel}</span>
          </span>
          <span className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1 font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI Interactive Practice</span>
          </span>
          <span className="px-2.5 py-1 rounded text-xs text-neutral-400 font-sans hidden sm:inline-flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
            <span>For Foreign Learners</span>
          </span>
        </div>

        {/* Main H1 Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15]">
          {h1}
        </h1>

        {/* Subtitle / Explanation */}
        <p className="text-base sm:text-lg text-neutral-300 font-sans leading-relaxed max-w-3xl">
          {subtitle}
        </p>

        {/* Action CTAs */}
        <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href="/korean-conversation-practice"
            onClick={(e) => {
              e.preventDefault();
              onNavigateToPractice();
            }}
            className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-sm font-bold tracking-wider text-xs uppercase transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer hover:shadow-md"
          >
            <MessageSquare className="w-4 h-4 text-neutral-900" />
            <span>{primaryCtaText}</span>
            <ArrowRight className="w-4 h-4 text-neutral-900" />
          </a>

          <a
            href="/korean-conversation-practice"
            onClick={(e) => {
              e.preventDefault();
              onNavigateToPractice();
            }}
            className="px-5 py-3.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white rounded-sm font-bold tracking-wider text-xs uppercase transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>Try Native Audio Free</span>
          </a>
        </div>
      </div>
    </header>
  );
}
