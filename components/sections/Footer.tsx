// components/sections/Footer.tsx
import React from 'react'

const footerLinks = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Documentation', 'API', 'Status', 'Support'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
}

const socials = [
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M12.6 1h2.4L9.8 6.8 16 15h-4.6l-3.7-4.9L3.5 15H1l5.5-6.3L0 1h4.7l3.3 4.4L12.6 1zM11.8 13.5h1.3L4.3 2.4H2.9l8.9 11.1z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M0 1.15C0 .516.53 0 1.183 0h13.634C15.47 0 16 .516 16 1.15v13.7c0 .635-.53 1.15-1.183 1.15H1.183C.53 16 0 15.484 0 14.85V1.15zM4.8 13.6V6.16H2.4v7.44h2.4zM3.6 5.12a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8zm10 8.48v-4.08c0-2.18-.47-3.86-3.02-3.86-1.23 0-2.05.67-2.38 1.31h-.03V6.16H5.8v7.44h2.39V9.92c0-1.06.2-2.08 1.51-2.08 1.29 0 1.31 1.21 1.31 2.15v3.61H13.6z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg>
    ),
  },
]

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
            {/* Socials */}
            <div className="flex gap-3 mt-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-border-bright transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-light"
                >
                  {s.icon}
                </a>
              ))}
            </div>
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
