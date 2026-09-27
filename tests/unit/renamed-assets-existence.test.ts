import { describe, it, expect } from 'bun:test'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { portfolioData } from '../../app/data/portfolio'

describe('Renamed Semantic Assets Existence', () => {
  it('profile avatar and portrait exist on disk', () => {
    expect(existsSync(join(process.cwd(), 'public', portfolioData.profile.avatarUrl))).toBe(true)
    expect(existsSync(join(process.cwd(), 'public', portfolioData.profile.portraitUrl!))).toBe(true)
  })

  it('all project cover images exist on disk', () => {
    for (const project of portfolioData.projects) {
      expect(existsSync(join(process.cwd(), 'public', project.coverImage))).toBe(true)
    }
  })

  it('all brand partner logos exist on disk', () => {
    expect(portfolioData.brands.length).toBeGreaterThan(0)
    for (const brand of portfolioData.brands) {
      expect(brand.logoUrl).toBeDefined()
      expect(existsSync(join(process.cwd(), 'public', brand.logoUrl))).toBe(true)
    }
  })

  it('all award logos exist on disk', () => {
    for (const award of portfolioData.awards) {
      expect(award.logoUrl).toBeDefined()
      expect(existsSync(join(process.cwd(), 'public', award.logoUrl!))).toBe(true)
    }
  })

  it('all tool logos exist on disk', () => {
    for (const tool of portfolioData.tools) {
      expect(existsSync(join(process.cwd(), 'public', tool.iconUrl))).toBe(true)
    }
  })

  it('all certifications have valid images on disk', () => {
    for (const cert of portfolioData.certifications) {
      expect(cert.imageUrl).toBeDefined()
      expect(existsSync(join(process.cwd(), 'public', cert.imageUrl!))).toBe(true)
    }
  })
})
