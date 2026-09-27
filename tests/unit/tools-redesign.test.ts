import { describe, it, expect } from 'bun:test'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

describe('Skills Redesign', () => {
  it('ToolProgress does not contain percentage or progress bars', () => {
    const toolContent = readFileSync(
      resolve(process.cwd(), 'app/components/molecules/ToolProgress.vue'),
      'utf-8'
    )
    expect(toolContent).not.toContain('tool.percentage')
    expect(toolContent).not.toContain('width: tool.percentage')
  })

  it('Tool card displays tool icon and category badge', () => {
    const toolContent = readFileSync(
      resolve(process.cwd(), 'app/components/molecules/ToolProgress.vue'),
      'utf-8'
    )
    expect(toolContent).toContain('tool.category')
  })
})
