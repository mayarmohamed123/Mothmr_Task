'use client';

import { useCallback, useState, useTransition } from 'react';
import { Search, X } from 'lucide-react';
import type { Influencer } from '@/types/influencer';
import type { PaginationMeta, Lang } from '@/types/api';
import { getInfluencers } from '@/lib/api/influencers';
import { InfluencerCard } from '@/components/influencers/InfluencerCard';
import { InfluencerCardSkeleton } from '@/components/influencers/InfluencerCardSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { Button } from '@/components/ui/Button';

const SORT_OPTIONS = [
  { value: '', labelAr: 'الافتراضي', labelEn: 'Default' },
  { value: 'followers_desc', labelAr: 'الأكثر متابعين', labelEn: 'Most Followers' },
  { value: 'rating_desc', labelAr: 'الأعلى تقييمًا', labelEn: 'Top Rated' },
  { value: 'price_asc', labelAr: 'الأقل سعرًا', labelEn: 'Lowest Price' },
  { value: 'campaigns_desc', labelAr: 'الأكثر حملات', labelEn: 'Most Campaigns' },
];

interface InfluencersClientProps {
  initialInfluencers: Influencer[];
  initialMeta: PaginationMeta | null;
  lang: Lang;
}

export default function InfluencersClient({
  initialInfluencers,
  initialMeta,
  lang,
}: InfluencersClientProps) {
  const [influencers, setInfluencers] = useState(initialInfluencers);
  const [meta, setMeta] = useState(initialMeta);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchInfluencers = useCallback(
    (q: string, s: string, p: number) => {
      setError(null);
      startTransition(async () => {
        try {
          const res = await getInfluencers({
            q: q || undefined,
            sort: s || undefined,
            page: p,
            limit: 12,
          });
          setInfluencers(res.data);
          setMeta(res.meta ?? null);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'فشل التحميل');
        }
      });
    },
    [],
  );

  const handleSearch = (val: string) => {
    setQuery(val);
    setPage(1);
    fetchInfluencers(val, sort, 1);
  };

  const handleSort = (s: string) => {
    setSort(s);
    setPage(1);
    fetchInfluencers(query, s, 1);
  };

  const handlePageChange = (p: number) => {
    setPage(p);
    fetchInfluencers(query, sort, p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl 3xl:max-w-[1800px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 2xl:px-10 3xl:px-12 py-6 xs:py-8">
      {/* Page header */}
      <div className="mb-6 xs:mb-8">
        <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-1.5 xs:mb-2">
          {lang === 'ar' ? 'المؤثرون' : 'Influencers'}
        </h1>
        <p className="text-muted text-xs xs:text-sm md:text-base">
          {lang === 'ar'
            ? 'اكتشف نخبة من صناع المحتوى المتخصصين في مختلف المجالات'
            : 'Discover a curated network of content creators across all niches'}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 xs:mb-8">
        <div className="relative flex-1 w-full sm:max-w-xs md:max-w-sm lg:max-w-md">
          <Search
            className="absolute inset-s-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="influencer-search"
            type="search"
            value={query}
            onChange={(e) => {
              const val = e.target.value;
              setQuery(val);
              setTimeout(() => handleSearch(val), 400);
            }}
            placeholder={lang === 'ar' ? 'ابحث عن مؤثر...' : 'Search influencers...'}
            className="w-full ps-9 pe-9 py-2.5 rounded-xl border border-border bg-card
              text-xs xs:text-sm placeholder:text-muted text-foreground
              focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
            aria-label={lang === 'ar' ? 'بحث عن مؤثر' : 'Search influencer'}
          />
          {query && (
            <button
              onClick={() => handleSearch('')}
              aria-label="مسح البحث"
              className="absolute inset-e-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <select
          value={sort}
          onChange={(e) => handleSort(e.target.value)}
          aria-label={lang === 'ar' ? 'ترتيب حسب' : 'Sort by'}
          className="border border-border bg-card text-foreground text-xs xs:text-sm self-end sm:self-auto
            px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {lang === 'ar' ? opt.labelAr : opt.labelEn}
            </option>
          ))}
        </select>
      </div>

      {/* Count */}
      {meta && !isPending && (
        <p className="text-xs xs:text-sm text-muted mb-4 xs:mb-6">
          {lang === 'ar' ? `${meta.total} مؤثر` : `${meta.total} influencers`}
        </p>
      )}

      {/* Grid */}
      {error ? (
        <ErrorState description={error} onRetry={() => fetchInfluencers(query, sort, page)} />
      ) : (
        <>
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 xs:gap-5 xl:gap-6">
            {isPending
              ? Array.from({ length: 12 }, (_, i) => <InfluencerCardSkeleton key={i} />)
              : influencers.map((inf) => (
                  <InfluencerCard key={inf.id} influencer={inf} lang={lang} />
                ))}
          </div>

          {!isPending && influencers.length === 0 && (
            <EmptyState
              title={lang === 'ar' ? 'لا توجد نتائج' : 'No results'}
              description={lang === 'ar' ? 'لم يتم العثور على مؤثرين.' : 'No influencers found.'}
            />
          )}

          {/* Pagination */}
          {meta && meta.totalPages > 1 && !isPending && (
            <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
              <Button
                variant="secondary"
                size="sm"
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
              >
                {lang === 'ar' ? 'السابق' : 'Prev'}
              </Button>
              {Array.from({ length: Math.min(meta.totalPages, 7) }, (_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    aria-current={page === p ? 'page' : undefined}
                    className={`w-9 h-9 rounded-xl text-sm font-medium transition-all
                      ${page === p
                        ? 'bg-[#F97316] text-white'
                        : 'border border-border bg-card text-muted hover:text-[#F97316]'
                      }`}
                  >
                    {p}
                  </button>
                );
              })}
              <Button
                variant="secondary"
                size="sm"
                disabled={!meta.hasNextPage}
                onClick={() => handlePageChange(page + 1)}
              >
                {lang === 'ar' ? 'التالي' : 'Next'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
