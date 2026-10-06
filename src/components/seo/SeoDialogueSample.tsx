import React, { useState } from 'react';
import { Volume2, MessageSquare, Play } from 'lucide-react';
import { SeoDialogueTurn } from '../../config/seoPages';
import { speakKoreanText } from '../../utils/tts';

interface SeoDialogueSampleProps {
  scenarioTitle: string;
  context: string;
  turns: SeoDialogueTurn[];
  onStartPractice: () => void;
}

export default function SeoDialogueSample({
  scenarioTitle,
  context,
  turns,
  onStartPractice
}: SeoDialogueSampleProps) {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const handlePlayAudio = (korean: string, index: number) => {
    setPlayingIndex(index);
    speakKoreanText(korean, {
      role: index % 2 === 0 ? 'ai' : 'user',
      rate: 1.0,
      forceImmediate: true
    });
    setTimeout(() => {
      setPlayingIndex(null);
    }, 2500);
  };

  return (
    <section aria-labelledby="dialogue-sample-heading" className="space-y-4 text-left">
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <span className="p-1 rounded bg-amber-100 text-amber-800 text-xs font-bold font-mono">
            LIVE SAMPLE
          </span>
          <span className="text-xs text-neutral-500 font-sans">Realistic Korean Exchange</span>
        </div>
        <h2 id="dialogue-sample-heading" className="text-2xl sm:text-3xl font-serif font-bold text-editorial-text tracking-tight">
          Example Korean Conversation: {scenarioTitle}
        </h2>
        <p className="text-xs sm:text-sm text-editorial-muted italic">
          Context: {context}
        </p>
      </div>

      <div className="bg-white border-2 border-editorial-border rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="space-y-3.5">
          {turns.map((turn, index) => {
            const isFirst = index % 2 === 0;
            const isPlaying = playingIndex === index;

            return (
              <div
                key={index}
                className={`p-4 rounded-xl border transition-all ${
                  isFirst
                    ? 'bg-amber-50/60 border-amber-200/80 mr-auto max-w-[95%] sm:max-w-[85%]'
                    : 'bg-neutral-50 border-neutral-200 ml-auto max-w-[95%] sm:max-w-[85%]'
                }`}
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200/60 mb-2">
                  <span className="text-xs font-bold font-serif text-neutral-800 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>{turn.speaker}</span>
                  </span>

                  <button
                    onClick={() => handlePlayAudio(turn.korean, index)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center space-x-1 transition-colors cursor-pointer ${
                      isPlaying
                        ? 'bg-amber-600 text-white'
                        : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300 shadow-2xs'
                    }`}
                    title="Listen to native audio pronunciation"
                  >
                    <Volume2 className="w-3 h-3 text-amber-700" />
                    <span>{isPlaying ? 'Playing...' : 'Listen Audio'}</span>
                  </button>
                </div>

                <div className="space-y-1">
                  <p className="text-base sm:text-lg font-serif font-bold text-neutral-900 leading-snug">
                    {turn.korean}
                  </p>
                  {turn.romanized && (
                    <p className="text-xs font-mono text-amber-900/80">
                      🗣️ {turn.romanized}
                    </p>
                  )}
                  <p className="text-xs text-neutral-600 pt-1 border-t border-neutral-100">
                    🇬🇧 {turn.english}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-neutral-500">
            Want to speak this dialogue yourself with live audio analysis?
          </p>
          <a
            href="/korean-conversation-practice"
            onClick={(e) => {
              e.preventDefault();
              onStartPractice();
            }}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Practice This in Talk Korean</span>
          </a>
        </div>
      </div>
    </section>
  );
}
