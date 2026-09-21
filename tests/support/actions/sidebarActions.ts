import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export function createSidebarActions(page: Page) {
  const sidebar = page.getByTestId('app-sidebar')
  const cartBadge = page.getByTestId('app-sidebar-badge-carrinho')
  const userCreditsBadge = page.getByTestId('app-sidebar-creditos')
  const userName = page.getByTestId('app-sidebar-nome')
  const accountNumber = page.getByTestId('app-sidebar-numero-conta')
  const linkLoja = page.getByTestId('app-sidebar-link-loja')
  const linkCarrinho = page.getByTestId('app-sidebar-link-carrinho')
  const linkPerfil = page.getByTestId('app-sidebar-link-perfil')
  const linkMeusPedidos = page.getByTestId('app-sidebar-link-meus-pedidos')
  const btnSair = page.getByTestId('app-sidebar-btn-sair')

  return {
    elements: {
      sidebar,
      cartBadge,
      userCreditsBadge,
      userName,
      accountNumber,
      linkLoja,
      linkCarrinho,
      linkPerfil,
      linkMeusPedidos,
      btnSair,
    },

    async goToLoja() {
      await linkLoja.click()
    },

    async goToCarrinho() {
      await linkCarrinho.click()
    },

    async goToPerfil() {
      await linkPerfil.click()
    },

    async goToMeusPedidos() {
      await linkMeusPedidos.click()
    },

    async logout() {
      await btnSair.click()
    },

    async validateCartBadgeCount(expectedCount: number) {
      await expect(cartBadge).toHaveText(expectedCount.toString())
    }
  }
}
