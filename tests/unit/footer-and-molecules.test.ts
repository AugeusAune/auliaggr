import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

describe('Footer and Molecules Coral Theme', () => {
  it('FooterSection does not contain "Crafted with Nuxt 4 & Atomic Design"', () => {
    const footerContent = readFileSync(
      resolve(process.cwd(), 'app/components/organisms/FooterSection.vue'),
      'utf-8'
    )
    expect(footerContent).not.toContain('Crafted with Nuxt 4 & Atomic Design')
  })

  it('ToolProgress uses primary coral color for progress bar fill', () => {
    const toolProgressContent = readFileSync(
      resolve(process.cwd(), 'app/components/molecules/ToolProgress.vue'),
      'utf-8'
    )
    expect(toolProgressContent).toContain('bg-primary')
  })
})
