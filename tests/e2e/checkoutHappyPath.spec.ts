import { test, expect } from '@playwright/test'

test('check home page main elements', async ({ page }) => {
  const product = {
    name: 'Caneca Bug Hunter',
    price: 'R$ 39,90',
  }

  const productCard = page.locator('div.glass.rounded-2xl').filter({ hasText: product.name })
  const toast = page.locator('div.fixed.bottom-4.right-4 > div').filter({ hasText: `${product.name} adicionado ao carrinho` })

  const cartItems = page.getByTestId('carrinho-lista-itens')

  const summarySection = page.getByRole('heading', { name: 'Resumo do pedido' }).locator('..')
  const productSummaryName = summarySection.getByText(product.name)
  const productSummaryPrice = summarySection.getByText(product.price)

  const totalValue = page.getByText('Total', { exact: true }).locator('..')

  await page.goto('/')

  await page.goto('/login')

  await page.getByLabel('E-mail').fill('usuario.sucesso@qazero.com')
  await page.getByPlaceholder('Sua senha').fill('Qa@123456')
  await page.getByTestId('login-btn-entrar').click()
  await expect(page).toHaveURL('/app')

  await page.getByTestId('app-sidebar-link-loja').click()
  await expect(page).toHaveURL('/app/loja')
  await expect(page.getByRole('heading', { name: 'Loja' })).toBeVisible()
  await expect(page.getByText('Caneca Bug Hunter')).toBeVisible()

  /*await page.getByRole('button', { name: 'Adicionar' }).click()
      this fails because all buttons have name Adicionar. it is Ambiguous*/

  await productCard.getByRole('button', { name: 'Adicionar' }).click()

  await expect(toast).toBeVisible()

  const cartItemAmount = page.getByTestId('app-sidebar-badge-carrinho')
  await expect(cartItemAmount).toHaveText('1')

  await page.getByTestId('app-sidebar-link-carrinho').click()
  await expect(page).toHaveURL('/app/carrinho')

  await expect(cartItems.locator('p', { hasText: product.name })).toBeVisible()
  await expect(cartItems.getByText(product.price, { exact: true })).toBeVisible()
  await expect(cartItems.getByTestId('carrinho-quantidade-caneca-bug-hunter')).toHaveText('1')

  await page.getByRole('button', { name: 'Ir para o checkout' }).click()
  await expect(page).toHaveURL('/app/checkout')
  await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible()
  await expect(summarySection).toBeVisible()

  /* Step 6: check item and total value
      confirm product price and name, confirm total price, and end it
  */
  await expect(productSummaryName).toBeVisible()
  await expect(productSummaryPrice).toBeVisible()
  await expect(totalValue).toContainText(product.price)
  await page.getByRole('button', { name: 'Finalizar compra' }).click()

  /* Step 7: finalize purchase
      confirm QA credit was reduced
  */
  await page.getByRole('heading', { name: 'Pedido realizado' }).click()
  expect(page.getByTestId('app-sidebar-creditos')).toHaveText('960.1')
})
