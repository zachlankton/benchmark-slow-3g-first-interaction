const puppeteer = require("puppeteer");
const fs = require("fs");

fs.writeFileSync("app/puppeteer-test-results.json", JSON.stringify({}));

puppeteer.launch({ headless: "new" }).then(async (browser) => {
  const page = await browser.newPage();

  let pageLoadStart = performance.now();
  console.log("goto Page");
  page.goto("http://proxy:9173/");

  console.log("wait for button");
  const btn = await page.waitForSelector("#quik-test-button");
  const buttonVisible = performance.now();

  console.log("wait 2 seconds like a human might to click the button");
  await sleep(2000);

  const startTimer = performance.now();

  console.log("click button");
  btn.click();

  console.log("wait for value 71");
  const newValElm = await page.waitForSelector(
    "#quik-test-value ::-p-text(71)",
    { timeout: 10000 }
  );

  const endTimer = performance.now();

  console.log("time diff", endTimer - startTimer);
  fs.writeFileSync(
    "app/puppeteer-test-results.json",
    JSON.stringify({
      timeButtonTookToRespond: endTimer - startTimer,
      timeToButtonVisible: buttonVisible - pageLoadStart,
    })
  );

  await browser.close();
});

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
