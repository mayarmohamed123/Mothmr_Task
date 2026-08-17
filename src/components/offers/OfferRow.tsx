import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';
import type { Offer } from '@/types/offer';
import type { Lang } from '@/types/api';
import { StarRating } from '@/components/ui/StarRating';
import { t } from '@/lib/utils/i18n';
import { formatCount } from '@/lib/utils/formatters';

interface OfferRowProps {
  offer: Offer;
  lang: Lang;
}

const statusColors: Record<string, string> = {
  pending: '#f59e0b',
  shortlisted: '#22c55e',
  accepted: '#3b82f6',
  rejected: '#ef4444',
};

export function OfferRow({ offer, lang }: OfferRowProps) {
  const { influencer, price, deliveryDays, status, statusLabel } = offer;
  const statusColor = statusColors[status] ?? '#6b7280';

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-[#3a4562]
        hover:bg-[#f5f4f2] dark:hover:bg-[#1c2236] transition-all duration-150 animate-fade-in-up"
      style={{ background: 'var(--card)' }}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-border">
          <Image
            src={influencer.avatar}
            alt={influencer.name}
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>
        {influencer.verified && (
          <BadgeCheck
            className="absolute -bottom-0.5 -inset-e-0.5 w-4 h-4 text-[#F97316] bg-card rounded-full"
            aria-label="موثّق"
          />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-sm text-foreground truncate">
            {influencer.name}
          </span>
          <span className="text-xs text-muted">{influencer.handle}</span>
        </div>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <StarRating rating={influencer.rating} size="sm" showValue={false} />
          <span className="text-xs text-muted">
            {formatCount(influencer.followers, lang)}{' '}
            {lang === 'ar' ? 'متابع' : 'followers'}
          </span>
          {influencer.city && (
            <span className="text-xs text-muted">· {influencer.city}</span>
          )}
        </div>
      </div>

      {/* Price + delivery + status */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="font-bold text-sm text-foreground">
          {price.amount.toLocaleString()} {lang === 'ar' ? 'ج.م' : price.currency}
        </span>
        <span className="text-xs text-muted">
          {lang === 'ar' ? `${deliveryDays} يوم` : `${deliveryDays} days`}
        </span>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ background: `${statusColor}20`, color: statusColor }}
        >
          {t(statusLabel, lang)}
        </span>
      </div>
    </div>
  );
}
