'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

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

export default function WhyUs() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="why-us"
      className="relative py-28 px-6 overflow-hidden"
      aria-labelledby="why-us-heading"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37,99,235,0.07) 0%, transparent 70%)',
        }}
      />

      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1a1a1a] bg-[#0f0f0f] text-sm text-white mb-6 select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" aria-hidden="true" />
            Why Us
          </motion.div>

          <motion.h2
            id="why-us-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-5"
          >
            Why Choose Our AI Agency?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="text-[#6b7280] text-lg max-w-2xl mx-auto leading-relaxed"
          >
            We combine the intelligence of AI with the judgment of experienced designers to deliver websites
            that perform — at a fraction of the cost and time.
          </motion.p>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease }}
          className="grid grid-cols-2 md:grid-cols-4 border border-[#1a1a1a] rounded-xl bg-[#0f0f0f] mb-10 divide-x divide-y md:divide-y-0 divide-[#1a1a1a] overflow-hidden"
        >
          {stats.map((stat, i) => (
            <div key={stat.value} className="flex flex-col items-center text-center px-6 py-8">
              <span className="text-3xl sm:text-4xl font-black text-gradient mb-1">{stat.value}</span>
              <span className="text-white text-sm font-semibold mb-1">{stat.label}</span>
              <span className="text-[#6b7280] text-xs leading-relaxed">{stat.sub}</span>
            </div>
          ))}
        </motion.div>

        {/* Reason cards 2x2 */}
        <div className="grid sm:grid-cols-2 gap-5">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease }}
              className="group rounded-xl p-6 border border-[#1a1a1a] bg-[#0f0f0f] card-hover cursor-default"
            >
              {/* Blue accent line */}
              <div className="w-8 h-0.5 bg-[#2563EB] mb-4 rounded-full group-hover:w-12 transition-all duration-300" />
              <h3 className="text-white font-semibold text-base mb-2">{reason.title}</h3>
              <p className="text-[#6b7280] text-sm leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
