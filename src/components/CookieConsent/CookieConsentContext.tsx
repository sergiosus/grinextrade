'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { Locale } from '@/lib/i18n/config';
import type { Translations } from '@/lib/i18n/translations';
import { CookieConsent } from './CookieConsent';

type CookieConsentContextValue = {
  openPreferences: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  return ctx ?? { openPreferences: () => {} };
}

type ProviderProps = {
  children: ReactNode;
  locale: Locale;
  translations: Translations;
};

export function CookieConsentProvider({ children, locale, translations }: ProviderProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const openPreferences = useCallback(() => setModalOpen(true), []);

  return (
    <CookieConsentContext.Provider value={{ openPreferences }}>
      {children}
      <CookieConsent
        locale={locale}
        translations={translations}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </CookieConsentContext.Provider>
  );
}
