import type { Locator, Page } from "@playwright/test"
import { expect } from "@playwright/test"

export class HeaderComponent {
  readonly page: Page
  readonly headerBanner: Locator
  readonly headerBtnHome: Locator
  readonly headerBtnInicio: Locator
  readonly headerBtnMeusCursos: Locator
  readonly headerBtnRequisitos: Locator
  readonly headerBtnInstrucoes: Locator
  readonly headerBtnMassaDados: Locator
  readonly headerBtnMissoes: Locator
  readonly headerBtnCentralBugs: Locator
  readonly headerBtnEntrar: Locator
  readonly headerBtnCriarConta: Locator

  constructor(page: Page) {
    this.page = page

    this.headerBanner = page.getByRole("banner")

    this.headerBtnHome = this.headerBanner.getByTestId("header-logo")
    this.headerBtnInicio = this.headerBanner.getByRole("link", { name: "Início" })
    this.headerBtnMeusCursos = this.headerBanner.getByRole("link", { name: "Meus Cursos" })
    this.headerBtnRequisitos = this.headerBanner.getByRole("link", { name: "Requisitos" })
    this.headerBtnInstrucoes = this.headerBanner.getByRole("link", { name: "Instruções" })
    this.headerBtnMassaDados = this.headerBanner.getByTestId("header-link-massa-de-dados")
    this.headerBtnMissoes = this.headerBanner.getByTestId("header-link-missões")
    this.headerBtnCentralBugs = this.headerBanner.getByTestId("header-link-central-de-bugs")
    this.headerBtnEntrar = this.headerBanner.getByTestId("header-btn-entrar")
    this.headerBtnCriarConta = this.headerBanner.getByRole("button", { name: "Criar conta" })
  }

  async clickHomeBtn() {
    await this.headerBtnHome.click()
  }

  async clickInicioBtn() {
    await this.headerBtnInicio.click()
  }

  async clickMeusCursosBtn() {
    await this.headerBtnMeusCursos.click()
  }

  async clickRequisitosBtn() {
    await this.headerBtnRequisitos.click()
  }

  async clickInstrucoesBtn() {
    await this.headerBtnInstrucoes.click()
  }

  async clickMassaDadosBtn() {
    await this.headerBtnMassaDados.click()
  }

  async clickMissoesBtn() {
    await this.headerBtnMissoes.click()
  }

  async clickCentralBugsBtn() {
    await this.headerBtnCentralBugs.click()
  }

  async clickEntrarBtn() {
    await this.headerBtnEntrar.click()
  }

  async clickCriarContaBtn() {
    await this.headerBtnCriarConta.click()
  }

  async validateBannerVisibility() {
    await expect(this.headerBanner).toBeVisible()
  }

  async validateHeaderButtonsVisibility() {
    await expect.soft(this.headerBtnHome).toBeVisible()
    await expect.soft(this.headerBtnInicio).toBeVisible()
    await expect.soft(this.headerBtnMeusCursos).toBeVisible()
    await expect.soft(this.headerBtnRequisitos).toBeVisible()
    await expect.soft(this.headerBtnInstrucoes).toBeVisible()
    await expect.soft(this.headerBtnMassaDados).toBeVisible()
    await expect.soft(this.headerBtnMissoes).toBeVisible()
    await expect.soft(this.headerBtnCentralBugs).toBeVisible()
    await expect.soft(this.headerBtnEntrar).toBeVisible()
    await expect.soft(this.headerBtnCriarConta).toBeVisible()
  }
}
