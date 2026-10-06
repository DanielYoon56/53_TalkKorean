import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface FeatureItem {
  title: string;
  description: string;
}

interface SeoFeaturesProps {
  heading?: string;
  features: FeatureItem[];
}

export default function SeoFeatures({ heading = 'What You Can Practice', features }: SeoFeaturesProps) {
  return (
    <section aria-labelledby="features-heading" className="space-y-6">
      <div className="text-left space-y-1">
        <h2 id="features-heading" className="text-2xl sm:text-3xl font-serif font-bold text-editorial-text tracking-tight">
          {heading}
        </h2>
        <p className="text-xs sm:text-sm text-editorial-muted">
          Interactive features designed to build genuine speaking autonomy, accurate pronunciation, and situational fluency.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feat, idx) => (
          <article
            key={idx}
            className="bg-white border border-editorial-border rounded-sm p-5 text-left space-y-2 hover:border-amber-400 transition-colors shadow-2xs group"
          >
            <div className="flex items-center space-x-2 text-editorial-accent">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif font-bold text-base text-editorial-text group-hover:text-amber-900 transition-colors">
                {feat.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-editorial-muted leading-relaxed pl-6">
              {feat.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
