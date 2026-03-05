'use client';

import { useState } from 'react';
import type { Translations } from '@/lib/i18n/translations';
import { CountrySelect } from '@/components/CountrySelect';

const RFQ_EMAIL = 'info@grinextrade.com';
const RFQ_SUBJECT = 'Quote request — Grinex Trade LLC';

type Props = { translations: Translations; initialProductName?: string };

export function ContactForm({ translations: t, initialProductName = '' }: Props) {
  const [company, setCompany] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [productName, setProductName] = useState(initialProductName);
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'rfqSuccess'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
  };

  const handleRequestQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      t.contact.companyName + ': ' + company,
      t.contact.contactPerson + ': ' + contactPerson,
      t.contact.email + ': ' + email,
      t.contact.phone + ': ' + phone,
      t.contact.country + ': ' + country,
      t.contact.productName + ': ' + productName,
      t.contact.quantity + ': ' + quantity,
      t.contact.message + ': ' + message,
    ].join('\n');
    window.location.href = `mailto:${RFQ_EMAIL}?subject=${encodeURIComponent(RFQ_SUBJECT)}&body=${encodeURIComponent(body)}`;
    setStatus('rfqSuccess');
  };

  const contactLabels = t.contact;
  const common = t.common;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === 'success' && (
        <p className="p-3 rounded-lg bg-green-100 text-green-800 text-sm">{common.formSuccess}</p>
      )}
      {status === 'rfqSuccess' && (
        <p className="p-3 rounded-lg bg-green-100 text-green-800 text-sm">{common.rfqSuccess}</p>
      )}
      {status === 'error' && (
        <p className="p-3 rounded-lg bg-red-100 text-red-800 text-sm">{common.formError}</p>
      )}
      <div>
        <label className="block text-sm font-medium text-brand-black mb-1">{contactLabels.companyName}</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-brand-black mb-1">{contactLabels.contactPerson}</label>
        <input
          type="text"
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-brand-black mb-1">{contactLabels.email}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-black mb-1">{contactLabels.phone}</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-brand-black mb-1">{contactLabels.country}</label>
        <CountrySelect
          value={country}
          onChange={setCountry}
          placeholder={t.quoteModal.countryPlaceholder}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-brand-black mb-1">{contactLabels.productName}</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder={contactLabels.productName}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-brand-black mb-1">{contactLabels.quantity}</label>
        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="e.g. 1000 pcs"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-brand-black mb-1">{contactLabels.message}</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-medium/30 focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-accent-red transition"
        >
          {contactLabels.sendRequest}
        </button>
        <button
          type="button"
          onClick={handleRequestQuote}
          className="px-6 py-2.5 bg-brand-black text-white font-medium rounded-lg hover:bg-gray-800 transition"
        >
          {contactLabels.requestQuote}
        </button>
      </div>
    </form>
  );
}
