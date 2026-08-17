'use client';

import { useCallback, useState, useTransition } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { AdListItem } from '@/types/ad';
import type { Category } from '@/types/category';
import type { PaginationMeta, Lang } from '@/types/api';
import { getAds } from '@/lib/api/ads';
import { AdCard } from '@/components/ads/AdCard';
import { AdCardSkeleton } from '@/components/ads/AdCardSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { Button } from '@/components/ui/Button';
import { translations } from '@/lib/utils/i18n';

interface AdsListClientProps {
  initialAds: AdListItem[];
  initialMeta: PaginationMeta | null;
  categories: Category[];
  lang: Lang;
}

const SORT_OPTIONS = [
  { value: '', labelAr: 'الافتراضي', labelEn: 'Default' },
  { value: 'views_desc', labelAr: 'الأكثر مشاهدة', labelEn: 'Most Viewed' },
  { value: 'newest', labelAr: 'الأحدث', labelEn: 'Newest' },
  { value: 'likes_desc', labelAr: 'الأكثر إعجابًا', labelEn: 'Most Liked' },
];

export default function AdsListClient({
  initialAds,
  initialMeta,
  categories,
  lang,
}: AdsListClientProps) {
  const tr = translations[lang];
  const [ads, setAds] = useState(initialAds);
  const [meta, setMeta] = useState(initialMeta);
  const [activeCategory, setActiveCategory] = useState('');
  const [sort, setSort] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchAds = useCallback(
    (cat: string, s: string, q: string, p: number) => {
      setError(null);
      startTransition(async () => {
        try {
          const res = await getAds({
            category: cat || undefined,
            sort: s || undefined,
            q: q || undefined,
            page: p,
            limit: 12,
          });
          setAds(res.data);
          setMeta(res.meta ?? null);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'فشل التحميل');
        }
      });
    },
    [],
  );

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
    fetchAds(cat, sort, query, 1);
  };

  const handleSort = (s: string) => {
    setSort(s);
    setPage(1);
    fetchAds(activeCategory, s, query, 1);
  };

  const handleSearch = useCallback(
    (q: string) => {
      setQuery(q);
      setPage(1);
      fetchAds(activeCategory, sort, q, 1);
    },
    [activeCategory, sort, fetchAds],
  );

  const handlePageChange = (p: number) => {
    setPage(p);
    fetchAds(activeCategory, sort, query, p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Top filter bar */}
      <div className="sticky top-16 z-30 py-4 border-b border-border"
        style={{ background: 'color-mix(in srgb, var(--bg) 90%, transparent)', backdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-7xl 3xl:max-w-[1800px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 2xl:px-10 3xl:px-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full sm:max-w-xs md:max-w-sm lg:max-w-md">
            <Search className="absolute inset-s-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" aria-hidden="true" />
            <input
              id="ads-search"
              type="search"
              placeholder={lang === 'ar' ? 'ابحث عن إعلان...' : 'Search ads...'}
              value={query}
              onChange={(e) => {
                const val = e.target.value;
                setQuery(val);
                setTimeout(() => handleSearch(val), 400);
              }}
              className="w-full ps-9 pe-4 py-2.5 rounded-xl border border-border bg-card
                text-xs xs:text-sm placeholder:text-muted text-foreground
                focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
              aria-label={lang === 'ar' ? 'ابحث عن إعلان' : 'Search ads'}
            />
            {query && (
              <button onClick={() => handleSearch('')} aria-label="مسح البحث"
                className="absolute inset-e-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <SlidersHorizontal className="w-4 h-4 text-muted" aria-hidden="true" />
            <select
              value={sort}
              onChange={(e) => handleSort(e.target.value)}
              aria-label={tr['sortBy']}
              className="border border-border bg-card text-foreground text-xs xs:text-sm
                px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {lang === 'ar' ? opt.labelAr : opt.labelEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div className="max-w-7xl 3xl:max-w-[1800px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 2xl:px-10 3xl:px-12 mt-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
            <button
              onClick={() => handleCategory('')}
              className={`shrink-0 px-3.5 xs:px-4 py-1.5 rounded-full text-xs xs:text-sm font-medium border transition-all duration-200
                ${activeCategory === ''
                  ? 'bg-[#F97316] border-[#F97316] text-white'
                  : 'border-border bg-card text-muted hover:border-[#F97316]/50 hover:text-[#F97316]'
                }`}
              aria-pressed={activeCategory === ''}
            >
              {tr['allCategories']}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategory(cat.slug)}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 xs:px-4 py-1.5 rounded-full text-xs xs:text-sm font-medium border transition-all duration-200
                  ${activeCategory === cat.slug
                    ? 'text-white border-transparent'
                    : 'border-border bg-card text-muted hover:border-opacity-50'
                  }`}
                style={activeCategory === cat.slug ? { background: cat.color, borderColor: cat.color } : {}}
                aria-pressed={activeCategory === cat.slug}
              >
                <span aria-hidden="true">{cat.icon}</span>
                {lang === 'ar' ? cat.name.ar : cat.name.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results area */}
      <div className="max-w-7xl 3xl:max-w-[1800px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 2xl:px-10 3xl:px-12 py-6 xs:py-8">
        {/* Count label */}
        {meta && !isPending && (
          <p className="text-xs xs:text-sm text-muted mb-4 xs:mb-6">
            {lang === 'ar' ? `${meta.total} إعلان` : `${meta.total} ads`}
          </p>
        )}

        {error ? (
          <ErrorState description={error} onRetry={() => fetchAds(activeCategory, sort, query, page)} />
        ) : (
          <>
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 xs:gap-5 xl:gap-6">
              {isPending
                ? Array.from({ length: 12 }, (_, i) => <AdCardSkeleton key={i} />)
                : ads.length === 0
                ? null
                : ads.map((ad, idx) => <AdCard key={ad.id} ad={ad} lang={lang} priority={idx < 4} />)
              }
            </div>

            {!isPending && ads.length === 0 && (
              <EmptyState
                title={tr['emptyTitle']}
                description={tr['emptyDesc']}
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
                  {tr['prev']}
                </Button>

                {Array.from({ length: Math.min(meta.totalPages, 7) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-200
                        ${page === pageNum
                          ? 'bg-[#F97316] text-white'
                          : 'border border-border bg-card text-muted hover:border-[#F97316]/50 hover:text-[#F97316]'
                        }`}
                      aria-label={`صفحة ${pageNum}`}
                      aria-current={page === pageNum ? 'page' : undefined}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <Button
                  variant="secondary"
                  size="sm"
                  disabled={!meta.hasNextPage}
                  onClick={() => handlePageChange(page + 1)}
                >
                  {tr['next']}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
