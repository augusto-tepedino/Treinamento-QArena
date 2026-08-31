import { test as base, expect } from "@playwright/test"
import { HeaderComponent } from "../components/headerComponent"

type MyFixtures = {
  header: HeaderComponent
}

export const test = base.extend<MyFixtures>({
  header: async ({ page }, use) => {
    const headerComponent = new HeaderComponent(page)
    await page.goto("/")
    await use(headerComponent)
  },
})

export { expect }
