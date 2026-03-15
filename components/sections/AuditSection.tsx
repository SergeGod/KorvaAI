'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, ArrowRight, Globe } from 'lucide-react'
import { submitToFormspree } from '@/lib/formspree'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const bullets = [
  'No crawl errors or broken links',
  'Page speed score above 90',
  'Mobile-first responsive design',
  'SEO fundamentals in place',
  'Clear conversion path for visitors',
]

export default function AuditSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!url.trim()) return
    setLoading(true)
    setError('')
    const result = await submitToFormspree({ url: url.trim(), type: 'audit-request' })
    setLoading(false)
    if (result.ok) {
      setSubmitted(true)
    } else {
      setError(result.errorMessage ?? 'Something went wrong. Please email us at hello@korva.es')
    }
  }

  return (
    <section
      id="audit"
      className="relative py-24 px-6 bg-surface overflow-hidden"
      aria-labelledby="audit-heading"
    >
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-border" />
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-px bg-border" />
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[300px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.1), transparent 70%)', filter: 'blur(40px)' }}
      />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glow-pill text-xs font-medium mb-5 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-light" aria-hidden="true" />
              Free AI Audit
            </div>
            <h2
              id="audit-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight mb-5"
            >
              Is Your Website{' '}
              <span className="text-gradient">Losing You Clients?</span>
            </h2>
            <p className="text-text-secondary text-base leading-relaxed mb-8">
              Enter your URL and get a free AI-powered audit of your site&apos;s design, speed,
              and conversion potential. We&apos;ll review it personally.
            </p>
            <ul className="space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-text-secondary text-sm">
                  <span className="w-5 h-5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Check size={11} className="text-primary-light" aria-hidden="true" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            {submitted ? (
              <div className="glass-card rounded-2xl p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-5">
                  <Check size={24} className="text-primary-light" aria-hidden="true" />
                </div>
                <h3 className="text-text-primary font-bold text-xl mb-2">Audit Request Received</h3>
                <p className="text-text-secondary text-sm">
                  Thanks! We&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-text-primary font-bold text-xl mb-2">Get Your Free Audit</h3>
                <p className="text-text-secondary text-sm mb-6">
                  No signup required. We&apos;ll email you the results personally.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Globe
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                      aria-hidden="true"
                    />
                    <label htmlFor="audit-url" className="sr-only">Your website URL</label>
                    <input
                      id="audit-url"
                      type="url"
                      required
                      placeholder="https://yourwebsite.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-background border border-border hover:border-border-bright focus:border-primary/60 focus:ring-2 focus:ring-primary/20 outline-none text-text-primary placeholder:text-text-muted text-sm transition-all duration-200"
                    />
                  </div>
                  {error && <p className="text-red-400 text-xs">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-light disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all duration-200 hover:shadow-glow-md hover:-translate-y-0.5"
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
                        Get Free Audit
                        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
