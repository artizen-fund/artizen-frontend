import { test as base, expect } from "@playwright/test";
import { BrowserContext } from "playwright-core";

import {
  Dappwright,
  getWallet,
  launch,
  MetaMaskWallet,
} from "@tenkeylabs/dappwright";

export const test = base.extend<{
  context: BrowserContext;
  metamask: Dappwright;
}>({
  context: async ({}, use) => {
    // Launch context with the same session from global-setup
    const { browserContext, wallet } = await launch("", {
      wallet: "metamask",
      version: MetaMaskWallet.recommendedVersion,
    });

    // Unlock the wallet
    await wallet.unlock();

    await use(browserContext);
    await browserContext.close();
  },
  metamask: async ({ context }, use) => {
    const metamask = await getWallet("metamask", context);
    await use(metamask);
  },
});

test.describe.configure({ mode: "serial" }); // Avoid colliding browser sessions

test.describe("general artizen user", () => {
  test.beforeEach(async ({ page, metamask }) => {
    await metamask.switchNetwork("Goerli");
    // await page.goto("http://localhost:3000/");
    // relies on playwright baseUrl
    await page.goto("/");
    await page.bringToFront();
  });

  test("can login via metamask", async ({ page, metamask }) => {
    await page.waitForLoadState("networkidle");

    // click sign in button
    await page.getByText("CloseSign In").waitFor();
    await page.locator("#accountButton").click();

    // click metamask icon to open wallet
    await page.waitForSelector('img[src="/assets/metamask.svg"]');
    await page.getByRole("img", { name: "Metamask" }).click();

    // Approve the connection when MetaMask pops up
    // This closes the metamask popup so we need to go through artizen sign in process again
    // to sign the transaction
    await metamask.approve();

    await page.getByRole("button").filter({ hasText: "Close" }).nth(1).click();
    await page.locator("#accountButton").click();
    await page.waitForSelector('img[src="/assets/metamask.svg"]');
    await page.getByRole("img", { name: "Metamask" }).click();

    await metamask.sign();

    await page.waitForLoadState("networkidle");

    await page.waitForSelector("#accountButton");
    await page.waitForLoadState("networkidle");
    await page.waitForLoadState("domcontentloaded");

    await expect(page.getByText("Complete your profile")).toBeVisible({
      timeout: 20000,
    });
  });
});
