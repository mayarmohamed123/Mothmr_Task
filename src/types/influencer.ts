import type { BilingualText } from './api';

export interface InfluencerSummary {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
  rating: number;
  followers: number;
  city: string;
}

export interface InfluencerPlatform {
  platform: 'instagram' | 'tiktok' | 'youtube' | 'facebook' | 'x';
  url: string;
  followers: number;
}

export interface Influencer extends InfluencerSummary {
  cover: string;
  bio: BilingualText;
  country: BilingualText;
  categoryId: string;
  reviewsCount: number;
  engagementRate: number;
  completedCampaigns: number;
  responseTimeHours: number;
  startingPrice: number;
  currency: string;
  platforms: InfluencerPlatform[];
  joinedAt: string;
}
