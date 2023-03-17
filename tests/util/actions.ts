import { Page } from 'playwright-core'

export async function clickLogout(page: Page) {
  await page.getByText('Sign Out').click()
  console.log('logging out...')
}

export async function closeWalletConnectModal(page: Page) {
  await page.getByRole('button').filter({ hasText: 'Close' }).nth(1).click()
}

export async function clickMetamaskIcon(page: Page) {
  // await page.getByRole('img', { name: 'Metamask' }).waitFor()
  await page.getByRole('img', { name: 'Metamask' }).click()
}

export async function clickAccountButton(page: Page, waitForText?: string) {
  // await page.getByText(waitForText).waitFor()
  if (waitForText) {
    await page.locator('#accountButton').getByText(waitForText).waitFor()
  }
  await page.locator('#accountButton').click()
}

export async function clickSignInButtonWithRetry(page: Page) {
  // click sign in button
  console.log('Clicking sign in button...')
  await page.getByText('CloseSign In').waitFor()

  for (let n of [...Array(10).keys()]) {
    try {
      await page.locator('#accountButton').click()
      await page.getByRole('img', { name: 'Metamask' }).waitFor({ timeout: 2000 })
      break
    } catch {
      console.log(`Attempt #${n}: clicking Sign In button did not work! Retrying...`)
      continue
    }
  }
}

async function getMetamaskPopupAfterClick(page: Page) {
  console.log('connectAndSignWithMetamask: Connecting with metamask...')
  console.log('connectAndSignWithMetamask: clicking metamask icon')
  const popupPromise = page.context().waitForEvent('page')
  await page.getByRole('img', { name: 'Metamask' }).click()
  const popup = await popupPromise // Wait for the popup to show up
  return popup
}

function getPageAtLastIndex(page: Page): Page {
  console.log('connectAndSignWithMetamask: Connecting with metamask...')
  console.log('connectAndSignWithMetamask: getting last page in context')
  const popup = page.context().pages().at(-1)
  if (popup === undefined) {
    return page
  }

  return popup
}

export async function connectAndSignWithMetamask(page: Page, clickMetamaskButton: boolean, toggleAccounts: boolean) {
  const popup = clickMetamaskButton ? await getMetamaskPopupAfterClick(page) : getPageAtLastIndex(page)

  // Approve the connection when MetaMask popup appears
  // This closes the metamask popup so we need to go through artizen sign in process again
  // to sign the transaction

  // Wait for popup to load
  console.log('connectAndSignWithMetamask: waitForLoadState')
  await popup.waitForLoadState()
  console.log('connectAndSignWithMetamask: bringToFront')
  await popup.bringToFront()

  // Select first account
  try {
    console.log('connectAndSignWithMetamask: select first account')
    await popup.locator('input[type="checkbox"]').first().check({ timeout: 500 })
  } catch (e) {
    console.log(e)
  }

  if (toggleAccounts) {
    await popup.getByRole('checkbox').nth(0).click()
    await popup.getByRole('checkbox').nth(1).click()
  }

  // Go through the prompts
  try {
    console.log('connectAndSignWithMetamask: click next button')
    const nextButton = await popup.waitForSelector(`//button[contains(text(), 'Next')]`, { timeout: 500 })
    await nextButton.click()
  } catch (e) {
    console.log(e)
  }

  try {
    console.log('connectAndSignWithMetamask: click connect button')
    const connectButton = await popup.waitForSelector(`//button[contains(text(), 'Connect')]`, { timeout: 500 })
    await connectButton.click()
  } catch (e) {
    console.log(e)
  }

  // EK TESTING
  try {
    console.log('connectAndSignWithMetamask: click sign button')
    const signButton = await popup.waitForSelector(`//button[contains(text(), 'Sign')]`, { timeout: 5000 })
    await signButton.click()
  } catch (e) {
    console.log(e)
  }
  // END TEST

  // Wait and close
  try {
    await popup.waitForTimeout(3000)
    await popup.close()
  } catch (e) {
    console.log(e)
  }

  if (!popup.isClosed()) await popup.waitForEvent('close')
  return popup
}
