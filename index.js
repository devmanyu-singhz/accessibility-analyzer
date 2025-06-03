// const puppeteer = require('puppeteer');
// const { source } = require('axe-core');

// (async () => {
//   // Launch headless browser
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // URL to test
//   const url = 'https://example.com';
//   await page.goto(url);

//   // Inject axe-core into the page
//   await page.evaluate(source);

//   // Run axe-core analysis
//   const results = await page.evaluate(async () => {
//     return await axe.run();
//   });

//   // Show results
//   console.log(`Accessibility Violations found on ${url}:`);
//   console.log(JSON.stringify(results.violations, null, 2));

//   await browser.close();
// })();

const puppeteer = require('puppeteer');
const { source } = require('axe-core');

const url = process.argv[2];

if (!url) {
  console.error("❌ Please provide a URL like: node index.js https://example.com");
  process.exit(1);
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  await page.evaluate(source);

  const results = await page.evaluate(async () => await axe.run());

  console.log(`\n🔎 Accessibility Violations found on ${url}:\n`);
  console.log(JSON.stringify(results.violations, null, 2));

  await browser.close();
})();