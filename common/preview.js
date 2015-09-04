var _ = require('lodash');

const THUMBNAILS_MODE = 'THUMBNAILS';
const PHOTO_MODE = 'PHOTO';

module.exports.THUMBNAILS_MODE = THUMBNAILS_MODE;
module.exports.PHOTO_MODE = PHOTO_MODE;

const initialPreview = {
  photos: [],
  navigation: {
    index: 0,
    count: 0,
    viewMode: THUMBNAILS_MODE,
  },
  updatedAt: new Date(),
};

module.exports.createPreview = function() {
  return _.extend({}, initialPreview);
};

module.exports.setPhotos = function(preview, photos) {
  return _.extend({}, preview, {
    photos: photos,
    navigation: {
      index: 0,
      count: photos.length,
      viewMode: THUMBNAILS_MODE,
    },
    updatedAt: new Date(),
  });
};

module.exports.setCurrentPhotoIndex = function(preview, index) {
  var clone = _.extend({}, preview);
  _.extend(clone.navigation, {
    index: index,
    viewMode: PHOTO_MODE,
  });
  return clone;
};

module.exports.setViewMode = function(preview, viewMode) {
  var clone = _.extend({}, preview);
  _.extend(clone.navigation, {
    viewMode: viewMode,
  });
  return clone;
};
