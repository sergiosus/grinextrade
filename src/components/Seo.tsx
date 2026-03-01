import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://grinextrade.com';

type Props = {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  noIndex?: boolean;
};

const localeAlternates: Record<Locale, string> = {
  en: 'en_US',
  ru: 'ru_RU',
  ar: 'ar_SA',
  zh: 'zh_CN',
  tr: 'tr_TR',
  ro: 'ro_RO',
  kk: 'kk_KZ',
};

export function generateSeoMetadata({ title, description, path, locale, noIndex }: Props): Metadata {
  const url = `${siteUrl}/${locale}${path}`;
  const lang = localeAlternates[locale];
  return {
    title: title ? `${title} | Grinex Trade LLC` : 'Grinex Trade LLC - Global Export Supplier',
    description,
    openGraph: {
      title: title ? `${title} | Grinex Trade LLC` : 'Grinex Trade LLC',
      description,
      url,
      siteName: 'Grinex Trade LLC',
      locale: lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} | Grinex Trade LLC` : 'Grinex Trade LLC',
      description,
    },
    alternates: {
      canonical: url,
    },
    ...(noIndex && { robots: { index: false, follow: true } }),
  };
}

export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Grinex Trade LLC',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'International export company supplying textile and oil & gas products worldwide.',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@grinextrade.com',
      telephone: '+7-912-447-54-19',
      contactType: 'customer service',
      areaServed: 'Worldwide',
    },
    sameAs: ['https://t.me/grinextrade'],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
