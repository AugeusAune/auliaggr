import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'

describe('Connected Timeline & Award Logos', () => {
  it('JourneySection contains a continuous timeline track line', () => {
    const section = readFileSync('app/components/organisms/JourneySection.vue', 'utf-8')
    expect(section).toContain('border-l-2')
  })

  it('JourneyCard has milestone node dot and year indicator', () => {
    const card = readFileSync('app/components/molecules/JourneyCard.vue', 'utf-8')
    expect(card).toContain('milestone.year')
    expect(card).toContain('rounded-full')
  })

  it('AwardCard renders organization logo when available', () => {
    const award = readFileSync('app/components/molecules/AwardCard.vue', 'utf-8')
    expect(award).toContain('award.logoUrl')
    expect(award).toContain('loading="lazy"')
  })
})
