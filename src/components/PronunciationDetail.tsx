import React, { useState } from 'react';
import { Award, Volume2, Share2, Play, RefreshCw, ChevronRight, Music } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { PronunciationScore } from '../types';
import { speakKoreanText } from '../utils/tts';

interface PronunciationDetailProps {
  result: PronunciationScore | null;
  setActiveTab: (tab: string) => void;
  onTryAgain: () => void;
}

export default function PronunciationDetail({ result, setActiveTab, onTryAgain }: PronunciationDetailProps) {
  const [isPlayingArtist, setIsPlayingArtist] = useState<boolean>(false);
  const [isPlayingUser, setIsPlayingUser] = useState<boolean>(false);

  if (!result) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <span className="text-4xl">🎙️</span>
        <h3 className="text-xl font-bold font-serif text-editorial-text">No recording analyzed yet</h3>
        <p className="text-sm text-editorial-muted">Go to K-POP Lyrics Lab and record your voice to see detailed breakdown.</p>
        <button
          onClick={() => setActiveTab('LyricsLab')}
          className="px-5 py-2.5 bg-editorial-text hover:bg-editorial-accent text-white font-bold rounded-sm text-xs cursor-pointer uppercase tracking-wider"
        >
          Go to Lyrics Lab
        </button>
      </div>
    );
  }

  const handlePlayArtist = () => {
    setIsPlayingArtist(true);
    speakKoreanText(result.lyrics, {
      role: 'ai',
      onEnd: () => setIsPlayingArtist(false),
      onError: () => setIsPlayingArtist(false),
      forceImmediate: true
    });
  };

  const playFallbackUserVoice = () => {
    speakKoreanText(result.lyrics, {
      role: 'user',
      onEnd: () => setIsPlayingUser(false),
      onError: () => setIsPlayingUser(false),
      forceImmediate: true
    });
  };

  const handlePlayUser = () => {
    setIsPlayingUser(true);
    if (result.userRecordingUrl) {
      const audio = new Audio(result.userRecordingUrl);
      audio.onended = () => setIsPlayingUser(false);
      audio.onerror = (e) => {
        console.warn("Audio playback error, using fallback speech:", e);
        playFallbackUserVoice();
      };
      audio.play().catch((err) => {
        console.warn("Audio play prevented or failed, using fallback speech:", err);
        playFallbackUserVoice();
      });
    } else {
      playFallbackUserVoice();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      
      {/* Title Header */}
      <div className="space-y-1">
        <span className="text-xs font-bold text-editorial-accent uppercase tracking-widest block">K-Lang Hero Engine Result</span>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-editorial-text">Pronunciation Deep Assessment</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side circular score block (5 Columns) */}
        <div className="md:col-span-5 bg-white border border-editorial-border rounded-sm p-6 shadow-none flex flex-col justify-between space-y-6">
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-editorial-muted uppercase tracking-wider block">Overall Score</span>
            
            {/* Round circular metric representation */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-editorial-accent-light"></div>
              
              <div className="text-center z-10">
                <span className="text-5xl font-bold font-serif tracking-tight text-editorial-text">{result.score}</span>
                <span className="text-xs font-bold text-editorial-muted block mt-0.5">/ 100</span>
              </div>
            </div>

            <span className="inline-flex items-center space-x-1.5 bg-editorial-accent-light/50 border border-editorial-border text-editorial-accent px-3 py-1 rounded-sm text-xs font-bold uppercase shadow-none">
              <Award className="w-4 h-4 text-editorial-accent" />
              <span>EXCELLENT</span>
            </span>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-3 pt-4 border-t border-editorial-border">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-editorial-muted">Phoneme Accuracy</span>
                <span className="text-editorial-accent">{result.accuracy}%</span>
              </div>
              <div className="w-full bg-editorial-accent-light h-1.5 rounded-sm">
                <div className="bg-editorial-accent h-1.5 rounded-sm" style={{ width: `${result.accuracy}%` }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-editorial-muted">Rhythmic Tempo</span>
                <span className="text-editorial-text">{result.rhythm}%</span>
              </div>
              <div className="w-full bg-editorial-accent-light h-1.5 rounded-sm">
                <div className="bg-editorial-text h-1.5 rounded-sm" style={{ width: `${result.rhythm}%` }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-editorial-muted">Pitch & Intonation</span>
                <span className="text-editorial-accent">{result.intonation}%</span>
              </div>
              <div className="w-full bg-editorial-accent-light h-1.5 rounded-sm">
                <div className="bg-editorial-accent h-1.5 rounded-sm" style={{ width: `${result.intonation}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side detailed diagnostics & waveforms (7 Columns) */}
        <div className="md:col-span-7 bg-white border border-editorial-border rounded-sm p-6 shadow-none flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-editorial-accent uppercase tracking-widest block mb-1">Studied Phrase</span>
              <h3 className="text-xl font-bold font-serif text-editorial-text">"{result.lyrics}"</h3>
            </div>

            {/* Expert Feedback block */}
            <div className="bg-editorial-accent-light/30 border border-editorial-border p-4 rounded-sm text-left space-y-2">
              <span className="text-[10px] font-bold text-editorial-accent uppercase tracking-widest block">AI Mentor Feedback</span>
              <p className="text-xs sm:text-sm font-medium text-editorial-text leading-relaxed">
                {result.expertFeedback}
              </p>
            </div>
          </div>

          {/* Comparative Playback Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handlePlayArtist}
              disabled={isPlayingArtist}
              className="px-4 py-3 bg-editorial-accent-light/40 hover:bg-editorial-accent-light/70 disabled:bg-editorial-accent-light border border-editorial-border text-xs text-editorial-text font-bold rounded-sm flex items-center justify-center space-x-2 cursor-pointer transition-colors uppercase tracking-wider"
            >
              <Volume2 className={`w-4 h-4 ${isPlayingArtist ? 'animate-bounce text-editorial-accent' : ''}`} />
              <span>{isPlayingArtist ? "Playing Guide..." : "Play Artist Guide"}</span>
            </button>

            <button
              onClick={handlePlayUser}
              disabled={isPlayingUser}
              className="px-4 py-3 bg-editorial-accent-light/40 hover:bg-editorial-accent-light/70 disabled:bg-editorial-accent-light border border-editorial-border text-xs text-editorial-text font-bold rounded-sm flex items-center justify-center space-x-2 cursor-pointer transition-colors uppercase tracking-wider"
            >
              <Play className={`w-4 h-4 ${isPlayingUser ? 'animate-pulse text-editorial-accent' : ''}`} />
              <span>{isPlayingUser ? "Playing You..." : "Play Your Voice"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* WAVEFORM ANALYSIS GRAPH COMPONENT */}
      <div className="bg-white border border-editorial-border rounded-sm p-6 shadow-none space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-editorial-border pb-2">
          <div>
            <h3 className="text-base font-bold font-serif text-editorial-text">Waveform Comparative Analysis</h3>
            <p className="text-xs text-editorial-muted font-semibold mt-0.5">Pitch contour matching over phrase timeline</p>
          </div>
          {/* Legend indicator badges */}
          <div className="flex space-x-4 text-[10px] font-bold uppercase tracking-wider">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 bg-editorial-text rounded-full inline-block"></span>
              <span className="text-editorial-muted">Artist Track</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 bg-editorial-accent rounded-full inline-block"></span>
              <span className="text-editorial-muted">Your Track</span>
            </span>
          </div>
        </div>

        {/* Recharts chart component */}
        <div className="h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={result.waveformCompareData} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E4DD" />
              <XAxis dataKey="name" stroke="#A68A56" fontSize={10} fontWeight="bold" />
              <YAxis stroke="#A68A56" fontSize={10} fontWeight="bold" domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="artist" stroke="#1A1A1A" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="user" stroke="#A68A56" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-[10px] font-bold text-editorial-muted">
          ⚠️ <span className="text-editorial-accent">Note:</span> Rhythm is slightly behind around "Vowel 2" - representing a <span className="text-editorial-accent font-bold">TIMING GAP</span>.
        </p>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-editorial-border">
        <button
          onClick={onTryAgain}
          className="px-6 py-3 bg-white hover:bg-editorial-bg border border-editorial-border text-editorial-text font-bold rounded-sm text-xs flex items-center justify-center space-x-2 shadow-none transition-all cursor-pointer uppercase tracking-wider"
        >
          <RefreshCw className="w-4 h-4 text-editorial-muted" />
          <span>Try Again / Practice New</span>
        </button>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <button
            onClick={() => alert("Assessment shared with Talk Korean scholar dashboard!")}
            className="px-6 py-3 bg-white hover:bg-editorial-bg border border-editorial-border text-editorial-text font-bold rounded-sm text-xs flex items-center justify-center space-x-2 shadow-none transition-all cursor-pointer uppercase tracking-wider"
          >
            <Share2 className="w-4 h-4 text-editorial-muted" />
            <span>Share Result</span>
          </button>

          <button
            onClick={() => setActiveTab('LyricsLab')}
            className="px-6 py-3 bg-editorial-text hover:bg-editorial-accent text-white font-bold rounded-sm text-xs flex items-center justify-center space-x-1 shadow-none transition-all cursor-pointer uppercase tracking-wider"
          >
            <span>Next Lyric Line</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* master recommendation cards */}
      <div className="bg-editorial-accent-light/30 border border-editorial-border rounded-sm p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-none">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center text-editorial-accent shadow-none border border-editorial-border text-lg font-bold">
            <Music className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h4 className="font-bold text-xs text-editorial-text uppercase tracking-widest">Master More From This Artist</h4>
            <p className="text-sm font-bold font-serif text-editorial-text mt-0.5">I Will Go To You Like The First Snow (첫눈처럼 너에게 가겠다)</p>
            <p className="text-xs text-editorial-muted font-semibold">Ailee (에일리) • Difficulty: Advanced</p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('LyricsLab')}
          className="px-4 py-2 bg-editorial-text hover:bg-editorial-accent text-white text-xs font-bold rounded-sm transition-all whitespace-nowrap cursor-pointer uppercase tracking-wider"
        >
          View Artist List
        </button>
      </div>

    </div>
  );
}
