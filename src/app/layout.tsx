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
  title: "Dreal1zation_ | Experimental Electronic Music",
  description: "Dreal1zation_ - Experimental electronic music from Amsterdam. Sonic landscapes between organic and artificial. Pittsburgh → San Diego → Amsterdam.",
  keywords: ["Dreal1zation", "experimental music", "electronic music", "Amsterdam music", "experimental electronic", "ambient", "glitch", "producer", "Milo Lomas", "SoundCloud artist"],
  authors: [{ name: "Dreal1zation_" }],
  creator: "Dreal1zation_",
  publisher: "Dreal1zation_",
  metadataBase: new URL("https://xwhysi.com"),
  alternates: {
    canonical: "https://xwhysi.com",
  },
  openGraph: {
    title: "Dreal1zation_ | Experimental Electronic Music",
    description: "Sonic landscapes between organic and artificial. Pittsburgh → San Diego → Amsterdam.",
    url: "https://xwhysi.com",
    siteName: "Dreal1zation_",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dreal1zation_ | Experimental Electronic Music",
    description: "Sonic landscapes between organic and artificial. Pittsburgh → San Diego → Amsterdam.",
    creator: "@dreal1zation_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_token",
  },
  category: "music",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Dreal1zation_",
  alternateName: "Milo Lomas",
  description: "Experimental electronic music from Amsterdam. Sonic landscapes between organic and artificial.",
  url: "https://xwhysi.com",
  genre: ["Experimental", "Electronic", "Ambient", "Glitch"],
  foundingLocation: {
    "@type": "Place",
    name: "Pittsburgh, PA",
  },
  location: {
    "@type": "Place",
    name: "Amsterdam, Netherlands",
  },
  sameAs: [
    "https://soundcloud.com/drealization",
    "https://instagram.com/dreal1zation_",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
