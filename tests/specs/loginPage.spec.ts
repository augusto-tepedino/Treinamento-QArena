import { test, expect } from '../fixtures/fixtures'
import { HomePage } from '../pages/homePage'
import { LoginPage } from '../pages/loginPage'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('Navigation', () => {
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
  })

  test('Reach Login page - Header', async ({ header, page }) => {
    await header.clickEntrarBtn()
    await expect(page).toHaveURL('/login')
    await expect(loginPage.loginSection).toBeVisible()
  })

  test('Reach Login page - Home', async ({ page }) => {
    const home = new HomePage(page)
    await home.clickEntrarBtn()
    await expect(page).toHaveURL('/login')
    await expect(loginPage.loginSection).toBeVisible()
  })

  test('Go to Register Page', async ({ header, page }) => {
    await header.clickEntrarBtn()
    await loginPage.goToRegisterPage()
    await expect(page).toHaveURL('/cadastro')
  })
})

test.describe('Login', () => {
  let loginPage: LoginPage
  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page)
    loginPage = new LoginPage(page)

    await home.clickEntrarBtn()
  })

  test('Validate Login - Sucesso', async ({ page }) => {
    const user = {
      email: 'usuario.sucesso@qazero.com',
      password: 'Qa@123456',
    }

    await loginPage.login(user)

    await expect(page.getByTestId('dashboard-saudacao')).toContainText('Olá, Usuário')
  })

  test.fail('Validate Login - Bloqueado', async () => {
    const user = {
      email: 'usuario.sucesso@qazero.com',
      password: 'Qa@123456',
    }

    await loginPage.login(user)

    //test fails because the blocked user still logs normally
    await expect(loginPage.msgErroGeral).toContainText('Usuário Bloqueado!')
  })

  test.fail('Validate Login - Sem permissão', async ({ page }) => {
    const user = {
      email: 'usuario.sempermissao@qazero.com',
      password: 'Qa@123456',
    }

    await loginPage.login(user)

    //Fails because it is expected a text, but only shows a full empty screen
    await expect(page.getByTestId('dashboard-conteudo')).toContainText('Usuário sem permissão!')
  })

  test('Validate Login - Suspenso', async () => {
    const user = {
      email: 'usuario.suspenso@qazero.com',
      password: 'Qa@123456',
    }

    await loginPage.login(user)

    await expect(loginPage.msgErroGeral).toContainText('Esta conta está suspensa e sem acesso ao sistema.')
  })

  test('Validate Login - Inválido', async () => {
    const user = {
      email: 'usuario.invalido@qazero.com',
      password: 'Qa@123456',
    }

    await loginPage.login(user)

    await expect(loginPage.msgErroGeral).toContainText('Usuário não encontrado')
  })
})

test.describe('Error Message', () => {
  let loginPage: LoginPage
  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page)
    loginPage = new LoginPage(page)

    await home.clickEntrarBtn()
  })

  test.fail('Validate invalid email format - No @ but with .', async () => {
    const user = {
      email: 'usuario.com',
      password: 'pass',
    }
    await loginPage.login(user)

    //Fail: without @, but with an '.', the email is considered valid
    await expect(loginPage.msgErroEmail).toContainText('Informe um e-mail em um formato válido')
  })

  test('Validate invalid email format - No @ and no .', async () => {
    const user = {
      email: 'usuariocom',
      password: 'pass',
    }
    await loginPage.login(user)

    await expect(loginPage.msgErroEmail).toContainText('Informe um e-mail em um formato válido')
  })

  test('Validate invalid email format - With @', async () => {
    const user = {
      email: 'usuario@com',
      password: 'pass',
    }
    await loginPage.login(user)

    await expect(loginPage.msgErroEmail).toContainText('Informe um e-mail em um formato válido')
  })

  test.fail('Validate invalid email format - Wrong Password', async () => {
    const user = {
      email: 'usuario.sucesso@qazero.com',
      password: 'pass',
    }
    await loginPage.login(user)

    //Fail: shows message "Usuário não encontrado"
    await expect(loginPage.msgErroGeral).toContainText('Senha incorreta')
  })

  test.fail('Validate invalid email format - Spaces in front of end of email', async () => {
    const user = {
      email: '   usuario.sucesso@qazero.com   ',
      password: 'pass',
    }

    await loginPage.userEmail.fill(user.email)
    const emailInput = await loginPage.userEmail.inputValue()

    //Fail: email not trimmed
    expect(emailInput).toBe(user.email.trim())
  })

  test.describe('UX', () => {
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
      const home = new HomePage(page)
      loginPage = new LoginPage(page)

      await home.clickEntrarBtn()
      await expect(page).toHaveURL('/login')
    })

    test.fail('Validate Entrar button Status', async () => {
      await expect(loginPage.loginButton).toBeDisabled()
    })

    test.fail('Validate invalid email format - Error Message before form is sent', async () => {
      const email = 'usuario.com'

      await loginPage.userEmail.fill(email)
      await loginPage.userEmail.blur()

      //Fail: Error message doesn't show up before form is sent
      await expect(loginPage.msgErroEmail).toContainText('Informe um e-mail em um formato válido')
    })
  })
})
