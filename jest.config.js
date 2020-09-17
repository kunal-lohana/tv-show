module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,vue}",
    "!**/node_modules/**",
    "!src/**/*.js",
    "!**/coverage/**",
    "!**/serviceWorker.js",
    "!**/index.js"
  ]
};
