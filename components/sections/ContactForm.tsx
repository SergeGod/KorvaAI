'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { submitToFormspree } from '@/lib/formspree'

interface FormData {
  name: string
  email: string
  company: string
  website: string
  budget: string
  message: string
}

const budgetOptions = [
  'Not sure yet',
  '€600 Starter',
  '€1,000 – €3,000',
  '€3,000 – €10,000',
  '€10,000+',
]

const industryOptions = [
  'Select your industry',
  'Hair Transplant Clinic',
  'Real Estate',
  'Manufacturing',
  'Luxury Brand',
  'Legal & Finance',
  'Medical & Aesthetic',
  'E-commerce',
  'SaaS / Tech',
  'Other',
]

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    website: '',
    budget: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const update = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    const result = await submitToFormspree({ ...form, type: 'contact-form' })
    setLoading(false)
    if (result.ok) {
      setSubmitted(true)
    } else {
      setErrorMsg(result.errorMessage ?? 'Something went wrong. Please email us at hello@korva.es')
    }
  }

  const inputClass =
    'w-full px-4 py-3.5 rounded-xl bg-background border border-border hover:border-border-bright focus:border-primary/60 focus:ring-2 focus:ring-primary/20 outline-none text-text-primary placeholder:text-text-muted text-sm transition-all duration-200'

  if (submitted) {
    return (
      <div className="glass-card rounded-2xl p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-5">
          <svg width="24" height="24" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M4 11l5 5L18 6" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-text-primary font-bold text-xl mb-2">Message Received</h3>
        <p className="text-text-secondary text-sm">
          Thanks! We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5" aria-label="Contact form">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-text-secondary text-xs font-medium mb-1.5">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            placeholder="John Smith"
            value={form.name}
            onChange={update('name')}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-text-secondary text-xs font-medium mb-1.5">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            placeholder="john@company.com"
            value={form.email}
            onChange={update('email')}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-company" className="block text-text-secondary text-xs font-medium mb-1.5">
            Company
          </label>
          <input
            id="contact-company"
            type="text"
            placeholder="Acme Corp"
            value={form.company}
            onChange={update('company')}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-website" className="block text-text-secondary text-xs font-medium mb-1.5">
            Current Website (optional)
          </label>
          <input
            id="contact-website"
            type="url"
            placeholder="https://yoursite.com"
            value={form.website}
            onChange={update('website')}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-industry" className="block text-text-secondary text-xs font-medium mb-1.5">
            Industry
          </label>
          <select
            id="contact-industry"
            className={inputClass}
            defaultValue="Select your industry"
          >
            {industryOptions.map((opt) => (
              <option key={opt} value={opt} disabled={opt === 'Select your industry'}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="contact-budget" className="block text-text-secondary text-xs font-medium mb-1.5">
            Budget Range
          </label>
          <select
            id="contact-budget"
            value={form.budget}
            onChange={update('budget')}
            className={inputClass}
          >
            <option value="" disabled>Select budget</option>
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-text-secondary text-xs font-medium mb-1.5">
          Tell us about your project <span className="text-red-400">*</span>
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          placeholder="What does your business do? What are you looking to achieve?"
          value={form.message}
          onChange={update('message')}
          className={`${inputClass} resize-none`}
        />
      </div>

      {errorMsg && <p className="text-red-400 text-xs">{errorMsg}</p>}

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
            Send Message
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  )
}
