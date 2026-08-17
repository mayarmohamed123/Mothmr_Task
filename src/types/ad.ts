import type { BilingualText } from './api';
import type { BrandSummary } from './brand';
import type { Category } from './category';

export interface AdBudget {
  amount: number;
  currency: string;
}

export interface AdStats {
  views: number;
  likes: number;
  shares: number;
  comments: number;
  offers: number;
}

export interface Ad {
  id: string;
  slug: string;
  title: BilingualText;
  description: BilingualText;
  excerpt: BilingualText;
  brandId: string;
  categoryId: string;
  thumbnail: string;
  poster: string;
  videoUrl: string;
  durationSeconds: number;
  badge: BilingualText;
  sponsored: boolean;
  status: string;
  views: number;
  likes: number;
  shares: number;
  commentsCount: number;
  offersCount: number;
  rating: number;
  budget: AdBudget;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  brand: BrandSummary;
  category: Category;
  isLiked?: boolean;
  isFavorite?: boolean;
  stats?: AdStats;
}

export type AdListItem = Omit<Ad, 'stats' | 'isLiked' | 'isFavorite'>;
