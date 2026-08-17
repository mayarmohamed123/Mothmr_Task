'use client';

import { useState } from 'react';
import { Heart, Bookmark, Share2 } from 'lucide-react';
import { likeAd, favoriteAd } from '@/lib/api/ads';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/utils/i18n';
import { formatCount } from '@/lib/utils/formatters';
import { useToast } from '@/components/ui/Toast';

interface AdActionsProps {
  adId: string;
  initialLikes: number;
  initialIsLiked: boolean;
  initialIsFavorite: boolean;
}

export function AdActions({
  adId,
  initialLikes,
  initialIsLiked,
  initialIsFavorite,
}: AdActionsProps) {
  const { token } = useAuth();
  const { lang } = useLanguage();
  const tr = translations[lang];
  const { showToast } = useToast();

  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [likeLoading, setLikeLoading] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  const handleLike = async () => {
    if (likeLoading) return;
    if (!token) {
      showToast(
        lang === 'ar'
          ? 'يجب تسجيل الدخول أولاً للإعجاب بهذا الإعلان'
          : 'Please login to like this ad',
        'warning',
      );
      return;
    }
    setIsLiked((prev) => !prev);
    setLikes((prev) => prev + (isLiked ? -1 : 1));
    setLikeLoading(true);
    try {
      const res = await likeAd(adId, token);
      setIsLiked(res.data.isLiked);
      setLikes(res.data.likes);
    } catch {
      setIsLiked((prev) => !prev);
      setLikes((prev) => prev + (isLiked ? 1 : -1));
      showToast(lang === 'ar' ? 'حدث خطأ، حاول مرة أخرى' : 'Something went wrong', 'error');
    } finally {
      setLikeLoading(false);
    }
  };

  const handleFavorite = async () => {
    if (favLoading) return;
    if (!token) {
      showToast(
        lang === 'ar'
          ? 'يجب تسجيل الدخول أولاً لحفظ هذا الإعلان'
          : 'Please login to save this ad',
        'warning',
      );
      return;
    }
    setIsFavorite((prev) => !prev);
    setFavLoading(true);
    try {
      const res = await favoriteAd(adId, token);
      setIsFavorite(res.data.isFavorite);
    } catch {
      setIsFavorite((prev) => !prev);
      showToast(lang === 'ar' ? 'حدث خطأ، حاول مرة أخرى' : 'Something went wrong', 'error');
    } finally {
      setFavLoading(false);
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ url: window.location.href, title: document.title });
      } catch {}
    } else {
      await navigator.clipboard.writeText(window.location.href).catch(() => {});
      showToast(lang === 'ar' ? 'تم نسخ الرابط' : 'Link copied!', 'success');
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Like */}
      <button
        onClick={handleLike}
        disabled={likeLoading}
        aria-label={isLiked ? 'إلغاء الإعجاب' : tr['like']}
        aria-pressed={isLiked}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border transition-all duration-200
          ${isLiked
            ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-500'
            : 'border-border bg-card text-muted hover:border-red-300 hover:text-red-500'
          }
          disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        <Heart
          className="w-4 h-4 transition-transform duration-200 hover:scale-110"
          fill={isLiked ? 'currentColor' : 'none'}
          aria-hidden="true"
        />
        <span>{formatCount(likes, lang)}</span>
      </button>

      {/* Favorite */}
      <button
        onClick={handleFavorite}
        disabled={favLoading}
        aria-label={isFavorite ? 'إلغاء الحفظ' : tr['save']}
        aria-pressed={isFavorite}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border transition-all duration-200
          ${isFavorite
            ? 'bg-[#F97316]/10 border-[#F97316]/30 text-[#F97316]'
            : 'border-border bg-card text-muted hover:border-[#F97316]/40 hover:text-[#F97316]'
          }
          disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        <Bookmark
          className="w-4 h-4 transition-transform duration-200 hover:scale-110"
          fill={isFavorite ? 'currentColor' : 'none'}
          aria-hidden="true"
        />
        {!isFavorite ? tr['save'] : (lang === 'ar' ? 'محفوظ' : 'Saved')}
      </button>

      {/* Share */}
      <button
        onClick={handleShare}
        aria-label={tr['share']}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border
          border-border bg-card text-muted
          hover:border-[#3a4562] hover:text-foreground transition-colors duration-200"
      >
        <Share2 className="w-4 h-4" aria-hidden="true" />
        <span className="hidden sm:block">{tr['share']}</span>
      </button>
    </div>
  );
}
