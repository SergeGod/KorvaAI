// components/sections/WhyChoose.tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '10x', label: 'Faster Deployment', sub: 'Compared to traditional agencies' },
  { value: '24/7', label: 'Automated Systems', sub: 'Running while you sleep' },
  { value: '∞', label: 'Scalable Infrastructure', sub: 'Grows with your business' },
  { value: '100%', label: 'Client Focused', sub: 'Built around your goals' },
]

const reasons = [
  {
    title: 'No Design Brief Needed',
    description:
      'Our AI asks the right questions so you do not have to write a lengthy brief. Describe your business in plain English and we handle the rest.',
  },
  {
    title: 'Human-Level Quality',
    description:
      'AI handles the speed; our design team handles the taste. Every site is reviewed by a senior designer before launch.',
  },
  {
    title: 'Zero Lock-In',
    description:
      'Own your codebase, your domain, and your data. Export at any time — no vendor lock-in, ever.',
  },
  {
    title: 'Continuous Improvement',
    description:
      'Your site evolves with your business. AI-driven A/B testing and performance insights keep it converting over time.',
  },
]

function StatCard({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card rounded-2xl p-6 text-center hover:border-border-bright hover:-translate-y-0.5 transition-all duration-300 cursor-default"
      style={{ boxShadow: '0 1px 0 rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.4)' }}
    >
      <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
      <div className="text-sm font-medium text-text-primary mb-0.5">{stat.label}</div>
      <div className="text-xs text-text-muted">{stat.sub}</div>
    </motion.div>
  )
}

export default function WhyChoose() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' })
  const reasonsRef = useRef<HTMLDivElement>(null)
  const reasonsInView = useInView(reasonsRef, { once: true, margin: '-40px' })

  return (
    <section
      id="why-us"
      className="relative py-28 px-6"
      aria-labelledby="why-heading"
    >
      {/* Radial accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -right-40 top-1/3 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'rgba(37,99,235,0.07)' }}
        />
        <div
          className="absolute -left-40 bottom-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'rgba(96,165,250,0.05)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-primary-light text-sm font-medium tracking-widest uppercase mb-3"
          >
            Why KorvaAI
          </motion.p>
          <motion.h2
            id="why-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight"
          >
            Why Choose Our{' '}
            <span className="text-gradient">AI Agency?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-4 text-text-secondary text-base sm:text-lg max-w-xl mx-auto"
          >
            We combine the intelligence of AI with the judgment of experienced designers
            to deliver websites that perform — at a fraction of the cost and time.
          </motion.p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>

        {/* Reasons — 2-col grid */}
        <div
          ref={reasonsRef}
          className="grid sm:grid-cols-2 gap-5"
        >
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={reasonsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-4 glass-card rounded-2xl p-6 hover:border-border-bright transition-all duration-300 group cursor-default"
              style={{ boxShadow: '0 1px 0 rgba(255,255,255,0.04), 0 4px 16px rgba(0,0,0,0.35)' }}
            >
              {/* Check icon */}
              <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors duration-300">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="#3B82F6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-text-primary mb-1.5">{r.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{r.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
