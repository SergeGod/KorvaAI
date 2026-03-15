'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const testimonials = [
  {
    quote:
      'KorvaAI delivered a website that truly reflects the prestige of our brand. The process was fast, professional, and the result exceeded our expectations.',
    author: 'Emballage',
    role: 'Jewellery Display Manufacturing, Dubai',
    initials: 'EM',
    real: true,
  },
  {
    quote:
      'Working with KorvaAI transformed our online presence completely. Their approach to AI-driven design is unlike anything we have experienced before.',
    author: 'Client Name',
    role: 'Industry, Location',
    initials: 'CL',
    real: false,
  },
  {
    quote:
      'The monthly management plan means we never worry about our website again. It is always fast, updated, and converting new clients.',
    author: 'Client Name',
    role: 'Industry, Location',
    initials: 'CL',
    real: false,
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="#F59E0B" aria-hidden="true">
          <path d="M8 1l1.796 3.64 4.017.584-2.907 2.831.686 3.997L8 10.147l-3.592 1.905.686-3.997L2.187 5.224l4.017-.584L8 1z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="testimonials"
      className="relative py-24 px-6 bg-background"
      aria-labelledby="testimonials-heading"
    >
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glow-pill text-xs font-medium mb-4 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-light" aria-hidden="true" />
            Client Stories
          </div>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight"
          >
            Trusted by{' '}
            <span className="text-gradient">ambitious businesses.</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className={`glass-card rounded-2xl p-7 flex flex-col ${!t.real ? 'opacity-50' : ''}`}
            >
              {!t.real && (
                <div className="mb-3">
                  <span className="text-xs text-text-muted border border-border px-2 py-0.5 rounded-full">
                    More reviews coming soon
                  </span>
                </div>
              )}
              <Stars />
              <blockquote className="text-text-secondary text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-light text-xs font-bold">{t.initials}</span>
                </div>
                <div>
                  <div className="text-text-primary font-semibold text-sm">{t.author}</div>
                  <div className="text-text-muted text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
