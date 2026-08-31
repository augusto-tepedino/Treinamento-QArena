import type { Locator, Page } from '@playwright/test'
import { HeaderComponent } from '../components/headerComponent'

export class LoginPage {
  readonly page: Page
  readonly header: HeaderComponent

  readonly loginSection: Locator
  readonly userEmail: Locator
  readonly loginButton: Locator
  private readonly userPassword: Locator

  readonly msgErroEmail: Locator
  readonly msgErroGeral: Locator

  constructor(page: Page) {
    this.page = page
    this.header = new HeaderComponent(page)

    this.loginSection = page.getByRole('heading', { name: 'Entrar no QArena' }).locator('..')
    this.userEmail = this.loginSection.getByLabel('E-mail')
    this.userPassword = this.loginSection.getByPlaceholder('Sua senha')
    this.loginButton = this.loginSection.getByRole('button', { name: 'Entrar' })

    this.msgErroEmail = this.loginSection.getByTestId('login-msg-erro-email')
    this.msgErroGeral = this.page.getByTestId('login-msg-erro-geral')
  }

  async goToRegisterPage() {
    await this.page.getByRole('link', { name: 'Criar conta' }).click()
  }

  async login(user: { email: string; password: string }) {
    await this.userEmail.fill(user.email)
    await this.userPassword.fill(user.password)
    await this.loginButton.click()
  }
}
