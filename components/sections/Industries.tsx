'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Scissors, Building2, Factory, Gem, Scale, Stethoscope } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const industries = [
  { icon: Scissors, label: 'Hair Transplant Clinics', desc: 'Premium patient acquisition' },
  { icon: Building2, label: 'Real Estate', desc: 'Luxury property showcases' },
  { icon: Factory, label: 'Manufacturing', desc: 'B2B lead generation' },
  { icon: Gem, label: 'Luxury Brands', desc: 'High-end brand experiences' },
  { icon: Scale, label: 'Legal & Finance', desc: 'Trust-building authority sites' },
  { icon: Stethoscope, label: 'Medical & Aesthetic', desc: 'Patient-converting clinics' },
]

export default function Industries() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="industries"
      className="relative py-24 px-6 bg-surface"
      aria-labelledby="industries-heading"
    >
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-border" />
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-px bg-border" />

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
            Industries
          </div>
          <h2
            id="industries-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight"
          >
            Built for{' '}
            <span className="text-gradient">high-ticket industries.</span>
          </h2>
          <p className="mt-4 text-text-secondary text-base max-w-xl mx-auto">
            We specialise in sectors where a premium web presence directly converts to revenue.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {industries.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07, ease }}
                className="glass-card rounded-xl p-5 flex flex-col items-center text-center gap-3 hover:-translate-y-1 hover:shadow-glow-sm transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon size={22} className="text-primary-light" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-text-primary font-semibold text-sm">{item.label}</div>
                  <div className="text-text-muted text-xs mt-0.5">{item.desc}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
