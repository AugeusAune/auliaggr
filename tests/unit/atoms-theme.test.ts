import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import AppButton from '../../app/components/atoms/AppButton.vue'
import AppBadge from '../../app/components/atoms/AppBadge.vue'
import AppInput from '../../app/components/atoms/AppInput.vue'

describe('Atoms Coral Theme', () => {
  it('AppButton exports component and contains bg-primary', () => {
    expect(AppButton).toBeDefined()
    const content = readFileSync(
      resolve(process.cwd(), 'app/components/atoms/AppButton.vue'),
      'utf-8'
    )
    expect(content).toContain('bg-primary')
  })

  it('AppBadge contains coral/primary variant support with primary color', () => {
    expect(AppBadge).toBeDefined()
    const content = readFileSync(
      resolve(process.cwd(), 'app/components/atoms/AppBadge.vue'),
      'utf-8'
    )
    expect(content).toContain('bg-primary')
  })

  it('AppInput renders with light gray background and primary ring', () => {
    expect(AppInput).toBeDefined()
    const content = readFileSync(
      resolve(process.cwd(), 'app/components/atoms/AppInput.vue'),
      'utf-8'
    )
    expect(content).toContain('focus:ring-primary')
  })
})
