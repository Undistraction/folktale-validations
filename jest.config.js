module.exports = {
  bail: true,
  verbose: false,
  collectCoverage: true,
  collectCoverageFrom: [`src/**/*.js`],
  coveragePathIgnorePatterns: [`src/index.js`],
  coverageReporters: [`json`],
  setupFiles: [],
  modulePathIgnorePatterns: [
    `sharedTests/`,
    `data.js`,
    `featureValues.js`,
    `testHelpers/`,
  ],
};
