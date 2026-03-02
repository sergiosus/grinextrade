import type { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n/translations';
import { generateSeoMetadata } from '@/components/Seo';
import Link from 'next/link';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);
  return generateSeoMetadata({
    title: t.compliance.title,
    description: t.compliance.p1,
    path: '/compliance',
    locale: lang,
  });
}

export default async function CompliancePage({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-black mb-3">
          {t.compliance.title}
        </h1>
        <p className="text-gray-medium mb-10">{t.compliance.subtitle}</p>

        <div className="bg-white border border-gray-light rounded-2xl shadow-sm p-6 md:p-8">
          <p className="text-brand-black leading-relaxed">{t.compliance.p1}</p>
          <p className="mt-4 text-brand-black leading-relaxed">{t.compliance.p2}</p>
          <p className="mt-4 text-brand-black leading-relaxed">{t.compliance.p3}</p>

          <div className="mt-8 pt-6 border-t border-gray-light text-sm">
            <Link href={`/${lang}/legal`} className="text-primary hover:text-accent-red hover:underline">
              {t.compliance.viewLegalLink}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
