'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { Lang } from '@/types/api';

interface LanguageContextValue {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  setLang: (lang: Lang) => void;
  isRtl: boolean;
  /** True after hydration — use to suppress language-sensitive renders on SSR */
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'ar',
  dir: 'rtl',
  setLang: () => {},
  isRtl: true,
  mounted: false,
});

const STORAGE_KEY = 'mothmer_lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always start with 'ar' to match what the server renders.
  // We sync to localStorage after hydration (see useEffect below).
  const [lang, setLangState] = useState<Lang>('ar');
  const [mounted, setMounted] = useState(false);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
    // Update the <html> attributes immediately on explicit user switch
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  }, []);

  // After hydration, read the stored language preference.
  // Uses queueMicrotask to decouple state updates from synchronous effect execution.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    queueMicrotask(() => {
      if (stored === 'ar' || stored === 'en') {
        setLangState(stored);
        document.documentElement.lang = stored;
        document.documentElement.dir = stored === 'ar' ? 'rtl' : 'ltr';
      }
      setMounted(true);
    });
  }, []);

  const dir: 'rtl' | 'ltr' = lang === 'ar' ? 'rtl' : 'ltr';
  const isRtl = lang === 'ar';

  return (
    <LanguageContext.Provider value={{ lang, dir, setLang, isRtl, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
