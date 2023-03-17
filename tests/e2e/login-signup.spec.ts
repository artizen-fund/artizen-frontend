import { test as base, expect } from '@playwright/test'
import { BrowserContext } from 'playwright-core'

import { Dappwright, getWallet, launch, MetaMaskWallet } from '@tenkeylabs/dappwright'

import { deleteTestUserFromDb } from '../util/deleteTestUserFromDb'
import { deleteTestSeasonFromDb } from '../util/deleteTestSeasonFromDb'
import { importTestAdminWallet, disconnectAccount } from '../util/metamask'
import {
  clickAccountButton,
  clickSignInButtonWithRetry,
  clickMetamaskIcon,
  closeWalletConnectModal,
  clickLogout,
  connectAndSignWithMetamask,
} from '../util/actions'

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

  test('new user can login via metamask', async ({ page, metamask, context }) => {
    await page.waitForLoadState()

    // click sign in button
    // await clickAccountButton(page, 'CloseSign In')
    await clickSignInButtonWithRetry(page)

    // await clickMetamaskIcon(page)

    // Approve the connection when MetaMask pops up
    // await metamask.approve()

    await connectAndSignWithMetamask(page, true, false)

    await page.waitForLoadState()

    // upon successful login, expect the new user profile form to appear
    await expect(page.getByText('Complete your profile')).toBeVisible({
      timeout: 20000,
    })
  })

  test('new user can complete profile', async ({ page, metamask }) => {
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
    await page.getByRole('textbox').nth(4).fill('e2etesting@email.ghostinspector.com')
    await page.waitForTimeout(100)
    await page.getByText('Save Changes').click()
  })

  test('user can logout', async ({ page, metamask }) => {
    // TT = initials of Testfirstname Testlastname
    await clickAccountButton(page, 'TT')
    await clickLogout(page)

    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible({
      timeout: 10000,
    })
  })

  test('existing user can login', async ({ page, metamask }) => {
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
    // ensure that we're using the Goerli network
    await metamask.switchNetwork('Goerli')

    // import test admin wallet
    await importTestAdminWallet(metamask)

    // disconnect other user metamask account from localhost
    await disconnectAccount(metamask, 1)

    // ensure test season is not in db
    await deleteTestSeasonFromDb()
  })

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.bringToFront()
  })

  test.afterAll(async () => {
    // clean up: remove test season from db
    await deleteTestSeasonFromDb()
  })

  test('admin user can login', async ({ page, metamask }) => {
    await page.bringToFront()
    await page.waitForLoadState()

    // click sign in button
    await clickAccountButton(page, 'CloseSign In')

    await connectAndSignWithMetamask(page, true, true)

    await page.waitForLoadState()

    // expect initials 'rr' for admin to be hidden by profile pic
    await expect(page.locator('#accountButton').getByText('rr')).toBeHidden({
      timeout: 10000,
    })
  })

  test('admin user can view list of seasons in admin site', async ({ page, metamask }) => {
    await page.goto('/admin/seasons')
    await expect(page.getByText('Season List')).toBeVisible({
      timeout: 10000,
    })
  })

  test.skip('admin user can create new season', async ({ page, metamask }) => {
    await page.goto('/admin/seasons')
    // const createButton = await page.waitForSelector(`//button[contains(text(), 'Create New Season')]`)
    // await createButton.click()
    await page.getByRole('button').filter({ hasText: 'Create New Season' }).click()

    await page.waitForLoadState()

    await page.waitForTimeout(100)
    await page.getByRole('textbox').nth(0).fill('playwright test title')
    await page.waitForTimeout(100)
    await page.waitForTimeout(100)
    await page.getByRole('textbox').nth(1).fill('2023-01-01')
    await page.waitForTimeout(100)
    await page.getByRole('textbox').nth(2).fill('2023-01-02')
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
