const puppeteer = require("puppeteer");
const fs = require("fs");
const testResults = [];

fs.writeFileSync("puppeteer-test-results.json", JSON.stringify(testResults));

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runStandardTest(name, url) {
  await puppeteer.launch({ headless: "new" }).then(async (browser) => {
    const page = await browser.newPage();

    let pageLoadStart = performance.now();
    console.log("goto Page");
    page.goto(url);

    console.log("wait for button");
    let btn = await page.waitForSelector("#test-inc");
    const buttonVisible = performance.now();

    console.log("clicking button every 250ms until value changes from 0");
    const startTimer = performance.now();

    console.log("wait for value greater than 0");
    let waiting = true;
    let failed = false;
    let counter = 0;
    let finalValue = 0;
    while (waiting && !failed) {
      counter++;
      try {
        btn = await page.waitForSelector("#test-inc");
        await btn.click();
      } catch (e) {}
      const results = await page.evaluate(() => {
        const valElm = document.querySelector("#test-value");
        if (valElm) return valElm.textContent;
      });
      if (Number(results) > 0) {
        finalValue = Number(results);
        waiting = false;
        break;
      }
      if (counter > 200) failed = true;
      await sleep(250);
    }

    const endTimer = performance.now();
    testResults.push({
      testName: name,
      timeToButtonVisible: buttonVisible - pageLoadStart,
      timeUntiValueUpdated: endTimer - startTimer,
      buttonClickedCount: counter,
      finalCounterValue: finalValue,
      missedClicks: counter - finalValue,
      failed,
    });

    console.log("time diff", endTimer - startTimer);

    await browser.close();
  });
}

function saveReport() {
  fs.writeFileSync(
    "puppeteer-test-results.json",
    JSON.stringify(testResults, null, 2)
  );
}

module.exports = { runStandardTest, saveReport };
