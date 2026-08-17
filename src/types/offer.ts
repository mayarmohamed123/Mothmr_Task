import type { BilingualText } from './api';
import type { InfluencerSummary } from './influencer';

export interface OfferPrice {
  amount: number;
  currency: string;
}

export interface Offer {
  id: string;
  adId: string;
  influencerId: string;
  influencer: InfluencerSummary;
  price: OfferPrice;
  deliveryDays: number;
  status: 'pending' | 'shortlisted' | 'accepted' | 'rejected';
  statusLabel: BilingualText;
  note: BilingualText;
  submittedAt: string;
}

export interface SubmitOfferPayload {
  price: number;
  deliveryDays: number;
  note: string;
}
