import React from 'react';
import { CultureItem, KCultureCategory } from '../data/kCultureData';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CultureCardTemplateProps {
  item: CultureItem;
  onSelectCategory?: (category: KCultureCategory) => void;
  showHeaderTitle?: boolean;
}

export default function CultureCardTemplate({
  item,
  onSelectCategory,
  showHeaderTitle = true,
}: CultureCardTemplateProps) {
  return (
    <div className="bg-white border border-editorial-border rounded-sm p-6 sm:p-8 space-y-8 shadow-none">
      {/* Optional Top Title Header */}
      {showHeaderTitle && (
        <div className="space-y-3 border-b border-editorial-border/60 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center space-x-1.5 bg-editorial-accent-light text-editorial-accent border border-editorial-border px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest">
              <span>Cultural HUB • {item.category}</span>
            </span>
            <span className="text-xs font-mono font-bold text-editorial-muted">
              {item.badge}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-editorial-text tracking-tight">
            {item.titleEn || item.titleKo}
          </h2>
          <p className="text-xs sm:text-sm font-serif font-bold text-editorial-accent">
            {item.titleKo}
          </p>
          <p className="text-xs sm:text-sm text-editorial-muted leading-relaxed max-w-3xl">
            {item.subtitleEn || item.subtitleKo}
          </p>
          {item.subtitleEn && item.subtitleKo && (
            <p className="text-xs text-editorial-muted/80 leading-relaxed max-w-3xl">
              {item.subtitleKo}
            </p>
          )}
        </div>
      )}

      {/* 2-Column Grid Layout (matching Bibimbap landing card format) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Photo & Cultural Commentary Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-sm overflow-hidden border border-editorial-border aspect-[4/3] relative group">
            <img
              src={item.image}
              alt={item.imageCaption}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-sm text-xs font-bold font-serif">
              {item.imageCaption}
            </div>
          </div>

          {/* Cultural Commentary Note */}
          <div className="bg-editorial-accent-light/50 border border-editorial-border p-4 rounded-sm space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-editorial-accent">
                {item.commentaryHeader}
              </span>
              <span className="text-[11px] font-serif font-bold text-editorial-text">
                {item.commentarySub}
              </span>
            </div>
            <p className="text-xs text-editorial-text font-medium leading-relaxed">
              {item.commentaryEn || item.commentaryKo}
            </p>
            {item.commentaryEn && item.commentaryKo && (
              <p className="text-xs text-editorial-muted leading-relaxed">
                {item.commentaryKo}
              </p>
            )}
          </div>

          {/* Korean Culture Tip */}
          <div className="bg-amber-50/80 border border-amber-200/80 p-4 rounded-sm space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 flex items-center space-x-1">
              <span>💡 Korean Culture Tip (한국문화 팁)</span>
            </span>
            <p className="text-xs text-amber-950 font-semibold leading-relaxed">
              {item.cultureTipEn || item.cultureTipKo}
            </p>
            {item.cultureTipEn && item.cultureTipKo && (
              <p className="text-xs text-amber-900/80 leading-relaxed">
                {item.cultureTipKo}
              </p>
            )}
          </div>
        </div>

        {/* Culture Commentary, Key Vocabulary & Method Column */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-editorial-text">
              {item.heritageTitleKo}
            </h3>
            <p className="text-xs sm:text-sm text-editorial-muted leading-relaxed">
              {item.heritageDescKo}
            </p>
          </div>

          {/* Key Vocabulary */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-editorial-accent">
              Key Vocabulary & Phrases (핵심 어휘 및 실전 표현)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {item.keyVocabulary.map((vocab, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-sm bg-editorial-bg border border-editorial-border/80"
                >
                  <div>
                    <div className="font-bold font-serif text-sm text-editorial-text">
                      {vocab.en}
                    </div>
                    <div className="text-xs text-editorial-accent font-semibold">
                      {vocab.ko}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-white border border-editorial-border text-editorial-text shrink-0">
                    {vocab.tip}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Ingredients or Elements */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-editorial-accent">
              {item.category === 'K-Literature'
                ? '쟝르 (Genre & Classic Works)'
                : (item.keyIngredientsLabel || (item.category === 'K-FOOD' ? 'Key Ingredients & Elements (주요 재료 및 구성)' : 'Key Elements & Materials (주요 구성 및 소재)'))}
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.keyIngredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="bg-editorial-bg border border-editorial-border px-3 py-1.5 rounded-sm text-xs flex items-center space-x-1.5"
                >
                  <span className="font-bold text-editorial-text">
                    {ing.en}
                  </span>
                  <span className="text-editorial-accent font-serif font-semibold">({ing.ko})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-editorial-accent">
              {item.category === 'K-Literature'
                ? '한국문학 감상법 (Literature Appreciation Guide)'
                : (item.stepsLabel || (item.category === 'K-FOOD' ? 'Culinary & Cultural Steps (조리 및 체험 순서)' : 'Cultural Steps & Method (체험 및 참여 순서)'))}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {item.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 border border-editorial-border rounded-sm bg-editorial-bg/50 space-y-1"
                >
                  <span className="text-[10px] font-bold text-editorial-accent uppercase">
                    {step.stepLabel}
                  </span>
                  <h5 className="font-bold font-serif text-sm text-editorial-text">
                    {step.descEn}
                  </h5>
                  <p className="text-xs text-editorial-accent font-medium">
                    {step.titleKo}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Button: [해당 카테고리] 큐레이션 전체 보기 */}
      <div className="pt-6 border-t border-editorial-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-xs text-editorial-muted font-medium">
          <Sparkles className="w-4 h-4 text-editorial-accent shrink-0" />
          <span>
            Explore more <strong>{item.category}</strong> cultural insights & practical Korean expressions. (더 많은 {item.category} 문화해설과 실전 한국어)
          </span>
        </div>
        <button
          onClick={() => onSelectCategory && onSelectCategory(item.category)}
          className="w-full sm:w-auto px-6 py-3 bg-editorial-text hover:bg-editorial-accent text-white font-bold text-xs rounded-sm transition-colors flex items-center justify-center space-x-2 shadow-sm cursor-pointer group shrink-0"
        >
          <span>Explore [{item.category}] Curations ([{item.category}] 전체 보기)</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
