import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AmenityAI — Intelligence that works while you sleep',
  description:
    'AmenityAI builds cutting-edge websites and deploys autonomous AI agents that automate your critical workflows 24/7.',
  keywords: ['AI agents', 'website creation', 'AI receptionist', 'automation', 'Madrid'],
  authors: [{ name: 'AmenityAI' }],
  openGraph: {
    title: 'AmenityAI',
    description: 'Intelligence that works while you sleep.',
    siteName: 'AmenityAI',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  )
}
