# Running Test for Rezact ( Client Side Rendered )

> Tests require docker and docker compose

```bash
cd rezact
npm install
npm run build
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

- Time to Button Visible: 1027 ms
- Time till counter incremented: 20 ms