import { describe, it, expect } from 'bun:test'
import NavPill from '../../app/components/molecules/NavPill.vue'
import ProjectCard from '../../app/components/molecules/ProjectCard.vue'
import JourneyCard from '../../app/components/molecules/JourneyCard.vue'
import AwardCard from '../../app/components/molecules/AwardCard.vue'
import ToolProgress from '../../app/components/molecules/ToolProgress.vue'
import CertificateItem from '../../app/components/molecules/CertificateItem.vue'
import ContactForm from '../../app/components/molecules/ContactForm.vue'

describe('Molecules components', () => {
  it('exports NavPill component', () => {
    expect(NavPill).toBeDefined()
  })

  it('exports ProjectCard component', () => {
    expect(ProjectCard).toBeDefined()
  })

  it('exports JourneyCard component', () => {
    expect(JourneyCard).toBeDefined()
  })

  it('exports AwardCard component', () => {
    expect(AwardCard).toBeDefined()
  })

  it('exports ToolProgress component', () => {
    expect(ToolProgress).toBeDefined()
  })

  it('exports CertificateItem component', () => {
    expect(CertificateItem).toBeDefined()
  })

  it('exports ContactForm component', () => {
    expect(ContactForm).toBeDefined()
  })
})
