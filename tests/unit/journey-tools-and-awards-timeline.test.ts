import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'

describe('Journey Tools Icons and Awards Timeline', () => {
  it('JourneyCard renders skills as clean text tags', () => {
    const cardCode = readFileSync('app/components/molecules/JourneyCard.vue', 'utf-8')
    expect(cardCode).toContain('milestone.skills')
    expect(cardCode).toContain('{{ skill }}')
  })

  it('AwardsSection implements timeline spine structure matching JourneySection', () => {
    const awardsCode = readFileSync('app/components/organisms/AwardsSection.vue', 'utf-8')
    expect(awardsCode).toContain('timelineRef')
    expect(awardsCode).toContain('scrollProgress')
    expect(awardsCode).toContain('activeLinePx')
    expect(awardsCode).toContain('AwardCard')
    expect(awardsCode).toContain(':index="idx + 1"')
    expect(awardsCode).toContain(':is-active="isAwardActive(idx)"')
  })

  it('AwardCard aligns date and certificate action with title text column', () => {
    const awardCardCode = readFileSync('app/components/molecules/AwardCard.vue', 'utf-8')
    expect(awardCardCode).toContain('formattedIndex')
    expect(awardCardCode).toContain('isActive')
    expect(awardCardCode).toContain('View Certificate')
    expect(awardCardCode).toContain('award.date')
  })

  it('Project detail page separates external links into Prototype and Behance buttons with /logo/ icons', () => {
    const detailCode = readFileSync('app/pages/projects/[slug].vue', 'utf-8')
    expect(detailCode).toContain('Prototype')
    expect(detailCode).toContain('Case Study')
    expect(detailCode).toContain('project.prototypeUrl')
    expect(detailCode).toContain('project.behanceUrl')
    expect(detailCode).toContain('/logo/figma.svg')
    expect(detailCode).toContain('/logo/behance_white.svg')
  })

  it('AppSocialIcon loads outline icons from /logo/ without hardcoded SVGs', () => {
    const socialCode = readFileSync('app/components/atoms/AppSocialIcon.vue', 'utf-8')
    expect(socialCode).toContain('/logo/ig.svg')
    expect(socialCode).toContain('/logo/linkedin.svg')
    expect(socialCode).toContain('/logo/behance.svg')
    expect(socialCode).toContain('/logo/dribbble.svg')
    expect(socialCode).not.toContain('<svg')
  })
})
