import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'

describe('Transitions & Lazy Loading', () => {
  it('nuxt.config.ts configures page transitions', () => {
    const config = readFileSync('nuxt.config.ts', 'utf-8')
    expect(config).toContain('pageTransition')
  })

  it('main.css defines page transition styles and keyframes', () => {
    const css = readFileSync('app/assets/css/main.css', 'utf-8')
    expect(css).toContain('.page-enter-active')
    expect(css).toContain('.page-leave-active')
  })

  it('ProjectCard does not use heavy hover:shadow-lg', () => {
    const card = readFileSync('app/components/molecules/ProjectCard.vue', 'utf-8')
    expect(card).not.toContain('hover:shadow-lg')
    expect(card).toContain('loading="lazy"')
    expect(card).toContain('decoding="async"')
  })
})
