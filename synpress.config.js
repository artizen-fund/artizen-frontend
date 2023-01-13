import log from 'debug'

import { defineConfig } from 'cypress'
const synpressPath = '@synthetixio/synpress/'
log(`Detected synpress root path is: ${synpressPath}`)
const pluginsPath = '@synthetixio/synpress/plugins/index'
log(`Detected synpress plugin path is: ${pluginsPath}`)
import setupNodeEvents from '@synthetixio/synpress/plugins/index'
const fixturesFolder = `${synpressPath}/fixtures`
log(`Detected synpress fixtures path is: ${fixturesFolder}`)
const supportFile = 'tests/e2e/support.js'

module.exports = defineConfig({
  userAgent: 'synpress',

  retries: {
    runMode: process.env.CI ? 1 : 0,
    openMode: 0,
  },
  fixturesFolder,
  screenshotsFolder: 'tests/e2e/screenshots',
  videosFolder: 'tests/e2e/videos',
  chromeWebSecurity: true,
  viewportWidth: 1920,
  viewportHeight: 1580,
  env: {
    coverage: false,
  },
  defaultCommandTimeout: process.env.SYNDEBUG ? 9999999 : 30000,
  pageLoadTimeout: process.env.SYNDEBUG ? 9999999 : 30000,
  requestTimeout: process.env.SYNDEBUG ? 9999999 : 30000,
  e2e: {
    setupNodeEvents,
    experimentalSessionAndOrigin: true,
    // baseUrl: 'http://localhost:3000',
    baseUrl: 'https://lab.artizen.fund/',
    specPattern: 'tests/e2e/specs/**/*.{js,jsx,ts,tsx}',
    supportFile,
  },
  component: {
    setupNodeEvents,
    specPattern: './**/*spec.{js,jsx,ts,tsx}',
    supportFile,
  },
})
