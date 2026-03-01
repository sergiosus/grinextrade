export const locales = ['en', 'ru', 'ar', 'zh', 'tr', 'ro', 'kk'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  ar: 'العربية',
  zh: '中文',
  tr: 'Türkçe',
  ro: 'Română',
  kk: 'Қазақша',
};

export const rtlLocales: Locale[] = ['ar'];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export const browserLocaleMap: Record<string, Locale> = {
  en: 'en',
  'en-US': 'en',
  'en-GB': 'en',
  ru: 'ru',
  'ru-RU': 'ru',
  ar: 'ar',
  'ar-SA': 'ar',
  'ar-AE': 'ar',
  zh: 'zh',
  'zh-CN': 'zh',
  'zh-TW': 'zh',
  tr: 'tr',
  'tr-TR': 'tr',
  ro: 'ro',
  'ro-RO': 'ro',
  kk: 'kk',
  'kk-KZ': 'kk',
};

export function getLocaleFromBrowser(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  const parts = acceptLanguage.split(',').map((s) => s.trim().split(';')[0]);
  for (const part of parts) {
    const lang = part.split('-')[0].toLowerCase();
    if (locales.includes(lang as Locale)) return lang as Locale;
    const mapped = browserLocaleMap[part];
    if (mapped) return mapped;
  }
  return defaultLocale;
}
