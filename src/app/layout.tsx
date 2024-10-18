import { DM_Serif_Text, Raleway } from 'next/font/google'
import localFont from "next/font/local";
import type { Metadata } from "next";
import { Suspense } from 'react';

import "./globals.css";

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
      path: './fonts/TTHoves-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/TTHoves-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/TTHoves-DemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/TTHoves-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/TTHoves-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  fallback: ['Arial', 'sans-serif'],
  variable: '--font-tt-hoves',
})

export const metadata: Metadata = {
  title: "DigiFinland participation",
  description: "DigiFinland custom built UI for Polis participation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi">
      <body className={`${tt_hoves.variable} ${dm_serif.variable} ${raleway.variable} antialiased mx-auto text-left px-6 py-14 max-w-screen-sm`}>
        <Suspense fallback={<p>laddar</p>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
