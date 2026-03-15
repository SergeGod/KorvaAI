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
    ctaHref: '#final-cta',
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
      className="relative py-24 px-6 bg-background"
      aria-labelledby="pricing-heading"
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
            Pricing
          </div>
          <h2
            id="pricing-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight mb-4"
          >
            Transparent{' '}
            <span className="text-gradient">starting point.</span>
          </h2>
          <p className="text-text-secondary text-base max-w-xl mx-auto">
            Every project is different. We always quote based on your specific needs — but here&apos;s a clear starting point.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className={`rounded-2xl p-7 flex flex-col relative ${
                plan.featured
                  ? 'bg-gradient-card border-2 border-primary/60 shadow-glow-md'
                  : 'glass-card'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="glow-pill px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="text-text-muted text-xs font-semibold uppercase tracking-widest mb-1">{plan.name}</div>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-4xl font-black text-text-primary">{plan.price}</span>
                  {plan.price !== 'Custom' && (
                    <span className="text-text-muted text-sm">/ {plan.period}</span>
                  )}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{plan.description}</p>
              </div>

              <ul className="space-y-3 flex-1 mb-7">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-text-secondary text-sm">
                    <Check size={14} className="text-primary-light mt-0.5 flex-shrink-0" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              {plan.ctaHref.startsWith('/') ? (
                <Link
                  href={plan.ctaHref}
                  className={`flex items-center justify-center px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                    plan.featured
                      ? 'bg-primary hover:bg-primary-light text-white hover:shadow-glow-sm'
                      : 'border border-border-bright text-text-secondary hover:text-text-primary hover:border-primary/40'
                  }`}
                >
                  {plan.cta}
                </Link>
              ) : (
                <a
                  href={plan.ctaHref}
                  className={`flex items-center justify-center px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                    plan.featured
                      ? 'bg-primary hover:bg-primary-light text-white hover:shadow-glow-sm'
                      : 'border border-border-bright text-text-secondary hover:text-text-primary hover:border-primary/40'
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
