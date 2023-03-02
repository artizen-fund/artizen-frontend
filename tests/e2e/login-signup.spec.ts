import { test as base, expect, request } from '@playwright/test'
import { BrowserContext } from 'playwright-core'

import { Dappwright, getWallet, launch, MetaMaskWallet } from '@tenkeylabs/dappwright'

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
  test.beforeEach(async ({ page, metamask }) => {
    await metamask.switchNetwork('Goerli')
    await page.goto('/')
    await page.bringToFront()
  })

  test('can login via metamask', async ({ page, metamask }) => {
    await page.waitForLoadState('networkidle')

    // click sign in button
    await page.getByText('CloseSign In').waitFor()
    await page.locator('#accountButton').click()

    // click metamask icon to open wallet
    await page.waitForSelector('img[src="/assets/metamask.svg"]')
    await page.getByRole('img', { name: 'Metamask' }).click()

    // Approve the connection when MetaMask pops up
    // This closes the metamask popup so we need to go through artizen sign in process again
    // to sign the transaction
    await metamask.approve()

    await page.getByRole('button').filter({ hasText: 'Close' }).nth(1).click()
    await page.locator('#accountButton').click()
    await page.waitForSelector('img[src="/assets/metamask.svg"]')
    await page.getByRole('img', { name: 'Metamask' }).click()

    await metamask.sign()

    await page.waitForLoadState('networkidle')

    await page.waitForSelector('#accountButton')
    await page.waitForLoadState('networkidle')
    await page.waitForLoadState('domcontentloaded')

    await expect(page.getByText('Complete your profile')).toBeVisible({
      timeout: 20000,
    })
  })

  test('can sign up', async ({ page, metamask }) => {
    await expect(page.getByText("Complete your profile")).toBeVisible({
      timeout: 5000,
    });

    await page.getByRole('textbox').nth(1).fill('Testfirstname');
    await page.getByRole('textbox').nth(2).fill('Testlastname');
    await page.getByRole('textbox').nth(3).fill('Testusername');
    await page.getByRole('textbox').nth(4).fill('test@artizen.fund');
    await page.getByText("Save Changes").click();

    const graphqlURL = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL
      ? process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL
      : 'https://artizen-dev.hasura.app/v1/graphql'
    const graphqlAdminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET
      ? process.env.HASURA_GRAPHQL_ADMIN_SECRET
      : ''

    const operationsDoc: string = `
    mutation MyMutation {
      delete_Users(where: {publicAddress: {_ilike: "0x7e4abd63a7c8314cc28d388303472353d884f292"}}) {
        returning {
          id
        }
      }
    }
  `

    const context = await request.newContext({
      baseURL: graphqlURL,
    })

    // async function fetchGraphQL(operationsDoc, operationName, variables) {
    const result = await context.post('/v1/graphql/', {
      headers: {
        'X-Hasura-Admin-Secret': graphqlAdminSecret,
      },
      data: {
        query: operationsDoc,
        operationName: 'MyMutation',
      },
    })

    const resJSON = await result.json()
  })
})
