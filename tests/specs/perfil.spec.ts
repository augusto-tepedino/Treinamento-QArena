import { test, expect } from '../support/fixtures'

test.describe('Perfil', () => {
  test.beforeEach(async ({ app }) => {
    await app.perfil.goto()
  })

  test.describe('Meus Dados', () => {
    test('Exibir toast de sucesso ao salvar dados do perfil', async ({ app, page }) => {
      const novosDados = {
        nome: 'Usuário Editado Teste'
      }
      await app.perfil.salvarMeusDados(novosDados)
      await expect(page.getByText('Dados atualizados com sucesso')).toBeVisible()
    })

    test('Persistir o número de telefone após recarregar a página', async ({ app, page }) => {
      test.fail(true, "EXPECTED BUG: O número de telefone não é persistido após recarregar a página.")

      const telefone = '(11) 98888-7777'
      await app.perfil.salvarMeusDados({ telefone })
      await page.reload()

      await expect(app.perfil.elements.inputTelefone).toHaveValue(telefone)
    })

    test('Exibir mensagem de erro para e-mail com formato inválido', async ({ app }) => {
      await app.perfil.salvarMeusDados({ email: 'usuario@invalido' })

      await expect(app.perfil.elements.msgErroEmail).toHaveText('Informe um e-mail em um formato válido')
    })

    test('Persistir o nome e e-mail e refletir na barra lateral após recarregar a página', async ({ app, page }) => {
      const novoNome = 'Usuário Persistente'
      const novoEmail = 'persistente@qazero.com'

      await app.perfil.salvarMeusDados({ nome: novoNome, email: novoEmail })
      await page.reload()

      await expect(page.getByTestId('perfil-input-nome')).toHaveValue(novoNome)
      await expect(page.getByTestId('perfil-input-email')).toHaveValue(novoEmail)
      await expect(app.sidebar.elements.userName).toHaveText(novoNome)
    })
  })

  test.describe('Alterar Senha', () => {
    test('Exibir toast de sucesso ao alterar a senha com sucesso', async ({ app, page }) => {

      await app.perfil.alterarSenha({
        atual: 'Qa@123456',
        nova: 'Qa@654321',
        confirmacao: 'Qa@654321',
      })

      await expect(page.getByText('Senha alterada com sucesso')).toBeVisible()
    })

    test('Limpar campos do formulário após alterar a senha', async ({ app }) => {
      await app.perfil.alterarSenha({
        atual: 'Qa@123456',
        nova: 'Qa@654321',
        confirmacao: 'Qa@654321',
      })

      await expect(app.perfil.elements.inputSenhaAtual).toHaveValue('')
      await expect(app.perfil.elements.inputNovaSenha).toHaveValue('')
      await expect(app.perfil.elements.inputConfirmarNovaSenha).toHaveValue('')
    })

    test('Exibir mensagem de erro ao tentar nova senha menor que 6 caracteres', async ({ app }) => {
      await app.perfil.alterarSenha({
        atual: 'Qa@123456',
        nova: '123',
        confirmacao: '123',
      })

      await expect(app.perfil.elements.msgErroNovaSenha).toHaveText('A nova senha deve ter pelo menos 6 caracteres')
    })

    test('Exibir mensagem de erro quando a confirmação de senha é divergente', async ({ app }) => {
      await app.perfil.alterarSenha({
        atual: 'Qa@123456',
        nova: 'Qa@654321',
        confirmacao: 'Qa@999999',
      })

      await expect(app.perfil.elements.msgErroConfirmarNovaSenha).toHaveText('A confirmação não é igual à nova senha')
    })

    test('Exibir mensagem de erro ao fornecer a senha atual incorreta', async ({ app, page }) => {
      test.fail(true, "EXPECTED BUG: O sistema aceita uma senha atual incorreta sem validar.")

      await app.perfil.alterarSenha({
        atual: 'SenhaErrada123',
        nova: 'Qa@654321',
        confirmacao: 'Qa@654321',
      })

      await expect(page.getByText('A senha atual está incorreta')).toBeVisible()
    })

    test('Exibir mensagem de erro ao submeter formulário de alteração de senha com campos vazios', async ({ app }) => {
      await app.perfil.alterarSenha({ atual: '', nova: '', confirmacao: '' })

      await expect(app.perfil.elements.msgErroNovaSenha).toHaveText('A nova senha deve ter pelo menos 6 caracteres')
    })
  })
})
