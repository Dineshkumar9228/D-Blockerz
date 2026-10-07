/// <reference types="node" />

import { test, expect, chromium } from '@playwright/test'
import path from 'node:path'

test('D-Blockerz statistics reset works', async () => {
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
      popupPage.getByRole('button', {
        name: 'Reset Statistics',
      }),
    ).toBeVisible()

    await popupPage.getByRole('button', {
      name: 'Reset Statistics',
    }).click()

    await expect(
      popupPage.getByText('Ads blocked')
        .locator('..')
        .getByText('0', { exact: true }),
    ).toBeVisible()

    await expect(
      popupPage.getByText('Trackers')
        .locator('..')
        .getByText('0', { exact: true }),
    ).toBeVisible()

    await expect(
      popupPage.getByText('Total blocked')
        .locator('..')
        .getByText('0', { exact: true }),
    ).toBeVisible()
  } finally {
    await context.close()
  }
})