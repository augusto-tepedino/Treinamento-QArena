import { test, expect } from '../support/fixtures'

test.describe('Navigation', () => {
  test('Access Loja page', async ({ app, page }) => {
    await app.loja.goto()
    await expect(page).toHaveURL('/app/loja')
    await expect(page.getByRole('heading', { name: 'Loja' })).toBeVisible()
  })
})
test.describe('Filtering', () => {

  test.beforeEach(async ({ app }) => {
    await app.loja.goto()
  })

  test('Filter valid items by partial name search', async ({ app }) => {
    const produto = {
      name: 'aneca',
      amount: 2
    }

    await app.loja.buscarProdutoPorNome(produto.name)

    const produtoNameList = app.loja.getProductNameList(produto.name)
    await expect(produtoNameList).toHaveCount(produto.amount)

    for (const name of await produtoNameList.all()) {
      await expect(name).toContainText(produto.name)
    }
  })

  test('Filter valid items by full name search', async ({ app }) => {
    test.fail(true, "EXPECTED BUG: This test fails because the filter is case sensitive (Training bug).")
    const produto = {
      name: 'caneca',
      amount: 2
    }

    await app.loja.buscarProdutoPorNome(produto.name)

    const produtoNameList = app.loja.getProductNameList(produto.name)
    await expect(produtoNameList).toHaveCount(produto.amount)

    for (const name of await produtoNameList.all()) {
      await expect(name).toContainText(produto.name)
    }
  })

  test('Filter valid items by filter button', async ({ page }) => {
    test.fail(true, "EXPECTED BUG: This test fails because the filter button doesn't return any product (Training bug).")
    const filtro = 'Canecas'

    await page.getByRole('button', { name: filtro }).click()

    const categoryBadges = page.getByTestId('loja-grid-produtos').locator('span:has(.lucide)')
    await expect(categoryBadges).not.toHaveCount(0)

    for (const badge of await categoryBadges.all()) {
      await expect(badge).toHaveText(filtro)
    }
  })

  test('Filter produto by inexistent name', async ({ app, page }) => {
    const produto = {
      name: 'inexistente',
    }

    await app.loja.buscarProdutoPorNome(produto.name)

    await expect(page.getByTestId('loja-msg-vazio')).toBeVisible()
  })
})

test.describe('Add produt to cart', () => {
  test.beforeEach(async ({ app }) => {
    await app.loja.goto()
  })

  test('Add Available Product', async ({ app, page }) => {
    const listaDeCompras = [{
      name: 'Camiseta Testei e Quebrei',
      amount: Math.floor(Math.random() * 3) + 1,
    },
    {
      name: 'Adesivo Não Reproduz na Minha Máquina',
      amount: Math.floor(Math.random() * 3),
    },
    {
      name: 'Mochila QArena',
      amount: Math.floor(Math.random() * 2),
    }
    ]
    let somaProdutos = 0

    for (const produto of listaDeCompras) {
      for (let i = 0; i < produto.amount; i++) {
        await page.getByTestId(/^loja-card-/)
          .filter({ hasText: produto.name })
          .getByRole('button', { name: 'Adicionar' })
          .click();
        await expect(app.loja.elements.toastSucesso.last()).toHaveText(`${produto.name} adicionado ao carrinho`)
        somaProdutos++
        await expect(page.getByTestId('app-sidebar-badge-carrinho')).toHaveText(somaProdutos.toString())
      }
    }

  })
})