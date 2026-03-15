'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, Zap, Rocket } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery',
    description:
      'Tell us about your business in plain English. No brief, no lengthy forms. A 15-minute call is all we need.',
  },
  {
    number: '02',
    icon: Zap,
    title: 'Demo in 24h',
    description:
      'Receive a fully interactive design demo within 24 hours. Request unlimited changes until it is exactly right.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Launch & Scale',
    description:
      'Go live on a global edge network. We manage everything from there — updates, performance, and AI agents.',
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="how-it-works"
      className="relative py-24 px-6 bg-surface"
      aria-labelledby="how-it-works-heading"
    >
      {/* Top / bottom borders */}
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-border" />
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-px bg-border" />

      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glow-pill text-xs font-medium mb-4 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-light" aria-hidden="true" />
            How It Works
          </div>
          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight"
          >
            From idea to{' '}
            <span className="text-gradient">live site</span>
            {' '}in days.
          </h2>
        </motion.div>

        {/* Steps grid */}
        <div className="relative">
          {/* Mobile vertical connector */}
          <div className="lg:hidden absolute left-[26px] top-8 bottom-8 w-px bg-border" aria-hidden="true" />

          <div className="grid lg:grid-cols-3 gap-10 lg:gap-8 relative">
            {/* Desktop horizontal connector */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-[52px] left-[16.5%] right-[16.5%] h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.4) 20%, rgba(37,99,235,0.4) 80%, transparent)' }}
            />

            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 28 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12, ease }}
                  className="relative flex gap-5 lg:flex-col lg:gap-0 lg:text-center"
                >
                  {/* Icon circle (acts as the timeline node) */}
                  <div className="flex-shrink-0 relative z-10 w-14 h-14 lg:mx-auto rounded-full bg-surface-2 border border-border-bright flex items-center justify-center lg:mb-6">
                    <Icon size={22} className="text-primary-light" aria-hidden="true" />
                  </div>

                  <div className="lg:px-2">
                    {/* Decorative number */}
                    <div className="text-5xl font-black leading-none mb-2 lg:mb-3" style={{ color: 'rgba(37,99,235,0.12)' }} aria-hidden="true">
                      {step.number}
                    </div>
                    <h3 className="text-text-primary font-bold text-xl mb-2">{step.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
