import { test, expect } from "../support/fixtures"

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test("Validate Header Visibility", async ({ app }) => {
  await app.navigation.validateBannerVisibility()

  await app.navigation.validateHeaderButtonsVisibility()
})

test.describe("Validate Header Component Functions", () => {
  test("Validate Home Button", async ({ app, page }) => {
    await app.navigation.clickHomeBtn()

    await expect(page).toHaveURL("/")
  })

  test("Validate Inicio Button", async ({ app, page }) => {
    await app.navigation.clickInicioBtn()

    await expect(page).toHaveURL("/")
  })

  test("Validate Meus Cursos Button", async ({ app, page }) => {
    await app.navigation.clickMeusCursosBtn()

    await expect(page).toHaveURL("/cursos")
  })

  test("Validate Requisitos Button", async ({ app, page }) => {
    await app.navigation.clickRequisitosBtn()

    await expect(page).toHaveURL("/requisitos")
  })

  test("Validate Instruções Button", async ({ app, page }) => {
    await app.navigation.clickInstrucoesBtn()

    await expect(page).toHaveURL("/instrucoes")
  })

  test("Validate Massa de Dados Button", async ({ app, page }) => {
    await app.navigation.clickMassaDadosBtn()

    await expect(page).toHaveURL("/massa-de-dados")
  })

  test("Validate Missoes Button", async ({ app, page }) => {
    await app.navigation.clickMissoesBtn()

    await expect(page).toHaveURL("/missoes")
  })

  test("Validate Central de Bugs Button", async ({ app, page }) => {
    await app.navigation.clickCentralBugsBtn()

    await expect(page).toHaveURL("/central-de-bugs")
  })

  test("Validate Entrar Button", async ({ app, page }) => {
    await app.navigation.clickEntrarBtn()

    await expect(page).toHaveURL("/login")
  })

  test("Validate Criar Conta Button", async ({ app, page }) => {
    await app.navigation.clickCriarContaBtn()

    await expect(page).toHaveURL("/cadastro")
  })
})
