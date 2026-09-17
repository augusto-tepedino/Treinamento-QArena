import type { Page } from '@playwright/test'

export function createLoginActions(page: Page) {
  const loginSection = page.getByRole('heading', { name: 'Entrar no QArena' }).locator('..')
  const userEmail = loginSection.getByLabel('E-mail')
  const userPassword = loginSection.getByPlaceholder('Sua senha')
  const loginButton = loginSection.getByRole('button', { name: 'Entrar' })
  const linkCriarConta = loginSection.getByRole('link', { name: 'Criar conta' })

  const msgErroEmail = loginSection.getByTestId('login-msg-erro-email')
  const msgErroGeral = page.getByTestId('login-msg-erro-geral')

  const validatedValidLogin = page.getByTestId('dashboard-saudacao')

  return {
    elements: {
      loginSection,
      userEmail,
      userPassword,
      loginButton,
      linkCriarConta,
      msgErroEmail,
      msgErroGeral,

      validatedValidLogin,
    },

    async goto() {
      await page.goto('/login')
    },

    async goToRegisterPage() {
      await linkCriarConta.click()
    },

    async login(user: { email?: string; password?: string }) {
      if (user.email !== undefined) await userEmail.fill(user.email)
      if (user.password !== undefined) await userPassword.fill(user.password)
      await loginButton.click()
    },
  }
}
