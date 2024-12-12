import { DM_Serif_Text, Raleway } from 'next/font/google'
import localFont from "next/font/local";
import type { Metadata } from "next";
import { Suspense } from 'react';
import i18nConfig from './../../../i18n-config';

import "@/globals.css";

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
  return (
    <html lang={params.locale}>
      <body className={`${tt_hoves.variable} ${dm_serif.variable} ${raleway.variable} bg-theme-surface-primary antialiased text-left m-0 h-full min-h-screen flex flex-col`}>
          <Suspense fallback={<h1 className="text-primary text-3xl font-primary font-bold mx-auto mt-xl">Ladataan sovellusta.</h1>}>
            {children}
          </Suspense>
      </body>
    </html>
  );
}

