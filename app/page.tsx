// app/page.tsx
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import ThreeSteps from '@/components/sections/ThreeSteps'
import Features from '@/components/sections/Features'
import WhyChoose from '@/components/sections/WhyChoose'
import CTASection from '@/components/sections/CTASection'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <ThreeSteps />
      <Features />
      <WhyChoose />
      <CTASection />
      <Footer />
    </main>
  )
}
