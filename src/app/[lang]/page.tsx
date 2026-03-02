import type { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n/translations';
import { generateSeoMetadata, OrganizationJsonLd } from '@/components/Seo';
import { ContactForm } from '@/components/ContactForm';
import { HeroSection } from '@/components/HeroSection';
import Link from 'next/link';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  return generateSeoMetadata({
    title: '',
    description: 'Grinex Trade LLC is an international export company supplying textile and industrial products worldwide.',
    path: '',
    locale: lang,
  });
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);

  return (
    <>
      <OrganizationJsonLd />
      <HeroSection lang={lang} t={t} />

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-black text-center mb-12">
            {t.home.productCategories}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link
              href={`/${lang}/products?category=textile`}
              className="block rounded-2xl border border-gray-light overflow-hidden bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              <div className="aspect-[4/3] bg-gray-light">
                <img src="/images/waffle-towels.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-4">{t.home.textileProducts}</h3>
                <ul className="space-y-2 text-gray-medium">
                  {t.home.textileItems.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </Link>
            <Link
              href={`/${lang}/products?category=oilgas`}
              className="block rounded-2xl border border-gray-light overflow-hidden bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              <div className="aspect-[4/3] bg-gray-light">
                <img src="/images/orings.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-4">{t.home.oilGasProducts}</h3>
                <ul className="space-y-2 text-gray-medium">
                  {t.home.oilGasItems.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-black text-center mb-12">
            {t.home.whyChooseUs}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {t.home.whyItems.map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-light"
              >
                <p className="font-medium text-brand-black">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-black text-center mb-12">
            {t.home.exportTerms}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {t.home.terms.map((term) => (
              <span
                key={term}
                className="px-6 py-3 bg-primary-50 text-primary font-semibold rounded-lg border border-primary-200"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-black text-center mb-12">
            {t.home.industriesServed}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {t.home.industries.map((ind) => (
              <span
                key={ind}
                className="px-5 py-2.5 bg-white border border-gray-light rounded-lg font-medium text-gray-medium shadow-sm"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-black text-center mb-6">
            {t.home.exportComplianceTitle}
          </h2>
          <div className="max-w-3xl mx-auto text-center space-y-4 text-gray-medium">
            <p>{t.home.exportComplianceP1}</p>
            <p>{t.home.exportComplianceP2}</p>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/contact.jpg')" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-primary/60" aria-hidden />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">
            {t.home.contactForm}
          </h2>
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl border border-white/20 p-6 md:p-8">
            <ContactForm translations={t} />
          </div>
        </div>
      </section>
    </>
  );
}
