'use client';

import { useQuoteModal } from '@/contexts/QuoteModalContext';

type Props = { label: string };

export function ProductsCTA({ label }: Props) {
  const { openQuoteModal } = useQuoteModal();

  return (
    <div className="flex justify-center mt-10">
      <button
        type="button"
        onClick={() => openQuoteModal()}
        className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-accent-red shadow-md hover:shadow-lg transition"
      >
        {label}
      </button>
    </div>
  );
}
