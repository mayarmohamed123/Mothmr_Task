import type { BilingualText, Lang } from '@/types/api';

/**
 * Resolve a bilingual text object to a string based on the current language.
 */
export function t(text: BilingualText | string, lang: Lang): string {
  if (typeof text === 'string') return text;
  return text[lang] ?? text.ar;
}

/**
 * Static translations for UI strings not coming from the API
 */
export const translations: Record<Lang, Record<string, string>> = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    ads: 'الإعلانات',
    influencers: 'المؤثرين',
    pricing: 'الباقات',
    about: 'من نحن',
    login: 'تسجيل دخول',
    register: 'سجّل الآن',
    joinUs: 'انضم إلينا',
    // Ad detail
    views: 'مشاهدة',
    likes: 'إعجاب',
    shares: 'مشاركة',
    comments: 'تعليق',
    offers: 'عرض',
    like: 'أعجبني',
    save: 'حفظ',
    share: 'مشاركة',
    watch: 'مشاهدة',
    playVideo: 'تشغيل الفيديو',
    // Offers
    influencerOffers: 'طلبات المؤثر',
    searchPlaceholder: 'ابحث عن مؤثر...',
    noOffersFound: 'لا توجد عروض',
    noOffersDesc: 'لا يوجد مؤثرون قدموا عرضًا على هذا الإعلان بعد.',
    egp: 'ج.م',
    days: 'يوم',
    followers: 'متابع',
    deliveryIn: 'التسليم خلال',
    // Similar ads
    similarAds: 'اعلانات مشابهه',
    // Comments
    addComment: 'أضف تعليقًا',
    submit: 'إرسال',
    // CTA
    joinNow: 'ابدأ الآن',
    // Auth
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    name: 'الاسم',
    loginTitle: 'تسجيل الدخول',
    registerTitle: 'إنشاء حساب',
    // States
    loading: 'جار التحميل...',
    errorTitle: 'حدث خطأ',
    errorDesc: 'تعذّر تحميل البيانات. يرجى المحاولة مرة أخرى.',
    retry: 'إعادة المحاولة',
    emptyTitle: 'لا توجد نتائج',
    emptyDesc: 'لم يتم العثور على أي بيانات.',
    // Footer
    downloadApp: 'حمّل التطبيق الآن',
    googlePlay: 'Google Play',
    appStore: 'App Store',
    // Pagination
    next: 'التالي',
    prev: 'السابق',
    // Ads listing
    allCategories: 'الكل',
    sortBy: 'ترتيب حسب',
    mostViewed: 'الأكثر مشاهدة',
    newest: 'الأحدث',
    // Influencers
    startingFrom: 'يبدأ من',
    campaigns: 'حملة',
    engagementRate: 'معدل التفاعل',
    viewProfile: 'عرض الملف',
    // Verified
    verified: 'موثّق',
  },
  en: {
    home: 'Home',
    ads: 'Ads',
    influencers: 'Influencers',
    pricing: 'Pricing',
    about: 'About',
    login: 'Login',
    register: 'Register',
    joinUs: 'Join us',
    views: 'views',
    likes: 'likes',
    shares: 'shares',
    comments: 'comments',
    offers: 'offers',
    like: 'Like',
    save: 'Save',
    share: 'Share',
    watch: 'Watch',
    playVideo: 'Play video',
    influencerOffers: 'Influencer Offers',
    searchPlaceholder: 'Search influencer...',
    noOffersFound: 'No offers found',
    noOffersDesc: 'No influencers have submitted an offer for this ad yet.',
    egp: 'EGP',
    days: 'days',
    followers: 'followers',
    deliveryIn: 'Delivery in',
    similarAds: 'Similar Ads',
    addComment: 'Add a comment',
    submit: 'Submit',
    joinNow: 'Start now',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    loginTitle: 'Login',
    registerTitle: 'Create Account',
    loading: 'Loading...',
    errorTitle: 'Something went wrong',
    errorDesc: 'Failed to load data. Please try again.',
    retry: 'Try again',
    emptyTitle: 'No results',
    emptyDesc: 'No data was found.',
    downloadApp: 'Download the app',
    googlePlay: 'Google Play',
    appStore: 'App Store',
    next: 'Next',
    prev: 'Previous',
    allCategories: 'All',
    sortBy: 'Sort by',
    mostViewed: 'Most viewed',
    newest: 'Newest',
    startingFrom: 'Starting from',
    campaigns: 'campaigns',
    engagementRate: 'Engagement rate',
    viewProfile: 'View profile',
    verified: 'Verified',
  },
};

export function useTranslations(lang: Lang) {
  return (key: string): string => translations[lang][key] ?? key;
}
