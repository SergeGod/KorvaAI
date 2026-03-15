import type { Metadata } from 'next'
import Navbar from '@/components/sections/Navbar'
import FinalCTA from '@/components/sections/FinalCTA'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'About KorvaAI — Our Story & Team | Madrid',
  description:
    'Learn about KorvaAI — founded in Madrid by two IE University students with a mission to give businesses the web presence they deserve.',
  openGraph: {
    title: 'About KorvaAI — Our Story & Team',
    description: 'Founded in 2026 by Serge Hagopian and Juan Pablo Barrios at IE University Madrid.',
    type: 'website',
    url: 'https://korva.es/about',
    siteName: 'KorvaAI',
  },
}

const team = [
  {
    name: 'Serge Hagopian',
    role: 'Co-Founder, Technology',
    bio: 'Computer Science & AI student at IE University Madrid. Builds the technical backbone of every KorvaAI product.',
    initials: 'SH',
  },
  {
    name: 'Juan Pablo Barrios',
    role: 'Co-Founder, Business',
    bio: 'Business student at IE University Madrid. Drives strategy, client relationships, and growth.',
    initials: 'JB',
  },
]

const values = [
  { title: 'Speed', desc: 'Demo in 24 hours. Launch in days. We move faster than any traditional agency.' },
  { title: 'Quality', desc: 'Premium design and clean code on every project, no matter the budget.' },
  { title: 'Transparency', desc: 'You own everything — code, domain, content. No lock-in, ever.' },
  { title: 'Innovation', desc: 'AI at the core of every product we build. We stay ahead so you do too.' },
]

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden" aria-labelledby="about-heading">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glow-pill text-xs font-medium mb-6 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-light" aria-hidden="true" />
            About Us
          </div>
          <h1
            id="about-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-primary leading-[1.06] tracking-tight mb-6"
          >
            Two students.{' '}
            <span className="text-gradient">One agency.</span>
            <br />
            Zero compromises.
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            Korva was founded in 2026 by Serge Hagopian, a Computer Science &amp; AI student at IE
            University Madrid, and Juan Pablo Barrios, a Business student at IE University Madrid.
            What started as a conviction that great web design should not cost a fortune or take
            months to deliver became a global agency built on speed, quality, and AI.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="relative py-16 px-6 bg-surface border-y border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl sm:text-2xl font-semibold text-text-primary leading-relaxed">
            &ldquo;Our mission is to give high-ticket businesses the web presence they deserve —
            fast, beautiful, and built to grow.&rdquo;
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6" aria-labelledby="team-heading">
        <div className="max-w-4xl mx-auto">
          <h2
            id="team-heading"
            className="text-2xl sm:text-3xl font-black text-text-primary text-center mb-12 tracking-tight"
          >
            Meet the{' '}
            <span className="text-gradient">founders.</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {team.map((member) => (
              <div key={member.name} className="glass-card rounded-2xl p-8 flex flex-col items-center text-center gap-4">
                <div className="w-20 h-20 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center">
                  <span className="text-primary-light font-black text-2xl">{member.initials}</span>
                </div>
                <div>
                  <div className="text-text-primary font-bold text-xl">{member.name}</div>
                  <div className="text-primary-light text-sm font-medium mt-1">{member.role}</div>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-surface border-y border-border" aria-labelledby="values-heading">
        <div className="max-w-5xl mx-auto">
          <h2
            id="values-heading"
            className="text-2xl sm:text-3xl font-black text-text-primary text-center mb-12 tracking-tight"
          >
            What drives us.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="glass-card rounded-xl p-6 text-center">
                <div className="text-primary-light font-black text-xl mb-2">{v.title}</div>
                <p className="text-text-secondary text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  )
}
