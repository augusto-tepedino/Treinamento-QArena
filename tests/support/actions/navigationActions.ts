import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export function createNavigationActions(page: Page) {

  const headerBanner = page.getByRole("banner")

  const headerBtnHome = headerBanner.getByTestId("header-logo")
  const headerBtnInicio = headerBanner.getByRole("link", { name: "Início" })
  const headerBtnMeusCursos = headerBanner.getByRole("link", { name: "Meus Cursos" })
  const headerBtnRequisitos = headerBanner.getByRole("link", { name: "Requisitos" })
  const headerBtnInstrucoes = headerBanner.getByRole("link", { name: "Instruções" })
  const headerBtnMassaDados = headerBanner.getByTestId("header-link-massa-de-dados")
  const headerBtnMissoes = headerBanner.getByTestId("header-link-missões")
  const headerBtnCentralBugs = headerBanner.getByTestId("header-link-central-de-bugs")
  const headerBtnEntrar = headerBanner.getByTestId("header-btn-entrar")
  const headerBtnCriarConta = headerBanner.getByRole("button", { name: "Criar conta" })

  return {

    elements: {
      headerBanner,
      headerBtnHome,
      headerBtnInicio,
      headerBtnMeusCursos,
      headerBtnRequisitos,
      headerBtnInstrucoes,
      headerBtnMassaDados,
      headerBtnMissoes,
      headerBtnCentralBugs,
      headerBtnEntrar,
      headerBtnCriarConta,
    },

    async clickHomeBtn() {
      await headerBtnHome.click()
    },

    async clickInicioBtn() {
      await headerBtnInicio.click()
    },

    async clickMeusCursosBtn() {
      await headerBtnMeusCursos.click()
    },

    async clickRequisitosBtn() {
      await headerBtnRequisitos.click()
    },

    async clickInstrucoesBtn() {
      await headerBtnInstrucoes.click()
    },

    async clickMassaDadosBtn() {
      await headerBtnMassaDados.click()
    },

    async clickMissoesBtn() {
      await headerBtnMissoes.click()
    },

    async clickCentralBugsBtn() {
      await headerBtnCentralBugs.click()
    },

    async clickEntrarBtn() {
      await headerBtnEntrar.click()
    },

    async clickCriarContaBtn() {
      await headerBtnCriarConta.click()
    },

    async validateBannerVisibility() {
      await expect(headerBanner).toBeVisible()
    },

    async validateHeaderButtonsVisibility() {
      await expect.soft(headerBtnHome).toBeVisible()
      await expect.soft(headerBtnInicio).toBeVisible()
      await expect.soft(headerBtnMeusCursos).toBeVisible()
      await expect.soft(headerBtnRequisitos).toBeVisible()
      await expect.soft(headerBtnInstrucoes).toBeVisible()
      await expect.soft(headerBtnMassaDados).toBeVisible()
      await expect.soft(headerBtnMissoes).toBeVisible()
      await expect.soft(headerBtnCentralBugs).toBeVisible()
      await expect.soft(headerBtnEntrar).toBeVisible()
      await expect.soft(headerBtnCriarConta).toBeVisible()
    }
  }
}
