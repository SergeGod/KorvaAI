import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
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
  title: {
    default: 'KorvaAI — Your AI-Powered Web Agency',
    template: '%s | KorvaAI',
  },
  description:
    'We build modern, intelligent websites and automation systems that help businesses scale faster.',
  keywords: [
    'AI web agency',
    'web design',
    'AI automation',
    'intelligent websites',
    'Next.js agency',
    'KorvaAI',
  ],
  openGraph: {
    title: 'KorvaAI — Your AI-Powered Web Agency',
    description:
      'We build modern, intelligent websites and automation systems that help businesses scale faster.',
    type: 'website',
    url: 'https://korva.es',
    siteName: 'KorvaAI',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KorvaAI — Your AI-Powered Web Agency',
    description:
      'We build modern, intelligent websites and automation systems that help businesses scale faster.',
  },
  robots: {
    index: true,
    follow: true,
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
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
