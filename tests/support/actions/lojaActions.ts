import { type Page } from '@playwright/test'

export function createLojaActions(page: Page) {

  return {

    async goto() {
      page.goto('/app/loja')
    }

  }
}
