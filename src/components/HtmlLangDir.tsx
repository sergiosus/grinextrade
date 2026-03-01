'use client';

import { useEffect } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { isRtl } from '@/lib/i18n/config';

const localeToHtmlLang: Record<Locale, string> = {
  en: 'en',
  ru: 'ru',
  ar: 'ar',
  zh: 'zh',
  tr: 'tr',
  ro: 'ro',
  kk: 'kk',
};

type Props = { locale: Locale };

export function HtmlLangDir({ locale }: Props) {
  useEffect(() => {
    const html = document.documentElement;
    html.lang = localeToHtmlLang[locale];
    html.dir = isRtl(locale) ? 'rtl' : 'ltr';
  }, [locale]);
  return null;
}
