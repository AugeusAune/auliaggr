import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

describe('Organisms Theme Consistency', () => {
  it('StoriesSection does not use bg-neutral-900 full dark block', () => {
    const storiesContent = readFileSync(
      resolve(process.cwd(), 'app/components/organisms/StoriesSection.vue'),
      'utf-8'
    )
    expect(storiesContent).not.toContain('bg-neutral-900 text-white')
    expect(storiesContent).toContain('bg-white')
  })

  it('Projects index page uses bg-primary for active filter tab', () => {
    const projectsIndexContent = readFileSync(
      resolve(process.cwd(), 'app/pages/projects/index.vue'),
      'utf-8'
    )
    expect(projectsIndexContent).toContain('bg-primary')
  })
})
