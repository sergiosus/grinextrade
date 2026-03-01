import type { Locale } from '@/lib/i18n/config';

export type LocalizedString = Record<Locale, string>;

export interface Product {
  id: string;
  image: string;
  name: LocalizedString;
  description: LocalizedString;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  image: string;
  name: LocalizedString;
  description: LocalizedString;
  category: string;
}
