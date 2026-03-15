'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Phone } from 'lucide-react'

// ── Custom SVG Icons ──────────────────────────────────────────────────────────

function GmailIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  )
}

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

// ── Contact link component ────────────────────────────────────────────────────
interface ContactLinkProps {
  href: string
  label: string
  icon: React.ReactNode
  text: string
}

function ContactLink({ href, label, icon, text }: ContactLinkProps) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      whileHover={{ y: -3, scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className="group flex flex-col items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 rounded-sm p-2"
    >
      <div
        className="w-14 h-14 rounded-sm flex items-center justify-center
                   border border-white/10 bg-white/[0.04] text-white/50
                   group-hover:border-amber-500/40 group-hover:bg-amber-500/10
                   group-hover:text-amber-400 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]
                   transition-all duration-300"
      >
        {icon}
      </div>
      <span className="text-xs text-white/35 group-hover:text-white/70 transition-colors tracking-wide">
        {text}
      </span>
    </motion.a>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section
      id="contact"
      className="section-dark relative py-28 md:py-40 flex items-center justify-center"
    >
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="w-full max-w-lg mx-auto px-6 text-center" ref={ref}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold tracking-[0.22em] uppercase text-amber-500/70 mb-4"
        >
          Get in touch
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
        >
          Let&apos;s work together
        </motion.h2>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-px w-16 bg-gradient-to-r from-amber-500 to-transparent mx-auto mb-8 origin-left"
        />

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex items-center justify-center gap-2 text-white/40 mb-14"
        >
          <MapPin size={14} className="text-amber-500/60 flex-shrink-0" />
          <span className="text-sm tracking-wide font-medium">Madrid, Spain</span>
        </motion.div>

        {/* Contact icons row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.35 }}
          className="flex items-start justify-center gap-10"
        >
          <ContactLink
            href="mailto:serge1hagopian@gmail.com"
            label="Send us an email"
            icon={<GmailIcon size={22} />}
            text="Email"
          />

          {/* WhatsApp: +971 56 428 4428 → wa.me/971564284428 */}
          <ContactLink
            href="https://wa.me/971564284428"
            label="Chat on WhatsApp"
            icon={<WhatsAppIcon size={22} />}
            text="WhatsApp"
          />

          {/* Phone: +34 605 726 317 */}
          <ContactLink
            href="tel:+34605726317"
            label="Call us"
            icon={<Phone size={20} strokeWidth={1.6} />}
            text="+34 605 726 317"
          />
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-16 text-xs text-white/20 tracking-wide"
        >
          © {new Date().getFullYear()} AmenityAI. All rights reserved.
        </motion.p>
      </div>
    </section>
  )
}
