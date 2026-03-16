'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import Link from 'next/link'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const plans = [
  {
    name: 'Starter',
    price: '€600',
    period: 'one-time',
    description: 'Perfect for businesses that need a professional online presence fast.',
    features: [
      'Custom 5-page website',
      'Mobile-responsive design',
      'SEO setup & optimisation',
      'Contact form integration',
      'Fast global hosting setup',
      '1 month post-launch support',
    ],
    cta: 'Get Started',
    ctaHref: '#contact-cta',
    featured: false,
  },
  {
    name: 'Growth',
    price: 'Custom',
    period: 'monthly',
    description: 'For businesses ready to scale with ongoing management and AI automation.',
    features: [
      'Everything in Starter',
      'Monthly updates & management',
      'Performance monitoring',
      'AI chatbot integration',
      'Analytics dashboard',
      'Priority support',
    ],
    cta: 'Get a Quote',
    ctaHref: '/contact',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'monthly',
    description: 'Full AI automation suite for established businesses with complex needs.',
    features: [
      'Everything in Growth',
      'Custom AI agents',
      'Lead qualification automation',
      'CRM integration',
      'Dedicated account manager',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    ctaHref: '/contact',
    featured: false,
  },
]

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="pricing"
      className="relative py-28 px-6"
      aria-labelledby="pricing-heading"
    >
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-[#1a1a1a]" />
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-px bg-[#1a1a1a]" />

      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1a1a1a] bg-[#0f0f0f] text-sm text-white mb-6 select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" aria-hidden="true" />
            Pricing
          </motion.div>

          <motion.h2
            id="pricing-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-5"
          >
            Transparent{' '}
            <span className="text-gradient">starting point.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="text-[#6b7280] text-lg max-w-xl mx-auto leading-relaxed"
          >
            Every project is different. We always quote based on your specific needs — but here&apos;s a clear starting point.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease }}
              className={`rounded-xl p-7 flex flex-col relative ${
                plan.featured
                  ? 'bg-[#0f0f0f] border-2 border-[#2563EB]/50 shadow-[0_0_40px_rgba(37,99,235,0.15)]'
                  : 'bg-[#0f0f0f] border border-[#1a1a1a] card-hover'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#2563EB] text-xs font-semibold whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="text-[#6b7280] text-xs font-semibold uppercase tracking-widest mb-2">{plan.name}</div>
                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  {plan.price !== 'Custom' && (
                    <span className="text-[#6b7280] text-sm">/ {plan.period}</span>
                  )}
                </div>
                <p className="text-[#6b7280] text-sm leading-relaxed">{plan.description}</p>
              </div>

              <ul className="space-y-3 flex-1 mb-7">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[#6b7280] text-sm">
                    <Check size={14} className="text-[#2563EB] mt-0.5 flex-shrink-0" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              {plan.ctaHref.startsWith('/') ? (
                <Link
                  href={plan.ctaHref}
                  className={`flex items-center justify-center px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                    plan.featured
                      ? 'bg-[#2563EB] hover:bg-[#1d4ed8] text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                      : 'border border-[#1a1a1a] text-[#6b7280] hover:text-white hover:border-[#2563EB]/40'
                  }`}
                >
                  {plan.cta}
                </Link>
              ) : (
                <a
                  href={plan.ctaHref}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('contact-cta')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`flex items-center justify-center px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                    plan.featured
                      ? 'bg-[#2563EB] hover:bg-[#1d4ed8] text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                      : 'border border-[#1a1a1a] text-[#6b7280] hover:text-white hover:border-[#2563EB]/40'
                  }`}
                >
                  {plan.cta}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
