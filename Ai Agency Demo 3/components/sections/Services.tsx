'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Globe, Cpu, UserRound, BarChart3, CalendarCheck } from 'lucide-react'
import { SERVICES } from '@/data/services'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { clsx } from 'clsx'

// Icon map — extend as needed
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  Globe,
  Cpu,
}

const AGENT_ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  'AI Receptionist':          UserRound,
  'AI Analyst':               BarChart3,
  'AI Appointment Scheduler': CalendarCheck,
}

function FeaturePill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-white/45 font-medium">
      <span className="w-1 h-1 rounded-full bg-amber-500/60 flex-shrink-0" />
      {label}
    </span>
  )
}

function AgentCard({ name, tagline, description }: {
  name: string
  tagline: string
  description: string
}) {
  const AgentIcon = AGENT_ICON_MAP[name]
  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
      className="flex gap-4 p-4 rounded-sm border border-white/[0.05] bg-white/[0.025]
                 hover:border-amber-500/20 hover:bg-amber-500/[0.04] transition-colors duration-300"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-amber-500/10 flex items-center justify-center">
        {AgentIcon && <AgentIcon size={15} />}
      </div>
      <div>
        <p className="text-sm font-semibold text-white/90">{name}</p>
        <p className="text-xs text-amber-500/70 font-medium mb-1.5">{tagline}</p>
        <p className="text-xs text-white/40 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

interface ServiceCardProps {
  service: (typeof SERVICES)[number]
  index: number
  inView: boolean
}

function ServiceCard({ service, index, inView }: ServiceCardProps) {
  const Icon = ICON_MAP[service.icon]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.15 }}
      className={clsx(
        'card-glow rounded-sm p-8 md:p-10 flex flex-col',
        'bg-[#0c0c0c] hover:bg-[#0f0f0f]',
        'transition-colors duration-300 group'
      )}
    >
      {/* Icon */}
      <div className="mb-6 w-12 h-12 rounded-sm bg-amber-500/10 flex items-center justify-center
                      group-hover:bg-amber-500/15 transition-colors duration-300">
        {Icon && (
          <Icon
            size={22}
            strokeWidth={1.5}
            className="text-amber-400 group-hover:text-amber-300 transition-colors"
          />
        )}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold tracking-tight text-white mb-3">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-white/50 leading-relaxed mb-6 flex-1">
        {service.description}
      </p>

      {/* Features */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
        {service.features.map((f) => (
          <FeaturePill key={f} label={f} />
        ))}
      </div>

      {/* Agent sub-cards */}
      {service.agents && service.agents.length > 0 && (
        <div className="space-y-3 mt-2 pt-6 border-t border-white/[0.06]">
          <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">
            Agent types
          </p>
          {service.agents.map((agent) => (
            <AgentCard key={agent.name} {...agent} />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section
      id="services"
      ref={ref}
      className="section-dark relative py-28 md:py-36"
    >
      {/* Subtle top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionTitle
          label="What we build"
          title="Services"
          subtitle="Two core capabilities. Infinite leverage."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
