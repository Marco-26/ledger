const { getDefaultConfig } = require("expo/metro-config");

// Since Expo SDK 52+, expo/metro-config has built-in monorepo support.
// Manual watchFolders, nodeModulesPaths, and extraNodeModules are no longer needed.
const config = getDefaultConfig(__dirname);

module.exports = config;
