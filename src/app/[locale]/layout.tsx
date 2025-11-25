import { DM_Serif_Text, Raleway } from 'next/font/google'
import localFont from "next/font/local";
import type { Metadata } from "next";
import { Suspense } from 'react';
import { headers } from 'next/headers';
import i18nConfig from './../../../i18n-config';
import { isDomainAllowedForFont } from '@/lib/font-licensing';

import "@/globals.css";

function getFontPermissions(): { allowTTHoves: boolean; allowGoogleFonts: boolean; allowHelsinkiGrotesk: boolean } {
  try {
    const headersList = headers();
    const hostname = headersList.get('host') || '';

    return {
      allowTTHoves: isDomainAllowedForFont(hostname, 'tt-hoves'),
      allowGoogleFonts: isDomainAllowedForFont(hostname, 'google-fonts'),
      allowHelsinkiGrotesk: isDomainAllowedForFont(hostname, 'helsinki-grotesk'),
    };
  } catch {
    // Fallback during build time - allow all fonts
    return { allowTTHoves: true, allowGoogleFonts: true, allowHelsinkiGrotesk: true };
  }
}

// Initialize Google Fonts (conditionally loaded in component)
const dm_serif = DM_Serif_Text({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-dm-serif',
})

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
})

// Initialize TT Hoves font (conditionally loaded in component)
const tt_hoves = localFont({
  src: [
    {
      path: './../fonts/TTHoves-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './../fonts/TTHoves-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './../fonts/TTHoves-DemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './../fonts/TTHoves-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './../fonts/TTHoves-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  fallback: ['Arial', 'sans-serif'],
  variable: '--font-tt-hoves',
})

export const metadata: Metadata = {
  title: "DigiFinland Polis",
  description: "DigiFinland custom built UI for Polis participation",
};

export async function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const fontPermissions = getFontPermissions();

  // Build font classes based on licensing permissions
  const fontClasses = [
    fontPermissions.allowTTHoves ? tt_hoves.variable : '',
    fontPermissions.allowGoogleFonts ? dm_serif.variable : '',
    fontPermissions.allowGoogleFonts ? raleway.variable : '',
  ].filter(Boolean).join(' ');
  return (
    <html lang={params.locale}>
      <body className={`${fontClasses} bg-theme-surface-primary antialiased text-left m-0 h-full min-h-screen flex flex-col`}>
          <Suspense fallback={<h1 className="text-primary text-3xl font-primary font-bold mx-auto mt-xl">Ladataan sovellusta.</h1>}>
            {children}
          </Suspense>
      </body>
    </html>
  );
}

