module.exports = {
    moduleFileExtensions: ["js", "json", "ts"],
    rootDir: ".",
    testEnvironment: "node",
    testMatch: ["**/test/**/*.spec.ts"],
    transform: {
      "^.+\\.(t|j)s$": "ts-jest"
    }
  };
  