import React, { useEffect } from 'react';
import { SeoPageConfig } from '../../config/seoPages';

interface SeoHeadProps {
  config: SeoPageConfig;
}

export default function SeoHead({ config }: SeoHeadProps) {
  const fullUrl = `https://talkkorean.ai.studio${config.path}`;
  const ogImageUrl = 'https://talkkorean.ai.studio/og-image.jpg';

  useEffect(() => {
    // 1. Title
    document.title = config.title;

    // Helper to update or create meta tag
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let meta = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attrName, attrVal);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Helper for canonical link
    const setCanonical = (href: string) => {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // 2. Meta Description
    setMetaTag('name', 'description', config.description);
    if (config.metaKeywords && config.metaKeywords.length > 0) {
      setMetaTag('name', 'keywords', config.metaKeywords.join(', '));
    }

    // 3. Canonical URL (strictly matching path without fragments)
    setCanonical(fullUrl);

    // 4. OpenGraph Tags
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:title', config.title);
    setMetaTag('property', 'og:description', config.description);
    setMetaTag('property', 'og:url', fullUrl);
    setMetaTag('property', 'og:image', ogImageUrl);
    setMetaTag('property', 'og:site_name', 'Talk Korean');
    setMetaTag('property', 'og:locale', 'en_US');

    // 5. Twitter / X Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', config.title);
    setMetaTag('name', 'twitter:description', config.description);
    setMetaTag('name', 'twitter:image', ogImageUrl);

    // 6. JSON-LD Structured Data
    const existingScript = document.getElementById('seo-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'seo-structured-data';
    script.type = 'application/ld+json';

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${fullUrl}#webpage`,
          url: fullUrl,
          name: config.title,
          headline: config.h1,
          description: config.description,
          inLanguage: 'en-US',
          isPartOf: {
            '@type': 'WebSite',
            '@id': 'https://talkkorean.ai.studio/#website',
            name: 'Talk Korean',
            url: 'https://talkkorean.ai.studio/'
          }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${fullUrl}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://talkkorean.ai.studio/'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: config.parentCategoryName,
              item: `https://talkkorean.ai.studio${config.parentCategoryPath}`
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: config.h1,
              item: fullUrl
            }
          ]
        },
        {
          '@type': 'SoftwareApplication',
          '@id': 'https://talkkorean.ai.studio/#software',
          name: 'Talk Korean',
          applicationCategory: 'EducationalApplication',
          operatingSystem: 'All Modern Web Browsers',
          url: 'https://talkkorean.ai.studio/',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          },
          description: 'AI-powered interactive Korean conversation and pronunciation learning platform for foreign learners.'
        }
      ] as any[]
    };

    if (config.faq && config.faq.length > 0) {
      structuredData['@graph'].push({
        '@type': 'FAQPage',
        '@id': `${fullUrl}#faq`,
        mainEntity: config.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      });
    }

    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById('seo-structured-data');
      if (s) s.remove();
    };
  }, [config, fullUrl]);

  return null;
}
