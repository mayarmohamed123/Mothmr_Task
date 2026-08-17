import Image from 'next/image';
import { ExternalLink, BadgeCheck } from 'lucide-react';
import type { BrandSummary } from '@/types/brand';
import type { Lang } from '@/types/api';
import { t } from '@/lib/utils/i18n';

interface BrandCardProps {
  brand: BrandSummary;
  lang: Lang;
}

export function BrandCard({ brand, lang }: BrandCardProps) {
  return (
    <div
      className="rounded-2xl border border-border p-5 flex flex-col gap-4 transition-all duration-200 hover:shadow-md"
      style={{ background: 'var(--card)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 shrink-0"
          style={{ borderColor: `${brand.color}40` }}
        >
          <Image
            src={brand.logo}
            alt={t(brand.name, lang)}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="font-bold text-foreground truncate">{t(brand.name, lang)}</h3>
            {brand.verified && (
              <BadgeCheck
                className="w-4.5 h-4.5 shrink-0"
                style={{ color: brand.color }}
                aria-label="موثّق"
              />
            )}
          </div>
          <div
            className="text-xs font-medium mt-0.5 px-2 py-0.5 rounded-full inline-block"
            style={{ background: `${brand.color}20`, color: brand.color }}
          >
            {lang === 'ar' ? 'معلن' : 'Advertiser'}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted leading-relaxed line-clamp-3">
        {t(brand.description, lang)}
      </p>

      {/* Website link */}
      {brand.website && (
        <a
          href={brand.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-medium text-[#F97316] hover:underline transition-colors"
          aria-label={`زيارة موقع ${t(brand.name, lang)}`}
        >
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          {lang === 'ar' ? 'زيارة الموقع' : 'Visit website'}
        </a>
      )}
    </div>
  );
}
