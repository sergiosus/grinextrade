'use client';

import { useCookieConsent } from './CookieConsentContext';

type Props = { label: string; className?: string };

export function CookieSettingsLink({ label, className }: Props) {
  const { openPreferences } = useCookieConsent();
  return (
    <button
      type="button"
      onClick={openPreferences}
      className={className ?? 'hover:text-white transition text-sm text-white/90'}
      aria-label={label}
    >
      {label}
    </button>
  );
}
