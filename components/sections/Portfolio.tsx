'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

function ShimmerCard() {
  return (
    <div className="relative rounded-xl border border-[#1a1a1a] bg-[#0f0f0f] h-44 overflow-hidden flex items-center justify-center">
      {/* Animated shimmer streak */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.025) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }}
      />
      {/* Subtle pulse glow */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.06), transparent 70%)' }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative z-10 text-center select-none">
        <p className="text-white font-semibold text-sm mb-1">Next Project</p>
        <p className="text-[#6b7280] text-xs">Coming Soon</p>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="portfolio"
      className="relative py-28 px-6"
      aria-labelledby="portfolio-heading"
    >
      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1a1a1a] bg-[#0f0f0f] text-sm text-white mb-6 select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" aria-hidden="true" />
            Our Work
          </motion.div>

          <motion.h2
            id="portfolio-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white"
          >
            Results That Speak for Themselves.
          </motion.h2>
        </div>

        {/* Main card — Emballage */}
        <motion.a
          href="https://emballage-client-website.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Emballage live site"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="group block max-w-[900px] mx-auto rounded-xl border border-[#1a1a1a] bg-[#0f0f0f] overflow-hidden
            transition-all duration-300
            hover:-translate-y-1
            hover:border-[#2563EB]/50
            hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* LEFT — text */}
            <div className="flex flex-col justify-between p-8 md:p-10">
              <div>
                <span className="inline-block text-xs text-[#6b7280] font-medium mb-5 tracking-wide">
                  Jewellery Display Manufacturing · Dubai
                </span>

                <h3 className="text-white font-black text-4xl tracking-[0.15em] uppercase mb-4">
                  EMBALLAGE
                </h3>

                <p className="text-[#6b7280] text-sm leading-relaxed">
                  A luxury website for the Middle East&apos;s leading jewellery display manufacturer,
                  trusted by 100+ top jewellery brands since 1988.
                </p>
              </div>

              <div className="mt-8">
                <span className="inline-flex items-center gap-1.5 text-[#2563EB] text-sm font-medium
                  group-hover:gap-2.5 transition-all duration-200">
                  View Live Site →
                </span>
              </div>
            </div>

            {/* RIGHT — browser mockup */}
            <div className="flex items-center justify-center p-6 bg-[#080808] border-t md:border-t-0 md:border-l border-[#1a1a1a]">
              <div className="w-full rounded-lg overflow-hidden border border-[#2a2a2a] shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                {/* Chrome bar */}
                <div className="flex items-center gap-3 px-3 py-2.5 bg-[#111] border-b border-[#1f1f1f]">
                  <div className="flex gap-1.5 flex-shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 bg-[#0f0f0f] rounded px-2 py-1 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] flex-shrink-0" />
                    <span className="text-[9px] text-[#6b7280] font-mono truncate select-none">
                      emballage-client-website.vercel.app
                    </span>
                  </div>
                </div>

                {/* Browser content */}
                <div
                  className="w-full relative flex items-center justify-center"
                  style={{
                    height: 160,
                    background: 'linear-gradient(160deg, #0d0b08 0%, #100e0a 50%, #0a0908 100%)',
                  }}
                >
                  {/* Subtle gold/blue gradient glow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(37,99,235,0.08) 0%, rgba(180,140,60,0.06) 40%, transparent 70%)',
                    }}
                    aria-hidden="true"
                  />
                  {/* Decorative lines */}
                  <div className="absolute top-4 inset-x-6 flex justify-between items-center opacity-20">
                    <div className="h-1 w-16 rounded bg-[#c4a44a]" />
                    <div className="h-1 w-8 rounded bg-[#c4a44a]" />
                  </div>
                  <div className="absolute bottom-6 inset-x-6 flex gap-2 opacity-15">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-px flex-1 bg-[#c4a44a]" />
                    ))}
                  </div>
                  {/* Brand text */}
                  <div className="relative z-10 text-center select-none">
                    <p
                      className="font-black tracking-[0.3em] text-sm uppercase"
                      style={{
                        background: 'linear-gradient(135deg, #c4a44a 0%, #f0d080 50%, #c4a44a 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      EMBALLAGE
                    </p>
                    <p className="text-[#4b5563] text-[9px] tracking-widest mt-1 uppercase">
                      est. 1988
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.a>

        {/* Coming soon cards */}
        <div className="max-w-[900px] mx-auto grid grid-cols-2 gap-4 mt-4">
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease }}
            >
              <ShimmerCard />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
