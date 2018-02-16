module.exports = {
  bail: true,
  verbose: false,
  collectCoverage: true,
  coverageDirectory: `coverage/`,
  collectCoverageFrom: [`src/**/*.js`],
  coveragePathIgnorePatterns: [`src/index.js`, `src/utils/logging.js`],
  coverageReporters: [`json`],
  setupTestFrameworkScriptFile: `<rootDir>/src/__tests__/testHelpers/matchers/customMatchers.js`,
  modulePathIgnorePatterns: [`testHelpers/`],
  unmockedModulePathPatterns: [`jasmine-expect`],
}
