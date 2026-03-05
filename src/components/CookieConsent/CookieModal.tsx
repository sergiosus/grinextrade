'use client';

import { useState, useEffect, useRef } from 'react';

type Props = {
  title: string;
  necessary: string;
  necessaryDesc: string;
  analytics: string;
  analyticsDesc: string;
  marketing: string;
  marketingDesc: string;
  save: string;
  close: string;
  initialAnalytics: boolean;
  initialMarketing: boolean;
  onSave: (analytics: boolean, marketing: boolean) => void;
  onClose: () => void;
};

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function getFocusables(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute('disabled') && el.tabIndex >= 0
  );
}

export function CookieModal({
  title,
  necessary,
  necessaryDesc,
  analytics,
  analyticsDesc,
  marketing,
  marketingDesc,
  save,
  close,
  initialAnalytics,
  initialMarketing,
  onSave,
  onClose,
}: Props) {
  const [analyticsOn, setAnalyticsOn] = useState(initialAnalytics);
  const [marketingOn, setMarketingOn] = useState(initialMarketing);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAnalyticsOn(initialAnalytics);
    setMarketingOn(initialMarketing);
  }, [initialAnalytics, initialMarketing]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    const el = modalRef.current;
    if (!el) return;
    const focusables = getFocusables(el);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    el.addEventListener('keydown', handleKeyDown);
    return () => el.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSave = () => onSave(analyticsOn, marketingOn);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === overlayRef.current && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-light max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-light px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 id="cookie-modal-title" className="text-xl font-bold text-brand-black">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-gray-medium hover:bg-gray-light transition"
            aria-label={close}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="cookie-necessary"
              checked
              disabled
              className="mt-1 w-4 h-4 rounded border-gray-300 text-primary"
              aria-describedby="cookie-necessary-desc"
            />
            <div>
              <label htmlFor="cookie-necessary" className="font-medium text-brand-black">
                {necessary}
              </label>
              <p id="cookie-necessary-desc" className="text-sm text-gray-medium mt-0.5">
                {necessaryDesc}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="cookie-analytics"
              checked={analyticsOn}
              onChange={(e) => setAnalyticsOn(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              aria-describedby="cookie-analytics-desc"
            />
            <div>
              <label htmlFor="cookie-analytics" className="font-medium text-brand-black">
                {analytics}
              </label>
              <p id="cookie-analytics-desc" className="text-sm text-gray-medium mt-0.5">
                {analyticsDesc}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="cookie-marketing"
              checked={marketingOn}
              onChange={(e) => setMarketingOn(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              aria-describedby="cookie-marketing-desc"
            />
            <div>
              <label htmlFor="cookie-marketing" className="font-medium text-brand-black">
                {marketing}
              </label>
              <p id="cookie-marketing-desc" className="text-sm text-gray-medium mt-0.5">
                {marketingDesc}
              </p>
            </div>
          </div>
        </div>
        <div className="px-6 pb-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-accent-red transition"
          >
            {save}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 border border-gray-medium text-brand-black font-medium rounded-lg hover:bg-gray-light transition"
          >
            {close}
          </button>
        </div>
      </div>
    </div>
  );
}
