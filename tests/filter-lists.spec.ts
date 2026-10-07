/// <reference types="node" />

import { test, expect, chromium } from '@playwright/test'
import path from 'node:path'

test('D-Blockerz filter list toggle works', async () => {
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
      popupPage.getByText('Filter Lists', {
        exact: true,
      }),
    ).toBeVisible()

    const defaultAds = popupPage
      .getByText('Default Ads', {
        exact: true,
      })
      .locator('../..')

    await expect(
      defaultAds.getByRole('button', {
        name: 'Enabled',
      }),
    ).toBeVisible()

    await defaultAds.getByRole('button', {
      name: 'Enabled',
    }).click()

    await expect(
      defaultAds.getByRole('button', {
        name: 'Disabled',
      }),
    ).toBeVisible()
  } finally {
    await context.close()
  }
})