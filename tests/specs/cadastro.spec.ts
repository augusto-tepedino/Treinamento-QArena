import { test, expect } from '../support/fixtures'
import { HomePage } from '../pages/homePage'

let alerts: any

test.beforeEach(async ({ app }) => {
  alerts = app.cadastro.elements.alerts;
})

test.describe('Navigation', () => {
  const expectedRegisterURL = '/cadastro'

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Reach Cadastro page - Header', async ({ app, page }) => {
    await app.navigation.clickCriarContaBtn()
    await expect(page).toHaveURL(expectedRegisterURL)
    await expect(app.cadastro.elements.registerSection).toBeVisible()
  })

  test('Reach Cadastro page - Home', async ({ app, page }) => {
    const homePage = new HomePage(page)

    await homePage.clickCriarContaBtn()
    await expect(page).toHaveURL(expectedRegisterURL)
    await expect(app.cadastro.elements.registerSection).toBeVisible()
  })
})

test.describe('Create Cadastro', () => {

  test.beforeEach(async ({ app }) => {
    app.cadastro.goto()

  })

  test('Valid Cadastro', async ({ app }) => {
    const user = {
      nome: 'Augusto',
      email: 'teste@google.com',
      cpf: '002.083.481-07',
      telefone: '5544447328',
      senha: '12345678',
    }

    await app.cadastro.fillCadastro(user)
    await app.cadastro.elements.cadastroButton.click()

    await expect(app.cadastro.elements.contaCriadaModal).toBeVisible()
    await expect(app.cadastro.elements.contaCriadaModal.getByRole('heading', { name: 'Conta criada' })).toHaveText('Conta criada')
    await expect(app.cadastro.elements.contaCriadaModal.getByText('A sua conta foi criada.')).toHaveText(
      'A sua conta foi criada. Guarde o número dela, você vai usar para se reconhecer no ambiente.',
    )
    await expect(app.cadastro.elements.contaCriadaModal.getByTestId('modal-cadastro-btn-ir-login')).toBeVisible()
  })

  test.describe('Invalid Cadastro Flows', () => {
    test('No Conta criada message', async ({ app }) => {
      test.fail(true, "EXPECTED BUG: test fails because message is shown when it shouldn't (Training bug)")

      await app.cadastro.elements.cadastroButton.click()
      await expect(app.cadastro.elements.contaCriadaToaster).toBeHidden({ timeout: 1 })
    })

    test.fail('Duplicate Email', async ({ app, page }) => {
      test.fail(true, 'EXPECTED BUG: test fails because system allows duplicated cadastros (Training bug)')
      const user = {
        nome: 'Augusto',
        email: 'teste@google.com',
        cpf: '002.083.481-07',
        telefone: '5544447328',
        senha: '12345678',
      }

      await app.cadastro.fillCadastro(user)
      await app.cadastro.elements.cadastroButton.click()

      await expect(page.getByText('Email já cadastrado')).toBeVisible()
    })

    test('Invalid CPF', async ({ app }) => {
      test.fail(true, 'EXPECTED BUG: test fails because system allows duplicated cadastros (Training bug)')
      const user = {
        cpf: '111.111.111-11',
      }

      await app.cadastro.elements.cpfLabel.fill(user.cpf)
      await app.cadastro.elements.cadastroButton.click()

      await expect(alerts.cpf).toBeVisible()
    })

    test('Termos not accepted', async ({ app }) => {
      test.fail(true, 'EXPECTED BUG: test fails because system allows cadastros without confirming termos (Training bug)')
      const user = {
        nome: 'Augusto',
        email: 'teste@google.com',
        cpf: '002.083.481-07',
        telefone: '5544447328',
        senha: '12345678',
      }

      await app.cadastro.fillCadastro(user)
      await app.cadastro.elements.termosCheckbox.uncheck()
      await app.cadastro.elements.cadastroButton.click()

      await expect(alerts.termos).toBeVisible()
    })

    test('Validate telefone digits', async ({ app }) => {
      test.fail(true, "EXPECTED BUG: test fails because system doesn't allow a 9 digit phone (Training bug)")
      const user = {
        telefone: '48333256987',
      }

      await app.cadastro.elements.telefoneLabel.fill(user.telefone)

      const unmaskedPhoneValue = (await app.cadastro.elements.telefoneLabel.inputValue()).replace(/\D/g, '')

      expect(unmaskedPhoneValue).toBe(user.telefone)
    })

    test("Senha doesn't match Confirmacao Senha", async ({ app }) => {
      test.fail(true, "EXPECTED BUG: test fails because system doesn't check the different  allows cadastros without confirming termos(Training bug)")
      const user = {
        nome: 'Augusto',
        email: 'teste@google.com',
        cpf: '002.083.481-07',
        telefone: '5544447328',
        senha: '12345678',
        confirmacaoSenha: 'diferenteDaSenha',
      }

      await app.cadastro.fillCadastro(user)
      await app.cadastro.elements.confirmacaoSenhaLabel.fill(user.confirmacaoSenha)
      await app.cadastro.elements.cadastroButton.click()

      await expect(alerts.confirmacaoSenha).toHaveText('As senhas não conferem')
    })
  })

  test.describe('UX', () => {
    test.skip('validate Error message', async ({ app }) => {

    })
  })
})

/*
A senha e a confirmação de senha devem ser idênticas
 */