// components/sections/Footer.tsx

const footerLinks = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Documentation', 'API', 'Status', 'Support'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
}


export default function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8 px-6" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        {/* Top row: logo + links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <a href="/" className="inline-flex items-center gap-2.5 mb-4" aria-label="KorvaAI home">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="5" r="2" fill="white" />
                  <circle cx="3.5" cy="11" r="2" fill="white" opacity="0.7" />
                  <circle cx="12.5" cy="11" r="2" fill="white" opacity="0.7" />
                  <line x1="8" y1="7" x2="3.5" y2="9" stroke="white" strokeWidth="1.2" strokeOpacity="0.5" />
                  <line x1="8" y1="7" x2="12.5" y2="9" stroke="white" strokeWidth="1.2" strokeOpacity="0.5" />
                </svg>
              </div>
              <span className="text-text-primary font-semibold text-base">
                Korva<span className="text-primary-light">AI</span>
              </span>
            </a>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              AI-powered web design and development for modern businesses. Fast,
              beautiful, and built to grow.
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
                  <li key={link}>
                    <a
                      href="#"
                      className="text-text-muted text-sm hover:text-text-secondary transition-colors duration-200"
                    >
                      {link}
                    </a>
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
          <div className="flex items-center gap-1.5 text-text-muted text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}
