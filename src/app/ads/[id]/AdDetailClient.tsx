'use client';

import { Calendar } from 'lucide-react';
import Link from 'next/link';
import type { Ad, AdListItem } from '@/types/ad';
import type { Offer } from '@/types/offer';
import type { PaginationMeta } from '@/types/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/utils/i18n';
import { formatDate } from '@/lib/utils/formatters';
import { AdVideo } from '@/components/ads/AdVideo';
import { AdStats } from '@/components/ads/AdStats';
import { AdActions } from '@/components/ads/AdActions';
import { BrandCard } from '@/components/brands/BrandCard';
import { OffersList } from '@/components/offers/OffersList';
import { SimilarAds } from '@/components/ads/SimilarAds';
import { Badge } from '@/components/ui/Badge';
import { CommentsSection } from '@/components/ads/CommentsSection';

interface AdDetailClientProps {
  ad: Ad;
  similarAds: AdListItem[];
  initialOffers: Offer[];
  initialMeta: PaginationMeta | null;
}

export default function AdDetailClient({
  ad,
  similarAds,
  initialOffers,
  initialMeta,
}: AdDetailClientProps) {
  const { lang } = useLanguage();

  return (
    <>
      <div className="max-w-7xl 3xl:max-w-[1800px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 2xl:px-10 3xl:px-12 py-6 xs:py-8 animate-fade-in-up">
        {/* Breadcrumb */}
        <nav aria-label="مسار التنقل" className="mb-4 xs:mb-6 overflow-x-auto scrollbar-none">
          <ol className="flex items-center gap-1.5 xs:gap-2 text-xs xs:text-sm text-muted whitespace-nowrap">
            <li>
              <Link href="/" className="hover:text-[#F97316] transition-colors">
                {lang === 'ar' ? 'الرئيسية' : 'Home'}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/ads" className="hover:text-[#F97316] transition-colors">
                {lang === 'ar' ? 'الإعلانات' : 'Ads'}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li
              className="text-foreground font-medium truncate max-w-40 xs:max-w-50 sm:max-w-xs"
              aria-current="page"
            >
              {t(ad.title, lang)}
            </li>
          </ol>
        </nav>

        {/* Main grid: video + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px] 2xl:grid-cols-[1fr_380px] 3xl:grid-cols-[1fr_420px] gap-6 lg:gap-8 xl:gap-10">
          {/* Left: video + info */}
          <div className="space-y-6">
            {/* Video */}
            <AdVideo
              videoUrl={ad.videoUrl}
              poster={ad.poster}
              thumbnail={ad.thumbnail}
              title={t(ad.title, lang)}
              adId={ad.id}
              durationSeconds={ad.durationSeconds}
              badge={t(ad.badge, lang)}
            />

            {/* Title + meta */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 flex-wrap">
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-foreground leading-tight">
                    {t(ad.title, lang)}
                  </h1>
                </div>
                {ad.category && (
                  <Badge color={ad.category.color} variant="soft">
                    {ad.category.icon} {t(ad.category.name, lang)}
                  </Badge>
                )}
              </div>

              {/* Stats row */}
              <AdStats ad={ad} lang={lang} />

              {/* Date */}
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                {formatDate(ad.publishedAt, lang)}
              </div>
            </div>

            {/* Actions */}
            <AdActions
              adId={ad.id}
              initialLikes={ad.likes}
              initialIsLiked={ad.isLiked ?? false}
              initialIsFavorite={ad.isFavorite ?? false}
            />

            {/* Description */}
            <div
              className="rounded-2xl border border-border p-5"
              style={{ background: 'var(--card)' }}
            >
              <h2 className="font-bold text-foreground mb-3">
                {lang === 'ar' ? 'عن الإعلان' : 'About this ad'}
              </h2>
              <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
                {t(ad.description, lang)}
              </p>
            </div>

            {/* Comments Section */}
            <CommentsSection adId={ad.id} />
          </div>

          {/* Right sidebar: brand + offers */}
          <div className="space-y-5">
            <BrandCard brand={ad.brand} lang={lang} />
            <OffersList
              adId={ad.id}
              lang={lang}
              initialOffers={initialOffers}
              initialMeta={initialMeta}
            />
          </div>
        </div>

        {/* Similar ads carousel */}
        {similarAds.length > 0 && (
          <div className="mt-12">
            <SimilarAds ads={similarAds} lang={lang} />
          </div>
        )}
      </div>
    </>
  );
}
