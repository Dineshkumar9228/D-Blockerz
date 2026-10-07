/// <reference types="node" />

import { test, expect, chromium } from '@playwright/test'
import path from 'node:path'

test('D-Blockerz whitelist works', async () => {
  const extensionPath = path.join(
    process.cwd(),
    'dist',
  )

  const context = await chromium.launchPersistentContext(
    '',
    {
      headless: false,
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    },
  )

  try {
    let [serviceWorker] = context.serviceWorkers()

    if (!serviceWorker) {
      serviceWorker = await context.waitForEvent(
        'serviceworker',
      )
    }

    const extensionId = new URL(
      serviceWorker.url(),
    ).host

    const popupPage = await context.newPage()

    await popupPage.goto(
      `chrome-extension://${extensionId}/index.html`,
    )

    await expect(
      popupPage.getByRole('heading', {
        name: 'Whitelist',
      }),
    ).toBeVisible()

    const input = popupPage.getByPlaceholder(
      'example.com',
    )

    await input.fill('test.example.com')

    await popupPage.getByRole('button', {
      name: /add/i,
    }).click()

    await expect(
      popupPage.getByText('test.example.com'),
    ).toBeVisible()
  } finally {
    await context.close()
  }
})