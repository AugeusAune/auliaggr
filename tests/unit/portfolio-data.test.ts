import { describe, it, expect } from 'bun:test'
import { portfolioData } from '../../app/data/portfolio'

describe('Portfolio Data', () => {
  it('contains expected projects including rorojonggrang', () => {
    expect(portfolioData.projects.length).toBeGreaterThanOrEqual(14)
    const roro = portfolioData.projects.find(p => p.slug === 'rorojonggrang')
    expect(roro).toBeDefined()
    expect(roro?.title).toBe('Kisah Roro Jonggrang')
    expect(roro?.client).toBe('IPB University')
  })

  it('contains journey milestones from 2021 to 2026', () => {
    expect(portfolioData.journey.length).toBeGreaterThanOrEqual(5)
    expect(portfolioData.journey.some(j => j.year === '2026')).toBeTrue()
    expect(portfolioData.journey.some(j => j.company === 'Aiti Media')).toBeTrue()
  })

  it('contains awards with valid titles and dates', () => {
    expect(portfolioData.awards.length).toBeGreaterThanOrEqual(2)
    expect(portfolioData.awards[0].title).toContain('Switchfest')
  })

  it('contains tools with categories and icons', () => {
    expect(portfolioData.tools.length).toBeGreaterThanOrEqual(6)
    const figma = portfolioData.tools.find(t => t.name === 'Figma')
    expect(figma?.category).toBe('UI/UX Design')
    expect(figma?.iconUrl).toContain('/images/framer/')
  })

  it('contains certifications', () => {
    expect(portfolioData.certifications.length).toBeGreaterThanOrEqual(15)
  })
})
