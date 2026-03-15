'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ChevronDown } from 'lucide-react'

// Dynamically imported with SSR disabled — Three.js requires browser APIs
const BlackHoleCanvas = dynamic(
  () => import('@/components/BlackHole/BlackHoleCanvas').then((m) => m.BlackHoleCanvas),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black" />,
  }
)

const STAGGER = 0.15

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay },
})

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToNext = () => {
    sectionRef.current?.nextElementSibling?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* ── WebGL Black Hole Background ──────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <BlackHoleCanvas />
      </div>

      {/* ── Dark vignette edges to keep UI readable ──────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      {/* ── Hero Content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 select-none">
        {/* Eyebrow label */}
        <motion.p
          {...fadeUp(0)}
          className="mb-5 text-xs font-semibold tracking-[0.25em] uppercase text-amber-500/80"
        >
          AI-Powered Agency
        </motion.p>

        {/* Company name */}
        <motion.h1
          {...fadeUp(STAGGER)}
          className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-none text-white"
          style={{
            textShadow: '0 0 60px rgba(245,158,11,0.18), 0 0 120px rgba(245,158,11,0.08)',
          }}
        >
          AmenityAI
        </motion.h1>

        {/* Tagline */}
        <motion.p
          {...fadeUp(STAGGER * 2)}
          className="mt-6 text-base sm:text-lg md:text-xl font-light tracking-wide text-white/55"
          style={{ letterSpacing: '0.06em' }}
        >
          Intelligence that works while you sleep.
        </motion.p>

        {/* CTA */}
        <motion.div
          {...fadeUp(STAGGER * 3)}
          className="mt-10"
        >
          <Button size="lg" onClick={scrollToContact}>
            Book a Demo
          </Button>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5
                   text-white/30 hover:text-white/70 transition-colors cursor-pointer group"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown
          size={18}
          className="animate-bounce group-hover:text-amber-400/80 transition-colors"
        />
      </motion.button>
    </section>
  )
}
