// jest.config.js
const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  testMatch: ["**/*.spec.tsx"],
  transformIgnorePatterns: [
    "/node_modules/(?!(@react-native|react-native|@seaside|react-native.*)/).*/",
  ],
  transform: {
    ...tsjPreset.transform,
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.spec.json",
      babelConfig: true,
    },
  },
};
