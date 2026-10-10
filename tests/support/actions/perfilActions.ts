import { type Page } from '@playwright/test'

export function createPerfilActions(page: Page) {
  // Shared locators needed by both actions and spec assertions
  const inputTelefone = page.getByTestId('perfil-input-telefone')
  const inputSenhaAtual = page.getByTestId('perfil-input-senha-atual')
  const inputNovaSenha = page.getByTestId('perfil-input-nova-senha')
  const inputConfirmarNovaSenha = page.getByTestId('perfil-input-confirmar-nova-senha')

  return {
    elements: {
      inputTelefone,
      msgErroEmail: page.getByTestId('perfil-msg-erro-email'),
      inputSenhaAtual,
      inputNovaSenha,
      inputConfirmarNovaSenha,
      msgErroNovaSenha: page.getByTestId('perfil-msg-erro-nova-senha'),
      msgErroConfirmarNovaSenha: page.getByTestId('perfil-msg-erro-confirmar-nova-senha'),
    },

    async goto() {
      await page.goto('/app/perfil')
    },

    async salvarMeusDados(dados: { nome?: string; email?: string; telefone?: string }) {
      if (dados.nome !== undefined) await page.getByTestId('perfil-input-nome').fill(dados.nome)
      if (dados.email !== undefined) await page.getByTestId('perfil-input-email').fill(dados.email)
      if (dados.telefone !== undefined) await inputTelefone.fill(dados.telefone)
      await page.getByTestId('perfil-btn-salvar-dados').click()
    },

    async alterarSenha(senhas: { atual?: string; nova?: string; confirmacao?: string }) {
      if (senhas.atual !== undefined) await inputSenhaAtual.fill(senhas.atual)
      if (senhas.nova !== undefined) await inputNovaSenha.fill(senhas.nova)
      if (senhas.confirmacao !== undefined) await inputConfirmarNovaSenha.fill(senhas.confirmacao)
      await page.getByTestId('perfil-btn-alterar-senha').click()
    },
  }
}
