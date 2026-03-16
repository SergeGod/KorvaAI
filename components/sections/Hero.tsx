'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const TYPED_TEXT = 'Build Something Better.'
const CHAR_INTERVAL = 55

const DELAYS = {
  toStep1: 400,
  toStep2: 350,
  toStep3: 250,
  toStep4: 360,
  toStep5: 360,
  pause: 1600,
}

function WebsiteBuilder() {
  const [step, setStep] = useState(0)
  const [typed, setTyped] = useState('')
  const [loopKey, setLoopKey] = useState(0)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    timers.push(setTimeout(() => setStep(1), DELAYS.toStep1))

    const typingStart = DELAYS.toStep1 + DELAYS.toStep2
    timers.push(setTimeout(() => setStep(2), typingStart))

    TYPED_TEXT.split('').forEach((_, i) => {
      timers.push(
        setTimeout(
          () => setTyped(TYPED_TEXT.slice(0, i + 1)),
          typingStart + i * CHAR_INTERVAL
        )
      )
    })

    const typingDone = typingStart + TYPED_TEXT.length * CHAR_INTERVAL
    timers.push(setTimeout(() => setStep(3), typingDone + DELAYS.toStep3))
    timers.push(setTimeout(() => setStep(4), typingDone + DELAYS.toStep3 + DELAYS.toStep4))
    timers.push(
      setTimeout(
        () => setStep(5),
        typingDone + DELAYS.toStep3 + DELAYS.toStep4 + DELAYS.toStep5
      )
    )

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
    <div
      className="browser-mockup max-w-3xl mx-auto w-full"
      aria-hidden="true"
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#111] border-b border-[#2a2a2a]">
        <div className="flex gap-1.5 flex-shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 bg-[#0f0f0f] rounded-md px-3 py-1.5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#2563EB] flex-shrink-0" />
          <span className="text-[10px] text-[#6b7280] font-mono tracking-wide truncate select-none">
            yourwebsite.com
          </span>
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
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="flex items-center justify-between px-3 py-2 rounded-lg"
              style={{ background: '#141414', border: '1px solid #1f1f1f' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-[#2563EB]" />
                <div className="h-1.5 w-14 rounded-full bg-[#2a2a2a]" />
              </div>
              <div className="hidden sm:flex gap-2">
                {[40, 32, 36].map((w, i) => (
                  <div key={i} className="h-1.5 rounded-full bg-[#2a2a2a]" style={{ width: w }} />
                ))}
              </div>
              <div className="w-16 h-5 rounded bg-[#2563EB] opacity-85" />
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
                  <span
                    className="inline-block w-0.5 h-5 ml-0.5 align-middle animate-blink"
                    style={{ background: '#2563EB' }}
                  />
                )}
              </div>
              <div className="mt-1.5 flex gap-1.5">
                {[80, 60, 70].map((w, i) => (
                  <div key={i} className="h-1.5 rounded-full bg-[#1f1f1f]" style={{ width: `${w}px` }} />
                ))}
              </div>
            </motion.div>
          )}

          {/* 3 — Image placeholders */}
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, ease }}
              className="flex gap-3"
            >
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="flex-1 rounded-lg flex items-center justify-center"
                  style={{ height: 64, background: '#141414', border: '1px solid #1f1f1f' }}
                >
                  <div className="w-6 h-6 rounded bg-[#1f1f1f]" />
                </div>
              ))}
            </motion.div>
          )}

          {/* 4 — Buttons */}
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              className="flex gap-2"
            >
              <div
                className="px-4 py-1.5 rounded-lg text-white text-xs font-semibold select-none"
                style={{ background: '#2563EB', boxShadow: '0 0 10px rgba(37,99,235,0.35)' }}
              >
                Get Started
              </div>
              <div
                className="px-4 py-1.5 rounded-lg text-xs font-semibold select-none text-[#6b7280]"
                style={{ border: '1px solid #2a2a2a' }}
              >
                Learn More
              </div>
            </motion.div>
          )}

          {/* 5 — Cards */}
          {step >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="flex gap-2 flex-1"
            >
              {[
                { color: '#2563EB' },
                { color: '#7c3aed' },
                { color: '#2563EB' },
              ].map((card, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-lg p-2.5 flex flex-col gap-1.5"
                  style={{
                    background: '#0f0f0f',
                    border: '1px solid #1f1f1f',
                    borderTop: `2px solid ${card.color}`,
                    boxShadow: `0 0 8px ${card.color}22`,
                  }}
                >
                  <div className="w-5 h-5 rounded" style={{ background: card.color, opacity: 0.35 }} />
                  <div className="h-1.5 rounded-full bg-[#1f1f1f] w-3/4" />
                  <div className="h-1.5 rounded-full bg-[#1a1a1a] w-1/2" />
                </div>
              ))}
            </motion.div>
          )}

          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 dot-grid"
      aria-labelledby="hero-heading"
    >
      {/* Top gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(37,99,235,0.2) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-48"
        style={{ background: 'linear-gradient(to top, #080808, transparent)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Pill label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1a1a1a] bg-[#0f0f0f] text-sm text-white mb-8 select-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" aria-hidden="true" />
          AI-Powered Web Agency
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.06] tracking-tight mb-6"
        >
          Designed as an Experience.
          <br />
          Engineered for{' '}
          <span className="text-gradient">Growth.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease }}
          className="text-[#6b7280] text-lg sm:text-xl max-w-[520px] mx-auto leading-relaxed mb-10"
        >
          We build modern, intelligent websites and automation systems that help businesses scale faster.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <a
            href="#contact-cta"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact-cta')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:-translate-y-0.5"
          >
            Book a Free Demo →
          </a>
          <a
            href="#features"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-white/15 text-white text-sm font-semibold transition-all duration-200 hover:border-white/30 hover:bg-white/5"
          >
            View Our Work
          </a>
        </motion.div>

        {/* Browser mockup */}
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
