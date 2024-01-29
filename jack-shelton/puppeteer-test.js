const puppeteer = require("puppeteer");
const fs = require("fs");

fs.writeFileSync("app/puppeteer-test-results.json", JSON.stringify({}));

puppeteer.launch({ headless: "new" }).then(async (browser) => {
  const page = await browser.newPage();

  let pageLoadStart = performance.now();
  console.log("goto Page");
  page.goto("http://proxy:9173/");

  console.log("wait for button");
  const btn = await page.waitForSelector("button");
  const buttonVisible = performance.now();

  console.log("wait 1 second like a human might to click the button");
  await sleep(1000);

  console.log("click button");
  const startTimer = performance.now();
  btn.click();

  console.log("wait for value 1");
  let waiting = true;
  let counter = 0;
  while (waiting) {
    counter++;
    await sleep(10);
    const results = await page.evaluate(() => {
      const btn = document.querySelector("button");
      if (btn) return btn.textContent;
    });
    if (results === "1") waiting = false;
    if (counter > 1000) throw new Error("timeout");
  }

  const endTimer = performance.now();

  console.log("time diff", endTimer - startTimer);
  fs.writeFileSync(
    "app/puppeteer-test-results.json",
    JSON.stringify(
      {
        timeToButtonVisible: buttonVisible - pageLoadStart,
        timeButtonTookToRespond: endTimer - startTimer,
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
