# Running Test for Rezact

> Tests require docker and docker compose

```bash
cd rezact
./runTest.sh
```

# What happens

The command above will run the docker compose up commands, capture the exit code from puppeteer and run docker compose down to clean up and remove the test containers.

# How it works

There are 3 services in the docker compose stack

- The service under test (Rezact)
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
    "testName": "Rezact",
    "timeToButtonVisible": 30.35396099090576,
    "timeUntiValueUpdated": 1310.7211660146713,
    "buttonClickedCount": 6,
    "finalCounterValue": 2,
    "missedClicks": 4,
    "failed": false
  }
]
```
