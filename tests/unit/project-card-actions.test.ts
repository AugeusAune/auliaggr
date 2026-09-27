import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'
import { projectsData } from '../../app/data/portfolio'

describe('Project Card Actions (Prototype & Behance Study Case)', () => {
  it('ProjectCard defines Prototype and Behance Study Case buttons', () => {
    const cardCode = readFileSync('app/components/molecules/ProjectCard.vue', 'utf-8')
    expect(cardCode).toContain('prototype-btn')
    expect(cardCode).toContain('behance-btn')
    expect(cardCode).toContain('Prototype')
    expect(cardCode).toContain('Behance Study Case')
  })

  it('ProjectCard preserves lazy loading and async decoding for images', () => {
    const cardCode = readFileSync('app/components/molecules/ProjectCard.vue', 'utf-8')
    expect(cardCode).toContain('loading="lazy"')
    expect(cardCode).toContain('decoding="async"')
  })

  it('Portfolio projects have prototypeUrl and behanceUrl defined', () => {
    expect(projectsData.length).toBeGreaterThan(0)
    const roro = projectsData.find(p => p.slug === 'rorojonggrang')
    expect(roro).toBeDefined()
    expect(roro?.prototypeUrl).toBeDefined()
    expect(roro?.behanceUrl).toBeDefined()
    expect(roro?.behanceUrl).toContain('behance.net')
  })
})
