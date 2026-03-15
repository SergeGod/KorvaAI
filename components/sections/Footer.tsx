import Link from 'next/link'

interface FooterLink {
  label: string
  href: string
  isPage?: boolean
}

const footerLinks: Record<string, FooterLink[]> = {
  Product: [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#what-we-do' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Portfolio', href: '#portfolio' },
  ],
  Company: [
    { label: 'About', href: '/about', isPage: true },
    { label: 'Blog', href: '/blog', isPage: true },
    { label: 'Contact', href: '/contact', isPage: true },
  ],
  Contact: [
    { label: 'hello@korva.es', href: 'mailto:hello@korva.es' },
    { label: 'Madrid, Spain', href: '#' },
    { label: 'WhatsApp', href: 'https://wa.me/34605726317' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border pt-16 pb-8 px-6" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4" aria-label="KorvaAI home">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="5" r="2" fill="white" />
                  <circle cx="3.5" cy="11" r="2" fill="white" opacity="0.7" />
                  <circle cx="12.5" cy="11" r="2" fill="white" opacity="0.7" />
                  <line x1="8" y1="7" x2="3.5" y2="9" stroke="white" strokeWidth="1.2" strokeOpacity="0.5" />
                  <line x1="8" y1="7" x2="12.5" y2="9" stroke="white" strokeWidth="1.2" strokeOpacity="0.5" />
                </svg>
              </div>
              <span className="text-text-primary font-bold text-base">
                Korva<span className="text-primary-light">AI</span>
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              AI-powered web agency based in Madrid. We build websites that grow your business.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-text-primary text-xs font-semibold tracking-widest uppercase mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.isPage ? (
                      <Link
                        href={link.href}
                        className="text-text-muted text-sm hover:text-text-secondary transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-text-muted text-sm hover:text-text-secondary transition-colors duration-200"
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} KorvaAI. All rights reserved.
          </p>
          <p className="text-text-muted text-xs">
            Made with ❤ in Madrid
          </p>
        </div>
      </div>
    </footer>
  )
}
