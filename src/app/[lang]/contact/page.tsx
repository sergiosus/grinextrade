import type { Locale } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n/translations';
import { generateSeoMetadata } from '@/components/Seo';
import { ContactForm } from '@/components/ContactForm';

const WHATSAPP_URL = 'https://wa.me/79124475419';
const TELEGRAM_URL = 'https://t.me/grinextrade';
const EMAIL = 'info@grinextrade.com';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);
  return generateSeoMetadata({
    title: t.contact.title,
    description: t.contact.subtitle + ' - Grinex Trade LLC',
    path: '/contact',
    locale: lang,
  });
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);

  return (
    <div className="relative py-12 md:py-16 overflow-hidden min-h-[80vh]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/contact.jpg')" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-primary/60" aria-hidden />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
          {t.contact.title}
        </h1>
        <p className="text-white/90 mb-8 drop-shadow-md">{t.contact.subtitle}</p>

        <div className="flex flex-wrap gap-4 mb-8">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-black font-medium rounded-lg hover:bg-gray-light shadow-lg transition"
          >
            {t.contact.emailBtn}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-medium rounded-lg hover:opacity-90 shadow-lg transition"
          >
            {t.contact.whatsapp}
          </a>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0088cc] text-white font-medium rounded-lg hover:opacity-90 shadow-lg transition"
          >
            {t.contact.telegram}
          </a>
        </div>

        <div className="mb-10 bg-white/95 backdrop-blur rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-brand-black mb-3">{t.contact.contactBlock}</h2>
          <ul className="space-y-2 text-gray-medium">
            <li><a href={`mailto:${EMAIL}`} className="text-primary hover:text-accent-red hover:underline">{EMAIL}</a></li>
            <li>WhatsApp: <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent-red hover:underline">+7 912 447 54 19</a></li>
            <li>Telegram: <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent-red hover:underline">@grinextrade</a></li>
          </ul>
        </div>

        <div className="bg-white/95 backdrop-blur rounded-xl p-6 md:p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-brand-black mb-4">{t.contact.formTitle}</h2>
          <ContactForm translations={t} />
        </div>
      </div>
    </div>
  );
}
