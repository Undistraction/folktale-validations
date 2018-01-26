module.exports = {
  bail: true,
  verbose: false,
  collectCoverage: true,
  collectCoverageFrom: [`src/**/*.js`],
  coveragePathIgnorePatterns: [`src/index.js`],
  coverageReporters: [`json`],
  setupFiles: [],
  setupTestFrameworkScriptFile: `<rootDir>/src/__tests__/testHelpers/matchers/customMatchers.js`,
  modulePathIgnorePatterns: [
    `sharedTests/`,
    `data.js`,
    `featureValues.js`,
    `testHelpers/`,
  ],
};
