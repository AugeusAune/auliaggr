import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

describe('Button Contrast & Back-to-Top Button', () => {
  it('AppButton primary variant uses text-white', () => {
    const buttonContent = readFileSync(
      resolve(process.cwd(), 'app/components/atoms/AppButton.vue'),
      'utf-8'
    )
    expect(buttonContent).toContain('text-white')
    expect(buttonContent).not.toContain('bg-primary hover:bg-[#e27b79] text-dark')
  })

  it('FooterSection contains functional scrollToTop handler', () => {
    const footerContent = readFileSync(
      resolve(process.cwd(), 'app/components/organisms/FooterSection.vue'),
      'utf-8'
    )
    expect(footerContent).toContain('scrollToTop')
    expect(footerContent).toContain('window.scrollTo')
  })
})
