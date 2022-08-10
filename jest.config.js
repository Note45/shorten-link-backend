module.exports = {
  roots: ['<rootDir>/tests'],
  moduleNameMapper: {
    '@test/(.*)': '<rootDir>/tests/$1'
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  coveragePathIgnorePatterns: [
    'dist',
    'src/server.ts',
    'src/database/migrations/*.ts'
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
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,ts}']
};
