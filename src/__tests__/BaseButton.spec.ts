import { describe, test, expect } from 'vitest'
import BaseButton from '@/shared/ui/BaseButton/BaseButton.vue'

describe('base component test', () => {
  test('normal imports as expected', async () => {
    const cmp = await import('@/pages/main/ui/MainPage.vue')
    expect(cmp).toBeDefined()
  })

  test('mount component', async () => {
    expect(BaseButton).toBeTruthy()
  })
})
