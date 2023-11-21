const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "dvzyoy",
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
