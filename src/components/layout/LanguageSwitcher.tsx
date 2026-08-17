'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/types/config';
import { ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';

interface LanguageSwitcherProps {
  languages?: Language[];
}

export function LanguageSwitcher({ languages }: LanguageSwitcherProps) {
  const { lang, setLang, mounted } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const defaultLanguages: Language[] = [
    { code: 'ar', label: 'العربية', flag: '🇪🇬', dir: 'rtl', default: true },
    { code: 'en', label: 'English', flag: '🇬🇧', dir: 'ltr', default: false },
  ];

  const langs = languages ?? defaultLanguages;
  // Before mount, always show 'ar' to match SSR; after mount show real stored lang
  const activeLang = mounted ? lang : 'ar';
  const current = langs.find((l) => l.code === activeLang) ?? langs[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="تغيير اللغة"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium
          border border-border bg-card hover:bg-bg-secondary
          text-foreground transition-colors duration-200"
      >
        <span aria-hidden="true">{current.flag}</span>
        <span className="hidden sm:block">{current.label}</span>
        <ChevronDown
          className="w-3.5 h-3.5 text-muted transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
          aria-hidden="true"
        />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          {/* Dropdown */}
          <ul
            role="listbox"
            aria-label="اختر اللغة"
            className="absolute top-full mt-2 min-w-35 rounded-xl border border-border
              bg-card shadow-lg z-50 overflow-hidden py-1"
            style={{ insetInlineStart: 0 }}
          >
            {langs.map((l) => (
              <li key={l.code} role="option" aria-selected={lang === l.code}>
                <button
                  onClick={() => { setLang(l.code); setOpen(false); }}
                  className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors duration-150 text-start
                    ${lang === l.code
                      ? 'bg-[#F97316]/10 text-[#F97316] font-semibold'
                      : 'hover:bg-bg-secondary text-foreground'
                    }`}
                >
                  <span aria-hidden="true">{l.flag}</span>
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
