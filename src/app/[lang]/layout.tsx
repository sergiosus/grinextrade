import type { Locale } from '@/lib/i18n/config';
import { locales, isRtl } from '@/lib/i18n/config';
import { getTranslations } from '@/lib/i18n/translations';
import { ClientLayout } from '@/components/ClientLayout';
import { HtmlLangDir } from '@/components/HtmlLangDir';
import { ReactNode } from 'react';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type Props = { children: ReactNode; params: Promise<{ lang: Locale }> };

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const t = getTranslations(lang);
  const rtl = isRtl(lang);
  return (
    <>
      <HtmlLangDir locale={lang} />
      <div dir={rtl ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col">
        <ClientLayout locale={lang} translations={t}>
          {children}
        </ClientLayout>
      </div>
    </>
  );
}
