import { describe, it, expect } from 'bun:test'
import tailwindConfig from '../../tailwind.config'

describe('Tailwind Theme Tokens', () => {
  it('defines primary color as #EC8F8D', () => {
    const colors = tailwindConfig.theme?.extend?.colors as Record<string, any>
    expect(colors.primary.DEFAULT).toBe('#EC8F8D')
  })

  it('defines light gray surface as #f6f6f6', () => {
    const colors = tailwindConfig.theme?.extend?.colors as Record<string, any>
    expect(colors.light.DEFAULT).toBe('#f6f6f6')
  })
})
