import type { Lang } from '@/types/api';

/**
 * Format large numbers into human-readable abbreviated form (e.g. 1.2M, 45.3K)
 * Supports Arabic number formatting
 */
export function formatCount(value: number, lang: Lang = 'ar'): string {
  const locale = lang === 'ar' ? 'ar-EG' : 'en-US';

  if (value >= 1_000_000) {
    const v = (value / 1_000_000).toFixed(1);
    return lang === 'ar' ? `${v}م` : `${v}M`;
  }
  if (value >= 1_000) {
    const v = (value / 1_000).toFixed(1);
    return lang === 'ar' ? `${v}ك` : `${v}K`;
  }
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency: string, lang: Lang = 'ar'): string {
  const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format duration in seconds to mm:ss
 */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/**
 * Format date relative or absolute
 */
export function formatDate(dateStr: string, lang: Lang = 'ar'): string {
  const locale = lang === 'ar' ? 'ar-EG' : 'en-US';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return lang === 'ar' ? `منذ ${diffMins} دقيقة` : `${diffMins}m ago`;
    }
    return lang === 'ar' ? `منذ ${diffHours} ساعة` : `${diffHours}h ago`;
  }
  if (diffDays < 7) {
    return lang === 'ar' ? `منذ ${diffDays} أيام` : `${diffDays}d ago`;
  }

  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
}

/**
 * Clamp a string to a maximum length
 */
export function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return `${str.slice(0, max)}...`;
}
