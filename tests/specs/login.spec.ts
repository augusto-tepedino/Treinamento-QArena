import { test, expect } from '../support/fixtures'
import { HomePage } from '../pages/homePage'
import { USERS } from '../support/data/users'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('Navigation', () => {
  const expectedLoginURL = '/login'

  test('Reach Login page - Header', async ({ app, page }) => {
    await app.navigation.elements.headerBtnEntrar.click()
    await expect(page).toHaveURL(expectedLoginURL)
    await expect(app.login.elements.loginSection).toBeVisible()
  })

  test('Reach Login page - Home', async ({ app, page }) => {
    await app.navigation.clickEntrarBtn()
    await expect(page).toHaveURL(expectedLoginURL)
    await expect(app.login.elements.loginSection).toBeVisible()
  })

  test('Go to Register Page', async ({ app, page }) => {
    await app.navigation.clickEntrarBtn()
    await app.login.goToRegisterPage()
    await expect(page).toHaveURL('/cadastro')
  })
})

test.describe('Login', () => {
  test.beforeEach(async ({ app }) => {
    await app.login.goto()
  })

  test('Validate Login - Sucesso', async ({ app, page }) => {
    await app.login.login(USERS.validUser)
    await expect(page).toHaveURL('/app')
    await expect(app.login.elements.validatedValidLogin).toContainText('Olá, Usuário')
  })

  test('Validate Login - Bloqueado', async ({ app }) => {
    test.fail(true, 'EXPECTED BUG: This test fails because the blocked user still logs in normally (Training bug).')
    await app.login.login(USERS.blockedUser)

    await expect(app.login.elements.msgErroGeral).toContainText('Usuário Bloqueado!')
  })

  test('Validate Login - Sem permissão', async ({ app, page }) => {
    test.fail(true, 'EXPECTED BUG: This test fails because it is expected a text, but only shows a full empty screen (Training bug).')
    await app.login.login(USERS.noPermissionUser)

    //Fails b
    await expect(page.getByTestId('dashboard-conteudo')).toContainText('Usuário sem permissão!')
  })

  test('Validate Login - Suspenso', async ({ app }) => {
    await app.login.login(USERS.suspendedUser)

    await expect(app.login.elements.msgErroGeral).toContainText('Esta conta está suspensa e sem acesso ao sistema.')
  })

  test('Validate Login - Inválido', async ({ app }) => {
    await app.login.login(USERS.invalidUser)

    await expect(app.login.elements.msgErroGeral).toContainText('Usuário não encontrado')
  })
})

test.describe('Error Message', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)

    await homePage.clickEntrarBtn()
  })

  test('Validate invalid email format - No @ but with .', async ({ app }) => {
    test.fail(true, 'EXPECTED BUG: This test fails because without @, but with an "." the email is considered valid (Training bug).')
    const user = {
      email: 'usuario.com',
      password: 'pass',
    }
    await app.login.login(user)

    await expect(app.login.elements.msgErroEmail).toContainText('Informe um e-mail em um formato válido')
  })

  test('Validate invalid email format - No @ and no .', async ({ app }) => {
    const user = {
      email: 'usuariocom',
      password: 'pass',
    }
    await app.login.login(user)

    await expect(app.login.elements.msgErroEmail).toContainText('Informe um e-mail em um formato válido')
  })

  test('Validate invalid email format - With @', async ({ app }) => {
    const user = {
      email: 'usuario@com',
      password: 'pass',
    }
    await app.login.login(user)

    await expect(app.login.elements.msgErroEmail).toContainText('Informe um e-mail em um formato válido')
  })

  test('Validate invalid email format - Wrong Password', async ({ app }) => {
    test.fail(true, 'EXPECTED BUG: This test fails because shows message "Usuário não encontrado" (Training bug).')
    const user = {
      email: 'usuario.sucesso@qazero.com',
      password: 'pass',
    }
    await app.login.login(user)

    await expect(app.login.elements.msgErroGeral).toContainText('Senha incorreta')
  })

  test('Validate invalid email format - Spaces in front of end of email', async ({ app }) => {
    test.fail(true, 'EXPECTED BUG: This test fails because email is not trimmed (Training bug).')
    const user = {
      email: '   usuario.sucesso@qazero.com   ',
      password: 'pass',
    }

    await app.login.elements.userEmail.fill(user.email)
    const emailInput = await app.login.elements.userEmail.inputValue()

    expect(emailInput).toBe(user.email.trim())
  })

  test.describe('UX', () => {
    test.beforeEach(async ({ page }) => {
      await expect(page).toHaveURL('/login')
    })

    test('Validate Entrar button Status', async ({ app }) => {
      test.fail(true, 'EXPECTED BUG: This test fails because the button is enabled when it should be disabled (Training bug).')
      await expect(app.login.elements.loginButton).toBeDisabled()
    })

    test('Validate invalid email format - Error Message before form is sent', async ({ app }) => {
      test.fail(true, "EXPECTED BUG: This test fails because Error message doesn't show up before form is sent (Training bug).")
      const email = 'usuario.com'

      await app.login.elements.userEmail.fill(email)
      await app.login.elements.userEmail.blur()

      await expect(app.login.elements.msgErroEmail).toContainText('Informe um e-mail em um formato válido')
    })
  })
})
