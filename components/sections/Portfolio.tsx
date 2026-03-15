'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Lock } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="portfolio"
      className="relative py-24 px-6 bg-background"
      aria-labelledby="portfolio-heading"
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
            Our Work
          </div>
          <h2
            id="portfolio-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight"
          >
            Results that{' '}
            <span className="text-gradient">speak for themselves.</span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Emballage — real project */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0, ease }}
            className="glass-card rounded-2xl overflow-hidden hover:shadow-glow-sm hover:-translate-y-1 transition-all duration-300 group md:col-span-1"
          >
            {/* Thumbnail */}
            <div
              className="w-full h-52 relative flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0d0d0d 100%)',
              }}
            >
              {/* Decorative browser mockup mini */}
              <div className="w-4/5 rounded-lg overflow-hidden border border-border-bright shadow-xl">
                <div className="bg-surface px-3 py-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: '#FF5F57' }} />
                  <span className="w-2 h-2 rounded-full" style={{ background: '#FFBD2E' }} />
                  <span className="w-2 h-2 rounded-full" style={{ background: '#28C840' }} />
                  <div className="flex-1 ml-2 bg-background/60 rounded px-2 py-0.5 text-text-muted" style={{ fontSize: '8px' }}>
                    emballage-client-website.vercel.app
                  </div>
                </div>
                <div
                  className="w-full"
                  style={{
                    height: '100px',
                    background: 'linear-gradient(180deg, #1a1410 0%, #0f0d0a 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className="text-text-muted text-xs font-medium tracking-widest uppercase">Emballage</span>
                </div>
              </div>
              {/* Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(37,99,235,0.08), transparent 70%)' }}
                aria-hidden="true"
              />
            </div>

            <div className="p-6">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glow-pill text-xs font-medium mb-3">
                Jewellery | Dubai
              </span>
              <h3 className="text-text-primary font-bold text-lg mb-2">Emballage</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                A luxury website for the Middle East&apos;s leading jewellery display manufacturer,
                trusted by 100+ top jewellery brands since 1988.
              </p>
              <a
                href="https://emballage-client-website.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary-light text-sm font-medium hover:text-accent transition-colors duration-200"
              >
                View Live Site
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* Coming Soon cards */}
          {[
            { label: 'Real Estate', industry: 'Luxury Properties' },
            { label: 'Medical Clinic', industry: 'Aesthetic & Wellness' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: (i + 1) * 0.1, ease }}
              className="glass-card rounded-2xl overflow-hidden relative"
            >
              {/* Blurred thumbnail */}
              <div
                className="w-full h-52 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #111111, #1a1a1a)' }}
              >
                <div className="text-center">
                  <Lock size={28} className="text-text-muted mx-auto mb-3" aria-hidden="true" />
                  <span className="text-text-muted text-xs font-medium uppercase tracking-widest">
                    Coming Soon
                  </span>
                </div>
              </div>

              <div className="p-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-2 border border-border text-text-muted text-xs font-medium mb-3">
                  {item.industry}
                </span>
                <h3 className="text-text-muted font-bold text-lg mb-2">{item.label}</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  New project launching soon. Check back for updates.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
