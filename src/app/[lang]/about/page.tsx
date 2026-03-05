import type { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n/translations';
import { generateSeoMetadata } from '@/components/Seo';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);
  return generateSeoMetadata({
    title: t.about.title,
    description: t.about.p1 + ' ' + t.about.p2,
    path: '/about',
    locale: lang,
  });
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-black mb-8">
          {t.about.title}
        </h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-gray-medium mb-4">{t.about.p1}</p>
          <p className="text-lg text-gray-medium">{t.about.p2}</p>
        </div>
      </div>
    </div>
  );
}
