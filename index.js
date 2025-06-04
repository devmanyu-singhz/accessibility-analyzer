
// const puppeteer = require('puppeteer');
// const { source } = require('axe-core');

// const url = process.argv[2];

// if (!url) {
//   console.error("❌ Please provide a URL like: node index.js https://example.com");
//   process.exit(1);
// }

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(url);

//   await page.evaluate(source);

//   const results = await page.evaluate(async () => await axe.run());

//   console.log(`\n🔎 Accessibility Violations found on ${url}:\n`);
//   console.log(JSON.stringify(results.violations, null, 2));

//   await browser.close();
// })();

const puppeteer = require("puppeteer");
const axeCore = require("axe-core");
const fs = require("fs");
const path = require("path");

const url = process.argv[2];

if (!url) {
  console.error("❌ Please provide a URL as a command-line argument.");
  process.exit(1);
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  // Inject axe-core into the page
  await page.addScriptTag({ content: axeCore.source });

  // Run axe-core
  const results = await page.evaluate(async () => {
    return await axe.run();
  });

  // Print summary
  console.log(`\n📍 Accessibility violations found on ${url}:`);
  console.log(`Found ${results.violations.length} issue(s).`);
  if (results.violations.length > 0) {
    console.log("Details saved to results folder.\n");
  } else {
    console.log("✅ No major accessibility issues found.\n");
  }
// Save to file
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filePath = path.join(__dirname, "results", `report-${timestamp}.json`);
  fs.writeFileSync(filePath, JSON.stringify(results.violations, null, 2));

  await browser.close();
})();