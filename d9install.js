const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0); // 60 seconds
  await page.goto('https://d9junk.ddev.site/core/install.php');
  await page.screenshot({ path: 'start.png' });
  await page.waitForSelector('[id="edit-langcode"]');
  await page.click('[id="edit-submit"]');
  await page.waitForNavigation();
  await page.waitForSelector('[id="edit-site-name"]');
  await page.screenshot({ path: 'done.png' });
  // browser.close();
})()
