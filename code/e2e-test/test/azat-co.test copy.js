const webdriver = require('selenium-webdriver'),
  {By, until} = webdriver,
  {expect} = require('chai')


describe('azat.co', () => {
  var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build()

  before(()=>{
    driver.get('http://azat.co')
  })
  it('has list of books', async () => {
    const h2 = await driver.findElement(By.xpath("//h2[contains(text(), 'Books')]"))
    expect(h2).to.be.ok

  })

  after(() => {
    driver.sleep(20000)
    driver.quit()
  })
})
