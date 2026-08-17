'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ThumbsUp, Star, Send, Loader2, ChevronDown } from 'lucide-react';
import { getComments, submitComment } from '@/lib/api/comments';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/Toast';
import { formatDate, formatCount } from '@/lib/utils/formatters';
import type { Comment } from '@/types/comment';

interface CommentsSectionProps {
  adId: string;
  initialComments?: Comment[];
}

function StarRating({
  value,
  onChange,
  readOnly = false,
}: {
  value: number;
  onChange?: (v: number) => void;
  readOnly?: boolean;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          aria-label={`${star} نجوم`}
          className={`transition-transform duration-100 ${
            readOnly ? 'cursor-default' : 'hover:scale-125 cursor-pointer'
          }`}>
          <Star
            className="w-4 h-4"
            fill={(hovered || value) >= star ? '#F97316' : 'none'}
            stroke={(hovered || value) >= star ? '#F97316' : '#94a3b8'}
          />
        </button>
      ))}
    </div>
  );
}

function CommentCard({ comment, lang }: { comment: Comment; lang: 'ar' | 'en' }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikesCount((prev) => prev + (liked ? -1 : 1));
  };

  return (
    <div
      className="flex gap-3 p-4 rounded-2xl border border-border transition-colors"
      style={{ background: 'var(--card)' }}>
      {/* Avatar */}
      <div className="shrink-0 relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#F97316]/30">
        <Image
          src={comment.author.avatar}
          alt={comment.author.name}
          fill
          sizes="40px"
          className="object-cover"
        />
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div>
            <span className="font-bold text-sm text-foreground">{comment.author.name}</span>
            <span className="block text-xs text-muted mt-0.5">{formatDate(comment.createdAt, lang)}</span>
          </div>
          {/* Star rating */}
          <StarRating value={comment.rating} readOnly />
        </div>

        {/* Comment text */}
        <p className="text-sm text-foreground leading-relaxed">{comment.body}</p>

        {/* Like button */}
        <button
          onClick={handleLike}
          type="button"
          aria-pressed={liked}
          aria-label={lang === 'ar' ? 'ادعم الإجابة' : 'Like this comment'}
          className={`mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200
            ${liked
              ? 'bg-[#F97316]/10 border-[#F97316]/30 text-[#F97316]'
              : 'bg-transparent border-border text-muted hover:border-[#F97316]/40 hover:text-[#F97316]'
            }`}>
          <ThumbsUp
            className="w-3.5 h-3.5"
            fill={liked ? 'currentColor' : 'none'}
          />
          <span>{lang === 'ar' ? 'ادعم الإجابة' : 'Like'}</span>
          {likesCount > 0 && (
            <span className="opacity-70">{formatCount(likesCount, lang)}</span>
          )}
        </button>
      </div>
    </div>
  );
}

export function CommentsSection({ adId, initialComments = [] }: CommentsSectionProps) {
  const { token, user } = useAuth();
  const { lang } = useLanguage();
  const { showToast } = useToast();
  const isAr = lang === 'ar';

  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [loading, setLoading] = useState(initialComments.length === 0);
  const [submitting, setSubmitting] = useState(false);
  const [body, setBody] = useState('');
  const [rating, setRating] = useState(5);
  const [showAll, setShowAll] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let cancelled = false;
    if (initialComments.length === 0) {
      getComments(adId)
        .then((res) => {
          if (!cancelled) setComments(res.data);
        })
        .catch(() => {
          if (!cancelled)
            showToast(isAr ? 'تعذّر تحميل التعليقات' : 'Failed to load comments', 'error');
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }
    return () => {
      cancelled = true;
    };
  }, [adId, initialComments.length, isAr, showToast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !user) {
      showToast(
        isAr ? 'يجب تسجيل الدخول أولاً لإضافة تعليق' : 'Please login to add a comment',
        'warning',
      );
      return;
    }
    if (!body.trim()) {
      showToast(isAr ? 'يرجى كتابة تعليق' : 'Please write a comment', 'warning');
      return;
    }
    setSubmitting(true);
    try {
      const res = await submitComment(adId, { body: body.trim(), rating }, token);
      setComments((prev) => [res.data, ...prev]);
      setBody('');
      setRating(5);
      showToast(
        isAr ? 'تم إضافة تعليقك بنجاح ✓' : 'Comment added successfully ✓',
        'success',
      );
    } catch {
      showToast(
        isAr ? 'حدث خطأ أثناء إضافة التعليق' : 'Failed to add comment',
        'error',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const displayed = showAll ? comments : comments.slice(0, 3);
  const averageRating =
    comments.length > 0
      ? comments.reduce((acc, c) => acc + c.rating, 0) / comments.length
      : 0;

  return (
    <div
      className="rounded-2xl border border-border overflow-hidden"
      style={{ background: 'var(--card)' }}
      id="comments-section">
      {/* Header */}
      <div
        className="px-5 py-4 border-b border-border flex items-center justify-between gap-3"
        style={{ background: 'var(--card)' }}>
        <div className="flex items-center gap-2">
          <span
            className="flex items-center justify-center w-7 h-7 rounded-lg text-white text-xs font-bold"
            style={{ background: '#F97316' }}>
            💬
          </span>
          <h2 className="font-bold text-foreground text-base">
            {isAr ? 'اجابات مؤثرة' : 'Impactful Comments'}
          </h2>
          {comments.length > 0 && (
            <span className="text-xs text-muted bg-muted/10 px-2 py-0.5 rounded-full border border-border">
              {formatCount(comments.length, lang)}
            </span>
          )}
        </div>

        {/* Average rating display */}
        {comments.length > 0 && (
          <div className="flex items-center gap-1.5">
            <StarRating value={Math.round(averageRating)} readOnly />
            <span className="text-xs text-muted">{averageRating.toFixed(1)}</span>
          </div>
        )}
      </div>

      <div className="p-5 space-y-5">
        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {user ? (
            <>
              {/* User info header */}
              <div className="flex items-center gap-2">
                {user.avatar && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border shrink-0">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-foreground">{user.name}</span>
                  {/* Inline star rating for new comment */}
                  <div className="flex items-center gap-1 text-xs text-muted">
                    <span>{isAr ? 'تقييمك:' : 'Rating:'}</span>
                    <StarRating value={rating} onChange={setRating} />
                  </div>
                </div>
              </div>

              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder={isAr ? 'اكتب تعليقك هنا...' : 'Write your comment here...'}
                  rows={3}
                  maxLength={500}
                  dir={isAr ? 'rtl' : 'ltr'}
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-bg-secondary
                    text-sm text-foreground placeholder:text-muted
                    focus:outline-none focus:border-[#F97316]/50 focus:ring-2 focus:ring-[#F97316]/10
                    resize-none transition-all duration-200"
                />
                <span className="absolute bottom-3 inset-e-3 text-xs text-muted">
                  {body.length}/500
                </span>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting || !body.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold text-white
                    transition-all duration-200 active:scale-95
                    disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: '#F97316', boxShadow: '0 4px 16px rgba(249,115,22,0.3)' }}>
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {isAr ? 'إرسال التعليق' : 'Post Comment'}
                </button>
              </div>
            </>
          ) : (
            /* Login CTA */
            <div
              className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-dashed border-[#F97316]/30"
              style={{ background: 'rgba(249,115,22,0.05)' }}>
              <p className="text-sm text-muted">
                {isAr
                  ? 'سجّل دخولك لإضافة تعليق وتقييم هذا الإعلان'
                  : 'Login to add a comment and rate this ad'}
              </p>
              <Link
                href="/login"
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold text-white"
                style={{ background: '#F97316' }}>
                {isAr ? 'تسجيل الدخول' : 'Login'}
              </Link>
            </div>
          )}
        </form>

        {/* Comments List */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-2xl animate-pulse border border-border"
                style={{ background: 'var(--bg-secondary)' }}
              />
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-muted">
            <p className="text-2xl mb-2">💬</p>
            <p className="text-sm">{isAr ? 'لا توجد تعليقات بعد. كن أول من يعلّق!' : 'No comments yet. Be the first!'}</p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {displayed.map((comment) => (
                <CommentCard key={comment.id} comment={comment} lang={lang} />
              ))}
            </div>

            {/* Show more / less */}
            {comments.length > 3 && (
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-medium text-muted
                  border border-border hover:border-[#F97316]/40 hover:text-[#F97316] transition-colors duration-200">
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                />
                {showAll
                  ? (isAr ? 'عرض أقل' : 'Show less')
                  : isAr
                  ? `عرض ${comments.length - 3} تعليق آخر`
                  : `Show ${comments.length - 3} more comments`}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
