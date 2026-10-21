import { STORAGE_STATE } from '../support/data/users'
import { test, expect } from '../support/fixtures'

test.describe('user with no order history', () => {
  test('reach history Page', async ({ page }) => {
    await page.goto('/app/pedidos')
    await expect(page).toHaveURL('/app/pedidos')
    await expect(page.getByRole('heading', { name: 'Você ainda não tem pedidos' })).toBeVisible()
    await expect(page.getByText('Depois de finalizar uma compra no checkout, ela aparece aqui.')).toBeVisible()
  })
})

test.describe('user with order history', () => {
  test.use({ storageState: STORAGE_STATE.ordersUser })

  test.beforeEach(async ({ page }) => {
    await page.goto('/app/pedidos')
    await expect(page).toHaveURL('/app/pedidos')
    await expect(page.getByRole('heading', { name: 'Meus Pedidos' })).toBeVisible()
  })

  test('reach history Page', async ({ page }) => {

    await expect(page.getByRole('button', { name: 'Todos' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Processando' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Enviado' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Entregue' })).toBeVisible()
  })

  test('validate one Pedido Details', async ({ page }) => {
    const order = {
      ped: 'PED-0001',
      status: 'Entregue',
      data: '10/01/2026',
      itemList: ['Caneca Bug Hunter x1', 'Camiseta QA do Zero x2'],
      total: 'R$ 199,70'
    }

    const pedidoCard = page.getByTestId(`pedidos-item-${order.ped}`)
    await expect(pedidoCard).toBeVisible()
    await expect(pedidoCard.getByRole('paragraph').filter({ hasText: order.ped })).toBeVisible()
    await expect(pedidoCard.getByText(order.status)).toBeVisible()
    await expect(pedidoCard.getByRole('paragraph').filter({ hasText: order.data })).toBeVisible()
    await expect(pedidoCard.getByText(order.itemList[0])).toBeVisible()
    await expect(pedidoCard.getByText(order.itemList[1])).toBeVisible()
    await expect(pedidoCard.getByTestId(`pedidos-total-${order.ped}`)).toHaveText(order.total)
  })

})

