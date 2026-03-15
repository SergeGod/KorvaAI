'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu } from 'lucide-react'
import Link from 'next/link'

const links = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    if (href.startsWith('#')) {
      const el = document.getElementById(href.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass border-b border-[#1a1a1a]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0.5 font-bold text-xl tracking-tight">
            <span className="text-white">Korva</span>
            <span className="text-[#2563EB]">AI</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNavClick(l.href)}
                className="text-sm text-[#6b7280] hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#contact-cta"
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById('contact-cta')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2563EB] text-white text-sm font-medium
                hover:bg-[#1d4ed8] hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-200"
            >
              Book a Free Demo
            </a>
            <button
              className="md:hidden p-2 text-[#6b7280] hover:text-white transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="fixed top-16 inset-x-0 z-40 glass border-b border-[#1a1a1a] px-6 py-4 flex flex-col gap-4 md:hidden"
          >
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNavClick(l.href)}
                className="text-left text-sm text-[#6b7280] hover:text-white transition-colors py-1 cursor-pointer"
              >
                {l.label}
              </button>
            ))}
            <a
              href="#contact-cta"
              onClick={(e) => {
                e.preventDefault()
                setMobileOpen(false)
                const el = document.getElementById('contact-cta')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="mt-2 inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#2563EB] text-white text-sm font-medium"
            >
              Book a Free Demo
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
