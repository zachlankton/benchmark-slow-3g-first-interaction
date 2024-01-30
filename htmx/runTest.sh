#!/bin/bash

chmod 777 puppeteer-test-results.json

docker compose up --exit-code-from puppeteer
EXIT_CODE=$?

docker compose down

exit $EXIT_CODE
