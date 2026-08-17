import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getInfluencers } from '@/lib/api/influencers';
import InfluencersClient from './InfluencersClient';
import { InfluencerCardSkeleton } from '@/components/influencers/InfluencerCardSkeleton';

export const metadata: Metadata = {
  title: 'المؤثرون | مثمر',
  description: 'اكتشف نخبة من صناع المحتوى والمؤثرين المتخصصين في مختلف المجالات على منصة مثمر.',
};

function InfluencersSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="h-16 mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 12 }, (_, i) => <InfluencerCardSkeleton key={i} />)}
      </div>
    </div>
  );
}

export default async function InfluencersPage() {
  const res = await getInfluencers({ page: 1, limit: 12 }).catch(() => null);

  return (
    <Suspense fallback={<InfluencersSkeleton />}>
      <InfluencersClient
        initialInfluencers={res?.data ?? []}
        initialMeta={res?.meta ?? null}
        lang="ar"
      />
    </Suspense>
  );
}
