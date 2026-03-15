'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#what-we-do' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '/about', isPage: true },
  { label: 'Blog', href: '/blog', isPage: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      ref={navRef}
      className="fixed top-0 inset-x-0 z-40"
      style={{
        background: scrolled ? 'rgba(8,8,8,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(42,42,42,0.8)' : '1px solid transparent',
        transition: 'background 300ms ease, border-color 300ms ease',
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5" aria-label="KorvaAI home">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
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

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) =>
              link.isPage ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3.5 py-2 text-sm text-text-secondary hover:text-text-primary rounded-lg hover:bg-white/5 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3.5 py-2 text-sm text-text-secondary hover:text-text-primary rounded-lg hover:bg-white/5 transition-all duration-200"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="#final-cta"
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-light text-white text-sm font-semibold transition-all duration-200 hover:shadow-glow-sm hover:-translate-y-0.5"
            >
              Get Free Preview
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all duration-200"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="md:hidden overflow-hidden border-t border-border"
            style={{ background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(16px)' }}
          >
            <nav className="flex flex-col px-6 py-4 gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) =>
                link.isPage ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-3 text-sm text-text-secondary hover:text-text-primary rounded-lg hover:bg-white/5 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-3 text-sm text-text-secondary hover:text-text-primary rounded-lg hover:bg-white/5 transition-all duration-200"
                  >
                    {link.label}
                  </a>
                )
              )}
              <div className="pt-3 mt-2 border-t border-border">
                <a
                  href="#final-cta"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center px-4 py-3 rounded-lg bg-primary hover:bg-primary-light text-white text-sm font-semibold transition-all duration-200"
                >
                  Get Free Preview
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
