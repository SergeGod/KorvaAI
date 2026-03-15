'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { clsx } from 'clsx'

interface SectionTitleProps {
  label?: string    // small eyebrow label above the title
  title: string
  subtitle?: string
  center?: boolean
  className?: string
}

export function SectionTitle({
  label,
  title,
  subtitle,
  center = false,
  className,
}: SectionTitleProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.25 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={clsx('mb-16', center && 'text-center', className)}
    >
      {label && (
        <p className="mb-3 text-xs font-semibold tracking-[0.22em] uppercase text-amber-500/80">
          {label}
        </p>
      )}

      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.08]">
        {title}
      </h2>

      {/* Accent line */}
      <div
        className={clsx(
          'mt-4 h-px w-16 bg-gradient-to-r from-amber-500 to-transparent',
          center && 'mx-auto'
        )}
      />

      {subtitle && (
        <p className="mt-6 text-base md:text-lg text-white/50 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
