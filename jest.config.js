module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|expo|expo-modules-core)/)"
  ],
  setupFiles: ["./jest.setup.js"]
};
