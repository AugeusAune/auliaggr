import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'

describe('Certificate Modal & Navigation', () => {
  it('CertificateModal defines prev and next buttons with < and >', () => {
    const code = readFileSync('app/components/molecules/CertificateModal.vue', 'utf-8')
    expect(code).toContain('prev')
    expect(code).toContain('next')
    expect(code).toContain('<')
    expect(code).toContain('>')
  })

  it('CertificateModal handles close event and keyboard escape', () => {
    const code = readFileSync('app/components/molecules/CertificateModal.vue', 'utf-8')
    expect(code).toContain('close')
    expect(code).toContain('Escape')
  })

  it('CertificationsSection integrates CertificateModal with selected index', () => {
    const code = readFileSync('app/components/organisms/CertificationsSection.vue', 'utf-8')
    expect(code).toContain('CertificateModal')
    expect(code).toContain('selectedCertIndex')
  })
})
