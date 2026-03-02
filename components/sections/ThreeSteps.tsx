// components/sections/ThreeSteps.tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'We Design with Precision',
    description:
      'We study your brand, audience, and goals — then craft a tailored design direction. Every pixel is intentional, every section built to engage and convert.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path
          d="M3 17l4-4 3 3 7-8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="2" y="2" width="18" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'We Deliver the Demo',
    description:
      'Within days you receive a fully interactive demo — real pages, real copy, real performance. Review it, request changes, and approve when it feels right.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.9" />
        <rect x="12" y="3" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.6" />
        <rect x="3" y="12" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.6" />
        <rect x="12" y="12" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'We Launch & Scale',
    description:
      'Go live on a global edge network with one click. We manage hosting, updates, and performance — while AI automation keeps your business running around the clock.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path
          d="M11 3L4 10.5h4.5V19h5V10.5H18L11 3z"
          fill="currentColor"
        />
      </svg>
    ),
  },
]

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative glass-card rounded-2xl p-7 hover:-translate-y-1 hover:border-border-bright transition-all duration-300 cursor-default"
      style={{
        boxShadow: '0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.45)',
      }}
    >
      {/* Subtle top-edge glow on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Number + Icon row */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-4xl font-bold text-primary/20 leading-none select-none">
          {step.number}
        </span>
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary-light group-hover:bg-primary/20 transition-colors duration-300">
          {step.icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-text-primary mb-3 leading-snug">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-text-secondary leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  )
}

export default function ThreeSteps() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' })

  return (
    <section
      id="how-it-works"
      className="relative py-28 px-6"
      aria-labelledby="steps-heading"
    >
      {/* Faint grid dots */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 dot-grid opacity-30"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-primary-light text-sm font-medium tracking-widest uppercase mb-3"
          >
            The Process
          </motion.p>
          <motion.h2
            id="steps-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight"
          >
            Three Steps to{' '}
            <span className="text-gradient">Your Website</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16, ease: 'easeOut' }}
            className="mt-4 text-text-secondary text-base sm:text-lg max-w-2xl mx-auto"
          >
            From idea to live website in as little as 48 hours. Our streamlined
            AI process removes bottlenecks and delivers quality at speed.
          </motion.p>
        </div>

        {/* Connector line (desktop) */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-[calc(50%+40px)] w-[calc(100%-240px)] h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(37,99,235,0.3) 20%, rgba(37,99,235,0.3) 80%, transparent)',
          }}
        />

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
