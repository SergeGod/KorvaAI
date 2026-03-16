import Link from 'next/link'

const productLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'How It Works', href: '#how-it-works' },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-0.5 font-bold text-xl tracking-tight mb-4">
              <span className="text-white">Korva</span>
              <span className="text-[#2563EB]">AI</span>
            </div>
            <p className="text-[#6b7280] text-sm leading-relaxed max-w-xs">
              AI-powered web design and development for modern businesses. Fast, beautiful, and built to grow.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[#6b7280] hover:text-white text-sm transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[#6b7280] hover:text-white text-sm transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#6b7280] text-sm">© 2026 KorvaAI. All rights reserved.</p>
          <p className="text-[#6b7280] text-sm">
            hello@korva.es
          </p>
        </div>
      </div>
    </footer>
  )
}
