import { Eye, Heart, Share2, MessageSquare, Tag } from 'lucide-react';
import { formatCount } from '@/lib/utils/formatters';
import type { Ad } from '@/types/ad';
import type { Lang } from '@/types/api';

interface AdStatsProps {
  ad: Ad;
  lang: Lang;
}

export function AdStats({ ad, lang }: AdStatsProps) {
  const stats = [
    {
      icon: Eye,
      value: formatCount(ad.views, lang),
      label: lang === 'ar' ? 'مشاهدة' : 'views',
      color: '#6366f1',
    },
    {
      icon: Heart,
      value: formatCount(ad.likes, lang),
      label: lang === 'ar' ? 'إعجاب' : 'likes',
      color: '#ef4444',
    },
    {
      icon: Share2,
      value: formatCount(ad.shares, lang),
      label: lang === 'ar' ? 'مشاركة' : 'shares',
      color: '#22c55e',
    },
    {
      icon: MessageSquare,
      value: formatCount(ad.commentsCount, lang),
      label: lang === 'ar' ? 'تعليق' : 'comments',
      color: '#f59e0b',
    },
  ];

  return (
    <div className="flex items-center flex-wrap gap-3">
      {stats.map(({ icon: Icon, value, label, color }) => (
        <div key={label} className="flex items-center gap-1.5">
          <Icon className="w-4 h-4" style={{ color }} aria-hidden="true" />
          <span className="font-bold text-sm text-foreground">{value}</span>
          <span className="text-xs text-muted">{label}</span>
        </div>
      ))}

      {ad.tags.length > 0 && (
        <div className="flex items-center gap-1 ms-2">
          <Tag className="w-3.5 h-3.5 text-muted" aria-hidden="true" />
          <div className="flex flex-wrap gap-1">
            {ad.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-bg-secondary text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
