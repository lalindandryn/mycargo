export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1",
  },
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)", "**/__tests__/**/*.[tj]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
