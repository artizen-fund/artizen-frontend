const assert = require('assert')
const { Builder, By, Capabilities, until } = require('selenium-webdriver')

const buildDriver = function () {
  return new Builder().usingServer('http://localhost:4444/wd/hub').withCapabilities(Capabilities.chrome()).build()
}

describe("BStack's Cart Functionality", async function () {
  this.timeout(0)
  let driver

  before(function () {
    driver = buildDriver()
  })

  // it('can add items to cart', async function () {
  //   await driver.get('https://bstackdemo.com/');
  //   await driver.wait(until.titleMatches(/StackDemo/i), 10000);

  //   // locating product on webpage and getting name of the product
  //   await driver.wait(until.elementLocated(By.xpath('//*[@id="1"]/p')));
  //   let productText = await driver.findElement(By.xpath('//*[@id="1"]/p')).getText();
  //   // clicking the 'Add to cart' button
  //   await driver.wait(until.elementLocated(By.xpath('//*[@id="1"]/div[4]')));
  //   await driver.findElement(By.xpath('//*[@id="1"]/div[4]')).click();
  //   // waiting until the Cart pane has been displayed on the webpage
  //   await driver.wait(until.elementLocated(By.className("float-cart__content")));
  //   await driver.findElement(By.className('float-cart__content'))
  //   // locating product in cart and getting name of the product in cart
  //   await driver.wait(until.elementLocated(By.xpath('//*[@id="__next"]/div/div/div[2]/div[2]/div[2]/div/div[3]/p[1]')));
  //   let productCartText = await driver.findElement(By.xpath('//*[@id="__next"]/div/div/div[2]/div[2]/div[2]/div/div[3]/p[1]')).getText();
  //   // checking whether product has been added to cart by comparing product name
  //   assert(productText === productCartText);
  // });

  it('open website', async function () {
    await driver.get('https://dev.artizen.fund/')
    const artizenDevPageHandle = driver.getWindowHandle()
    const input = await driver.findElement(By.tagName('input'))
    await input.sendKeys('d.I$-R#Mxa8')
    await driver.findElement(By.tagName('button')).click()
    const PAGE_TITLE = 'We’ve successfully raised $1,515,250 for human creativity'
    const titlePage = await driver.findElement(
      By.xpath(`//*[contains(text(),"We’ve successfully raised $1,515,250 for human creativity")]`),
    )

    const tiile = await titlePage.getText()
    console.log('tiile 2   ', tiile)
    // located element with contains()

    assert.strictEqual(tiile, PAGE_TITLE)
    // review this
    //const buttonClick = await driver.findElement(By.css('AccountButton__Wrapper-sc-1a293e1b-0.dopKVM'))
    const buttonClick = await driver.findElement(By.id('accountButton'))
    buttonClick.click()

    const emailInput = await driver.findElement(By.tagName('input'))
    await emailInput.sendKeys('rubelux@email.ghostinspector.com')

    await driver.takeScreenshot()

    await driver.findElement(By.id('signin-from-bt')).click()

    // await driver.manage().setTimeouts({ implicit: 30000, pageLoad: 30000, script: 30000 })

    // await driver.get('https://email.ghostinspector.com/rubelux')
    //open a new tab
    await driver.switchTo().newWindow('tab')

    await driver.get('https://email.ghostinspector.com/rubelux')

    await driver.findElement(By.css('.message:first-child .subject>a'))

    // const btInEmail = await driver.findElement(By.xpath(`//*[contains(text(),"Log in to Artizen_dev")]`))

    const btInEmail = await driver.findElement(By.xpath('//a[@class=login-button bg-null]'))

    console.log('element    ', btInEmail)

    btInEmail.click()

    await driver.takeScreenshot()

    // await driver.findElement(By.css('.message:first-child>a')).click()

    // await driver.takeScreenshot()
  })

  after(async function () {
    await driver.quit()
  })
})
