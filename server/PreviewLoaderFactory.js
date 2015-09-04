/**
 * Factory that provides preview loaders
 */
var LoremImageLoader = require('./preview-loaders/loremimage-loader');

function createLoader(loader, config) {
  switch (loader) {
    case 'loremimage':
      return new LoremImageLoader(config);
    default:
      throw new Error('Unsupported loader "' + loader + '"');
  }
}

module.exports = {
  create: createLoader,
};
