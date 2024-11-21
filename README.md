## Cypress API Test Automation
This project is a Cypress-based API test automation suite designed to test the endpoints of the quote-api.jup.ag service. The suite includes tests for various endpoints, ensuring their reliability, performance, and correctness.

## Table of Contents
Installation
Configuration
Running Tests
Test Structure
HTML Reporting
Contributing
License

## Installation
To get started, clone the repository and install the dependencies:
  git clone https://github.com/your-repo/cypress-api-tests.git
  cd cypress-api-tests
  npm install

## Configuration
The configuration for Cypress is located in the cypress.config.js file. This file includes the base URL for the API and environment variables such as the user public key.

## Running Tests
To run the tests, use the following command:
  npx cypress run
To open the Cypress Test Runner and run tests interactively, use:
  npx cypress open

## Test Structure
The tests are organized under the api directory. Each test file corresponds to a specific endpoint or set of related endpoints.

quote.cy.js: Tests for the /quote endpoint.
tokens.cy.js: Tests for the /tokens endpoint.
swap.cy.js: Tests for the /swap endpoint.
reliability.cy.js: Reliability tests to ensure the API's performance and consistency.

## HTML Reporting
This project uses the cypress-mochawesome-reporter plugin to generate HTML reports. The reports are configured in the cypress.config.js file and will be generated in the reports directory.

To view the reports, open the generated HTML files in your browser.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
