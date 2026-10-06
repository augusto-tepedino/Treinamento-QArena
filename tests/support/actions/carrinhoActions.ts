import { expect, type Page } from '@playwright/test'

export function createCarrinhoActions(page: Page) {
  const checkoutButton = page.getByRole('button', { name: 'Ir para o checkout' })

  return {

    elements: {
      checkoutButton
    },

    async goto() {
      await page.goto('/app/carrinho')
    },

    getCartItem(productSlug: string) {
      return page.getByTestId(`carrinho-item-${productSlug}`)
    },

    getCartItemQuantity(productSlug: string) {
      return page.getByTestId(`carrinho-quantidade-${productSlug}`)
    },

    getCartItemValue(productSlug: string) {
      return page.getByTestId(`carrinho-subtotal-${productSlug}`)
    },

    getCartTotalValue() {
      return page.getByTestId('carrinho-total')
    },

    async getDecreaseProductButton(product: any) {
      return this.getCartItem(product.slug).getByRole('button', { name: 'Diminuir quantidade' })
    },

    async validateCartItem(product: any) {
      await expect(this.getCartItem(product.slug).getByText(product.name)).toBeVisible()
      await expect(this.getCartItem(product.slug).getByText(`R$ ${product.price.toFixed(2).replace('.', ',')} cada`, { exact: true })).toBeVisible()
      await expect(this.getCartItemQuantity(product.slug)).toHaveText(String(product.amount))
      await expect(this.getCartItemValue(product.slug)).toHaveText(`R$ ${String((product.amount * product.price).toFixed(2).replace('.', ','))}`)
    }

  }
}
