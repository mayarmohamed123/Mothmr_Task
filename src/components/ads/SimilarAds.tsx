'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import type { AdListItem } from '@/types/ad';
import type { Lang } from '@/types/api';
import { AdCard } from './AdCard';
import { useLanguage } from '@/contexts/LanguageContext';

interface SimilarAdsProps {
  ads: AdListItem[];
  lang: Lang;
  title?: string;
}

export function SimilarAds({ ads, lang, title }: SimilarAdsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isRtl } = useLanguage();

  const scroll = (direction: 'prev' | 'next') => {
    const container = scrollRef.current;
    if (!container) return;
    const amount = 280;
    const delta = direction === 'next' ? (isRtl ? -amount : amount) : (isRtl ? amount : -amount);
    container.scrollBy({ left: delta, behavior: 'smooth' });
  };

  if (ads.length === 0) return null;

  const sectionTitle = title ?? (lang === 'ar' ? 'اعلانات مشابهه' : 'Similar Ads');

  return (
    <section aria-label={sectionTitle}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#F97316]" aria-hidden="true" />
          <h2 className="text-lg font-bold text-foreground">{sectionTitle}</h2>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('prev')}
            aria-label={lang === 'ar' ? 'السابق' : 'Previous'}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-border
              bg-card hover:bg-[#F97316] hover:border-[#F97316] hover:text-white
              text-muted transition-all duration-200"
          >
            {isRtl ? (
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            ) : (
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
          <button
            onClick={() => scroll('next')}
            aria-label={lang === 'ar' ? 'التالي' : 'Next'}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-border
              bg-card hover:bg-[#F97316] hover:border-[#F97316] hover:text-white
              text-muted transition-all duration-200"
          >
            {isRtl ? (
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            ) : (
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-none pb-2"
        role="list"
        aria-label={sectionTitle}
      >
        {ads.map((ad) => (
          <div
            key={ad.id}
            className="shrink-0 w-52 sm:w-60"
            role="listitem"
          >
            <AdCard ad={ad} lang={lang} compact />
          </div>
        ))}
      </div>
    </section>
  );
}
