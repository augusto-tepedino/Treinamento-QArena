import { test, expect } from '../support/fixtures'

test.describe('Checkout Flow', () => {
  const product = {
    name: 'Caneca Bug Hunter',
    price: 'R$ 39,90',
    slug: 'caneca-bug-hunter',
  }

  test.beforeEach(async ({ app, page }) => {
    await app.login.goto()
    await app.login.login({
      email: 'usuario.sucesso@qazero.com',
      password: 'Qa@123456',
    })
    await expect(page).toHaveURL('/app')
  })

  test('Perform checkout happy path', async ({ app, page }) => {
    // Navigate to Store
    await app.checkout.goToStore()
    await expect(page).toHaveURL('/app/loja')
    await expect(app.checkout.elements.shopHeading).toBeVisible()
    await expect(page.getByText(product.name)).toBeVisible()

    // Add product to cart
    await app.checkout.addProductToCart(product.name)

    // Verify Toast and Cart Badge count
    await expect(app.checkout.getToast(product.name)).toBeVisible()
    await expect(app.checkout.elements.cartBadge).toHaveText('1')

    // Navigate to Cart
    await app.checkout.goToCart()
    await expect(page).toHaveURL('/app/carrinho')

    // Verify Cart Item details
    await expect(app.checkout.elements.cartItems.locator('p', { hasText: product.name })).toBeVisible()
    await expect(app.checkout.elements.cartItems.getByText(product.price, { exact: true })).toBeVisible()
    await expect(app.checkout.getCartItemQuantity(product.slug)).toHaveText('1')

    // Proceed to Checkout
    await app.checkout.goToCheckout()
    await expect(page).toHaveURL('/app/checkout')
    await expect(app.checkout.elements.checkoutHeading).toBeVisible()
    await expect(app.checkout.elements.summarySection).toBeVisible()

    // Verify Summary details
    await expect(app.checkout.elements.summarySection.getByText(product.name)).toBeVisible()
    await expect(app.checkout.elements.summarySection.getByText(product.price)).toBeVisible()
    await expect(app.checkout.elements.totalValue).toContainText(product.price)

    // Finalize Purchase
    await app.checkout.finalizePurchase()

    // Confirm Order Completed & Credits updated
    await app.checkout.elements.orderCompletedHeader.click()
    await expect(app.checkout.elements.userCreditsBadge).toHaveText('960.1')
  })
})
