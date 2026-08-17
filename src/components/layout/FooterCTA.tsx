"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const ctaFeatures = [
  {
    ar: "توفير و تأثير",
    en: "Savings & Impact",
  },
  {
    ar: "لا مخالفات شرعية",
    en: "Sharia Compliant",
  },
  {
    ar: "خدمات متبادلة",
    en: "Mutual Services",
  },
];

export function FooterCTA() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <section
      className="relative py-6"
      aria-label={isAr ? "حمّل التطبيق" : "Download the App"}>
      <div className="max-w-7xl 3xl:max-w-[1800px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 2xl:px-10 3xl:px-12">
        <div
          className={`flex flex-col lg:flex-row items-center gap-12 py-16 lg:py-0 ${
            isAr ? "lg:flex-row-reverse" : ""
          }`}>
          {/* Text Content */}
          <div
            className={`flex-1 text-center lg:text-start space-y-6 ${
              isAr ? "lg:text-right" : "lg:text-left"
            }`}
            dir={isAr ? "rtl" : "ltr"}>
            {/* Badge */}
            <div
              className={`inline-flex ${
                isAr ? "justify-end w-full lg:justify-start" : ""
              }`}>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold border"
                style={{
                  background: "rgba(249,115,22,0.15)",
                  borderColor: "rgba(249,115,22,0.4)",
                  color: "#F97316",
                }}>
                {isAr ? "للاعمال" : "for Business"}
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              {isAr ? (
                <>
                  انضم الي مثمر واجعل اعلانك مؤثر <br />
                </>
              ) : (
                <>
                  join Mothmer and make your ad matter <br />
                </>
              )}
            </h2>

            {/* Features Array */}
            <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start pt-2 pb-1">
              {ctaFeatures.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 rounded-2xl text-sm font-medium text-slate-200 border border-white/15 bg-white/5 backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/25">
                  {isAr ? item.ar : item.en}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                style={{
                  background: "#F97316",
                  boxShadow: "0 8px 24px rgba(249,115,22,0.35)",
                }}>
                {isAr ? "🚀 انضم الان" : "🚀 Get started free"}
              </Link>
            </div>
          </div>

          {/* Phone Mockup image */}
          <div className="relative shrink-0 lg:self-end">
            {/* Glow behind mockup */}
            <div
              className="absolute inset-0 blur-3xl opacity-30 scale-75"
              style={{
                background:
                  "radial-gradient(circle, #F97316 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            <Image
              src="/assets/Group 1171275286.webp"
              alt={
                isAr
                  ? "تطبيق مثمر — اعلانك ديما مؤثر"
                  : "Mothmer app — Your ad always matters"
              }
              width={480}
              height={420}
              className="relative drop-shadow-2xl lg:translate-y-4"
              style={{ width: "auto", height: "auto" }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
