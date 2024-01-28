const puppeteer = require("puppeteer");
const fs = require("fs");

fs.writeFileSync("app/puppeteer-test-results.json", JSON.stringify({}));

puppeteer.launch({ headless: "new" }).then(async (browser) => {
  const page = await browser.newPage();

  let pageLoadStart = performance.now();
  console.log("goto Page");
  page.goto("http://proxy:9173/");

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
    await page.waitForNavigation({
      waitUntil: "networkidle0",
    });

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

  console.log("time diff", endTimer - startTimer);
  fs.writeFileSync(
    "app/puppeteer-test-results.json",
    JSON.stringify(
      {
        timeToButtonVisible: buttonVisible - pageLoadStart,
        timeButtonTookToRespond: endTimer - startTimer,
        secondButtonClickResponseTime: endTimer - secondButtonClickStart,
        hadToWaitForNetworkIdleAndClickAgain: failed,
      },
      null,
      2
    )
  );

  await browser.close();
});

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
