import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'KorvaAI Blog — AI, Web Design & Business Growth',
  description:
    'Insights on AI-powered web design, automation, and growing your high-ticket business online.',
  openGraph: {
    title: 'KorvaAI Blog — AI, Web Design & Business Growth',
    description: 'Insights on AI-powered web design, automation, and growing your business.',
    type: 'website',
    url: 'https://korva.es/blog',
    siteName: 'KorvaAI',
  },
}

const posts = [
  {
    title: '5 Signs Your Business Website Is Losing You Clients',
    excerpt:
      'Most businesses have a website — but few have one that actually converts. Here are the five most common mistakes that silently kill your lead pipeline.',
    date: '2026-03-10',
    readTime: '5 min read',
    tag: 'Conversion',
    slug: '5-signs-website-losing-clients',
  },
  {
    title: 'How AI Automation Can Replace Your Receptionist',
    excerpt:
      'AI agents now qualify leads, answer enquiries, and book calls 24/7. Here is how to set one up for your business without a developer.',
    date: '2026-03-01',
    readTime: '4 min read',
    tag: 'AI Automation',
    slug: 'ai-automation-replace-receptionist',
  },
  {
    title: 'Why High-Ticket Businesses Cannot Afford a Bad Website',
    excerpt:
      'When your product costs €5,000+, your website needs to justify the price before a prospect even speaks to you. Here is how to make it work.',
    date: '2026-02-20',
    readTime: '6 min read',
    tag: 'Strategy',
    slug: 'high-ticket-business-website',
  },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden" aria-labelledby="blog-heading">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-[500px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glow-pill text-xs font-medium mb-6 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-light" aria-hidden="true" />
            Blog
          </div>
          <h1
            id="blog-heading"
            className="text-4xl sm:text-5xl font-black text-text-primary leading-[1.06] tracking-tight mb-4"
          >
            Insights on{' '}
            <span className="text-gradient">AI & Growth.</span>
          </h1>
          <p className="text-text-secondary text-lg">
            Practical articles on web design, AI automation, and growing your business online.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 px-6" aria-label="Blog posts">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="glass-card rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-glow-sm transition-all duration-300 group flex flex-col"
              >
                {/* Thumbnail placeholder */}
                <div
                  className="w-full h-44 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 50%, #0f0f0f 100%)',
                  }}
                  aria-hidden="true"
                >
                  <div
                    className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center"
                  >
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <circle cx="8" cy="5" r="2" fill="#3B82F6" />
                      <circle cx="3.5" cy="11" r="2" fill="#3B82F6" opacity="0.7" />
                      <circle cx="12.5" cy="11" r="2" fill="#3B82F6" opacity="0.7" />
                      <line x1="8" y1="7" x2="3.5" y2="9" stroke="#3B82F6" strokeWidth="1.2" strokeOpacity="0.5" />
                      <line x1="8" y1="7" x2="12.5" y2="9" stroke="#3B82F6" strokeWidth="1.2" strokeOpacity="0.5" />
                    </svg>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="glow-pill px-2.5 py-1 rounded-full text-xs font-medium">
                      {post.tag}
                    </span>
                    <span className="text-text-muted text-xs">{post.readTime}</span>
                  </div>
                  <h2 className="text-text-primary font-bold text-base leading-snug mb-3 flex-1">
                    {post.title}
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <time className="text-text-muted text-xs" dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                    {/* TODO: link to /blog/[slug] when post pages are built */}
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-primary-light text-xs font-medium hover:text-accent transition-colors duration-200 group"
                      aria-label={`Read article: ${post.title}`}
                    >
                      Read Article
                      <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
