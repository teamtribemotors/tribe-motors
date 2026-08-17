import type { Metadata } from "next";
import { Podkova, Inter } from "next/font/google";
import "./globals.css";

const podkova = Podkova({
  variable: "--font-podkova",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "Tribe Motors",
  description: "Premium Pre-Owned Excellence",
};

import type { Viewport } from "next";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import Tracker from './components/Tracker';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`light ${podkova.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-surface text-on-surface font-body-md text-body-md min-h-screen flex flex-col">
        <NuqsAdapter>
          {children}
        </NuqsAdapter>
        <Tracker />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
