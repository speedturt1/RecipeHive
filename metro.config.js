
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure assets are properly handled
config.resolver.assetExts.push(
  'bin',
  'txt',
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'svg',
  'json',
  'mp4',
  'mov',
  'avi',
  'webm',
  'ttf',
  'otf',
  'woff',
  'woff2'
);

// Configure transformer for better asset handling
config.transformer = {
  ...config.transformer,
  assetPlugins: ['expo-asset/tools/hashAssetFiles'],
};

module.exports = config;
