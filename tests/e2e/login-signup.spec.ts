import { test as base, expect, request } from '@playwright/test'
import { Page, BrowserContext } from 'playwright-core'

import { Dappwright, getWallet, launch, MetaMaskWallet } from '@tenkeylabs/dappwright'

import { graphqlURL, graphqlAdminSecret, deleteTestUserMutationDoc } from '../util/graphql'
import { waitFor } from '@testing-library/react'

export const test = base.extend<{
  context: BrowserContext
  metamask: Dappwright
}>({
  context: async ({}, use) => {
    // Launch context with the same session from global-setup
    const { browserContext, wallet } = await launch('', {
      wallet: 'metamask',
      version: MetaMaskWallet.recommendedVersion,
    })

    // Unlock the wallet
    await wallet.unlock()

    await use(browserContext)
    await browserContext.close()
  },
  metamask: async ({ context }, use) => {
    const metamask = await getWallet('metamask', context)
    await use(metamask)
  },
})

test.describe.configure({ mode: 'serial' }) // Avoid colliding browser sessions

test.describe('general artizen user', () => {
  test.beforeAll(async ({ metamask }) => {
    // ensure that test user does not exist in db
    await deleteTestUserFromDb()

    // ensure that we're using the Goerli network
    await metamask.switchNetwork('Goerli')

    // use Account 1 for general user tests
    // use Account 2 for admin user tests
    // await metamask.switchAccount(1)
  })

  test.beforeEach(async ({ page }) => {
    await page.goto('/') // is localhost:3000 available?
    await page.bringToFront()
  })

  test.afterAll(async () => {
    // clean up: remove test user from db
    await deleteTestUserFromDb()
  })

  test.only('new user can login via metamask', async ({ page, metamask, context }) => {
    await page.waitForLoadState()

    // click sign in button
    await clickAccountButton(page, 'CloseSign In')
    await clickMetamaskIcon(page)

    // Approve the connection when MetaMask pops up
    await metamask.approve()

    // This closes the metamask popup without signing the tx
    // so we need to go through sign in process again...
    await closeWalletConnectModal(page)
    await clickAccountButton(page, 'CloseSign In')
    await clickMetamaskIcon(page)

    // ...to sign the transaction
    await metamask.page.waitForLoadState()
    await metamask.sign()

    await page.waitForLoadState()

    // upon successful login, expect the new user profile form to appear
    await expect(page.getByText('Complete your profile')).toBeVisible({
      timeout: 20000,
    })
  })

  test.only('new user can complete profile', async ({ page, metamask }) => {
    await expect(page.getByText('Complete your profile')).toBeVisible({
      timeout: 5000,
    })
    await page.waitForLoadState()

    // if we go too fast, then the form validation prevents clicking Save Changes
    await page.waitForTimeout(100)
    await page.getByRole('textbox').nth(1).fill('Testfirstname')
    await page.waitForTimeout(100)
    await page.getByRole('textbox').nth(2).fill('Testlastname')
    await page.waitForTimeout(100)
    await page.getByRole('textbox').nth(3).fill('Testusername')
    await page.waitForTimeout(100)
    await page.getByRole('textbox').nth(4).fill('test@artizen.fund')
    await page.waitForTimeout(100)
    await page.getByText('Save Changes').click()
  })

  test.only('user can logout', async ({ page, metamask }) => {
    // TT = initials of Testfirstname Testlastname
    await clickAccountButton(page, 'TT')
    await clickLogout(page)

    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible({
      timeout: 10000,
    })
  })

  test.only('existing user can login', async ({ page, metamask }) => {
    await page.waitForLoadState()

    // click sign in button
    await clickAccountButton(page, 'CloseSign In')

    // click metamask icon to open wallet
    await clickMetamaskIcon(page)

    // Approve the connection when MetaMask pops up
    // This closes the metamask popup so we need to go through artizen sign in process again
    // to sign the transaction
    await metamask.sign()

    await closeWalletConnectModal(page)
    await clickAccountButton(page, 'CloseSign In')

    await clickMetamaskIcon(page)

    await metamask.sign()

    await page.waitForLoadState()

    await expect(page.locator('#accountButton').getByText('TT')).toBeVisible({
      timeout: 10000,
    })
  })
})

test.describe('admin user', () => {
  test.beforeAll(async ({ metamask }) => {
    // ensure that test user does not exist in db
    // await deleteTestUserFromDb()

    // ensure that we're using the Goerli network
    await metamask.switchNetwork('Goerli')

    // use Account 1 for general user tests
    // use Account 2 for admin user tests
    // await metamask.switchAccount(2)
    // metamask.switchAccount(2) // Account 2 is our test admin account
    const test_admin_wallet_pk = process.env.TEST_WALLET_PK ? process.env.TEST_WALLET_PK : ''
    await metamask.importPK(test_admin_wallet_pk)

    // disconnect non-admin user metamask account from localhost
    await metamask.switchAccount(1)
    await metamask.page.getByTestId('account-options-menu-button').click()
    await metamask.page.getByTestId('account-options-menu__connected-sites').click()
    await metamask.page.getByText('Disconnect').click()
    await metamask.page.getByRole('button', { name: 'Disconnect' }).click()

    // await metamask.deleteAccount(1)
  })

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.bringToFront()
  })

  test.afterAll(async () => {
    // clean up: remove test season from db
    // await deleteTestSeasonFromDb() // title = playwright test title
  })

  test('admin user can login', async ({ page, metamask }) => {
    await page.bringToFront()

    await page.waitForLoadState()

    // click sign in button
    await page.getByText('CloseSign In').waitFor()
    await page.locator('#accountButton').click()

    // click metamask icon to open wallet
    await page.waitForSelector('img[src="/assets/metamask.svg"]')
    await page.getByRole('img', { name: 'Metamask' }).click()

    // Approve the connection when MetaMask pops up
    // This closes the metamask popup so we need to go through artizen sign in process again
    // to sign the transaction
    await performPopupAction(page, async popup => {
      await popup.bringToFront()
      await popup.reload()

      // click each checkbox to connect with Account 2 (admin account)
      await popup.getByRole('checkbox').nth(0).click()
      await popup.getByRole('checkbox').nth(1).click()

      const nextButton = await popup.waitForSelector(`//button[contains(text(), 'Next')]`)
      await nextButton.click()
      const connectButton = await popup.waitForSelector(`//button[contains(text(), 'Connect')]`)
      await connectButton.click()
      const signButton = await popup.waitForSelector(`//button[contains(text(), 'Sign')]`)
      await signButton.click()
    })

    await page.getByRole('button').filter({ hasText: 'Close' }).nth(1).click()
    await page.locator('#accountButton').click()
    await page.waitForSelector('img[src="/assets/metamask.svg"]')
    await page.getByRole('img', { name: 'Metamask' }).click()

    await metamask.sign()

    await page.waitForLoadState()

    await page.waitForSelector('#accountButton')
    await page.waitForLoadState('networkidle')
    await page.waitForLoadState('domcontentloaded')

    await expect(page.locator('#accountButton').getByText('ES')).toBeVisible({
      timeout: 10000,
    })
  })

  test('admin user can view list of seasons in admin site', async ({ page, metamask }) => {
    await page.goto('/admin/seasons')
    await expect(page.getByText('Season List')).toBeVisible({
      timeout: 10000,
    })
  })

  test('admin user can create new season', async ({ page, metamask }) => {
    await page.goto('/admin/seasons')
    // const createButton = await page.waitForSelector(`//button[contains(text(), 'Create New Season')]`)
    // await createButton.click()
    await page.getByRole('button').filter({ hasText: 'Create New Season' }).click()

    await page.waitForLoadState()

    await page.waitForTimeout(100)
    await page.getByRole('textbox').nth(0).fill('playwright test title')
    await page.waitForTimeout(100)
    // await page.getByLabel('Season Title *').fill('Test Title')
    await page.waitForTimeout(100)
    await page.getByRole('textbox').nth(1).fill('2023-01-01')
    // await page.getByLabel('Season Starting Date *').fill('01/01/2023')
    await page.waitForTimeout(100)
    await page.getByRole('textbox').nth(2).fill('2023-01-02')
    // await page.getByLabel('Season Ending Date *').fill('01/02/2023')
    await page.waitForTimeout(100)
    await page.getByText('Save Draft').click()

    await page.waitForLoadState()

    // see if new season detail page appears
    await expect(page.getByText('playwright test title')).toBeVisible({
      timeout: 10000,
    })

    // see if new season appears in list
    await page.goto('/admin/seasons')
    await expect(page.getByText('playwright test title')).toBeVisible({
      timeout: 10000,
    })
  })
})

const performPopupAction = async (page: Page, action: (popup: Page) => Promise<void>): Promise<void> => {
  const popup = await page.context().waitForEvent('page') // Wait for the popup to show up

  await action(popup)
  if (!popup.isClosed()) await popup.waitForEvent('close')
}

async function clickLogout(page: Page) {
  await page.getByText('Sign Out').click()
  console.log('logging out...')
}

async function closeWalletConnectModal(page: Page) {
  await page.getByRole('button').filter({ hasText: 'Close' }).nth(1).click()
}

async function clickMetamaskIcon(page: Page) {
  // await page.getByRole('img', { name: 'Metamask' }).waitFor()
  await page.getByRole('img', { name: 'Metamask' }).click()
}

async function clickAccountButton(page: Page, waitForText?: string) {
  // await page.getByText(waitForText).waitFor()
  if (waitForText) {
    await page.locator('#accountButton').getByText(waitForText).waitFor()
  }
  await page.locator('#accountButton').click()
}

async function deleteTestUserFromDb() {
  const context = await request.newContext({
    baseURL: graphqlURL,
  })

  // async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await context.post('/v1/graphql/', {
    headers: {
      'X-Hasura-Admin-Secret': graphqlAdminSecret,
    },
    data: {
      query: deleteTestUserMutationDoc,
      operationName: 'MyMutation',
    },
  })

  const resJSON = await result.json()
  console.log(JSON.stringify(resJSON))
}
