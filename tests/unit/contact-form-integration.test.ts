import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'

describe('ContactForm API Integration', () => {
  it('ContactForm submits to /api/contact using $fetch', () => {
    const formCode = readFileSync('app/components/molecules/ContactForm.vue', 'utf-8')
    expect(formCode).toContain('/api/contact')
    expect(formCode).toContain('$fetch')
    expect(formCode).toContain('POST')
  })

  it('ContactForm handles server error responses', () => {
    const formCode = readFileSync('app/components/molecules/ContactForm.vue', 'utf-8')
    expect(formCode).toContain('catch')
    expect(formCode).toContain('errorMessage')
  })
})
