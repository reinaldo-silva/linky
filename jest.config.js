/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./src",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
});

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
  },

  moduleDirectories: ["node_modules", "<rootDir>/src"],
};

module.exports = createJestConfig(customJestConfig);
