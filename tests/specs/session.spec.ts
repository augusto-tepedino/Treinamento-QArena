import { test, expect } from '../support/fixtures'
import { STORAGE_STATE } from '../support/data/users'

test.describe('Protected Routes', () => {
  test('Redirect to login when accessing /app unauthenticated', async ({ page }) => {
    await page.goto('/app')
    await expect(page).toHaveURL('/login')
  })

  test('Redirect to login when accessing /app/perfil unauthenticated', async ({ page }) => {
    await page.goto('/app/perfil')
    await expect(page).toHaveURL('/login')
  })

  test('Redirect to login when accessing /app/pedidos unauthenticated', async ({ page }) => {
    await page.goto('/app/pedidos')
    await expect(page).toHaveURL('/login')
  })
})

test.describe('Session Persistence', () => {
  test.use({ storageState: STORAGE_STATE.validUser })

  test('User remains logged in after page refresh', async ({ app, page }) => {
    await page.goto('/app')
    await expect(page).toHaveURL('/app')
    await expect(app.login.elements.validatedValidLogin).toContainText('Olá, Usuário')

    await page.reload()

    await expect(page).toHaveURL('/app')
    await expect(app.login.elements.validatedValidLogin).toContainText('Olá, Usuário')

    const localStorageAuth = await page.evaluate(() => localStorage.getItem('qarena-auth'))
    expect(localStorageAuth).not.toBeNull()
  })
})

test.describe('Logout Flow', () => {
  test.use({ storageState: STORAGE_STATE.validUser })

  test('Logout clears session and redirects to home', async ({ page }) => {
    await page.goto('/app')
    await expect(page).toHaveURL('/app')

    const btnSair = page.getByTestId('app-sidebar-btn-sair')
    await btnSair.click()

    await expect(page).toHaveURL('/')

    const localStorageAuth = await page.evaluate(() => localStorage.getItem('qarena-auth'))
    if (localStorageAuth) {
      const parsed = JSON.parse(localStorageAuth)
      expect(parsed.state.usuarioLogado).toBeNull()
    }
  })
})
