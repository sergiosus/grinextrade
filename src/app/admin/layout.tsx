import type { ReactNode } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <Link href="/admin" className="font-bold text-lg">
            Grinex Trade — Admin
          </Link>
          <Link href="/en" className="text-sm text-slate-300 hover:text-white">
            View site
          </Link>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
