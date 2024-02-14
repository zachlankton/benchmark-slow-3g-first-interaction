# Running Test for Preact

> Tests require docker and docker compose

```bash
cd preact
./runTest.sh
```

# What happens

The command above will run the docker compose up commands, capture the exit code from puppeteer and run docker compose down to clean up and remove the test containers.

# How it works

There are 3 services in the docker compose stack

- The service under test (Preact)
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
    "testName": "Preact",
    "timeToButtonVisible": 1026.0200120210648,
    "timeUntiValueUpdated": 11.810785055160522,
    "buttonClickedCount": 1,
    "finalCounterValue": 1,
    "missedClicks": 0,
    "failed": false
  }
]
```
