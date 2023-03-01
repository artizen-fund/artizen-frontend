
import dappwright, { MetaMaskWallet } from "@tenkeylabs/dappwright";
import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const [metamask, page, context] = await dappwright.bootstrap("", {
    wallet: "metamask",
    version: MetaMaskWallet.recommendedVersion,
  });

  console.log("process.env.PLAYWRIGHT_TEST_BASE_URL")
  console.log(process.env.PLAYWRIGHT_TEST_BASE_URL);
  await metamask.switchNetwork('Goerli');

  await context.close();
}

export default globalSetup;