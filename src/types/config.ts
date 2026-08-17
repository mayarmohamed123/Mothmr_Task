import type { BilingualText } from './api';

export interface NavItem {
  key: string;
  label: BilingualText;
  href: string;
}

export interface AuthAction {
  key: string;
  label: BilingualText;
  href: string;
}

export interface Language {
  code: 'ar' | 'en';
  label: string;
  flag: string;
  dir: 'rtl' | 'ltr';
  default: boolean;
}

export interface CtaFeature {
  key: string;
  icon: string;
  label: BilingualText;
  color: string;
}

export interface Cta {
  badge: BilingualText;
  title: BilingualText;
  button: {
    label: BilingualText;
    href: string;
  };
  features: CtaFeature[];
}

export interface FooterLink {
  label: BilingualText;
  href: string;
}

export interface FooterColumn {
  key: string;
  title: BilingualText;
  links: FooterLink[];
}

export interface Social {
  key: string;
  url: string;
}

export interface AppLinks {
  title: BilingualText;
  subtitle: BilingualText;
  googlePlay: string;
  appStore: string;
}

export interface Footer {
  description: BilingualText;
  columns: FooterColumn[];
  socials: Social[];
  app: AppLinks;
  copyright: BilingualText;
}

export interface Brand {
  name: string;
  latinName: string;
  logo: string;
  tagline: BilingualText;
  primaryColor: string;
  darkColor: string;
}

export interface SiteConfig {
  brand: Brand;
  nav: NavItem[];
  authAction: AuthAction;
  languages: Language[];
  cta: Cta;
  footer: Footer;
}
