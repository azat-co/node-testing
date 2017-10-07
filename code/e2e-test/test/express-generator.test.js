const webdriver = require('selenium-webdriver'),
  {By, until} = webdriver,
  {expect} = require('chai')

const util = require('util')
const fs = require('fs')
const app = require('../app.js')
const url = 'localhost:3000'
let server

describe('Express generator website', () => {
  var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build()

  before(async ()=>{
    server = await app.listen(3000)
    driver.get(`http://${url}`)
  })
  it.only('has heading and a welcome paragraph', async () => {
    const h1 = await driver.findElement(By.css('h1'))
    expect(h1).to.be.ok
    expect(await h1.getText()).to.equal('Express')
    const p = await driver.findElement(By.xpath("//p[contains(text(), 'Welcome to Express')]"))
    expect(p).to.be.not.null
    expect(await p.isDisplayed()).to.be.true
    await util.promisify(fs.writeFile)('./screenshot.png', await driver.takeScreenshot(), 'base64')
  })

  after(() => {
    server.close()
    driver.sleep(1000)
    driver.quit()
  })
})
