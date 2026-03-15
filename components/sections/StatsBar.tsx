'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const stats = [
  { prefix: '', value: 24, suffix: 'h', label: 'Demo Delivery Time' },
  { prefix: '€', value: 600, suffix: '', label: 'Starting Price' },
  { prefix: '', value: 24, suffix: '/7', label: 'Automated Systems' },
  { prefix: '', value: 100, suffix: '%', label: 'Client Owned Code' },
]

function useCounter(target: number, duration: number, inView: boolean) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let rafId: number
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        setValue(target)
      }
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [inView, target, duration])

  return value
}

function StatItem({
  stat,
  index,
  inView,
}: {
  stat: (typeof stats)[0]
  index: number
  inView: boolean
}) {
  const count = useCounter(stat.value, 1400, inView)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease }}
      className="text-center py-8 px-4"
    >
      <div className="text-4xl sm:text-5xl font-black text-text-primary mb-2 tabular-nums">
        {stat.prefix}
        {count}
        {stat.suffix}
      </div>
      <div className="text-text-muted text-sm font-medium uppercase tracking-widest">
        {stat.label}
      </div>
    </motion.div>
  )
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section id="stats" className="relative bg-surface" aria-label="Key statistics">
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-border" />
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-px bg-border" />

      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
