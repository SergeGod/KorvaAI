'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

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

        {/* Single real testimonial — centered */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="max-w-lg mx-auto"
        >
          <div className="glass-card rounded-2xl p-8 flex flex-col">
            <Stars />
            <blockquote className="text-text-secondary text-sm leading-relaxed flex-1 mb-6">
              &ldquo;KorvaAI delivered a website that truly reflects the prestige of our brand.
              The process was fast, professional, and the result exceeded our expectations.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-light text-xs font-bold">EM</span>
              </div>
              <div>
                <div className="text-text-primary font-semibold text-sm">Emballage</div>
                <div className="text-text-muted text-xs">Jewellery Display Manufacturing, Dubai</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Coming soon line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease }}
          className="mt-8 text-center text-text-muted text-sm italic"
        >
          More success stories coming soon.
        </motion.p>
      </div>
    </section>
  )
}
