# 🚀 Mothmer (مثمر) — Make Your Ad Matter | Platform Frontend

> **Mothmer (مثمر)** is a modern, high-performance web platform built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **TypeScript**. It connects brands with top content creators and influencers across Egypt and the Arab region, transforming video advertisements from passive views into measurable, high-impact engagement.

---

## 📌 Table of Contents
- [🌟 Key Features](#-key-features)
- [🛠️ Tech Stack & Architecture](#️-tech-stack--architecture)
- [📱 7-Breakpoint Responsive Design](#-7-breakpoint-responsive-design)
- [🌐 Internationalization (i18n & RTL)](#-internationalization-i18n--rtl)
- [🦶 Unified Footer Component](#-unified-footer-component)
- [💬 Comments System](#-comments-system)
- [🔐 Authentication & Local API Mock](#-authentication--local-api-mock)
- [🚦 Getting Started](#-getting-started)
- [📡 API Specifications & Mock Testing](#-api-specifications--mock-testing)
- [📄 Project Structure](#-project-structure)

---

## 🌟 Key Features

1. **Ads Marketplace (`/ads`)**:
   - High-impact ad listing grid with video duration badges, view/like counters, category tags, and sponsor markers.
   - Real-time search filter (`?q=...`) with diacritic & letter normalization (`أ/ا`, `ى/ي`, `ة/ه`).
   - Dynamic category pills & sorting (`Most Viewed`, `Newest`, `Most Liked`).
   - Server-side prerendering & client-side transition pagination.

2. **Ad Details & Video Player (`/ads/[id]`)**:
   - Embedded video preview player with full statistics (views, likes, duration, date).
   - Brand profile card, creator info, and downloadable campaign offers.
   - Interactive user action buttons (Like, Favorite, Share) with auth-gating and toast feedback.
   - Similar Ads recommendations grid.

3. **Comments System**:
   - Interactive comment feed on every ad detail page.
   - Star rating selector (1 to 5 stars) and comment text input for logged-in users.
   - Guest prompt requesting login to comment.
   - Like counters per comment with instant UI state updates and toast notifications.

4. **Influencers Directory (`/influencers`)**:
   - Creator directory displaying follower counts, niche categories, ratings, campaign counts, and pricing.
   - Filter by niche and sort by followers, rating, or price.

5. **Unified Responsive Footer**:
   - Combines the high-converting **CTA App Download Section** and **Main Footer Links** into a single cohesive layout.
   - Glassmorphism design with `/assets/Rectangle.webp` dark background image and subtle radial gradient overlays.
   - Feature highlight badges (`توفير و تأثير`, `لا مخالفات شرعية`, `خدمات متبادلة`).
   - Interactive country selector, SVG social icons utility (`icons.tsx`), and smooth scroll-to-top button.

6. **Authentication (`/login`, `/register`)**:
   - Lightweight Auth Provider with persistent JWT token storage (`localStorage`).
   - Login & Register forms with client-side validation and password toggle visibility.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 16.3.1 (App Router + Turbopack)
- **UI Library**: React 19.2
- **Styling**: Tailwind CSS v4 (`@theme inline` design tokens & custom breakpoints)
- **Icons**: Lucide React + Custom SVG Utilities (`icons.tsx`)
- **Themeing**: Next-Themes (Dark/Light mode support with zero flash)
- **Language/i18n**: Custom Context-based `LanguageContext` supporting Arabic (RTL) & English (LTR)
- **Notifications**: Toast Notification System (`ToastProvider`)
- **Font**: Cairo (Loaded via `next/font/google` for optimal Arabic/Latin typography)

---

## 📱 7-Breakpoint Responsive Design

The application is engineered to look stunning on all screen sizes across **7 custom breakpoints**:

| Breakpoint | Screen Size | Target Devices | Grid Layout (Cards) |
|---|---|---|---|
| **`xs:`** | `>= 375px` | Small / Medium Mobile | 1 column |
| **`sm:`** | `>= 640px` | Large Mobile / Phablets | 2 columns |
| **`md:`** | `>= 768px` | Tablets (Portrait) | 2 columns |
| **`lg:`** | `>= 1024px` | Tablets (Landscape) / Laptops | 3 columns |
| **`xl:`** | `>= 1280px` | Desktops | 4 columns |
| **`2xl:`** | `>= 1536px` | Large Monitors | 5 columns |
| **`3xl:`** | `>= 1920px` | Ultra-wide / 4K Displays | 6 columns |

- Container max-widths scale smoothly up to `3xl:max-w-[1800px]`.
- Mobile drawer navigation in `Header.tsx` automatically closes on link interaction (`onClick={() => setMobileOpen(false)}`).

---

## 🌐 Internationalization (i18n & RTL)

- Fully supports **Arabic (`ar`)** with **RTL** orientation and **English (`en`)** with **LTR** orientation.
- Hydration-safe language initialization prevents SSR/client mismatches.
- Language switcher instantly updates `document.documentElement.dir`, `document.documentElement.lang`, and all UI strings reactively via `useLanguage()`.
- Supports bilingual API payloads formatted as `{ "ar": "...", "en": "..." }`.

---

## 🚦 Getting Started

### 1. Prerequisites
- Node.js `^18.17` or `>= 20.0`
- npm `^9.0` or yarn / pnpm

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/mayarmohamed123/Mothmr_Task.git

# Navigate to project folder
cd Mothmr_Task

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

### 4. Running Locally
```bash
# Start development server on all network interfaces (allows local LAN/mobile testing)
npm run dev

# Open http://localhost:3000 or http://<YOUR_LOCAL_IP>:3001 in your browser
```

### 5. Production Build & Check
```bash
# Verify TypeScript types
npx tsc --noEmit

# Build production bundle
npm run build

# Start production server
npm run start
```

---

## 📡 API Specifications & Mock Testing

The application includes built-in support for mock testing parameters:

| Query Parameter | Description | Example |
|---|---|---|
| `?lang=ar` / `?lang=en` | Requests single-language plain text responses | `GET /api/ads?lang=ar` |
| `?page=1&limit=10` | Pagination with `total`, `totalPages`, `hasNextPage` | `GET /api/ads?page=1&limit=12` |
| `?q=...` | Search query with diacritic and character normalization | `GET /api/ads?q=أحمد` |
| `?sort=views` / `?sort=-views` | Sorting ascending (`views`) or descending (`-views`) | `GET /api/ads?sort=-views` |
| `?_delay=1500` | Simulates network delay (up to 10s) for loading skeleton testing | `GET /api/ads?_delay=1500` |
| `?_error=500` | Triggers intentional error code (`400`, `401`, `403`, `404`, `500`, `503`) | `GET /api/ads?_error=500` |
| `?_empty=true` | Returns an empty dataset for empty state verification | `GET /api/ads?_empty=true` |

---

## 📄 Project Structure

```
d:\mothmr task\mothmr/
├── public/                  # Static assets (logo.svg, background images, vectors)
├── src/
│   ├── app/                 # Next.js App Router pages & layouts
│   │   ├── ads/             # /ads list page & /ads/[id] ad detail page
│   │   ├── influencers/     # /influencers list page
│   │   ├── login/           # Login form page
│   │   ├── register/        # Registration form page
│   │   ├── globals.css      # Design tokens, Tailwind v4 theme & 7 breakpoints
│   │   ├── icon.svg         # Official browser tab favicon
│   │   └── layout.tsx       # Root Layout (Providers, Header, Footer)
│   ├── components/          # Reusable UI components
│   │   ├── ads/             # AdCard, AdVideo, CommentsSection, AdStats, AdActions
│   │   ├── brands/          # BrandCard component
│   │   ├── influencers/     # InfluencerCard & Skeletons
│   │   ├── layout/          # Header, Footer, FooterCTA, FooterMain, LanguageSwitcher
│   │   ├── offers/          # Offer list and row items
│   │   └── ui/              # Button, Badge, Avatar, Toast, ThemeToggle, Skeleton
│   ├── contexts/            # React Contexts (LanguageContext, AuthContext)
│   ├── lib/
│   │   ├── api/             # API client & resource endpoints (ads, influencers, comments)
│   │   └── utils/           # i18n helper, formatters, SVG icon registry
│   └── types/               # TypeScript interfaces (ad, influencer, comment, config)
├── next.config.ts           # Next.js config (LAN allowedOrigins, image domains, headers)
├── package.json             # Scripts & dependencies
└── tsconfig.json            # TypeScript compiler configuration
```

---

## 💻 Author & Repository

Developed for the **Mothmr (مثمر)** platform task evaluation.
Repository: [https://github.com/mayarmohamed123/Mothmr_Task.git](https://github.com/mayarmohamed123/Mothmr_Task.git)
