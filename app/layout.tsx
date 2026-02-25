import React from "react"
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/context/AuthContext'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: 'swap' });

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://digitalempire.studio';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Digital Empire | Affordable Premium Web Design for Indian Startups & SMBs',
    template: '%s | Digital Empire'
  },
  description: 'Top-rated affordable web design company in India. We build high-performance, SEO-ready websites for startups and small businesses with zero monthly retainers.',
  keywords: [
    'Affordable web design India',
    'Startup website development India',
    'Small business web design',
    'SEO friendly agency websites',
    'Budget website designer for startups',
    'Professional web design Delhi Mumbai Bangalore',
    'No monthly fee web design'
  ],
  authors: [{ name: 'Digital Empire Studio' }],
  creator: 'Digital Empire Studio',
  publisher: 'Digital Empire Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Digital Empire | Affordable Premium Web Design for Indian Startups',
    description: 'Empowering Indian SMBs and Startups with SEO-ready, mobile-responsive websites. Affordable quality with zero monthly retainers.',
    url: '/',
    siteName: 'Digital Empire',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Digital Empire - Premium Web Development',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Empire | Affordable Web Design for Indian Startups',
    description: 'SEO-ready, high-performance websites for Indian SMBs. No retainers, full ownership, affordable pricing.',
    creator: '@digitalempire',
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Digital Empire",
  "url": baseUrl,
  "logo": `${baseUrl}/logo.png`,
  "sameAs": [
    "https://twitter.com/digitalempire",
    "https://linkedin.com/company/digitalempire"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-0123",
    "contactType": "customer service"
  }
};

export const viewport = {
  themeColor: '#0f0f1a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
