import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // Set up ts-jest
  testEnvironment: "node", // Use Node environment for testing
  transform: {
    "^.+\\.ts$": "ts-jest", // Transform TypeScript files with ts-jest
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.ts$", // Find .test.ts or .spec.ts files
};

export default config;
