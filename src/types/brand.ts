import type { BilingualText } from './api';

export interface BrandSummary {
  id: string;
  name: BilingualText;
  logo: string;
  color: string;
  verified: boolean;
  description: BilingualText;
  website: string;
}

export interface Brand extends BrandSummary {
  adsCount?: number;
}
