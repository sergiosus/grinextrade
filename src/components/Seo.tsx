import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://grinextrade.com';
const baseTitle = 'Grinex Trade LLC – Export Company';
const baseDescription =
  'Grinex Trade LLC is an international export company supplying textile and industrial products worldwide.';

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
  const resolvedTitle = title ? `${title} | ${baseTitle}` : baseTitle;
  const resolvedDescription = description || baseDescription;
  return {
    title: resolvedTitle,
    description: resolvedDescription,
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: 'Grinex Trade LLC',
      locale: lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
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
    description: baseDescription,
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
