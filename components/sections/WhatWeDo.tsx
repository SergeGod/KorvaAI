'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Monitor, Shield, Bot } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const cards = [
  {
    icon: Monitor,
    title: 'Website Design',
    description:
      'Custom, conversion-optimised websites built with precision. Responsive across every device, fast by default, and crafted to reflect your brand identity at every touchpoint.',
    glow: 'rgba(37,99,235,0.15)',
  },
  {
    icon: Shield,
    title: 'Monthly Management',
    description:
      'We handle every update, performance audit, and security patch — so your site stays fast, secure, and aligned with your evolving business needs. Zero maintenance headaches.',
    glow: 'rgba(124,58,237,0.15)',
  },
  {
    icon: Bot,
    title: 'AI Agents & Automation',
    description:
      'Deploy intelligent agents that qualify leads, respond to enquiries, book calls, and trigger workflows — running 24/7 so your business scales without scaling your headcount.',
    glow: 'rgba(37,99,235,0.15)',
  },
]

export default function WhatWeDo() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="features"
      className="relative py-28 px-6"
      aria-labelledby="features-heading"
    >
      {/* Top/bottom borders */}
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-[#1a1a1a]" />
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-px bg-[#1a1a1a]" />

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
            Features
          </motion.div>

          <motion.h2
            id="features-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-5"
          >
            Everything Your Business Needs Online.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="text-[#6b7280] text-lg max-w-2xl mx-auto leading-relaxed"
          >
            A complete, managed web presence — from design and copy to hosting and analytics — without the agency price tag.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease }}
                className="group relative rounded-xl p-7 border border-[#1a1a1a] bg-[#0f0f0f] card-hover cursor-default"
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl border border-[#2563EB]/20 bg-[#2563EB]/10 flex items-center justify-center mb-5 group-hover:bg-[#2563EB]/20 transition-colors duration-300"
                >
                  <Icon size={20} className="text-[#2563EB]" aria-hidden="true" />
                </div>

                <h3 className="text-white font-bold text-lg mb-3">{card.title}</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed">{card.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
