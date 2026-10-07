/// <reference types="node" />

import { test, expect, chromium } from '@playwright/test'
import path from 'node:path'

test('D-Blockerz protection toggle works', async () => {
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
      popupPage.getByText('Protection is active'),
    ).toBeVisible()

    const toggle = popupPage.getByRole('button', {
      name: /disable protection/i,
    })

    await toggle.click()

    await expect(
      popupPage.getByText('Protection is disabled'),
    ).toBeVisible()

    await expect(
      popupPage.getByRole('button', {
        name: /enable protection/i,
      }),
    ).toBeVisible()
  } finally {
    await context.close()
  }
})