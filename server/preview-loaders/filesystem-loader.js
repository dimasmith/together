/**
 * Load list of photos from file system
 */
import fs from 'fs';

const DOWNLOAD_PREFIX = '/photos/';
const IMAGE_FILE_REGEX = /(jpg|png|jpeg)$/i;

function prefixFilename(filename) {
  return DOWNLOAD_PREFIX + filename;
}

function toPhotoObjects(url) {
  return {
    url: url,
    date: new Date(),
  };
}

function imageFilesOnly(filename) {
  return IMAGE_FILE_REGEX.test(filename);
}

/**
 * Create loader which loads photos from filesystem.
 * It expects server to serve photos from under '/photos' path.
 * @param config - must contain `photosDir` property
 * @constructor
 */
class LoremImageLoader {


  constructor(config) {
    this.photosDir = config.photosDir;
  }

  loadPhotos() {
    const filenames = fs.readdirSync(this.photosDir);
    const imageFilenames = filenames.filter(imageFilesOnly);
    const urls = imageFilenames.map(prefixFilename);
    return urls.map(toPhotoObjects);
  }
}

export default LoremImageLoader;
