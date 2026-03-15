'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Monitor, RefreshCw, Bot } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const cards = [
  {
    icon: Monitor,
    title: 'Website Design',
    description:
      'Custom, conversion-optimised websites built to reflect your brand and turn visitors into clients. Beautiful on every device.',
    accent: 'border-t-primary',
  },
  {
    icon: RefreshCw,
    title: 'Monthly Management',
    description:
      'We handle every update, modification, and security patch. You focus on running your business — we keep your site perfect.',
    accent: 'border-t-primary-light',
  },
  {
    icon: Bot,
    title: 'AI Agents & Automation',
    description:
      'Intelligent agents that qualify leads, answer enquiries, and book calls automatically — running 24/7 with zero downtime.',
    accent: 'border-t-accent',
  },
]

export default function WhatWeDo() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="what-we-do"
      className="relative py-24 px-6 bg-background"
      aria-labelledby="what-we-do-heading"
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
            What We Do
          </div>
          <h2
            id="what-we-do-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight"
          >
            Everything your business needs{' '}
            <span className="text-gradient">online.</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className={`glass-card rounded-2xl p-7 border-t-2 ${card.accent} hover:-translate-y-1 hover:shadow-glow-sm transition-all duration-300 group`}
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon size={20} className="text-primary-light" aria-hidden="true" />
                </div>
                <h3 className="text-text-primary font-bold text-lg mb-3">{card.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{card.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
