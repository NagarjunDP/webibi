import React from "react"
import type { Metadata } from 'next'
import { Syne, DM_Sans, Playfair_Display, DM_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/context/AuthContext'
import './globals.css'

const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400", "500", "600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", weight: ["400", "500", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "700", "900"] });
const dmMono = DM_Mono({ subsets: ["latin"], variable: "--font-dm-mono", weight: ["400", "500"] });

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://digitalempire.studio';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Webibi | Website Design + SEO Agency for Indian Startups",
  description: "Webibi builds affordable, high-performance websites and SEO strategies for Indian startups and businesses. 14-day delivery, 100% ownership, no monthly fees. Ranked #1 for results.",
  keywords: [
    "web design agency India",
    "affordable website design for startups",
    "SEO agency for small business India",
    "website development Hyderabad",
    "website design Mumbai",
    "Next.js agency India",
    "Google ranking website India",
    "web design for startups India",
    "affordable web design India",
    "14 day website delivery"
  ],
  authors: [{ name: 'Webibi Studio' }],
  creator: 'Webibi Studio',
  publisher: 'Webibi Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Webibi | Website Design + SEO Agency for Indian Startups',
    description: 'Affordable, high-performance websites and SEO for Indian startups. 14-day delivery. 100% ownership. No retainers.',
    url: '/',
    siteName: 'Webibi Studio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Webibi - Building Digital Presence',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webibi | Website Design + SEO Agency for Indian Startups',
    description: 'High-performance websites and SEO for Indian SMBs. No retainers, full ownership, affordable pricing.',
    creator: '@webibistudio',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Webibi",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": "Boutique web design + SEO agency for Indian startups.",
    "sameAs": [
      "https://twitter.com/webibistudio",
      "https://linkedin.com/company/webibistudio"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-555-0123",
      "contactType": "customer service"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Website Design & Development",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Webibi"
    },
    "description": "Bespoke, fast-loading sites in Next.js & React"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "SEO & Google Rankings",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Webibi"
    },
    "description": "Rank on page 1 with technical + content SEO"
  }
];

export const viewport = {
  themeColor: '#0A0A0A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className={`${syne.variable} ${dmSans.variable} ${playfair.variable} ${dmMono.variable} font-body antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
