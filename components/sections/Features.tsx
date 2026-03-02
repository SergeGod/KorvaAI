// components/sections/Features.tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  {
    title: 'Website Design',
    description:
      'Custom, conversion-optimised websites built with precision. Responsive across every device, fast by default, and crafted to reflect your brand identity at every touchpoint.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="1" y="3" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M6 19h8M10 15v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M5 7h10M5 10h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Monthly Management',
    description:
      'We handle every update, performance audit, and security patch — so your site stays fast, secure, and aligned with your evolving business needs. Zero maintenance headaches.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'AI Agents & Automation',
    description:
      'Deploy intelligent agents that qualify leads, respond to enquiries, book calls, and trigger workflows — running 24/7 so your business scales without scaling your headcount.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="5" y="2" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 10v2m6-2v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M3 14h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="7" cy="16" r="0.8" fill="currentColor" />
        <circle cx="10" cy="16" r="0.8" fill="currentColor" />
        <circle cx="13" cy="16" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
]

function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group glass-card rounded-2xl p-6 hover:-translate-y-1 hover:border-border-bright transition-all duration-300 cursor-default relative overflow-hidden"
      style={{ boxShadow: '0 1px 0 rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.4)' }}
    >
      {/* Hover glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(37,99,235,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary-light mb-4 group-hover:bg-primary/18 transition-colors duration-300">
          {feature.icon}
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-text-primary mb-2">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function Features() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' })

  return (
    <section
      id="features"
      className="relative py-28 px-6 bg-surface"
      aria-labelledby="features-heading"
    >
      {/* Subtle gradient edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-border"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-border"
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-primary-light text-sm font-medium tracking-widest uppercase mb-3"
          >
            Features
          </motion.p>
          <motion.h2
            id="features-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight"
          >
            Everything Your Business{' '}
            <span className="text-gradient">Needs Online</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-4 text-text-secondary text-base sm:text-lg max-w-xl mx-auto"
          >
            A complete, managed web presence — from design and copy to hosting
            and analytics — without the agency price tag.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
