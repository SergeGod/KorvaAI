'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const TYPED_TEXT = 'Your headline goes here.'
const CHAR_INTERVAL = 55 // ms per character

// Sequence timing (ms after previous step completes)
const DELAYS = {
  toStep1: 500,   // nothing → navbar
  toStep2: 350,   // navbar → start typing
  toStep3: 250,   // typing done → images
  toStep4: 380,   // images → buttons
  toStep5: 380,   // buttons → cards
  pause:  1600,   // all shown → reset
}

function WebsiteBuilder() {
  const [step, setStep] = useState(0)
  const [typed, setTyped] = useState('')
  const [loopKey, setLoopKey] = useState(0)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    // Step 1 — navbar
    timers.push(setTimeout(() => setStep(1), DELAYS.toStep1))

    // Step 2 — begin typewriter
    const typingStart = DELAYS.toStep1 + DELAYS.toStep2
    timers.push(setTimeout(() => setStep(2), typingStart))

    // Typewriter: add one char at a time
    TYPED_TEXT.split('').forEach((_, i) => {
      timers.push(
        setTimeout(
          () => setTyped(TYPED_TEXT.slice(0, i + 1)),
          typingStart + i * CHAR_INTERVAL
        )
      )
    })

    const typingDone = typingStart + TYPED_TEXT.length * CHAR_INTERVAL

    // Step 3 — image placeholders
    timers.push(setTimeout(() => setStep(3), typingDone + DELAYS.toStep3))

    // Step 4 — buttons
    timers.push(setTimeout(() => setStep(4), typingDone + DELAYS.toStep3 + DELAYS.toStep4))

    // Step 5 — cards
    timers.push(
      setTimeout(
        () => setStep(5),
        typingDone + DELAYS.toStep3 + DELAYS.toStep4 + DELAYS.toStep5
      )
    )

    // Reset
    const totalDuration =
      typingDone + DELAYS.toStep3 + DELAYS.toStep4 + DELAYS.toStep5 + DELAYS.pause
    timers.push(
      setTimeout(() => {
        setStep(0)
        setTyped('')
        setLoopKey((k) => k + 1)
      }, totalDuration)
    )

    return () => timers.forEach(clearTimeout)
  }, [loopKey])

  return (
    <div className="browser-mockup max-w-3xl mx-auto w-full" aria-hidden="true">
      {/* Browser chrome bar */}
      <div className="browser-mockup-bar">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
        </div>
        <div className="flex-1 mx-4 bg-background/60 rounded-md px-3 py-1 text-text-muted text-xs truncate select-none">
          yourwebsite.com
        </div>
      </div>

      {/* Browser content */}
      <div
        key={loopKey}
        className="relative overflow-hidden"
        style={{ height: '300px', background: '#0d0d0d' }}
      >
        <div className="p-5 flex flex-col gap-4 h-full">

          {/* 1 — Mock navbar */}
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease }}
              className="flex items-center justify-between px-3 py-2 rounded-lg"
              style={{ background: '#141414', border: '1px solid #222' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded" style={{ background: '#2563EB' }} />
                <div className="h-2 w-14 rounded-full" style={{ background: '#333' }} />
              </div>
              <div className="hidden sm:flex gap-2">
                {[40, 32, 36].map((w, i) => (
                  <div key={i} className="h-1.5 rounded-full" style={{ width: w, background: '#333' }} />
                ))}
              </div>
              <div className="w-16 h-5 rounded" style={{ background: '#2563EB', opacity: 0.85 }} />
            </motion.div>
          )}

          {/* 2 — Typewriter headline */}
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease }}
              className="px-1"
            >
              <div className="text-white font-bold text-lg sm:text-xl leading-tight">
                {typed}
                {step === 2 && (
                  <span className="inline-block w-0.5 h-5 ml-0.5 align-middle animate-pulse" style={{ background: '#2563EB' }} />
                )}
              </div>
              <div className="mt-1.5 flex gap-1.5">
                {[80, 60, 70].map((w, i) => (
                  <div key={i} className="h-1.5 rounded-full" style={{ width: `${w}px`, background: '#2a2a2a' }} />
                ))}
              </div>
            </motion.div>
          )}

          {/* 3 — Image placeholder blocks */}
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, ease }}
              className="flex gap-3"
            >
              <div className="flex-1 rounded-lg" style={{ height: 64, background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-6 h-6 rounded" style={{ background: '#252525' }} />
                </div>
              </div>
              <div className="flex-1 rounded-lg" style={{ height: 64, background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-6 h-6 rounded" style={{ background: '#252525' }} />
                </div>
              </div>
            </motion.div>
          )}

          {/* 4 — Buttons */}
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="flex gap-2"
            >
              <div
                className="px-4 py-1.5 rounded-lg text-white text-xs font-semibold select-none"
                style={{ background: '#2563EB' }}
              >
                Get Started
              </div>
              <div
                className="px-4 py-1.5 rounded-lg text-xs font-semibold select-none"
                style={{ border: '1px solid #333', color: '#9CA3AF' }}
              >
                Learn More
              </div>
            </motion.div>
          )}

          {/* 5 — Cards */}
          {step >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="flex gap-2 flex-1"
            >
              {[
                { color: '#2563EB' },
                { color: '#3B82F6' },
                { color: '#60A5FA' },
              ].map((card, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-lg p-2.5 flex flex-col gap-1.5"
                  style={{ background: '#141414', border: '1px solid #222', borderTop: `2px solid ${card.color}` }}
                >
                  <div className="w-5 h-5 rounded" style={{ background: card.color, opacity: 0.3 }} />
                  <div className="h-1.5 rounded-full w-3/4" style={{ background: '#2a2a2a' }} />
                  <div className="h-1.5 rounded-full w-1/2" style={{ background: '#222' }} />
                </div>
              ))}
            </motion.div>
          )}

          {/* Subtle scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
            }}
          />
        </div>
      </div>
    </div>
  )
}

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

        {/* Animated website builder mockup */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.42, ease }}
        >
          <WebsiteBuilder />
        </motion.div>
      </div>
    </section>
  )
}
