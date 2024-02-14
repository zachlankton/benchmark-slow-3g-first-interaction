const puppeteer = require("puppeteer");
const fs = require("fs");
const {
  runStandardTest,
  saveReport,
} = require("../standardized-puppeteer-test");

async function run() {
  await runStandardTest("standard idiomatic solid-start", "http://proxy:9173/");
  saveReport();
}

run();
