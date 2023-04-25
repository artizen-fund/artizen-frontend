import { Page } from 'playwright-core'
import { Dappwright } from '@tenkeylabs/dappwright'

export const performPopupAction = async (page: Page, action: (popup: Page) => Promise<void>): Promise<void> => {
  const popup = await page.context().waitForEvent('page') // Wait for the popup to show up

  await action(popup)
  if (!popup.isClosed()) await popup.waitForEvent('close')
}

export async function clickMetamaskSignButton(popup: Page) {
  const signButton = await popup.waitForSelector(`//button[contains(text(), 'Sign')]`)
  await signButton.click()
}

export async function clickMetamaskConnectButton(popup: Page) {
  const connectButton = await popup.waitForSelector(`//button[contains(text(), 'Connect')]`)
  await connectButton.click()
}

export async function clickMetamaskNextButton(popup: Page, timeout?: number) {
  const nextButton = await popup.waitForSelector(`//button[contains(text(), 'Next')]`)
  await nextButton.click({ timeout: timeout })
}

export async function disconnectAccount(metamask: Dappwright, accountNumber: number) {
  await metamask.switchAccount(accountNumber)
  await metamask.page.getByTestId('account-options-menu-button').click()
  await metamask.page.getByTestId('account-options-menu__connected-sites').click()
  // attempt to disconnect this account
  try {
    await metamask.page.getByText('Disconnect').click({ timeout: 2000 })
    await metamask.page.getByRole('button', { name: 'Disconnect' }).click({ timeout: 2000 })
  } catch (e) {
    console.log(`Account ${accountNumber} is not connected and so cannot disconnect`)
    console.log(e)
    await metamask.page.getByTestId('popover-close').click()
  }
}

export async function importTestAdminWallet(metamask: Dappwright) {
  const testAdminWalletPk = process.env.TEST_ADMIN_WALLET_PK ? process.env.TEST_ADMIN_WALLET_PK : ''
  await metamask.importPK(testAdminWalletPk)
  console.log("imported test admin wallet")
}

export async function importTestUserWallet(metamask: Dappwright) {
  const testUserWalletPk = process.env.TEST_USER_WALLET_PK ? process.env.TEST_USER_WALLET_PK : ''
  await metamask.importPK(testUserWalletPk)
  console.log("imported test user wallet")
}
