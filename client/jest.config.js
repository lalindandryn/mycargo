module.export = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80, // Require 80% branch coverage
      functions: 80, // Require 80% function coverage
      lines: 80, // Require 80% line coverage
      statements: 80, // Require 80% statement coverage
    },
  },
};
