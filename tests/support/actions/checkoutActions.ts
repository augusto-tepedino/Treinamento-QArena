import type { Page } from '@playwright/test'

export function createCheckoutActions(page: Page) {
  const cartItems = page.getByTestId('carrinho-lista-itens')
  const summarySection = page.getByRole('heading', { name: 'Resumo do pedido' }).locator('..')
  const totalValue = page.getByText('Total', { exact: true }).locator('..')
  const btnGoToCheckout = page.getByRole('button', { name: 'Ir para o checkout' })
  const btnFinalizePurchase = page.getByRole('button', { name: 'Finalizar compra' })
  const shopHeading = page.getByRole('heading', { name: 'Loja' })
  const checkoutHeading = page.getByRole('heading', { name: 'Checkout' })
  const orderCompletedHeader = page.getByRole('heading', { name: 'Pedido realizado' })

  return {
    elements: {
      cartItems,
      summarySection,
      totalValue,
      shopHeading,
      checkoutHeading,
      orderCompletedHeader
    },

    getProductCard(productName: string) {
      return page.locator('div.glass.rounded-2xl').filter({ hasText: productName })
    },

    getToast(productName: string) {
      return page.locator('div.fixed.bottom-4.right-4 > div').filter({ hasText: `${productName} adicionado ao carrinho` })
    },

    getCartItemQuantity(productSlug: string) {
      return page.getByTestId(`carrinho-quantidade-${productSlug}`)
    },

    getCartItemValue(productSlug: string) {
      return page.getByTestId(`carrinho-subtotal-${productSlug}`)
    },

    async addProductToCart(productName: string) {
      const card = this.getProductCard(productName)
      await card.getByRole('button', { name: 'Adicionar' }).click()
    },

    async goToCheckout() {
      await btnGoToCheckout.click()
    },

    async finalizePurchase() {
      await btnFinalizePurchase.click()
    },
  }
}

