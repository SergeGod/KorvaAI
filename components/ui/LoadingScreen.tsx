'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1200)
    const hideTimer = setTimeout(() => setVisible(false), 1500)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 300ms ease',
        pointerEvents: fading ? 'none' : 'auto',
      }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Logo mark */}
        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-glow-md">
          <svg width="24" height="24" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="5" r="2" fill="white" />
            <circle cx="3.5" cy="11" r="2" fill="white" opacity="0.7" />
            <circle cx="12.5" cy="11" r="2" fill="white" opacity="0.7" />
            <line x1="8" y1="7" x2="3.5" y2="9" stroke="white" strokeWidth="1.2" strokeOpacity="0.5" />
            <line x1="8" y1="7" x2="12.5" y2="9" stroke="white" strokeWidth="1.2" strokeOpacity="0.5" />
          </svg>
        </div>
        {/* Wordmark */}
        <span className="text-text-primary font-bold text-xl tracking-tight">
          Korva<span className="text-primary-light">AI</span>
        </span>
      </div>
    </div>
  )
}
