
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure assets are properly handled
config.resolver.assetExts.push(
  'bin',
  'txt',
  'jpg',
  'png',
  'json',
  'mp4',
  'ttf',
  'otf',
  'woff',
  'woff2'
);

module.exports = config;
