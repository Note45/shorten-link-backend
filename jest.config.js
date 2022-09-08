module.exports = {
  roots: ['tests'],
  moduleNameMapper: {
    '@test/(.*)': 'tests/$1'
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  coveragePathIgnorePatterns: [
    '<rootDir>/dist',
    '<rootDir>/node_modules',
    '<rootDir>/src/shared'
  ],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  coverageReporters: ['json-summary', 'text', 'lcov'],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50
    }
  },
  collectCoverageFrom: ['src/**/*.{js,ts}']
};
