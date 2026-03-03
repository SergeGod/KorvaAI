// components/sections/CTASection.tsx
'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/capture-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.')
      } else {
        setSubmitted(true)
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="cta"
      className="relative py-28 px-6 bg-surface"
      aria-labelledby="cta-heading"
    >
      {/* Top border */}
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-border" />
      {/* Bottom border */}
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-px bg-border" />

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl"
          style={{ background: 'rgba(37,99,235,0.12)' }}
        />
      </div>

      <div ref={ref} className="max-w-3xl mx-auto relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glow-pill text-xs font-medium mb-8 select-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse" />
          Limited spots available this month
        </motion.div>

        {/* Heading */}
        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.08] tracking-tight mb-5"
        >
          Let AI Build Your{' '}
          <span className="text-gradient">Business</span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="text-text-secondary text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Get your free design preview in under 24 hours — no commitment required.
        </motion.p>

        {/* Form / Success */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.24 }}
        >
          {submitted ? (
            <div className="glass-card rounded-2xl px-8 py-7 text-center max-w-md mx-auto border-primary/30">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path
                    d="M4 11l5 5L18 6"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-text-primary font-semibold text-lg mb-1">You are on the list!</p>
              <p className="text-text-secondary text-sm">
                We will send your free design preview to{' '}
                <span className="text-primary-light">{email}</span> within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              aria-label="Get started form"
            >
              <label htmlFor="cta-email" className="sr-only">
                Your work email
              </label>
              <input
                id="cta-email"
                type="email"
                required
                placeholder="Your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3.5 rounded-xl bg-surface-2 border border-border hover:border-border-bright focus:border-primary/60 focus:ring-2 focus:ring-primary/20 outline-none text-text-primary placeholder:text-text-muted text-sm transition-all duration-200"
              />
              <button
                type="submit"
                disabled={loading}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-light disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all duration-200 hover:shadow-glow-md hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-surface whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray="62.83"
                        strokeDashoffset="47"
                      />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    Get Free Preview
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}

          {!submitted && (
            <>
              {errorMsg && (
                <p className="mt-3 text-red-400 text-xs">{errorMsg}</p>
              )}
              <p className="mt-4 text-text-muted text-xs">
                Free preview · No credit card · Cancel any time
              </p>
            </>
          )}
        </motion.div>

        {/* Trusted by strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="mt-14 pt-10 border-t border-border"
        >
          <p className="text-text-muted text-xs uppercase tracking-widest mb-5">
            Trusted by businesses worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {['Acme Corp', 'Nova Labs', 'Stratos', 'Helion', 'Pulsar Co'].map((name) => (
              <span
                key={name}
                className="text-text-muted text-sm font-semibold opacity-50 hover:opacity-80 transition-opacity duration-200"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
