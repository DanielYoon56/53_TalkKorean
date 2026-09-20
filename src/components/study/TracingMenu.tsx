import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, Volume2, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { speakKoreanText } from '../../utils/tts';

interface TraceItem {
  char: string;
  romanized: string;
  name: string;
  strokeOrderTip: string;
}

export default function TracingMenu() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [strokeColor, setStrokeColor] = useState<string>('#111827');
  const [lineWidth, setLineWidth] = useState<number>(8);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const characters: TraceItem[] = [
    { char: '가', romanized: 'ga', name: '가 (ga)', strokeOrderTip: 'Draw consonant ㄱ from left to right then down, followed by vertical and horizontal strokes of ㅏ.' },
    { char: '나', romanized: 'na', name: '나 (na)', strokeOrderTip: 'Draw ㄴ starting from top vertical down to right horizontal, then attach ㅏ.' },
    { char: '다', romanized: 'da', name: '다 (da)', strokeOrderTip: 'Top horizontal line first, then L-shape bottom for ㄷ, then ㅏ.' },
    { char: '라', romanized: 'ra/la', name: '라 (ra)', strokeOrderTip: 'Draw ㄹ in three smooth movements: horizontal-down, right-horizontal, down-right.' },
    { char: '마', romanized: 'ma', name: '마 (ma)', strokeOrderTip: 'Left vertical first, top-right corner down, then bottom horizontal for ㅁ.' },
    { char: '바', romanized: 'ba', name: '바 (ba)', strokeOrderTip: 'Two vertical lines first, then two connecting horizontal lines for ㅂ.' },
    { char: '사', romanized: 'sa', name: '사 (sa)', strokeOrderTip: 'Left diagonal stroke first, then right diagonal stroke from midpoint.' },
    { char: '아', romanized: 'a', name: '아 (a)', strokeOrderTip: 'Draw circular ㅇ counter-clockwise from top, then attach vertical ㅏ.' },
    { char: '자', romanized: 'ja', name: '자 (ja)', strokeOrderTip: 'Top horizontal bar, then left diagonal, then right diagonal for ㅈ.' },
    { char: '차', romanized: 'cha', name: '차 (cha)', strokeOrderTip: 'Short top horizontal dash, horizontal bar below it, then diagonal legs for ㅊ.' },
    { char: '카', romanized: 'ka', name: '카 (ka)', strokeOrderTip: 'Draw ㄱ shape first, then add middle horizontal line.' },
    { char: '타', romanized: 'ta', name: '타 (ta)', strokeOrderTip: 'Top horizontal bar, middle bar, then L-shaped bottom for ㅌ.' },
    { char: '파', romanized: 'pa', name: '파 (pa)', strokeOrderTip: 'Top horizontal bar, two vertical inner legs, bottom horizontal bar for ㅍ.' },
    { char: '하', romanized: 'ha', name: '하 (ha)', strokeOrderTip: 'Top small dash, middle bar, then counter-clockwise circle ㅇ below.' },
    { char: '서울', romanized: 'Seoul', name: '서울 (Seoul)', strokeOrderTip: 'Practice writing Korea’s capital city name smoothly in two blocks.' },
    { char: '한국', romanized: 'Hanguk', name: '한국 (Korea)', strokeOrderTip: 'Practice writing "Hanguk" (Korea) with proper character balance.' }
  ];

  const currentItem = characters[activeIdx];

  const drawWatermark = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid guide lines
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Watermark char
    ctx.fillStyle = 'rgba(209, 213, 219, 0.35)'; // Faded gray for tracing
    ctx.font = 'bold 220px "Playfair Display", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentItem.char, canvas.width / 2, canvas.height / 2 + 10);
  };

  useEffect(() => {
    drawWatermark();
  }, [activeIdx]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    drawWatermark();
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % characters.length);
  };

  const handleSpeakText = (text: string) => {
    speakKoreanText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-editorial-border rounded-sm p-6 space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-sm bg-editorial-accent-light/50 text-editorial-accent flex items-center justify-center font-bold">
            <span>✏️</span>
          </div>
          <h2 className="text-xl font-serif font-bold text-editorial-text">Tracing Practice (따라 쓰기 연습)</h2>
        </div>
        <p className="text-xs text-editorial-muted leading-relaxed">
          Trace Hangul characters directly on the interactive pad below. Follow standard Korean stroke order (from left to right, top to bottom) to build muscle memory.
        </p>

        {/* Characters Selector */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {characters.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer font-serif ${
                activeIdx === idx
                  ? 'bg-editorial-text text-white shadow-sm'
                  : 'bg-editorial-bg border border-editorial-border text-editorial-text hover:bg-editorial-accent-light/40'
              }`}
            >
              {item.char}
            </button>
          ))}
        </div>
      </div>

      {/* Tracing Pad Board */}
      <div className="bg-white border border-editorial-border rounded-sm p-6 space-y-6">
        {/* Top toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-editorial-border pb-4">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold uppercase tracking-widest text-editorial-accent font-serif">
              Character: {currentItem.name}
            </span>
            <button
              onClick={() => handleSpeakText(currentItem.char)}
              className="p-1.5 rounded-sm bg-editorial-accent-light/50 hover:bg-editorial-accent hover:text-white text-editorial-accent border border-editorial-border transition-colors cursor-pointer"
              title="Hear sound"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {/* Color picker */}
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-bold text-editorial-muted uppercase mr-1">Color</span>
              {[
                { color: '#111827', name: 'Black' },
                { color: '#C2410C', name: 'Orange' },
                { color: '#059669', name: 'Emerald' },
                { color: '#2563EB', name: 'Blue' }
              ].map((c) => (
                <button
                  key={c.color}
                  onClick={() => setStrokeColor(c.color)}
                  className={`w-5 h-5 rounded-full border cursor-pointer transition-transform ${
                    strokeColor === c.color ? 'scale-125 border-black shadow-sm' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: c.color }}
                  title={c.name}
                />
              ))}
            </div>

            {/* Brush Width */}
            <div className="flex items-center space-x-1">
              <span className="text-[10px] font-bold text-editorial-muted uppercase mr-1">Brush</span>
              {[
                { w: 4, label: 'Thin' },
                { w: 8, label: 'Med' },
                { w: 14, label: 'Thick' }
              ].map((b) => (
                <button
                  key={b.w}
                  onClick={() => setLineWidth(b.w)}
                  className={`px-2 py-0.5 rounded-sm text-[10px] font-bold cursor-pointer border ${
                    lineWidth === b.w
                      ? 'bg-editorial-text text-white border-editorial-text'
                      : 'bg-white border-editorial-border text-editorial-muted hover:text-editorial-text'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {/* Clear Button */}
            <button
              onClick={handleClear}
              className="px-3 py-1.5 bg-editorial-bg hover:bg-editorial-accent-light/40 border border-editorial-border rounded-sm text-xs font-bold text-editorial-text flex items-center space-x-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Pad</span>
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="border-2 border-dashed border-editorial-border rounded-sm bg-white overflow-hidden shadow-inner relative">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={endDrawing}
              onMouseLeave={endDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={endDrawing}
              className="cursor-crosshair touch-none"
            />
          </div>

          <div className="max-w-md text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-editorial-accent block">
              Stroke Order Guidance
            </span>
            <p className="text-xs text-editorial-muted">
              {currentItem.strokeOrderTip}
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-editorial-text hover:bg-editorial-accent text-white rounded-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center space-x-2"
            >
              <span>Next Character</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
