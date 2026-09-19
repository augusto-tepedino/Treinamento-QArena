import { defineConfig, devices } from '@playwright/test'
import { STORAGE_STATE } from './tests/support/data/users.ts'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 60_000,

  expect: {
    timeout: 5_000, // não vale a pena aumentar porque o teste pode ficar lento no tempo de execução, vale a pena usar o time explicito
  },
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    // Optional, enables native HTML upload
    ["html", { outputDir: "./playwright-report" }],
    // Mandatory reporter for JSON results
    ["json", { outputFile: "./playwright-report/report.json" }],
  ],

  use: {
    baseURL: 'http://localhost:5173',
    trace: 'retain-on-failure',

    actionTimeout: 5_000,
    navigationTimeout: 15_000,
  },

  projects: [
    {
      name: 'setup:user',
      testMatch: /.*auth\.user\.setup\.ts/,
    },
    {
      name: 'setup:orders',
      testMatch: /.*auth\.orders\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE.validUser,
      },
      dependencies: ['setup:user', 'setup:orders'],
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'yarn dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
