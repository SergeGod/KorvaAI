// components/effects/MoleculeField.tsx
'use client'

import { useEffect, useRef, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  baseSpeed: number
  radius: number
  alpha: number
}

export interface MoleculeFieldProps {
  /** Number of particles per 100k px² of canvas area. Default: 6 */
  density?: number
  /** Base movement speed. Default: 0.35 */
  speed?: number
  /** Distance at which particles draw connecting lines. Default: 140 */
  linkDistance?: number
  /** How strongly particles respond to the cursor (0–1). Default: 0.04 */
  interactionStrength?: number
  /** Particle colour (CSS hex). Default: '#BFDBFE' */
  particleColor?: string
  /** Line colour (CSS hex). Default: '#2563EB' */
  lineColor?: string
  className?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '')
  const int = parseInt(clean, 16)
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255]
}

/** Simple 2-D value noise using sin/cos — avoids importing a library */
function flowAngle(x: number, y: number, t: number): number {
  return (
    Math.sin(x * 0.0025 + t * 0.38) * Math.cos(y * 0.0025 + t * 0.22) * Math.PI * 2 +
    Math.cos(x * 0.0018 - t * 0.17) * Math.sin(y * 0.003 + t * 0.31) * Math.PI
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MoleculeField({
  density = 6,
  speed = 0.35,
  linkDistance = 140,
  interactionStrength = 0.04,
  particleColor = '#BFDBFE',
  lineColor = '#2563EB',
  className = '',
}: MoleculeFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Refs shared with rAF loop (no React re-renders)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const scrollVelRef = useRef(0) // current scroll velocity bias
  const lastScrollYRef = useRef(0)
  const tRef = useRef(0) // animation time accumulator
  const prefersReducedRef = useRef(false)

  // ── Init / resize ──────────────────────────────────────────────────────────

  const initParticles = useCallback(
    (w: number, h: number) => {
      const count = Math.floor((w * h) / 100000 * density)
      const particles: Particle[] = []
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const baseSpeed = speed * (0.4 + Math.random() * 0.6)
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * baseSpeed,
          vy: Math.sin(angle) * baseSpeed,
          baseSpeed,
          radius: 1.2 + Math.random() * 1.4,
          alpha: 0.4 + Math.random() * 0.5,
        })
      }
      particlesRef.current = particles
    },
    [density, speed],
  )

  // ── Main animation loop ─────────────────────────────────────────────────────

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height
    const particles = particlesRef.current
    const mouse = mouseRef.current
    const t = (tRef.current += 0.008)

    // Decay scroll velocity
    scrollVelRef.current *= 0.92

    // ── Clear ────────────────────────────────────────────────────────────────
    ctx.clearRect(0, 0, w, h)

    // ── Update + Draw particles ───────────────────────────────────────────────
    const [pr, pg, pb] = hexToRgb(particleColor)
    const [lr, lg, lb] = hexToRgb(lineColor)
    const ld2 = linkDistance * linkDistance
    const scrollBias = scrollVelRef.current * 0.012

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]

      // Flow field nudge
      const angle = flowAngle(p.x, p.y, t)
      const flowForce = 0.008
      p.vx += Math.cos(angle) * flowForce
      p.vy += Math.sin(angle) * flowForce

      // Scroll influence — vertical bias
      p.vy += scrollBias

      // Mouse influence — soft repulsion within radius
      const mx = mouse.x
      const my = mouse.y
      const mdx = p.x - mx
      const mdy = p.y - my
      const md2 = mdx * mdx + mdy * mdy
      const mouseRadius = 180
      const mr2 = mouseRadius * mouseRadius
      if (md2 < mr2 && md2 > 0.01) {
        const md = Math.sqrt(md2)
        const force = ((mouseRadius - md) / mouseRadius) * interactionStrength * 0.5
        p.vx += (mdx / md) * force
        p.vy += (mdy / md) * force
      }

      // Clamp velocity
      const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
      const maxSpeed = p.baseSpeed * 2.2
      if (currentSpeed > maxSpeed) {
        p.vx = (p.vx / currentSpeed) * maxSpeed
        p.vy = (p.vy / currentSpeed) * maxSpeed
      }

      // Damping
      p.vx *= 0.988
      p.vy *= 0.988

      // Move
      p.x += p.vx
      p.y += p.vy

      // Wrap around edges (soft wrap with margin)
      const margin = 40
      if (p.x < -margin) p.x = w + margin
      else if (p.x > w + margin) p.x = -margin
      if (p.y < -margin) p.y = h + margin
      else if (p.y > h + margin) p.y = -margin

      // Draw dot
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${pr}, ${pg}, ${pb}, ${p.alpha})`
      ctx.fill()

      // Draw connecting lines to nearby particles (only check forward)
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j]
        const dx = p.x - q.x
        const dy = p.y - q.y
        const d2 = dx * dx + dy * dy
        if (d2 < ld2) {
          const alpha = (1 - d2 / ld2) * 0.28
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(q.x, q.y)
          ctx.strokeStyle = `rgba(${lr}, ${lg}, ${lb}, ${alpha})`
          ctx.lineWidth = 0.7
          ctx.stroke()
        }
      }
    }

    rafRef.current = requestAnimationFrame(draw)
  }, [particleColor, lineColor, linkDistance, interactionStrength])

  // ── Setup & teardown ────────────────────────────────────────────────────────

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedRef.current = mql.matches
    if (mql.matches) return

    const canvas = canvasRef.current
    if (!canvas) return

    // Size canvas to device pixel ratio
    const setSize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.scale(dpr, dpr)
      // Reinitialise particles on resize
      initParticles(rect.width, rect.height)
    }

    setSize()

    const ro = new ResizeObserver(setSize)
    ro.observe(canvas)

    // Start loop
    rafRef.current = requestAnimationFrame(draw)

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    canvas.addEventListener('mouseleave', onMouseLeave)

    // Scroll velocity tracking
    const onScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollYRef.current
      lastScrollYRef.current = currentY
      // Positive delta = scrolling down → bias particles downward
      scrollVelRef.current += delta * 0.3
      // Clamp
      scrollVelRef.current = Math.max(-8, Math.min(8, scrollVelRef.current))
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Pause on hidden tab
    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current)
      } else {
        rafRef.current = requestAnimationFrame(draw)
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [draw, initParticles])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      className={className}
    />
  )
}
