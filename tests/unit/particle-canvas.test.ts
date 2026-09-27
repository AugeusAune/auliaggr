import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'

describe('ParticleCanvas Atom Component', () => {
  it('defines canvas element with absolute positioning and pointer-events-none', () => {
    const code = readFileSync('app/components/atoms/ParticleCanvas.vue', 'utf-8')
    expect(code).toContain('<canvas')
    expect(code).toContain('pointer-events-none')
  })

  it('safely handles client-only lifecycle and cancels animation frame on unmounted', () => {
    const code = readFileSync('app/components/atoms/ParticleCanvas.vue', 'utf-8')
    expect(code).toContain('onMounted')
    expect(code).toContain('onUnmounted')
    expect(code).toContain('cancelAnimationFrame')
  })

  it('uses coral primary color tokens for particles', () => {
    const code = readFileSync('app/components/atoms/ParticleCanvas.vue', 'utf-8')
    expect(code).toContain('236, 143, 141') // RGB equivalent of #EC8F8D
  })
})
