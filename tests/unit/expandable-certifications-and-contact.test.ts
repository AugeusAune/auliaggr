import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'

describe('Expandable Certifications & Contact Photo', () => {
  it('CertificationsSection implements expand/collapse toggle', () => {
    const certSection = readFileSync('app/components/organisms/CertificationsSection.vue', 'utf-8')
    expect(certSection).toContain('isExpanded')
    expect(certSection).toContain('visibleCertifications')
  })

  it('CertificateItem displays certificate image thumbnail', () => {
    const certItem = readFileSync('app/components/molecules/CertificateItem.vue', 'utf-8')
    expect(certItem).toContain('cert.imageUrl')
    expect(certItem).toContain('loading="lazy"')
  })

  it('FooterSection includes photo of Aulia in contact section', () => {
    const footer = readFileSync('app/components/organisms/FooterSection.vue', 'utf-8')
    expect(footer).toContain('/images/framer/aulia.png')
    expect(footer).toContain('loading="lazy"')
  })
})
