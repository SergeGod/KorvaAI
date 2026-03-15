'use client'

import { Canvas } from '@react-three/fiber'
import { BlackHoleScene } from './BlackHoleScene'
import { usePerformanceTier } from '@/hooks/usePerformanceTier'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function BlackHoleCanvas() {
  const tier = usePerformanceTier()
  const reducedMotion = useReducedMotion()

  const quality = tier === 'high' ? 1.0 : 0.0

  // Clamp DPR: cap at 2 for high-tier, 1.5 for medium-tier
  const dpr: [number, number] = tier === 'high' ? [1, 2] : [1, 1.5]

  return (
    <Canvas
      gl={{
        antialias: false,           // disabled — shader handles its own AA
        powerPreference: 'high-performance',
        alpha: false,
        stencil: false,
        depth: false,
      }}
      dpr={dpr}
      camera={{ position: [0, 0, 1], fov: 75 }}
      style={{ background: '#000000' }}
      // Prevent R3F from auto-clearing to transparent
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 1)
      }}
    >
      <BlackHoleScene quality={quality} reducedMotion={reducedMotion} />
    </Canvas>
  )
}
