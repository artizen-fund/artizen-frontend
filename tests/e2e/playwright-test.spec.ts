const { test: base, chromium, webkit, expect } = require('@playwright/test')

import { BrowserContext, Page } from 'playwright-core';
import { Dappwright, OfficialOptions, MetaMaskWallet } from '@tenkeylabs/dappwright';

import * as dappwright from '@tenkeylabs/dappwright';

// import dappwright, { MetaMaskWallet } from "@tenkeylabs/dappwright";
// import playwright from 'playwright';

const launchBrowser = async (options: OfficialOptions): Promise<[BrowserContext, Page, Dappwright]> => {
  const { browserContext, wallet } = await dappwright.launch('', options);
  await wallet.unlock('password1234');
  await wallet.switchNetwork("Goerli");

  const testPage = await browserContext.newPage();
//   await testPage.goto('http://dev.artizen.fund/');
  await testPage.goto('http://localhost:3000/');

  console.log("attempting to connect to dApp!");

  // https://playwright.dev/docs/api/class-page#page-wait-for-load-state
  await testPage.waitForLoadState('networkidle');

  await testPage.waitForSelector('#accountButton');
//   await testPage.waitForSelector('.sc-5e1db7e4-2');
  await testPage.getByText('CloseSign In').waitFor();

  await testPage.getByText('CloseSign In').click();
//   await testPage.waitForSelector('.sc-8d724eb2-2');
  await testPage.waitForSelector('img[src="/assets/metamask.svg"]');

  await testPage.getByRole('img', { name: 'Metamask' }).click();

  
  // Approve the connection when MetaMask pops up
  // This closes the metamask popup so we need to go through artizen sign in process again
  // to sign the transaction
  await wallet.approve();

  await testPage.getByRole('button').filter({ hasText: 'Close' }).nth(1).click();
  await testPage.getByText('CloseSign In').click();
//   await testPage.waitForSelector('.sc-8d724eb2-2');
  await testPage.waitForSelector('img[src="/assets/metamask.svg"]');

  // await page.waitForLoadState('networkidle');
  await testPage.getByRole('img', { name: 'Metamask' }).click();

  await wallet.sign();

  await testPage.waitForLoadState('networkidle');

  await testPage.waitForSelector('#accountButton');
//   await testPage.click('span:text-is("ES")');
  await testPage.waitForLoadState('networkidle');
  await testPage.waitForLoadState('domcontentloaded');


  await expect(testPage.getByText('Complete your profile')).toBeVisible({timeout: 20000});
//   await testPage.waitForTimeout(20000);

  return [browserContext, testPage, wallet];
};


export const test = base.extend({
    context: async ({}, use) => {
      // Launch context with the same session from global-setup
      const [metamask, page, context] = await dappwright.bootstrap("", {
        wallet: "metamask",
        version: MetaMaskWallet.recommendedVersion,
      });
    
      // Add Hardhet network
    //   await metamask.addNetwork({
    //     networkName: "Hardhat",
    //     rpc: "http://127.0.0.1:8545/",
    //     chainId: 31337,
    //     symbol: "ETH",
    //   });

      // switch to Goerli network
      await metamask.switchNetwork("Goerli");
    
      // Add an extra account
      // await metamask.createAccount();
    
      await context.close();
    

      const [browserContext, testPage, wallet] = await launchBrowser({
        wallet: "metamask",
        version: MetaMaskWallet.recommendedVersion,
      });
  
      // Unlock the wallet
      // await wallet.unlock();
  
      await use(browserContext);
      await browserContext.close();
    },
    metamask: async ({ context }, use) => {
      const metamask = await dappwright.getWallet("metamask", context);
  
      await use(metamask);
    },
  });
  
  test.describe.configure({ mode: "serial" }); // Avoid colliding browser sessions
  
  test.describe('Popup', () => {
    test("can connect to an application", async ({ page, metamask }) => {
  
    // Wait for the dapp to redirect
    // await page.waitForUrl("http://localhost:3000/dashboard");
  })
})
  

// describe.each<OfficialOptions>([
//   {
//     wallet: 'coinbase',
//     version: CoinbaseWallet.recommendedVersion,
//   },
//   {
//     wallet: 'metamask',
//     version: MetaMaskWallet.recommendedVersion,
//   },
// ])('$wallet - when the test environment is initialized', (options: OfficialOptions) => {
//   let browserContext: BrowserContext, wallet: Dappwright, testPage: Page;

//   beforeAll(async () => {
//     [browserContext, testPage, wallet] = await launchBrowser(options);
//   });

//   afterAll(async () => {
//     await browserContext.close();
//   });

//   it('should be running, playwright', async () => {
//     expect(browserContext).toBeTruthy();
//   });

//   it('should open, test page', async () => {
//     expect(testPage).toBeTruthy();
//     expect(await testPage.title()).toEqual('Local wallet test');
//   });

//   it('should open the wallet', async () => {
//     expect(wallet.page).toBeTruthy();
//   });
// });
