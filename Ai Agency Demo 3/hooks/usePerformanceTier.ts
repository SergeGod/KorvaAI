'use client'

import { useEffect, useState } from 'react'

export type PerformanceTier = 'high' | 'medium'

/** Detects device GPU/CPU capability and returns a performance tier.
 *  Defaults to 'high'; downgrades to 'medium' for weaker devices. */
export function usePerformanceTier(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>('high')

  useEffect(() => {
    // ── 1. Check hardware concurrency (CPU proxy) ──────────────────────────
    if (typeof navigator === 'undefined') return
    const cpuCores = navigator.hardwareConcurrency ?? 4
    if (cpuCores <= 4) {
      setTier('medium')
      return
    }

    // ── 2. Check device memory (non-standard, Chromium only) ───────────────
    const nav = navigator as unknown as { deviceMemory?: number }
    if (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) {
      setTier('medium')
      return
    }

    // ── 3. GPU probe via WebGL renderer string ─────────────────────────────
    try {
      const canvas = document.createElement('canvas')
      const gl =
        (canvas.getContext('webgl2') ??
          canvas.getContext('webgl') ??
          canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null

      if (gl) {
        const ext = gl.getExtension('WEBGL_debug_renderer_info')
        if (ext) {
          const renderer = (
            gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string
          ).toLowerCase()
          // Known low-end / integrated / mobile GPUs
          const isLowEnd = /intel|hd graphics|iris|mali|adreno [0-6][0-9][0-9]|apple a[0-9]/i.test(
            renderer
          )
          if (isLowEnd) {
            setTier('medium')
            return
          }
        }
        // Clean up
        const ext2 = gl.getExtension('WEBGL_lose_context')
        ext2?.loseContext()
      }
    } catch {
      // WebGL not available → stay at 'high' (conservative; user opted in)
    }

    // ── 4. Check if mobile viewport ────────────────────────────────────────
    if (window.innerWidth < 768) {
      setTier('medium')
    }
  }, [])

  return tier
}
