const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ec7qmf",
  screenshotOnRunFailure: false,

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack"
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
