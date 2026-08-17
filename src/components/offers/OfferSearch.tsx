'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import type { Lang } from '@/types/api';
import { translations } from '@/lib/utils/i18n';

interface OfferSearchProps {
  onSearch: (query: string) => void;
  lang: Lang;
}

export function OfferSearch({ onSearch, lang }: OfferSearchProps) {
  const [value, setValue] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const tr = translations[lang];

  const handleChange = useCallback(
    (val: string) => {
      setValue(val);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => onSearch(val), 400);
    },
    [onSearch],
  );

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <div className="relative">
      <label htmlFor="offer-search" className="sr-only">
        {tr['searchPlaceholder']}
      </label>
      <Search
        className="absolute inset-s-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
        aria-hidden="true"
      />
      <input
        id="offer-search"
        type="search"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={tr['searchPlaceholder']}
        className="w-full ps-9 pe-9 py-2.5 rounded-xl border border-border bg-bg-secondary
          text-sm text-foreground placeholder:text-muted
          focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]
          transition-all duration-200"
      />
      {value && (
        <button
          onClick={handleClear}
          aria-label="مسح البحث"
          className="absolute inset-e-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted hover:text-foreground"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
