import { expect, type Page } from '@playwright/test'

export function createHistoryActions(page: Page) {

  return {

    async goto() {
      await page.goto('/app/pedidos')
    },

    async validateOrderHistory(order: { ped: string; status: string; data: string; itemList: string[]; total: string }) {



      const pedidoCard = page.getByTestId(`pedidos-item-${order.ped}`)
      await expect(pedidoCard).toBeVisible()
      await expect(pedidoCard.getByRole('paragraph').filter({ hasText: order.ped })).toBeVisible()
      await expect(pedidoCard.getByText(order.status)).toBeVisible()
      await expect(pedidoCard.getByRole('paragraph').filter({ hasText: order.data })).toBeVisible()
      await expect(pedidoCard.getByText(order.itemList[0])).toBeVisible()
      await expect(pedidoCard.getByText(order.itemList[1])).toBeVisible()
      await expect(pedidoCard.getByTestId(`pedidos-total-${order.ped}`)).toHaveText(order.total)
    }
  }
}
