# Running Test for Qwik App

> Tests require docker and docker compose

```bash
cd my-qwik-app
./runTest.sh
```

# What happens

The command above will run the docker compose up commands, capture the exit code from puppeteer and run docker compose down to clean up and remove the test containers.

# How it works

There are 3 services in the docker compose stack

- The service under test (Qwik)
- The nginx proxy (throttles the network for us to simulate slow network conditions)
- The Puppeteer test container (runs our test script against the service under test using the nginx proxy)

# What is tested

- How long it takes for the button to appear on the page.
- How many clicks before the value updates
- How much time until the value updates
- How many clicks were missed (did not register or increment the counter)

# Test Steps

- Load Page
- Wait for button to appear
- Start the timer and click the button
- Start clicking immediately and repeatedly
  - Atleast a 250ms sleep inbetween each click, possibly longer due to puppeteer async delays
- Stop the timer
- Output the results to `puppeteer-test-results.json`

# Recent Results

```json
[
  {
    "testName": "Qwik using standard example",
    "timeToButtonVisible": 31.133046984672546,
    "timeUntiValueUpdated": 7259.2627519369125,
    "buttonClickedCount": 28,
    "finalCounterValue": 1,
    "missedClicks": 27,
    "failed": false
  },
  {
    "testName": "Qwik optimized with direct DOM API",
    "timeToButtonVisible": 29.249405026435852,
    "timeUntiValueUpdated": 1297.0038549900055,
    "buttonClickedCount": 5,
    "finalCounterValue": 1,
    "missedClicks": 4,
    "failed": false
  }
]
```
