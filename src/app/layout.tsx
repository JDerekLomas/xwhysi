import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "XWHYSI",
  description: "Experimental music from Amsterdam. Pittsburgh roots. Sonic landscapes between the organic and the artificial.",
  keywords: ["music", "experimental", "electronic", "Amsterdam", "producer", "artist", "XWHYSI", "Milo Lomas"],
  authors: [{ name: "XWHYSI" }],
  openGraph: {
    title: "XWHYSI",
    description: "Experimental music from Amsterdam",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://w.soundcloud.com/player/api.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased noise scanlines vhs-tracking`}
      >
        {children}
      </body>
    </html>
  );
}
