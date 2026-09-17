import { test, expect } from '../support/fixtures'
import { STORAGE_STATE } from '../support/data/users'

test.use({ storageState: STORAGE_STATE.validUser })

test.describe('Navigation', () => {
  test('Access Loja page', async ({ app, page }) => {
    await app.loja.goto()
    await expect(page).toHaveURL('/app/loja')
    await expect(page.getByRole('heading', { name: 'Loja' })).toBeVisible()
  })
})