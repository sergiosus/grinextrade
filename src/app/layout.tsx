import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Grinex Trade – Export Company',
  description: 'Grinex Trade supplies industrial and textile products for international B2B clients.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
