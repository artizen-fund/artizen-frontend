const assert = require('assert')
const { Builder, Capabilities } = require('selenium-webdriver')

const buildDriver = function () {
  return new Builder().usingServer('http://localhost:4444/wd/hub').withCapabilities(Capabilities.chrome()).build()
}

describe('BStack Local Testing', async function () {
  this.timeout(0)
  let driver

  before(function () {
    driver = buildDriver()
  })

  it('check tunnel is working', async function () {
    await driver.get('http://bs-local.com:45691/check')
    const source = await driver.getPageSource()
    assert(source.match(/Up and running/i) != null)
  })

  after(async function () {
    await driver.quit()
  })
})
