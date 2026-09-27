import { describe, it, expect } from 'bun:test'
import AppButton from '../../app/components/atoms/AppButton.vue'
import AppBadge from '../../app/components/atoms/AppBadge.vue'
import AppHeading from '../../app/components/atoms/AppHeading.vue'
import AppInput from '../../app/components/atoms/AppInput.vue'
import AppSocialIcon from '../../app/components/atoms/AppSocialIcon.vue'

describe('Atoms components', () => {
  it('exports AppButton component', () => {
    expect(AppButton).toBeDefined()
  })

  it('exports AppBadge component', () => {
    expect(AppBadge).toBeDefined()
  })

  it('exports AppHeading component', () => {
    expect(AppHeading).toBeDefined()
  })

  it('exports AppInput component', () => {
    expect(AppInput).toBeDefined()
  })

  it('exports AppSocialIcon component', () => {
    expect(AppSocialIcon).toBeDefined()
  })
})
