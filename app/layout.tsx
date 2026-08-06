import type { Metadata } from "next";
import { Domine, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const domine = Domine({
  variable: "--font-domine",
  subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tribe Motors",
  description: "Premium Pre-Owned Excellence",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`light ${domine.variable} ${hankenGrotesk.variable} h-full antialiased`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="">{children}</body>
    </html>
  );
}
