import { CURATED_TOPIC_TEMPLATES as PRESETS_PART1 } from './curatedPresetsData';
import { CURATED_TOPIC_TEMPLATES_PART2 as PRESETS_PART2 } from './curatedPresetsDataPart2';
import { synthesizeDynamicContent as internalSynthesizer, DEFAULT_APP_PROMO_URL } from './semanticContentSynthesizer';
import type { 
  GeneratedBlogPost, 
  GeneratedShortsScript,
  GeneratedBlogSection,
  GeneratedBlogPromo,
  GeneratedShortsScene
} from '../types';

export { DEFAULT_APP_PROMO_URL } from './semanticContentSynthesizer';
export type { 
  GeneratedBlogPost, 
  GeneratedShortsScript,
  GeneratedBlogSection,
  GeneratedBlogPromo,
  GeneratedShortsScene
};

export interface GeneratedContentBundle {
  topic: string;
  category: string;
  tone: string;
  generatedAt: string;
  blog?: GeneratedBlogPost;
  shorts?: GeneratedShortsScript;
  appPromoLink?: string;
}

// Master curated registry combining all 8 essential K-Culture presets
export const CURATED_TOPIC_TEMPLATES: Record<string, { blog: GeneratedBlogPost; shorts: GeneratedShortsScript }> = {
  ...PRESETS_PART1,
  ...PRESETS_PART2,
};

// Aliases mapping to ensure instant, high-quality match
const TOPIC_ALIASES: Record<string, string[]> = {
  "소나기": ["소나기", "황순원", "순수", "첫사랑"],
  "밥먹었냐": ["밥 먹었어", "밥먹었냐", "밥먹었어", "밥 먹었냐", "안부", "식구", "식사"],
  "얼죽아": ["얼죽아", "아이스 아메리카노", "아메리카노", "아이스커피", "쪄죽따", "eoljukah"],
  "은는이가": ["은/는", "이/가", "은는", "이가", "은는이가", "조사", "문법"],
  "썸": ["썸", "호칭", "오빠", "꼰대", "썸타다", "연애"],
  "마크정식": ["마크정식", "편의점 꿀조합", "편의점", "스파게티", "모디슈머", "자이언트"],
  "눈치": ["눈치", "nunchi", "처세술", "분위기 파악", "눈치백단"],
  "한강라면": ["한강 라면", "한강라면", "치맥", "뽀글이", "즉석 라면", "한강공원"]
};

/**
 * Searches curated registry using semantic alias matching
 */
export function findCuratedTopic(query: string): string | null {
  if (!query || typeof query !== "string") return null;
  const q = query.trim().toLowerCase();

  // 1. Exact key match
  for (const key of Object.keys(CURATED_TOPIC_TEMPLATES)) {
    if (q === key.toLowerCase()) return key;
  }

  // 2. Alias match
  for (const [key, aliases] of Object.entries(TOPIC_ALIASES)) {
    for (const alias of aliases) {
      const a = alias.toLowerCase();
      if (q.includes(a) || a.includes(q)) {
        return key;
      }
    }
  }

  return null;
}

/**
 * Ensures that the app link is explicitly inserted into the generated scripts,
 * scenes, full text, and promotional banners for promotion.
 */
export function ensureAppPromotion<T extends { blog?: GeneratedBlogPost; shorts?: GeneratedShortsScript; appPromoLink?: string }>(
  bundle: T,
  appUrl: string = DEFAULT_APP_PROMO_URL
): T {
  const finalUrl = appUrl && appUrl.trim() ? appUrl.trim() : DEFAULT_APP_PROMO_URL;
  bundle.appPromoLink = finalUrl;

  if (bundle.shorts) {
    const shorts = bundle.shorts;
    shorts.appPromoLink = finalUrl;

    if (shorts.scenes && shorts.scenes.length > 0) {
      const lastIdx = shorts.scenes.length - 1;
      const lastScene = shorts.scenes[lastIdx];

      if (!lastScene.visual.includes(finalUrl)) {
        lastScene.visual = `${lastScene.visual} (화면: TalkKorean 공식 앱 로고 & 링크 [${finalUrl}])`;
      }
      if (!lastScene.narrationKo.includes(finalUrl) && !lastScene.narrationKo.includes("TalkKorean")) {
        lastScene.narrationKo = `${lastScene.narrationKo} 더 많은 실전 표현과 발음 교정은 TalkKorean 앱(${finalUrl})에서 지금 무료로 만나보세요!`;
      }
      if (!lastScene.narrationEn.includes(finalUrl) && !lastScene.narrationEn.includes("TalkKorean")) {
        lastScene.narrationEn = `${lastScene.narrationEn} Practice speaking real Korean 1:1 on TalkKorean (${finalUrl})!`;
      }
      if (!lastScene.captionText.includes(finalUrl)) {
        lastScene.captionText = `${lastScene.captionText} | 실전 한국어 회화 👉 ${finalUrl}`;
      }
      if (lastScene.captionTextEn && !lastScene.captionTextEn.includes(finalUrl)) {
        lastScene.captionTextEn = `${lastScene.captionTextEn} | Real Korean Practice 👉 ${finalUrl}`;
      }
    }

    const promoKo = `\n\n👉 [TalkKorean 앱 바로가기 - 무료로 실전 대화하기]: ${finalUrl}`;
    if (!shorts.fullScriptKo.includes(finalUrl)) {
      shorts.fullScriptKo = `${shorts.fullScriptKo.trim()}${promoKo}`;
    }

    const promoEn = `\n\n👉 [TalkKorean App Link - Practice Real Korean 1:1]: ${finalUrl}`;
    if (shorts.fullScriptEn && !shorts.fullScriptEn.includes(finalUrl)) {
      shorts.fullScriptEn = `${shorts.fullScriptEn.trim()}${promoEn}`;
    }

    shorts.pinnedCommentKo = `📌 [고정 댓글 / Pinned Comment]
Want to speak real Korean like a native? Practice today's expressions 1:1 with real-time feedback!
오늘 영상에서 배운 한국어 표현, 직접 입으로 말하며 실전 회화와 발음을 연습해보세요!

👉 Try TalkKorean App Free / 공식 앱 무료 체험하기: ${finalUrl}
#TalkKorean #LearnKorean #KoreanCulture #Shorts #StudyKorean`;

    shorts.pinnedCommentEn = `📌 [Pinned Comment]
Want to speak real Korean like a native? Practice today's expressions 1:1 with instant pronunciation scoring!
👉 Try TalkKorean App Free: ${finalUrl}
#TalkKorean #LearnKorean #KoreanCulture #Shorts`;

    shorts.videoDescriptionKo = `🎬 영상 속 한국어 표현과 문화 배경을 더 깊이 배우고 싶다면?
Want to dive deeper into Korean expressions and cultural nuances?
실시간 24시간 실전 1:1 대화 & 정밀 발음 분석이 가능한 TalkKorean 앱을 확인하세요!

👉 Official App / 공식 앱 바로가기: ${finalUrl}

#TalkKorean #Korean #LearnKorean #KCulture #Shorts #Reels`;

    shorts.videoDescriptionEn = `🎬 Want to dive deeper into Korean expressions and cultural nuances?
Experience 24/7 1:1 conversational practice and real-time pronunciation scoring with TalkKorean!
👉 Official App: ${finalUrl}

#TalkKorean #Korean #LearnKorean #KCulture #Shorts`;

    shorts.socialPromoPostKo = `🇰🇷 ${shorts.title}

${shorts.thumbnailHook}
Want to master authentic Korean conversation?
1:1 실전 대화와 발음 교정을 지금 무료로 시작하세요!

👉 TalkKorean Official: ${finalUrl}

#TalkKorean #LearnKorean #KoreanCulture #KWave #StudyKorean`;

    shorts.socialPromoPostEn = `🇰🇷 ${shorts.titleEn || shorts.title}

${shorts.thumbnailHookEn || shorts.thumbnailHook}
Master authentic Korean conversation with 1:1 practice and instant pronunciation scoring!

👉 TalkKorean Official App: ${finalUrl}

#TalkKorean #LearnKorean #KoreanCulture #KWave #StudyKorean`;
  }

  if (bundle.blog) {
    const blog = bundle.blog;
    blog.appPromoLink = finalUrl;
    blog.promoBanner = {
      title: "🇰🇷 TalkKorean - 실전 한국어 & K-컬처 스튜디오",
      titleEn: "🇰🇷 TalkKorean - Real-Life Korean & K-Culture Studio",
      description: "실시간 1:1 회화 연습 및 정밀 발음 분석을 지금 무료로 시작해보세요!",
      descriptionEn: "Start practicing 1:1 conversation and instant pronunciation analysis!",
      url: finalUrl
    };

    // Remove any embedded official app links or promotional text from conclusion and callToAction
    // because the dedicated TalkKorean app conversion banner is already displayed right below them
    if (blog.conclusion) {
      blog.conclusion = removeAppLinksFromText(blog.conclusion);
    }
    if (blog.conclusionEn) {
      blog.conclusionEn = removeAppLinksFromText(blog.conclusionEn);
    }
    if (blog.callToAction) {
      blog.callToAction = removeAppLinksFromText(blog.callToAction);
    }
    if (blog.callToActionEn) {
      blog.callToActionEn = removeAppLinksFromText(blog.callToActionEn);
    }
  }

  return bundle;
}

/**
 * Strips out app URLs, promotional brackets, and promotional lines from conclusion/callToAction
 */
export function removeAppLinksFromText(text: string): string {
  if (!text) return text;
  return text
    // Remove markdown links [title](url)
    .replace(/\[([^\]]+)\]\(https?:\/\/[^\s)]+\)/g, '$1')
    // Remove 💡 [TalkKorean... ] or [Practice... ] promo callouts
    .replace(/💡\s*\[[^\]]*(?:TalkKorean|공식\s*앱|Practice)[^\]]*\]/gi, '')
    // Remove (더 많은 실전 대화: url) or parenthesized url
    .replace(/\s*\([^)]*https?:\/\/[^)]*\)/gi, '')
    .replace(/\s*\(더 많은 실전 대화[^)]*\)/gi, '')
    // Remove 👉 promo lines
    .replace(/👉\s*(?:TalkKorean|공식\s*앱|Official\s*App|앱 바로가기)?[^\n]*https?:\/\/[^\s\n]+/gi, '')
    // Remove raw URLs
    .replace(/https?:\/\/[^\s\n)]+/gi, '')
    // Clean up empty parentheses/brackets left behind
    .replace(/\[\s*\]/g, '')
    .replace(/\(\s*\)/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Dynamic Content Synthesizer with promo link enforced
 */
export function synthesizeDynamicContent(
  topic: string,
  category: string = "general",
  tone: string = "casual_mz",
  appUrl: string = DEFAULT_APP_PROMO_URL
): { blog: GeneratedBlogPost; shorts: GeneratedShortsScript } {
  const result = internalSynthesizer(topic, category, tone, appUrl);
  return ensureAppPromotion(result, appUrl);
}

// Automatically enforce app promotional link injection across all curated presets
for (const key of Object.keys(CURATED_TOPIC_TEMPLATES)) {
  ensureAppPromotion(CURATED_TOPIC_TEMPLATES[key]);
}
