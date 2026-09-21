import { test as base } from "@playwright/test"
import { createCadastroActions } from "./actions/cadastroActions"
import { createCheckoutActions } from "./actions/checkoutActions"
import { createLoginActions } from "./actions/loginActions"
import { createLojaActions } from "./actions/lojaActions"
import { createNavigationActions } from "./actions/navigationActions"
import { createSidebarActions } from "./actions/sidebarActions"

type App = {
  cadastro: ReturnType<typeof createCadastroActions>
  checkout: ReturnType<typeof createCheckoutActions>
  login: ReturnType<typeof createLoginActions>
  loja: ReturnType<typeof createLojaActions>
  navigation: ReturnType<typeof createNavigationActions>
  sidebar: ReturnType<typeof createSidebarActions>
}

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      cadastro: createCadastroActions(page),
      checkout: createCheckoutActions(page),
      login: createLoginActions(page),
      loja: createLojaActions(page),
      navigation: createNavigationActions(page),
      sidebar: createSidebarActions(page),
    }
    await use(app)
  }
})

export { expect } from '@playwright/test'

