// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#06060a',
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KorvaAI — Your AI-Powered Web Agency',
  description:
    'KorvaAI builds stunning, high-performance websites powered by artificial intelligence. Go live in days, not months.',
  keywords: ['AI agency', 'web design', 'AI website builder', 'Next.js agency'],
  openGraph: {
    title: 'KorvaAI — Your AI-Powered Web Agency',
    description: 'KorvaAI builds stunning, high-performance websites powered by artificial intelligence.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* Subtle film grain overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
