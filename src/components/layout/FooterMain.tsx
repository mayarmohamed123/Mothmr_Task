"use client";

import Link from "next/link";
import Image from "next/image";
import type { SiteConfig } from "@/types/config";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/utils/i18n";
import {
  SocialIcons,
  GooglePlayIcon,
  AppStoreIcon,
  ArrowUpIcon,
  GlobeIcon,
} from "@/lib/utils/icons";

interface FooterMainProps {
  config: SiteConfig | null;
}

export function FooterMain({ config }: FooterMainProps) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const brandName = config?.brand.latinName ?? "mothmr";
  const description = config?.footer.description ?? {
    ar: "مثمر منصة إعلانية تربط العلامات التجارية بصناع المحتوى في السوق المصري والعربي.",
    en: "Mothmer connects brands with creators across Egypt and the Arab world.",
  };
  const columns = config?.footer.columns ?? [];
  const socials = config?.footer.socials ?? [];
  const app = config?.footer.app;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative max-w-7xl 3xl:max-w-[1800px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 2xl:px-10 3xl:px-12 py-8 xs:py-10 sm:py-12 space-y-10">
      {/* ── Top Row: Brand Info + Social Icons (Side 1) & Location Input + Scroll To Top (Side 2) ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10">
        {/* Brand Column + Social Icons */}
        <div className="space-y-4 max-w-xl">
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="Mothmer Logo"
                width={32}
                height={28}
                className="object-contain"
              />
            </div>
            <span className="font-extrabold text-lg text-white">
              {brandName}
            </span>
          </Link>
          <p className="text-sm text-slate-300 leading-relaxed">
            {t(description, lang)}
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 flex-wrap pt-1">
            {socials.map((s) => {
              const Icon = SocialIcons[s.key];
              if (!Icon) return null;
              return (
                <a
                  key={s.key}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.key}
                  className="w-9 h-9 rounded-xl flex items-center justify-center
                    bg-white/5 border border-white/10 hover:bg-[#F97316]/20 hover:border-[#F97316]/50 hover:text-[#F97316]
                    text-slate-300 transition-colors duration-200">
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* Location Input + Scroll To Top Button */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 self-start lg:self-center">
          {/* Country Location Input */}
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3.5 pointer-events-none text-slate-400">
              <GlobeIcon className="w-4 h-4" />
            </div>
            <input
              type="text"
              readOnly
              value={isAr ? "جمهورية مصر العربية 🇪🇬" : "Arab Republic of Egypt 🇪🇬"}
              className="w-full sm:w-64 ps-10 pe-4 py-2.5 bg-white/5 border border-white/15 rounded-2xl text-sm text-white focus:outline-none cursor-default"
              aria-label={isAr ? "الدولة" : "Country"}
            />
          </div>

          {/* Scroll To Top Button */}
          <button
            onClick={scrollToTop}
            type="button"
            aria-label={isAr ? "العودة إلى الأعلى" : "Back to top"}
            title={isAr ? "العودة إلى الأعلى" : "Back to top"}
            className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white/5 border border-white/15 text-white hover:bg-[#F97316] hover:border-[#F97316] transition-all duration-200 active:scale-95 shadow-md">
            <ArrowUpIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── Nav Columns Grid + App Download ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Navigation Link Columns */}
        {columns.map((col) => (
          <div key={col.key}>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              {t(col.title, lang)}
            </h3>
            <ul className="space-y-2.5">
              {col.links.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-[#F97316] transition-colors duration-200">
                    {t(link.label, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* App Download Column (Positioned on the Right Side) */}
        {app && (
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
              {t(app.title, lang)}
            </h3>
            <div className="flex flex-col gap-2.5">
              <a
                href={app.googlePlay}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/10
                  bg-white/5 hover:bg-white/10 text-white
                  text-xs font-medium transition-colors duration-200 w-fit"
                aria-label="تحميل من Google Play">
                <GooglePlayIcon />
                <span>Google Play</span>
              </a>
              <a
                href={app.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/10
                  bg-white/5 hover:bg-white/10 text-white
                  text-xs font-medium transition-colors duration-200 w-fit"
                aria-label="تحميل من App Store">
                <AppStoreIcon />
                <span>App Store</span>
              </a>
            </div>
          </div>
        )}
      </div>

     
    </div>
  );
}
