// components/sections/Navbar.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-[0_1px_0_rgba(255,255,255,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group" aria-label="KorvaAI home">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shadow-glow-sm">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="5" r="2" fill="white" />
              <circle cx="3.5" cy="11" r="2" fill="white" opacity="0.7" />
              <circle cx="12.5" cy="11" r="2" fill="white" opacity="0.7" />
              <line x1="8" y1="7" x2="3.5" y2="9" stroke="white" strokeWidth="1.2" strokeOpacity="0.5" />
              <line x1="8" y1="7" x2="12.5" y2="9" stroke="white" strokeWidth="1.2" strokeOpacity="0.5" />
            </svg>
          </div>
          <span className="text-text-primary font-semibold text-base tracking-tight">
            Korva<span className="text-primary-light">AI</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

      </div>
    </motion.header>
  )
}
