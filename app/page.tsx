import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import WhatWeDo from '@/components/sections/WhatWeDo'
import HowItWorks from '@/components/sections/HowItWorks'
import StatsBar from '@/components/sections/StatsBar'
import Portfolio from '@/components/sections/Portfolio'
import Industries from '@/components/sections/Industries'
import Testimonials from '@/components/sections/Testimonials'
import AuditSection from '@/components/sections/AuditSection'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import FinalCTA from '@/components/sections/FinalCTA'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'KorvaAI — AI-Powered Web Agency | Madrid',
  description:
    'KorvaAI builds premium websites and AI automation systems for high-ticket businesses worldwide. Get your free design preview in 24 hours. Based in Madrid.',
  openGraph: {
    title: 'KorvaAI — AI-Powered Web Agency | Madrid',
    description:
      'Premium websites and AI automation for high-ticket businesses. Free design preview in 24 hours.',
    type: 'website',
    url: 'https://korva.es',
    siteName: 'KorvaAI',
  },
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <WhatWeDo />
      <HowItWorks />
      <StatsBar />
      <Portfolio />
      <Industries />
      <Testimonials />
      <AuditSection />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
