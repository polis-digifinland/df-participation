import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import i18nConfig from "../i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { getFontTypeFromPath, isDomainAllowedForFont } from "./app/lib/font-licensing";

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = i18nConfig.locales;

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  );

  const locale = matchLocale(languages, locales, i18nConfig.defaultLocale);

  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hostname = request.headers.get('host') || '';

  //console.log('Middleware running on path: ', pathname)

  // Block font requests from unauthorized domains
  if (pathname.startsWith('/_next/static/media/') &&
      (pathname.includes('.woff') || pathname.includes('.woff2') ||
      pathname.includes('.ttf') || pathname.includes('.otf') ||
      pathname.includes('.eot'))) {

    const fontType = getFontTypeFromPath(pathname);

    if (!isDomainAllowedForFont(hostname, fontType)) {
      return new NextResponse(`Font access denied for ${fontType}`, { status: 403 });
    }
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18nConfig.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /7cyducbwmr/df
    // The new URL is now /fi/7cyducbwmr/df
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url,
      ),
    );
  }

  // Add pathname to headers for server components
  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);
  return response;
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, `favicon.ico`, `icon.png`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.png).*)"],
};

