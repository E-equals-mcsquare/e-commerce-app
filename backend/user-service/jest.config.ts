import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',           // Use ts-jest for transpiling TypeScript
  testEnvironment: 'node',      // Node.js environment for testing
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],  // Setup file for global variables
  moduleFileExtensions: ['ts', 'js'],  // Support .ts and .js extensions
  testMatch: ['**/*.test.ts'],  // Look for test files with .test.ts extension
  transform: {
    '^.+\\.ts$': 'ts-jest',     // Use ts-jest to transform .ts files
  },
  moduleDirectories: ['node_modules', 'src'], // Resolve modules from node_modules and src
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',   // Optional alias configuration
  },
};

export default config;
