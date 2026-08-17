import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAd, getSimilarAds } from '@/lib/api/ads';
import { getOffers } from '@/lib/api/offers';
import { AdDetailSkeleton } from '@/components/ads/AdCardSkeleton';
import AdDetailClient from '@/app/ads/[id]/AdDetailClient';

interface AdDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: AdDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const res = await getAd(id);
    const ad = res.data;
    const titleAr = ad.title.ar;
    const titleEn = ad.title.en;
    return {
      title: `${titleAr} | مثمر`,
      description: ad.description.ar,
      openGraph: {
        title: `${titleAr} | ${titleEn}`,
        description: ad.excerpt.ar,
        images: [{ url: ad.poster }],
      },
    };
  } catch {
    return { title: 'إعلان | مثمر' };
  }
}

export default async function AdDetailPage({ params }: AdDetailPageProps) {
  const { id } = await params;

  // Parallel fetch
  const [adRes, similarRes, offersRes] = await Promise.allSettled([
    getAd(id),
    getSimilarAds(id),
    getOffers(id, { limit: 8 }),
  ]);

  if (adRes.status === 'rejected') {
    notFound();
  }

  const ad = adRes.value.data;
  const similarAds = similarRes.status === 'fulfilled' ? similarRes.value.data : [];
  const initialOffers = offersRes.status === 'fulfilled' ? offersRes.value.data : [];
  const initialMeta = offersRes.status === 'fulfilled' ? (offersRes.value.meta ?? null) : null;

  return (
    <Suspense fallback={<AdDetailSkeleton />}>
      <AdDetailClient
        ad={ad}
        similarAds={similarAds}
        initialOffers={initialOffers}
        initialMeta={initialMeta}
      />
    </Suspense>
  );
}
