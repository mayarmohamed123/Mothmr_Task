import Image from 'next/image';
import Link from 'next/link';
import { Play, Eye, Heart, Clock } from 'lucide-react';
import type { AdListItem } from '@/types/ad';
import type { Lang } from '@/types/api';
import { formatCount, formatDuration } from '@/lib/utils/formatters';
import { t } from '@/lib/utils/i18n';
import { Badge } from '@/components/ui/Badge';

interface AdCardProps {
  ad: AdListItem;
  lang: Lang;
  compact?: boolean;
}

export function AdCard({ ad, lang, compact = false }: AdCardProps) {
  return (
    <Link
      href={`/ads/${ad.id}`}
      className={`group flex flex-col rounded-2xl border border-border overflow-hidden
        hover:border-[#3a4562] hover:shadow-lg transition-all duration-200
        ${compact ? '' : 'w-full'}
      `}
      style={{ background: 'var(--card)' }}
      aria-label={t(ad.title, lang)}
    >
      {/* Thumbnail */}
      <div
        className={`relative shrink-0 overflow-hidden ${compact ? 'h-36' : 'aspect-video'}`}
        style={{ background: '#000' }}
      >
        <Image
          src={ad.thumbnail}
          alt={t(ad.title, lang)}
          fill
          sizes={compact ? '200px' : '(max-width: 640px) 100vw, 33vw'}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        {/* Play icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-[#F97316] shadow-lg flex items-center justify-center
            opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-200">
            <Play className="w-4 h-4 text-white ms-0.5" aria-hidden="true" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-2 inset-e-2 flex items-center gap-1 bg-black/70 text-white
          text-xs px-1.5 py-0.5 rounded-md" dir="ltr">
          <Clock className="w-3 h-3" aria-hidden="true" />
          {formatDuration(ad.durationSeconds)}
        </div>

        {/* Sponsored badge */}
        {ad.sponsored && (
          <div className="absolute top-2 inset-s-2">
            <Badge color="#F97316" variant="solid" className="text-xs">
              {t(ad.badge, lang)}
            </Badge>
          </div>
        )}

        {/* Category color strip */}
        <div
          className="absolute bottom-0 inset-s-0 inset-e-0 h-1"
          style={{ background: ad.category.color }}
        />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-full overflow-hidden relative shrink-0 border border-border"
          >
            <Image
              src={ad.brand.logo}
              alt={t(ad.brand.name, lang)}
              fill
              sizes="20px"
              className="object-cover"
            />
          </div>
          <span className="text-xs text-muted truncate">{t(ad.brand.name, lang)}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm text-foreground line-clamp-2 leading-snug">
          {t(ad.title, lang)}
        </h3>

        {/* Stats */}
        <div className="flex items-center gap-3 mt-auto pt-1">
          <div className="flex items-center gap-1 text-xs text-muted">
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            {formatCount(ad.views, lang)}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted">
            <Heart className="w-3.5 h-3.5" aria-hidden="true" />
            {formatCount(ad.likes, lang)}
          </div>
        </div>
      </div>
    </Link>
  );
}
