# Running Test for Qwik City App

> Tests require docker and docker compose

```bash
cd my-qwik-app
npm install
./runTest.sh
```

# What happens

The command above will run the docker compose up commands, capture the exit code from puppeteer and run docker compose down to clean up and remove the test containers.

# How it works

There are 3 services in the docker compose stack

- The service under test (Qwik / Qwik City)
- The nginx proxy (throttles the network for us to simulate slow network conditions)
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

### Qwik using standard example

- Time to Button Visible: 28 ms
- Time till counter incremented: 6055 ms

### Qwik optimized with direct DOM API

- Time to Button Visible: 28 ms
- Time till counter incremented: 34 ms
