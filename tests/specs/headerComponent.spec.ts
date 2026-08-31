import { test, expect } from "../fixtures/fixtures"

test("Validate Header Visibility", async ({ header }) => {
  await header.validateBannerVisibility()

  await header.validateHeaderButtonsVisibility()
})

test.describe("Validate Header Component Functions", () => {
  test("Validate Home Button", async ({ header, page }) => {
    await header.clickHomeBtn()

    await expect(page).toHaveURL("/")
  })

  test("Validate Inicio Button", async ({ header, page }) => {
    await header.clickInicioBtn()

    await expect(page).toHaveURL("/")
  })

  test("Validate Meus Cursos Button", async ({ header, page }) => {
    await header.clickMeusCursosBtn()

    await expect(page).toHaveURL("/cursos")
  })

  test("Validate Requisitos Button", async ({ header, page }) => {
    await header.clickRequisitosBtn()

    await expect(page).toHaveURL("/requisitos")
  })

  test("Validate Instruções Button", async ({ header, page }) => {
    await header.clickInstrucoesBtn()

    await expect(page).toHaveURL("/instrucoes")
  })

  test("Validate Massa de Dados Button", async ({ header, page }) => {
    await header.clickMassaDadosBtn()

    await expect(page).toHaveURL("/massa-de-dados")
  })

  test("Validate Missoes Button", async ({ header, page }) => {
    await header.clickMissoesBtn()

    await expect(page).toHaveURL("/missoes")
  })

  test("Validate Central de Bugs Button", async ({ header, page }) => {
    await header.clickCentralBugsBtn()

    await expect(page).toHaveURL("/central-de-bugs")
  })

  test("Validate Entrar Button", async ({ header, page }) => {
    await header.clickEntrarBtn()

    await expect(page).toHaveURL("/login")
  })

  test("Validate Criar Conta Button", async ({ header, page }) => {
    await header.clickCriarContaBtn()

    await expect(page).toHaveURL("/cadastro")
  })
})
