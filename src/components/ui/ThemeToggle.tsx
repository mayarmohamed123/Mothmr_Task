'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl bg-bg-secondary animate-pulse" aria-hidden="true" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
      className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200
        bg-bg-secondary hover:bg-border text-muted hover:text-foreground"
    >
      {isDark ? (
        <Sun className="w-4.5 h-4.5" aria-hidden="true" />
      ) : (
        <Moon className="w-4.5 h-4.5" aria-hidden="true" />
      )}
    </button>
  );
}
