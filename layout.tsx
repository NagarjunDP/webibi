import React from "react"
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/context/AuthContext'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: 'Digital Empire | Professional Websites for Small Businesses',
  description: 'Get a premium, SEO-optimized website with a powerful control panel. Affordable web development for small businesses with full ownership and no monthly fees.',
  keywords: [
    'Affordable website development',
    'Website for small business',
    'Business website with control panel',
    'SEO optimized website',
    'Website development company',
    'Website builder for small businesses'
  ],
  authors: [{ name: 'Digital Empire Studio' }],
  openGraph: {
    title: 'Digital Empire | Professional Websites for Small Businesses',
    description: 'Get a premium, SEO-optimized website with a powerful control panel. Affordable web development for small businesses.',
    type: 'website',
  },
  generator: 'v0.app'
}

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
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
