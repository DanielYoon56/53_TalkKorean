/**
 * Centralized High-Quality Korean Text-to-Speech (TTS) Engine
 * Uses the exact voice optimization from AI Live Conversation (Ai실전회화):
 * - Clean text formatting (strips trailing emojis and symbols so question marks produce clean rising intonation)
 * - Prioritizes Chrome / Browser Online Cloud Voices (e.g. Google 한국의, Natural, Online, Chrome, Edge)
 * - Fine-tuned rate (1.06) and pitch (1.08) for natural, lively, and polite native Korean intonation
 */

export function initSpeechVoices(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }
}

export interface SpeakOptions {
  role?: 'ai' | 'tutor' | 'user' | 'guide';
  rate?: number; // relative multiplier, default 1.0
  pitch?: number; // override pitch if needed
  onEnd?: () => void;
  onError?: () => void;
  forceImmediate?: boolean;
}

/**
 * Clean text for natural Korean TTS intonation.
 * Removes emojis and special punctuation that ruin sentence-ending intonation.
 */
export function cleanTextForSpeech(text: string): string {
  return text
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .replace(/[~^*#_+=|{}[\]<>\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim() || text;
}

/**
 * High quality Korean Speech Synthesis engine used in AI Live Conversation.
 * Prioritizes Chrome / Browser Online Cloud voices with natural intonation.
 */
export function speakKoreanText(text: string, options: SpeakOptions = {}): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (options.onError) options.onError();
    return;
  }

  const {
    role = 'ai',
    rate = 1.0,
    pitch,
    onEnd,
    onError,
    forceImmediate = true,
  } = options;

  if (forceImmediate) {
    window.speechSynthesis.cancel();
  }

  const cleanText = cleanTextForSpeech(text);
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'ko-KR';

  if (onEnd) utterance.onend = () => onEnd();
  if (onError) utterance.onerror = () => onError();

  const voices = window.speechSynthesis.getVoices();
  const koreanVoices = voices.filter(v =>
    v.lang.replace('_', '-').toLowerCase().includes('ko')
  );

  // Prioritize Chrome / Browser online cloud voices (!v.localService or Google/Online/Natural)
  // so that users hear a consistent, high-quality browser voice across devices
  const chromeOnlineFemale = koreanVoices.find(v =>
    (!v.localService || /google|online|natural|chrome|edge/i.test(v.name)) &&
    !/male|nam|injoon|in-joon|giyool|wansoo|seungho|man|kr-male|남성|jaehyuk|hyun-joon|hyunjoon|minsu|jinho|bongjin|hyunsu|boy|m01|m02|m03|ko-kr-x-ism|남/i.test(v.name)
  ) || koreanVoices.find(v =>
    !/male|nam|injoon|in-joon|giyool|wansoo|seungho|man|kr-male|남성|jaehyuk|hyun-joon|hyunjoon|minsu|jinho|bongjin|hyunsu|boy|m01|m02|m03|ko-kr-x-ism|남/i.test(v.name)
  ) || koreanVoices[0];

  if (role === 'user') {
    const explicitMaleVoice = koreanVoices.find(v =>
      (!v.localService || /google|online|natural|chrome|edge/i.test(v.name)) &&
      /male|nam|injoon|in-joon|in joon|jaehyuk|hyunjoon|hyun-joon|giyool|wansoo|seungho|ouk|yohan|ho-dong|standard-c|standard-d|wavenet-c|wavenet-d|neural2-c|neural2-d|studio-c|studio-d|ko-kr-x-ism|man|boy|guy|m01|m02|m03|haejin|minho|voice.*[23]|한국어.*[23]|남성|남|korean.*male|samsung.*male/i.test(v.name)
    ) || koreanVoices.find(v =>
      /male|nam|injoon|in-joon|in joon|jaehyuk|hyunjoon|hyun-joon|giyool|wansoo|seungho|ouk|yohan|ho-dong|standard-c|standard-d|wavenet-c|wavenet-d|neural2-c|neural2-d|studio-c|studio-d|ko-kr-x-ism|man|boy|guy|m01|m02|m03|haejin|minho|voice.*[23]|한국어.*[23]|남성|남|korean.*male|samsung.*male/i.test(v.name)
    );

    if (explicitMaleVoice) {
      utterance.voice = explicitMaleVoice;
      utterance.pitch = pitch ?? 1.0;
      utterance.rate = 1.0 * rate;
    } else {
      if (chromeOnlineFemale) {
        utterance.voice = chromeOnlineFemale;
      }
      utterance.pitch = pitch ?? 0.68;
      utterance.rate = 0.96 * rate;
    }
  } else {
    // Standard AI / Native Tutor / Guide Voice
    // Rate = 1.06 prevents speech from being sluggish/flat ("쳐지고"),
    // Pitch = 1.08 adds a bright, natural, polite customer-service tone with rising question intonation.
    if (chromeOnlineFemale) {
      utterance.voice = chromeOnlineFemale;
    }
    utterance.pitch = pitch ?? 1.08;
    utterance.rate = 1.06 * rate;
  }

  window.speechSynthesis.speak(utterance);
}

/**
 * Cancel and stop any ongoing speech synthesis immediately.
 */
export function stopKoreanSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function stopSpeech(): void {
  stopKoreanSpeech();
}

export function speakText(text: string, lang: string = 'ko', onEnd?: () => void): void {
  speakKoreanText(text, { onEnd });
}

