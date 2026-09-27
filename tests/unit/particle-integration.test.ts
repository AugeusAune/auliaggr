import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'

describe('Particle Canvas Integration', () => {
  it('HeroSection embeds ParticleCanvas within ClientOnly tag', () => {
    const heroCode = readFileSync('app/components/organisms/HeroSection.vue', 'utf-8')
    expect(heroCode).toContain('ParticleCanvas')
    expect(heroCode).toContain('ClientOnly')
  })
})
