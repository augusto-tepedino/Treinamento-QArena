import type { Page } from '@playwright/test'

export function createCadastroActions(page: Page) {

  const alerts = {
    nome: page.getByText('Informe seu nome completo'),
    email: page.getByText('Informe um e-mail em um formato válido'),
    cpf: page.getByText('Informe um CPF válido'),
    telefone: page.getByText('Informe um telefone com DDD e número'),
    senha: page.getByText('A senha deve ter pelo menos 6 caracteres'),
    confirmacaoSenha: page.getByTestId('cadastro-msg-erro-confirmar-senha'),
    termos: page.getByText('Você precisa concordar com os termos de uso'),

  }

  const registerSection = page.getByRole('heading', { name: 'Criar minha conta' }).locator('..')
  const nomeLabel = page.getByLabel('Nome')
  const emailLabel = page.getByLabel('E-mail', { exact: true })
  const cpfLabel = page.getByLabel('CPF')
  const telefoneLabel = page.getByLabel('Telefone')
  const senhaLabel = page.getByRole('textbox', { name: 'Senha', exact: true })
  const confirmacaoSenhaLabel = page.getByPlaceholder('Repita a senha')
  const termosCheckbox = page.getByLabel('Aceito os termos de uso')
  const cadastroButton = page.getByTestId('cadastro-btn-cadastrar')

  const contaCriadaModal = page.getByTestId('modal-cadastro-sucesso')

  const contaCriadaToaster = page.getByTestId('toast-sucesso')

  return {

    elements: {
      alerts,
      cpfLabel,
      telefoneLabel,
      confirmacaoSenhaLabel,
      registerSection,
      cadastroButton,
      termosCheckbox,
      contaCriadaModal,
      contaCriadaToaster,
    },

    async goto() {
      await page.goto('/cadastro')
    },

    async fillCadastro(cadastro: { nome: string; email: string; cpf: string; telefone: string; senha: string }) {
      await nomeLabel.fill(cadastro.nome);
      await emailLabel.fill(cadastro.email);
      await cpfLabel.fill(cadastro.cpf);
      await telefoneLabel.fill(cadastro.telefone);
      await senhaLabel.fill(cadastro.senha);
      await confirmacaoSenhaLabel.fill(cadastro.senha);
      await termosCheckbox.check();

    }
  }
}
