'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n/config';
import { locales, localeNames } from '@/lib/i18n/config';

type Props = { currentLocale: Locale };

export function FooterLang({ currentLocale }: Props) {
  const pathname = usePathname();
  const pathLocaleRegex = new RegExp(`^/(${locales.join('|')})`);
  return (
    <div className="flex flex-wrap gap-2">
      {locales.map((loc) => {
        const href = pathname.replace(pathLocaleRegex, `/${loc}`) || `/${loc}`;
        return (
          <Link
            key={loc}
            href={href}
            className={`px-3 py-1 rounded text-sm ${currentLocale === loc ? 'bg-steel text-white' : 'bg-white/20 text-white/90 hover:bg-white/30'}`}
          >
            {localeNames[loc]}
          </Link>
        );
      })}
    </div>
  );
}
