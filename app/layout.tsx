import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LoadingScreen from '@/components/ui/LoadingScreen'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export const viewport: Viewport = {
  themeColor: '#080808',
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KorvaAI — AI-Powered Web Agency | Madrid',
  description:
    'KorvaAI builds premium websites and AI automation systems for high-ticket businesses worldwide. Get your free design preview in 24 hours. Based in Madrid.',
  keywords: ['AI web agency', 'web design Madrid', 'AI automation', 'premium websites', 'Next.js agency', 'KorvaAI'],
  openGraph: {
    title: 'KorvaAI — AI-Powered Web Agency | Madrid',
    description:
      'Premium websites and AI automation for high-ticket businesses. Free design preview in 24 hours.',
    type: 'website',
    url: 'https://korva.es',
    siteName: 'KorvaAI',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KorvaAI — AI-Powered Web Agency | Madrid',
    description: 'Premium websites and AI automation for high-ticket businesses.',
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
        <div className="noise-overlay" aria-hidden="true" />
        <LoadingScreen />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
