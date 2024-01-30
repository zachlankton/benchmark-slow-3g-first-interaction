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

    console.log("wait 1 seconds like a human might to click the button");
    await sleep(1000);

    console.log("click button");
    btn = await page.waitForSelector("#test-inc");
    const startTimer = performance.now();
    btn.click();

    console.log("wait for value 1");
    let waiting = true;
    let failed = false;
    let counter = 0;
    while (waiting && !failed) {
      counter++;
      await sleep(10);
      const results = await page.evaluate(() => {
        const valElm = document.querySelector("#test-value");
        if (valElm) return valElm.textContent;
      });
      if (results === "1") waiting = false;
      if (counter > 1000) failed = true;
    }

    let secondButtonClickStart = 0;
    if (failed) {
      console.log("failed, waiting for network idle and trying again");
      await page.waitForNetworkIdle();

      console.log("click button");
      secondButtonClickStart = performance.now();
      btn = await page.waitForSelector("#test-inc");
      btn.click();

      console.log("wait for value 1");
      let waiting = true;
      let counter = 0;
      while (waiting) {
        counter++;
        await sleep(10);
        const results = await page.evaluate(() => {
          const valElm = document.querySelector("#test-value");
          if (valElm) return valElm.textContent;
        });

        if (results === "1") waiting = false;
        if (counter > 1000) throw new Error("timeout");
      }
    }

    const endTimer = performance.now();
    testResults.push({
      testName: name,
      timeToButtonVisible: buttonVisible - pageLoadStart,
      timeButtonTookToRespond: endTimer - startTimer,
      hadToWaitForNetworkIdleAndClickAgain: failed,
      secondButtonClickResponseTime:
        failed && endTimer - secondButtonClickStart,
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
