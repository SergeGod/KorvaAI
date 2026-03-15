'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const faqs = [
  {
    q: 'How long does it take to build my website?',
    a: 'We deliver a fully interactive design demo within 24 hours of our discovery call. Final launch typically happens within 5–7 business days after you approve the design.',
  },
  {
    q: 'What do I need to provide to get started?',
    a: 'Nothing formal. A 15-minute call where you describe your business is all we need to get started. No brief, no lengthy forms, no design assets required upfront.',
  },
  {
    q: 'Do I own my website and code?',
    a: 'Yes, completely. You own the code, the domain, and all content. There is zero vendor lock-in — you can take your site anywhere at any time.',
  },
  {
    q: 'What does the monthly management include?',
    a: 'The Growth and Enterprise plans include content updates, design modifications, performance monitoring, security patches, and priority support. Your site stays fast, secure, and current.',
  },
  {
    q: 'Can I cancel the monthly plan anytime?',
    a: 'Yes. There are no long-term contracts. You can cancel your monthly plan at any time with 30 days notice.',
  },
  {
    q: 'Do you work with businesses outside of Spain?',
    a: 'Absolutely. We work with clients globally and have delivered projects for clients in Dubai, across Europe, and beyond. Everything is handled remotely.',
  },
]

function AccordionItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-5 text-left gap-4"
        aria-expanded={isOpen}
      >
        <span className="text-text-primary font-medium text-base leading-snug">{faq.q}</span>
        <ChevronDown
          size={18}
          className="text-text-muted flex-shrink-0"
          aria-hidden="true"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 300ms ease',
          }}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-text-secondary text-sm leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i))

  return (
    <section
      id="faq"
      className="relative py-24 px-6 bg-surface"
      aria-labelledby="faq-heading"
    >
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-border" />
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-px bg-border" />

      <div ref={ref} className="max-w-3xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glow-pill text-xs font-medium mb-4 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-light" aria-hidden="true" />
            FAQ
          </div>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl font-black text-text-primary tracking-tight"
          >
            Common{' '}
            <span className="text-gradient">questions.</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="glass-card rounded-2xl px-6 divide-y-0"
        >
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
