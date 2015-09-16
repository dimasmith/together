/**
 * Factory that provides preview loaders
 */
import LoremImageLoader from './preview-loaders/loremimage-loader';
import FilesystemLoader from './preview-loaders/filesystem-loader';

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

export default {
  create: createLoader,
};
