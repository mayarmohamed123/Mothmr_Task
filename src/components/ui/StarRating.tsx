interface StarRatingProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md';
  showValue?: boolean;
}

export function StarRating({ rating, max = 5, size = 'md', showValue = true }: StarRatingProps) {
  const stars = Array.from({ length: max }, (_, i) => {
    const filled = i < Math.floor(rating);
    const partial = !filled && i < rating;
    return { filled, partial };
  });

  const sizePx = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <span className={`inline-flex items-center gap-1 ${sizePx}`}>
      <span className="flex items-center gap-0.5" aria-label={`${rating} out of ${max} stars`}>
        {stars.map(({ filled, partial }, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}
            aria-hidden="true"
          >
            {partial ? (
              <>
                <defs>
                  <linearGradient id={`star-partial-${i}`}>
                    <stop offset={`${(rating % 1) * 100}%`} stopColor="#F97316" />
                    <stop offset={`${(rating % 1) * 100}%`} stopColor="#d1d5db" />
                  </linearGradient>
                </defs>
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  fill={`url(#star-partial-${i})`}
                />
              </>
            ) : (
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                fill={filled ? '#F97316' : '#e5e7eb'}
              />
            )}
          </svg>
        ))}
      </span>
      {showValue && (
        <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
      )}
    </span>
  );
}
