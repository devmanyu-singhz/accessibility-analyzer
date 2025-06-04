// const puppeteer = require("puppeteer");
// const axeCore = require("axe-core");
// const fs = require("fs");
// const path = require("path");

// const url = process.argv[2];

// if (!url) {
//   console.error("❌ Please provide a URL as a command-line argument.");
//   process.exit(1);
// }

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto(url, { waitUntil: "networkidle2" });

//   // Inject axe-core into the page
//   await page.addScriptTag({ content: axeCore.source });

//   // Run axe-core
//   const results = await page.evaluate(async () => {
//     return await axe.run();
//   });

//   // Print summary
//   console.log(`\n📍 Accessibility violations found on ${url}:`);
//   console.log(`Found ${results.violations.length} issue(s).`);
//   if (results.violations.length > 0) {
//     console.log("Details saved to results folder.\n");
//   } else {
//     console.log("✅ No major accessibility issues found.\n");
//   }
// // Save to file
//   const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
//   const filePath = path.join(__dirname, "results", `report-${timestamp}.json`);
//   fs.writeFileSync(filePath, JSON.stringify(results.violations, null, 2));

//   await browser.close();
// })();




const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const axeCore = require("axe-core");

const resultsDir = path.join(__dirname, "results");
if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir);

const urlsFile = path.join(__dirname, "urls.txt");

(async () => {
  const urls = fs.readFileSync(urlsFile, "utf-8").split("\n").filter(Boolean);

  const browser = await puppeteer.launch();

  for (const url of urls) {
    console.log(`\n🔍 Auditing: ${url}`);
    const page = await browser.newPage();

    try {
      await page.goto(url, { waitUntil: "networkidle2" });
      await page.addScriptTag({ path: require.resolve("axe-core") });

      const results = await page.evaluate(async () => {
        return await window.axe.run();
      });
      const safeUrl = url.replace(/https?:\/\//, "").replace(/[^\w]/g, "_");
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const fileName = `report-${safeUrl}-${timestamp}.json`;

      fs.writeFileSync(
        path.join(resultsDir, fileName),
        JSON.stringify(results, null, 2)
      );

      console.log(`✅ Report saved: results/${fileName}`);
    } catch (err) {
      console.error(`❌ Failed to audit ${url}: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
})();