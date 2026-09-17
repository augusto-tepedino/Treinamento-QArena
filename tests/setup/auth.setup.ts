import { test as setup, expect } from '../support/fixtures'
import { USERS, STORAGE_STATE } from '../support/data/users'

setup('authenticate as valid user', async ({ app, page }) => {
  await app.login.goto()
  await app.login.login(USERS.validUser)
  await expect(page).toHaveURL('/app')
  await expect(app.login.elements.validatedValidLogin).toContainText('Olá, Usuário')

  await page.context().storageState({ path: STORAGE_STATE.validUser })
})

setup('authenticate as orders user', async ({ app, page }) => {
  await app.login.goto()
  await app.login.login(USERS.ordersUser)
  await expect(page).toHaveURL('/app')
  await expect(app.login.elements.validatedValidLogin).toContainText('Olá, Usuário')

  await page.context().storageState({ path: STORAGE_STATE.ordersUser })
})
