const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://quote-api.jup.ag/v6',
    env: {
      userPublicKey:'2dBLFvtGkucxkKFY6U7nTvQeFLrQyhjCZXDsmSo4BC44',// This is a test user public key
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      charts: true
    }
  }
});
