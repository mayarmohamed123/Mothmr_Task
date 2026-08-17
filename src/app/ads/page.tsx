import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getAds } from '@/lib/api/ads';
import { getCategories } from '@/lib/api/categories';
import AdsListClient from './AdsListClient';
import { AdCardSkeleton } from '@/components/ads/AdCardSkeleton';

export const metadata: Metadata = {
  title: 'الإعلانات | مثمر',
  description: 'استعرض أحدث الإعلانات على منصة مثمر — إعلانات ممولة من أبرز العلامات التجارية في مصر والعالم العربي.',
};

function AdsGridSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 12 }, (_, i) => <AdCardSkeleton key={i} />)}
      </div>
    </div>
  );
}

export default async function AdsPage() {
  const [adsRes, catsRes] = await Promise.allSettled([
    getAds({ page: 1, limit: 12 }),
    getCategories(),
  ]);

  const initialAds = adsRes.status === 'fulfilled' ? adsRes.value.data : [];
  const initialMeta = adsRes.status === 'fulfilled' ? (adsRes.value.meta ?? null) : null;
  const categories = catsRes.status === 'fulfilled' ? catsRes.value.data : [];

  return (
    <Suspense fallback={<AdsGridSkeleton />}>
      <AdsListClient
        initialAds={initialAds}
        initialMeta={initialMeta}
        categories={categories}
        lang="ar"
      />
    </Suspense>
  );
}
