import { test as base, expect } from '@playwright/test'
import { BrowserContext } from 'playwright-core'
import { formatUnits } from 'viem'

import Moralis from 'moralis'
import { EvmChain } from '@moralisweb3/common-evm-utils'

import { Dappwright, getWallet, launch, MetaMaskWallet } from '@tenkeylabs/dappwright'

import seasonsAbi from '../../src/contracts/SeasonsAbi'

import { importTestUserWallet, disconnectAccount } from '../util/metamask'
import {
  clickAccountButton,
  clickSignInButtonWithRetry,
  connectAndSignWithMetamask,
  signMetamaskPopup,
} from '../util/actions'
import { getCreatorIdByArtifactTokenId } from '../util/getCreatorIdByArtifactTokenId'
import { getOECcount, getWalletBalance, seasonsContractAddress } from '../util/moralis'

export const test = base.extend<{
  context: BrowserContext
  metamask: Dappwright
}>({
  context: async ({}, use) => {
    // Launch context with the same session from global-setup
    const { browserContext, wallet } = await launch('', {
      wallet: 'metamask',
      version: MetaMaskWallet.recommendedVersion,
      headless: process.env.PLAYWRIGHT_HEADLESS === 'false' ? false : true,
    })

    // Unlock the wallet
    await wallet.unlock()
    browserContext.grantPermissions(['clipboard-read'])
    await use(browserContext)
    await browserContext.close()
  },
  metamask: async ({ context }, use) => {
    const metamask = await getWallet('metamask', context)

    await use(metamask)
  },
})

// Avoid colliding browser sessions and allow for very long tests (e.g. mint flow)
test.describe.configure({ mode: 'serial', timeout: 300 * 1000 })

test.describe('existing user', () => {
  test.beforeAll(async ({ metamask }) => {
    // initialize moralis
    await Moralis.start({
      apiKey: process.env.MORALIS_API_KEY,
    })

    // ensure that we're using the Goerli network
    await metamask.switchNetwork('Goerli')
    await metamask.page.waitForTimeout(500)

    // import test admin wallet
    await importTestUserWallet(metamask)
    await metamask.page.waitForTimeout(500) // adding a delay to reduce frequency of "metamask encountered an error" issue

    // disconnect other user metamask account from localhost
    await disconnectAccount(metamask, 1)
    await metamask.page.waitForTimeout(500)
  })

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.bringToFront()
  })

  test('existing user can login', async ({ page, metamask }) => {
    await page.bringToFront()
    await page.waitForLoadState()

    // click sign in button
    await clickSignInButtonWithRetry(page)

    await connectAndSignWithMetamask(page, true, true)

    const popup = page.context().pages().at(-1)
    if (popup !== undefined) {
      await signMetamaskPopup(popup)
    }

    await page.waitForLoadState()

    await expect(page.locator('#accountButton').getByText('t')).toBeVisible({
      timeout: 10000,
    })

    await clickAccountButton(page, 't')
    await expect(page.getByText('Hi Testuser')).toBeVisible({
      timeout: 10000,
    })
  })

  /*
   * Test mint flow:
   *   * get native and Open Edition token balances before OEC mint
   *   * mint one copy for supporter by clicking the Buy button
   *   * compare native and token balances after mint event to pre-mint balances
   *   * compare mint count on homepage project (submission) leaderboard before and after mint
   *
   */
  test('existing user can mint open edition', async ({ page, metamask }) => {
    // get supporter public address from metamask page
    await metamask.switchAccount(2)
    await metamask.page.getByTestId('selected-account-click').click()
    const supporterPublicAddress: string = await metamask.page.evaluate('navigator.clipboard.readText()')
    console.log(`supporterPublicAddress = ${supporterPublicAddress}`)

    await metamask.page.waitForTimeout(1000)
    await page.goto('/')
    await page.bringToFront()

    const topArtifactStr = (
      await page
        .getByText(/^Artifact #/)
        .first()
        .innerText()
    ).valueOf()
    const topArtifactNumberStr = topArtifactStr.split(' #')[1]
    console.log(`topArtifactNumberStr = ${topArtifactNumberStr}`)

    // get pre-mint account value and token balances for user, creator, treasury
    const creatorPublicAddress = await getCreatorIdByArtifactTokenId(topArtifactNumberStr)
    const treasuryPublicAddress = process.env.NEXT_PUBLIC_TREASURY_ADDRESS
      ? process.env.NEXT_PUBLIC_TREASURY_ADDRESS
      : ''

    const response = await Moralis.EvmApi.utils.runContractFunction({
      address: seasonsContractAddress,
      functionName: 'getProtocolWalletAddress',
      abi: seasonsAbi,
      chain: EvmChain.GOERLI,
    })

    console.log(`get protocol address response.result: ${response.result}`)
    const protocolPublicAddress = response.result

    const supporterTokenCountBeforeMint = await getOECcount(supporterPublicAddress, topArtifactNumberStr)
    const creatorTokenCountBeforeMint = await getOECcount(creatorPublicAddress, topArtifactNumberStr)
    const treasuryTokenCountBeforeMint = await getOECcount(treasuryPublicAddress, topArtifactNumberStr)
    const protocolTokenCountBeforeMint = await getOECcount(protocolPublicAddress, topArtifactNumberStr)

    const supporterBalanceBeforeMint = await getWalletBalance(supporterPublicAddress)
    const creatorBalanceBeforeMint = await getWalletBalance(creatorPublicAddress)
    const treasuryBalanceBeforeMint = await getWalletBalance(treasuryPublicAddress)
    const protocolBalanceBeforeMint = await getWalletBalance(protocolPublicAddress)

    const numMintedBeforeMintStr = (
      await page
        .getByText(/ minted$/)
        .first()
        .innerText()
    ).valueOf()
    const numMintedBeforeMint = parseInt(numMintedBeforeMintStr.split(' ')[0])

    await page.getByRole('button', { name: /Buy/i }).first().click()
    await metamask.confirmTransaction()
    await expect(page.getByText('When you’re ready, confirm the transaction in your wallet')).toBeHidden({
      timeout: 60000,
    })

    // check post-mint account value and token balances
    const supporterTokenCountAfterMint = await getOECcount(supporterPublicAddress, topArtifactNumberStr)
    const creatorTokenCountAfterMint = await getOECcount(creatorPublicAddress, topArtifactNumberStr)
    const treasuryTokenCountAfterMint = await getOECcount(treasuryPublicAddress, topArtifactNumberStr)
    const protocolTokenCountAfterMint = await getOECcount(protocolPublicAddress, topArtifactNumberStr)

    // if wallet balance called too soon, it will not have updated balances
    await page.waitForTimeout(90 * 1000)

    const supporterBalanceAfterMint = await getWalletBalance(supporterPublicAddress)
    const creatorBalanceAfterMint = await getWalletBalance(creatorPublicAddress)
    const treasuryBalanceAfterMint = await getWalletBalance(treasuryPublicAddress)
    const protocolBalanceAfterMint = await getWalletBalance(protocolPublicAddress)

    const numMintedAfterMintStr = (await page.getByText(/ minted$/).innerText()).valueOf()
    const numMintedAfterMint = parseInt(numMintedAfterMintStr.split(' ')[0])

    expect(numMintedAfterMint - numMintedBeforeMint).toBe(1)

    // the supporter, creator, and treasury should each now have one more token
    expect(supporterTokenCountAfterMint - supporterTokenCountBeforeMint).toBe(1)
    expect(creatorTokenCountAfterMint - creatorTokenCountBeforeMint).toBe(1)
    expect(treasuryTokenCountAfterMint - treasuryTokenCountBeforeMint).toBe(0) // treasury wallet does not receive an OEC
    expect(protocolTokenCountAfterMint - protocolTokenCountBeforeMint).toBe(1)

    // the supporter, creator, and treasury should each now have one more token
    // expect(
    //   supporterBalanceAfterMint.sub(supporterBalanceBeforeMint).lt(BigNumber.from('-10000000000000000')),
    // ).toBeTruthy()
    expect(creatorBalanceAfterMint.sub(creatorBalanceBeforeMint).toString()).toBe('6000000000000000')
    expect(treasuryBalanceAfterMint.sub(treasuryBalanceBeforeMint).toString()).toBe('3000000000000000')
    expect(protocolBalanceAfterMint.sub(protocolBalanceBeforeMint).toString()).toBe('0')
  })
})
