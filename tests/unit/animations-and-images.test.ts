import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

describe('Animations and Image Integration', () => {
  it('HeroSection renders authentic portrait image', () => {
    const heroContent = readFileSync(
      resolve(process.cwd(), 'app/components/organisms/HeroSection.vue'),
      'utf-8'
    )
    expect(heroContent).toContain('portraitUrl')
  })

  it('BrandCarousel implements infinite marquee animation classes', () => {
    const carouselContent = readFileSync(
      resolve(process.cwd(), 'app/components/organisms/BrandCarousel.vue'),
      'utf-8'
    )
    expect(carouselContent).toContain('animate-marquee')
  })

  it('main.css defines smooth scrolling and marquee keyframes', () => {
    const cssContent = readFileSync(
      resolve(process.cwd(), 'app/assets/css/main.css'),
      'utf-8'
    )
    expect(cssContent).toContain('scroll-behavior: smooth')
    expect(cssContent).toContain('@keyframes marquee')
  })
})
