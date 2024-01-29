const puppeteer = require("puppeteer");
const fs = require("fs");
const {
  runStandardTest,
  saveReport,
} = require("../standardized-puppeteer-test");

async function run() {
  await runStandardTest("standard idiomatic nextjs", "http://proxy:9173/");
  await runStandardTest(
    "optimized using direct DOM API nextjs",
    "http://proxy:9173/counter2"
  );
  saveReport();
}

run();
