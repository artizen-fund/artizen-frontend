import dappwright, { MetaMaskWallet } from '@tenkeylabs/dappwright'
import { FullConfig } from '@playwright/test'

async function globalSetup(config: FullConfig) {
  const [metamask, page, context] = await dappwright.bootstrap('', {
    wallet: 'metamask',
    version: MetaMaskWallet.recommendedVersion,
    headless: process.env.PLAYWRIGHT_HEADLESS === 'false' ? false : true,
  })

  await metamask.switchNetwork('Goerli')

  await context.close()
}

export default globalSetup
