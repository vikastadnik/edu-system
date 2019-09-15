module.exports = {
  'rootDir': './',
  'verbose': true,
  'collectCoverage': true,
  'collectCoverageFrom': ['./**/*.ts'],
  'coverageDirectory': '<rootDir>/coverage',
  'moduleFileExtensions': [
    'js'
  ],
  'transform': {
    '^.+\\.ts$': 'babel-jest'
  },
  'coverageThreshold': {
    'global': {
      'branches': 70,
      'functions': 85,
      'lines': 85,
      'statements': 85
    }
  },
  'testResultsProcessor': './node_modules/jest-junit'
};