'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { Locale } from '@/lib/i18n/config';
import type { Translations } from '@/lib/i18n/translations';
import { CountrySelect } from '@/components/CountrySelect';

type QuoteModalContextValue = {
  openQuoteModal: (initialProduct?: string) => void;
};

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function useQuoteModal(): QuoteModalContextValue {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) throw new Error('useQuoteModal must be used within QuoteModalProvider');
  return ctx;
}

type ProviderProps = {
  children: ReactNode;
  locale: Locale;
  translations: Translations;
};

export function QuoteModalProvider({ children, locale, translations }: ProviderProps) {
  const [open, setOpen] = useState(false);
  const [initialProduct, setInitialProduct] = useState('');

  const openQuoteModal = useCallback((product?: string) => {
    setInitialProduct(product ?? '');
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal }}>
      {children}
      {open && (
        <QuoteModal
          initialProduct={initialProduct}
          onClose={close}
          locale={locale}
          translations={translations}
        />
      )}
    </QuoteModalContext.Provider>
  );
}

const WHATSAPP_URL = 'https://wa.me/79124475419';
const EMAIL = 'info@grinextrade.com';
const EMAIL_SUBJECT = 'Quote request — Grinex Trade LLC';

type ModalProps = {
  initialProduct: string;
  onClose: () => void;
  locale: Locale;
  translations: Translations;
};

function QuoteModal({ initialProduct, onClose, locale, translations }: ModalProps) {
  const t = (translations as Translations & { quoteModal?: Record<string, string> }).quoteModal ?? {
    title: 'Request Quote',
    productLabel: 'Product',
    quantityLabel: 'Quantity',
    requestQuoteButton: 'REQUEST QUOTE',
    companyName: 'Company name',
    contactPerson: 'Contact person',
    email: 'Email',
    phone: 'Phone',
    country: 'Country',
    countryPlaceholder: 'Country',
    message: 'Message',
    sendViaWhatsApp: 'Send via WhatsApp',
    sendViaEmail: 'Send via Email',
    close: 'Close',
    toastDraft: 'Draft prepared. Send it in WhatsApp/Email.',
  };
  const rfqSuccess = (translations as Translations).common?.rfqSuccess ?? 'Thank you. Our sales team will contact you shortly.';

  const [product, setProduct] = useState(initialProduct);
  const [quantity, setQuantity] = useState('');
  const [company, setCompany] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const isProductReadonly = !!initialProduct;

  const quantityLabel = t.quantityLabel ?? 'Quantity';

  const buildBody = useCallback(() => {
    return [
      t.productLabel + ': ' + (product || '-'),
      quantityLabel + ': ' + quantity,
      t.companyName + ': ' + company,
      t.contactPerson + ': ' + contactPerson,
      t.email + ': ' + email,
      t.phone + ': ' + phone,
      t.country + ': ' + country,
      t.message + ': ' + message,
    ].join('\n');
  }, [t, product, quantity, quantityLabel, company, contactPerson, email, phone, country, message]);

  const buildWhatsAppText = useCallback(() => {
    return encodeURIComponent(buildBody());
  }, [buildBody]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  }, []);

  const handleRequestQuote = () => {
    const body = buildBody();
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(body)}`;
    showToast(rfqSuccess);
    setTimeout(onClose, 2500);
  };

  const handleWhatsApp = () => {
    window.open(`${WHATSAPP_URL}?text=${buildWhatsAppText()}`, '_blank');
    showToast(t.toastDraft ?? 'Draft prepared. Send it in WhatsApp/Email.');
  };

  const handleEmail = () => {
    const body = buildBody();
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(body)}`;
    showToast(t.toastDraft ?? 'Draft prepared. Send it in WhatsApp/Email.');
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden />
        <div
          className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-gray-light max-h-[90vh] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-modal-title"
        >
          <div className="sticky top-0 bg-white border-b border-gray-light px-6 py-4 flex items-center justify-between">
            <h2 id="quote-modal-title" className="text-xl font-bold text-brand-black">
              {t.title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-gray-medium hover:bg-gray-light transition"
              aria-label={t.close}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form className="p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-brand-black mb-1">{t.productLabel}</label>
              <input
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                readOnly={isProductReadonly}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-medium/30 bg-gray-light/50 read-only:opacity-80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-black mb-1">{quantityLabel}</label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 1000 pcs"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-black mb-1">{t.companyName}</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-black mb-1">{t.contactPerson}</label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-black mb-1">{t.email}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-black mb-1">{t.phone}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-black mb-1">{t.country}</label>
              <CountrySelect
                value={country}
                onChange={setCountry}
                placeholder={t.countryPlaceholder}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-black mb-1">{t.message}</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={handleRequestQuote}
                className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-accent-red transition"
              >
                {t.requestQuoteButton ?? 'REQUEST QUOTE'}
              </button>
              <button
                type="button"
                onClick={handleWhatsApp}
                className="px-5 py-2.5 bg-[#25D366] text-white font-medium rounded-lg hover:opacity-90 transition"
              >
                {t.sendViaWhatsApp}
              </button>
              <button
                type="button"
                onClick={handleEmail}
                className="px-5 py-2.5 bg-brand-black text-white font-medium rounded-lg hover:opacity-90 transition"
              >
                {t.sendViaEmail}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-gray-medium text-brand-black font-medium rounded-lg hover:bg-gray-light transition"
              >
                {t.close}
              </button>
            </div>
          </form>
        </div>
      </div>
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[101] px-6 py-3 bg-primary text-white rounded-xl shadow-lg text-sm font-medium">
          {toastMessage}
        </div>
      )}
    </>
  );
}
