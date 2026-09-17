import type { Page } from '@playwright/test'

export function createCheckoutActions(page: Page) {
  const sidebarLinkLoja = page.getByTestId('app-sidebar-link-loja')
  const sidebarLinkCarrinho = page.getByTestId('app-sidebar-link-carrinho')
  const cartItems = page.getByTestId('carrinho-lista-itens')
  const summarySection = page.getByRole('heading', { name: 'Resumo do pedido' }).locator('..')
  const totalValue = page.getByText('Total', { exact: true }).locator('..')
  const cartBadge = page.getByTestId('app-sidebar-badge-carrinho')
  const btnGoToCheckout = page.getByRole('button', { name: 'Ir para o checkout' })
  const btnFinalizePurchase = page.getByRole('button', { name: 'Finalizar compra' })
  const orderCompletedHeader = page.getByRole('heading', { name: 'Pedido realizado' })
  const userCreditsBadge = page.getByTestId('app-sidebar-creditos')
  const shopHeading = page.getByRole('heading', { name: 'Loja' })
  const checkoutHeading = page.getByRole('heading', { name: 'Checkout' })

  return {
    elements: {
      sidebarLinkLoja,
      sidebarLinkCarrinho,
      cartItems,
      summarySection,
      totalValue,
      cartBadge,
      btnGoToCheckout,
      btnFinalizePurchase,
      orderCompletedHeader,
      userCreditsBadge,
      shopHeading,
      checkoutHeading,
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

    async goToStore() {
      await sidebarLinkLoja.click()
    },

    async goToCart() {
      await sidebarLinkCarrinho.click()
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
