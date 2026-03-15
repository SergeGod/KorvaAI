'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PROJECTS } from '@/data/projects'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { clsx } from 'clsx'

// ── Glitch reveal variants ────────────────────────────────────────────────────
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 55,
    filter: 'blur(14px)',
  },
  visible: (custom: { delay: number }) => ({
    opacity:  [0,    0.9,  0.7,  1,    0.85, 1   ],
    y:        [55,   3,    -5,   2,    -2,   0   ],
    x:        [0,    -6,   5,   -3,    2,    0   ],
    filter:   [
      'blur(14px)',
      'blur(1px)',
      'blur(3px)',
      'blur(0.5px)',
      'blur(2px)',
      'blur(0px)',
    ],
    transition: {
      duration: 0.9,
      ease: 'easeOut',
      times: [0, 0.3, 0.45, 0.6, 0.78, 1],
      delay: custom.delay,
    },
  }),
}

// ── Glare overlay — separate component so useTransform is always at top level ─
function GlareOverlay({
  glareX,
  glareY,
}: {
  glareX: MotionValue<string>
  glareY: MotionValue<string>
}) {
  const background = useTransform(
    [glareX, glareY] as MotionValue<string>[],
    ([x, y]: string[]) =>
      `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.07) 0%, transparent 60%)`
  )
  return (
    <motion.div
      aria-hidden
      style={{ background }}
      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    />
  )
}

// ── 3-D tilt project card ─────────────────────────────────────────────────────
interface ProjectCardProps {
  project: (typeof PROJECTS)[number]
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isGlitching, setIsGlitching] = useState(false)

  // Raw mouse position in [−0.5, 0.5]
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // Spring-damped tilt
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [9, -9]), { stiffness: 280, damping: 30 })
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-9, 9]), { stiffness: 280, damping: 30 })

  // Glare position as percentage strings — passed to GlareOverlay child
  const glareX = useTransform(rawX, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(rawY, [-0.5, 0.5], ['0%', '100%'])

  // Scroll-reveal trigger
  const [revealRef, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  // Trigger glitch class on first reveal
  useEffect(() => {
    if (inView) {
      setIsGlitching(true)
      const timer = setTimeout(() => setIsGlitching(false), 900)
      return () => clearTimeout(timer)
    }
  }, [inView])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      rawX.set((e.clientX - rect.left) / rect.width  - 0.5)
      rawY.set((e.clientY - rect.top)  / rect.height - 0.5)
    },
    [rawX, rawY]
  )

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  // Staggered delay: top row first, then bottom row
  const totalDelay = Math.floor(index / 2) * 0.12 + (index % 2) * 0.08

  // Merge the reveal ref and the card ref via a callback ref
  const setRefs = useCallback(
    (el: HTMLDivElement | null) => {
      ;(cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el
      // react-intersection-observer ref
      if (typeof revealRef === 'function') revealRef(el)
    },
    [revealRef]
  )

  return (
    <motion.div
      ref={setRefs}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={{ delay: totalDelay }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={clsx(
        'glitch-wrapper relative rounded-sm overflow-hidden cursor-pointer group',
        'border border-white/[0.07] bg-[#0a0a0a]',
        'transition-[border-color,box-shadow] duration-300',
        'hover:border-amber-500/25 hover:shadow-[0_0_32px_rgba(245,158,11,0.08)]',
        isGlitching && 'is-glitching'
      )}
    >
      {/* ── Project image ───────────────────────────────────────────────── */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          priority={index < 2}
        />

        {/* Scanline noise overlay */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 4px)',
          }}
        />

        {/* Mouse-following glare — proper component to keep hook rules */}
        <GlareOverlay glareX={glareX} glareY={glareY} />

        {/* Tag badge */}
        <span
          className="absolute top-3 right-3 z-10 text-[10px] font-semibold tracking-widest uppercase
                     px-2.5 py-1 rounded-sm border border-amber-500/30 bg-black/60 text-amber-400/80
                     backdrop-blur-sm"
        >
          {project.tag}
        </span>
      </div>

      {/* ── Card info ──────────────────────────────────────────────────── */}
      <div className="p-6" style={{ transform: 'translateZ(20px)' }}>
        <p className="text-xs text-white/35 font-medium tracking-widest uppercase mb-1">
          {project.subtitle}
        </p>
        <h3 className="text-lg font-bold text-white tracking-tight mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-white/45 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Bottom accent line on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/35 to-transparent
                   opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export function Projects() {
  return (
    <section id="projects" className="section-darker relative py-28 md:py-36">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionTitle
          label="Our work"
          title="Projects"
          subtitle="A selection of products and deployments we've shipped."
        />

        {/* 2 × 2 grid — exactly 4 projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
