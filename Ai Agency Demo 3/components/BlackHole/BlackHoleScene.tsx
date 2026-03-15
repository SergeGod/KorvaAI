'use client'

import { Suspense } from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { BlackHoleMesh } from './BlackHoleMesh'

interface BlackHoleSceneProps {
  quality: number
  reducedMotion: boolean
}

export function BlackHoleScene({ quality, reducedMotion }: BlackHoleSceneProps) {
  const bloomIntensity = quality > 0.5 ? 1.3 : 0.8

  return (
    <>
      <BlackHoleMesh quality={quality} reducedMotion={reducedMotion} />

      {/* Selective bloom: only affects pixels above luminanceThreshold.
          Background is pure black (0,0,0) so it never blooms. */}
      {!reducedMotion && (
        <Suspense fallback={null}>
          <EffectComposer multisampling={0}>
            <Bloom
              luminanceThreshold={0.55}
              luminanceSmoothing={0.02}
              intensity={bloomIntensity}
              blendFunction={BlendFunction.ADD}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      )}
    </>
  )
}
