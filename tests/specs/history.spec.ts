import { STORAGE_STATE } from '../support/data/users'
import { test, expect } from '../support/fixtures'

test.describe('user with no order history', () => {
  test('reach history Page', async ({ page, app }) => {
    await app.history.goto()
    await expect(page).toHaveURL('/app/pedidos')
    await expect(page.getByRole('heading', { name: 'Você ainda não tem pedidos' })).toBeVisible()
    await expect(page.getByText('Depois de finalizar uma compra no checkout, ela aparece aqui.')).toBeVisible()
  })
})

test.describe('user with order history', () => {
  test.use({ storageState: STORAGE_STATE.ordersUser })

  test.beforeEach(async ({ page, app }) => {
    await app.history.goto()
    await expect(page).toHaveURL('/app/pedidos')
  })

  test('Reach History Page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Meus Pedidos' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Todos' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Processando' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Enviado' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Entregue' })).toBeVisible()
  })

  test('Validate One Order', async ({ app }) => {
    const order = {
      ped: 'PED-0001',
      status: 'Entregue',
      data: '10/01/2026',
      itemList: ['Caneca Bug Hunter x1', 'Camiseta QA do Zero x2'],
      total: 'R$ 199,70'
    }

    await app.history.validateOrderHistory(order)
  })

  test('Validate Multiple Orders', async ({ app }) => {
    const orders = [{
      ped: 'PED-0001',
      status: 'Entregue',
      data: '10/01/2026',
      itemList: ['Caneca Bug Hunter x1', 'Camiseta QA do Zero x2'],
      total: 'R$ 199,70'
    },
    {
      ped: 'PED-0003',
      status: 'Enviado',
      data: '01/02/2026',
      itemList: ['Adesivo Não Reproduz na Minha Máquina x3',],
      total: 'R$ 29,70'
    }]

    for (const order of orders) {
      await app.history.validateOrderHistory(order)
    }
  })

})

