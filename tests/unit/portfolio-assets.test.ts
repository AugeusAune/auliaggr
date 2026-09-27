import { describe, it, expect } from 'bun:test'
import { portfolioData } from '../../app/data/portfolio'

describe('Portfolio Authentic Assets', () => {
  it('profile has authentic local avatar and portrait image paths', () => {
    expect(portfolioData.profile.avatarUrl).toContain('/images/framer/')
    expect(portfolioData.profile.portraitUrl).toBeDefined()
  })

  it('all projects have authentic cover images', () => {
    for (const project of portfolioData.projects) {
      expect(project.coverImage).toContain('/images/framer/')
    }
  })

  it('tool skills do not have percentage properties', () => {
    for (const tool of portfolioData.tools) {
      expect((tool as any).percentage).toBeUndefined()
      expect(tool.name).toBeDefined()
    }
  })
})
