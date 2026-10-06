import { type Page } from '@playwright/test'

export function createLojaActions(page: Page) {


  return {


    async goto() {
      await page.goto('/app/loja')
    },

    getProductNameList(product: string) {
      return page.getByRole('heading', { name: product })
    },

    async buscarProdutoPorNome(produto: string) {
      await page.getByPlaceholder('Buscar produto').fill(produto)
    },

    async AdicionarProdutoCarrinho(produto: any) {
      for (let i = 0; i < item.amount; i++) {

        await page.getByTestId(/^loja-card-/)
          .filter({ hasText: item.name })
          .getByRole('button', { name: 'Adicionar' })
          .click();
      }
    }
  }
}
