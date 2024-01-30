const puppeteer = require("puppeteer");
const fs = require("fs");
const {
  runStandardTest,
  saveReport,
} = require("../standardized-puppeteer-test");

async function run() {
  await runStandardTest("HTMX Block until JS Loaded", "http://proxy:9173/");
  await runStandardTest(
    "HTMX Load JS Deferred",
    "http://proxy:9173/defer.html"
  );
  await runStandardTest("HTMX Direct DOM API", "http://proxy:9173/direct.html");

  saveReport();
}

run();
