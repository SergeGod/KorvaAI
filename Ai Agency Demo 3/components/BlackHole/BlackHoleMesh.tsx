'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { VERTEX_SHADER, FRAGMENT_SHADER } from './shaders'

interface BlackHoleMeshProps {
  quality: number        // 0.0 = medium, 1.0 = high
  reducedMotion: boolean
}

export function BlackHoleMesh({ quality, reducedMotion }: BlackHoleMeshProps) {
  const { viewport, gl } = useThree()

  // Uniforms created once; mutated in-place for performance
  const uniforms = useMemo(
    () => ({
      uTime:       { value: 0 },
      uResolution: { value: new THREE.Vector2(gl.domElement.width, gl.domElement.height) },
      uQuality:    { value: quality },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // Sync resolution to actual framebuffer dimensions (accounts for DPR)
  useEffect(() => {
    uniforms.uResolution.value.set(gl.domElement.width, gl.domElement.height)
  }, [viewport, gl, uniforms])

  // Sync quality tier when it changes
  useEffect(() => {
    uniforms.uQuality.value = quality
  }, [quality, uniforms])

  // Animate time uniform every frame (capped delta to prevent jumps after tab-switch)
  useFrame(({ clock }) => {
    if (!reducedMotion) {
      uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}
