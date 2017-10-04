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
    const h2 = await driver.findElement(By.xpath("//h2[contains(text(), '&nbsp;Books')]"))  
    expect(h2).to.be.ok

  })
  // it('has AWS course', async ()=>{
  //   driver.wait(until.elementLocated(By.id('search-courses')))
  //   driver.findElement(By.id('search-courses')).sendKeys('aws') 
  //   driver.findElement(By.id('search-courses')).sendKeys(webdriver.Key.ENTER) // same element as above just different selector
  //   expect(await driver.getCurrentUrl()).to.eql('https://node.university/courses?query=aws')
  //   const div = driver.findElement(By.xpath("//div[contains(text(), 'Node in Production Using Docker and AWS')]"))  
  //   expect(div).to.be.ok
  //   div.click()
  //   driver.wait(until.titleIs('Node in | Node University: Courses on Node.js, React and JavaScript'), 1000)  
  //   expect(await driver.getCurrentUrl()).to.eql('https://node.university/p/node-in-production')    
    
  // })

  after(() => {
    driver.sleep(20000)
    driver.quit()
  })
})


