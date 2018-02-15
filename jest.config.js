module.exports = {
  bail: true,
  verbose: true,
  collectCoverage: true,
  coverageDirectory: `coverage/`,
  collectCoverageFrom: [`src/**/*.js`],
  coveragePathIgnorePatterns: [`src/index.js`, `src/utils/logging.js`],
  coverageReporters: [`json`, `html`],
  setupFiles: [],
  setupTestFrameworkScriptFile: `<rootDir>/src/__tests__/testHelpers/matchers/customMatchers.js`,
  modulePathIgnorePatterns: [
    `sharedTests/`,
    `data.js`,
    `featureValues.js`,
    `testHelpers/`,
  ],
  unmockedModulePathPatterns: [`jasmine-expect`],
}
