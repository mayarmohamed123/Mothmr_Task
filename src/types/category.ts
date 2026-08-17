import type { BilingualText } from './api';

export interface Category {
  id: string;
  slug: string;
  name: BilingualText;
  icon: string;
  color: string;
  adsCount?: number;
}
