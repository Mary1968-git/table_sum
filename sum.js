const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let total = 0;
  for (let seed = 29; seed <= 38; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector('table');
    const seedSum = await page.evaluate(() => {
      let s = 0;
      for (const td of document.querySelectorAll('table td, table th')) {
        const n = parseFloat(td.textContent.replace(/[^0-9.\-]/g, ''));
        if (!Number.isNaN(n)) s += n;
      }
      return s;
    });
    console.log(`seed ${seed}: ${seedSum}`);
    total += seedSum;
  }
  console.log(`TOTAL SUM: ${total}`);
  await browser.close();
})();
