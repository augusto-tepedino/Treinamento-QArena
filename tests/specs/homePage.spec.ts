import { test, expect } from '../fixtures/fixtures'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('check home page main elements', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'QArena', exact: true })).toBeVisible()

  await expect(page.getByTestId('home-btn-criar-conta')).toBeVisible()
})

test.describe('Go to login Page', async () => {
  test('go to login page - header button', async ({ header, page }) => {
    await header.clickEntrarBtn()

    await expect(page).toHaveURL('/login')
  })

  test('go to login page - home button', async ({ page }) => {
    await page.getByTestId('home-btn-ja-tenho-conta').click()

    await expect(page).toHaveURL('/login')
  })

  test('go to login page - card section', async ({ page }) => {
    await page.getByTestId('home-card-login').click()

    await expect(page).toHaveURL('/login')
  })
})

test.describe('Go to create account Page', async () => {
  test('go to create account page - header button', async ({ header, page }) => {
    await header.clickCriarContaBtn()

    await expect(page).toHaveURL('/cadastro')
  })

  test('go to create account page - home button', async ({ page }) => {
    await page.getByRole('button', { name: 'Criar minha conta' }).click()

    await expect(page).toHaveURL('/cadastro')
  })

  test('go to create account page - card section', async ({ page }) => {
    await page.getByTestId('home-card-cadastro').click()

    await expect(page).toHaveURL('/cadastro')
  })
})
