import { describe, it, expect } from 'bun:test'
import { existsSync, readFileSync } from 'node:fs'

describe('Favicon Integration', () => {
  it('favicon files exist in public directory', () => {
    expect(existsSync('public/favicon.ico')).toBeTrue()
    expect(existsSync('public/favicon.png')).toBeTrue()
    expect(existsSync('public/apple-touch-icon.png')).toBeTrue()
  })

  it('nuxt.config.ts configures favicon links', () => {
    const config = readFileSync('nuxt.config.ts', 'utf-8')
    expect(config).toContain('favicon.ico')
    expect(config).toContain('favicon.png')
    expect(config).toContain('apple-touch-icon.png')
  })
})
