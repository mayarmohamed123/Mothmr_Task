'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import type { SiteConfig } from '@/types/config';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { t } from '@/lib/utils/i18n';

interface HeaderProps {
  config: SiteConfig | null;
}

export default function Header({ config }: HeaderProps) {
  const { lang } = useLanguage();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = config?.nav ?? [
    { key: 'home', label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { key: 'ads', label: { ar: 'الإعلانات', en: 'Ads' }, href: '/ads' },
    { key: 'influencers', label: { ar: 'المؤثرين', en: 'Influencers' }, href: '/influencers' },
    { key: 'pricing', label: { ar: 'الباقات', en: 'Pricing' }, href: '/pricing' },
    { key: 'about', label: { ar: 'من نحن', en: 'About' }, href: '/about' },
  ];

  const brandName = config?.brand.latinName ?? 'mothmr';

  return (
    <header
      className="sticky top-0 z-50 border-b border-border backdrop-blur-xl"
      style={{ background: 'color-mix(in srgb, var(--card) 85%, transparent)' }}
    >
      <div className="max-w-7xl 3xl:max-w-[1800px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 2xl:px-10 3xl:px-12 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 shrink-0 hover:opacity-80 transition-opacity"
          aria-label={`${brandName} — الصفحة الرئيسية`}
        >
          <div className="relative w-9 h-8 flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Mothmer Logo"
              width={36}
              height={32}
              style={{ width: 'auto', height: 'auto' }}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-extrabold text-lg text-foreground tracking-tight">
            {brandName}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="القائمة الرئيسية" className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                  ${isActive
                    ? 'text-[#F97316] bg-[#F97316]/10'
                    : 'text-muted hover:text-foreground hover:bg-bg-secondary'
                  }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {t(item.label, lang)}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher languages={config?.languages} />

          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm text-muted">{user.name}</span>
              <Button variant="ghost" size="sm" onClick={logout}>
                {lang === 'ar' ? 'خروج' : 'Logout'}
              </Button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-xl
                  text-muted hover:text-foreground hover:bg-bg-secondary
                  transition-colors duration-200"
              >
                <LogIn className="w-4 h-4" aria-hidden="true" />
                {lang === 'ar' ? 'تسجيل دخول' : 'Login'}
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl
                  bg-[#F97316] hover:bg-[#EA6C0A] text-white transition-all duration-200
                  shadow-sm hover:shadow-md active:scale-95"
              >
                <UserPlus className="w-4 h-4" aria-hidden="true" />
                {t(config?.authAction.label ?? { ar: 'انضم إلينا', en: 'Join us' }, lang)}
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center
              bg-bg-secondary hover:bg-border text-foreground
              transition-colors duration-200"
            onClick={() => setMobileOpen((p) => !p)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t border-border px-4 py-4 space-y-1 animate-fade-in-up"
          style={{ background: 'var(--card)' }}
        >
          <nav aria-label="القائمة المتنقلة">
            {navItems.map((item) => {
              const isActive =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileOpen((prev) => !prev)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors
                    ${isActive
                      ? 'text-[#F97316] bg-[#F97316]/10'
                      : 'text-foreground hover:bg-bg-secondary'
                    }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {t(item.label, lang)}
                </Link>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            {user ? (
              <Button
                variant="ghost"
                size="md"
                onClick={() => {
                  logout();
                  setMobileOpen((prev) => !prev);
                }}
                className="w-full justify-center"
              >
                {lang === 'ar' ? 'تسجيل خروج' : 'Logout'}
              </Button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen((prev) => !prev)}
                  className="w-full text-center py-3 rounded-xl text-sm font-medium
                    border border-border text-foreground hover:bg-bg-secondary
                    transition-colors"
                >
                  {lang === 'ar' ? 'تسجيل دخول' : 'Login'}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen((prev) => !prev)}
                  className="w-full text-center py-3 rounded-xl text-sm font-semibold
                    bg-[#F97316] hover:bg-[#EA6C0A] text-white transition-all"
                >
                  {t(config?.authAction.label ?? { ar: 'انضم إلينا', en: 'Join us' }, lang)}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
