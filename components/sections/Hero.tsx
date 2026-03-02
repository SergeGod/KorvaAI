// components/sections/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import MoleculeField from '@/components/effects/MoleculeField'

// cubic-bezier typed as const tuple for Framer Motion v12
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Particle / molecule canvas — z-0 */}
      <MoleculeField
        density={7}
        speed={0.32}
        linkDistance={145}
        interactionStrength={0.045}
        particleColor="#BFDBFE"
        lineColor="#2563EB"
      />

      {/* Radial glow behind headline — z-1 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(37,99,235,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Bottom fade to next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 z-[1]"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #0A0F1C 100%)',
        }}
      />

      {/* Content — z-10 */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glow-pill text-xs font-medium mb-8 select-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse" />
          AI-Powered Web Agency
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.06] tracking-tight text-text-primary mb-6"
        >
          Designed as an Experience.{' '}
          <span className="text-gradient">Engineered for Growth.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease, delay: 0.32 }}
          className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We build modern, intelligent websites and automation systems that help
          businesses scale faster.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease, delay: 0.44 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#cta"
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold text-sm transition-all duration-200 hover:shadow-glow-md hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Book a Free Demo
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border-bright hover:border-primary/50 text-text-secondary hover:text-text-primary text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View Our Work
          </a>
        </motion.div>

      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-text-muted text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-border-bright flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  )
}
