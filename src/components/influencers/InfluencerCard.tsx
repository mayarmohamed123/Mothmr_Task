import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, Star, Users, TrendingUp, Zap } from 'lucide-react';
import type { Influencer } from '@/types/influencer';
import type { Lang } from '@/types/api';
import { formatCount, formatCurrency } from '@/lib/utils/formatters';
import { t } from '@/lib/utils/i18n';

interface InfluencerCardProps {
  influencer: Influencer;
  lang: Lang;
}

const PlatformColors: Record<string, string> = {
  instagram: '#E1306C',
  tiktok: '#000000',
  youtube: '#FF0000',
  facebook: '#1877F2',
  x: '#000000',
};

const PlatformIcons: Record<string, string> = {
  instagram: '📸',
  tiktok: '🎵',
  youtube: '▶️',
  facebook: '👤',
  x: '✕',
};

export function InfluencerCard({ influencer, lang }: InfluencerCardProps) {
  return (
    <div
      className="group relative rounded-2xl border border-border overflow-hidden
        hover:border-[#3a4562] hover:shadow-xl transition-all duration-300 flex flex-col"
      style={{ background: 'var(--card)' }}
    >
      {/* Cover banner */}
      <div className="relative h-24 overflow-hidden shrink-0" style={{ background: '#0b1020' }}>
        <Image
          src={influencer.cover}
          alt=""
          fill
          sizes="400px"
          className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
          aria-hidden="true"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />
      </div>

      {/* Avatar */}
      <div className="relative px-4 -mt-8">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-card shadow-lg shrink-0"
          style={{ borderWidth: '3px', borderColor: 'var(--card)' }}>
          <Image
            src={influencer.avatar}
            alt={influencer.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        {/* Verified badge */}
        {influencer.verified && (
          <div className="absolute -bottom-1 inset-s-12">
            <BadgeCheck className="w-5 h-5 text-[#F97316] bg-card rounded-full" aria-label="موثّق" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-4 pt-2 pb-4 flex flex-col gap-3 flex-1">
        {/* Name + handle */}
        <div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="font-bold text-foreground">{influencer.name}</h3>
          </div>
          <p className="text-xs text-muted">{influencer.handle}</p>
        </div>

        {/* Bio */}
        <p className="text-xs text-muted leading-relaxed line-clamp-2">
          {t(influencer.bio, lang)}
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center p-2 rounded-xl bg-bg-secondary gap-0.5">
            <Users className="w-3.5 h-3.5 text-[#6366f1]" aria-hidden="true" />
            <span className="text-xs font-bold text-foreground">
              {formatCount(influencer.followers, lang)}
            </span>
            <span className="text-[10px] text-muted text-center leading-tight">
              {lang === 'ar' ? 'متابع' : 'Followers'}
            </span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-xl bg-bg-secondary gap-0.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#22c55e]" aria-hidden="true" />
            <span className="text-xs font-bold text-foreground">
              {influencer.engagementRate.toFixed(1)}%
            </span>
            <span className="text-[10px] text-muted text-center leading-tight">
              {lang === 'ar' ? 'تفاعل' : 'Engage'}
            </span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-xl bg-bg-secondary gap-0.5">
            <Zap className="w-3.5 h-3.5 text-[#f59e0b]" aria-hidden="true" />
            <span className="text-xs font-bold text-foreground">
              {influencer.completedCampaigns}
            </span>
            <span className="text-[10px] text-muted text-center leading-tight">
              {lang === 'ar' ? 'حملة' : 'Campaigns'}
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className="w-3.5 h-3.5"
              fill={i < Math.floor(influencer.rating) ? '#F97316' : 'none'}
              stroke={i < Math.floor(influencer.rating) ? '#F97316' : 'var(--border)'}
              aria-hidden="true"
            />
          ))}
          <span className="text-xs font-semibold text-foreground">{influencer.rating.toFixed(1)}</span>
          <span className="text-xs text-muted">({influencer.reviewsCount})</span>
        </div>

        {/* Platforms */}
        {influencer.platforms.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {influencer.platforms.slice(0, 3).map((p) => (
              <a
                key={p.platform}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${influencer.name} on ${p.platform}`}
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium
                  border border-border hover:opacity-80 transition-opacity"
                style={{ background: `${PlatformColors[p.platform]}15`, color: PlatformColors[p.platform] }}
              >
                <span aria-hidden="true">{PlatformIcons[p.platform]}</span>
                {formatCount(p.followers, lang)}
              </a>
            ))}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
          <div>
            <p className="text-[10px] text-muted">{lang === 'ar' ? 'يبدأ من' : 'Starting from'}</p>
            <p className="text-sm font-bold" style={{ color: '#F97316' }}>
              {formatCurrency(influencer.startingPrice, influencer.currency, lang)}
            </p>
          </div>
          <Link
            href={`/influencers/${influencer.id}`}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white transition-all duration-200
              hover:opacity-90 active:scale-95"
            style={{ background: '#F97316' }}
            aria-label={`عرض ملف ${influencer.name}`}
          >
            {lang === 'ar' ? 'عرض الملف' : 'View Profile'}
          </Link>
        </div>
      </div>
    </div>
  );
}
