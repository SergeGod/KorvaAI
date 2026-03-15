import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import ContactForm from '@/components/sections/ContactForm'
import { Mail, MapPin, Clock, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact KorvaAI — Get a Free Quote | Madrid',
  description:
    'Get in touch with KorvaAI. Tell us about your project and receive a free quote. We reply within 24 hours.',
  openGraph: {
    title: 'Contact KorvaAI — Get a Free Quote',
    description: 'Tell us about your project and receive a free quote within 24 hours.',
    type: 'website',
    url: 'https://korva.es/contact',
    siteName: 'KorvaAI',
  },
}

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@korva.es',
    href: 'mailto:hello@korva.es',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+34 605 726 317',
    href: 'https://wa.me/34605726317',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Madrid, Spain',
    href: '#',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 24 hours',
    href: '#',
  },
]

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-6 overflow-hidden" aria-labelledby="contact-heading">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-[500px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glow-pill text-xs font-medium mb-6 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-light" aria-hidden="true" />
            Get a Free Quote
          </div>
          <h1
            id="contact-heading"
            className="text-4xl sm:text-5xl font-black text-text-primary leading-[1.06] tracking-tight mb-4"
          >
            Let&apos;s build something{' '}
            <span className="text-gradient">great together.</span>
          </h1>
          <p className="text-text-secondary text-lg">
            Tell us about your business. We reply within 24 hours.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6 pb-24" aria-label="Contact form and info">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-10">
          {/* Left — contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-text-primary font-bold text-xl mb-2">Contact Details</h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                We work with clients globally. Whether you are in Madrid, Dubai, or New York —
                we are ready to help.
              </p>
            </div>

            <ul className="space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                        <Icon size={16} className="text-primary-light" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-text-muted text-xs font-medium">{item.label}</div>
                        <div className="text-text-primary text-sm font-medium group-hover:text-primary-light transition-colors duration-200">
                          {item.value}
                        </div>
                      </div>
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className="glass-card rounded-xl p-5">
              <p className="text-text-secondary text-sm leading-relaxed">
                <span className="text-text-primary font-semibold">Free consultation.</span>{' '}
                No commitment required. We&apos;ll review your project and send you a custom
                proposal within 24 hours of your enquiry.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
