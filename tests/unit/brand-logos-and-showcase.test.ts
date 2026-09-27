import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'

describe('Brand Partner Logos & Showcase Background', () => {
  it('BrandCarousel renders brand logos instead of plain text tags', () => {
    const carousel = readFileSync('app/components/organisms/BrandCarousel.vue', 'utf-8')
    expect(carousel).toContain('brand.logoUrl')
    expect(carousel).toContain('loading="lazy"')
    expect(carousel).toContain(':alt="brand.name"')
  })

  it('StoriesSection renders showcase background image', () => {
    const stories = readFileSync('app/components/organisms/StoriesSection.vue', 'utf-8')
    expect(stories).toContain('/images/framer/showcase_bg.png')
  })
})
