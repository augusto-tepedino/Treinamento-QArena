import { test as base } from "@playwright/test"
import { createCadastroActions } from "./actions/cadastroActions"
import { createCheckoutActions } from "./actions/checkoutActions"
import { createLoginActions } from "./actions/loginActions"
import { createNavigationActions } from "./actions/navigationActions"

type App = {
  cadastro: ReturnType<typeof createCadastroActions>
  checkout: ReturnType<typeof createCheckoutActions>
  login: ReturnType<typeof createLoginActions>
  navigation: ReturnType<typeof createNavigationActions>
}

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      cadastro: createCadastroActions(page),
      checkout: createCheckoutActions(page),
      login: createLoginActions(page),
      navigation: createNavigationActions(page)
    }
    await use(app)
  }
})

export { expect } from '@playwright/test'
