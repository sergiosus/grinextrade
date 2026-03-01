import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, getLocaleFromBrowser } from '@/lib/i18n/config';

const localePathRegex = /^\/(en|ru|ar|zh|tr|ro|kk)(\/|$)/;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip static files and api
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/admin')
  ) {
    return NextResponse.next();
  }

  const hasLocale = localePathRegex.test(pathname);
  if (hasLocale) {
    return NextResponse.next();
  }

  // Root: redirect based on Accept-Language
  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language');
    const locale = getLocaleFromBrowser(acceptLanguage);
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // Unknown path without locale: assume default
  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
