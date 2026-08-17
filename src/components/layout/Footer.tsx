"use client";

import Image from "next/image";
import type { SiteConfig } from "@/types/config";
import { FooterCTA } from "./FooterCTA";
import { FooterMain } from "./FooterMain";

interface FooterProps {
  config: SiteConfig | null;
}

export default function Footer({ config }: FooterProps) {
  return (
    <footer
      className="relative overflow-hidden border-t border-slate-800"
      style={{ background: "#0b1020" }}
      aria-label="تذييل الصفحة">
      {/* Background Image */}
      <Image
        src="/assets/Rectangle.webp"
        alt=""
        fill
        className="object-cover opacity-30"
        style={{ objectFit: "cover" }}
        aria-hidden="true"
        priority={false}
      />

      {/* Gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(249,115,22,0.12) 0%, transparent 50%, rgba(124,58,237,0.08) 100%)",
        }}
        aria-hidden="true"
      />

      {/* First Component: CTA Section */}
      <FooterCTA />

      {/* Horizontal Divider */}
      <hr className="relative max-w-7xl 3xl:max-w-[1800px] mx-auto border-t border-white/10 my-0" />

      {/* Second Component: Main Footer Links & Info */}
      <FooterMain config={config} />
    </footer>
  );
}
