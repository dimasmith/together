/**
 * Factory that provides preview loaders
 */
var LoremImageLoader = require('./preview-loaders/loremimage-loader');
var FilesystemLoader = require('./preview-loaders/filesystem-loader');

function createLoader(loader, config) {
  switch (loader) {
    case 'loremimage':
      return new LoremImageLoader(config);
    case 'filesystem':
      return new FilesystemLoader(config);
    default:
      throw new Error('Unsupported loader "' + loader + '"');
  }
}

module.exports = {
  create: createLoader,
};
