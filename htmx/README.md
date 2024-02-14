# Running Test for HTMX

> Tests require docker and docker compose

```bash
cd htmx
./runTest.sh
```

# What happens

The command above will run the docker compose up commands, capture the exit code from puppeteer and run docker compose down to clean up and remove the test containers.

# How it works

There are 3 services in the docker compose stack

- The service under test (HTMX)
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
    "testName": "HTMX Block until JS Loaded",
    "timeToButtonVisible": 5029.495365023613,
    "timeUntiValueUpdated": 270.4117730855942,
    "buttonClickedCount": 1,
    "finalCounterValue": 1,
    "missedClicks": 0,
    "failed": false
  },
  {
    "testName": "HTMX Load JS Deferred",
    "timeToButtonVisible": 21.04800307750702,
    "timeUntiValueUpdated": 5436.511241078377,
    "buttonClickedCount": 21,
    "finalCounterValue": 1,
    "missedClicks": 20,
    "failed": false
  },
  {
    "testName": "HTMX Direct DOM API",
    "timeToButtonVisible": 24.070271015167236,
    "timeUntiValueUpdated": 275.5317260026932,
    "buttonClickedCount": 1,
    "finalCounterValue": 1,
    "missedClicks": 0,
    "failed": false
  }
]
```
