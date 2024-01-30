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

- The nginx proxy serves HTMX and throttles to simulate slow 3G
- The Puppeteer test container (runs our test script against the service under test using the nginx proxy)

# What is tested

- How long it takes for the button to appear on the page.
- How long it takes from the time the button is clicked to when the counter widget is incremented.

# Test Steps

- Load Page
- Wait for button to appear
- Wait 2 seconds (This is to simulate the delay of a real human seeing the button and clicking it)
- Start the timer and click the button
- Wait for the expected results to appear in the counter element
- Stop the timer
- Output the results to `puppeteer-test-results.json`

# Recent Results

### HTMX Block until JS Loaded

- Time to Button Visible: 5024 ms
- Time till counter incremented: 10 ms
- Had to wait for network idle and click the button a second time: `FALSE`
- Second Click Response Time: `N/A`

### HTMX Load JS Deferred

- Time to Button Visible: 27 ms
- Time till counter incremented: 11565 ms
- Had to wait for network idle and click the button a second time: `TRUE`
- Second Click Response Time: 31 ms

### HTMX using Direct DOM API

- Time to Button Visible: 18 ms
- Time till counter incremented: 11 ms
- Had to wait for network idle and click the button a second time: `FALSE`
- Second Click Response Time: `N/A`
