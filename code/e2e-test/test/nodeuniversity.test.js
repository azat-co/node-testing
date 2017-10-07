
const webdriver = require('selenium-webdriver'),
  {By, until} = webdriver,
  {expect} = require('chai')


describe('Node University', () => {
  var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build()

  before(()=>{
    driver.get('https://node.university')
  })
  it('has View All FREE Courses link', async () => {
    const a = await driver.findElement(By.xpath("//a[contains(text(), 'View All FREE Courses')]"))
    expect(a).to.be.ok
    await a.click()
    await driver.wait(until.titleIs('Node University: Courses on Node.js, React and JavaScript'), 3000)
    expect(await driver.getCurrentUrl()).to.eql('https://node.university/courses/category/free')
  })
  it('has AWS course', async ()=>{
    driver.wait(until.elementLocated(By.id('search-courses')))
    driver.findElement(By.id('search-courses')).sendKeys('aws')
    driver.findElement(By.id('search-courses')).sendKeys(webdriver.Key.ENTER) // same element as above just different selector
    expect(await driver.getCurrentUrl()).to.eql('https://node.university/courses?query=aws')
    const div = driver.findElement(By.xpath("//div[contains(text(), 'Node in Production Using Docker and AWS')]"))
    expect(div).to.be.ok
    div.click()
    driver.wait(until.titleIs('Node in Production Using Docker and AWS | Node University: Courses on'), 3000)
    expect(await driver.getCurrentUrl()).to.eql('https://node.university/p/node-in-production')

  })

  after(() => {
    driver.sleep(1000)
    driver.quit()
  })
})
