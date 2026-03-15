import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import HowItWorks from '@/components/sections/HowItWorks'
import WhatWeDo from '@/components/sections/WhatWeDo'
import WhyUs from '@/components/sections/WhyUs'
import Pricing from '@/components/sections/Pricing'
import FinalCTA from '@/components/sections/FinalCTA'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'KorvaAI — Your AI-Powered Web Agency',
  description:
    'We build modern, intelligent websites and automation systems that help businesses scale faster.',
  openGraph: {
    title: 'KorvaAI — Your AI-Powered Web Agency',
    description:
      'We build modern, intelligent websites and automation systems that help businesses scale faster.',
    type: 'website',
    url: 'https://korva.es',
    siteName: 'KorvaAI',
  },
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#080808] overflow-x-hidden">
      <Navbar />
      <Hero />
      <HowItWorks />
      <WhatWeDo />
      <WhyUs />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  )
}
