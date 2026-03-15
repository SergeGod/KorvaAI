'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background px-6 pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Gradient orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-60 top-1/4 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />
      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-48"
        style={{ background: 'linear-gradient(to top, #080808, transparent)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glow-pill text-xs font-medium mb-8 select-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse" aria-hidden="true" />
          Free design preview in 24 hours
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-text-primary leading-[1.04] tracking-tight mb-6"
        >
          Designed as an{' '}
          <span className="text-gradient">Experience.</span>
          <br />
          Engineered for{' '}
          <span className="text-gradient">Growth.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease }}
          className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          We build premium websites and AI automation systems for high-ticket businesses worldwide.
          Your demo is ready in 24 hours.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <a
            href="#final-cta"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-light text-white text-sm font-semibold transition-all duration-200 hover:shadow-glow-md hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Get Your Free Demo
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border-bright text-text-secondary hover:text-text-primary hover:border-primary/40 text-sm font-semibold transition-all duration-200 hover:bg-white/3"
          >
            <Play size={14} aria-hidden="true" />
            View Our Work
          </a>
        </motion.div>

        {/* Browser mockup */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.42, ease }}
          className="browser-mockup max-w-3xl mx-auto w-full"
        >
          {/* Browser chrome bar */}
          <div className="browser-mockup-bar">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
            </div>
            <div className="flex-1 mx-4 bg-background/60 rounded-md px-3 py-1 text-text-muted text-xs truncate">
              emballage-client-website.vercel.app
            </div>
          </div>
          {/* Live iframe of client site */}
          <iframe
            src="https://emballage-client-website.vercel.app"
            className="w-full border-0 bg-surface"
            style={{ height: '420px' }}
            title="KorvaAI client website preview — Emballage"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  )
}
