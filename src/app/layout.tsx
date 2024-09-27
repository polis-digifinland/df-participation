import type { Metadata } from "next";
import { DM_Serif_Text, Raleway } from 'next/font/google'
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header"
import Conversation from "./components/Conversation"
import ProgressBar from "./components/ProgressBar"
import Cards from "./components/Cards"
import Suggestions from "./components/Suggestions"
import Results from "./components/Results"
import Footer from "./components/Footer"

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
    <html lang="en" data-theme="df">
      <body className={`${tt_hoves.variable} ${dm_serif.variable} ${raleway.variable} antialiased mx-auto text-left px-6 py-14 max-w-screen-sm`}>
        {children}
        <Header />
        <main>
            <Conversation />
            <ProgressBar />
            <Cards />
            <Suggestions />
            <Results />
        </main>
        <Footer />
      </body>
    </html>
  );
}
