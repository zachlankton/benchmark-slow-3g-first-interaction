const puppeteer = require("puppeteer");
const fs = require("fs");
const {
  runStandardTest,
  saveReport,
} = require("../standardized-puppeteer-test");

async function run() {
  await runStandardTest("Qwik using standard example", "http://proxy:9173/");
  await runStandardTest(
    "Qwik optimized with direct DOM API",
    "http://proxy:9173/counter2"
  );

  saveReport();
}

run();
