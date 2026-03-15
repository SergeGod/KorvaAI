'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { submitToFormspree } from '@/lib/formspree'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setErrorMsg('')
    const result = await submitToFormspree({ email, type: 'final-cta' })
    setLoading(false)
    if (result.ok) {
      setSubmitted(true)
    } else {
      setErrorMsg(result.errorMessage ?? "Something went wrong. Please email us at hello@korva.es")
    }
  }

  return (
    <section
      id="contact-cta"
      className="relative py-32 px-6 overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      {/* Strong centred glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.22) 0%, rgba(124,58,237,0.1) 40%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.15) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      <div ref={ref} className="max-w-2xl mx-auto relative z-10 text-center">
        {/* Pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1a1a1a] bg-[#0f0f0f] text-sm text-white mb-8 select-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" aria-hidden="true" />
          Limited spots available this month
        </motion.div>

        {/* Headline */}
        <motion.h2
          id="final-cta-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.08, ease }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.06] tracking-tight mb-5"
        >
          Let AI Build{' '}
          <span className="text-gradient">Your Business.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.16, ease }}
          className="text-[#6b7280] text-base sm:text-lg mb-10 max-w-lg mx-auto leading-relaxed"
        >
          Get your free design preview in under 24 hours — no commitment required.
        </motion.p>

        {/* Form / Success */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.24, ease }}
        >
          {submitted ? (
            <div className="rounded-xl px-8 py-7 text-center max-w-md mx-auto border border-[#2563EB]/30 bg-[#0f0f0f]">
              <div className="w-12 h-12 rounded-full bg-[#2563EB]/15 flex items-center justify-center mx-auto mb-4">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M4 11l5 5L18 6" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-white font-semibold text-lg mb-1">You are on the list!</p>
              <p className="text-[#6b7280] text-sm">
                Thanks! We&apos;ll be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              aria-label="Get free preview form"
            >
              <label htmlFor="cta-email" className="sr-only">Your email address</label>
              <input
                id="cta-email"
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3.5 rounded-lg bg-[#0f0f0f] border border-[#1a1a1a] hover:border-[#2a2a2a] focus:border-[#2563EB]/50 focus:ring-2 focus:ring-[#2563EB]/20 outline-none text-white placeholder:text-[#6b7280] text-sm transition-all duration-200"
              />
              <button
                type="submit"
                disabled={loading}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="62.83" strokeDashoffset="47" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    Get Free Preview →
                    <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}

          {!submitted && (
            <>
              {errorMsg && <p className="mt-3 text-red-400 text-xs">{errorMsg}</p>}
              <p className="mt-4 text-[#6b7280] text-xs">
                Free preview · No credit card · Cancel any time
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
