import React, { useState } from 'react';
import { SeoPageConfig, SEO_PAGES } from '../../config/seoPages';
import SeoHead from './SeoHead';
import SeoHero from './SeoHero';
import SeoFeatures from './SeoFeatures';
import SeoDialogueSample from './SeoDialogueSample';
import { 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Bot, 
  Headphones, 
  BookOpen, 
  Compass,
  Zap,
  Globe2
} from 'lucide-react';

interface SeoLandingPageProps {
  config: SeoPageConfig;
  onNavigateToPractice: () => void;
  onNavigatePath: (path: string) => void;
}

export default function SeoLandingPage({
  config,
  onNavigateToPractice,
  onNavigatePath
}: SeoLandingPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900 font-sans selection:bg-amber-100 selection:text-neutral-900">
      {/* 1. Dynamic Head Meta & Structured Data */}
      <SeoHead config={config} />

      {/* 2. Editorial Dark Hero */}
      <SeoHero
        h1={config.h1}
        subtitle={config.heroSubtitle}
        categoryLabel={config.categoryLabel}
        parentCategoryName={config.parentCategoryName}
        parentCategoryPath={config.parentCategoryPath}
        currentPath={config.path}
        primaryCtaText={config.primaryCtaText}
        onNavigateToPractice={onNavigateToPractice}
        onNavigatePath={onNavigatePath}
      />

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16 sm:space-y-20">
        
        {/* 3. Problem Explanation Section */}
        <section aria-labelledby="problem-heading" className="space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold font-sans">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Why Conventional Methods Fall Short</span>
          </div>
          
          <h2 id="problem-heading" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-neutral-900 tracking-tight leading-snug">
            {config.problemExplanation.heading}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {config.problemExplanation.paragraphs.map((para, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-lg border border-neutral-200/80 shadow-2xs leading-relaxed text-neutral-700 text-sm sm:text-base space-y-3"
              >
                <div className="w-7 h-7 rounded-sm bg-neutral-100 text-neutral-700 flex items-center justify-center font-bold text-xs font-mono">
                  0{idx + 1}
                </div>
                <p>{para}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. How It Works Section */}
        <section aria-labelledby="how-it-works-heading" className="space-y-8 text-left bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-2xs">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-700 uppercase tracking-widest font-mono">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Step-by-Step Methodology</span>
            </div>
            <h2 id="how-it-works-heading" className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 tracking-tight">
              {config.howItWorks.heading}
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              {config.howItWorks.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {config.howItWorks.steps.map((st) => (
              <div 
                key={st.stepNumber}
                className="relative bg-neutral-50/70 border border-neutral-200 rounded-lg p-5 space-y-3 hover:border-amber-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-serif font-black flex items-center justify-center text-sm shadow-xs">
                  {st.stepNumber}
                </div>
                <h3 className="font-serif font-bold text-base text-neutral-900">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {st.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-start">
            <button
              onClick={onNavigateToPractice}
              className="px-5 py-2.5 rounded-sm bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all cursor-pointer shadow-sm hover:shadow"
            >
              <span>{config.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </section>

        {/* 5. Realistic Example Conversation & Audio */}
        <SeoDialogueSample
          scenarioTitle={config.exampleConversation.scenarioTitle}
          context={config.exampleConversation.context}
          turns={config.exampleConversation.turns}
          onStartPractice={onNavigateToPractice}
        />

        {/* 6. Feature Grid */}
        <SeoFeatures features={config.features} />

        {/* 7. Why AI Korean Conversation Section */}
        <section aria-labelledby="why-ai-heading" className="space-y-6 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-700 uppercase tracking-widest font-mono">
              <Bot className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pedagogical Advantage</span>
            </div>
            <h2 id="why-ai-heading" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
              {config.whyAiSection.heading}
            </h2>
          </div>

          <div className="space-y-4 text-neutral-700 text-sm sm:text-base leading-relaxed max-w-3xl">
            {config.whyAiSection.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            {config.whyAiSection.bulletPoints.map((bp, idx) => (
              <div 
                key={idx}
                className="bg-white border border-neutral-200 rounded-lg p-5 space-y-2 hover:border-emerald-300 transition-colors shadow-2xs"
              >
                <div className="flex items-center space-x-2 text-emerald-700 font-bold font-serif text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{bp.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {bp.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Frequently Asked Questions (FAQ) */}
        <section aria-labelledby="faq-heading" className="space-y-6 text-left">
          <div className="space-y-2">
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600">
              Clear answers to common questions about practicing Korean conversation with Talk Korean.
            </p>
          </div>

          <div className="space-y-3">
            {config.faq.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-neutral-200 rounded-lg overflow-hidden transition-colors shadow-2xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between space-x-4 hover:bg-neutral-50 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif font-bold text-sm sm:text-base text-neutral-900">
                      {item.question}
                    </span>
                    <span className="shrink-0 text-neutral-500">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50/40">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 9. Related Practice Topics / Internal Linking Grid */}
        {config.relatedPaths && config.relatedPaths.length > 0 && (
          <section aria-labelledby="related-heading" className="space-y-6 text-left pt-6 border-t border-neutral-200">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs font-bold text-neutral-500 font-mono uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-neutral-400" />
                <span>Explore Further</span>
              </div>
              <h2 id="related-heading" className="text-xl sm:text-2xl font-serif font-bold text-neutral-900">
                Related Korean Conversation Topics
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500">
                Continue your learning across practical situational dialogues and core fluency skills.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {config.relatedPaths.map((relPath) => {
                const relConfig = SEO_PAGES[relPath];
                if (!relConfig) return null;

                return (
                  <a
                    key={relPath}
                    href={relPath}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigatePath(relPath);
                    }}
                    className="block bg-white border border-neutral-200 hover:border-amber-400 rounded-lg p-4 space-y-2 transition-all hover:shadow-xs group"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-100 text-neutral-600 uppercase font-mono">
                        {relConfig.categoryLabel}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <h3 className="font-serif font-bold text-sm text-neutral-900 group-hover:text-amber-900 transition-colors line-clamp-1">
                      {relConfig.h1}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                      {relConfig.description}
                    </p>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        {/* 10. High-Converting Bottom CTA Card */}
        <section className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-md border border-neutral-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider font-mono">
              Ready to Speak Korean Fluently?
            </span>
            <h2 className="text-2xl sm:text-3xl sm:leading-tight lg:text-4xl font-serif font-bold text-white tracking-tight">
              Start Practicing Real Conversations Now
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
              Experience dynamic turn-by-turn Korean conversations with instant phonetic feedback, speech level guidance, and zero judgment.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onNavigateToPractice}
                className="w-full sm:w-auto px-7 py-3 rounded-md bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md hover:shadow-lg font-sans"
              >
                <span>{config.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 text-neutral-950" />
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
