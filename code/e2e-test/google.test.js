var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until

var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build()

driver.get('http://www.google.com/ncr')
driver.findElement(By.name('q')).sendKeys('webdriver')
driver.findElement(By.name('q')).sendKeys(webdriver.Key.ENTER)
// until.elementLocated(By.css("input[value='Google Search']"))
// until.elementLocated(By.css("input.lsb"))
// driver.findElement(By.css("input.lsb")).click()

driver.wait(until.titleIs('webdriver - Google Search'), 1000)
driver.sleep(20000)
driver.quit()
