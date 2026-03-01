import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import type { Translations } from '@/lib/i18n/translations';
import { FooterLang } from '@/components/FooterLang';

const WHATSAPP_URL = 'https://wa.me/79124475419';
const TELEGRAM_URL = 'https://t.me/grinextrade';
const EMAIL = 'info@grinextrade.com';

const quickLinkPaths: { key: keyof Translations['nav']; path: string }[] = [
  { key: 'home', path: '' },
  { key: 'products', path: 'products' },
  { key: 'government', path: 'government' },
  { key: 'about', path: 'about' },
  { key: 'contact', path: 'contact' },
];

type Props = { locale: Locale; translations: Translations };

export function Footer({ locale, translations }: Props) {
  const year = new Date().getFullYear();
  const base = `/${locale}`;

  return (
    <footer className="bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-bold text-lg">{translations.footer.company}</p>
            <p className="mt-3 text-sm text-white/80 leading-relaxed max-w-xs">
              {translations.footer.disclaimer}
            </p>
          </div>
          <div>
            <p className="font-semibold mb-3">{translations.footer.quickLinks}</p>
            <ul className="space-y-2 text-sm text-white/90">
              {quickLinkPaths.map(({ key, path }) => (
                <li key={key}>
                  <Link href={path ? `${base}/${path}` : base} className="hover:text-white transition">
                    {translations.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3">{translations.contact.contactBlock}</p>
            <ul className="space-y-2 text-sm text-white/90">
              <li>
                <a href={`mailto:${EMAIL}`} className="hover:text-white transition">{EMAIL}</a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  WhatsApp: +7 912 447 54 19
                </a>
              </li>
              <li>
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  Telegram: @grinextrade
                </a>
              </li>
            </ul>
            <p className="font-semibold mt-4 mb-2">Language</p>
            <FooterLang currentLocale={locale} />
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-white/20 text-center text-sm text-white/70">
          {translations.footer.copyright.replace('{year}', String(year))}
        </div>
      </div>
    </footer>
  );
}
