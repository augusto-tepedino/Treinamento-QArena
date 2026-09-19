import { type Page } from '@playwright/test'

export function createLojaActions(page: Page) {

  const toastSucesso = page.getByTestId('toast-sucesso')

  return {

    elements: {
      toastSucesso
    },

    async goto() {
      await page.goto('/app/loja')
    },

    getProductNameList(product: string) {
      return page.getByRole('heading', { name: product })
    },

    async buscarProdutoPorNome(produto: string) {
      await page.getByPlaceholder('Buscar produto').fill(produto)
    }

  }
}
