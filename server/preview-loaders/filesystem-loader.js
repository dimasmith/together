/**
 * Load list of photos from file system
 */
var fs = require('fs');

const DOWNLOAD_PREFIX = '/photos/';
/**
 * Create loader which loads photos from filesystem.
 * It expects server to serve photos from under '/photos' path.
 * @param config - must contain `photosDir` property
 * @constructor
 */
var LoremImageLoader = function(config) {
  this.photosDir = config.photosDir;
};

LoremImageLoader.prototype.loadPhotos = function() {
  var filenames = fs.readdirSync(this.photosDir);
  var urls = filenames.map(prefixFilename);
  return urls.map(toPhotoObjects);
};

function prefixFilename(filename) {
  return DOWNLOAD_PREFIX + filename;
}

function toPhotoObjects(url) {
  return {
    url: url,
    date: new Date(),
  };
}

module.exports = LoremImageLoader;
