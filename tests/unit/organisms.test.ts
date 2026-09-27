import { describe, it, expect } from 'bun:test'
import HeroSection from '../../app/components/organisms/HeroSection.vue'
import BrandCarousel from '../../app/components/organisms/BrandCarousel.vue'
import JourneySection from '../../app/components/organisms/JourneySection.vue'
import AwardsSection from '../../app/components/organisms/AwardsSection.vue'
import ProjectsSection from '../../app/components/organisms/ProjectsSection.vue'
import ToolsSection from '../../app/components/organisms/ToolsSection.vue'
import StoriesSection from '../../app/components/organisms/StoriesSection.vue'
import CertificationsSection from '../../app/components/organisms/CertificationsSection.vue'
import FooterSection from '../../app/components/organisms/FooterSection.vue'
import DefaultLayout from '../../app/layouts/default.vue'

describe('Organisms & Layout components', () => {
  it('exports HeroSection component', () => {
    expect(HeroSection).toBeDefined()
  })

  it('exports BrandCarousel component', () => {
    expect(BrandCarousel).toBeDefined()
  })

  it('exports JourneySection component', () => {
    expect(JourneySection).toBeDefined()
  })

  it('exports AwardsSection component', () => {
    expect(AwardsSection).toBeDefined()
  })

  it('exports ProjectsSection component', () => {
    expect(ProjectsSection).toBeDefined()
  })

  it('exports ToolsSection component', () => {
    expect(ToolsSection).toBeDefined()
  })

  it('exports StoriesSection component', () => {
    expect(StoriesSection).toBeDefined()
  })

  it('exports CertificationsSection component', () => {
    expect(CertificationsSection).toBeDefined()
  })

  it('exports FooterSection component', () => {
    expect(FooterSection).toBeDefined()
  })

  it('exports DefaultLayout component', () => {
    expect(DefaultLayout).toBeDefined()
  })
})
