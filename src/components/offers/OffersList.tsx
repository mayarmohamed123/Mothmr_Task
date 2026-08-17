'use client';

import { useCallback, useState } from 'react';
import { Users } from 'lucide-react';
import type { Offer } from '@/types/offer';
import type { Lang, PaginationMeta } from '@/types/api';
import { getOffers } from '@/lib/api/offers';
import { OfferRow } from './OfferRow';
import { OfferSearch } from './OfferSearch';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { Button } from '@/components/ui/Button';
import { translations } from '@/lib/utils/i18n';

interface OffersListProps {
  adId: string;
  lang: Lang;
  initialOffers: Offer[];
  initialMeta: PaginationMeta | null;
}

export function OffersList({ adId, lang, initialOffers, initialMeta }: OffersListProps) {
  const tr = translations[lang];
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  const [meta, setMeta] = useState<PaginationMeta | null>(initialMeta);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOffers = useCallback(
    async (q: string, p: number) => {
      setLoading(true);
      setError(null);
      try {
        const res = await getOffers(adId, { q: q || undefined, page: p, limit: 8 });
        setOffers(res.data);
        setMeta(res.meta ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'فشل تحميل العروض');
      } finally {
        setLoading(false);
      }
    },
    [adId],
  );

  const handleSearch = useCallback(
    (q: string) => {
      setQuery(q);
      setPage(1);
      fetchOffers(q, 1);
    },
    [fetchOffers],
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchOffers(query, newPage);
  };

  return (
    <div
      className="rounded-2xl border border-border overflow-hidden"
      style={{ background: 'var(--card)' }}
    >
      {/* Header */}
      <div className="px-4 py-4 border-b border-border flex items-center gap-2">
        <Users className="w-5 h-5 text-[#F97316]" aria-hidden="true" />
        <h2 className="font-bold text-foreground">
          {tr['influencerOffers']}
        </h2>
        {meta && (
          <span className="ms-auto text-xs text-muted bg-bg-secondary px-2 py-1 rounded-full">
            {meta.total}
          </span>
        )}
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-border">
        <OfferSearch onSearch={handleSearch} lang={lang} />
      </div>

      {/* List */}
      <div className="p-3 space-y-2 max-h-125 overflow-y-auto">
        {loading ? (
          Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="flex items-center gap-3 p-3">
              <Skeleton className="w-11 h-11 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          ))
        ) : error ? (
          <ErrorState
            description={error}
            onRetry={() => fetchOffers(query, page)}
            retryLabel={tr['retry']}
            compact
          />
        ) : offers.length === 0 ? (
          <EmptyState
            title={tr['noOffersFound']}
            description={tr['noOffersDesc']}
            compact
          />
        ) : (
          offers.map((offer) => (
            <OfferRow key={offer.id} offer={offer} lang={lang} />
          ))
        )}
      </div>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && !loading && (
        <div className="px-4 py-3 border-t border-border flex items-center justify-between gap-2">
          <Button
            variant="secondary"
            size="sm"
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
          >
            {tr['prev']}
          </Button>
          <span className="text-xs text-muted">
            {page} / {meta.totalPages}
          </span>
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
    </div>
  );
}
