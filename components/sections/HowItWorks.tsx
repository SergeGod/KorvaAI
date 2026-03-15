'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const steps = [
  {
    number: '01',
    title: 'We Design with Precision',
    description:
      'We study your brand, audience, and goals — then craft a tailored design direction. Every pixel is intentional, every section built to engage and convert.',
  },
  {
    number: '02',
    title: 'We Deliver the Demo',
    description:
      'Within days you receive a fully interactive demo — real pages, real copy, real performance. Review it, request changes, and approve when it feels right.',
  },
  {
    number: '03',
    title: 'We Launch & Scale',
    description:
      'Go live on a global edge network with one click. We manage hosting, updates, and performance — while AI automation keeps your business running around the clock.',
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="how-it-works"
      className="relative py-28 px-6 overflow-hidden"
      aria-labelledby="how-it-works-heading"
    >
      {/* Subtle gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(37,99,235,0.06) 0%, transparent 70%)',
        }}
      />

      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1a1a1a] bg-[#0f0f0f] text-sm text-white mb-6 select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" aria-hidden="true" />
            The Process
          </motion.div>

          <motion.h2
            id="how-it-works-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-5"
          >
            Three Steps to Your Website.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="text-[#6b7280] text-lg max-w-2xl mx-auto leading-relaxed"
          >
            From idea to live website in as little as 48 hours. Our streamlined AI process removes
            bottlenecks and delivers quality at speed.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Desktop dashed connector */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-10 left-[calc(16.666%+2.5rem)] right-[calc(16.666%+2.5rem)] h-px"
            style={{
              background:
                'repeating-linear-gradient(90deg, rgba(37,99,235,0.5) 0px, rgba(37,99,235,0.5) 6px, transparent 6px, transparent 16px)',
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease }}
                className="flex flex-col items-start md:items-center text-left md:text-center"
              >
                {/* Circle with step number */}
                <div className="relative mb-6 flex-shrink-0">
                  <div className="w-20 h-20 rounded-full border border-[#1a1a1a] bg-[#0f0f0f] flex items-center justify-center">
                    <span className="text-2xl font-black text-gradient">{step.number}</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#2563EB] shadow-[0_0_10px_rgba(37,99,235,0.7)]" />
                </div>

                <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
