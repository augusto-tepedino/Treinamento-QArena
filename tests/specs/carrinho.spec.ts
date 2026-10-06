import { test, expect } from '../support/fixtures'

test.describe('Navigation', () => {
  test('Access carrinho page - sidebar', async ({ app, page }) => {
    await app.navigation.goToLoggedArea()
    await app.sidebar.goToCarrinho()
    await expect(page).toHaveURL('/app/carrinho')
    await expect(page.getByRole('heading', { name: 'Carrinho' })).toBeVisible()
  })

  test('Access carrinho page - link', async ({ app, page }) => {
    await app.carrinho.goto()
    await expect(page).toHaveURL('/app/carrinho')
    await expect(page.getByRole('heading', { name: 'Carrinho' })).toBeVisible()
  })
})

test.describe('cart state validation', () => {

  test('empty cart', async ({ app, page }) => {
    await app.carrinho.goto()
    await expect(page.getByRole('heading', { name: 'Seu carrinho está vazio' })).toBeVisible()
    await expect(page.getByText('Volte para a loja e escolha alguns produtos fictícios para testar o fluxo.')).toBeVisible()
    await expect(page.getByTestId('carrinho-btn-ir-para-loja')).toBeVisible()
  })

  test('cart with item', async ({ app, page }) => {
    const product = {
      name: 'Camiseta Testei e Quebrei',
      price: 79.90,
      slug: 'camiseta-testei-e-quebrei',
      amount: 1,
    }
    await app.loja.goto()
    await app.loja.AdicionarProdutoCarrinho(product)
    await app.carrinho.goto()

    await app.carrinho.validateCartItem(product)

    await expect(page.getByRole('button', { name: 'Ir para o checkout' })).toBeVisible()
  })

  test('cart with more than one item', async ({ app, page }) => {
    const products = [
      {
        name: 'Camiseta Testei e Quebrei',
        price: 79.90,
        slug: 'camiseta-testei-e-quebrei',
        amount: 1,
      },
      {
        name: 'Mochila QArena',
        price: 149.90,
        slug: 'mochila-qarena',
        amount: 2,
      }]

    await app.loja.goto()
    await app.loja.AdicionarProdutoCarrinho(products)

    await app.carrinho.goto()
    for (const item of products) {
      await app.carrinho.validateCartItem(item)
    }
    await expect(page.getByRole('button', { name: 'Ir para o checkout' })).toBeVisible()
  })


  test.describe('Carrinho amount validation', () => {
    test('Increase carrinho value amount', async ({ app, page }) => {
      test.fail(true, "EXPECTED BUG: test fails because total value doesn't update when the item amount changes (Training bug)")
      const product = {
        name: 'Camiseta Testei e Quebrei',
        price: 79.90,
        slug: 'camiseta-testei-e-quebrei',
        amount: 1,
      }
      await app.loja.goto()
      await app.loja.AdicionarProdutoCarrinho(product)
      await app.carrinho.goto()

      const quantidadeProdutoEsperado = product.amount + 1
      const expectedTotalValue = `R$ ${String((quantidadeProdutoEsperado * product.price).toFixed(2).replace('.', ','))}`

      await app.carrinho.getCartItem(product.slug).getByRole('button', { name: 'Aumentar quantidade' }).click()
      await expect(page.getByTestId(`carrinho-quantidade-${product.slug}`)).toHaveText(String(quantidadeProdutoEsperado))
      await app.sidebar.validateCartBadgeCount(quantidadeProdutoEsperado)

      await expect(app.carrinho.getCartItemValue(product.slug)).toHaveText(expectedTotalValue)
      await expect(app.carrinho.getCartTotalValue()).toHaveText(expectedTotalValue)
    })
  })

  test('Decrease carrinho value amount', async ({ app, page }) => {
    test.fail(true, "EXPECTED BUG: test fails because total value doesn't update when the item amount changes (Training bug)")
    const product = {
      name: 'Camiseta Testei e Quebrei',
      price: 79.90,
      slug: 'camiseta-testei-e-quebrei',
      amount: 3,
    }
    await app.loja.goto()
    await app.loja.AdicionarProdutoCarrinho(product)
    await app.carrinho.goto()

    const quantidadeProdutoEsperado = product.amount - 1
    const expectedTotalValue = `R$ ${String((quantidadeProdutoEsperado * product.price).toFixed(2).replace('.', ','))}`

    await app.carrinho.getCartItem(product.slug).getByRole('button', { name: 'Diminuir quantidade' }).click()
    await expect(page.getByTestId(`carrinho-quantidade-${product.slug}`)).toHaveText(String(quantidadeProdutoEsperado))
    await app.sidebar.validateCartBadgeCount(quantidadeProdutoEsperado)

    await expect(app.carrinho.getCartItemValue(product.slug)).toHaveText(expectedTotalValue)
    await expect(app.carrinho.getCartTotalValue()).toHaveText(expectedTotalValue)
  })

  test('remove item from carrinho', async ({ app, page }) => {
    test.fail(true, "EXPECTED BUG: test fails because removing the item does'nt change the cart badge value (Training bug)")
    const product = {
      name: 'Camiseta Testei e Quebrei',
      price: 79.90,
      slug: 'camiseta-testei-e-quebrei',
      amount: 1,
    }
    await app.loja.goto()
    await app.loja.AdicionarProdutoCarrinho(product)
    await app.carrinho.goto()

    await page.getByRole('button', { name: 'Remover item' }).click();

    await expect(page.getByRole('heading', { name: 'Seu carrinho está vazio' })).toBeVisible()

    await expect(app.sidebar.elements.cartBadge).toBeHidden()

  })

  test("Carrinho value amount shouldn't go below 1", async ({ app }) => {
    test.fail(true, "EXPECTED BUG: test fails because system allows values under 1 (Training bug)")
    const product = {
      name: 'Camiseta Testei e Quebrei',
      price: 79.90,
      slug: 'camiseta-testei-e-quebrei',
      amount: 1,
    }
    const decreaseProductButton = await app.carrinho.getDecreaseProductButton(product)

    await app.loja.goto()
    await app.loja.AdicionarProdutoCarrinho(product)
    await app.carrinho.goto()

    await decreaseProductButton.click()
    await expect(app.carrinho.getCartItem(product.slug).getByTestId(`carrinho-quantidade-${product.slug}`)).toHaveText('1')

  })

  test("Carrinho value decrease button should be disable when amount is 1", async ({ app }) => {
    test.fail(true, "EXPECTED BUG: test fails because button is enable (Training bug)")
    const product = {
      name: 'Camiseta Testei e Quebrei',
      price: 79.90,
      slug: 'camiseta-testei-e-quebrei',
      amount: 1,
    }
    const decreaseProductButton = await app.carrinho.getDecreaseProductButton(product)

    await app.loja.goto()
    await app.loja.AdicionarProdutoCarrinho(product)
    await app.carrinho.goto()


    await expect(decreaseProductButton).toBeDisabled()

  })

  test('cart items persist after page reload', async ({ app, page }) => {
    const product = {
      name: 'Camiseta Testei e Quebrei',
      price: 79.90,
      slug: 'camiseta-testei-e-quebrei',
      amount: 1,
    }

    await app.loja.goto()
    await app.loja.AdicionarProdutoCarrinho(product)
    await app.carrinho.goto()

    await expect(app.carrinho.getCartItem(product.slug).getByText(product.name)).toBeVisible()

    await page.reload()
    await expect(app.carrinho.getCartItem(product.slug).getByText(product.name)).toBeVisible()
  })

  test('cart items persist across route navigation', async ({ app }) => {
    const product = {
      name: 'Camiseta Testei e Quebrei',
      price: 79.90,
      slug: 'camiseta-testei-e-quebrei',
      amount: 1,
    }

    await app.loja.goto()
    await app.loja.AdicionarProdutoCarrinho(product)
    await app.carrinho.goto()

    await expect(app.carrinho.getCartItem(product.slug).getByText(product.name)).toBeVisible()

    await app.loja.goto()
    await app.carrinho.goto()

    await expect(app.carrinho.getCartItem(product.slug).getByText(product.name)).toBeVisible()
  })
})

test('move product to checkout', async ({ app, page }) => {
  const product = {
    name: 'Camiseta Testei e Quebrei',
    price: 79.90,
    slug: 'camiseta-testei-e-quebrei',
    amount: 1,
  }

  await app.loja.goto()
  await app.loja.AdicionarProdutoCarrinho(product)
  await app.carrinho.goto()
  await app.carrinho.elements.checkoutButton.click()
  await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible()

})